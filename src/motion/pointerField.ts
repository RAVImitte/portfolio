import gsap from "gsap";
import { canHover, prefersReducedMotion } from "./tokens";

/**
 * Copy-desk guides, not a cursor halo.
 * The pointer selects a newspaper column and a baseline; their
 * crossing gets a print registration mark. Grid lines ease toward
 * the pointer along one axis only (accordion), never a radial swirl.
 */
export function initPointerField(
  canvas: HTMLCanvasElement,
  nib: HTMLElement,
  marks: HTMLElement,
): () => void {
  if (!canHover() || prefersReducedMotion()) {
    canvas.style.display = "none";
    nib.style.display = "none";
    marks.style.display = "none";
    return () => undefined;
  }

  document.documentElement.classList.add("has-ink-cursor");

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.42 };
  const chase = { x: mouse.x, y: mouse.y };
  const col = { x: mouse.x, v: 0 };
  const row = { y: mouse.y, v: 0 };
  let cols = 12;
  let rows = 16;

  const resize = () => {
    const dpr = Math.min(1.25, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.max(8, Math.round(w / 140));
    rows = Math.max(10, Math.round(h / 68));
  };

  resize();

  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    nib.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    nib.classList.add("is-on");
    marks.classList.add("is-on");
  };

  const onOver = (e: PointerEvent) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const over = Boolean(t.closest("a, button, .index-row, summary, [data-magnetic]"));
    nib.classList.toggle("is-link", over);
    marks.classList.toggle("is-link", over);
  };

  const spring = (pos: number, vel: number, target: number) => {
    const n = vel + (target - pos) * 0.045;
    return { pos: pos + n * 0.78, vel: n * 0.78 };
  };

  const columnX = (i: number, w: number) => {
    const rest = (i / cols) * w;
    return rest + (col.x - rest) * 0.035;
  };

  const rowY = (j: number, h: number) => {
    const rest = (j / rows) * h;
    return rest + (row.y - rest) * 0.035;
  };

  const drawGuides = (w: number, h: number) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(26, 24, 20, 0.04)";
    ctx.beginPath();
    for (let i = 0; i <= cols; i += 1) {
      const x = columnX(i, w);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let j = 0; j <= rows; j += 1) {
      const y = rowY(j, h);
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "rgba(194, 59, 34, 0.18)";
    ctx.beginPath();
    ctx.moveTo(col.x, 0);
    ctx.lineTo(col.x, h);
    ctx.stroke();

    ctx.strokeStyle = "rgba(26, 24, 20, 0.12)";
    ctx.beginPath();
    ctx.moveTo(0, row.y);
    ctx.lineTo(w, row.y);
    ctx.stroke();
  };

  const tick = () => {
    const sx = spring(col.x, col.v, mouse.x);
    col.x = sx.pos;
    col.v = sx.vel;
    const sy = spring(row.y, row.v, mouse.y);
    row.y = sy.pos;
    row.v = sy.vel;

    chase.x += (mouse.x - chase.x) * 0.16;
    chase.y += (mouse.y - chase.y) * 0.16;
    marks.style.transform = `translate(${chase.x}px, ${chase.y}px) translate(-50%, -50%)`;

    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    drawGuides(w, h);
  };

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerover", onOver);
  window.addEventListener("resize", resize);
  gsap.ticker.add(tick);

  const onVis = () => {
    if (document.hidden) gsap.ticker.remove(tick);
    else gsap.ticker.add(tick);
  };
  document.addEventListener("visibilitychange", onVis);

  return () => {
    document.documentElement.classList.remove("has-ink-cursor");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerover", onOver);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVis);
    gsap.ticker.remove(tick);
  };
}
