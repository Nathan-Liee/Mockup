import React from 'react';

// STRICTLY MOCKUP (SEQ 035) — 1:1 dengan faisha-gallery/html/035_14f6374135874e10810596d1d01d3b24.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : sm=8 md=16 lg=24 xl=32 2xl=48 3xl=64 · margin-desktop=40→px-10
// type    : display-lg=48/56 -.02em 600 · display-lg-mobile=38/44 · headline-md=24/32
//           title-md=16/24 .01em 600 · body-lg=18/28 · body-base=16/24 · label-sm=11/16 .04em 500
// util CDN: tactile-shadow → shadow-[0_4px_20px_rgba(91,71,80,0.04)]
// warna DRIFT ref-035: surface-container=#ffe9e6 & surface-tint=#6e5962 → TIDAK dipakai;
//           banner assessment pakai literal bg-[#F7F1EE] sesuai ref.
// PERBAIKAN QA: URL /aida/ (non-public) produk di referensi MATI → padanan aida-public hidup.
//           Gambar keranjang rotan sudah aida-public di ref.
// LAYOUT: root full-width; hero empty-state min-h-[50vh] tengah; 4 kartu; banner assessment.

const BASKET_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB3hhmWGVWNR7uKlpsh-h1NvWMsxWzQh0jFgdk1D5FGvR6SCzH6rZoFEKvtOTcCREm1HXQ53pm6VkqyHOKLtAHsyBaUM4x8tXM3vmq85bAZlgJsx9yIK0qMvHtzPPaWpTsBsIt5W2Pqj2fFtupDjlwa4UKVGNqWCqdDxDXtKzfPVVERXbUthVPwry0A7aEx0S1awEXRVR7-eU4pecdDPnHVEXzuNmUenySLp_8WTC-mWIwERXi6h0b4uF88S020aL0oilnRLHA06HY';

const SUGGESTED = [
  {
    name: 'Calm Morning Candle',
    price: 'Rp 189.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY',
  },
  {
    name: 'Tranquil Night Candle',
    price: 'Rp 209.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDeKKS4QJr--JjXylyPn44v_a3TVj7REAN7-52Ourhp24WPgvtc7SEgFujko6d2gkvjUCZiq6udpr3Y2TTP6Eyd1R6PzLKHGtT3RCX7ZCtG4wKtL0TScTlrRBXEvsTEHfyccmmNKB-bbV7bgumbsFJLB007Que9YnKiWlrzG_IfnFHHnjIjl9dHTkjTfjOtPMGTqcd-jYYfI37dEhnlOdbTZEaqS-GP41hsJnzN4VQdD_L-fkQo-V3exvJxifLxRbeQit7lBtKWCHw',
  },
  {
    name: 'Soul Journal',
    price: 'Rp 179.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zxhUNRohb4k1AKXxW1u6slpJidKTMBOOkXsxyW43txi3Qls77gfchB0lQRtjMa8DwULi4yvjz3iW0jFm5gjzPhHfET15DEV6PW-zBWdidx7VfT_uZfGJvD160ljL60tHKw7EK1BcyMrpDZM9J3K_gwY_dc2lU9BazntuVAp3D1VJBvavmlalHIt9926RhNFH5seQV80Ri-506xgR9ULD9haVfYuSw7nfoiAXS62_L40T-R4HE8I_4yFh6UsoA-kSSq2URVIBsFI',
  },
  {
    name: 'Citrus Awakening Spray',
    price: 'Rp 129.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCposUSZ1_1qt5S68Au4cz5Jx3gqNj5kFH8FLNhhxgwhLQKVwhPpPEM9f6CDpFMP3dfjVaOp8iQMHlLhp2w6qf4s1pHQOU0mDjOrxyqSrKahyyMfkt2zCJpn-VX69gSvmsEO_MceGLYm3bzsB4S08qFDp6YAvuya7s52DvTGI3EfqYCmRlxrxaDbIltH6RX166ggi5RfVwOsjPvuL6Oc_XZtcy6_lsSUJTK6biJK862FpUnZX2T7eKXk1HQRy_S2znrWc4-Hkh4L9g',
  },
];

interface CartEmptyScreenProps {
  onExploreRitual?: () => void;
  onViewAllProducts?: () => void;
  onAddToCart?: (productName: string) => void;
  onStartAssessment?: () => void;
  /** INTEGRASI ORGANIK Group B: panggil pengubah tab App.tsx, bukan URL. */
  onNavigate?: (tab: string) => void;
}

export const CartEmptyScreen: React.FC<CartEmptyScreenProps> = ({
  onExploreRitual,
  onViewAllProducts,
  onAddToCart,
  onStartAssessment,
  onNavigate,
}) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory pb-20 md:pb-24">
      {/* FIX_PLAN #3: padding atas dari App main */}
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* ── Empty Hero — gambar di tengah ── */}
        <section className="min-h-[50vh] flex flex-col items-center justify-center text-center py-14 md:py-20">
          <img
            alt="Keranjang rotan kosong"
            className="w-64 h-64 rounded-full object-cover mix-blend-multiply opacity-80 mb-10"
            src={BASKET_IMG}
          />
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-primary mb-4 md:text-[48px] md:leading-[56px]">
            Keranjangmu Masih Kosong
          </h1>
          <p className="text-[18px] leading-[28px] text-on-surface-variant max-w-xl mb-10">
            Belum ada produk yang kamu simpan. Yuk, mulai perjalanan ritualmu - temukan produk yang menemani
            momen-momenmu.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onExploreRitual?.()}
              className="w-full sm:w-auto h-12 px-8 bg-primary text-warm-ivory rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Jelajahi Ritual
            </button>
            <button
              onClick={() => { onViewAllProducts?.(); onNavigate?.('pdp'); }}
              className="w-full sm:w-auto h-12 px-8 rounded border-[1.5px] border-[#BDA494] text-primary text-[14px] leading-[20px] font-semibold uppercase tracking-wider hover:bg-[#F2E9E5] transition-colors cursor-pointer"
            >
              Lihat Semua Produk
            </button>
          </div>
        </section>

        {/* ── Mungkin Ini yang Kamu Cari ── */}
        <section className="border-t border-[#E5DCD8] pt-14 md:pt-20">
          <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary text-center mb-10">
            Mungkin Ini yang Kamu Cari
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUGGESTED.map((p) => (
              <div key={p.name} className="group flex flex-col">
                <div className="aspect-square bg-surface-tint rounded-lg overflow-hidden mb-4">
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={p.image}
                  />
                </div>
                <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-1">{p.name}</h3>
                <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4">{p.price}</p>
                <button
                  onClick={() => onAddToCart?.(p.name)}
                  className="w-full py-2 rounded border border-primary/20 text-primary text-[11px] leading-[16px] tracking-[0.04em] font-medium uppercase hover:bg-[#F2E9E5] transition-colors cursor-pointer mt-auto"
                >
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Assessment Banner ── */}
        <section className="mt-14 md:mt-20 bg-[#F7F1EE] p-8 md:p-16 rounded-sm border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)] text-center">
          <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-3">
            Belum yakin mulai dari mana?
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-lg mx-auto mb-8">
            Ikuti assessment 5 menit dan temukan ritual serta aroma yang paling sesuai untukmu.
          </p>
          <button
            onClick={() => onStartAssessment?.()}
            className="h-12 px-8 bg-primary text-warm-ivory rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Mulai Assessment
          </button>
        </section>
      </div>
    </div>
  );
};
