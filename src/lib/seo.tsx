import type { Metadata } from "next";
import pages from "@/data/pages.json";
import { site, faqs, browsingSteps } from "./site";

export type PagePath = keyof typeof pages;
export const publicPaths = Object.keys(pages) as PagePath[];
export function pageMetadata(path: PagePath): Metadata {
  const { title, description } = pages[path];
  const url = new URL(path, site.origin).href;
  return {
    title: { absolute: title }, description, alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, siteName: site.name, locale: "en_PK", type: "website", images: [{ url: `${site.origin}/opengraph-image`, width: 1200, height: 630, alt: "Master Plywood — explore ZRK, KMI and MECATA catalogue designs" }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: `${site.origin}/opengraph-image`, alt: "Master Plywood catalogue" }] },
  };
}
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
export function BusinessSchema() {
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": `${site.origin}/#website`, url: site.origin, name: site.name, publisher: { "@id": `${site.origin}/#business` } },
    { "@type": ["Organization", "LocalBusiness"], "@id": `${site.origin}/#business`, name: site.name, legalName: site.legalName, url: site.origin, hasMap: site.mapsUrl, foundingDate: site.foundingDate, image: `${site.origin}${site.shopImage}`, geo: { "@type": "GeoCoordinates", ...site.coordinates }, areaServed: ["Wazirabad", "Gujranwala"], founder: { "@type": "Person", name: site.owner, image: `${site.origin}${site.ownerImage}` }, contactPoint: { "@type": "ContactPoint", telephone: site.phone, contactType: "customer service" },
      ...(site.phone ? { telephone: site.phone } : {}), address: { "@type": "PostalAddress", streetAddress: site.streetAddress, addressLocality: site.locality, addressRegion: site.region, addressCountry: "PK" }, ...(site.openingHours.length ? { openingHours: site.openingHours } : {}),
    },
  ] }} />;
}
export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: new URL(item.path, site.origin).href })) }} />;
}
export function HomeSchemas() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "HowTo", name: "How to explore designs at Master Plywood", step: browsingSteps.map((step, index) => ({ "@type": "HowToStep", position: index + 1, ...step })) }} /></>;
}
