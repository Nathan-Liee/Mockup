import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Sparkles, Lock, Settings, Gem, ArrowRight } from 'lucide-react';

// Fix-12 kanvas 2026-09-03 — FAI-SCR-071 "Wellness Dashboard" (bento 12 kolom).
// 1:1 vs faisha-gallery/html/071: welcome band + A1..A7. Mock-only, tanpa backend.
// CTA lama (5 sub-tab) dibuang: ref 071 = satu layar bento, bukan tab switcher.

interface DashboardLiteScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

const AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaVCjHBqS7VF7rvub35ObnVxQ1HvNJFf5J9XqmSGpmMQebi3gl3e6PseqsrO5a3r8sidwz5wvk8Iech_SdjsC7Jt_BvuRAxvu7rUpUl8tuYnFjHy7eW7ZHd80TcMLOO49i3Drhm3KlryVrY8vhEUjynv-o68LKR8_O9m_1BcH6fJ89AcXykyMgPIZDiwltOuNiGiKfuVr3VVsW97ab6mb7wPX6MMHmqvgrVOQgX0Y7XDgeAb2Zk0jZpcMEwpn8UKPZj0T4It-TgfM';
const CANDLE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzA2Am5nfonkjPiM4I5aIZhsW9S7YeK5MlwGUHVwmURzRdvcwdgtqhxVkObf9IdXTpO7pTAeKhyfbwUMqXRs_EXx81hudzTVcoSVYG620kFtia5WfjSDsXZH10jo-k8_qcWv8BTywA3jtyEaAH7nOYcPp8UyxCVu1avK9brqnKusqLcL_9xVoJ8zODt106vilyt9qGOyCtAcd2omb93Vfc1hPJdMIrq77SbV0zBVOGU9thizZQ2_FFiDqHhIX4zYibG_dN5sd8-PQ';

// 071 — Crystal Trinity (verbatim warna + urutan ref)
const TRINITY = [
  { name: 'Rose', bg: '#fce4ec', border: '#f8bbd0', text: '#d81b60' },
  { name: 'Citrine', bg: '#fff8e1', border: '#ffecb3', text: '#f57f17' },
  { name: 'Amethyst', bg: '#f3e5f5', border: '#e1bee7', text: '#8e24aa' },
];

const CARD = 'bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)]';

export const DashboardLiteScreen: React.FC<DashboardLiteScreenProps> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const go = (tab: NavTab) => () => {
    soundEngine.playSoftClick();
    onNavigate?.(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const mockToast = (msg: string) => {
    soundEngine.playSoftClick();
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-10 py-10">
      {/* ===== Page heading — 1:1 html/071 side-nav (h1 "Wellness Dashboard" + subtitle "Restorative Rituals") ===== */}
      <div className="mb-8">
        <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Wellness Dashboard</h1>
        <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#7f7478] mt-1">Restorative Rituals</p>
      </div>

      {/* ===== Welcome band ===== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-[#BDA494] shrink-0">
            <img alt="Nadia" className="w-full h-full object-cover" src={AVATAR} />
          </div>
          <div>
            <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">
              Selamat pagi, Nadia
            </h2>
            <p className="font-serif italic text-lg text-[#4d4448] mt-1">
              Mari meluangkan waktu sejenak untuk dirimu hari ini.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448]">Senin, 12 Agustus</span>
      </div>

      {/* ===== Bento grid (md:12) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* A1 — Hasil Assessment (col-8) */}
        <section className={`md:col-span-8 p-8 relative overflow-hidden ${CARD}`}>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#F2E9E5]" aria-hidden />
          <span className="relative inline-block bg-[#F2E9E5] text-[#433139] text-[11px] font-bold uppercase tracking-[0.06em] px-3 py-1 rounded-full mb-4">
            Archetype
          </span>
          <h2 className="relative font-serif text-[32px] leading-tight font-semibold text-[#433139] mb-2">THE NURTURER</h2>
          <p className="relative text-base leading-[24px] text-[#4d4448] max-w-md mb-6">
            Karaktermu mencerminkan kedamaian dan empati yang mendalam. Temukan ritual yang mendukung esensimu.
          </p>
          <button
            onClick={go('assessment-result')}
            className="relative text-xs font-bold uppercase tracking-[0.06em] text-[#433139] border-b border-[#BDA494] pb-0.5 hover:opacity-80 transition-opacity"
          >
            Lihat hasil lengkap →
          </button>
        </section>

        {/* A5 — Ritual Hari Ini (col-4) */}
        <section className="md:col-span-4 p-6 flex flex-col bg-[#F2E9E5]/30 rounded-xl border border-[#BDA494]/40">
          <div className="flex items-center gap-2 text-[#433139] mb-3">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-base font-semibold">Ritual Hari Ini</h2>
          </div>
          <p className="text-[22px] leading-[28px] font-semibold text-[#433139]">Ritual Malam 15 Menit</p>
          <p className="text-sm text-[#4d4448] mb-3">Hari 4/7</p>
          <div className="w-full h-2 bg-[#F2E9E5] rounded-full overflow-hidden mb-5" role="progressbar" aria-valuenow={57} aria-valuemin={0} aria-valuemax={100} aria-label="Progres ritual 57%">
            <div className="h-full bg-[#5B4750] rounded-full" style={{ width: '57%' }} />
          </div>
          <button
            onClick={go('rituals')}
            className="mt-auto w-full h-12 bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all"
          >
            Mulai
          </button>
        </section>

        {/* A2 — Rekomendasi Untukmu (col-4) */}
        <section className={`md:col-span-4 p-6 ${CARD}`}>
          <h2 className="text-base font-semibold text-[#433139] mb-4">Rekomendasi Untukmu</h2>
          <div className="w-full h-48 rounded-lg overflow-hidden bg-[#F2E9E5] mb-3">
            <img alt="Cashmere Embrace Candle" className="w-full h-full object-cover" src={CANDLE_IMG} />
          </div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.06em] text-[#3D6852] bg-[#3D6852]/10 px-2 py-0.5 rounded-full mb-2">
            92% Match
          </span>
          <p className="text-[22px] leading-[28px] font-semibold text-[#291714] mb-4">Cashmere Embrace Candle</p>
          <button
            onClick={go('product')}
            className="w-full h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] active:scale-[0.99] transition-all"
          >
            Lihat
          </button>
        </section>

        {/* A3 — Crystal Trinity (col-5) */}
        <section className={`md:col-span-5 p-8 ${CARD}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#78555d] mb-1">Harmoni Energi</p>
          <h2 className="text-base font-semibold text-[#433139] mb-6">Crystal Trinity</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {TRINITY.map((c, i) => (
              <React.Fragment key={c.name}>
                {i > 0 && <div className="w-8 h-px bg-[#BDA494]" aria-hidden />}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rotate-45 rounded-lg border flex items-center justify-center" style={{ backgroundColor: c.bg, borderColor: c.border }}>
                    <Gem className="w-5 h-5 -rotate-45" style={{ color: c.text }} />
                  </div>
                  <span className="text-xs font-semibold text-[#4d4448] mt-1">{c.name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm leading-[24px] text-[#4d4448] text-center line-clamp-2">
            Trio kristal ini bekerja sinergis untuk membersihkan, menenangkan, dan memperkuat intensi harianmu.
          </p>
        </section>

        {/* A4/A6/A7 — stack col-3 */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <button onClick={go('order-tracking')} className={`p-5 ${CARD} text-left hover:bg-[#F2E9E5] transition-colors`}>
            <h2 className="text-sm font-semibold text-[#433139] mb-1">Status Pesanan</h2>
            <p className="text-sm font-semibold text-[#291714] mb-2">FAI-2026-030841</p>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#3D6852]">
              <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-pulse" /> Dalam Pengiriman
            </span>
          </button>
          <button onClick={go('dashboard-full')} className={`p-5 ${CARD} flex items-center gap-3 text-left hover:bg-[#F2E9E5] transition-colors`}>
            <Settings className="w-5 h-5 text-[#433139] shrink-0" />
            <span className="text-sm font-semibold text-[#433139]">Pengaturan</span>
          </button>
          <div className="rounded-xl p-5 border border-dashed border-[#BDA494] bg-[#F2E9E5]/40 flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#7f7478] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#4d4448]">Beautiful Soul Rewards</p>
              <p className="text-xs text-[#7f7478]">Segera hadir</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Secondary CTA row — flow terhubung ===== */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <button
          onClick={go('assessment-flow')}
          className="flex-1 h-12 bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Mulai Assessment
        </button>
        <button
          onClick={go('journal')}
          className="flex-1 h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          Buka Jurnal <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => mockToast('MOCK — DRAFT: Unduhan riwayat jurnal disiapkan (demo)')}
          className="flex-1 h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] active:scale-[0.99] transition-all"
        >
          Ekspor Data
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
