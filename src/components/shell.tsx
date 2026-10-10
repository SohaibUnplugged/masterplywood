import Link from "next/link";
import { Navigation } from "./navigation";
import { Icon } from "./icons";
import { site, brands } from "@/lib/site";
import { BreadcrumbSchema } from "@/lib/seo";

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return <Link className={`wordmark${footer ? " wordmark-footer" : ""}`} href="/" aria-label="Master Plywood home"><span className="monogram" aria-hidden="true">M<span>P</span></span><span>MASTER PLYWOOD<small>MATERIALS FOR YOUR IDEAS</small></span></Link>;
}
export function Header() {
  return <header className="site-header"><div className="container header-inner"><Wordmark/><Navigation/></div></header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-intro"><Wordmark footer/><p>A place to explore materials.<br/>Established {site.founded}.</p><p className="registered-name">Registered business<span>{site.legalName}</span></p><a className="text-link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Find us on Google Maps <Icon name="external"/></a></div><div><h2>Explore</h2><Link href="/catalogue">Design catalogue</Link><Link href="/about">About Master Plywood</Link><Link href="/contact">Visit & contact</Link></div><div><h2>Our brands</h2>{brands.map(b => <Link key={b.slug} href={`/catalogue/${b.slug}`}>{b.name}</Link>)}</div><div className="footer-contact"><h2>Come say hello</h2><a href={`tel:${site.phone}`}><Icon name="phone"/>{site.phoneDisplay}</a><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp"/>Message on WhatsApp</a><address className="footer-address">{site.streetAddress}</address><p>Owned by<br/>{site.owner}</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Master Plywood</span><span>Find the texture. Imagine the space.</span><a href="#top">Back to top ↑</a></div></footer>;
}
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{all.map((item, i) => <li key={item.path}>{i > 0 && <span aria-hidden="true">/</span>}{i === all.length-1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}</li>)}</ol></nav><BreadcrumbSchema items={all}/></>;
}
export function VisitBanner() {
  return <section className="visit-banner"><div className="container visit-inner"><div><p className="eyebrow">FROM THE SCREEN TO YOUR SPACE</p><h2>See something you like?<br/><em>Let’s talk in person.</em></h2><p>Bring your design ideas to our shop opposite High Class Bakers on Sialkot Road, Wazirabad.</p></div><a className="button button-light" href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin"/> Find our shop <Icon name="external"/></a></div></section>;
}
