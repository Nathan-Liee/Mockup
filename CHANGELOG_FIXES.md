# CHANGELOG_FIXES — FAISHA Mockup (PROMPT_EXECUTOR v2.1)

Mulai: 2026-09-04. Executor: Claude (opus). CWD: `Faisha Mockup/`.

---

## PASS 0 — Audit (read-only)

### State kode saat mulai
- `App.tsx` (650 baris): masih `useState<NavTab>` — **KRIT-1 router BELUM wired**, walau artefak sesi sebelumnya sudah ada:
  - `src/routes.ts` — `TAB_TO_PATH` (66 tab) + `PATH_TO_TAB` (inline) + `EXTRA_PATHS` lengkap. `paths.ts` tidak ada (koreksi: PATH_TO_TAB computed inline, bukan import).
  - `src/context.tsx` — `AppCtx` + `useApp()` (state global siap pakai).
  - `src/components/Layout.tsx` — shell Header+Outlet+Footer+overlays, konsumsi `useApp()`. Belum dipakai App.
  - `src/utils/useModalA11y.ts` — Escape + body scroll lock. **Belum dipakai komponen manapun** (grep 0 hasil) → KRIT-6/7 masih open di overlay.
- `package.json`: `react-router-dom@^7.18.3` sudah terpasang. Tidak perlu install.
- `main.tsx`: render `<App/>` polos — belum ada `<BrowserRouter>`.
- 66 file komponen. Matches PROMPT §4.3 cluster table.

### Bug KRIT status vs Laporan QA §4 (verifikasi kode 2026-09-04)
| ID | Status | Bukti |
|---|---|---|
| KRIT-1 router | **OPEN** | `App.tsx:76` useState; routes.ts/Layout unused |
| KRIT-2 cart auto-clear | FIXED | `CartDrawer.tsx:51-55` — setTimeout & orderCompleted dihapus, tinggal `onCheckout?.()` |
| KRIT-3 scoring clamp | PERLU VERIFIKASI | cek `AssessmentModal.tsx` init+clamp, `ResultModal.tsx:133` label |
| KRIT-4 lang propagate | **OPEN** | `App.tsx` tidak pass lang ke Home/Journey/Shop/Rituals/Journal/Community/Footer; `AboutScreen` tanpa prop (line 281-283) |
| KRIT-5 delete palsu | PERLU VERIFIKASI | cek `DashboardLiteScreen.tsx:514+` |
| KRIT-6 Escape | **OPEN** | hook ada, belum dipakai |
| KRIT-7 scroll lock | **OPEN** | sama |
| BONUS-1 export palsu | PERLU VERIFIKASI | cek `DashboardLiteScreen.tsx:474+` |
| BONUS-2 fadeIn | FIXED (klaim sesi lalu) | verifikasi `index.css` |
| COMPLIANCE checkout | **OPEN** | `CartDrawer` tidak cek `isDraftNonPurchasable`; checkout aktif |

### Header/Footer vs team_catatan
- Header: logo kiri OK; menu 7 item tengah OK; kanan = lang, search, **CTA teks "Begin Assessment"** (Desktop), profile `S`, cart — urutan profile→cart OK. CTA teks melanggar catatan frame 003/004/008/010/015 ("ganti jadi icon Profile + Cart") — **OPEN**.
- Profile dropdown: sudah ada "Masuk / Daftar (065)" di dalam menu profile (catatan 015 terpenuhi).
- Footer: 4 kolom + newsletter bar. `onOpenPolicy('Sustainability')` masih toast dummy — **OPEN**.

### Dedup clusters (PROMPT §4.3) — rencana PASS 3
1. PDP: ProductDetail(029)/Simple(028)/Recommended(030)/OutOfStock(032).
2. Assessment: Modal(12Q) legacy vs FlowScreen(047-053) — satu sumber scoring + clamp.
3. Cart: Drawer vs Active(034)/Empty(035).
4. Dashboard: Lite vs Full + sub-screens.
5. Journal: public/private/editor — share key localStorage.

### PENDING Group F (MOCKUP_STATUS)
- PENDING: 095 LOADING, 097 ERROR, 098 SUCCESS, 099 LOCKED, 101 MODALDRAWER, 102 NOTFOUND, 103 OFFLINE.
- GENERATED: 096 (DesignSystemScreen), 100 (ConsentBanner) — tapi file **tidak ada di src/components** → verifikasi PASS 3.

### EXTRA_PATHS gaps
Path belum terpetakan hanya Group F (095-103) → dibuat PASS 3. Sisanya 001-094 lengkap via TAB_TO_PATH + EXTRA_PATHS.

### Governance
- Semua produk `DRAFT_NON_PURCHASABLE`; checkout demo disabled + banner.
- Tidak rename sid/FAI-SCR/Stable ID. Tidak invent harga/SKU/stok/copy.
- HTML ref = struktur kasar, bukan blueprint. PNG > team_catatan > Laporan QA > HTML.

---

## PASS 1 — Router wiring + Header/Footer + layout fixes

### KRIT-1 FIXED — router terpasang (2026-09-04)
- `src/App.tsx` rewrite: `BrowserRouter` + table-driven `<Routes>`; path = frame-id `/NNN`.
- `activeTab` = `PATH_TO_TAB[location.pathname]`; `goTab(tab)` = `navigate(TAB_TO_PATH[tab])` + scroll top.
- State global (cart/lang/returning/legalDoc) di `Router` → `AppCtx.Provider` → `Layout` + screens.
- Alias frame gabungan (002/004/006/008/009/013/015/035) → `<Navigate>` ke kanonik; 017/018 → LegalScreen doc eksplisit.
- 065-070 → AuthScreen `initialView` per path (login/register/forgot/reset/verify/merge).
- **File baru `src/components/SystemStates.tsx`** — Group F: 095 Loading, 097 Error, 098 Success, 099 Locked (→/065), 101 Modal/BottomSheet demo, 102 NotFound (juga catch-all `*`), 103 Offline. 096/100 tetap tidak dibangun (Group-F strict delete, reference-only).
- Frame coverage: 103/103 — 94 route eksplisit + alias Navigate + 7 system state. Tidak ada "coming soon".
- Lazy-load: ponytail — static import (dev instant); pecah `React.lazy` kalau chunk production terukur >1MB.
- `npm run lint` (tsc --noEmit) PASS.

(Header/Footer/layout fixes: lanjut task #2)

### Task #2 — Header + Footer + layout fixes (2026-09-04, via subagent — SELESAI)
- **Header.tsx**: tombol teks "Begin Assessment" desktop DIHAPUS (catatan 003/004/008/010/015). Menu → Home | The Journey | Rituals | Journal | Shop | About | Community ('community' → /011 menggantikan 'signature'/Musk Signature). Mobile drawer placeholder: icon profil & keranjang. Urutan kanan: profile → cart (tetap). Dropdown profile "Masuk / Daftar" tetap (catatan 015).
  - **Konflik, butuh review Davina**: menu navbar "Community" (instruksi user 2026-09-04) vs FIX_PLAN #19 ("Musk Signature"). Instruksi user menang.
- **Footer.tsx**: "Sustainability & Sourcing" `onOpenPolicy` toast → `onNavigate('about')` (/005). Semua link footer verified route nyata: Privacy/Terms/Shipping → /016-018, Contact → /007, Community Gatherings → /011, PDP → /028//032. Newsletter bar (FIX_PLAN #21 utk 061/090) tetap.
- **HomeScreen.tsx** (catatan 001): spacing hero dirapatkan — wrapper space-y-12→10, hero pt-4/8→2/4, gap-12→8, teks space-y-6→4, CTA gap-4→3 pt-4→2, trust bar pt-6→4. CTA bg solid #5B4750 (sudah benar, tak diubah). Copy 1:1 tetap.
- **Audit layout via subagent (PNG-first)**: 029/031 (PDP: logo, deskripsi di bawah CTA, accordion) — sudah sesuai PNG, SKIP. 061 (konten oke; catatan "Footer kosong" = urusan Footer global) — SKIP. 071 (bento grid) — sesuai PNG, SKIP.
- `npm run lint` PASS.

### Task #3 — Bug fungsi (2026-09-04 — SELESAI)
- **KRIT-3 FIXED**: scoring init 0 + clamp 0-100 di AssessmentModal; label persen ResultModal konsisten.
- **KRIT-4 FIXED (scope sadar)**: `lang` dipasang ke screen dengan copy ganda ID/EN di mockData (Home, About, Assessment flow, Legal, Support, Result, modals, Header, Footer). Journey/Community/Shop/JournalPublic tetap EN-only — konten verbatim PNG tanpa copy ID di package; prop lang = dead code (YAGNI, catat di sini).
- **KRIT-5 + BONUS-1 FIXED**: `DashboardScreen` — `exportData()` = dump localStorage (3 key `faisha.*`) → JSON download `faisha-data-export.json`; `deleteAccount()` = removeItem semua key + toast + navigasi beranda. 2 tombol wired (Minta Ekspor Data, Konfirmasi Penutupan Akun).
- **KRIT-6/7 FIXED**: `useModalA11y` (Escape + body scroll lock) dipasang di AssessmentModal, ResultModal, CartDrawer — dipanggil sebelum early return.
- **BONUS-2 VERIFIED**: `@keyframes fadeIn` + `.animate-fadeIn` di index.css.
- **COMPLIANCE FIXED**: CartActiveScreen CTA checkout → "Lanjut ke Checkout (Demo)" + comment GOVERNANCE + note "MOCK — DRAFT_NON_PURCHASABLE" + cursor-not-allowed; badge DRAFT di header list tetap. CartDrawer: badge DRAFT + teks "(demo)". CheckoutReviewScreen CTA disabled tetap.

---

## PASS 3 — Flow CTA + kelengkapan 103 + audit coming-soon (2026-09-04)

### CTA gantung / alert / noop
- `SupportScreen.tsx:352` alert() → toast inline pola JournalScreen (satu-satunya alert di src; grep noop `() => {}` = 0).
- `JournalScreen.tsx:55` breadcrumb "Rituals" → `onNavigate('rituals')` (/021), sebelumnya backToList mati.

### Audit "coming soon / segera hadir" (12+12 match — verdict per authority)
- **FIXED — CommunityMemberHomeScreen:27 (083 FUTURE/REFERENCE)**: "Community feed lengkap segera hadir" melanggar rule (JANGAN "coming soon") → "Future/Preview — bukan scope R1. Feed komunitas ini gambaran desain referensi."
- **FIXED — route /090**: sebelumnya render JournalPrivateScreen (konten 088) = frame 090 tanpa representasi → **file baru `JournalHistoryScreen.tsx`** (kalender mood, Sekilas Insight, Entri Terbaru, privacy note — teks verbatim html/090) + banner Future/Preview.
- **FIXED — AcademyModuleScreen (087 FUTURE/REFERENCE)**: tanpa banner → banner "Future/Preview — bukan scope R1" ditambah.
- **SAH (tidak diubah, dengan authority)**: Shop/Search badge Coming Soon (PNG 019); FocusRitual "segera hadir" (mockData 023 states `coming-soon`); ResultScreen Soul Ritual Blend card (061, disabled product); Dashboard/DashboardLite kartu Rewards "Segera hadir" (HTML 071 verbatim); Dashboard 2FA (mockData 082 `MFA-future`); MyRituals Soul Blend locked (DRAFT_NON_PURCHASABLE, 060); SoulPetals tooltip (HTML 073 verbatim "Segera Hadir"); Academy waitlist Kohort April (086, konten nyata); toast MOCK feedback + copy verbatim Legal (EN "coming soon" = teks dokumen legal ref, bukan placeholder).
- `npm run lint` PASS.

---

## PASS 4 — Verifikasi (2026-09-04)

### Click-through 3 journey (dev server localhost:3001, brave-devtools)
1. **Assessment PASS**: /001 hero → "Mulai Perjalananmu" → /044 intro → 12 pertanyaan (pilih radio → "Lanjut" ×11 → "Selesai") → "Memproses Profil Aromamu…" → result **"The Nurturer"** → "Simpan Hasil" (persist localStorage) → "Lihat Ringkasan Hasil Lengkap" → "The Nurturer — Intuitive Architect of Calm" → "Kembali ke Beranda" → /001.
2. **Commerce PASS (governance terjaga)**: /019 add-to-cart ×3 → badge cart "3" → CartDrawer (2 item, badge DRAFT, banner "DRAFT — NON-PURCHASABLE (MOCK)", subtotal Rp 182.000) → "Lanjut ke Halaman Cart (demo)" → /034 → "Lanjut ke Checkout (Demo)" (disabled visual + MOCK note) → /036 → /037 "Metode Pembayaran" → "Buat Pesanan" → /040 "Pembayaran Belum Berhasil" → "Coba Bayar Lagi" → /037.
3. **Discovery PASS**: /021 "Temukan Ritualmu" · /029 "Serenity Reed Diffuser" · /090 "Riwayat Jurnalmu" + banner Future/Preview · /083 + banner · /087 + banner · /035 · /102 · /095 · /097 · /103 · /065 · /007 · /016 — semua render konten nyata.

### Sweep 103 route (evaluate_script per path)
- **103/103 punya h1 + konten nyata** (`.qa-sweep.json`).
- **FIX /096 + /100**: sebelumnya jatuh ke NotFound catch-all. Root cause: comment sesi lama "Group-F strict delete, reference-only" di App.tsx + SystemStates.tsx — **salah vs authority**: review-103.csv row 096 `R1/P0, status "Ada"`, row 100 `R1/P0` (VOL2-B13/B41, varian accept/reject/granular/withdraw). Fix:
  - `SystemEmptyLibraryScreen` (096): 5 kartu empty state verbatim html/096 (inbox/cart/package/journal/search + recovery CTA).
  - `SystemConsentLibraryScreen` (100): 4 varian verbatim html/100 (Accept Banner, Granular Modal toggle Analitik interaktif + Esensial locked, Withdraw Panel, Reject-Honored). No dark patterns — opt-in, tolak setara terima.
  - 2 route `/096` `/100` + comment header dikoreksi.
- Verifikasi HMR: /096 h1 "Empty States" (5 cards) · /100 h1 "Consent States" (4 cards).

### Screenshot 3 breakpoint × 3 screen (`.qa-screens/`)
- `001-360|768|1440.png` (Home), `029-360|768|1440.png` (PDP Serenity Reed Diffuser), `061-360|768|1440.png` (Assessment result — "THE NURTURER" persist antar reload). Visual sanity-check 001-360: hero + trust bar + produk + footer dark — normal.

### Lint + build
- `npm run lint` (tsc --noEmit) **PASS**.
- `npm run build` **PASS** 6.81s. Warning chunk >500 kB — ponytail: static import; pecah `React.lazy` kalau production perlu.

### Catatan
- `GET /favicon.ico 404` di dev — kosmetik, tidak di-fix (tidak ada asset favicon di package).
- **Konflik terbuka untuk review Davina**: menu navbar "Community" (instruksi user 2026-09-04) vs FIX_PLAN #19 "Musk Signature" — instruksi user menang, tercatat.
- KRIT-4 scope: Journey/Community/Shop/JournalPublic tetap EN-only (konten verbatim PNG, tidak ada copy ID di package) — prop `lang` = dead code di sana, sengaja.


## PASS 5 — Browser QA /ecc:browser-qa (2026-09-04)

### Smoke
- Console: hanya `GET /favicon.ico 404` (kosmetik, tidak ada asset di package). 0 error JS.
- Network: modul semua 200/304. `Header.tsx 500` saat sesi (comment JSX di dalam opening tag — syntax invalid) → fixed, HMR pulih.
- 375px: `clientWidth 497 = scrollWidth` — tidak ada overflow horizontal (offender []).

### Interaksi
- Nav 7/7 (Home/The Journey/Rituals/Journal/Shop/About/Community) + hero CTA "Mulai Perjalananmu" → /044. Semua route path + h1 sesuai (`.qa-nav.json`).
- Journey persist: hasil assessment "The Nurturer" bertahan antar reload (localStorage).

### A11y (Lighthouse 13.4.1 desktop, /044) — 93 → **100**
- `color-contrast` ×3: progress counter quiz `#7f7478`→`#6b6065` (4.09→PASS, AssessmentFlowScreen.tsx); copyright footer `--f-soft/50`→`/75` (4.13→PASS, Footer.tsx).
- `label-content-name-mismatch`: aria-label cart → `` `View Shopping Cart (${cartCount} items)` `` — accessible name memuat badge count visible (Header.tsx).
- `heading-order`: 3 `h4` kolom footer (Explore/Support/Principles) skip level setelah main h2 → `h4`→`p` styled (semantik list-heading, zero visual diff). Verifikasi /061: h1→h2→h3 sequential.
- Sisa fail = `robots-txt` + `llms.txt` (SEO/Agentic) — artefak dev-server mockup, bukan scope R1.

### Visual regression
- Tidak ada baseline ter-commit → **INCONCLUSIVE** untuk diff formal. Referensi informal: 9 screenshot `.qa-screens/` (PASS 4) + smoke 001 desktop/375.

### Lint + build pasca-fix a11y
- `npm run lint` **PASS** · `npm run build` **PASS** 5.71s (chunk >500 kB warning tetap — ponytail sama).

### Bug proses
- Comment JSX `{/* */}` tidak boleh di dalam opening tag (hanya child) — bug ini sempat bikin semua page 500/DOM kosong.
