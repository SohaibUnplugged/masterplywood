"""Render the original label areas for local OCR; never alter product images."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.reference' / 'python'))
import pymupdf

target = ROOT / '.reference' / 'labels'
target.mkdir(parents=True, exist_ok=True)
review = json.loads((ROOT / 'catalogues' / 'import-review.json').read_text())
documents = {brand: pymupdf.open(ROOT / 'public' / 'catalogues' / f'{brand}.pdf') for brand in ('kmi', 'zrk', 'mecata')}
for item in review['designs']:
    x0, y0, x1, y1 = item['bbox']
    label = pymupdf.Rect(x0, y1 - (y1 - y0) * .27, x1, y1)
    page = documents[item['brand']][item['sourcePage'] - 1]
    page.get_pixmap(matrix=pymupdf.Matrix(4, 4), clip=label, alpha=False).save(target / f"{item['id']}.png")
for document in documents.values():
    document.close()
print(f"Prepared {len(review['designs'])} original catalogue label crops.")
