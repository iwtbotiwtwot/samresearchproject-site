import {
  ArchitectureDiagram,
  BoundaryNote,
  EquationBlock,
  NextRead,
  PageFrame,
  PageHero,
  Section,
  SourceDrawer,
  TypedReadoutTable,
} from "../../components/ResearchComponents.js";

const repo = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const dynamic = "force-static";

export const metadata = { title: "The Theory", description: "The conceptual spine of the SAM Research Project, from substrate and accumulation to finite grammar and exact computation.", alternates: { canonical: "/theory" } };

export default function TheoryPage() {
  return (
    <PageFrame active="/theory">
      <PageHero eyebrow="The conceptual spine" title={<>Matter, substrate, <em>and the retained record.</em></>} intro="SAM begins with a physical proposal: matter displaces a persistent substrate. The displacement accumulates, different experiments read it through different operators, and interaction can turn history into an exact record." compact />

      <Section id="matter-substrate" eyebrow="01 · Matter and substrate" title="Substrate is not a passive stage." intro="Matter and substrate remain different categories. Matter displaces a persistent relational structure; that accumulated displacement changes routes and can be retained as history.">
        <BoundaryNote title="Category boundary">Substrate is not matter. A carrier is not a container, and accumulated displacement is not automatically energy without a typed bridge.</BoundaryNote>
      </Section>

      <Section id="alphabet" eyebrow="02 · The small alphabet" title="Distinction, direction, and completion." tone="dark">
        <div className="sam-equation-grid"><EquationBlock label="Primitive closure" description="Three squared equals two cubed plus one equals nine">3² = 2³ + 1 = 9</EquationBlock><EquationBlock label="Partition alphabet" description="P equals the set one, two, three, four, six, eight, nine, twelve">𝒫 = {'{1, 2, 3, 4, 6, 8, 9, 12}'}</EquationBlock></div>
        <div className="sam-sector-grid">{[["R12","route radix and containment"],["Θ18","first overflow and carrier"],["F81","full face and tensor capacity"],["M126","retained matter capacity"],["N144","independent-union sector"],["L162","full record ledger"]].map(([value,role]) => <article key={value}><strong>{value}</strong><p>{role}</p></article>)}</div>
      </Section>

      <Section id="floor-lift" eyebrow="03 · Floor, lift, and completion" title="A universal floor is not a local field." intro="The baseline, local source history, and completion surface remain distinct objects.">
        <div className="sam-equation-grid"><EquationBlock label="Universal accumulation floor" description="A naught equals one over twelve pi">A₀ = 1 / 12π</EquationBlock><EquationBlock label="Local radial lift" description="A of r equals r s over r equals two G M over c squared r">A(r) = rₛ/r = 2GM/c²r</EquationBlock><EquationBlock label="Completion surface" description="A equals one">A = 1</EquationBlock></div>
      </Section>

      <Section id="typed-readouts" eyebrow="04 · One field, typed readouts" title="The operation is part of the observable." tone="dark">
        <TypedReadoutTable />
        <BoundaryNote title="Local-light boundary">Locally measured c remains invariant. An effective road speed is a coordinate or inferred-distance readout, not a new local value of light speed.</BoundaryNote>
      </Section>

      <Section id="finite-grammar" eyebrow="05 · Matter as finite grammar" title="The field folds into typed finite form." intro="Carriers transport overflow and history; containers retain finite structure. The 321-row source corpus is a typed grammar—not a claim that 321 particles exist—and the related 100-row SLC surface is a different object.">
        <ArchitectureDiagram label="The transition from field readout to exact computation" steps={["field read outward", "finite closure", "typed matter grammar", "interaction", "retained record", "exact computation"]} />
      </Section>

      <Section id="history" eyebrow="06 · Interaction and reciprocal history" title="State returns; history does not." tone="dark" intro="W8 is local non-contact availability. X1 holds transient reciprocal custody. W9 is the active target-write phase. After completion, X1 clears and the sites return to W8 with history retained.">
        <ArchitectureDiagram label="W8, X1, and W9 are phases of one interaction lifecycle" steps={["W8 availability", "X1 reciprocal custody", "W9 active write", "X1 clears", "W8 with retained history"]} />
        <SourceDrawer sources={[{label:"SAM conceptual spine",href:`${repo}/blob/main/SAM_CONCEPTUAL_SPINE.md`},{label:"Current global authority",href:`${repo}/blob/main/SAM_LIVE/00_CURRENT.md`},{label:"Website master brief",href:`${repo}/blob/main/SAM_WEBSITE_BUILDER_MASTER_BRIEF.md`}]} />
        <NextRead href="/volumes" title="Follow the three-volume dependency" body="Move from the shared conceptual spine into Substrate, Matter, and Computation." />
      </Section>
    </PageFrame>
  );
}
