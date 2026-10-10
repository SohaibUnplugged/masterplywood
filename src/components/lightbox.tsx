"use client";
/* Full-size assets are loaded only by this dynamically imported dialog. */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { designAlt, designTitle, type Design } from "@/lib/catalogue";
import { Icon } from "./icons";

export default function Lightbox({ designs, initialIndex, onClose }: { designs: Design[]; initialIndex: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<{ x: number; y: number; px: number; py: number; time: number; pointerId: number } | null>(null);
  const design = designs[index];
  const reset = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);
  const navigate = useCallback((step: number) => { setIndex(i => (i + step + designs.length) % designs.length); reset(); setFailed(false); gesture.current = null; setDragging(false); }, [designs.length, reset]);
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => { element?.close(); document.body.style.overflow = oldOverflow; opener?.focus({ preventScroll: true }); };
  }, []);
  useEffect(() => {
    const onResize = () => reset();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reset]);
  function changeZoom(delta: number) {
    setZoom(z => Math.max(1, Math.min(4, Number((z + delta).toFixed(1)))));
    setPan({ x: 0, y: 0 });
  }
  function clampPan(x: number, y: number) {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const fit = Math.min(rect.width / design.width, rect.height / design.height);
    const maxX = Math.max(0, (design.width * fit * zoom - rect.width)/2);
    const maxY = Math.max(0, (design.height * fit * zoom - rect.height)/2);
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  }
  return <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-help" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => {
    if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && zoom === 1 && !(event.target instanceof HTMLInputElement)) { event.preventDefault(); navigate(event.key === "ArrowLeft" ? -1 : 1); }
  }} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className="lightbox-content"><header className="lightbox-header"><div><span className="eyebrow">{design.brand.toUpperCase()} COLLECTION</span><h2 id="lightbox-title">{designTitle(design)}</h2></div><button autoFocus className="icon-button" onClick={onClose} aria-label="Close design viewer"><Icon name="close"/></button></header>
      <div ref={stage} className={`lightbox-stage${zoom > 1 ? " is-zoomed" : ""}${dragging ? " is-dragging" : ""}`} style={{ touchAction: "none" }} onDoubleClick={() => zoom === 1 ? changeZoom(1) : reset()} onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        gesture.current = { x: event.clientX, y: event.clientY, px: pan.x, py: pan.y, time: Date.now(), pointerId: event.pointerId };
        setDragging(zoom > 1);
      }} onPointerMove={event => {
        if (gesture.current && gesture.current.pointerId === event.pointerId && zoom > 1) setPan(clampPan(gesture.current.px + event.clientX - gesture.current.x, gesture.current.py + event.clientY - gesture.current.y));
      }} onPointerUp={event => {
        const start = gesture.current;
        if (start && zoom === 1 && event.pointerType === "touch" && Date.now()-start.time < 800) {
          const dx = event.clientX-start.x, dy = event.clientY-start.y;
          if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy)*1.5) navigate(dx < 0 ? 1 : -1);
        }
        gesture.current = null; setDragging(false);
      }} onPointerCancel={() => { gesture.current = null; setDragging(false); }}>
        {failed ? <div className="lightbox-image-error">This image could not be loaded.<a href={`${design.sourcePdf}#page=${design.sourcePage}`} target="_blank" rel="noopener noreferrer">View it in the original catalogue <Icon name="external"/></a></div> : <img key={design.id} src={design.fullImage} alt={designAlt(design)} width={design.width} height={design.height} draggable={false} onError={() => setFailed(true)} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}/>}</div>
      <div className="lightbox-toolbar"><div className="gallery-nav"><button className="icon-button" onClick={() => navigate(-1)} aria-label="Previous design" disabled={designs.length < 2}><Icon name="chevron" style={{ transform: "rotate(180deg)" }}/></button><span aria-live="polite" aria-atomic="true">{index+1} of {designs.length}</span><button className="icon-button" onClick={() => navigate(1)} aria-label="Next design" disabled={designs.length < 2}><Icon name="chevron"/></button></div><div className="zoom-controls"><button className="icon-button" aria-label="Zoom out" disabled={zoom === 1} onClick={() => changeZoom(-.5)}><Icon name="minus"/></button><output aria-label="Zoom level">{Math.round(zoom*100)}%</output><button className="icon-button" aria-label="Zoom in" disabled={zoom === 4} onClick={() => changeZoom(.5)}><Icon name="plus"/></button><button className="icon-button" aria-label="Reset zoom" onClick={reset}><Icon name="reset"/></button></div><a className="source-link" href={`${design.sourcePdf}#page=${design.sourcePage}`} target="_blank" rel="noopener noreferrer">PDF · Page {design.sourcePage} <Icon name="external"/></a></div><p id="lightbox-help" className="lightbox-help">Use arrow keys or swipe to browse. Zoom in and drag to explore. Press Escape to close.</p>
    </div>
  </dialog>;
}
