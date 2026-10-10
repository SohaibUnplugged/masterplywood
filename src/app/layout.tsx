import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/shell";
import { BusinessSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactButtons } from "@/components/contact-buttons";
import "./globals.css";

export const metadata: Metadata = { ...pageMetadata("/"), metadataBase: new URL(site.origin), applicationName: site.name, icons: { icon: "/icon.svg", apple: "/apple-icon" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f2eb" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/><ContactButtons/><BusinessSchema/></body></html>;
}
