import records from "@/data/catalogue.json";
import type { BrandSlug } from "./site";

export type Design = {
  id: string; brand: BrandSlug; name: string | null; code: string | null;
  thumbnail: string; fullImage: string; width: number; height: number;
  sourcePdf: string; sourcePage: number;
};
export const designs = records as Design[];
export function designTitle(design: Design) {
  if (design.code) return design.name ? `${design.code} · ${design.name}` : `${design.code} · ${design.brand.toUpperCase()} design`;
  return design.name ?? "Catalogue design";
}
export function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
export function matchesDesign(design: Design, query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const searchable = normalizeSearch(`${design.code ?? ""} ${design.name ?? ""} ${design.brand} ${design.id}`);
  return terms.every(term => searchable.includes(normalizeSearch(term)));
}
export function designAlt(design: Design) {
  return `${design.brand.toUpperCase()} ${design.name ?? "catalogue design"}${design.code ? `, code ${design.code}` : `, page ${design.sourcePage}`}, individual material swatch`;
}
export function byBrand(brand: BrandSlug) { return designs.filter(d => d.brand === brand); }
export function featuredDesigns() {
  const ids = ["kmi-p013-01", "zrk-p013-01", "mecata-p002-03", "kmi-p014-01", "zrk-p013-07", "mecata-p005-03"];
  return ids.map(id => designs.find(d => d.id === id)).filter((d): d is Design => Boolean(d));
}
