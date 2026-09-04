import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenPolicy?: (title: string) => void;
  // P0 wiring: buka LegalScreen (016/017/018) di tab tertentu, bukan toast.
  onOpenLegal?: (doc: 'privacy' | 'terms' | 'shipping') => void;
  // 'light' = canvas 005 About footer bg #F7F1EE per review-103; default stays dark.
  variant?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, variant = 'dark' }) => {
  const light = variant === 'light';
  return (
    <footer
      className={`w-full mt-24 md:mt-32 transition-colors ${
        light ? 'bg-[#F7F1EE] border-t border-[#BDA494]/30' : 'bg-[#402b28]'
      }`}
      style={
        light
          ? ({ '--f-strong': '#433139', '--f-soft': '#4d4448', '--f-muted': '#7f7478' } as React.CSSProperties)
          : ({ '--f-strong': '#FAF3EE', '--f-soft': '#ffedea', '--f-muted': 'rgba(255,237,234,0.6)' } as React.CSSProperties)
      }
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <button
              onClick={() => onNavigate('beranda')}
              className="font-serif text-xl md:text-2xl text-[var(--f-strong)] block mb-3 hover:opacity-90 focus:outline-none"
            >
              FAISHA
            </button>
            <p className="text-sm text-[var(--f-soft)]/70 mb-6 leading-relaxed">
              A restorative sanctuary for inner discovery, fragrance rituals, and soul alignment.
            </p>
            <p className="text-xs text-[var(--f-soft)]/75">
              © 2026 FAISHA. All rights reserved.
            </p>
          </div>

          {/* Explore Col */}
          <div className="col-span-1">
            <p className="font-semibold text-sm uppercase tracking-wider text-[var(--f-strong)] mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('journey')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  The Journey
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('rituals')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Rituals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journal')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Sanctuary Shop
                </button>
              </li>
              {/* FIX_PLAN #21: PDP links — footer "kurang lengkap" (031/043) */}
              <li>
                <button
                  onClick={() => onNavigate('product-simple')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Signature Candle (028)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product-oos')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Amber Glow (032)
                </button>
              </li>
              {/* FIX_PLAN #19: Community turun dari primary nav */}
              <li>
                <button
                  onClick={() => onNavigate('community')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Community
                </button>
              </li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="col-span-1">
            <p className="font-semibold text-sm uppercase tracking-wider text-[var(--f-strong)] mb-4">
              Support
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onOpenLegal?.('shipping')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Shipping & Handling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal?.('shipping')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Sanctuary Returns
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('support')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('community')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Community Gatherings
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="col-span-1">
            <p className="font-semibold text-sm uppercase tracking-wider text-[var(--f-strong)] mb-4">
              Principles
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onOpenLegal?.('privacy')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal?.('terms')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                {/* Sustainability: toast dummy → route nyata About (/005) */}
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  Sustainability & Sourcing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="text-[var(--f-soft)]/75 hover:text-[var(--f-strong)] hover:underline transition-all"
                >
                  About The Founder
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#BDA494]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--f-soft)]/60 gap-4">
          <p>Hand-poured pure botanical fragrances & mindful soul alignment.</p>
          <div className="flex items-center gap-6">
            <span>Clean Formulation</span>
            <span>•</span>
            <span>Ethical Glassware</span>
            <span>•</span>
            <span>Mindful Living</span>
          </div>
        </div>

        {/* FIX_PLAN #21: newsletter bar — footer terlalu kosong (061/090) */}
        <form
          className="mt-10 pt-8 border-t border-[#BDA494]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <p className="text-sm font-semibold text-[var(--f-strong)] mb-1">Sanctuary Letters</p>
            <p className="text-xs text-[var(--f-soft)]/60">Ritual bulanan & aroma notes — tanpa spam. (MOCK — demo)</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              placeholder="email@sanctuary.id"
              aria-label="Email newsletter"
              className="flex-1 sm:w-64 h-10 px-4 rounded-full bg-transparent border border-[var(--f-muted)]/40 text-sm text-[var(--f-strong)] placeholder:text-[var(--f-soft)]/40 focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 px-5 rounded-full bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};
