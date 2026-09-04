import React from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { AlertCircle, Eye, EyeOff, CheckCircle, Lock, ShieldCheck, MailCheck } from 'lucide-react';

// STRICTLY MOCKUP (SEQ 065-070): statis — TANPA JWT/OAuth/database/backend.
// B3 2026-09-03: state machine view login(065)/register(066)/forgot(067a)/sent(067b)/
// reset(068)/verify(069)/merge(070). Wiring: login→register→verify→dashboard,
// login→forgot→sent→reset→login. Copy literal dari html referensi (simple perfected).
type AuthView = 'login' | 'register' | 'forgot' | 'sent' | 'reset' | 'verify' | 'merge';

interface AuthScreenProps {
  onNavigate?: (tab: NavTab) => void;
  // B3 wiring 2026-09-03: buka langsung ke step tertentu via route (e.g. 'auth-register' → 'register').
  initialView?: AuthView;
}

const IMG_KEY = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxWekurDZgzTSdVaAInu36rMhC3xNFI-LiMAj6PcUfUboTrxg2JQgc3uey1KJZ_HyTcoORESifBlZw9f1OiTKLnGx4NBzv8A1qEREW6fbPQ5hJ_hP_75-D2kWW5GlDsLiav8UvbC5S6VLtN1EKQfWx4WgzG9XecH9qkVEHuKsB6eeMCOilz6uGRYZiDSWUtG5X0H0i2tYAeB_yP7eMbv_Kk9eNM5ST0ZFipI9EhopgdR1OtFJNm2GOXmneh4KqJCwQyuGxWCut8pk';
const IMG_ENVELOPE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkdNBScf4Y37EqIF_eDSj3K5LtLTBnSmV0NZZvctjif9iX9viuKv-sGkn8y_gQ08xHr2HqnO6CPfHT2qMB9p1RYuoXMEzZAa40SGivrwP3QJ7X4V06qCRVwJtv7FnwsdDx-C8WRH42ACWYUzR-H80HZs4ZDujhoXhxOidHtinTLJVhmx5QrIYenHYU0EaQ2_sdjDgaIIIRvyTzEzEWp_8DqPH__ujJIkwrxXGWMyzhA8J1TpsE1OeHD32iy1ulqNXossDnO-bR9Og';
const IMG_MERGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYVYEemLYh-44OOV08AYEiZkZa1X7upBCWZwNR6ARfV-_cXF8I7acMbLQNiwjmXPN3yCT84TXnXMFIaz14BmXTeHBnDJ1Qx6iserlPID0dAC_VYo6Uwr-aHERMfL_kqCL7cr5B0Nrti2HgvDF4IP-QDPr0jBoweNdLWdbw_z7uf5PZ8KnuUwTjeXuVIeBQeO3gfqgT4n45AKrLDSCDiojTELeV9IhbPfIZocQOlNGoZCYsj-0ycOaQYHrY1t21KCE0kVQAcueNyyc';

const inputCls = 'w-full h-12 bg-white border border-[#BDA494] rounded-lg px-4 text-base text-[#291714] focus:outline-none focus:border-[#433139] transition-colors';
const primaryBtn = 'w-full h-12 bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all';
const cardCls = 'w-full bg-white rounded-xl border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] p-8 md:p-10';
const footerLinks = (
  <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.06em] text-[#4d4448]">
    <button className="hover:text-[#433139] transition-colors">Privasi</button>
    <button className="hover:text-[#433139] transition-colors">Syarat</button>
    <button className="hover:text-[#433139] transition-colors">Bantuan</button>
  </div>
);

export const AuthScreen: React.FC<AuthScreenProps> = ({ onNavigate, initialView = 'login' }) => {
  const [view, setView] = React.useState<AuthView>(initialView);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('nadia@email.com');
  const [newPass, setNewPass] = React.useState('');
  const [repeatPass, setRepeatPass] = React.useState('');
  const [resetDone, setResetDone] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const go = (fn: () => void) => () => { soundEngine.playSoftClick(); fn(); };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };
  const to = (v: AuthView) => () => { soundEngine.playSoftClick(); setView(v); };

  // 068: kekuatan sandi dihitung dari nilai input (criteria literal dari referensi).
  const strength = [
    newPass.length >= 8,
    /[a-z]/.test(newPass) && /[A-Z]/.test(newPass),
    /\d/.test(newPass),
    /[^A-Za-z0-9]/.test(newPass),
  ];
  const score = strength.filter(Boolean).length;
  const strengthLabel = score >= 4 ? 'Kuat' : score >= 2 ? 'Sedang' : 'Lemah';
  const match = repeatPass.length > 0 && repeatPass === newPass;

  return (
    <div className="animate-fadeIn min-h-[80vh] flex flex-col items-center px-4 py-16 md:py-20 bg-[#FAF3EE]">
      <div className="w-full max-w-[480px] flex flex-col items-center">
        <h1 className="font-serif text-[32px] leading-tight font-semibold tracking-[-0.02em] text-[#433139] mb-10">ITS FAISHA™</h1>

        {/* ============ 065 LOGIN ============ */}
        {view === 'login' && (
          <div className="relative w-full">
            {/* Floating error banner (verbatim 065) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-[#ffdad6] text-[#93000a] px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium">Email atau kata sandi tidak cocok - coba lagi</span>
            </div>

            <div className={cardCls}>
              <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139]">Selamat Datang Kembali</h2>
              <p className="text-base text-[#4d4448] mt-1 mb-8">Masuk untuk melanjutkan perjalanan ritualmu</p>

              <label className="block text-sm font-semibold text-[#433139] mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" className={`${inputCls} mb-5`} />

              <label className="block text-sm font-semibold text-[#433139] mb-2">Kata Sandi</label>
              <div className="relative mb-4">
                <input type={showPassword ? 'text' : 'password'} defaultValue="password123" className={`${inputCls} pr-12`} />
                <button onClick={go(() => setShowPassword((v) => !v))} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7f7478] hover:text-[#433139] transition-colors" aria-label="Toggle kata sandi">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button onClick={go(() => onNavigate?.('dashboard'))} className="w-full h-12 bg-[#433139] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:opacity-90 transition-opacity mb-4">
                Masuk (demo)
              </button>

              <div className="text-center mb-6">
                <button onClick={to('forgot')} className="text-sm text-[#78555d] underline hover:text-[#433139] transition-colors">Lupa kata sandi?</button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#d0c3c7]/50" />
                <span className="text-xs uppercase tracking-[0.06em] text-[#7f7478]">atau</span>
                <div className="flex-1 h-px bg-[#d0c3c7]/50" />
              </div>

              <button onClick={go(() => showToast('MOCK — tautan masuk terkirim (tanpa backend)'))} className="w-full h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] transition-colors">
                Kirim Tautan Masuk ke Email
              </button>

              <p className="text-center text-sm text-[#4d4448] mt-8">
                Belum punya akun?{' '}
                <button onClick={to('register')} className="font-bold text-[#433139] underline hover:opacity-80 transition-opacity">Daftar</button>
              </p>
              <p className="text-center text-xs text-[#7f7478] mt-3">
                <button onClick={to('merge')} className="underline hover:text-[#433139] transition-colors">Gabungkan dua akun (demo 070)</button>
              </p>
            </div>

            <div className="w-full text-center mt-8 space-y-2">
              <p className="text-xs text-[#9E3B3B]/80">Terlalu banyak percobaan - coba lagi dalam 10 menit</p>
              <p className="text-xs text-[#4d4448]">
                Butuh bantuan?{' '}
                <button onClick={go(() => onNavigate?.('support'))} className="underline hover:text-[#433139] transition-colors">Hubungi dukungan</button>
              </p>
            </div>
          </div>
        )}

        {/* ============ 066 REGISTER ============ */}
        {view === 'register' && (
          <div className={cardCls}>
            <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139]">Buat Akunmu</h2>
            <p className="text-base text-[#4d4448] mt-1 mb-6">Data minimal, manfaat maksimal - simpan hasil assessment, ritual, dan pesananmu</p>

            <div className="bg-[#F2E9E5] border border-[#BDA494]/40 rounded-lg px-4 py-3 mb-6">
              <p className="text-sm text-[#433139]">Hasil assessment <span className="font-bold">THE NURTURER</span> akan otomatis tersimpan ke akunmu.</p>
            </div>

            <label className="block text-sm font-semibold text-[#433139] mb-2">Nama Lengkap</label>
            <input type="text" placeholder="Nadia Prameswari" className={`${inputCls} mb-5`} />

            <label className="block text-sm font-semibold text-[#433139] mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" className={`${inputCls} mb-1`} />
            <p className="text-xs text-[#9E3B3B] mb-5">Format email tidak valid</p>

            <label className="block text-sm font-semibold text-[#433139] mb-2">Kata Sandi</label>
            <input type="password" defaultValue="password123" className={inputCls} />
            <p className="text-xs text-[#7f7478] mt-1 mb-5">Min. 8 karakter, kombinasi huruf &amp; angka</p>

            <label className="flex items-start gap-2 text-sm text-[#4d4448] mb-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 accent-[#5B4750]" />
              <span>Saya setuju dengan Syarat &amp; Ketentuan dan Kebijakan Privasi</span>
            </label>
            <label className="flex items-start gap-2 text-sm text-[#4d4448] mb-7 cursor-pointer">
              <input type="checkbox" className="mt-1 accent-[#5B4750]" />
              <span>Saya ingin menerima kabar ritual &amp; penawaran via email</span>
            </label>

            <button onClick={go(() => setView('verify'))} className={primaryBtn}>Buat Akun</button>
            <p className="text-center text-sm text-[#4d4448] mt-6">
              Sudah punya akun?{' '}
              <button onClick={to('login')} className="font-bold text-[#433139] underline hover:opacity-80 transition-opacity">Masuk</button>
            </p>
            <div className="mt-8">{footerLinks}</div>
          </div>
        )}

        {/* ============ 067a FORGOT ============ */}
        {view === 'forgot' && (
          <div className={cardCls}>
            <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-[#F2E9E5] flex items-center justify-center">
              <img alt="Illustration of a key with floral elements" className="w-full h-full object-contain opacity-90" src={IMG_KEY} />
            </div>
            <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] text-center">Atur Ulang Kata Sandimu</h2>
            <p className="text-base text-[#4d4448] mt-1 mb-8 text-center">Masukkan email akunmu - kami kirim tautan untuk mengatur ulang.</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={`${inputCls} mb-6`} />
            <button onClick={go(() => setView('sent'))} className={primaryBtn}>Kirim Tautan Atur Ulang</button>
            <div className="text-center mt-6">
              <button onClick={to('login')} className="text-sm text-[#433139] underline hover:opacity-80 transition-colors">← Kembali ke Masuk</button>
            </div>
          </div>
        )}

        {/* ============ 067b SENT ============ */}
        {view === 'sent' && (
          <div className="w-full bg-white rounded-xl border border-[#BDA494] shadow-[0_4px_20px_rgba(91,71,80,0.04)] overflow-hidden text-center">
            <div className="bg-[#F2E9E5] border-b border-[#BDA494]/40 py-8 flex justify-center">
              <img alt="Illustration of a key with floral elements" className="w-24 h-24 object-contain opacity-90" src={IMG_KEY} />
            </div>
            <div className="p-8 md:p-10">
              <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] mb-3">Tautan Terkirim</h2>
              <p className="text-base text-[#4d4448] mb-6">
                Jika email <span className="font-bold text-[#433139]">{email}</span> terdaftar, tautan atur ulang sudah dikirim. Cek inbox atau folder spam - berlaku 30 menit.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#d0c3c7]/50" />
                <span className="text-xs uppercase tracking-[0.06em] text-[#7f7478]">mock</span>
                <div className="flex-1 h-px bg-[#d0c3c7]/50" />
              </div>
              {/* Tanpa backend: tautan email dipalsukan dengan tombol demo. */}
              <button onClick={go(() => { setResetDone(false); setView('reset'); })} className={`${primaryBtn} mb-4`}>Buka Tautan Atur Ulang (demo)</button>
              <button onClick={go(() => showToast('MOCK — tautan dikirim ulang (tanpa backend)'))} className="block mx-auto text-sm text-[#433139] underline hover:opacity-80 transition-colors mb-2">Tidak menerima? Kirim ulang</button>
              <p className="text-xs text-[#4d4448] mb-6">
                Email sudah tidak aktif?{' '}
                <button onClick={go(() => onNavigate?.('support'))} className="underline text-[#433139]">Hubungi dukungan</button>
              </p>
              <button onClick={to('login')} className="text-sm text-[#433139] underline hover:opacity-80 transition-colors">← Kembali ke Masuk</button>
            </div>
          </div>
        )}

        {/* ============ 068 RESET ============ */}
        {view === 'reset' && (
          <div className={cardCls}>
            {!resetDone ? (
              <>
                <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139]">Kata Sandi Baru</h2>
                <p className="text-base text-[#4d4448] mt-1 mb-6">Buat kata sandi yang kuat untuk akunmu</p>

                <label className="block text-sm font-semibold text-[#433139] mb-2">Kata Sandi Baru</label>
                <div className="relative mb-3">
                  <input type={showPassword ? 'text' : 'password'} value={newPass} onChange={(e) => setNewPass(e.target.value)} className={`${inputCls} pr-12`} />
                  <button onClick={go(() => setShowPassword((v) => !v))} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7f7478] hover:text-[#433139] transition-colors" aria-label="Toggle kata sandi">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="bg-[#F2E9E5] rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#4d4448]">Kekuatan Kata Sandi</span>
                    <span className={`text-xs font-bold ${score >= 4 ? 'text-[#3D6852]' : 'text-[#9E3B3B]'}`}>{strengthLabel}</span>
                  </div>
                  <div className="flex gap-1.5 mb-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < score ? 'bg-[#3D6852]' : 'bg-[#d0c3c7]'}`} />
                    ))}
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#4d4448]">
                    {['8+ karakter', 'Huruf besar & kecil', 'Angka', 'Simbol (opsional)'].map((c, i) => (
                      <li key={c} className={strength[i] ? 'text-[#3D6852] font-semibold' : ''}>{strength[i] ? '✓' : '○'} {c}</li>
                    ))}
                  </ul>
                </div>

                <label className="block text-sm font-semibold text-[#433139] mb-2">Ulangi Kata Sandi</label>
                <input type={showPassword ? 'text' : 'password'} value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} className={inputCls} />
                {match && <p className="text-xs text-[#3D6852] font-semibold mt-1 mb-4">Cocok</p>}
                {!match && <p className="text-xs text-[#7f7478] mt-1 mb-4">Password belum cocok</p>}

                <button onClick={go(() => setResetDone(true))} className={primaryBtn}>Simpan Kata Sandi Baru</button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <CheckCircle className="w-12 h-12 text-[#3D6852] mb-4" />
                <p className="text-base text-[#291714] mb-6">Kata sandi berhasil diubah</p>
                <button onClick={go(() => { setView('login'); showToast('Masuk dengan kata sandi barumu'); })} className={primaryBtn}>Masuk Sekarang</button>
              </div>
            )}
          </div>
        )}

        {/* ============ 069 VERIFY ============ */}
        {view === 'verify' && (
          <div className="w-full flex flex-col items-center">
            {!verified ? (
              <div className={`${cardCls} text-center flex flex-col items-center`}>
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden bg-[#F2E9E5] flex items-center justify-center">
                  <img alt="A delicate, ethereal illustration of an envelope surrounded by soft, glowing botanical elements in warm ivory and champagne taupe." className="w-full h-full object-cover" src={IMG_ENVELOPE} />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] mb-3">Verifikasi Emailmu</h2>
                <p className="text-base text-[#4d4448] mb-5">
                  Kami mengirim tautan verifikasi ke <span className="font-bold">{email}</span> — klik tautan untuk mengaktifkan akunmu.
                </p>
                <div className="bg-[#F2E9E5] w-full rounded-lg p-4 mb-6 border border-[#BDA494]/30">
                  <p className="text-sm text-[#291714] flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#433139]" />
                    Setelah verifikasi, hasil assessment-mu langsung terbuka lengkap.
                  </p>
                </div>
                <div className="w-full flex flex-col gap-3">
                  {/* Tanpa backend: klik tautan email dipalsukan dengan tombol demo. */}
                  <button onClick={go(() => setVerified(true))} className={primaryBtn}>Buka Tautan Verifikasi (demo)</button>
                  <button onClick={go(() => showToast('MOCK — email verifikasi terkirim ulang (tanpa backend)'))} className="w-full h-12 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] transition-colors">
                    Kirim Ulang Email
                  </button>
                  <span className="text-xs text-[#7f7478]">Tersedia dalam 00:45</span>
                  <button onClick={to('register')} className="text-sm text-[#433139] hover:text-[#5B4750] transition-colors mt-1">Ubah alamat email</button>
                </div>
                <p className="text-xs text-[#7f7478] mt-8">Cek folder spam atau promosi jika tidak menemukan email.</p>
              </div>
            ) : (
              <div className={`${cardCls} text-center flex flex-col items-center`}>
                <MailCheck className="w-12 h-12 text-[#3D6852] mb-4" />
                <p className="text-base text-[#291714] mb-6">Email terverifikasi — selamat datang, Beautiful Soul</p>
                <button onClick={go(() => onNavigate?.('dashboard'))} className={primaryBtn}>Buka Dashboard</button>
              </div>
            )}
            <div className="mt-8">{footerLinks}</div>
          </div>
        )}

        {/* ============ 070 MERGE ============ */}
        {view === 'merge' && (
          <div className={cardCls}>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-[#F2E9E5] flex items-center justify-center">
              <img alt="Two overlapping minimal circles symbolizing the merging of two accounts, rendered in soft watercolor plum and taupe tones on a warm ivory background." className="w-full h-full object-cover mix-blend-multiply" src={IMG_MERGE} />
            </div>
            <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#433139] text-center mb-3">Kami Menemukan Dua Akun</h2>
            <p className="text-base text-[#4d4448] text-center mb-6 px-2">
              Email <span className="font-bold text-[#433139]">{email}</span> terdaftar dengan dua metode: kata sandi dan Google. Gabungkan agar hasil assessment, pesanan, dan ritualmu menyatu.
            </p>

            <div className="w-full flex flex-col gap-2 mb-6">
              <div className="border border-[#BDA494] rounded-lg p-4 flex items-start gap-3 text-left bg-white">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#F2E9E5] flex items-center justify-center"><UserGlyph /></div>
                <div>
                  <h3 className="text-base font-semibold text-[#433139]">Akun Kata Sandi</h3>
                  <p className="text-xs text-[#4d4448]">Dibuat 12 Jan 2026 • 1 hasil assessment</p>
                </div>
              </div>
              <div className="border border-[#BDA494] rounded-lg p-4 flex items-start gap-3 text-left bg-white">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#F2E9E5] flex items-center justify-center"><UserGlyph /></div>
                <div>
                  <h3 className="text-base font-semibold text-[#433139]">Akun Google</h3>
                  <p className="text-xs text-[#4d4448]">Dibuat 3 Mar 2026 • 2 pesanan</p>
                </div>
              </div>
            </div>

            <label className="block text-base font-semibold text-[#433139] mb-1">Verifikasi kepemilikan dulu</label>
            <p className="text-xs text-[#4d4448] mb-3">Masukkan 6 digit kode yang kami kirimkan ke email Anda.</p>
            <div className="flex justify-between gap-2 mb-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <input key={n} aria-label={`Digit ${n}`} maxLength={1} className="w-12 h-12 text-center text-lg font-bold bg-white border border-[#BDA494] rounded-md focus:outline-none focus:border-[#433139] focus:ring-1 focus:ring-[#433139] transition-colors text-[#433139]" />
              ))}
            </div>
            <button onClick={go(() => showToast('MOCK — kode dikirim ulang (tanpa backend)'))} className="text-xs text-[#433139] underline hover:text-[#5B4750] transition-colors mb-6">Kirim ulang kode</button>

            <button onClick={go(() => { setView('login'); showToast('MOCK — akun berhasil digabungkan'); })} className={primaryBtn}>Gabungkan Akun</button>
            <p className="flex items-center justify-center gap-2 text-xs text-[#4d4448] mt-4 mb-6">
              <Lock className="w-4 h-4" /> Penggabungan hanya setelah verifikasi kepemilikan - tidak ada data yang hilang.
            </p>
            <div className="text-center">
              <button onClick={go(() => onNavigate?.('support'))} className="text-xs text-[#433139] underline hover:text-[#5B4750] transition-colors">Bukan akunmu? Hubungi dukungan</button>
            </div>
          </div>
        )}
      </div>

      {/* Mock toast */}
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#433139] text-[#FAF3EE] text-sm px-5 py-3 rounded-lg shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  );
};

const UserGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#5B4750" strokeWidth="1.75" className="w-5 h-5" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" strokeLinecap="round" />
  </svg>
);
