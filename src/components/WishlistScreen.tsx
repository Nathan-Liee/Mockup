import React from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { Heart, ArrowDown, Info, HeartCrack } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-078 "Wishlist-ku" (1:1 intent html/078).
// 4 kartu produk (normal / OOS+toggle / price-drop / secondary CTA) + empty state.
// Mock-only; tombol keranjang → shop (DRAFT_NON_PURCHASABLE).

interface WishlistScreenProps {
  onNavigate: (tab: NavTab) => void;
  onAddToCart?: (name: string) => void;
}

type CardKind = 'normal' | 'oos' | 'price-drop' | 'secondary';

const PRODUCTS: { name: string; price: string; oldPrice?: string; saved: string; img: string; kind: CardKind }[] = [
  {
    name: 'Cashmere Embrace Candle', price: 'Rp 219.000', saved: 'Disimpan 5 Mar', kind: 'normal',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1UWNouW6VhpN-ptWhevyp9BBVFt9xICdaoCd0xslbvyuiENdytRbFAfBajb0oJnTHTK-MmnuLpNDPe8o5baiMngK9HJrgHOl9_U_bpSGyLTs8y_239wws7Cnnp_ItRjtSuxgjXvsR6wNWV4bJVniDYaT5WPWyA9_DrWWvmamREzKzuKUtfPdtd7nOjXg2yB0B6ESFC8KktUbaCQPpXIyPR3CpTv1XZrXKL821Tfpr5Wh2kowMUd3kHMsO8',
  },
  {
    name: 'Amber Glow Diffuser', price: 'Rp 259.000', saved: 'Disimpan 5 Mar', kind: 'oos',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WNjd5S2rHUI7wUs_mLBU7eGfIUyTLkiPtVord4mzimymQNeYzTwLh8RCEcOdPuWgVd1IjeumhGyrHPMl5DMLLp__A85HSDAjh6QSoxtJuNTvvyUmmw2eo-ZTUBI8EMcSJtikFpj_FM5OZbesfw6bGAesI2VqofNmH1Em2rZbL4rQQSI4NmmKCGlbb3wsj95sWAgQ4MZCs8aYvEsyFnMkt7wWl1frQlSnj3yhZ22k5Bj10YbMto94CQ7Ms',
  },
  {
    name: 'Vanilla Comfort Spray', price: 'Rp 139.000', oldPrice: 'Rp 149.000', saved: 'Disimpan 5 Mar', kind: 'price-drop',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XgMJ-4lpRpzKqIaqUXxdcfMeVcsdfkl3-9i2mkSEwvoy0FdH62N2X8s-h4gRzJCGsfoe1IdWFPOcfnCQWn1ZWY5il0GB8y_E8ro1rT7YZnFX37Ov0gw3qokd8p8RH9DRQ9kFC3hZKbLgFdnErWpPRrSdty3yOzKNhevszwRi0Rk9CgZF5e-QSSiNQlMVR6dvIDlFJABdvlTeHyacDV4gwYnt8wNDVgkcZwsVP2ZvqgVW_WijetCmbT9w',
  },
  {
    name: 'Evening Reflection Journal', price: 'Rp 159.000', saved: 'Disimpan 5 Mar', kind: 'secondary',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1V-qpV3p8hFPNWfDyeAPxCiFRVImFpwEXFJ76jul6Qzy_RqHyffHoP_hws8PaGN0bhkPRot4fMrA-IMxT7mFFZGPjEpDyNHNVer1hBq2Xk5FGfuUlq0YxZVjG9o8yQckjm9aJ8ph92Mn_cw2cuk0cQ3Zdv58RDPbzwZO-kgRnF_sYCoPWIhijl2Mg91WIFCtHwL-XyqSpRXyBC8AmLlLPyxZegXT4ZTb-zu3XzkpJ9TvUGYtegGrwTz6A',
  },
];

export const WishlistScreen: React.FC<WishlistScreenProps> = ({ onNavigate, onAddToCart }) => {
  const go = (tab: NavTab) => onNavigate(tab);

  return (
    <AccountShell active="wishlist" onNavigate={go}>
      <header className="mb-12">
        <h2 className="text-[32px] leading-10 font-semibold text-[#433139] font-serif mb-1">Wishlist-ku</h2>
        <p className="text-base text-[#4d4448]">4 produk</p>
      </header>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {PRODUCTS.map((p) => (
          <article key={p.name} className={`flex flex-col group h-full ${p.kind === 'oos' ? 'opacity-80' : ''}`}>
            <div className={`relative w-full pt-[100%] rounded-xl overflow-hidden mb-4 bg-[#ffe2de]/30 ${p.kind === 'oos' ? 'grayscale-[20%]' : ''}`}>
              <img
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={p.img}
              />
              {p.kind === 'oos' && (
                <>
                  <div className="absolute inset-0 bg-[#433139]/10" />
                  <div className="absolute top-2 left-2 bg-[#fedbd6] text-[#4d4448] text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    Stok Habis
                  </div>
                </>
              )}
              {p.kind === 'price-drop' && (
                <div className="absolute top-2 left-2 bg-[#F2E9E5] text-[#433139] text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5" /> Harga turun!
                </div>
              )}
              <button
                aria-label="Hapus dari wishlist"
                className="absolute top-2 right-2 w-10 h-10 rounded-full bg-[#FAF3EE]/80 backdrop-blur flex items-center justify-center text-[#433139] hover:bg-[#ffe2de] transition-colors shadow-sm"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="text-[11px] text-[#4d4448]/70 mb-1 uppercase tracking-widest">{p.saved}</p>
              <h3 className="text-base font-semibold text-[#433139] mb-1 leading-snug">{p.name}</h3>
              <p className="text-lg text-[#291714] mb-4 flex items-center gap-2">
                {p.price}
                {p.oldPrice && <span className="text-[#4d4448]/60 line-through text-sm">{p.oldPrice}</span>}
              </p>
              <div className="mt-auto pt-2">
                {p.kind === 'oos' ? (
                  <label className="flex items-center justify-between p-3 border border-[#BDA494] rounded cursor-pointer hover:bg-[#ffe2de]/30 transition-colors">
                    <span className="text-[11px] text-[#4d4448] uppercase tracking-wider">Kabari saat tersedia</span>
                    <div className="relative">
                      <input checked className="sr-only peer" type="checkbox" readOnly />
                      <div className="w-9 h-5 bg-[#3D6852] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    </div>
                  </label>
                ) : p.kind === 'secondary' ? (
                  <button
                    onClick={() => go('shop')}
                    className="w-full h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded transition-colors hover:bg-[#ffe2de]/30"
                  >
                    Tambah ke Keranjang
                  </button>
                ) : (
                  <button
                    onClick={() => (onAddToCart ? onAddToCart(p.name) : go('shop'))}
                    className="w-full h-12 bg-[#433139] text-white text-sm font-semibold rounded transition-colors hover:bg-[#5B4750]"
                  >
                    Tambah ke Keranjang
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="text-center text-[11px] text-[#4d4448]/60 mt-8 flex items-center justify-center gap-1">
        <Info className="w-3.5 h-3.5" /> Notifikasi harga &amp; stok hanya jika kamu aktifkan
      </p>

      {/* Empty state (ghosted) */}
      <div className="mt-24 border-t border-[#d3b9a8]/20 pt-24 opacity-50 pb-16">
        <div className="text-center max-w-md mx-auto">
          <HeartCrack className="w-10 h-10 text-[#4d4448]/50 mx-auto mb-4 block" />
          <h3 className="text-base font-semibold text-[#4d4448] mb-2">Wishlist kosong — simpan produk yang kamu suka</h3>
          <p className="text-base text-[#4d4448]/70 mb-6">Temukan ritual baru untuk melengkapi keseharianmu.</p>
          <button
            onClick={() => go('shop')}
            className="px-8 h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded transition-colors"
          >
            Jelajahi Produk
          </button>
        </div>
      </div>
    </AccountShell>
  );
};
