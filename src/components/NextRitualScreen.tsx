import React from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Leaf, Check, Circle, Sparkles, Lock, BookOpen, Play, PenLine } from 'lucide-react';

// STRICTLY MOCKUP (SEQ 043): post-purchase "Ritual Setelah Pembelian" — static render.
// Revision 043 (profile icon in header, complete footer) is satisfied by the app's
// final shared Header.tsx (profile "S" icon) + Footer.tsx (4-column layout).
interface NextRitualScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

const UNLOCKED = [
  { title: 'Panduan Morning Ritual', meta: 'PDF + Audio', cta: 'Buka Panduan', Icon: BookOpen, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn0E9i956-lup7rziwnOg3cUabJcLMwMQoP6ZLJLshICXdkWaxwe19jUzBEgBgrwpvYgRE2Iu2ikLnYv9t1KG0VsLL8yi48RJCoTMm1rCINxiEFBMfHoQOPnwmWfqa9aBHtTVZsCG5HCBbRblNEj_g0LrqtFYf9fTQqYeerdT1F1phd6xFUkrI1YykJSlV_IbDvGkeRg6-MjblUQTAXduZB6wB0ApvIbsDwQGx1iq-y84U5VnG-0i3N5rb_wuobL1xUItdc5DSd_4' },
  { title: 'Playlist Ritual Pagi', meta: '20 menit', cta: 'Putar', Icon: Play, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwD5i0vgUlom3JYc_kNVmq_dDQOtnfuNREJEArXuYrlYSoM5N4CPQwFW8G6121pWv-ig2Unl2PxAW1reTR0AzZmq-Zkh32xbZgD2VMM_-5PvkM040-LGrfqV6q0dA2dIxGCC5-3gi17kLD4EHLxuojVcxoo6x22j_nMFAsxejt_zy3Q8Dmp4PXNThMdNOx3VMFnyobsOUU3muscbSpyGlY6-NfdbNfETwh8iWZHh6AtLcUO9FHgHqrKmIAmkkF-2Nv39adx4QGki4' },
  { title: 'Jurnal Prompt', meta: '7 Hari Awal yang Bermakna', cta: 'Mulai Menulis', Icon: PenLine, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCggS71dNefMp4GonoKOPTvkxukB8W0ZzqnwixF8fN36dYqsML8O0uuMagb9z34A33m3d3IkRsGhaqlMemeoi2LgBEY-t6GWPZZnCzkKkyG6qDs3AmqYrDxohMe8kHZYlypf2OjyHu5nMbRoDkdnPSW6GoqznrMAJexphqEcZaK7Xb-dfPNou9t-TfisqP2eniW-9VwcPLdDR4z1ebBFahZ8-RCD2a-24OvO4UfZtsWWVKeLAHXVMmzac7_2A6x8j4vnkBaNOw6Vf0' },
];

const DAYS = [1, 2, 3, 4, 5, 6, 7] as const;

export const NextRitualScreen: React.FC<NextRitualScreenProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fadeIn">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAztSF1PwixCSneiYozjhNwJG8K6k3aiHq2ybCDKptftduLQCfXhBW4KmrJARPl5QRDJDTJ5mPqTQW9PVnRLVEERsxgME7B6mZ3CAlWPVPdaQSNlbdh4PpW_t0TsgKcHHu9TnDFUf4H0iHtT438ZXxUVT0_3_3oFhUgnxFMiCnhCYCAX_3g0lhF2ey4QOR5V5j5ktOoQzQ27io3HxkN1bcYuzhtV1IzCBHGPdMJtvka041_QayEAaa9gZKM7uZRNzoCiJXGP75jQFg')" }}
        />
        <div className="absolute inset-0 bg-[#FAF3EE]/40" />
        <div className="relative z-10 p-8 md:p-12 max-w-3xl text-center bg-[#FAF3EE]/70 backdrop-blur-md rounded-xl mx-4">
          <h1 className="text-[32px] md:text-[44px] leading-tight font-semibold tracking-[-0.02em] text-[#433139] mb-3">Ritualmu Dimulai di Sini</h1>
          <p className="text-base md:text-lg text-[#291714]">Pembelianmu bukan akhir - ini awal dari hubungan ritualmu. Kami siapkan panduan untuk menemanimu.</p>
        </div>
      </section>

      {/* Unlocked content */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-16">
        <div className="flex flex-col items-center mb-10">
          <span className="inline-flex items-center justify-center bg-[#F2E9E5] text-[#433139] text-xs px-4 py-2 rounded-full uppercase tracking-wider font-semibold">
            <Leaf className="w-4 h-4 mr-2" /> Terbuka untukmu
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UNLOCKED.map(({ title, meta, cta, Icon, image }) => (
            <div key={title} className="bg-[#FAF3EE] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494]/30 flex flex-col">
              <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#433139] mb-1">{title}</h3>
                  <p className="text-sm text-[#4d4448] mb-6">{meta}</p>
                </div>
                <button
                  onClick={() => { soundEngine.playSoftClick(); onNavigate?.(title === 'Jurnal Prompt' ? 'journal' : 'rituals'); }}
                  className="w-full bg-[#5B4750] text-[#FAF3EE] text-sm font-semibold py-3 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Icon className="w-4 h-4" /> {cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7-day tracker */}
      <section className="max-w-[800px] mx-auto px-4 md:px-10 pb-16">
        <h2 className="text-[28px] md:text-[36px] leading-tight font-semibold text-[#433139] text-center mb-14">Perjalanan Ritualmu</h2>
        <div className="relative flex justify-between items-center w-full mt-8">
          <div className="absolute left-0 top-4 w-full h-[2px] bg-[#d0c3c7]/50 -z-0" />
          {DAYS.map((d) => {
            const done = d <= 3;
            const active = d === 4;
            return (
              <div key={d} className="flex flex-col items-center relative z-10">
                {done && (
                  <div className="w-8 h-8 rounded-full bg-[#5B4750] text-[#FAF3EE] flex items-center justify-center mb-2 shadow-sm">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                {active && (
                  <div className="w-10 h-10 rounded-full bg-[#F2E9E5] border-2 border-[#5B4750] text-[#433139] flex items-center justify-center mb-2 shadow-md relative">
                    <Sparkles className="w-5 h-5" />
                    <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#5B4750]" />
                  </div>
                )}
                {!done && !active && (
                  <div className="w-8 h-8 rounded-full bg-[#FAF3EE] text-[#d0c3c7] border border-[#d0c3c7] flex items-center justify-center mb-2">
                    <Circle className="w-4 h-4" />
                  </div>
                )}
                <span className={`text-xs ${active ? 'text-[#433139] font-bold text-sm' : done ? 'text-[#433139]' : 'text-[#7f7478]'}`}>Hari {d}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Locked teaser */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-10 pb-16">
        <div className="relative rounded-2xl overflow-hidden h-64 shadow-[0_4px_20px_rgba(91,71,80,0.08)] cursor-not-allowed">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
            /* PERBAIKAN QA: URL /aida/ mati → padanan aida-public hidup (ref 021 dusk bedroom scene) */
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQWMefJU4kcQLqLnECheWe2Oq8o0rORC1dmKOGZmQAyYBQiUMBKvRtc0Bfx4XV_APq_8JvIxhv83uR-DcHWH0TDaijXduCsrL4poLze-MmIODxBRZGuWzgm0iL2xt1YzhMN81XTK5tbe4v3bc7roMljWArTEQAp1DzMCIipGjXm-ObXMMRXApKsr834usZ-KMIDrNCbsrYRF-ZqfzunUDa6G4RqpnldMj3WlUSVb0PYuczaNNMRfaaAn_gNwBJVYSy1wIljQFOyG4')" }}
          />
          <div className="absolute inset-0 bg-[#291714]/40 flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-[#FAF3EE]/20 backdrop-blur-md rounded-full p-3 mb-4 text-[#FAF3EE]">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#FAF3EE] mb-2">Setelah 7 hari, jelajahi Sleep Ritual untuk melengkapi harimu</h3>
            <p className="text-[11px] uppercase tracking-widest text-[#FAF3EE]/80 font-semibold">Terbuka di Hari 7</p>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 pb-20 text-center">
        <h2 className="text-[32px] md:text-[40px] leading-tight font-semibold tracking-[-0.02em] text-[#433139] mb-3">Beautiful Soul Community</h2>
        <p className="text-base md:text-lg text-[#4d4448] mb-8">Bagikan momen ritualmu dengan komunitas kami.</p>
        <button
          onClick={() => { soundEngine.playSoftClick(); onNavigate?.('community'); }}
          className="border-[1.5px] border-[#BDA494] text-[#291714] font-semibold py-3 px-8 rounded hover:bg-[#5B4750] hover:text-[#FAF3EE] hover:border-[#5B4750] transition-all duration-300"
        >
          Gabung
        </button>
      </section>
    </div>
  );
};
