import React from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { MapPin, Truck, CreditCard, StickyNote, Lock } from 'lucide-react';

// STRICTLY MOCKUP (SEQ 038): static "Tinjau Pesanan" render — no forms, no cart math.
// GOVERNANCE: "Konfirmasi & Bayar" disabled — DRAFT_NON_PURCHASABLE.
interface CheckoutReviewScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

const ITEMS = [
  { name: 'Calm Morning Candle', detail: '200g', qty: 'Qty: 2', price: 'Rp 378.000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDekx7iYDa8TS_3kfBiU3ByxqQR-o6SAh6iU9a2PPwCc-TaK5Ol2BzZIMdjYx4L5SOQvRxTV0I7xXXehxvu1CfC79-lufy9tfW4NPQVjZGY7Dfvj9TMKABB2Z8li5YSblxU_rdb62EWCfhXy-rjk38Iz0_VpWquQw54eY40R87fDbzqoQVdLQxScyNz-XrnTD-SXbH_zV4IVPDhguWTQHwe8nuDkWJOv6ryNNa8QL8RlUkNYQYtUyEn3KG0TupDlrFYOsLDpgHDEf4' },
  { name: 'Lavender Dream Pillow Mist', detail: '', qty: 'Qty: 1', price: 'Rp 149.000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzpPwqe0dWCsPkfh1fcIYTDHO7O_-14MFvWTGZhk0sw1-F6qkuBTyoj21nsuymlomaM1U23Dt3WMCsGswb0d9OljRFWHCimLgfdrxi-OaUzYIhLzgECPvdC2L3vU_KiiIQZTOkPdk7qmdSGzoE6-6QQzJSWBod7cCR3NVvWKAe41NW9ghPQYl7q9q_I0euMte97q5ieSBvk5dpmsT6tqRAS-RWk5zo8nh54YLgbES21IT6uKcIf66ZQwyoO_KyCtiq04ULJhiP8QU' },
  { name: 'Gratitude Journal', detail: '', qty: 'Qty: 1', price: 'Rp 149.000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgjDvH2f_xdNjXnTTLysDYVBvkLlSPFcxnUMkR62DQKO9103ABGtMOzOC_7InLd1mDSV0epe9XCMB8NKNDHw0ryWb0N8npk0_4Zoswz86RcXuVM0uwW6OOO3Y1bvIIlhQYyuYIsdQo4umS6FSvz5VnEqSiZk1wgDhCcZxF6lp5r5mn0yX6M8Rf61uDUCVbRgfm4gjRRsVvONQjuxyr5XfXSNQSzilzhha7F5Dmila6HZIfyf8BNmt2aZNdU2xjsyd4TXwr2jg-lVI' },
];

const SUMMARY = [
  ['Subtotal', 'Rp 676.000', 'text-[#291714]'],
  ['Diskon', '-Rp 14.900', 'text-[#3D6852]'],
  ['Ongkir', 'Rp 22.000', 'text-[#291714]'],
  ['Biaya Layanan', 'Rp 2.500', 'text-[#291714]'],
] as const;

const SectionCard: React.FC<{ icon?: React.ReactNode; title: string; note?: string; children: React.ReactNode }> = ({ icon, title, note, children }) => (
  <section className="bg-white p-6 border border-[#BDA494]/50 rounded-lg shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
    <div className="flex justify-between items-center mb-4 border-b border-[#BDA494]/30 pb-2">
      <h2 className="text-lg font-semibold text-[#433139] flex items-center gap-2">
        {icon} {title} {note && <span className="text-sm font-normal text-[#4d4448]">{note}</span>}
      </h2>
      {title !== 'Produk (3)' && title !== 'Ringkasan Pesanan' && !note && (
        <button onClick={() => soundEngine.playSoftClick()} className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#78555d] hover:underline">Ubah</button>
      )}
    </div>
    {children}
  </section>
);

export const CheckoutReviewScreen: React.FC<CheckoutReviewScreenProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-10 py-10">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-[28px] md:text-[36px] leading-tight font-semibold text-[#433139] mb-1">Tinjau Pesananmu</h1>
        <p className="text-sm text-[#4d4448]">
          Pastikan semuanya sudah tepat sebelum konfirmasi.{' '}
          <button onClick={() => onNavigate?.('product')} className="text-[#78555d] underline hover:text-[#433139]">← Kembali ke Produk (demo)</button>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <SectionCard title="Produk (3)">
            <div className="flex flex-col gap-4">
              {ITEMS.map((item) => (
                <div key={item.name} className="flex items-start gap-4 py-2 border-b border-[#BDA494]/10 last:border-0">
                  <div className="w-20 h-20 bg-[#F2E9E5] rounded border border-[#BDA494]/20 overflow-hidden shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-[#433139]">{item.name}</h3>
                    {item.detail && <p className="text-xs text-[#4d4448] mb-1">{item.detail}</p>}
                    <p className="text-sm text-[#433139] mt-1">{item.qty}</p>
                  </div>
                  <p className="font-semibold text-[#433139] text-right">{item.price}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={<MapPin className="w-5 h-5 text-[#78555d]" />} title="Alamat Pengiriman">
            <div className="text-sm text-[#291714] space-y-1">
              <p className="font-semibold mb-1">Nadia Prameswari</p>
              <p className="text-[#4d4448] mb-1">0812 3456 7890</p>
              <p className="text-[#4d4448]">
                Jl. Kemang Timur No. 24, Apartemen Tower B Unit 12,<br />Jakarta Selatan 12560
              </p>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard icon={<Truck className="w-5 h-5 text-[#78555d]" />} title="Metode Pengiriman">
              <p className="text-sm text-[#291714]">Reguler 3-5 hari</p>
              <p className="font-semibold text-[#433139] mt-1">Rp 22.000</p>
            </SectionCard>
            <SectionCard icon={<CreditCard className="w-5 h-5 text-[#78555d]" />} title="Metode Pembayaran">
              <p className="text-sm text-[#291714]">BCA Virtual Account</p>
            </SectionCard>
          </div>

          <SectionCard icon={<StickyNote className="w-5 h-5 text-[#78555d]" />} title="Catatan Pesanan" note="(Opsional)">
            <textarea
              placeholder="Tulis catatan untuk pesananmu..."
              className="w-full min-h-[100px] p-4 border border-[#BDA494] bg-white focus:border-[#433139] focus:ring-0 text-sm text-[#291714] resize-y placeholder:text-[#4d4448]/50 outline-none"
            />
          </SectionCard>
        </div>

        {/* Right column — sticky summary */}
        <div className="md:col-span-4">
          <div className="sticky top-[100px] bg-white p-6 border border-[#BDA494]/50 rounded-lg shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
            <h2 className="text-lg font-semibold text-[#433139] mb-4 border-b border-[#BDA494]/30 pb-2">Ringkasan Pesanan</h2>
            <div className="flex flex-col gap-2 mb-6 text-sm">
              {SUMMARY.map(([label, value, cls]) => (
                <div key={label} className={`flex justify-between ${cls}`}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#BDA494]/30 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-semibold text-[#433139]">TOTAL AKHIR</span>
                <span className="text-2xl font-semibold text-[#78555d]">Rp 685.600</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 mt-0.5 accent-[#78555d] rounded" />
                <span className="text-xs text-[#4d4448] leading-relaxed group-hover:text-[#433139] transition-colors">
                  Saya menyetujui <button onClick={() => onNavigate?.('legal')} className="underline hover:text-[#78555d]">Syarat &amp; Ketentuan</button> dan <button onClick={() => onNavigate?.('legal')} className="underline hover:text-[#78555d]">Kebijakan Privasi</button> ITS FAISHA
                </span>
              </label>
              <p className="text-xs text-[#9E3B3B] mt-1 ml-7 flex items-center gap-1">
                <span>Wajib disetujui sebelum konfirmasi</span>
              </p>
            </div>
            {/* GOVERNANCE: purchase confirmation disabled — DRAFT_NON_PURCHASABLE */}
            <button
              disabled
              title="DRAFT_NON_PURCHASABLE"
              className="w-full bg-[#d0c3c7] text-[#4d4448]/50 text-xs font-bold uppercase tracking-[0.06em] py-4 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Konfirmasi &amp; Bayar</span>
              <Lock className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-[#4d4448] mt-2 italic">*total sesuai dengan keranjang</p>
            {/* prototype-only: jump to post-purchase screen (mockup nav, not a purchase action) */}
            <button
              onClick={() => { soundEngine.playSoftClick(); onNavigate?.('next-ritual'); }}
              className="w-full mt-3 text-center text-[11px] font-bold uppercase tracking-[0.06em] text-[#78555d] hover:underline"
            >
              Lihat Ritual Setelah Pembayaran (demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
