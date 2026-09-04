import React, { useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { NavTab, Product } from '../types';
import { useApp, ShopSortKey } from '../context';
import { soundEngine } from '../utils/audio';
import { useModalA11y } from '../utils/useModalA11y';
import { ShopFilterPanel } from './ShopFilterPanel';
import { Star, Heart, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';

interface ShopScreenProps {
  onAddToCart: (product: Product) => void;
  onOpenAssessment?: () => void;
  /** 'product' (klik kartu). Filter = drawer lokal, bukan navigate (fix dobel shop 019/020). */
  onNavigate?: (tab: NavTab) => void;
  /** 020 alias deep-link: render shop yang sama dengan drawer terbuka. */
  drawerOpenDefault?: boolean;
}

// NG-4 fix 2026-09-03: MOCK penanda stok habis (stok asli = CONTROLLED_TBD, tidak dikarang).
// Satu kartu demo → layar 032 "Stok Habis & Alternatif" (tema amber cocok dengan produk 032).
const OUT_OF_STOCK_IDS = ['davina-amber-musk'];

export const ShopScreen: React.FC<ShopScreenProps> = ({ onAddToCart, onNavigate, drawerOpenDefault }) => {
  const { shopFilters, setShopFilters } = useApp();
  const { selectedCategories, ritual, price, avail, sort, drawerOpen } = shopFilters;
  const setDrawerOpen = (open: boolean) => setShopFilters((f) => ({ ...f, drawerOpen: open }));
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // 020 alias deep-link → auto-open drawer sekali saat mount (URL langsung saja).
  useEffect(() => {
    if (drawerOpenDefault) setDrawerOpen(true);
  }, [drawerOpenDefault]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (list: string[], value: string, apply: (v: string[]) => void) => {
    soundEngine.playSoftClick();
    apply(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const setCategories = (v: string[]) => setShopFilters((f) => ({ ...f, selectedCategories: v }));
  const setAvail = (v: string[]) => setShopFilters((f) => ({ ...f, avail: v }));

  const resetAll = () => setShopFilters({
    selectedCategories: [], ritual: null, price: 120, avail: [], sort: 'sesuai', drawerOpen: false,
  });

  const panelProps = {
    selectedCategories,
    onToggleCategory: (c: string) => toggle(selectedCategories, c, setCategories),
    ritual,
    onSelectRitual: (r: string | null) => { soundEngine.playSoftClick(); setShopFilters((f) => ({ ...f, ritual: r })); },
    price,
    onPriceChange: (p: number) => setShopFilters((f) => ({ ...f, price: p })),
    avail,
    onToggleAvail: (a: string) => toggle(avail, a, setAvail),
    resultCount: 0, // diisi setelah filteredProducts (di bawah)
    onReset: () => { soundEngine.playSoftClick(); resetAll(); },
    onApply: () => setDrawerOpen(false),
  };

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (!selectedCategories.length || selectedCategories.includes(p.category))
      && (!avail.length || avail.includes(p.isDraftNonPurchasable ? 'Pre-Order' : 'Ready Stock'))
      && p.price <= price
    );
    // ritual: MOCK visual-only — mockData tidak punya field ritual; jangan karang data (DESIGN.md).
    // Chip ritual tidak memfilter grid; upgrade saat field ritual asli masuk mockData.
    if (sort === 'murah') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'mahal') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'terbaru') list = [...list].reverse();
    return list;
  }, [selectedCategories, ritual, avail, price, sort]);
  panelProps.resultCount = filteredProducts.length;

  const closeDrawer = () => setDrawerOpen(false);
  useModalA11y(drawerOpen, closeDrawer);

  const handleAdd = (product: Product) => {
    soundEngine.playSoftClick();
    onAddToCart(product);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10 md:pt-14 pb-16 w-full">
      {/* Header — token html/019: display-lg Playfair + body-lg on-surface-variant */}
      <header className="mb-12 text-center md:text-left flex flex-col items-center md:items-start max-w-2xl">
        <h1 className="font-display text-[38px] md:text-[48px] leading-[44px] md:leading-[56px] tracking-[-0.02em] font-semibold text-primary mb-2">Semua Produk</h1>
        <p className="text-[18px] leading-[28px] text-on-surface-variant">Kurasi produk ritual untuk setiap momen harianmu</p>
      </header>

      {/* Grid full-width — sidebar kiri dihapus (filter via drawer top bar, /020 alias). */}
      <div className="flex flex-col">
        {/* Product Grid Area */}
        <div className="w-full">
          {/* Grid Top Bar — token html/019 */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-[16px] leading-[24px] text-on-surface-variant">{filteredProducts.length} produk</span>
            <div className="flex items-center gap-2">
              {/* Filter = drawer overlay lokal (fix dobel shop: tidak navigate ke /020) */}
              <button
                onClick={() => { soundEngine.playSoftClick(); setDrawerOpen(true); }}
                aria-label="Buka filter"
                className="flex items-center gap-1.5 border border-outline-variant rounded text-[16px] leading-[24px] text-primary px-3 py-2 hover:bg-surface-tint transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
              <span className="text-[16px] leading-[24px] text-on-surface-variant hidden md:inline">Urutkan:</span>
              <select
                value={sort}
                onChange={(e) => { soundEngine.playSoftClick(); setShopFilters((f) => ({ ...f, sort: e.target.value as ShopSortKey })); }}
                aria-label="Urutkan produk"
                className="bg-transparent border border-outline-variant rounded text-[16px] leading-[24px] text-primary py-2 pl-3 pr-8 focus:outline-none focus:border-primary-container cursor-pointer"
              >
                <option value="sesuai">Paling Sesuai</option>
                <option value="terbaru">Terbaru</option>
                <option value="murah">Harga: Rendah ke Tinggi</option>
                <option value="mahal">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>

          {/* Grid — full width (tanpa sidebar), 4 kolom lg+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-8">
            {filteredProducts.map((product) => {
              const full = Math.floor(product.rating);
              const oos = OUT_OF_STOCK_IDS.includes(product.id);
              return (
                <article
                  key={product.id}
                  className="flex flex-col group cursor-pointer"
                  onClick={() => { soundEngine.playSoftClick(); onNavigate?.(oos ? 'product-oos' : 'product'); }}
                >
                  <div className="relative w-full aspect-[4/5] bg-surface-tint mb-4 overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggle(favorites, product.id, setFavorites); }}
                        aria-label={favorites.includes(product.id) ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                        className="p-2 bg-warm-ivory/80 backdrop-blur-sm rounded-full text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-primary-container text-primary-container' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-surface-tint text-primary px-3 py-1 rounded-full text-[11px] leading-[16px] tracking-[0.06em] font-medium uppercase">
                        {product.badge ?? product.alignmentLayer}
                      </span>
                    </div>
                    {product.isDraftNonPurchasable && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary-container text-warm-ivory px-3 py-1 rounded-full text-[12px] leading-[16px] tracking-[0.06em] font-bold">Coming Soon</span>
                      </div>
                    )}
                  </div>
                  {/* Token html/019: headline-md Playfair 20/32 -.01em 600 (card), label-sm rating */}
                  <h2 className="font-display text-[20px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-1">{product.name}</h2>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`w-4 h-4 ${i <= full ? 'fill-warning-honey text-warning-honey' : 'text-outline-variant'}`} />
                    ))}
                    <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-outline ml-1">({product.rating})</span>
                  </div>
                  {/* Harga = label-lg 14/20 .01em 600 primary; DRAFT pisah jadi badge, bukan campur. */}
                  <p className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold text-primary mb-4">
                    Rp {(product.price * 15500).toLocaleString('id-ID')}
                  </p>
                  {product.isDraftNonPurchasable && (
                    <span className="text-[12px] leading-[16px] tracking-[0.06em] font-bold text-on-surface-variant mb-2">
                      DRAFT_NON_PURCHASABLE
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                    className={`w-full h-[48px] rounded-full transition-colors mt-auto flex items-center justify-center gap-2 ${
                      addedNotice === product.id
                        ? 'bg-success-botanical text-warm-ivory'
                        : 'bg-primary-container text-warm-ivory hover:opacity-90'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-[12px] leading-[16px] tracking-[0.06em] font-bold">
                      {addedNotice === product.id ? 'Ditambahkan' : 'Tambah ke Keranjang'}
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer (020 sekarang alias deep-link state ini) ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Filter produk">
          <button
            onClick={closeDrawer}
            aria-label="Tutup filter"
            className="absolute inset-0 w-full h-full bg-black/20 backdrop-blur-[2px] cursor-default"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-warm-ivory shadow-[4px_0_24px_rgba(91,71,80,0.08)] flex flex-col animate-[slideIn_.2s_ease-out]">
            <div className="flex justify-between items-center p-4 border-b border-[#BDA494]/40">
              <h2 className="font-serif text-lg font-semibold text-[#433139]">Filter &amp; Urutkan</h2>
              <button
                onClick={closeDrawer}
                aria-label="Tutup filter"
                className="p-2 text-[#4d4448] hover:text-[#433139] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow min-h-0">
              <ShopFilterPanel {...panelProps} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
