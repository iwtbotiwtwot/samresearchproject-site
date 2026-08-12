import { ButtonLink, PageFrame, PageHero, Section } from "../../components/ResearchComponents.js";

export const metadata = { title: "Computational Research", description: "This earlier public route now points into the complete SAM research record.", alternates: { canonical: "/research-record" }, robots: { index: false, follow: true } };

export default function ComputationalResearchPage() {
  return <PageFrame active="/research-record"><PageHero eyebrow="Preserved public route" title={<>Computational research now lives in the <em>Research Record.</em></>} intro="The expanded record separates ideas, frozen contracts, executions, implementation faults, corrections, successors, installed components, current revisions, paused campaigns, and open constructions." actions={<ButtonLink href="/research-record">Open the Research Record</ButtonLink>} compact /><Section eyebrow="Why this route remains" title="Existing links still work." tone="dark" intro="This page is retained so earlier public references remain valid while the new Research Record provides the complete provenance surface." /></PageFrame>;
}
