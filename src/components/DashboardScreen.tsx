import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import {
  Home, BarChart3, Sparkles, NotebookPen, ShoppingBag, Heart, Award, Settings,
  Plus, Bell, Search, Check, Lock, Gem, Mail, MessageSquare,
  Database, Download, AlertTriangle, Info, Monitor, Smartphone, ShieldCheck,
  LifeBuoy, LogOut, X, Flower2, Droplet, ArrowRight, ChevronLeft, ChevronRight,
  Infinity as InfinityIcon, Clock, Smile,
} from 'lucide-react';

// STRICTLY MOCKUP (Group D): 071 Ringkasan / 080 Notifikasi / 081 Privasi & Data / 082 Keamanan / 090 Riwayat Jurnal.
// Sidebar internal = ganti state tab. Tanpa auth, tanpa database, tanpa persistensi.
type DashTab = 'ringkasan' | 'pesanan' | 'notifikasi' | 'privasi' | 'keamanan' | 'jurnal';

interface DashboardScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

const AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaVCjHBqS7VF7rvub35ObnVxQ1HvNJFf5J9XqmSGpmMQebi3gl3e6PseqsrO5a3r8sidwz5wvk8Iech_SdjsC7Jt_BvuRAxvu7rUpUl8tuYnFjHy7eW7ZHd80TcMLOO49i3Drhm3KlryVrY8vhEUjynv-o68LKR8_O9m_1BcH6fJ89AcXykyMgPIZDiwltOuNiGiKfuVr3VVsW97ab6mb7wPX6MMHmqvgrVOQgX0Y7XDgeAb2Zk0jZpcMEwpn8UKPZj0T4It-TgfM';
// PERBAIKAN QA: URL /aida/ mati → padanan aida-public hidup (ref 030 Cashmere Embrace)
const CANDLE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzA2Am5nfonkjPiM4I5aIZhsW9S7YeK5MlwGUHVwmURzRdvcwdgtqhxVkObf9IdXTpO7pTAeKhyfbwUMqXRs_EXx81hudzTVcoSVYG620kFtia5WfjSDsXZH10jo-k8_qcWv8BTywA3jtyEaAH7nOYcPp8UyxCVu1avK9brqnKusqLcL_9xVoJ8zODt106vilyt9qGOyCtAcd2omb93Vfc1hPJdMIrq77SbV0zBVOGU9thizZQ2_FFiDqHhIX4zYibG_dN5sd8-PQ';

// 071 — Crystal Trinity (verbatim warna & copy)
const CRYSTALS = [
  { name: 'Rose', bg: '#fce4ec', border: '#f8bbd0', text: '#d81b60' },
  { name: 'Citrine', bg: '#fff8e1', border: '#ffecb3', text: '#f57f17' },
  { name: 'Amethyst', bg: '#f3e5f5', border: '#e1bee7', text: '#8e24aa' },
];

// 080 — Preferensi Notifikasi (verbatim)
const EMAIL_PREFS = [
  { label: 'Pesanan & pengiriman', on: true, locked: true, note: 'selalu aktif untuk keamanan' },
  { label: 'Kabar ritual & jurnal baru', on: true },
  { label: 'Penawaran & promo', on: false },
  { label: 'Newsletter mingguan', on: true },
];
const WA_PREFS = [
  { label: 'Status pesanan', on: true },
  { label: 'Pengingat ritual', on: false },
  { label: 'Promo', on: false },
];

// 081 — Datamu (verbatim)
const DATA_ROWS = [
  { title: 'Profil akun', desc: 'Informasi dasar pendaftaran', chip: 'Aktif' },
  { title: 'Hasil assessment', desc: 'Preferensi dan analisis kebutuhan', chip: '1 hasil tersimpan' },
  { title: 'Riwayat pesanan', desc: 'Pembelian produk dan layanan', chip: '3 pesanan' },
  { title: 'Jurnal pribadi', desc: 'Tersimpan privat, tidak diproses AI', chip: '12 entri', lock: true },
];

// 082 — Perangkat & Sesi Aktif (verbatim)
const SESSIONS = [
  { icon: Monitor, device: 'Chrome di Windows', meta: 'Jakarta', current: true },
  { icon: Smartphone, device: 'Safari di iPhone 15', meta: 'Jakarta — 2 jam lalu' },
  { icon: Smartphone, device: 'Chrome di Android', meta: 'Bandung — 3 hari lalu' },
];

// 090 — Kalender Maret 2026 statis (verbatim: hari bertanda + warna local_florist)
// tone: P = primary #433139 · S = secondary #78555d · I = info-slate #4A6984
const CAL_TONE: Record<number, 'P' | 'S' | 'I'> = { 3: 'S', 5: 'P', 8: 'S', 10: 'I', 12: 'P', 15: 'S', 18: 'I', 22: 'P', 25: 'S', 28: 'P' };
const CAL_TONE_HEX = { P: '#433139', S: '#78555d', I: '#4A6984' };
const CAL_CELLS: { d: number; out?: boolean; today?: boolean }[] = [
  ...[22, 23, 24, 25, 26, 27, 28].map((d) => ({ d, out: true })),
  ...Array.from({ length: 31 }, (_, i) => ({ d: i + 1, today: i + 1 === 11 })),
  ...[1, 2, 3, 4].map((d) => ({ d, out: true })),
];

// 090 — Entri Terbaru (verbatim)
const JOURNAL_ENTRIES = [
  { date: '10 Maret 2026', mood: 'Reflektif', tone: '#4A6984', icon: Droplet, text: 'Hari ini terasa lebih panjang dari biasanya, tapi menyempatkan diri untuk duduk diam di sore hari sangat membantu menjernihkan pikiran...' },
  { date: '8 Maret 2026', mood: 'Damai', tone: '#78555d', icon: Flower2, text: 'Aroma teh chamomile dan suara hujan di luar jendela membuat ritual menulis malam ini terasa begitu sempurna...' },
  { date: '5 Maret 2026', mood: 'Tenang', tone: '#433139', icon: Sparkles, text: 'Memutuskan untuk melepaskan ekspektasi yang terlalu tinggi pada diri sendiri hari ini. Bernapas terasa sedikit lebih ringan.' },
];

const SIDEBAR: { id: string; label: string; icon: React.FC<{ className?: string }>; action: DashTab | NavTab | null }[] = [
  { id: 'beranda', label: 'Beranda', icon: Home, action: 'beranda' /* keluar ke situs publik */ },
  { id: 'hasil', label: 'Hasil Saya', icon: BarChart3, action: 'assessment-result' },
  { id: 'ritual', label: 'Ritual Saya', icon: Sparkles, action: 'rituals' },
  { id: 'jurnal', label: 'Jurnal', icon: NotebookPen, action: 'jurnal' },
  { id: 'pesanan', label: 'Pesanan', icon: ShoppingBag, action: 'pesanan' },
  // B4 2026-09-03: wishlist/rewards kini route nyata (074-079 flow).
  { id: 'wishlist', label: 'Wishlist', icon: Heart, action: 'wishlist' },
  { id: 'rewards', label: 'Rewards', icon: Award, action: 'soul-petals' },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings, action: 'notifikasi' },
];

const TAB_LABELS: { id: DashTab; label: string }[] = [
  { id: 'notifikasi', label: 'Notifikasi' },
  { id: 'privasi', label: 'Privasi & Data' },
  { id: 'keamanan', label: 'Keamanan' },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const [tab, setTab] = useState<DashTab>('ringkasan');
  const [waVerified, setWaVerified] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [pwForm, setPwForm] = useState(false);
  const [revokeDevice, setRevokeDevice] = useState<string | null>(null);
  const go = (fn: () => void) => () => { soundEngine.playSoftClick(); fn(); };
  const nav = (t: NavTab) => { onNavigate?.(t); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const savePrefs = () => { soundEngine.playSoftClick(); setToast('Preferensi tersimpan'); setTimeout(() => setToast(null), 3000); };

  // KRIT-5/BONUS-1 fix 2026-09-04: export & delete real (localStorage mock), bukan toast palsu.
  const FAISHA_KEYS = ['faisha.assessment.flow', 'faisha.mock.returning', 'faisha_journal_entries'];
  const exportData = () => {
    soundEngine.playSoftClick();
    const dump: Record<string, unknown> = {};
    for (const k of FAISHA_KEYS) {
      const raw = localStorage.getItem(k);
      if (raw !== null) {
        try { dump[k] = JSON.parse(raw); } catch { dump[k] = raw; }
      }
    }
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data: dump }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faisha-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
    setToast('Data JSON diunduh'); setTimeout(() => setToast(null), 3000);
  };
  const deleteAccount = () => {
    soundEngine.playSoftClick();
    for (const k of FAISHA_KEYS) localStorage.removeItem(k);
    setToast('MOCK — data lokal dihapus, kembali ke Home'); setTimeout(() => setToast(null), 3000);
    onNavigate?.('beranda');
  };

  const itemActive = (a: DashTab | NavTab | null) => a === tab;

  return (
    <div className="animate-fadeIn flex flex-col md:flex-row h-screen w-full overflow-hidden bg-[#FDFBF7]">
      {/* ===== SideNavBar (071/080/081/082 shared) — full height, scroll internal ===== */}
      <nav className="flex flex-col w-full md:w-64 flex-shrink-0 h-full overflow-y-auto border-r border-stone-200 bg-[#F7F1EE] py-8 px-6">
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#433139]">ITS FAISHA</h1>
          <p className="text-[11px] leading-4 tracking-[0.04em] text-[#4d4448]">Restorative Sanctuary</p>
        </div>
        <ul className="flex flex-col gap-1 flex-grow">
          {SIDEBAR.map((item) => {
            const Icon = item.icon;
            const active = itemActive(item.action);
            return (
              <li key={item.id}>
                <button
                  onClick={go(() => {
                    if (item.action === 'ringkasan' || item.action === 'pesanan' || item.action === 'notifikasi' || item.action === 'privasi' || item.action === 'keamanan' || item.action === 'jurnal') setTab(item.action);
                    else if (item.action) nav(item.action as NavTab);
                  })}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'text-[#433139] font-bold border-r-2 border-[#433139] bg-[#F2E9E5]' : 'text-[#4d4448] hover:bg-[#F2E9E5]'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
          {/* Sub-menu tab pengaturan (080/081/082) */}
          {(tab === 'notifikasi' || tab === 'privasi' || tab === 'keamanan') && (
            <li className="pl-10 py-2 flex flex-col gap-1 border-l border-[#d0c3c7]/50 ml-7">
              {TAB_LABELS.map((t) => (
                <button
                  key={t.id}
                  onClick={go(() => setTab(t.id))}
                  className={`text-left text-[11px] px-2 py-1.5 rounded-full border transition-colors ${
                    tab === t.id ? 'border-[#433139] text-[#433139] font-bold bg-white' : 'border-transparent text-[#4d4448] hover:border-[#433139]/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </li>
          )}
        </ul>
        <div className="mt-auto">
          <button onClick={go(() => nav('shop'))} className="w-full bg-[#433139] text-[#FAF3EE] h-12 rounded-lg text-xs font-bold uppercase tracking-[0.06em] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Mulai Ritual Baru
          </button>
        </div>
      </nav>

      {/* ===== Main ===== */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative min-w-0">
        {/* TopAppBar — sticky di atas area konten */}
        <header className="sticky top-0 z-20 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 px-4 py-4 md:px-8 flex justify-end items-center gap-4">
          <button onClick={go(() => nav('search'))} className="p-2 text-[#4d4448] hover:text-[#433139] transition-colors rounded-full hover:bg-[#F2E9E5]" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={go(() => setTab('notifikasi'))} className="relative p-2 text-[#4d4448] hover:text-[#433139] transition-colors rounded-full hover:bg-[#F2E9E5]" aria-label="Notifikasi">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#9E3B3B]" />
          </button>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={go(() => nav('beranda'))}>
            <span className="text-sm font-semibold text-[#4d4448] group-hover:text-[#433139] transition-colors hidden sm:block">Nadia</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#BDA494]">
              <img alt="Nadia's Profile" className="w-full h-full object-cover" src={AVATAR} />
            </div>
          </div>
        </header>

        <div className="flex-1 w-full p-4 md:p-8">
          {/* ============ 071 — RINGKASAN (Bento) ============ */}
          {tab === 'ringkasan' && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div>
                  <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Selamat pagi, Nadia</h2>
                  <p className="font-serif italic text-lg text-[#4d4448] mt-1">Mari meluangkan waktu sejenak untuk dirimu hari ini.</p>
                </div>
                <span className="text-sm text-[#4d4448]">Senin, 12 Agustus</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Archetype — col-8 */}
                <section className="md:col-span-8 bg-white rounded-xl p-8 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#F2E9E5]" />
                  <span className="relative inline-block bg-[#F2E9E5] text-[#433139] text-[11px] font-bold uppercase tracking-[0.06em] px-3 py-1 rounded-full mb-4">Archetype</span>
                  <h3 className="relative font-serif text-[32px] leading-tight font-semibold text-[#433139] mb-2">THE NURTURER</h3>
                  <p className="relative text-base leading-[24px] text-[#4d4448] max-w-md mb-6">Karaktermu mencerminkan kedamaian dan empati yang mendalam. Temukan ritual yang mendukung esensimu.</p>
                  <button onClick={go(() => nav('assessment-result'))} className="relative text-sm font-semibold text-[#433139] underline decoration-[#BDA494]/50 underline-offset-4 hover:opacity-80 transition-opacity">
                    Lihat hasil lengkap →
                  </button>
                </section>

                {/* Ritual Hari Ini — col-4 */}
                <section className="md:col-span-4 bg-white rounded-xl p-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col">
                  <div className="flex items-center gap-2 text-[#433139] mb-3">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-base font-semibold">Ritual Hari Ini</h3>
                  </div>
                  <p className="text-lg font-semibold text-[#291714]">Ritual Malam 15 Menit</p>
                  <p className="text-sm text-[#4d4448] mb-3">Hari 4/7</p>
                  <div className="w-full h-2 bg-[#F2E9E5] rounded-full overflow-hidden mb-5">
                    <div className="h-full bg-[#433139] rounded-full" style={{ width: '57%' }} />
                  </div>
                  <button onClick={go(() => nav('rituals'))} className="mt-auto w-full h-11 bg-[#433139] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 transition-opacity">Mulai</button>
                </section>

                {/* Rekomendasi — col-4 */}
                <section className="md:col-span-4 bg-white rounded-xl p-6 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                  <h3 className="text-base font-semibold text-[#433139] mb-4">Rekomendasi Untukmu</h3>
                  <div className="w-full h-36 rounded-lg overflow-hidden bg-[#F2E9E5] mb-3">
                    <img alt="Cashmere Embrace Candle" className="w-full h-full object-cover" src={CANDLE_IMG} />
                  </div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.06em] text-[#3D6852] bg-[#3D6852]/10 px-2 py-0.5 rounded-full mb-2">92% Match</span>
                  <p className="text-base font-semibold text-[#291714] mb-3">Cashmere Embrace Candle</p>
                  <button onClick={go(() => nav('product'))} className="w-full h-10 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] transition-colors">Lihat</button>
                </section>

                {/* Harmoni Energi — col-5 */}
                <section className="md:col-span-5 bg-white rounded-xl p-8 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                  <h3 className="text-base font-semibold text-[#433139]">Harmoni Energi</h3>
                  <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#78555d] mb-6">Crystal Trinity</p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {CRYSTALS.map((c, i) => (
                      <React.Fragment key={c.name}>
                        {i > 0 && <div className="w-8 h-px bg-[#d0c3c7]" />}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-xl border flex items-center justify-center" style={{ backgroundColor: c.bg, borderColor: c.border }}>
                            <Gem className="w-7 h-7" style={{ color: c.text }} />
                          </div>
                          <span className="text-xs font-semibold text-[#4d4448]">{c.name}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-sm leading-[24px] text-[#4d4448] text-center">Trio kristal ini bekerja sinergis untuk membersihkan, menenangkan, dan memperkuat intensi harianmu.</p>
                </section>

                {/* Stack col-3: Pesanan / Pengaturan / Rewards */}
                <section className="md:col-span-3 flex flex-col gap-6">
                  <div className="bg-white rounded-xl p-5 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                    <h3 className="text-sm font-semibold text-[#433139] mb-1">Status Pesanan</h3>
                    <p className="text-xs text-[#4d4448] mb-2">FAI-2026-030841</p>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-[#3D6852]">
                      <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-pulse" /> Dalam Pengiriman
                    </span>
                  </div>
                  <button onClick={go(() => setTab('keamanan'))} className="bg-white rounded-xl p-5 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex items-center gap-3 text-left hover:bg-[#F2E9E5] transition-colors">
                    <Settings className="w-5 h-5 text-[#433139]" />
                    <span className="text-sm font-semibold text-[#433139]">Pengaturan</span>
                  </button>
                  <div className="rounded-xl p-5 border border-dashed border-[#BDA494] bg-[#F2E9E5]/40 flex items-center gap-3 opacity-70">
                    <Lock className="w-5 h-5 text-[#7f7478]" />
                    <div>
                      <p className="text-sm font-semibold text-[#4d4448]">Beautiful Soul Rewards</p>
                      <p className="text-xs text-[#7f7478]">Segera hadir</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ============ PESANAN — placeholder empty state ============ */}
          {tab === 'pesanan' && (
            <div className="min-h-[360px] flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-12 h-12 text-[#BDA494] mb-4" />
              <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-2">Belum ada pesanan aktif</h3>
              <p className="text-base text-[#4d4448] mb-6">Ritual pertamamu tinggal satu langkah.</p>
              <button onClick={go(() => nav('shop'))} className="min-h-[48px] px-8 rounded bg-[#5B4750] text-[#FAF3EE] font-semibold text-sm hover:opacity-90 transition-opacity">Mulai Belanja</button>
            </div>
          )}

          {/* ============ 080 — PREFERENSI NOTIFIKASI ============ */}
          {tab === 'notifikasi' && (
            <div className="max-w-[720px] space-y-8">
              <div>
                <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-2">Preferensi Notifikasi</h2>
                <p className="text-lg leading-[28px] text-[#4d4448]">Email dan WhatsApp dikontrol terpisah - kamu yang memegang kendali.</p>
              </div>

              {!waVerified && (
                <div className="flex items-center gap-3 bg-[#FFF8E7] border border-[#B8860B]/30 rounded-lg px-4 py-3">
                  <AlertTriangle className="w-5 h-5 text-[#B8860B] shrink-0" />
                  <p className="text-sm text-[#291714] flex-grow">Nomor WhatsApp belum terverifikasi - notifikasi WA tidak terkirim</p>
                  <button onClick={go(() => setWaVerified(true))} className="text-xs font-bold uppercase tracking-[0.06em] text-[#B8860B] underline hover:opacity-80 transition-opacity whitespace-nowrap">Verifikasi Sekarang</button>
                </div>
              )}

              <span className="inline-flex items-center gap-2 bg-[#F2E9E5] text-[#433139] text-xs font-semibold px-3 py-2 rounded-lg">
                <Settings className="w-4 h-4" /> 3 dari 7 preferensi aktif
              </span>

              <section className="bg-white rounded-xl p-6 md:p-8 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-5 h-5 text-[#433139]" />
                  <h3 className="text-lg font-semibold text-[#433139]">Email</h3>
                </div>
                <div className="space-y-1">
                  {EMAIL_PREFS.map((p) => (
                    <div key={p.label} className={`flex items-center justify-between py-3 border-b border-[#d0c3c7]/30 last:border-0 ${p.locked ? 'opacity-70' : ''}`}>
                      <div>
                        <p className="text-base text-[#291714]">{p.label}</p>
                        {p.note && <p className="text-xs text-[#4d4448] flex items-center gap-1 mt-0.5"><Lock className="w-3 h-3" /> {p.note}</p>}
                      </div>
                      <span className={`w-12 h-6 rounded-full p-0.5 flex transition-colors ${p.on ? 'bg-[#433139] justify-end' : 'bg-[#d0c3c7] justify-start'} ${p.locked ? 'cursor-not-allowed' : ''}`}>
                        <span className="w-5 h-5 rounded-full bg-white shadow" />
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 md:p-8 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-5 h-5 text-[#433139]" />
                  <h3 className="text-lg font-semibold text-[#433139]">WhatsApp</h3>
                </div>
                <div className="space-y-1">
                  {WA_PREFS.map((p) => (
                    <div key={p.label} className="flex items-center justify-between py-3 border-b border-[#d0c3c7]/30 last:border-0">
                      <p className="text-base text-[#291714]">{p.label}</p>
                      <span className={`w-12 h-6 rounded-full p-0.5 flex transition-colors ${p.on ? 'bg-[#433139] justify-end' : 'bg-[#d0c3c7] justify-start'}`}>
                        <span className="w-5 h-5 rounded-full bg-white shadow" />
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex justify-end">
                <button onClick={savePrefs} className="h-12 px-8 bg-[#433139] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 transition-opacity">Simpan Preferensi</button>
              </div>
            </div>
          )}

          {/* ============ 081 — PRIVASI & DATA ============ */}
          {tab === 'privasi' && (
            <div className="space-y-10">
              <div>
                <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-2">Privasi &amp; Data</h2>
                <p className="text-lg leading-[28px] text-[#4d4448] max-w-2xl">Di ITS FAISHA, kami menganggap serius ruang pribadi Anda. Kelola bagaimana data Anda disimpan dan digunakan di dalam sanctuary digital ini.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <section className="lg:col-span-8 bg-white rounded-xl p-6 md:p-8 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-5 h-5 text-[#433139]" />
                    <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">Datamu</h3>
                  </div>
                  <div className="space-y-0 flex-grow">
                    {DATA_ROWS.map((r, i) => (
                      <div key={r.title} className={`flex justify-between items-center py-4 ${i < DATA_ROWS.length - 1 ? 'border-b border-[#d0c3c7]/30' : ''}`}>
                        <div>
                          <p className="text-base font-semibold text-[#291714]">{r.title}</p>
                          <p className="text-sm text-[#4d4448] mt-1 flex items-center gap-1">
                            {r.lock && <Lock className="w-3.5 h-3.5" />} {r.desc}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#F2E9E5] text-[#433139] text-[11px] leading-4 font-medium whitespace-nowrap">{r.chip}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="lg:col-span-4 flex flex-col">
                  <div className="bg-white rounded-xl p-6 md:p-8 border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <Download className="w-5 h-5 text-[#433139]" />
                      <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">Minta salinan datamu</h3>
                    </div>
                    <p className="text-base leading-[24px] text-[#4d4448] mb-6">Unduh arsip lengkap dari semua data yang terhubung dengan akun Anda.</p>
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 bg-[#F2E9E5] text-[#433139] text-[11px] leading-4 px-3 py-2 rounded-lg border border-[#BDA494]/50">
                        <Info className="w-4 h-4 shrink-0" />
                        <span>Permintaan dikirim - tautan unduh via email dalam 24 jam</span>
                      </div>
                    </div>
                    <button onClick={exportData} className="mt-auto w-full h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] active:scale-[0.99] transition-all">Minta Ekspor Data</button>
                  </div>
                </section>

                <section className="lg:col-span-12 bg-[#F7F1EE] rounded-xl p-6 md:p-8 border border-[#9E3B3B]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="md:w-1/3">
                      <h3 className="text-[22px] leading-[28px] font-semibold text-[#9E3B3B] mb-2">Tutup Akun &amp; Hapus Data</h3>
                      <p className="text-base leading-[24px] text-[#4d4448]">Tindakan ini bersifat final. Harap baca konsekuensinya dengan teliti sebelum melanjutkan.</p>
                    </div>
                    <div className="md:w-2/3 space-y-6">
                      <div className="bg-[#ffdad6]/30 border border-[#9E3B3B]/20 p-4 rounded-lg">
                        <p className="text-base font-semibold text-[#9E3B3B] flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <span>Ini akan menghapus secara permanen: akun, hasil assessment, ritual, jurnal, dan riwayat pesanan. Tindakan ini tidak dapat dibatalkan.</span>
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#291714] mb-2">Masukkan password untuk verifikasi</label>
                          <input type="password" placeholder="••••••••" className="w-full h-12 bg-white border border-[#BDA494] rounded-lg px-4 text-base focus:outline-none focus:border-[#433139] transition-colors" />
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded border-[#BDA494] accent-[#433139]" />
                          <span className="text-base text-[#291714]">Saya memahami konsekuensinya</span>
                        </label>
                        <div className="pt-2">
                          <button onClick={deleteAccount} className="px-6 h-12 bg-[#F2E9E5] border border-[#9E3B3B]/30 text-[#9E3B3B] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#ffdad6]/50 transition-colors">Konfirmasi Penutupan Akun</button>
                        </div>
                        <p className="text-[11px] leading-4 text-[#4d4448] italic">* Permintaan penutupan akan diproses dalam 7 hari. Kamu dapat membatalkan permintaan ini kapan saja sebelum masa tenggang berakhir.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ============ 082 — KEAMANAN AKUN ============ */}
          {tab === 'keamanan' && (
            <div className="max-w-[896px]">
              <header className="mb-12">
                <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-2">Keamanan Akun</h2>
                <p className="text-lg leading-[28px] text-[#4d4448]">Kelola kata sandi dan amankan sesi perangkat Anda.</p>
              </header>

              <div className="flex flex-col gap-8">
                {/* 1. Password */}
                <section className="bg-white rounded-xl p-6 md:p-8 border border-[#d0c3c7]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-1">Kata Sandi</h3>
                      <p className="text-base text-[#4d4448] flex items-center gap-2"><Lock className="w-[18px] h-[18px]" /> Kata sandi terakhir diubah 12 Jan 2026</p>
                    </div>
                    <button onClick={go(() => setPwForm(true))} className={`h-12 px-6 bg-[#433139] text-[#FAF3EE] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity self-start sm:self-auto ${pwForm ? 'opacity-50 pointer-events-none' : ''}`}>Ubah Kata Sandi</button>
                  </div>
                  {pwForm && (
                    <div className="border-t border-[#d0c3c7]/30 pt-6 mt-6 max-w-md space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#433139] mb-2">Kata Sandi Lama</label>
                        <input type="password" placeholder="Masukkan kata sandi lama" className="w-full h-12 rounded-md border border-[#BDA494] px-4 text-base focus:outline-none focus:border-[#433139]" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#433139] mb-2">Kata Sandi Baru</label>
                        <input type="password" placeholder="Minimal 8 karakter" className="w-full h-12 rounded-md border border-[#BDA494] px-4 text-base focus:outline-none focus:border-[#433139]" />
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 flex gap-1 h-1.5">
                            <div className="flex-1 bg-[#3D6852] rounded-full" />
                            <div className="flex-1 bg-[#3D6852] rounded-full" />
                            <div className="flex-1 bg-[#3D6852] rounded-full" />
                            <div className="flex-1 bg-[#d0c3c7] rounded-full" />
                          </div>
                          <span className="text-[11px] leading-4 font-medium text-[#3D6852] w-10 text-right">Kuat</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#433139] mb-2">Ulangi Kata Sandi Baru</label>
                        <input type="password" placeholder="Ketik ulang kata sandi baru" className="w-full h-12 rounded-md border border-[#BDA494] px-4 text-base focus:outline-none focus:border-[#433139]" />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={go(() => setPwForm(false))} className="h-12 px-6 bg-[#433139] text-[#FAF3EE] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">Simpan</button>
                        <button onClick={go(() => setPwForm(false))} className="h-12 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded-lg hover:bg-[#F2E9E5] transition-colors">Batal</button>
                      </div>
                    </div>
                  )}
                </section>

                {/* 2. Sesi aktif */}
                <section className="bg-white rounded-xl p-6 md:p-8 border border-[#d0c3c7]/40 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
                  <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-6 flex items-center gap-2"><Monitor className="w-5 h-5" /> Perangkat &amp; Sesi Aktif</h3>
                  <div className="flex flex-col">
                    {SESSIONS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div key={s.device} className="py-4 border-b border-[#d0c3c7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 last:border-0">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${s.current ? 'bg-[#F2E9E5] text-[#433139]' : 'bg-[#F7F1EE] text-[#4d4448]'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-[#291714] flex items-center gap-2">
                                {s.device}
                                {s.current && <span className="inline-flex items-center bg-[#F7F1EE] text-[#433139] text-[11px] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full border border-[#d0c3c7]/40">SAAT INI</span>}
                              </h4>
                              <p className="text-sm text-[#4d4448] flex items-center gap-1.5 mt-0.5">
                                {s.current && <span className="w-2 h-2 rounded-full bg-[#3D6852] inline-block" />} {s.meta}
                              </p>
                            </div>
                          </div>
                          {s.current ? (
                            <button disabled className="text-sm text-[#d0c3c7] cursor-not-allowed self-start sm:self-center">Cabut Akses</button>
                          ) : (
                            <button onClick={go(() => setRevokeDevice(s.device))} className="text-sm font-semibold text-[#433139] hover:opacity-80 transition-opacity self-start sm:self-center">Cabut Akses</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#d0c3c7]/30 flex justify-end">
                    <button onClick={go(() => setRevokeDevice('Semua sesi lain'))} className="text-sm font-semibold text-[#9E3B3B] flex items-center gap-2 hover:bg-[#ffdad6]/40 px-4 py-2 rounded-lg transition-colors">
                      <LogOut className="w-[18px] h-[18px]" /> Cabut Semua Sesi Lain
                    </button>
                  </div>
                </section>

                {/* 3. 2FA future */}
                <section className="bg-[#F2E9E5]/50 rounded-xl p-6 md:p-8 border border-[#d0c3c7]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F1EE] flex items-center justify-center text-[#7f7478] shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#4d4448] mb-1">Verifikasi dua langkah (2FA)</h3>
                      <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#7f7478]">Segera Hadir</p>
                    </div>
                  </div>
                  <button className="h-12 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded-lg flex items-center gap-2 self-start sm:self-auto opacity-70 hover:opacity-100 transition-opacity">
                    <Bell className="w-[18px] h-[18px]" /> Kabari saya
                  </button>
                </section>
              </div>

              <div className="mt-10 text-center">
                <p className="text-base text-[#4d4448]/70 flex items-center justify-center gap-2">
                  <LifeBuoy className="w-4 h-4" /> Kehilangan akses?{' '}
                  <button onClick={go(() => nav('support'))} className="text-[#433139] underline decoration-[#433139]/30 hover:decoration-[#433139] transition-colors">Jalur pemulihan via email selalu tersedia</button>
                </p>
              </div>
            </div>
          )}
          {/* ============ 090 — RIWAYAT & INSIGHT JURNAL ============ */}
          {tab === 'jurnal' && (
            <div className="max-w-[1200px]">
              {/* Header + switcher */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 border-b border-[#d0c3c7]/50 pb-4">
                <div>
                  <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-1">Riwayat Jurnalmu</h2>
                  <p className="text-base text-[#4d4448]">Menelusuri jejak pikiran dan perasaanmu.</p>
                </div>
                <div className="flex gap-1 mt-4 md:mt-0 p-1 bg-white border border-[#d0c3c7] rounded-full">
                  <button className="px-4 py-1.5 bg-[#F2E9E5] text-[#433139] text-sm font-semibold rounded-full">Kalender</button>
                  <button className="px-4 py-1.5 text-[#4d4448] hover:text-[#433139] text-sm font-semibold rounded-full transition-colors">Daftar</button>
                  <button className="px-4 py-1.5 text-[#4d4448] hover:text-[#433139] text-sm font-semibold rounded-full transition-colors">Insight</button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Kolom kiri: kalender + mood — col-8 */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                  <div className="bg-white border border-[#d0c3c7] rounded-xl p-6 md:p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139]">Maret 2026</h3>
                      <div className="flex gap-2">
                        <button className="p-1 rounded-full hover:bg-[#F7F1EE] transition-colors text-[#4d4448]" aria-label="Bulan sebelumnya"><ChevronLeft className="w-5 h-5" /></button>
                        <button className="p-1 rounded-full hover:bg-[#F7F1EE] transition-colors text-[#4d4448]" aria-label="Bulan berikutnya"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center">
                      {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                        <div key={d} className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] pb-2 border-b border-[#d0c3c7]/50">{d}</div>
                      ))}
                      {CAL_CELLS.map((c, i) => {
                        const tone = CAL_TONE[c.d];
                        return (
                          <div key={i} className="py-2 relative flex justify-center items-center h-12">
                            {c.today && <span className="absolute inset-0 m-auto w-10 h-10 border-2 border-[#433139] rounded-full" />}
                            {tone && !c.out && <Flower2 className="absolute w-8 h-8 opacity-20" style={{ color: CAL_TONE_HEX[tone] }} />}
                            <span className={`relative z-10 text-base ${c.out ? 'text-[#4d4448]/30' : tone || c.today ? `font-semibold ${c.today ? 'text-[#433139]' : 'text-[#433139]'}` : 'text-[#291714]'}`}>{c.d}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mood section */}
                  <div className="bg-[#F2E9E5]/50 border border-[#d0c3c7]/50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#433139] mb-2">Pola suasana bulan ini</h3>
                      <div className="flex items-center gap-1.5 mt-2">
                        {['#78555d', 'rgba(67,49,57,0.6)', '#78555d', '#4A6984', 'rgba(67,49,57,0.6)', '#78555d', '#4A6984', 'rgba(67,49,57,0.6)', '#78555d', 'rgba(67,49,57,0.6)'].map((c, i) => (
                          <span key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full border border-[#d0c3c7] flex items-center gap-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#433139]" />
                      <span className="text-[11px] leading-4 font-medium uppercase tracking-wider text-[#433139]">Tenang (6 hari)</span>
                    </div>
                  </div>
                </div>

                {/* Kolom kanan: insight + entri — col-4 */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] mb-4 px-1">Sekilas Insight</h3>
                    {[
                      { label: 'Konsistensi', value: '10 dari 11 hari', tone: '#78555d', icon: InfinityIcon },
                      { label: 'Waktu Favorit', value: 'Malam (21:00-22:00)', tone: '#4A6984', icon: Clock },
                      { label: 'Mood Dominan', value: 'Tenang', tone: '#433139', icon: Smile },
                    ].map((ins) => {
                      const Icon = ins.icon;
                      return (
                        <div key={ins.label} className="bg-white border border-[#d0c3c7] rounded-lg p-4 flex items-start gap-4">
                          <Icon className="w-5 h-5 mt-1 shrink-0" style={{ color: ins.tone }} />
                          <div>
                            <p className="text-[11px] leading-4 uppercase tracking-wider text-[#4d4448] mb-1">{ins.label}</p>
                            <p className="text-base font-semibold text-[#433139]">{ins.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-2">
                    <h3 className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] mb-4 px-1">Entri Terbaru</h3>
                    <div className="space-y-2">
                      {JOURNAL_ENTRIES.map((e) => {
                        const Icon = e.icon;
                        return (
                          <div key={e.date} className="bg-white border border-[#d0c3c7]/40 rounded-lg p-4 hover:border-[#d0c3c7] transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[11px] leading-4 text-[#4d4448]">{e.date}</span>
                              <div className="flex items-center gap-1" style={{ color: e.tone }}>
                                <Icon className="w-4 h-4" />
                                <span className="text-[11px] leading-4">{e.mood}</span>
                              </div>
                            </div>
                            <p className="text-base leading-[24px] text-[#433139] line-clamp-2 mb-3">{e.text}</p>
                            <div className="flex justify-end">
                              <button onClick={go(() => nav('journal'))} className="text-sm font-semibold group-hover:text-[#433139] transition-colors flex items-center gap-1" style={{ color: '#78555d' }}>
                                Buka <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy note (verbatim 090) */}
              <div className="mt-16 pt-8 border-t border-[#d0c3c7]/50 text-center flex flex-col items-center">
                <Lock className="w-5 h-5 text-[#7f7478] mb-2" />
                <p className="text-[11px] leading-4 text-[#4d4448] max-w-md">Insight hanya dari pola waktu &amp; mood yang kamu pilih - isi jurnal tidak pernah dibaca sistem.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer (shared dashboard) */}
        <footer className="bg-white border-t border-[#d0c3c7]/40 py-8 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] leading-4 tracking-[0.04em] text-[#4d4448]">© 2024 ITS FAISHA. All rights reserved.</p>
          <div className="flex gap-6 text-[11px] text-[#4d4448]">
            <button onClick={go(() => nav('legal'))} className="underline hover:text-[#433139] transition-colors">Kebijakan Privasi</button>
            <button onClick={go(() => nav('legal'))} className="underline hover:text-[#433139] transition-colors">Syarat &amp; Ketentuan</button>
            <button onClick={go(() => nav('support'))} className="underline hover:text-[#433139] transition-colors">Bantuan</button>
          </div>
        </footer>
      </main>

      {/* Revoke Confirm Modal (082) */}
      {revokeDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#F7F1EE]/60 backdrop-blur-sm" onClick={() => setRevokeDevice(null)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-[0_4px_20px_rgba(91,71,80,0.04)] border border-[#d0c3c7]/40 z-10">
            <button onClick={() => setRevokeDevice(null)} className="absolute top-4 right-4 p-1 text-[#7f7478] hover:text-[#433139]" aria-label="Tutup"><X className="w-5 h-5" /></button>
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#9E3B3B] flex items-center justify-center mb-6">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-[24px] leading-[32px] font-semibold text-[#433139] mb-2">Cabut akses perangkat ini?</h3>
            <p className="text-lg leading-[28px] text-[#4d4448] mb-8">
              Sesi untuk <strong className="text-[#291714]">{revokeDevice}</strong> akan langsung berakhir. Anda harus masuk kembali pada perangkat tersebut.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button onClick={go(() => setRevokeDevice(null))} className="h-12 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded-lg w-full sm:w-auto hover:bg-[#F2E9E5] transition-colors">Batal</button>
              <button onClick={go(() => setRevokeDevice(null))} className="h-12 px-6 bg-[#9E3B3B] text-white text-sm font-semibold rounded-lg w-full sm:w-auto flex justify-center items-center gap-2 hover:opacity-90 transition-opacity">Ya, Cabut</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast mock (080 "Preferensi tersimpan" + ekspor) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-[#291714] px-5 py-3 rounded-xl shadow-lg border border-[#d0c3c7]/40 text-sm font-semibold flex items-center gap-3 animate-fadeIn">
          <Check className="w-5 h-5 text-[#3D6852]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
