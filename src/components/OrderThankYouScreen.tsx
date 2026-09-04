import React from 'react';

// STRICTLY MOCKUP (SEQ 041) — 1:1 dengan faisha-gallery/html/041_c2c896c738f340879fd3565f078c0ee6.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 · margin-mobile=16→px-4 · margin-desktop=40→px-10
// type    : display-lg=48/56 -.02em 600 · display-lg-mobile=38/44 · title-lg=22/28 600
//           body-lg=18/28 · body-base=16/24 · body-bold=16/24 600 · label-sm=11/16 .04em · label-caps=12/16 .06em 700
// warna ref-041: surface=#fff8f7 · surface-container=#F7F1EE · surface-hover=#F2E9E5 (SAMA @theme) → token aman;
//           champagne-taupe=#BDA494 · botanical-green=#3D6852 (= success-botanical) ·
//           deep-soul-plum=#5B4750 (= primary-container) · warm-dark-espresso=#291714 (= on-surface) → literal/token.
// PERBAIKAN QA: URL /aida/ "Botanical Celebration" MATI → padanan aida-public hidup (objek ritual, mirip konteks).
// bg-pattern radial dots champagne-taupe op .1 → inline style radial-gradient (CSS murni, tanpa plugin).
// LAYOUT: root full-width flex-col; konten terpusat max-w-2xl mx-auto mt-20, text-center.

interface OrderThankYouScreenProps {
  onViewOrder?: () => void;
  onStartRitual?: () => void;
  onExploreRitual?: () => void;
}

export const OrderThankYouScreen: React.FC<OrderThankYouScreenProps> = ({
  onViewOrder,
  onStartRitual,
  onExploreRitual,
}) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory flex flex-col relative overflow-x-hidden">
      {/* Subtle Pattern Background — radial dots #BDA494 opacity .1, tile 24px */}
      <div
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          backgroundImage: 'radial-gradient(#BDA494 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.1,
        }}
      />

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-10 py-12 md:py-24 relative z-10 w-full">
        <div className="w-full max-w-2xl flex flex-col items-center text-center gap-8 mt-20">
          {/* ── Focal Point Image ── */}
          <div className="w-48 h-48 md:w-64 md:h-64 mb-2 relative">
            <div className="absolute inset-0 bg-surface-container rounded-full blur-2xl opacity-50" />
            <img
              alt="Botanical Celebration"
              className="w-full h-full object-contain relative z-10 drop-shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-zxhUNRohb4k1AKXxW1u6slpJidKTMBOOkXsxyW43txi3Qls77gfchB0lQRtjMa8DwULi4yvjz3iW0jFm5gjzPhHfET15DEV6PW-zBWdidx7VfT_uZfGJvD160ljL60tHKw7EK1BcyMrpDZM9J3K_gwY_dc2lU9BazntuVAp3D1VJBvavmlalHIt9926RhNFH5seQV80Ri-506xgR9ULD9haVfYuSw7nfoiAXS62_L40T-R4HE8I_4yFh6UsoA-kSSq2URVIBsFI"
            />
          </div>

          {/* ── Header ── */}
          <div className="flex flex-col gap-2 max-w-lg">
            <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-primary md:text-[48px] md:leading-[56px]">
              Terima Kasih, Beautiful Soul
            </h1>
            <p className="text-[18px] leading-[28px] text-on-surface-variant">
              Pesananmu telah kami terima. Ini adalah awal dari ritualmu - kami menyiapkannya dengan penuh perhatian.
            </p>
          </div>

          {/* ── Order Confirmation Card ── */}
          <div className="w-full bg-[#F7F1EE] border border-[#BDA494] rounded-2xl p-8 shadow-[0_4px_20px_rgba(91,71,80,0.04)] relative overflow-hidden text-left">
            {/* Aksen botanis sudut kartu */}
            <span className="material-symbols-outlined absolute -top-8 -right-8 text-6xl text-[#BDA494]/20 rotate-45 select-none pointer-events-none">
              spa
            </span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2 md:gap-0 border-b border-[#BDA494]/30 pb-4">
              <div>
                <p className="text-[12px] leading-[16px] tracking-[0.06em] font-bold text-on-surface-variant uppercase mb-1">
                  Order ID
                </p>
                <p className="text-[16px] leading-[24px] font-semibold text-on-surface">FAI-2026-030841</p>
              </div>
              <div className="bg-[#3D6852]/10 text-[#3D6852] px-2 py-1 rounded-full border border-[#3D6852]/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span className="text-[11px] leading-[16px] tracking-[0.04em] font-semibold">Pembayaran Diterima</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-6">
              <p className="text-[16px] leading-[24px] text-on-surface-variant">Total Keseluruhan</p>
              <p className="text-[22px] leading-[28px] font-semibold text-on-surface">Rp 685.600</p>
            </div>
            <div className="bg-surface/50 rounded-lg p-4 border border-[#BDA494]/20 flex gap-2 items-start">
              <span className="material-symbols-outlined text-[#BDA494] mt-1">mail</span>
              <div>
                <p className="text-[16px] leading-[24px] text-on-surface">
                  Detail dikirim ke <span className="font-semibold">nadia@email.com</span>
                </p>
                <p className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-on-surface-variant italic mt-1">
                  Belum menerima email? Cek folder spam atau tunggu beberapa menit.
                </p>
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
            <button
              onClick={() => onViewOrder?.()}
              className="bg-primary-container text-warm-ivory font-semibold py-3 px-8 rounded-full hover:opacity-90 transition-opacity min-h-[48px] flex items-center justify-center shadow-[0_4px_12px_rgba(91,71,80,0.15)] cursor-pointer"
            >
              Lihat Pesanan
            </button>
            <button
              onClick={() => onStartRitual?.()}
              className="bg-transparent border-[1.5px] border-[#BDA494] text-on-surface font-semibold py-3 px-8 rounded-full hover:bg-surface-tint transition-colors min-h-[48px] flex items-center justify-center cursor-pointer"
            >
              Mulai Ritualmu
            </button>
          </div>

          {/* ── Langkah Selanjutnya ── */}
          <div className="w-full pt-12 mt-8 border-t border-[#BDA494]/20">
            <h3 className="text-[22px] leading-[28px] font-semibold text-primary mb-8 text-left">Langkah Selanjutnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Garis penghubung (desktop) */}
              <div className="hidden md:block absolute top-6 left-12 right-12 h-[1px] bg-[#BDA494]/30 -z-0" />
              {[
                { num: '1', text: 'Kami siapkan pesananmu (2-3 hari)', active: true },
                { num: '2', text: 'Dikirim dengan tracking', active: false },
                { num: '3', text: 'Mulai ritualmu saat tiba', active: false },
              ].map((s) => (
                <div key={s.num} className="flex flex-row md:flex-col items-center text-left md:text-center gap-4 relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 z-10 ${
                      s.active ? 'bg-surface-container border-[#BDA494]' : 'bg-surface border-[#BDA494]/50'
                    }`}
                  >
                    <span
                      className={`text-[22px] leading-[28px] font-semibold ${
                        s.active ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {s.num}
                    </span>
                  </div>
                  <p className={`text-[16px] leading-[24px] ${s.active ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Ritual Teaser Card ── */}
          <button onClick={() => onExploreRitual?.()} className="w-full group block mt-8 text-left cursor-pointer">
            <div className="bg-surface border border-[#BDA494]/20 hover:border-[#BDA494]/60 transition-colors rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_2px_10px_rgba(91,71,80,0.02)] hover:shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <div className="flex items-center gap-4 text-left">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[30px] text-primary font-light">local_florist</span>
                </div>
                <p className="text-[16px] leading-[24px] text-on-surface max-w-xs">
                  Sambil menunggu, kenali Morning Ritual yang akan kamu mulai.
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary font-semibold whitespace-nowrap group-hover:translate-x-1 transition-transform">
                Jelajahi <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
