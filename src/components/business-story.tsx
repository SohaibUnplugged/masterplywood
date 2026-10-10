import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./icons";

export function BusinessStory({ full = false }: { full?: boolean }) {
  return <section className="section container business-story" aria-labelledby="business-story-title">
    <div className="business-visuals">
      <figure className="shop-photo"><Image src={site.shopImage} alt="Master Hardware Plywood & Paint shopfront, showing the entrance and business sign" width={1200} height={791} sizes="(max-width: 800px) 90vw, 45vw"/><figcaption><Icon name="pin"/><span>Our shop<span>{site.area}</span></span></figcaption></figure>
      <figure className="owner-card">
        <Image className="owner-portrait" src={site.ownerImage} alt={`${site.owner}, owner of Master Plywood, inside the shop`} width={1085} height={2048} sizes="(max-width: 580px) 40vw, (max-width: 800px) 240px, 220px"/>
        <figcaption><span className="owner-role">OWNER & FOUNDER</span><p>{site.owner}</p><span>Established {site.founded}</span></figcaption>
      </figure>
    </div>
    <div className="business-story-copy"><p className="eyebrow">THE PERSON BEHIND MASTER PLYWOOD</p><h2 id="business-story-title">A local shop.<br/><em>A personal commitment.</em></h2>
      <p>Master Plywood was started by <strong>{site.owner}</strong> in <strong>{site.founded}</strong>. He owns the business and welcomes customers to our shop on Sialkot Road in Wazirabad.</p>
      <p>Explore designs from ZRK, KMI and MECATA, then talk to us about the materials you have in mind. From your first idea to a closer look at a surface, your next step can begin with a simple conversation.</p>
      {full && <p>Our online catalogue helps you compare designs before you visit. Save the article codes you like and share them on WhatsApp, or bring them to the shop to discuss colours, textures and availability in person.</p>}
      {full && <p>Our registered business name is <strong>{site.legalName}</strong>. Find us at {site.streetAddress}.</p>}
      <div className="business-facts"><div><span>Since</span><strong>{site.founded}</strong></div><div><span>Owned by</span><strong>{site.owner}</strong></div></div>
      <div className="story-actions"><a className="button button-dark" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp"/>Talk to us</a><Link className="text-link" href={full ? "/contact" : "/about"}>{full ? "Visit our shop" : "More about us"}<Icon name="arrow"/></Link></div>
    </div>
  </section>;
}
