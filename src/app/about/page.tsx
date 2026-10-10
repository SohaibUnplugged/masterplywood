import Link from "next/link";
import { Breadcrumbs, VisitBanner } from "@/components/shell";
import { BusinessStory } from "@/components/business-story";
import { Icon } from "@/components/icons";
import { site, brands } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
  return <>
    <div className="container"><Breadcrumbs items={[{ name: "About", path: "/about" }]}/><header className="page-heading"><p className="eyebrow">OUR STORY · ESTABLISHED AUGUST 2020</p><h1>Meet Master Plywood.<br/><em>And the person behind it.</em></h1><p>A local business owned by {site.owner}.<br/>A place to explore materials and talk about your next project.</p></header></div>
    <BusinessStory full/>
    <div className="container"><section className="about-brands section"><p className="eyebrow">THE BRANDS IN OUR CATALOGUE</p><h2>Three collections.<br/><em>A world of possibilities.</em></h2><div>{brands.map(brand => <Link className="about-brand" key={brand.slug} href={`/catalogue/${brand.slug}`}><h3>{brand.name}</h3><p>{brand.description}</p><Icon name="arrow"/></Link>)}</div></section></div>
    <VisitBanner/>
  </>;
}
