import { BoundaryNote, ButtonLink, NextRead, PageFrame, PageHero, ResultReceipt, Section, SourceDrawer } from "../../components/ResearchComponents.js";

const repo = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const dynamic = "force-static";

export const metadata = { title: "Starbreaker", description: "SAM's native matter and gravitational-wave formation-history application.", alternates: { canonical: "/starbreaker" } };

export default function StarbreakerPage() {
  return (
    <PageFrame active="/starbreaker">
      <PageHero eyebrow="Application · Matter and gravitational-wave formation history" title={<>Starbreaker keeps <em>formation history exact.</em></>} intro="Starbreaker is SAM's native matter and gravitational-wave formation-history application. It reuses SAM types and SLC exact methods while preserving its own ledgers, stages, event orders, pair maps, contact incidence, state lifts, and readouts." actions={<ButtonLink href={`${repo}/blob/main/SAM_LIVE/03_STARBREAKER_GW_CURRENT.md`} external>Open current authority</ButtonLink>} compact />

      <Section eyebrow="01 · Native application surface" title="Its own object, not a renamed graph." tone="dark" intro="The application retains seed, collapse, and final stages; two event orders; D18 pair maps; contact and history semantics; M126 retention; N144 lifts; N144+d sidecars; and L162 readouts.">
        <div className="sam-stage-map"><span>2,976 ledgers<small>formation state</small></span><i>→</i><span>contact/write<small>W8 · X1 · W9</small></span><i>→</i><span>carrier release<small>N144 · N144+d</small></span><i>→</i><span>L162 readout<small>history retained</small></span></div>
      </Section>

      <Section eyebrow="02 · Completed receipt" title="Fresh replay, byte-identical result.">
        <ResultReceipt title="Integrated Starbreaker application" rows={[["ledgers","2,976"],["onset events per order","20,415,176"],["runtime rows","35,712"],["non-extreme routed rows","19,184"],["N144 exact rows","1,262"],["N144+d exact rows","17,922"],["required checks","78/78"],["fresh replay wall","5.251708 seconds"]]} classification="The test result suggests strong contact with the concept." />
      </Section>

      <Section eyebrow="03 · Physical boundary" title="Completed exact receipts do not erase open physics." tone="dark">
        <BoundaryNote>Starbreaker is not an N100 replay. Numerical physical energy, a lossless open-q to closed-energy join, physical mirror selection, complete feedback acceptance, scheduler use of W9 history, and full RH-aware event semantics remain open selections.</BoundaryNote>
        <SourceDrawer sources={[{label:"Starbreaker/GW current authority",href:`${repo}/blob/main/SAM_LIVE/03_STARBREAKER_GW_CURRENT.md`},{label:"Volume III technical spine",href:`${repo}/blob/main/volume_III/SAM_VOLUME_III_COMPUTATION_TECHNICAL_SPINE.md`},{label:"Current SLC authority",href:`${repo}/blob/main/SAM_LIVE/01_SLC_CURRENT.md`}]} />
        <NextRead href="/riemann-hypothesis" title="Reciprocal History / RH" body="Follow directed histories and their reversals into the completed Weil-form route." />
      </Section>
    </PageFrame>
  );
}
