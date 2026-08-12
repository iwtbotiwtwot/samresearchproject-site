import { PageFrame, PageHero, RepositoryCard, Section } from "../../components/ResearchComponents.js";
import { repositories } from "../../index.js";

export const metadata = { title: "Repositories", description: "The five public repositories of the SAM Research Project.", alternates: { canonical: "/repositories" } };

export default function RepositoriesPage() {
  return <PageFrame><PageHero eyebrow="Public source constellation · HTTPS only" title={<>Read the theory. <em>Inspect the machinery.</em></>} intro="Five public repositories preserve the working research, runnable SLC lineage, SAM proof claim, Mersenne candidate record, and established-reference path. Each keeps its own role and controlling terms." compact /><Section eyebrow="Five exact public routes" title="The repository constellation" tone="dark" wide><div className="sam-repository-grid">{repositories.map((repository) => <RepositoryCard repository={repository} key={repository.url} />)}</div></Section></PageFrame>;
}
