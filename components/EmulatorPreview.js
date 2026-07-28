"use client";

import { useEffect, useMemo, useState } from "react";

export default function EmulatorPreview() {
  const [signal, setSignal] = useState(54);
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => {
      setPhase((value) => (value + 1) % 12);
    }, 360);
    return () => window.clearInterval(timer);
  }, [running]);

  const cells = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const row = Math.floor(index / 7);
        const column = index % 7;
        const wave = (Math.sin((row * 0.82 + column * 1.18 + phase) * 0.9) + 1) / 2;
        const intensity = Math.max(0.08, wave * (signal / 100));
        return { intensity, active: intensity > 0.48 };
      }),
    [phase, signal],
  );

  return (
    <div className="emulator-panel">
      <div className="panel-bar">
        <span className="panel-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>SLC / PUBLIC INTERFACE</strong>
        <span>PREVIEW 0.1</span>
      </div>

      <div className="panel-body">
        <div className="panel-controls">
          <div className="panel-status">
            <span className={running ? "is-running" : ""} aria-hidden="true" />
            <div>
              <small>Interface state</small>
              <strong aria-live="polite">{running ? "Observing" : "Ready"}</strong>
            </div>
          </div>

          <label htmlFor="signal-control">
            <span>
              Visual signal <output>{signal}%</output>
            </span>
            <input
              id="signal-control"
              type="range"
              min="16"
              max="92"
              value={signal}
              onChange={(event) => setSignal(Number(event.target.value))}
            />
          </label>

          <button type="button" onClick={() => setRunning((value) => !value)}>
            <span aria-hidden="true">{running ? "Ⅱ" : "▶"}</span>
            {running ? "Pause preview" : "Run visual preview"}
          </button>
        </div>

        <div className="ledger-wrap">
          <div className="ledger-label">
            <span>Illustrative response field</span>
            <span>t + {String(phase).padStart(2, "0")}</span>
          </div>
          <div className="ledger-grid" aria-hidden="true">
            {cells.map((cell, index) => (
              <span
                key={index}
                className={cell.active ? "is-active" : ""}
                style={{ "--intensity": cell.intensity.toFixed(3) }}
              />
            ))}
          </div>
          <div className="ledger-trace" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => {
              const height = 16 + ((index * 23 + phase * 9) % 52);
              return <i key={index} style={{ "--trace-height": `${height}%` }} />;
            })}
          </div>
        </div>
      </div>

      <p className="panel-disclaimer">
        Interface preview only · No research calculation or protected SLC mechanism is
        represented.
      </p>
    </div>
  );
}
