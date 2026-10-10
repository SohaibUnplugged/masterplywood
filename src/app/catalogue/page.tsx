import Link from "next/link";
import { CatalogueGallery } from "@/components/catalogue-gallery";
import { Breadcrumbs, VisitBanner } from "@/components/shell";
import { Icon } from "@/components/icons";
import { designs } from "@/lib/catalogue";
import { brands } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/catalogue");
export default function CataloguePage() {
  return <><div className="container"><Breadcrumbs items={[{name:"Catalogue",path:"/catalogue"}]}/><header className="page-heading catalogue-heading"><p className="eyebrow">THE MASTER PLYWOOD MATERIAL LIBRARY</p><h1>A surface for<br/><em>every possibility.</em></h1><p>Explore individual designs from ZRK, KMI and MECATA.<br/>Find a favourite, open it up, and take a closer look.</p></header><CatalogueGallery designs={designs}/><section className="pdf-section"><div><p className="eyebrow">PREFER TO TURN THE PAGES?</p><h2>Explore the original catalogues.</h2></div><div>{brands.map(b => <Link key={b.slug} className="text-link" href={`/catalogue/${b.slug}`}>{b.name} catalogue <Icon name="arrow"/></Link>)}</div></section></div><VisitBanner/></>;
}
