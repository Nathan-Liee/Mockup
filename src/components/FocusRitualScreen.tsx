import React from 'react';

// STRICTLY MOCKUP (SEQ 023) — 1:1 dengan faisha-gallery/html/023_a04be9a34fd54db188837c8a058ab631.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : gutter=24 · section-mobile=56 · section-desktop=100
// type    : display-lg=Playfair 48/56 -.02em 600 · display-lg-mobile=38/44 · headline-lg=32/40 -.01em 600
//           headline-md=24/32 · title-md=16/24 .01em 600 · body-lg=18/28 · body-base=16/24
//           label-lg=14/20 .01em 600 · label-caps=12/16 .06em 700
// PENTING : di referensi 023, surface-container = #ffe9e6 (PINK PASTEL, beda dgn @theme #F7F1EE)
//           → section "Ritual Fokusmu" hardcode bg-[#ffe9e6] agar pixel-perfect.

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAEH5CdjfJFy3gcJ4guDMHJHp0EDFEaoLbFZuRRo-K85HluwrGEHHmBPy6DBw4TRucGWhExHHDrVPjcVm4toN2gr7fK3vSTReSGRs4Ux5XpBe6jQ2ihCivEiraZmmFvmWcA-rznB0Pj5PaqdoMBkqiBWc8RW7Tw4PJK5FXBzTp_StDoQM9TqtbPxc_GJbp8vsW0X3oDHh4FTDf3oUQfm1f-Bjpr3kuFr831UWemQegZKwPwDf8Zl7HG-zm0wWzUbtUbTqqTTDY74Zo';

const STEPS = [
  { n: '01', text: 'Semprotkan pillow mist peppermint di ruang kerja' },
  { n: '02', text: 'Nyalakan lilin Deep Focus' },
  { n: '03', text: 'Atur timer 25 menit' },
  { n: '04', text: 'Tutup dengan 3 tarikan napas dalam' },
];

const PRODUCTS = [
  {
    name: 'Deep Focus Candle',
    price: 'Rp 199.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuvKHKZPAMSgEGZteXMEb6AR9VHDrGDvqtjzSkh5oC61VONTv8C_tT0z3lrIiUIkEvGBO74eQAfvQgot9rrU0okHaIV8JkJYj71MZHlFwuW61T_yfNB3JdG3qxS2u3FRi_OKiHjr2w7d4jZkzhy0Vmul5OL43hU2nQY_ZxeQbEPxR_uahqJxXq3V9NnlsYcSfaR2w_9XbDEs5SnEDO5l6-4m3lhP0Dk5px8ykLGJGm8B3Jq3WvpjQmJMK68Ciq6LNRm7JxaxV9T-A',
  },
  {
    name: 'Peppermint Clarity Mist',
    price: 'Rp 139.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCposUSZ1_1qt5S68Au4cz5Jx3gqNj5kFH8FLNhhxgwhLQKVwhPpPEM9f6CDpFMP3dfjVaOp8iQMHlLhp2w6qf4s1pHQOU0mDjOrxyqSrKahyyMfkt2zCJpn-VX69gSvmsEO_MceGLYm3bzsB4S08qFDp6YAvuya7s52DvTGI3EfqYCmRlxrxaDbIltH6RX166ggi5RfVwOsjPvuL6Oc_XZtcy6_lsSUJTK6biJK862FpUnZX2T7eKXk1HQRy_S2znrWc4-Hkh4L9g',
  },
  {
    name: 'Focus Timer Hourglass',
    price: 'Rp 179.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaWK4cuTlXnCj0WErvQRrls2gJ-_XRnfjbW6nIxwGnqOIux7AhcMinYEsfdcVoAb1D6IUyTCzyfxjbhISwk27uNjMRH3VQpwr5YTxtaFOk97UtkdQTQVf1_uXMhj7KvOexD5VpeTaF7LRN64TA8QiDQHlVil9IO85A40iMvwTl7-RPpTv4LcOCQuuUw00ho_xAeu_6ZTRyKHdiiaOhw9x3ND0XwfhnGH80HLND5Gy49TdeDxpNdwjJVsh7iV6V9JWMEMr8OkJIDw',
  },
];

// Produk ke-4: disabled / "Segera Hadir"
const COMING_SOON = {
  name: 'Desk Diffuser',
  price: 'Rp 249.000',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGF_VcaRCpjp7SuxvR3uQxm-5wtoSNrMh5nzYv4OZ5z41ynK_sPTciXsI8SxTWARJqhoOQlLKduO_wwHbhbC_9E8Yvm4MpqFKFdDZ2SUZtP738zLiMm6WiOORFY_TgHA6KaMk5OELUTtOpSgXfTCAplH381EY1Gr0PnM9eO0Ga4VJ-22A0ZBS1q2ni7Akb_MP9THoJfu2PVOM89XclMdF7M40WzBWblwS1RX0LPR64xoxfv4u7E4yzfL3bKqEgCw2pqRkZRDO61g',
};

const RELATED = [
  {
    title: 'Morning Ritual',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNc-GvWUWCFi2eLSCtn-0l1IQBDFkWhV2FimFOy0DYFlyoL2SldQ7O-rUmiOSdba_3lvd_zEpHI9XFUyi72TtuTnA7ph4ZPHagdUPTr9AQm50tEM4s5R6aTPE2sCbFftKKhHmF3QtW6lDhRE0BuwC4_gH3HIR2MOMfZZz46PwTw1VaEkwuGl3WHAXcBvvtITJ13QtCQfXfFrGq9p2dClD_7pGnzzj7iu4Tc_cS8dvFbkDAZCg8qvykrm5AE93rt2MFFxyMIeJYBKU',
  },
  {
    title: 'Soul Ritual',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zxhUNRohb4k1AKXxW1u6slpJidKTMBOOkXsxyW43txi3Qls77gfchB0lQRtjMa8DwULi4yvjz3iW0jFm5gjzPhHfET15DEV6PW-zBWdidx7VfT_uZfGJvD160ljL60tHKw7EK1BcyMrpDZM9J3K_gwY_dc2lU9BazntuVAp3D1VJBvavmlalHIt9926RhNFH5seQV80Ri-506xgR9ULD9haVfYuSw7nfoiAXS62_L40T-R4HE8I_4yFh6UsoA-kSSq2URVIBsFI',
  },
];

interface FocusRitualScreenProps {
  onAddToCart?: (productName: string) => void;
  onOpenRelated?: (ritualTitle: string) => void;
}

export const FocusRitualScreen: React.FC<FocusRitualScreenProps> = ({ onAddToCart, onOpenRelated }) => {
  return (
    <main className="flex-grow pt-24 md:pt-32">
      {/* ── Hero Section — teks kiri, gambar kanan ── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-14 md:mb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-center">
            <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-primary mb-6 md:text-[48px] md:leading-[56px]">
              Focus Ritual
            </h1>
            <p className="text-[18px] leading-[28px] text-on-surface-variant leading-relaxed">
              Kejernihan untuk berkarya, ketenangan untuk berpikir.
            </p>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 h-[400px] md:h-[600px] w-full">
            <img
              alt="Focus Ritual Hero"
              className="w-full h-full object-cover rounded-sm"
              src={HERO_IMG}
            />
          </div>
        </div>
      </section>

      {/* ── Ritual Steps — "Ritual Fokusmu" (background pink pastel #ffe9e6) ── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-14 md:mb-[100px] py-16 bg-[#ffe9e6] rounded-lg">
        <h2 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-center mb-12 text-primary">
          Ritual Fokusmu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex flex-col items-center text-center p-6 bg-warm-ivory rounded-md shadow-[0_4px_20px_rgba(91,71,80,0.04)]"
            >
              <span className="font-serif text-[48px] leading-[56px] tracking-[-0.02em] font-semibold text-primary-container opacity-50 mb-4">
                {s.n}
              </span>
              <p className="text-[16px] leading-[24px] text-on-surface">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Notice Band ── */}
      <div className="w-full bg-[#F2E9E5] py-4 text-center mb-16">
        <p className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary-container">
          Beberapa produk dalam ritual ini segera hadir
        </p>
      </div>

      {/* ── Products Section — "Dukung Fokusmu" ── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-14 md:mb-[100px]">
        <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold mb-10 text-primary">
          Dukung Fokusmu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low rounded-sm overflow-hidden mb-4 relative">
                <img
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={p.image}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-on-surface mb-1">
                  {p.name}
                </h3>
                <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4">{p.price}</p>
                <button
                  onClick={() => onAddToCart?.(p.name)}
                  className="bg-primary-container text-warm-ivory py-3 px-4 rounded-sm hover:bg-primary transition-colors cursor-pointer text-[14px] leading-[20px] font-semibold"
                >
                  Tambah
                </button>
              </div>
            </div>
          ))}

          {/* Product 4 — Disabled / Coming Soon */}
          <div className="group relative">
            <div className="aspect-square bg-surface-container-low rounded-sm overflow-hidden mb-4 relative">
              <div className="absolute top-4 left-4 z-10 bg-warm-ivory/90 px-3 py-1 rounded-full text-xs text-primary tracking-wider font-bold">
                Segera Hadir
              </div>
              <img
                alt={COMING_SOON.name}
                className="w-full h-full object-cover opacity-70"
                src={COMING_SOON.image}
              />
            </div>
            <div className="flex flex-col opacity-70">
              <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-on-surface mb-1">
                {COMING_SOON.name}
              </h3>
              <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4">{COMING_SOON.price}</p>
              <button
                disabled
                className="bg-surface-variant text-on-surface-variant py-3 px-4 rounded-sm cursor-not-allowed text-[14px] leading-[20px] font-semibold"
              >
                Segera Hadir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Rituals ── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-[100px]">
        <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold mb-8 text-primary">
          Ritual Terkait
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-6">
          {RELATED.map((r) => (
            <button
              key={r.title}
              onClick={() => onOpenRelated?.(r.title)}
              className="group block w-64 text-left cursor-pointer"
            >
              <div className="aspect-video bg-surface-container mb-3 rounded-sm overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${r.image}')` }}
                />
              </div>
              <h4 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-on-surface group-hover:text-secondary-container transition-colors">
                {r.title}
              </h4>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
