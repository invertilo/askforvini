import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12110E",
          color: "#F3EDE2",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: -0.4,
        }}
      >
        V
        <span style={{ color: "#C4A36A", fontSize: 8, marginLeft: 1 }}>.pw</span>
      </div>
    ),
    size,
  );
}
