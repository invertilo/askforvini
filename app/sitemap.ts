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
    {
      url: "https://opinion.askforvini.pw/es/opinion",
      lastModified,
      alternates: { languages: { es: "https://opinion.askforvini.pw/es/opinion", en: "https://opinion.askforvini.pw/en/opinion" } },
    },
    {
      url: "https://opinion.askforvini.pw/en/opinion",
      lastModified,
      alternates: { languages: { es: "https://opinion.askforvini.pw/es/opinion", en: "https://opinion.askforvini.pw/en/opinion" } },
    },
    {
      url: "https://opinion.askforvini.pw/es/opinion/marchas-plaza-24-septiembre",
      lastModified,
      alternates: { languages: { es: "https://opinion.askforvini.pw/es/opinion/marchas-plaza-24-septiembre", en: "https://opinion.askforvini.pw/en/opinion/marchas-plaza-24-septiembre" } },
    },
    {
      url: "https://opinion.askforvini.pw/en/opinion/marchas-plaza-24-septiembre",
      lastModified,
      alternates: { languages: { es: "https://opinion.askforvini.pw/es/opinion/marchas-plaza-24-septiembre", en: "https://opinion.askforvini.pw/en/opinion/marchas-plaza-24-septiembre" } },
    },
  ];
}
