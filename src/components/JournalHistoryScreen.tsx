import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Flower2, Search, ShoppingCart, ChevronLeft, ChevronRight, Lock, ArrowRight } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-090 "Riwayat & Insight Journal" (intent html/090).
// FUTURE/REFERENCE (review-103.csv row 92): full render + banner, bukan "coming soon".
// Insight = mock statis dari html ref; entri = verbatim. Sidebar dashboard dipadatkan
// (state aktif = Jurnal) — nav global sudah di-render Layout, di sini cukup konten.
interface Props { onNavigate?: (tab: NavTab) => void; }

const MOOD_DAYS = [
  { d: 2, mood: 'tenang' }, { d: 3, mood: 'tenang' }, { d: 4, mood: 'lelah' },
  { d: 5, mood: 'tenang' }, { d: 6, mood: 'damai' }, { d: 7, mood: 'tenang' },
  { d: 8, mood: 'damai' }, { d: 9, mood: 'reflektif' }, { d: 10, mood: 'reflektif' },
  { d: 11, mood: 'tenang' },
];

const MOOD_STYLE: Record<string, { dot: string; label: string; icon: string }> = {
  tenang: { dot: 'bg-[#3D6852]', label: 'Tenang', icon: 'local_florist' },
  damai: { dot: 'bg-[#4A6984]', label: 'Damai', icon: 'spa' },
  reflektif: { dot: 'bg-[#5B4750]', label: 'Reflektif', icon: 'water_drop' },
  lelah: { dot: 'bg-[#B8860B]', label: 'Lelah', icon: 'battery_alert' },
};

const ENTRIES = [
  { date: '10 Maret 2026', mood: 'reflektif', text: 'Hari ini terasa lebih panjang dari biasanya, tapi menyempatkan diri untuk duduk diam di sore hari sangat membantu menjernihkan pikiran...' },
  { date: '8 Maret 2026', mood: 'damai', text: 'Aroma teh chamomile dan suara hujan di luar jendela membuat ritual menulis malam ini terasa begitu sempurna...' },
  { date: '5 Maret 2026', mood: 'tenang', text: 'Memutuskan untuk melepaskan ekspektasi yang terlalu tinggi pada diri sendiri hari ini. Bernapas terasa sedikit lebih ringan.' },
];

const INSIGHTS = [
  { icon: 'all_inclusive', label: 'Konsistensi', value: '10 dari 11 hari' },
  { icon: 'schedule', label: 'Waktu Favorit', value: 'Malam (21:00-22:00)' },
  { icon: 'mood', label: 'Mood Dominan', value: 'Tenang' },
];

export const JournalHistoryScreen: React.FC<Props> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const go = (tab: NavTab) => () => { soundEngine.playSoftClick(); onNavigate?.(tab); };

  return (
    <div className="animate-fadeIn min-h-screen bg-warm-ivory text-on-surface">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-28 pb-24">
        {/* FUTURE/REFERENCE banner — 090 di luar scope R1 */}
        <div className="w-full bg-[#F2E9E5] rounded-lg p-4 mb-8 flex items-center justify-center gap-2 border border-[#d0c3c7]/30">
          <span className="text-[11px] leading-4 tracking-[0.04em] text-[#5B4750]">
            Future/Preview — bukan scope R1. Riwayat & insight ini gambaran desain referensi.
          </span>
        </div>

        {/* Header (identitas + nav ringkas, sesuai html 090) */}
        <header className="flex items-end justify-between mb-8 border-b border-[#d0c3c7]/30 pb-6">
          <div>
            <h1 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif">Riwayat Jurnalmu</h1>
            <p className="text-sm text-[#4d4448]">Menelusuri jejak pikiran dan perasaanmu.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#4d4448]">
            <button aria-label="Cari" onClick={() => mock('MOCK — pencarian jurnal (CONTROLLED_TBD: backend)')} className="p-1 hover:opacity-70"><Search className="w-5 h-5" /></button>
            <button aria-label="Notifikasi" onClick={() => mock('MOCK — notifikasi')} className="p-1 hover:opacity-70"><Flower2 className="w-5 h-5" /></button>
            <button aria-label="Keranjang" onClick={go('shop')} className="p-1 hover:opacity-70"><ShoppingCart className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kolom utama */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Kalender mood */}
            <section className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#433139]">Kalender</h2>
                <div className="flex items-center gap-2 text-[#4d4448]">
                  <button aria-label="Bulan sebelumnya" onClick={() => mock('MOCK — navigasi bulan')} className="p-1 hover:opacity-70"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-sm font-semibold">Maret 2026</span>
                  <button aria-label="Bulan berikutnya" onClick={() => mock('MOCK — navigasi bulan')} className="p-1 hover:opacity-70"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                  <span key={d} className="text-[10px] font-bold uppercase tracking-wider text-[#7f7478] text-center py-1">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((d) => (
                  <div key={`empty-${d}`} className="aspect-square" />
                ))}
                {MOOD_DAYS.map((m) => (
                  <div key={m.d} title={MOOD_STYLE[m.mood].label} className="aspect-square rounded-md bg-[#F7F1EE] flex items-center justify-center text-xs font-semibold text-[#291714] relative">
                    <span>{m.d}</span>
                    <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${MOOD_STYLE[m.mood].dot}`} />
                  </div>
                ))}
                {Array.from({ length: 20 }, (_, i) => 12 + i).map((d) => (
                  <div key={`future-${d}`} className="aspect-square" />
                ))}
              </div>
              {/* Pola suasana */}
              <div className="mt-4 pt-4 border-t border-[#d0c3c7]/30 flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#7f7478]">Pola suasana bulan ini</span>
                <span className="text-sm text-[#433139] font-semibold">Tenang (6 hari)</span>
              </div>
            </section>

            {/* Sekilas Insight */}
            <section className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
              <h2 className="text-lg font-semibold text-[#433139] mb-4">Sekilas Insight</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {INSIGHTS.map((it) => (
                  <div key={it.label} className="bg-[#F7F1EE] rounded-lg p-4 flex flex-col gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#5B4750]">{it.icon}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#7f7478]">{it.label}</span>
                    <span className="text-sm font-semibold text-[#291714]">{it.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Entri Terbaru */}
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-[#433139]">Entri Terbaru</h2>
              {ENTRIES.map((e) => (
                <article key={e.date} className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-[#433139]">{e.date}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-[16px] text-[#5B4750]">{MOOD_STYLE[e.mood].icon}</span>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-[#7f7478]">{MOOD_STYLE[e.mood].label}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => mock('MOCK — buka entri (konten privat, demo)')}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#5B4750] underline underline-offset-4 hover:opacity-70 flex items-center gap-1"
                    >
                      Buka <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm text-[#291714] leading-relaxed">{e.text}</p>
                </article>
              ))}
            </section>
          </div>

          {/* Side rail: privacy note + daftar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#F7F1EE] rounded-xl border border-[#d0c3c7]/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#5B4750]" />
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#7f7478]">Privasi Insight</span>
              </div>
              <p className="text-sm text-[#4d4448] leading-relaxed">
                Insight hanya dari pola waktu &amp; mood yang kamu pilih — isi jurnal tidak pernah dibaca sistem.
              </p>
              <p className="text-[10px] text-[#7f7478]">CONTROLLED_TBD: backend analitik (R27, VOL2-B39)</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d0c3c7]/50 p-6">
              <h3 className="text-sm font-semibold text-[#433139] mb-3">Tampilan</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => mock('MOCK — tampilan kalender')} className="text-left text-sm px-4 py-2.5 rounded-lg bg-[#F2E9E5] font-semibold text-[#433139]">Kalender</button>
                <button onClick={go('journal-private')} className="text-left text-sm px-4 py-2.5 rounded-lg text-[#4d4448] hover:bg-[#F7F1EE]">Daftar</button>
                <button onClick={() => mock('MOCK — tampilan insight')} className="text-left text-sm px-4 py-2.5 rounded-lg text-[#4d4448] hover:bg-[#F7F1EE]">Insight</button>
              </div>
            </div>
          </aside>
        </div>
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
