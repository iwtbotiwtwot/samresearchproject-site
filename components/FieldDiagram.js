export default function FieldDiagram() {
  const rings = [58, 92, 126, 160, 194];

  return (
    <figure className="field-figure">
      <figcaption>
        <span>Field study / 001</span>
        <span>Accumulation surface</span>
      </figcaption>
      <svg
        className="field-svg"
        viewBox="0 0 560 560"
        role="img"
        aria-labelledby="field-title field-description"
      >
        <title id="field-title">Abstract accumulation field</title>
        <desc id="field-description">
          A conceptual diagram showing concentric displacement around a central body and
          a trace flowing into a ledger-like field. It is not an implementation diagram.
        </desc>
        <defs>
          <radialGradient id="fieldGlow">
            <stop offset="0" stopColor="#ecb465" stopOpacity=".95" />
            <stop offset=".2" stopColor="#62c7aa" stopOpacity=".44" />
            <stop offset=".64" stopColor="#62c7aa" stopOpacity=".08" />
            <stop offset="1" stopColor="#62c7aa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="traceLine" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f4efe3" stopOpacity=".18" />
            <stop offset=".5" stopColor="#62c7aa" />
            <stop offset="1" stopColor="#62c7aa" stopOpacity=".05" />
          </linearGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <g className="field-grid">
          {Array.from({ length: 13 }, (_, index) => (
            <line key={`v-${index}`} x1={40 + index * 40} y1="36" x2={40 + index * 40} y2="524" />
          ))}
          {Array.from({ length: 13 }, (_, index) => (
            <line key={`h-${index}`} x1="36" y1={40 + index * 40} x2="524" y2={40 + index * 40} />
          ))}
        </g>

        <circle cx="246" cy="270" r="226" className="field-boundary" />
        <circle cx="246" cy="270" r="204" fill="url(#fieldGlow)" opacity=".75" />

        <g className="field-rings" transform="rotate(-13 246 270)">
          {rings.map((radius, index) => (
            <ellipse
              key={radius}
              cx="246"
              cy="270"
              rx={radius}
              ry={radius * 0.68}
              style={{ "--ring-delay": `${index * -0.8}s` }}
            />
          ))}
        </g>

        <g className="field-axis">
          <line x1="52" y1="270" x2="442" y2="270" />
          <line x1="246" y1="76" x2="246" y2="464" />
        </g>

        <circle cx="246" cy="270" r="42" className="field-glow" filter="url(#softGlow)" />
        <circle cx="246" cy="270" r="16" className="field-core" />
        <circle cx="246" cy="270" r="4" fill="#f8f4e9" />

        <path
          className="field-trace"
          d="M246 270 C302 230 329 202 363 180 S420 147 476 160 S510 223 482 242 S409 250 397 294 S438 358 492 348"
          fill="none"
          stroke="url(#traceLine)"
        />
        <circle className="trace-point trace-point--one" cx="363" cy="180" r="4" />
        <circle className="trace-point trace-point--two" cx="397" cy="294" r="4" />
        <circle className="trace-point trace-point--three" cx="492" cy="348" r="4" />

        <g className="field-label">
          <line x1="202" y1="225" x2="140" y2="175" />
          <circle cx="140" cy="175" r="2.5" />
          <text x="66" y="166">DISPLACEMENT</text>
          <text x="66" y="181">ACCUMULATES</text>
        </g>

        <g className="field-readout">
          <rect x="378" y="404" width="138" height="72" rx="2" />
          <text x="394" y="425">KERNEL / RADIAL</text>
          <text x="394" y="451" className="field-readout-value">
            A(r) ∝ 1/r
          </text>
          <line x1="394" y1="462" x2="498" y2="462" />
        </g>

        <g className="field-ticks">
          <path d="M36 54v-18h18M506 36h18v18M524 506v18h-18M54 524H36v-18" />
        </g>
      </svg>

      <div className="field-caption">
        <span>
          <i aria-hidden="true" /> Conceptual visualization
        </span>
        <span>Not to scale</span>
      </div>
    </figure>
  );
}
