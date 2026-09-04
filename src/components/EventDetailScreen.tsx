import React from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, Calendar, Clock, Users, Video, CheckCircle2, ShieldCheck } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-084 "Event Detail" (intent html/084).
// Registered-state statis + strip state lain. CTAs non-DB → hanya kembali ke community.
interface Props { onNavigate?: (tab: NavTab) => void; }

export const EventDetailScreen: React.FC<Props> = ({ onNavigate }) => {
  const go = (tab: NavTab) => () => { soundEngine.playSoftClick(); onNavigate?.(tab); };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714]">
      <main className="max-w-[798px] mx-auto px-4 md:px-0 pt-28 pb-24">
        <button onClick={go('community')} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#5B4750] hover:text-[#433139] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Community
        </button>

        {/* Registered banner (state aktif halaman) */}
        <div className="mb-6 p-4 bg-[#e4f3e8] rounded-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#3D6852] shrink-0" />
          <div className="flex-1">
            <p className="text-base font-semibold text-[#1f5341]">Kamu sudah terdaftar</p>
            <p className="text-[9px] leading-[13px] text-[#005341]">Konfirmasi telah dikirim ke email. Tambahkan ke kalender ya.</p>
          </div>
          <button onClick={go('community')} className="px-4 h-9 border border-[#3D6852] text-[#3D6852] text-sm rounded-md hover:bg-[#3D6852]/10 transition-colors">Tambah ke Kalender</button>
        </div>

        {/* Hero */}
        <div className="rounded-2xl p-8 md:p-10 bg-[#F2E9E5] shadow-[0_4px_20px_rgba(120,85,93,0.05)]">
          <span className="uppercase text-[11px] font-bold tracking-[0.1em] text-[#78555d] block mb-2">Event Community</span>
          <h1 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-[#433139] font-serif mb-6">Melepas dengan Kelembutan: Eksplorasi Rasa Bersalah</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Calendar, label: 'Tanggal & Waktu', value: 'Jumat, 21 Maret 2026 · 19:30 WIB' },
              { icon: Clock, label: 'Durasi', value: '90 menit' },
              { icon: Video, label: 'Platform', value: 'Zoom · link dikirim H-1' },
              { icon: Users, label: 'Kapasitas', value: '38 / 50 kursi', active: true },
            ].map((m) => (
              <div key={m.label} className="flex items-start gap-3">
                <m.icon className={`w-6 h-6 mt-0.5 shrink-0 ${m.active ? 'text-[#3D6852]' : 'text-[#78555d]'}`} />
                <div>
                  <p className="text-[9px] leading-[13px] text-[#4d4448] uppercase tracking-[0.04em]">{m.label}</p>
                  <p className="text-base text-[#433139]">{m.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#d0c3c7]/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#433139] flex items-center justify-center text-[#BDA494] font-semibold">DF</div>
              <div>
                <p className="text-base font-semibold text-[#433139]">Bersama Davina F.</p>
                <p className="text-[9px] leading-[13px] text-[#4d4448]">Psikolog & Fasilitator Community</p>
              </div>
            </div>
            <span className="bg-[#3D6852] text-white text-[11px] leading-4 tracking-[0.04em] px-3 py-1.5 rounded-full font-bold">GRATIS untuk member</span>
          </div>
        </div>

        {/* Detail */}
        <div className="mt-10">
          <h2 className="text-[32px] leading-[40px] font-normal text-[#433139] font-serif mb-6">Tentang event ini</h2>
          <div className="space-y-4 text-base text-[#291714]">
            <p>Rasa bersalah sering datang tanpa diundang — hadir mengikuti keputusan yang sebenarnya tepat untuk kita. Kita akan menjelajahinya bersama dengan kelembutan, bukan penyangkalan.</p>
            <p>Lewat sharing session dan latihan pernapasan terpandu, kita akan belajar membedakan mana rasa bersalah yang menuntun kita pulih — dan mana yang hanya mewarisi ekspektasi orang lain.</p>
            <p>Ini bukan terapi kelompok, tapi ruang jujur untuk saling mendengar. Kamu bebas berbicara, diam, atau hanya menjadi pendengar.</p>
          </div>
          <div className="mt-8 bg-[#F7F1EE] rounded-xl p-6">
            <h3 className="font-sans font-semibold text-lg text-[#433139] mb-4">Yang akan dibahas</h3>
            <ul className="space-y-3">
              {['Membedakan "guilt" dan "shame" dalam keseharian', 'Praktik journaling: menulis surat untuk diri sendiri', 'Teknik pernapasan 4-7-8 untuk grounding', 'Ritual penutupan & berbagi (opt-in)'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#BDA494] mt-2 shrink-0" />
                  <span className="text-base text-[#291714]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Privacy commitment */}
        <div className="mt-8 bg-[#f4fef3] rounded-xl p-6 border border-[#3D6852]/20 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-[#3D6852] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-base font-semibold text-[#005341] mb-1">Komitmen Ruang Aman</p>
            <p className="text-[9px] leading-[13px] text-[#006148] mb-3">Dengan mendaftar, kamu menyetujui menjaga privasi semua peserta. Cerita yang dibagikan tetap menjadi milik pembicaranya.</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked readOnly className="w-4 h-4 accent-[#34644c]" />
              <span className="text-[9px] leading-[13px] text-[#005341]">Saya memahami dan menyetujui komitmen Privacy Event</span>
            </label>
          </div>
        </div>

        {/* States strip — referensi state sepenuhnya */}
        <div className="mt-12 border-t border-dashed border-[#d0c3c7]/50 pt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#78555d] mb-4">Referensi state lain (pratinjau)</p>
          <div className="space-y-3">
            <div className="p-4 bg-[#F2E9E5]/50 rounded-lg border border-[#d0c3c7]/40 opacity-70 flex justify-between items-center">
              <div>
                <p className="text-[11px] leading-4 tracking-[0.04em] text-[#433139] font-medium">SEDANG BERLANGSUNG — tombol berubah menjadi "Gabung Sekarang"</p>
                <p className="text-[9px] leading-[13px] text-[#4d4448]/60">Event sedang berlangsung — Gabung Sekarang</p>
              </div>
            </div>
            <div className="p-4 bg-[#F7F1EE] rounded-lg border border-[#d0c3c7]/30 opacity-50 flex justify-between items-center">
              <div>
                <p className="text-base text-[#4d4448]">Selesai → terima kasih sudah datang · recap dikirim via email</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-[#d0c3c7]/40 opacity-40 flex justify-between items-center">
              <p className="text-base text-[#4d4448]">Dibatalkan — peserta diinfo via email & pesan aplikasi</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
