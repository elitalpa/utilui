import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
