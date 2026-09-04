import React from 'react';

// SEQ 022 Morning Ritual — SIMPLE PERFECTED (2026-09-03). Ref html/022 belum final → BUKAN 1:1 mentah.
// Intent ref dipertahankan: hero editorial + urutan langkah + bundle "Ringkasan Ritual Set".
// Disederhanakan: hero clean, 3 langkah, 2 kartu produk, CTA soft pill #F2E9E5.
// Nama/harga/badge/angka bundle/URL gambar = literal dari html/022 — tidak ada yang dikarang.
// Spacing arbitrary value; JANGAN token --spacing-* Tailwind v4 (tabrak namespace max-w-*).

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBw-JhdeL6YskbVypP3jq5O15obLn2mKmD_Q4E67iKKylZRHiq6N1nmdgKZEy3XGsWsYFSC2l5a0NKa615PFGF6s5mSeygn8yUcS94w_AjwbXmTKY9ezsU-L5sJh3tiiet3ZI3OMQhPMPFsKbIRjgizdW0nMHfOvjP_9m_5vJzQClfjOgZNe50RUIyP9EH-seIDrE_zkmkQAG5l29ybdvSrEnhmj9YbNhYlcjMkDevoMki5EA8tIifJDCk4Yp2z0PeNE_aF4_A_nao';

const STEPS = [
  { n: 1, title: 'Nyalakan lilin Calm Morning', time: '3 menit' },
  { n: 2, title: 'Siapkan teh hangat', time: '3 menit' },
  { n: 3, title: 'Tulis 3 hal yang kamu syukuri', time: '3 menit' },
];

const PRODUCTS = [
  {
    name: 'Calm Morning Candle',
    price: 'Rp 189.000',
    badge: 'Stok Terbatas',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjn5bey4heTeZXGTvhWj9YtbajikFNxBoMSYv8E3dn8e78bQqBfIPhTYUi6jNmKuDGXNgFsd3uIOLEZqDCIW2xQcVX8qAWWWAoljL15ZnTOybNkRw1AyMXWx03LrC0o1dAWMOr2EjrfrzaRX5d24ZU9rogzRjmcJuBqNOKtt-x-aZoWnsx1Zrkl19XEv12-LNrOC18g77YL3kpC-Mp7kEiN5RhpYc_X5PtNXrUJdANxVN3W5sC_2EFiGbyLSfuyhPZ9aoUZ00nRHM',
  },
  {
    name: 'Citrus Awakening Spray',
    price: 'Rp 129.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGKGR_6TPxzIHxEzL9YBKnUa-cs82YAMO8bPxW6ZLAo_XlOiNYGqmGTnmpUkZmpatt0gxV2q-cuHihAlHFCvDr2Mh-pQkADDJS2Lb5atCvKVhOvd1pYkSvOZGcD29R7gnu2q51TPjVE3ILvAiFn9mEoWW3878U6N8TqPvo4_Tcv3E_b1VvXZddEb0CUXfBOY6Wf2WBVlWj2jnPYQi0dTL5IMUBRx1juHXJJKjROKV6fd2aNPnoD6hp_qiFPADzIV4G_6UMStiUhng',
  },
];

const H2 = 'font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#433139]';
const SOFT_PILL =
  'w-full py-3 rounded-full bg-[#F2E9E5] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-[#E7DBD6] transition-colors cursor-pointer';

interface MorningRitualScreenProps {
  /** NG-2 fix 2026-09-03: push ke cartItems App (bukan toast-only). */
  onAddToCart?: (name: string, priceLabel: string, image: string) => void;
  onAddBundle?: () => void;
}

export const MorningRitualScreen: React.FC<MorningRitualScreenProps> = ({ onAddToCart, onAddBundle }) => {
  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10 md:pt-16 pb-[100px] flex flex-col gap-16">
      {/* ── Hero editorial clean: gambar dulu, judul di bawah (intent html/022) ── */}
      <section className="flex flex-col gap-8">
        <div className="w-full h-[280px] md:h-[440px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.06)]">
          <img alt="Morning Ritual Setup" className="w-full h-full object-cover" src={HERO_IMG} />
        </div>
        <div className="max-w-2xl">
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-[#433139] md:text-[48px] md:leading-[56px]">
            Morning Ritual
          </h1>
          <p className="mt-3 text-[18px] leading-[28px] text-[#4d4448]">
            Awali harimu dengan kehangatan dan niat yang lembut.
          </p>
        </div>
      </section>

      {/* ── Urutan Ritualmu — 3 langkah ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Urutan Ritualmu</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4 items-start bg-[#fff8f7] border border-[#d0c3c7]/30 rounded-xl p-6">
              <span className="w-10 h-10 rounded-full bg-[#F2E9E5] flex items-center justify-center shrink-0 text-[14px] leading-[20px] font-semibold text-[#433139]">
                {s.n}
              </span>
              <div>
                <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-[#291714]">{s.title}</h3>
                <span className="mt-1 flex items-center gap-1 text-[11px] leading-[16px] tracking-[0.04em] font-medium text-[#4d4448]">
                  <span className="material-symbols-outlined text-[14px]">timer</span> {s.time}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Lengkapi Ritualmu — 2 kartu produk ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Lengkapi Ritualmu</h2>
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
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-[#F2E9E5] text-[#433139] px-3 py-1 rounded-full text-[11px] leading-[16px] tracking-[0.04em] font-medium">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col gap-1">
                <h3 className="text-[16px] leading-[24px] tracking-[0.01em] font-semibold text-[#291714]">{p.name}</h3>
                <p className="text-[16px] leading-[24px] text-[#4d4448] mb-4">{p.price}</p>
                <button onClick={() => onAddToCart?.(p.name, p.price, p.image)} className={SOFT_PILL}>
                  Tambah
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Bundle — intent "Ringkasan Ritual Set" jadi band ringkas. Angka literal html/022. ── */}
      <section className="bg-[#F2E9E5] rounded-xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h3 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-[#433139]">
            Ringkasan Ritual Set
          </h3>
          <p className="mt-2 text-[16px] leading-[24px] text-[#4d4448]">
            <span className="line-through">Total Normal Rp 566.000</span>{' '}
            <span className="font-semibold text-[#433139]">Bundle Price Rp 509.000</span>{' '}
            <span className="text-[11px] leading-[16px] tracking-[0.04em] font-medium text-[#3D6852]">hemat 10%</span>
          </p>
        </div>
        <button
          onClick={onAddBundle}
          className="px-8 py-4 rounded-full bg-[#433139] text-white text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-[#5B4750] transition-colors cursor-pointer"
        >
          Tambah Semua ke Keranjang
        </button>
      </section>
    </main>
  );
};
