import React, { useMemo, useState } from 'react';
import { Language, NavTab } from '../types';
import { IMAGES } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import {
  Mail, MessageCircle, FileText, Handshake, Info, Clock,
  Search, ChevronDown, Upload, Check,
} from 'lucide-react';

type View = 'contact' | 'faq';

interface SupportScreenProps {
  view?: View;
  lang?: Language;
  onNavigate?: (tab: NavTab) => void;
  /** FIX_PLAN #29: link Kebijakan Privasi → 016 (bukan 'about') */
  onOpenLegal?: (doc: 'privacy' | 'terms' | 'shipping') => void;
}

const FAQ_ITEMS = [
  {
    cat: 'shipping',
    qId: 'Berapa lama pengiriman biasanya?',
    qEn: 'How long does shipping usually take?',
    aId: 'Pengiriman standar di seluruh Indonesia biasanya memakan waktu 3-5 hari kerja. Pengiriman internasional bervariasi tergantung tujuan, umumnya tiba dalam 10-14 hari kerja.',
    aEn: 'Standard shipping within Indonesia typically takes 3-5 business days. International shipping varies by destination but generally arrives within 10-14 business days.',
  },
  {
    cat: 'assessment',
    qId: 'Bagaimana cara mengikuti Ritual Assessment?',
    qEn: 'How do I take the Ritual Assessment?',
    aId: 'Anda dapat mengakses Beautiful Soul Assessment melalui tombol "Mulai Assessment". Assessment ini membutuhkan waktu sekitar 3 menit dan memberikan rekomendasi ritual yang dipersonalisasi.',
    aEn: 'You can access our Beautiful Soul Assessment through the "Begin Assessment" button. It takes about 3 minutes to complete and provides personalized ritual recommendations.',
  },
  {
    cat: 'products',
    qId: 'Apakah produk Anda di-source secara etis?',
    qEn: 'Are your products ethically sourced?',
    aId: 'Ya. Kami berkomitmen pada praktik restoratif, bukan hanya untuk individu, tetapi juga untuk bumi. Seluruh botani dipanen secara berkelanjutan, dan kemasan kami 100% dapat didaur ulang atau dikompos.',
    aEn: 'Yes. We are deeply committed to restorative practices, not just for individuals, but for the earth. All botanicals are sustainably harvested, and our packaging is 100% recyclable or compostable.',
  },
  {
    cat: 'products',
    qId: 'Bagaimana cara menyimpan produk saya?',
    qEn: 'How should I store my products?',
    aId: 'Kami menyarankan menyimpan semua produk di tempat sejuk dan kering, jauh dari sinar matahari langsung, untuk menjaga khasiat dan umur simpannya.',
    aEn: 'We recommend storing all products in a cool, dry place away from direct sunlight to maintain their efficacy and shelf life.',
  },
  {
    cat: 'shipping',
    qId: 'Bagaimana kebijakan pengembalian Anda?',
    qEn: 'What is your return policy?',
    aId: 'Kami menerima pengembalian dalam 14 hari setelah pengiriman untuk produk yang belum dibuka dalam kemasan aslinya. Silakan hubungi dukungan untuk memulai pengembalian.',
    aEn: 'We accept returns within 14 days of delivery for unopened items in their original packaging. Please contact support to initiate a return.',
  },
  {
    cat: 'account',
    qId: 'Bagaimana cara memperbarui informasi akun saya?',
    qEn: 'How do I update my account information?',
    aId: 'Masuk ke akun Anda menggunakan ikon profil di kanan atas. Buka "Pengaturan Akun" untuk memperbarui alamat pengiriman, metode pembayaran, dan preferensi komunikasi.',
    aEn: 'Log in to your account using the profile icon in the top right corner. Navigate to Account Settings where you can update your shipping address, payment methods, and communication preferences.',
  },
];

const INQUIRY_TYPES = [
  { value: 'general', labelId: 'Pertanyaan Umum', labelEn: 'General Inquiry' },
  { value: 'order', labelId: 'Dukungan Pesanan', labelEn: 'Order Support' },
  { value: 'partnership', labelId: 'Kemitraan', labelEn: 'Partnership' },
  { value: 'product', labelId: 'Pertanyaan Produk', labelEn: 'Product Question' },
];

const FAQ_CATEGORIES = [
  { id: 'all', labelId: 'Semua', labelEn: 'All' },
  { id: 'products', labelId: 'Produk & Ritual', labelEn: 'Products & Rituals' },
  { id: 'shipping', labelId: 'Pengiriman & Retur', labelEn: 'Shipping & Returns' },
  { id: 'assessment', labelId: 'Assessment & Hasil', labelEn: 'Assessment & Results' },
  { id: 'account', labelId: 'Akun & Privasi', labelEn: 'Account & Privacy' },
];

export const SupportScreen: React.FC<SupportScreenProps> = ({
  view = 'contact',
  lang = 'id',
  onNavigate,
  onOpenLegal,
}) => {
  const t = (id: string, en: string) => (lang === 'id' ? id : en);

  // 008 form state
  const [inquiryType, setInquiryType] = useState('general');
  const [consent, setConsent] = useState(false);
  // 009 success state
  const [submitted, setSubmitted] = useState<{ ref: string; type: string; date: string } | null>(null);
  // 010 FAQ state
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  // PASS-3 fix 2026-09-04: alert() dilarang — ganti toast inline (pola JournalScreen).
  const [toast, setToast] = useState<string | null>(null);
  const mockToast = (msg: string) => {
    soundEngine.playSoftClick();
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const go = (tab: NavTab) => {
    soundEngine.playSoftClick();
    onNavigate?.(tab);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const typeLabel = INQUIRY_TYPES.find((i) => i.value === inquiryType);
    setSubmitted({
      // FIX_PLAN #30: tanpa ID random (larangan invent ID) — konstanta MOCK
      ref: '#FAI-PENDING (MOCK)',
      type: lang === 'id' ? typeLabel?.labelId ?? '' : typeLabel?.labelEn ?? '',
      date: new Date().toLocaleString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
      }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_ITEMS.filter(
      (f) =>
        (category === 'all' || f.cat === category) &&
        (!q || f.qId.toLowerCase().includes(q) || f.qEn.toLowerCase().includes(q) ||
          f.aId.toLowerCase().includes(q) || f.aEn.toLowerCase().includes(q)),
    );
  }, [query, category]);

  /* ============ 009 — CONFIRMATION SUCCESS ============ */
  if (view === 'contact' && submitted) {
    return (
      <div className="animate-fadeIn py-16 md:py-24 px-4">
        <div className="max-w-[640px] mx-auto flex flex-col items-center text-center">
          <div className="w-32 h-32 md:w-44 md:h-44 mb-8 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.08)] border border-[#BDA494]/30">
            <img src={IMAGES.successBotanicals} alt={t('Ilustrasi keberhasilan botani', 'Botanical success illustration')} className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#433139] font-semibold mb-4">
            {t('Terima Kasih, Beautiful Soul', 'Thank You, Beautiful Soul')}
          </h1>
          <p className="text-sm md:text-base text-[#4d4448] max-w-md mb-10">
            {t('Pesan Anda telah kami terima. Kami akan merespons dengan penuh perhatian secepat mungkin.', 'Your message has been received. We will respond with care as soon as possible.')}
          </p>

          <div className="w-full bg-[#F7F1EE] border border-[#BDA494] rounded-lg p-6 mb-10 text-left">
            <h2 className="font-serif font-semibold text-[#433139] mb-4 pb-2 border-b border-[#BDA494]/30">
              {t('Detail Tiket', 'Ticket Details')}
            </h2>
            <ul className="space-y-3 text-sm text-[#4d4448]">
              {[
                [t('Nomor Referensi', 'Reference Number'), submitted.ref],
                [t('Tipe Pertanyaan', 'Inquiry Type'), submitted.type],
                [t('Dikirim', 'Submitted'), submitted.date],
                [t('Ekspektasi Respons', 'Expected Response'), t('Dalam 24 jam', 'Within 24 hours')],
              ].map(([label, value]) => (
                <li key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#4d4448]/70">{label}</span>
                  <span className="font-semibold text-[#291714]">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10 max-w-lg">
            <p className="text-sm text-[#291714] mb-2">
              {t('Email konfirmasi telah dikirim ke kotak masuk Anda.', 'A confirmation email has been sent to your inbox.')}
            </p>
            <div className="flex items-start gap-2 justify-center text-[#4A6984] text-xs">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-left">
                {t('Jika Anda tidak menerima email dalam 5 menit, silakan periksa folder spam Anda.', 'If you do not receive the email within 5 minutes, please check your spam folder.')}
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-serif font-semibold text-[#433139] mb-3">{t('Langkah Selanjutnya', 'Next Steps')}</h3>
            <ul className="text-left space-y-2 text-sm text-[#4d4448] list-disc list-inside">
              <li>{t('Tim kami sedang meninjau permintaan Anda.', 'Our team is reviewing your request.')}</li>
              <li>{t('Anda akan menerima jawaban melalui email.', 'You will receive a reply via email.')}</li>
              <li>{t('Jika mendesak, Anda dapat membalas email konfirmasi tersebut.', 'If urgent, you can reply directly to the confirmation email.')}</li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <button
              onClick={() => go('beranda')}
              className="w-full sm:w-auto min-w-[200px] h-12 px-6 border-[1.5px] border-[#BDA494] rounded text-[#291714] font-semibold text-sm hover:bg-[#F7F1EE] transition-colors"
            >
              {t('Kembali ke Beranda', 'Back to Home')}
            </button>
            <button
              onClick={() => go('faq')}
              className="text-sm font-semibold text-[#433139] hover:opacity-80 border-b border-transparent hover:border-[#433139] pb-0.5 transition-all"
            >
              {t('Lihat FAQ Kami', 'View Our FAQs')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============ 010 — FAQ ============ */
  if (view === 'faq') {
    return (
      <div className="animate-fadeIn">
        <section className="pt-14 md:pt-20 pb-12 px-4 text-center">
          <div className="max-w-[800px] mx-auto">
            <h1 className="font-serif text-3xl md:text-5xl text-[#433139] font-semibold mb-4">
              {t('Pertanyaan Umum', 'Frequently Asked Questions')}
            </h1>
            <p className="text-base md:text-lg text-[#4d4448] mb-10">
              {t('Temukan jawaban atas pertanyaan umum tentang ITS FAISHA™.', 'Find answers to common questions about ITS FAISHA™.')}
            </p>
            <div className="max-w-[600px] mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d0c3c7]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-[#BDA494] rounded text-[#433139] placeholder:text-[#d0c3c7] focus:border-[#433139] focus:outline-none transition-colors text-sm"
                placeholder={t('Cari jawaban...', 'Search for answers...')}
                type="text"
                aria-label={t('Cari FAQ', 'Search FAQs')}
              />
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24 px-4">
          <div className="max-w-[800px] mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
              {FAQ_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { soundEngine.playSoftClick(); setCategory(c.id); }}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
                    category === c.id
                      ? 'bg-[#5b4750] text-white'
                      : 'bg-[#F7F1EE] text-[#433139] border border-[#BDA494] hover:bg-[#F2E9E5]'
                  }`}
                >
                  {lang === 'id' ? c.labelId : c.labelEn}
                </button>
              ))}
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="border-t border-[#BDA494]">
                {filteredFaqs.map((f) => (
                  <details key={f.qEn} className="group border-b border-[#BDA494]">
                    <summary className="py-6 flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-semibold text-[#433139] text-sm md:text-base pr-8">
                        {lang === 'id' ? f.qId : f.qEn}
                      </span>
                      <ChevronDown className="w-5 h-5 text-[#d0c3c7] shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="pb-6 pr-12 text-sm text-[#4d4448] leading-relaxed">
                      {lang === 'id' ? f.aId : f.aEn}
                    </p>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-[#d0c3c7] mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-[#433139] mb-2">
                  {t('Tidak ada hasil ditemukan', 'No results found')}
                </h3>
                <p className="text-sm text-[#4d4448] mb-6">
                  {t('Kami tidak menemukan jawaban yang cocok dengan pencarian Anda.', "We couldn't find an answer matching your search.")}
                </p>
                <button
                  onClick={() => go('support')}
                  className="inline-flex items-center justify-center px-6 py-3 border-[1.5px] border-[#BDA494] text-[#433139] font-semibold text-sm rounded hover:bg-[#F2E9E5] transition-colors min-h-[48px]"
                >
                  {t('Hubungi Dukungan', 'Contact Support')}
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-14 md:py-20 bg-[#F7F1EE]">
          <div className="max-w-[600px] mx-auto text-center px-4">
            <h2 className="font-serif text-2xl md:text-3xl text-[#433139] font-semibold mb-4">
              {t('Masih Butuh Bantuan?', 'Still Need Help?')}
            </h2>
            <p className="text-sm md:text-base text-[#4d4448] mb-8">
              {t('Tim concierge kami siap membantu pertanyaan spesifik tentang perjalanan restoratif Anda.', 'Our concierge team is available to assist you with any specific inquiries regarding your restorative journey.')}
            </p>
            <button
              onClick={() => go('support')}
              className="inline-flex items-center justify-center px-8 py-3 border-[1.5px] border-[#BDA494] text-[#433139] font-semibold text-xs uppercase tracking-wider rounded hover:bg-white transition-colors min-h-[48px]"
            >
              {t('Hubungi Kami', 'Contact Us')}
            </button>
          </div>
        </section>
      </div>
    );
  }

  /* ============ 007 + 008 — SUPPORT LANDING + CONTACT FORM ============ */
  const channels = [
    { icon: Mail, titleId: 'Email Support', titleEn: 'Email Support', descId: 'tanya@itsfaisha.com', descEn: 'tanya@itsfaisha.com', slaId: 'Dalam 24 jam', slaEn: 'Within 24 hours', ctaId: 'Kirim Email', ctaEn: 'Send Email', primary: true, href: 'mailto:tanya@itsfaisha.com' },
    // FIX_PLAN #28: WhatsApp href="#" dead → mock (belum tersedia)
    { icon: MessageCircle, titleId: 'WhatsApp Support', titleEn: 'WhatsApp Support', descId: 'Chat langsung dengan ritual specialist', descEn: 'Direct chat with a ritual specialist', slaId: 'Dalam 2 jam', slaEn: 'Within 2 hours', ctaId: 'Chat Sekarang', ctaEn: 'Chat Now', primary: false, href: '#whatsapp-mock' },
    { icon: FileText, titleId: 'Contact Form', titleEn: 'Contact Form', descId: 'Pertanyaan detail dan masukan', descEn: 'Detailed inquiries and feedback', slaId: 'Dalam 24 jam', slaEn: 'Within 24 hours', ctaId: 'Buka Formulir', ctaEn: 'Open Form', primary: false, href: '#contact-form' },
    { icon: Handshake, titleId: 'Partnership Inquiry', titleEn: 'Partnership Inquiry', descId: 'Kolaborasi dan grosir', descEn: 'Collaborations and wholesale', slaId: '2-3 hari kerja', slaEn: '2-3 business days', ctaId: 'Ajukan', ctaEn: 'Inquire', primary: false, href: 'mailto:collab@itsfaisha.com' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* 007 Hero */}
      <section className="bg-[#FAF3EE] py-14 md:py-20 px-4 text-center">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-[#433139] font-semibold mb-4">
            {t('Hubungi & Dukungan', 'Contact & Support')}
          </h1>
          <p className="text-base md:text-lg text-[#4d4448]">
            {t('Kami di sini membantu Anda dalam perjalanan jiwa yang indah.', 'We are here to help you on your beautiful soul journey.')}
          </p>
        </div>
      </section>

      {/* 007 Prefill note */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 mt-6">
        <div className="bg-[#F2E9E5] border border-[#d0c3c7] rounded-lg p-4 flex items-center gap-4">
          <Info className="w-5 h-5 text-[#4A6984] shrink-0" />
          <p className="text-sm text-[#4d4448]">
            {t('Detail Anda akan otomatis terisi pada formulir kontak untuk kenyamanan Anda.', 'Your details will be automatically pre-filled in the contact form for your convenience.')}
          </p>
        </div>
      </div>

      {/* 007 Channel shortcuts */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((c) => (
            <div key={c.titleEn} className="bg-[#F7F1EE] border border-[#BDA494] rounded-2xl p-6 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-[#FAF3EE] p-2 rounded-full mb-4">
                <c.icon className="w-5 h-5 text-[#5B4750]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#433139] mb-1">
                {lang === 'id' ? c.titleId : c.titleEn}
              </h3>
              <p className="text-sm text-[#4d4448] mb-1">{lang === 'id' ? c.descId : c.descEn}</p>
              <p className="text-[11px] text-[#7f7478] mb-6 mt-auto">{lang === 'id' ? c.slaId : c.slaEn}</p>
              <a
                href={c.href}
                onClick={
                  c.href === '#contact-form'
                    ? (e) => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); }
                    : c.href === '#whatsapp-mock'
                      ? (e) => { e.preventDefault(); mockToast(lang === 'id' ? 'MOCK — WhatsApp concierge belum tersedia (demo).' : 'MOCK — WhatsApp concierge not available yet (demo).'); }
                      : undefined
                }
                className={`w-full flex justify-center items-center h-12 rounded font-semibold text-xs uppercase tracking-wider px-4 transition-opacity ${
                  c.primary
                    ? 'bg-[#5B4750] text-[#FAF3EE] hover:opacity-90'
                    : 'border-[1.5px] border-[#BDA494] text-[#433139] hover:bg-[#F2E9E5]'
                }`}
              >
                {lang === 'id' ? c.ctaId : c.ctaEn}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 007 Operating hours banner */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 pb-14">
        <div className="bg-[#F2E9E5] border-l-4 border-[#4A6984] p-6 rounded-r-lg flex items-start gap-4">
          <Clock className="w-5 h-5 text-[#4A6984] mt-0.5 shrink-0" />
          <div>
            <h4 className="font-serif font-semibold text-[#433139] mb-1">
              {t('Jam Operasional & Waktu Respons', 'Operating Hours & Response Times')}
            </h4>
            <p className="text-sm text-[#4d4448] leading-relaxed">
              {t('Ritual specialist kami tersedia Senin hingga Jumat, 09.00 - 17.00 WIB. Kami berupaya merespons semua pertanyaan dalam rentang waktu di atas pada jam kerja. Pertanyaan yang dikirim pada akhir pekan atau hari libur akan ditangani pada hari kerja berikutnya.', 'Our ritual specialists are available Monday to Friday, 9:00 AM - 5:00 PM WIB. We strive to respond to all inquiries within the timeframes listed above during business hours. Inquiries sent on weekends or holidays will be attended to on the next business day.')}
            </p>
          </div>
        </div>
      </section>

      {/* 008 Contact form */}
      <section id="contact-form" className="max-w-[1200px] mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 lg:col-start-2 flex flex-col gap-10 w-full max-w-[640px] mx-auto">
            <div className="flex flex-col gap-3 text-center">
              <nav className="text-[11px] font-bold uppercase tracking-wider text-[#4d4448] mb-2">
                {t('Beranda › Kontak › Formulir Kontak', 'Home › Contact › Contact Form')}
              </nav>
              <h2 className="font-serif text-2xl md:text-3xl text-[#433139] font-semibold">
                {t('Kirim Pesan Untuk Kami', 'Send Us a Message')}
              </h2>
              <p className="text-base text-[#4d4448]">
                {t('Bagikan pikiran, pertanyaan, atau ide kemitraan Anda dengan ritual specialist kami. Kami biasanya merespons dalam 24 jam kerja.', 'Share your thoughts, questions, or partnership ideas with our ritual specialists. We typically respond within 24 business hours.')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Inquiry type */}
              <div className="flex flex-col gap-4">
                <label className="text-sm font-semibold text-[#433139]">{t('Tipe Pertanyaan', 'Inquiry Type')}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {INQUIRY_TYPES.map((i) => (
                    <label key={i.value} className="cursor-pointer">
                      <input
                        checked={inquiryType === i.value}
                        onChange={() => { soundEngine.playSoftClick(); setInquiryType(i.value); }}
                        className="peer sr-only"
                        name="inquiry_type"
                        type="radio"
                        value={i.value}
                      />
                      <div className="w-full text-center py-2 px-1 border border-[#BDA494] rounded bg-[#FAF3EE] text-[#291714] text-[11px] font-medium transition-colors peer-checked:border-[#433139] peer-checked:bg-[#F2E9E5] peer-checked:text-[#433139]">
                        {lang === 'id' ? i.labelId : i.labelEn}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-[#433139]" htmlFor="fullName">{t('Nama Lengkap *', 'Full Name *')}</label>
                  <input className="h-12 bg-[#FAF3EE] border border-[#BDA494] rounded px-4 text-sm focus:border-[#433139] focus:outline-none transition-colors" id="fullName" name="fullName" required type="text" autoComplete="name" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#433139]" htmlFor="email">{t('Alamat Email *', 'Email Address *')}</label>
                  <input className="h-12 bg-[#FAF3EE] border border-[#BDA494] rounded px-4 text-sm focus:border-[#433139] focus:outline-none transition-colors" id="email" name="email" required type="email" autoComplete="email" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#433139]" htmlFor="phone">{t('Nomor Telepon (Opsional)', 'Phone Number (Optional)')}</label>
                  <input className="h-12 bg-[#FAF3EE] border border-[#BDA494] rounded px-4 text-sm focus:border-[#433139] focus:outline-none transition-colors" id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-[#433139]" htmlFor="subject">{t('Subjek *', 'Subject *')}</label>
                  <input className="h-12 bg-[#FAF3EE] border border-[#BDA494] rounded px-4 text-sm focus:border-[#433139] focus:outline-none transition-colors" id="subject" name="subject" required type="text" />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-[#433139]" htmlFor="message">{t('Pesan *', 'Message *')}</label>
                  <textarea className="bg-[#FAF3EE] border border-[#BDA494] rounded px-4 py-2 text-sm focus:border-[#433139] focus:outline-none transition-colors resize-y min-h-[120px]" id="message" name="message" required rows={5} />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-[#433139]">{t('Lampiran (Opsional)', 'Attachment (Optional)')}</label>
                  <label className="border border-dashed border-[#BDA494] rounded flex flex-col items-center justify-center p-6 bg-[#FAF3EE]/50 cursor-pointer hover:bg-[#F2E9E5] transition-colors group">
                    <Upload className="w-6 h-6 text-[#7f7478] group-hover:text-[#433139] transition-colors" />
                    <span className="text-[11px] font-medium text-[#4d4448] mt-2">{t('Unggah Berkas', 'Upload File')}</span>
                    <span className="text-xs text-[#d0c3c7] mt-1">PDF, DOC, JPG {t('hingga 5MB', 'up to 5MB')}</span>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg" className="sr-only" />
                  </label>
                </div>
              </div>

              {/* Consent & submit */}
              <div className="flex flex-col gap-6 mt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-5 h-5 rounded border-[#BDA494] accent-[#433139] bg-[#FAF3EE]"
                    required
                    type="checkbox"
                  />
                  <span className="text-sm text-[#4d4448]">
                    {t('Saya menyetujui ', 'I agree to the ')}
                    <button type="button" onClick={() => { soundEngine.playSoftClick(); onOpenLegal?.('privacy'); }} className="underline hover:text-[#433139]">{t('Kebijakan Privasi', 'Privacy Policy')}</button>
                  </span>
                </label>
                <button
                  disabled={!consent}
                  type="submit"
                  className="w-full bg-[#5B4750] text-[#FAF3EE] font-semibold text-sm h-12 rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {t('Kirim Pesan', 'Send Message')}
                </button>
              </div>
            </form>
          </div>

          {/* 008 side panel */}
          <div className="hidden lg:flex lg:col-span-2 lg:col-start-11 flex-col gap-8 border-l border-[#d0c3c7]/20 pl-6 pt-8">
            <div>
              <h3 className="font-serif font-semibold text-[#433139] text-sm mb-1">{t('Jam Operasional', 'Operating Hours')}</h3>
              <p className="text-sm text-[#4d4448]">{t('Sen - Jum: 09.00 - 17.00 WIB', 'Mon - Fri: 9am - 5pm WIB')}<br />{t('Akhir pekan: Tutup', 'Weekend: Closed')}</p>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#433139] text-sm mb-1">{t('Dukungan Langsung', 'Direct Support')}</h3>
              <a className="text-sm text-[#4d4448] hover:text-[#433139] underline" href="mailto:support@itsfaisha.com">support@itsfaisha.com</a>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#433139] text-sm mb-1">{t('Kemitraan', 'Partnerships')}</h3>
              <a className="text-sm text-[#4d4448] hover:text-[#433139] underline" href="mailto:collab@itsfaisha.com">collab@itsfaisha.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* 007 FAQ preview */}
      <section className="max-w-[800px] mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <h2 className="font-serif text-2xl md:text-3xl text-[#433139] font-semibold text-center mb-8">
          {t('Pertanyaan Umum', 'Frequently Asked Questions')}
        </h2>
        <div className="border-t border-[#BDA494]">
          {FAQ_ITEMS.slice(0, 5).map((f) => (
            <details key={f.qEn} className="group border-b border-[#BDA494]">
              <summary className="py-5 flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-[#433139] text-sm pr-8">{lang === 'id' ? f.qId : f.qEn}</span>
                <ChevronDown className="w-5 h-5 text-[#d0c3c7] shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pb-5 pr-12 text-sm text-[#4d4448] leading-relaxed">{lang === 'id' ? f.aId : f.aEn}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => go('faq')} className="text-xs font-bold uppercase tracking-wider text-[#433139] hover:text-[#5B4750] underline underline-offset-4 transition-colors">
            {t('Lihat Semua FAQ →', 'View All FAQs →')}
          </button>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
