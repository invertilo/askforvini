import { isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = isLocale(locale) ? getMessages(locale) : getMessages("es");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#12110E",
          color: "#F3EDE2",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 600 }}>
          askforvini
          <span style={{ color: "#C4A36A" }}>.pw</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            color: "#C4A36A",
            direction: "rtl",
          }}
        >
          {copy.hero.motto}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#B8AFA0", maxWidth: 860 }}>
          {copy.hero.lede}
        </div>
      </div>
    ),
    size,
  );
}
