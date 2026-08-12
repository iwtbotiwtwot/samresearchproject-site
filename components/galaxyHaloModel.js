import { GALAXY_HALO_CATALOG } from "./galaxyHaloCatalog.js";

export const G_KPC = 4.30091e-6;
export const X_INF_SAM = 10 / Math.PI;

export const HALO_RADIAL_BINS = Object.freeze([
  Object.freeze({ label: "0.0–0.2", midpoint: 0.1, x: 1.1513, spread: 0.6137, nonPositive: 21 }),
  Object.freeze({ label: "0.2–0.4", midpoint: 0.3, x: 1.7271, spread: 0.4477, nonPositive: 9 }),
  Object.freeze({ label: "0.4–0.6", midpoint: 0.5, x: 2.4224, spread: 0.4347, nonPositive: 4 }),
  Object.freeze({ label: "0.6–0.8", midpoint: 0.7, x: 2.6832, spread: 0.4042, nonPositive: 3 }),
  Object.freeze({ label: "0.8–1.0", midpoint: 0.9, x: 3.1225, spread: 0.396, nonPositive: 2 }),
]);

export const G393_STACK = Object.freeze({
  baryonObservedPercent: 23.930097651729596,
  darkResidualPercent: 76.0699023482704,
  pbhEnvelopeDarkPercent: 2.576714268055339,
  pbhEnvelopeObservedPercent: 1.960104027503642,
  organizationOpenObservedPercent: 74.10979832076676,
  medianADarkRequired: 1.6901357855149723e-7,
  medianAEnvelope: 4.354996993487348e-9,
  medianARemaining: 1.6465858155800988e-7,
});

export const GALAXY_HALO_DEFAULT = Object.freeze({
  galaxyName: "NGC3198",
  xInf: X_INF_SAM,
  radialBin: 4,
  view: "radial",
});

const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const close = (left, right) => Math.abs(left - right) <= Math.max(1e-10, Math.abs(right) * 1e-10);

export function median(values) {
  if (!values.length) return Number.NaN;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function haloMass(radiusKpc, velocityKms, x = X_INF_SAM) {
  return finite(radiusKpc, 0) * finite(x, X_INF_SAM) * finite(velocityKms, 0) ** 2 / G_KPC;
}

export function measuredHaloMass(radiusKpc, vBarKms, vObsKms) {
  const residual = Math.max(finite(vObsKms, 0) ** 2 - finite(vBarKms, 0) ** 2, 0);
  return finite(radiusKpc, 0) * residual / G_KPC;
}

export function populationHaloStats(xInf = X_INF_SAM, override = null) {
  const x = Math.max(0, finite(xInf, X_INF_SAM));
  const ratios = [];
  const logs = [];

  for (const source of GALAXY_HALO_CATALOG) {
    const row = override?.name === source.name ? { ...source, ...override } : source;
    const measured = measuredHaloMass(row.radiusKpc, row.vBarKms, row.vObsKms);
    if (measured <= 0) continue;
    const ratio = haloMass(row.radiusKpc, row.vBarKms, x) / measured;
    ratios.push(ratio);
    logs.push(Math.log10(ratio));
  }

  const meanLog = logs.reduce((sum, value) => sum + value, 0) / logs.length;
  const variance = logs.reduce((sum, value) => sum + (value - meanLog) ** 2, 0) / Math.max(1, logs.length - 1);
  return Object.freeze({
    catalogCount: GALAXY_HALO_CATALOG.length,
    statisticCount: ratios.length,
    excludedCount: GALAXY_HALO_CATALOG.length - ratios.length,
    medianRatio: median(ratios),
    medianLogRatio: median(logs),
    meanLogRatio: meanLog,
    stdLogRatio: Math.sqrt(variance),
  });
}

export function galaxyHaloScenario(options = {}) {
  const galaxy = GALAXY_HALO_CATALOG.find(({ name }) => name === options.galaxyName)
    ?? GALAXY_HALO_CATALOG.find(({ name }) => name === GALAXY_HALO_DEFAULT.galaxyName)
    ?? GALAXY_HALO_CATALOG[0];
  const radiusKpc = Math.max(0.01, finite(options.radiusKpc, galaxy.radiusKpc));
  const vBarKms = Math.max(0, finite(options.vBarKms, galaxy.vBarKms));
  const vObsKms = Math.max(0, finite(options.vObsKms, galaxy.vObsKms));
  const xInf = Math.max(0.001, finite(options.xInf, X_INF_SAM));
  const radialBin = Math.min(HALO_RADIAL_BINS.length - 1, Math.max(0, Math.round(finite(options.radialBin, 4))));
  const radial = HALO_RADIAL_BINS[radialBin];
  const predictedMass = haloMass(radiusKpc, vBarKms, xInf);
  const measuredMass = measuredHaloMass(radiusKpc, vBarKms, vObsKms);
  const ratio = measuredMass > 0 ? predictedMass / measuredMass : Number.NaN;
  const canonicalInputs = close(radiusKpc, galaxy.radiusKpc)
    && close(vBarKms, galaxy.vBarKms)
    && close(vObsKms, galaxy.vObsKms)
    && close(xInf, X_INF_SAM);
  const override = canonicalInputs ? null : { name: galaxy.name, radiusKpc, vBarKms, vObsKms };

  return Object.freeze({
    status: canonicalInputs ? "CR033_SUBSTRATE_REPLAY" : "EXPLORATORY_SCENARIO",
    galaxy,
    radiusKpc,
    vBarKms,
    vObsKms,
    xInf,
    radialBin,
    radial,
    probeRadiusKpc: radiusKpc * radial.midpoint,
    radialHaloFraction: radial.x / (1 + radial.x),
    asymptoticHaloFraction: xInf / (1 + xInf),
    predictedMass,
    measuredMass,
    ratio,
    logRatio: Number.isFinite(ratio) && ratio > 0 ? Math.log10(ratio) : Number.NaN,
    predictedTotalVelocity: Math.sqrt((1 + xInf) * vBarKms ** 2),
    observedDarkFraction: vObsKms > 0 ? Math.max(vObsKms ** 2 - vBarKms ** 2, 0) / vObsKms ** 2 : 0,
    population: populationHaloStats(xInf, override),
  });
}

export { GALAXY_HALO_CATALOG };
