import { site } from "@/lib/site";
import { Icon } from "./icons";

export function ContactButtons() {
  return <nav className="contact-dock" aria-label="Quick contact">
    <a className="dock-whatsapp" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Master Plywood on ${site.phoneDisplay}`}><Icon name="whatsapp"/><span>WhatsApp</span></a>
    <a className="dock-phone" href={`tel:${site.phone}`} aria-label={`Call Master Plywood on ${site.phoneDisplay}`}><Icon name="phone"/><span>Call us</span></a>
  </nav>;
}
