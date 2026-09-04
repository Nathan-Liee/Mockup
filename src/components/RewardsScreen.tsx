import React from 'react';
import { NavTab } from '../types';
import { Flower2, Users, Key, Lock } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-077 "Beautiful Soul Rewards" (1:1 intent html/077).
// Layout public-marketing (topnav+footer bukan AccountShell) — sesuai kanvas.
// Future-vision: semua CTA aktifkan disabled (program belum disetujui).

interface RewardsScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const HOW = [
  { icon: Flower2, title: 'Kumpulkan Petals', text: 'Dapatkan petals dari setiap dedikasi: rutinitas ritual, entri jurnal harian, dan pembelian produk.', lift: '' },
  { icon: Users, title: 'Tumbuh Bersama', text: 'Tumbuh bersama komunitas kami yang saling mendukung dalam perjalanan penemuan jati diri.', lift: 'md:mt-8' },
  { icon: Key, title: 'Buka Apresiasi', text: 'Tukarkan petals dengan akses awal, produk eksklusif, dan pengalaman sanctuary yang dipersonalisasi.', lift: 'md:mt-16' },
];

const TIERS = ['Seed', 'Bloom', 'Radiance'];

export const RewardsScreen: React.FC<RewardsScreenProps> = ({ onNavigate }) => {
  const go = (tab: NavTab) => onNavigate(tab);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f7]">
      {/* Sticky header: banner + nav */}
      <header className="sticky top-0 w-full z-50 flex flex-col">
        <div className="bg-[#F2E9E5] w-full py-1 px-6 border-b border-[#d0c3c7]/30 flex justify-center items-center">
          <span className="text-[12px] font-bold tracking-widest text-[#433139] text-center uppercase">
            Halaman ini gambaran program yang akan datang — belum tersedia
          </span>
        </div>
        <nav className="bg-[#fff8f7]/85 backdrop-blur-md border-b border-[#d0c3c7]/30">
          <div className="flex justify-between items-center w-full px-6 max-w-[1200px] mx-auto h-20">
            <div className="font-serif text-2xl tracking-tight text-[#433139] cursor-pointer hover:opacity-70 transition-opacity" onClick={() => go('beranda')}>
              ITS FAISHA™
            </div>
            <ul className="hidden md:flex space-x-8 items-center text-[12px] font-bold uppercase tracking-widest">
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('journey')}>The Journey</button></li>
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('rituals')}>Rituals</button></li>
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('shop')}>Shop</button></li>
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('about')}>About</button></li>
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('journal')}>Journal</button></li>
            </ul>
            <div className="flex space-x-4 items-center text-[#433139]">
              <button aria-label="Account" className="hover:opacity-70 transition-opacity p-1" onClick={() => go('dashboard')}>
                <Flower2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow w-full">
        {/* Hero */}
        <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-14 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col gap-6 z-10 md:pr-8">
              <h1 className="text-[38px] md:text-[56px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#433139] font-serif text-balance">
                Beautiful Soul Rewards
              </h1>
              <p className="text-lg leading-7 text-[#4d4448]">
                Program penghargaan untuk setiap langkah kecil perjalanan ritualmu — dengan Soul Petals.
              </p>
            </div>
            <div className="md:col-span-7 w-full h-[50vh] md:h-[70vh] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#d0c3c7]/50">
              <img
                alt=""
                className="w-full h-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-wrjgKMeAbzSwee7F6EwQuhp4ZkvsCD0u5KB-AtMtG4mecXY7IYqaDGH3jKdR8e-ZLv4oIwv9xM9QtF4titNsfXbmvdwqdsLzK-CjrJjV1UvJEgKuLcawueTSlj0QpWpDghRIocKOYBoLgWCdGqq3V3kn3O49SF_jBoHYo-IqwGx7cbA1gm-glLwrL4OA2U-3hPdsip_n46YkxNvNY7nhfqI3ugTsue_MNKPo6gvYIMOL8eV3xXv1OQ8Ujq49n0quGfM_gOObe94"
              />
            </div>
          </div>
        </section>

        {/* Cara Kerjanya */}
        <section className="bg-[#F2E9E5]/30 border-y border-[#d0c3c7]/30 py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-[12px] font-bold tracking-widest text-[#78555d] uppercase mb-2">Filosofi Program</span>
              <h2 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif">Cara Kerjanya (nanti)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className={`bg-white p-12 rounded-xl border border-[#d0c3c7] shadow-[0_4px_20px_rgba(91,71,80,0.02)] flex flex-col items-start gap-4 hover:border-[#433139]/50 transition-colors ${c.lift}`}>
                    <div className="w-12 h-12 rounded-full bg-[#F2E9E5] flex items-center justify-center text-[#433139] mb-2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-[22px] font-semibold text-[#433139]">{c.title}</h3>
                    <p className="text-base text-[#4d4448]">{c.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tier preview locked */}
        <section className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[12px] font-bold tracking-widest text-[#7f7478] uppercase mb-2">Pratinjau Eksklusif</span>
            <h2 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif">Tingkatan Sanctuary</h2>
            <p className="text-base text-[#4d4448] max-w-2xl mt-4">
              Perjalanan diukur bukan dari kecepatan, melainkan kedalaman. Berikut adalah tingkatan perjalanan yang sedang kami persiapkan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((t) => (
              <div key={t} className="bg-[#ffe9e6] border border-[#d0c3c7]/40 rounded-xl p-8 flex flex-col items-center text-center gap-4 opacity-60 grayscale-[30%]">
                <div className="w-16 h-16 rounded-full border border-[#7f7478] flex items-center justify-center text-[#7f7478] bg-[#fedbd6]">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-[22px] font-semibold text-[#4d4448] mt-2">{t}</h4>
                <span className="text-[11px] text-[#7f7478] uppercase tracking-widest bg-[#fedbd6] px-3 py-1 rounded-full">Detail menyusul</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action */}
        <section className="max-w-[1200px] mx-auto px-6 pb-24 flex flex-col items-center text-center">
          <button
            disabled
            className="bg-[#d0c3c7] text-[#4d4448]/70 text-[12px] font-bold uppercase tracking-widest px-12 py-4 rounded cursor-not-allowed border border-[#d0c3c7]/50 min-w-[240px]"
          >
            Aktifkan Rewards
          </button>
          <button
            onClick={() => go('soul-petals')}
            className="mt-6 text-base text-[#78555d] underline decoration-1 underline-offset-4 hover:text-[#433139] transition-colors"
          >
            Saat ini tersedia: pencatatan petals di akunmu
          </button>
          <p className="mt-12 text-[11px] text-[#7f7478] uppercase tracking-wider max-w-lg text-balance">
            Nomenklatur final: Soul Petals — mekanisme menunggu persetujuan
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#fff0ee] border-t border-[#d0c3c7] w-full pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 max-w-[1200px] mx-auto">
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="font-serif text-[32px] leading-10 text-[#433139]">ITS FAISHA™</span>
            <p className="text-base text-[#4d4448]">© 2024 ITS FAISHA. All rights reserved. Crafted for restorative living.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-[12px] font-bold text-[#433139] uppercase tracking-widest">Legal</h5>
            <ul className="flex flex-col gap-2 text-base">
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('legal')}>Privacy Policy</button></li>
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('legal')}>Terms of Service</button></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-[12px] font-bold text-[#433139] uppercase tracking-widest">Customer Care</h5>
            <ul className="flex flex-col gap-2 text-base">
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('legal')}>Shipping &amp; Returns</button></li>
              <li><button className="text-[#4d4448] hover:text-[#433139] transition-colors" onClick={() => go('support')}>Sustainability</button></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
