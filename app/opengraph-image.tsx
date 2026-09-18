import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "ORYENNA — Fine Fragrance & Slow Living";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1917",
          color: "#faf7f2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#c9a96a",
            marginBottom: 24,
          }}
        >
          Atelier de Parfum d'Intérieur
        </div>
        <div
          style={{
            fontSize: 120,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Oryenna
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            fontStyle: "italic",
            color: "#d6cfc4",
          }}
        >
          Fine Fragrance &amp; Slow Living
        </div>
      </div>
    ),
    { ...size }
  );
}
