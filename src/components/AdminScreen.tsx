import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import {
  LayoutDashboard, BarChart3, ShoppingBag, Package, Users, Settings, LogOut, Plus,
  Bell, HelpCircle, Search, Lock, ShieldCheck, ChevronLeft, ChevronRight, Info,
  Brain, Flag, FileText, UserCog, History, CheckCircle2, Share2, Calendar,
  Truck, CreditCard, KeyRound, RefreshCw, AlertTriangle, X,
} from 'lucide-react';

// STRICTLY MOCKUP (Group E): 091 Daftar Hasil / 092 Detail Hasil / 093 Daftar Pesanan / 094 Detail Pesanan.
// Tanpa database, tanpa query, tanpa RBAC. Semua baris tabel = konstanta verbatim dari referensi.
type AdminView = 'assessment-list' | 'assessment-detail' | 'order-list' | 'order-detail';

interface AdminScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

// ===== 091 — tabel hasil (verbatim) =====
const RESULTS = [
  { id: '#HA-9082', user: 'n***a@email.com', arch: 'THE NURTURER', date: '24 Okt 2023', status: 'Lengkap', src: 'Organik' },
  { id: '#HA-9081', user: 'r***i@email.com', arch: 'THE SEEKER', date: '24 Okt 2023', status: 'Sebagian', src: 'Kampanye IG' },
  { id: '#HA-9080', user: 'd***r@email.com', arch: 'THE GUARDIAN', date: '23 Okt 2023', status: 'Lengkap', src: 'Organik' },
  { id: '#HA-9079', user: 's***t@email.com', arch: 'THE DREAMER', date: '23 Okt 2023', status: 'Lengkap', src: 'Organik' },
  { id: '#HA-9078', user: 'k***a@email.com', arch: 'THE NURTURER', date: '22 Okt 2023', status: 'Sebagian', src: 'Kampanye FB' },
  { id: '#HA-9077', user: 'a***u@email.com', arch: 'THE SEEKER', date: '22 Okt 2023', status: 'Lengkap', src: 'Organik' },
];

// ===== 093 — tabel pesanan (verbatim) =====
const ORDERS = [
  { id: 'FAI-2026-030855', name: 'Rani P.', email: 'r***@email.com', date: '11 Mar 2026', items: '2 Item', total: 'Rp 450.000', pay: 'Lunas', ful: 'Dikemas', flag: true },
  { id: 'FAI-2026-030854', name: 'Budi S.', email: 'b***@email.com', date: '11 Mar 2026', items: '1 Item', total: 'Rp 189.000', pay: 'Pending', ful: '-' },
  { id: 'FAI-2026-030850', name: 'Siti A.', email: 's***@email.com', date: '10 Mar 2026', items: '3 Item', total: 'Rp 685.600', pay: 'Lunas', ful: 'Terkirim' },
  { id: 'FAI-2026-030849', name: 'Dewi K.', email: 'd***@email.com', date: '10 Mar 2026', items: '1 Item', total: 'Rp 210.000', pay: 'Lunas', ful: 'Dikirim' },
  { id: 'FAI-2026-030845', name: 'Andi W.', email: 'a***@email.com', date: '09 Mar 2026', items: '5 Item', total: 'Rp 1.250.000', pay: 'Gagal', ful: '-' },
  { id: 'FAI-2026-030842', name: 'Maya R.', email: 'm***@email.com', date: '09 Mar 2026', items: '2 Item', total: 'Rp 420.000', pay: 'Lunas', ful: 'Terkirim' },
  { id: 'FAI-2026-030840', name: 'Reza P.', email: 'r***@email.com', date: '08 Mar 2026', items: '1 Item', total: 'Rp 155.000', pay: 'Lunas', ful: 'Terkirim' },
];

// ===== 094 — item pesanan (verbatim) =====
const ORDER_ITEMS = [
  { name: 'Calm Morning Candle 200g', qty: '2x', price: 'Rp 378.000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwR7hL2kZZrefSt0BP1ZHq-Itfg2cpq4fXvl99m5SD4tkSAxtdDoS3ijQDMy5Le-Yz5OcvqEhYZAxDEwNjS0qUnfYjgL_wdzC_g9dh53xxHSmJ4urTcRNAAPELqpT6RQsoGEP8dGCp1kEt6jQ0XeOjrph-3XQmHu2xzk40KU1y_ze_ZIEPeQrbuYW6CljiSRp2n17okuF-MfMl2FK04GF2UOBZhiAKIIGszpyttWHrDaV6Ib77RodpZKMjoGpZ7KD1Z0LGTvS3Als' },
  { name: 'Lavender Dream Pillow Mist', qty: '1x', price: 'Rp 149.000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlaKbTOt2sj9H_u02gayvu8H5j8kX6QRwgNVJotYCx5x3kH8qHSlBwZlMetsujqZFtmnO0XvOtB4Gzng_jPkt630STw1yOqYeaCE_OoGP-UEaRGutigjKVoNC6fXpbjpKBtSmYUUxNZaVVUa2dR9jliCOSP5tTNvrqIcHArGL1AVZ9t4vUfoNNYFhpNK1Pz1lF6gUdRxuc_vc0yZW59AkzQezBVqt4usvEEC5NFSzA1I9OQZbxD-YMNw6oDmf4ujvCfh6vzmnzniM' },
  { name: 'Gratitude Journal', qty: '1x', price: 'Rp 149.000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC67clAdKxDBaq2OL7puZj2XMeEi96Zy2-knZVkbAXznqfP_VROSzS9DKPF_Hl5I_UitSAfWB8x_4ouItbqVhgK6ad3XFY-fLLa53cF7_kIDw7BJ0nbZnHRq_V3CUiGDnqLOq7v8EDH76vOfYnHARMbKQEZx_9Cmvo9jqOQqatFLSbIReuv4LswTqtntJOEyOBxrRFaO2HM3LPlyJYxW3FSTXzhskobxijkhtMv1o9jpnFam0B3zv5djEWh9xASapJzuuPPckhMaqY' },
];

const AUDIT_LOG = [
  { dot: '#433139', title: 'Konten di-unlock oleh Rani', meta: '11 Mar 14:02 (Alasan: Konfirmasi manual)' },
  { dot: '#d0c3c7', title: 'Pesanan dikirim (JNE)', meta: '10 Mar 09:15' },
  { dot: '#3D6852', title: 'Pembayaran diterima (Lunas)', meta: '08 Mar 14:45' },
  { dot: '#d0c3c7', title: 'Pesanan dibuat oleh Sistem', meta: '08 Mar 14:32' },
];

const ADMIN_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjfLDkzRWA_bAck0pZy7wzNV-lTqJNVI4cp8jNgDWhtJWsAi5dWjDYdufWOR8ezyh24OTOLyG4Hdv9B9GzkHnAbr0yyA0zpf-1ngN_QGBfDmyUCaPATMEHclj0EyWJ8kOdt0FIMfQRLfcF8YTx3FSq94iD3F7pN-en2hGLbzoLE0Gi0iw2hIEt75LOYPnuIb6Q9YYOLF_B3aDG7j3aup4h4C6bs-ZI-fPEIqWoI6KZ_ZboxroEUwYeLHvw6MPO2OKkM4T8gtbhp4E';

const statusChip = (s: string) => {
  if (s === 'Lengkap' || s === 'Lunas' || s === 'Terkirim') return { bg: 'bg-[#3D6852]/10', tx: 'text-[#3D6852]', dot: 'bg-[#3D6852]', bd: 'border-[#3D6852]/20' };
  if (s === 'Sebagian' || s === 'Pending') return { bg: 'bg-[#B8860B]/10', tx: 'text-[#B8860B]', dot: 'bg-[#B8860B]', bd: 'border-[#B8860B]/20' };
  if (s === 'Gagal') return { bg: 'bg-[#9E3B3B]/10', tx: 'text-[#9E3B3B]', dot: 'bg-[#9E3B3B]', bd: 'border-[#9E3B3B]/20' };
  if (s === 'Dikemas') return { bg: 'bg-[#4A6984]/10', tx: 'text-[#4A6984]', dot: 'bg-[#4A6984]', bd: 'border-[#4A6984]/20' };
  if (s === 'Dikirim') return { bg: 'bg-[#433139]/10', tx: 'text-[#433139]', dot: 'bg-[#433139]', bd: 'border-[#433139]/20' };
  return null;
};

export const AdminScreen: React.FC<AdminScreenProps> = ({ onNavigate }) => {
  const [view, setView] = useState<AdminView>('assessment-list');
  const [toast, setToast] = useState(false);
  const go = (fn: () => void) => () => { soundEngine.playSoftClick(); fn(); };
  const set = (v: AdminView) => () => setView(v);
  const exit = () => { soundEngine.playSoftClick(); onNavigate?.('beranda'); };

  const MENU: { label: string; icon: React.FC<{ className?: string }>; onClick: () => void; active: boolean }[] = [
    { label: 'Dashboard', icon: LayoutDashboard, onClick: set('assessment-list'), active: false },
    { label: 'Hasil Assessment', icon: BarChart3, onClick: set('assessment-list'), active: view.startsWith('assessment') },
    { label: 'Pesanan', icon: ShoppingBag, onClick: set('order-list'), active: view.startsWith('order') },
    { label: 'Produk', icon: Package, onClick: () => {}, active: false },
    { label: 'Anggota', icon: Users, onClick: () => {}, active: false },
    { label: 'Pengaturan', icon: Settings, onClick: () => {}, active: false },
  ];

  return (
    <div className="animate-fadeIn min-h-screen flex bg-[#FAF3EE] text-[#291714]">
      {/* ===== Sidebar gelap ===== */}
      <nav className="hidden md:flex flex-col h-screen py-6 px-4 fixed left-0 top-0 bg-[#433139] w-64 z-40">
        <div className="mb-6 px-2">
          <div className="text-xl font-bold text-[#FAF3EE] tracking-tight">Admin Console</div>
          <div className="text-[11px] leading-4 tracking-[0.04em] text-[#FAF3EE]/60 mt-1">Premium Wellness</div>
        </div>
        <div className="mb-6 px-2">
          <button className="w-full bg-[#5B4750] text-[#FAF3EE] rounded-lg py-2 px-4 flex items-center justify-center gap-2 text-sm shadow-[0_4px_20px_rgba(91,71,80,0.04)] hover:opacity-90 transition-opacity">
            <Plus className="w-[18px] h-[18px]" /> New Report
          </button>
        </div>
        <ul className="flex flex-col gap-1 flex-grow">
          {MENU.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.label}>
                <button
                  onClick={go(m.onClick)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all active:scale-95 ${
                    m.active ? 'text-[#FAF3EE] font-bold bg-[#5B4750]' : 'text-[#FAF3EE]/60 hover:text-[#FAF3EE] hover:bg-[#5B4750]/40'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" /> {m.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto">
          <button onClick={go(exit)} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#FAF3EE]/60 hover:text-[#FAF3EE] hover:bg-[#5B4750]/40 transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </nav>

      {/* ===== Main ===== */}
      <main className="flex-1 md:ml-64 w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 min-h-screen flex flex-col">
        {/* Topbar gelap */}
        <header className="flex justify-between items-center px-6 h-16 z-30 bg-[#433139] shadow-sm rounded-xl mb-8 sticky top-4">
          <div className="text-[24px] leading-[32px] font-semibold text-[#FAF3EE] tracking-tight">ITS FAISHA Admin</div>
          <div className="flex items-center gap-6">
            <div className="flex gap-2 text-[#FAF3EE]">
              <button className="p-1 rounded-full hover:bg-[#5B4750]/40 transition-colors" aria-label="Notifikasi"><Bell className="w-5 h-5" /></button>
              <button className="p-1 rounded-full hover:bg-[#5B4750]/40 transition-colors" aria-label="Bantuan"><HelpCircle className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-2 bg-[#5B4750] rounded-full px-2 py-1 border border-[#78555d]">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-[#F7F1EE]">
                <img alt="Admin Rani" className="w-full h-full object-cover" src={ADMIN_AVATAR} />
              </div>
              <span className="text-[11px] leading-4 tracking-[0.04em] text-[#FAF3EE]">Admin: Rani - Support Lead</span>
            </div>
          </div>
        </header>

        {/* ============ 091 — DAFTAR HASIL ASSESSMENT ============ */}
        {view === 'assessment-list' && (
          <div className="flex flex-col gap-6">
            <h1 className="text-[32px] md:text-[38px] leading-tight font-semibold tracking-[-0.02em] text-[#433139]">Daftar Hasil Assessment</h1>

            <div className="bg-white border border-[#d0c3c7] rounded-xl p-4 flex gap-4 items-start shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <ShieldCheck className="w-5 h-5 text-[#4A6984] mt-0.5 shrink-0" />
              <p className="text-base leading-[24px] text-[#4d4448]">Daftar ini tidak menampilkan jawaban mentah sensitif — hanya metadata yang diperlukan.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7f7478]" />
                  <input type="text" placeholder="Cari email atau ID hasil..." className="w-full h-12 pl-10 pr-3 bg-white border border-[#BDA494] focus:border-[#5B4750] rounded-lg text-base focus:outline-none transition-colors" />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                  <select className="h-12 bg-white border border-[#BDA494] rounded-lg text-base px-3 focus:outline-none"><option>Arketipe (Semua)</option><option>THE NURTURER</option><option>THE GUARDIAN</option><option>THE DREAMER</option><option>THE SEEKER</option></select>
                  <select className="h-12 bg-white border border-[#BDA494] rounded-lg text-base px-3 focus:outline-none"><option>Rentang Tanggal</option><option>7 Hari Terakhir</option><option>30 Hari Terakhir</option></select>
                  <select className="h-12 bg-white border border-[#BDA494] rounded-lg text-base px-3 focus:outline-none"><option>Status (Semua)</option><option>Lengkap</option><option>Sebagian</option></select>
                </div>
              </div>
              <button className="h-12 bg-white border-[1.5px] border-[#BDA494] px-6 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#F7F1EE] transition-colors w-full md:w-auto justify-center">
                <Lock className="w-[18px] h-[18px]" /> Ekspor
              </button>
            </div>

            <div className="bg-white border border-[#d0c3c7] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F7F1EE] border-b border-[#BDA494]">
                      {['ID Hasil', 'Pelanggan', 'Arketipe', 'Tanggal', 'Status', 'Sumber', 'Aksi'].map((h) => (
                        <th key={h} className="px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#BDA494]/40 text-base">
                    {RESULTS.map((r) => {
                      const chip = statusChip(r.status)!;
                      return (
                        <tr key={r.id} className="hover:bg-[#F2E9E5] transition-colors">
                          <td className="px-4 py-4 text-[11px] tracking-[0.04em] text-[#4d4448]">{r.id}</td>
                          <td className="px-4 py-4">{r.user}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F2E9E5] text-[#291714] text-[11px] leading-4 font-medium border border-[#d0c3c7] whitespace-nowrap">{r.arch}</span>
                          </td>
                          <td className="px-4 py-4 text-[#4d4448] whitespace-nowrap">{r.date}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full ${chip.bg} ${chip.tx} text-[11px] leading-4 font-medium whitespace-nowrap`}>
                              <span className={`w-2 h-2 rounded-full ${chip.dot}`} /> {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-[#4d4448]">{r.src}</td>
                          <td className="px-4 py-4">
                            <button onClick={go(set('assessment-detail'))} className="text-[#433139] font-semibold hover:underline underline-offset-4">Lihat</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-white border-t border-[#BDA494]/40 flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-sm text-[#4d4448]">Menampilkan 1-6 dari 127 hasil</span>
                <div className="flex items-center gap-2">
                  <button disabled className="w-8 h-8 flex items-center justify-center rounded border border-[#d0c3c7] text-[#7f7478] opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-[11px] w-8 text-center">1</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-[#d0c3c7] hover:bg-[#F7F1EE] transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F1EE] p-4 rounded-lg border-l-4 border-[#5B4750] flex gap-4 items-start">
              <Info className="w-5 h-5 text-[#5B4750] mt-0.5 shrink-0" />
              <p className="text-base text-[#4d4448]">Peran Viewer tidak dapat mengekspor data.</p>
            </div>
          </div>
        )}

        {/* ============ 092 — DETAIL HASIL FAI-RES-8841 ============ */}
        {view === 'assessment-detail' && (
          <div className="flex flex-col gap-6 pb-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm text-[#4d4448]">
                  <button onClick={go(set('assessment-list'))} className="hover:text-[#433139] underline">Hasil Assessment</button>
                  <ChevronRight className="w-4 h-4" />
                  <span>FAI-RES-8841</span>
                </div>
                <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-1">Hasil FAI-RES-8841</h1>
                <p className="text-base text-[#4d4448] flex items-center gap-2"><Calendar className="w-4 h-4" /> Diambil 8 Mar 2026</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 bg-[#433139] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded">
                  <Brain className="w-4 h-4 mr-1" /> THE NURTURER
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/20 text-xs font-bold uppercase tracking-[0.06em] rounded">
                  <AlertTriangle className="w-4 h-4 mr-1" /> Konten fallback dipakai untuk 1 rekomendasi
                </span>
              </div>
            </header>

            {/* Complaint banner */}
            <section className="bg-[#B8860B]/5 border border-[#B8860B]/30 rounded p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <Flag className="w-5 h-5 text-[#B8860B] mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-[#291714] mb-1">Ditandai: pengguna melaporkan hasil tidak sesuai - 10 Mar</h3>
                  <p className="text-sm text-[#4d4448]">Review required by support team.</p>
                </div>
              </div>
              <div className="w-full md:w-auto flex items-center gap-3">
                <input className="w-full md:w-64 border border-[#BDA494] focus:border-[#433139] rounded px-3 py-2 text-sm bg-white focus:outline-none" placeholder="Tambah catatan internal..." type="text" />
                <button onClick={go(() => { setToast(true); setTimeout(() => setToast(false), 3000); })} className="shrink-0 bg-[#433139] text-[#FAF3EE] px-4 py-2 rounded text-xs font-bold uppercase tracking-[0.06em] hover:opacity-90 transition-opacity">Tandai Selesai</button>
              </div>
            </section>

            {/* Bento 3 kartu */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 bg-white border border-[#BDA494] rounded p-6 flex flex-col">
                <h2 className="text-base font-semibold text-[#433139] mb-4 border-b border-[#BDA494]/40 pb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> Ringkasan</h2>
                <ul className="space-y-4 flex-1">
                  <li><p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] mb-1">Archetype</p><p className="text-base font-semibold">THE NURTURER</p></li>
                  <li><p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] mb-1">Profil Aroma</p><p className="text-base">Warm Amber</p></li>
                  <li><p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] mb-1">Ritual</p><p className="text-base">Ritual Malam 15 Menit</p></li>
                </ul>
              </div>
              <div className="md:col-span-4 bg-white border border-[#BDA494] rounded p-6 flex flex-col">
                <h2 className="text-base font-semibold text-[#433139] mb-4 border-b border-[#BDA494]/40 pb-2 flex items-center gap-2"><UserCog className="w-5 h-5" /> Status Akun</h2>
                <ul className="space-y-4 flex-1">
                  <li className="flex justify-between items-center"><p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448]">Email</p><p className="text-base flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#3D6852]" /> Terverifikasi</p></li>
                  <li className="flex justify-between items-center"><p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448]">Hasil</p><p className="text-base">Tersimpan</p></li>
                  <li className="flex justify-between items-center"><p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448]">Tautan Dibagikan</p><p className="text-base flex items-center gap-1"><Share2 className="w-4 h-4" /> Ya</p></li>
                </ul>
              </div>
              <div className="md:col-span-4 bg-white border border-[#BDA494] rounded p-6 flex flex-col">
                <h2 className="text-base font-semibold text-[#433139] mb-4 border-b border-[#BDA494]/40 pb-2 flex items-center gap-2"><History className="w-5 h-5" /> Riwayat Akses</h2>
                <div className="relative pl-4 flex-1">
                  <div className="absolute left-1.5 top-2 bottom-0 w-px bg-[#BDA494]/40" />
                  <div className="mb-4 relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#433139] border-2 border-white" />
                    <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#433139]">8 Mar 2026</p>
                    <p className="text-sm">Hasil dibuat</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#d0c3c7] border-2 border-white" />
                    <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448]">9 Mar 2026</p>
                    <p className="text-sm">Dilihat oleh pengguna</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel terkunci */}
            <section className="bg-white border border-[#BDA494] rounded relative overflow-hidden h-[300px] flex items-center justify-center">
              <div aria-hidden className="absolute inset-0 flex flex-col p-6 filter blur-md opacity-40 select-none">
                <div className="w-1/2 h-4 bg-[#d0c3c7] mb-4 rounded" />
                <div className="w-3/4 h-4 bg-[#d0c3c7] mb-2 rounded" />
                <div className="w-full h-4 bg-[#d0c3c7] mb-2 rounded" />
                <div className="w-2/3 h-4 bg-[#d0c3c7] mb-6 rounded" />
                <div className="w-1/3 h-4 bg-[#d0c3c7] mb-4 rounded" />
              </div>
              <div className="z-10 flex flex-col items-center text-center max-w-sm px-6 py-8 bg-white/70 backdrop-blur-md rounded-lg shadow-sm border border-[#BDA494]/40">
                <Lock className="w-9 h-9 text-[#433139] mb-3" />
                <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-2">Jawaban mentah pertanyaan - akses dibatasi</h3>
                <p className="text-sm text-[#4d4448] mb-6">Informasi sensitif pengguna memerlukan otorisasi tingkat lanjut untuk dilihat.</p>
                <button className="bg-transparent border border-[#433139] text-[#433139] hover:bg-[#433139] hover:text-[#FAF3EE] px-6 py-2 rounded text-xs font-bold uppercase tracking-[0.06em] transition-colors">Minta akses via persetujuan Owner</button>
              </div>
            </section>

            <div>
              <button onClick={go(set('assessment-list'))} className="h-12 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded-lg hover:bg-[#F2E9E5] transition-colors flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
            </div>
          </div>
        )}

        {/* ============ 093 — DAFTAR PESANAN ============ */}
        {view === 'order-list' && (
          <div className="flex flex-col gap-6">
            <div className="bg-[#ffdad6] text-[#93000a] p-4 rounded-lg flex items-center justify-between shadow-sm border border-[#9E3B3B]/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-base font-semibold">Sinkronisasi kurir JNE tertunda 15 mnt - data mungkin basi</span>
              </div>
              <button className="bg-[#9E3B3B] text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-[0.06em] hover:opacity-90 transition-opacity flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Muat ulang</button>
            </div>

            <div>
              <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em]">Daftar Pesanan</h1>
              <p className="text-[#4d4448] mt-2">Kelola pesanan dan pantau status fulfillment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Pesanan Hari Ini', value: '14', color: '#433139' },
                { label: 'Menunggu Pembayaran', value: '3', color: '#B8860B' },
                { label: 'Perlu Dikirim', value: '8', color: '#3D6852' },
                { label: 'Kendala', value: '1', color: '#9E3B3B', alert: true },
              ].map((k) => (
                <div key={k.label} className={`bg-white p-4 rounded-xl border flex flex-col justify-between ${k.alert ? 'border-[#9E3B3B]/50' : 'border-[#BDA494]'}`}>
                  <span className="text-[11px] leading-4 tracking-[0.04em] uppercase text-[#4d4448]" style={k.alert ? { color: '#9E3B3B' } : undefined}>{k.label}</span>
                  <span className="text-[38px] leading-[44px] font-semibold tracking-[-0.02em] mt-2" style={{ color: k.color }}>{k.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-[#BDA494]">
              <div className="relative w-full md:flex-1 max-w-md">
                <Search className="text-[#7f7478] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <input className="w-full pl-10 pr-4 py-3 bg-[#FAF3EE] border border-[#BDA494] rounded-lg focus:border-[#433139] text-sm focus:outline-none" placeholder="Cari ID pesanan / email / resi" type="text" />
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <select className="bg-[#FAF3EE] border border-[#BDA494] rounded-lg px-4 py-3 text-sm text-[#4d4448] focus:outline-none"><option>Status (Semua)</option><option>Lunas</option><option>Pending</option></select>
                <select className="bg-[#FAF3EE] border border-[#BDA494] rounded-lg px-4 py-3 text-sm text-[#4d4448] focus:outline-none"><option>Kanal (Web)</option><option>Mobile</option></select>
                <select className="bg-[#FAF3EE] border border-[#BDA494] rounded-lg px-4 py-3 text-sm text-[#4d4448] focus:outline-none"><option>Kurir (Semua)</option><option>JNE</option><option>GoSend</option></select>
                <button className="bg-[#FAF3EE] border border-[#BDA494] rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-[#4d4448] hover:border-[#433139] transition-colors"><Calendar className="w-4 h-4" /> Pilih Tanggal</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#BDA494] overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F7F1EE] border-b border-[#d0c3c7]">
                  <tr>
                    {['ID Pesanan', 'Pelanggan', 'Tanggal', 'Item', 'Total', 'Pembayaran', 'Fulfillment', 'Aksi'].map((h) => (
                      <th key={h} className="p-4 text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d0c3c7]/60 text-sm">
                  {ORDERS.map((o) => {
                    const pay = statusChip(o.pay)!;
                    const ful = statusChip(o.ful);
                    return (
                      <tr key={o.id} className={o.flag ? 'bg-[#ffdad6]/20 hover:bg-[#ffdad6]/30 transition-colors' : 'hover:bg-[#FAF3EE] transition-colors'}>
                        <td className="p-4 font-semibold flex items-center gap-1 whitespace-nowrap">
                          {o.id} {o.flag && <AlertTriangle className="w-4 h-4 text-[#9E3B3B]" />}
                        </td>
                        <td className="p-4"><div>{o.name}</div><div className="text-xs text-[#4d4448]">{o.email}</div></td>
                        <td className="p-4 text-[#4d4448] whitespace-nowrap">{o.date}</td>
                        <td className="p-4">{o.items}</td>
                        <td className="p-4 font-semibold whitespace-nowrap">{o.total}</td>
                        <td className="p-4"><span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${pay.bg} ${pay.tx} ${pay.bd}`}>{o.pay}</span></td>
                        <td className="p-4">{ful ? <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${ful.bg} ${ful.tx} ${ful.bd}`}>{o.ful}</span> : <span className="text-[#4d4448] text-center block">-</span>}</td>
                        <td className="p-4 text-center">
                          <button onClick={go(set('order-detail'))} className="text-[#433139] hover:bg-[#F2E9E5] px-3 py-1 rounded-md transition-colors border border-transparent hover:border-[#433139]/30">Detail</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-4 border-t border-[#d0c3c7] flex items-center justify-between bg-white">
                <span className="text-sm text-[#4d4448]">Menampilkan 1-7 dari 124 pesanan</span>
                <div className="flex items-center gap-1">
                  <button disabled className="p-2 border border-[#BDA494] rounded-md text-[#4d4448] opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="px-3 py-1 bg-[#433139] text-[#FAF3EE] rounded-md text-sm font-medium">1</button>
                  <button className="px-3 py-1 border border-[#BDA494] rounded-md text-sm font-medium text-[#4d4448] hover:bg-[#F7F1EE]">2</button>
                  <button className="px-3 py-1 border border-[#BDA494] rounded-md text-sm font-medium text-[#4d4448] hover:bg-[#F7F1EE]">3</button>
                  <span className="px-2 text-[#4d4448]">...</span>
                  <button className="px-3 py-1 border border-[#BDA494] rounded-md text-sm font-medium text-[#4d4448] hover:bg-[#F7F1EE]">18</button>
                  <button className="p-2 border border-[#BDA494] rounded-md text-[#4d4448] hover:bg-[#F7F1EE]"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ 094 — DETAIL PESANAN ============ */}
        {view === 'order-detail' && (
          <div className="flex flex-col gap-6 pb-8">
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-2 text-[11px] tracking-[0.04em] text-[#4d4448]">
                <button onClick={go(set('order-list'))} className="hover:text-[#433139] transition-colors">Pesanan</button>
                <ChevronRight className="w-4 h-4" />
                <span>Detail</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">Pesanan FAI-2026-030841</h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#3D6852] text-white text-xs font-bold uppercase tracking-[0.06em] rounded-full flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Lunas</span>
                  <span className="px-3 py-1 bg-[#F7F1EE] border border-[#d0c3c7] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-full flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Dalam Pengiriman</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Kolom kiri */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white/70 border border-[#d0c3c7] p-6 rounded-xl">
                  <h3 className="text-[22px] leading-[28px] font-semibold mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> Item Pesanan</h3>
                  <div className="space-y-4">
                    {ORDER_ITEMS.map((it, i) => (
                      <div key={it.name} className={`flex items-center gap-4 ${i < ORDER_ITEMS.length - 1 ? 'pb-4 border-b border-[#d0c3c7]' : ''}`}>
                        <img alt={it.name} className="w-16 h-16 object-cover rounded-lg" src={it.img} />
                        <div className="flex-1">
                          <p className="text-base font-semibold">{it.name}</p>
                          <p className="text-[11px] tracking-[0.04em] text-[#4d4448]">{it.qty}</p>
                        </div>
                        <p className="text-base font-semibold text-right">{it.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/70 border border-[#d0c3c7] p-6 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2"><Truck className="w-5 h-5" /> Pengiriman</h3>
                    <div className="space-y-2 text-base">
                      <p><span className="text-[#4d4448]">Kurir:</span> JNE</p>
                      <p><span className="text-[#4d4448]">Resi:</span> <span className="text-sm font-semibold text-[#433139]">882910034551</span></p>
                      <div className="pt-2 mt-2 border-t border-[#d0c3c7]">
                        <p className="font-semibold">Nadia Prameswari</p>
                        <p className="text-[#4d4448] mt-1">Jl. Kemang Timur No. 24,<br />Jakarta Selatan 12560</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/70 border border-[#d0c3c7] p-6 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Pembayaran</h3>
                    <div className="space-y-2 text-base">
                      <p><span className="text-[#4d4448]">Metode:</span> BCA Virtual Account</p>
                      <p><span className="text-[#4d4448]">Total:</span> <span className="text-[24px] leading-[32px] font-semibold text-[#433139]">Rp 685.600</span></p>
                      <div className="pt-2 mt-2 border-t border-[#d0c3c7] text-sm text-[#3D6852] flex items-start gap-1">
                        <CheckCircle2 className="w-4 h-4 mt-0.5" />
                        <span>Terbayar pada 8 Mar 2026, 14:45 WIB.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom kanan */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#F7F1EE] border border-[#d0c3c7] p-6 rounded-xl">
                  <h3 className="text-[22px] leading-[28px] font-semibold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Tindakan</h3>
                  <div className="p-4 bg-[#fff8f3] border border-[#d0c3c7] rounded-lg mb-6">
                    <h4 className="text-base font-semibold mb-1">Manual Recovery: Unlock Konten Ritual</h4>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-[#B8860B]/20 text-[#B8860B] text-xs font-bold uppercase tracking-[0.06em] rounded flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Belum terbuka</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] tracking-[0.04em] text-[#4d4448] mb-1">Alasan</label>
                        <select className="w-full bg-white border border-[#d0c3c7] rounded p-2 text-base focus:border-[#433139] h-12 focus:outline-none">
                          <option>Pembayaran sudah terkonfirmasi manual</option>
                          <option>Kesalahan sistem</option>
                          <option>Permintaan khusus pelanggan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.04em] text-[#4d4448] mb-1">Catatan internal</label>
                        <textarea rows={2} className="w-full bg-white border border-[#d0c3c7] rounded p-2 text-base focus:border-[#433139] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.04em] text-[#4d4448] mb-1">Admin</label>
                        <input disabled type="text" value="Rani" className="w-full bg-[#F7F1EE] border border-[#d0c3c7] rounded p-2 text-base text-[#4d4448] cursor-not-allowed h-12" />
                      </div>
                      <button onClick={go(() => { setToast(true); setTimeout(() => setToast(false), 3000); })} className="w-full h-12 bg-[#433139] text-[#FAF3EE] font-semibold rounded hover:bg-[#5B4750] transition-colors flex items-center justify-center gap-2">
                        <KeyRound className="w-5 h-5" /> Jalankan Unlock
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-[#d0c3c7] border-dashed rounded-lg">
                    <h4 className="text-base font-semibold mb-2 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-[#78555d]" /> Refund</h4>
                    <p className="text-[11px] tracking-[0.04em] text-[#4d4448] mb-2">Proses pengembalian dana jika pesanan dibatalkan.</p>
                    <button className="w-full h-10 border-[1.5px] border-[#d0c3c7] text-[#433139] font-semibold rounded hover:bg-[#fff8f3] transition-colors">Proses Refund</button>
                  </div>
                </div>

                <div className="bg-white/70 border border-[#d0c3c7] p-6 rounded-xl">
                  <h3 className="text-base font-semibold mb-4 flex items-center gap-2"><History className="w-5 h-5" /> Audit Log</h3>
                  <div className="relative pl-6 border-l border-[#d0c3c7] space-y-4">
                    {AUDIT_LOG.map((a) => (
                      <div key={a.title} className="relative">
                        <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full ring-4 ring-[#fff8f3]" style={{ backgroundColor: a.dot }} />
                        <p className="text-base font-semibold">{a.title}</p>
                        <p className="text-[11px] tracking-[0.04em] text-[#4d4448]">{a.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button onClick={go(set('order-list'))} className="h-12 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-sm font-semibold rounded-lg hover:bg-[#F2E9E5] transition-colors flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
            </div>
          </div>
        )}

        {/* Audit footer (092) */}
        <footer className="mt-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-[#4d4448]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Setiap akses tercatat dengan aktor &amp; waktu. All access is logged for audit purposes. © 2024 ITS FAISHA.</span>
          </div>
          <div className="flex gap-4">
            <button className="opacity-80 hover:opacity-100 hover:text-[#433139] transition-all">Security Policy</button>
            <button className="opacity-80 hover:opacity-100 hover:text-[#433139] transition-all">Audit Logs</button>
            <button className="opacity-80 hover:opacity-100 hover:text-[#433139] transition-all">Support</button>
          </div>
        </footer>
      </main>

      {/* Toast sukses (094) */}
      {toast && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-[#fff8f3] border border-[#d0c3c7] shadow-lg rounded-lg p-4 flex items-start gap-4 z-50 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#3D6852] mt-1 shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-[#433139]">Berhasil</h4>
            <p className="text-[11px] tracking-[0.04em] text-[#4d4448]">Konten terbuka - tercatat 11 Mar 14:02 oleh Rani</p>
          </div>
          <button className="ml-auto text-[#4d4448] hover:text-[#433139]" onClick={() => setToast(false)} aria-label="Tutup"><X className="w-5 h-5" /></button>
        </div>
      )}
    </div>
  );
};
