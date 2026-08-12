import VolumePage from "../../components/VolumePage.js";

const repo = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const metadata = { title: "Volume II: Matter", description: "Volume II of SAM: finite closure, binding, and tensor return.", alternates: { canonical: "/volume-ii" } };

export default function VolumeIIPage() {
  return <VolumePage
    volume="II"
    title={<>Volume II — Matter: <em>finite closure, binding, and tensor return</em></>}
    intro="Volume II turns from the substrate read outward to the field folded into finite form. Matter remains distinct from substrate and is assembled from typed partition addresses, surfaces, carriers, containers, binding channels, and retained histories."
    chapters={[
      {id:"boundary",title:"Matter/substrate category boundary",body:"Matter begins when the substrate account closes into finite form. Carrier, support, container, and payload remain different roles."},
      {id:"roles",title:"Carrier, connector, support, and container",body:"The Θ18 carrier transports overflow without being treated as ordinary retained matter or an extra particle."},
      {id:"grammar",title:"321-row grammar census",body:"The corpus contains unary records, relations, triad templates, supports, carriers, a parent, and rejected controls—not 321 claimed particles."},
      {id:"surface",title:"Current 100-row computation surface",body:"The current SLC and Starbreaker grammar is related to the 321-row corpus but is not identical to it."},
      {id:"binding",title:"Mass, lift, debit, and binding",body:"Native grammar quantities, rest-mass readouts, source channels, fees, credits, debit, and nuclear binding remain separately typed."},
      {id:"nuclei",title:"Nuclei and isotope custody",body:"Representative isotope readout and isotope-family custody are distinct surfaces with a preserved correction history."},
      {id:"periodic",title:"Periodic and composite matter",body:"The periodic surface extends through 126 rows and carries its own return, source, and chemistry boundaries."},
      {id:"return",title:"Return to tensors and Volume III",body:"Closed matter becomes a source without becoming substrate; W8, X1, W9, contact, and tensor closure provide the computation handoff."},
    ]}
    boundary="A carrier is not a container, a support is not payload, and the 321-row source grammar is not a particle count. The related 100-row computation surface is a different typed object."
    sources={[{label:"Volume II technical spine",href:`${repo}/blob/main/volume_II/SAM_VOLUME_II_MATTER_TECHNICAL_SPINE.md`},{label:"SAM conceptual spine",href:`${repo}/blob/main/SAM_CONCEPTUAL_SPINE.md`},{label:"Starbreaker live authority",href:`${repo}/blob/main/SAM_LIVE/03_STARBREAKER_GW_CURRENT.md`} ]}
    next={{href:"/volume-iii",title:"Volume III — Computation",body:"See finite grammar and interaction history become exact state spaces, SLC, and reciprocal history."}}
  />;
}
