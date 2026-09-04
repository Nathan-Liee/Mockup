import React from 'react';

// STRICTLY MOCKUP (SEQ 042) — 1:1 dengan faisha-gallery/html/042_f200b56a05724351bccc0f97622da86c.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 · margin-mobile=16→px-4 · margin-desktop=40→px-10
// type    : headline-lg=32/40 -.01em 600 · headline-md=24/32 · title-lg=22/28 600 · title-md=16/24 .01em 600
//           body-base=16/24 · body-bold=16/24 600 · label-sm=11/16 .04em 500 · label-caps=12/16 .06em 700
// warna ref-042: surface-container=#F7F1EE · surface-tint=#F2E9E5 · surface-container-low=#fff0ee (SAMA @theme)
//           → token aman; info-slate=#4A6984 · champagne-taupe=#BDA494 (literal bracket).
// Gambar ref sudah aida-public hidup → tidak perlu swap.
// shadow-tactile CDN → shadow-[0_4px_20px_rgba(91,71,80,0.04)].
// LAYOUT QA: root full-width flex-col; grid 12 kolom items-start — KIRI timeline col-span-7/8,
//            KANAN info statis col-span-5/4. STICKY DIHAPUS (aturan QA final, konsisten SEQ 034/036/037).

const TIMELINE = [
  { title: 'Pesanan Dikonfirmasi', time: '8 Mar 2026 · 14:32', status: 'done' },
  { title: 'Pembayaran Diterima', time: '8 Mar 2026 · 14:45', status: 'done' },
  { title: 'Sedang Dikemas', time: '9 Mar 2026 · 09:15', status: 'done' },
  { title: 'Dalam Pengiriman', time: '10 Mar 2026 · 08:00', status: 'active' },
  { title: 'Terkirim', time: 'Estimasi: 12-13 Maret', status: 'upcoming' },
] as const;

const PRODUCTS = [
  {
    name: 'Moonlight Serenity Candle',
    qty: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgcnx_oDyn3oig_lxrYKMol22_Xewpl46eXZZPDk54lrTjGorcNEfq3nKwzwc2MAtcZ761X1ed9VLUCeMYVTeGaG2WmhCGuspYnTqd1LB2M6xTRZ7a1LoA1ziTxTfWjb94MVy6rPnzXV-ZWBYik9fNb8qHZFixiT3garohuRqml2UnfkXOm8Y75V7pGwJQ80CkZre-eCSve9jK3rNWUOFBPmNf2FPHN0nz8Zghe-ilOuewhcBfVmLvitNrq2qsxs3CWKvThJJAUpA',
  },
  {
    name: 'Calm Morning Candle',
    qty: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDU9TjKp4ubl1XlrxSICZuFWNQPZjzsgK5PzvU6Ndl_XmORqFuJMP7ZuEdlOFkc1J7S4KpOs_hoIQA1U4ik4OpS1d5ACzOqlBH8s8V5KgVkxaLrrc6fXpzJAPaSldOYrtbFg-BCVoAlf6OTy1FEYlaWJY8d0a3hz3xjTk9OcW4_qsNYrhB_s61yWkaoBalrUlTsAnw_BcRH6gfsUaOT2XdhqlH5y6yfSoZAG2y0hZa2XHyIbPCHqfHP9n6KMUsF8WsaGxnHRM3vtTc',
  },
  {
    name: 'Soul Journal',
    qty: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGgZ6v4Xvmog9qnyNUE0jpuL7dpVDUQ6vm1aGIrroAxK1SBhGsNFoZOajFcCu-S1_S8HvAvvSRRr4AjoGCqEba5U2A5upGBnCxMWghAQr81of4bPl2aoVfuKfGpt0-I6ZLr1_wHsmMLKSreSj6U2A9e8fVg3uoVs4Tnk-ImsP4bBYyPYaVITXB8Qdun-ZwDB4myaaqI0ct_OC5QJqOMRNWPqGbi9l29IVlX97C9dMTK3j4NQjn936GqnTgmQ6srPiAizHMio1x6iE',
  },
];

interface OrderTrackingScreenProps {
  onCopyTracking?: (resi: string) => void;
  onTrackWithCourier?: () => void;
  onContactSupport?: () => void;
  onOpenProduct?: (productName: string) => void;
  /** INTEGRASI ORGANIK Group B: jembatan kembali → pengubah tab App.tsx ('beranda'), bukan URL. */
  onBackHome?: () => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  onCopyTracking,
  onTrackWithCourier,
  onContactSupport,
  onOpenProduct,
  onBackHome,
}) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory flex flex-col pb-14 md:pb-[100px]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-28 md:pt-32 w-full">
        {/* ── Header Block ── */}
        <div className="mb-8 md:mb-12">
          {/* JEMBATAN KEMBALI (integrasi organik): ujung flow Group B → tab 'beranda' via prop. */}
          <button
            onClick={() => onBackHome?.()}
            className="flex items-center gap-1 mb-4 text-[12px] leading-[16px] tracking-[0.06em] font-bold text-on-surface-variant uppercase hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Kembali ke Beranda
          </button>
          <nav className="text-[12px] leading-[16px] tracking-[0.06em] font-bold text-on-surface-variant uppercase mb-3">
            Akun <span className="mx-1 opacity-60">&gt;</span> Riwayat Pesanan{' '}
            <span className="mx-1 opacity-60">&gt;</span>{' '}
            <span className="text-primary">Lacak Pesanan</span>
          </nav>
          <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary mb-2">
            Lacak Pesanan
          </h1>
          <p className="text-[16px] leading-[24px] text-on-surface-variant">
            <span className="font-mono">Order ID: FAI-2026-030841</span>
            <span className="mx-2">·</span>
            Dipesan 8 Maret 2026
          </p>
        </div>

        {/* Grid induk items-start — kolom kanan STATIS (no sticky, aturan QA final) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-6">
          {/* ── LEFT: Timeline Status Pesanan ── */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* Exception / info chip */}
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4A6984] shrink-0">info</span>
              <div>
                <p className="text-[16px] leading-[24px] font-semibold text-on-surface">Informasi Pengiriman</p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">
                  Keterlambatan? Kami akan kabari proaktif via email &amp; WhatsApp.
                </p>
              </div>
            </div>

            {/* Timeline card */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(91,71,80,0.04)] relative overflow-hidden">
              {/* Aksen dekoratif sudut */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-surface-variant opacity-20 rounded-bl-full pointer-events-none" />
              <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-8 relative">
                Status Pesanan
              </h2>
              <div className="relative">
                {/* Garis vertikal penghubung */}
                <div className="absolute left-[15px] top-[16px] bottom-[16px] w-[2px] bg-outline-variant/30" />
                <div className="flex flex-col gap-8">
                  {TIMELINE.map((step) => (
                    <div key={step.title} className="flex gap-4 md:gap-6 relative">
                      {/* Node lingkaran */}
                      {step.status === 'done' && (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 ring-4 ring-surface relative z-10">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                      )}
                      {step.status === 'active' && (
                        <div className="w-8 h-8 rounded-full bg-surface border-2 border-primary flex items-center justify-center shrink-0 ring-4 ring-surface relative z-10">
                          <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
                        </div>
                      )}
                      {step.status === 'upcoming' && (
                        <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant flex items-center justify-center shrink-0 ring-4 ring-surface relative z-10">
                          <span className="w-2 h-2 rounded-full bg-outline-variant" />
                        </div>
                      )}
                      {/* Label langkah */}
                      <div className={`flex-1 pb-2 ${step.status === 'upcoming' ? 'opacity-60' : ''}`}>
                        <p
                          className={
                            step.status === 'active'
                              ? 'text-[22px] leading-[28px] font-semibold text-primary'
                              : 'text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-on-surface'
                          }
                        >
                          {step.title}
                        </p>
                        <p className="text-[14px] leading-[20px] text-on-surface-variant mt-1">{step.time}</p>
                        {step.status === 'active' && (
                          <div className="mt-3 bg-surface-container-low border border-primary/20 rounded p-4">
                            <p className="text-[16px] leading-[24px] text-on-surface">
                              Paketmu sedang dalam perjalanan - <span className="font-mono">JNE REG 882910034551</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info Pengiriman & Detail Produk — STATIS, tanpa sticky ── */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            {/* Info Pengiriman */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <h3 className="flex items-center gap-2 text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-4">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                Info Pengiriman
              </h3>
              <p className="text-[16px] leading-[24px] text-on-surface-variant mb-2">Kurir: JNE Reguler</p>
              <div className="flex items-center justify-between bg-surface-container-low p-2 rounded border border-outline-variant/30 mb-3">
                <span className="font-mono text-[14px] leading-[20px] text-on-surface">882910034551</span>
                <button
                  onClick={() => onCopyTracking?.('882910034551')}
                  className="flex items-center gap-1 text-[12px] leading-[16px] tracking-[0.06em] font-bold text-primary uppercase hover:text-primary-container transition-colors cursor-pointer px-2"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  Salin
                </button>
              </div>
              <button
                onClick={() => onTrackWithCourier?.()}
                className="flex items-center gap-1 text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary underline hover:text-primary-container transition-colors cursor-pointer"
              >
                Lacak di situs kurir
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Alamat */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <h3 className="flex items-center gap-2 text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-4">
                <span className="material-symbols-outlined text-[20px]">home_pin</span>
                Alamat Pengiriman
              </h3>
              <div className="text-[16px] leading-[24px] text-on-surface-variant">
                <p className="font-semibold text-on-surface">Nadia Prameswari</p>
                <p>Jl. Kemang Timur No. 24</p>
                <p>Apartemen Tower B Unit 12</p>
                <p>Jakarta Selatan</p>
              </div>
            </div>

            {/* Detail Produk */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <h3 className="flex items-center gap-2 text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-4">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                Detail Produk
              </h3>
              <div className="flex flex-col gap-4">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => onOpenProduct?.(p.name)}
                    className="flex items-center gap-3 text-left cursor-pointer group"
                  >
                    <img
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded border border-outline-variant/30 shrink-0"
                      src={p.image}
                    />
                    <div>
                      <p className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                      <p className="text-[14px] leading-[20px] text-on-surface-variant">Qty {p.qty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col items-center text-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-primary">support_agent</span>
              <p className="text-[16px] leading-[24px] text-on-surface">Ada kendala dengan pesananmu?</p>
              <button
                onClick={() => onContactSupport?.()}
                className="w-full h-12 bg-primary text-warm-ivory rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Hubungi Dukungan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
