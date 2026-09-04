import React from 'react';
import { NavTab, Language } from '../types';
import { ShoppingBag, User, Menu, X, Sparkles, Globe, RefreshCw, Search } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenAssessment: () => void;
  lang: Language;
  onToggleLang: () => void;
  isReturning: boolean;
  onToggleReturning: () => void;
  onSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenProfile,
  lang,
  onToggleLang,
  isReturning,
  onToggleReturning,
  onSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!profileMenuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setProfileMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProfileMenuOpen(false);
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [profileMenuOpen]);

  const primaryNavItems: { id: NavTab; labelId: string; labelEn: string }[] = [
    // User 2026-09-04: nav = Home | The Journey | Rituals | Journal | Shop | About | Community (mengalahkan FIX_PLAN #19)
    { id: 'beranda', labelId: 'Home', labelEn: 'Home' },
    { id: 'journey', labelId: 'The Journey', labelEn: 'The Journey' },
    { id: 'rituals', labelId: 'Rituals', labelEn: 'Rituals' },
    { id: 'journal', labelId: 'Journal', labelEn: 'Journal' },
    { id: 'shop', labelId: 'Shop', labelEn: 'Shop' },
    { id: 'about', labelId: 'About', labelEn: 'About' },
    { id: 'community', labelId: 'Community', labelEn: 'Community' },
  ];

  const handleNavClick = (tab: NavTab) => {
    soundEngine.playSoftClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-header border-b border-[#BDA494]/30 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1400px] mx-auto h-16 md:h-20">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('beranda')}
            className="font-serif text-2xl md:text-3xl tracking-tight text-[#433139] hover:opacity-80 transition-opacity focus:outline-none"
          >
            FAISHA
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5">
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-[0.06em] font-semibold transition-all duration-300 relative py-1 focus:outline-none whitespace-nowrap ${
                  isActive 
                    ? 'text-[#433139] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#433139]'
                    : 'text-[#4d4448] hover:text-[#433139]'
                }`}
              >
                {lang === 'id' ? item.labelId : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Trailing Action Icons */}
        <div className="flex items-center space-x-2 md:space-x-3 text-[#433139]">
          
          {/* Language Toggle (ID / EN) */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onToggleLang();
            }}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#433139] bg-[#ffffff] hover:bg-[#F2E9E5] px-2.5 py-1 rounded-full border border-[#BDA494]/40 transition-colors shadow-2xs"
            title="Switch Language (ID / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-[#5B4750]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Search Button (always visible, mock navigate to /search) */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onSearch();
            }}
            className="p-2 text-[#433139] hover:text-[#5B4750] transition-colors focus:outline-none rounded-full hover:bg-[#F2E9E5]"
            aria-label="Cari produk"
            title="Cari produk"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* User Profile Avatar / Initial S with mock returning toggle — FIX_PLAN #16: profile sebelum cart */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                soundEngine.playSoftClick();
                setProfileMenuOpen((open) => !open);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F7F1EE] border border-[#BDA494] text-[#433139] hover:bg-[#F2E9E5] transition-all hover:scale-105 focus:outline-none"
              aria-label="Sarah's Profile & Results"
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
              title="Sarah's Profile"
            >
              <span className="font-sans font-bold text-xs">S</span>
            </button>
            {profileMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-11 w-56 rounded-xl bg-[#FAF3EE] border border-[#BDA494]/40 shadow-lg p-2 space-y-1 z-50"
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#5B4750]" />
                  <span>{lang === 'id' ? 'Profil & Hasil Saya' : 'My Profile & Results'}</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onToggleReturning();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#5B4750]" />
                  <span>
                    {isReturning
                      ? lang === 'id' ? 'Keluar (Mock)' : 'Sign Out (Mock)'
                      : lang === 'id' ? 'Switch to Returning (Mock)' : 'Switch to Returning (Mock)'}
                  </span>
                </button>
                {/* P0 wiring: CTA masuk ke kanvas yang sebelumnya mati (065, 080-082, 091-092, 096/100) */}
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    soundEngine.playSoftClick();
                    setActiveTab('auth');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#5B4750]" />
                  <span>{lang === 'id' ? 'Masuk / Daftar (065)' : 'Sign In (065)'}</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    soundEngine.playSoftClick();
                    setActiveTab('dashboard-full');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#5B4750]" />
                  <span>{lang === 'id' ? 'Dashboard Lengkap (080-082)' : 'Full Dashboard (080-082)'}</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    soundEngine.playSoftClick();
                    setActiveTab('admin');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#5B4750]" />
                  <span>{lang === 'id' ? 'Admin (091-094)' : 'Admin (091-094)'}</span>
                </button>
                {/* FIX_PLAN #17: assessment openers dipindah ke CTA header desktop (modal 7-layer) — drawer & menu sisakan non-assessment */}
                {/* 5 Defer mockup demo 2026-09-04: 083,084,086,087 (077 ada di account flow) */}
                {([
                  ['community-member', lang === 'id' ? 'Community Member (083)' : 'Community Member (083)'],
                  ['event-detail', 'Event Detail (084)'],
                  ['academy', 'Academy (086)'],
                  ['academy-module', 'Modul Academy (087)'],
                  ['journal-private', 'Jurnal Privat (088)'],
                  ['journal-editor', 'Editor Jurnal (089)'],
                  ['community-join', lang === 'id' ? 'Daftar Community (085)' : 'Join Community (085)'],
                ] as [NavTab, string][]).map(([tab, label]) => (
                  <button
                    key={tab}
                    role="menuitem"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      soundEngine.playSoftClick();
                      setActiveTab(tab);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#5B4750]" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Button with badge count — paling kanan per owner 014/018 */}
          {/* a11y: nama aksesibel harus memuat teks visible (badge count) — Lighthouse label-content-name-mismatch */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onOpenCart();
            }}
            className="relative p-2 text-[#433139] hover:text-[#5B4750] transition-colors focus:outline-none rounded-full hover:bg-[#F2E9E5]"
            aria-label={`View Shopping Cart (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#5b4750] text-[#d1b6c1] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#433139] focus:outline-none rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Extended Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF3EE] border-b border-[#BDA494]/30 px-6 py-5 space-y-4 animate-fadeIn max-h-[80vh] overflow-y-auto">
          
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78555d] block">
              {lang === 'id' ? 'Navigasi Santuari' : 'Sanctuary Navigation'}
            </span>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-3 text-xs uppercase tracking-wider font-semibold rounded-xl transition-colors ${
                    activeTab === item.id ? 'bg-[#5B4750] text-[#FAF3EE] font-bold' : 'text-[#4d4448] hover:bg-[#F2E9E5]'
                  }`}
                >
                  {lang === 'id' ? item.labelId : item.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#BDA494]/20 flex gap-2">
            {/* CTA teks desktop dihapus (team_catatan 003/004/008/010/015) — akses via ikon profil/keranjang di atas */}
            <span className="w-full text-center text-[10px] text-[#7f7478] py-2">
              {lang === 'id'
                ? 'Gunakan ikon profil & keranjang di atas — tes 7-Layer via menu profil (desktop) atau Rituals'
                : 'Use the profile & cart icons above — 7-Layer Quiz via the profile menu (desktop) or the Rituals menu'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
