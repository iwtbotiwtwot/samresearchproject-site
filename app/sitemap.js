import { allRoutes, site } from "../index.js";

export default function sitemap() {
  return allRoutes
    .filter((route) => route !== "/computational-research")
    .map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      lastModified: new Date("2026-08-11"),
      changeFrequency: path === "/" || path === "/research-record" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : ["/theory", "/volumes", "/slc", "/downloads"].includes(path) ? 0.9 : 0.8,
    }));
}
