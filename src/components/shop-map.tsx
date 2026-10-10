import { site } from "@/lib/site";
import { Icon } from "./icons";

export function ShopMap() {
  return <section className="shop-map" aria-labelledby="shop-map-title"><div className="map-heading"><div><p className="eyebrow">VISIT MASTER PLYWOOD</p><h2 id="shop-map-title">Find us. <em>Come say hello.</em></h2><address>{site.streetAddress}</address></div><a className="button button-outline" href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin"/>Get directions<Icon name="external"/></a></div><div className="map-frame"><iframe title="Google Maps location of Master Plywood" src={site.mapsEmbedUrl} width="1200" height="440" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a className="map-shop-label" href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin"/><span>Master Plywood<small>Open location in Google Maps</small></span><Icon name="external"/></a></div></section>;
}
