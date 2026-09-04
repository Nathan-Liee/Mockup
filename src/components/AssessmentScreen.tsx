import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { CheckCircle2, Cloud, ArrowRight } from 'lucide-react';

// STRICTLY MOCKUP (SEQ 046 + 053): static quiz UI — no answer persistence, no scoring.
// mode 'welcome' = 046 Resume; mode 'question' = 053 Pertanyaan (Q7 Visi).
interface AssessmentScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

// Verbatim html/053 — Q07 Visi, grid 2x2, opsi 1 default checked.
const OPTIONS = [
  { value: 'A', text: 'Lebih tenang dan tidak mudah goyah' },
  { value: 'B', text: 'Lebih berani mengambil ruang' },
  { value: 'C', text: 'Lebih konsisten dengan rutinitas kecil' },
  { value: 'D', text: 'Lebih terhubung dengan orang-orang tersayang' },
];

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ onNavigate }) => {
  const [mode, setMode] = useState<'welcome' | 'question'>('welcome');
  const [answer, setAnswer] = useState('A');
  const go = (fn: () => void) => () => { soundEngine.playSoftClick(); fn(); };

  return (
    <div className="animate-fadeIn min-h-[70vh] flex flex-col items-center">
      {/* Global progress bar (046: 57%) */}
      <div className="w-full h-1 bg-[#fedbd6] fixed top-0 left-0 z-40">
        <div className="h-full bg-[#433139]" style={{ width: mode === 'welcome' ? '57%' : '100%' }} />
      </div>

      <main className="flex-grow w-full max-w-[720px] px-4 md:px-10 py-14 md:py-24 flex flex-col items-center justify-center gap-8">
        {mode === 'welcome' ? (
          <>
            {/* ============ 046 — WELCOME / RESUME ============ */}
            <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-8 md:p-12 flex flex-col items-center text-center gap-6">
              <div className="w-32 h-32">
                <img alt="Illustration of a restorative ritual" className="w-full h-full object-contain opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEBR7BvebjKcWZ7ZzHVMoQJahgGx9ESZnxVK5Ubu7HHaQbSsVtfAhkVpDA7Wc7k0XcWEIZ8AlhMbjW9oCKdthzO7OFXocC6BQJi-9uUdCroSDVM6N8alKO5hcku1xXA13vYtDC9JqGK_nzK7oTQBbo0_Wz7nQ4x3LuCdHYFks7tWHvcgEezzTaeXmlnf_w9vCWGIe9ynk4mPahkI7DoEpG0ryyobqUGieTC-x2i7vCnCCxZeO9_-2v53pFGmED1oCDJVnay7FnmLQ" />
              </div>
              <div className="space-y-2">
                <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Selamat Datang Kembali</h1>
                <p className="text-lg leading-[28px] text-[#4d4448] max-w-md mx-auto">
                  Kami menemukan assessment yang belum selesai. Jawabanmu sampai Pertanyaan 4 dari 12 masih tersimpan.
                </p>
              </div>
              <div className="w-full max-w-sm bg-[#F2E9E5] rounded-lg p-4 border border-[#d0c3c7]/30 space-y-4">
                <div className="flex items-center justify-between text-[#4d4448] text-[11px] leading-4 tracking-[0.04em] uppercase font-medium">
                  <span>Terakhir dijawab: 2 hari lalu</span>
                  <span className="font-semibold text-[#433139]">Pertanyaan 4 (Energi)</span>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-2 bg-[#fedbd6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#433139] rounded-full" style={{ width: '57%' }} />
                  </div>
                  <div className="text-right text-[11px] leading-4 text-[#4d4448]">4 / 12 Selesai</div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center gap-4 pt-2">
                <button
                  onClick={go(() => setMode('question'))}
                  className="w-full md:w-auto min-w-[280px] bg-[#433139] text-white font-semibold text-base h-[48px] px-6 rounded transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                  Lanjutkan dari Pertanyaan 4
                </button>
                <div className="text-center space-y-1">
                  <button onClick={go(() => setMode('question'))} className="inline-block text-base text-[#78555d] hover:text-[#433139] underline decoration-[#78555d]/30 underline-offset-4 transition-colors">
                    Mulai dari awal
                  </button>
                  <p className="text-[11px] leading-4 text-[#4d4448]">*Menjawab ulang akan mengganti jawaban sebelumnya</p>
                </div>
              </div>
            </article>

            {/* Edge-case states (design-review context, per 046) */}
            <section className="w-full max-w-md space-y-1 opacity-60 hover:opacity-100 transition-opacity">
              <div className="bg-[#F7F1EE] rounded p-2 text-center border border-dashed border-[#d0c3c7]/40">
                <span className="text-xs font-bold tracking-[0.06em] uppercase text-[#7f7478] block mb-1">State: Expired</span>
                <p className="text-[11px] leading-4 text-[#4d4448]">Sesi lama (lebih dari 30 hari) sudah tidak berlaku - mulai baru untuk hasil yang akurat.</p>
              </div>
              <div className="bg-[#F7F1EE] rounded p-2 text-center border border-dashed border-[#d0c3c7]/40">
                <span className="text-xs font-bold tracking-[0.06em] uppercase text-[#7f7478] block mb-1">State: No Session</span>
                <p className="text-[11px] leading-4 text-[#4d4448]">Belum ada assessment tersimpan - mulai dari Pertanyaan 1.</p>
              </div>
            </section>
          </>
        ) : (
          /* ============ 053 — PERTANYAAN Q07, FULL SCREEN sesuai referensi ============ */
          <div className="w-full flex flex-col items-center">
            {/* Header kuis minimal (verbatim 053) */}
            {/* REVIEWER FIX (046/053): logo terlalu besar → turunkan 1 step; CTA header diberi background */}
            <nav className="w-full max-w-[1200px] flex justify-between items-center py-4 px-2">
              <div className="text-xl md:text-2xl leading-tight font-semibold tracking-[-0.02em] text-[#433139] font-serif">ITS FAISHA™</div>
              <button onClick={go(() => setMode('welcome'))} className="text-xs font-bold tracking-[0.06em] uppercase text-[#433139] bg-[#F2E9E5] border border-[#BDA494]/40 rounded-full py-2 px-4 hover:bg-[#fedbd6] transition-colors">
                Keluar tanpa kehilangan jawaban
              </button>
            </nav>

            {/* Progress */}
            <div className="w-full mb-6 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold tracking-[0.06em] uppercase text-[#4d4448]">Lapisan 7 dari 7: Visi</span>
              </div>
              <div className="w-full h-[2px] bg-[#d0c3c7]/30 rounded-full overflow-hidden">
                <div className="h-full bg-[#5B4750]" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Pertanyaan */}
            <div className="flex flex-col items-center text-center mt-2 mb-10">
              <span className="font-serif text-[48px] leading-[56px] font-semibold text-[#5B4750]/20 mb-4 select-none">07</span>
              <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-4">
                Enam bulan dari sekarang, kamu ingin menjadi versi dirimu yang...
              </h1>
              <p className="text-base text-[#4d4448]">Pilih yang paling kamu rindukan</p>
            </div>

            {/* Opsi — grid 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
              {OPTIONS.map((o) => {
                const selected = answer === o.value;
                return (
                  <label
                    key={o.value}
                    className={`relative flex items-center p-6 rounded-xl border cursor-pointer transition-all min-h-[120px] ${
                      selected ? 'border-[#5B4750] bg-[#F2E9E5]' : 'border-[#d0c3c7]/50 bg-white hover:border-[#5B4750]/50 hover:bg-[#fff0ee]'
                    }`}
                  >
                    <input checked={selected} className="sr-only" name="vision" type="radio" value={o.value} onChange={() => setAnswer(o.value)} />
                    <p className={`flex-grow ${selected ? 'text-base font-semibold tracking-[0.01em] text-[#433139]' : 'text-lg leading-[28px] text-[#4d4448]'}`}>{o.text}</p>
                    {selected && <CheckCircle2 className="w-6 h-6 ml-4 shrink-0 text-[#5B4750]" />}
                  </label>
                );
              })}
            </div>

            {/* Footer navigasi (verbatim 053) */}
            <div className="w-full pt-4 border-t border-[#d0c3c7]/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[#3D6852] text-[11px] leading-4 tracking-[0.04em] font-medium opacity-80">
                <Cloud className="w-4 h-4" />
                <span>Tersimpan otomatis</span>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button onClick={go(() => setMode('welcome'))} className="text-xs font-bold tracking-[0.06em] uppercase text-[#433139] hover:text-[#5B4750] py-3 px-6 w-full md:w-auto text-center transition-colors">
                  Kembali
                </button>
                {/* demo nav: Q07 -> Hasil (STRICTLY MOCKUP, no scoring) */}
                <button
                  onClick={go(() => onNavigate?.('assessment-result'))}
                  className="bg-[#5B4750] text-[#FAF3EE] text-xs font-bold tracking-[0.06em] uppercase py-4 px-8 rounded flex items-center justify-center gap-2 hover:bg-[#433139] transition-colors w-full md:w-auto min-h-[48px]"
                >
                  Lihat Hasilku <ArrowRight className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
