import React, { useState } from 'react';
import { CartItem } from '../types';
import { soundEngine } from '../utils/audio';
import { useModalA11y } from '../utils/useModalA11y';
import { X, Plus, Minus, ShoppingBag, Trash2, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  // P0 wiring: hantar ke kanvas 038 "Tinjau Pesananmu" alih-alih simulasi.
  onCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // KRIT-6/7 fix 2026-09-04: Escape → close + body scroll lock.
  useModalA11y(isOpen, onClose);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  // FIX_PLAN #9: currency Rp konsisten (semua harga rail "Rp x.000"); ongkir 0/9 ribu Rp
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9;
  const total = Math.max(0, subtotal - discount + shipping);
  const fmtRp = (n: number) => `Rp ${n.toLocaleString('id-ID')}.000`;

  const freeShippingThreshold = 100;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SANCTUARY10' || promoCode.trim().toUpperCase() === 'FAISHA') {
      soundEngine.playSingingBowl(528);
      setPromoApplied(true);
    } else {
      soundEngine.playSoftClick();
    }
  };

  const handleCheckout = () => {
    soundEngine.playSingingBowl(432);
    // FIX_PLAN #10: branch orderCompleted dihapus (dead code — App selalu pass onCheckout)
    onCheckout?.();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#291714]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF3EE] border-l border-[#BDA494]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#BDA494]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#5B4750]" />
              <h2 className="font-serif text-xl font-semibold text-[#433139]">
                Sanctuary Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#7f7478] hover:text-[#433139] hover:bg-[#F2E9E5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4 text-[#7f7478]">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] mx-auto text-[#BDA494]" />
                <p className="font-serif text-lg text-[#433139]">Your bag is currently serene and empty.</p>
                <p className="text-xs max-w-xs mx-auto">Discover which fragrance resonates with your current alignment layer.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#5B4750] text-[#FAF3EE] text-xs font-semibold uppercase tracking-wider mt-2"
                >
                  Explore Sanctuary
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress bar */}
                <div className="bg-[#F7F1EE] p-3.5 rounded-xl border border-[#BDA494]/25 space-y-1.5">
                  <div className="flex justify-between text-xs text-[#433139]">
                    <span className="font-semibold">
                      {subtotal >= freeShippingThreshold ? '✨ Complimentary Sanctuary Shipping unlocked!' : `Add ${fmtRp(freeShippingThreshold - subtotal)} more for free shipping`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#FAF3EE] rounded-full overflow-hidden border border-[#BDA494]/20">
                    <div 
                      className="h-full bg-[#5B4750] rounded-full transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-4 p-3.5 rounded-xl bg-[#F7F1EE] border border-[#BDA494]/25 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-[#BDA494]/30"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-sm font-semibold text-[#433139] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#7f7478]">
                          {item.product.subtitle.split(' ')[0]} • Tier {item.product.alignmentLayer}
                        </p>
                        {/* FIX_PLAN #8: label MOCK — DRAFT_NON_PURCHASABLE */}
                        <span className="text-xs font-bold text-[#433139]">
                          {fmtRp(item.product.price)} <span className="text-[9px] font-normal text-[#7f7478]">(MOCK)</span>
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#FAF3EE] border border-[#BDA494]/40 rounded-full px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-[#78555d] hover:text-[#433139]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#433139]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-[#78555d] hover:text-[#433139]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#7f7478] hover:text-[#ba1a1a] p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. SANCTUARY10)"
                    className="flex-1 h-9 px-3 text-xs rounded-lg bg-[#ffffff] border border-[#BDA494]/40 focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 h-9 rounded-lg bg-[#F2E9E5] text-[#5B4750] text-xs font-bold uppercase tracking-wider border border-[#BDA494]/40 hover:bg-[#ebdcd6]"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <p className="text-xs text-[#3D6852] font-semibold">
                    ✓ 10% Sanctuary discount applied
                  </p>
                )}
              </>
            )}

          </div>

          {/* Footer & Checkout — FIX_PLAN #8/#11: bold DRAFT badge, CTA demo bukan purchase */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#BDA494]/20 bg-[#F7F1EE] space-y-4">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#7f7478] border border-[#BDA494]/40 rounded-full px-2 py-0.5">
                DRAFT — Non-Purchasable (MOCK)
              </span>
              <div className="space-y-1.5 text-xs text-[#4d4448]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#433139]">{fmtRp(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-[#3D6852]">
                    <span>Sanctuary Blessing (10%)</span>
                    <span>-{fmtRp(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Mindful Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : fmtRp(shipping)}</span>
                </div>
                <div className="pt-2 border-t border-[#BDA494]/20 flex justify-between text-base font-serif font-bold text-[#433139]">
                  <span>Total</span>
                  <span>{fmtRp(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-[#5B4750] text-[#FAF3EE] font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Lanjut ke Halaman Cart (demo)</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
