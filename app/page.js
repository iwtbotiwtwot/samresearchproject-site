import { publicPrograms, site } from "../index.js";
import EmulatorPreview from "../components/EmulatorPreview.js";
import FieldDiagram from "../components/FieldDiagram.js";

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
  </svg>
);

const Mark = ({ small = false }) => (
  <span className={`brand-mark${small ? " brand-mark--small" : ""}`} aria-hidden="true">
    <span />
    <i />
  </span>
);

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <div className="hero-shell">
        <header className="site-header" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="SAM Research Project home">
            <Mark small />
            <span>
              <strong>SAM</strong>
              <small>Research Project</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Homepage sections">
            <a href="#model">The model</a>
            <a href="#programs">Programs</a>
            <a href="#method">Method</a>
            <a href="#record">Research record</a>
          </nav>

          <a className="header-status" href="#programs">
            <span aria-hidden="true" />
            Public record
          </a>
        </header>

        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span>Independent research</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              <span>Est. 2026</span>
            </p>
            <h1 id="hero-title">
              Matter displaces the substrate.
              <em> Displacement accumulates.</em>
            </h1>
            <p className="hero-intro">
              The Substrate Accumulation Model turns a substrate-first premise into a
              living program of mathematics, controlled tests, and exact computational
              experiments.
            </p>
            <div className="hero-actions">
              <a className="button button--light" href="#model">
                Explore the model <Arrow />
              </a>
              <a className="text-link" href="#programs">
                See the research programs <span aria-hidden="true">↓</span>
              </a>
            </div>

            <dl className="hero-ledger" aria-label="Project summary">
              <div>
                <dt>Posture</dt>
                <dd>Exploratory mathematics</dd>
              </div>
              <div>
                <dt>Practice</dt>
                <dd>Explicit tests &amp; provenance</dd>
              </div>
              <div>
                <dt>Record</dt>
                <dd>Living &amp; preserved</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual">
            <FieldDiagram />
          </div>
        </section>

        <div className="equation-band" aria-label="SAM foundational expressions">
          <div>
            <span className="equation-label">Native constant</span>
            <strong>
              A<sub>0</sub> = <span className="fraction"><span>1</span><span>12π</span></span>
            </strong>
          </div>
          <span className="equation-divider" aria-hidden="true" />
          <div>
            <span className="equation-label">Accumulation kernel</span>
            <strong>
              A(r) = <span className="fraction"><span>r<sub>s</sub></span><span>r</span></span>
            </strong>
          </div>
          <p>
            Two compact expressions open a much larger research program.
            <span aria-hidden="true"> ↗</span>
          </p>
        </div>
      </div>

      <div id="content">
        <section id="model" className="paper-section model-section">
          <div className="section-index" aria-hidden="true">
            01
          </div>
          <div className="section-heading">
            <p className="section-kicker">The working idea</p>
            <h2>A physical premise, developed in the open.</h2>
          </div>
          <div className="model-copy">
            <p className="lead">
              SAM begins with the idea that matter displaces the substrate—and that
              the resulting displacement is not lost. It accumulates, organizes, and
              becomes mathematically testable.
            </p>
            <p>
              From that starting point, the project follows the same structures across
              fields, gravity, horizons, matter, cosmology, and computation. Each branch
              remains connected to a searchable record of its assumptions, tests,
              outcomes, corrections, and provenance.
            </p>
          </div>

          <ol className="research-spine" aria-label="Research progression">
            {["Substrate", "Field", "Matter", "Language", "Computation"].map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section id="programs" className="programs-section" aria-labelledby="programs-title">
          <div className="section-topline">
            <div>
              <p className="section-kicker section-kicker--mint">Research architecture</p>
              <h2 id="programs-title">One model. Four active fronts.</h2>
            </div>
            <p>
              Foundations, matter, computational research, and controlled engineering
              investigations—held in distinct scopes and read at their proper authority.
            </p>
          </div>

          <div className="program-grid">
            {publicPrograms.map((program) => (
              <article className={`program-card program-card--${program.index}`} key={program.name}>
                <div className="program-meta">
                  <span>{program.index}</span>
                  <span>{program.label}</span>
                </div>
                <div>
                  <h3>{program.name}</h3>
                  <p>{program.description}</p>
                </div>
                <span className="program-corner" aria-hidden="true">
                  <Arrow />
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="emulator-section" aria-labelledby="emulator-title">
          <div className="emulator-copy">
            <p className="section-kicker section-kicker--mint">SLC · Public emulator</p>
            <h2 id="emulator-title">Explore behavior, not machinery.</h2>
            <p>
              The Substrate Ledger Computer is SAM&apos;s research program for semantic
              computation. Its public emulator will offer bounded ways to explore
              selected behaviors while protected architecture, implementation, hardware,
              and source code remain private.
            </p>
            <div className="emulator-note">
              <span aria-hidden="true">↳</span>
              <p>
                <strong>Designed disclosure boundary</strong>
                Public interaction is intentionally separated from the internal research
                implementation.
              </p>
            </div>
          </div>
          <EmulatorPreview />
        </section>

        <section className="starbreaker-section" aria-labelledby="starbreaker-title">
          <div className="starbreaker-art" aria-hidden="true">
            <div className="star-field" />
            <div className="star-orbit star-orbit--one" />
            <div className="star-orbit star-orbit--two" />
            <div className="star-core">
              <span />
            </div>
            <p>SB / CONTROLLED PROGRAM</p>
          </div>

          <div className="starbreaker-copy">
            <p className="section-kicker section-kicker--amber">Starbreaker</p>
            <h2 id="starbreaker-title">A controlled theory, test, and engineering program.</h2>
            <p>
              Starbreaker is maintained as a distinct SAM research area, separating
              theory, model development, evidence, and engineering work. The public site
              will present disclosure-reviewed questions and selected findings without
              exposing implementation-sensitive detail.
            </p>
            <div className="status-line">
              <span aria-hidden="true" />
              <strong>Program active</strong>
              <small>Public summaries in development</small>
            </div>
          </div>
        </section>

        <section id="method" className="paper-section method-section" aria-labelledby="method-title">
          <div className="section-index" aria-hidden="true">
            02
          </div>
          <div className="method-heading">
            <p className="section-kicker">Research practice</p>
            <h2 id="method-title">Built as a living research record.</h2>
            <p>
              Current theory, historical development, test evidence, and engineering
              claims remain distinctly labeled.
            </p>
          </div>

          <div className="method-grid">
            <article>
              <span>01</span>
              <h3>Develop the model</h3>
              <p>Ideas are made explicit enough to calculate, test, and revise.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Run controlled tests</h3>
              <p>Controls distinguish structure from randomness, accident, and artifacts.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Preserve the record</h3>
              <p>Inputs, outcomes, corrections, provenance, and productive failures remain traceable.</p>
            </article>
          </div>
        </section>

        <section id="record" className="record-section" aria-labelledby="record-title">
          <div>
            <p className="section-kicker section-kicker--mint">The public record</p>
            <h2 id="record-title">Follow the research as it develops.</h2>
          </div>
          <div className="record-copy">
            <p>
              This is the beginning of the public SAM research home: a place for the
              model, current programs, selected results, interactive tools, and a
              carefully governed research record.
            </p>
            <a className="button button--mint" href="#top">
              Return to the beginning <Arrow />
            </a>
          </div>
          <div className="record-domain">
            <Mark />
            <span>{site.domain}</span>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="footer-brand">
          <strong>SAM</strong>
          <span>Research Project</span>
        </div>
        <p>
          This site presents disclosure-reviewed summaries. Protected implementation
          details, source code, sealed comparisons, and unreviewed material are not
          published.
        </p>
        <div className="footer-meta">
          <span>© 2026 Sean Brady</span>
          <span>Technical collaboration with Codex</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </main>
  );
}
