import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allDocs } from "content-collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages: MetadataRoute.Sitemap = allDocs.map((doc) => ({
    url: `${siteConfig.baseUrl}/docs/${doc._meta.path.replace("\\", "/")}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: `${siteConfig.baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteConfig.baseUrl}/opengraph-image.png`],
    },
    {
      url: `${siteConfig.baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${siteConfig.baseUrl}/opengraph-image.png`],
    },
    ...docsPages,
  ];
}
