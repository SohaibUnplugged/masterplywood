import type { CSSProperties } from "react";

type Name = "arrow" | "external" | "search" | "close" | "plus" | "minus" | "reset" | "pin" | "chevron" | "expand" | "download" | "menu" | "phone" | "whatsapp";
const paths: Record<Name, React.ReactNode> = {
  phone: <path d="m7 3 3 5-2 2a16 16 0 0 0 6 6l2-2 5 3v3a2 2 0 0 1-2 1C10 20 4 14 3 5a2 2 0 0 1 1-2h3Z" />,
  whatsapp: <><path d="M21 11.5a9.5 9.5 0 0 1-14 8.4L3 21l1.1-4A9.5 9.5 0 1 1 21 11.5Z"/><path d="m8 7 1.5 2.5-1 1a10 10 0 0 0 4 4l1-1L17 15c-.5 2-2 2-3.5 1.5a12 12 0 0 1-6-6C7 9 6.5 7.5 8 7Z"/></>,
  arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
  external: <><path d="M14 4h6v6M20 4 10 14M10 4H4v16h16v-6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  reset: <><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /></>,
  pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  chevron: <path d="m9 5 7 7-7 7" />,
  expand: <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
};
export function Icon({ name, className, style }: { name: Name; className?: string; style?: CSSProperties }) {
  return <svg className={className} style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
