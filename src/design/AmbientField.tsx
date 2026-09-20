/*
 * Ambient background field — the "full-page 3D" option, built as layered CSS
 * gradients on the compositor rather than WebGL so it costs no JS payload and
 * cannot block the main thread. Animation stops under prefers-reduced-motion,
 * leaving the static gradient.
 */
export function AmbientField() {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="ambient-blob ambient-blob--1" />
      <span className="ambient-blob ambient-blob--2" />
      <span className="ambient-blob ambient-blob--3" />
      <span className="ambient-grid" />
    </div>
  );
}
