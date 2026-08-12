import { BoundaryNote, ButtonLink, EquationBlock, NextRead, PageFrame, PageHero, Section, SourceDrawer, StatusPill } from "../../components/ResearchComponents.js";

const mp = "https://github.com/iwtbotiwtwot/mersenne-prime-search";
const sam = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const dynamic = "force-static";

export const metadata = { title: "Mersenne Search", description: "SAM's owner-paused clean-sheet Mersenne candidate-screening program and public exact receipts.", alternates: { canonical: "/mersenne-search" } };

export default function MersenneSearchPage() {
  return (
    <PageFrame active="/starbreaker" className="sam-mersenne-page">
      <PageHero eyebrow="Application · Clean-sheet Mersenne computation" title={<>Exact factors, reciprocal voices, <em>candidate custody.</em></>} intro="SAM's clean-sheet Mersenne program uses an informational prime ruler, reciprocal voices, dyadic beats, exact factor coordinates, and SLC custody to screen and preserve candidate work. Exact factors assign compositeness; survivors remain primality-unassigned for the separate primality authority." status={<StatusPill tone="paused">Production status: owner-paused</StatusPill>} actions={<ButtonLink href={mp} external>Open public candidate records</ButtonLink>} compact />

      <Section eyebrow="01 · Prime ruler and beats within beats" title="A closed chart with exact modular state." tone="dark" intro="Prime marks—not composite integers—sit on an exact closed two-dimensional spherical chart. Alpha, beta, and adjacent-prime gamma voices evolve through repeated dyadic squaring; nested relative returns are the project's beats within beats.">
        <div className="sam-equation-grid"><EquationBlock label="Prime-ruler chart" description="x equals tangent chi over two; S of x is an exact rational sphere point">x = tan(χ/2) · S(x) = (2x/(1+x²), (1−x²)/(1+x²))</EquationBlock><EquationBlock label="Exact factor coordinate" description="q equals two k p plus one">q = 2kp + 1</EquationBlock></div>
        <BoundaryNote title="Primality boundary">An exact factor assigns compositeness. A survivor means no factor was found in the declared SAM schedule. Primality-unassigned means SAM has not assigned primality. Lucas–Lehmer remains the separate Mersenne-primality authority.</BoundaryNote>
      </Section>

      <Section eyebrow="02 · Public production" title="Published through SLCMP4483." intro="Production is paused by owner instruction. No producer process and no owner-stop watcher are running.">
        <div className="sam-metric-grid"><article><strong>2,052,000,000</strong><span>published p endpoint</span></article><article><strong>54,385,839</strong><span>public survivor rows</span></article><article><strong>SLCMP4483</strong><span>last published block</span></article><article><strong>35,249</strong><span>local SLCMP4484 rows · not public</span></article></div>
        <BoundaryNote title="Frozen next block">SLCMP4484 is locally computed and validated 12/12. It remains unpublished and is not included in the public total. Any owner-authorized resume must reconcile and publish it before starting SLCMP4485.</BoundaryNote>
      </Section>

      <Section eyebrow="03 · Provenance" title="Reproduced below one billion; independently generated beyond it." tone="dark">
        <div className="sam-provenance-split"><article><strong>16,841,125</strong><h3>At or below one billion</h3><p>Public survivors substantially overlapping PrimeNet's pre-existing untested candidate universe.</p></article><article><strong>37,544,714</strong><h3>Above one billion</h3><p>Public survivors beyond PrimeNet's official database range, independently enumerated and screened by SAM.</p></article></div>
        <p className="sam-central-quote">SAM reproduced and screened the below-billion candidate surface, then independently generated and screened a public candidate surface beyond PrimeNet's official range.</p>
        <BoundaryNote>These are candidate records, not newly discovered prime numbers or primality assignments. The unpublished SLCMP4484 rows are excluded from both public counts.</BoundaryNote>
        <SourceDrawer sources={[{label:"Mersenne public repository",href:mp},{label:"Current SLC and Mersenne authority",href:`${sam}/blob/main/SAM_LIVE/01_SLC_CURRENT.md`},{label:"Canonical SAM Mersenne continuity",href:`${sam}/blob/main/SAM_IN_MERSENNE_SEARCH.md`},{label:"Volume III technical spine",href:`${sam}/blob/main/volume_III/SAM_VOLUME_III_COMPUTATION_TECHNICAL_SPINE.md`}]} />
        <NextRead href="/research-record" title="Research Record" body="Inspect how executed results, falsifications, faults, corrections, successors, and paused campaigns are typed." />
      </Section>
    </PageFrame>
  );
}
