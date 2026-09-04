import React, { useState } from 'react';

// STRICTLY MOCKUP (SEQ 037) — 1:1 dengan faisha-gallery/html/037_20b22615fa604fb5909c8b11406a91da.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : sm=8 md=16 lg=24 xl=32 2xl=48 · gutter=24 · margin-desktop=40→px-10 · section-desktop=100→py-[100px]
// type    : headline-lg=32/40 -.01em 600 · headline-md=24/32 · title-lg=22/28 600 · title-md=16/24 .01em 600
//           body-base=16/24 · body-bold=16/24 600 · label-lg=14/20 · label-sm=11/16 .04em · label-caps=12/16 .06em 700
// warna ref-037: surface-container=#F7F1EE (SAMA @theme) → aman; surface-tint=#6e5962 (DRIFT) → TIDAK dipakai;
//           kartu metode/summary = surface-container-lowest #ffffff → token bg-surface-container-lowest aman;
//           header grup & row selected pakai literal bg-[#F2E9E5]/30 & /50 sesuai ref.
// PERBAIKAN QA: URL /aida/ thumbnail summary MATI → padanan aida-public hidup.
//           Placeholder "Image 44" di ref memang kotak placeholder → dipertahankan (bukan fabrikasi gambar).
// LAYOUT: root full-width; stepper tengah atas (check/2/3); grid 2 kolom — metode kiri (md:w-2/3),
//         summary+alamat kanan statis (md:w-1/3) — sticky dihapus per keputusan QA.

const STEPPER = [
  { num: 'check', label: 'Kontak & Pengiriman', done: true, current: false },
  { num: '2', label: 'Pembayaran', done: false, current: true },
  { num: '3', label: 'Tinjau Pesanan', done: false, current: false },
];

const VA_OPTIONS = [
  { name: 'BCA VA', badge: 'BCA', selected: true, note: 'Nomor VA akan diberikan setelah pesanan dikonfirmasi.' },
  { name: 'Mandiri VA', badge: 'MANDIRI', selected: false, note: '' },
  { name: 'BNI VA', badge: 'BNI', selected: false, note: '' },
];

const EWALLET_OPTIONS = ['GoPay', 'OVO', 'DANA', 'ShopeePay'];

const OTHER_OPTIONS = [
  { name: 'Kartu Kredit (Visa/Mastercard)', sub: 'Sementara tidak tersedia', disabled: true },
  { name: 'QRIS', sub: '', disabled: false },
  { name: 'Gerai Retail (Indomaret, Alfamart)', sub: '', disabled: false },
];

const SUMMARY_ITEMS = [
  {
    name: 'Calm Morning Candle',
    qty: '1 x Rp 350.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY',
  },
  { name: 'Lavender Dream Mist', qty: '1 x Rp 167.000', image: '' },
  {
    name: 'Gratitude Journal',
    qty: '1 x Rp 159.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUh5wp8qWS8RAHlV8Gcnir2TKV8Cbq1Bl2gQxs3jfqeukUAjlJg6e61lTE3nki3lZcDYzAppD1GvW7-Jd4X1OsgK8Wy81zfw8owl4PW-ZOGgQiCP7sd3vmtLhYtUGf0lOsXB5sfEpdEjelIRiRphs3kJFMstjH0FcKeJaddrPE4TTfxVOahOHAKouwhLiL7Mm3fZTQZJemcdp9RMxoQ-OFRJtJaHNZcFItACWYtLkGb093NNBepVNvnop-bPRcIuo1xanztQbHKrE',
  },
];

const ROW_CLS = 'px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-[#F2E9E5]/20 transition-colors';
const RADIO_CLS = 'text-primary accent-[#433139] border-[#BDA494]';
const BADGE_CLS =
  'text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant border border-outline-variant px-2 py-1 rounded';

interface CheckoutPaymentScreenProps {
  onSelectMethod?: (methodName: string) => void;
  /** Edge case QA: 'payment-failure' saat metode VA (transfer bank) dipilih; 'processing' saat normal. */
  onCreateOrder?: (target: 'processing' | 'payment-failure') => void;
  onEditAddress?: () => void;
}

export const CheckoutPaymentScreen: React.FC<CheckoutPaymentScreenProps> = ({
  onSelectMethod,
  onCreateOrder,
  onEditAddress,
}) => {
  // Simulasi edge case: metode Virtual Account (transfer bank) → skenario gagal bayar.
  const [selected, setSelected] = useState<string>('BCA VA');
  const pick = (name: string) => {
    setSelected(name);
    onSelectMethod?.(name);
  };
  const handleCreateOrder = () => {
    onCreateOrder?.(/VA/.test(selected) ? 'payment-failure' : 'processing');
  };
  return (
    <div className="w-full min-h-screen bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-28 md:pt-32 py-8 md:py-[100px]">
        {/* ── Progress Stepper — tengah atas, rapi ── */}
        <div className="flex items-center justify-center mb-8 md:mb-12 max-w-2xl mx-auto w-full">
          {STEPPER.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && (
                <div
                  className={`flex-1 h-[1px] -mt-8 relative z-0 mx-4 ${i === 2 ? 'bg-primary/20' : 'bg-outline-variant'}`}
                />
              )}
              <div className={`flex flex-col items-center relative z-10 ${s.done || s.current ? '' : 'opacity-50'}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s.done || s.current
                      ? 'bg-primary text-warm-ivory shadow-sm'
                      : 'bg-surface-container text-on-surface-variant border border-outline-variant'
                  }`}
                >
                  {s.done ? (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  ) : (
                    <span className="text-[14px] leading-[20px] font-semibold">{s.num}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-[12px] leading-[16px] tracking-[0.06em] font-bold text-center ${
                    s.done || s.current ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          {/* ── Left Column: Metode Pembayaran ── */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary">
              Metode Pembayaran
            </h1>

            {/* Virtual Account */}
            <div className="bg-surface-container-lowest rounded-xl border border-[#BDA494] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#BDA494]/30 bg-[#F2E9E5]/30">
                <h2 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">Virtual Account</h2>
              </div>
              <div className="flex flex-col divide-y divide-[#BDA494]/30">
                {VA_OPTIONS.map((o) => (
                  <label
                    key={o.name}
                    onClick={() => pick(o.name)}
                    className={`px-6 py-4 flex flex-col cursor-pointer transition-colors ${
                      selected === o.name ? 'bg-[#F2E9E5]/50' : 'hover:bg-[#F2E9E5]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input className={RADIO_CLS} checked={selected === o.name} name="payment_method" type="radio" readOnly />
                        <span className={`text-on-surface ${o.selected ? 'text-[16px] leading-[24px] font-semibold' : 'text-[16px] leading-[24px]'}`}>
                          {o.name}
                        </span>
                      </div>
                      <span className={BADGE_CLS}>{o.badge}</span>
                    </div>
                    {o.note && <div className="ml-8 mt-2 text-[14px] leading-[20px] text-on-surface-variant">{o.note}</div>}
                  </label>
                ))}
              </div>
            </div>

            {/* E-Wallet */}
            <div className="bg-surface-container-lowest rounded-xl border border-[#BDA494] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#BDA494]/30 bg-[#F2E9E5]/30">
                <h2 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">E-Wallet</h2>
              </div>
              <div className="flex flex-col divide-y divide-[#BDA494]/30">
                {EWALLET_OPTIONS.map((name) => (
                  <label key={name} onClick={() => pick(name)} className={ROW_CLS}>
                    <div className="flex items-center gap-4">
                      <input className={RADIO_CLS} checked={selected === name} name="payment_method" type="radio" readOnly />
                      <span className="text-[16px] leading-[24px] text-on-surface">{name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Lainnya */}
            <div className="bg-surface-container-lowest rounded-xl border border-[#BDA494] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#BDA494]/30 bg-[#F2E9E5]/30">
                <h2 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">Lainnya</h2>
              </div>
              <div className="flex flex-col divide-y divide-[#BDA494]/30">
                {OTHER_OPTIONS.map((o) =>
                  o.disabled ? (
                    <label key={o.name} className="px-6 py-4 flex items-center justify-between opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-4">
                        <input className="border-[#BDA494]" disabled name="payment_method" type="radio" />
                        <span className="text-[16px] leading-[24px] text-on-surface flex flex-col">
                          {o.name}
                          <span className="text-[12px] text-on-surface-variant">{o.sub}</span>
                        </span>
                      </div>
                    </label>
                  ) : (
                    <label key={o.name} onClick={() => pick(o.name)} className={ROW_CLS}>
                      <div className="flex items-center gap-4">
                        <input className={RADIO_CLS} checked={selected === o.name} name="payment_method" type="radio" readOnly />
                        <span className="text-[16px] leading-[24px] text-on-surface">{o.name}</span>
                      </div>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-2 flex flex-col gap-4">
              <button
                onClick={handleCreateOrder}
                className="w-full h-12 bg-primary text-warm-ivory rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Buat Pesanan
              </button>
              <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="text-[14px] leading-[20px]">Pembayaran diproses aman &amp; terenkripsi</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Recap ──
              FIX QA v3 (keputusan user): sticky DIHAPUS total — kolom kanan statis diam di atas.
              items-start di container induk menjaga sisi atas tetap sejajar dgn "Metode Pembayaran". */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
              {/* Order Summary Card */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                <h3 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-4">
                  Ringkasan Pesanan
                </h3>
                <div className="flex flex-col gap-4 mb-6">
                  {SUMMARY_ITEMS.map((item) => (
                    <div key={item.name} className="flex gap-4 items-center">
                      {item.image ? (
                        <img alt={item.name} className="w-16 h-16 object-cover rounded" src={item.image} />
                      ) : (
                        // placeholder sesuai ref ("Image 44") — bukan fabrikasi gambar
                        <div className="w-16 h-16 bg-surface-variant rounded flex items-center justify-center text-on-surface-variant text-[12px] text-center p-1 shrink-0">
                          Image
                          <br />
                          44
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-[16px] leading-[24px] font-semibold text-on-surface">{item.name}</div>
                        <div className="text-[14px] leading-[20px] text-on-surface-variant">{item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-[#BDA494]/30 pt-4 mb-4 text-[16px] leading-[24px]">
                  <div className="flex justify-between text-on-surface">
                    <span>Subtotal</span>
                    <span>Rp 676.000</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Diskon</span>
                    <span>-Rp 14.900</span>
                  </div>
                  <div className="flex justify-between text-on-surface">
                    <span>Pengiriman</span>
                    <span>Rp 22.000</span>
                  </div>
                  <div className="flex justify-between text-on-surface">
                    <span>Biaya Layanan</span>
                    <span>Rp 2.500</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-[#BDA494]/30 pt-4 font-serif text-[24px] leading-[32px] font-semibold text-primary">
                  <span>TOTAL</span>
                  <span>Rp 685.600</span>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[22px] leading-[28px] font-semibold text-primary">Alamat Pengiriman</h3>
                  <button
                    onClick={() => onEditAddress?.()}
                    className="text-[14px] leading-[20px] text-secondary hover:text-primary transition-colors underline underline-offset-2 cursor-pointer"
                  >
                    Ubah
                  </button>
                </div>
                <div className="text-on-surface text-[16px] leading-[24px]">
                  <p className="font-semibold mb-1">Nadia Prameswari</p>
                  <p className="text-on-surface-variant">
                    Jl. Kemang Timur No. 24,
                    <br />
                    Apartemen Tower B Unit 12,
                    <br />
                    Jakarta Selatan
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
