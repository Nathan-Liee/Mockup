import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Star, ChevronRight, ShoppingBag, Info, CalendarDays, Factory, Truck } from 'lucide-react';

// STRICTLY MOCKUP (SEQ 029 Variant / SEQ 031 Pre-Order): static render, no cart logic.
// Fix-12 kanvas 2026-09-03: CTA aktif sebagai mock — toast "MOCK — DRAFT", tanpa backend.
// Data tetap DRAFT_NON_PURCHASABLE (isDraftNonPurchasable=true di mockData).
interface ProductDetailScreenProps {
  onNavigate?: (tab: NavTab) => void;
  /** NG-2 fix 2026-09-03: push ke cartItems App (bukan toast-only). */
  onAddToCart?: (name: string, priceLabel: string, image: string) => void;
}

const IMG = {
  serenityMain: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjD1sYaT_M0L7QdJJMhp9FcH7dH-Y_6HJanJeThJMPldcWxm6z6-pwyn8_tWKnl8kXPLVLhBWqpOYSyxA5AjdeV6vydR7xH3LlsZoa34IMbiBXXc36CirAMt5VcLK_Etxw3swHL74yVGFUNf41ktiWwIrJnpa6pRKfFqLAXXAdto90pOkdbk6e4WPDNd4mZlzymIiYMFuH2Gr3eRAxYWSDfcUoxhTDjwgfB9I96bTplRQcwsY2LC_yRtmhyvQ8yf7MSf-I06SCJCo',
  serenityRoom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3VI6nYWgSWEZxs_P5VtZwBrV69ztGUFvPs34Pq1ILEQtI04EVjKfGG2X-ghDxDscoMZVbjWNyJQzqLdvlxnm3RlUerBdR_f-H8DwGFk04wc81_XejBKpV8OTJQ7Vufet9hQ2zjH7y1ALyW3CEpXL-4-rZJnJfulho03cR1q2Gq317ilrceRxomEAsprkmymXKn5ioPXjjGlttaebk-uW17UViq4gBiQD_dXPU0MqnAbEJp0ey22GrS0m6k99rS1cIFYzUB3nTb98',
  serenityReeds: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDoAOzUGqRyACxDEGQCVsOGc6Cgplq_NHwnwvAKcI_uI0f-RmW575Fvi_WnelLmG1iOGXoF6LRf-wyzqAAG0ogFO6gGuhiYdZEwNfUXxS27EB7irTVqSu0r3V5ye3D_0XiOgL3T2K9jAv9Yk3S_8mvIQR0BD3hKTjrDiC045FFP7wY_92soG0hY_t5WQOlZRcihATRrQci0pdtXGwSW8J8h32nqmuWxdeCPTuR0GC2IP7d6CxC_0uqy3pqonSz-432bWmtZji_lmQ',
  serenityFlatlay: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcFnvR6lSNizFo3SIMp0g_nM8vMUCPYMeB2nUWztER-GVqMiwqFMA2p32QV8KR_tUS8ndm2Y787vkBNiZUDTZp9AaLaZ4ircQwLBCK2hgFDw2SgsmLI7-E0ow72c6qfYfS1DpIEDMf9U4tWH4IV1irq0FMohXd9dqbdj56TMrUD0WnHGwROuq-GaBfXqOggd_YyjqBbI7er0Cx8Gbks7M0NuZv3BKEKH5faaQCBfpKErhO_3pQ96QkBkrZgnI4HWhcjym7zUMZQ8Q',
  sandalwood: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzY0RU83NYnv9K6Di8WhfcxcaJ6c61CppIQEEYrjNvGHwc-atnRA5rT3XaREif8FXRFmp6EbVGFd_5tuCcaZ7joV4AEOqLBLKE4oCuCJUeI7AEn87pVhlsxfBacyHaMblUspga7UvZ59Z5CNdU5FHRUfGv5mUyMpZu0oxQGpoAKzeg5ZugmzQb-UEPBiW-PywwGn1ejqV-m0oEmOQPVOSDtbHJU23bmEpPnB4r6aXUlKLO_zXZbNpET9nQaj7TzyeE_vUf8vE2H34',
  lavender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc4Q7DDDsLF9sQ_rxKVPRdHCuDz12WohI_uU9JWRKBy1VTPcV49ZvhAkA9rgG71gzol1Y76NpvwQWwOS32FFbsZA6PIezrHSaQrNB0TBISlRyQQM-GsFkiJI2Nqey31ktTwapTsBl_o97lz5SLrD3SkzvoFQ-tCR8rDfEeW4wrhDJqLYVEoYC8rUW-xOoWFwT3vYbi9ya-EhI4TZ8W8Yt4Gk6me49ize3KlUH7lW5Pya2FsfOEtsHVNpINWcfZm20wq5AZyfjz3c4',
  moonJar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdm-04NtHii9JV9Dqq1pxe7AVm7g1i-j5Ry2A0wMMEMAEyVialop3On-x5L7f8YGLZRqx9DoeE987VEeN9wqiF45GQ_ttjer-JhrDMSKvEiLoeeSV_-OHg9TTZkBtgAXbwQ_0FvVUHHBqWnvGsRa5Bnq8-xgSC6NibLpbHKtpfw7rc1RehW_Bk2e2Au8wLyQDldhG38FMWf-ymTJ3rjox6Rhigk6NetE8G8sXeRbeiXedjP2el4z1Y_WR2nyk6kvrEUd9IJek5WvM',
  moonBurn: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0vSMzKW7_a2bvMY9JV6NS7mShqAVyIyHAX8UmaBUt4GM0U0Zvo_qRPR_Mx82U1EZ4tF8frYN6Q1uzAuaNJ0yNgZfoMMPBBq4w9EjcEXD36m0iL5ehQky64D6Kr-z5E1n-vf4ZC1vsrubnzYm5gflRVXnttQLItUcYEdbAeywo3S3sg0CjMo3v8grbvm7xz5iXRTFNDbnNRO9hWvWOMp7vLXfBSxuzxNaxaY2rdoAL7z70-GeqFyvci-XAmWtE1LEWNWB7g7MVzNc',
};

const Accordion: React.FC<{ title: string; open?: boolean; children: React.ReactNode }> = ({ title, open, children }) => (
  <details className="group border border-[#BDA494]/30 rounded-lg bg-[#F7F1EE]/50" open={open}>
    <summary className="flex justify-between items-center font-semibold text-[#433139] cursor-pointer list-none p-5 [&::-webkit-details-marker]:hidden">
      <span>{title}</span>
      <ChevronRight className="w-4 h-4 text-[#4d4448] transition-transform duration-300 group-open:rotate-90" />
    </summary>
    <div className="px-5 pb-5 text-sm text-[#4d4448] leading-relaxed space-y-3">{children}</div>
  </details>
);

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ onNavigate, onAddToCart }) => {
  // Prototype switcher between the two "Di Kanvas" states
  const [variant, setVariant] = useState<'029' | '031'>('029');
  const [toast, setToast] = useState<string | null>(null);
  // FIX_PLAN #24: galeri 029 switchable
  const gallery029 = [IMG.serenityMain, IMG.serenityRoom, IMG.serenityReeds, IMG.serenityFlatlay];
  const [selectedImg, setSelectedImg] = useState(0);
  // FIX_PLAN #25: qty stepper 031 diaktifkan mock (bukan dead control)
  const [qty, setQty] = useState(1);
  const mockToast = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-10 py-10">
      <div className="flex gap-2 mb-8">
        {([
          ['029', 'Variant'],
          ['031', 'Pre-Order'],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => { soundEngine.playSoftClick(); setVariant(id); }}
            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] transition-colors ${
              variant === id ? 'bg-[#433139] text-[#FAF3EE]' : 'bg-[#F7F1EE] text-[#4d4448] border border-[#BDA494]/40 hover:bg-[#F2E9E5]'
            }`}
          >
            SEQ {id} · {label}
          </button>
        ))}
        {/* B2: pintu varian PDP yatim (028 simple / 030 recommended) */}
        <button
          onClick={() => { soundEngine.playSoftClick(); onNavigate?.('product-simple'); }}
          className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] bg-[#F7F1EE] text-[#4d4448] border border-[#BDA494]/40 hover:bg-[#F2E9E5] transition-colors"
        >
          SEQ 028 · Simple
        </button>
        <button
          onClick={() => { soundEngine.playSoftClick(); onNavigate?.('product-recommended'); }}
          className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] bg-[#F7F1EE] text-[#4d4448] border border-[#BDA494]/40 hover:bg-[#F2E9E5] transition-colors"
        >
          SEQ 030 · Recommended
        </button>
      </div>

      {variant === '029' ? (
        <>
          {/* ============ 029 — VARIANT STATE ============ */}
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#4d4448] mb-8">
            <button onClick={() => onNavigate?.('shop')} className="hover:text-[#433139] transition-colors">Shop</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-[#433139] cursor-pointer">Home Ritual</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#433139] font-semibold">Serenity Reed Diffuser</span>
            {/* prototype-only entry into checkout chain (mockup nav) */}
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => { soundEngine.playSoftClick(); onNavigate?.('checkout'); }} className="underline hover:text-[#433139] transition-colors">Tinjau Pesanan (demo)</button>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Gallery */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-[120px]">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#F7F1EE] border border-[#BDA494]/20 group relative">
                <img alt="Serenity Reed Diffuser" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={gallery029[selectedImg]} />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery029.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => { soundEngine.playSoftClick(); setSelectedImg(i); }}
                    className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden transition-opacity ${i === selectedImg ? 'border-2 border-[#433139]' : 'border border-[#BDA494]/40 opacity-70 hover:opacity-100'}`}
                  >
                    <img alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" src={src} />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="inline-flex px-3 py-1 rounded-full bg-[#F2E9E5] text-[#433139] text-[11px] uppercase tracking-widest font-semibold w-fit mb-4">Home Ritual</div>
              <h1 className="font-serif text-[28px] md:text-[36px] leading-tight font-semibold text-[#291714] mb-2">Serenity Reed Diffuser</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#b58a3c]">
                  {[0, 1, 2, 3].map((i) => <Star key={i} className="w-[18px] h-[18px] fill-current" />)}
                  <Star className="w-[18px] h-[18px] fill-current opacity-60" />
                </div>
                <span className="text-xs text-[#4d4448]">4.8 (89 ulasan)</span>
              </div>
              <div className="text-[24px] font-semibold text-[#291714] mb-8">Rp 269.000</div>
              <div className="w-full h-px bg-[#BDA494]/30 mb-8" />

              {/* Aroma */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-lg font-semibold text-[#291714]">Pilih Aroma</h3>
                  <span className="text-xs text-[#4d4448]">Sandalwood Haven</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input defaultChecked className="sr-only" name="aroma" type="radio" />
                    <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-[#433139] bg-[#F2E9E5]/50">
                      <img alt="" className="w-8 h-8 rounded-full object-cover" src={IMG.sandalwood} />
                      <span className="text-sm text-[#291714]">Sandalwood Haven</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input className="sr-only" name="aroma" type="radio" />
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-[#BDA494] bg-white hover:border-[#433139]/50 transition-colors">
                      <img alt="" className="w-8 h-8 rounded-full object-cover" src={IMG.lavender} />
                      <span className="text-sm text-[#4d4448]">Lavender Fields</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input className="sr-only" name="aroma" type="radio" />
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-[#BDA494] bg-white hover:border-[#433139]/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#F2E9E5] shrink-0" />
                      <span className="text-sm text-[#4d4448]">Citrus Grove</span>
                    </div>
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-[#BDA494]/40 bg-[#F7F1EE] opacity-60 cursor-not-allowed">
                    <div className="w-8 h-8 rounded-full bg-[#d0c3c7] shrink-0" />
                    <span className="text-sm text-[#4d4448] line-through">Vanilla Ember</span>
                  </div>
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#291714] mb-4">Pilih Ukuran</h3>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input defaultChecked className="sr-only" name="size" type="radio" />
                    <div className="flex flex-col p-4 rounded-lg border-2 border-[#433139] bg-[#F2E9E5]/50 text-center">
                      <span className="text-sm text-[#291714] mb-1">150ml</span>
                      <span className="text-xs text-[#4d4448]">Standar</span>
                    </div>
                  </label>
                  <div className="relative cursor-not-allowed">
                    <div className="flex flex-col p-4 rounded-lg border border-[#BDA494]/30 bg-[#F7F1EE] text-center opacity-60">
                      <span className="text-sm text-[#4d4448] line-through mb-1">250ml</span>
                      <span className="text-xs text-[#4d4448]">+Rp 80.000</span>
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F2E9E5] text-[#4d4448] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap border border-[#BDA494]/20">
                      Kombinasi tidak tersedia
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[#9E3B3B] mt-3 bg-[#9E3B3B]/5 w-fit px-3 py-1.5 rounded-md border border-[#9E3B3B]/20">
                  <Info className="w-4 h-4" />
                  <span className="text-xs">Silakan pilih ukuran terlebih dahulu</span>
                </div>
              </div>

              {/* CTA — mock aktif (Fix-12): toast "MOCK — DRAFT" */}
              <div className="mb-12">
                <button
                  onClick={() => onAddToCart?.('Serenity Reed Diffuser', 'Rp 269.000', IMG.serenityMain)}
                  className="w-full min-h-[56px] bg-[#5B4750] text-[#FAF3EE] text-sm font-bold uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" /> Tambah ke Keranjang
                </button>
              </div>

              <div className="border-t border-[#BDA494]/30 space-y-3">
                <Accordion title="Deskripsi" open>
                  <p>Ciptakan sanctuary di rumah Anda dengan Serenity Reed Diffuser. Dirancang untuk melepaskan aroma secara perlahan dan konsisten, diffuser ini mengubah ruang Anda menjadi tempat perlindungan yang menenangkan.</p>
                  <p>Diformulasikan dengan minyak esensial murni dan bahan dasar non-toksik, setiap tetesnya menceritakan kisah tentang kedamaian dan keseimbangan. Sandalwood Haven membawa kehangatan kayu yang dalam, dipadukan dengan sentuhan lembut amber.</p>
                </Accordion>
                <Accordion title="Cara Pakai &amp; Isi Ulang">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Lepaskan tutup pelindung dan masukkan batang rotan ke dalam botol.</li>
                    <li>Balik batang rotan setelah 1 jam pertama untuk mempercepat penyebaran aroma.</li>
                    <li>Balik batang secara berkala (seminggu sekali) untuk menyegarkan aroma.</li>
                    <li>Jauhkan dari sinar matahari langsung dan sumber angin.</li>
                  </ul>
                </Accordion>
                <Accordion title="Keamanan">
                  <p>Bebas phthalate, paraben, dan sulfate. Vegan dan cruelty-free. Jauhkan dari jangkauan anak-anak dan hewan peliharaan. Jangan letakkan langsung di atas furnitur tanpa alas, cairan dapat merusak permukaan kayu atau cat.</p>
                </Accordion>
                <Accordion title="Pengiriman">
                  <p>Dikemas dengan aman menggunakan pelindung ramah lingkungan. Pengiriman reguler 2-4 hari kerja. Pengiriman instan tersedia untuk area tertentu.</p>
                </Accordion>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ============ 031 — PRE-ORDER STATE ============ */}
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#4d4448] mb-8">
            <button onClick={() => onNavigate?.('shop')} className="hover:text-[#433139] transition-colors">Shop</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-[#433139] cursor-pointer">Sleep Ritual</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#433139] font-semibold">Moonlight Serenity Candle</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-start">
            {/* Gallery */}
            <div className="flex flex-col gap-3">
              <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#F7F1EE] border border-[#BDA494]/20">
                <img alt="Moonlight Serenity Candle" className="w-full h-full object-cover" src={IMG.moonJar} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-[#F7F1EE] rounded cursor-pointer border border-transparent opacity-60 hover:opacity-100 transition-opacity overflow-hidden">
                  <img alt="" className="w-full h-full object-cover rounded" src={IMG.moonJar} />
                </div>
                <div className="aspect-square bg-[#F7F1EE] rounded cursor-pointer border border-transparent opacity-60 hover:opacity-100 transition-opacity overflow-hidden">
                  <img alt="" className="w-full h-full object-cover rounded" src={IMG.moonBurn} />
                </div>
              </div>
            </div>

            {/* RIGHT column — revision 031: Deskripsi sits BELOW the Pre-Order CTA, in the right column */}
            <div className="flex flex-col space-y-8 py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/20">Pre-Order</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2E9E5] text-[#433139]">Sleep Ritual</span>
                </div>
                <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] md:text-[32px] md:leading-[40px] md:tracking-[-0.01em] font-semibold text-[#433139]">Moonlight Serenity Candle</h1>
                <div className="flex items-center gap-2 text-[#4d4448]">
                  <div className="flex text-[#d0c3c7]">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4" />)}
                  </div>
                  <span className="text-sm">Baru - belum ada ulasan</span>
                </div>
                <p className="text-[22px] leading-[28px] font-semibold text-[#433139] mt-2">Rp 229.000</p>
              </div>

              {/* Timeline card */}
              <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-lg p-6 space-y-6">
                <h3 className="font-semibold text-[#433139]">Informasi Pre-Order</h3>
                <div className="relative">
                  <div className="absolute top-[14px] left-[14px] right-[14px] h-px bg-[#d0c3c7] z-0" />
                  <div className="relative z-10 flex justify-between">
                    {([
                      [CalendarDays, 'Pre-Order Dibuka', '1 Mar', true],
                      [Factory, 'Produksi', '15 Mar', false],
                      [Truck, 'Pengiriman Dimulai', '1 Apr', false],
                    ] as const).map(([Icon, label, date, done], i) => (
                      <div key={i} className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-[#F7F1EE] ${done ? 'bg-[#433139] text-[#FAF3EE]' : 'bg-[#FAF3EE] text-[#7f7478] border border-[#d0c3c7]'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] text-[#4d4448] leading-tight">
                          {label}<br /><span className={`font-bold ${done ? 'text-[#433139]' : 'text-[#291714]'}`}>{date}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#FAF3EE] p-3 rounded flex items-start gap-3 border border-[#d0c3c7]/60">
                  <Info className="w-5 h-5 text-[#4A6984] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#4d4448]">Estimasi tiba: 5-10 April 2026</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-[#433139]">Jumlah:</span>
                  <div className="flex items-center border border-[#d0c3c7] rounded-md h-12 w-32 bg-[#FAF3EE]">
                    <button onClick={() => { soundEngine.playSoftClick(); setQty((q) => Math.max(1, q - 1)); }} className="px-3 h-full flex items-center justify-center text-[#433139] hover:bg-[#F2E9E5] transition-colors"><span className="material-symbols-outlined text-[20px]">remove</span></button>
                    <input readOnly type="text" value={qty} className="w-full text-center border-none bg-transparent focus:ring-0 p-0 text-sm text-[#433139] outline-none" />
                    <button onClick={() => { soundEngine.playSoftClick(); setQty((q) => Math.min(9, q + 1)); }} className="px-3 h-full flex items-center justify-center text-[#433139] hover:bg-[#F2E9E5] transition-colors"><span className="material-symbols-outlined text-[20px]">add</span></button>
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input defaultChecked type="checkbox" className="w-5 h-5 mt-1 accent-[#433139] rounded" />
                  <span className="text-sm text-[#4d4448] group-hover:text-[#433139] transition-colors">
                    Saya memahami bahwa ini adalah produk pre-order dan akan dikirim mulai 1 April 2026
                  </span>
                </label>
                {/* CTA — mock aktif (Fix-12): toast "MOCK — DRAFT" */}
                <button
                  onClick={() => mockToast('MOCK — DRAFT: Pre-order tercatat (demo, tanpa pembayaran)')}
                  className="w-full h-12 bg-[#5B4750] text-[#FAF3EE] font-semibold rounded hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" /> Pre-Order Sekarang
                </button>
                <p className="text-center text-xs text-[#7f7478]">Pembayaran penuh diperlukan saat pre-order</p>
              </div>

              {/* Accordions — placed under the CTA per revision 031 */}
              <div className="space-y-4">
                <Accordion title="Deskripsi" open>
                  <p>Terinspirasi dari ketenangan malam hari, Moonlight Serenity diracik secara eksklusif untuk membantu ritual tidur Anda. Kombinasi lembut dari French Lavender, Clary Sage, dan sentuhan hangat Sandalwood menciptakan harmoni aroma yang menenangkan pikiran dan merilekskan tubuh setelah hari yang panjang.</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Lilin kedelai natural (100% natural soy wax)</li>
                    <li>Sumbu katun bebas timbal untuk pembakaran bersih</li>
                    <li>Waktu bakar: ~45 jam</li>
                    <li>Volume: 200g</li>
                  </ul>
                </Accordion>
                <Accordion title="Timeline Pre-Order">
                  <p>Detail proses pembuatan hingga pengiriman.</p>
                </Accordion>
                <Accordion title="Kebijakan Pembatalan">
                  <p>Pesanan pre-order tidak dapat dibatalkan setelah masa pre-order ditutup (14 Maret 2026).</p>
                </Accordion>
                <Accordion title="Pengiriman">
                  <p>Pengiriman akan dilakukan sesuai urutan pemesanan mulai tanggal 1 April 2026.</p>
                </Accordion>
              </div>
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
