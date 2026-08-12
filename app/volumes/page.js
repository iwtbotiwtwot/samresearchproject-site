import { ButtonLink, DownloadCard, PageFrame, PageHero, Section, VolumeCard } from "../../components/ResearchComponents.js";
import { publicPrograms, volumeDownloads } from "../../index.js";

export const dynamic = "force-static";

export const metadata = { title: "The Three Volumes", description: "The complete SAM trilogy: Substrate, Matter, and Computation.", alternates: { canonical: "/volumes" } };

export default function VolumesPage() {
  return (
    <PageFrame active="/volumes">
      <PageHero eyebrow="The complete trilogy · Exported 2026-08-11" title={<>One line from substrate <em>to exact computation.</em></>} intro="The volumes are a dependency chain. Volume I develops the field and its typed readouts. Volume II folds that structure into finite matter. Volume III turns retained grammar and directional history into exact computation." actions={<ButtonLink href="/downloads">Download the three volumes</ButtonLink>} compact />
      <Section eyebrow="Reading order" title="Field → form → record" tone="dark" wide>
        <div className="sam-volume-spine">{publicPrograms.slice(0,3).map((volume) => <VolumeCard key={volume.href} volume={volume.index} title={volume.name.replace(/^Volume [IVX]+ — /, "")} description={volume.description} href={volume.href} accent={volume.accent} />)}</div>
      </Section>
      <Section id="volume-downloads" eyebrow="Complete reading surfaces" title="Full-volume PDFs" intro="These are the newest complete reading-surface exports, built from the technical spines without redaction, summarization, or omission." wide>
        <div className="sam-download-grid">{volumeDownloads.map((download) => <DownloadCard download={download} key={download.volume} />)}</div>
      </Section>
    </PageFrame>
  );
}
