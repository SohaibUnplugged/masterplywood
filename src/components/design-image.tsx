"use client";
import Image from "next/image";
import { useState } from "react";
import { designAlt, type Design } from "@/lib/catalogue";

export function DesignImage({ design, priority = false }: { design: Design; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="image-fallback" role="img" aria-label={designAlt(design)}>Image unavailable<span>Open the original catalogue to view this design.</span></span>;
  return <Image src={design.thumbnail} alt={designAlt(design)} width={design.width} height={design.height} sizes="(max-width: 580px) 50vw, (max-width: 1000px) 33vw, 25vw" priority={priority} onError={() => setFailed(true)}/>;
}
