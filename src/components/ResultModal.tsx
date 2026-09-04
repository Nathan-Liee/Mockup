import React from 'react';
import { ScentAssessmentResult, Product, Language } from '../types';
import { soundEngine } from '../utils/audio';
import { useModalA11y } from '../utils/useModalA11y';
import { X, Sparkles, Flame, Check, ShoppingBag, ArrowRight } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ScentAssessmentResult;
  onAddToCart: (product: Product) => void;
  onBeginRitual: () => void;
  lang?: Language;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  result,
  onAddToCart,
  onBeginRitual,
  lang = 'id',
}) => {
  // KRIT-6/7 fix 2026-09-04: Escape → close + body scroll lock.
  useModalA11y(isOpen, onClose);

  if (!isOpen) return null;

  const handleAdd = () => {
    soundEngine.playSingingBowl(528);
    onAddToCart(result.recommendedFragrance);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#291714]/65 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF3EE] border border-[#BDA494]/40 rounded-3xl max-w-2xl w-full p-6 md:p-10 shadow-2xl space-y-7 animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd1da] text-[#7b575f] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Cetak Biru Resonansi Jiwa' : 'Soul Resonance Blueprint'}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7f7478] hover:text-[#433139] hover:bg-[#F2E9E5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Archetype */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#78555d] block">
            {lang === 'id' ? `Lapisan Dominan: ${result.dominantLayer}` : `Dominant Layer: ${result.dominantLayer}`}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#433139] font-bold">
            {result.title}
          </h2>
          <p className="text-sm font-serif italic text-[#78555d]">
            "{result.archetype}"
          </p>
        </div>

        {/* Essence Description Card */}
        <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-6 space-y-2">
          <h3 className="font-serif text-base font-semibold text-[#433139]">
            {lang === 'id' ? 'Profil Esensi Jiwa' : 'Soul Essence Profile'}
          </h3>
          <p className="text-xs md:text-sm text-[#4d4448] leading-relaxed">
            {lang === 'id' && result.essenceDescriptionId ? result.essenceDescriptionId : result.essenceDescription}
          </p>
        </div>

        {/* Recommended Fragrance Match */}
        <div className="bg-[#ffffff] border border-[#BDA494]/35 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-xs">
          <img
            src={result.recommendedFragrance.image}
            alt={result.recommendedFragrance.name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-[#BDA494]/30 shrink-0"
          />
          <div className="space-y-1.5 flex-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#78555d]">
              {lang === 'id' ? 'Wewangian Penyelaras Utama' : 'Your Primary Scent Resonance'}
            </span>
            <h4 className="font-serif text-xl font-bold text-[#433139]">
              {result.recommendedFragrance.name}
            </h4>
            <p className="text-xs text-[#7f7478]">
              {result.recommendedFragrance.subtitle}
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
              {result.recommendedFragrance.notes.top.map((note, idx) => (
                <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F2E9E5] text-[#433139]">
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Crystal Trinity Anchors */}
        {result.crystalTrinity && result.crystalTrinity.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78555d]">
                {lang === 'id' ? 'Trinitas Kristal Pendamping:' : 'Paired Crystal Trinity Anchors:'}
              </span>
              <span className="text-[10px] text-[#78555d] italic">*Mindful ritual anchor</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {result.crystalTrinity.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-[#ffffff] border border-[#BDA494]/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#5B4750] block">{c.symbolism}</span>
                  <p className="font-serif font-bold text-[#433139] leading-tight">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7-Layer Scores Breakdown */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78555d] block">
            {lang === 'id' ? 'Keseimbangan Lapisan Piramida Jiwa:' : 'Pyramid Tier Alignment:'}
          </span>
          <div className="space-y-2">
            {Object.entries(result.layerScores).map(([layerName, scoreVal]) => {
              const score = Number(scoreVal);
              const percent = Math.min(100, Math.max(10, score));
              return (
                <div key={layerName} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#433139]">
                    <span>{layerName}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F2E9E5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5B4750] rounded-full transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ritual Guidance */}
        <div className="p-4 rounded-xl bg-[#F2E9E5]/70 border border-[#BDA494]/30 space-y-1">
          <div className="flex items-center gap-2 text-[#5B4750] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-[#B8860B]" />
            <span>{lang === 'id' ? 'Panduan Ritual Harian' : 'Recommended Daily Ritual'}</span>
          </div>
          <p className="text-xs text-[#4d4448] leading-relaxed">
            {result.ritualGuidance}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 rounded-full bg-[#5B4750] text-[#FAF3EE] font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{lang === 'id' ? 'Tambahkan ke Keranjang' : 'Add Scent to Bag'} (${result.recommendedFragrance.price})</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onClose();
              onBeginRitual();
            }}
            className="py-3.5 px-6 rounded-full hairline-border text-[#433139] hover:bg-[#F2E9E5] font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            {lang === 'id' ? 'Mulai Ritual' : 'Begin Ritual'}
          </button>
        </div>

      </div>
    </div>
  );
};
