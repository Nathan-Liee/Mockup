# ITS FAISHA™ — Mockup (Vite + React 19 + Tailwind v4)

Mockup interaktif R1/P0 untuk ITS FAISHA Gate C (38 kanvas + wiring flow). Tanpa backend — semua state mock via `src/data/mockData.ts` + `localStorage`.

## Run Locally

**Prerequisites:** Node.js 18+, npm

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # vite build (dist/)
npm run lint     # tsc --noEmit
```

## Struktur

- `src/App.tsx` — 44 route + 9 alias, `activeTab` state
- `src/components/` — 50+ screen (1:1 `faisha-gallery/html` + `png`)
- `src/data/mockData.ts` — FRAME_INVENTORY_103 + PRODUCTS (DRAFT_NON_PURCHASABLE)
- `faisha-gallery/` — referensi html/png 104 screen (sibling folder di package)

## Validasi

```bash
python tools/validate_package.py  # di root package → PASS_WITH_CONTROLLED_BLOCKERS
```

## Catatan

- Semua purchase CTA mock (`MOCK — DRAFT`), bukan transaksi real
- Palette: #FAF3EE / #5B4750 / #BDA494, Playfair Display + Plus Jakarta Sans
- Jangan invent harga/SKU/UUID — pakai `mockData.ts` atau CONTROLLED_TBD
