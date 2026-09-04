import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';

/**
 * STRICTLY MOCKUP (SEQ 033) — 1:1 faisha-gallery/html/033_2cd16d67a3514bfcb915c27e268f86d4.html (baris 171-379).
 * Nav & Footer tidak dirender: sudah global di App.tsx (Header.tsx / Footer.tsx).
 * Caller: App.tsx route `activeTab === 'bundle-composer'` (dihubungkan 2026-09-03; sebelumnya yatim).
 *
 * TRANSLASI TOKEN CDN → TAILWIND v4 (arbitrary value, BUKAN token --spacing-* — lihat komentar index.css):
 *   spacing  xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 3xl=64 · margin-mobile=16→px-4 · margin-desktop=40→px-10
 *            section-desktop=100→pb-[100px]
 *   type     display-lg=48/56 -.02em 600 · display-lg-mobile=38/44 · headline-md=24/32 · title-lg=22/28
 *            title-md=16/24 .01em 600 · body-lg=18/28 · body-base=16/24 · body-bold=16/24 600
 *            label-sm=11/16 .04em 500 · label-lg=14/20 .01em 600
 *   warna    surface-tint ref-033 = #F2E9E5 (SAMA dengan @theme → dipakai sebagai token).
 *            bg-white kartu = surface-container-lowest #ffffff.
 *
 * PERBAIKAN QA terhadap port lama: max-w-7xl (1280px) → max-w-[1200px] sesuai ref; border kartu
 * unselected dikembalikan ke border-outline-variant penuh (ref L208, bukan /30); pt-[120px] flat.
 * URL gambar /aida/ (non-public) di ref MATI → dipakai padanan aida-public yang hidup.
 *
 * GOVERNANCE: harga di html/033 = literal ref, BUKAN hitungan. Semua opsi dalam satu langkah punya
 * harga identik (189/129/149) → Subtotal 467.000 · Hemat 10% 46.700 · TOTAL 420.300 tetap benar
 * untuk kombinasi apa pun, jadi angka dibiarkan literal (tidak ada aritmetika yang mengarang nilai baru).
 * CTA "Tambah Set ke Keranjang" = DRAFT_NON_PURCHASABLE → hanya callback demo, tidak enable payment.
 * "invalid-combination" TIDAK ada di html/033 → tidak dikarang (lihat laporan).
 */

interface Option {
  name: string;
  price: string;
  image: string;
}

const STEPS: { step: number; title: string; unit: string; options: Option[] }[] = [
  {
    step: 1,
    title: 'Pilih Lilinmu',
    unit: 'Lilin',
    options: [
      {
        name: 'Calm Morning Candle',
        price: 'Rp 189.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCVj3qwErw_QUEAUBrbwMfvOn3GI9suR0lugJyuoo3bqH8EjuiHXHVVHB2a7e1EvOJiXn9Wvfi6MM_BJZz-KX9AqRApir8LYQ0vIgc3o9Ct02dRxBwsTMlsOxHGfjDXkiDAWYSPvVwgy1TFnzE7QhS201l7oUd3b0N6kUzRHwh52tOhFaF4wHPKRfl4m1JJD51qCQVfjZtg0ESRAyCJG18IK4pZil_GsljiphH_4bQ5RHcMDT5C18mlRT6uXKlJ9A6KlMWZOpL6bLY',
      },
      {
        name: 'Citrus Sunrise Candle',
        price: 'Rp 189.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDeKKS4QJr--JjXylyPn44v_a3TVj7REAN7-52Ourhp24WPgvtc7SEgFujko6d2gkvjUCZiq6udpr3Y2TTP6Eyd1R6PzLKHGtT3RCX7ZCtG4wKtL0TScTlrRBXEvsTEHfyccmmNKB-bbV7bgumbsFJLB007Que9YnKiWlrzG_IfnFHHnjIjl9dHTkjTfjOtPMGTqcd-jYYfI37dEhnlOdbTZEaqS-GP41hsJnzN4VQdD_L-fkQo-V3exvJxifLxRbeQit7lBtKWCHw',
      },
      {
        name: 'Gentle Awakening Candle',
        price: 'Rp 189.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAEXxdnxBglcccq7hrcJbm3PajuXCoXI3tRflrmj4siSDdIpJeCKUd-f8rJxtPNl8jlvjfYeXcZaVwy7ajicLnuAd-7LmVslUvx69v8lXn07G6RGCZCJF8UHI9nkOvYVa5M-7DtWtWgqdc5FLdR3A10nzToRnmmnMhk538FSsXb6Rt4PfOhYyP_lsq6LJeiwW6QcO06Q2rU2rwCKx3iIVO3CopR7DITetlg75HxynfHrdScngvQpytuB6BDeuMGHDbaTgemOgvkd7Y',
      },
    ],
  },
  {
    step: 2,
    title: 'Pilih Spray-mu',
    unit: 'Spray',
    options: [
      {
        name: 'Citrus Awakening Spray',
        price: 'Rp 129.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCposUSZ1_1qt5S68Au4cz5Jx3gqNj5kFH8FLNhhxgwhLQKVwhPpPEM9f6CDpFMP3dfjVaOp8iQMHlLhp2w6qf4s1pHQOU0mDjOrxyqSrKahyyMfkt2zCJpn-VX69gSvmsEO_MceGLYm3bzsB4S08qFDp6YAvuya7s52DvTGI3EfqYCmRlxrxaDbIltH6RX166ggi5RfVwOsjPvuL6Oc_XZtcy6_lsSUJTK6biJK862FpUnZX2T7eKXk1HQRy_S2znrWc4-Hkh4L9g',
      },
      {
        name: 'Morning Dew Spray',
        price: 'Rp 129.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAMU99lNexL8ycOUVakai6sy8GdbRLZWUdsmCcqRh9ik_8oLQjQsr3fiQiWNHDJREmv7SuvW5iXj4U1vs2jJ46wYBfjJk_v35kRKpZOK3emW3Pn-fk8W4n-ixsqJT1Df86VvYRgxwF9kuOAVRYML7ly6j50Hjreca-rIkbzgENwo9bc48i7cLA6WQHcJuXva0htuRmQLJ0XQYmzwYq_b8jx0AKMCtjhPtgvGJued6eYrI7QE5oUGNhq3-M4DRB_LQPUznJe4LQIEtU',
      },
      {
        name: 'White Tea Mist',
        price: 'Rp 129.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBrkZ-sX1wUXRPWDvw-5AIxXSOiGRATJI-bQHIxO67QdL7g0suPbd1EmIoTzQBgTZu0r74TnQyaKI6G9yOO0KQx58ZyYIVGg-DTM0afZGXGJCmKEyl6GrkDz70zV3aYqxIEg_ZP6PA98rRNp_piT7mpbQmEGu0iWeUQYO4WJ95O5PtfEU_3cjHEOic2WUJojytNAE4z9Uyq9RfNEdRVbJsW1SUWc2SGg7VbPzf9oW641GRFxUjaoc7rZ2ORKbPSLKxjUB-vdzrSAyk',
      },
    ],
  },
  {
    step: 3,
    title: 'Pilih Jurnalmu',
    unit: 'Jurnal',
    options: [
      {
        name: 'Gratitude Journal',
        price: 'Rp 149.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCUh5wp8qWS8RAHlV8Gcnir2TKV8Cbq1Bl2gQxs3jfqeukUAjlJg6e61lTE3nki3lZcDYzAppD1GvW7-Jd4X1OsgK8Wy81zfw8owl4PW-ZOGgQiCP7sd3vmtLhYtUGf0lOsXB5sfEpdEjelIRiRphs3kJFMstjH0FcKeJaddrPE4TTfxVOahOHAKouwhLiL7Mm3fZTQZJemcdp9RMxoQ-OFRJtJaHNZcFItACWYtLkGb093NNBepVNvnop-bPRcIuo1xanztQbHKrE',
      },
      {
        name: 'Morning Pages Journal',
        price: 'Rp 149.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAR_WGAmzLRSxIyLBdD088zHxMAIqT92LPLx7z35P-FsQ7drIpf7FevUb6ssNwwyNPjLiw1Sxbg80nAXGAKdfXN0Lu879nPXJBL00Fcz3PC6hlYHhpgwWEHRL1zl5MjpXNPBrrRqzZYo818yX7XEo8bdK7jETMAkN8v0JujqPHaQ0mCYCsg4fWB813FiggNwW3MsKZgcQ66quIWyl2PLB3sspN5t3pa9YV1Ufq-bNYEGEXNckOCtXt5BunOBixfKJfd__kO1oC6wO8',
      },
      {
        name: 'Mindful Start Journal',
        price: 'Rp 149.000',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDGY-1TX6Y0S55vvoWnQHAwBnyvHHGQCC4ojC80aFALFIxon8b4PdVNhbtm1NZKe0uFl3s_q6NMiDnPJGUZLRF5AQ-l6vqiRPUDVyFSeHlHB92CqFnoemGL-v6hxd3DeD63f7-NMYz6RBRHfESFqCWHwClE-3_joPqk2U52bffhMqG8t8JHkeepZ51IA-l85AgOALZAPfMCvOdR_mXjtEgRRKc6IfP1nC6iX5Rt0OE9eqvBj9IB6lRajjs_9ecJCQx0ntRgFAgCYbM',
      },
    ],
  },
];

// Ringkasan harga — literal html/033 L352-364. Invarian terhadap pilihan (harga seragam per langkah).
const PRICE = { subtotal: 'Rp 467.000', discount: '-Rp 46.700', total: 'Rp 420.300' };

interface BundleComposerScreenProps {
  onSelectOption?: (productName: string) => void;
  onAddBundle?: () => void;
  /** INTEGRASI ORGANIK Group B: panggil pengubah tab App.tsx, bukan URL. */
  onNavigate?: (tab: string) => void;
}

export const BundleComposerScreen: React.FC<BundleComposerScreenProps> = ({ onSelectOption, onAddBundle, onNavigate }) => {
  // Radio per langkah; default = kartu pertama tiap langkah, sama seperti state statis html/033.
  const [picked, setPicked] = useState<number[]>(STEPS.map(() => 0));
  const selectedItems = STEPS.map((s, i) => ({ ...s.options[picked[i]], unit: s.unit }));

  const pick = (si: number, oi: number, name: string) => {
    soundEngine.playSoftClick();
    setPicked((prev) => (prev[si] === oi ? prev : prev.map((v, i) => (i === si ? oi : v))));
    onSelectOption?.(name);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-[120px] pb-[100px]">
      {/* ── Hero Section — html/033 L173-176 ── */}
      <header className="mb-16 text-center md:text-left">
        <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-primary mb-2 md:text-[48px] md:leading-[56px]">
          Susun Morning Sanctuary Set-mu
        </h1>
        <p className="text-[18px] leading-[28px] text-on-surface-variant">
          Pilih produk favoritmu dan hemat 10% untuk set lengkap.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* ── Left Column: Step Selection — html/033 L179-313 ── */}
        <div className="lg:w-2/3 flex flex-col gap-12">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-px bg-outline-variant/50 relative">
              <div className="absolute inset-y-0 left-0 bg-primary w-full transition-all duration-500" />
            </div>
            <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-primary uppercase tracking-widest">
              3 dari 3 langkah selesai
            </span>
          </div>

          {STEPS.map((s, si) => (
            <section key={s.step} className={si < STEPS.length - 1 ? 'border-b border-outline-variant/30 pb-12' : ''}>
              <h2 className="text-[22px] leading-[28px] font-semibold text-primary mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-surface-tint flex items-center justify-center text-primary text-[16px] leading-[24px] font-semibold">
                  {s.step}
                </span>
                {s.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {s.options.map((o, oi) => {
                  const active = picked[si] === oi;
                  return (
                    <button
                      key={o.name}
                      onClick={() => pick(si, oi, o.name)}
                      aria-pressed={active}
                      className={
                        active
                          ? 'text-left group rounded-lg overflow-hidden border-2 border-primary bg-surface-tint relative cursor-pointer'
                          : 'text-left group rounded-lg overflow-hidden border border-outline-variant bg-white hover:border-primary/50 transition-colors cursor-pointer'
                      }
                    >
                      {active && (
                        <span className="absolute top-2 right-2 bg-primary text-warm-ivory w-6 h-6 rounded-full flex items-center justify-center z-10">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </span>
                      )}
                      <div className="aspect-square bg-white relative overflow-hidden">
                        <img
                          alt={o.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={o.image}
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-primary mb-1">
                          {o.name}
                        </h3>
                        <p className="text-[16px] leading-[24px] text-on-surface-variant">{o.price}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* ── Right Column: Sticky Summary — html/033 L315-377 ── */}
        <aside className="lg:w-1/3 relative">
          <div className="lg:sticky lg:top-[100px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
            <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-primary mb-6 border-b border-outline-variant/30 pb-2">
              Ringkasan Set-mu
            </h2>

            {/* Selected Items List */}
            <ul className="flex flex-col gap-4 mb-6">
              {selectedItems.map((item) => (
                <li key={item.unit} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-tint shrink-0">
                    <img alt={`${item.name} Thumbnail`} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] leading-[20px] font-semibold text-primary line-clamp-1">{item.name}</h4>
                    <p className="text-[14px] leading-[20px] text-on-surface-variant">{item.unit}</p>
                  </div>
                  <span className="text-[16px] leading-[24px] font-semibold text-primary">{item.price}</span>
                </li>
              ))}
            </ul>

            {/* Price Breakdown */}
            <div className="border-t border-outline-variant/30 pt-4 mb-6 flex flex-col gap-2">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="text-[16px] leading-[24px]">Subtotal</span>
                <span className="text-[16px] leading-[24px]">{PRICE.subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-primary-container">
                <span className="text-[16px] leading-[24px]">Hemat 10% (Set Diskon)</span>
                <span className="text-[16px] leading-[24px]">{PRICE.discount}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/30">
                <span className="text-[22px] leading-[28px] font-semibold text-primary">TOTAL</span>
                <span className="text-[22px] leading-[28px] font-semibold text-primary">{PRICE.total}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-1 mb-6 text-success-botanical">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold">Ready Stock</span>
            </div>

            {/* CTA — DRAFT_NON_PURCHASABLE: hanya callback demo */}
            <button
              onClick={() => {
                soundEngine.playSoftClick();
                onAddBundle?.();
                onNavigate?.('cart');
              }}
              className="w-full bg-primary text-warm-ivory text-[16px] leading-[24px] font-semibold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 h-12 cursor-pointer"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Tambah Set ke Keranjang
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};
