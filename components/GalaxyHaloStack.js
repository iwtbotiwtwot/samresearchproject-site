"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GALAXY_HALO_CATALOG,
  GALAXY_HALO_DEFAULT,
  G393_STACK,
  HALO_RADIAL_BINS,
  galaxyHaloScenario,
} from "./galaxyHaloModel.js";

const massFormat = new Intl.NumberFormat("en-US", { notation: "scientific", maximumFractionDigits: 3 });

function canvasTheme(ctx, width, height) {
  const field = ctx.createLinearGradient(0, 0, width, height);
  field.addColorStop(0, "#04110e");
  field.addColorStop(0.52, "#071a15");
  field.addColorStop(1, "#0b211a");
  ctx.fillStyle = field;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(157, 230, 208, 0.055)";
  ctx.lineWidth = 1;
  const grid = Math.max(36, Math.round(width / 20));
  for (let x = grid; x < width; x += grid) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = grid; y < height; y += grid) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
}

function mono(ctx, size = 10, weight = 600) {
  ctx.font = `${weight} ${size}px ui-monospace, SFMono-Regular, Consolas, monospace`;
}

function drawGalaxy(ctx, result, width, height) {
  const cx = width * 0.245;
  const cy = height * 0.5;
  const maxRadius = Math.min(width * 0.19, height * 0.31);
  const selected = result.radialBin;

  ctx.save();
  ctx.translate(cx, cy);
  for (let index = HALO_RADIAL_BINS.length - 1; index >= 0; index -= 1) {
    const radius = maxRadius * ((index + 1) / HALO_RADIAL_BINS.length);
    const active = index === selected;
    ctx.fillStyle = active ? "rgba(105, 207, 176, 0.105)" : "rgba(99, 216, 230, 0.018)";
    ctx.strokeStyle = active ? "rgba(157, 230, 208, 0.88)" : "rgba(99, 216, 230, 0.17)";
    ctx.lineWidth = active ? 2 : 1;
    ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }

  const halo = ctx.createRadialGradient(0, 0, 4, 0, 0, maxRadius);
  halo.addColorStop(0, "rgba(221, 166, 93, 0.42)");
  halo.addColorStop(0.22, "rgba(221, 166, 93, 0.15)");
  halo.addColorStop(1, "rgba(105, 207, 176, 0.015)");
  ctx.fillStyle = halo;
  ctx.beginPath(); ctx.arc(0, 0, maxRadius, 0, Math.PI * 2); ctx.fill();

  ctx.save(); ctx.scale(1, 0.34);
  const disc = ctx.createRadialGradient(0, 0, 2, 0, 0, maxRadius * 0.74);
  disc.addColorStop(0, "#f5d294"); disc.addColorStop(0.16, "#dda65d"); disc.addColorStop(1, "rgba(209, 104, 80, 0.03)");
  ctx.fillStyle = disc; ctx.beginPath(); ctx.arc(0, 0, maxRadius * 0.74, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255, 200, 87, 0.55)"; ctx.stroke(); ctx.restore();

  const angle = -0.42;
  const probeRadius = maxRadius * ((selected + 0.5) / HALO_RADIAL_BINS.length);
  ctx.strokeStyle = "#9de6d0"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(angle) * probeRadius, Math.sin(angle) * probeRadius); ctx.stroke();
  ctx.fillStyle = "#9de6d0"; ctx.beginPath(); ctx.arc(Math.cos(angle) * probeRadius, Math.sin(angle) * probeRadius, 4, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  mono(ctx, 9, 700); ctx.fillStyle = "#9de6d0"; ctx.textAlign = "center";
  ctx.fillText(result.galaxy.name, cx, cy + maxRadius + 34);
  ctx.fillStyle = "#70877d"; mono(ctx, 8, 600);
  ctx.fillText(`${result.radiusKpc.toFixed(2)} KPC OUTER RADIUS`, cx, cy + maxRadius + 50);
  ctx.textAlign = "left";
}

function drawRadial(ctx, result, width, height) {
  drawGalaxy(ctx, result, width, height);
  const left = width * 0.5;
  const right = width - 38;
  const top = 86;
  const bottom = height - 72;
  const chartWidth = right - left;
  const chartHeight = bottom - top;
  ctx.strokeStyle = "rgba(157, 230, 208, 0.22)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, bottom); ctx.lineTo(right, bottom); ctx.stroke();

  for (let tick = 0; tick <= 4; tick += 1) {
    const y = bottom - (tick / 4) * chartHeight;
    ctx.strokeStyle = "rgba(157, 230, 208, 0.08)";
    ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y); ctx.stroke();
    ctx.fillStyle = "#6f857b"; mono(ctx, 8, 600); ctx.textAlign = "right"; ctx.fillText(String(tick), left - 9, y + 3);
  }

  HALO_RADIAL_BINS.forEach((bin, index) => {
    const x0 = left + (index / 5) * chartWidth;
    const x1 = left + ((index + 1) / 5) * chartWidth;
    const y = bottom - (bin.x / 4) * chartHeight;
    const active = index === result.radialBin;
    if (active) {
      ctx.fillStyle = "rgba(105, 207, 176, 0.07)"; ctx.fillRect(x0, top, x1 - x0, chartHeight);
    }
    ctx.strokeStyle = active ? "#9de6d0" : "rgba(99, 216, 230, 0.62)";
    ctx.lineWidth = active ? 4 : 2;
    ctx.beginPath(); ctx.moveTo(x0 + 6, y); ctx.lineTo(x1 - 6, y); ctx.stroke();
    ctx.fillStyle = active ? "#9de6d0" : "#63d8e6";
    ctx.beginPath(); ctx.arc((x0 + x1) / 2, y, active ? 5 : 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = active ? "#dff9f0" : "#7f968d"; mono(ctx, 8, active ? 700 : 600); ctx.textAlign = "center";
    ctx.fillText(bin.x.toFixed(4), (x0 + x1) / 2, y - 12);
    ctx.fillStyle = "#647a70"; mono(ctx, 7, 600); ctx.fillText(bin.label, (x0 + x1) / 2, bottom + 18);
  });

  ctx.textAlign = "left"; ctx.fillStyle = "#9de6d0"; mono(ctx, 9, 700); ctx.fillText("CR031b POPULATION X(r)", left, 54);
  ctx.fillStyle = "#70877d"; mono(ctx, 8, 600); ctx.fillText("FIVE SEALED BIN MEDIANS · NO INTERPOLATED CURVE", left, 69);
  ctx.save(); ctx.translate(left - 30, top + chartHeight / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText("X = V²DARK / V²BAR", 0, 0); ctx.restore();
  ctx.textAlign = "right"; ctx.fillText("NORMALIZED RADIUS ρ = r / Rₒᵤₜₑᵣ", right, height - 28); ctx.textAlign = "left";
}

function drawMass(ctx, result, width, height) {
  drawGalaxy(ctx, result, width, height);
  const left = width * 0.52;
  const right = width - 44;
  const top = 110;
  const bottom = height - 84;
  const maxMass = Math.max(result.predictedMass, result.measuredMass, 1);
  const bars = [
    { label: "SAM 10/π", value: result.predictedMass, color: "#9de6d0" },
    { label: "SPARC", value: result.measuredMass, color: "#dda65d" },
  ];
  bars.forEach((bar, index) => {
    const slot = (right - left) / 2;
    const x = left + index * slot + slot * 0.18;
    const barWidth = slot * 0.64;
    const barHeight = (bar.value / maxMass) * (bottom - top);
    ctx.fillStyle = `${bar.color}22`; ctx.fillRect(x, top, barWidth, bottom - top);
    ctx.fillStyle = bar.color; ctx.fillRect(x, bottom - barHeight, barWidth, barHeight);
    ctx.fillStyle = "#dce9e2"; mono(ctx, 9, 700); ctx.textAlign = "center"; ctx.fillText(bar.label, x + barWidth / 2, bottom + 22);
    ctx.fillStyle = bar.color; mono(ctx, 9, 700); ctx.fillText(massFormat.format(bar.value), x + barWidth / 2, bottom - barHeight - 13);
  });
  ctx.textAlign = "left"; ctx.fillStyle = "#9de6d0"; mono(ctx, 9, 700); ctx.fillText("OUTER HALO MASS PLACEMENT", left, 54);
  ctx.fillStyle = "#70877d"; mono(ctx, 8, 600); ctx.fillText("M = R · X∞ · V²BAR / G", left, 69);
  ctx.textAlign = "right"; ctx.fillStyle = "#9de6d0"; mono(ctx, 18, 700); ctx.fillText(Number.isFinite(result.ratio) ? `${result.ratio.toFixed(4)}×` : "N/A", right, 65);
  ctx.fillStyle = "#70877d"; mono(ctx, 7, 700); ctx.fillText("SELECTED GALAXY PREDICTED / MEASURED", right, 82); ctx.textAlign = "left";
}

function drawStack(ctx, width, height) {
  const left = 58;
  const right = width - 58;
  const top = height * 0.29;
  const barHeight = Math.min(94, height * 0.18);
  const totalWidth = right - left;
  const segments = [
    { label: "BARYON", value: G393_STACK.baryonObservedPercent, color: "#dda65d" },
    { label: "POST-BB PBH ENVELOPE", value: G393_STACK.pbhEnvelopeObservedPercent, color: "#a78bfa" },
    { label: "ORGANIZATION SELECTOR", value: G393_STACK.organizationOpenObservedPercent, color: "rgba(99, 216, 230, 0.17)" },
  ];
  let x = left;
  segments.forEach((segment, index) => {
    const segmentWidth = totalWidth * segment.value / 100;
    ctx.fillStyle = segment.color; ctx.fillRect(x, top, segmentWidth, barHeight);
    ctx.strokeStyle = index === 2 ? "#63d8e6" : "rgba(255,255,255,0.28)";
    if (index === 2) ctx.setLineDash([6, 6]);
    ctx.strokeRect(x, top, segmentWidth, barHeight); ctx.setLineDash([]);
    x += segmentWidth;
  });
  ctx.fillStyle = "#9de6d0"; mono(ctx, 9, 700); ctx.fillText("G393 FORWARD SOURCE STACK", left, 54);
  ctx.fillStyle = "#70877d"; mono(ctx, 8, 600); ctx.fillText("PERCENT OF OBSERVED OUTER v² · HISTORICAL SELECTOR SURFACE", left, 69);

  const rows = [
    ["BARYONIC AGGREGATE", G393_STACK.baryonObservedPercent, "#dda65d"],
    ["POST-BB PBH ENVELOPE", G393_STACK.pbhEnvelopeObservedPercent, "#a78bfa"],
    ["REMAINING ORGANIZATION LANE", G393_STACK.organizationOpenObservedPercent, "#63d8e6"],
  ];
  rows.forEach(([label, value, color], index) => {
    const rowY = top + barHeight + 56 + index * 48;
    ctx.fillStyle = color; ctx.fillRect(left, rowY - 9, 9, 9);
    ctx.fillStyle = "#a9bbb2"; mono(ctx, 8, 700); ctx.fillText(label, left + 20, rowY);
    ctx.textAlign = "right"; ctx.fillStyle = color; mono(ctx, 13, 700); ctx.fillText(`${value.toFixed(4)}%`, right, rowY); ctx.textAlign = "left";
  });
  ctx.fillStyle = "#647a70"; mono(ctx, 8, 600); ctx.fillText("G393 localized the organization selector; CR031b–CR033 subsequently supplied the population radial and mass-placement layers.", left, height - 38);
}

function drawCanvas(canvas, result, view) {
  const bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(bounds.width);
  const height = Math.round(bounds.height);
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  canvasTheme(ctx, width, height);
  if (view === "mass") drawMass(ctx, result, width, height);
  else if (view === "stack") drawStack(ctx, width, height);
  else drawRadial(ctx, result, width, height);
}

function RangeControl({ id, label, unit, min, max, step, value, onChange }) {
  const update = (event) => onChange(Number(event.target.value));
  return (
    <div className="galaxy-halo-control">
      <label htmlFor={`${id}-range`}><span>{label}</span><small>{unit}</small></label>
      <div className="galaxy-halo-range-pair">
        <input id={`${id}-range`} type="range" min={min} max={max} step={step} value={value} onChange={update} />
        <input type="number" min={min} max={max} step={step} value={value} onChange={update} aria-label={`${label} numeric value`} />
      </div>
    </div>
  );
}

export default function GalaxyHaloStack() {
  const canvasRef = useRef(null);
  const scanRef = useRef(0);
  const canonicalGalaxy = GALAXY_HALO_CATALOG.find(({ name }) => name === GALAXY_HALO_DEFAULT.galaxyName);
  const [controls, setControls] = useState({ ...GALAXY_HALO_DEFAULT, radiusKpc: canonicalGalaxy.radiusKpc, vBarKms: canonicalGalaxy.vBarKms, vObsKms: canonicalGalaxy.vObsKms });
  const [running, setRunning] = useState(false);
  const result = useMemo(() => galaxyHaloScenario(controls), [controls]);

  const update = useCallback((key, value) => setControls((current) => ({ ...current, [key]: value })), []);
  const stop = useCallback(() => {
    if (scanRef.current) window.clearTimeout(scanRef.current);
    scanRef.current = 0; setRunning(false);
  }, []);
  const selectGalaxy = useCallback((name) => {
    const galaxy = GALAXY_HALO_CATALOG.find((candidate) => candidate.name === name);
    if (!galaxy) return;
    stop();
    setControls((current) => ({ ...current, galaxyName: name, radiusKpc: galaxy.radiusKpc, vBarKms: galaxy.vBarKms, vObsKms: galaxy.vObsKms }));
  }, [stop]);
  const reset = useCallback(() => {
    stop();
    setControls({ ...GALAXY_HALO_DEFAULT, radiusKpc: canonicalGalaxy.radiusKpc, vBarKms: canonicalGalaxy.vBarKms, vObsKms: canonicalGalaxy.vObsKms });
  }, [canonicalGalaxy, stop]);
  const scan = useCallback(() => {
    if (running) { stop(); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { update("radialBin", 4); return; }
    setRunning(true); update("view", "radial"); update("radialBin", 0);
    let index = 0;
    const advance = () => {
      index += 1;
      if (index >= HALO_RADIAL_BINS.length) { scanRef.current = 0; setRunning(false); return; }
      update("radialBin", index);
      scanRef.current = window.setTimeout(advance, 720);
    };
    scanRef.current = window.setTimeout(advance, 720);
  }, [running, stop, update]);

  const printReceipt = useCallback(() => {
    const issuedAt = new Date();
    const receiptId = `GH-${issuedAt.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`;
    const row = (label, value) => `<tr><th>${label}</th><td>${value}</td></tr>`;
    const receipt = window.open("", "_blank", "width=820,height=920");
    if (!receipt) return;
    receipt.document.write(`<!doctype html><html lang="en"><head><title>${receiptId} · Galaxy Halo Stack</title><style>
      body{max-width:760px;margin:42px auto;padding:0 24px;color:#10201b;font:13px Arial,sans-serif}h1{font:38px Georgia,serif;margin:4px 0 18px}h2{margin-top:28px;font-size:13px;text-transform:uppercase;letter-spacing:.12em}header{border-bottom:3px solid #10201b;padding-bottom:18px}header p{margin:0;color:#287d68;font:700 10px monospace;letter-spacing:.12em;text-transform:uppercase}header div{display:flex;justify-content:space-between;font:10px monospace}table{width:100%;border-collapse:collapse}th,td{padding:9px;border-bottom:1px solid #c6d1cc;text-align:left}th{width:48%;font-weight:600}.result{background:#edf8f3}footer{margin-top:26px;padding-top:14px;border-top:1px solid #83968d;color:#52665e;font-size:10px}.no-print{margin:24px 0;padding:12px 18px;color:white;border:0;background:#10201b;cursor:pointer}@media print{.no-print{display:none}}
      </style></head><body><header><p>SAM Research Project · Model run receipt</p><h1>Galaxy Halo Stack</h1><div><span>${receiptId}</span><span>${issuedAt.toLocaleString()}</span></div></header>
      <h2>Selected SPARC row and parameters</h2><table>${row("Galaxy", result.galaxy.name)}${row("Run status", result.status.replaceAll("_", " "))}${row("Configuration", result.galaxy.configuration.replaceAll("_", " "))}${row("Outer radius", `${result.radiusKpc.toFixed(3)} kpc`)}${row("Baryonic speed", `${result.vBarKms.toFixed(3)} km/s`)}${row("Observed speed", `${result.vObsKms.toFixed(3)} km/s`)}${row("X∞", result.xInf.toFixed(9))}${row("Radial bin", `${result.radial.label} (ρ midpoint ${result.radial.midpoint})`)}</table>
      <h2>Calculated results</h2><table class="result">${row("SAM halo mass", `${massFormat.format(result.predictedMass)} M☉`)}${row("Measured halo mass", `${massFormat.format(result.measuredMass)} M☉`)}${row("Selected predicted / measured", Number.isFinite(result.ratio) ? result.ratio.toFixed(6) : "not available")}${row("Selected log10 ratio", Number.isFinite(result.logRatio) ? result.logRatio.toFixed(6) : "not available")}${row("Population median ratio", result.population.medianRatio.toFixed(9))}${row("Population median log10 ratio", result.population.medianLogRatio.toFixed(9))}${row("Population rows", `${result.population.statisticCount} of ${result.population.catalogCount}`)}${row("Radial X bin median", result.radial.x.toFixed(4))}${row("Radial halo fraction", result.radialHaloFraction.toFixed(6))}</table>
      <h2>Calculation route</h2><p>M_halo(&lt;R_outer) = R_outer × X∞ × V_bar²(R_outer) / G, with the canonical substrate replay using X∞ = 10/π. Radial X values are the five sealed CR031b population-bin medians; this receipt does not interpolate between them.</p>
      <footer>Sources: Courtroom CR031b, CR032, CR033 and the G393 forward stack. Generated at samresearchproject.org/galaxy-halos.</footer><button class="no-print" onclick="window.print()">Print or save as PDF</button></body></html>`);
    receipt.document.close(); receipt.focus();
  }, [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const render = () => drawCanvas(canvas, result, controls.view);
    render();
    const observer = new ResizeObserver(render); observer.observe(canvas);
    return () => observer.disconnect();
  }, [controls.view, result]);
  useEffect(() => () => { if (scanRef.current) window.clearTimeout(scanRef.current); }, []);

  const canvasLabel = controls.view === "stack"
    ? "Historical G393 source stack: 23.93 percent baryonic support, 1.96 percent post-big-bang PBH envelope, and 74.11 percent then assigned to the open organization selector."
    : controls.view === "mass"
      ? `${result.galaxy.name} outer halo mass comparison: SAM ${massFormat.format(result.predictedMass)} solar masses and measured ${massFormat.format(result.measuredMass)} solar masses.`
      : `${result.galaxy.name} with CR031b radial bin ${result.radial.label}, X median ${result.radial.x.toFixed(4)}, selected at ${result.probeRadiusKpc.toFixed(2)} kiloparsecs.`;

  return (
    <div className="galaxy-halo-plate">
      <header className="galaxy-halo-plate__header">
        <div><p>Courtroom instrument · CR031b / CR032 / CR033</p><h3>Galaxy Halo <em>Stack</em></h3></div>
        <span><i aria-hidden="true" /> {result.status.replaceAll("_", " ")}</span>
      </header>

      <div className="galaxy-halo-lab">
        <aside className="galaxy-halo-controls" aria-label="Galaxy halo controls">
          <div className="galaxy-halo-rail-title"><span>Control rail</span><code>GH / 01</code></div>
          <div className="galaxy-halo-control">
            <label htmlFor="galaxy-halo-galaxy"><span>SPARC galaxy</span><small>175 rows</small></label>
            <select id="galaxy-halo-galaxy" value={controls.galaxyName} onChange={(event) => selectGalaxy(event.target.value)}>
              {GALAXY_HALO_CATALOG.map(({ name }) => <option value={name} key={name}>{name}</option>)}
            </select>
          </div>
          <RangeControl id="halo-x-inf" label="Substrate X∞" unit="10 / π canonical" min="0.1" max="6" step="0.001" value={controls.xInf} onChange={(value) => update("xInf", value)} />
          <RangeControl id="halo-radius" label="Outer radius" unit="kpc" min="0.1" max="100" step="0.01" value={controls.radiusKpc} onChange={(value) => update("radiusKpc", value)} />
          <RangeControl id="halo-vbar" label="Baryonic speed" unit="km/s" min="0.1" max="350" step="0.1" value={controls.vBarKms} onChange={(value) => update("vBarKms", value)} />
          <RangeControl id="halo-vobs" label="Observed speed" unit="km/s" min="0.1" max="400" step="0.1" value={controls.vObsKms} onChange={(value) => update("vObsKms", value)} />

          <fieldset className="galaxy-halo-bins"><legend><span>Radial zone</span><small>ρ = r / Router</small></legend><div>
            {HALO_RADIAL_BINS.map((bin, index) => <button type="button" key={bin.label} className={controls.radialBin === index ? "is-selected" : ""} aria-pressed={controls.radialBin === index} title={`ρ ${bin.label}; X ${bin.x}`} onClick={() => { stop(); update("view", "radial"); update("radialBin", index); }}>{index + 1}</button>)}
          </div></fieldset>

          <div className="galaxy-halo-actions">
            <button type="button" className="galaxy-halo-action galaxy-halo-action--scan" aria-pressed={running} onClick={scan}>{running ? "■ Stop radial scan" : "▶ Run radial scan"}</button>
            <button type="button" className="galaxy-halo-action" onClick={reset}>↺ Reset</button>
            <button type="button" className="galaxy-halo-action" onClick={printReceipt}>▤ Get receipt</button>
          </div>
        </aside>

        <div className="galaxy-halo-stage">
          <div className="galaxy-halo-view-tabs" role="group" aria-label="Instrument view">
            {[{ id: "radial", label: "Radial law" }, { id: "mass", label: "Mass placement" }, { id: "stack", label: "Forward stack" }].map((view) => <button type="button" key={view.id} className={controls.view === view.id ? "is-selected" : ""} aria-pressed={controls.view === view.id} onClick={() => update("view", view.id)}>{view.label}</button>)}
          </div>
          <div className="galaxy-halo-canvas-card">
            <div className="galaxy-halo-canvas-toolbar"><span><i aria-hidden="true" /> Population surface</span><code>{controls.view.toUpperCase()} VIEW · {result.galaxy.name}</code></div>
            <canvas ref={canvasRef} role="img" aria-label={canvasLabel} />
          </div>

          <div className="galaxy-halo-readouts" aria-live="polite">
            <article><span>Radial X</span><strong>{result.radial.x.toFixed(4)}</strong><small>CR031b bin median</small></article>
            <article><span>SAM halo mass</span><strong>{massFormat.format(result.predictedMass)}</strong><small>Solar masses</small></article>
            <article><span>Galaxy ratio</span><strong>{Number.isFinite(result.ratio) ? result.ratio.toFixed(4) : "N/A"}</strong><small>Predicted / measured</small></article>
            <article><span>Catalog median</span><strong>{result.population.medianRatio.toFixed(6)}</strong><small>{result.population.statisticCount} valid galaxies</small></article>
          </div>

          <div className="galaxy-halo-route">
            <span>Calculation route</span>
            <div><code>10 / π</code><i>→</i><code>R · X∞ · V²bar / G</code><i>→</i><code>SPARC comparison</code><i>→</i><code>catalog median</code></div>
            <strong>{result.status === "CR033_SUBSTRATE_REPLAY" ? "SUBSTRATE IDENTITY" : "ADJUSTED INPUTS"}</strong>
          </div>
          <p className="galaxy-halo-fallback">{canvasLabel} The five radial values are published population-bin medians, not a smoothed or interpolated curve.</p>
        </div>
      </div>
    </div>
  );
}
