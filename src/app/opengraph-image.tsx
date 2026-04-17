import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aureo — We craft digital experiences that feel refined.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1200px circle at 70% 30%, rgba(242,242,239,0.25), transparent 60%), #000",
          color: "#f5f2ea",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#bfbfbc",
          }}
        >
          / Aureo Agency
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            lineHeight: 1,
            fontWeight: 700,
            background:
              "linear-gradient(100deg,#e6e6e3 0%,#f2f2ef 35%,#4d4d4b 55%,#bfbfbc 80%,#f6f6f4 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          We craft digital experiences that feel refined.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#cfc9bc" }}>
          <span>aureo.studio</span>
          <span>Est. 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
