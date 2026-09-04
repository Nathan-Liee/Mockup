import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Lock, Flame, PenLine, ChevronRight, Info } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-088 Journal Private Home (intent html/088).
// Streak + today card → journal-editor. Draft banner + 3 entri → editor. Mock-only.
interface Props { onNavigate?: (tab: NavTab) => void; }

const ENTRIES = [
  { date: '10 MAR', day: 'Senin', mood: 'Tenang', moodColor: '#3D6852', text: 'Hari ini aku memberi diriku jeda sore tanpa rasa bersalah. Ternyata 15 menit diam itu cukup...' },
  { date: '09 MAR', day: 'Minggu', mood: 'Lelah', moodColor: '#B8860B', text: 'Badan berat, pikiran penuh. Tapi tidak apa-apa, hari-hari seperti ini juga bagian dari proses...' },
  { date: '08 MAR', day: 'Sabtu', mood: 'Bersyukur', moodColor: '#4A6984', text: 'Kopi hangat, hujan di luar, dan playlist lama. Untuk hal-hal kecil yang sering terlewat...' },
];

export const JournalPrivateScreen: React.FC<Props> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const goEditor = () => { soundEngine.playSoftClick(); onNavigate?.('journal-editor'); };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714]">
      <main className="max-w-[720px] mx-auto px-4 pt-28 pb-24">
        {/* Private notice */}
        <div className="mb-6 p-4 bg-[#F2E9E5] rounded-lg flex items-center gap-3 border border-[#d0c3c7]/30">
          <div className="w-9 h-9 rounded-full bg-[#433139] flex items-center justify-center shrink-0"><Lock className="w-4 h-4 text-[#BDA494]" /></div>
          <p className="text-sm text-[#5B4750]">Jurnal ini <span className="font-semibold">privat</span> — hanya kamu yang bisa membaca. CONTROLLED_TBD: backend.</p>
        </div>

        {/* Header */}
        <header className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif">Jurnal Privat</h1>
            <p className="text-sm text-[#4d4448]">Ruang refleksi harianmu</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#fff8f6] border border-[#BDA494]/50 rounded-full px-4 py-2">
            <Flame className="w-4 h-4 text-[#B8860B]" />
            <span className="text-sm font-bold text-[#B8860B]">7 hari beruntun</span>
          </div>
        </header>

        {/* Week strip */}
        <div className="flex justify-between mb-8 px-2">
          {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-[#4d4448]/60">{d}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i < 5 ? 'bg-[#3D6852] text-white' : 'border border-[#d0c3c7]/50 text-[#4d4448]/50'}`}>{i < 5 ? '✓' : ''}</div>
            </div>
          ))}
        </div>

        {/* Today card */}
        <button onClick={goEditor} className="w-full text-left bg-[#433139] rounded-2xl p-8 mb-8 hover:opacity-95 transition-opacity shadow-[0_8px_32px_rgba(67,49,57,0.2)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#BDA494] mb-2">Rabu, 11 Maret 2026</p>
          <h2 className="text-2xl md:text-[28px] leading-snug font-serif text-[#FAF3EE] mb-4">Hal kecil apa yang ingin kamu syukuri malam ini?</h2>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#BDA494] text-[#291714] text-sm font-semibold rounded-full">
            <PenLine className="w-4 h-4" /> Tulis entri malam ini
          </span>
        </button>

        {/* Draft banner */}
        <div className="mb-8 p-4 bg-[#fff3e0] border border-[#B8860B]/30 rounded-lg flex items-center gap-3">
          <Info className="w-4 h-4 text-[#B8860B] shrink-0" />
          <p className="text-sm text-[#7a5c10] flex-1">Ada draf belum tersimpan dari <span className="font-semibold">19:42</span></p>
          <button onClick={goEditor} className="text-sm font-semibold text-[#B8860B] hover:underline">Lanjutkan</button>
        </div>

        {/* Entries */}
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-[#78555d] mb-4">Entri Terakhir</h2>
        <div className="flex flex-col gap-3">
          {ENTRIES.map((e) => (
            <button key={e.date} onClick={goEditor} className="w-full text-left bg-white rounded-xl p-5 border border-[#BDA494]/60 shadow-[0_4px_20px_rgba(91,71,80,0.04)] hover:border-[#BDA494] transition-colors flex gap-4 items-start">
              <div className="text-center shrink-0 w-12">
                <p className="text-lg font-bold text-[#433139] leading-tight">{e.date.split(' ')[0]}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#4d4448]/60">{e.date.split(' ')[1]}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: `${e.moodColor}20`, color: e.moodColor }}>{e.mood}</span>
                  <span className="text-[10px] text-[#4d4448]/60">{e.day}</span>
                </div>
                <p className="text-sm text-[#291714] truncate">{e.text}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#BDA494] shrink-0 self-center" />
            </button>
          ))}
        </div>

        <button onClick={() => mock('MOCK — arsip semua entri (CONTROLLED_TBD: backend)')} className="mt-6 w-full text-center text-sm font-semibold text-[#5B4750] hover:underline">Lihat semua entri →</button>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold animate-fadeIn">{toast}</div>
      )}
    </div>
  );
};
