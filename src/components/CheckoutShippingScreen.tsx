import React from 'react';

// STRICTLY MOCKUP (SEQ 036) — 1:1 dengan faisha-gallery/html/036_db8212f7da6b40fea04780d738fbbb72.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 · gutter=24→gap-6 · margin-desktop=40→px-10
// type    : headline-md=24/32 · title-lg=22/28 600 · title-md=16/24 .01em 600 · body-base=16/24
//           body-bold=16/24 600 · label-lg=14/20 .01em 600 · label-sm=11/16 .04em 500 · label-caps=12/16 .06em 700
// util CDN: divider (border #BDA494 op .5) → border-[#BDA494]/50; custom-input focus → focus:border-primary
// warna ref-036: surface-container=#F7F1EE (SAMA @theme) → aman; surface-tint=#6e5962 (DRIFT) → TIDAK dipakai;
//           error=#ba1a1a · error-container=#ffdad6 · on-error-container=#93000a (literal bracket).
// PERBAIKAN QA: URL /aida/ thumbnail summary MATI → padanan aida-public hidup.
// LAYOUT: root full-width; stepper atas rapi (flex, lingkaran 1-2-3 + garis pemisah);
//         grid 2 kolom md:grid-cols-12 items-start — form kiri col-span-8, summary statis kanan col-span-4
//         (sticky dihapus per keputusan QA, konsisten dgn SEQ 037).

const STEPPER = [
  { num: 1, label: 'Kontak & Pengiriman', active: true },
  { num: 2, label: 'Pembayaran', active: false },
  { num: 3, label: 'Tinjau Pesanan', active: false },
];

const SHIPPING_OPTIONS = [
  { name: 'Reguler 3-5 hari', price: 'Rp 22.000', selected: true },
  { name: 'Express 1-2 hari', price: 'Rp 45.000', selected: false },
  { name: 'Same Day Jakarta', price: 'Rp 65.000', selected: false },
];

const SUMMARY_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAMU99lNexL8ycOUVakai6sy8GdbRLZWUdsmCcqRh9ik_8oLQjQsr3fiQiWNHDJREmv7SuvW5iXj4U1vs2jJ46wYBfjJk_v35kRKpZOK3emW3Pn-fk8W4n-ixsqJT1Df86VvYRgxwF9kuOAVRYML7ly6j50Hjreca-rIkbzgENwo9bc48i7cLA6WQHcJuXva0htuRmQLJ0XQYmzwYq_b8jx0AKMCtjhPtgvGJued6eYrI7QE5oUGNhq3-M4DRB_LQPUznJe4LQIEtU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDeKKS4QJr--JjXylyPn44v_a3TVj7REAN7-52Ourhp24WPgvtc7SEgFujko6d2gkvjUCZiq6udpr3Y2TTP6Eyd1R6PzLKHGtT3RCX7ZCtG4wKtL0TScTlrRBXEvsTEHfyccmmNKB-bbV7bgumbsFJLB007Que9YnKiWlrzG_IfnFHHnjIjl9dHTkjTfjOtPMGTqcd-jYYfI37dEhnlOdbTZEaqS-GP41hsJnzN4VQdD_L-fkQo-V3exvJxifLxRbeQit7lBtKWCHw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCUh5wp8qWS8RAHlV8Gcnir2TKV8Cbq1Bl2gQxs3jfqeukUAjlJg6e61lTE3nki3lZcDYzAppD1GvW7-Jd4X1OsgK8Wy81zfw8owl4PW-ZOGgQiCP7sd3vmtLhYtUGf0lOsXB5sfEpdEjelIRiRphs3kJFMstjH0FcKeJaddrPE4TTfxVOahOHAKouwhLiL7Mm3fZTQZJemcdp9RMxoQ-OFRJtJaHNZcFItACWYtLkGb093NNBepVNvnop-bPRcIuo1xanztQbHKrE',
];

const INPUT_CLS =
  'w-full h-12 px-2 bg-white border border-[#BDA494] rounded focus:border-primary focus:outline-none text-[16px] leading-[24px] text-on-surface';
const LABEL_CLS = 'text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary mb-1 block';

interface CheckoutShippingScreenProps {
  onSelectShipping?: (optionName: string) => void;
  onContinueToPayment?: () => void;
}

export const CheckoutShippingScreen: React.FC<CheckoutShippingScreenProps> = ({
  onSelectShipping,
  onContinueToPayment,
}) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory pb-14 md:pb-[100px]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-28 md:pt-32">
        {/* ── Progress Stepper — rapi di atas ── */}
        <div className="flex items-center gap-2 md:gap-4 text-[12px] leading-[16px] tracking-[0.06em] font-bold mb-8 md:mb-10 flex-wrap">
          {STEPPER.map((s, i) => (
            <React.Fragment key={s.num}>
              {i > 0 && <span className="w-6 md:w-8 border-t border-[#BDA494]/50" />}
              <span
                className={`flex items-center gap-2 ${
                  s.active ? 'text-primary-container font-bold' : 'text-on-surface-variant font-medium'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[14px] ${
                    s.active ? 'bg-primary-container text-warm-ivory' : 'border border-outline-variant text-on-surface-variant'
                  }`}
                >
                  {s.num}
                </span>
                {s.label}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-16">
          {/* ── Left Column (8): Form ── */}
          <div className="md:col-span-8 flex flex-col gap-8">
            {/* Informasi Kontak */}
            <section className="bg-surface p-6 rounded-xl border border-outline-variant/30">
              <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-4">
                Informasi Kontak
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={LABEL_CLS} htmlFor="checkout-email">
                    Email
                  </label>
                  <input className={INPUT_CLS} id="checkout-email" type="email" defaultValue="nadia@email.com" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="w-5 h-5 rounded border-[#BDA494] text-primary-container accent-[#5b4750]" type="checkbox" />
                  <span className="text-[16px] leading-[24px] text-on-surface-variant">
                    Kabari saya tentang ritual &amp; produk baru
                  </span>
                </label>
              </div>
            </section>

            {/* Alamat Pengiriman */}
            <section className="bg-surface p-6 rounded-xl border border-outline-variant/30">
              <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-4">
                Alamat Pengiriman
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL_CLS}>Nama Lengkap</label>
                  <input className={INPUT_CLS} type="text" defaultValue="Nadia Prameswari" />
                </div>
                <div>
                  <label className={LABEL_CLS}>Nomor Telepon</label>
                  <input className={INPUT_CLS} type="tel" defaultValue="0812 3456 7890" />
                </div>
                <div className="md:col-span-2">
                  <label className={LABEL_CLS}>Alamat</label>
                  <input
                    className={INPUT_CLS}
                    type="text"
                    defaultValue="Jl. Kemang Timur No. 24, Apartemen Tower B Unit 12"
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>Kota</label>
                  <input className={INPUT_CLS} type="text" defaultValue="Jakarta Selatan" />
                </div>
                <div>
                  <label className={LABEL_CLS}>Provinsi</label>
                  <select className={INPUT_CLS} defaultValue="DKI Jakarta">
                    <option>DKI Jakarta</option>
                    <option>Jawa Barat</option>
                  </select>
                </div>
                {/* Field error state — sesuai ref */}
                <div>
                  <label className={LABEL_CLS}>Kode Pos</label>
                  <input
                    className="w-full h-12 px-2 bg-[#ffdad6] border border-[#ba1a1a] rounded focus:outline-none text-[16px] leading-[24px] text-[#93000a]"
                    type="text"
                    defaultValue="12560"
                  />
                  <span className="flex items-center gap-1 mt-1 text-[11px] leading-[16px] tracking-[0.04em] font-medium text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    Kode pos tidak valid - masukkan 5 digit
                  </span>
                </div>
                <div className="md:col-span-2 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="w-5 h-5 rounded border-[#BDA494] text-primary-container accent-[#5b4750]"
                      type="checkbox"
                      defaultChecked
                    />
                    <span className="text-[16px] leading-[24px] text-on-surface-variant">Simpan sebagai alamat utama</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Metode Pengiriman */}
            <section className="bg-surface p-6 rounded-xl border border-outline-variant/30">
              <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-4">
                Metode Pengiriman
              </h2>
              <div className="flex flex-col gap-2">
                {SHIPPING_OPTIONS.map((o) => (
                  <label
                    key={o.name}
                    onClick={() => onSelectShipping?.(o.name)}
                    className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                      o.selected
                        ? 'border-2 border-primary-container bg-surface-container'
                        : 'border border-[#BDA494] bg-white hover:bg-surface-container-low'
                    }`}
                  >
                    <input className="mt-1 w-5 h-5 accent-[#5b4750]" checked={o.selected} name="shipping" type="radio" />
                    <div className="flex-grow flex justify-between items-center">
                      <span
                        className={`text-[16px] leading-[24px] tracking-[0.01em] font-semibold ${
                          o.selected ? 'text-primary' : 'text-on-surface'
                        }`}
                      >
                        {o.name}
                      </span>
                      <span
                        className={`text-[16px] leading-[24px] font-semibold ${
                          o.selected ? 'text-primary' : 'text-on-surface'
                        }`}
                      >
                        {o.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Column (4): Summary ──
              FIX QA (keputusan user, konsisten dgn SEQ 037): sticky DIHAPUS — kolom kanan statis.
              items-start di grid induk menjaga sisi atas tetap sejajar dgn kolom form. */}
          <div className="md:col-span-4">
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col gap-4">
              <h3 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary">
                Ringkasan Pesanan
              </h3>
              <div className="flex gap-2">
                {SUMMARY_IMGS.map((src, i) => (
                  <img
                    key={src}
                    alt={`Produk ${i + 1} di keranjang`}
                    className="w-[60px] h-[60px] object-cover rounded border border-outline-variant/30"
                    src={src}
                  />
                ))}
              </div>
              <div className="border-t border-[#BDA494]/50 my-1" />
              <div className="flex flex-col gap-1 text-[16px] leading-[24px] text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp 676.000</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Diskon</span>
                  <span>-Rp 14.900</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkir</span>
                  <span>Rp 22.000</span>
                </div>
              </div>
              <div className="border-t border-[#BDA494]/50 my-1" />
              <div className="flex justify-between items-end mb-2">
                <span className="text-[22px] leading-[28px] font-semibold text-primary">Total</span>
                <span className="font-serif text-[24px] leading-[32px] font-semibold text-primary-container">
                  Rp 683.100
                </span>
              </div>
              <button
                onClick={() => onContinueToPayment?.()}
                className="w-full h-12 bg-primary-container text-warm-ivory rounded-lg text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Lanjut ke Pembayaran
              </button>
              <p className="flex items-center justify-center gap-1 text-center text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Tidak ada biaya tersembunyi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
