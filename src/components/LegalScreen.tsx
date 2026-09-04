import React, { useEffect, useState } from 'react';
import { Language, NavTab, LegalDoc } from '../types';
import { soundEngine } from '../utils/audio';
import {
  Download, ChevronDown, Info, Truck, RefreshCw, ArrowLeftRight,
  Package, BadgeCheck, Globe, ShieldCheck, FileText,
} from 'lucide-react';

interface LegalScreenProps {
  doc?: LegalDoc;
  lang?: Language;
  onNavigate?: (tab: NavTab) => void;
}

// Legal body copy transcribed verbatim from references 016/017/018.
// ponytail: no invented translations — full ID/EN parity of legal text awaits
// Revyna sign-off (localization contract, DRAFT_COPY). Only UI chrome is bilingual.

const TABS: { id: LegalDoc; labelId: string; labelEn: string }[] = [
  { id: 'privacy', labelId: 'Kebijakan Privasi', labelEn: 'Privacy Policy' },
  { id: 'terms', labelId: 'Syarat & Ketentuan', labelEn: 'Terms & Conditions' },
  { id: 'shipping', labelId: 'Pengiriman & Retur', labelEn: 'Shipping & Returns' },
];

const SUB_TABS = [
  { id: 'policy', label: 'Privacy Policy' },
  { id: 'cookies', label: 'Cookie Preferences' },
  { id: 'marketing', label: 'Marketing Consent' },
  { id: 'rights', label: 'Data Rights' },
] as const;

type SubTab = (typeof SUB_TABS)[number]['id'];

const TERMS_TOC = [
  // FIX_PLAN #32: hanya anchor yg punya section (general/account/commerce) — sisanya dead anchor
  ['general', '1. General'], ['account', '2. Account Terms'], ['commerce', '4. Commerce & Orders'],
];

const SHIPPING_FAQ = [
  ['Apakah biaya pengiriman retur ditanggung?', 'Biaya pengiriman retur ditanggung oleh pelanggan, kecuali jika produk yang diterima cacat atau terjadi kesalahan pengiriman dari pihak kami.'],
  ['Bisakah saya menukar produk (Exchange)?', 'Saat ini kami menyarankan Anda untuk meretur produk yang tidak sesuai dan melakukan pemesanan baru untuk produk yang Anda inginkan.'],
  ['Bagaimana jika paket saya hilang?', 'Jika paket Anda tidak tiba melewati batas waktu estimasi, silakan hubungi tim dukungan kami. Kami akan melakukan investigasi dengan pihak kurir.'],
];

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; id: string }> = ({ checked, onChange, disabled, id }) => (
  <button
    type="button"
    id={id}
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => { soundEngine.playSoftClick(); onChange(!checked); }}
    className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-200 shrink-0 ${
      checked ? 'bg-[#5B4750]' : 'bg-[#d0c3c7]'
    } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white border-4 border-[#BDA494] transition-transform duration-200 ${checked ? 'translate-x-6' : ''}`} />
  </button>
);

export const LegalScreen: React.FC<LegalScreenProps> = ({ doc = 'privacy', lang = 'id', onNavigate }) => {
  const t = (id: string, en: string) => (lang === 'id' ? id : en);
  const [active, setActive] = useState<LegalDoc>(doc);
  // NG-7 fix 2026-09-03: prop `doc` berubah saat Footer klik Terms/Shipping sementara layar
  // Legal sudah ter-mount → `active` stale. Sync prop → state.
  useEffect(() => { setActive(doc); }, [doc]);
  const [sub, setSub] = useState<SubTab>('policy');
  const [cookies, setCookies] = useState({ analytics: false, marketing: false });
  const [consent, setConsent] = useState({ journal: false, whatsapp: false, recommendations: false });
  const [alert, setAlert] = useState<string | null>(null);

  const go = (d: LegalDoc) => { soundEngine.playSoftClick(); setActive(d); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const flash = (msg: string) => { setAlert(msg); setTimeout(() => setAlert(null), 3500); };
  const savePrefs = (label: string) => { soundEngine.playSoftClick(); flash(label); };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] border-b border-[#BDA494] pb-2 mb-4">{children}</h2>
  );

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-10 pt-10 pb-24">
      {alert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#3D6852] text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold animate-fadeIn">
          {alert}
        </div>
      )}

      {/* Top-level legal tabs */}
      <div role="tablist" aria-label={t('Dokumen Legal', 'Legal Documents')} className="flex flex-wrap gap-6 border-b border-[#BDA494]/40 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => go(tab.id)}
            className={`pb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.06em] border-b-2 transition-colors ${
              active === tab.id ? 'border-[#433139] text-[#433139]' : 'border-transparent text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            {lang === 'id' ? tab.labelId : tab.labelEn}
          </button>
        ))}
      </div>

      {/* ============ 016 — PRIVACY, CONSENT & PREFERENCES ============ */}
      {active === 'privacy' && (
        <div>
          <h1 className="text-[32px] md:text-[48px] leading-tight font-semibold tracking-[-0.02em] text-[#433139] mb-3">
            Privasi, Consent &amp; Preferensi
          </h1>
          <p className="text-[#4d4448] max-w-2xl mb-8">
            Your digital sanctuary should feel safe. We prioritize your restorative experience over invasive tracking. Manage your data on your terms.
          </p>

          <div role="tablist" aria-label="Privacy sections" className="flex flex-wrap gap-6 border-b border-[#BDA494]/40 mb-10">
            {SUB_TABS.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={sub === s.id}
                onClick={() => { soundEngine.playSoftClick(); setSub(s.id); }}
                className={`pb-3 text-xs font-bold uppercase tracking-[0.06em] border-b-2 transition-colors ${
                  sub === s.id ? 'border-[#433139] text-[#433139]' : 'border-transparent text-[#4d4448] hover:text-[#433139]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {sub === 'policy' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <aside className="hidden md:block md:col-span-3">
                <div className="sticky top-32">
                  <h2 className="text-xs font-bold uppercase tracking-[0.06em] text-[#7f7478] mb-4">Table of Contents</h2>
                  <nav className="flex flex-col gap-2 text-sm text-[#4d4448]">
                    <span className="text-[#433139]">Information We Collect</span>
                    <span>How We Use Data</span>
                    <span>Data Sharing &amp; Transfers</span>
                    <span>Security Measures</span>
                  </nav>
                </div>
              </aside>
              <article className="md:col-span-9 max-w-[800px] text-[#4d4448] space-y-6">
                <div className="mb-6 border-b border-[#BDA494]/20 pb-2">
                  <span className="text-[11px] font-medium tracking-[0.04em] text-[#4d4448] uppercase">Version 2.1 — Effective Date: October 24, 2024</span>
                </div>
                <div className="space-y-4 leading-relaxed text-[#291714]">
                  <p>At ITS FAISHA™, we view privacy as an extension of the sanctuary we aim to build. We are committed to transparency, minimalistic data collection, and providing you absolute control over your digital footprint within our ecosystem.</p>
                  <h2 className="text-[20px] font-semibold text-[#433139] pt-4" id="info-collect">1. Information We Collect</h2>
                  <p>We only collect data that is strictly necessary to fulfill your orders, provide customer support, and, only if you explicitly choose, to personalize your restorative rituals. This includes standard transactional data (name, shipping address, payment tokens) and technical logs required for security.</p>
                  <h2 className="text-[20px] font-semibold text-[#433139] pt-4" id="how-we-use">2. How We Use Data</h2>
                  <p>Your data is utilized solely to enhance your experience. We do not sell your personal information to third-party data brokers. Analytics data is anonymized and aggregated to help us refine our journal content and scent formulations.</p>
                  <h2 className="text-[20px] font-semibold text-[#433139] pt-4" id="data-sharing">3. Data Sharing &amp; Transfers</h2>
                  <p>We share necessary information only with vetted partners (e.g., trusted shipping couriers, secure payment gateways) bound by strict confidentiality agreements. All data remains within secure, localized servers where legally mandated.</p>
                </div>
              </article>
            </div>
          )}

          {sub === 'cookies' && (
            <div className="max-w-[800px] space-y-4">
              <div className="mb-6">
                <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] mb-1">Cookie &amp; Tracking Preferences</h2>
                <p className="text-[#4d4448]">We believe in explicit consent. Review and adjust how we process your on-site behavior below. No non-essential trackers are active without your permission.</p>
              </div>
              <div className="bg-[#F7F1EE] p-6 rounded-xl border border-[#BDA494]/30 flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-[#433139] mb-1 flex items-center">Essential Cookies <span className="ml-2 text-[11px] font-medium tracking-[0.04em] bg-[#d0c3c7]/20 px-2 py-0.5 rounded-full text-[#4d4448]">Required</span></h3>
                  <p className="text-sm text-[#7f7478]">Crucial for basic site functionality, such as keeping your shopping bag secure and maintaining your session. These cannot be disabled.</p>
                </div>
                <Toggle id="toggle-essential" checked disabled />
              </div>
              <div className="bg-[#FAF3EE] hover:bg-[#F7F1EE] p-6 rounded-xl border border-[#BDA494]/30 flex justify-between items-start gap-4 transition-colors">
                <div>
                  <h3 className="font-semibold text-[#433139] mb-1">Performance &amp; Analytics</h3>
                  <p className="text-sm text-[#7f7478]">Help us understand how the sanctuary is navigated. This data is aggregated and anonymous, helping us improve site speed and design.</p>
                </div>
                <Toggle id="toggle-analytics" checked={cookies.analytics} onChange={(v) => setCookies((c) => ({ ...c, analytics: v }))} />
              </div>
              <div className="bg-[#FAF3EE] hover:bg-[#F7F1EE] p-6 rounded-xl border border-[#BDA494]/30 flex justify-between items-start gap-4 transition-colors">
                <div>
                  <h3 className="font-semibold text-[#433139] mb-1">Marketing &amp; Retargeting</h3>
                  <p className="text-sm text-[#7f7478]">Allows us to show you relevant ritual recommendations on other platforms based on your journey here.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => { soundEngine.playSoftClick(); setCookies((c) => ({ ...c, marketing: false })); }}
                    className="text-xs font-bold uppercase tracking-[0.06em] px-4 py-2 border border-[#d0c3c7] rounded hover:bg-[#F2E9E5] transition-colors text-[#4d4448]"
                  >
                    Reject
                  </button>
                  <Toggle id="toggle-marketing" checked={cookies.marketing} onChange={(v) => setCookies((c) => ({ ...c, marketing: v }))} />
                </div>
              </div>
              <div className="pt-4 border-t border-[#BDA494]/20">
                <button
                  onClick={() => savePrefs('Your preferences have been successfully updated.')}
                  className="bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.1em] px-8 py-4 rounded-full min-h-[48px] hover:bg-[#433139] transition-colors"
                >
                  Save Cookie Preferences
                </button>
              </div>
            </div>
          )}

          {sub === 'marketing' && (
            <div className="max-w-[800px]">
              <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] mb-1">Communication Preferences</h2>
              <p className="text-[#4d4448] mb-6">Choose how you wish to hear from us. We promise intentional, unhurried communication.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {([
                  ['journal', 'Journal Updates (Email)', 'Curated essays on restorative practices, sent bi-weekly.'],
                  ['whatsapp', 'WhatsApp Concierge', 'Direct support and rare scent drop notifications.'],
                  ['recommendations', 'Product Recommendations', 'Personalized ritual suggestions based on your past selections.'],
                ] as const).map(([key, title, desc]) => (
                  <label key={key} className="cursor-pointer border border-[#BDA494]/30 p-4 rounded-xl hover:bg-[#F7F1EE] transition-colors flex items-start gap-4 group">
                    <input
                      type="checkbox"
                      checked={consent[key]}
                      onChange={(e) => { soundEngine.playSoftClick(); setConsent((c) => ({ ...c, [key]: e.target.checked })); }}
                      className="mt-1 h-5 w-5 accent-[#5B4750] border-[#BDA494] rounded bg-transparent"
                    />
                    <span>
                      <span className="block font-semibold text-[#433139] group-hover:text-[#5B4750] transition-colors">{title}</span>
                      <span className="block text-sm text-[#7f7478] mt-1">{desc}</span>
                    </span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => savePrefs('Your preferences have been successfully updated.')}
                className="bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.1em] px-8 py-4 rounded-full min-h-[48px] hover:bg-[#433139] transition-colors"
              >
                Save Communication Preferences
              </button>
            </div>
          )}

          {sub === 'rights' && (
            <div className="max-w-[800px]">
              <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] mb-1">Your Data Rights</h2>
              <p className="text-[#4d4448] mb-6">You maintain sovereignty over your personal information. Execute your rights easily below.</p>
              <div className="space-y-3 mb-8">
                <div className="border border-[#BDA494]/30 p-6 rounded-xl bg-[#FAF3EE] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-[#433139]">Access &amp; Export</h3>
                    <p className="text-sm text-[#7f7478]">Download a comprehensive archive of the data associated with your account.</p>
                  </div>
                  <button
                    onClick={() => savePrefs('Archive request received. We will email your export within 30 days.')}
                    className="text-xs font-bold uppercase tracking-[0.06em] border-[1.5px] border-[#BDA494] text-[#4d4448] px-6 py-3 rounded-full hover:bg-[#F2E9E5] transition-colors whitespace-nowrap min-h-[48px]"
                  >
                    Request Archive
                  </button>
                </div>
                <div className="border border-[#BDA494]/30 p-6 rounded-xl bg-[#FAF3EE] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-[#9E3B3B]">Right to be Forgotten</h3>
                    <p className="text-sm text-[#7f7478]">Permanently delete your account and all associated personal data from our servers.</p>
                  </div>
                  <button
                    onClick={() => savePrefs('Deletion workflow initiated. Confirmation required via email.')}
                    className="text-xs font-bold uppercase tracking-[0.06em] border border-[#9E3B3B] text-[#9E3B3B] px-6 py-3 rounded-full hover:bg-[#9E3B3B]/10 transition-colors whitespace-nowrap min-h-[48px]"
                  >
                    Initiate Deletion
                  </button>
                </div>
              </div>
              <p className="text-[#7f7478] flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 shrink-0" />
                {/* FIX_PLAN #31: span bergaya link tapi bukan link → teks polos */}
                For complex requests, you can manage advanced settings in your Account Privacy Portal (coming soon — MOCK).
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============ 017 — SYARAT & KETENTUAN ============ */}
      {active === 'terms' && (
        <div>
          <div className="bg-[#4A6984] text-white py-3 px-4 md:px-10 text-center rounded mb-10">
            <p className="max-w-[1200px] mx-auto text-sm">
              <span className="font-bold">Update:</span> We have updated our Commerce &amp; Orders policy to better serve your ritual needs.
            </p>
          </div>
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-[32px] md:text-[48px] leading-tight font-semibold tracking-[-0.02em] text-[#433139] mb-4">
                {t('Syarat & Ketentuan', 'Terms & Conditions')}
              </h1>
              <div className="bg-[#F7F1EE] border border-[#BDA494] px-4 py-2 rounded inline-block text-sm font-semibold text-[#4d4448]">
                Version 1.0 — Effective: October 24, 2024
              </div>
            </div>
            <button
              onClick={() => { soundEngine.playSoftClick(); flash(t('Unduhan PDF segera tersedia.', 'PDF download coming soon.')); }}
              className="border-[1.5px] border-[#BDA494] text-[#4d4448] px-6 py-2 rounded hover:bg-[#F2E9E5] transition-colors text-sm font-semibold h-12 flex items-center gap-2"
            >
              <Download className="w-[18px] h-[18px]" />
              {t('Unduh PDF', 'Download PDF')}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <aside className="w-full md:w-1/4 hidden md:block">
              <div className="sticky top-32">
                <h2 className="text-xs font-bold uppercase tracking-[0.06em] text-[#7f7478] mb-4">Table of Contents</h2>
                <nav className="flex flex-col gap-2 text-sm">
                  {TERMS_TOC.map(([anchor, label]) => (
                    <a key={anchor} href={`#terms-${anchor}`} className={anchor === 'general' ? 'text-[#433139]' : 'text-[#4d4448] hover:text-[#433139] transition-colors'}>
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
            <div className="w-full md:w-3/4 max-w-[800px] text-[#4d4448] space-y-8">
              <section id="terms-general" className="scroll-mt-32">
                <h2 className="text-[20px] leading-8 font-semibold text-[#433139] mb-4">1. General Terms</h2>
                <p className="mb-2">By accessing or using the ITS FAISHA™ digital sanctuary and commerce platform, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
                <p>Our platform is designed to provide a restorative and unhurried experience. We reserve the right to modify these terms at any time, with material changes notified via prominent banners or direct communication.</p>
              </section>
              <div className="w-full h-px bg-[#BDA494]/30" />
              <section id="terms-account" className="scroll-mt-32">
                <h2 className="text-[20px] leading-8 font-semibold text-[#433139] mb-4">2. Account Registration &amp; Security</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  <li className="pl-1">You must provide accurate and complete information when creating an account.</li>
                  <li className="pl-1">You are responsible for maintaining the confidentiality of your login credentials.</li>
                  <li className="pl-1">ITS FAISHA™ reserves the right to suspend or terminate accounts that violate our community guidelines or demonstrate disruptive behavior.</li>
                </ol>
              </section>
              <div className="w-full h-px bg-[#BDA494]/30" />
              <section id="terms-commerce" className="scroll-mt-32">
                <h2 className="text-[20px] leading-8 font-semibold text-[#433139] mb-4">4. Commerce, Orders &amp; Returns</h2>
                <p className="mb-2">All orders placed through ITS FAISHA™ are subject to product availability and acceptance. We strive to accurately display colors and descriptions, though variations may occur.</p>
                <p>For detailed information regarding shipping timelines, returns, and refunds, please consult our <button onClick={() => go('shipping')} className="text-[#433139] underline hover:text-[#5B4750]">Shipping &amp; Returns policy</button>, which is incorporated into these terms by reference.</p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* ============ 018 — PENGIRIMAN, RETUR & REFUND ============ */}
      {active === 'shipping' && (
        <div className="space-y-16">
          <div className="bg-[#F7F1EE] text-[#4d4448] text-center py-2 text-[11px] font-medium tracking-[0.04em] rounded -mt-4">
            Policy updated: October 24, 2024
          </div>
          <header className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-[32px] md:text-[48px] leading-tight font-semibold tracking-[-0.02em] text-[#433139]">
              {t('Pengiriman, Retur & Refund', 'Shipping, Returns & Refunds')}
            </h1>
            <p className="text-lg leading-7 text-[#4d4448]">
              {t('Panduan lengkap mengenai kebijakan layanan kami demi kenyamanan perjalanan Anda bersama kami.', 'A complete guide to our service policies for the comfort of your journey with us.')}
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              [Truck, 'Gratis Ongkir', 'Untuk pesanan di atas Rp 500.000'],
              [RefreshCw, '30 Hari Retur', 'Jendela waktu pengembalian produk'],
              [ArrowLeftRight, 'Proses Refund Cepat', 'Diproses dalam 7 hari kerja'],
            ] as const).map(([Icon, title, desc], i) => (
              <div key={i} className="bg-[#F7F1EE] border border-[#BDA494] rounded-lg p-6 flex flex-col items-center text-center space-y-3 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                <Icon className="w-8 h-8 text-[#433139]" strokeWidth={1.5} />
                <h3 className="font-semibold text-[#433139]">{title}</h3>
                <p className="text-[#4d4448]">{desc}</p>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            <SectionTitle>{t('Pengiriman', 'Shipping')}</SectionTitle>
            <div className="overflow-x-auto border border-[#BDA494] rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F2E9E5] text-[#433139] font-semibold">
                  <tr>
                    <th className="p-4 border-b border-[#BDA494]">{t('Metode', 'Method')}</th>
                    <th className="p-4 border-b border-[#BDA494]">{t('Wilayah', 'Region')}</th>
                    <th className="p-4 border-b border-[#BDA494]">{t('Estimasi Waktu', 'Estimated Time')}</th>
                    <th className="p-4 border-b border-[#BDA494]">{t('Biaya', 'Cost')}</th>
                  </tr>
                </thead>
                <tbody className="text-[#4d4448]">
                  <tr className="bg-white">
                    <td className="p-4 border-b border-[#BDA494]">Standard</td><td className="p-4 border-b border-[#BDA494]">Jabodetabek</td><td className="p-4 border-b border-[#BDA494]">3-5 Hari Kerja</td><td className="p-4 border-b border-[#BDA494]">Flat Rate</td>
                  </tr>
                  <tr className="bg-[#F7F1EE]">
                    <td className="p-4 border-b border-[#BDA494]">Express</td><td className="p-4 border-b border-[#BDA494]">Jabodetabek</td><td className="p-4 border-b border-[#BDA494]">1-2 Hari Kerja</td><td className="p-4 border-b border-[#BDA494]">Rp 50.000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4">Standard</td><td className="p-4">Luar Pulau</td><td className="p-4">5-7 Hari Kerja</td><td className="p-4">Sesuai Kurir</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-[#4A6984]/10 border border-[#4A6984]/20 rounded-lg p-6 flex items-start gap-4">
              <Globe className="w-5 h-5 text-[#4A6984] mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-[#4A6984] mb-2">{t('Pengiriman Internasional', 'International Shipping')}</h4>
                <p className="text-[#4d4448]">
                  {t('Saat ini pengiriman internasional belum tersedia, namun kami sedang berusaha memperluas jangkauan sanctuary kami segera.', 'International shipping is not yet available, but we are working to expand our sanctuary’s reach soon.')}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle>{t('Proses Retur', 'Returns Process')}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-[#BDA494] z-0" />
              {([
                [Package, '1', 'Kemas Ulang', 'Pastikan produk belum digunakan dan dikemas dengan aman di kotak aslinya.'],
                [Truck, '2', 'Kirim Kembali', 'Gunakan label pengiriman yang kami sediakan untuk mengirimkan paket.'],
                [BadgeCheck, '3', 'Verifikasi', 'Tim kami akan memeriksa produk dan memproses permintaan Anda.'],
              ] as const).map(([Icon, num, title, desc], i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-24 h-24 rounded-full bg-white border border-[#BDA494] flex items-center justify-center shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                    <span className="absolute text-6xl font-semibold text-[#433139]/20 -z-10">{num}</span>
                    <Icon className="w-8 h-8 text-[#433139]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-[#433139]">{title}</h3>
                  <p className="text-[#4d4448] max-w-xs">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 max-w-3xl">
            <SectionTitle>{t('Kebijakan Refund', 'Refund Policy')}</SectionTitle>
            <div className="text-[#4d4448] space-y-3">
              <p>Pengembalian dana (refund) akan diproses setelah kami menerima dan memverifikasi kondisi produk retur. Proses ini biasanya memakan waktu hingga <strong>7 hari kerja</strong>.</p>
              <p>Dana akan dikembalikan ke metode pembayaran asli Anda (Kartu Kredit, Transfer Bank, atau E-Wallet). Waktu yang dibutuhkan hingga dana masuk ke rekening Anda mungkin berbeda-beda tergantung pada kebijakan bank atau penyedia layanan pembayaran Anda.</p>
            </div>
          </section>

          <section className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] text-center">{t('Pertanyaan Umum', 'Common Questions')}</h2>
            <div className="space-y-4">
              {SHIPPING_FAQ.map(([q, a], i) => (
                <details key={i} className="group border border-[#BDA494] rounded-lg bg-white overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                  <summary className="font-semibold text-[#433139] p-4 cursor-pointer flex justify-between items-center list-none outline-none">
                    {q}
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="p-4 pt-0 text-[#4d4448] border-t border-[#BDA494] mt-2 bg-[#FAF3EE]/30">{a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center bg-[#F2E9E5] rounded-xl p-10 md:p-16 flex flex-col items-center space-y-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
            <ShieldCheck className="w-8 h-8 text-[#433139]" strokeWidth={1.5} />
            <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139]">Questions about your order?</h2>
            <p className="text-[#4d4448] max-w-lg">Tim Sanctuary kami siap membantu Anda menjawab segala pertanyaan terkait pesanan, pengiriman, atau produk kami.</p>
            <button
              onClick={() => { soundEngine.playSoftClick(); onNavigate?.('support'); }}
              className="h-12 px-8 rounded-full border-[1.5px] border-[#BDA494] text-[#402b28] font-semibold hover:bg-[#BDA494]/10 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {t('Hubungi Kami', 'Contact Us')}
            </button>
          </section>
        </div>
      )}
    </div>
  );
};
