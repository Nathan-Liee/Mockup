import React from 'react';

// STRICTLY MOCKUP (SEQ 032) — 1:1 dengan faisha-gallery/html/032_b453a244fd674764ba56501f4e3db17d.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : md=16 lg=24 xl=32 2xl=48 3xl=64 gutter=24 · margin-mobile=16→px-4 · margin-desktop=40→px-10
//           section-desktop=100→mt/py-[100px]
// type    : display-lg=48/56 -.02em 600 · display-lg-mobile=38/44 · headline-lg=32/40 · headline-md=24/32
//           title-lg=22/28 · title-md=16/24 .01em 600 · body-base=16/24 · label-lg=14/20 · label-sm=11/16 .04em
//           label-caps=12/16 .06em 700
// util CDN (style block ref-032) → literal:
//   btn-disabled { bg:#fedbd6; color:#7f7478 } · btn-secondary { border:1.5px #BDA494; hover bg:#ffe9e6 }
//   btn-primary { bg:#433139; color:#FAF3EE } · input-field { border:1px #BDA494; bg:#fff }
// warna DRIFT ref-032: surface-container=#ffe9e6 & surface-tint=#6e5962 (beda dari @theme!) → TIDAK dipakai;
//   badge "Stok Habis" pakai literal bg-[#fedbd6] text-[#9E3B3B] (surface-container-highest/error-earthy).
// PERBAIKAN QA: URL /aida/ (non-public) di referensi MATI → diganti padanan aida-public hidup.
// LAYOUT: root full-width, konten max-w-7xl mx-auto — tidak kerdil di tengah.

const MAIN_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNs9WxiG7TijzcrFx2nV15pQ8AABx9DQde8iSsVPtETjMTKazTu0HtTlApO5taQIa1jCBGRpk8u_u-bZ-cI98NEJnhfdxUush0WD32Pfa9MmXZi9sLrYvKLwMvfW-FkWm6_mvosU3mZSkwxknsswQqRRFdxdgA0rKJVXfOaLBEnuHABxeUq0YidMS1M7eKRsie9Oa6jjlXjHng5eF-ENy8__dP2Gw1Y3OrQI9I7Ke6fzYSsUozR52H5xv7VrQTjPLKDqbVSN-TMGY';

const ALTERNATIVES = [
  {
    name: 'Cashmere Embrace Candle',
    price: 'Rp 219.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzA2Am5nfonkjPiM4I5aIZhsW9S7YeK5MlwGUHVwmURzRdvcwdgtqhxVkObf9IdXTpO7pTAeKhyfbwUMqXRs_EXx81hudzTVcoSVYG620kFtia5WfjSDsXZH10jo-k8_qcWv8BTywA3jtyEaAH7nOYcPp8UyxCVu1avK9brqnKusqLcL_9xVoJ8zODt106vilyt9qGOyCtAcd2omb93Vfc1hPJdMIrq77SbV0zBVOGU9thizZQ2_FFiDqHhIX4zYibG_dN5sd8-PQ',
  },
  {
    name: 'Amber & Vanilla Diffuser',
    price: 'Rp 259.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGF_VcaRCpjp7SuxvR3uQxm-5wtoSNrMh5nzYv4OZ5z41ynK_sPTciXsI8SxTWARJqhoOQlLKduO_wwHbhbC_9E8Yvm4MpqFKFdDZ2SUZtP738zLiMm6WiOORFY_TgHA6KaMk5OELUTtOpSgXfTCAplH381EY1Gr0PnM9eO0Ga4VJ-22A0ZBS1q2ni7Akb_MP9THoJfu2PVOM89XclMdF7M40WzBWblwS1RX0LPR64xoxfv4u7E4yzfL3bKqEgCw2pqRkZRDO61g',
  },
  {
    name: 'Warm Amber Room Spray',
    price: 'Rp 139.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCposUSZ1_1qt5S68Au4cz5Jx3gqNj5kFH8FLNhhxgwhLQKVwhPpPEM9f6CDpFMP3dfjVaOp8iQMHlLhp2w6qf4s1pHQOU0mDjOrxyqSrKahyyMfkt2zCJpn-VX69gSvmsEO_MceGLYm3bzsB4S08qFDp6YAvuya7s52DvTGI3EfqYCmRlxrxaDbIltH6RX166ggi5RfVwOsjPvuL6Oc_XZtcy6_lsSUJTK6biJK862FpUnZX2T7eKXk1HQRy_S2znrWc4-Hkh4L9g',
  },
  {
    name: 'Amber Glow Mini Candle',
    price: 'Rp 99.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY',
  },
];

const ACCORDION_TITLES = ['Deskripsi', 'Cara Pakai', 'Keamanan'];

interface OutOfStockScreenProps {
  onNotifyMe?: (email: string) => void;
  onOpenAlternative?: (productName: string) => void;
  /** INTEGRASI ORGANIK Group B: panggil pengubah tab App.tsx, bukan URL. */
  onNavigate?: (tab: string) => void;
}

export const OutOfStockScreen: React.FC<OutOfStockScreenProps> = ({ onNotifyMe, onOpenAlternative, onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory">
      {/* FIX_PLAN #4: padding atas dari App main */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-[56px] md:pb-[100px]">
        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant mb-8 pt-4">
          <a className="hover:text-primary transition-colors cursor-pointer" href="#">
            Shop
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">Amber Glow Candle</span>
        </div>

        {/* ── PDP Layout — kiri galeri (7), kanan info (5) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-16 mb-14 md:mb-[100px]">
          {/* Left Column: Image Gallery (grayscale — kesan kosong) */}
          <div className="md:col-span-7 flex flex-col gap-2">
            <div className="w-full aspect-square bg-surface-tint/10 relative overflow-hidden rounded-lg group">
              <img
                alt="Amber Glow Candle"
                className="w-full h-full object-cover filter grayscale-[40%] opacity-80 mix-blend-multiply"
                src={MAIN_IMG}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-square bg-surface-container rounded cursor-pointer border-2 border-primary overflow-hidden opacity-80">
                <img
                  alt="Thumbnail 1"
                  className="w-full h-full object-cover filter grayscale-[40%] mix-blend-multiply"
                  src={MAIN_IMG}
                />
              </div>
              <div className="aspect-square bg-surface-container rounded cursor-pointer border-2 border-transparent hover:border-outline-variant overflow-hidden">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-outline">
                  <span className="material-symbols-outlined">image</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="md:col-span-5 flex flex-col justify-start pt-4 md:pt-0">
            {/* Badge "Stok Habis" */}
            <div className="inline-flex items-center px-3 py-1 bg-[#fedbd6] text-[#9E3B3B] rounded-full text-[11px] leading-[16px] font-medium w-max mb-4 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px] mr-1">info</span>
              Stok Habis
            </div>
            <div className="inline-block bg-[#F2E9E5] text-primary px-3 py-1 rounded-full text-[11px] leading-[16px] tracking-[0.04em] font-medium w-max mb-2">
              Soul Ritual
            </div>
            <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-on-surface mb-2 md:text-[48px] md:leading-[56px]">
              Amber Glow Candle
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#B8860B]">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star_half</span>
              </div>
              <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant">
                4.8 (156 ulasan)
              </span>
            </div>
            <div className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-on-surface mb-8">
              Rp 199.000
            </div>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-8 leading-relaxed">
              A grounding blend of warm amber, subtle vanilla, and earthy woods. Designed to anchor your evening ritual
              and create a sanctuary of calm before rest.
            </p>

            {/* Actions — tombol disabled */}
            <div className="flex flex-col gap-4 mb-12">
              <button
                disabled
                className="w-full h-12 bg-[#fedbd6] text-[#7f7478] rounded text-[14px] leading-[20px] font-semibold flex items-center justify-center uppercase tracking-wider cursor-not-allowed"
              >
                Stok Habis
              </button>
            </div>

            {/* Notify Me Card — form email rapi */}
            <div className="bg-warm-ivory border border-outline-variant p-6 rounded-lg mb-4">
              <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-2">
                Beritahu saya saat tersedia kembali
              </h3>
              <p className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant mb-4">
                Tinggalkan email Anda untuk mendapatkan pemberitahuan instan.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (new FormData(e.currentTarget).get('email') as string) || '';
                  onNotifyMe?.(email);
                }}
              >
                <input
                  className="h-12 px-4 rounded flex-1 text-[16px] leading-[24px] text-on-surface border border-[#BDA494] bg-white focus:border-primary focus:outline-none"
                  name="email"
                  placeholder="Alamat Email"
                  type="email"
                  defaultValue="nama@email.com"
                />
                <button className="h-12 px-6 rounded bg-primary text-warm-ivory text-[14px] leading-[20px] font-semibold uppercase tracking-wider whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer">
                  Ingatkan Saya
                </button>
              </form>
              <p className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-success-botanical mt-2 flex items-center">
                <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span>
                Kamu akan dihubungi saat produk kembali tersedia
              </p>
            </div>
            <p className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-outline italic">
              Estimasi restock: pertengahan April 2026
            </p>

            {/* Accordions — garis tipis, bukan kotak keliling */}
            <div className="mt-12 border-t border-outline-variant pt-6">
              {ACCORDION_TITLES.map((t) => (
                <div
                  key={t}
                  className="border-b border-outline-variant py-4 cursor-pointer group flex justify-between items-center"
                >
                  <h4 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary group-hover:text-secondary transition-colors">
                    {t}
                  </h4>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                    expand_more
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Alternatives Section — "Produk Serupa yang Tersedia" ── */}
        <section className="mt-[56px] md:mt-[100px] border-t border-outline-variant pt-[56px] md:pt-[100px]">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary">
              Produk Serupa yang Tersedia
            </h2>
            <a
              className="hidden md:inline-flex items-center text-[14px] leading-[20px] font-semibold text-primary hover:text-secondary transition-colors uppercase tracking-wider cursor-pointer"
              href="#"
            >
              Lihat Semua <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALTERNATIVES.map((p) => (
              <div key={p.name} className="group flex flex-col cursor-pointer">
                <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden mb-4 relative">
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={p.image}
                  />
                  <div className="absolute inset-0 bg-primary-container/0 group-hover:bg-primary-container/10 transition-colors duration-300" />
                </div>
                <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-on-surface mb-1">{p.name}</h3>
                <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4">{p.price}</p>
                <button
                  onClick={() => { onOpenAlternative?.(p.name); onNavigate?.('pdp'); }}
                  className="w-full h-10 rounded border-[1.5px] border-[#BDA494] text-on-surface bg-transparent hover:bg-[#ffe9e6] transition-all text-[12px] leading-[16px] font-bold uppercase tracking-wider mt-auto cursor-pointer"
                >
                  Lihat
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button className="w-full h-12 rounded border-[1.5px] border-[#BDA494] text-on-surface bg-transparent hover:bg-[#ffe9e6] transition-all text-[12px] leading-[16px] font-bold uppercase tracking-wider cursor-pointer">
              Lihat Semua
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
