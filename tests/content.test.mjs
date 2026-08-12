import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { allRoutes, repositories, searchEntries, site, volumeDownloads } from "../index.js";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("site identity and route inventory match the current brief", () => {
  assert.equal(site.url, "https://samresearchproject.org");
  assert.equal(site.author, "Sean Brady");
  assert.equal(new Set(allRoutes).size, allRoutes.length);
  for (const route of ["/theory", "/volumes", "/volume-i", "/volume-ii", "/volume-iii", "/slc", "/starbreaker", "/riemann-hypothesis", "/mersenne-search", "/research-record", "/repositories", "/downloads", "/stewardship", "/about"]) assert.ok(allRoutes.includes(route));
});

test("search indexes exact version and campaign identifiers", () => {
  const index = searchEntries.map(({ title, terms }) => `${title} ${terms}`).join(" ");
  assert.match(index, /SLCV1\.2-H14F-EA18WA-D9/);
  assert.match(index, /H000143/);
  assert.match(index, /SLCMP4483/);
  assert.match(index, /Exact Write/);
});

test("the public repository constellation uses the exact five HTTPS routes", () => {
  assert.equal(repositories.length, 5);
  assert.deepEqual(repositories.map(({ name }) => name), ["SAM Research Project", "Substrate Ledger Computer", "Riemann Hypothesis Program", "Mersenne Prime Search", "The Courtroom"]);
  assert.ok(repositories.every(({ url }) => url.startsWith("https://github.com/iwtbotiwtwot/")));
});

test("the newest complete trilogy is wired with checksums", () => {
  assert.equal(volumeDownloads.length, 3);
  assert.ok(volumeDownloads.every(({ href }) => href.includes("2026-08-11_SAM_THREE_VOLUMES_FULL")));
  assert.ok(volumeDownloads.every(({ checksum }) => /^[a-f0-9]{64}$/.test(checksum)));
});

test("current SLC, RH, and Mersenne boundaries are preserved", async () => {
  const [slc, rh, mp] = await Promise.all([read("app/slc/page.js"), read("app/riemann-hypothesis/page.js"), read("app/mersenne-search/page.js")]);
  assert.match(slc, /SLCV1\.2-H14F-EA18WA-D9/);
  assert.match(slc, /does not currently contain a raw-exponent jump or assign Mersenne primality/i);
  assert.match(rh, /the SAM proof claim/);
  assert.doesNotMatch(rh, /external validation result/i);
  assert.match(mp, /Production status: owner-paused/);
  assert.match(mp, /54,385,839/);
  assert.match(mp, /16,841,125/);
  assert.match(mp, /37,544,714/);
  assert.match(mp, /SLCMP4484 is locally computed and validated 12\/12/);
});

test("scientific category mistakes do not appear on public pages", async () => {
  const paths = ["app/page.js", "app/theory/page.js", "app/volume-ii/page.js", "app/volume-iii/page.js", "app/mersenne-search/page.js"];
  const content = (await Promise.all(paths.map(read))).join("\n");
  assert.doesNotMatch(content, /SAM discovered 54 million/i);
  assert.doesNotMatch(content, /production is (live|running)/i);
  assert.match(content, /321-row source (corpus|grammar) is a typed grammar/i);
  assert.match(content, /not a claim that 321 particles exist/i);
  assert.match(content, /Lucas–Lehmer remains the separate Mersenne-primality authority/);
});

test("stewardship and attribution remain explicit", async () => {
  const [about, stewardship] = await Promise.all([read("app/about/page.js"), read("app/stewardship/page.js")]);
  assert.match(about, /originator and conceptual director/);
  assert.match(about, /OpenAI Codex is a technical research collaborator/);
  assert.match(about, /SAM is not an OpenAI product/);
  assert.match(stewardship, /Build outward/);
  assert.match(stewardship, /AGPL-3\.0-or-later/);
  assert.match(stewardship, /CC-BY-SA-4\.0/);
});
