import React from 'react';

// SEQ 026 Soul Ritual — SIMPLE PERFECTED (2026-09-03). Ref html/026 belum final → BUKAN 1:1 mentah.
// Intent ref dipertahankan: moment pills ("Pilih Momenmu") + prompts ("Prompt untuk Momen Ini")
// + note band "bermakna dengan atau tanpa produk".
// Disederhanakan: hero clean (gambar + teks di bawah, bukan kartu mengambang di atas foto),
// 3 prompt → 2 kartu, produk 4 → 2 kartu, CTA soft pill #F2E9E5.
// TIDAK ada blok "3 langkah": 026 tidak punya urutan langkah — prompts-lah analognya, tidak dikarang.
// Moment / prompt / note / product name / harga / URL gambar = literal dari html/026.
// Spacing arbitrary value; JANGAN token --spacing-* Tailwind v4 (tabrak namespace max-w-*).

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zxhUNRohb4k1AKXxW1u6slpJidKTMBOOkXsxyW43txi3Qls77gfchB0lQRtjMa8DwULi4yvjz3iW0jFm5gjzPhHfET15DEV6PW-zBWdidx7VfT_uZfGJvD160ljL60tHKw7EK1BcyMrpDZM9J3K_gwY_dc2lU9BazntuVAp3D1VJBvavmlalHIt9926RhNFH5seQV80Ri-506xgR9ULD9haVfYuSw7nfoiAXS62_L40T-R4HE8I_4yFh6UsoA-kSSq2URVIBsFI';

const MOMENTS = ['Pagi yang Hening', 'Jeda Siang', 'Malam Refleksi', 'Saat Merasa Berat'];

const PROMPTS = [
  '"Apa yang ingin kamu maafkan dari dirimu hari ini?"',
  '"Hal kecil apa yang membuatmu tersenyum minggu ini?"',
];

const PRODUCTS = [
  {
    name: 'Inner Peace Candle',
    price: 'Rp 199.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZswDSadGhQ0QOLllSyyJpmVN4NviJlgY6U32PtKCOC5BZBNyOIstirUNBzaa7ZD66axvKPbXu2QVS_naQZxgcQPWEeXbsfxj-SLKAAlPbxLA0k4LHFeO1RLql8pAE8R6Ktj1E1nP6IS-pr1TVYUSbvUsXqrtPLzY7_yED8sAQ_M0QazkSG5-aUP1y0p_gcVNkj0A-9sPSXnpIVTd0jUpUR8LddKCiU7DRg17I_Xqid8N90Q7aWB6MQ4QiyxuKZ6GIvVpzh_X-0Do',
  },
  {
    name: 'Soul Journal with prompts',
    price: 'Rp 179.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyTG9JygUGd6y8rJKVkw5Wb2qdZcCcHQACo152Yodngvfwrr1BjRMUWhV0irp73A05oqJTea7af0xsIBwE-Zq9YKa_iDTFlYiDeBolf_bDKJUvGzzFdYkKQ0C92Ie19NjB9b6ClR7R-FOi27Ek1scFdMadeO9ISz63HIxpNg3a9f-RyQ5NRkrWfD7EYh0y8arGh3MHGaXiHhppTkuUONXoh4FkXVrYgxgDbZC7kPQViXAxYbiTLO9n3jvjNU3Bage78xcJOPbd5OI',
  },
];

const H2 = 'font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#433139]';
const SOFT_PILL =
  'w-full py-3 rounded-full bg-[#F2E9E5] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-[#E7DBD6] transition-colors cursor-pointer';

interface SoulRitualScreenProps {
  onAddToCart?: (productName: string) => void;
  onSelectMoment?: (moment: string) => void;
  onSavePrompt?: (prompt: string) => void;
}

export const SoulRitualScreen: React.FC<SoulRitualScreenProps> = ({ onAddToCart, onSelectMoment, onSavePrompt }) => {
  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10 md:pt-16 pb-[100px] flex flex-col gap-16">
      {/* ── Hero clean ── */}
      <section className="flex flex-col gap-8">
        <div className="w-full h-[280px] md:h-[440px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.06)]">
          <img
            alt="Ritual jiwa dengan lilin, jurnal, dan teh di atas meja kayu hangat"
            className="w-full h-full object-cover"
            src={HERO_IMG}
          />
        </div>
        <div className="max-w-2xl">
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-[#433139] md:text-[48px] md:leading-[56px]">
            Soul Ritual
          </h1>
          <p className="mt-3 text-[18px] leading-[28px] text-[#4d4448]">
            Ruang untuk jiwamu — momen hening untuk kembali pada dirimu.
          </p>
        </div>
      </section>

      {/* ── Pilih Momenmu — pills (intent html/026) ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Pilih Momenmu</h2>
        <div className="flex flex-wrap gap-4">
          {MOMENTS.map((m, i) => (
            <button
              key={m}
              onClick={() => onSelectMoment?.(m)}
              aria-pressed={i === 0}
              className={
                i === 0
                  ? 'px-6 py-3 rounded-full bg-[#F2E9E5] border border-[#433139] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold cursor-pointer'
                  : 'px-6 py-3 rounded-full bg-[#fff8f7] border border-[#d0c3c7]/60 text-[#4d4448] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:border-[#433139] hover:text-[#433139] transition-colors cursor-pointer'
              }
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* ── Prompt untuk Momen Ini — 2 kartu ── */}
      <section>
        <h2 className={`${H2} mb-2`}>Prompt untuk Momen Ini</h2>
        <p className="text-[16px] leading-[24px] text-[#4d4448] mb-8">Renungkan dan catat pikiranmu.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROMPTS.map((q) => (
            <article
              key={q}
              className="bg-[#fff8f7] border border-[#d0c3c7]/30 rounded-xl p-8 flex flex-col justify-between gap-10"
            >
              <p className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold italic text-[#433139]">
                {q}
              </p>
              <button
                onClick={() => onSavePrompt?.(q)}
                className="self-start px-6 py-3 rounded-full bg-[#F2E9E5] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-[#E7DBD6] transition-colors cursor-pointer"
              >
                Simpan Prompt
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ── Note band — literal html/026 ── */}
      <section className="bg-[#F2E9E5] rounded-xl py-8 px-6 text-center">
        <p className="text-[18px] leading-[28px] italic text-[#5B4750] max-w-2xl mx-auto">
          Konten ritual ini bermakna dengan atau tanpa produk — mulailah dari yang kamu punya.
        </p>
      </section>

      {/* ── Teman untuk Momenmu — 2 kartu produk ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Teman untuk Momenmu</h2>
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
    </main>
  );
};
