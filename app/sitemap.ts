import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://askforvini.pw";
  const lastModified = new Date();

  return [
    {
      url: `${base}/es`,
      lastModified,
      alternates: { languages: { es: `${base}/es`, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified,
      alternates: { languages: { es: `${base}/es`, en: `${base}/en` } },
    },
    {
      url: `${base}/es/faq`,
      lastModified,
      alternates: {
        languages: { es: `${base}/es/faq`, en: `${base}/en/faq` },
      },
    },
    {
      url: `${base}/en/faq`,
      lastModified,
      alternates: {
        languages: { es: `${base}/es/faq`, en: `${base}/en/faq` },
      },
    },
  ];
}
