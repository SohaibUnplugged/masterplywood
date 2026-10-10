"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

const links = [{ href: "/catalogue", label: "Catalogue" }, { href: "/#brands", label: "Our brands" }, { href: "/about", label: "About us" }, { href: "/contact", label: "Visit the shop" }];
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <><button className="menu-toggle icon-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? "main-nav is-open" : "main-nav"}>{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={path === link.href ? "page" : undefined} className={link.href === "/contact" ? "nav-visit" : undefined}>{link.label}{link.href === "/contact" && <Icon name="arrow"/>}</Link>)}</nav></>;
}
