import React, { useState } from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { HelpCircle, Package2 } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-074 "Pesanan Saya" (1:1 intent html/074, perfected).
// Filter chips + 3 order cards (active/delivered/pending) + skeleton + empty.
// Mock-only; order IDs/dates/totals = demo data, no real purchase flow.

interface MyOrdersScreenProps {
  onNavigate: (tab: NavTab) => void;
}

const CARD = 'bg-white rounded-lg p-6 border border-[#d0c3c7]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]';

type Filter = 'semua' | 'aktif' | 'selesai' | 'dibatalkan';
type Status = 'shipped' | 'delivered' | 'pending';

interface Order {
  id: string;
  date: string;
  total: string;
  status: Status;
  img: string;
  extraItems?: number;
  cta: { label: string; primary?: boolean; action: NavTab }[];
}

const ORDERS: Order[] = [
  {
    id: 'FAI-2026-030841',
    date: '8 Mar 2026',
    total: 'Rp 685.600',
    status: 'shipped',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJ9ywI01vRtCoUd-3jtvCvprWWfQN65TQXsfDWnlgLOhJ4Ll_v8v3d__m9R4i_-fIy5DVwNYN8rNtLYzUrt_D5EnvlLH66HdtEkbLRhFj2qDC5z9Bo0zGrLPB3JTvTM4y4uT48wxKYhYmpwn_kmzI1KyvDGhw4Sr1Y0NO76hQp4C5HZ8qaDzn2uKoekZ7FedLfxg2TGe4Bymfm1WV88zyblr6HRzDAFCgoZ-syfXxHU-POnr-LjA2bpli7vG0SwQvMHRyf_GUi7w',
    extraItems: 2,
    cta: [
      { label: 'Detail', action: 'order-detail' },
      { label: 'Lacak', primary: true, action: 'order-tracking' },
    ],
  },
  {
    id: 'FAI-2026-029977',
    date: '21 Feb 2026',
    total: 'Rp 189.000',
    status: 'delivered',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKehZ8HFw71juiCOm7TUXvDsIFoW-qD_5yrrI52ijso38tg0Tvc_dxgibqaTOz1TJrbDWb-NyU6v5QtuAWn_Q6vldB8b5IZqmOE_d6xEWuLhhYRbt2YbUIlYpQANI4BjGDdzam07hASJdU5jJYcXvuS-9lpbpfjEyjx0XP_wzF2RNGb9Bk2iHm3AnG7UYFI6eHrmYJhrwc_Tzn8X8vtgwt9i4g-dR6s2DWggGtLzTpI1rFmDavydANULQygXrRK_6f0JA5ViH7DFQ',
    cta: [{ label: 'Pesan Lagi', action: 'shop' }],
  },
  {
    id: 'FAI-2026-030912',
    date: 'Hari Ini',
    total: 'Rp 139.000',
    status: 'pending',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrSpz2bj1qMFIgXSZ4AtFzzEc0_JWj6-XzjQ7RsGcOV78W3Ei9wNR3fTXl5UqBIkAyvLFYarOjf0UVnP_D687GPRxgIs7xJBF1mwG-VWEb7FCbqPCi1DUXTRVKCfcQBRbv8gfnHqI3ONEKAECOUaxa_mF6YB49X-ZHyzw9PhvuNmq9LHvbFkFOmMyk2xGYTI_wAuvDk1WJSCcv4WJ3QRSDZeoQwwpVQUHuuz2YTKk7Vbjf78e2ulMjedaF1kYbSmyqeEZfQKDQUw0',
    cta: [{ label: 'Bayar Sekarang', primary: true, action: 'checkout-payment' }],
  },
];

const STATUS_CHIP: Record<Status, { label: string; cls: string }> = {
  shipped: { label: 'Dalam Pengiriman', cls: 'bg-[#ffe2de] text-[#433139] border-[#433139]/20' },
  delivered: { label: 'Terkirim', cls: 'bg-[#e6f4ea] text-[#3D6852] border-[#3D6852]/20' },
  pending: { label: 'Menunggu Pembayaran', cls: 'bg-[#fff8e1] text-[#B8860B] border-[#B8860B]/20' },
};

const FILTERS: Filter[] = ['semua', 'aktif', 'selesai', 'dibatalkan'];

export const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<Filter>('semua');
  const go = (tab: NavTab) => onNavigate(tab);

  return (
    <AccountShell active="my-orders" onNavigate={go}>
      <div className="mb-8">
        <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139]">Pesanan Saya</h2>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-3 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-[14px] font-semibold border transition-colors capitalize ${
              filter === f
                ? 'bg-[#433139] text-[#FAF3EE] border-[#433139]'
                : 'border-[#d0c3c7] text-[#4d4448] hover:bg-[#fff0ee]'
            }`}
          >
            {f === 'dibatalkan' ? 'Dibatalkan' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-6">
        {ORDERS.map((o) => {
          const chip = STATUS_CHIP[o.status];
          return (
            <div key={o.id} className={CARD}>
              {/* Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#d0c3c7]/30">
                <div>
                  <p className="text-[11px] leading-4 text-[#4d4448] mb-1">ID Pesanan</p>
                  <p className="text-[16px] font-semibold text-[#433139]">{o.id}</p>
                  <p className="text-[16px] text-[#4d4448] mt-1">{o.date}</p>
                </div>
                <span className={`text-[11px] font-medium px-3 py-1 rounded-full border ${chip.cls}`}>
                  {chip.label}
                </span>
              </div>
              {/* Body: image + total */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-4">
                  <img className="w-20 h-20 rounded-md object-cover border border-[#d0c3c7]/50" alt="" src={o.img} />
                  {o.extraItems && (
                    <div className="flex items-center justify-center w-20 h-20 rounded-md bg-[#fff0ee] border border-[#d0c3c7]/30 text-[#4d4448] text-[14px] font-semibold">
                      +{o.extraItems} item
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#4d4448] mb-1">Total Belanja</p>
                  <p className="text-[22px] font-semibold text-[#433139]">{o.total}</p>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#d0c3c7]/30">
                <button className="text-[11px] text-[#4A6984] hover:underline flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" /> Butuh bantuan?
                </button>
                <div className="flex gap-3">
                  {o.cta.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => go(c.action)}
                      className={`h-12 px-6 rounded text-[14px] font-semibold transition-colors ${
                        c.primary
                          ? 'bg-[#433139] text-[#FAF3EE] hover:bg-[#5B4750]'
                          : 'border-[1.5px] border-[#BDA494] text-[#433139] hover:bg-[#fff0ee]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Skeleton (loading placeholder) */}
        <div className={`${CARD} opacity-60`}>
          <div className="space-y-2 mb-6 pb-4 border-b border-[#d0c3c7]/30">
            <div className="h-3 w-16 bg-[#F2E9E5] rounded animate-pulse" />
            <div className="h-5 w-32 bg-[#F2E9E5] rounded animate-pulse" />
            <div className="h-4 w-24 bg-[#F2E9E5] rounded animate-pulse" />
          </div>
          <div className="h-20 w-20 bg-[#F2E9E5] rounded-md animate-pulse" />
        </div>
      </div>

      {/* Empty state */}
      <div className="mt-16 py-12 flex flex-col items-center justify-center text-center border-t border-[#d0c3c7]/20">
        <Package2 className="w-12 h-12 text-[#d0c3c7] mb-4" strokeWidth={1} />
        <p className="text-[18px] text-[#4d4448] mb-6 max-w-md">
          Belum ada pesanan — jelajahi ritual perawatan yang dirancang khusus untuk ketenangan Anda.
        </p>
        <button
          onClick={() => go('shop')}
          className="h-12 px-8 rounded bg-[#433139] text-[#FAF3EE] text-[14px] font-semibold hover:opacity-90 transition-opacity"
        >
          Mulai Ritual
        </button>
      </div>
    </AccountShell>
  );
};
