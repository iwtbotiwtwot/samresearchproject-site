import {
  ArchitectureDiagram,
  BoundaryNote,
  ButtonLink,
  NextRead,
  PageFrame,
  PageHero,
  ResultReceipt,
  Section,
  SourceDrawer,
  StatusPill,
  VersionBadge,
} from "../../components/ResearchComponents.js";

const slc = "https://github.com/iwtbotiwtwot/substrate-ledger-computer";
const sam = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const metadata = { title: "Substrate Ledger Computer", description: "The current public SLCV1.2 architecture, runnable stack, exact components, receipts, and preserved lineage.", alternates: { canonical: "/slc" } };

export default function SlcPage() {
  const softwareSourceCode = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Substrate Ledger Computer",
    codeRepository: slc,
    programmingLanguage: ["Python", "C"],
    runtimePlatform: "Linux or another Unix-like environment",
    version: "SLCV1.2-H14F-EA18WA-D9",
    license: `${slc}/blob/main/LICENSE.md`,
    author: { "@type": "Person", name: "Sean Brady" },
  };
  return (
    <PageFrame active="/slc" className="sam-slc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSourceCode) }} />
      <PageHero
        eyebrow="Substrate Ledger Computer · Public and runnable"
        title={<>Exact typed computation, <em>with history retained.</em></>}
        intro="SLC turns typed grammar, retained boundary structure, exact write, and reciprocal history into reproducible state-space computation. It asks which distinctions, quotients, fibers, boundaries, and histories must remain live to reproduce the declared object exactly."
        status={<><StatusPill>sole current frozen revision</StatusPill><VersionBadge>SLCV1.2-H14F-EA18WA-D9</VersionBadge></>}
        actions={<><ButtonLink href={slc} external>Open the SLC repository</ButtonLink><ButtonLink href="#run" tone="secondary">Run SLCV1.2</ButtonLink></>}
      />

      <Section eyebrow="01 · Current stack" title="One frozen architecture, six installed roles." tone="dark">
        <ArchitectureDiagram label="SLCV1.2 assembled architecture" steps={["typed source grammar", "H14F structure-first route", "complete Exact Algebra of the Write", "dyadic depths 1–9", "directional Weil history adapter", "typed exact readout and receipt"]} />
        <div className="sam-component-grid">
          {[["SLCV1.2","sole active frozen revision"],["H14F","grammar-directed structure-first route"],["Exact Write","complete typed write algebra"],["D1–D9","frozen dyadic block depths"],["Weil adapter","reciprocal directional-history receipt"],["T18","carrier/history map retained in exact applications"]].map(([name,role]) => <article key={name}><strong>{name}</strong><p>{role}</p></article>)}
        </div>
      </Section>

      <Section id="run" eyebrow="02 · Run surface" title="Clone, validate, and reproduce the public demo." intro="Requirements: Linux or another Unix-like environment, Python 3.10 or newer, NumPy, and a C11 compiler such as GCC.">
        <pre className="sam-code"><code>{`git clone https://github.com/iwtbotiwtwot/substrate-ledger-computer.git
cd substrate-ledger-computer
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python slc.py info
python slc.py validate
python slc.py demo --steps 17`}</code></pre>
        <p className="sam-long-copy">The entry point builds the small native Exact Write library when needed. Validation checks every installed dyadic depth, reversible-history reconstruction, and compiled versus sequential Exact Write execution.</p>
        <ButtonLink href={`${slc}/blob/main/README.md`} tone="secondary" external>Read full run instructions</ButtonLink>
      </Section>

      <Section eyebrow="03 · Exactness and receipts" title="Exact names a reproducible discrete object." tone="dark" intro="The implementation preserves exact modular or integer operations, type boundaries, deterministic serialization, component seals, and reconstructible output receipts. It does not mean every physical interpretation is complete.">
        <ResultReceipt title="SLCV1.2 depth-9 installation" rows={[["training cases","60,123,392"],["training failures","0"],["corrected validation","25/25"],["installed depths","1–9"],["lineage","71 preserved versions"]]} classification="The test result suggests strong contact with the concept." />
      </Section>

      <Section eyebrow="04 · Version lineage" title="Predecessors remain visible." intro="Every version before v1.2 is preserved inactive and noncurrent. The authoritative selector is CURRENT_SLC_REVISION.json; historical names remain intact so contracts, imports, and receipts stay intelligible.">
        <div className="sam-lineage" aria-label="SLC version lineage summary"><span>v0.01–v0.04<small>dense and active-fiber development</small></span><i>→</i><span>v0.5<small>H14F structure-first routing</small></span><i>→</i><span>v1.0–v1.1<small>Exact Write and Weil predecessors</small></span><i>→</i><span className="is-current">v1.2<small>current · H14F · EA18WA · D9</small></span></div>
        <BoundaryNote>SLC preserves exact typed computation and can assign compositeness through reconstructed factors. It does not currently contain a raw-exponent jump or assign Mersenne primality.</BoundaryNote>
        <SourceDrawer sources={[{label:"Standalone SLC README",href:`${slc}/blob/main/README.md`},{label:"Current revision pointer",href:`${slc}/blob/main/SLC/18_SAM_NATIVE_QC/CURRENT_SLC_REVISION.json`},{label:"SLC current authority",href:`${sam}/blob/main/SAM_LIVE/01_SLC_CURRENT.md`},{label:"Public export boundary",href:`${slc}/blob/main/PUBLIC_EXPORT_BOUNDARY.md`},{label:"License policy",href:`${slc}/blob/main/LICENSE.md`},{label:"Stewardship covenant",href:`${slc}/blob/main/STEWARDSHIP.md`}]} />
        <NextRead href="/volume-iii" title="Volume III — Computation" body="Read the complete technical line behind H14F, Exact Write, dyadic depth, and reciprocal history." />
      </Section>
    </PageFrame>
  );
}
