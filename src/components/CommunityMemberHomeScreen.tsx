import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Info, Heart, EyeOff, MessageSquare, ShieldCheck, Flower2, MoreHorizontal } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-083 "Beranda Member Community" (intent html/083).
// FUTURE-REFERENCE banner + feed preview + panduan ruang aman. Mock-only.
interface Props { onNavigate?: (tab: NavTab) => void; }

const FEED = [
  { name: 'Maya S.', time: '2 jam yang lalu', body: 'Hari ke-5 ritual malam: akhirnya bisa tidur tanpa scroll...', meta: '12 peluk hangat', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeS23b44jGmyF34SIhl0RxxoKdvJFVYn8CVqS2cFeQ__HWaRi1SeGGa9mmPD58ZRaUayxXUzxuX5IzP39otYEzj065zNhy7QYZYm2GT1pSpcZyaEMPK_I_9ujoTUWS4WnNhK6ltAvqrN1_zrgQtCWcqXBS1YwHHqtPMqZmbSO0RNmLrgS9sFxoC6p1vXhCH6sTr0ZnN60vKOV2lrvva69AllGxJa7YE5bjNgQVQqqdWHw3XWFF-oSY64CF7-NrXGv-JLfR65FBqtM' },
  { name: 'Dina R.', time: '5 jam yang lalu', body: '', meta: '34 peluk hangat', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1TWlKWbYC63IkXtjwAGFU882XGuSi2_rRzoUhxBHjUk099Y8vIbmTfNpT59_i1O1bRq0k-ZmC4UAEegAio-Khqa5nc4KO6dRbb1or6tHxZXIDRxBBst3ggp0UF_XvB_j6K2NAYxEszD96OCZQ-NUawA3bKke9_VkM-avSUZ2-HHqvKwYj-yodh9_xXgMj_A6A-dbJOX4yUceyLK15xTrq-CDGH2A_jScEn5jDmb3g2E_2_XGFcP21LYfsCL6QAOtLlxXkcw-70XI', photo: 'https://lh3.googleusercontent.com/aida/AEtjO1XxWtosCDLmWrfMnHIFF5NwbyUlqRuirPdYN_t_gD2ubckriluJctupxUGXuQjJDinkmnD9ZluAGrAZoMIOe5X7OMBGb1LJVvj_NG8ejZzAze8ic132rn0xGwNLaIQApvBRjB3tL1YAHe1K1TkoY5iGA8knSiZgI8_NVLtKrhN2bpSR3ZwUjYzupByL7hDJ2pnr7siyrYULZjaJ9Mcc1MSk1NYkD7BtWWS1nYV6c17lklUjfOIliBE46sk' },
  { name: 'Sari K.', time: 'Kemarin', body: 'Ada yang punya tips ritual pagi untuk ibu bekerja?', meta: '8 balasan', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrVonrjPHB8Wv2URrgas7oxuzMeSk24BeTYGi2l9sasgOiNCKY6ZKtzkvBhjrdZUDhq7u7XdCMDY5riIsomedawBXtJHxPmR5v1uUSzlDf08cY5outXiPJoWfuRdMJkBrAYW8eY4ePnaHXbh3rmPKOvp30ugEwV5PK4jf4BF3aIEtOGg9CAVF2UjxULTlpURXFVShmhFsS02OYJAKkCcf3og_KoLAosFnsvRW4Rad3veY3wuZLX9igRwksSDsz6VdeCIBnsjheBqk', question: true },
];

export const CommunityMemberHomeScreen: React.FC<Props> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const go = (tab: NavTab) => () => { soundEngine.playSoftClick(); onNavigate?.(tab); };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714]">
      <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-28 pb-24">
        {/* FUTURE-REFERENCE banner */}
        <div className="w-full bg-[#F2E9E5] rounded-lg p-4 mb-8 flex items-center justify-center gap-2 border border-[#d0c3c7]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
          <Info className="w-4 h-4 text-[#5B4750]" />
          <span className="text-[11px] leading-4 tracking-[0.04em] text-[#5B4750]">Future/Preview — bukan scope R1. Feed komunitas ini gambaran desain referensi.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feed */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <header className="flex flex-col gap-4 pb-6 border-b border-[#d0c3c7]/30">
              <h1 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-[#433139] font-serif">Beautiful Soul Community</h1>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {FEED.map((f) => (
                    <img key={f.name} alt={f.name} className="w-10 h-10 rounded-full border-2 border-[#FAF3EE] object-cover" src={f.img} />
                  ))}
                </div>
                <span className="text-base text-[#4d4448]">1.240 jiwa</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={go('event-detail')} className="px-4 py-2 bg-[#433139] text-[#FAF3EE] text-[11px] font-bold uppercase tracking-[0.06em] rounded-full hover:opacity-90 transition-opacity">Lihat Event Berikutnya</button>
                <button onClick={go('community')} className="px-4 py-2 border border-[#BDA494] text-[#433139] text-[11px] font-bold uppercase tracking-[0.06em] rounded-full hover:bg-[#F2E9E5] transition-colors">Tentang Community</button>
              </div>
            </header>

            {FEED.map((c) => (
              <article key={c.name} className="bg-white rounded-xl p-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img alt={c.name} className="w-12 h-12 rounded-full object-cover" src={c.img} />
                    <div>
                      <h3 className="text-base font-semibold text-[#433139]">{c.name}</h3>
                      <p className="text-[11px] leading-4 tracking-[0.04em] text-[#4d4448]">{c.time}</p>
                    </div>
                  </div>
                  <button onClick={() => mock('MOCK — menu pos: sembunyikan / laporkan / blokir (moderasi manusia, bukan algoritma)')} className="text-[#7f7478] hover:text-[#433139] transition-colors" aria-label="Menu pos">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                {c.photo && <img alt="Post" className="w-full rounded-lg object-cover aspect-[1.79]" src={c.photo} />}
                {c.body && <p className={c.question ? 'text-base font-semibold text-[#433139]' : 'text-base text-[#291714]'}>{c.body}</p>}
                <div className="flex items-center gap-2 pt-2 border-t border-[#d0c3c7]/20">
                  {c.question ? <MessageSquare className="w-4 h-4 text-[#7f7478]" /> : <Heart className="w-4 h-4 text-[#e8bbc4] fill-current" />}
                  <span className="text-[11px] leading-4 tracking-[0.04em] text-[#4d4448]">{c.meta}</span>
                </div>
              </article>
            ))}

            {/* Muted-state example */}
            <div className="rounded-xl p-6 border border-[#d0c3c7]/30 flex flex-col items-center justify-center min-h-[160px] bg-[#F7F1EE]/50">
              <EyeOff className="w-6 h-6 text-[#5B4750]/50 mb-2" />
              <p className="text-base text-[#5B4750]">Konten disembunyikan sementara untuk menjaga ruang aman</p>
            </div>
          </div>

          {/* Side rail */}
          <aside className="md:col-span-4">
            <div className="bg-white rounded-xl p-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] sticky top-28 flex flex-col gap-4">
              <h2 className="text-[24px] leading-8 font-semibold text-[#433139] font-serif">Panduan Ruang Aman</h2>
              <div className="flex items-start gap-2"><Heart className="w-5 h-5 text-[#3D6852] mt-0.5 shrink-0" /><p className="text-base text-[#291714]">Ruang ini bebas judgment — Privacy by default.</p></div>
              <div className="flex items-start gap-2"><Flower2 className="w-5 h-5 text-[#3D6852] mt-0.5 shrink-0" /><p className="text-sm text-[#4d4448]">Hormati perjalanan masing-masing individu.</p></div>
              <div className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 text-[#3D6852] mt-0.5 shrink-0" /><p className="text-sm text-[#4d4448]">Tidak ada toleransi untuk ujaran kebencian.</p></div>
              <p className="text-[11px] text-[#4d4448] italic border-t border-[#d0c3c7]/30 pt-3">Moderasi manusia, bukan algoritma</p>
            </div>
          </aside>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold animate-fadeIn">{toast}</div>
      )}
    </div>
  );
};
