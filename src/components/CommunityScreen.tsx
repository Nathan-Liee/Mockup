import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Flower2, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

// Fix-12 kanvas 2026-09-03 — FAI-SCR-011 "Beautiful Soul Community".
// 1:1 vs faisha-gallery/html/011: welcome strip → hero (grid-12) → Sacred Philosophy →
// 3-feature bento → Upcoming Gatherings → Membership CTA (plum). Mock-only, tanpa backend.

interface CommunityScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLIEK_kwdqDq5BXZZbltt4DRPd_MoOCL3eN0MOTn_7XpaycTdcDQo8k5ASlk6ILzyIyVDWJorf3Ld6OnfQAJBVR1XSI4DtY1mR85RPtw2Yc84Hs54e_NbJuNW05CYwvQJkNmJhELAKB-UFxhsc7pm2oUtB6kxS6fdbMjD0syMXlzwFn_H0t7zPyz-l0SMh-wPSRaa8JJ7QhAxlFrOBN_ChcsmX6cOxfX8-oAKdsdLdWbGfBOw96upCVpY8kHHScAmy1ugl93-65gY';
const GATHER_1 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoi8hVTnZO-UXZQ17w56J2cURurtZQlfeFhnC5j4mNq9zjgce5B8bqChCLHgGsHbnTfjoM_9guXR9PSxVHzd0DEQDMfhT8BOKTHE4WyYbxZEQQ0FW2l1yVd8Lvy35z3PDeEK_k-xeGO-cB3WZuqVJvSoVSn3Ge7HCAj2Rmg6-wIfI1MRlm-NF3aj4yS0I7l-8s5AfzN-lzOXnM_S4ZytBr6NalG6sHiK3pFg-HnY_ygdzGHq58uzAXQVzWG-EG8cuKJRiiiSG3Bh0';
const GATHER_2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWlc--72EHnqGypQdxqzunD0BBknSX0ibxQDb8hhl_O9XpxuLmWNljXxjiHqvmwKIUFUfTObF1lXQlVYHZdZul67WjN7e5IfDWfOBVo6GbXmLYA2J7VgvRYPuIDfq8KSScnuK2VdNu5tB26rDJC7KYgAxkiS8QRBbsZLDOuUtLC0pDGaSm3Ue5g8xvt1u_Neb7JjS7Cye645eLqwYnPfzXLbApfbhRS7LuLQ3cGe6ocPfneAOa9ZHOLb5tg5UTIpaa7E6Rh_XRqHA';

// 011 — feature bento (material symbols → lucide padanan)
const FEATURES = [
  { icon: Flower2, title: 'Events & Deep Talks', desc: 'Engage in intimate workshops and live sessions guided by restorative practitioners.' },
  { icon: Sparkles, title: 'Shared Rituals', desc: 'Participate in group mindfulness exercises and guided restorative practices together.' },
  { icon: BookOpen, title: 'Stories & Inspiration', desc: 'Read member reflections and share your own journey in a private, supportive space.' },
];

// 011 — Upcoming Gatherings (verbatim)
const GATHERINGS = [
  { img: GATHER_1, date: 'Oct 12 • Virtual', title: 'Grounding Rituals for Autumn', host: 'Hosted by Faisha' },
  { img: GATHER_2, date: 'Oct 19 • Virtual', title: 'Intentional Journaling Circle', host: 'Hosted by Elena R.' },
];

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const mockToast = (msg: string) => {
    soundEngine.playSoftClick();
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const go = (tab: NavTab) => () => {
    soundEngine.playSoftClick();
    onNavigate?.(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fadeIn">
      {/* ===== Welcome-back strip ===== */}
      <div className="bg-[#F7F1EE] py-3 text-center border-b border-[#BDA494]">
        <p className="text-sm text-[#4d4448]">
          Welcome back to your sanctuary.{' '}
          <button onClick={() => mockToast('MOCK — DRAFT: kamu sudah di Community Home')} className="text-[#5B4750] underline hover:opacity-70 transition-opacity">
            Go to Community Home
          </button>
        </p>
      </div>

      {/* ===== Hero (bg #F2E9E5, grid-12) ===== */}
      <section className="bg-[#F2E9E5] py-16 md:py-[120px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:col-start-2 flex flex-col gap-6">
            <h1 className="font-serif text-[38px] leading-[44px] md:text-[40px] md:leading-[48px] font-semibold tracking-tight text-[#5B4750]">
              Beautiful Soul Community
            </h1>
            <p className="text-lg leading-[28px] text-[#4d4448] max-w-md">
              A space for connection, reflection, and shared growth. Join a collective dedicated to restorative rituals and mindful living.
            </p>
            <div>
              <button
                onClick={go('assessment-flow')}
                className="h-12 px-8 rounded-full bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] hover:opacity-90 active:scale-[0.99] transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Mulai Assessment
              </button>
            </div>
          </div>
          <div className="md:col-span-6 mt-6 md:mt-0 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494]">
              <img
                alt="Perempuan duduk melingkar di ruangan bercahaya alami, berbagi teh dalam ritual mindful."
                className="w-full h-full object-cover"
                src={HERO_IMG}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sacred Philosophy ===== */}
      <section className="bg-[#FAF3EE] py-16 md:py-[120px] px-6 md:px-10 text-center">
        <div className="max-w-[800px] mx-auto flex flex-col gap-8">
          <h2 className="font-serif text-[24px] leading-[32px] font-semibold text-[#5B4750]">Our Sacred Philosophy</h2>
          <div className="text-base leading-[24px] text-[#4d4448] flex flex-col gap-4">
            <p>
              We believe that true restoration is rarely found in isolation. The Beautiful Soul Community is built on the foundation of sisterhood, mutual support, and the quiet power of shared rituals.
            </p>
            <p>
              Here, vulnerability is welcomed as strength. We gather to hold space for one another, to witness each other's journeys, and to cultivate a deeper sense of self through collective reflection.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 3-feature bento ===== */}
      <section className="bg-[#FAF3EE] pb-16 md:pb-[120px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex flex-col items-center text-center gap-4 px-6 py-10 bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                <div className="w-14 h-14 rounded-full bg-[#F2E9E5] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#5B4750]" />
                </div>
                <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">{f.title}</h3>
                <p className="text-sm leading-[24px] text-[#4d4448]">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Upcoming Gatherings ===== */}
      <section className="bg-[#F7F1EE] py-16 md:py-[120px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-[24px] leading-[32px] font-semibold text-[#5B4750]">Upcoming Gatherings</h2>
            <button onClick={() => mockToast('MOCK — DRAFT: kalender gathering penuh segera hadir')} className="text-xs font-bold uppercase tracking-[0.06em] text-[#5B4750] underline hover:opacity-70 transition-opacity">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GATHERINGS.map((g) => (
              <article key={g.title} className="bg-white rounded-xl overflow-hidden border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto shrink-0">
                  <img alt={g.title} className="w-full h-full object-cover" src={g.img} />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <span className="w-fit px-3 py-1 rounded-full bg-[#F2E9E5] text-[#5B4750] text-[11px] font-bold uppercase tracking-[0.06em]">{g.date}</span>
                  <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">{g.title}</h3>
                  <p className="text-sm text-[#4d4448]">{g.host}</p>
                  <button
                    onClick={go('event-detail')}
                    className="mt-auto w-full sm:w-auto h-12 px-8 border border-[#BDA494] text-[#5B4750] text-xs font-bold uppercase tracking-[0.06em] rounded-full hover:bg-[#F2E9E5] active:scale-[0.99] transition-all"
                  >
                    Register
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Membership CTA (plum) ===== */}
      <section className="bg-[#5B4750] py-16 md:py-[120px] px-6 md:px-10 text-center">
        <div className="max-w-[800px] mx-auto flex flex-col items-center gap-6">
          <h2 className="font-serif text-[32px] leading-[40px] font-semibold text-[#FAF3EE]">Join the Beautiful Soul Community</h2>
          <p className="text-base leading-[24px] text-[#E8BBC4] max-w-lg">
            Mulai perjalananmu dengan mengenal profil aromamu — lalu temukan ritual dan komunitas yang selaras.
          </p>
          <button
            onClick={go('community-join')}
            className="h-12 px-10 rounded-full bg-[#FAF3EE] text-[#5B4750] text-xs font-bold uppercase tracking-[0.06em] inline-flex items-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
          >
            Join Now (085) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
