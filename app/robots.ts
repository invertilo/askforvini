import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://askforvini.pw/sitemap.xml",
    host: "https://askforvini.pw",
  };
}
