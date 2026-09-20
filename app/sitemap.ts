import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://askforvini.pw";
  return [
    {
      url: `${base}/es`,
      lastModified: new Date(),
      alternates: { languages: { es: `${base}/es`, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: new Date(),
      alternates: { languages: { es: `${base}/es`, en: `${base}/en` } },
    },
  ];
}
