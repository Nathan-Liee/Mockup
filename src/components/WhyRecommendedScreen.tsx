import React from 'react';
import { NavTab } from '../types';
import { AccountShell } from './AccountShell';
import { ShieldCheck } from 'lucide-react';

// B4 2026-09-03 — FAI-SCR-063 "Mengapa Rekomendasi Ini Untukmu" (1:1 intent html/063, perfected).
// Transparansi sinyal rekomendasi: 4 bar 3 segmen + kartu "Apa yang TIDAK kami gunakan".
// CTA "Tambahkan ke Ritual" = demo callback (DRAFT_NON_PURCHASABLE).

interface WhyRecommendedScreenProps {
  onNavigate: (tab: NavTab) => void;
  onAddToRitual?: (productName: string) => void;
}

const PRODUCT_IMG = 'https://lh3.googleusercontent.com/aida/AEtjO1UWNouW6VhpN-ptWhevyp9BBVFt9xICdaoCd0xslbvyuiENdytRbFAfBajb0oJnTHTK-MmnuLpNDPe8o5baiMngK9HJrgHOl9_U_bpSGyLTs8y_239wws7Cnnp_ItRjtSuxgjXvsR6wNWV4bJVniDYaT5WPWyA9_DrWWvmamREzKzuKUtfPdtd7nOjXg2yB0B6ESFC8KktUbaCQPpXIyPR3CpTv1XZrXKL821Tfpr5Wh2kowMUd3kHMsO8';

type Signal = { need: string; answer: string; level: 1 | 2 | 3; label: string };

const SIGNALS: Signal[] = [
  { need: 'Kamu butuh ruang untuk bernapas', answer: 'Aroma cashmere dipilih untuk rasa dipeluk', level: 3, label: 'Sangat Selaras' },
  { need: 'Energimu mudah habis', answer: 'Notes amber dipilih untuk hangat menenangkan', level: 2, label: 'Selaras' },
  { need: 'Momen tenangmu ada di malam hari', answer: 'Produk ini dirancang untuk ritual malam', level: 3, label: 'Sangat Selaras' },
  { need: 'Ketertarikan pada kehangatan', answer: 'Profil Warm Amber dominan di jawabanmu', level: 1, label: 'Cukup' },
];

export const WhyRecommendedScreen: React.FC<WhyRecommendedScreenProps> = ({ onNavigate, onAddToRitual }) => {
  return (
    <AccountShell active="my-results" onNavigate={onNavigate}>
      <header className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B4750] mb-2">Mengapa</p>
        <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-.01em] text-[#433139]">
          Mengapa Rekomendasi Ini Untukmu
        </h1>
        <p className="text-base leading-[24px] text-[#4d4448] mt-2 max-w-2xl">
          Kami percaya rekomendasi yang baik bisa dijelaskan dengan bahasa manusia. Ini alasan di balik pilihan untukmu.
        </p>
      </header>

      {/* Kartu produk */}
      <section className="bg-white rounded-xl border border-[#BDA494]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)] p-5 md:p-6 mb-8 flex flex-col sm:flex-row items-start gap-5">
        <div className="w-full sm:w-40 aspect-square rounded-lg overflow-hidden bg-[#F2E9E5] shrink-0">
          <img alt="Cashmere Embrace Candle" className="w-full h-full object-cover" src={PRODUCT_IMG} />
        </div>
        <div className="flex-1">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.08em] text-[#3D6852] bg-[#3D6852]/10 px-3 py-1 rounded-full mb-3">
            92% MATCH
          </span>
          <h2 className="text-lg font-semibold text-[#291714]">Cashmere Embrace Candle</h2>
          <p className="text-sm text-[#4d4448] mt-1">Dipilih dari ribuan kombinasi karena selaras dengan jawabanmu.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onAddToRitual?.('Cashmere Embrace Candle')}
              className="h-11 px-6 bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all"
            >
              Tambahkan ke Ritual
            </button>
            <button
              onClick={() => onNavigate('product-recommended')}
              className="h-11 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] transition-colors"
            >
              Lihat Produk
            </button>
          </div>
        </div>
      </section>

      {/* 4 sinyal */}
      <section className="space-y-4 mb-10">
        {SIGNALS.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#BDA494]/40 p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#7f7478]">Sinyal {i + 1}</p>
                <p className="text-base font-semibold text-[#291714] mt-1">"{s.need}"</p>
                <p className="text-sm text-[#4d4448] mt-1">→ {s.answer}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex gap-1" role="img" aria-label={`${s.level} dari 3 selaras`}>
                  {[1, 2, 3].map((seg) => (
                    <span
                      key={seg}
                      className={`w-8 h-2 rounded-full ${seg <= s.level ? 'bg-[#5B4750]' : 'bg-[#F2E9E5] border border-[#BDA494]/50'}`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#5B4750] w-24 text-right">{s.label}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Transparansi */}
      <section className="bg-[#F2E9E5]/50 rounded-xl border border-[#BDA494]/40 p-6 max-w-3xl">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#3D6852] mt-0.5 shrink-0" />
          <div>
            <h2 className="text-base font-semibold text-[#433139]">Apa yang TIDAK kami gunakan</h2>
            <p className="text-sm leading-[22px] text-[#4d4448] mt-2">
              Rekomendasi ini tidak memakai data lokasi, riwayat browsing, atau data dari pihak ketiga. Kami hanya membaca jawaban assessment-mu dan preferensi yang kamu pilih sendiri.
            </p>
          </div>
        </div>
      </section>
    </AccountShell>
  );
};
