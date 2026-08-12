import { BoundaryNote, ClassificationBadge, NextRead, PageFrame, PageHero, Section, SourceDrawer, StatusPill } from "../../components/ResearchComponents.js";

const repo = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const dynamic = "force-static";

export const metadata = { title: "Research Record", description: "SAM's reconstructible public record of ideas, frozen contracts, executions, failures, corrections, successors, releases, and open constructions.", alternates: { canonical: "/research-record" } };

const recordTypes = [
  ["Idea","A conceptual proposal before a frozen test."],
  ["Draft campaign","A designed but unexecuted campaign."],
  ["Frozen contract","Inputs, measures, and adjudication fixed before execution."],
  ["Execution","A run tied to a versioned method and captured artifacts."],
  ["Result","The exact output and its authorized classification, if assigned."],
  ["Implementation fault","A software or builder error kept distinct from the tested concept."],
  ["Correction","A preserved amendment that supersedes without deleting provenance."],
  ["Successor","A later object linked to the result that motivated it."],
  ["Installed component","A completed result integrated into a larger system."],
  ["Current revision","The sole default public implementation."],
  ["Paused campaign","A valid campaign intentionally stopped without being recast as complete."],
  ["Open construction","A named requirement not yet installed."],
];

const campaigns = [
  {id:"SLCV1.2-D9",title:"Depth-9 training and frozen promotion",question:"Can the corrected disjoint depth-9 surface retain exact write and reversible-history behavior?",input:"60,123,392 exact training cases; 4,096 disjoint validation cases",version:"SLCV1.2-H14F-EA18WA-D9",count:"0 training failures · 25/25 validation",classification:"The test result suggests strong contact with the concept.",status:"Current revision",source:`${repo}/blob/main/SAM_HISTORY/entries/H000143_2026-08-10_SLCV12_DEPTH9_TRAINING_AND_FROZEN_PROMOTION.md`},
  {id:"STARBREAKER",title:"Unified matter/GW application",question:"Can the native formation-history object replay exactly through its typed routes without dense fallback?",input:"2,976 ledgers; both event orders; preserved pair maps",version:"current v1.2 contact authority",count:"35,712 runtime rows · 78/78 checks",classification:"The test result suggests strong contact with the concept.",status:"Installed component",source:`${repo}/blob/main/SAM_LIVE/03_STARBREAKER_GW_CURRENT.md`},
  {id:"T6B",title:"Thermodynamic mesoscale response",question:"Does exact dimensionless thermodynamics transfer into Starbreaker matter histories while preserving carrier inventory?",input:"2,976 ledgers; six dimensionless x values",version:"T6B corrected release",count:"19,184 snapshots per branch",classification:"The test result suggests the concept is possible.",status:"Completed result",source:`${repo}/blob/main/SAM_HISTORY/entries/H000055_2026-08-06_STARBREAKER_THERMODYNAMIC_MESOSCALE_RESPONSE_T6B.md`,note:"The first result builder's zero-counter truthiness fault is preserved; the corrected release supersedes it."},
  {id:"MP-A0STOP4",title:"Disjoint spherical scheduler compiler",question:"Does the frozen A₀ scheduler branch outperform its equal-work control on the disjoint surface?",input:"32-coordinate spherical compiler",version:"MP-A0STOP4",count:"695 contacts vs 710 control",classification:"The test falsifies the concept.",status:"Historical · branch closed",source:`${repo}/blob/main/SAM_LIVE/00_CURRENT.md`},
  {id:"SLCMP4483",title:"Public H14F exponent production",question:"Can public one-million-block candidate custody continue with Exact Write, D9, Weil, and H14F receipts?",input:"contiguous public production through p = 2,052,000,000",version:"current v1.2 production surface",count:"54,385,839 public survivor rows",status:"Paused campaign",source:`${repo}/blob/main/SAM_HISTORY/entries/H000157_2026-08-11_OWNER_PAUSE_AFTER_SLCMP4483.md`,note:"SLCMP4484 is locally validated but unpublished; it is the first reconciliation on any owner-authorized resume."},
];

function CampaignCard({ campaign }) {
  return <article id={campaign.id.toLowerCase()} className="sam-campaign-card"><header><div><p className="sam-eyebrow">Campaign {campaign.id}</p><h3>{campaign.title}</h3></div><StatusPill tone={campaign.status.includes("Paused") ? "paused" : "current"}>{campaign.status}</StatusPill></header><dl><div><dt>Exact question</dt><dd>{campaign.question}</dd></div><div><dt>Frozen input</dt><dd>{campaign.input}</dd></div><div><dt>Code / version</dt><dd>{campaign.version}</dd></div><div><dt>Result count</dt><dd>{campaign.count}</dd></div></dl>{campaign.classification ? <ClassificationBadge>{campaign.classification}</ClassificationBadge> : null}{campaign.note ? <BoundaryNote title="Correction / successor">{campaign.note}</BoundaryNote> : null}<a href={campaign.source} target="_blank" rel="noreferrer">Open source artifact ↗</a></article>;
}

export default function ResearchRecordPage() {
  return (
    <PageFrame active="/research-record">
      <PageHero eyebrow="Public provenance · Failures and corrections preserved" title={<>A result is a path, <em>not a screenshot.</em></>} intro="SAM publishes the working route from question and frozen input through code, execution, exact output, classification, correction, successor, and present status. The record is intentionally reconstructible." compact />
      <Section eyebrow="01 · Record vocabulary" title="Current, historical, failed, corrected, and open are different states." tone="dark" wide><div className="sam-type-grid">{recordTypes.map(([name,body]) => <article key={name}><strong>{name}</strong><p>{body}</p></article>)}</div></Section>
      <Section eyebrow="02 · Authorized result language" title="Three classifications. No rating scale."><div className="sam-classification-list"><ClassificationBadge>The test falsifies the concept.</ClassificationBadge><ClassificationBadge>The test result suggests the concept is possible.</ClassificationBadge><ClassificationBadge>The test result suggests strong contact with the concept.</ClassificationBadge></div><BoundaryNote>Measured scope, unmeasured items, implementation faults, and open construction are stated separately. They do not silently rewrite a campaign's assigned classification.</BoundaryNote></Section>
      <Section eyebrow="03 · Selected public record" title="Results, faults, successors, and current state." tone="dark" wide><div className="sam-campaign-grid">{campaigns.map((campaign) => <CampaignCard campaign={campaign} key={campaign.id} />)}</div><SourceDrawer sources={[{label:"Immutable history index",href:`${repo}/blob/main/SAM_HISTORY/HISTORY_INDEX.md`},{label:"History protocol",href:`${repo}/blob/main/SAM_HISTORY/README.md`},{label:"Current global authority",href:`${repo}/blob/main/SAM_LIVE/00_CURRENT.md`}]} /><NextRead href="/repositories" title="Public repository constellation" body="Move from selected result cards into the full research, code, proof-claim, candidate, and established-reference repositories." /></Section>
    </PageFrame>
  );
}
