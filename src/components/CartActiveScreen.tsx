import React from 'react';
import { CartItem } from '../types';

// STRICTLY MOCKUP (SEQ 034) — 1:1 dengan faisha-gallery/html/034_*.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 · gutter=24→gap-6 · margin-desktop=40→px-10
// type    : headline-lg=32/40 -.01em 600 · title-md=16/24 .01em 600 · body-base=16/24 · body-bold=16/24 600
//           label-lg=14/20 .01em 600 · label-sm=11/16 .04em 500
// util CDN: hairline-b/.hairline (#BDA494) → border-b/border border-[#BDA494]; TIDAK pakai utility
//           `hairline-border` global (kotak keliling — bug QA SoulRitual).
// warna DRIFT ref-034: surface-container=#ffe9e6 & surface-tint=#6e5962 & surface-variant=#fedbd6 → TIDAK dipakai;
//           kartu summary pakai literal bg-[#F7F1EE] sesuai ref; badge stok bg-[#F2E9E5].
// PERBAIKAN QA: URL /aida/ mati → padanan aida-public hidup.
// FEEDBACK REVIEWER (diterapkan):
//   1. Jarak navbar↔konten: ref pt-[120px] terlalu kosong → pt-28 md:pt-32 (sama dgn sibling QA).
//   2. Section "Rekomendasi Produk" BARU di bawah list produk (di luar ref, diminta reviewer;
//      konten = set RELATED SEQ-028, verbatim dari mockData/028 — bukan fabrikasi).
// LAYOUT: root full-width; grid 12 kolom items-start (kiri list col-span-8, kanan summary statis
//         col-span-4) — sticky dihapus per keputusan QA, konsisten dgn SEQ 036/037.

const ITEMS = [
  {
    name: 'Calm Morning Candle - 200g',
    variant: 'Morning Ritual',
    price: 'Rp 189.000',
    qty: 2,
    total: 'Rp 378.000',
    stock: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY',
  },
  {
    name: 'Lavender Dream Pillow Mist',
    variant: 'Sleep Ritual',
    price: 'Rp 149.000',
    qty: 1,
    total: 'Rp 149.000',
    stock: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMU99lNexL8ycOUVakai6sy8GdbRLZWUdsmCcqRh9ik_8oLQjQsr3fiQiWNHDJREmv7SuvW5iXj4U1vs2jJ46wYBfjJk_v35kRKpZOK3emW3Pn-fk8W4n-ixsqJT1Df86VvYRgxwF9kuOAVRYML7ly6j50Hjreca-rIkbzgENwo9bc48i7cLA6WQHcJuXva0htuRmQLJ0XQYmzwYq_b8jx0AKMCtjhPtgvGJued6eYrI7QE5oUGNhq3-M4DRB_LQPUznJe4LQIEtU',
  },
  {
    name: 'Gratitude Journal',
    variant: 'Soul Ritual',
    price: 'Rp 149.000',
    qty: 1,
    total: 'Rp 149.000',
    stock: false,
    bundleBadge: 'Hemat 10% - bagian dari set',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUh5wp8qWS8RAHlV8Gcnir2TKV8Cbq1Bl2gQxs3jfqeukUAjlJg6e61lTE3nki3lZcDYzAppD1GvW7-Jd4X1OsgK8Wy81zfw8owl4PW-ZOGgQiCP7sd3vmtLhYtUGf0lOsXB5sfEpdEjelIRiRphs3kJFMstjH0FcKeJaddrPE4TTfxVOahOHAKouwhLiL7Mm3fZTQZJemcdp9RMxoQ-OFRJtJaHNZcFItACWYtLkGb093NNBepVNvnop-bPRcIuo1xanztQbHKrE',
  },
];

const RECOMMENDED = [
  {
    name: 'Deep Rest Hourglass',
    price: 'Rp 249.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaWK4cuTlXnCj0WErvQRrls2gJ-_XRnfjbW6nIxwGnqOIux7AhcMinYEsfdcVoAb1D6IUyTCzyfxjbhISwk27uNjMRH3VQpwr5YTxtaFOk97UtkdQTQVf1_uXMhj7KvOexD5VpeTaF7LRN64TA8QiDQHlVil9IO85A40iMvwTl7-RPpTv4LcOCQuuUw00ho_xAeu_6ZTRyKHdiiaOhw9x3ND0XwfhnGH80HLND5Gy49TdeDxpNdwjJVsh7iV6V9JWMEMr8OkJIDw',
  },
  {
    name: 'Ceramic Oil Diffuser',
    price: 'Rp 450.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGF_VcaRCpjp7SuxvR3uQxm-5wtoSNrMh5nzYv4OZ5z41ynK_sPTciXsI8SxTWARJqhoOQlLKduO_wwHbhbC_9E8Yvm4MpqFKFdDZ2SUZtP738zLiMm6WiOORFY_TgHA6KaMk5OELUTtOpSgXfTCAplH381EY1Gr0PnM9eO0Ga4VJ-22A0ZBS1q2ni7Akb_MP9THoJfu2PVOM89XclMdF7M40WzBWblwS1RX0LPR64xoxfv4u7E4yzfL3bKqEgCw2pqRkZRDO61g',
  },
  {
    name: 'Aura Room Spray',
    price: 'Rp 129.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCposUSZ1_1qt5S68Au4cz5Jx3gqNj5kFH8FLNhhxgwhLQKVwhPpPEM9f6CDpFMP3dfjVaOp8iQMHlLhp2w6qf4s1pHQOU0mDjOrxyqSrKahyyMfkt2zCJpn-VX69gSvmsEO_MceGLYm3bzsB4S08qFDp6YAvuya7s52DvTGI3EfqYCmRlxrxaDbIltH6RX166ggi5RfVwOsjPvuL6Oc_XZtcy6_lsSUJTK6biJK862FpUnZX2T7eKXk1HQRy_S2znrWc4-Hkh4L9g',
  },
  {
    name: 'Morning Clarity Oil',
    price: 'Rp 159.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkMFgnnIB1v3r6oXdAjepdKqdNikQEnKxgmslBU-soIcmMJX20cZIHfaDEOwDcPZLDQdayaIlOm_X58NNWljR8wpXPf-DXGsr94QG1AxvNa9zoBaWOU2Sc6n4OlgyNgQ__kQdinFrtkdO9Cnbhjt6Yt06kCFRca_H4dvcJN1dea8ePmVJ-1QEsDDOv_jVxswGjFkA_0lJX2wwlUZ38h2iHFr0P8yAncsUunSTdipBn69zJzWkFLbqHCXMw9yBXNiZtJVWLD1HD4GI',
  },
];

const TRUST_BADGES = [
  { icon: 'lock', label: 'Pembayaran Aman' },
  { icon: 'replay', label: 'Retur 14 Hari' },
  { icon: 'local_shipping', label: 'Pengiriman ke Seluruh Indonesia' },
];

interface CartActiveScreenProps {
  /** FIX_PLAN #5: list cart dari state App (bukan ITEMS hardcoded statis) */
  items: CartItem[];
  onRemoveItem?: (productName: string) => void;
  onUpdateQty?: (productName: string, delta: number) => void;
  onApplyPromo?: (code: string) => void;
  onCheckout?: () => void;
  onOpenProduct?: (productName: string) => void;
}

export const CartActiveScreen: React.FC<CartActiveScreenProps> = ({
  items,
  onRemoveItem,
  onUpdateQty,
  onApplyPromo,
  onCheckout,
  onOpenProduct,
}) => {
  // FIX_PLAN #7: promo — input mulai kosong; error hanya setelah apply gagal (mock: semua kode ditolak)
  const [promoCode, setPromoCode] = React.useState('');
  const [promoError, setPromoError] = React.useState(false);
  const itemCount = items.reduce((n, it) => n + it.quantity, 0);
  const subtotal = items.reduce((n, it) => n + it.product.price * it.quantity, 0);
  return (
    <div className="w-full min-h-screen bg-warm-ivory pb-20 md:pb-24">
      {/* FIX_PLAN #2: padding atas dikontrol App.tsx main (pt-20/24) — inner pt dihapus */}
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* REF 034: judul + span "(3 produk)" italic terpisah, baseline-aligned (bukan inline dalam h1) */}
        <div className="mb-8 md:mb-10 flex items-baseline gap-4">
          <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary">
            Keranjang Belanjamu
          </h1>
          <span className="text-[18px] leading-[28px] text-on-surface-variant italic">({itemCount} produk)</span>
          <span className="text-[11px] uppercase tracking-wider text-[#7f7478] border border-[#BDA494]/40 rounded-full px-2 py-0.5">DRAFT — Non-Purchasable (MOCK)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-16">
          {/* ── Left: Item List + Promo + Rekomendasi ── */}
          <div className="md:col-span-8">
            <div className="border-t border-[#BDA494]">
              {items.map((item) => (
                // FIX_PLAN #5: dari state App → qty & hapus sync dengan drawer (match by product.name)
                <div key={item.id} className="flex gap-4 md:gap-6 py-6 border-b border-[#BDA494]">
                  <button
                    onClick={() => onOpenProduct?.(item.product.name)}
                    className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-surface-tint rounded overflow-hidden cursor-pointer"
                  >
                    <img alt={item.product.name} className="w-full h-full object-cover" src={item.product.image} />
                  </button>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">
                          {item.product.name}
                        </h3>
                        <p className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant uppercase mt-1">
                          {item.product.category}
                        </p>
                      </div>
                      <span className="text-[16px] leading-[24px] font-semibold text-primary whitespace-nowrap">
                        Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}.000
                      </span>
                    </div>
                    <p className="text-[14px] leading-[20px] text-on-surface-variant mt-1">Rp {item.product.price.toLocaleString('id-ID')}.000 <span className="text-[10px]">(MOCK)</span></p>
                    <span className="inline-flex items-center gap-1 w-max mt-2 px-2 py-1 bg-[#F2E9E5] text-success-botanical rounded-full text-[11px] leading-[16px] font-medium">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Stok Tersedia
                    </span>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="flex items-center border border-[#BDA494] rounded-sm h-10 w-24 bg-white">
                        <button
                          onClick={() => onUpdateQty?.(item.product.name, -1)}
                          className="flex-1 h-full flex items-center justify-center text-primary hover:bg-[#F2E9E5] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="text-[14px] leading-[20px] font-semibold text-primary">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty?.(item.product.name, 1)}
                          className="flex-1 h-full flex items-center justify-center text-primary hover:bg-[#F2E9E5] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem?.(item.product.name)}
                        className="text-[14px] leading-[20px] text-on-surface-variant underline hover:text-primary transition-colors cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code — state error sesuai ref */}
            <div className="mt-8">
              <label className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary mb-2 block">
                Kode Promo
              </label>
              <div className="flex gap-2 max-w-md">
                <input
                  className="flex-1 h-12 px-4 rounded-sm text-[16px] leading-[24px] text-on-surface border border-[#BDA494] bg-white focus:border-primary focus:outline-none"
                  type="text"
                  placeholder="Masukkan kode"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                />
                <button
                  onClick={() => { if (!promoCode.trim()) return; setPromoError(true); onApplyPromo?.(promoCode.trim()); }}
                  className="h-12 px-6 rounded-sm border-[1.5px] border-[#BDA494] text-primary text-[14px] leading-[20px] font-semibold uppercase tracking-wider hover:bg-[#F2E9E5] transition-colors cursor-pointer"
                >
                  Gunakan
                </button>
              </div>
              {promoError && (
                <p className="flex items-center gap-1 mt-2 text-[11px] leading-[16px] tracking-[0.04em] font-medium text-[#9E3B3B]">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  Kode {promoCode} belum aktif (MOCK — demo)
                </p>
              )}
            </div>

            {/* REVIEWER FIX: section Rekomendasi Produk BARU di bawah list */}
            <section className="mt-14 md:mt-20 pt-14 md:pt-20 border-t border-[#BDA494]/40">
              <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-8">
                Rekomendasi Produk
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {RECOMMENDED.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => onOpenProduct?.(p.name)}
                    className="group flex flex-col text-left cursor-pointer"
                  >
                    <div className="aspect-square bg-surface-tint rounded-lg overflow-hidden mb-3">
                      <img
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={p.image}
                      />
                    </div>
                    <h3 className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-[14px] leading-[20px] text-on-surface-variant">{p.price}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right: Summary ──
              FIX QA (keputusan user, konsisten dgn SEQ 036/037): sticky DIHAPUS — kolom kanan statis.
              items-start di grid induk menjaga sisi atas tetap sejajar dgn daftar produk. */}
          <div className="md:col-span-4">
            <div className="bg-[#F7F1EE] p-6 md:p-8 rounded-sm border border-[#BDA494]">
              <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-6">
                Ringkasan Belanja
              </h2>
              <div className="flex flex-col gap-3 text-[16px] leading-[24px] text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-on-surface">Rp {subtotal.toLocaleString('id-ID')}.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="text-[14px] leading-[20px] italic">Dihitung saat checkout</span>
                </div>
              </div>
              <div className="border-t border-[#BDA494] my-6" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-[16px] leading-[24px] font-semibold text-primary uppercase tracking-wider">
                  Total
                </span>
                <span className="font-serif text-[24px] leading-[32px] font-semibold text-primary">Rp {subtotal.toLocaleString('id-ID')}.000</span>
              </div>
              {/* GOVERNANCE: DRAFT_NON_PURCHASABLE — produk non-purchasable, checkout ini
                  demo flow (034→036) bukan pembelian nyata. Badge DRAFT ada di header list. */}
              <button
                onClick={() => onCheckout?.()}
                className="w-full h-12 bg-primary-container text-warm-ivory rounded-sm text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-not-allowed opacity-90"
              >
                Lanjut ke Checkout (Demo)
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <p className="text-center text-[11px] leading-[16px] text-on-surface-variant mt-2">
                MOCK — DRAFT_NON_PURCHASABLE: alur demo, bukan pembelian nyata.
              </p>
              <button className="w-full h-12 mt-3 rounded-sm border-[1.5px] border-[#BDA494] text-primary text-[14px] leading-[20px] font-semibold uppercase tracking-wider hover:bg-[#F2E9E5] transition-colors cursor-pointer">
                Lanjut Belanja
              </button>
              <p className="text-center text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant italic mt-4">
                Keranjangmu tersimpan - lanjutkan kapan saja.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-[#BDA494]/40">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex flex-col items-center text-center gap-1">
                    <span className="material-symbols-outlined text-[20px] text-primary">{b.icon}</span>
                    <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
