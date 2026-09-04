import React from 'react';

// SEQ 025 Sleep Ritual — SIMPLE PERFECTED (2026-09-03). Ref html/025 belum final → BUKAN 1:1 mentah.
// Intent ref dipertahankan: dark hero (gambar + scrim gelap, teks terang) + variant pills.
// Disederhanakan: 4 langkah bergambar → 3 langkah teks (pola sama dgn 022), produk 4 → 2 kartu,
// CTA soft pill #F2E9E5. Disclaimer medis TETAP (governance: klaim kesehatan harus terkontrol).
// Variant / step text / product name / harga / URL gambar = literal dari html/025.
// Spacing arbitrary value; JANGAN token --spacing-* Tailwind v4 (tabrak namespace max-w-*).

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDD6SOqWyhn3IENsWCZQu7zLWDF2wpMNfODInJ4wXv5G1ywO-AfZdaVPW3D8d0hpS04eQCELLIkXgXpUbqcdS2tIwBDbFUthR3zc3-BSvgPo0c1Rl7NMREmg4-J_uBsZvgjGQi6T8rIFt41gojlYkxwVMNXqDRJ-JvMnta3pDw16rrLeW4YprNjgBRuY6OTzGOS5hzo2jp7KKKhEqwzABhDLEfDhcenJ272VqOduUlRT69JnwEZ4MCws7hBqJDkyyz78hzU-c4nI1I';

const VARIANTS = ['Tidur Nyenyak', 'Melepas Stres', 'Mimpi Indah'];

const STEPS = [
  { n: '01', text: 'Semprotkan pillow mist lavender.' },
  { n: '02', text: 'Nyalakan lilin Tranquil Night 30 menit sebelum tidur.' },
  { n: '03', text: 'Tulis satu hal yang ingin kamu lepaskan hari ini.' },
];

const PRODUCTS = [
  {
    name: 'Tranquil Night Candle',
    price: 'Rp 209.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEXxdnxBglcccq7hrcJbm3PajuXCoXI3tRflrmj4siSDdIpJeCKUd-f8rJxtPNl8jlvjfYeXcZaVwy7ajicLnuAd-7LmVslUvx69v8lXn07G6RGCZCJF8UHI9nkOvYVa5M-7DtWtWgqdc5FLdR3A10nzToRnmmnMhk538FSsXb6Rt4PfOhYyP_lsq6LJeiwW6QcO06Q2rU2rwCKx3iIVO3CopR7DITetlg75HxynfHrdScngvQpytuB6BDeuMGHDbaTgemOgvkd7Y',
  },
  {
    name: 'Lavender Dream Pillow Mist',
    price: 'Rp 149.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMU99lNexL8ycOUVakai6sy8GdbRLZWUdsmCcqRh9ik_8oLQjQsr3fiQiWNHDJREmv7SuvW5iXj4U1vs2jJ46wYBfjJk_v35kRKpZOK3emW3Pn-fk8W4n-ixsqJT1Df86VvYRgxwF9kuOAVRYML7ly6j50Hjreca-rIkbzgENwo9bc48i7cLA6WQHcJuXva0htuRmQLJ0XQYmzwYq_b8jx0AKMCtjhPtgvGJued6eYrI7QE5oUGNhq3-M4DRB_LQPUznJe4LQIEtU',
  },
];

const H2 = 'font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#433139]';
const SOFT_PILL =
  'w-full py-3 rounded-full bg-[#F2E9E5] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-[#E7DBD6] transition-colors cursor-pointer';

interface SleepRitualScreenProps {
  onAddToCart?: (productName: string) => void;
  onSelectVariant?: (variant: string) => void;
}

export const SleepRitualScreen: React.FC<SleepRitualScreenProps> = ({ onAddToCart, onSelectVariant }) => {
  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10 md:pt-16 pb-[100px] flex flex-col gap-16">
      {/* ── Dark hero — intent html/025: gambar + scrim, teks terang rata bawah ── */}
      <section className="relative w-full h-[320px] md:h-[440px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.06)]">
        <img
          alt="Kamar tidur senja dengan lampu hangat, linen, lilin, dan jurnal di nakas"
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_IMG}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#291714]/70 via-[#291714]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-[#FAF3EE] md:text-[48px] md:leading-[56px]">
            Sleep Ritual
          </h1>
          <p className="mt-3 text-[18px] leading-[28px] text-[#FAF3EE]/90 max-w-2xl">
            Lepaskan hari dengan lembut, sambut istirahat yang memulihkan.
          </p>
        </div>
      </section>

      {/* ── Variant pills — intent html/025 ── */}
      <section>
        <div className="flex flex-wrap gap-4">
          {VARIANTS.map((v, i) => (
            <button
              key={v}
              onClick={() => onSelectVariant?.(v)}
              aria-pressed={i === 0}
              className={
                i === 0
                  ? 'px-6 py-3 rounded-full bg-[#F2E9E5] border border-[#433139] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold cursor-pointer'
                  : 'px-6 py-3 rounded-full bg-[#fff8f7] border border-[#d0c3c7]/60 text-[#4d4448] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:border-[#433139] hover:text-[#433139] transition-colors cursor-pointer'
              }
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      {/* ── Ritual Tidurmu — 3 langkah ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Ritual Tidurmu</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4 items-start bg-[#fff8f7] border border-[#d0c3c7]/30 rounded-xl p-6">
              <span className="w-10 h-10 rounded-full bg-[#F2E9E5] flex items-center justify-center shrink-0 text-[12px] leading-[16px] tracking-[0.06em] font-bold text-[#433139]">
                {s.n}
              </span>
              <p className="pt-2 text-[16px] leading-[24px] text-[#291714]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Esensial Ritual — 2 kartu produk ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Esensial Ritual</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRODUCTS.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col rounded-xl overflow-hidden bg-[#fff8f7] border border-[#d0c3c7]/30 hover:border-[#433139]/30 transition-colors"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={p.image}
                />
              </div>
              <div className="p-6 flex flex-col gap-1">
                <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-[#291714]">{p.name}</h3>
                <p className="text-[16px] leading-[24px] text-[#4d4448] mb-4">{p.price}</p>
                <button onClick={() => onAddToCart?.(p.name)} className={SOFT_PILL}>
                  Tambah
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Disclaimer medis — dipertahankan dari html/025 (governance) ── */}
      <section className="bg-[#F2E9E5] rounded-xl p-8 text-center">
        <span className="material-symbols-outlined text-[22px] text-[#5B4750] block mb-2">info</span>
        <p className="text-[16px] leading-[24px] text-[#4d4448] italic max-w-2xl mx-auto">
          Ritual ini dirancang untuk relaksasi dan kenyamanan, bukan pengganti penanganan medis untuk gangguan tidur.
        </p>
      </section>
    </main>
  );
};
