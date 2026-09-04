import React from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Home, BarChart3, Flower2, NotebookPen, ShoppingBag, Heart, Award, Settings, Plus } from 'lucide-react';

// B4 2026-09-03 — shell sidebar akun bersama (kanvas 072-079, FAI-SCR-072..079).
// Sidebar + topbar + konten. Item aktif = bold + border-r-2 + bg tint (dari ref).
// Mock-only: link = goTab, tanpa backend.

interface AccountShellProps {
  active: AccountNavItem['id'];
  onNavigate: (tab: NavTab) => void;
  children: React.ReactNode;
}

type AccountNavItem = { id: NavTab; label: string; icon: React.ElementType };

const NAV_MAIN: AccountNavItem[] = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'my-results', label: 'Hasil Saya', icon: BarChart3 },
  { id: 'my-ritual', label: 'Ritual Saya', icon: Flower2 },
  { id: 'journal', label: 'Jurnal', icon: NotebookPen },
  { id: 'my-orders', label: 'Pesanan', icon: ShoppingBag },
];

const NAV_ACTIVITY: AccountNavItem[] = [
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'rewards', label: 'Rewards', icon: Award },
  { id: 'profile', label: 'Pengaturan', icon: Settings },
];

export const AccountShell: React.FC<AccountShellProps> = ({ active, onNavigate, children }) => {
  const go = (tab: NavTab) => {
    soundEngine.playSoftClick();
    onNavigate(tab);
  };

  const renderItem = (item: AccountNavItem) => {
    const Icon = item.icon;
    const isActive = active === item.id;
    return (
      <button
        key={item.id}
        onClick={() => go(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[12px] font-bold uppercase tracking-[0.06em] transition-colors text-left ${
          isActive
            ? 'text-[#433139] border-r-2 border-[#433139] bg-[#F2E9E5]/60 font-extrabold'
            : 'text-[#4d4448] hover:text-[#433139] hover:bg-[#F2E9E5]/40'
        }`}
      >
        <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
        <span className="whitespace-nowrap">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)]">
      {/* Sidebar (hidden md-down — mobile cukup konten + tab atas) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-[#BDA494]/40 bg-white/40 py-8 px-5">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-xl font-semibold tracking-tight text-[#433139]">ITS FAISHA</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7f7478] mt-1">Restorative Wellness</p>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Akun">
          {NAV_MAIN.map(renderItem)}
          <p className="px-4 pt-6 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#BDA494]">Aktivitas</p>
          {NAV_ACTIVITY.map(renderItem)}
        </nav>
        <div className="mt-auto pt-6 border-t border-[#BDA494]/30">
          <button
            onClick={() => go('ritual-practice')}
            className="w-full py-3 bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all"
          >
            Mulai Ritual
          </button>
        </div>
      </aside>

      {/* Content column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar: greeting kanan — pola umum 072-079 */}
        <header className="sticky top-16 md:top-20 z-30 bg-[#FAF3EE]/85 backdrop-blur border-b border-[#BDA494]/30 h-14 flex items-center justify-end px-4 md:px-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#433139]">Nadia</span>
          <span className="w-8 h-8 rounded-full bg-[#F2E9E5] border border-[#BDA494] ml-3 flex items-center justify-center text-[11px] font-bold text-[#433139]">N</span>
        </header>
        <main className="flex-1 px-4 md:px-10 py-8 md:py-10 w-full max-w-[1200px] mx-auto">{children}</main>
        {/* Mobile quick-nav (md-down) — pengganti sidebar */}
        <nav className="md:hidden flex gap-1 overflow-x-auto px-4 pb-4" aria-label="Akun (mobile)">
          {[...NAV_MAIN, ...NAV_ACTIVITY].map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`px-3 py-2 rounded-full border text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#5B4750] text-[#FAF3EE] border-[#5B4750]'
                    : 'border-[#BDA494] text-[#4d4448] hover:bg-[#F2E9E5]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// Tombol "Tambah Alamat Baru" style (dipakai ProfileScreen; ekspor agar tidak duplikasi).
export const AddDashedButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="border border-dashed border-[#BDA494] rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-[#5B4750] hover:bg-[#F2E9E5] hover:border-[#433139] transition-all min-h-[120px]"
  >
    <Plus className="w-6 h-6" />
    <span className="text-[11px] font-bold uppercase tracking-[0.08em]">{label}</span>
  </button>
);
