import { useState } from "react";

/*
 * Zero Miles — two requests, one token.
 *
 * This is an illustrative walk-through of a row-lock contention, not a live
 * database. It deliberately stops short of naming an error code or a driver
 * message: the honest claim is that the second request finds the token already
 * consumed and does not create a second pairing. Confirm the exact outcome
 * against the real pairing function before making any stronger statement here.
 */

type Tone = "idle" | "holds" | "waits" | "done" | "closed";

type Step = {
  caption: string;
  a: { text: string; tone: Tone };
  b: { text: string; tone: Tone };
  row: { status: string; holder: string | null; tone: Tone };
  log: string;
};

const STEPS: Step[] = [
  {
    caption: "Both requests arrive",
    a: { text: "submits token", tone: "idle" },
    b: { text: "submits the same token", tone: "idle" },
    row: { status: "available", holder: null, tone: "idle" },
    log: "Two devices submit the same pairing token within the same moment.",
  },
  {
    caption: "A takes the row lock",
    a: { text: "opened a transaction", tone: "holds" },
    b: { text: "submits the same token", tone: "idle" },
    row: { status: "locked", holder: "A", tone: "holds" },
    log: "Request A opens a transaction and selects the token row for update.",
  },
  {
    caption: "B blocks on the same row",
    a: { text: "holds the lock", tone: "holds" },
    b: { text: "waiting on the row lock", tone: "waits" },
    row: { status: "locked", holder: "A", tone: "holds" },
    log: "Request B asks for the same row. It does not read stale state — it waits.",
  },
  {
    caption: "A commits the pairing",
    a: { text: "paired · committed", tone: "done" },
    b: { text: "waiting on the row lock", tone: "waits" },
    row: { status: "consumed", holder: "A", tone: "done" },
    log: "Request A writes the pairing and commits. The token is now consumed.",
  },
  {
    caption: "B re-reads and stands down",
    a: { text: "paired · committed", tone: "done" },
    b: { text: "token already consumed", tone: "closed" },
    row: { status: "consumed", holder: "A", tone: "done" },
    log: "The lock is released to B, which re-reads the row, finds it consumed, and creates no second pairing.",
  },
];

export function ContentionDemo() {
  const [step, setStep] = useState(0);
  const last = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <section className="contention" aria-labelledby="contention-title">
      <div className="contention-head">
        <p className="kicker">Signature module · Zero Miles</p>
        <h2 id="contention-title">Two requests, one token.</h2>
        <p className="contention-dek">
          Pairing runs inside a database transaction, so the interesting case is not the happy path —
          it is what the second request sees. Step through the contention.
        </p>
      </div>

      <div className="contention-stage">
        <div className="contention-lanes">
          <div className={`lane lane--${current.a.tone}`}>
            <span className="lane-id">Request A</span>
            <span className="lane-state">{current.a.text}</span>
          </div>
          <div className={`lane lane--${current.b.tone}`}>
            <span className="lane-id">Request B</span>
            <span className="lane-state">{current.b.text}</span>
          </div>
        </div>

        <div className={`token-row token-row--${current.row.tone}`} aria-live="polite">
          <span className="token-label">pairing token</span>
          <span className="token-status">{current.row.status}</span>
          <span className="token-holder">
            {current.row.holder ? `held by ${current.row.holder}` : "no holder"}
          </span>
        </div>
      </div>

      <ol className="contention-steps">
        {STEPS.map((s, i) => (
          <li
            key={s.caption}
            className={i === step ? "is-current" : i < step ? "is-past" : undefined}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="contention-step-no">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <strong>{s.caption}</strong>
              <span className="contention-step-log">{s.log}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="contention-controls">
        <button
          type="button"
          className="btn btn-solid"
          onClick={() => setStep((s) => (s === STEPS.length - 1 ? 0 : s + 1))}
        >
          {last ? "Replay" : "Step"}
        </button>
        <button type="button" className="btn" onClick={() => setStep(0)} disabled={step === 0}>
          Reset
        </button>
        <p className="contention-note">
          Illustrative walk-through of the transaction boundary, not a live database.
        </p>
      </div>
    </section>
  );
}
