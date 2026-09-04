import React from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { Check, Copy, History, Info, Truck, Receipt, ArrowLeft } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-075 "Order Detail" (1:1 intent html/075).
// Timeline 5 step + items + info pengiriman/pembayaran. Mock-only.

interface OrderDetailScreenProps {
  onNavigate: (tab: NavTab) => void;
  onToast?: (msg: string) => void;
}

const ITEMS = [
  { name: 'Calm Morning Candle 200g', qty: 'x2', price: 'Rp 378.000', badge: null as string | null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBvxyy5MLAfvJ1fvZ2LOnwUUS0fz-h_2iCkDvI121TfjYc1ybe27xZ2-I73VRBvCnEa5KAZsW0uhFhzYwb5FmgYwLLfgG-GyZ2qiYaTuwMrEZ0LwZF9GZZrYSgBi7SKP0rAl5FKFmVRaopp71vylkVpooK7oObxsTLl2oO48owyLEz8pKphAwz-3j4cnGqj5iERFli-5XwePfUloFnTF9FYUmnpO9Ll3yKHePR1C9CGmLwHpEStdWZ7gaYuI7NKuITjMfMYixWk9I' },
  { name: 'Lavender Dream Pillow Mist', qty: 'x1', price: 'Rp 149.000', badge: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiKQKvgakLDJ2PJIBw-iL3mQyeRgdZVFIo74eTlrRiOAgfmKPKYDMyhBO98X2jLcNIFirAijFARp1MCzuYszL22aYnuHEdwqPm63nxtzvGiGtro7AyT6D0d5CBNb8vhh-Mj6N0iC3nFwImqn7uqrmwAXmH1vzPcH9-7MSNruRX2xyXM-AeVwVJAXTo-TJ6Q3isTd8rCt0avfwjrzermHAD66L0mKHmhuSfYEFyKbnULH5m69abSQbvrDQB5EOdh3r1UOf9YXPksQo' },
  { name: 'Gratitude Journal', qty: 'x1', price: 'Rp 149.000', badge: 'bagian dari set -10%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUJlARZMt_uA4ETh3LZjrmt4-9lWNkTxhseevShO8C4whOtaLnW2rLoCrdR83VrIQcC3EVciSrjVQ3lkUB9nLzuJoWCUFFak2xFpAF7M2ruOJ-s6PshIxd4u6aYOX4cWP4AWdX2OMHZSb712HJ4NBXbeNdRveZ99PBtRp1KvxoLPIA6s8sAT5PPPtT_SRvY6QLBOo5DLLR2rBTEsQhOX5bNQftfr6y8NzpDbQSYtTXzoGe10ocqqBKxLCxe0eampBz1tOFnX7kaqQ' },
];

const STEPS = [
  { label: 'Dikonfirmasi', state: 'done' },
  { label: 'Dibayar', state: 'done' },
  { label: 'Dikemas', state: 'done' },
  { label: 'Dikirim', state: 'current' },
  { label: 'Terkirim', state: 'todo' },
] as const;

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ onNavigate, onToast }) => {
  const go = (tab: NavTab) => onNavigate(tab);
  const toast = (m: string) => (onToast ? onToast(m) : undefined);

  return (
    <AccountShell active="my-orders" onNavigate={go}>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => go('my-orders')}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-[#4d4448] hover:text-[#433139] mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Pesanan
        </button>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#4d4448]">Detail Pesanan</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4A6984]/10 text-[#4A6984] border border-[#4A6984]/20 rounded-full text-[11px] font-medium">
            <Truck className="w-3.5 h-3.5" /> Dalam Pengiriman
          </span>
        </div>
        <h1 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-[#433139]">Pesanan FAI-2026-030841</h1>
        <p className="text-base text-[#4d4448] mt-1">Dipesan pada 8 Maret 2026</p>
      </div>

      <div className="flex flex-col gap-8 max-w-[900px]">
        {/* Exception banner */}
        <div className="bg-[#FFF8E7] border border-[#F5D78B] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#B8860B] shrink-0" />
            <div>
              <p className="text-base font-semibold text-[#8A6508]">Kurir melaporkan kendala</p>
              <p className="text-base text-[#8A6508]/80">Estimasi pengiriman mundur 1 hari dari jadwal semula.</p>
            </div>
          </div>
          <button
            onClick={() => go('support')}
            className="shrink-0 px-4 py-2 bg-transparent border border-[#F5D78B] text-[#8A6508] rounded text-sm font-semibold hover:bg-[#F5D78B]/20 transition-colors"
          >
            Hubungi Dukungan
          </button>
        </div>

        {/* Status timeline */}
        <section className="bg-white rounded-xl p-6 border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
          <h2 className="text-[22px] font-semibold text-[#433139] mb-8">Status Pengiriman</h2>
          <div className="relative flex justify-between w-full max-w-3xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s.label} className="relative flex flex-col items-center flex-1 z-10">
                {i < STEPS.length - 1 && (
                  <div className={`absolute top-3 left-1/2 w-full h-0.5 ${i < 3 ? 'bg-[#433139]' : 'bg-[#d0c3c7]'}`} />
                )}
                {s.state === 'done' && (
                  <div className="w-6 h-6 rounded-full bg-[#433139] border-4 border-white flex items-center justify-center mb-2 shadow-sm relative z-10">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                {s.state === 'current' && (
                  <div className="w-6 h-6 rounded-full bg-white border-4 border-[#433139] flex items-center justify-center mb-2 shadow-sm relative z-10 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-[#433139]" />
                  </div>
                )}
                {s.state === 'todo' && (
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-[#d0c3c7] flex items-center justify-center mb-2 relative z-10" />
                )}
                <span className={`text-[11px] text-center ${s.state === 'current' ? 'text-[#433139] font-bold' : s.state === 'done' ? 'text-[#433139]' : 'text-[#4d4448]'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-[#d0c3c7]/20 flex items-start gap-4">
            <History className="w-5 h-5 text-[#4d4448] mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#433139]">Pesanan telah diserahkan ke pihak kurir</p>
              <p className="text-[11px] text-[#4d4448]">9 Maret 2026, 14:30 WIB — Fasilitas Sortir JNE, Jakarta</p>
            </div>
          </div>
        </section>

        {/* Items + info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="text-[22px] font-semibold text-[#433139]">Item Pesanan</h2>
            <div className="bg-white rounded-xl border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)] overflow-hidden">
              {ITEMS.map((it) => (
                <div key={it.name} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-[#d0c3c7]/20 hover:bg-[#F2E9E5]/30 transition-colors">
                  <img className="w-20 h-20 rounded-md object-cover shrink-0" alt="" src={it.img} />
                  <div className="flex-grow flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-[#433139]">{it.name}</h3>
                      {it.badge && (
                        <span className="px-2 py-0.5 bg-[#433139]/5 text-[#433139] border border-[#433139]/10 rounded text-[10px] font-medium uppercase tracking-wider">
                          {it.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-base text-[#4d4448]">{it.qty}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5">
                    <span className="text-base font-semibold text-[#433139]">{it.price}</span>
                    <button
                      onClick={() => go('shop')}
                      className="text-[10px] font-bold tracking-widest text-[#78555d] hover:text-[#433139] border-b border-transparent hover:border-[#433139] pb-0.5 uppercase"
                    >
                      Pesan Lagi
                    </button>
                  </div>
                </div>
              ))}
              {/* Historical note */}
              <div className="bg-[#ffe2de]/30 p-2 px-4 flex items-center gap-4 border-t border-[#d0c3c7]/10">
                <span className="px-2 py-1 bg-[#fedbd6] text-[#4d4448] rounded text-[10px] font-medium uppercase">Dibatalkan</span>
                <span className="text-sm text-[#4d4448] italic">Satu item (Travel Size Ritual Kit) dihapus dari pesanan sebelum pembayaran.</span>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Shipping */}
            <div className="bg-white rounded-xl p-4 border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4d4448] mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4" /> Info Pengiriman
              </h3>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[11px] text-[#4d4448]">Jasa Kirim</p>
                  <p className="text-base font-semibold text-[#433139]">JNE Reguler</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#4d4448]">Nomor Resi</p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-[#433139] font-mono tracking-wider">882910034551</p>
                    <button
                      onClick={() => toast('MOCK — Resi 882910034551 disalin (demo)')}
                      className="text-[#78555d] hover:text-[#433139]"
                      title="Salin Resi"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-1 pt-2 border-t border-[#d0c3c7]/20">
                  <p className="text-[11px] text-[#4d4448] mb-1">Alamat Tujuan</p>
                  <p className="text-base text-[#433139] font-medium">Nadia Prameswari</p>
                  <p className="text-base text-[#4d4448] leading-relaxed">
                    Jl. Kemang Timur No. 24,<br />Apartemen Tower B Unit 12,<br />Jakarta Selatan, DKI Jakarta 12730
                  </p>
                </div>
              </div>
            </div>
            {/* Payment */}
            <div className="bg-white rounded-xl p-4 border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)] relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 border-4 border-[#3D6852]/20 rounded-full flex items-center justify-center rotate-12 pointer-events-none opacity-40">
                <span className="text-[#3D6852] text-lg font-bold tracking-widest font-serif">LUNAS</span>
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4d4448] mb-4 flex items-center gap-2">
                <Receipt className="w-4 h-4" /> Info Pembayaran
              </h3>
              <div className="mb-4">
                <p className="text-[11px] text-[#4d4448]">Metode</p>
                <p className="text-base font-semibold text-[#433139]">BCA Virtual Account</p>
              </div>
              <div className="flex flex-col gap-1 pt-2 border-t border-[#d0c3c7]/20 text-base">
                {[
                  ['Subtotal Produk', 'Rp 676.000', '#433139'],
                  ['Diskon Set (-10%)', '-Rp 14.900', '#78555d'],
                  ['Ongkos Kirim', 'Rp 22.000', '#433139'],
                  ['Biaya Layanan', 'Rp 2.500', '#433139'],
                ].map(([label, val, color]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[#4d4448]">{label}</span>
                    <span style={{ color }}>{val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#d0c3c7]/20">
                  <span className="text-[22px] font-semibold text-[#433139]">Total Bayar</span>
                  <span className="text-[22px] font-semibold text-[#433139]">Rp 685.600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountShell>
  );
};
