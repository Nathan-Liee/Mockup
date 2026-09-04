import React, { useState } from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { Leaf, ShoppingBag, FileEdit, History, Gift, Flower2 } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-076 "Soul Petals Ledger" (1:1 intent html/076).
// Balance 128 petals + ledger rows. Redemption disabled (fitur belum disetujui).

interface SoulPetalsScreenProps {
  onNavigate: (tab: NavTab) => void;
}

type Filter = 'semua' | 'diperoleh' | 'reversal';

const LEDGER = [
  { label: 'Menyelesaikan Ritual Hari 3', date: '10 Mar', delta: 12, icon: Leaf, reversal: false },
  { label: 'Pembelian FAI-2026-030841', date: '8 Mar', delta: 68, icon: ShoppingBag, reversal: false },
  { label: 'Jurnal 3 hari berturut', date: '5 Mar', delta: 15, icon: FileEdit, reversal: false },
  { label: 'Reversal: pembayaran dibatalkan', date: '2 Mar', delta: -40, icon: History, reversal: true },
];

const FILTERS: Filter[] = ['semua', 'diperoleh', 'reversal'];

export const SoulPetalsScreen: React.FC<SoulPetalsScreenProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<Filter>('semua');
  const go = (tab: NavTab) => onNavigate(tab);

  const rows = LEDGER.filter((r) =>
    filter === 'semua' ? true : filter === 'reversal' ? r.reversal : !r.reversal
  );

  return (
    <AccountShell active="rewards" onNavigate={go}>
      {/* Header */}
      <section className="mb-14 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2E9E5] rounded-full mb-6">
            <Flower2 className="w-4 h-4 text-[#433139]" />
            <span className="text-[11px] font-medium text-[#433139] uppercase">Ledger</span>
          </div>
          <h1 className="text-[38px] md:text-[48px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#433139] font-serif mb-4">
            Soul Petals
          </h1>
          <p className="text-lg leading-7 text-[#4d4448] max-w-lg">
            Catatan perjalanan petal-mu — fitur penghargaan sedang disiapkan
          </p>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden border border-[#BDA494]/30 bg-white/60 flex items-center justify-center">
          <img
            alt="Soul Petal illustration"
            className="w-full h-full object-cover opacity-90 mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhqy204qv2WgjIr9VkW5yOokv9m-Bs7czkUSvcPHDxYo-qs7Y_wYgv0DEYMwFFuWpyq7p2L0XctV0PWCm5MP0N-2FBhT6HPnAi4uSjb09LqAYkLwjC61HXbVQAtA4p-8E7f0fHJjBDDyB5oqQ-kBhFl9I63wk_eUfQQWh27UE6PBnqvRo1-bOhqwGJUIybRfwSMTyp2womokCNIbVMJiXoykxkefA3WwyRLGGE-jaGj46l9rM9ukh4yp6kApa0Ap8K5Lajyi4ixXE"
          />
        </div>
      </section>

      {/* Balance + action bento */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14">
        <div className="md:col-span-8 bg-white/60 backdrop-blur-md border border-[#BDA494]/30 shadow-[0_4px_30px_rgba(91,71,80,0.05)] rounded-3xl p-6 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#ffe2de] rounded-full blur-3xl opacity-50 pointer-events-none" />
          <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#4d4448] block mb-2">Total Terkumpul</span>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-[64px] md:text-[80px] leading-none text-[#433139] font-serif">128</span>
            <span className="text-2xl font-semibold text-[#433139] italic font-serif">Petals</span>
          </div>
          <p className="text-base text-[#4d4448]/70 max-w-md mt-4 border-l-2 border-[#433139]/20 pl-4">
            Nilai &amp; penukaran akan diumumkan setelah persetujuan resmi.
          </p>
        </div>
        <div className="md:col-span-4 rounded-3xl border border-[#BDA494] p-6 flex flex-col justify-between bg-[#fff0ee]/50">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#ffe9e6] flex items-center justify-center mb-6">
              <Gift className="w-5 h-5 text-[#433139]" />
            </div>
            <h3 className="text-[22px] font-semibold text-[#433139] mb-2">Tukar Petals</h3>
            <p className="text-base text-[#4d4448] mb-6">Persiapkan dirimu untuk kurasi penghargaan eksklusif.</p>
          </div>
          <div className="relative group w-full">
            <button
              disabled
              className="w-full h-12 bg-[#F2E9E5]/20 text-[#4d4448] text-[12px] font-bold uppercase tracking-[0.14em] rounded-lg cursor-not-allowed border border-[#d0c3c7]/30"
            >
              Tukar Petals
            </button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#433139] text-[#FAF3EE] px-3 py-1 rounded text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Segera hadir
            </div>
          </div>
        </div>
      </section>

      {/* Ledger */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#BDA494] pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-[#433139] font-serif">Riwayat Perjalanan</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full border text-[11px] font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'border-[#433139] bg-[#433139] text-[#FAF3EE]'
                    : 'border-[#BDA494] text-[#4d4448] hover:border-[#433139]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.label}
                className={`flex items-center justify-between p-4 rounded-xl transition-colors group ${
                  r.reversal ? 'hover:bg-[#ffdad6]/30' : 'hover:bg-[#ffe9e6]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ffe2de] flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${r.reversal ? 'text-[#9E3B3B]' : 'text-[#433139]'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-base font-semibold ${r.reversal ? 'text-[#291714]' : 'text-[#433139]'}`}>{r.label}</span>
                    <span className="text-[11px] text-[#4d4448]">{r.date}</span>
                  </div>
                </div>
                <div className={`text-[22px] font-bold ${r.reversal ? 'text-[#9E3B3B]' : 'text-[#3D6852]'}`}>
                  {r.delta > 0 ? `+${r.delta}` : r.delta}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AccountShell>
  );
};
