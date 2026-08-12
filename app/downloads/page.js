import { ButtonLink, DownloadCard, PageFrame, PageHero, Section } from "../../components/ResearchComponents.js";
import { downloadVerification, volumeDownloads } from "../../index.js";

export const metadata = { title: "Downloads", description: "Download the complete 2026-08-11 SAM trilogy and verify its published checksums and build receipt.", alternates: { canonical: "/downloads" } };

export default function DownloadsPage() {
  return (
    <PageFrame active="/downloads">
      <PageHero eyebrow="Complete full-volume exports · 2026-08-11" title={<>The SAM trilogy, <em>complete and verifiable.</em></>} intro="All three PDFs are full reading-surface derivatives of the current technical spines. Together they contain 111 pages and preserve the complete substrate → matter → computation line." actions={<><ButtonLink href="#volume-downloads">Download the trilogy</ButtonLink><ButtonLink href={downloadVerification.checksums} tone="secondary" external>Verify checksums</ButtonLink><ButtonLink href={downloadVerification.receipt} tone="ghost" external>Read the build receipt</ButtonLink></>} compact />
      <Section id="volume-downloads" eyebrow="Primary download set" title="Three equal volumes. One dependency chain." tone="dark" wide><div className="sam-download-grid">{volumeDownloads.map((download) => <DownloadCard download={download} key={download.volume} />)}</div></Section>
      <Section eyebrow="Verification" title="Built from 5,703 source lines without omission." intro="Pandoc 3.10.1 and Typst 0.15.1 produced searchable US Letter PDFs with tables of contents, mathematical typesetting, document metadata, and embedded fonts."><div className="sam-actions"><ButtonLink href={downloadVerification.directory} external>Open the export directory</ButtonLink><ButtonLink href={downloadVerification.checksums} tone="secondary" external>SHA256SUMS.txt</ButtonLink><ButtonLink href={downloadVerification.receipt} tone="secondary" external>BUILD_RECEIPT.md</ButtonLink></div></Section>
    </PageFrame>
  );
}
