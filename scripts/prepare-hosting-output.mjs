import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { allRoutes, site } from "../index.js";

await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

// GitHub Pages resolves directory indexes reliably. vinext's static exporter
// emits clean app routes as top-level HTML files, so mirror each one at the
// corresponding route/index.html while preserving the original export.
const clientEntries = await readdir("dist/client", { withFileTypes: true });
for (const entry of clientEntries) {
  if (!entry.isFile() || !entry.name.endsWith(".html") || entry.name === "index.html" || entry.name === "404.html") continue;
  const route = basename(entry.name, ".html");
  const routeDirectory = join("dist/client", route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(join("dist/client", entry.name), join(routeDirectory, "index.html"));
}

const publicRoutes = allRoutes.filter((route) => route !== "/computational-research");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes.map((route) => `  <url><loc>${site.url}${route === "/" ? "" : route}</loc><lastmod>2026-08-11</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile("dist/client/sitemap.xml", sitemap, "utf8");
await writeFile("dist/client/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`, "utf8");
