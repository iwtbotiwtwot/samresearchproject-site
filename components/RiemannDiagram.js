export default function RiemannDiagram() {
  const zeros = [74, 119, 154, 189, 214, 252];

  return (
    <figure className="riemann-figure">
      <figcaption>
        <span>Critical strip / conceptual map</span>
        <span>0 &lt; Re(s) &lt; 1</span>
      </figcaption>
      <svg
        viewBox="0 0 620 390"
        role="img"
        aria-labelledby="riemann-title riemann-description"
      >
        <title id="riemann-title">The critical line in the complex plane</title>
        <desc id="riemann-description">
          A conceptual view of the critical strip with points placed on the critical
          line where the real part of s equals one half. It is not a computed result.
        </desc>
        <defs>
          <linearGradient id="criticalGlow" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#a78bfa" stopOpacity="0" />
            <stop offset=".48" stopColor="#a78bfa" stopOpacity=".55" />
            <stop offset="1" stopColor="#69cfb0" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="riemann-grid">
          {Array.from({ length: 9 }, (_, index) => (
            <line key={`v-${index}`} x1={54 + index * 64} y1="36" x2={54 + index * 64} y2="342" />
          ))}
          {Array.from({ length: 6 }, (_, index) => (
            <line key={`h-${index}`} x1="54" y1={42 + index * 58} x2="566" y2={42 + index * 58} />
          ))}
        </g>

        <rect className="critical-strip" x="182" y="36" width="256" height="306" />
        <line className="critical-boundary" x1="182" y1="36" x2="182" y2="342" />
        <line className="critical-boundary" x1="438" y1="36" x2="438" y2="342" />
        <rect className="critical-glow" x="304" y="36" width="12" height="306" fill="url(#criticalGlow)" />
        <line className="critical-line" x1="310" y1="36" x2="310" y2="342" />

        {zeros.map((y, index) => (
          <g className="zero-point" key={y}>
            <circle cx="310" cy={y} r="11" />
            <circle cx="310" cy={y} r="3" />
            {index === 2 ? <line x1="324" y1={y} x2="388" y2={y} /> : null}
            {index === 2 ? <text x="398" y={y + 4}>ζ(s) = 0</text> : null}
          </g>
        ))}

        <g className="riemann-axis-labels">
          <text x="172" y="365">0</text>
          <text x="296" y="365">½</text>
          <text x="432" y="365">1</text>
          <text x="494" y="365">Re(s)</text>
          <text x="322" y="58">CRITICAL LINE</text>
          <text x="75" y="58">Im(s)</text>
        </g>
      </svg>
      <p>Conceptual orientation · not a zero verification plot</p>
    </figure>
  );
}
