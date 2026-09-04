import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, CheckCircle2, Play, FileText, Download, Award, Info, Circle, Clock } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-087 Fanum Academy Modul (intent html/087).
// Brand ELYSIA legacy dari html ini ditranslasikan ke ITS FAISHA. Mock-only.
interface Props { onNavigate?: (tab: NavTab) => void; }

const BAR = [
  { id: 1, done: true, label: 'Menemukan Ruang Tenang', sub: '12 menit · Selesai' },
  { id: 2, done: true, label: 'Pagi sebagai Titik Awal', sub: '15 menit · Selesai' },
  { id: 3, label: 'Aroma sebagai Jangkar Emosi', current: true, sub: '14 menit · Sedang berjalan' },
  { id: 4, label: 'Jurnal sebagai Cermin', sub: '10 menit' },
  { id: 5, label: 'Merawat Diri Tanpa Rasa Bersalah', sub: '16 menit' },
];

export const AcademyModuleScreen: React.FC<Props> = ({ onNavigate }) => {
  const [saved, setSaved] = useState(false);
  const [refleksi, setRefleksi] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const goAcademy = () => { soundEngine.playSoftClick(); onNavigate?.('academy'); };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714]">
      <main className="max-w-[1400px] mx-auto px-4 md:px-10 pt-28 pb-24 flex flex-col gap-6">
        {/* FUTURE/REFERENCE banner — 087 di luar scope R1 (review-103.csv row 89) */}
        <div className="w-full bg-[#F2E9E5] rounded-lg p-4 flex items-center justify-center gap-2 border border-[#d0c3c7]/30">
          <span className="text-[11px] leading-4 tracking-[0.04em] text-[#5B4750]">
            Future/Preview — bukan scope R1. Detail modul ini gambaran desain referensi.
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <button onClick={goAcademy} className="text-sm font-semibold text-[#5B4750] hover:underline self-start flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Kembali ke Kurikulum</button>
            <h1 className="text-[32px] md:text-[44px] leading-[40px] md:leading-[52px] font-normal text-[#433139] font-serif">Modul 3: Aroma sebagai Jangkar Emosi</h1>
            <div className="flex items-center gap-3 text-base text-[#4d4448]">
              <span className="bg-[#F2E9E5] px-3 py-1 rounded-full">Modul 3 dari 5</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12:45</span>
            </div>
          </div>

          {/* Video player */}
          <section className="bg-[#433139] rounded-2xl overflow-hidden relative aspect-video flex items-center justify-center group shadow-lg">
            <div className="text-center flex flex-col items-center gap-4 z-10">
              <button onClick={() => mock('MOCK — video diputar (player statis)')} className="w-20 h-20 rounded-full bg-[#FAF3EE]/90 flex items-center justify-center hover:scale-105 transition-transform shadow-xl">
                <Play className="w-8 h-8 text-[#433139] fill-current ml-1" />
              </button>
              <p className="text-[#BDA494] font-serif italic text-lg">Menemukan ketenangan lewat indra penciuman</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between text-[#BDA494] text-[11px] font-bold tracking-[0.1em]">
              <span>ITS FAISHA ACADEMY — MODUL 3</span>
              <span>12:45</span>
            </div>
          </section>

          {/* Resource */}
          <section>
            <div className="bg-white rounded-xl p-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F2E9E5] flex items-center justify-center text-[#433139]"><FileText className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-sans font-semibold text-lg text-[#433139]">Worksheet: Peta Aroma Emosi</h3>
                  <p className="text-base text-[#4d4448]">PDF · 2 halaman · panduan praktik modul ini</p>
                </div>
              </div>
              <button onClick={() => mock('MOCK — worksheet diunduh (file statis)')} className="flex items-center gap-2 px-5 py-2.5 bg-[#433139] text-[#FAF3EE] text-sm rounded-full hover:bg-[#5B4750] transition-colors">
                <Download className="w-4 h-4" /> Unduh PDF
              </button>
            </div>
          </section>

          {/* Transcript */}
          <section className="bg-[#F2E9E5]/50 rounded-xl p-6 border border-[#d0c3c7]/30">
            <h3 className="font-sans font-semibold text-lg text-[#433139] mb-3">Transkrip Singkat</h3>
            <div className="text-base text-[#4d4448] space-y-3">
              <p>"Aroma adalah jalur tercepat menuju sistem limbik. Tidak heran jika wangi tertentu langsung membawamu pada memori tertentu — baik yang menenangkan maupun yang mengganggu."</p>
              <p>"Dalam modul ini, kita akan belajar memilih satu aroma sebagai sinyal bagi tubuh bahwa saatnya menurunkan tempo. Ini bukan tentang parfum mahal — ini tentang konsistensi neural."</p>
            </div>
          </section>

          {/* Refleksi */}
          <section className="bg-gradient-to-br from-[#F7F1EE] to-[#F2E9E5] rounded-2xl p-8 border border-[#d0c3c7]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-2xl text-[#433139]">Ruang Refleksi</h3>
              {saved && <span className="text-[9px] leading-[13px] uppercase tracking-[0.1em] font-bold text-[#3D6852] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan</span>}
            </div>
            <p className="text-sm text-[#4d4448] mb-4">Aroma apa yang membuatmu merasa paling aman? Apa memori yang melekat padanya?</p>
            <textarea
              value={refleksi}
              onChange={(e) => setRefleksi(e.target.value)}
              rows={6}
              placeholder="Tuliskan refleksimu di sini... bebas, tanpa judgment..."
              className="w-full bg-[#FAF3EE]/90 border border-[#BDA494]/50 rounded-lg p-4 text-base text-[#291714] placeholder-[#4d4448]/50 focus:outline-none focus:ring-2 focus:ring-[#BDA494] resize-none"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[9px] leading-[13px] text-[#4d4448]/60 flex items-center gap-1"><Info className="w-3 h-3" /> Hanya kamu yang bisa melihat ini</p>
              <div className="flex gap-3">
                <button onClick={() => { setSaved(true); mock('MOCK — refleksi disimpan sebagai draf'); }} className="px-6 py-2.5 border border-[#BDA494] text-[#433139] text-sm font-medium rounded-full hover:bg-[#FAF3EE] transition-colors">Simpan Refleksi</button>
                <button onClick={() => { setSaved(true); mock('MOCK — Modul 3 ditandai selesai (+10 Soul Petals)'); setTimeout(goAcademy, 900); }} className="px-6 py-2.5 bg-[#3D6852] text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Tandai Selesai &amp; Lanjut
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <h3 className="font-sans font-semibold text-lg text-[#433139] mb-4">Progres Kursus</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] leading-[13px] uppercase tracking-[0.1em] font-bold text-[#5B4750]">2/5 Selesai</span>
                <span className="text-sm text-[#4d4448]">40%</span>
              </div>
              <div className="w-full bg-[#F2E9E5] rounded-full h-2 mb-6"><div className="bg-[#3D6852] h-2 rounded-full w-2/5" /></div>
              <div className="flex flex-col gap-2">
                {BAR.map((m) => (
                  <div key={m.id} className={`p-3 rounded-lg border text-sm flex items-center gap-3 ${m.current ? 'bg-[#F2E9E5] border-[#433139] font-semibold text-[#433139]' : m.done ? 'bg-[#F2E9E5]/30 border-[#d0c3c7]/30 text-[#4d4448]' : 'border-transparent text-[#4d4448]/70'}`}>
                    {m.done ? <CheckCircle2 className="w-5 h-5 text-[#3D6852] shrink-0" /> : m.current ? <Circle className="w-5 h-5 text-[#433139] fill-current shrink-0" /> : <Circle className="w-5 h-5 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${m.done ? 'text-[#3D6852]' : ''}`}>{m.id}. {m.label}</p>
                      <p className="text-[9px] leading-[13px] text-[#4d4448]">{m.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[9px] leading-[13px] text-[#4d4448]/60 mt-4 pt-4 border-t border-[#d0c3c7]/30">Rekap Modul 1-5 tersedia setelah kamu menyelesaikan semua.</p>
            </div>
            <div className="bg-[#433139] rounded-xl p-6 text-[#BDA494]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#3D6852]/20 flex items-center justify-center"><Award className="w-5 h-5" /></div>
                <h4 className="font-sans font-semibold text-base">Selesai = +10 Soul Petals</h4>
              </div>
              <p className="text-sm opacity-80">Petals bisa ditukar hadiah mini di menu Soul Petals / Loyalty.</p>
            </div>
          </div>
        </div>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold animate-fadeIn">{toast}</div>
      )}
    </div>
  );
};
