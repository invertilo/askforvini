"use client";

import { defaultLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  const copy = getMessages(defaultLocale).errors.server;

  return (
    <html lang={defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 1.25rem",
          background: "#12110e",
          color: "#f3ede2",
          fontFamily:
            '"Source Sans 3", "Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.8125rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#b8afa0",
          }}
        >
          {copy.code}
        </p>
        <h1
          style={{
            margin: "0.75rem 0 0",
            fontFamily: '"Frank Ruhl Libre", "Times New Roman", serif',
            fontSize: "2.5rem",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          askforvini
          <span style={{ fontSize: "0.62em", color: "#c4a36a" }}>.pw</span>
        </h1>
        <h2
          style={{
            margin: "2rem 0 0",
            fontFamily: '"Frank Ruhl Libre", "Times New Roman", serif',
            fontSize: "1.5rem",
            fontWeight: 500,
          }}
        >
          {copy.title}
        </h2>
        <p style={{ margin: "1rem 0 0", maxWidth: "36rem", color: "#b8afa0" }}>
          {copy.body}
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem" }}>
          <a
            href={`/${defaultLocale}`}
            style={{
              display: "inline-flex",
              minHeight: "2.75rem",
              alignItems: "center",
              borderRadius: "999px",
              background: "#3a6ea5",
              color: "#fff",
              padding: "0 1.25rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {copy.ctaHome}
          </a>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              minHeight: "2.75rem",
              alignItems: "center",
              borderRadius: "999px",
              border: "1px solid rgb(243 237 226 / 0.12)",
              background: "transparent",
              color: "#f3ede2",
              padding: "0 1.25rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {copy.ctaRetry}
          </button>
        </div>
      </body>
    </html>
  );
}
