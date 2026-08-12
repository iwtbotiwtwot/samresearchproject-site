"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  clamp,
  lerp,
  STARBREAKER_CANONICAL,
  starbreakerScenario,
} from "./starbreakerModel.js";

const DEFAULTS = Object.freeze({
  mode: "supernova",
  time: 0.34,
  bounceEnergy: STARBREAKER_CANONICAL.supernova.bounceEnergy,
  carrierLeak: STARBREAKER_CANONICAL.supernova.carrierLeak,
  view: "energy",
});

const STAGES = Object.freeze([
  { label: "0", name: "Seed", time: 0 },
  { label: "I", name: "Collapse", time: 0.34 },
  { label: "II", name: "Bounce", time: 0.62 },
  { label: "III", name: "Remnant", time: 1 },
]);

const format = new Intl.NumberFormat("en-US");
const hashNoise = (index, salt) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function canvasTheme(ctx, width, height) {
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#061611");
  background.addColorStop(1, "#0b211a");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(157, 230, 208, 0.055)";
  ctx.lineWidth = 1;
  const grid = Math.max(38, Math.round(width / 18));
  for (let x = grid; x < width; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = grid; y < height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawCanvas(canvas, result, view) {
  const bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(bounds.width);
  const height = Math.round(bounds.height);
  const renderWidth = Math.round(width * pixelRatio);
  const renderHeight = Math.round(height * pixelRatio);
  if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
    canvas.width = renderWidth;
    canvas.height = renderHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  canvasTheme(ctx, width, height);

  ctx.fillStyle = "#9de6d0";
  ctx.font = "700 10px ui-monospace, SFMono-Regular, Consolas, monospace";
  ctx.letterSpacing = "1px";
  ctx.fillText("STARBREAKER PLAYGROUND", 24, 30);
  ctx.fillStyle = "#7f968d";
  ctx.textAlign = "right";
  ctx.fillText(`${result.stage.toUpperCase()} · ILLUSTRATIVE MODEL`, width - 24, 30);
  ctx.textAlign = "left";

  const cx = width * 0.5;
  const cy = height * 0.51;
  const baseRadius = Math.min(width * 0.235, height * 0.31);
  const collapseU = clamp((result.time - 0.18) / 0.29, 0, 1);
  const bounceU = clamp((result.time - 0.47) / 0.29, 0, 1);
  const residueU = clamp((result.time - 0.76) / 0.24, 0, 1);
  const shellScale =
    result.stage === "star"
      ? 1
      : result.stage === "collapse"
        ? lerp(1, 0.34, collapseU)
        : result.stage === "bounce"
          ? lerp(0.34, 0.56, bounceU)
          : lerp(0.52, 0.33, residueU);

  ctx.save();
  ctx.translate(cx, cy);
  for (let index = STARBREAKER_CANONICAL.shells.length - 1; index >= 0; index -= 1) {
    const shell = STARBREAKER_CANONICAL.shells[index];
    const radius = baseRadius * shell.rMax * shellScale;
    const glow = ctx.createRadialGradient(
      0,
      0,
      Math.max(1, radius * shell.rMin),
      0,
      0,
      radius,
    );
    glow.addColorStop(0, `${shell.color}18`);
    glow.addColorStop(0.7, `${shell.color}35`);
    glow.addColorStop(1, `${shell.color}b8`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `${shell.color}bb`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  if (result.stage === "collapse") {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    for (let index = 0; index < 18; index += 1) {
      const angle = (index / 18) * Math.PI * 2;
      const outer = baseRadius * lerp(1.35, 0.56, collapseU);
      const inner = baseRadius * shellScale * 1.08;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.lineTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
      ctx.stroke();
    }
  }

  if (result.time >= 0.47) {
    const particleCount = Math.min(190, Math.max(24, Math.round(result.ejectaAtoms / 8)));
    for (let index = 0; index < particleCount; index += 1) {
      const angle = hashNoise(index, 2) * Math.PI * 2;
      const speed = 0.35 + hashNoise(index, 8) * 0.65;
      const expansion = bounceU * (0.45 + result.ejectaFraction * 1.75) + residueU * 1.15;
      const radius = baseRadius * (0.38 + speed * expansion * 1.55);
      const color = STARBREAKER_CANONICAL.shells[index % 4].color;
      ctx.globalAlpha = 0.35 + hashNoise(index, 5) * 0.55;
      ctx.fillStyle = view === "tensor" ? "#d8ceff" : color;
      ctx.beginPath();
      ctx.arc(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        1.2 + hashNoise(index, 7) * 2.2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  if (result.stage === "residue") {
    ctx.strokeStyle = view === "remnant" ? "#ffc857" : "rgba(216, 206, 255, 0.78)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 7]);
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius * (0.73 + residueU * 0.34), 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.restore();

  const stageNames = ["STAR", "COLLAPSE", "BOUNCE", "REMNANT"];
  const activeStage = ["star", "collapse", "bounce", "residue"].indexOf(result.stage);
  stageNames.forEach((stage, index) => {
    const x = 24 + index * ((width - 48) / 3);
    ctx.fillStyle = index === activeStage ? "#9de6d0" : "#668078";
    ctx.font = `${index === activeStage ? "700" : "500"} 10px ui-monospace, SFMono-Regular, Consolas, monospace`;
    ctx.textAlign = index === 0 ? "left" : index === 3 ? "right" : "center";
    ctx.fillText(stage, x, height - 22);
  });
  ctx.textAlign = "left";
}

function RangeControl({ id, label, unit, min, max, step, value, onChange }) {
  const update = (event) => onChange(Number(event.target.value));
  return (
    <div className="starbreaker-control">
      <label htmlFor={`${id}-range`}><span>{label}</span><small>{unit}</small></label>
      <div className="starbreaker-range-pair">
        <input id={`${id}-range`} type="range" min={min} max={max} step={step} value={value} onChange={update} />
        <input type="number" min={min} max={max} step={step} value={value} onChange={update} aria-label={`${label} numeric value`} />
      </div>
    </div>
  );
}

export default function StarbreakerPlate() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const [controls, setControls] = useState(DEFAULTS);
  const [running, setRunning] = useState(false);
  const result = useMemo(() => starbreakerScenario(controls), [controls]);

  const update = useCallback((key, value) => {
    setControls((current) => ({ ...current, [key]: value }));
  }, []);

  const stop = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = 0;
    setRunning(false);
  }, []);

  const replay = useCallback(() => {
    if (running) {
      stop();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update("time", 1);
      return;
    }
    setRunning(true);
    const start = performance.now();
    const duration = 3600;
    const frame = (now) => {
      const progress = clamp((now - start) / duration, 0, 1);
      setControls((current) => ({ ...current, time: Number(progress.toFixed(3)) }));
      if (progress < 1) animationRef.current = requestAnimationFrame(frame);
      else {
        animationRef.current = 0;
        setRunning(false);
      }
    };
    animationRef.current = requestAnimationFrame(frame);
  }, [running, stop, update]);

  const reset = useCallback(() => {
    stop();
    setControls(DEFAULTS);
  }, [stop]);

  const changeMode = useCallback((mode) => {
    const canonical = STARBREAKER_CANONICAL[mode];
    stop();
    setControls((current) => ({
      ...current,
      mode,
      bounceEnergy: canonical.bounceEnergy,
      carrierLeak: canonical.carrierLeak,
    }));
  }, [stop]);

  const exportResult = useCallback(() => {
    const payload = {
      instrument: "Starbreaker Plate",
      scope: "Illustrative playground; not a formal Courtroom result",
      exportedAt: new Date().toISOString(),
      view: controls.view,
      ...result,
    };
    const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `starbreaker-${result.mode}-${result.time.toFixed(3)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [controls.view, result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const render = () => drawCanvas(canvas, result, controls.view);
    render();
    const observer = new ResizeObserver(render);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [controls.view, result]);

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="starbreaker-plate">
      <header className="starbreaker-plate__header">
        <div>
          <p>Recovered Courtroom instrument · Browser model</p>
          <h3>Starbreaker <em>Plate</em></h3>
        </div>
        <span><i aria-hidden="true" /> Interactive</span>
      </header>

      <div className="starbreaker-lab">
        <aside className="starbreaker-controls" aria-label="Starbreaker controls">
          <div className="starbreaker-rail-title"><span>Control rail</span><code>SB / 01</code></div>

          <div className="starbreaker-control">
            <label htmlFor="starbreaker-scenario"><span>Scenario reference</span><small>Preset</small></label>
            <select id="starbreaker-scenario" value={controls.mode} onChange={(event) => changeMode(event.target.value)}>
              <option value="supernova">Supernova reference</option>
              <option value="failed">Failed-collapse reference</option>
            </select>
          </div>

          <div className="starbreaker-control">
            <label htmlFor="starbreaker-view"><span>Plate view</span><small>Layer</small></label>
            <select id="starbreaker-view" value={controls.view} onChange={(event) => update("view", event.target.value)}>
              <option value="energy">Energy field</option>
              <option value="tensor">Tensor memory</option>
              <option value="remnant">Remnant structure</option>
            </select>
          </div>

          <RangeControl id="starbreaker-time" label="Evolution time" unit="t / t-end" min="0" max="1" step="0.001" value={controls.time} onChange={(value) => { stop(); update("time", value); }} />
          <RangeControl id="starbreaker-energy" label="Event energy" unit="E / E0" min="0.2" max="2" step="0.01" value={controls.bounceEnergy} onChange={(value) => update("bounceEnergy", value)} />
          <RangeControl id="starbreaker-leak" label="Carrier leakage" unit="Normalized" min="0" max="1" step="0.01" value={controls.carrierLeak} onChange={(value) => update("carrierLeak", value)} />

          <fieldset className="starbreaker-stages">
            <legend><span>Stage lock</span><small>Jump to</small></legend>
            <div>
              {STAGES.map((stage) => {
                const selected = Math.abs(controls.time - stage.time) < 0.002;
                return (
                  <button key={stage.label} type="button" className={selected ? "is-selected" : ""} aria-pressed={selected} title={stage.name} onClick={() => { stop(); update("time", stage.time); }}>
                    {stage.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="starbreaker-actions">
            <button type="button" className="starbreaker-action starbreaker-action--play" aria-pressed={running} onClick={replay}>{running ? "■ Stop sequence" : "▶ Run sequence"}</button>
            <button type="button" className="starbreaker-action" onClick={reset}>↺ Reset</button>
            <button type="button" className="starbreaker-action" onClick={exportResult}>↓ Export JSON</button>
          </div>
        </aside>

        <div className="starbreaker-stage">
          <div className="starbreaker-canvas-card">
            <div className="starbreaker-canvas-toolbar">
              <span><i aria-hidden="true" /> Event surface</span>
              <code>{controls.view.toUpperCase()} VIEW · t={controls.time.toFixed(3)}</code>
            </div>
            <canvas ref={canvasRef} role="img" aria-label={`Starbreaker ${result.stage} stage. ${format.format(result.ejectaAtoms)} illustrative ejecta atoms and ${format.format(result.remnantAtoms)} illustrative remnant atoms.`} />
          </div>

          <div className="starbreaker-readouts" aria-live="polite">
            <article><span>Stage</span><strong>{result.stage}</strong><small>Event phase</small></article>
            <article><span>Ejecta share</span><strong>{(result.ejectaFraction * 100).toFixed(1)}%</strong><small>{format.format(result.ejectaAtoms)} atoms</small></article>
            <article><span>Remnant share</span><strong>{(result.remnantFraction * 100).toFixed(1)}%</strong><small>{format.format(result.remnantAtoms)} atoms</small></article>
            <article><span>Tensor memory</span><strong>{result.tensorAmplitudeProxy.toFixed(5)}</strong><small>Normalized proxy</small></article>
          </div>

          <div className="starbreaker-route">
            <span>Plate evolution</span>
            <div><code>time</code><i>→</i><code>stage gate</code><i>→</i><code>ejecta / remnant</code><i>→</i><code>tensor view</code></div>
            <strong>Illustrative playground</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
