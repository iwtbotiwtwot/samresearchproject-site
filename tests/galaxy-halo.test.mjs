import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  GALAXY_HALO_CATALOG,
  G393_STACK,
  HALO_RADIAL_BINS,
  X_INF_SAM,
  galaxyHaloScenario,
  populationHaloStats,
} from "../components/galaxyHaloModel.js";

test("CR033 canonical replay matches the sealed population receipt", () => {
  const stats = populationHaloStats();
  assert.equal(GALAXY_HALO_CATALOG.length, 175);
  assert.equal(stats.statisticCount, 173);
  assert.equal(stats.excludedCount, 2);
  assert.ok(Math.abs(X_INF_SAM - 3.18309886183791) < 1e-13);
  assert.ok(Math.abs(stats.medianRatio - 0.999283518662) < 1e-12);
  assert.ok(Math.abs(stats.medianLogRatio - (-0.000311275416)) < 1e-12);
  assert.ok(Math.abs(stats.meanLogRatio - 0.043009608663) < 1e-12);
  assert.ok(Math.abs(stats.stdLogRatio - 0.380177831121) < 1e-12);
});

test("CR031b radial surface uses the five sealed bins without generated points", () => {
  assert.deepEqual(HALO_RADIAL_BINS.map(({ x }) => x), [1.1513, 1.7271, 2.4224, 2.6832, 3.1225]);
  assert.deepEqual(HALO_RADIAL_BINS.map(({ spread }) => spread), [0.6137, 0.4477, 0.4347, 0.4042, 0.396]);
});

test("catalog edits are typed as exploratory and update the population", () => {
  const canonical = galaxyHaloScenario({ galaxyName: "NGC3198" });
  const adjusted = galaxyHaloScenario({ galaxyName: "NGC3198", xInf: 4 });
  assert.equal(canonical.status, "CR033_SUBSTRATE_REPLAY");
  assert.equal(adjusted.status, "EXPLORATORY_SCENARIO");
  assert.ok(adjusted.predictedMass > canonical.predictedMass);
  assert.ok(adjusted.population.medianRatio > canonical.population.medianRatio);
});

test("G393 observed-v-squared stack closes to 100 percent", () => {
  const total = G393_STACK.baryonObservedPercent
    + G393_STACK.pbhEnvelopeObservedPercent
    + G393_STACK.organizationOpenObservedPercent;
  assert.ok(Math.abs(total - 100) < 1e-12);
});

test("galaxy halo page exposes the instrument, receipt, chronology, and current frontier", async () => {
  const page = await readFile(new URL("../app/galaxy-halos/page.js", import.meta.url), "utf8");
  const instrument = await readFile(new URL("../components/GalaxyHaloStack.js", import.meta.url), "utf8");
  assert.match(page, /Galaxy Halo Stack/);
  assert.match(page, /G393/);
  assert.match(page, /CR031b/);
  assert.match(page, /CR032/);
  assert.match(page, /CR033/);
  assert.match(page, /10\/π/);
  assert.match(page, /prospective non-SPARC catalog/i);
  assert.match(instrument, /Get receipt/);
  assert.match(instrument, /Run radial scan/);
});
