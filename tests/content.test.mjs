import assert from "node:assert/strict";
import test from "node:test";

import { publicPrograms, site } from "../index.js";

test("site metadata points at the public domain", () => {
  assert.equal(site.url, "https://samresearchproject.org");
  assert.equal(site.domain, "samresearchproject.org");
});

test("public program navigation includes SLC and Starbreaker", () => {
  const names = publicPrograms.map(({ name }) => name);
  assert.ok(names.includes("SLC Emulator"));
  assert.ok(names.includes("Starbreaker"));
});

test("protected programs carry a public boundary in their summaries", () => {
  const protectedPrograms = publicPrograms.filter(({ name }) =>
    ["SLC Emulator", "Starbreaker"].includes(name),
  );
  assert.ok(protectedPrograms.every(({ description }) => /public|protected|disclosure/i.test(description)));
});
