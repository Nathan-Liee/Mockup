import React from 'react';
import { NavTab } from '../types';
import { AccountShell, AddDashedButton } from './AccountShell';
import { Lock, CheckCircle2 } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-079 "Profil & Alamat" (1:1 intent html/079).
// Form info pribadi (email locked, telepon error state) + alamat tersimpan
// (utama/secondary + tambah) + sticky bottom bar + toast sukses. Mock-only.

interface ProfileScreenProps {
  onNavigate: (tab: NavTab) => void;
  onToast?: (msg: string) => void;
}

const ADDRESSES = [
  { name: 'Rumah', addr: 'Jl. Kemang Timur No. 24, Jakarta Selatan 12560', primary: true },
  { name: 'Kantor', addr: 'Jl. Sudirman Kav 21', primary: false },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, onToast }) => {
  const go = (tab: NavTab) => onNavigate(tab);
  const toast = (m: string) => (onToast ? onToast(m) : undefined);

  return (
    <AccountShell active="profile" onNavigate={go}>
      <div className="mb-10">
        <h2 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif mb-2">Profil &amp; Alamat</h2>
        <p className="text-base text-[#4d4448]">Kelola informasi pribadi dan preferensi pengiriman Anda untuk pengalaman yang lebih terhubung.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Informasi Pribadi */}
        <section className="bg-white border border-[#d0c3c7]/50 p-8 rounded-xl shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
          <h3 className="text-[22px] font-semibold text-[#433139] border-b border-[#d0c3c7]/30 pb-4 mb-8">Informasi Pribadi</h3>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#F2E9E5]">
                <img
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZEqH4HwAjurDXCSmyy7XwwCD17lRigBFiyM79PVsEmIDfN3_Uk2nJwLaUeXYa75vHopVvwrDW-vffho8iaKzykypXUvkE8ldrU7FXDQya3Zw1k_gJwDJLBqDF5SZnTrO8HlN8zQchm5Moz4bTJINBrjkvmKtWNgoHHWiJ6JYYHwB-VKHoVDzKsvMZYfUXLxPkSmJqhYiSL3RihLc1t8xavIFOKeCOHeIvxggClwNyiyvZVX0YBs8t27cMynZJHjLsHJAiY0N1VdY"
                />
              </div>
              <button
                onClick={() => toast('MOCK — ubah foto (demo)')}
                className="text-[12px] font-bold text-[#78555d] underline decoration-1 underline-offset-4 hover:text-[#433139]"
              >
                Ubah Foto
              </button>
            </div>

            {/* Fields */}
            <div className="flex-grow flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-[#4d4448] uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  defaultValue="Nadia Prameswari"
                  className="h-12 w-full bg-white border border-[#433139] text-[#433139] px-4 rounded focus:outline-none focus:ring-1 focus:ring-[#433139] focus:border-[#433139] text-base transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-[#4d4448] uppercase tracking-wider">Email</label>
                <div className="flex items-center justify-between border border-[#d0c3c7]/50 bg-[#F2E9E5]/30 h-12 px-4 rounded text-[#4d4448]">
                  <span className="text-base">nadia@email.com</span>
                  <div className="flex items-center gap-1.5 text-[#7f7478]">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs">ID utama — tidak dapat diubah</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-[#4d4448] uppercase tracking-wider">Nomor Telepon</label>
                <div className="flex gap-4 items-start">
                  <div className="flex-grow flex flex-col gap-1">
                    <input
                      type="text"
                      defaultValue="0812 3456 7890"
                      className="h-12 w-full bg-white border border-[#9E3B3B] text-[#9E3B3B] px-4 rounded focus:outline-none focus:ring-1 focus:ring-[#9E3B3B] focus:border-[#9E3B3B] text-base transition-colors"
                    />
                    <span className="text-[11px] font-medium text-[#9E3B3B]">Format nomor tidak valid</span>
                  </div>
                  <button
                    onClick={() => toast('MOCK — ubah nomor telepon (demo)')}
                    className="h-12 px-8 border-[1.5px] border-[#BDA494] text-[#443327] rounded text-[12px] font-bold hover:bg-[#F2E9E5] transition-colors"
                  >
                    Ubah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alamat Tersimpan */}
        <section className="bg-white border border-[#d0c3c7]/50 p-8 rounded-xl shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
          <div className="flex justify-between items-center border-b border-[#d0c3c7]/30 pb-4 mb-8">
            <h3 className="text-[22px] font-semibold text-[#433139]">Alamat Tersimpan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADDRESSES.map((a) => (
              <div
                key={a.name}
                className={`border rounded-lg p-6 relative ${
                  a.primary ? 'border-[#433139] bg-[#fff8f7]' : 'border-[#d0c3c7]/50 bg-white hover:border-[#d0c3c7]'
                } transition-colors`}
              >
                {a.primary && (
                  <div className="absolute top-4 right-4 bg-[#F2E9E5] text-[#433139] px-1 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider">
                    Utama
                  </div>
                )}
                <h4 className={`text-base font-semibold text-[#433139] mb-2 ${a.primary ? 'pr-16' : ''}`}>{a.name}</h4>
                <p className="text-base text-[#4d4448] mb-6 h-12">{a.addr}</p>
                <div className="flex gap-6 border-t border-[#d0c3c7]/30 pt-4">
                  <button
                    onClick={() => toast(`MOCK — ubah alamat ${a.name} (demo)`)}
                    className="text-[12px] font-bold text-[#78555d] hover:text-[#433139] transition-colors"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => toast(`MOCK — hapus alamat ${a.name} (demo)`)}
                    className="text-[12px] font-bold text-[#7f7478] hover:text-[#9E3B3B] transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <AddDashedButton label="Tambah Alamat Baru" onClick={() => toast('MOCK — tambah alamat (demo)')} />
          </div>
        </section>
      </div>

      {/* Sticky bottom action bar */}
      <div className="sticky bottom-0 mt-8 -mx-4 md:-mx-10 bg-white/90 backdrop-blur-md border-t border-[#d0c3c7]/30 p-4 flex justify-end gap-4 z-30">
        <button
          onClick={() => toast('MOCK — batal (demo)')}
          className="h-12 px-8 text-[#433139] rounded text-[12px] font-bold hover:bg-[#F2E9E5] transition-colors"
        >
          Batal
        </button>
        <button
          onClick={() => toast('Perubahan tersimpan')}
          className="h-12 px-8 bg-[#433139] text-[#FAF3EE] rounded text-[12px] font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          Simpan Perubahan
        </button>
      </div>

      {/* Simulated success toast (state kanvas) */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#3D6852] text-white px-6 py-4 rounded-full shadow-[0_4px_20px_rgba(91,71,80,0.15)] flex items-center gap-2 z-50 pointer-events-none">
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-sm font-semibold">Perubahan tersimpan</span>
      </div>
    </AccountShell>
  );
};
