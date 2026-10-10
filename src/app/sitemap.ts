import type { MetadataRoute } from "next";
import { publicPaths } from "@/lib/seo";
import { site } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map(path => ({ url: new URL(path,site.origin).href, changeFrequency: "monthly", priority: path === "/" ? 1 : path === "/catalogue" ? .9 : .7 }));
}
