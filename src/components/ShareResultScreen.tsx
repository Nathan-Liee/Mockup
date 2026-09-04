import React, { useState } from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { Lock, Download, Link2, Ban } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-064 "Pratinjau Bagikan Hasil" (1:1 intent html/064, perfected).
// Live preview card kiri + kontrol checkbox/tautan/share kanan.
// Jawaban assessment TIDAK PERNAH dibagikan — hanya elemen yang dipilih (fail-safe privasi).
// Tautan placeholder statis (faisha.id/r/nur-8x2k); CTA Salin/Unduh/Bagikan = demo callback.

interface ShareResultScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const EMBLEM_IMG = 'https://lh3.googleusercontent.com/aida/AEtjO1WWz7K4l0XkD7GUrhmmEzLZ35D4XAheS6VwXACa7FOSOxhCFzlF1eU_wBm7nn7PTGG5qqnTOAwHvlhNyv4y7EeW5oUPFqnR0i5HbG35kXpD6u7ExMGFS7ZkVXs_O3hUaj3zQqe1ijfwoktGfFWyAf-0o7pll8R8KDCALLm6dHCAL9fKDOTk4-IQBSudLsfJQfeawsokqY8iedzBhr4DPhTSZyKEcH2HblBacKK_X6o77kGUNDljhi7TjkA';

export const ShareResultScreen: React.FC<ShareResultScreenProps> = ({ onNavigate }) => {
  const go = (tab: NavTab) => onNavigate(tab);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [includeRitual, setIncludeRitual] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (m: string) => { setToast(m); window.setTimeout(() => setToast(null), 2600); };

  return (
    <AccountShell active="my-results" onNavigate={go}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-[1200px] mx-auto w-full">
        {/* LEFT — Live Preview Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[400px] aspect-[4/5] bg-white rounded-xl border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAF3EE]/50 to-transparent" />
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-8 text-center">
              <img alt="Archetype Emblem The Nurturer" className="w-48 h-48 object-contain mb-8 opacity-90" src={EMBLEM_IMG} />
              <h2 className="font-serif text-[32px] leading-[40px] font-semibold text-[#433139] mb-2">THE NURTURER</h2>
              <p className="text-base text-[#4d4448] italic mb-8">Jiwa yang Menenangkan</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Menenangkan', 'Perhatian', 'Hangat'].map((d) => (
                  <span key={d} className="px-4 py-1 rounded-full bg-[#F2E9E5] text-[#433139] text-[11px] font-medium uppercase tracking-wider">{d}</span>
                ))}
              </div>
              {includeSummary && (
                <p className="mt-6 text-sm leading-[22px] text-[#4d4448] max-w-xs">Aroma hangat cashmere dan amber yang memeluk — dirancang untuk menenangkan dan memulihkan.</p>
              )}
              {includeRitual && <p className="mt-4 text-xs uppercase tracking-[0.06em] text-[#5B4750] font-bold">Ritual Malam 15 Menit</p>}
            </div>
            <div className="relative z-10 p-4 text-center border-t border-[#d0c3c7]/20 bg-[#fff0ee]/50">
              <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#433139] opacity-70">ITS FAISHA™</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Controls */}
        <div className="flex flex-col max-w-[500px]">
          <h1 className="font-serif text-[38px] md:text-[48px] leading-[44px] md:leading-[56px] tracking-[-0.02em] font-semibold text-[#433139] mb-8">Pratinjau Hasil</h1>
          <p className="text-base leading-[24px] text-[#4d4448] mb-10">Pilih elemen dari profilmu yang ingin kamu bagikan. Kami menyusun ini menjadi visual yang indah untuk ceritamu.</p>

          <div className="space-y-2 mb-8">
            <h3 className="text-base font-semibold text-[#433139] mb-4">Yang dibagikan</h3>
            <label className="flex items-center p-4 border border-[#d0c3c7]/30 rounded-lg bg-[#fff0ee]/50 cursor-not-allowed opacity-70">
              <input checked readOnly disabled type="checkbox" className="h-5 w-5 rounded-sm mr-4 accent-[#433139] pointer-events-none" />
              <span className="text-base text-[#291714]">Nama Arketipe (Wajib)</span>
            </label>
            <label className="flex items-center p-4 border border-[#d0c3c7]/30 rounded-lg cursor-pointer hover:bg-[#fff0ee]/30 transition-colors">
              <input checked readOnly type="checkbox" className="h-5 w-5 rounded-sm mr-4 accent-[#433139]" />
              <span className="text-base text-[#291714]">3 Descriptor Chips</span>
            </label>
            <label className="flex items-center p-4 border border-[#d0c3c7]/30 rounded-lg cursor-pointer hover:bg-[#fff0ee]/30 transition-colors">
              <input type="checkbox" checked={includeSummary} onChange={(e) => setIncludeSummary(e.target.checked)} className="h-5 w-5 rounded-sm mr-4 accent-[#433139]" />
              <span className="text-base text-[#291714]">Ringkasan Profil Aroma</span>
            </label>
            <label className="flex items-center p-4 border border-[#d0c3c7]/30 rounded-lg cursor-pointer hover:bg-[#fff0ee]/30 transition-colors">
              <input type="checkbox" checked={includeRitual} onChange={(e) => setIncludeRitual(e.target.checked)} className="h-5 w-5 rounded-sm mr-4 accent-[#433139]" />
              <span className="text-base text-[#291714]">Rekomendasi Ritual</span>
            </label>
          </div>

          <div className="flex items-start bg-[#fff0ee] border-l-4 border-[#4A6984] p-4 mb-10 rounded-r-lg">
            <Lock className="w-5 h-5 text-[#4A6984] mr-3 mt-0.5 shrink-0" />
            <p className="text-sm leading-[22px] text-[#4d4448]">Jawaban assessment dan detail personal <strong className="font-semibold">TIDAK PERNAH</strong> dibagikan — hanya yang kamu pilih di sini.</p>
          </div>

          <div className="mb-10">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#4d4448] mb-2">Tautan Bagikan Pribadi</label>
            <div className="flex items-center rounded-lg border border-[#BDA494] bg-white overflow-hidden">
              <input readOnly type="text" value="faisha.id/r/nur-8x2k" className="flex-grow bg-transparent border-none text-base text-[#291714] py-4 px-4 outline-none" />
              <button onClick={() => showToast('MOCK — DRAFT: tautan disalin (demo)')} className="bg-[#433139] text-[#FAF3EE] px-6 py-4 text-sm font-semibold hover:bg-[#5B4750] transition-colors h-full flex items-center">Salin Tautan</button>
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#4d4448] mb-3">Bagikan ke</label>
            <div className="flex gap-4">
              {['WhatsApp', 'Instagram', 'X'].map((s) => (
                <button key={s} onClick={() => showToast(`MOCK — DRAFT: bagikan ke ${s} (demo)`)} aria-label={s} className="w-12 h-12 rounded-full border-[1.5px] border-[#BDA494] flex items-center justify-center text-[#433139] hover:bg-[#433139] hover:text-[#FAF3EE] transition-colors"><Link2 className="w-5 h-5" /></button>
              ))}
              <button onClick={() => showToast('MOCK — DRAFT: unduh gambar (demo)')} className="flex-grow bg-[#433139] text-[#FAF3EE] rounded-full flex items-center justify-center gap-2 text-sm font-semibold hover:bg-[#5B4750] transition-colors h-12"><Download className="w-4 h-4" /> Unduh Gambar</button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#d0c3c7]/20">
            <button onClick={() => showToast('MOCK — DRAFT: tautan dicabut (demo)')} className="text-[#9E3B3B] text-sm font-semibold hover:underline underline-offset-4 flex items-center gap-2"><Ban className="w-4 h-4" /> Cabut tautan kapan saja</button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-fadeIn"><span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" /><span>{toast}</span></div>
      )}
    </AccountShell>
  );
};
