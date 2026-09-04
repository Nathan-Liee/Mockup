import React from 'react';

// STRICTLY MOCKUP (SEQ 028) — 1:1 dengan faisha-gallery/html/028_2e1a7024c4694fb39cf224b25c3d15e2.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 3xl=64 gutter=24 · margin-mobile=16→px-4 · margin-desktop=40→px-10
//           section-mobile=56→py-14 · section-desktop=100→py-[100px]
// type    : display-lg=48/56 -.02em 600 · headline-lg=32/40 -.01em 600 · headline-md=24/32
//           title-lg=22/28 600 · title-md=16/24 .01em 600 · body-lg=18/28 · body-base=16/24
//           body-bold=16/24 600 · label-lg=14/20 .01em 600 · label-sm=11/16 .04em 500 · label-caps=12/16 .06em 700
// warna   : ref-028 surface-container=#F7F1EE (sama dgn @theme) → token aman
//           warning-honey=#B8860B · CTA pakai text-warm-ivory sesuai ref
// PERBAIKAN QA: semua URL /aida/ (non-public) di referensi MATI saat hotlink → diganti gambar
//           aida-public hidup yang paling mirip (candle/flame/box/soul). Bukan fabrikasi konten.
// LAYOUT: root full-width (w-full min-h-screen), konten max-w-7xl mx-auto — tidak kerdil di tengah.

const MAIN_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY';
const THUMB_FLAME =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC1s_hac4_p1FBrEuFsMZfYBBqJCxfUftHQkD8vXlIBnoZ7ldFEbOGEt5Z3JGirjkTA1lK87b5NK6GDYQ6NFAuUmJTBfzYyZCPdpxrOaFY8o_7XHkxQ_Ceg-tsJCrCeCSK-8QGuO-mpqG4TFKtwuBkYFvbNQrV8XHQQMZBNK5bxfir_Jk0-Yeq6KwT8L3wBTyFGcWeRiq0eCTBgUmGcDxJuyWFXfn7soPAsBB1lyGFC0qWIRFSj-U917p44B4tHjtw5tyCiivtRkbc';
const THUMB_BOX =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCP54Xw5snfNgHbNMb1sq-XsXRDQrdtg4oxD6rmJxUny6V7A3yAu7K_lZVTa376WhsJ1h7zH2ukov59LbJb_CHTfQmZqrAD9d6BQYe5h_5b4_4N2UcNVSCG563-OV6s4IdOx2LtAdBLotPT07RTSTNZ1QbsazQZuSn-lalrietWI5rGG16RcNXJGi2e1vH0krYSfK5pvA12UQfOgDIcMFMoWyeUNh2IwS1JZWvNyO24IX2Z4t3Qwhi0DBGfu8iCselJyE0jUZerBeE';
const THUMB_SOUL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zxhUNRohb4k1AKXxW1u6slpJidKTMBOOkXsxyW43txi3Qls77gfchB0lQRtjMa8DwULi4yvjz3iW0jFm5gjzPhHfET15DEV6PW-zBWdidx7VfT_uZfGJvD160ljL60tHKw7EK1BcyMrpDZM9J3K_gwY_dc2lU9BazntuVAp3D1VJBvavmlalHIt9926RhNFH5seQV80Ri-506xgR9ULD9haVfYuSw7nfoiAXS62_L40T-R4HE8I_4yFh6UsoA-kSSq2URVIBsFI';

const RELATED = [
  {
    tag: 'Evening Ritual',
    name: 'Deep Rest Hourglass',
    price: 'Rp 249.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaWK4cuTlXnCj0WErvQRrls2gJ-_XRnfjbW6nIxwGnqOIux7AhcMinYEsfdcVoAb1D6IUyTCzyfxjbhISwk27uNjMRH3VQpwr5YTxtaFOk97UtkdQTQVf1_uXMhj7KvOexD5VpeTaF7LRN64TA8QiDQHlVil9IO85A40iMvwTl7-RPpTv4LcOCQuuUw00ho_xAeu_6ZTRyKHdiiaOhw9x3ND0XwfhnGH80HLND5Gy49TdeDxpNdwjJVsh7iV6V9JWMEMr8OkJIDw',
  },
  {
    tag: 'Home Sanctuary',
    name: 'Ceramic Oil Diffuser',
    price: 'Rp 450.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGF_VcaRCpjp7SuxvR3uQxm-5wtoSNrMh5nzYv4OZ5z41ynK_sPTciXsI8SxTWARJqhoOQlLKduO_wwHbhbC_9E8Yvm4MpqFKFdDZ2SUZtP738zLiMm6WiOORFY_TgHA6KaMk5OELUTtOpSgXfTCAplH381EY1Gr0PnM9eO0Ga4VJ-22A0ZBS1q2ni7Akb_MP9THoJfu2PVOM89XclMdF7M40WzBWblwS1RX0LPR64xoxfv4u7E4yzfL3bKqEgCw2pqRkZRDO61g',
  },
  {
    tag: 'Quick Reset',
    name: 'Aura Room Spray',
    price: 'Rp 129.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCposUSZ1_1qt5S68Au4cz5Jx3gqNj5kFH8FLNhhxgwhLQKVwhPpPEM9f6CDpFMP3dfjVaOp8iQMHlLhp2w6qf4s1pHQOU0mDjOrxyqSrKahyyMfkt2zCJpn-VX69gSvmsEO_MceGLYm3bzsB4S08qFDp6YAvuya7s52DvTGI3EfqYCmRlxrxaDbIltH6RX166ggi5RfVwOsjPvuL6Oc_XZtcy6_lsSUJTK6biJK862FpUnZX2T7eKXk1HQRy_S2znrWc4-Hkh4L9g',
  },
  {
    tag: 'Essential Blend',
    name: 'Morning Clarity Oil',
    price: 'Rp 159.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkMFgnnIB1v3r6oXdAjepdKqdNikQEnKxgmslBU-soIcmMJX20cZIHfaDEOwDcPZLDQdayaIlOm_X58NNWljR8wpXPf-DXGsr94QG1AxvNa9zoBaWOU2Sc6n4OlgyNgQ__kQdinFrtkdO9Cnbhjt6Yt06kCFRca_H4dvcJN1dea8ePmVJ-1QEsDDOv_jVxswGjFkA_0lJX2wwlUZ38h2iHFr0P8yAncsUunSTdipBn69zJzWkFLbqHCXMw9yBXNiZtJVWLD1HD4GI',
  },
];

const NOTES = ['Citrus', 'White Tea', 'Soft Musk'];

const ACCORDIONS = [
  {
    title: 'Deskripsi & Cara Pakai',
    body: 'Nyalakan lilin selama 2-3 jam pada penggunaan pertama agar permukaan lilin meleleh merata. Potong sumbu sekitar 0.5cm sebelum setiap penggunaan untuk mencegah asap hitam.',
  },
  {
    title: 'Ingredients',
    body: '100% Natural Soy Wax, Premium Fragrance Oils, Cotton Wick. Free from parabens and phthalates.',
  },
  {
    title: 'Perawatan & Keamanan',
    body: 'Jangan tinggalkan lilin menyala tanpa pengawasan. Jauhkan dari jangkauan anak-anak, hewan peliharaan, dan benda mudah terbakar.',
  },
  {
    title: 'Pengiriman & Retur',
    body: 'Pengiriman standar 2-3 hari kerja. Retur diterima dalam waktu 7 hari setelah barang diterima dalam kondisi belum dinyalakan.',
  },
];

interface ProductDetailSimpleScreenProps {
  onAddToCart?: (productName: string) => void;
  onOpenRelated?: (productName: string) => void;
  /** INTEGRASI ORGANIK Group B: panggil pengubah tab App.tsx, bukan URL. */
  onNavigate?: (tab: string) => void;
}

export const ProductDetailSimpleScreen: React.FC<ProductDetailSimpleScreenProps> = ({ onAddToCart, onOpenRelated, onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-32">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant mb-8">
          <a className="hover:text-primary transition-colors cursor-pointer" href="#">
            Shop
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <a className="hover:text-primary transition-colors cursor-pointer" href="#">
            Morning Ritual
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">Calm Morning Candle</span>
        </nav>

        {/* ── Product Details Grid — kiri galeri (7), kanan info (5) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14 md:mb-[100px]">
          {/* Left: Gallery */}
          <div className="md:col-span-7 flex flex-col gap-2">
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden relative group">
              <img
                alt="Calm Morning Candle Jar"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={MAIN_IMG}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[MAIN_IMG, THUMB_FLAME, THUMB_BOX, THUMB_SOUL].map((src, i) => (
                <button
                  key={src}
                  className={`aspect-square bg-surface-container rounded-lg overflow-hidden transition-colors ${
                    i === 0 ? 'border-2 border-primary' : 'border-2 border-transparent hover:border-outline-variant'
                  }`}
                >
                  <img alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" src={src} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="md:col-span-5 flex flex-col pt-4 md:pt-0">
            <div className="inline-block bg-[#F2E9E5] text-primary px-3 py-1 rounded-full text-[11px] leading-[16px] font-medium w-max mb-4 uppercase tracking-wider">
              Morning Ritual
            </div>
            <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary mb-2 md:text-[48px] md:leading-[56px] md:tracking-[-0.02em]">
              Calm Morning Candle
            </h1>
            <div className="flex items-center gap-1 mb-6">
              <div className="flex text-[#B8860B]">
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star_half</span>
              </div>
              <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant ml-2">
                4.9 (127 ulasan)
              </span>
            </div>
            <div className="text-[22px] leading-[28px] font-semibold text-primary mb-8">Rp 189.000</div>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-8 leading-relaxed">
              Lilin aromaterapi dengan notes citrus, white tea, dan soft musk untuk mengawali pagimu dengan kehangatan.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {NOTES.map((n) => (
                <span
                  key={n}
                  className="bg-[#F2E9E5] text-on-surface px-4 py-2 rounded-full text-[11px] leading-[16px] tracking-[0.04em] font-medium border border-outline-variant/30"
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mb-12 text-on-surface-variant text-[11px] leading-[16px] tracking-[0.04em] font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>Waktu bakar: ± 45 jam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">scale</span>
                <span>Berat: 200g</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-12">
              <div className="flex items-center border border-[#BDA494] rounded h-[48px] bg-white">
                <button className="px-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">-</button>
                <span className="text-[16px] leading-[24px] w-8 text-center">1</span>
                <button className="px-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">+</button>
              </div>
              <button
                onClick={() => { onAddToCart?.('Calm Morning Candle'); onNavigate?.('cart-active'); }}
                className="flex-grow bg-primary text-warm-ivory h-[48px] rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center cursor-pointer"
              >
                Tambah ke Keranjang
              </button>
              <button className="h-[48px] w-[48px] border-[1.5px] border-[#BDA494] text-primary rounded flex items-center justify-center hover:bg-[#F2E9E5] transition-colors cursor-pointer">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            {/* Accordions — garis pemisah tipis border-b, bukan kotak keliling */}
            <div className="border-t border-outline-variant/30 flex flex-col">
              {ACCORDIONS.map((a) => (
                <details key={a.title} className="group py-4 border-b border-outline-variant/30 cursor-pointer">
                  <summary className="flex justify-between items-center text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary list-none">
                    {a.title}
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="pt-4 text-[16px] leading-[24px] text-on-surface-variant">{a.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mungkin Kamu Suka (Related Products) ── */}
        <section className="py-14 md:py-[100px] border-t border-outline-variant/30">
          <h2 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary text-center mb-12">
            Mungkin Kamu Suka
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {RELATED.map((p) => (
              <button
                key={p.name}
                onClick={() => onOpenRelated?.(p.name)}
                className="group flex flex-col gap-4 text-left cursor-pointer"
              >
                <div className="aspect-square bg-surface-container rounded-lg overflow-hidden relative">
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={p.image}
                  />
                  <span className="absolute top-4 right-4 h-10 w-10 bg-warm-ivory/80 backdrop-blur rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] leading-[16px] font-medium text-on-surface-variant uppercase tracking-wider mb-1">
                    {p.tag}
                  </div>
                  <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-1">{p.name}</h3>
                  <div className="text-[16px] leading-[24px] text-primary">{p.price}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div className="fixed bottom-0 left-0 w-full bg-warm-ivory/95 backdrop-blur-md border-t border-outline-variant/30 py-4 px-4 md:px-10 z-40 shadow-[0_-4px_20px_rgba(91,71,80,0.04)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <img alt="Mini Thumbnail" className="w-12 h-12 object-cover rounded bg-surface-container" src={MAIN_IMG} />
            <div>
              <div className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary line-clamp-1">
                Calm Morning Candle
              </div>
              <div className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant">Rp 189.000</div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary md:hidden">Rp 189.000</div>
            <button
              onClick={() => { onAddToCart?.('Calm Morning Candle'); onNavigate?.('cart-active'); }}
              className="flex-grow md:flex-grow-0 bg-primary text-warm-ivory h-[48px] px-8 rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center whitespace-nowrap ml-auto cursor-pointer"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
