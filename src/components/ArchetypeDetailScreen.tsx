import React from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { Check, Heart } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-058 "Archetype Detail" (1:1 intent html/058, perfected).
// Sidebar anchor + editorial THE NURTURER. Copy literal dari ref (non-klaim, cermin jawaban).

interface ArchetypeDetailScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7ezZ7P9-BPVv3mgUeD4DJGQw3vKH7efwxyf5p-0QMcH5n7lyVBS2l4hDV4aYCM5mMwHKHpeO_f4w2t3nIeG1clWs_AiKmJEvMjy0F-GonCKaXOH-6NtVldf7z04JJZJbTpTAUk04qQAK4DGW_bI-lgeN2Rvw5hf3_tQH0fqnEIOYucJXbUQxSvK2tV8XNOKocjV9C7mC9Pj9m3NXI37GhSYe9b9xu7zhv0rFKDwt572mofiDfTvHyuTinJJLPRoi4B1gjj14KmU';

const ANCHORS: { id: string; label: string; active?: boolean }[] = [
  { id: 'ringkasan', label: 'Ringkasan' },
  { id: 'archetype', label: 'Archetype', active: true },
  { id: 'scent', label: 'Scent Profile' },
  { id: 'crystal', label: 'Crystal Trinity' },
  { id: 'ritual', label: 'Ritual' },
  { id: 'produk', label: 'Produk' },
  { id: 'mengapa', label: 'Mengapa' },
];

export const ArchetypeDetailScreen: React.FC<ArchetypeDetailScreenProps> = ({ onNavigate }) => {
  const anchorGo: Record<string, NavTab> = {
    ringkasan: 'assessment-result',
    scent: 'assessment-result',
    crystal: 'crystal-trinity',
    ritual: 'my-ritual',
    produk: 'why-recommended',
    mengapa: 'why-recommended',
  };

  return (
    <AccountShell active="my-results" onNavigate={onNavigate}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Anchor nav */}
        <nav className="lg:col-span-2 lg:sticky lg:top-40 self-start hidden lg:block" aria-label="Bagian hasil">
          <ul className="flex flex-col gap-1">
            {ANCHORS.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => {
                    const t = anchorGo[a.id];
                    if (t) onNavigate(t);
                    else document.getElementById(a.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-2 rounded transition-colors ${
                    a.active ? 'text-[#433139] bg-[#F2E9E5] font-extrabold' : 'text-[#7f7478] hover:text-[#433139]'
                  }`}
                >
                  {a.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Konten editorial */}
        <article className="lg:col-span-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B4750] mb-3">Aroma Archetype</p>
          <h1 className="font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em] text-[#5B4750]">THE NURTURER</h1>
          <p className="font-serif italic text-xl text-[#4d4448] mt-2">Jiwa yang Menenangkan</p>

          <div className="mt-8 rounded-xl overflow-hidden border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)] bg-[#F2E9E5]">
            <img alt="Archetype The Nurturer" className="w-full h-72 md:h-96 object-cover" src={HERO_IMG} />
          </div>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-[26px] text-[#4d4448]">
            <p>
              Anda adalah pelabuhan yang tenang dalam badai. Kehadiran Anda memberi orang lain izin untuk bernapas, untuk melambat, dan untuk merasa aman. Dalam dunia yang terus menuntut, Anda memilih untuk merawat — dan itu bukan kelemahan, melainkan kekuatan yang jarang.
            </p>
            <p>
              Ketulusan Anda dalam merawat bukan berasal dari kebiasaan, melainkan dari kepekaan. Anda membaca ruangan sebelum orang lain menyadarinya, dan Anda tahu kapan kehadiran senyap lebih bermakna daripada seribu kata.
            </p>
            <p>
              Ritual Anda bukan pelarian — ia adalah cara Anda mengembalikan energi yang selalu Anda berikan kepada orang lain. Di sanalah keseimbangan Anda tumbuh.
            </p>
          </div>

          <p className="mt-6 text-sm italic text-[#7f7478] max-w-2xl">
            *Ini bukan label atau diagnosis - ini cermin dari jawabanmu.
          </p>

          {/* Kekuatan / Jaga */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)] p-6">
              <h2 className="text-base font-semibold text-[#433139] mb-4">Kekuatanmu</h2>
              <ul className="space-y-3">
                {['Kehadiran yang menenangkan', 'Intuisi emosional', 'Ketulusan merawat'].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-[#4d4448]">
                    <span className="w-5 h-5 rounded-full bg-[#e6f4ea] text-[#3D6852] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
            <section className="bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)] p-6">
              <h2 className="text-base font-semibold text-[#433139] mb-4">Yang Perlu Kamu Jaga</h2>
              <ul className="space-y-3">
                {['Batasan diri', 'Mengisi ulang energi', 'Menerima bantuan'].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-[#4d4448]">
                    <span className="w-5 h-5 rounded-full bg-[#fff8e1] text-[#8A6508] flex items-center justify-center shrink-0 mt-0.5">
                      <Heart className="w-3 h-3" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Metodologi + berdekatan */}
          <section className="mt-8 bg-[#F2E9E5]/50 rounded-xl border border-[#BDA494]/40 p-6 max-w-2xl">
            <h2 className="text-base font-semibold text-[#433139] mb-3">Bagaimana kami membaca ini</h2>
            <p className="text-sm leading-[22px] text-[#4d4448]">
              Archetype ini disusun dari lapisan Emosi, Kebutuhan, dan Visi dalam jawaban assessment-mu — tiga sinyal yang paling konsisten menentukan arah aroma yang menenangkanmu.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-base font-semibold text-[#433139] mb-4">Archetype yang berdekatan</h2>
            <div className="flex gap-3">
              {['The Guardian', 'The Dreamer'].map((a) => (
                <span key={a} className="px-4 py-2 rounded-full bg-[#F2E9E5] text-[#5B4750] text-xs font-bold uppercase tracking-[0.06em] border border-[#BDA494]/40">
                  {a}
                </span>
              ))}
            </div>
          </section>
        </article>
      </div>
    </AccountShell>
  );
};
