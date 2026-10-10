import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = 'Master Plywood — explore ZRK, KMI and MECATA catalogue designs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function SocialImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', background: '#f5f2eb', color: '#272c24', display: 'flex', flexDirection: 'column', padding: '70px 80px', justifyContent: 'space-between' }}><div style={{ display: 'flex', fontSize: 24, letterSpacing: 4 }}>MASTER PLYWOOD</div><div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'serif', fontSize: 78, lineHeight: 1.08 }}><span>Every great space starts with</span><span style={{ color: '#75806a', fontStyle: 'italic' }}>the right surface.</span></div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, borderTop: '1px solid #c5cabb', paddingTop: 26 }}><span>ZRK · KMI · MECATA</span><span>{site.area}</span></div></div>, size);
}
