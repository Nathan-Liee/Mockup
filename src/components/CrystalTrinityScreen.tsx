import React, { useState } from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { ChevronDown } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-060 "Crystal Trinity" (1:1 intent html/060, perfected).
// 3 kartu kristal; 1 expand + 2 collapsed (ref); CTA expand = toggle statis (mock).
// Disclaimer simbolis verbatim dari ref — bukan klaim medis.

interface CrystalTrinityScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const IMG_ROSE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDQP-RJtEr7hywnOQlfpt6LbY7Y0DqEZvLO2ZKWKz_CRkENrzenusiCcMBNoMcJ_McVgpTTxyG4STt6HzOjJGrYD3aLsdhmS9vA5YowATaKL-CgijjpkUHz45q8f67LuEXy3qMCi0P2UzuURvwSSFKCketNUE1wd69knuFmRsS7RrQYoxWSe6jskTZfeRmAXpyMeiaLW5Q6Y1118HI6-fDvKLVe-LcP5xfrv64ZQ377XqSXj6Ad5UINtjHBdH2WFcyj-OBBDnhk38';
const IMG_CITRINE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi6I4wcd7rTkPargoo7D9NaIIYmEhFplX-B-nfdYH_0TwxDk0FxSNOLywBcjBJ9iTWIod7dkEyAL88FD245tYX8FO0TuCprpvluCqeA-obmzGYI45hokfR8ZJL0rnmSpxQe-tcPtEJ_Y4yTc3QZo9a8J0pOFEDT5C43Q8UDEy5sc-_dYtMs89FOjeK8Cm0FH-S49jL2Bwzezr3kN3rb1MoCk_axPtmH8t4V27YRig_TW1eVTUIN5GoQk5AR2c_0vv4gckKFeJtuTs';
const IMG_AMETHYST = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYzQcFViNt01Ef5Cr6yCKC5v5elE_351SsBUse_405aN-ZTL1uktcFixdUOycOZLPY1BfeNWvGkfuqXDbu8IPBgHIz9BYiS5-eJ9mopLZ31yOPlLhf61o26Y0AvOQHUYqbq8udV58jhoiHU3PpTyOMhVyS4Zb0CwGEgWc4DD5psX8WdlFKueWatxmO889aN3GsEWnKZcl18OGZHIRgV1GNtoS2zvv1AlnUkGJgbfokkceaPY6Q8ZF_NoU1BZdSnbI4Jwr7J1RqrVA';

const CARD = 'bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)]';

type Crystal = {
  name: string;
  role: string;
  quote: string;
  img: string;
  expandedMeaning: string;
  uses: string[];
};

const CRYSTALS: Crystal[] = [
  {
    name: 'Rose Quartz',
    role: 'Crystal Hati',
    quote: 'Untuk kelembutan pada diri sendiri',
    img: IMG_ROSE,
    expandedMeaning:
      'Rose Quartz adalah simbol kasih yang paling sederhana dan paling sulit: kasih kepada diri sendiri. Ia mengingatkanmu bahwa merawat orang lain dimulai dari kemampuanmu menerima diri apa adanya.',
    uses: ['Letakkan di meja kerja saat butuh fokus lembut', 'Pegang saat journaling pagi', 'Simpan di sisi tempat tidur untuk niat istirahat'],
  },
  {
    name: 'Citrine',
    role: 'Crystal Energi',
    quote: 'Untuk mengembalikan percikan hari',
    img: IMG_CITRINE,
    expandedMeaning:
      'Citrine dibaca sebagai pengingat energi yang tenang — bukan ledakan motivasi, melainkan hangat yang bertahan. Dalam bahasa jawabanmu, ia muncul saat kebutuhan mengisi ulang energi lebih besar daripada kebutuhan beristirahat total.',
    uses: ['Meja kerja: jangkar fokus tanpa tekanan', 'Journaling pagi: awali sebelum menulis niat', 'Sisi tempat tidur: penutup hari yang ringan'],
  },
  {
    name: 'Amethyst',
    role: 'Crystal Ketenangan',
    quote: 'Untuk istirahat dan ruang hening',
    img: IMG_AMETHYST,
    expandedMeaning:
      'Amethyst menutup trinitas ini dengan keheningan. Ia menjadi penanda bahwa pikiranmu butuh ruang tanpa notifikasi, tanpa tuntutan — hanya napas dan kehadiran.',
    uses: ['Matikan notifikasi 10 menit bersamanya', 'Tempatkan di sudut baca / meditasi', 'Gunakan saat ritual malam dimulai'],
  },
];

export const CrystalTrinityScreen: React.FC<CrystalTrinityScreenProps> = ({ onNavigate }) => {
  const [openIdx, setOpenIdx] = useState<number>(1); // ref 060: Citrine (tengah) yang terbuka

  return (
    <AccountShell active="my-results" onNavigate={onNavigate}>
      <header className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B4750] mb-2">Crystal Trinity</p>
        <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Crystal Trinity</h1>
        <p className="text-base leading-[24px] text-[#4d4448] mt-2 max-w-2xl">
          Tiga elemen mineral untuk mendukung keselarasan jiwamu.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CRYSTALS.map((c, idx) => {
          const isOpen = openIdx === idx;
          return (
            <section key={c.name} className={`${CARD} overflow-hidden flex flex-col`}>
              <div className="relative aspect-square bg-[#F2E9E5]">
                <img alt={c.name} className="absolute inset-0 w-full h-full object-cover" src={c.img} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A6508] bg-[#fff8e1] px-2.5 py-1 rounded-full w-fit mb-3">
                  {c.role}
                </span>
                <h2 className="text-lg font-semibold text-[#433139]">{c.name}</h2>
                <p className="font-serif italic text-sm text-[#4d4448] mt-1 mb-4">{c.quote}</p>

                {isOpen ? (
                  <div className="space-y-4">
                    <p className="text-sm leading-[22px] text-[#4d4448]">{c.expandedMeaning}</p>
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#7f7478] mb-2">Cara Menggunakan dalam Ritual</h3>
                      <ul className="space-y-2">
                        {c.uses.map((u) => (
                          <li key={u} className="text-sm text-[#291714] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5B4750] mt-2 shrink-0" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="mt-auto pt-4 flex items-center justify-between w-full text-[12px] font-bold uppercase tracking-[0.08em] text-[#5B4750] hover:text-[#433139] transition-colors"
                >
                  {isOpen ? 'Tutup makna' : 'Buka makna lengkap'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-xs leading-[18px] text-[#7f7478] max-w-2xl bg-[#F2E9E5]/50 border border-[#BDA494]/30 rounded-lg p-4">
        Makna crystal bersifat simbolis dalam praktik ritual &amp; mindfulness - bukan klaim medis atau janji hasil.
      </p>
    </AccountShell>
  );
};
