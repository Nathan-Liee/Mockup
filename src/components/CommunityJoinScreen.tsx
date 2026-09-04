import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, CheckCircle2, BookOpen, Mail } from 'lucide-react';

// 11-defer-mock 2026-09-04 — FAI-SCR-085 "Daftar Community" (intent html/085).
// Eligibility + panduan + form pendaftaran. Submit terkunci sampai 2 checkbox; kirim = CONTROLLED_TBD.
interface Props { onNavigate?: (tab: NavTab) => void; }

const ELIGIBILITY = [
  'Ingin berbagi dengan tulus',
  'Menghargai cerita orang lain',
  'Menjaga privasi anggota',
  'Setuju ruang ini bukan pengganti terapi profesional',
];
const GUIDELINES = [
  'Hormati Perjalanan Masing-masing',
  'Jaga Kerahasiaan Bersama',
  'Hindari Memberi Nasihat Tanpa Diminta',
  'Berkomunikasi dengan Welas Asih',
];
const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlQ8oUnagS2acpGerG97DZjtBiwWBfb-l82F3u7NmJ0PMs_JjDW51YC5UxynUGxj3IInULaJe1xkiB4Dc7ax4lyPLyeh_uCsG7mwCBtB8pb95N1YHkSWLoANEykpMS2lizXjhRPEgg6E7H_Eqiv9Kb87cSxTKtjCaAaFYux7OSODvQddOMrVtAJ-kNcRZAdWrRGHKZ2eYdu5pfbZZecjp_uY4_akNRuwABYhNEYbVhL-dvQJdbLGR6fnT2XdurnNq4RPKUnEHg5jg';

export const CommunityJoinScreen: React.FC<Props> = ({ onNavigate }) => {
  const [guideChecked, setGuideChecked] = useState(false);
  const [peerChecked, setPeerChecked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const go = (tab: NavTab) => () => { soundEngine.playSoftClick(); onNavigate?.(tab); };
  const canSubmit = guideChecked && peerChecked;

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714]">
      <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-28 pb-24 flex flex-col gap-16">
        <button onClick={go('community')} className="self-start flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#5B4750] hover:text-[#433139] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Community
        </button>

        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 order-2 md:order-1 flex flex-col gap-4">
            <h1 className="text-[38px] md:text-[48px] leading-[44px] md:leading-[56px] font-semibold tracking-[-0.02em] text-[#433139] font-serif">
              Bergabung dengan Beautiful Soul Community
            </h1>
            <p className="text-lg text-[#4d4448] max-w-2xl">Ruang aman untuk berbagi perjalanan ritual — tanpa judgment, tanpa performa.</p>
          </div>
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494] aspect-[4/3]">
              <img alt="Beautiful Soul Community Gathering" className="w-full h-full object-cover" src={HERO_IMG} />
            </div>
          </div>
        </section>

        {/* Eligibility & Guidelines */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494] flex flex-col gap-6">
            <h2 className="text-[24px] leading-8 font-semibold text-[#433139] font-serif">Ruang ini untuk kamu yang:</h2>
            <ul className="flex flex-col gap-4">
              {ELIGIBILITY.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3D6852] mt-0.5 shrink-0" />
                  <span className="text-base text-[#291714]">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#ffe9e6] rounded-xl p-8 shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-[#433139]">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-[22px] leading-7 font-semibold">Panduan Komunitas</h3>
              </div>
              <ol className="list-decimal pl-5 text-base text-[#291714] flex flex-col gap-2">
                {GUIDELINES.map((g) => <li key={g}>{g}</li>)}
              </ol>
            </div>
            <button onClick={() => mock('MOCK — panduan lengkap (CONTROLLED_TBD)')} className="text-sm font-semibold text-[#433139] underline hover:opacity-80 transition-opacity self-start">
              Baca Panduan Lengkap
            </button>
          </div>
        </section>

        {/* Form */}
        <section className="max-w-3xl mx-auto w-full bg-white rounded-xl p-8 md:p-12 shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494] flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif">Mulai Langkahmu</h2>
            <p className="text-base text-[#4d4448]">Kami menantikan kehadiranmu di komunitas ini.</p>
          </div>
          <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); mock('MOCK — pendaftaran terkirim (CONTROLLED_TBD: backend)'); }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#291714] uppercase" htmlFor="join-name">Nama panggilan</label>
                <input id="join-name" type="text" defaultValue="Nadia" className="w-full h-12 px-4 bg-white border border-[#BDA494] rounded-lg text-base text-[#291714] focus:border-[#433139] focus:outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#291714] uppercase" htmlFor="join-email">Email</label>
                <input id="join-email" type="email" placeholder="contoh@email.com" className="w-full h-12 px-4 bg-white border border-[#BDA494] rounded-lg text-base text-[#291714] focus:border-[#433139] focus:outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#291714] uppercase" htmlFor="join-story">Ceritakan sedikit tentang perjalananmu</label>
                <textarea id="join-story" rows={4} className="w-full p-4 bg-white border border-[#BDA494] rounded-lg text-base text-[#291714] focus:border-[#433139] focus:outline-none transition-colors resize-none" />
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4 border-t border-[#d0c3c7]/30">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input checked={guideChecked} onChange={(e) => setGuideChecked(e.target.checked)} type="checkbox" className="mt-1 w-5 h-5 rounded accent-[#433139]" />
                <span className="text-base text-[#291714] group-hover:text-[#433139] transition-colors">Saya membaca &amp; menyetujui Panduan Komunitas</span>
              </label>
              <label className="flex items-start gap-4 cursor-pointer group">
                <input checked={peerChecked} onChange={(e) => setPeerChecked(e.target.checked)} type="checkbox" className="mt-1 w-5 h-5 rounded accent-[#433139]" />
                <span className="text-base text-[#291714] group-hover:text-[#433139] transition-colors">Saya memahami ini ruang peer-support, bukan layanan profesional</span>
              </label>
            </div>
            <div className="pt-4">
              <button disabled={!canSubmit} type="submit" className={`w-full h-12 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${canSubmit ? 'bg-[#433139] text-[#FAF3EE] hover:opacity-90' : 'bg-[#fedbd6] text-[#4d4448]/50 cursor-not-allowed border border-[#d0c3c7]/30'}`}>
                Kirim Pendaftaran
              </button>
              <p className="text-center text-[11px] leading-4 tracking-[0.04em] text-[#4d4448] mt-2">Harap setujui persyaratan di atas untuk melanjutkan.</p>
            </div>
          </form>
          {/* Success preview (sesuai source "mental reference") */}
          <div className="mt-4 p-6 bg-[#F2E9E5] border border-[#BDA494] rounded-lg flex items-center gap-4 opacity-70">
            <Mail className="w-6 h-6 text-[#3D6852] shrink-0" />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-[#433139]">Selamat datang</span>
              <span className="text-base text-[#291714]">Cek email untuk langkah berikutnya. (pratinjau state sukses)</span>
            </div>
          </div>
        </section>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold animate-fadeIn">{toast}</div>
      )}
    </div>
  );
};
