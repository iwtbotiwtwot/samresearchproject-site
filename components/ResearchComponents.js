import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome.js";

export function PageFrame({ active, children, className = "" }) {
  return (
    <main className={`sam-site ${className}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader active={active} />
      <div id="content">{children}</div>
      <SiteFooter />
    </main>
  );
}

export function PageHero({ eyebrow, title, intro, status, actions, children, compact = false }) {
  return (
    <section className={`sam-page-hero${compact ? " sam-page-hero--compact" : ""}`}>
      <div className="sam-page-hero__copy">
        <p className="sam-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="sam-page-hero__intro">{intro}</p>
        {status ? <div className="sam-hero-status">{status}</div> : null}
        {actions ? <div className="sam-actions">{actions}</div> : null}
      </div>
      {children ? <div className="sam-page-hero__visual">{children}</div> : null}
    </section>
  );
}

export function Section({ id, eyebrow, title, intro, children, tone = "paper", wide = false }) {
  return (
    <section id={id} className={`sam-section sam-section--${tone}${wide ? " sam-section--wide" : ""}`}>
      <header className="sam-section__heading">
        {eyebrow ? <p className="sam-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </header>
      <div className="sam-section__body">{children}</div>
    </section>
  );
}

export function ButtonLink({ href, children, tone = "primary", external = false, download = false }) {
  return (
    <a
      className={`sam-button sam-button--${tone}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download || undefined}
    >
      {children} <Arrow />
    </a>
  );
}

export function VersionBadge({ children = "SLCV1.2-H14F-EA18WA-D9" }) {
  return <code className="sam-version"><span aria-hidden="true">◆</span>{children}</code>;
}

export function StatusPill({ children, tone = "current" }) {
  return <span className={`sam-status sam-status--${tone}`}>{children}</span>;
}

export function EquationBlock({ label, children, description }) {
  return (
    <figure className="sam-equation">
      {label ? <figcaption>{label}</figcaption> : null}
      <div role="math" aria-label={description}>{children}</div>
      {description ? <p>{description}</p> : null}
    </figure>
  );
}

export function ArchitectureDiagram({ steps, label }) {
  return (
    <figure className="sam-architecture">
      <ol aria-label={label}>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      {label ? <figcaption>{label}</figcaption> : null}
    </figure>
  );
}

export function TypedReadoutTable() {
  const rows = [
    ["local gradient", "force"],
    ["endpoint lapse comparison", "clock comparison"],
    ["route integral", "photon road"],
    ["radial traversal functional", "exterior traversal"],
    ["action phase", "quantum route"],
    ["surface gradient", "thermal readout"],
  ];
  return (
    <div className="sam-table-wrap">
      <table className="sam-table">
        <caption>One field, typed readouts</caption>
        <thead><tr><th scope="col">Operation</th><th scope="col">Observable</th></tr></thead>
        <tbody>{rows.map(([operation, readout]) => <tr key={operation}><td>{operation}</td><td>{readout}</td></tr>)}</tbody>
      </table>
      <p className="sam-table-note">The operator is part of the observable.</p>
    </div>
  );
}

export function VolumeCard({ volume, title, description, href, accent = "cyan" }) {
  return (
    <a className={`sam-volume-card sam-volume-card--${accent}`} href={href}>
      <span>Volume {volume}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <strong>Read Volume {volume} <Arrow /></strong>
    </a>
  );
}

export function BoundaryNote({ title = "Boundary", children, tone = "coral" }) {
  return (
    <aside className={`sam-boundary sam-boundary--${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function OpenConstruction({ children }) {
  return <BoundaryNote title="Open construction" tone="open">{children}</BoundaryNote>;
}

export function SourceDrawer({ sources, title = "Sources and exact artifacts" }) {
  return (
    <details className="sam-sources">
      <summary>{title}<span aria-hidden="true">+</span></summary>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>
            {source.note ? <small>{source.note}</small> : null}
          </li>
        ))}
      </ul>
    </details>
  );
}

export function RepositoryCard({ repository }) {
  const clone = `https://github.com/iwtbotiwtwot/${repository.url.split("/").at(-1)}.git`;
  return (
    <article className="sam-repository-card">
      <p className="sam-eyebrow">Public repository · main</p>
      <h3>{repository.name}</h3>
      <p>{repository.role}</p>
      <code>{clone}</code>
      <dl><div><dt>Terms</dt><dd>{repository.license}</dd></div></dl>
      <div className="sam-card-links">
        <a href={repository.url} target="_blank" rel="noreferrer">Open repository ↗</a>
        <a href={repository.first} target="_blank" rel="noreferrer">Read first ↗</a>
      </div>
    </article>
  );
}

export function DownloadCard({ download }) {
  return (
    <article className="sam-download-card">
      <p className="sam-eyebrow">Volume {download.volume} · 2026-08-11</p>
      <h3>{download.title}</h3>
      <p>{download.description}</p>
      <dl>
        <div><dt>Pages</dt><dd>{download.pages}</dd></div>
        <div><dt>PDF size</dt><dd>{download.size}</dd></div>
      </dl>
      <code title={download.checksum}>SHA-256 {download.checksum.slice(0, 12)}…</code>
      <div className="sam-card-links">
        <a href={download.href} download>Download PDF ↓</a>
        <a href={download.source} target="_blank" rel="noreferrer">Source spine ↗</a>
      </div>
    </article>
  );
}

export function ClassificationBadge({ children }) {
  return <p className="sam-classification"><span aria-hidden="true">✓</span><strong>{children}</strong></p>;
}

export function ResultReceipt({ title, status = "Validated", rows, classification, children }) {
  return (
    <article className="sam-receipt">
      <header><div><p className="sam-eyebrow">Exact result receipt</p><h3>{title}</h3></div><StatusPill>{status}</StatusPill></header>
      <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      {classification ? <ClassificationBadge>{classification}</ClassificationBadge> : null}
      {children}
    </article>
  );
}

export function NextRead({ href, title, body }) {
  return (
    <a className="sam-next-read" href={href}>
      <span>Next reading step</span>
      <div><strong>{title}</strong><p>{body}</p></div>
      <Arrow />
    </a>
  );
}

export function StewardshipCallout() {
  return (
    <aside className="sam-stewardship-callout">
      <p className="sam-eyebrow">Stewardship covenant</p>
      <h2>Build outward, not upward.</h2>
      <p>
        Widen human agency and access. Preserve origin, contribution, failures, and
        corrections. Keep extensions inspectable and leave a reconstructible path for
        the next steward.
      </p>
      <ButtonLink href="/stewardship" tone="light">Read the stewardship covenant</ButtonLink>
    </aside>
  );
}
