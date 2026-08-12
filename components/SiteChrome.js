import { applicationRoutes, primaryRoutes, site } from "../index.js";

export const Arrow = ({ direction = "right" }) => (
  <svg className={`arrow arrow--${direction}`} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
  </svg>
);

export const Mark = ({ small = false }) => (
  <span className={`brand-mark${small ? " brand-mark--small" : ""}`} aria-hidden="true">
    <span />
    <i />
  </span>
);

function NavLinks({ active }) {
  const applicationsActive = applicationRoutes.some((route) => route.href === active);
  return (
    <>
      {primaryRoutes.map((route) => (
        <a className={active === route.href || (route.href === "/starbreaker" && applicationsActive) ? "is-active" : ""} href={route.href} key={route.href}>
          {route.label}
        </a>
      ))}
    </>
  );
}

export function SiteHeader({ active = "/" }) {
  return (
    <header className="site-header sam-header">
      <a className="brand" href="/" aria-label="SAM Research Project home">
        <Mark small />
        <span><strong>SAM</strong><small>Research Project</small></span>
      </a>

      <nav className="desktop-nav sam-desktop-nav" aria-label="Primary navigation">
        <NavLinks active={active} />
      </nav>

      <div className="sam-header-actions">
        <a href="/search">Search</a>
        <a className="header-status sam-repository-link" href="/repositories">Repositories <Arrow /></a>
      </div>

      <details className="sam-mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <NavLinks active={active} />
          <span>Applications</span>
          {applicationRoutes.map((route) => <a href={route.href} key={route.href}>{route.label}</a>)}
          <a href="/repositories">Repositories</a>
          <a href="/search">Search</a>
          <a href="/stewardship">Stewardship</a>
          <a href="/about">About</a>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer sam-footer">
      <div className="footer-brand">
        <Mark small />
        <span><strong>SAM</strong><small>Research Project</small></span>
      </div>
      <blockquote>
        Matter displaces the substrate, that displacement accumulates, interaction writes
        the record, and the retained record becomes an exact computer.
      </blockquote>
      <div className="sam-footer-links">
        <a href="/theory">Theory</a>
        <a href="/downloads">Downloads</a>
        <a href="/repositories">Repositories</a>
        <a href="/stewardship">Stewardship</a>
        <a href="/about">About</a>
        <a href="/search">Search</a>
      </div>
      <div className="footer-meta">
        <span>© 2026 Sean Brady</span>
        <span>{site.domain}</span>
        <span>Technical research collaboration with OpenAI Codex</span>
        <span>SAM is not an OpenAI product.</span>
      </div>
    </footer>
  );
}

// Retained for the legacy /computational-research route while it remains public.
export function PageIntro({ backLabel = "Research overview", eyebrow, title, intro, children }) {
  return (
    <section className="program-hero" aria-labelledby="program-title">
      <div className="program-hero__inner">
        <a className="back-link" href="/"><Arrow direction="left" /> {backLabel}</a>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="program-title">{title}</h1>
        <p className="program-hero__intro">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function ProgramCta({ kicker, title, body, href, label }) {
  return (
    <section className="program-cta">
      <div><p className="section-kicker section-kicker--mint">{kicker}</p><h2>{title}</h2></div>
      <div><p>{body}</p><a className="button button--mint" href={href}>{label} <Arrow /></a></div>
    </section>
  );
}
