import React from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { ChevronRight, Flower2, History, CalendarDays, Lock, ArrowRight } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-073 "Ritual Saya Dashboard" (1:1 intent html/073, perfected).
// Bento: Ritual Hari Ini (img+checklist) kiri 8/12; kanan Tinjauan Mingguan + Riwayat Selesai; bawah Ritual Tersimpan.
// Data mock/statis (hari, langkah, riwayat) = fabrikasi demo; tidak ada price/SKU/claim. Ritual Soul Blend = CONTROLLED_TBD terkunci.

interface MyRitualsScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const CARD = 'bg-white rounded-xl border border-[#BDA494]/35 shadow-[0_4px_20px_rgba(91,71,80,0.04)]';

const RITUAL_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZlrkm8n2qE9T25YjBcOnvkGW9LeUWzQYnY0yF9_oo2Qgm9jr94jfg8DMC7XfoTt4geraBReBo9IGtfnYlqUbhZOaGAWFrbMQmz_GwUVvvJW4kZUqPjcacB6xnjDZqbkZXvRDeZFR7UGRQYlcyHUkay-j2HvqI7ZNr-4rUj_kcBjvQd4Lc75AeOc8qtvO9bcw2-oRIcmUw5_j6vYYliNFb4FF3TahZlZ6qASfn7Q3bALff2Lc427YvHukG7kPau99FCnq9AVH_nNc';

const STEPS: { label: string; state: 'done' | 'current' | 'todo' }[] = [
  { label: 'Redupkan lampu', state: 'done' },
  { label: 'Nyalakan lilin', state: 'done' },
  { label: 'Jurnal 3 baris - 8 mnt', state: 'current' },
  { label: 'Tarik napas dalam', state: 'todo' },
];

const WEEK: { day: string; state: 'done' | 'today' | 'todo' }[] = [
  { day: 'S', state: 'done' },
  { day: 'S', state: 'done' },
  { day: 'R', state: 'done' },
  { day: 'K', state: 'today' },
  { day: 'J', state: 'todo' },
  { day: 'S', state: 'todo' },
  { day: 'M', state: 'todo' },
];

const SAVED: { title: string; tag: string; tab: NavTab; img: string; locked?: boolean }[] = [
  {
    title: 'Ritual Pagi 10 Menit',
    tag: 'Energi & Niat',
    tab: 'ritual-morning',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuPeFwjoQgFgXWrkvXVRrfT9viF4rcBzvyUh4o9WHzB0Lt8H1ZbmQ7dyCiqTN_6r5AoYwKWX9j2XnVFnr_0GXc12tYZCgZJ-9t_fAUBziiLP62QIQ5NwQ_hIsOVZMiN0oSjGpw5z_T8WXZzCjYS56z-zn2XiWdE2ohyxXxtpZyIxgRpS1MO56w5p8JQPV_cF7xgGOxCV-P6xhSEemD7qJU2VGNE0pGMVoxvrXVaC6BandszFpYw5PFFJ_Zm2f9lnsLfZJ1Sb3WFnc',
  },
  {
    title: 'Ritual Fokus Kerja',
    tag: 'Kejelasan Pikiran',
    tab: 'ritual-focus',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsBWJRRmsb1NseA8bz0DQbG5JzrYuvhkWkLQM0fE70YHLTqOK34ZoXR6XVrH4ikcr9fCHEH3hzmW6mfdS84oJIRtSkQVYbQih7kYMPB0CiCzikck1y4Vra4DhIrxEPnlO7B2AZnuqv95URLyaNSgvXTv0J08XKWgKsB_QN6GVimzMDg9zIQFreeSeVP3KKlgMXNQZUZKm-w6F7lJonNVg2GwoxuACzuwQhSso8bBx-ma4Gdg7gO9aZGzmAEss51NgR9iCmkRaaYAY',
  },
  {
    title: 'Ritual Soul Blend',
    tag: 'Segera Hadir',
    tab: 'ritual-soul',
    locked: true,
    img: '',
  },
];

export const MyRitualsScreen: React.FC<MyRitualsScreenProps> = ({ onNavigate }) => {
  const go = (tab: NavTab) => onNavigate(tab);

  return (
    <AccountShell active="my-ritual" onNavigate={go}>
      {/* User Header */}
      <div className="mb-10">
        <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Selamat Datang, Nadia</h2>
        <p className="text-base leading-[24px] text-[#4d4448] max-w-2xl mt-2">
          Lanjutkan perjalanan ketenangan Anda hari ini. Ritual yang konsisten membangun kedamaian batin.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Section 1: TODAY'S RITUAL */}
        <section className={`${CARD} lg:col-span-8 overflow-hidden flex flex-col md:flex-row`}>
          {/* Image Area */}
          <div className="md:w-2/5 relative min-h-[250px] md:min-h-full">
            <img alt="Ritual Malam" className="absolute inset-0 w-full h-full object-cover" src={RITUAL_IMG} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[11px] font-medium uppercase tracking-wider mb-2">Fokus Hari ini</span>
              <h3 className="text-[22px] leading-[28px] font-semibold text-white drop-shadow-sm">Ritual Malam<br />15 Menit</h3>
            </div>
          </div>
          {/* Content Area */}
          <div className="p-6 md:p-8 md:w-3/5 flex flex-col">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#4d4448]">Kemajuan Mingguan</span>
                <span className="text-base font-semibold text-[#433139]">Hari 4 dari 7</span>
              </div>
              <div className="w-full h-[2px] bg-[#fedbd6] rounded-full overflow-hidden">
                <div className="h-full bg-[#433139] w-[57%]" />
              </div>
            </div>
            {/* Step Checklist */}
            <div className="flex-1 mb-8">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#4d4448] mb-4">Langkah Ritual</h4>
              <ul className="space-y-4">
                {STEPS.map((s) => (
                  <li
                    key={s.label}
                    className={`flex items-center gap-3 ${
                      s.state === 'done' ? 'opacity-60' : s.state === 'current' ? 'p-3 -mx-3 bg-[#F2E9E5] rounded-lg border border-[#433139]/20' : ''
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        s.state === 'done'
                          ? 'bg-[#fedbd6] text-[#291714]'
                          : s.state === 'current'
                          ? 'border-2 border-[#433139]'
                          : 'border border-[#d0c3c7]'
                      }`}
                    >
                      {s.state === 'done' && (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {s.state === 'current' && <div className="w-2 h-2 rounded-full bg-[#433139]" />}
                    </div>
                    <span
                      className={`text-base ${
                        s.state === 'done'
                          ? 'line-through text-[#291714]'
                          : s.state === 'current'
                          ? 'font-semibold text-[#433139]'
                          : 'text-[#291714]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => go('ritual-practice')}
                className="w-full min-h-[48px] bg-[#433139] text-[#FAF3EE] rounded-lg text-base font-semibold hover:bg-[#433139]/90 transition-colors flex justify-center items-center gap-2"
              >
                Lanjutkan Ritual
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="text-center text-sm font-semibold text-[#4d4448] hover:text-[#433139] transition-colors underline decoration-1 underline-offset-4">
                Batalkan tanda selesai
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Weekly Overview + History */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Weekly Overview */}
          <section className={`${CARD} p-6`}>
            <h3 className="text-base font-semibold text-[#433139] mb-6 border-b border-[#BDA494]/20 pb-4">Tinjauan Mingguan</h3>
            <div className="flex justify-between items-center">
              {WEEK.map((d) => (
                <div key={d.day + d.state} className="flex flex-col items-center gap-2 relative">
                  <span
                    className={`text-[11px] font-medium ${
                      d.state === 'today' ? 'text-[#433139] font-bold' : d.state === 'todo' ? 'text-[#7f7478]' : 'text-[#4d4448]'
                    }`}
                  >
                    {d.day}
                  </span>
                  {d.state === 'done' && (
                    <div className="w-8 h-8 rounded-full bg-[#433139] text-[#FAF3EE] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  {d.state === 'today' && (
                    <>
                      <div className="w-10 h-10 rounded-full border-2 border-[#433139] bg-[#F2E9E5] flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#433139]" />
                      </div>
                      <span className="absolute -bottom-5 text-[10px] font-bold text-[#433139] uppercase tracking-widest">Hari Ini</span>
                    </>
                  )}
                  {d.state === 'todo' && (
                    <div className="w-8 h-8 rounded-full border border-[#BDA494]/50 bg-[#fff0ee] flex items-center justify-center" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Completed History */}
          <section className={`${CARD} p-6 flex-1`}>
            <div className="flex justify-between items-end mb-6 border-b border-[#BDA494]/20 pb-4">
              <h3 className="text-base font-semibold text-[#433139]">Riwayat Selesai</h3>
              <button className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#4d4448] hover:text-[#433139] transition-colors">Lihat Semua</button>
            </div>
            <ul className="space-y-4">
              {[
                { title: 'Hari 3 selesai', date: '11 Mar • Ritual Malam' },
                { title: 'Hari 2 selesai', date: '10 Mar • Ritual Malam' },
              ].map((h) => (
                <li key={h.title} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F2E9E5] text-[#433139] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#291714]">{h.title}</p>
                      <p className="text-[11px] font-medium text-[#4d4448]">{h.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Section 3: SAVED RITUALS */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-8 border-b border-[#BDA494]/30 pb-4">
          <h3 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139]">Ritual Tersimpan</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-[#BDA494]/50 flex items-center justify-center text-[#4d4448] hover:bg-[#F2E9E5] transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 rounded-full border border-[#BDA494]/50 flex items-center justify-center text-[#4d4448] hover:bg-[#F2E9E5] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAVED.map((r) => (
            <div key={r.title} className={`group ${r.locked ? 'opacity-50' : 'cursor-pointer'} flex flex-col gap-4`}>
              {r.locked ? (
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#fff0ee] border border-dashed border-[#d0c3c7] flex flex-col items-center justify-center">
                  <Flower2 className="w-10 h-10 text-[#BDA494] mb-2" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#4d4448]">Mengunci</span>
                </div>
              ) : (
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#fedbd6]">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={r.title} src={r.img} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-semibold text-[#433139] mb-1">{r.title}</h4>
                  <p className={`text-[11px] font-medium text-[#4d4448] uppercase tracking-wider${r.locked ? ' italic' : ''}`}>{r.tag}</p>
                </div>
                {!r.locked && (
                  <button
                    onClick={() => go(r.tab)}
                    className="px-4 py-2 border-[1.5px] border-[#BDA494] text-[#433139] rounded-lg text-sm font-semibold hover:bg-[#F2E9E5] transition-colors"
                  >
                    Mulai
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Status arsip (muted) */}
      <div className="mt-12 pt-8 border-t border-[#BDA494]/30">
        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#BDA494] mb-5">Status Arsip</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-start p-4 bg-white/70 border border-[#BDA494]/25 rounded opacity-75">
            <Lock className="w-4 h-4 text-[#BDA494] mr-3 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#4d4448]">Ritual Soul Blend Terkunci</p>
              <p className="text-[11px] text-[#7f7478] mt-1">Ritual khusus sedang disiapkan. CONTROLLED_TBD hingga dirilis.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-white/70 border border-[#BDA494]/25 rounded opacity-75">
            <History className="w-4 h-4 text-[#BDA494] mr-3 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#4d4448]">Riwayat Tersimpan</p>
              <p className="text-[11px] text-[#7f7478] mt-1">Riwayat ritual lama tersimpan sebagai arsip.</p>
            </div>
          </div>
        </div>
      </div>
    </AccountShell>
  );
};
