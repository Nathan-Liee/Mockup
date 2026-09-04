import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, Check, WifiOff, Shuffle, Bold, Italic, List, Lock } from 'lucide-react';

// Defer-mock 2026-09-04 — FAI-SCR-089 Journal Editor (intent html/089).
// Mood chips + prompt + minimal toolbar + save draft / close. Autosave = MOCK toast.
interface Props { onNavigate?: (tab: NavTab) => void; }

const MOODS = ['Tenang', 'Lelah', 'Bersyukur', 'Cemas', 'Berharap'];

export const JournalEditorScreen: React.FC<Props> = ({ onNavigate }) => {
  const [mood, setMood] = useState('Tenang');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'saved' | 'typing'>('saved');
  const [toast, setToast] = useState<string | null>(null);
  const mock = (msg: string) => { soundEngine.playSoftClick(); setToast(msg); setTimeout(() => setToast(null), 3000); };
  const back = () => { soundEngine.playSoftClick(); onNavigate?.('journal-private'); };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#FAF3EE] text-[#291714] flex flex-col">
      <main className="flex-1 max-w-[720px] w-full mx-auto px-4 pt-28 pb-8 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={back} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#5B4750] hover:text-[#433139] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <div className="flex items-center gap-3">
            {status === 'saved' && <span className="flex items-center gap-1 text-[11px] font-semibold text-[#3D6852]"><Check className="w-3.5 h-3.5" /> Tersimpan 19:42</span>}
            <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F2E9E5] text-[#5B4750] border border-[#d0c3c7]/40"><WifiOff className="w-3 h-3" /> Koneksi terputus — offline OK</span>
          </div>
        </div>

        <input type="text" defaultValue="Rabu, 11 Maret 2026" readOnly className="bg-transparent text-sm text-[#4d4448] mb-4 focus:outline-none" />

        {/* Mood chips */}
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#78555d] mb-2">Mood hari ini</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => { soundEngine.playSoftClick(); setMood(m); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${mood === m ? 'bg-[#433139] text-[#FAF3EE] border-[#433139]' : 'bg-white text-[#5B4750] border-[#d0c3c7]/60 hover:border-[#BDA494]'}`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Prompt */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-serif text-lg italic text-[#433139]">"Apa yang ingin kamu lepaskan hari ini?"</p>
          <button onClick={() => mock('MOCK — prompt baru (bank prompt statis)')} className="p-2 text-[#5B4750] hover:text-[#433139] transition-colors" aria-label="Acak prompt">
            <Shuffle className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 border-t border-[#d0c3c7]/40 pt-3 mb-2">
          {[Bold, Italic, List].map((Icon, i) => (
            <button key={i} onClick={() => mock('MOCK — format teks (toolbar statis)')} className="p-2 rounded-lg text-[#5B4750] hover:bg-[#F2E9E5] hover:text-[#433139] transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Editor body */}
        <textarea
          value={body}
          onChange={(e) => { setBody(e.target.value); setStatus('typing'); }}
          onBlur={() => setStatus('saved')}
          placeholder="Mulai menulis... tak ada yang menilai dari sini."
          className="flex-1 min-h-[320px] bg-transparent text-base leading-relaxed text-[#291714] placeholder-[#4d4448]/40 focus:outline-none resize-none"
        />

        <p className="flex items-center gap-1 text-[10px] text-[#4d4448]/50 mb-4"><Lock className="w-3 h-3" /> Privat & tersimpan lokal (mock).</p>

        {/* Bottom bar */}
        <div className="sticky bottom-0 bg-[#FAF3EE]/95 backdrop-blur border-t border-[#d0c3c7]/30 -mx-4 px-4 py-4 flex items-center justify-between gap-3">
          <button onClick={() => mock('MOCK — draf tersimpan (CONTROLLED_TBD: backend)')} className="text-sm font-semibold text-[#5B4750] hover:text-[#433139] transition-colors">Simpan sebagai Draf</button>
          <button onClick={back} className="px-6 py-3 bg-[#433139] text-[#FAF3EE] text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
            Simpan &amp; Tutup
          </button>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold animate-fadeIn">{toast}</div>
      )}
    </div>
  );
};
