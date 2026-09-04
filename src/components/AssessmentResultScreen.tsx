import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Info, CheckCircle2, Sparkles, Flower2 } from 'lucide-react';

// STRICTLY MOCKUP (SEQ 059 + 061 + 062): result screens merged via internal tab state.
// Side-nav anchor list from references (Ringkasan..Mengapa) rendered as tab switcher:
// Scent Profile = 059, Ritual = 061, Produk = 062. No scoring logic — static "THE NURTURER".
interface AssessmentResultScreenProps {
  onNavigate?: (tab: NavTab) => void;
  /** NG-2 fix 2026-09-03: push ke cartItems App (bukan toast-only). */
  onAddToCart?: (name: string, priceLabel: string, image: string) => void;
}

type ResultTab = 'scent' | 'ritual' | 'produk';

const TABS: { id: ResultTab; label: string }[] = [
  { id: 'scent', label: 'Scent Profile' },
  { id: 'ritual', label: 'Ritual' },
  { id: 'produk', label: 'Produk' },
];

const PETAL_LABELS = [
  { text: 'Warmth', style: { top: '50%', left: '100%', transform: 'translate(10px, -50%)' } },
  { text: 'Freshness', style: { top: '100%', left: '75%', transform: 'translate(-50%, 10px)' } },
  { text: 'Sweetness', style: { top: '100%', left: '25%', transform: 'translate(-50%, 10px)' } },
  { text: 'Earthiness', style: { top: '50%', left: '0%', transform: 'translate(-100%, -50%)', marginLeft: '-10px' } },
  { text: 'Floral', style: { top: '0%', left: '25%', transform: 'translate(-50%, -100%)', marginTop: '-10px' } },
  { text: 'Spice', style: { top: '0%', left: '75%', transform: 'translate(-50%, -100%)', marginTop: '-10px' } },
];

const AROMA_FAMILY = [
  { rank: '1', name: 'Warm Amber', desc: "'Pelukan hangat dalam bentuk aroma'", primary: true },
  { rank: '2', name: 'Soft Vanilla', desc: "'Kenyamanan yang familiar'", primary: false },
  { rank: '3', name: 'Gentle Woods', desc: "'Pijakan yang menenangkan'", primary: false },
];

const NOTES = ['AMBER', 'VANILLA', 'SANDALWOOD', 'TONKA', 'MUSK', 'CEDAR', 'CHAMOMILE'];
const AVOID = ['INTENSE CITRUS', 'SHARP PEPPERMINT'];

const RITUAL_STEPS = [
  { title: '1. Redupkan lampu & nyalakan lilin', mins: '1 MNT' },
  { title: '2. Semprotkan pillow mist', mins: '1 MNT' },
  { title: '3. Jurnal 3 baris: apa yang kamu beri hari ini & apa yang kamu butuhkan', mins: '8 MNT' },
  { title: '4. Tarik napas 4-7-8 sebanyak 5 siklus', mins: '5 MNT' },
];

const SUPPORT_PRODUCTS = [
  { name: 'Tranquil Night Candle', desc: 'Calming lavender & vetiver', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjYP29SJIp8HEWx6q1AY-8eUbXiWttIf0Ohd09y8BrV-ruCiyA_SZfXSgi-uXLlwBm6SPfa01nRcTmPfwROr-jaB_0_tBqt8TQE7fKXDbJzyXFBKggL723q8phgsW2jsHGbgI9TjWHboEu3s1E8WqwVBfGZf5Juet8LpE9KaA4p0rm8W5wH7TX6nmrCiv1g9ru1jH52dhUBoDkIsJenIXu4_SHdtHMiwru_eqyFRvbAkawTBO0epDYoV06ffxQ6BVjgKnItE7Zxs' },
  { name: 'Lavender Dream Pillow Mist', desc: 'Deep sleep essential', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu0Ze1ekV6hZR8Fldwpxgih4p1bwaq4tecq5qJpuADoQEZP5YCExfgu--476gJcMGii97TURX5eZz5YJx_zvhunbGjY0CQgTXBQ-IAOG_V7AdfIouta9dMx1nx4i0Lo7kVXkNQMYeGyeRijMZftWQLqsmtyMU5_wrpmBWOQzIfJE5B0uzFe7IJ5-JCY3c3iDmB230dBOA5OTnYBX4UiOK2dM6gclR_227ynR1rw_p3dBJxHC14EUVbBfWtjFjWT0MrggJQM_C8wcw' },
  { name: 'Evening Reflection Journal', desc: 'Guided prompts', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9iOIwFnIGIyN0XOWUX5-WXNWhaBEK5gpEEhDeKtkb6u4MAzqlr4PYiCZFUoZHCUh2-QPgyDPitgPLXsp61qtr6jKb_JwsY1KIVRYw5hURZkZo3KkWQ8itzKHT7tlhzZr6LCZWnsw2y_CWbUQ2LEvcxpakt2erKQwNh91PsciTmoRrZ2lDEcMvW-eTtrs2r9_aKP6p3ec7m9QaU77ejfRqBOZJ3oNWY2xhlbRfQMTqEVAIA39AyQ25rnfbLLha45AJzwHvqcLnYYo' },
];

// PERBAIKAN QA: 3 URL /aida/ mati → padanan aida-public hidup (ref 032 Amber Glow,
//   024 Room Spray, 021 Linen Journal). Bukan fabrikasi konten.
const SECONDARY = [
  { name: 'Amber Glow Diffuser', price: 'Rp 259.000', match: '86% Match', soldOut: true, note: 'Stok habis - alternatif untukmu: Warm Amber Mini Set', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNs9WxiG7TijzcrFx2nV15pQ8AABx9DQde8iSsVPtETjMTKazTu0HtTlApO5taQIa1jCBGRpk8u_u-bZ-cI98NEJnhfdxUush0WD32Pfa9MmXZi9sLrYvKLwMvfW-FkWm6_mvosU3mZSkwxknsswQqRRFdxdgA0rKJVXfOaLBEnuHABxeUq0YidMS1M7eKRsie9Oa6jjlXjHng5eF-ENy8__dP2Gw1Y3OrQI9I7Ke6fzYSsUozR52H5xv7VrQTjPLKDqbVSN-TMGY' },
  { name: 'Vanilla Comfort Room Spray', price: 'Rp 139.000', match: '84% Match', soldOut: false, note: '', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnh4phpMfRVS-7YU5HrRk_JvOSNZx0m4H7B-qOu0pAOb5qbEowSlgR-HRiKka5jMp2Ip1GuHYE16RGe0fWFQG9iBQpkXp9a3R01hftNbKSwNEd998nX7gyFH2JvA1_TWzuYq7dpb9KMDelzVqFTBG35K5NlzAa8fxgPku2Z9LEgtie21HPSwpCau6uMS5FGvnbtLz71xC9tXN5WfuQXM-C4xr-YFE7mceHaR0GKERJ_36tfq8f6nYCvJCRwYefbj2SGpr6hYKGAhI' },
  { name: 'Soft Evening Journal', price: 'Rp 159.000', match: '81% Match', soldOut: false, note: '', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXjpTtB1jF2dkWDWmZdzZKACVmzJtnrWqe_Z1N1WaR9EDWTOB6HTkkSJc8T3NXGZZmOwYi2o3AxVIpiEjSlyNDMZT-rWqKvwHQ2z5LGvLLxhe1-302wjjkUq0Kqa1MUfR8OzlR9ag228uJ2KaqdQKlzNF839AEOko2D87znkeEh_8cHWCIYSVM86mcoLkK4l5wERNNY3QrJ5w4TlImFGUS9ZdiZRpEM3NekqjnGN1HgIkEQkBAg5st4RqPfgSbZgWIY41JjhnLNMo' },
];

export const AssessmentResultScreen: React.FC<AssessmentResultScreenProps> = ({ onNavigate, onAddToCart }) => {
  const [tab, setTab] = useState<ResultTab>('scent');
  // Fix-12 kanvas: CTA mock aktif — toast "MOCK — DRAFT", tanpa backend.
  const [toast, setToast] = useState<string | null>(null);
  const mockToast = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };

  const sideNav = (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="md:sticky md:top-32">
        <nav className="flex md:flex-col gap-2 md:gap-4 flex-wrap border-l border-[#d0c3c7]/30">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { soundEngine.playSoftClick(); setTab(t.id); }}
                className={`pl-4 py-1 text-left text-sm tracking-[0.01em] transition-colors border-l-2 -ml-[2px] ${
                  active
                    ? 'border-[#433139] text-[#433139] font-bold bg-[#F2E9E5]/60'
                    : 'border-transparent text-[#4d4448] font-semibold hover:text-[#433139]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
        {/* "Ulangi Assessment" — dipindah ke bawah menu sidebar (bukan melayang di pojok) */}
        <button
          onClick={() => { soundEngine.playSoftClick(); onNavigate?.('assessment'); }}
          className="mt-8 md:mt-10 w-full md:w-auto border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold tracking-[0.06em] uppercase py-3 px-6 rounded hover:bg-[#5B4750] hover:text-[#FAF3EE] hover:border-[#5B4750] transition-all"
        >
          Ulangi Assessment
        </button>
      </div>
    </aside>
  );

  return (
    <div className="animate-fadeIn">
      {/* Archetype chip row */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10">
        <div className="px-4 py-1.5 rounded-full bg-[#F2E9E5] border border-[#d0c3c7]/30 flex items-center gap-2 w-fit">
          <Flower2 className="w-4 h-4 text-[#433139]" />
          <span className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#433139] uppercase">Archetype: THE NURTURER</span>
        </div>
      </div>

      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col md:flex-row gap-6 md:gap-8">
        {sideNav}

        {/* FIX_PLAN #22: gap dirapatkan — 059/061 terlalu renggang */}
        <div className="w-full max-w-[880px] flex flex-col gap-14 md:gap-16">
          {/* ============ 059 — SCENT PROFILE ============ */}
          {tab === 'scent' && (
            <>
              <section className="flex flex-col items-center text-center">
                <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-2">Personal Scent Profile</h1>
                <p className="text-base text-[#4d4448] mb-12 max-w-lg">
                  Berdasarkan jawabanmu, ini adalah peta preferensi aromatik yang paling resonan dengan kondisi spiritualmu saat ini.
                </p>
                {/* Petal diagram (static CSS morph blobs + 6 axes) */}
                <div className="relative w-[300px] h-[300px] my-8 mx-auto">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#433139] opacity-15" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-[#433139] opacity-25" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div key={deg} className="absolute top-1/2 left-1/2 w-[150px] h-px bg-[#BDA494]/30 origin-left" style={{ transform: `rotate(${deg}deg)` }} />
                  ))}
                  {PETAL_LABELS.map((l) => (
                    <div key={l.text} className="absolute text-[11px] font-semibold tracking-[0.04em] uppercase text-[#433139]" style={l.style}>
                      {l.text}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] mb-8 border-b border-[#d0c3c7]/30 pb-4">Keluarga Aromamu</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {AROMA_FAMILY.map((f) => (
                    <div key={f.rank} className="bg-[#F7F1EE] rounded-xl p-6 border border-[#BDA494]/20 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 font-serif text-[22px] leading-[28px] font-semibold ${f.primary ? 'bg-[#5B4750] text-[#d1b6c1]' : 'bg-white text-[#433139] border border-[#d0c3c7]'}`}>
                        {f.rank}
                      </div>
                      <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-2">{f.name}</h3>
                      <p className="text-base text-[#4d4448] italic">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] mb-6">Notes yang Selaras</h2>
                <div className="flex flex-wrap gap-3">
                  {NOTES.map((n) => (
                    <span key={n} className="px-5 py-2 rounded-full bg-[#F2E9E5] text-[11px] leading-4 tracking-[0.04em] font-medium text-[#433139] border border-[#BDA494]/30">{n}</span>
                  ))}
                </div>
              </section>

              <section className="bg-[#ffe2de] rounded-xl p-8 border border-[#d0c3c7]/20">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="w-6 h-6 text-[#7f7478] shrink-0" />
                  <div>
                    <h2 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-1">Notes yang dihindari sementara</h2>
                    <p className="text-base text-[#4d4448] italic">Energimu sedang butuh kelembutan.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 ml-10">
                  {AVOID.map((n) => (
                    <span key={n} className="px-5 py-2 rounded-full bg-[#F7F1EE]/50 text-[11px] leading-4 tracking-[0.04em] font-medium text-[#7f7478] opacity-60 border border-[#d0c3c7]/10">{n}</span>
                  ))}
                </div>
              </section>

              <div className="flex flex-col items-center justify-center text-center border-t border-[#d0c3c7]/20 pt-8">
                <button className="text-sm font-semibold text-[#433139] underline underline-offset-4 decoration-[#BDA494] hover:opacity-80 transition-opacity mb-4">Ubah preferensi manual</button>
                <p className="text-sm text-[#4d4448]/70">Kamu bisa mengulang assessment setelah 30 hari.</p>
              </div>
            </>
          )}

          {/* ============ 061 — RITUAL RESULT ============ */}
          {tab === 'ritual' && (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fff0ee] border border-[#d0c3c7]/30 rounded-full self-start">
                <CheckCircle2 className="w-4 h-4 text-[#3D6852]" />
                <span className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#433139]">Ritual tersimpan di akunmu</span>
              </div>

              <div>
                <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-8">Rekomendasi Ritual Personal</h1>
                <div className="rounded-xl overflow-hidden border border-[#d0c3c7]/50 bg-[#FAF3EE]">
                  <div className="w-full h-[300px] md:h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBim-P6XusgVsqwRHmQkdqmxu2NRMUGD_ne_Oym7FKTn6zq6rNt8nP6Cia0ZwCeeOOMPR92KGHgt66tiYJPIzmxJDlgWzny7p1SM63VJOkf0rp8sRgvkoaJcIfutjpiKHStLk8hDQagCSvs_x89mNgQMrZ5_Dci_Qy3-xew46cw98BY81j6iHnM-cV9IUgC3s99JayDQ4N8ii4COGxYx0n03j5fQrOBIJhORBlA4AL6jmp02x4DDGWjaox9CkUN5WCG4bpgB_TLpSc')" }} />
                  <div className="p-6 md:p-8">
                    <h2 className="font-serif text-2xl leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] mb-6">Ritual Malam 15 Menit untuk The Nurturer</h2>
                    <div className="relative pl-6 md:pl-8 border-l border-[#d0c3c7]/40 space-y-8 my-8">
                      {RITUAL_STEPS.map((s) => (
                        <div key={s.title} className="relative">
                          <div className="absolute -left-[31px] md:-left-[39px] top-1 w-[14px] h-[14px] rounded-full bg-white border-2 border-[#433139] flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-[#433139]" />
                          </div>
                          <h3 className="text-base font-semibold tracking-[0.01em] text-[#433139] mb-1">{s.title}</h3>
                          <p className="text-xs font-bold tracking-[0.06em] uppercase text-[#7f7478]">{s.mins}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff0ee] border border-[#d0c3c7]/30 rounded-lg p-8">
                <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-4">Kenapa ritual ini untukmu</h3>
                <p className="text-lg leading-[28px] text-[#4d4448]">
                  Sebagai The Nurturer, energi emosionalmu cenderung mudah habis karena secara alami kamu mengutamakan orang lain. Ritual malam 15 menit ini dirancang khusus untuk memutus siklus tersebut, memberikan ruang diri yang aman, dan mengisi kembali apa yang telah kamu berikan sepanjang hari tanpa rasa bersalah.
                </p>
              </div>

              <div>
                <h3 className="text-2xl leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] mb-1">Produk pendukung (opsional)</h3>
                <p className="text-base text-[#7f7478] mb-6">Ritual ini tetap bermakna tanpa produk apa pun.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SUPPORT_PRODUCTS.map((p) => (
                    <div key={p.name} className="flex items-center gap-4 p-4 border border-[#d0c3c7]/40 rounded-lg hover:border-[#433139] transition-colors bg-white">
                      <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                        <img alt={p.name} className="w-full h-full object-cover" src={p.image} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-base font-semibold tracking-[0.01em] text-[#433139]">{p.name}</h4>
                        <p className="text-[11px] leading-4 tracking-[0.04em] text-[#4d4448] mt-1">{p.desc}</p>
                      </div>
                      {/* NG-2: push cartItems + buka drawer (harga tak ada di kanvas → 0). */}
                      <button onClick={() => onAddToCart?.(p.name, '', p.image)} className="shrink-0 h-10 px-4 rounded border border-[#BDA494] text-[#433139] text-xs font-bold tracking-[0.06em] uppercase hover:bg-[#F2E9E5] active:scale-[0.98] transition-all">
                        Tambah
                      </button>
                    </div>
                  ))}
                  {/* Coming-soon card, per 061 */}
                  <div className="flex items-center gap-4 p-4 border border-[#d0c3c7]/20 rounded-lg bg-white/50 opacity-60 grayscale">
                    <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 bg-[#F7F1EE] flex items-center justify-center">
                      <Flower2 className="w-8 h-8 text-[#7f7478]" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-base font-semibold tracking-[0.01em] text-[#433139]">Soul Ritual Blend</h4>
                      <p className="text-[11px] leading-4 tracking-[0.04em] text-[#4d4448] mt-1">Segera Hadir</p>
                    </div>
                    <button disabled className="shrink-0 h-10 px-4 rounded border border-[#d0c3c7]/50 text-[#7f7478] text-xs font-bold tracking-[0.06em] uppercase cursor-not-allowed">Tambah</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============ 062 — PRODUCT RECOMMENDATIONS ============ */}
          {tab === 'produk' && (
            <>
              <div className="mb-2">
                <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-1">Produk yang Selaras dengan Profilmu</h1>
                <p className="text-lg leading-[28px] text-[#4d4448]">Dipilih berdasarkan hasil analisismu - bukan sekadar tren.</p>
              </div>

              {/* Primary match */}
              <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494]/30 overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 relative bg-[#fff0ee]">
                  {/* PERBAIKAN QA: URL /aida/ mati → padanan aida-public hidup (ref 030 Cashmere Embrace). Bukan fabrikasi konten. */}
                  <img alt="Cashmere Embrace Candle" className="w-full h-[300px] md:h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzA2Am5nfonkjPiM4I5aIZhsW9S7YeK5MlwGUHVwmURzRdvcwdgtqhxVkObf9IdXTpO7pTAeKhyfbwUMqXRs_EXx81hudzTVcoSVYG620kFtia5WfjSDsXZH10jo-k8_qcWv8BTywA3jtyEaAH7nOYcPp8UyxCVu1avK9brqnKusqLcL_9xVoJ8zODt106vilyt9qGOyCtAcd2omb93Vfc1hPJdMIrq77SbV0zBVOGU9thizZQ2_FFiDqHhIX4zYibG_dN5sd8-PQ" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-[#BDA494]/20 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                    <Sparkles className="w-4 h-4 text-[#3D6852]" />
                    <span className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#3D6852] uppercase">92% Match</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white">
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="font-serif text-2xl leading-[32px] font-semibold tracking-[-0.01em] text-[#433139]">Cashmere Embrace Candle</h2>
                    <button className="text-[#4d4448] hover:text-[#433139] transition-colors" title="Kenapa cocok?">
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[22px] leading-[28px] font-semibold text-[#291714] mb-6">Rp 219.000</p>
                  <p className="text-base text-[#4d4448] mb-8 flex-grow">
                    Lilin aromaterapi dengan sentuhan hangat vanilla, sandalwood, dan sedikit musk. Sempurna untuk menciptakan suasana pelukan yang menenangkan setelah hari yang panjang.
                  </p>
                  <div className="flex flex-col gap-2">
                    {/* Fix-12: CTA mock aktif — toast "MOCK — DRAFT" */}
                    <button onClick={() => onAddToCart?.('Cashmere Embrace Candle', 'Rp 219.000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzA2Am5nfonkjPiM4I5aIZhsW9S7YeK5MlwGUHVwmURzRdvcwdgtqhxVkObf9IdXTpO7pTAeKhyfbwUMqXRs_EXx81hudzTVcoSVYG620kFtia5WfjSDsXZH10jo-k8_qcWv8BTywA3jtyEaAH7nOYcPp8UyxCVu1avK9brqnKusqLcL_9xVoJ8zODt106vilyt9qGOyCtAcd2omb93Vfc1hPJdMIrq77SbV0zBVOGU9thizZQ2_FFiDqHhIX4zYibG_dN5sd8-PQ')} className="w-full bg-[#5B4750] text-[#FAF3EE] font-semibold text-base h-[48px] rounded flex items-center justify-center hover:opacity-90 active:scale-[0.99] transition-all">
                      Tambah ke Keranjang
                    </button>
                    {/* NG-1 fix 2026-09-03: hasil → 030 product-recommended (?match=1), bukan 029 generik. */}
                    <button onClick={() => { soundEngine.playSoftClick(); onNavigate?.('product-recommended'); }} className="w-full text-[#433139] font-semibold text-base h-[48px] rounded flex items-center justify-center hover:bg-[#F7F1EE] transition-colors">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary matches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SECONDARY.map((p) => (
                  <div key={p.name} className="bg-white rounded-xl shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#BDA494]/30 overflow-hidden flex flex-col relative">
                    <div className={`relative bg-[#fff0ee] h-[200px] ${p.soldOut ? 'opacity-70' : ''}`}>
                      <img alt={p.name} className="w-full h-full object-cover" src={p.image} />
                      {p.soldOut && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center p-4 text-center">
                          <span className="text-[11px] leading-4 font-medium text-[#433139] bg-[#FAF3EE] px-3 py-2 rounded-full border border-[#433139]/20">{p.note}</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-[2px] border border-[#BDA494]/20 shadow-sm">
                        <span className="text-[11px] leading-4 tracking-[0.04em] font-medium text-[#433139] uppercase">{p.match}</span>
                        <Info className="w-3.5 h-3.5 text-[#4d4448] ml-1" />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow bg-white">
                      <h3 className="text-base font-semibold tracking-[0.01em] text-[#433139] mb-1">{p.name}</h3>
                      <p className="text-base text-[#291714] mt-auto">{p.price}</p>
                      {/* Fix-12: non-soldOut = CTA mock aktif; soldOut tetap disabled (fail-safe) */}
                      <button
                        onClick={() => onAddToCart?.(p.name, p.price, p.image)}
                        disabled={p.soldOut}
                        title={p.soldOut ? 'Stok habis' : undefined}
                        className={`mt-4 w-full border-[1.5px] border-[#BDA494] font-semibold text-base h-[48px] rounded flex items-center justify-center transition-all ${
                          p.soldOut ? 'opacity-50 cursor-not-allowed text-[#291714]' : 'text-[#433139] hover:bg-[#F2E9E5] active:scale-[0.99]'
                        }`}
                      >
                        {p.soldOut ? 'Habis Terjual' : 'Tambah'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-8 border-t border-[#d0c3c7]/20">
                <p className="text-[13px] italic text-[#4d4448]/70">
                  Rekomendasi mengikuti aturan pencocokan produk yang transparan - AI tidak mengubah kecocokan yang sudah ditentukan.
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
