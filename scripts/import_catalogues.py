"""Offline, repeatable importer. Install scripts/requirements.txt first.

Sources remain untouched. Human-reviewed layouts identify individual swatches;
decorative rooms, covers and advertisements are deliberately excluded.
Run with --source-dir PATH (defaults to ./catalogues/source).
"""
import argparse
import hashlib
import io
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.reference' / 'python'))
import pymupdf as fitz
from PIL import Image, ImageDraw, ImageFont

SOURCES = {'mecata': 'Mecata Book.pdf', 'kmi': 'KMI POCKET BOOK Change Book 18-12-2023.pdf', 'zrk': 'ZRK Book.pdf'}


def grid(box, rows):
    """Rows specify column count independently, including mixed 2/3-column pages."""
    x0, y0, x1, y1 = box
    boxes = []
    for r, columns in enumerate(rows):
        for c in range(columns):
            boxes.append((x0 + (x1-x0)*c/columns + .9, y0+(y1-y0)*r/len(rows)+.9,
                          x0 + (x1-x0)*(c+1)/columns-.9, y0+(y1-y0)*(r+1)/len(rows)-.9))
    return boxes


def layouts(brand, doc):
    if brand == 'mecata':
        for n in range(2, 8):
            boxes = grid((35, 26, 577, 766), [3, 3, 3, 3])
            yield n, boxes[:9] if n == 6 else boxes[:7] if n == 7 else boxes, 'scan-crop'
    elif brand == 'kmi':
        for n in list(range(3,81)) + list(range(82,114)):
            # Full embedded swatches exclude magnifier circles and label overlays.
            if 11 <= n <= 80:
                boxes = [(17,22.6,271,375.4)]
            else:
                boxes = grid((16.5,22,271.5,376),[2,2])
                if n == 5: boxes = boxes[:3]
                if n in (10,113): boxes = [boxes[0],boxes[2]]
            # Some solid colours are vector fills; some photos are tiled images.
            # Match only a complete embedded swatch to a verified design rectangle.
            parts = []
            images = doc[n-1].get_image_info(xrefs=True)
            for box in boxes:
                matches = [im for im in images if all(abs(a-b) < 3 for a,b in zip(box,im['bbox']))]
                parts.append({'bbox':box,'image':matches[0] if matches else None})
            yield n, parts, 'mixed'
    else:
        for n in range(4,84):
            if n in (9,35,55,63,65,69,71,75,79,80,81,82,83):
                continue  # Covers and door-panel layouts need separate review.
            if n <= 8:
                boxes = grid((27.5, 286.5, 368.5, 765.5), [2,2])
            else:
                top = 46 if n in range(10,14) or n in range(56,59) else 20
                rows = [3,3,3]
                if n in (10,11,12,56,57,58,66,67,68,72,73,74,76,77,78): rows = [2,2,2]
                if n in (13,32): rows = [2,2,3]
                if n in (33,34): rows = [2,2]
                if n in (67,68,74,78): rows = [2,2,3]
                if n in (72,73,76,77): rows = [2,2]
                if n == 58: rows = [2,2,1]
                if n == 70: rows = [2,3,3]
                boxes = grid((27.5, top, 368.5, 765.5), rows)
            yield n, boxes, 'scan-crop'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-dir', type=Path, default=ROOT / 'catalogues' / 'source')
    args = parser.parse_args()
    assets = ROOT / 'public' / 'designs'
    pdfs = ROOT / 'public' / 'catalogues'
    review_dir = ROOT / '.reference' / 'import'
    for p in (assets, pdfs, review_dir, ROOT / 'src' / 'data'):
        p.mkdir(parents=True, exist_ok=True)
    overrides_path = ROOT / 'catalogues' / 'verified-metadata.json'
    overrides = json.loads(overrides_path.read_text(encoding='utf-8')) if overrides_path.exists() else {}
    records, review, excluded = [], [], []
    for brand, filename in SOURCES.items():
        source = args.source_dir / filename
        if not source.exists():
            raise SystemExit(f'Missing source: {source}')
        shutil.copyfile(source, pdfs / f'{brand}.pdf')
        with fitz.open(source) as doc:
            counts = {}
            for page_number, parts, method in layouts(brand, doc):
                page = doc[page_number-1]
                for index, part in enumerate(parts, 1):
                    key = f'{brand}-p{page_number:03d}-{index:02d}'
                    bbox = part['bbox'] if method == 'mixed' else part
                    embedded = part.get('image') if method == 'mixed' else None
                    if embedded:
                        extracted = doc.extract_image(embedded['xref'])
                        image = Image.open(io.BytesIO(extracted['image'])).convert('RGB')
                    else:
                        pix = page.get_pixmap(matrix=fitz.Matrix(2.1,2.1), clip=fitz.Rect(bbox), alpha=False)
                        image = Image.frombytes('RGB', (pix.width,pix.height), pix.samples)
                    # Preserve each full swatch's proportions and labels; never synthesize textures.
                    full = assets / f'{key}.webp'
                    image.save(full, 'WEBP', quality=93, method=6)
                    thumb = image.copy()
                    thumb.thumbnail((480, 600))
                    thumb.save(assets / f'{key}-thumb.webp', 'WEBP', quality=82, method=6)
                    verified = overrides.get(key, {})
                    record = {
                        'id': key, 'brand': brand,
                        'name': verified.get('name'), 'code': verified.get('code'),
                        'thumbnail': f'/designs/{key}-thumb.webp', 'fullImage': f'/designs/{key}.webp',
                        'width': image.width, 'height': image.height,
                        'sourcePdf': f'/catalogues/{brand}.pdf', 'sourcePage': page_number,
                    }
                    records.append(record)
                    review.append({**record, 'method': 'embedded' if embedded else 'scan-crop', 'bbox': list(bbox), 'sourceSha256': None,
                                   'reviewFlags': [] if verified else ['metadata-not-transcribed'],
                                   'notes': 'Crop geometry checked against supplied page layouts. Unknown labels are intentionally omitted.'})
                    counts[page_number] = counts.get(page_number, 0)+1
                print(f'{brand}: page {page_number}: {counts.get(page_number,0)} designs', flush=True)
            if brand == 'zrk':
                excluded.append({'brand':brand,'pages':[80,81,82,83], 'reason':'Door-panel layouts held for separate crop and metadata review; retained in the original PDF.'})
    # Interleave brands so the default gallery presents all three collections immediately.
    groups = {b: [r for r in records if r['brand'] == b] for b in SOURCES}
    ordered = [group[i] for i in range(max(map(len,groups.values()))) for group in groups.values() if i < len(group)]
    (ROOT / 'src' / 'data' / 'catalogue.json').write_text(json.dumps(ordered,indent=2),encoding='utf-8')
    for brand, filename in SOURCES.items():
        digest = hashlib.file_digest(open(args.source_dir / filename,'rb'),'sha256').hexdigest()
        for r in review:
            if r['brand'] == brand: r['sourceSha256'] = digest
    (ROOT / 'catalogues' / 'import-review.json').write_text(json.dumps({'designs':review,'excluded':excluded},indent=2),encoding='utf-8')
    # Local review sheets: label + the matching asset ID, never visitor-facing.
    for brand in SOURCES:
        subset = [r for r in records if r['brand'] == brand]
        for start in range(0,len(subset),60):
            batch = subset[start:start+60]
            sheet = Image.new('RGB',(1200, ((len(batch)+7)//8)*180),'#eeeae2')
            draw = ImageDraw.Draw(sheet)
            for i,r in enumerate(batch):
                im = Image.open(ROOT / 'public' / r['thumbnail'].lstrip('/'))
                im.thumbnail((140,145))
                x,y = (i%8)*150,(i//8)*180
                sheet.paste(im,(x+(150-im.width)//2,y))
                draw.text((x+3,y+148),r['id'],fill='black')
            sheet.save(review_dir / f'{brand}-{start}.jpg',quality=90)
    print(f'Imported {len(records)} individual designs: ' + ', '.join(f'{b}: {len(g)}' for b,g in groups.items()))


if __name__ == '__main__':
    main()
