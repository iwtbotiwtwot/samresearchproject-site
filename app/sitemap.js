import { site } from "../index.js";

export default function sitemap() {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
