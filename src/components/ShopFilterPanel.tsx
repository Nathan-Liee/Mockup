import React from 'react';

/**
 * Panel filter shop REUSABLE (extract dari 020) — controlled, tanpa grid, tanpa data produk.
 * Dipakai: desktop sidebar ShopScreen + mobile drawer ShopScreen (020 = alias drawer-open).
 * Kategori pakai taxonomy mockData (Candles/Botanical Waters/...) supaya sinkron dengan grid 019
 * — bukan taxonomy 020 lama yang milik grid 8-hardcode (sudah dihapus).
 */

const KATEGORI = ['Candles', 'Botanical Waters', 'Ritual Sets', 'Oils', 'Signature Musks'];
const RITUAL_CHIPS = ['Morning', 'Focus', 'Home', 'Sleep', 'Soul'];
const AVAILABILITY = ['Ready Stock', 'Pre-Order'];

export interface ShopFilterPanelProps {
  selectedCategories: string[];
  onToggleCategory: (c: string) => void;
  ritual: string | null;
  onSelectRitual: (r: string | null) => void;
  price: number;
  onPriceChange: (price: number) => void;
  avail: string[];
  onToggleAvail: (a: string) => void;
  /** Jumlah produk terfilter untuk label "N produk sesuai filter". */
  resultCount: number;
  onReset: () => void;
  onApply: () => void;
}

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({
  label, checked, onChange,
}) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="appearance-none w-4 h-4 shrink-0 rounded border border-outline bg-transparent checked:bg-primary-container checked:border-primary-container focus:ring-2 focus:ring-primary-container focus:ring-offset-2 focus:ring-offset-warm-ivory outline-none transition-colors"
    />
    <span
      className={`text-[16px] leading-[24px] transition-colors group-hover:text-[#433139] ${
        checked ? 'text-on-surface font-medium' : 'text-on-surface-variant'
      }`}
    >
      {label}
    </span>
  </label>
);

export const ShopFilterPanel: React.FC<ShopFilterPanelProps> = ({
  selectedCategories, onToggleCategory, ritual, onSelectRitual, price, onPriceChange,
  avail, onToggleAvail, resultCount, onReset, onApply,
}) => (
  <div className="flex flex-col h-full bg-warm-ivory">
    <div className="p-6 flex flex-col gap-8 overflow-y-auto flex-grow">
      {/* Kategori */}
      <div>
        <h3 className="font-serif text-lg font-semibold text-[#433139] mb-3">Kategori</h3>
        <div className="flex flex-col gap-2">
          {KATEGORI.map((c) => (
            <Checkbox key={c} label={c} checked={selectedCategories.includes(c)} onChange={() => onToggleCategory(c)} />
          ))}
        </div>
      </div>

      {/* Ritual */}
      <div className="pt-6 border-t border-[#BDA494]/40">
        <h3 className="font-serif text-lg font-semibold text-[#433139] mb-3">Ritual</h3>
        <div className="flex flex-wrap gap-2">
          {RITUAL_CHIPS.map((r) => {
            const active = r === ritual;
            return (
              <button
                key={r}
                onClick={() => onSelectRitual(active ? null : r)}
                className={`px-4 py-1 rounded-full border transition-colors cursor-pointer text-[11px] leading-[16px] tracking-[0.04em] font-medium ${
                  active
                    ? 'border-[#5B4750] bg-[#5B4750] text-[#FAF3EE]'
                    : 'border-[#BDA494] text-[#4d4448] bg-transparent hover:border-[#5B4750] hover:text-[#433139]'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Harga */}
      <div className="pt-6 border-t border-[#BDA494]/40">
        <h3 className="font-serif text-lg font-semibold text-[#433139] mb-3">Harga</h3>
        <div className="px-1">
          <input
            type="range"
            min={50}
            max={120}
            step={10}
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            aria-label="Harga maksimum"
            className="w-full accent-[#5B4750] cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-[11px] text-[#4d4448]">
            <span>$50</span>
            <span>$120</span>
          </div>
        </div>
      </div>

      {/* Ketersediaan */}
      <div className="pt-6 border-t border-[#BDA494]/40 pb-8">
        <h3 className="font-serif text-lg font-semibold text-[#433139] mb-3">Ketersediaan</h3>
        <div className="flex flex-col gap-2">
          {AVAILABILITY.map((a) => (
            <Checkbox key={a} label={a} checked={avail.includes(a)} onChange={() => onToggleAvail(a)} />
          ))}
        </div>
      </div>
    </div>

    <div className="p-6 border-t border-[#BDA494]/40 bg-[#F2E9E5] flex flex-col gap-2">
      <div className="text-[11px] text-[#4d4448] text-center">{resultCount} produk sesuai filter</div>
      <button
        onClick={onApply}
        className="w-full h-12 bg-[#5B4750] text-[#FAF3EE] rounded-full hover:opacity-90 transition-opacity cursor-pointer text-sm font-semibold"
      >
        Terapkan Filter
      </button>
      <button
        onClick={onReset}
        className="w-full h-10 border border-[#BDA494] text-[#4d4448] rounded-full hover:border-[#5B4750] hover:text-[#433139] transition-colors cursor-pointer text-xs font-medium"
      >
        Reset Semua
      </button>
    </div>
  </div>
);
