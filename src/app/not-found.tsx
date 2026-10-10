import Link from "next/link";
import { Icon } from "@/components/icons";
export const metadata = { title: "Page Not Found | Master Plywood", alternates: { canonical: "https://masterplywood.pk/404" } };
export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">404 · A DIFFERENT DIRECTION</p><h1>This page isn’t<br/><em>in the collection.</em></h1><p>Let’s get you back to something worth exploring.</p><Link className="button button-dark" href="/catalogue">Explore the catalogue <Icon name="arrow"/></Link><Link className="text-link" href="/">Back to home <Icon name="arrow"/></Link></section>;
}
