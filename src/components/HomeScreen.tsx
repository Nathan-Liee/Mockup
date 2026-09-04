import React, { useState } from 'react';
import { IMAGES, PRODUCTS, SARAH_DEFAULT_RESULT } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import { Sparkles, Play, CheckCircle2, Bell, Heart, ArrowRight, Flame, Compass } from 'lucide-react';
import { Product, Language } from '../types';

interface HomeScreenProps {
  isReturning: boolean;
  lang: Language;
  onBeginAssessment: () => void;
  onViewResult: () => void;
  onBeginRitual: () => void;
  onExploreJourney: () => void;
  onAddToCart: (product: Product) => void;
  onNavigateToJournal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  isReturning,
  lang,
  onBeginAssessment,
  onViewResult,
  onBeginRitual,
  onExploreJourney,
  onAddToCart,
  onNavigateToJournal,
}) => {
  const [singingBowlPlaying, setSingingBowlPlaying] = useState(false);
  const [streakCompleted, setStreakCompleted] = useState(true);
  const [likedFragrance, setLikedFragrance] = useState(false);
  const [candleLit, setCandleLit] = useState(false);

  const handleRingSingingBowl = () => {
    setSingingBowlPlaying(true);
    soundEngine.playSingingBowl(432);
    setTimeout(() => setSingingBowlPlaying(false), 3800);
  };

  const handleLightCandle = () => {
    soundEngine.playSoftClick();
    setCandleLit(!candleLit);
    if (!candleLit) {
      soundEngine.playSingingBowl(528);
    }
  };

  return (
    <div className={isReturning ? 'space-y-16 md:space-y-24' : 'space-y-10'}>
      {/* Canvas 001 Beranda Utama (guest) */}
      {!isReturning && (
        <>
          {/* Hero: Discover Your Beautiful Soul (1:1 html/001) — spacing dirapatkan per team_catatan 001 */}
          <section className="max-w-[1200px] mx-auto px-4 md:px-10 pt-2 md:pt-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8">
              <div className="w-full md:w-[55%] pr-0 md:pr-12 space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-[48px] leading-[1.15] text-[#433139] tracking-tight">
                  {lang === 'id' ? 'Temukan Jiwa Indahmu' : 'Discover Your Beautiful Soul'}
                </h1>
                <p className="text-base md:text-lg text-[#4d4448] max-w-lg leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Perjalanan penyelarasan diri melalui wewangian, ritual, dan penemuan batin. Temukan aroma yang beresonansi dengan esensimu.'
                    : 'A fragrance journey of self-alignment, ritual, and inner discovery. Find the scent that resonates with your true essence.'}
                </p>
                {/* CTA pair: both solid #5B4750 per review-103 note 001 */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundEngine.playSoftClick();
                      onBeginAssessment();
                    }}
                    className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#5B4750] text-[#FAF3EE] font-sans font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
                  >
                    {lang === 'id' ? 'Mulai Perjalananmu' : 'Begin Your Journey'}
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playSoftClick();
                      onBeginRitual();
                    }}
                    className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#5B4750] text-[#FAF3EE] font-sans font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
                  >
                    {lang === 'id' ? 'Jelajahi Ritual' : 'Explore Rituals'}
                  </button>
                </div>
                <div className="pt-4 border-t border-[#BDA494]/20 flex items-center gap-6 text-xs text-[#7f7478]">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#5B4750]" />
                    <span>{lang === 'id' ? 'Model Penyelarasan 7 Lapisan' : '7-Layer Alignment Model'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#5B4750]" />
                    <span>{lang === 'id' ? 'Ekstraksi Botani Artisan' : 'Artisan Botanical Extracts'}</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[45%] h-[420px] md:h-[580px] relative rounded-t-full rounded-br-full overflow-hidden border border-[#BDA494]/30 shadow-md group">
                <img
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  src={IMAGES.heroCandlesArch}
                  alt="Editorial close-up of Soule Plum amber glass candle with dried botanicals resting on warm marble table."
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#291714]/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-[#FAF3EE]/95 backdrop-blur-md rounded-xl p-4 border border-[#BDA494]/30 max-w-[260px]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#78555d] block">
                    Sanctuary Signature
                  </span>
                  <p className="font-serif font-semibold text-[#433139] text-sm mt-0.5">SOULE PLUM No. 9</p>
                  <p className="text-[11px] text-[#7f7478]">Amber, Smoked Oud & Mirabelle Plum</p>
                </div>
              </div>
            </div>
          </section>

          {/* Align Your Soul Through Fragrance teaser — FIX_PLAN #20: bawah terlalu lebar */}
          <section className="bg-[#F7F1EE] py-12 md:py-16 border-y border-[#BDA494]/25">
            <div className="max-w-[1200px] mx-auto px-4 md:px-10 text-center space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#4d4448] tracking-[0.12em] uppercase block">
                  {lang === 'id' ? 'PERJALANAN JIWA' : 'THE JOURNEY OF YOU'}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[44px] text-[#433139] max-w-2xl mx-auto leading-tight">
                  {lang === 'id' ? 'Selaraskan Jiwa Melalui Wewangian' : 'Align Your Soul Through Fragrance'}
                </h2>
              </div>
              <div className="max-h-[380px] w-full max-w-4xl mx-auto flex items-center justify-center bg-[#FAF3EE] rounded-2xl overflow-hidden border border-[#BDA494]/30 p-6 md:p-8">
                <img
                  className="object-contain w-full h-full max-h-[340px]"
                  src={IMAGES.pyramidDiagram}
                  alt="A minimalist five-layer pyramid illustration labeled Behavior, Energy, Mindset, Emotion, Identity from bottom to top."
                />
              </div>
              <button
                onClick={() => {
                  soundEngine.playSoftClick();
                  onExploreJourney();
                }}
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#5B4750] text-[#FAF3EE] font-sans font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
              >
                {lang === 'id' ? 'Jelajahi Perjalanan' : 'Explore The Journey'}
              </button>
            </div>
          </section>
        </>
      )}

      {/* Canvas 002 Beranda Pengguna Kembali (returning) */}
      {isReturning && (
        <>
      {/* Exact Hero Section from Screen 1 */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 pt-6 md:pt-10 flex flex-col md:flex-row items-center gap-10 md:gap-14">
        
        {/* Left Editorial Copy & CTA Buttons */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E9E5] border border-[#BDA494]/30 text-xs font-semibold uppercase tracking-wider text-[#5B4750]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Morning Alignment Session</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-[48px] leading-tight text-[#433139] tracking-tight">
            Welcome Back, Beautiful Soul
          </h1>

          <p className="text-base md:text-lg text-[#4d4448] max-w-lg leading-relaxed font-sans">
            Continue your path of self-discovery. Your Morning Ritual awaits in a quiet space crafted just for you.
          </p>

          {/* Action Buttons styled precisely per design system */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => {
                soundEngine.playSoftClick();
                onViewResult();
              }}
              className="bg-[#5B4750] text-[#FAF3EE] font-semibold text-sm h-12 px-7 rounded-md flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
            >
              View My Result
            </button>

            <button
              onClick={() => {
                soundEngine.playSoftClick();
                onBeginRitual();
              }}
              className="hairline-border text-[#433139] bg-transparent hover:bg-[#F7F1EE] font-semibold text-sm h-12 px-7 rounded-md flex items-center justify-center active:scale-[0.98] transition-all"
            >
              Begin Ritual
            </button>
          </div>

          {/* Quick status indicator */}
          <div className="pt-3 flex items-center gap-6 text-xs text-[#4d4448]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3D6852]"></span>
              <span>Layer 5: Identity Activated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>7-Day Ritual Streak</span>
            </div>
          </div>
        </div>

        {/* Right Lifestyle Photograph */}
        <div className="flex-1 w-full h-[360px] md:h-[480px] relative rounded-xl overflow-hidden shadow-sm border border-[#BDA494]/20 group">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={IMAGES.heroJournalDesk}
            alt="A serene morning lifestyle scene with an open journal on light oak table, laptop showing ritual dashboard, and steaming ceramic tea cup."
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#291714]/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle floating overlay card */}
          <div className="absolute bottom-4 left-4 right-4 bg-[#FAF3EE]/95 backdrop-blur-sm border border-[#BDA494]/30 rounded-lg p-3.5 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-[#433139]">Today's Essence: Amber & Smoked Oud</p>
              <p className="text-[#7f7478]">Soule Plum No. 9 is paired with your morning tea</p>
            </div>
            <button 
              onClick={handleLightCandle}
              className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-all ${
                candleLit 
                  ? 'bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/40'
                  : 'bg-[#5B4750] text-[#FAF3EE]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{candleLit ? 'Flame Kindled' : 'Kindle Flame'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Personal Sanctuary Dashboard (returning varian 002) */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-6 md:p-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#BDA494]/25 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
                Personal Sanctuary
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#433139] mt-1">
                Your Soul Alignment Blueprint
              </h2>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRingSingingBowl}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border border-[#BDA494]/50 transition-all ${
                  singingBowlPlaying
                    ? 'bg-[#5B4750] text-[#FAF3EE] scale-95 shadow-md'
                    : 'bg-[#FAF3EE] text-[#433139] hover:bg-[#F2E9E5]'
                }`}
                title="Play calming singing bowl tone (432Hz)"
              >
                <Bell className={`w-4 h-4 ${singingBowlPlaying ? 'animate-bounce' : ''}`} />
                <span>{singingBowlPlaying ? 'Resonating...' : 'Sound Singing Bowl'}</span>
              </button>
              
              <button
                onClick={onExploreJourney}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5B4750] hover:text-[#433139] px-3 py-2"
              >
                <span>The 5 Layers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3-Column Sanctuary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            
            {/* Card 1: Scent Archetype */}
            <div className="bg-[#FAF3EE] rounded-xl p-5 border border-[#BDA494]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78555d]">
                  Active Archetype
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd1da] text-[#7b575f]">
                  Tier 5
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#433139]">
                {SARAH_DEFAULT_RESULT.title}
              </h3>
              <p className="text-xs text-[#4d4448] leading-relaxed">
                {SARAH_DEFAULT_RESULT.essenceDescription}
              </p>
              <div className="pt-2">
                <button
                  onClick={onViewResult}
                  className="text-xs font-bold text-[#5B4750] hover:underline flex items-center gap-1"
                >
                  <span>View Resonance Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 2: Morning Ritual Sequence */}
            <div className="bg-[#FAF3EE] rounded-xl p-5 border border-[#BDA494]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78555d]">
                  Daily Sequence
                </span>
                <span className="text-xs font-bold text-[#3D6852] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>3 / 3 Ready</span>
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#433139]">
                The Morning Grounding (3 min)
              </h3>
              <ul className="space-y-2 text-xs text-[#4d4448]">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#F2E9E5] text-[#5B4750] flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Kindle Soule Plum flame</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#F2E9E5] text-[#5B4750] flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>4 cycles of deep sovereign breath</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#F2E9E5] text-[#5B4750] flex items-center justify-center text-[10px] font-bold">3</span>
                  <span>Journal one grounding truth</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={onBeginRitual}
                  className="w-full py-2 rounded-md bg-[#5B4750] text-[#FAF3EE] text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start Morning Session</span>
                </button>
              </div>
            </div>

            {/* Card 3: Paired Talisman Product */}
            <div className="bg-[#FAF3EE] rounded-xl p-5 border border-[#BDA494]/20 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#78555d]">
                    Your Aligned Talisman
                  </span>
                  <button 
                    onClick={() => setLikedFragrance(!likedFragrance)}
                    className="text-[#78555d] hover:text-[#ba1a1a] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedFragrance ? 'fill-[#9E3B3B] text-[#9E3B3B]' : ''}`} />
                  </button>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#433139] mt-1">
                  {PRODUCTS[0].name}
                </h3>
                <p className="text-xs text-[#7f7478]">
                  {PRODUCTS[0].subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {PRODUCTS[0].notes.top.map((note, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2E9E5] text-[#433139]">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#BDA494]/20 flex items-center justify-between">
                {/* FIX_PLAN #12: samakan currency Rp dengan screen commerce lain; label MOCK = DRAFT */}
                <span className="text-sm font-bold text-[#433139]">Rp {PRODUCTS[0].price}.000 <span className="text-[10px] font-normal text-[#7f7478]">(MOCK)</span></span>
                <button
                  onClick={() => {
                    soundEngine.playSoftClick();
                    onAddToCart(PRODUCTS[0]);
                  }}
                  className="text-xs font-semibold text-[#5B4750] hover:text-[#433139] bg-[#F2E9E5] hover:bg-[#ebdcd6] px-3 py-1.5 rounded-md transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Journaling Prompt Banner */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="bg-[#FAF3EE] border border-[#BDA494]/30 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
              Today's Sanctuary Reflection
            </span>
            <p className="font-serif text-lg md:text-xl text-[#433139] italic">
              "What truth feels most comforting to your spirit this morning?"
            </p>
            <p className="text-xs text-[#7f7478]">
              Beautiful Soul, your journal has 2 logged reflections this week.
            </p>
          </div>
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onNavigateToJournal();
            }}
            className="whitespace-nowrap px-6 py-3 rounded-full hairline-border text-xs font-bold uppercase tracking-wider text-[#433139] hover:bg-[#F7F1EE] transition-colors"
          >
            Open Private Journal
          </button>
        </div>
      </section>
        </>
      )}
    </div>
  );
};
