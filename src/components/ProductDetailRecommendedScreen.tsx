import React, { useState } from 'react';

// STRICTLY MOCKUP (SEQ 030) — 1:1 dengan faisha-gallery/html/030_188cd1972b354981aef1baecc28dd95e.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : md=16 lg=24 xl=32 2xl=48 3xl=64 gutter=24 · margin-desktop=40→px-10 · section-desktop=100→mb-[100px]
// type    : display-lg=48/56 -.02em 600 · headline-lg=32/40 -.01em 600 · headline-md=24/32
//           title-lg=22/28 600 · title-md=16/24 .01em 600 · body-base=16/24 · body-bold=16/24 600
//           label-lg=14/20 .01em 600 · label-sm=11/16 .04em 500 · label-caps=12/16 .06em 700
// warna   : ref-030 surface-container=#F7F1EE & surface-tint=#F2E9E5 (SAMA dgn @theme) → token aman
//           warning-honey=#B8860B
// ACCORDION: ref pakai CSS .accordion-toggle (checkbox) → diganti <details>/<summary> native, hasil sama.
// LAYOUT: root full-width, konten max-w-7xl mx-auto — tidak kerdil di tengah.

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCzA2Am5nfonkjPiM4I5aIZhsW9S7YeK5MlwGUHVwmURzRdvcwdgtqhxVkObf9IdXTpO7pTAeKhyfbwUMqXRs_EXx81hudzTVcoSVYG620kFtia5WfjSDsXZH10jo-k8_qcWv8BTywA3jtyEaAH7nOYcPp8UyxCVu1avK9brqnKusqLcL_9xVoJ8zODt106vilyt9qGOyCtAcd2omb93Vfc1hPJdMIrq77SbV0zBVOGU9thizZQ2_FFiDqHhIX4zYibG_dN5sd8-PQ';
const SUB_IMG_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY';
const SUB_IMG_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCfzE37WTz2e_RaUH6hElp3kbTjebxceFAXrGFEr3unsEs9YGuhGyipD0j9rBO3dcmJwGtHt2Oy4C0RVtZUdB_R6MbmtX2YJuzjz7-wnGPpyL--n19mjsZRIjIEXFjA45iKCJGDI2N7nbEJGopya85w7te2yL7jZBiLUOTTrsWz9_IYgtx9WSACodNg2-X10ahzI4XJmpjbm07RlVMuVYWClnrPYCsSlIiElmQydX7n59fPwMxLIedPxsYXfp5Wu2mZwvS4Iob8-C0';

const NOTES = ['Cashmere', 'Vanilla', 'Soft Amber'];

const RITUAL_STEPS = [
  'Nyalakan lilin minimal 1 jam pada penggunaan pertama agar permukaan mencair merata.',
  'Trim sumbu menjadi 5mm sebelum setiap penggunaan.',
  'Gunakan saat Anda membutuhkan momen grounding atau persiapan tidur.',
];

interface ProductDetailRecommendedScreenProps {
  onAddToCart?: (productName: string) => void;
  onOpenAlternative?: (productName: string) => void;
  /** INTEGRASI ORGANIK Group B: panggil pengubah tab App.tsx, bukan URL. */
  onNavigate?: (tab: string) => void;
}

export const ProductDetailRecommendedScreen: React.FC<ProductDetailRecommendedScreenProps> = ({
  onAddToCart,
  onOpenAlternative,
  onNavigate,
}) => {
  const [whyOpen, setWhyOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-warm-ivory pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-32 py-8 md:py-16">
        {/* ── Assessment Banner (rekomendasi di bagian atas) ── */}
        <div className="bg-surface-container rounded-lg p-6 mb-8 border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B8860B]">auto_awesome</span>
              <span className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">
                Direkomendasikan untukmu berdasarkan hasil assessment
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-primary-container text-warm-ivory px-3 py-1 rounded-full text-[11px] leading-[16px] font-medium uppercase tracking-wider">
                92% Match
              </span>
              <button
                onClick={() => setWhyOpen((v) => !v)}
                className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold underline hover:text-secondary transition-colors cursor-pointer"
              >
                Kenapa produk ini cocok untukku?
              </button>
            </div>
          </div>
          {whyOpen && (
            <div className="mt-4 pt-4 border-t border-[#BDA494]/30">
              <p className="text-[16px] leading-[24px] text-on-surface-variant">
                Profil aromamu menunjukkan preferensi aroma hangat dan comforting. Cashmere, vanilla, dan soft amber
                dalam lilin ini selaras dengan kebutuhan relaksasimu di malam hari.
              </p>
            </div>
          )}
        </div>

        {/* ── PDP Main Section — kiri galeri (7), kanan info sticky (5) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-[100px]">
          {/* Gallery (Left Column) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden relative">
              <img
                alt="Cashmere Embrace Candle in a cozy setting"
                className="w-full h-full object-cover"
                src={HERO_IMG}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                <img alt="Detail tekstur lilin di atas linen" className="w-full h-full object-cover" src={SUB_IMG_1} />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                <img alt="Detail sumbu lilin menyala" className="w-full h-full object-cover" src={SUB_IMG_2} />
              </div>
            </div>
          </div>

          {/* Info (Right Column) — sticky sesuai ref */}
          <div className="md:col-span-5 flex flex-col md:sticky md:top-[100px] md:self-start">
            <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary mb-2">
              Cashmere Embrace Candle
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-primary">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                ))}
              </div>
              <span className="text-[16px] leading-[24px] text-on-surface-variant">4.9 (203 ulasan)</span>
            </div>
            <div className="text-[22px] leading-[28px] font-semibold text-primary mb-8">Rp 219.000</div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-[#BDA494] rounded h-12 bg-white">
                <button className="px-4 text-primary hover:bg-surface-tint transition-colors h-full cursor-pointer">-</button>
                <input
                  className="w-12 text-center border-none text-[16px] leading-[24px] bg-transparent p-0 focus:ring-0 text-primary"
                  min="1"
                  type="number"
                  defaultValue="1"
                />
                <button className="px-4 text-primary hover:bg-surface-tint transition-colors h-full cursor-pointer">+</button>
              </div>
              <button
                onClick={() => { onAddToCart?.('Cashmere Embrace Candle'); onNavigate?.('cart-active'); }}
                className="flex-1 bg-primary-container text-warm-ivory h-12 rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary transition-colors flex justify-center items-center cursor-pointer"
              >
                Tambah ke Keranjang
              </button>
            </div>

            {/* Accordions — pemisah garis tipis, bukan kotak keliling */}
            <div className="border-t border-[#BDA494]/30">
              <details className="group border-b border-[#BDA494]/30" open>
                <summary className="flex justify-between items-center py-4 cursor-pointer text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary list-none">
                  Deskripsi Produk
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="pb-4">
                  <p className="text-[16px] leading-[24px] text-on-surface-variant leading-relaxed">
                    Diciptakan untuk menemani momen transisi Anda dari hiruk-pikuk hari menuju ketenangan malam.
                    Cashmere Embrace menyelimuti ruangan dengan aroma yang lembut, hangat, dan mendalam, seperti pelukan
                    selimut kasmir di malam yang dingin.
                  </p>
                </div>
              </details>
              <details className="group border-b border-[#BDA494]/30">
                <summary className="flex justify-between items-center py-4 cursor-pointer text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary list-none">
                  Scent Notes
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="pb-4 flex flex-wrap gap-2">
                  {NOTES.map((n) => (
                    <span
                      key={n}
                      className="bg-surface-tint px-3 py-1 rounded-full text-[11px] leading-[16px] tracking-[0.04em] font-medium text-primary"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </details>
              <details className="group border-b border-[#BDA494]/30">
                <summary className="flex justify-between items-center py-4 cursor-pointer text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary list-none">
                  Ritual Instructions
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="pb-4">
                  <ol className="list-decimal pl-4 text-[16px] leading-[24px] text-on-surface-variant space-y-2">
                    {RITUAL_STEPS.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
              </details>
            </div>

            {/* Alternatives */}
            <div className="mt-8 pt-6 border-t border-[#BDA494]/30">
              <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-4">
                Alternatif lain untukmu
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { match: '89% Match', name: 'Vanilla Comfort Candle' },
                  { match: '86% Match', name: 'Amber Glow Diffuser' },
                ].map((a) => (
                  <button
                    key={a.name}
                    onClick={() => onOpenAlternative?.(a.name)}
                    className="group block bg-white p-3 rounded-lg border border-[#BDA494]/20 hover:border-primary-container transition-colors shadow-[0_2px_10px_rgba(91,71,80,0.02)] text-left cursor-pointer"
                  >
                    <span className="inline-block bg-primary-container/10 text-primary-container px-2 py-0.5 rounded text-[10px] font-bold mb-2">
                      {a.match}
                    </span>
                    <span className="block text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary group-hover:underline">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 w-full bg-warm-ivory/95 backdrop-blur-md border-t border-[#BDA494]/30 p-4 md:hidden z-40 shadow-[0_-4px_20px_rgba(91,71,80,0.05)] flex justify-between items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant truncate w-32">
            Cashmere Embrace
          </span>
          <span className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">Rp 219.000</span>
        </div>
        <button
          onClick={() => onAddToCart?.('Cashmere Embrace Candle')}
          className="flex-1 bg-primary-container text-warm-ivory h-12 rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary transition-colors flex justify-center items-center cursor-pointer"
        >
          Tambah
        </button>
      </div>
    </div>
  );
};
