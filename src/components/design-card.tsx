"use client";
import { designTitle, type Design } from "@/lib/catalogue";
import { DesignImage } from "./design-image";
import { Icon } from "./icons";

export function DesignCard({ design, onOpen }: { design: Design; onOpen: () => void }) {
  return <button className="design-card" onClick={onOpen} aria-haspopup="dialog" aria-label={`View ${design.brand.toUpperCase()} ${designTitle(design)}, catalogue page ${design.sourcePage}`}><span className="design-preview"><DesignImage design={design}/><span className="design-brand">{design.brand.toUpperCase()}</span><span className="preview-expand"><Icon name="expand"/></span></span><span className="design-card-info"><span><span className="design-title">{designTitle(design)}</span><span className="design-code">{design.code ? `Article code ${design.code}` : `Catalogue · Page ${design.sourcePage}`}</span></span><span className="view-design">View design <Icon name="arrow"/></span></span></button>;
}
