import React from 'react';

// STRICTLY MOCKUP (SEQ 040) — 1:1 dengan faisha-gallery/html/040_d7dcb22061de4935ae996e216ef924eb.html
// Nav & Footer tidak dirender di sini: sudah disediakan Header.tsx / Footer.tsx global di App.tsx.
// Caller: belum ada (orphan by design — routing ke App.tsx dilarang oleh scope task).
//
// TRANSLASI TOKEN CDN → TAILWIND v4 MENTAH
// spacing : xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 · margin-mobile=16→px-4 · margin-desktop=40→px-10
// type    : display-lg=48/56 -.02em 600 · headline-lg=32/40 -.01em 600 · body-lg=18/28 · body-base=16/24
//           body-bold=16/24 600 · label-lg=14/20 .01em 600 · label-sm=11/16 .04em 500
// warna ref-040: surface-container=#F7F1EE · surface-tint=#F2E9E5 · surface-container-high=#ffe2de
//           (SAMA @theme) → token aman; error-earthy=#9E3B3B · tertiary=#443327 (literal bracket).
// Gambar ilustrasi sudah aida-public di ref → tidak perlu swap.
// LAYOUT: root full-width flex-col; konten terpusat max-w-2xl mx-auto mt-20, text-center;
//         kotak peringatan = Failure Reason Card (border-[#BDA494], teks error-earthy).

const QUICK_METHODS = ['GoPay', 'QRIS', 'Mandiri VA', 'OVO'];

interface PaymentFailureScreenProps {
  onRetryPayment?: () => void;
  onChooseOtherMethod?: (methodName?: string) => void;
  onContactSupport?: () => void;
  onViewOrderStatus?: () => void;
}

export const PaymentFailureScreen: React.FC<PaymentFailureScreenProps> = ({
  onRetryPayment,
  onChooseOtherMethod,
  onContactSupport,
  onViewOrderStatus,
}) => {
  return (
    <div className="w-full min-h-screen bg-warm-ivory flex flex-col">
      <div className="flex-grow flex flex-col items-center px-4 md:px-10 py-14 md:py-[100px] w-full">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-20">
          {/* ── Ilustrasi — lilin padam ── */}
          <div className="mb-6 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-surface-container flex items-center justify-center shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
            <img
              alt="Lilin padam dengan sisa asap — momen yang tertunda"
              className="w-full h-full object-cover opacity-90 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO0iTur2OoBq7HuE9wjh5KKQ-YnAZGU1m8fLh_WjvuYwY6moHh3H8ZECNS5EWtBdNR2J_p-L8A87F3Jnc86ODk8xkwrENsdx2SmI4R6c4DG3t8-Fd7DJAVYn_CUGMGHJi7Ws47abTmjQXkbhdRRrKqxnHJlHpRInedeU2NWhj4c9vFImsitCCZ-xfTe1kcxAjXJaPD-xXTW9XxZxNQM0DQ724juOc05kbFioG7Ufw3QnsKCVLINSCXibKKf00K8TR7cpHs-_QHFpA"
            />
          </div>

          {/* ── Header ── */}
          <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-primary mb-4 md:text-[48px] md:leading-[56px] md:tracking-[-0.02em]">
            Pembayaran Belum Berhasil
          </h1>
          <p className="text-[18px] leading-[28px] text-on-surface-variant mb-8 max-w-lg">
            Jangan khawatir - pesananmu dan keranjangmu tersimpan aman. Tidak ada dana yang terpotong.
          </p>

          {/* ── Failure Reason Card — kotak peringatan ── */}
          <div className="w-full bg-surface-container border border-[#BDA494] rounded-lg p-6 mb-8 text-left flex flex-col gap-1">
            <p className="text-[16px] leading-[24px] font-semibold text-[#9E3B3B] flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px]">error</span>
              Penyebab: Waktu pembayaran Virtual Account habis
            </p>
            <div className="h-px w-full bg-[#BDA494]/30 my-2" />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 w-full">
              <span className="text-[16px] leading-[24px] text-on-surface-variant">ID Pesanan: FAI-2026-030841</span>
              <span className="text-[16px] leading-[24px] font-semibold text-primary">Total: Rp 685.600</span>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
            <button
              onClick={() => onRetryPayment?.()}
              className="bg-primary text-warm-ivory px-8 py-3 min-h-[48px] rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Coba Bayar Lagi
            </button>
            <button
              onClick={() => onChooseOtherMethod?.()}
              className="bg-transparent border-[1.5px] border-[#BDA494] text-[#443327] px-8 py-3 min-h-[48px] rounded text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-surface-tint transition-colors cursor-pointer"
            >
              Pilih Metode Lain
            </button>
          </div>

          {/* ── Quick Payment Chips — opsi pembayaran lain ── */}
          <div className="w-full flex flex-wrap justify-center gap-2 mb-12">
            {QUICK_METHODS.map((m) => (
              <button
                key={m}
                onClick={() => onChooseOtherMethod?.(m)}
                className="px-4 py-2 rounded-full bg-surface-tint text-[11px] leading-[16px] tracking-[0.04em] font-medium text-primary hover:bg-outline-variant/30 transition-colors border border-transparent hover:border-primary/20 cursor-pointer"
              >
                {m}
              </button>
            ))}
          </div>

          {/* ── Reassurance Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
            <div className="flex flex-col items-center text-center p-4">
              <span className="material-symbols-outlined text-outline mb-2 text-[28px]">shopping_bag</span>
              <span className="text-[16px] leading-[24px] text-on-surface-variant">Keranjangmu utuh</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="material-symbols-outlined text-outline mb-2 text-[28px]">inventory_2</span>
              <span className="text-[16px] leading-[24px] text-on-surface-variant">Stok diamankan 2 jam</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="material-symbols-outlined text-outline mb-2 text-[28px]">support_agent</span>
              <button
                onClick={() => onContactSupport?.()}
                className="text-[16px] leading-[24px] text-primary underline hover:text-primary-container transition-colors cursor-pointer"
              >
                Butuh bantuan? Hubungi dukungan
              </button>
            </div>
          </div>

          {/* ── Hint Chip ── */}
          <div className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-[11px] leading-[16px] tracking-[0.04em] font-medium shadow-[0_2px_10px_rgba(91,71,80,0.02)]">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Menunggu pembayaran? Cek status pesananmu di
            <button
              onClick={() => onViewOrderStatus?.()}
              className="font-semibold underline text-primary ml-1 cursor-pointer"
            >
              Akun &gt; Pesanan
            </button>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
