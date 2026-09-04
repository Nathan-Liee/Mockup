import React from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { ChevronRight, Lock, History, CalendarDays } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-072 "Hasil Archetype Anda" (1:1 intent html/072, perfected).
// Bento: hero archetype + stats + retake terkunci; kolom kanan eksplorasi; footer status arsip.
// Mock-only; retake disabled = CONTROLLED_TBD (belum tersedia), bukan tanggal aktif.

interface MyResultsScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const ARCHETYPE_IMG = 'https://lh3.googleusercontent.com/aida/AEtjO1XYn3iY7RuxFnw-yklWkgsqt68EepBnNJya-WQMEgOZ1O5rjMfYmtkhuuXmuMK8_VDvYg8utLYtQ4OBScapICrWjOoSMb5hTciMTHiSDeZ3h9ZEzOslAdw7cXHoQE9UWRERkt23N5tpmL15yYW1Qs5tzsMAoqD4MUAU2fWL7wnjapxlVykdk2xMuIRa1AiqzaCK_Dcsg2B88BW4AqL0kLPRra7KSTM75NnwAACkiDBy4nwCnaoe0XwKkQ';

const CARD = 'bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)]';

const EXPLORE: { label: string; tab: NavTab }[] = [
  { label: 'Ringkasan Lengkap', tab: 'assessment-result' },
  { label: 'Detail Archetype', tab: 'archetype-detail' },
  { label: 'Personal Scent Profile', tab: 'assessment-result' },
  { label: 'Crystal Trinity', tab: 'crystal-trinity' },
  { label: 'Ritual Personal', tab: 'ritual-practice' },
  { label: 'Rekomendasi Produk', tab: 'why-recommended' },
];

export const MyResultsScreen: React.FC<MyResultsScreenProps> = ({ onNavigate }) => {
  const go = (tab: NavTab) => {
    onNavigate(tab);
  };

  return (
    <AccountShell active="my-results" onNavigate={go}>
      <div className="mb-10">
        <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Hasil Archetype Anda</h2>
        <p className="text-base leading-[24px] text-[#4d4448] max-w-2xl mt-2">
          Jelajahi kedalaman jiwa Anda melalui lensa 7 lapisan. Hasil ini adalah peta perjalanan restoratif personal Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kiri: hero + stats + retake */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className={`${CARD} overflow-hidden relative flex flex-col md:flex-row`}>
            <div className="absolute top-5 left-5 z-10 bg-[#FAF3EE]/90 backdrop-blur py-1 px-3 rounded-full border border-[#BDA494]/50 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#3D6852] mr-2" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3D6852]">AVAILABLE</span>
            </div>
            <div className="md:w-2/5 relative min-h-[240px] bg-[#F2E9E5]">
              <img alt="Archetype The Nurturer" className="absolute inset-0 w-full h-full object-cover opacity-90" src={ARCHETYPE_IMG} />
            </div>
            <div className="p-7 md:w-3/5 flex flex-col justify-center bg-gradient-to-br from-white to-[#F2E9E5]/40">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#7f7478] mb-2">Primary Archetype</span>
              <h3 className="font-serif text-[28px] leading-[36px] font-semibold text-[#433139]">
                THE NURTURER
                <span className="block font-serif italic text-lg font-normal text-[#5B4750] mt-1">Jiwa yang Menenangkan</span>
              </h3>
              <p className="text-sm leading-[22px] text-[#4d4448] mt-3">
                Anda adalah pelabuhan yang tenang dalam badai. Energi Anda membumi, merawat, dan memulihkan. Perjalanan Anda berfokus pada keseimbangan antara memberi kepada orang lain dan mengisi kembali sumur Anda sendiri.
              </p>
              <p className="mt-5 text-[11px] text-[#7f7478] flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" /> Assessment diambil 8 Maret 2026
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { v: '7 Lapisan Terjawab', s: 'Kedalaman Analisis' },
              { v: 'Warm Amber', s: 'Profil Warna' },
              { v: 'Malam', s: 'Waktu Ritual Optimal' },
            ].map((st) => (
              <div key={st.s} className="bg-white border border-[#BDA494]/40 rounded-lg p-5 text-center">
                <p className="text-base font-semibold text-[#433139]">{st.v}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#7f7478] mt-1">{st.s}</p>
              </div>
            ))}
          </div>

          <section className="bg-[#F2E9E5]/50 border border-[#BDA494]/40 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-semibold text-[#433139]">Merasa sudah berubah?</h4>
              {/* Retake: tanggal dari ref (7 April 2026) dipertahankan sebagai copy statis; tombol blok = fail-safe DRAFT. */}
              <p className="text-sm text-[#4d4448] mt-1">Assessment berikutnya tersedia 7 April 2026</p>
            </div>
            <button
              disabled
              title="MOCK — DRAFT: retake belum tersedia di mockup"
              className="py-3 px-6 border-[1.5px] border-[#BDA494] bg-white text-[#7f7478] text-xs font-bold uppercase tracking-[0.06em] rounded opacity-60 cursor-not-allowed"
            >
              Tersedia dalam 23 hari
            </button>
          </section>
        </div>

        {/* Kanan: eksplorasi */}
        <aside className="lg:col-span-4">
          <div className="bg-white border border-[#BDA494]/50 rounded-xl p-2 shadow-[0_4px_20px_rgba(91,71,80,0.02)] lg:sticky lg:top-40">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#7f7478] px-4 py-4 border-b border-[#BDA494]/30 mb-2">Eksplorasi Hasil</h4>
            <ul>
              {EXPLORE.map((e) => (
                <li key={e.label}>
                  <button
                    onClick={() => go(e.tab)}
                    className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-[#F2E9E5]/50 transition-colors group text-left"
                  >
                    <span className="text-base font-semibold text-[#433139]">{e.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#BDA494] group-hover:text-[#433139] transition-colors" />
                  </button>
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-[#BDA494]/30">
                <button
                  onClick={() => go('why-recommended')}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-[#F2E9E5]/50 transition-colors group text-left text-[#5B4750]"
                >
                  <span className="text-base font-semibold">Bagikan Hasil</span>
                  <ChevronRight className="w-4 h-4 text-[#BDA494] group-hover:text-[#433139] transition-colors" />
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Status arsip (muted) */}
      <div className="mt-12 pt-8 border-t border-[#BDA494]/30">
        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#BDA494] mb-5">Status Arsip</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-start p-4 bg-white/70 border border-[#BDA494]/25 rounded opacity-75">
            <Lock className="w-4 h-4 text-[#BDA494] mr-3 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#4d4448]">Hasil Terkunci</p>
              <p className="text-[11px] text-[#7f7478] mt-1">Selesaikan verifikasi email untuk membuka kunci hasil ini.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-white/70 border border-[#BDA494]/25 rounded opacity-75">
            <History className="w-4 h-4 text-[#BDA494] mr-3 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#4d4448]">Arsip Lalu</p>
              <p className="text-[11px] text-[#7f7478] mt-1">Hasil lama tersimpan sebagai arsip. Diambil pada 12 Jan 2025.</p>
            </div>
          </div>
        </div>
      </div>
    </AccountShell>
  );
};
