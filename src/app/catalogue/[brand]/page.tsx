import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogueGallery } from "@/components/catalogue-gallery";
import { Breadcrumbs, VisitBanner } from "@/components/shell";
import { Icon } from "@/components/icons";
import { byBrand } from "@/lib/catalogue";
import { brands } from "@/lib/site";
import { pageMetadata, type PagePath } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return brands.map(b => ({brand:b.slug})); }
type Props = { params: Promise<{ brand: string }> };
export async function generateMetadata({params}: Props) {
  const {brand} = await params;
  if (!brands.some(b => b.slug === brand)) notFound();
  return pageMetadata(`/catalogue/${brand}` as PagePath);
}
export default async function BrandPage({params}: Props) {
  const {brand} = await params;
  const info = brands.find(b => b.slug === brand);
  if (!info) notFound();
  return <><div className="container"><Breadcrumbs items={[{name:"Catalogue",path:"/catalogue"},{name:info.name,path:`/catalogue/${info.slug}`}]}/><header className="page-heading brand-page-heading"><div><p className="eyebrow">THE {info.name} COLLECTION</p><h1>{info.name} designs.<br/><em>Your next inspiration.</em></h1><p>{info.description}<br/>Open a design to explore the details.</p></div><div className="pdf-actions"><a className="button button-outline" href={info.pdf} target="_blank" rel="noopener noreferrer">View original PDF <Icon name="external"/></a><a className="text-link" href={info.pdf} download>Download catalogue <Icon name="download"/></a></div></header><CatalogueGallery designs={byBrand(info.slug)} fixedBrand={info.slug}/><div className="other-brands"><Link href="/catalogue" className="text-link">Explore all brands <Icon name="arrow"/></Link></div></div><VisitBanner/></>;
}
