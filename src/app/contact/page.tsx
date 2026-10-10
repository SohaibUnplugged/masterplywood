import Link from "next/link";
import { Breadcrumbs } from "@/components/shell";
import { ShopMap } from "@/components/shop-map";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return <div className="container">
    <Breadcrumbs items={[{ name: "Visit & contact", path: "/contact" }]}/>
    <header className="page-heading"><p className="eyebrow">LET’S TALK MATERIALS</p><h1>Your next project.<br/><em>Let’s start a conversation.</em></h1><p>Call, send us a design code on WhatsApp, or visit the shop.<br/>We look forward to welcoming you to Master Plywood.</p></header>
    <section className="contact-layout">
      <div className="location-card"><div className="location-symbol"><Icon name="whatsapp"/></div><p className="eyebrow">WE’RE A CONVERSATION AWAY</p><h2>Talk to Master Plywood</h2><a className="contact-number" href={`tel:${site.phone}`}>{site.phoneDisplay}</a><p>Share an article code or ask about a material.<br/>Use the same number for calls and WhatsApp.</p><div className="contact-card-actions"><a className="button button-dark" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp"/>WhatsApp us</a><a className="button button-outline" href={`tel:${site.phone}`}><Icon name="phone"/>Call us</a></div></div>
      <div className="contact-details"><p className="eyebrow">OUR BUSINESS AT A GLANCE</p><h2>A real shop.<br/><em>A personal welcome.</em></h2><p>Visit us to discuss your material choices and see designs in person. Colours and textures can look different on a screen; the shop is the place to take a closer look.</p><dl>
        <div><dt>Business</dt><dd>{site.name}</dd></div>
        <div><dt>Registered as</dt><dd>{site.legalName}</dd></div>
        <div><dt>Owner</dt><dd>{site.owner}</dd></div>
        <div><dt>Established</dt><dd>{site.founded}</dd></div>
        <div><dt>Area</dt><dd>{site.area}</dd></div>
        <div><dt>Address</dt><dd><address>{site.streetAddress}</address></dd></div>
        <div><dt>Phone</dt><dd><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">{site.phoneDisplay}<Icon name="external"/></a></dd></div>
        {site.openingHours.length > 0 && <div><dt>Hours</dt><dd>{site.openingHours.join(", ")}</dd></div>}
      </dl></div>
    </section>
    <ShopMap/>
    <section className="contact-reminder"><span className="little-star" aria-hidden="true">✳</span><div><h2>Keep your favourites handy.</h2><p>Note the brand and article code, or share a screenshot with us on WhatsApp.</p></div><Link href="/catalogue" className="text-link">Browse designs<Icon name="arrow"/></Link></section>
  </div>;
}
