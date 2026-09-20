import { useEffect, useRef } from "react";

/**
 * Pointer-reactive background field.
 *
 *   lattice  nodes plus proximity connectors — the familiar treatment
 *   gossip   epidemic dissemination. The pointer seeds a message into the
 *            nearest node; that node relays to a few neighbours after a short
 *            delay, they relay onward, and the message floods the network the
 *            way a gossip protocol actually spreads state. Informed nodes cool
 *            back down, so it can be seeded again.
 *   halftone a 1-bit load field. A scalar "heat" surface — drifting hotspots
 *            plus the pointer — rendered through an ordered Bayer threshold,
 *            so it resolves as a living halftone. Ordered dithering is used
 *            deliberately: the error-diffusion kernels (Floyd-Steinberg,
 *            Atkinson) are sequential and CPU-bound, which is why shader
 *            demos using them drop frames. A Bayer threshold is a per-pixel
 *            lookup, so this runs in plain Canvas 2D with no WebGL at all.
 *   shards   a keyspace partition. Every point on the page belongs to its
 *            nearest owner, and the boundaries are drawn where ownership
 *            changes — a Voronoi partition, which is what consistent-hashing
 *            diagrams are really showing. The pointer is a live owner, so the
 *            partition rebalances continuously as it moves.
 *
 * Gossip is the point of difference: it is a distributed-systems primitive
 * rather than decoration, so the background is saying something about the work
 * instead of just moving. See https://en.wikipedia.org/wiki/Gossip_protocol
 *
 * One canvas, one rAF loop, capped node and message counts. Stops when the tab
 * is hidden, and never starts for coarse pointers or reduced-motion readers.
 */
/* Single source of truth: the type is derived from the runtime list, so adding
   a mode to one without the other is a compile error rather than a silent
   fallback to "off". */
const MODES = ["lattice", "gossip", "shards", "halftone"] as const;
type Mode = "off" | (typeof MODES)[number];

type Node = {
  x: number; y: number; vx: number; vy: number; r: number;
  /** Timestamp this node learned the message; 0 when uninformed. */
  informed: number;
  /** When it should forward onward; 0 once it has. */
  relayAt: number;
};

type Message = { from: number; to: number; start: number; duration: number };

const MAX_NODES = 54;
const LINK_DISTANCE = 148;
const POINTER_RADIUS = 170;

// Gossip parameters. Fanout of 2–3 is what real push protocols use; it floods
// the network in O(log n) rounds, which is what makes the spread feel right.
const NEIGHBOUR_RADIUS = 210;
const FANOUT = 3;
const RELAY_DELAY = 130;
const HOP_DURATION = 420;
const INFECTED_TTL = 2600;
const MAX_MESSAGES = 130;
const SEED_INTERVAL = 900;

// Partition is rasterised on a coarse grid: for each cell find the nearest
// owner, then draw a segment wherever two adjacent cells disagree. That is
// O(cells x owners) rather than a full Voronoi construction, and the slight
// stair-stepping at this resolution reads as deliberate.
const SHARD_STEP = 12;
const SHARD_OWNERS = 12;

// Ordered (Bayer) 4x4 threshold matrix, normalised to 0..1.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const HALFTONE_PIXEL = 5;

function hexToRgb(value: string): [number, number, number] {
  const hex = value.replace("#", "").trim();
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  const int = Number.parseInt(full, 16);
  return Number.isNaN(int) ? [33, 85, 232] : [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function readMode(): Mode {
  const value = document.documentElement.dataset.live ?? "";
  return (MODES as readonly string[]).includes(value) ? (value as Mode) : "off";
}

export function LiveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    let nodes: Node[] = [];
    let messages: Message[] = [];
    let frame = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let lastSeed = 0;
    let owners = new Int16Array(0);
    let halftone: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; image: ImageData } | null = null;
    let hotspots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let inkRgb: [number, number, number] = [33, 85, 232];
    let pulseRgb: [number, number, number] = [15, 143, 124];
    let ownerCols = 0;
    let ownerRows = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    let ink = "#2155e8";
    let pulse = "#2155e8";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale density to the viewport so a laptop is not doing phone-sized work.
      const target = Math.min(MAX_NODES, Math.round((width * height) / 26000));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1.1 + Math.random() * 1.7,
        informed: 0,
        relayAt: 0,
      }));
      messages = [];

      ownerCols = Math.ceil(width / SHARD_STEP) + 1;
      ownerRows = Math.ceil(height / SHARD_STEP) + 1;
      owners = new Int16Array(ownerCols * ownerRows);

      // The halftone is composed at grid resolution and scaled up with
      // smoothing off, so one drawImage replaces tens of thousands of rects.
      const hw = Math.ceil(width / HALFTONE_PIXEL);
      const hh = Math.ceil(height / HALFTONE_PIXEL);
      const off = document.createElement("canvas");
      off.width = hw;
      off.height = hh;
      const offCtx = off.getContext("2d");
      halftone = offCtx ? { canvas: off, ctx: offCtx, image: offCtx.createImageData(hw, hh) } : null;

      hotspots = Array.from({ length: 3 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 240 + Math.random() * 180,
      }));
    };

    const readColours = () => {
      const styles = getComputedStyle(document.documentElement);
      ink = styles.getPropertyValue("--live-ink").trim() || "#2155e8";
      pulse = styles.getPropertyValue("--live-pulse").trim() || ink;
      inkRgb = hexToRgb(ink);
      pulseRgb = hexToRgb(pulse);
    };

    const nearestNode = (x: number, y: number) => {
      let best = -1;
      let bestDistance = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const distance = Math.hypot(nodes[i].x - x, nodes[i].y - y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      }
      return best;
    };

    /** Seed a message at the node nearest the pointer. */
    const seed = (now: number) => {
      const index = nearestNode(pointer.x, pointer.y);
      if (index < 0 || nodes[index].informed) return;
      nodes[index].informed = now;
      nodes[index].relayAt = now + RELAY_DELAY;
    };

    /** One informed node forwards to up to FANOUT uninformed neighbours. */
    const relay = (index: number, now: number) => {
      const source = nodes[index];
      source.relayAt = 0;
      if (messages.length >= MAX_MESSAGES) return;

      const candidates: { i: number; d: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === index || nodes[i].informed) continue;
        const d = Math.hypot(nodes[i].x - source.x, nodes[i].y - source.y);
        if (d <= NEIGHBOUR_RADIUS) candidates.push({ i, d });
      }
      candidates.sort((a, b) => a.d - b.d);

      for (const candidate of candidates.slice(0, FANOUT)) {
        if (messages.length >= MAX_MESSAGES) break;
        messages.push({
          from: index,
          to: candidate.i,
          start: now,
          duration: HOP_DURATION * (0.7 + (candidate.d / NEIGHBOUR_RADIUS) * 0.6),
        });
      }
    };

    const step = (now: number) => {
      const mode = readMode();
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (pointer.active && mode === "lattice") {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < POINTER_RADIUS && distance > 0.01) {
            const force = (1 - distance / POINTER_RADIUS) ** 2 * 0.9;
            node.x += (dx / distance) * force;
            node.y += (dy / distance) * force;
          }
        }

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      if (mode === "gossip") {
        if (pointer.active && now - lastSeed > SEED_INTERVAL) {
          lastSeed = now;
          seed(now);
        }

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.relayAt && now >= node.relayAt) relay(i, now);
          // Cool down so the network can carry a new message later.
          if (node.informed && now - node.informed > INFECTED_TTL) node.informed = 0;
        }

        const stillFlying: Message[] = [];
        ctx.lineCap = "round";
        for (const message of messages) {
          const progress = (now - message.start) / message.duration;
          const from = nodes[message.from];
          const to = nodes[message.to];

          if (progress >= 1) {
            if (!to.informed) {
              to.informed = now;
              to.relayAt = now + RELAY_DELAY;
            }
            continue;
          }
          stillFlying.push(message);

          // A short bright segment travelling the edge — the message in flight.
          const head = Math.min(1, progress);
          const tail = Math.max(0, progress - 0.32);
          ctx.strokeStyle = pulse;
          ctx.globalAlpha = 0.5 * Math.sin(Math.PI * progress);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(from.x + (to.x - from.x) * tail, from.y + (to.y - from.y) * tail);
          ctx.lineTo(from.x + (to.x - from.x) * head, from.y + (to.y - from.y) * head);
          ctx.stroke();
        }
        messages = stillFlying;
      }

      if (mode === "halftone" && halftone) {
        const { ctx: offCtx, image } = halftone;
        const gw = halftone.canvas.width;
        const gh = halftone.canvas.height;
        const data = image.data;

        for (const spot of hotspots) {
          spot.x += spot.vx;
          spot.y += spot.vy;
          if (spot.x < -spot.r) spot.x = width + spot.r;
          if (spot.x > width + spot.r) spot.x = -spot.r;
          if (spot.y < -spot.r) spot.y = height + spot.r;
          if (spot.y > height + spot.r) spot.y = -spot.r;
        }

        const t = now / 2600;
        const pointerR = 200;

        for (let gy = 0; gy < gh; gy++) {
          const y = gy * HALFTONE_PIXEL;
          for (let gx = 0; gx < gw; gx++) {
            const x = gx * HALFTONE_PIXEL;

            // Baseline load: a slow, wide undulation so the field breathes.
            let value = 0.05 + 0.045 * Math.sin(x * 0.006 + t) * Math.cos(y * 0.007 - t * 0.8);

            for (const spot of hotspots) {
              const d = Math.hypot(x - spot.x, y - spot.y);
              if (d < spot.r) value += (1 - d / spot.r) ** 2 * 0.28;
            }

            let heat = 0;
            if (pointer.active) {
              const d = Math.hypot(x - pointer.x, y - pointer.y);
              if (d < pointerR) {
                heat = (1 - d / pointerR) ** 2;
                value += heat * 0.55;
              }
            }

            const index = (gy * gw + gx) * 4;
            const threshold = BAYER[(gy & 3) * 4 + (gx & 3)];
            if (value > threshold) {
              const rgb = heat > 0.25 ? pulseRgb : inkRgb;
              data[index] = rgb[0];
              data[index + 1] = rgb[1];
              data[index + 2] = rgb[2];
              // Kept deliberately faint — this is a texture behind text, not a layer over it.
              data[index + 3] = Math.min(76, 10 + value * 44 + heat * 48);
            } else {
              data[index + 3] = 0;
            }
          }
        }

        offCtx.putImageData(image, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(halftone.canvas, 0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
      }

      if (mode === "shards") {
        // Owners: a handful of drifting nodes, plus the pointer when present.
        const ownerCount = Math.min(SHARD_OWNERS, nodes.length);
        const px = pointer.active ? pointer.x : NaN;
        const py = pointer.active ? pointer.y : NaN;
        const pointerIndex = pointer.active ? ownerCount : -1;

        for (let row = 0; row < ownerRows; row++) {
          const y = row * SHARD_STEP;
          for (let col = 0; col < ownerCols; col++) {
            const x = col * SHARD_STEP;
            let best = 0;
            let bestDistance = Infinity;
            for (let i = 0; i < ownerCount; i++) {
              const dx = nodes[i].x - x;
              const dy = nodes[i].y - y;
              const d = dx * dx + dy * dy;
              if (d < bestDistance) { bestDistance = d; best = i; }
            }
            if (pointer.active) {
              const dx = px - x;
              const dy = py - y;
              if (dx * dx + dy * dy < bestDistance) best = pointerIndex;
            }
            owners[row * ownerCols + col] = best;
          }
        }

        // A boundary exists wherever two neighbouring cells have different owners.
        ctx.lineWidth = 1;
        ctx.lineCap = "butt";
        for (let row = 0; row < ownerRows; row++) {
          for (let col = 0; col < ownerCols; col++) {
            const here = owners[row * ownerCols + col];
            const touchesPointer =
              pointerIndex >= 0 &&
              (here === pointerIndex ||
                (col + 1 < ownerCols && owners[row * ownerCols + col + 1] === pointerIndex) ||
                (row + 1 < ownerRows && owners[(row + 1) * ownerCols + col] === pointerIndex));

            ctx.strokeStyle = touchesPointer ? pulse : ink;
            ctx.globalAlpha = touchesPointer ? 0.5 : 0.17;

            if (col + 1 < ownerCols && owners[row * ownerCols + col + 1] !== here) {
              const x = (col + 1) * SHARD_STEP;
              ctx.beginPath();
              ctx.moveTo(x, row * SHARD_STEP);
              ctx.lineTo(x, (row + 1) * SHARD_STEP);
              ctx.stroke();
            }
            if (row + 1 < ownerRows && owners[(row + 1) * ownerCols + col] !== here) {
              const y = (row + 1) * SHARD_STEP;
              ctx.beginPath();
              ctx.moveTo(col * SHARD_STEP, y);
              ctx.lineTo((col + 1) * SHARD_STEP, y);
              ctx.stroke();
            }
          }
        }

        // Mark the owners themselves.
        for (let i = 0; i < ownerCount; i++) {
          ctx.fillStyle = ink;
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.arc(nodes[i].x, nodes[i].y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (mode === "lattice") {
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance > LINK_DISTANCE) continue;
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const near = pointer.active
              ? Math.max(0, 1 - Math.hypot(midX - pointer.x, midY - pointer.y) / 320)
              : 0;
            ctx.strokeStyle = ink;
            ctx.globalAlpha = (1 - distance / LINK_DISTANCE) * (0.1 + near * 0.42);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        if (mode === "shards" || mode === "halftone") break;
        let emphasis = 0;
        if (mode === "gossip") {
          // Bright on arrival, easing back to the resting state.
          emphasis = node.informed
            ? Math.max(0, 1 - (now - node.informed) / INFECTED_TTL)
            : 0;
        } else if (pointer.active) {
          emphasis = Math.max(
            0,
            1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / POINTER_RADIUS,
          );
        }

        ctx.fillStyle = mode === "gossip" && emphasis > 0.02 ? pulse : ink;
        ctx.globalAlpha = 0.22 + emphasis * 0.55;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + emphasis * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(step);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    // A click seeds immediately, so the protocol responds to intent as well as
    // to drifting past.
    const onPointerDown = (event: PointerEvent) => {
      if (readMode() !== "gossip" || !running) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      lastSeed = performance.now();
      seed(performance.now());
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onPointerLeave);
    };

    const start = () => {
      if (running) return;
      running = true;
      readColours();
      resize();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      frame = requestAnimationFrame(step);
    };

    const sync = () => {
      const wanted =
        readMode() !== "off" && fine.matches && !calm.matches && !document.hidden && document.documentElement.dataset.motion !== "reduce";
      if (wanted) start();
      else stop();
    };

    sync();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    calm.addEventListener("change", sync);
    fine.addEventListener("change", sync);

    // The preview switchboard and the theme toggle both write to <html>.
    const observer = new MutationObserver(() => {
      readColours();
      sync();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-live", "data-theme", "data-motion"],
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      calm.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="live-field" aria-hidden="true" />;
}
