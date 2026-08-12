import SearchExplorer from "../../components/SearchExplorer.js";
import { PageFrame, PageHero, Section } from "../../components/ResearchComponents.js";
import { searchEntries } from "../../index.js";

export const metadata = { title: "Search", description: "Search SAM pages, concepts, version IDs, campaign IDs, aliases, and exact terms.", alternates: { canonical: "/search" } };

export default function SearchPage() {
  return <PageFrame><PageHero eyebrow="Indexed public reading surface" title={<>Find an exact term, <em>version, or campaign.</em></>} intro="Search the public site by title, alias, equation name, campaign ID, history ID, version ID, application, or technical term." compact /><Section eyebrow="Site index" title="Search the SAM public surface" tone="dark"><SearchExplorer entries={searchEntries} /></Section></PageFrame>;
}
