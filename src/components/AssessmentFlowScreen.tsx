import React, { useEffect, useState } from 'react';
import { NavTab, Language, ScentAssessmentResult } from '../types';
import { PRODUCTS, SARAH_DEFAULT_RESULT } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Cloud, Save, Sparkles } from 'lucide-react';

/**
 * GROUP C — SINGLE BLOCK FLOW, urutan seq resmi (tanpa step terlewat):
 * 044 Landing → 045 How It Works → 047 Q1 Identitas → 048 Q2 Emosi → 049 Q3 Pola Pikir
 * → 050 Q4 Energi → 051 Q5 Perilaku → 052 Q6 Kebutuhan → 054 Processing (timer 3s)
 * → 055 Result Short (The Nurturer) → 056 Save → 057 Summary.
 * Satu komponen, step index linear; pemetaan step→layar didokumentasikan di STEP_IDS.
 */

const STEP_IDS = [
  'FAI-SCR-044', 'FAI-SCR-045', 'FAI-SCR-047', 'FAI-SCR-048', 'FAI-SCR-049', 'FAI-SCR-050',
  'FAI-SCR-051', 'FAI-SCR-052', 'FAI-SCR-054', 'FAI-SCR-055', 'FAI-SCR-056', 'FAI-SCR-057',
] as const;

const LAYERS = ['Identity', 'Emotion', 'Mindset', 'Energy', 'Behavior', 'Need'] as const;
type Layer = (typeof LAYERS)[number];

// 6 pertanyaan (047..052) — opsi berganti layer agar skor deterministik dari jawaban.
const QUESTIONS: { layer: Layer; title: string; prompt: string; hint: string; options: string[] }[] = [
  { layer: 'Identity', title: 'Identitas', prompt: 'Saat paling sendiri, siapa dirimu tanpa peran apa pun?', hint: 'Pilih yang paling jujur', options: ['Penjaga ketenangan yang berdaulat', 'Pencipta yang butuh ruang ekspresi', 'Pelindung orang-orang terdekat', 'Pencari makna yang sunyi'] },
  { layer: 'Emotion', title: 'Emosi', prompt: 'Apa yang paling kamu butuhkan saat hati terasa penuh?', hint: 'Pilih yang paling menenangkan', options: ['Dibelai tanpa perlu menjelaskan', 'Ruang untuk melepas tanpa dihakimi', 'Kehangatan orang yang paham', 'Hening yang memulihkan'] },
  { layer: 'Mindset', title: 'Pola Pikir', prompt: 'Gangguan batin mana yang paling sering menguras fokusmu?', hint: 'Pilih yang paling sering muncul', options: ['Overthinking sebelum bertindak', 'Ragu pada suara sendiri', 'Terlalu menyerap ekspektasi orang', 'Sulit berhenti sejenak'] },
  { layer: 'Energy', title: 'Energi', prompt: 'Ritme pagi seperti apa yang paling memulihkanmu?', hint: 'Pilih ritme idealmu', options: ['Lambat, hening, tanpa gawai', 'Cahaya, gerak, dan napas panjang', 'Ritual kecil yang konsisten', 'Sendiri dulu, baru berbagi'] },
  { layer: 'Behavior', title: 'Perilaku', prompt: 'Kebiasaan mana yang paling setia menjaga keseimbanganmu?', hint: 'Pilih jangkar harianmu', options: ['Menyalakan lilin di penghujung hari', 'Menulis refleksi singkat', 'Merapikan ruang sebelum benak', 'Jeda sadar sebelum merespons'] },
  { layer: 'Need', title: 'Kebutuhan', prompt: 'Kebutuhan apa yang paling sering kamu tunda untuk dirimu sendiri?', hint: 'Pilih yang paling kamu tahan', options: ['Istirahat tanpa rasa bersalah', 'Batasan yang tegas namun lembut', 'Kedekatan yang tidak menuntut', 'Waktu hening yang terlindungi'] },
];

interface AssessmentFlowScreenProps {
  lang: Language;
  onNavigate: (tab: NavTab) => void;
}

export const AssessmentFlowScreen: React.FC<AssessmentFlowScreenProps> = ({ lang, onNavigate }) => {
  const [step, setStep] = useState(0); // 0..11 — linear, tanpa lompat
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [saved, setSaved] = useState(false);

  // Proteksi mount: selalu mulai dari 044 Landing saat diakses ulang dari menu
  useEffect(() => {
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(-1));
    setSaved(false);
  }, []);

  // Reset penuh "Ulangi Assessment" → kembali ke step 0 (Landing)
  const resetFlow = () => {
    soundEngine.playSoftClick();
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(-1));
    setSaved(false);
    window.scrollTo({ top: 0 });
  };

  // 054 Processing: timer 3 detik → otomatis ke 055 Result Short
  useEffect(() => {
    if (step !== 8) return;
    const t = setTimeout(() => setStep(9), 3000);
    return () => clearTimeout(t);
  }, [step]);

  const next = () => { soundEngine.playSoftClick(); setStep((s) => Math.min(s + 1, STEP_IDS.length - 1)); window.scrollTo({ top: 0 }); };
  const prev = () => { soundEngine.playSoftClick(); setStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0 }); };

  const isQuestion = step >= 2 && step <= 7;
  const qIdx = step - 2;
  const q = isQuestion ? QUESTIONS[qIdx] : null;
  const canNext = !isQuestion || answers[qIdx] >= 0;

  // Skor proporsional dari jawaban (≤100% per layer, total 100) — konsisten KRIT-3
  const tally: Record<string, number> = { Identity: 1, Emotion: 1, Mindset: 1, Energy: 1, Behavior: 1, Need: 1, Vision: 1 };
  answers.forEach((a, i) => { if (a >= 0) tally[QUESTIONS[i].layer] += 3; });
  const total = Object.values(tally).reduce((s, v) => s + v, 0);
  const layerScores: Record<string, number> = Object.fromEntries(Object.entries(tally).map(([k, v]) => [k, Math.round((v / total) * 100)]));
  const dominant = (Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0]) as Layer | 'Vision';
  const result: ScentAssessmentResult = { ...SARAH_DEFAULT_RESULT, dominantLayer: dominant, layerScores };
  const product = PRODUCTS.find((p) => p.alignmentLayer === dominant) || SARAH_DEFAULT_RESULT.recommendedFragrance;

  const T = (id: string, en: string) => (lang === 'id' ? id : en);

  return (
    <div className="animate-fadeIn min-h-[70vh] flex flex-col items-center">
      {/* Progress line + step counter (konsisten dgn layar kuis lama) */}
      <div className="w-full h-1 bg-[#fedbd6] fixed top-0 left-0 z-40">
        <div className="h-full bg-[#433139] transition-all duration-500" style={{ width: `${((step + 1) / STEP_IDS.length) * 100}%` }} />
      </div>

      <main className="flex-grow w-full max-w-[720px] px-4 md:px-10 py-14 md:py-24 flex flex-col items-center justify-center gap-8">
        {/* a11y: #7f7478 on white = 4.09 < 4.5 → #6b6065 (Lighthouse color-contrast) */}
        <div className="w-full flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.08em] text-[#6b6065]">
          <span>{STEP_IDS[step]}</span>
          <span>{step + 1} / {STEP_IDS.length}</span>
        </div>

        {/* ── 044 — LANDING ── */}
        {step === 0 && (
          <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-8 md:p-12 flex flex-col items-center text-center gap-6">
            <Sparkles className="w-10 h-10 text-[#5B4750]" />
            <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">
              {T('Analisis Aromamu', 'Discover Your Aroma Profile')}
            </h1>
            <p className="text-lg leading-[28px] text-[#4d4448] max-w-md mx-auto">
              {T('Enam pertanyaan singkat untuk membaca lapisan jiwamu — Identitas, Emosi, Pola Pikir, Energi, Perilaku, dan Kebutuhan — lalu memadukannya dengan profil aroma yang paling resonan.',
                'Six short questions read the layers of your soul — Identity, Emotion, Mindset, Energy, Behavior, and Need — then match you with your most resonant aroma profile.')}
            </p>
            <button onClick={next} className="w-full md:w-auto min-w-[280px] bg-[#433139] text-white font-semibold text-base h-[48px] px-6 rounded inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]">
              {T('Mulai Assessment', 'Begin Assessment')} <ArrowRight className="w-[18px] h-[18px]" />
            </button>
          </article>
        )}

        {/* ── 045 — HOW IT WORKS ── */}
        {step === 1 && (
          <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-8 md:p-12 flex flex-col gap-6">
            <h1 className="font-serif text-[28px] leading-[36px] font-semibold tracking-[-0.01em] text-[#433139] text-center">{T('Cara Kerjanya', 'How It Works')}</h1>
            <ol className="space-y-4">
              {[
                [T('Jawab 6 pertanyaan reflektif', 'Answer 6 reflective questions'), T('~2 menit, tanpa jawaban benar atau salah', '~2 minutes, no right or wrong answers')],
                [T('Kami memproses profilmu', 'We process your profile'), T('Skor per lapisan dinormalisasi proporsional (total 100%)', 'Layer scores normalized proportionally (100% total)')],
                [T('Terima hasil & ritualnya', 'Receive your result & ritual'), T('Archetype, rekomendasi aroma, dan panduan ritual harian', 'Archetype, fragrance match, and daily ritual guidance')],
              ].map(([t, d], i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#F2E9E5] border border-[#BDA494]/40 flex items-center justify-center text-sm font-bold text-[#5B4750]">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-[#433139]">{t}</p>
                    <p className="text-sm text-[#4d4448]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-2">
              <button onClick={prev} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-[0.06em] uppercase text-[#433139] py-3 px-6 border border-[#BDA494]/50 rounded hover:bg-[#F7F1EE] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> {T('Kembali', 'Back')}
              </button>
              <button onClick={next} className="bg-[#433139] text-[#FAF3EE] text-sm font-semibold py-3 px-8 rounded inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity min-h-[48px]">
                {T('Lanjut ke Pertanyaan 1', 'Continue to Question 1')} <ArrowRight className="w-[18px] h-[18px]" />
              </button>
            </div>
          </article>
        )}

        {/* ── 047..052 — Q1..Q6 ── */}
        {q && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full mb-6 pt-4">
              <span className="text-xs font-bold tracking-[0.06em] uppercase text-[#4d4448]">
                {T(`Lapisan ${qIdx + 1} dari 6: ${q.title}`, `Layer ${qIdx + 1} of 6: ${q.title}`)}
              </span>
              <div className="w-full h-[2px] bg-[#d0c3c7]/30 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-[#5B4750] transition-all duration-500" style={{ width: `${((qIdx + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
            </div>
            <div className="flex flex-col items-center text-center mt-2 mb-10">
              <span className="font-serif text-[48px] leading-[56px] font-semibold text-[#5B4750]/20 mb-4 select-none">{String(qIdx + 1).padStart(2, '0')}</span>
              <h1 className="font-serif text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] font-semibold tracking-[-0.01em] text-[#433139] mb-4">{q.prompt}</h1>
              <p className="text-base text-[#4d4448]">{q.hint}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
              {q.options.map((opt, i) => {
                const selected = answers[qIdx] === i;
                return (
                  <label key={i} className={`relative flex items-center p-6 rounded-xl border cursor-pointer transition-all min-h-[120px] ${selected ? 'border-[#5B4750] bg-[#F2E9E5]' : 'border-[#d0c3c7]/50 bg-white hover:border-[#5B4750]/50 hover:bg-[#fff0ee]'}`}>
                    <input checked={selected} className="sr-only" name={`q${qIdx}`} type="radio" value={i}
                      onChange={() => { soundEngine.playSoftClick(); setAnswers((prevA) => { const a = [...prevA]; a[qIdx] = i; return a; }); }} />
                    <p className={`flex-grow ${selected ? 'text-base font-semibold tracking-[0.01em] text-[#433139]' : 'text-lg leading-[28px] text-[#4d4448]'}`}>{opt}</p>
                    {selected && <CheckCircle2 className="w-6 h-6 ml-4 shrink-0 text-[#5B4750]" />}
                  </label>
                );
              })}
            </div>
            <div className="w-full pt-4 border-t border-[#d0c3c7]/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[#3D6852] text-[11px] leading-4 tracking-[0.04em] font-medium opacity-80">
                <Cloud className="w-4 h-4" /> <span>{T('Tersimpan otomatis', 'Auto-saved')}</span>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button onClick={prev} className="text-xs font-bold tracking-[0.06em] uppercase text-[#433139] hover:text-[#5B4750] py-3 px-6 w-full md:w-auto text-center transition-colors">
                  {T('Kembali', 'Back')}
                </button>
                <button
                  onClick={canNext ? next : undefined}
                  disabled={!canNext}
                  className={`text-xs font-bold tracking-[0.06em] uppercase py-4 px-8 rounded inline-flex items-center justify-center gap-2 w-full md:w-auto min-h-[48px] transition-opacity ${canNext ? 'bg-[#433139] text-[#FAF3EE] hover:opacity-90' : 'bg-[#d0c3c7]/40 text-[#7f7478] cursor-not-allowed'}`}
                >
                  {qIdx === QUESTIONS.length - 1 ? T('Selesai', 'Finish') : T('Lanjut', 'Next')} <ArrowRight className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 054 — PROCESSING (auto 3s → 055) ── */}
        {step === 8 && (
          <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-12 flex flex-col items-center text-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-[#F2E9E5]" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#5B4750] animate-spin" />
            </div>
            <h1 className="font-serif text-[28px] leading-[36px] font-semibold tracking-[-0.01em] text-[#433139]">
              {T('Memproses Profil Aromamu…', 'Processing Your Aroma Profile…')}
            </h1>
            <p className="text-base text-[#4d4448] max-w-sm">
              {T('Menyeimbangkan skor keenam lapisan jiwamu.', 'Balancing the scores across your six soul layers.')}
            </p>
          </article>
        )}

        {/* ── 055 — RESULT SHORT: The Nurturer ── */}
        {step === 9 && (
          <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-8 md:p-12 flex flex-col items-center text-center gap-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#78555d]">{T('Hasil Singkat', 'Your Short Result')}</span>
            <h1 className="font-serif text-[36px] leading-[44px] font-semibold tracking-[-0.01em] text-[#433139]">The Nurturer</h1>
            <p className="text-base text-[#4d4448] max-w-md">
              {T(`Lapisan dominanmu: ${dominant}. Kamu memberi lewat kehadiran yang hangat dan tenang — aroma ${product.name} menyeimbangkan ritme itu.`,
                `Your dominant layer: ${dominant}. You give through warm, quiet presence — ${product.name} balances that rhythm.`)}
            </p>
            <div className="w-full max-w-sm space-y-2 pt-2">
              {Object.entries(layerScores).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 text-xs font-semibold text-[#433139]">
                  <span className="w-20 text-left">{k}</span>
                  <div className="flex-grow h-1.5 bg-[#F2E9E5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5B4750] rounded-full transition-all duration-700" style={{ width: `${v}%` }} />
                  </div>
                  <span className="w-9 text-right">{v}%</span>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 justify-center pt-4">
              <button onClick={resetFlow} className="text-xs font-bold tracking-[0.06em] uppercase text-[#433139] py-3 px-6 border border-[#BDA494]/50 rounded hover:bg-[#F7F1EE] transition-colors">
                {T('Ulangi Assessment', 'Retake Assessment')}
              </button>
              <button onClick={next} className="bg-[#433139] text-[#FAF3EE] text-sm font-semibold py-3 px-8 rounded inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity min-h-[48px]">
                {T('Simpan Hasil', 'Save Result')} <Save className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

        {/* ── 056 — SAVE ── */}
        {step === 10 && (
          <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-8 md:p-12 flex flex-col items-center text-center gap-5">
            <Check className="w-12 h-12 p-2 rounded-full bg-[#3D6852]/10 text-[#3D6852]" />
            <h1 className="font-serif text-[28px] leading-[36px] font-semibold tracking-[-0.01em] text-[#433139]">
              {T('Hasil Analisis Aromamu Tersimpan', 'Your Aroma Analysis Is Saved')}
            </h1>
            <p className="text-base text-[#4d4448] max-w-md">
              {T('Profil "The Nurturer" tersimpan di akun Sarah. Kamu bisa membukanya lagi kapan pun dari dasbor.',
                'Your "The Nurturer" profile is saved to Sarah\'s account. Reopen it anytime from your dashboard.')}
            </p>
            <button
              onClick={() => { setSaved(true); next(); }}
              className="bg-[#433139] text-[#FAF3EE] text-sm font-semibold py-3 px-8 rounded hover:opacity-90 transition-opacity min-h-[48px]"
            >
              {T('Lihat Ringkasan Hasil Lengkap', 'View Full Summary')}
            </button>
          </article>
        )}

        {/* ── 057 — SUMMARY ── */}
        {step === 11 && (
          <article className="w-full bg-white rounded-xl shadow-sm border border-[#d0c3c7]/20 p-8 md:p-12 flex flex-col gap-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#78555d]">{T('Ringkasan Hasil Lengkap', 'Full Result Summary')}</span>
              <h1 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">The Nurturer — {result.archetype}</h1>
            </div>
            <p className="text-base leading-[28px] text-[#4d4448] text-center max-w-lg mx-auto">
              {lang === 'id' ? result.essenceDescriptionId ?? result.essenceDescription : result.essenceDescription}
            </p>
            <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-xl p-6 flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover border border-[#BDA494]/30" />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#78555d]">{T('Aroma Rekomendasi', 'Recommended Fragrance')}</p>
                <p className="font-serif text-lg font-semibold text-[#433139]">{product.name}</p>
                <p className="text-xs text-[#4d4448]">{result.ritualGuidance}</p>
              </div>
            </div>
            {saved && (
              <p className="text-center text-[11px] text-[#3D6852] font-semibold uppercase tracking-wider">{T('✓ Tersimpan di profilmu', '✓ Saved to your profile')}</p>
            )}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-2">
              <button onClick={prev} className="text-xs font-bold tracking-[0.06em] uppercase text-[#433139] py-3 px-6 border border-[#BDA494]/50 rounded hover:bg-[#F7F1EE] transition-colors">
                {T('Kembali', 'Back')}
              </button>
              <button onClick={() => onNavigate('beranda')} className="bg-[#433139] text-[#FAF3EE] text-sm font-semibold py-3 px-8 rounded hover:opacity-90 transition-opacity min-h-[48px]">
                {T('Kembali ke Beranda', 'Back to Home')}
              </button>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};
