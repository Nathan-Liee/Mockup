import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Play, Pause, RotateCcw, Sparkles, Flame, CheckCircle, Bell, Wind, Moon, Sun, Home, Target } from 'lucide-react';
import { RITUAL_SUITES } from '../data/mockData';

interface RitualsScreenProps {
  onCompleteRitual: (ritualName: string) => void;
  onOpenJournal: () => void;
  /** B2 2026-09-03: halaman detail ritual penuh — 'ritual-morning' (022) / 'ritual-focus' (023). */
  onNavigate?: (tab: NavTab) => void;
}

export const RitualsScreen: React.FC<RitualsScreenProps> = ({
  onCompleteRitual,
  onOpenJournal,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'morning' | 'focus' | 'home' | 'sleep' | 'soul' | 'breathwork'>('morning');
  
  // Breathwork state
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Step tracker per ritual
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});
  const [completedRituals, setCompletedRituals] = useState<string[]>([]);

  // Breathwork ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            // Next phase
            setBreathPhase((current) => {
              if (current === 'Inhale') {
                soundEngine.playSingingBowl(528);
                return 'Hold';
              }
              if (current === 'Hold') {
                return 'Exhale';
              }
              if (current === 'Exhale') {
                soundEngine.playSingingBowl(432);
                return 'Rest';
              }
              // Completed a cycle
              setCompletedCycles((c) => c + 1);
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathActive]);

  const handleStartBreath = () => {
    soundEngine.playSingingBowl(432);
    setBreathActive(!breathActive);
  };

  const handleResetBreath = () => {
    setBreathActive(false);
    setBreathPhase('Inhale');
    setBreathTimer(4);
    setCompletedCycles(0);
  };

  const toggleStep = (ritualId: string, stepId: number) => {
    soundEngine.playSoftClick();
    setCompletedSteps(prev => {
      const current = prev[ritualId] || [];
      if (current.includes(stepId)) {
        return { ...prev, [ritualId]: current.filter(id => id !== stepId) };
      } else {
        return { ...prev, [ritualId]: [...current, stepId] };
      }
    });
  };

  const handleFinishRitual = (ritualId: string, ritualTitle: string) => {
    soundEngine.playSingingBowl(528);
    if (!completedRituals.includes(ritualId)) {
      setCompletedRituals(prev => [...prev, ritualId]);
    }
    onCompleteRitual(ritualTitle);
  };

  const currentSuite = RITUAL_SUITES.find(s => s.id === activeTab);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#78555d] block">
          THE SANCTUARY PRACTICE
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#433139] leading-tight">
          Daily Somatic Rituals
        </h1>
        <p className="text-sm md:text-base text-[#4d4448]">
          Slow down time. Enter a multisensory space where sacred botanical scent, mindful breath, and restorative reflection intersect.
        </p>
      </div>

      {/* Ritual Selector Tabs */}
      <div className="flex justify-center flex-wrap gap-2">
        <div className="bg-[#F7F1EE] p-1.5 rounded-full border border-[#BDA494]/30 inline-flex flex-wrap justify-center gap-1 shadow-xs">
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setActiveTab('morning');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'morning'
                ? 'bg-[#5B4750] text-[#FAF3EE] shadow-sm'
                : 'text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Morning</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setActiveTab('focus');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'focus'
                ? 'bg-[#5B4750] text-[#FAF3EE] shadow-sm'
                : 'text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Focus</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setActiveTab('home');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-[#5B4750] text-[#FAF3EE] shadow-sm'
                : 'text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Sanctuary Home</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setActiveTab('sleep');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'sleep'
                ? 'bg-[#5B4750] text-[#FAF3EE] shadow-sm'
                : 'text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Sleep</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setActiveTab('soul');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'soul'
                ? 'bg-[#5B4750] text-[#FAF3EE] shadow-sm'
                : 'text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Soul Alignment</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              setActiveTab('breathwork');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'breathwork'
                ? 'bg-[#5B4750] text-[#FAF3EE] shadow-sm'
                : 'text-[#4d4448] hover:text-[#433139]'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Guided Breath</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-[#F7F1EE] border border-[#BDA494]/35 rounded-3xl p-6 md:p-12 shadow-xs">
        
        {/* VIEW: RITUAL SUITE DETAIL */}
        {currentSuite && activeTab !== 'breathwork' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Step Sequence */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
                    {currentSuite.duration} • Tier: {currentSuite.layer}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#433139] mt-1 font-semibold">
                  {currentSuite.title}
                </h2>
                <p className="text-xs text-[#78555d] italic">
                  {currentSuite.titleId}
                </p>
                <p className="text-xs md:text-sm text-[#4d4448] mt-2">
                  Paired Botanical Talisman: <strong>{currentSuite.pairedFragrance}</strong>.
                </p>
              </div>

              {/* Interactive Step Items */}
              <div className="space-y-4">
                {currentSuite.steps.map((step) => {
                  const isDone = (completedSteps[currentSuite.id] || []).includes(step.id);
                  return (
                    <div 
                      key={step.id}
                      onClick={() => toggleStep(currentSuite.id, step.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isDone 
                          ? 'bg-[#3D6852]/10 border-[#3D6852]/40 text-[#291714]' 
                          : 'bg-[#FAF3EE] border-[#BDA494]/30 hover:border-[#5B4750]'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isDone ? 'bg-[#3D6852] text-[#FAF3EE]' : 'bg-[#F2E9E5] text-[#5B4750]'
                      }`}>
                        {isDone ? <CheckCircle className="w-4 h-4" /> : step.id}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#433139]">{step.title}</h4>
                          <span className="text-[10px] font-bold text-[#78555d] uppercase tracking-wider">{step.time}</span>
                        </div>
                        <p className="text-xs text-[#7f7478] mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleFinishRitual(currentSuite.id, currentSuite.title)}
                  disabled={completedRituals.includes(currentSuite.id)}
                  className={`px-8 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
                    completedRituals.includes(currentSuite.id)
                      ? 'bg-[#3D6852] text-[#FAF3EE]'
                      : 'bg-[#5B4750] text-[#FAF3EE] hover:opacity-90 active:scale-95'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {completedRituals.includes(currentSuite.id) 
                      ? 'Ritual Sealed (Logged)' 
                      : `Complete & Seal ${currentSuite.title}`}
                  </span>
                </button>

                <button
                  onClick={onOpenJournal}
                  className="px-6 py-3.5 rounded-full hairline-border text-xs font-bold uppercase tracking-wider text-[#433139] hover:bg-[#FAF3EE] transition-colors"
                >
                  Open Sanctuary Journal
                </button>

                {/* B2: pintu halaman detail ritual penuh (022/023) */}
                {(activeTab === 'morning' || activeTab === 'focus') && (
                  <button
                    onClick={() => { soundEngine.playSoftClick(); onNavigate?.(activeTab === 'morning' ? 'ritual-morning' : 'ritual-focus'); }}
                    className="px-6 py-3.5 rounded-full hairline-border text-xs font-bold uppercase tracking-wider text-[#433139] hover:bg-[#FAF3EE] transition-colors"
                  >
                    {activeTab === 'morning' ? 'Buka Halaman Ritual (022)' : 'Buka Halaman Ritual (023)'}
                  </button>
                )}
              </div>

            </div>

            {/* Right: Ambient Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#FAF3EE] rounded-2xl p-8 border border-[#BDA494]/30 text-center space-y-6">
              <div className="w-28 h-28 rounded-full bg-[#F2E9E5] border border-[#BDA494]/40 flex items-center justify-center relative shadow-sm">
                <Flame className="w-12 h-12 text-[#B8860B] animate-pulse" />
                <span className="absolute inset-0 rounded-full border-2 border-[#B8860B]/20 animate-ping opacity-30" />
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#433139] font-semibold">
                  {currentSuite.pairedFragrance}
                </h3>
                <p className="text-xs text-[#7f7478] mt-1 max-w-xs mx-auto">
                  Aromatic resonance anchoring the nervous system into grounded presence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                <button
                  onClick={() => soundEngine.playSingingBowl(528)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#5B4750] bg-[#F2E9E5] hover:bg-[#ebdcd6] px-4 py-2 rounded-full border border-[#BDA494]/30 transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>528Hz Harmonic Chime</span>
                </button>
                <button
                  onClick={() => soundEngine.playSingingBowl(432)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#5B4750] bg-[#F2E9E5] hover:bg-[#ebdcd6] px-4 py-2 rounded-full border border-[#BDA494]/30 transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>432Hz Grounding Bell</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: GUIDED BREATH BOX */}
        {activeTab === 'breathwork' && (
          <div className="flex flex-col items-center text-center space-y-8 py-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#78555d] block">
                Somatic Nervous System Reset
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#433139] mt-1 font-semibold">
                4-4-4-4 Box Breathing
              </h2>
              <p className="text-xs text-[#7f7478] mt-2 max-w-md mx-auto">
                Regulate heart rate variability and induce deep inner alignment with guided tempo.
              </p>
            </div>

            {/* Dynamic Pulsing Visual Circle */}
            <div className="relative w-64 h-64 flex items-center justify-center my-6">
              {/* Outer pulsing ring */}
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-1000 border-2 ${
                  breathActive 
                    ? breathPhase === 'Inhale' 
                      ? 'scale-110 border-[#5B4750] bg-[#F2E9E5]/60 shadow-xl' 
                      : breathPhase === 'Exhale'
                      ? 'scale-90 border-[#BDA494] bg-[#FAF3EE]'
                      : 'scale-100 border-[#B8860B] bg-[#F2E9E5]/40'
                    : 'border-[#BDA494]/30 bg-[#FAF3EE]'
                }`}
              />

              {/* Inner content */}
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
                  {breathActive ? breathPhase : 'Ready'}
                </span>
                <div className="font-serif text-5xl font-bold text-[#433139]">
                  {breathActive ? `${breathTimer}s` : 'Start'}
                </div>
                <p className="text-[11px] text-[#7f7478]">
                  Completed: {completedCycles} cycles
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleStartBreath}
                className="px-8 py-3.5 rounded-full bg-[#5B4750] text-[#FAF3EE] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 shadow-sm transition-all"
              >
                {breathActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{breathActive ? 'Pause Session' : 'Begin Breath Cycle'}</span>
              </button>

              <button
                onClick={handleResetBreath}
                className="p-3.5 rounded-full hairline-border text-[#433139] hover:bg-[#FAF3EE] transition-colors"
                title="Reset Breath Cycle"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

