const SAM_REPO = "https://github.com/iwtbotiwtwot/SAM_Research_Project";
const EXPORT_ROOT = `${SAM_REPO}/raw/refs/heads/main/PDF_EXPORTS/2026-08-11_SAM_THREE_VOLUMES_FULL`;

export const site = Object.freeze({
  name: "SAM Research Project",
  shortName: "SAM",
  domain: "samresearchproject.org",
  url: "https://samresearchproject.org",
  description:
    "Sean Brady's public three-volume SAM Research Project: substrate, matter, and exact computation.",
  author: "Sean Brady",
  collaborator: "OpenAI Codex",
});

export const primaryRoutes = Object.freeze([
  { href: "/theory", label: "Theory" },
  { href: "/volumes", label: "Volumes" },
  { href: "/slc", label: "SLC" },
  { href: "/starbreaker", label: "Applications" },
  { href: "/research-record", label: "Research record" },
  { href: "/downloads", label: "Downloads" },
]);

export const applicationRoutes = Object.freeze([
  { href: "/starbreaker", label: "Starbreaker" },
  { href: "/galaxy-halos", label: "Galaxy Halos" },
  { href: "/riemann-hypothesis", label: "Riemann Hypothesis" },
  { href: "/mersenne-search", label: "Mersenne Search" },
]);

export const allRoutes = Object.freeze([
  "/",
  "/theory",
  "/volumes",
  "/volume-i",
  "/volume-ii",
  "/volume-iii",
  "/slc",
  "/starbreaker",
  "/galaxy-halos",
  "/riemann-hypothesis",
  "/mersenne-search",
  "/research-record",
  "/repositories",
  "/downloads",
  "/stewardship",
  "/about",
  "/search",
  "/computational-research",
]);

export const searchEntries = Object.freeze([
  { title: "The Theory", href: "/theory", type: "Page", terms: "substrate accumulation floor A0 A(r) local lift typed readout completion" },
  { title: "Volume I — Substrate", href: "/volume-i", type: "Volume", terms: "kernel weak field clocks photon road distance cosmology" },
  { title: "Volume II — Matter", href: "/volume-ii", type: "Volume", terms: "321-row grammar 100-row grammar carrier container binding isotope tensor" },
  { title: "Volume III — Computation", href: "/volume-iii", type: "Volume", terms: "H14F exact state space reciprocal history" },
  { title: "Substrate Ledger Computer", href: "/slc", type: "Software", terms: "SLC SLCV1.2-H14F-EA18WA-D9 Exact Algebra of the Write Exact Write EA directional Weil adapter WA D1 D9 T18" },
  { title: "Starbreaker", href: "/starbreaker", type: "Application", terms: "matter GW formation history M126 N144 L162 W8 X1 W9" },
  { title: "Galaxy Halo Stack", href: "/galaxy-halos", type: "Application", terms: "galaxy halos SPARC CR031b CR032 CR033 G393 X_inf 10/pi radial law halo mass" },
  { title: "Riemann Hypothesis Program", href: "/riemann-hypothesis", type: "Application", terms: "RH reciprocal history SAM proof claim completed Weil form xi Gamma radix-12" },
  { title: "Mersenne Search", href: "/mersenne-search", type: "Application", terms: "MP prime ruler beats within beats Lucas-Lehmer SLCMP4483 SLCMP4484 owner-paused" },
  { title: "SLCV1.2 Depth-9", href: "/research-record#slcv1.2-d9", type: "Campaign", terms: "SLCV1.2-D9 H000143 60123392 25/25 frozen promotion" },
  { title: "Starbreaker unified application", href: "/research-record#starbreaker", type: "Campaign", terms: "78/78 2976 35712 H000054" },
  { title: "T6B thermodynamic response", href: "/research-record#t6b", type: "Campaign", terms: "H000055 implementation fault correction possible" },
  { title: "MP-A0STOP4", href: "/research-record#mp-a0stop4", type: "Campaign", terms: "A0 scheduler 695 710 falsifies concept" },
  { title: "SLCMP4483 public production", href: "/research-record#slcmp4483", type: "Campaign", terms: "H000157 paused 2052000000 54385839" },
  { title: "Downloads", href: "/downloads", type: "Page", terms: "PDF trilogy SHA256 checksums BUILD_RECEIPT 2026-08-11" },
  { title: "Repositories", href: "/repositories", type: "Page", terms: "GitHub source clone HTTPS" },
  { title: "Stewardship", href: "/stewardship", type: "Page", terms: "outward not upward AGPL CC BY-SA covenant license" },
]);

export const publicPrograms = Object.freeze([
  {
    index: "01",
    name: "Volume I — Substrate",
    label: "Field and readout",
    href: "/volume-i",
    accent: "cyan",
    description:
      "One accumulation field with typed physical readouts: gradients, clocks, photon roads, distance, completion, cosmology, and release.",
  },
  {
    index: "02",
    name: "Volume II — Matter",
    label: "Finite closure",
    href: "/volume-ii",
    accent: "amber",
    description:
      "The field folded into finite form: carriers, containers, binding, nuclei, isotopes, periodic matter, and tensor return.",
  },
  {
    index: "03",
    name: "Volume III — Computation",
    label: "Retained record",
    href: "/volume-iii",
    accent: "violet",
    description:
      "Retained grammar and directional history become exact computation through SLC, Starbreaker, Reciprocal History, and prime search.",
  },
  {
    index: "A1",
    name: "Starbreaker",
    label: "Formation history",
    href: "/starbreaker",
    accent: "amber",
    description:
      "SAM's native matter and gravitational-wave formation-history application, with its own exact ledgers and readouts.",
  },
  {
    index: "A2",
    name: "Galaxy Halo Stack",
    label: "SPARC population surface",
    href: "/galaxy-halos",
    accent: "cyan",
    description:
      "A 175-galaxy radial and halo-mass instrument joining the G393 forward stack to CR031b, CR032, and the 10/π substrate identity.",
  },
  {
    index: "A3",
    name: "Riemann Hypothesis Program",
    label: "Reciprocal history",
    href: "/riemann-hypothesis",
    accent: "violet",
    description:
      "The public SAM proof claim through reciprocal histories, a radix-12 prime tower, completion, and an exact completed Weil form.",
  },
  {
    index: "A4",
    name: "Mersenne Search",
    label: "Exact candidate custody",
    href: "/mersenne-search",
    accent: "coral",
    description:
      "Exact factor screening and public candidate custody, with survivors kept primality-unassigned for Lucas–Lehmer.",
  },
]);

export const repositories = Object.freeze([
  {
    name: "SAM Research Project",
    url: SAM_REPO,
    role: "Full three-volume working research, provenance, live authority, PDFs, and cross-domain artifacts.",
    first: `${SAM_REPO}/blob/main/README.md`,
    license: "Repository terms",
  },
  {
    name: "Substrate Ledger Computer",
    url: "https://github.com/iwtbotiwtwot/substrate-ledger-computer",
    role: "Standalone runnable SLC lineage, current v1.2 stack, Exact Write, Weil adapter, and SAM Language.",
    first: "https://github.com/iwtbotiwtwot/substrate-ledger-computer/blob/main/README.md",
    license: "AGPL-3.0-or-later · CC BY-SA 4.0",
  },
  {
    name: "Riemann Hypothesis Program",
    url: "https://github.com/iwtbotiwtwot/riemann-hypothesis-program",
    role: "Standalone SAM proof-claim surface and its public mathematical materials.",
    first: "https://github.com/iwtbotiwtwot/riemann-hypothesis-program/blob/main/README.md",
    license: "See controlling repository terms",
  },
  {
    name: "Mersenne Prime Search",
    url: "https://github.com/iwtbotiwtwot/mersenne-prime-search",
    role: "Public candidate rosters, rolling receipts, and the clean-sheet Mersenne record.",
    first: "https://github.com/iwtbotiwtwot/mersenne-prime-search/blob/main/README.md",
    license: "See controlling repository terms",
  },
  {
    name: "The Courtroom",
    url: "https://github.com/iwtbotiwtwot/The_Courtroom",
    role: "Preserved established-reference work and much of the path leading toward SLC.",
    first: "https://github.com/iwtbotiwtwot/The_Courtroom/blob/main/README.md",
    license: "See controlling repository terms",
  },
]);

export const volumeDownloads = Object.freeze([
  {
    volume: "I",
    title: "Substrate",
    description: "Accumulation, roads, typed physical readout, strong field, and cosmology.",
    pages: 32,
    size: "421 KB",
    checksum: "f707077d8890c918eca0f0e90b76ca461a48f48916b81bad36ebc4c0d64235b5",
    href: `${EXPORT_ROOT}/SAM_VOLUME_I_SUBSTRATE_TECHNICAL_SPINE.pdf`,
    source: `${SAM_REPO}/blob/main/volume_I/SAM_VOLUME_I_SUBSTRATE_TECHNICAL_SPINE.md`,
  },
  {
    volume: "II",
    title: "Matter",
    description: "Finite closure, carrier and container roles, binding, isotopes, and tensor return.",
    pages: 33,
    size: "432 KB",
    checksum: "15d90be8463d8020554d98f4bc615a35ee75787d5c934b253d854c81f28ea02c",
    href: `${EXPORT_ROOT}/SAM_VOLUME_II_MATTER_TECHNICAL_SPINE.pdf`,
    source: `${SAM_REPO}/blob/main/volume_II/SAM_VOLUME_II_MATTER_TECHNICAL_SPINE.md`,
  },
  {
    volume: "III",
    title: "Computation",
    description: "Exact state spaces, current SLC, Starbreaker, reciprocal history, and Mersenne work.",
    pages: 46,
    size: "590 KB",
    checksum: "6c1777330e6a8f78818a0004e20b6bbdd28e6bcdeda5073d4d12803328ac1c36",
    href: `${EXPORT_ROOT}/SAM_VOLUME_III_COMPUTATION_TECHNICAL_SPINE.pdf`,
    source: `${SAM_REPO}/blob/main/volume_III/SAM_VOLUME_III_COMPUTATION_TECHNICAL_SPINE.md`,
  },
]);

export const downloadVerification = Object.freeze({
  checksums: `${EXPORT_ROOT}/SHA256SUMS.txt`,
  receipt: `${SAM_REPO}/blob/main/PDF_EXPORTS/2026-08-11_SAM_THREE_VOLUMES_FULL/BUILD_RECEIPT.md`,
  directory: `${SAM_REPO}/tree/main/PDF_EXPORTS/2026-08-11_SAM_THREE_VOLUMES_FULL`,
});

// Compatibility alias retained for links and tests from the first public build.
export const programRoutes = primaryRoutes;
