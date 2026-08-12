import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  STARBREAKER_CANONICAL,
  starbreakerScenario,
} from "../components/starbreakerModel.js";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Starbreaker canonical presets reproduce the recovered workbench readouts", () => {
  const supernova = starbreakerScenario({
    mode: "supernova",
    time: 1,
    bounceEnergy: STARBREAKER_CANONICAL.supernova.bounceEnergy,
    carrierLeak: STARBREAKER_CANONICAL.supernova.carrierLeak,
  });
  assert.equal(supernova.status, "PLAYGROUND_NOT_CR");
  assert.equal(supernova.stage, "residue");
  assert.equal(supernova.ejectaAtoms, 1409);
  assert.equal(supernova.remnantAtoms, 859);
  assert.equal(supernova.residueAtoms, 825);
  assert.equal(supernova.tensorAmplitudeProxy, 0.09);

  const failed = starbreakerScenario({
    mode: "failed",
    time: 1,
    bounceEnergy: STARBREAKER_CANONICAL.failed.bounceEnergy,
    carrierLeak: STARBREAKER_CANONICAL.failed.carrierLeak,
  });
  assert.equal(failed.ejectaAtoms, 358);
  assert.equal(failed.remnantAtoms, 1910);
  assert.equal(failed.residueAtoms, 302);
  assert.equal(failed.tensorAmplitudeProxy, 0.015);
});

test("Starbreaker evolution crosses the four recovered stage gates", () => {
  assert.equal(starbreakerScenario({ time: 0 }).stage, "star");
  assert.equal(starbreakerScenario({ time: 0.18 }).stage, "collapse");
  assert.equal(starbreakerScenario({ time: 0.47 }).stage, "bounce");
  assert.equal(starbreakerScenario({ time: 0.76 }).stage, "residue");
});

test("the public plate retains controls, replay, provenance, and its scientific boundary", async () => {
  const [page, plate] = await Promise.all([
    read("app/starbreaker/page.js"),
    read("components/StarbreakerPlate.js"),
  ]);
  assert.match(page, /Recovered Starbreaker browser workbench/);
  assert.match(page, /not detector-calibrated observables/);
  assert.match(plate, /Evolution time/);
  assert.match(plate, /Event energy/);
  assert.match(plate, /Carrier leakage/);
  assert.match(plate, /Run sequence/);
  assert.match(plate, /Export JSON/);
  assert.match(plate, /PLAYGROUND_NOT_CR|Illustrative playground/);
});
