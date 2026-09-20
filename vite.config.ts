import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Canonical and og:url must name the origin the page is actually served from.
 * Hard-coding a domain that is not live yet tells crawlers the real content
 * lives somewhere else. Resolution order:
 *
 *   VITE_SITE_ORIGIN            explicit — set this once the domain is live
 *   VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL   Vercel build
 *   URL / DEPLOY_PRIME_URL      Netlify build
 *   http://localhost:5173       local
 */
function resolveSiteOrigin(): string {
  const env = process.env;
  const withProtocol = (value?: string) =>
    value ? (value.startsWith("http") ? value : `https://${value}`) : undefined;

  return (
    withProtocol(env.VITE_SITE_ORIGIN) ??
    withProtocol(env.VERCEL_PROJECT_PRODUCTION_URL) ??
    withProtocol(env.VERCEL_URL) ??
    withProtocol(env.URL) ??
    withProtocol(env.DEPLOY_PRIME_URL) ??
    "http://localhost:5173"
  ).replace(/\/$/, "");
}

function siteOrigin(): Plugin {
  const origin = resolveSiteOrigin();
  return {
    name: "site-origin",
    transformIndexHtml: (html) => html.replaceAll("%SITE_ORIGIN%", origin),
  };
}

// One entry per route in App.tsx's editionPages(), for each of /backend and /android.
const ROUTES = [
  "",
  "/work",
  "/work/living-labs",
  "/work/find-my-mobile",
  "/work/wearable-intelligence",
  "/projects",
  "/projects/zero-miles",
  "/projects/derma-assist",
  "/projects/dynamic-mock-server",
  "/about",
];

function sitemapAndRobots(): Plugin {
  const origin = resolveSiteOrigin();
  return {
    name: "sitemap-and-robots",
    apply: "build",
    generateBundle() {
      const urls = ["backend", "android"].flatMap((edition) =>
        ROUTES.map((route) => `${origin}/${edition}${route}`),
      );
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
        "</urlset>",
        "",
      ].join("\n");
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });

      const robots = [
        "User-agent: *",
        "Allow: /",
        `Sitemap: ${origin}/sitemap.xml`,
        "",
      ].join("\n");
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteOrigin(), sitemapAndRobots()],
  // Same origin the HTML is stamped with, so runtime metadata cannot drift
  // away from <link rel="canonical">.
  define: { __SITE_ORIGIN__: JSON.stringify(resolveSiteOrigin()) },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  // The preview server has its own host allowlist. Without this, a tunnelled
  // host (ngrok / cloudflared) is rejected with "Blocked request".
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: true,
  },
});
