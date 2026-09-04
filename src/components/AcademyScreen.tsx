import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { CheckCircle2, BookOpen, Clock, Users, PlayCircle, Sparkles, ArrowRight, Award } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-086 Fanum Academy Landing (intent html/086).
// Enrolled banner → flow ke Modul (academy-module); waitlist → toast MOCK.
interface Props { onNavigate?: (tab: NavTab) => void; }

const MODULES = [
  { n: 1, title: 'Menemukan Ruang Tenang dalam Keseharian', desc: 'Introduksi ritual mikro dan mengapa kita butuh jeda disengaja.', mins: 12, done: true },
  { n: 2, title: 'Pagi sebagai Titik Awal', desc: 'Membangun rutinitas 10 menit sebelum menyentuh ponsel.', mins: 15, done: true },
  { n: 3, title: 'Aroma sebagai Jangkar Emosi', desc: 'Bagaimana scent-memory bisa menenangkan sistem saraf.', mins: 14, current: true },
  { n: 4, title: 'Jurnal sebagai Cermin', desc: 'Teknik menulis refleksi tanpa judgment, 5 menit sehari.', mins: 10 },
  { n: 5, title: 'Merawat Diri Tanpa Rasa Bersalah', desc: 'Melepaskan narasi "tidak produktif" — self-care sebagai kebutuhan.', mins: 16 },
];

export const AcademyScreen: React.FC<Props> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const goModule = () => { soundEngine.playSoftClick(); onNavigate?.('academy-module'); };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714]">
      <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-28 pb-24">
        {/* Enrolled banner */}
        <div className="w-full bg-[#eff6f1] rounded-lg p-4 mb-6 flex items-center gap-3 border border-[#3D6852]/20">
          <CheckCircle2 className="w-5 h-5 text-[#3D6852] shrink-0" />
          <p className="text-base text-[#3D6852]">Kamu terdaftar — progres 40% · lanjutkan Modul 2</p>
          <button onClick={goModule} className="ml-auto text-sm text-[#3D6852] font-semibold hover:underline">Lanjutkan</button>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16 pt-8">
          <div className="md:col-span-7 flex flex-col gap-6">
            <span className="text-[11px] leading-4 tracking-[0.1em] font-bold uppercase text-[#78555d]">Fanum Academy</span>
            <h1 className="text-[44px] md:text-[57px] leading-[52px] md:leading-[64px] font-normal text-[#433139] font-serif tracking-[-0.02em]">
              Kursus Gratis: <span className="italic font-light">Fondasi Ritual Harian</span>
            </h1>
            <p className="text-lg text-[#4d4448] max-w-[500px]">5 modul video singkat untuk membangun kebiasaan perawatan diri yang lembut — tanpa pemaksaan, tanpa wake-up call 04:30.</p>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#5B4750]" /><span className="text-sm text-[#4d4448]">5 modul</span></div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#5B4750]" /><span className="text-sm text-[#4d4448]">Total ± 75 menit</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-[#5B4750]" /><span className="text-sm text-[#4d4448]">842 peserta</span></div>
            </div>
            <div className="pt-2 flex gap-3">
              <button onClick={goModule} className="px-6 py-3 bg-[#433139] text-[#FAF3EE] text-sm font-medium uppercase tracking-[0.06em] rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Mulai Belajar
              </button>
              <button onClick={() => mock('MOCK — semua modul terbuka tanpa syarat pembayaran')} className="px-6 py-3 border border-[#BDA494] text-[#433139] text-sm font-medium uppercase tracking-[0.06em] rounded-lg">Lihat Semua Modul</button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[1.5] rounded-2xl overflow-hidden bg-[#F2E9E5] shadow-[0_4px_24px_rgba(91,71,80,0.08)]">
              <img alt="Bathtub with rose petals and charging crystals" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UvDSyz8jrYfBNJleX78p5N6gzBSdkm2v9C0dJejzyUn8vf74uiNDZx5LnCHvwKDVrpKOfP7GXFTOyTh0PPXMlyTWsSbVz7BDw14bOi67YUjAQA5aeQ2QCYLzjVP_vZNkcIFaRIGhBAGrF7GaEndqkLFs1hVPfSobA4iU3wxIFzc5nDvUWQid3ehqLLRbDHh59evoKkMC-g6OA1cPBddSwHKIufz8scs1EuYgy4c05f7DR63CI3e7Lwdu08Zq1LrQwm0d_G0OUYboI" />
            </div>
          </div>
        </div>

        {/* Waitlist banner */}
        <div className="w-full bg-[#fff8f6] rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-start md:items-center gap-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(120,85,93,0.05)]">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#78555d]" />
              <span className="text-[11px] leading-4 tracking-[0.1em] font-bold uppercase text-[#78555d]">Coming Soon</span>
            </div>
            <h2 className="text-[32px] leading-[40px] font-semibold text-[#433139] font-serif">Inner Peace Series: Kursus Lanjutan</h2>
            <p className="text-base text-[#4d4448] max-w-[520px]">Kerangka berpikir lebih jernih untuk keputusan hidup sebesar kariermu. Dibuka Kohort April.</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="text-[9px] leading-[13px] text-[#4d4448] uppercase tracking-[0.04em]">218 orang sudah antre</div>
            <button onClick={() => mock('MOCK — waitlist disimpan (CONTROLLED_TBD: backend)')} className="px-6 py-3 bg-[#5B4750] text-white text-sm font-medium uppercase tracking-[0.06em] flex items-center justify-center gap-2 rounded-lg hover:bg-[#433139] transition-colors">
              Daftar Waitlist <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Module list */}
        <section>
          <div className="flex items-end justify-between mb-8 border-b border-[#BDA494]/30 pb-4">
            <h2 className="text-[32px] leading-[40px] font-semibold text-[#433139] font-serif">Module List</h2>
            <span className="text-base text-[#4d4448]">2/5 selesai</span>
          </div>
          <div className="flex flex-col gap-4">
            {MODULES.map((m) => (
              <div key={m.n} className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-6 rounded-xl bg-[#F7F1EE] hover:bg-[#F2E9E5] border border-transparent hover:border-[#d0c3c7]/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#433139] flex items-center justify-center shrink-0 font-serif italic text-[#BDA494] text-lg">0{m.n}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-[#433139]">{m.title}</h3>
                    {m.done && <CheckCircle2 className="w-4 h-4 text-[#3D6852]" />}
                  </div>
                  <p className="text-sm text-[#4d4448]">{m.desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-auto pl-12 md:pl-0 text-[#4d4448]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm whitespace-nowrap">{m.mins} mnt</span>
                </div>
                {m.done ? (
                  <button onClick={() => mock(`MOCK — putar ulang Modul ${m.n}`)} className="text-sm font-semibold text-[#5B4750] hover:underline shrink-0">Putar ulang</button>
                ) : m.current ? (
                  <button onClick={goModule} className="px-4 py-2 bg-[#433139] text-[#FAF3EE] text-[11px] font-bold uppercase tracking-[0.06em] rounded-full shrink-0">Lanjutkan</button>
                ) : (
                  <button onClick={() => mock(`MOCK — Modul ${m.n} terbuka setelah modul sebelumnya`)} className="px-4 py-2 border border-[#BDA494] text-[#433139] text-[11px] font-bold uppercase tracking-[0.06em] rounded-full shrink-0">Mulai</button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Instructor */}
        <section className="mt-16 bg-[#F2E9E5] rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="text-[11px] leading-4 tracking-[0.1em] font-bold uppercase text-[#78555d] mb-2 block">Pengajarmu</span>
              <h3 className="text-[32px] leading-[40px] font-semibold text-[#433139] font-serif mb-4">Davina, Founder & Wellness Advocate</h3>
              <p className="text-base text-[#4d4448] mb-4">Praktisi mindfulness bersertifikat dengan 8 tahun pengalaman mendampingi perempuan menemukan kembali lembutnya diri.</p>
              <p className="text-sm text-[#4d4448] italic border-l-2 border-[#BDA494] pl-4">"Ritual terbaik adalah yang kamu lakukan dengan senang hati, bukan yang kamu paksa."</p>
            </div>
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-[#BDA494] shadow-[0_8px_24px_rgba(91,71,80,0.12)]">
                <img alt="Davina" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XSRqWl7c36qGXXFkdvmu1XmWVqG7Ob4as8nmdbdmy5T7UAT-wiMhc1Cf4zP25Zxj3TZO833jdoFdG_7I9NOm-RAGm9rmQRpcbHjrcAYlxvfq1Ec8NtsjI9WGIGiyIpNlhcxdTMuHPBgj_h0R0THvB_csvoNLIkoFHo_HahWmptvyVcLrmm-ucpNHkL5NL-54tRQarRO0ytKREW2f4cEVSvFl3bEHOD1cZfWnRWsGYZNbWbEYPjYkkNXL6KFeYiEioyU8GzFX1gPg" />
              </div>
              <button onClick={() => mock('MOCK — profil fasilitator (CONTROLLED_TBD)')} className="text-sm font-semibold text-[#433139] border-b border-[#BDA494] hover:border-[#433139] transition-colors">Lihat profil →</button>
            </div>
          </div>
        </section>

        {/* Certificate note */}
        <div className="mt-12 bg-[#F7F1EE] rounded-xl p-6 flex items-center gap-4">
          <Award className="w-6 h-6 text-[#BDA494] shrink-0" />
          <p className="text-sm text-[#4d4448]">Sertifikat (e-cert) tersedia setelah menyelesaikan 5/5 modul — mock: <span className="font-medium">Fanum Academy Graduate</span></p>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold animate-fadeIn">{toast}</div>
      )}
    </div>
  );
};
