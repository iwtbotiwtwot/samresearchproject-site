import FieldDiagram from "../components/FieldDiagram.js";
import {
  ArchitectureDiagram,
  ButtonLink,
  PageFrame,
  PageHero,
  Section,
  StewardshipCallout,
  TypedReadoutTable,
  VersionBadge,
  VolumeCard,
} from "../components/ResearchComponents.js";
import { publicPrograms } from "../index.js";

const volumes = publicPrograms.slice(0, 3);
const applications = publicPrograms.slice(3);

export default function Home() {
  return (
    <PageFrame active="/" className="sam-home">
      <PageHero
        eyebrow="Public working research · Three volumes · Exact receipts"
        title={<>Matter displaces the substrate. <em>The displacement accumulates.</em> The record computes.</>}
        intro="The SAM Research Project is Sean Brady's public three-volume investigation connecting substrate physics, finite matter, and exact computation. Read the theory, download the full volumes, inspect the complete SLC lineage, and follow the record into Starbreaker, Reciprocal History, and Mersenne search."
        actions={<><ButtonLink href="/theory">Enter the theory</ButtonLink><ButtonLink href="/downloads" tone="secondary">Download the three volumes</ButtonLink><ButtonLink href="/slc" tone="ghost">Run the SLC</ButtonLink><ButtonLink href="/repositories" tone="text">Open the repositories</ButtonLink></>}
      >
        <FieldDiagram />
      </PageHero>

      <Section eyebrow="01 · One dependency chain" title="Three volumes. One accumulated structure." intro="The trilogy moves from field, to finite form, to retained record. Each volume supplies the next one with its working object." tone="dark" wide>
        <div className="sam-volume-spine">
          {volumes.map((volume) => <VolumeCard key={volume.href} volume={volume.index} title={volume.name.replace(/^Volume [IVX]+ — /, "")} description={volume.description} href={volume.href} accent={volume.accent} />)}
        </div>
      </Section>

      <Section eyebrow="02 · Measurement discipline" title="One field, typed readouts." intro="Different experiments can read the same accumulated structure without performing the same operation.">
        <TypedReadoutTable />
      </Section>

      <Section eyebrow="03 · From field to computer" title="Interaction turns route into record." tone="dark">
        <ArchitectureDiagram
          label="The project dependency from substrate displacement to exact computation"
          steps={["matter displaces substrate", "displacement accumulates", "physical readouts", "finite matter grammar", "interaction writes history", "exact computation"]}
        />
      </Section>

      <Section eyebrow="04 · Current computational surface" title="Current frozen SLC" intro="The current architecture joins grammar-directed H14F computation, the complete Exact Algebra of the Write, validated dyadic depths 1–9, and a directional Weil history adapter.">
        <div className="sam-current-stack">
          <VersionBadge />
          <p>The complete public lineage preserves all 71 versions, with every predecessor visibly inactive and noncurrent.</p>
          <ButtonLink href="/slc">Explore and run SLCV1.2</ButtonLink>
        </div>
      </Section>

      <Section eyebrow="05 · Applications" title="Three distinct applications of the architecture." intro="Mersenne Search is one branch of SAM, not its whole identity." tone="dark" wide>
        <div className="sam-application-grid">
          {applications.map((program) => (
            <a className={`sam-application-card sam-application-card--${program.accent}`} href={program.href} key={program.href}>
              <span>{program.index}</span><h3>{program.name}</h3><p>{program.description}</p><strong>Open application →</strong>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="06 · Public research record" title="The working path stays visible." intro="SAM publishes exact inputs, completed receipts, meaningful failures, implementation faults, corrections, successors, and current releases so another researcher can reconstruct the work rather than receiving only a final narrative.">
        <ButtonLink href="/research-record" tone="secondary">Read the research record</ButtonLink>
      </Section>

      <StewardshipCallout />

      <section className="sam-final-invitation">
        <p>SAM is public as a complete working research system.</p>
        <h2>Read it. Run it. Reconstruct it. Carry it outward.</h2>
        <div className="sam-actions"><ButtonLink href="/downloads">Download the trilogy</ButtonLink><ButtonLink href="/repositories" tone="secondary">Explore the repositories</ButtonLink></div>
      </section>
    </PageFrame>
  );
}
