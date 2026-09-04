import React, { useState } from 'react';
import { RefreshCw, Home, ShoppingBag, Lock, WifiOff, Check, AlertTriangle, Layers, Inbox, ShoppingCart, Package, BookOpen, Search, ShieldCheck, Cookie } from 'lucide-react';

/**
 * Group F system-state library (095/096/097/098/099/100/101/102/103).
 * Konten nyata (bukan "coming soon") — status system state, tanpa klaim.
 * 096 Empty States + 100 Consent States = library R1/P0 (review-103.csv),
 * konten verbatim html ref 096/100.
 */

const shell = 'min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center';
const tag = 'inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5B4750] bg-[#F2E9E5] border border-[#BDA494]/60 rounded-full px-4 py-2 mb-6';
const btn = 'h-12 px-6 inline-flex items-center gap-2 bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all';
const btnGhost = 'h-12 px-6 inline-flex items-center gap-2 border border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] transition-colors';

/** 096 — Empty States Library (konten verbatim html/096, status CSV "Ada") */
const EMPTY_STATES = [
  { icon: 'inbox', title: 'Belum ada apa-apa di sini', cta: 'Kembali ke Beranda' },
  { icon: 'cart', title: 'Keranjangmu masih kosong', cta: 'Jelajahi Ritual' },
  { icon: 'package', title: 'Belum ada pesanan', cta: 'Mulai Belanja' },
  { icon: 'journal', title: 'Belum ada entri', sub: 'mulai dari satu kalimat', cta: 'Tulis Refleksi' },
];
const ICON_MAP: Record<string, React.ReactNode> = {
  inbox: <Inbox className="w-8 h-8 text-[#BDA494]" />,
  cart: <ShoppingCart className="w-8 h-8 text-[#BDA494]" />,
  package: <Package className="w-8 h-8 text-[#BDA494]" />,
  journal: <BookOpen className="w-8 h-8 text-[#BDA494]" />,
};
export const SystemEmptyLibraryScreen: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => (
  <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-28 pb-24">
    <span className={tag}><Inbox className="w-3.5 h-3.5" /> System State Library — 096</span>
    <h1 className="text-3xl font-semibold text-[#433139] font-serif mb-3">Empty States</h1>
    <p className="text-base text-[#4d4448] max-w-xl mb-10">Restorative moments when content is absent. Designed to gently guide the user forward rather than presenting a dead end.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {EMPTY_STATES.map((e) => (
        <div key={e.title} className="bg-white rounded-xl border border-[#d0c3c7]/50 p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
          {ICON_MAP[e.icon]}
          <h3 className="text-lg font-semibold text-[#433139] mt-6 mb-5">{e.title}</h3>
          {e.sub && <p className="text-sm text-[#4d4448] -mt-3 mb-5">{e.sub}</p>}
          <button className={`${btn} mt-auto`} onClick={() => onNavigate?.('/001')}>{e.cta}</button>
        </div>
      ))}
      {/* SEARCH — span 2 kolom */}
      <div className="bg-white rounded-xl border border-[#d0c3c7]/50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:col-span-2">
        <Search className="w-12 h-12 text-[#BDA494] shrink-0" />
        <div className="text-center md:text-left flex-grow">
          <h3 className="text-lg font-semibold text-[#433139] mb-4">Tidak ditemukan untuk kata kunci ini</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {['Lilin Aromaterapi', 'Ritual Tidur', 'Jurnal'].map((p) => (
              <span key={p} className="border border-[#BDA494]/60 text-[#433139] text-xs px-4 py-1.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/** 095 — Loading & Skeleton */
export const SystemLoadingScreen: React.FC = () => (
  <div className={shell}>
    <span className={tag}><RefreshCw className="w-3.5 h-3.5 animate-spin" /> System State — 095</span>
    <h1 className="text-2xl font-semibold text-[#433139] mb-2">Memuat Sanctuary</h1>
    <p className="text-sm text-[#4d4448] mb-10 max-w-md">Menyiapkan ruang tenangmu. Sebentar lagi semuanya siap.</p>
    <div className="w-full max-w-md space-y-4" aria-busy="true" aria-label="Memuat konten">
      <div className="h-32 rounded-2xl bg-[#F2E9E5] animate-pulse" />
      <div className="h-4 w-3/4 rounded-full bg-[#F2E9E5] animate-pulse" />
      <div className="h-4 w-1/2 rounded-full bg-[#F2E9E5] animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 rounded-xl bg-[#F2E9E5] animate-pulse" />
        <div className="h-24 rounded-xl bg-[#F2E9E5] animate-pulse" />
      </div>
    </div>
  </div>
);

/** 097 — Error & Recovery */
export const SystemErrorScreen: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => (
  <div className={shell}>
    <span className={tag}><AlertTriangle className="w-3.5 h-3.5" /> System State — 097</span>
    <h1 className="text-2xl font-semibold text-[#433139] mb-2">Ada yang Tidak Beres</h1>
    <p className="text-sm text-[#4d4448] mb-8 max-w-md">Kami tidak bisa memuat bagian ini. Coba muat ulang, atau kembali ke ruang utama.</p>
    <div className="flex flex-wrap gap-3 justify-center">
      <button className={btn} onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4" /> Muat Ulang</button>
      <button className={btnGhost} onClick={() => onNavigate?.('/001')}>Kembali ke Home</button>
    </div>
  </div>
);

/** 098 — Success State (dipakai juga OOS 032 "Notify Me") */
export const SystemSuccessScreen: React.FC<{ message?: string; onNavigate?: (path: string) => void }> = ({ message, onNavigate }) => (
  <div className={shell}>
    <span className={tag}><Check className="w-3.5 h-3.5" /> System State — 098</span>
    <div className="w-16 h-16 rounded-full bg-[#3D6852]/10 border border-[#3D6852]/30 flex items-center justify-center mb-6">
      <Check className="w-8 h-8 text-[#3D6852]" />
    </div>
    <h1 className="text-2xl font-semibold text-[#433139] mb-2">Berhasil</h1>
    <p className="text-sm text-[#4d4448] mb-8 max-w-md">{message ?? 'Permintaanmu sudah tercatat. Kami akan mengabari saat ada kabar.'}</p>
    <button className={btnGhost} onClick={() => onNavigate?.('/001')}><Home className="w-4 h-4" /> Kembali ke Home</button>
  </div>
);

/** 099 — Locked & Gated (protected tanpa login → merujuk 065) */
export const SystemLockedScreen: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => (
  <div className={shell}>
    <span className={tag}><Lock className="w-3.5 h-3.5" /> System State — 099</span>
    <div className="w-16 h-16 rounded-full bg-[#F2E9E5] border border-[#BDA494] flex items-center justify-center mb-6">
      <Lock className="w-8 h-8 text-[#5B4750]" />
    </div>
    <h1 className="text-2xl font-semibold text-[#433139] mb-2">Ruang Ini Terkunci</h1>
    <p className="text-sm text-[#4d4448] mb-8 max-w-md">Konten ini hanya untuk anggota yang sudah masuk. Masuk untuk melanjutkan.</p>
    <button className={btn} onClick={() => onNavigate?.('/065')}>Masuk / Daftar</button>
  </div>
);

/** 100 — Consent States Library (konten verbatim html/100: accept/granular/withdraw/reject-honored) */
export const SystemConsentLibraryScreen: React.FC = () => {
  const [analytics, setAnalytics] = useState(false);
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-28 pb-24">
      <span className={tag}><ShieldCheck className="w-3.5 h-3.5" /> System State Library — 100</span>
      <h1 className="text-3xl font-semibold text-[#433139] font-serif mb-3">Consent States</h1>
      <p className="text-base text-[#4d4448] max-w-xl mb-10">A restorative approach to user consent. Transparency and fairness prioritized over commercial urgency. No dark patterns, honest and unhurried UI.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. ACCEPT (Banner) */}
        <div className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7f7478] mb-4">1. Accept (Banner)</p>
          <div className="bg-[#FAF3EE] p-4 rounded-lg border border-[#d0c3c7]/30 flex flex-col gap-3">
            <p className="text-sm text-[#433139]">Kami menggunakan cookie esensial &amp; analitik anonim untuk meningkatkan pengalaman Anda.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="flex-1 min-h-[48px] border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-semibold rounded hover:bg-[#F2E9E5] transition-colors">Tolak Non-Esensial</button>
              <button className="flex-1 min-h-[48px] border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-semibold rounded hover:bg-[#F2E9E5] transition-colors">Terima Semua</button>
            </div>
          </div>
        </div>
        {/* 2. GRANULAR (Modal) */}
        <div className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7f7478] mb-4">2. Granular (Modal)</p>
          <h3 className="text-lg font-semibold text-[#433139] mb-3">Preferensi Cookie</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center border-b border-[#d0c3c7]/30 pb-3">
              <span className="text-[#4d4448]">Cookie Esensial (Wajib)</span>
              <span className="w-10 h-5 bg-[#d0c3c7] rounded-full relative opacity-50" aria-label="Wajib" />
            </div>
            <div className="flex justify-between items-center border-b border-[#d0c3c7]/30 pb-3">
              <span className="text-[#4d4448]">Cookie Analitik</span>
              <button
                aria-label="Cookie Analitik"
                onClick={() => setAnalytics(!analytics)}
                className={`w-10 h-5 rounded-full relative transition-colors ${analytics ? 'bg-[#5B4750]' : 'bg-[#d0c3c7]'}`}
              >
                <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${analytics ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="flex justify-between items-center border-b border-[#d0c3c7]/30 pb-3">
              <span className="text-[#4d4448]">Pemasaran &amp; Promosi</span>
              <span className="w-10 h-5 bg-[#d0c3c7] rounded-full relative" aria-label="Opt-in" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4d4448]">Personalisasi</span>
              <span className="w-10 h-5 bg-[#d0c3c7] rounded-full relative" aria-label="Opt-in" />
            </div>
            <button className="mt-2 w-full min-h-[48px] bg-[#433139] text-[#FAF3EE] text-xs font-semibold rounded hover:opacity-90 transition-opacity">Simpan Pilihan</button>
          </div>
        </div>
        {/* 3. WITHDRAW (Panel) */}
        <div className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7f7478] mb-4">3. Withdraw (Panel)</p>
          <div className="bg-[#F7F1EE] p-6 rounded-lg border border-[#d0c3c7]/30 text-center flex flex-col items-center justify-center min-h-[200px] gap-3">
            <ShieldCheck className="w-8 h-8 text-[#433139]" />
            <h4 className="text-base font-semibold text-[#433139]">Privasi Anda</h4>
            <p className="text-sm text-[#4d4448]">Cabut persetujuan kapan saja.</p>
            <button className="min-h-[48px] px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-semibold rounded hover:bg-[#F2E9E5] transition-colors w-full">Cabut Persetujuan Pemasaran</button>
          </div>
        </div>
        {/* 4. REJECT-HONORED */}
        <div className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7f7478] mb-4">4. Reject-Honored</p>
          <div className="mt-auto w-full py-4 px-6 bg-[#F7F1EE] rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center gap-2 text-[#433139]">
              <Cookie className="w-4 h-4 opacity-70" />
              <span className="text-xs font-semibold">Pilihanmu dihormati - hanya cookie esensial aktif</span>
            </div>
            <button className="text-[#433139] underline text-xs font-semibold hover:opacity-70">Ubah Pilihan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** 101 — Modal, Drawer & Bottom Sheet demo */
export const SystemModalDemoScreen: React.FC = () => {
  const [open, setOpen] = useState<'modal' | 'bottom' | null>(null);
  return (
    <div className={shell}>
      <span className={tag}><Layers className="w-3.5 h-3.5" /> System State — 101</span>
      <h1 className="text-2xl font-semibold text-[#433139] mb-2">Pola Overlay</h1>
      <p className="text-sm text-[#4d4448] mb-8 max-w-md">Tiga pola overlay standar Faisha: modal terpusat, drawer samping, bottom sheet mobile.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className={btn} onClick={() => setOpen('modal')}>Buka Modal</button>
        <button className={btnGhost} onClick={() => setOpen('bottom')}>Buka Bottom Sheet</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#291714]/40 backdrop-blur-sm animate-fadeIn" onClick={() => setOpen(null)}>
          <div
            className={open === 'modal'
              ? 'w-full max-w-md bg-[#FAF3EE] rounded-t-3xl md:rounded-3xl p-8 border border-[#BDA494]'
              : 'w-full max-w-md bg-[#FAF3EE] rounded-t-3xl p-8 pb-10 border-t border-[#BDA494]'}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5B4750] mb-2">
              {open === 'modal' ? 'Centered Modal' : 'Bottom Sheet'}
            </p>
            <h2 className="text-lg font-semibold text-[#433139] mb-2">Overlay {open === 'modal' ? 'Modal' : 'Bottom Sheet'}</h2>
            <p className="text-sm text-[#4d4448] mb-6">Pola overlay menutup interaksi di belakangnya, bisa ditutup dengan klik luar.</p>
            <button className={`${btn} w-full`} onClick={() => setOpen(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

/** 102 — 404 & Route Recovery (juga catch-all) */
export const SystemNotFoundScreen: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => (
  <div className={shell}>
    <span className={tag}>System State — 102</span>
    <p className="text-[64px] leading-none font-semibold text-[#BDA494] mb-4">404</p>
    <h1 className="text-2xl font-semibold text-[#433139] mb-2">Jalan Ini Belum Ada</h1>
    <p className="text-sm text-[#4d4448] mb-8 max-w-md">Halaman yang kamu cari tidak ditemukan. Kembali ke ruang utama, atau telusuri koleksi.</p>
    <div className="flex flex-wrap gap-3 justify-center">
      <button className={btn} onClick={() => onNavigate?.('/001')}><Home className="w-4 h-4" /> Kembali ke Home</button>
      <button className={btnGhost} onClick={() => onNavigate?.('/019')}><ShoppingBag className="w-4 h-4" /> Lihat Koleksi</button>
    </div>
  </div>
);

/** 103 — Offline & Maintenance */
export const SystemOfflineScreen: React.FC = () => (
  <div className={shell}>
    <span className={tag}><WifiOff className="w-3.5 h-3.5" /> System State — 103</span>
    <div className="w-16 h-16 rounded-full bg-[#F2E9E5] border border-[#BDA494] flex items-center justify-center mb-6">
      <WifiOff className="w-8 h-8 text-[#5B4750]" />
    </div>
    <h1 className="text-2xl font-semibold text-[#433139] mb-2">Kamu Sedang Offline</h1>
    <p className="text-sm text-[#4d4448] mb-8 max-w-md">Koneksi terputus. Periksa jaringanmu lalu coba lagi — data ritualmu aman.</p>
    <button className={btn} onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4" /> Coba Lagi</button>
  </div>
);
