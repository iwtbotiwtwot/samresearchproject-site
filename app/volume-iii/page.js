import VolumePage from "../../components/VolumePage.js";

const repo = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const metadata = { title: "Volume III: Computation", description: "Volume III of SAM: exact state spaces and reciprocal history.", alternates: { canonical: "/volume-iii" } };

export default function VolumeIIIPage() {
  return <VolumePage
    volume="III"
    title={<>Volume III — Computation: <em>exact state spaces and reciprocal history</em></>}
    intro="Volume III receives the substrate coordinate, finite matter grammar, and interaction record from the first two volumes. It turns those objects into exact computational routes while preserving type, provenance, reversibility, and application boundaries."
    chapters={[
      {id:"ontology",title:"Computational ontology and 100-row grammar",body:"Rows, states, fibers, histories, and readouts are not interchangeable. SAM Language carries the typed grammar as a certificate."},
      {id:"dos",title:"Exact frustrated-spin density of states",body:"Exact route families preserve the declared object while quotient, boundary, and fiber structure eliminate irrelevant combinations."},
      {id:"n100",title:"N100 grammar-to-work breakthrough",body:"H14F uses the source grammar to expose exact factorization and routing; the resource is the boundary that must remain live."},
      {id:"slc",title:"Current SLCV1.2 architecture",body:"The sole frozen current revision is SLCV1.2-H14F-EA18WA-D9; all earlier versions are inactive predecessors."},
      {id:"write",title:"Complete Exact Write",body:"The implemented typed algebra turns a source address and directional program into an exact write."},
      {id:"weil",title:"Directional Weil adapter",body:"Reciprocal directional history is retained in exact, reversible receipts across the frozen v1.2 stack."},
      {id:"thermo",title:"Exact thermodynamics",body:"Density of states feeds a thermodynamic ladder only after the exact state object and degeneracies are fixed."},
      {id:"apps",title:"Starbreaker, RH, and clean-sheet Mersenne",body:"Three separate applications reuse exact architecture while retaining their own claim and authority boundaries."},
    ]}
    boundary="SLC preserves exact typed computation and can assign compositeness through reconstructed factors. No raw-exponent jump is installed, and SLC does not assign Mersenne primality."
    sources={[{label:"Volume III technical spine",href:`${repo}/blob/main/volume_III/SAM_VOLUME_III_COMPUTATION_TECHNICAL_SPINE.md`},{label:"Current SLC authority",href:`${repo}/blob/main/SAM_LIVE/01_SLC_CURRENT.md`},{label:"Standalone runnable SLC",href:"https://github.com/iwtbotiwtwot/substrate-ledger-computer"} ]}
    next={{href:"/slc",title:"Run the current SLC",body:"Inspect v1.2, verify its current pointer and seals, and reach the complete 71-version public lineage."}}
  />;
}
