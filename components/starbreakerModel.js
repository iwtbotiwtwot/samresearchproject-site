export const SAM_TENSOR_CEILING = 1 / 8;

export const STARBREAKER_CANONICAL = Object.freeze({
  totalAtoms: 2268,
  carrierAtoms: 252,
  matterAtoms: 1764,
  shadowAtoms: 252,
  shells: Object.freeze([
    { name: "core", atoms: 324, rMin: 0, rMax: 0.27, color: "#ff6f61" },
    { name: "heavy", atoms: 486, rMin: 0.27, rMax: 0.52, color: "#ffc857" },
    { name: "fusion", atoms: 648, rMin: 0.52, rMax: 0.76, color: "#79d98b" },
    { name: "outer", atoms: 810, rMin: 0.76, rMax: 1, color: "#63d8e6" },
  ]),
  supernova: Object.freeze({
    bounceEnergy: 1.18,
    carrierLeak: 0.84,
    ejectaAtoms: 1409,
    remnantAtoms: 859,
    residueAtoms: 825,
    residueClusters: 108,
    label: "successful supernova remnant",
  }),
  failed: Object.freeze({
    bounceEnergy: 0.72,
    carrierLeak: 0.42,
    ejectaAtoms: 358,
    remnantAtoms: 1910,
    residueAtoms: 302,
    residueClusters: 41,
    label: "failed-collapse dominated remnant",
  }),
});

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const lerp = (start, end, amount) => start + (end - start) * amount;

export function starbreakerScenario(options = {}) {
  const mode = options.mode === "failed" ? "failed" : "supernova";
  const canonical = STARBREAKER_CANONICAL[mode];
  const time = clamp(Number(options.time ?? 1), 0, 1);
  const bounceEnergy = clamp(Number(options.bounceEnergy ?? canonical.bounceEnergy), 0.2, 2);
  const carrierLeak = clamp(Number(options.carrierLeak ?? canonical.carrierLeak), 0, 1);
  const isCanonicalReference =
    Math.abs(bounceEnergy - canonical.bounceEnergy) < 1e-12 &&
    Math.abs(carrierLeak - canonical.carrierLeak) < 1e-12;
  const drive = Math.max(
    0.02,
    (bounceEnergy / canonical.bounceEnergy) * Math.max(0.03, carrierLeak / canonical.carrierLeak),
  );
  const canonicalEjectaFraction = canonical.ejectaAtoms / STARBREAKER_CANONICAL.totalAtoms;
  const ejectaFraction = clamp(canonicalEjectaFraction * Math.pow(drive, 0.72), 0.015, 0.94);
  const residueShareOfEjecta = canonical.residueAtoms / canonical.ejectaAtoms;
  const residueFraction = clamp(
    ejectaFraction * residueShareOfEjecta * Math.pow(drive, -0.08),
    0,
    ejectaFraction,
  );
  const ejectaAtoms = Math.round(STARBREAKER_CANONICAL.totalAtoms * ejectaFraction);
  const remnantAtoms = STARBREAKER_CANONICAL.totalAtoms - ejectaAtoms;
  const residueAtoms = Math.min(
    ejectaAtoms,
    Math.round(STARBREAKER_CANONICAL.totalAtoms * residueFraction),
  );
  const residueClusters = Math.max(1, Math.round(canonical.residueClusters * Math.pow(drive, 0.35)));
  const exposureScale = mode === "supernova" ? 0.72 : 0.12;
  const unlinkedTensorFraction = clamp(
    (exposureScale * drive * ejectaFraction) / canonicalEjectaFraction,
    0,
    1,
  );
  const tensorAmplitudeProxy = unlinkedTensorFraction * SAM_TENSOR_CEILING;
  const stage = time < 0.18 ? "star" : time < 0.47 ? "collapse" : time < 0.76 ? "bounce" : "residue";

  return {
    status: isCanonicalReference ? "CANONICAL_REPLAY" : "EXPLORATORY_SCENARIO",
    mode,
    time,
    stage,
    bounceEnergy,
    carrierLeak,
    totalAtoms: STARBREAKER_CANONICAL.totalAtoms,
    ejectaAtoms,
    remnantAtoms,
    residueAtoms,
    residueClusters,
    ejectaFraction,
    remnantFraction: 1 - ejectaFraction,
    residueFraction,
    unlinkedTensorFraction,
    tensorAmplitudeProxy,
    tensorCeiling: SAM_TENSOR_CEILING,
    remnantClass:
      ejectaFraction >= 0.42
        ? "successful supernova remnant"
        : "failed-collapse dominated remnant",
  };
}
