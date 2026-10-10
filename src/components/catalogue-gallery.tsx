"use client";
import dynamic from "next/dynamic";
import { useCallback, useDeferredValue, useState, useSyncExternalStore } from "react";
import { brands, type BrandSlug } from "@/lib/site";
import { matchesDesign, normalizeSearch, type Design } from "@/lib/catalogue";
import { DesignCard } from "./design-card";
import { Icon } from "./icons";

const Lightbox = dynamic(() => import("./lightbox"), { ssr: false });
const emptySnapshot = () => "";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("catalogue-query", callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener("catalogue-query", callback); };
}
const getSnapshot = () => window.location.search;
const PAGE_SIZE = 24;

export function CatalogueGallery({ designs, fixedBrand, featured = false }: { designs: Design[]; fixedBrand?: BrandSlug; featured?: boolean }) {
  const query = useSyncExternalStore(subscribe, getSnapshot, emptySnapshot);
  const params = new URLSearchParams(featured ? "" : query);
  const activeBrand = fixedBrand ?? (brands.some(b => b.slug === params.get("brand")) ? params.get("brand")! : "all");
  const search = params.get("q") ?? "";
  const deferredSearch = useDeferredValue(search);
  const filtered = featured ? designs : designs
    .filter(d => (activeBrand === "all" || d.brand === activeBrand) && matchesDesign(d, deferredSearch))
    .sort((a, b) => deferredSearch.trim() ? Number(normalizeSearch(b.code ?? "") === normalizeSearch(deferredSearch)) - Number(normalizeSearch(a.code ?? "") === normalizeSearch(deferredSearch)) : 0);
  const [pagination, setPagination] = useState({ key: "", count: PAGE_SIZE });
  const filterKey = `${activeBrand}|${deferredSearch}`;
  const visibleCount = featured ? designs.length : pagination.key === filterKey ? pagination.count : PAGE_SIZE;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIndex = filtered.findIndex(d => d.id === selectedId);
  const close = useCallback(() => setSelectedId(null), []);
  function update(key: string, value: string) {
    const next = new URL(window.location.href);
    if (value && value !== "all") next.searchParams.set(key, value); else next.searchParams.delete(key);
    window.history.replaceState(null, "", next);
    window.dispatchEvent(new Event("catalogue-query"));
  }
  function reset() {
    const next = new URL(window.location.href);
    next.searchParams.delete("q"); next.searchParams.delete("brand");
    window.history.replaceState(null, "", next);
    window.dispatchEvent(new Event("catalogue-query"));
  }
  return <div className={`catalogue-gallery${featured ? " featured-gallery" : ""}`}>
    {!featured && <><div className="catalogue-controls"><div className="brand-filters" role="group" aria-label="Filter by brand">{!fixedBrand && <button className={activeBrand === "all" ? "active" : ""} aria-pressed={activeBrand === "all"} onClick={() => update("brand", "all")}>All designs</button>}{(fixedBrand ? brands.filter(b => b.slug === fixedBrand) : brands).map(b => <button key={b.slug} aria-pressed={activeBrand === b.slug} className={activeBrand === b.slug ? "active" : ""} onClick={() => update("brand", b.slug)}>{b.name}</button>)}</div><label className="catalogue-search"><Icon name="search"/><span className="sr-only">Search by article code or design name</span><input type="search" value={search} onChange={event => update("q", event.target.value)} placeholder="Article code or name, e.g. 5077" autoComplete="off"/></label></div><div className="results-summary"><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "design" : "designs"}{activeBrand !== "all" ? ` in ${activeBrand.toUpperCase()}` : " to explore"}</p><span>Find the texture. Imagine the space.</span>{(search || (!fixedBrand && activeBrand !== "all")) && <button className="reset-filters" onClick={reset}>Reset filters <Icon name="reset"/></button>}</div></>}
    {filtered.length ? <div className="design-grid">{filtered.slice(0,visibleCount).map(design => <DesignCard key={design.id} design={design} onOpen={() => setSelectedId(design.id)}/>)}</div> : <div className="empty-state"><Icon name="search"/><h2>{designs.length ? "No designs found" : "A collection to look forward to"}</h2><p>{designs.length ? "Try a different design name, code or brand to find your next idea." : "Explore the original brand catalogue or visit the shop to discuss your project."}</p>{designs.length > 0 && <button className="button button-dark" onClick={reset}>Reset filters <Icon name="reset"/></button>}</div>}
    {filtered.length > visibleCount && <div className="load-more"><p>Showing {Math.min(visibleCount,filtered.length)} of {filtered.length} designs</p><button className="button button-outline" onClick={() => setPagination({ key: filterKey, count: visibleCount + PAGE_SIZE })}>Load more designs <Icon name="plus"/></button></div>}
    {selectedIndex >= 0 && <Lightbox designs={filtered} initialIndex={selectedIndex} onClose={close}/>}
  </div>;
}
