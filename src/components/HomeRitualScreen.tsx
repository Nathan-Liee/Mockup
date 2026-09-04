import React from 'react';

// SEQ 024 Home Ritual — SIMPLE PERFECTED (2026-09-03). Ref html/024 belum final → BUKAN 1:1 mentah.
// Intent ref dipertahankan: room pills ("Pilih Ruanganmu") + safety ("Keamanan Ritual di Rumah").
// Disederhanakan: hero clean (tanpa overlay tabrak-strip seperti QA v1), grid produk 2 kartu,
// CTA soft pill #F2E9E5. Produk tetap di bawah pills — html/024 TIDAK punya heading produk sendiri,
// jadi tidak dikarang. TIDAK ada blok "3 langkah": 024 memang tidak punya urutan langkah.
// Room name / product name / harga / teks safety / URL gambar = literal dari html/024.
// Spacing arbitrary value; JANGAN token --spacing-* Tailwind v4 (tabrak namespace max-w-*).

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuNkwa2lVnpYjJOfnCeeXghqeoEUMT9H2QrNVE60HRgQ0RtoFP3GGUwGJv8okXaNf4JFh4gsamSPvswktj7cJVJbOGZXWqP1SIUDK7P_fpnAu0qS5bJfNf9BfeqPdIVyHZYVkka9KtKQEcLoLHsQXxPoAekE7gD5OYg3gNTYFRayjNJL_AxZvY5Bvyyn8flwDA_4nRPhUoJsQzKVrh09fVEuUAM6Mfolep8P_rNYjEFc1G_1wLP34l0VcrG2pGhIdLE4UV-4_Nbo';

const ROOMS = ['Ruang Tamu', 'Kamar Tidur', 'Ruang Kerja', 'Kamar Mandi'];

const PRODUCTS = [
  {
    name: 'Sandalwood Haven Candle',
    price: 'Rp 219.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1RAgVrTK8gZsa-wXapgiEPXMj7IpGRPVfQ_YPkO9-3GABh8zrflPc7KN_Al_3NXR_8cDroZdF8Ej8EihLK-wdHRX1paQ4L06wFGbjtJAInP-R3SEnJdlZAeuGPOzj5OWJ4Iko4i2U5F-d0DWW94wkc09H-JHVJB-Gb840SxaZDhdt3gbINm7gfWEPfW0VVd27n4yPx-cR7glIy-4hCAQsYRpDYNCiZ3eEoYz9gIDiFekvpxQDn1fWwf0EL9T8ZaOqFYE493-8okY',
  },
  {
    name: 'Linen & Cotton Room Spray',
    price: 'Rp 139.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnh4phpMfRVS-7YU5HrRk_JvOSNZx0m4H7B-qOu0pAOb5qbEowSlgR-HRiKka5jMp2Ip1GuHYE16RGe0fWFQG9iBQpkXp9a3R01hftNbKSwNEd998nX7gyFH2JvA1_TWzuYq7dpb9KMDelzVqFTBG35K5NlzAa8fxgPku2Z9LEgtie21HPSwpCau6uMS5FGvnbtLz71xC9tXN5WfuQXM-C4xr-YFE7mceHaR0GKERJ_36tfq8f6nYCvJCRwYefbj2SGpr6hYKGAhI',
  },
];

const SAFETY = [
  { icon: 'child_care', text: 'Jauhkan lilin dari jangkauan anak & hewan' },
  { icon: 'visibility', text: 'Jangan tinggalkan lilin menyala tanpa pengawasan' },
  { icon: 'table_restaurant', text: 'Letakkan diffuser di permukaan stabil' },
  { icon: 'laundry', text: 'Ikuti petunjuk perawatan tekstil' },
];

const H2 = 'font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#433139]';
const SOFT_PILL =
  'w-full py-3 rounded-full bg-[#F2E9E5] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:bg-[#E7DBD6] transition-colors cursor-pointer';

interface HomeRitualScreenProps {
  onAddToCart?: (productName: string) => void;
  onSelectRoom?: (room: string) => void;
}

export const HomeRitualScreen: React.FC<HomeRitualScreenProps> = ({ onAddToCart, onSelectRoom }) => {
  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10 md:pt-16 pb-[100px] flex flex-col gap-16">
      {/* ── Hero clean: gambar penuh, teks di bawahnya (bukan overlay) ── */}
      <section className="flex flex-col gap-8">
        <div className="w-full h-[280px] md:h-[440px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.06)]">
          <img
            alt="Ruang tamu hangat dengan lilin, botani kering, jurnal, teh, dan minyak esensial"
            className="w-full h-full object-cover object-center"
            src={HERO_IMG}
          />
        </div>
        <div className="max-w-2xl">
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold text-[#433139] md:text-[48px] md:leading-[56px]">
            Home Ritual
          </h1>
          <p className="mt-3 text-[18px] leading-[28px] text-[#4d4448]">
            Jadikan rumahmu sanctuary — ruang yang memulihkan dan menenangkan.
          </p>
        </div>
      </section>

      {/* ── Pilih Ruanganmu — pills + grid produk (satu section, sesuai html/024) ── */}
      <section>
        <h2 className={`${H2} mb-8`}>Pilih Ruanganmu</h2>
        <div className="flex flex-wrap gap-4">
          {ROOMS.map((room, i) => (
            <button
              key={room}
              onClick={() => onSelectRoom?.(room)}
              aria-pressed={i === 0}
              className={
                i === 0
                  ? 'px-6 py-3 rounded-full bg-[#F2E9E5] border border-[#433139] text-[#433139] text-[14px] leading-[20px] tracking-[0.01em] font-semibold cursor-pointer'
                  : 'px-6 py-3 rounded-full bg-[#fff8f7] border border-[#d0c3c7]/60 text-[#4d4448] text-[14px] leading-[20px] tracking-[0.01em] font-semibold hover:border-[#433139] hover:text-[#433139] transition-colors cursor-pointer'
              }
            >
              {room}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
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

      {/* ── Keamanan Ritual di Rumah — band soft, isi literal html/024 ── */}
      <section className="bg-[#F2E9E5] rounded-xl p-8 md:p-10">
        <h2 className="font-serif text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-[#433139] text-center">
          Keamanan Ritual di Rumah
        </h2>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SAFETY.map((s) => (
            <li key={s.text} className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[22px] text-[#5B4750] mt-1">{s.icon}</span>
              <span className="text-[16px] leading-[24px] text-[#291714]">{s.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
