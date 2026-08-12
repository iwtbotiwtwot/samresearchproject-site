import RiemannDiagram from "../../components/RiemannDiagram.js";
import { ArchitectureDiagram, BoundaryNote, ButtonLink, EquationBlock, NextRead, PageFrame, PageHero, Section, SourceDrawer, StatusPill } from "../../components/ResearchComponents.js";

const rh = "https://github.com/iwtbotiwtwot/riemann-hypothesis-program";
const sam = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const metadata = { title: "Riemann Hypothesis Program", description: "The SAM proof claim through reciprocal directed histories, radix-12 prime structure, completion, and an exact completed Weil form.", alternates: { canonical: "/riemann-hypothesis" } };

export default function RiemannHypothesisPage() {
  return (
    <PageFrame active="/starbreaker" className="sam-rh-page">
      <PageHero eyebrow="Application · Reciprocal History / RH" title={<>The SAM Riemann Hypothesis <em>Program.</em></>} intro="The SAM Riemann Hypothesis Program joins reciprocal directed histories, a radix-12 prime tower, the A-derived logarithmic radial coordinate, pi/Gamma completion, and an exact completed Weil-form route. Its standalone public repository presents the SAM proof claim and the technical chain supporting that presentation." status={<StatusPill tone="claim">the SAM proof claim</StatusPill>} actions={<ButtonLink href={rh} external>Open the RH repository</ButtonLink>}><RiemannDiagram /></PageHero>

      <Section eyebrow="01 · Conceptual route" title="Directed history meets arithmetic completion." tone="dark">
        <ArchitectureDiagram label="The SAM reciprocal-history completion route" steps={["directed reciprocal histories", "radix-12 prime tower", "A-derived logarithmic route", "pi and Gamma completion", "completed xi structure", "exact completed Weil form"]} />
      </Section>

      <Section eyebrow="02 · Radial coordinate" title="Multiplicative scale becomes additive translation.">
        <div className="sam-equation-grid"><EquationBlock label="Normalized radial coordinate" description="q equals A total minus A naught over one minus A naught equals r c over r">q = (A_total − A₀) / (1 − A₀) = r_c / r</EquationBlock><EquationBlock label="Logarithmic route" description="u equals negative log q">u = −log q</EquationBlock></div>
        <p className="sam-long-copy">The arithmetic route supplies ordinary primes and von Mangoldt weights. Completion supplies π, Gamma, pole, trivial-zero, and reciprocal structure.</p>
      </Section>

      <Section eyebrow="03 · Editorial boundary" title="The public claim and the status record remain exact." tone="dark">
        <BoundaryNote>Use the phrase “the SAM proof claim.” No external review, prize, submission, or institutional endorsement is stated here. Separate internal assignments and optional research branches are not recast as publication gates.</BoundaryNote>
        <SourceDrawer sources={[{label:"Standalone RH repository",href:rh},{label:"Controlling RH status",href:`${rh}/blob/main/STATUS.md`},{label:"Reciprocal-history live authority",href:`${sam}/blob/main/SAM_LIVE/02_RH_CURRENT.md`},{label:"Volume III technical spine",href:`${sam}/blob/main/volume_III/SAM_VOLUME_III_COMPUTATION_TECHNICAL_SPINE.md`}]} />
        <NextRead href="/mersenne-search" title="Mersenne Search" body="See reciprocal voices and dyadic return compiled into exact factor screening and public candidate custody." />
      </Section>
    </PageFrame>
  );
}
