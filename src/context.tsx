import { createContext, useContext } from 'react';
import type React from 'react';
import { NavTab, CartItem, Product, Language, LegalDoc } from './types';

/** Sort keys shop (019/020 satu source). */
export type ShopSortKey = 'sesuai' | 'terbaru' | 'murah' | 'mahal';

/** Shop filter state shared — dimiliki Router, dipakai ShopScreen (desktop sidebar + mobile drawer). */
export interface ShopFilters {
  selectedCategories: string[];
  ritual: string | null;
  price: number;
  avail: string[];
  sort: ShopSortKey;
  drawerOpen: boolean;
}

/**
 * Shared app state — App owns it, screens & modals consume it.
 * Ponytail: satu context besar (bukan split per-domain); split saat re-render jadi masalah nyata.
 */
export interface AppState {
  activeTab: NavTab;
  goTab: (tab: NavTab) => void;
  lang: Language;
  toggleLang: () => void;
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  addMockToCart: (name: string, priceLabel: string, image: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
  isReturning: boolean;
  toggleReturning: () => void;
  legalDoc: LegalDoc;
  setLegalDoc: (doc: LegalDoc) => void;
  // Shop filter (019/020) — single source; 020 = alias deep-link drawer-open.
  shopFilters: ShopFilters;
  setShopFilters: React.Dispatch<React.SetStateAction<ShopFilters>>;
}

export const AppCtx = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp di luar AppCtx.Provider');
  return ctx;
}
