import React, { useState } from 'react';
import { IMAGES, PYRAMID_LAYERS, PRODUCTS } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import { PyramidLayer, Product } from '../types';
import { Sparkles, Layers, Flame, Sun, Moon, MessageCircle, Heart, Zap, Droplets, TreePine } from 'lucide-react';

// Fix-6-P1 2026-09-03 — html/004 "Seven Layers" (verbatim 7 baris; material icons → lucide padanan)
const SEVEN_LAYERS = [
  { n: 7, name: 'Vision', desc: 'Your North Star and highest aspirations.', ritual: 'Morning Meditation', Icon: Sun },
  { n: 6, name: 'Intuition', desc: 'Inner knowing and subconscious alignment.', ritual: 'Evening Reflection', Icon: Moon },
  { n: 5, name: 'Expression', desc: 'Authentic communication and boundary setting.', ritual: 'Mid-day Reset', Icon: MessageCircle },
  { n: 4, name: 'Connection', desc: 'Relational harmony and empathy.', ritual: 'Shared Practice', Icon: Heart },
  { n: 3, name: 'Action', desc: 'Drive, energy, and manifesting intent into reality.', ritual: 'Pre-task Focus', Icon: Zap },
  { n: 2, name: 'Emotion', desc: 'Processing feelings and seeking internal balance.', ritual: 'Deep Restoration', Icon: Droplets },
  { n: 1, name: 'Foundation', desc: 'The Root of You. Safety, stability, and physical grounding.', ritual: 'Grounding Walk', Icon: TreePine },
];
// Diagram 7-level html/004 URL /aida/ DEAD — padanan live literal dari galeri package (html/005-area).
const SEVEN_DIAGRAM = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEDKrSGUJ8CvwZ1KWauUQ0u-VK4nWXjTEm6QjCUi7YCGvJyY-HELRba84yXW6ZtQKO93yfzqiXeM81DwxHIkQw8VlfN6IDECXoljEtVF2gJhGNpebIvpiJOjcY2nY4HhQRSk2ZDDSkcjgijxZ7uGKbLi632Q8TFMkl1An26GEspj1pxm3KQUIJcPFR0HGs5Tv1N3_DidVPFMr27QoH8R0CfAkZxElG8omrlb_FX2XNuJS5pwofJMf7B0gDiYCZFFlADz08DXPEqY8';

interface JourneyScreenProps {
  onBeginAssessment: () => void;
  onExploreRituals: () => void;
  onAddToCart: (product: Product) => void;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  onBeginAssessment,
  onExploreRituals,
  onAddToCart,
}) => {
  const [selectedLayer, setSelectedLayer] = useState<PyramidLayer>(PYRAMID_LAYERS[0]); // Default Identity
  const [activeNoteTab, setActiveNoteTab] = useState<'fragrance' | 'ritual' | 'philosophy'>('fragrance');

  const handleSelectLayer = (layer: PyramidLayer) => {
    soundEngine.playSoftClick();
    setSelectedLayer(layer);
  };

  // Find product matching selected layer
  const matchedProduct = PRODUCTS.find(p => p.alignmentLayer === selectedLayer.name) || PRODUCTS[0];

  return (
    <div className="space-y-8">

      {/* Canvas 003 The Journey of You (1:1 html/003 hero: photo bg + shadow overlay, text di atas) */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src={IMAGES.journeyHero}
            alt="A beautifully styled, minimalist still life of a lit candle, an open linen journal, dried botanicals in a ceramic vase, and a small essential oil bottle on a natural wood table. The light is soft, warm, and natural, creating a serene and introspective mood."
          />
          {/* Overlay shadow: flat tint + gradient bawah (from-background/80 via-background/20 di html/003) */}
          <div className="absolute inset-0 bg-[#291714]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF3EE]/80 via-[#FAF3EE]/20 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 md:px-10 max-w-3xl mx-auto flex flex-col items-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[48px] leading-[1.15] text-[#433139] tracking-tight [text-shadow:0_1px_2px_rgba(250,243,238,0.6)]">
            The Journey of You
          </h1>
          <p className="text-base md:text-lg text-[#4d4448] max-w-xl mx-auto leading-relaxed font-sans [text-shadow:0_1px_2px_rgba(250,243,238,0.6)]">
            A path of self-alignment through the seven layers of your beautiful soul.
          </p>
        </div>
      </section>

      {/* Canvas 004 The Self-Alignment Pyramid (spacing dirapatkan: gap-8) */}
      <section className="bg-[#F7F1EE] py-16 md:py-24 border-y border-[#BDA494]/25">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 text-center space-y-8">

          <div className="space-y-3">
            <span className="text-xs font-bold text-[#4d4448] tracking-[0.12em] uppercase block">
              THE JOURNEY OF YOU
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[44px] text-[#433139] max-w-2xl mx-auto leading-tight">
              The Self-Alignment Pyramid
            </h2>
          </div>

          {/* Pyramid Visualization Card */}
          <div className="relative max-w-4xl mx-auto bg-[#FAF3EE] rounded-2xl overflow-hidden border border-[#BDA494]/30 p-6 md:p-10 shadow-xs">
            <div className="max-h-[380px] w-full flex items-center justify-center">
              <img
                className="object-contain w-full h-full max-h-[360px]"
                src={IMAGES.pyramidDiagram}
                alt="A minimalist five-layer pyramid illustration labeled Behavior, Energy, Mindset, Emotion, Identity from bottom to top."
              />
            </div>

            <div className="mt-6 pt-4 border-t border-[#BDA494]/20 flex items-center justify-between text-xs text-[#7f7478]">
              <span>Tier 1 (Base): Somatic Behavior</span>
              <span>•</span>
              <span>Tier 5 (Crown): Sovereign Identity</span>
            </div>
          </div>

          {/* Interactive Pyramid Explorer Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="text-left mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78555d] mb-1">
                <Layers className="w-4 h-4" />
                <span>Explore The 5 Levels of Resonance</span>
              </div>
              <p className="text-xs text-[#7f7478]">
                Click each tier below to discover the olfactory notes, emotional psychology, and sanctuary rituals tailored to each state.
              </p>
            </div>

            {/* Tier Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
              {PYRAMID_LAYERS.map((layer) => {
                const isSelected = selectedLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => handleSelectLayer(layer)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border text-center flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-[#5B4750] text-[#FAF3EE] border-[#5B4750] shadow-sm scale-[1.02]'
                        : 'bg-[#FAF3EE] text-[#433139] border-[#BDA494]/40 hover:bg-[#F2E9E5]'
                    }`}
                  >
                    <span className="text-[10px] opacity-75 font-normal">Level {layer.level}</span>
                    <span className="font-serif text-sm">{layer.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Tier Deep Dive Card */}
            <div className="bg-[#FAF3EE] border border-[#BDA494]/35 rounded-2xl p-6 md:p-8 text-left shadow-xs transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#BDA494]/20 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
                      Level {selectedLayer.level} Layer
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd1da] text-[#7b575f]">
                      {selectedLayer.title}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#433139] mt-1 font-semibold">
                    {selectedLayer.name}: {selectedLayer.tagline}
                  </h3>
                </div>

                {/* Sub tabs */}
                <div className="flex items-center gap-1 bg-[#F2E9E5] p-1 rounded-lg border border-[#BDA494]/20 text-xs">
                  <button
                    onClick={() => setActiveNoteTab('fragrance')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      activeNoteTab === 'fragrance' ? 'bg-[#FAF3EE] text-[#433139] shadow-xs' : 'text-[#7f7478]'
                    }`}
                  >
                    Olfactory Notes
                  </button>
                  <button
                    onClick={() => setActiveNoteTab('ritual')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      activeNoteTab === 'ritual' ? 'bg-[#FAF3EE] text-[#433139] shadow-xs' : 'text-[#7f7478]'
                    }`}
                  >
                    Ritual Focus
                  </button>
                  <button
                    onClick={() => setActiveNoteTab('philosophy')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      activeNoteTab === 'philosophy' ? 'bg-[#FAF3EE] text-[#433139] shadow-xs' : 'text-[#7f7478]'
                    }`}
                  >
                    Philosophy
                  </button>
                </div>
              </div>

              {/* Dynamic Content based on sub tab */}
              <div className="py-5">
                {activeNoteTab === 'fragrance' && (
                  <div className="space-y-4">
                    <p className="text-sm text-[#4d4448] leading-relaxed">
                      {selectedLayer.description}
                    </p>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#78555d] block mb-2">
                        Resonant Olfactory Accords:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedLayer.fragranceNotes.map((note, i) => (
                          <span
                            key={i}
                            className="px-3.5 py-1.5 rounded-full bg-[#F2E9E5] text-[#433139] text-xs font-semibold border border-[#BDA494]/30 flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3 h-3 text-[#5B4750]" />
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeNoteTab === 'ritual' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#F2E9E5]/70 border border-[#BDA494]/30">
                      <div className="flex items-center gap-2 text-[#5B4750] font-semibold text-sm mb-1">
                        <Flame className="w-4 h-4 text-[#B8860B]" />
                        <span>Recommended Practice</span>
                      </div>
                      <p className="text-sm text-[#433139] font-medium">
                        {selectedLayer.ritualFocus}
                      </p>
                    </div>
                    <p className="text-xs text-[#7f7478] leading-relaxed">
                      Engaging with this olfactory layer before bedtime or morning quiet reflection primes your neural pathways for deeper equilibrium.
                    </p>
                  </div>
                )}

                {activeNoteTab === 'philosophy' && (
                  <div className="space-y-3 text-sm text-[#4d4448] leading-relaxed">
                    <p>
                      In the FAISHA methodology, fragrance is not an ornament - it is a conscious somatic bridge. The {selectedLayer.name} tier anchors memory and sensory perception to help you realign whenever external distractions pull you off center.
                    </p>
                  </div>
                )}
              </div>

              {/* Matched product footer */}
              <div className="pt-4 border-t border-[#BDA494]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#78555d]">
                    Recommended Vessel
                  </span>
                  <p className="font-serif font-semibold text-base text-[#433139]">
                    {selectedLayer.recommendedScent}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      soundEngine.playSoftClick();
                      onAddToCart(matchedProduct);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#5B4750] text-[#FAF3EE] text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    Add {matchedProduct.name.split(' ')[0]} (${matchedProduct.price})
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playSoftClick();
                      onBeginAssessment();
                    }}
                    className="px-4 py-2.5 rounded-full hairline-border text-xs font-semibold text-[#433139] hover:bg-[#F2E9E5] transition-colors"
                  >
                    Test My Fit
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* The Seven Layers — 1:1 html/004 (diagram + tabel 7 baris) */}
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            <div className="text-center space-y-3">
              <h3 className="font-serif text-2xl md:text-3xl text-[#433139] font-semibold">The Seven Layers</h3>
            </div>
            <div className="max-h-[320px] flex items-center justify-center">
              <img
                className="object-contain w-full h-full max-h-[300px]"
                src={SEVEN_DIAGRAM}
                alt="Minimalist, abstract 7-level pyramid graphic against a warm ivory background."
              />
            </div>
            <div className="bg-[#FAF3EE] border border-[#BDA494]/30 rounded-2xl overflow-hidden">
              {SEVEN_LAYERS.map(({ n, name, desc, ritual, Icon }, i) => (
                <div key={n} className={`grid grid-cols-12 items-center gap-3 px-5 md:px-7 py-4 ${i < SEVEN_LAYERS.length - 1 ? 'border-b border-[#BDA494]/20' : ''}`}>
                  <div className="col-span-1 flex items-center justify-center text-[#78555d] font-serif font-semibold">{n}</div>
                  <div className="col-span-11 md:col-span-5">
                    <p className="text-sm font-semibold text-[#433139] flex items-center gap-2"><Icon className="w-4 h-4 text-[#5B4750]" /> {name}</p>
                    <p className="text-xs text-[#4d4448] mt-0.5">{desc}</p>
                  </div>
                  <div className="hidden md:flex col-span-6 justify-end">
                    <span className="px-3 py-1 rounded-full bg-[#F2E9E5] border border-[#BDA494]/30 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5B4750]">{ritual}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your layers are unique — 1:1 html/004 CTA card */}
          <div className="max-w-4xl mx-auto bg-[#FAF3EE] border border-[#BDA494]/30 rounded-2xl p-8 md:p-10 space-y-5">
            <h3 className="font-serif text-2xl md:text-[28px] text-[#433139] font-semibold">Your layers are unique.</h3>
            <p className="text-sm md:text-base text-[#4d4448] leading-relaxed max-w-xl mx-auto">
              Discover which layers of your pyramid require attention and receive a personalized fragrance ritual to guide your restoration.
            </p>
            <button
              onClick={() => {
                soundEngine.playSoftClick();
                onBeginAssessment();
              }}
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#5B4750] text-[#FAF3EE] font-sans font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              Take the Assessment
            </button>
          </div>

          {/* Primary CTA */}
          <div>
            <button
              onClick={() => {
                soundEngine.playSoftClick();
                onBeginAssessment();
              }}
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#5B4750] text-[#FAF3EE] font-sans font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              Explore The Journey
            </button>
          </div>

        </div>
      </section>

      {/* Scent Philosophy & Olfactory Triad */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="p-6 rounded-2xl bg-[#FAF3EE] border border-[#BDA494]/30 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F2E9E5] text-[#5B4750] flex items-center justify-center font-serif text-lg font-bold mx-auto md:mx-0">
              I
            </div>
            <h3 className="font-serif text-xl text-[#433139] font-semibold">
              Pure Botanical Distillation
            </h3>
            <p className="text-xs text-[#4d4448] leading-relaxed">
              Every drop is distilled from sustainably harvested resins, organic botanicals, and cold-pressed floral absolutes with zero synthetic fillers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF3EE] border border-[#BDA494]/30 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F2E9E5] text-[#5B4750] flex items-center justify-center font-serif text-lg font-bold mx-auto md:mx-0">
              II
            </div>
            <h3 className="font-serif text-xl text-[#433139] font-semibold">
              Tactile Modern Glassware
            </h3>
            <p className="text-xs text-[#4d4448] leading-relaxed">
              Heavyweight amber vessels and tactile stationery that enrich your physical sanctuary while preserving delicate essential oil terpenes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF3EE] border border-[#BDA494]/30 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F2E9E5] text-[#5B4750] flex items-center justify-center font-serif text-lg font-bold mx-auto md:mx-0">
              III
            </div>
            <h3 className="font-serif text-xl text-[#433139] font-semibold">
              Somatic Neural Anchoring
            </h3>
            <p className="text-xs text-[#4d4448] leading-relaxed">
              Designed according to olfactory neuroscience to trigger parasympathetic relaxation and quiet mental chatter within 90 seconds.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
