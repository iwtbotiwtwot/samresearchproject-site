import VolumePage from "../../components/VolumePage.js";

const repo = "https://github.com/iwtbotiwtwot/SAM_Research_Project";

export const dynamic = "force-static";

export const metadata = { title: "Volume I: Substrate", description: "Volume I of SAM: accumulation, roads, and physical readout.", alternates: { canonical: "/volume-i" } };

export default function VolumeIPage() {
  return <VolumePage
    volume="I"
    title={<>Volume I — Substrate: <em>accumulation, roads, and physical readout</em></>}
    intro="Volume I develops the field-facing half of SAM. It begins with the universal floor and radial lift, then keeps each measurement typed as the theory moves through weak field, clocks, photon traversal, distance, strong field, and cosmology."
    chapters={[
      {id:"kernel",title:"Kernel and weak field",body:"The floor A₀ and source lift A(r) form the base coordinate system. Potential, acceleration, and lapse are derived through their declared operators."},
      {id:"clocks",title:"Clocks versus photon traversal",body:"Clocks compare endpoint lapse; photons integrate a road. The two may share a field while requiring different operators.",detail:"Locally measured c remains invariant."},
      {id:"distance",title:"Local and cosmological distance",body:"Local routes do not automatically define a cosmological distance law. The global road is constructed and compared separately."},
      {id:"strong-field",title:"Strong-field A-coordinate",body:"Horizon, photon sphere, and Schwarzschild ISCO occupy the A-coordinate ladder at 1, 2/3, and 1/3."},
      {id:"cosmology",title:"Cosmological inventory and road",body:"Inventory and distance remain complementary lanes, meeting through shared structure without forcing one local equation to supply the whole cosmology."},
    ]}
    boundary="A₀ is the universal floor; A(r) is a local source lift. Clocks read endpoint comparison, photons read route integration, and local light speed does not change."
    sources={[{label:"Volume I technical spine",href:`${repo}/blob/main/volume_I/SAM_VOLUME_I_SUBSTRATE_TECHNICAL_SPINE.md`},{label:"SAM conceptual spine",href:`${repo}/blob/main/SAM_CONCEPTUAL_SPINE.md`},{label:"Current authority",href:`${repo}/blob/main/SAM_LIVE/00_CURRENT.md`} ]}
    next={{href:"/volume-ii",title:"Volume II — Matter",body:"Follow accumulated structure as it folds into finite closure, binding, isotope custody, and tensor return."}}
  />;
}
