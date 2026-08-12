import {
  BoundaryNote,
  ButtonLink,
  NextRead,
  PageFrame,
  PageHero,
  ResultReceipt,
  Section,
  SourceDrawer,
} from "../../components/ResearchComponents.js";
import GalaxyHaloStack from "../../components/GalaxyHaloStack.js";

const courtroom = "https://github.com/iwtbotiwtwot/The_Courtroom";
const research = "https://github.com/iwtbotiwtwot/SAM_Research_Project";
const haloBranch = `${research}/tree/main/volume_I/08_GALAXY_HALOS_BB_PBH_TRAPPED_A`;

export const dynamic = "force-static";

export const metadata = {
  title: "Galaxy Halo Stack",
  description: "Explore SAM's SPARC-backed radial halo law, per-galaxy mass placement, and forward source stack.",
  alternates: { canonical: "/galaxy-halos" },
};

export default function GalaxyHalosPage() {
  return (
    <PageFrame active="/galaxy-halos">
      <PageHero
        eyebrow="Application · Galaxy rotation and halo mass placement"
        title={<>A galaxy, radius by radius. <em>A population, without per-galaxy fitting.</em></>}
        intro="The Galaxy Halo Stack joins the original G393 source decomposition to the later Courtroom results: the five-bin SPARC radial law, per-galaxy outer halo mass placement, and the substrate identity X∞ = 10/π. Choose any of 175 catalog galaxies, adjust the inputs, scan the radial population surface, and issue a calculation receipt."
        actions={<><ButtonLink href="#galaxy-halo-stack">Open the instrument</ButtonLink><ButtonLink href={haloBranch} tone="secondary" external>Inspect Branch 08</ButtonLink></>}
        compact
      />

      <Section
        id="galaxy-halo-stack"
        eyebrow="01 · Interactive population instrument"
        title="Recover the full stack. Keep the stronger model."
        tone="dark"
        wide
        intro="The default state replays CR033 with X∞ = 10/π. The catalog controls preserve the old workbook's live per-galaxy and population calculations; the visual surface adds the sealed CR031b radial bins and the historical G393 lane decomposition. Adjusted inputs are retained in the receipt as an exploratory scenario."
      >
        <GalaxyHaloStack />
      </Section>

      <Section eyebrow="02 · Population result" title="The substrate identity lands at population median unity.">
        <ResultReceipt
          title="CR033 substrate identity against raw SPARC"
          status="Courtroom PASS"
          rows={[
            ["SPARC galaxies loaded", "175"],
            ["radial points in CR031b", "3,391"],
            ["galaxies in mass statistic", "173"],
            ["X∞,SAM", "10/π = 3.183098861838"],
            ["median predicted / measured", "0.999283518662"],
            ["median log10 ratio", "−0.000311275416"],
            ["per-galaxy fit parameters", "0"],
            ["raw outer halo fraction", "0.760699023483"],
          ]}
        />
      </Section>

      <Section
        eyebrow="03 · Research progression"
        title="From a missing lane to a derived population law."
        tone="dark"
        intro="The simulator keeps the chronology visible because each stage answered a different question."
      >
        <div className="sam-stage-map">
          <span>G393<small>forward source lanes</small></span><i>→</i>
          <span>CR031b<small>radial X(r), p &lt; 0.001</small></span><i>→</i>
          <span>CR032<small>outer mass placement</small></span><i>→</i>
          <span>CR033<small>X∞ = 10/π</small></span>
        </div>
      </Section>

      <Section eyebrow="04 · Current reading" title="What the instrument calculates—and where the next test begins.">
        <BoundaryNote title="Current research frontier">
          CR033 is a retrospective substrate-identification result against the SPARC catalog. Its load-bearing result is population-level outer-radius mass placement; the measured per-galaxy scatter remains about 0.38 dex. A prospective non-SPARC catalog comparison, the closed-form concentration selector, and cross-catalog universality remain the named next constructions.
        </BoundaryNote>
        <SourceDrawer sources={[
          { label: "Galaxy-halo Branch 08", href: haloBranch, note: "Full Courtroom chain from accumulation and source inventory through CR033." },
          { label: "CR031b radial-law result", href: `${research}/blob/main/volume_I/08_GALAXY_HALOS_BB_PBH_TRAPPED_A/CR031b_X_RADIAL_LAW_NULL_PERCENTILE_APPEAL/CR031b_result.md`, note: "Five population bins, spreads, and permutation-null receipts." },
          { label: "CR032 per-galaxy mass result", href: `${research}/blob/main/volume_I/08_GALAXY_HALOS_BB_PBH_TRAPPED_A/CR032_SAM_NATIVE_PER_GALAXY_HALO_MASS_DERIVATION/CR032_result.md`, note: "The zero-per-galaxy-fit outer halo mass formula." },
          { label: "CR033 10/π substrate identity", href: `${research}/blob/main/volume_I/08_GALAXY_HALOS_BB_PBH_TRAPPED_A/CR033_X_INF_SUBSTRATE_DERIVATION_IDENTITY/CR033_result.md`, note: "Current canonical X∞ identity and raw-SPARC replay." },
          { label: "Original SAM Halos workbook", href: `${courtroom}/blob/main/docs/xlsx_out/SAM_Halos.xlsx`, note: "Recovered interactive workbook that supplied the stronger public instrument concept." },
          { label: "Workbook builder", href: `${courtroom}/blob/main/docs/build_halos_xlsx.py`, note: "Original live formula and catalog implementation." },
        ]} />
        <NextRead href="/volume-i" title="Volume I — Substrate" body="Place the halo result inside SAM's larger accumulation, cosmology, and typed-readout architecture." />
      </Section>
    </PageFrame>
  );
}
