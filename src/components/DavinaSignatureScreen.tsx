import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';

/**
 * SEQ 027 — 1:1 faisha-gallery/html/027_37f9c5229c834e7e85aa3149bc751299.html (baris 149-284).
 * Struktur, copy, dan token dityalin literal: hero gambar + kartu mengambang, band rekomendasi
 * assessment (accordion "Kenapa Ini Cocok untukmu"), grid 6 arah aroma — Amber dalam state
 * expanded (chip Format + pairing "Amber & Citrine" + "Tambahkan"), 5 lainnya compact "Lihat Produk".
 *
 * TRANSLASI TOKEN CDN → Tailwind v4 (arbitrary value, BUKAN token --spacing-* yang menimpa
 * namespace max-w-* — lihat komentar di index.css):
 *   spacing xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 3xl=64 · margin-desktop=40→px-10 · section-desktop=100→py-[100px]
 *   type    display-lg=48/56 -.02em 600 · display-lg-mobile=38/44 · title-lg=22/28 600 · body-bold=16/24 600
 *           body-lg=18/28 · body-base=16/24 · label-sm=11/16 .04em 500
 *   util    hairline-border (sudah ada di index.css) · diffused-shadow → shadow-[0_4px_20px_rgba(91,71,80,0.04)]
 *   warna   surface-tint ref-027=#6e5962 (DRIFT) → TIDAK dipakai; #F2E9E5 literal sesuai HTML.
 *
 * GOVERNANCE: html/027 TIDAK memuat harga/SKU/stok → tidak ada yang dikarang. "Tambahkan" dan
 * "Lihat Produk" hanya memanggil callback demo (produk = DRAFT_NON_PURCHASABLE).
 * Copy html/027 ID-only → paritas EN = DRAFT_COPY (design/localization-contract.md), tidak dicampur.
 */

const IMG = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz6D0_pyvREWz3qlMtfexSaHcLRUqWzbh7Q4-7erryT5HzkWy6E7O4pKYzGGfH4a9ihqJgFdAIDlDHsx-pkA4GN6OmZmqmtaBzokCT6YgDWFQUwYoDyNFShS37pRLc10eykIYWCxS-BJ2vZDWeRnwHfqQLSI9phQwzntbaxu-EwWVDvulpMppnTQD-0EGzbi9bX2OZKBt5DTMj1cF_kYvYtUjXkRm5bfooxMikUtq9F08xBbLvOdyZcdlpnyzsYRC91L0K_u8CE_o',
  amber:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD5FQbguHg4w5QJzQkWzIj8WgirqzzXeih__Sk3_JVYUgO7CBSQRVl44nO76DSKrK3RnjghfRfaX7oVIxVc2DogPL8vQ-NS1ZrwFf0k00_d4rOBBTRSXLaRZJpTxnuPwEallEzG16LuWPQeGkozcVefqtm2ws2rT4z2fnqbgx835BApTvVOOCfmOV7tOYnachlBYXgc8cFwl82Csr7t5Xq5lG1GyQBnKFOI29LhzAjwr28YlRKhyTk0FgcmwhYGR4WpSh2GblQwcgg',
  vanilla:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDVOSHh-G9YFLsv8e77EBj2Y4t9rZIV5W2evV-wy7CJam2-xduaWNGURGEXNcO9kqB7MZNuEWVZnAHolUSdYC-T5wXKbIMBDSZzkFno87NQjSCUyoGxjcqFBcbGA2ZVY2k9hahuYzYZTKFxdRYvrqotKquIktnarBGf31hFeLtZ2-MJu9KNByda6CCPUQLpJxOBdK3P6JtwB0hw-Zum2e5hpd_VTeU6e_frRHUwiG5DxxIiw6e61PD3CsU2HlB6ggQww9bR-wql-PI',
  terra:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApevO1ig5rsHmapne_mUvfaEj2VYSM2WUx7EYuJjFI5j5wldCl7Zi_QC56ImOgiKvCTrUc56niOrcRzJ2ttKtrSECQYXB8irPvMZUzLAwPdqWK6_PD3NYPKD_afr-M-h9M7Lrx7TZgzCDuJV9s4t6Rv7AtktBaPxVcCXwhst-RndAmbHkKptYiefEHOnM9NC18WciHd4LX-oC9ZV-ChW8ABBvt-n5E8imsNs2ucChg8Gff6dWQ6-vdxdsU9nhKNwYpPzE8sMsJ5Cs',
  cashmere:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDba1katCTvSKj_e8KzGIE3EubI20ZHAnIRuD9r6_sqIlnOg2WOHvQ7IJrZ-fORCI3wR_W5URTtbiNl1Z02iaPH2aO0pGoxFuyrB0laQsUf2QFEiCJQnrb7LDtuionsvZEMhOTcZlgFBMVu_Cskr8WZvuZiP-VhLM1zPPb1JQfyhDpWbsTagmskrxVGXN-MHGmNu32ebDVtG9e5yAR7o6SATpqw42MpndXWS0_qv0FFeZJLIJEnWutTR0bC_3FQcUUhJKwp9OXujks',
  seaSalt:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuASVm5iqvNB-tprCpFrYfUmkcLNsAwa44jYZt9tnV8gg6CLOBMxZGmRzlGeai7VgS1hkH1vL0YYNBvEJao1Irz_O2QCKYOY_aQ5LncyeCOJT5V9kacG-W3pODRBwpMLbEpYs5fU4hAtCA_y04a4HgCJD7V4u6emqkLlkL78Yk6Kt_HxpY_ukTSNJOVjRC8i5BY3KwMgwm2m3Xil2IgKEUBtEcANmy24-fv88q4vfcosrrrj0Tzkm2p6JjSOfRK_uc19CZM8wBrRrA0',
  vetiver:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBYbgtUTJPasqjiTFqMpQBN8LvXYPdramFI4_H3cyOlHsj3O9e6prMUr0VvWQB83vXEa7jNPqV3yqOvbv5A54ZShXGSpes02Sqyyj8cbfOuGtCuM7g8bPq2Ak36x2hQv7TR-4sMDn0gqkugdZLKf6SpnQFcnFmpu83YTNpOLvXEqI87ywlBYMBPZ5YOxAzk3Y1IRsyi-T0w6bb3D4bLXlR66qPvVFpDHvJQPJKQ94KSOR-Z9D5Kj4aJO8a9lwwOcu9x7z8bGHuuQ-4',
};

const FORMATS = ['Lilin 200g', 'Diffuser 150ml', 'Room Spray 100ml', 'Eau de Parfum 50ml'];

// 5 arah compact — nama + deskriptor literal html/027.
const DIRECTIONS = [
  { name: 'Vanilla', desc: 'lembut, manis, comforting', image: IMG.vanilla },
  { name: 'Terra', desc: 'earthy, grounding, stabil', image: IMG.terra },
  { name: 'Cashmere', desc: 'cozy, peluk hangat, aman', image: IMG.cashmere },
  { name: 'Sea Salt', desc: 'segar, bersih, membebaskan', image: IMG.seaSalt },
  { name: 'Vetiver', desc: 'smoky, dalam, kontemplatif', image: IMG.vetiver },
];

const CARD_BASE =
  'rounded-lg overflow-hidden hairline-border flex flex-col h-full bg-[#fff8f7] hover:shadow-[0_4px_20px_rgba(91,71,80,0.04)] transition-shadow';
const OUTLINE_PILL =
  'w-full h-12 rounded-full bg-[#F2E9E5] text-[#433139] text-[16px] leading-[24px] font-semibold hover:bg-[#E7DBD6] transition-colors cursor-pointer';

interface DavinaSignatureScreenProps {
  onAddToCart?: (direction: string) => void;
  onOpenProduct?: () => void;
}

export const DavinaSignatureScreen: React.FC<DavinaSignatureScreenProps> = ({ onAddToCart, onOpenProduct }) => {
  const [reasonOpen, setReasonOpen] = useState(true);
  const [format, setFormat] = useState(0);

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-10 py-[56px] md:py-[100px] flex flex-col gap-[56px] md:gap-[100px]">
      {/* ── Hero — html/027 L151-158 ── */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
        <img
          alt="Koleksi bahan aroma: kristal sea salt, vanilla, amber, tanah kering, akar vetiver, dan kasmir di atas kain ivory."
          className="absolute inset-0 w-full h-full object-cover"
          src={IMG.hero}
        />
        <div className="absolute inset-0 bg-[#fff8f7]/20" />
        <div className="relative z-10 text-center flex flex-col items-center p-8 bg-[#FAF3EE]/90 backdrop-blur-sm rounded-lg hairline-border max-w-2xl mx-auto mt-auto mb-16">
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-[#433139] mb-4 md:text-[48px] md:leading-[56px]">
            Davina Signature Collection
          </h1>
          <p className="text-[18px] leading-[28px] text-[#4d4448]">
            Enam arah aroma signature, dikurasi untuk setiap sisi dirimu.
          </p>
        </div>
      </section>

      {/* ── Personalized Recommendation Band — html/027 L160-174 ── */}
      <section className="bg-[#F7F1EE] rounded-lg p-8 md:p-16 flex flex-col gap-6 hairline-border">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[30px] text-[#433139]">auto_awesome</span>
          <h2 className="text-[22px] leading-[28px] font-semibold text-[#433139]">
            Berdasarkan assessment-mu, kami merekomendasikan: Amber &amp; Cashmere
          </h2>
        </div>
        <div className="bg-[#FAF3EE] rounded-md p-6 hairline-border">
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setReasonOpen((v) => !v);
            }}
            aria-expanded={reasonOpen}
            className="w-full flex justify-between items-center cursor-pointer"
          >
            <h3 className="text-[16px] leading-[24px] font-semibold text-[#433139]">Kenapa Ini Cocok untukmu</h3>
            <span className="material-symbols-outlined text-[#433139]">
              {reasonOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {reasonOpen && (
            <p className="mt-4 text-[16px] leading-[24px] text-[#4d4448] leading-relaxed">
              Kombinasi kehangatan sensual dari Amber dan pelukan lembut Cashmere sangat selaras dengan kebutuhanmu
              akan ruang yang menenangkan dan perlindungan emosional. Aroma ini dirancang untuk menciptakan
              'kepompong' restoratif di akhir harimu.
            </p>
          )}
        </div>
      </section>

      {/* ── Scent Direction Grid — html/027 L176-283 ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Amber — kartu expanded/aktif */}
        <article className="bg-[#FAF3EE] rounded-lg overflow-hidden hairline-border shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col h-full md:scale-[1.02] transition-transform">
          <div className="h-64 relative">
            <img
              alt="Resin amber tembus cahaya di atas piring keramik, cahaya keemasan."
              className="w-full h-full object-cover"
              src={IMG.amber}
            />
          </div>
          <div className="p-6 flex flex-col flex-grow gap-4">
            <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">Amber</h3>
            <p className="text-[16px] leading-[24px] text-[#4d4448]">hangat, sensual, menenangkan</p>

            <div className="mt-4 flex flex-col gap-2">
              <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium uppercase text-[#7f7478]">
                Format
              </span>
              <div className="flex flex-wrap gap-1">
                {FORMATS.map((f, i) => (
                  <button
                    key={f}
                    onClick={() => {
                      soundEngine.playSoftClick();
                      setFormat(i);
                    }}
                    aria-pressed={i === format}
                    className={
                      i === format
                        ? 'px-3 py-1 rounded-full bg-[#5b4750] text-[#d1b6c1] border border-[#433139] text-[11px] leading-[16px] tracking-[0.04em] font-medium cursor-pointer'
                        : 'px-3 py-1 rounded-full bg-[#F7F1EE] text-[#4d4448] hairline-border text-[11px] leading-[16px] tracking-[0.04em] font-medium cursor-pointer'
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-[#F2E9E5] p-2 rounded flex items-start gap-2 border border-[#433139]/20">
              <span className="material-symbols-outlined text-[18px] text-[#433139] mt-1">info</span>
              <div>
                <span className="block mb-1 text-[16px] leading-[24px] font-semibold text-[#433139]">
                  Amber &amp; Citrine
                </span>
                <span className="text-[14px] leading-[20px] text-[#4d4448]">
                  Dipadukan dengan energi citrine untuk kehangatan dan optimisme.
                </span>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={() => {
                  soundEngine.playSoftClick();
                  onAddToCart?.(`Amber — ${FORMATS[format]}`);
                }}
                className="w-full h-12 rounded-full bg-[#433139] text-white text-[16px] leading-[24px] font-semibold hover:bg-[#433139]/90 transition-colors cursor-pointer"
              >
                Tambahkan
              </button>
            </div>
          </div>
        </article>

        {/* Vanilla / Terra / Cashmere / Sea Salt / Vetiver — kartu compact */}
        {DIRECTIONS.map((d) => (
          <article key={d.name} className={CARD_BASE}>
            <div className="h-64 relative">
              <img alt={d.name} className="w-full h-full object-cover" src={d.image} />
            </div>
            <div className="p-6 flex flex-col flex-grow gap-4">
              <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">{d.name}</h3>
              <p className="text-[16px] leading-[24px] text-[#4d4448]">{d.desc}</p>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => {
                    soundEngine.playSoftClick();
                    onOpenProduct?.();
                  }}
                  className={OUTLINE_PILL}
                >
                  Lihat Produk
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
