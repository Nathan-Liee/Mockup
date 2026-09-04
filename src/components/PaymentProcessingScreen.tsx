import React, { useEffect, useState } from 'react';

// STRICTLY MOCKUP (SEQ 039) — 1:1 dengan faisha-gallery/html/039_85aef821620d46cebe3653b7fb0e6fd4.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 3xl=64 · margin-mobile=16→px-4 · margin-desktop=40→px-10
// type    : display-lg=48/56 -.02em 600 · display-lg-mobile=38/44 · headline-lg=32/40 -.01em 600
//           title-lg=22/28 600 · title-md=16/24 .01em 600 · body-lg=18/28 · body-base=16/24
//           body-bold=16/24 600 · label-sm=11/16 .04em 500 · label-caps=12/16 .06em 700
// warna ref-039: surface-container=#F7F1EE & surface-tint=#F2E9E5 (SAMA @theme) → token aman;
//           champagne-taupe=#BDA494 · tertiary-fixed=#f9ddcc · tertiary-container=#5c493c (literal bracket).
// ANIMASI CDN: spinner border + candle-flicker SVG → diganti spinner border murni (animate-spin v4),
//           hasil visual sama (lingkaran berputar). Delayed-state setTimeout 5s ref → useEffect 5s.
// LAYOUT: root full-width flex-col; konten terpusat max-w-3xl mx-auto, text-center.

interface PaymentProcessingScreenProps {
  onContactSupport?: () => void;
  /** INTEGRASI ORGANIK Group B: selesai simulasi → panggil pengubah tab ('thankyou'), bukan URL. */
  onCompleted?: () => void;
}

export const PaymentProcessingScreen: React.FC<PaymentProcessingScreenProps> = ({ onContactSupport, onCompleted }) => {
  // Ref menampilkan kotak "sudah >5 menit?" setelah 5 detik (setTimeout demo) → padanan React.
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDelayed(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // INTEGRASI ORGANIK: simulasi loading 3 detik → navigasi state via prop, bukan window.location.
  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleted?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onCompleted]);

  return (
    <div className="w-full min-h-screen bg-warm-ivory flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-10 py-14 md:py-[100px] max-w-3xl mx-auto w-full text-center mt-20">
        {/* ── Animated Loader — lingkaran spinner ── */}
        <div className="w-16 h-16 mb-8 relative mx-auto rounded-full flex items-center justify-center bg-surface-tint border border-[#BDA494]">
          <div className="absolute inset-2 rounded-full border-2 border-[#BDA494]/30 border-t-primary-container animate-spin" />
          <span className="material-symbols-outlined text-primary-container relative z-10">local_fire_department</span>
        </div>

        {/* ── Typography ── */}
        <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary mb-2 md:text-[48px] md:leading-[56px] md:tracking-[-0.02em]">
          Memproses Pembayaranmu
        </h1>
        <p className="text-[18px] leading-[28px] text-on-surface-variant max-w-lg mb-12">
          Mohon tunggu sebentar - kami sedang mengonfirmasi pembayaranmu dengan BCA Virtual Account. Jangan tutup halaman
          ini.
        </p>

        {/* ── Order Recap Card ── */}
        <div className="bg-surface-container rounded-lg p-8 w-full max-w-md mx-auto mb-8 border border-[#BDA494]/30 text-left">
          <div className="flex justify-between items-center mb-4 border-b border-[#BDA494]/20 pb-4">
            <span className="text-[12px] leading-[16px] tracking-[0.06em] font-bold text-on-surface-variant uppercase">
              Order ID
            </span>
            <span className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary">FAI-2026-030841</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[16px] leading-[24px] text-on-surface-variant">Total</span>
            <span className="text-[22px] leading-[28px] font-semibold text-primary">Rp 685.600</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[16px] leading-[24px] text-on-surface-variant">Metode</span>
            <span className="text-[16px] leading-[24px] font-semibold text-primary">BCA Virtual Account</span>
          </div>
          <div className="flex justify-between items-center pt-2 mt-4 border-t border-[#BDA494]/20">
            <span className="text-[16px] leading-[24px] text-on-surface-variant">Status</span>
            <span className="text-[11px] leading-[16px] px-4 py-1 rounded-full border border-[#BDA494] text-[#BDA494] uppercase tracking-wider">
              Menunggu Konfirmasi
            </span>
          </div>
        </div>

        <p className="text-[16px] leading-[24px] text-on-surface-variant mb-8 italic">Biasanya selesai dalam 1-2 menit</p>

        {/* ── Delayed State Info (muncul >5 menit) ── */}
        {delayed && (
          <div className="bg-[#f9ddcc]/30 border border-[#f9ddcc] rounded-lg p-6 max-w-md mx-auto mb-6 text-left">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#5c493c]">info</span>
              <div>
                <p className="text-[16px] leading-[24px] text-[#5c493c] mb-1">
                  Sudah lebih dari 5 menit? Pembayaranmu tetap aman. Cek status di email atau hubungi dukungan.
                </p>
                <button
                  onClick={() => onContactSupport?.()}
                  className="text-[16px] leading-[24px] font-semibold text-[#5c493c] underline hover:text-primary transition-colors cursor-pointer"
                >
                  Hubungi Dukungan
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-outline-variant uppercase tracking-widest max-w-sm mx-auto opacity-70">
          Tidak perlu membayar ulang - pesanan ini hanya diproses satu kali.
        </p>
      </div>
    </div>
  );
};
