import { volumeDownloads } from "../index.js";
import {
  BoundaryNote,
  ButtonLink,
  NextRead,
  PageFrame,
  PageHero,
  Section,
  SourceDrawer,
} from "./ResearchComponents.js";

export default function VolumePage({
  volume,
  title,
  intro,
  chapters,
  boundary,
  sources,
  next,
}) {
  const download = volumeDownloads.find((item) => item.volume === volume);
  const scholarlyArticle = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: `Volume ${volume} — ${download.title}`,
    author: { "@type": "Person", name: "Sean Brady" },
    datePublished: "2026-08-11",
    isPartOf: { "@type": "CreativeWorkSeries", name: "SAM Research Project" },
    url: download.source,
    encoding: { "@type": "MediaObject", contentUrl: download.href, encodingFormat: "application/pdf" },
  };
  return (
    <PageFrame active="/volumes" className={`sam-volume-page sam-volume-page--${volume.toLowerCase()}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticle) }} />
      <PageHero
        eyebrow={`Volume ${volume} · Complete technical spine`}
        title={title}
        intro={intro}
        actions={<><ButtonLink href={download.href} external>Download Volume {volume} PDF</ButtonLink><ButtonLink href={download.source} tone="secondary" external>Open source spine</ButtonLink></>}
        compact
      />
      <Section eyebrow="Volume map" title="The technical route" intro="Each section below opens the role of a full chapter group while keeping the controlling source one click away." tone="dark" wide>
        <div className="sam-chapter-grid">
          {chapters.map((chapter, index) => (
            <article id={chapter.id} key={chapter.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              {chapter.detail ? <small>{chapter.detail}</small> : null}
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Scientific custody" title="What this volume does—and does not—claim.">
        <BoundaryNote>{boundary}</BoundaryNote>
        <SourceDrawer sources={sources} />
        <NextRead {...next} />
      </Section>
    </PageFrame>
  );
}
