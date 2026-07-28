import { ImageResponse } from "next/og";

export const alt = "SAM Research Project — Matter displaces the substrate. Displacement accumulates.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#071411",
          color: "#f4efe3",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 530,
            height: 530,
            border: "1px solid rgba(98,199,170,.35)",
            borderRadius: "50%",
            right: -30,
            top: 50,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            border: "1px solid rgba(98,199,170,.5)",
            borderRadius: "50%",
            right: 64,
            top: 145,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 54,
            height: 54,
            borderRadius: "50%",
            right: 207,
            top: 288,
            background: "#d6a35a",
            boxShadow: "0 0 110px #62c7aa",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", zIndex: 2, width: 820 }}>
          <div
            style={{
              display: "flex",
              color: "#62c7aa",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 92,
            }}
          >
            SAM · Research Project
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Georgia, serif",
              fontSize: 66,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            <span>Matter displaces</span>
            <span>the substrate.</span>
            <span style={{ color: "#62c7aa", fontStyle: "italic" }}>
              Displacement accumulates.
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 62, fontSize: 20, color: "#a8b8af" }}>
            samresearchproject.org
          </div>
        </div>
      </div>
    ),
    size,
  );
}
