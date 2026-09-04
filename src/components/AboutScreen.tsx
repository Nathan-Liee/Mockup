import React, { useState } from 'react';
import { IMAGES } from '../data/mockData';
import { Sparkles, Shield, Leaf, Award, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { soundEngine } from '../utils/audio';

interface AboutScreenProps {
  lang?: Language;
  onOpenAssessment?: () => void;
  onExploreJourney?: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ 
  lang = 'id',
  onOpenAssessment,
  onExploreJourney
}) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'founder' | 'layers' | 'ethics'>('philosophy');

  const handleTab = (t: 'philosophy' | 'founder' | 'layers' | 'ethics') => {
    soundEngine.playSoftClick();
    setActiveTab(t);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-6 md:py-12 space-y-16 animate-fadeIn">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2E9E5] border border-[#BDA494]/30 text-xs font-bold uppercase tracking-widest text-[#5B4750]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'id' ? 'FILOSOFI & KISAH FAISHA' : 'OUR PHILOSOPHY & STORY'}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-[46px] text-[#433139] leading-tight tracking-tight">
          {lang === 'id' 
            ? 'Santuari Jiwa di Tengah Dunia yang Riuh' 
            : 'A Soulful Sanctuary in a Hurried World'}
        </h1>
        <p className="text-base md:text-lg text-[#4d4448] font-sans leading-relaxed">
          {lang === 'id'
            ? 'FAISHA lahir dari kesadaran mendasar: ketenangan batin bukanlah kemewahan sesaat, melainkan arsitektur harian yang dirancang dengan penuh kesadaran.'
            : 'FAISHA was born from a fundamental realization: inner peace is not an occasional luxury, but an intentional daily architecture.'}
        </p>
      </div>

      {/* Navigational Sub-Tabs */}
      <div className="flex justify-center flex-wrap gap-2 border-b border-[#BDA494]/20 pb-4">
        <button
          onClick={() => handleTab('philosophy')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'philosophy'
              ? 'bg-[#5B4750] text-[#FAF3EE] shadow-xs'
              : 'bg-[#FAF3EE] text-[#433139] hover:bg-[#F2E9E5] border border-[#BDA494]/30'
          }`}
        >
          {lang === 'id' ? 'Filosofi Santuari' : 'Sanctuary Philosophy'}
        </button>
        <button
          onClick={() => handleTab('founder')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'founder'
              ? 'bg-[#5B4750] text-[#FAF3EE] shadow-xs'
              : 'bg-[#FAF3EE] text-[#433139] hover:bg-[#F2E9E5] border border-[#BDA494]/30'
          }`}
        >
          {lang === 'id' ? 'Kisah Davina (Founder)' : 'Founder Story'}
        </button>
        <button
          onClick={() => handleTab('layers')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'layers'
              ? 'bg-[#5B4750] text-[#FAF3EE] shadow-xs'
              : 'bg-[#FAF3EE] text-[#433139] hover:bg-[#F2E9E5] border border-[#BDA494]/30'
          }`}
        >
          {lang === 'id' ? 'Arsitektur 7 Lapisan' : 'The 7-Layer Blueprint'}
        </button>
        <button
          onClick={() => handleTab('ethics')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'ethics'
              ? 'bg-[#5B4750] text-[#FAF3EE] shadow-xs'
              : 'bg-[#FAF3EE] text-[#433139] hover:bg-[#F2E9E5] border border-[#BDA494]/30'
          }`}
        >
          {lang === 'id' ? 'Etika & Keberlanjutan' : 'Sustainability & Ethics'}
        </button>
      </div>

      {/* TAB 1: SANCTUARY PHILOSOPHY */}
      {activeTab === 'philosophy' && (
        <div className="space-y-16 animate-fadeIn">
          {/* Main Narrative Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-sm md:text-base text-[#4d4448] leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
                {lang === 'id' ? 'PRINSIP UTAMA' : 'CORE CREED'}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#433139] font-semibold leading-snug">
                {lang === 'id' 
                  ? '"Soul First, Ritual Before Product"' 
                  : '"Soul First, Ritual Before Product"'}
              </h2>
              <p>
                {lang === 'id'
                  ? 'Di era digital yang penuh dengan kelebihan beban kognitif dan notifikasi konstan, sistem saraf manusia merindukan titik jangkar yang nyata dan menenangkan. Kami memadukan minimalisme arsitektural dengan kearifan olfaktori kuno.'
                  : 'In an era saturated with glowing digital screens and cognitive overload, the human nervous system craves tangible, grounding touchpoints. We combine architectural minimalism with ancient aromatic wisdom.'}
              </p>
              <p>
                {lang === 'id'
                  ? 'Setiap bejana lilin kami ditiup tangan dalam kaca amber tebal dan dituangkan dengan lilin botani murni. Saat Anda menyalakan sumbu lilin, Anda tidak sekadar membakar lilin -Anda sedang menandai batas suci antara kebisingan luar dan keheningan batin.'
                  : 'Each candle vessel is weighted, hand-blown in amber glass, and poured with pure botanical wax. When you strike a match, you are not simply lighting a candle -you are marking the boundary between noise and stillness.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#5B4750]">
                <span className="px-3 py-1 rounded-full bg-[#F2E9E5]">100% Plant Wax</span>
                <span>•</span>
                <span className="px-3 py-1 rounded-full bg-[#F2E9E5]">Zero Phthalates</span>
                <span>•</span>
                <span className="px-3 py-1 rounded-full bg-[#F2E9E5]">Somatic Aromatherapy</span>
              </div>
            </div>

            <div className="h-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-[#BDA494]/30 shadow-sm relative group">
              <img
                src={IMAGES.heroCandlesArch}
                alt="Artisan candle with natural botanicals"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#291714]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#FAF3EE]/95 backdrop-blur-sm border border-[#BDA494]/30 text-xs">
                <p className="font-serif font-bold text-[#433139] text-sm">
                  {lang === 'id' ? 'Sains Olfaktori & Resonansi Somatik' : 'Olfactory Science & Somatic Resonance'}
                </p>
                <p className="text-[#4d4448] mt-1">
                  {lang === 'id'
                    ? 'Aroma terhubung langsung ke sistem limbik otak -pusat memori dan emosi -memungkinkan penataan ulang keadaan batin hanya dalam 3 tarikan napas.'
                    : 'Aroma connects directly to the brain’s limbic system -the seat of memory and emotion -enabling state realignment in just 3 breath cycles.'}
                </p>
              </div>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-7 space-y-3">
              <Leaf className="w-6 h-6 text-[#3D6852]" />
              <h3 className="font-serif text-lg font-semibold text-[#433139]">
                {lang === 'id' ? 'Botani Berkelanjutan' : 'Sustainable Botanicals'}
              </h3>
              <p className="text-xs text-[#4d4448] leading-relaxed">
                {lang === 'id'
                  ? 'Bekerja sama langsung dengan koperasi petani organik di Madagaskar, Provence, dan Kyoto untuk minyak murni hasil distilasi uap.'
                  : 'We partner directly with organic farming cooperatives in Madagascar, Provence, and Kyoto for pure steam-extracted essences.'}
              </p>
            </div>

            <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-7 space-y-3">
              <Sparkles className="w-6 h-6 text-[#5B4750]" />
              <h3 className="font-serif text-lg font-semibold text-[#433139]">
                {lang === 'id' ? 'Arsitektur Penyelarasan Jiwa' : 'The Alignment Blueprint'}
              </h3>
              <p className="text-xs text-[#4d4448] leading-relaxed">
                {lang === 'id'
                  ? 'Kerangka kerja 7 lapisan (Tindakan, Energi, Pola Pikir, Emosi, Jati Diri, Kebutuhan, dan Visi) memetakan perjalanan pemulihan batin secara terstruktur.'
                  : 'Our 7-layer framework maps your path of emotional clarity and sovereign self-realization.'}
              </p>
            </div>

            <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-7 space-y-3">
              <Shield className="w-6 h-6 text-[#78555d]" />
              <h3 className="font-serif text-lg font-semibold text-[#433139]">
                {lang === 'id' ? 'Keberlanjutan Sadar' : 'Conscious Longevity'}
              </h3>
              <p className="text-xs text-[#4d4448] leading-relaxed">
                {lang === 'id'
                  ? 'Setiap bejana kaca tebal didesain untuk digunakan kembali seumur hidup sebagai wadah perhiasan, teh santuari, atau tempat pensil meditasi.'
                  : 'Every weighted vessel is engineered for a second life as sanctuary organizers, botanical pots, or tea caddies.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOUNDER STORY (1:1 faisha-gallery/html/006 Founder Story) */}
      {activeTab === 'founder' && (
        <div className="space-y-16 md:space-y-24 animate-fadeIn">

          {/* Hero: portrait 3/4 kiri + heading + quote + attribution (html/006 §Hero) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 md:col-start-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-sm border border-[#BDA494]/30">
                <img
                  className="w-full h-full object-cover"
                  src={IMAGES.aboutFounderPortrait}
                  alt="A sophisticated editorial portrait of a female founder in a minimal, warmly lit studio. She is wearing natural fiber clothing in neutral tones, looking thoughtfully off-camera. The lighting is soft and natural, creating a serene and restorative mood. Background is a textured warm ivory wall."
                />
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-[#433139] leading-tight tracking-tight mb-6">
                {lang === 'id' ? 'Kisah Davina' : 'The Founder Story'}
              </h2>
              <p className="text-base md:text-lg text-[#4d4448] leading-relaxed italic">
                {lang === 'id'
                  ? '"Saya menciptakan FAISHA bukan sebagai rutinitas, melainkan sebagai jalan kembali pulang ke dalam diri. Di dunia yang terus berakselerasi, kemewahan sejati adalah izin untuk berhenti sejenak."'
                  : '"I created FAISHA not as a routine, but as a return to oneself. In a world of constant acceleration, true luxury is the permission to pause."'}
              </p>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.12em] text-[#433139]">
                {lang === 'id' ? '— Davina, Pendiri' : '— Davina, Founder'}
              </p>
            </div>
          </div>

          {/* Narrative singkat: 1 paragraf (html/006 §Narrative, dipangkas) */}
          <section className="max-w-[720px] mx-auto space-y-4 text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-[#433139] font-semibold">
              {lang === 'id' ? 'Perjalanan ke Dalam Diri' : 'A Journey Inward'}
            </h3>
            <p className="text-sm md:text-base text-[#4d4448] leading-relaxed">
              {lang === 'id'
                ? 'Kelahiran FAISHA tidak ditemukan di ruang rapat atau laboratorium, melainkan dalam momen keheningan yang absolut. Saat cuti panjang di Kyoto, ritual harian teh dan dupa menjadi jangkar suci yang menyematkan pikiran pada saat ini - dan dari sanalah FAISHA lahir sebagai izin untuk berhenti sejenak.'
                : "FAISHA's genesis wasn't found in a boardroom or a laboratory, but in a quiet moment of absolute stillness. During a sabbatical in Kyoto, the daily rituals of tea and incense became sacred anchors securing the mind to the present moment - and from there FAISHA was born as the permission to pause."}
            </p>
          </section>

          {/* Timeline simple: 3 node 2021/2023/2026 (html/006 §Timeline, dipangkas) */}
          <section className="max-w-[1200px] mx-auto">
            <div className="relative">
              <div aria-hidden="true" className="hidden md:block absolute top-[7px] left-0 w-full h-[1px] bg-[#BDA494]/40 z-0"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                {[
                  { year: '2021', titleId: 'Percikan Awal', titleEn: 'The Spark', descId: 'Cuti panjang di Jepang menyingkap kekuatan transformatif praktik sadar harian.', descEn: 'A sabbatical in Japan reveals the transformative power of daily intentional practice.' },
                  { year: '2023', titleId: 'Formula Pertama', titleEn: 'First Formulations', descId: 'Bekerja dengan para master perfumer menciptakan aroma yang memulihkan, bukan menutupi.', descEn: 'Working with master perfumers to create scents that heal rather than mask.' },
                  { year: '2026', titleId: 'Santuari', titleEn: 'The Sanctuary', descId: 'Tumbuhnya komunitas Beautiful Soul dan platform digital terpadu di Indonesia.', descEn: 'Growing a community of Beautiful Souls with an integrated digital platform.' },
                ].map((node, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="w-4 h-4 rounded-full bg-[#5B4750] border-4 border-[#FAF3EE] shadow-sm mb-4"></div>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#7f7478] mb-2">{node.year}</span>
                    <h4 className="font-serif text-lg text-[#433139] font-semibold mb-1.5">{lang === 'id' ? node.titleId : node.titleEn}</h4>
                    <p className="text-xs text-[#4d4448] leading-relaxed max-w-[220px]">{lang === 'id' ? node.descId : node.descEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery 2 foto (html/006 §Gallery, dipangkas) */}
          <section className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-[#BDA494]/25">
              <img className="w-full h-full object-cover" src={IMAGES.aboutGalleryStillLife}
                alt="A beautifully styled still life featuring a glowing amber candle, a minimalist journal, and a ceramic cup of tea on a textured linen tablecloth. The lighting is moody and intimate, with deep plum shadows and warm ivory highlights, creating a cozy sanctuary vibe." />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-[#BDA494]/25">
              <img className="w-full h-full object-cover" src={IMAGES.aboutGalleryLab}
                alt="A wide, editorial shot of a serene, minimalist laboratory or blending room. Glass beakers and botanical extracts sit on a clean, light wood table. The aesthetic is clean, sophisticated, and deeply grounded in natural science and modern apothecary style." />
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: THE 7-LAYER ARCHITECTURE */}
      {activeTab === 'layers' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl text-[#433139] font-semibold">
              {lang === 'id' ? 'Piramida Penyelarasan Jiwa' : 'The Soul Alignment Pyramid'}
            </h2>
            <p className="text-xs md:text-sm text-[#4d4448]">
              {lang === 'id' 
                ? 'Tujuh tingkatan holistik yang menghubungkan kebiasaan lahiriah hingga visi terdalam sukma Anda.' 
                : 'Seven holistic layers connecting outward daily actions to your deepest soulful vision.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', name: 'Behavior (Tindakan)', scent: 'Silent Horizon Oil', desc: 'Kebiasaan dan batasan fisik harian yang menopang ketenangan hidup.' },
              { num: '02', name: 'Energy (Daya Vital)', scent: 'Aura Aura Morning Mist', desc: 'Frekuensi kesegaran tubuh dan pemulihan dari kelelahan kognitif.' },
              { num: '03', name: 'Mindset (Pola Pikir)', scent: 'Terra Musk Accord', desc: 'Kejernihan perspektif dan keberanian melepaskan prasangka berulang.' },
              { num: '04', name: 'Emotion (Resonansi Hati)', scent: 'Vanilla Musk Accord', desc: 'Keseimbangan rasa welas asih dan penerimaan terhadap diri sendiri.' },
              { num: '05', name: 'Identity (Jati Diri)', scent: 'Soule Plum No. 9', desc: 'Kedaulatan batin tanpa perlu validasi dari kebisingan eksternal.' },
              { num: '06', name: 'Need (Kebutuhan Hakiki)', scent: 'Cashmere Musk Accord', desc: 'Kebutuhan ruang hening dan perlindungan energi personal.' },
              { num: '07', name: 'Vision (Visi Sukma)', scent: 'Sea Salt Musk Accord', desc: 'Arah hidup yang selaras dengan panggilan jiwa yang damai.' },
              { num: '08', name: 'Communion (Harmoni)', scent: 'Sanctuary Amber Blend', desc: 'Keterhubungan penuh kasih dengan sesama dan alam semesta.' }
            ].map((layer, idx) => (
              <div key={idx} className="bg-[#FAF3EE] border border-[#BDA494]/30 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif text-[#5B4750]">{layer.num}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F2E9E5] text-[#78555d]">
                    {layer.scent}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-sm text-[#433139]">{layer.name}</h3>
                <p className="text-xs text-[#4d4448] leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                soundEngine.playSoftClick();
                if (onExploreJourney) onExploreJourney();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B4750] text-[#FAF3EE] text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>{lang === 'id' ? 'Jelajahi Piramida Interaktif' : 'Explore Interactive Pyramid'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ETHICS & SUSTAINABILITY */}
      {activeTab === 'ethics' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-7 space-y-4">
              <Award className="w-7 h-7 text-[#5B4750]" />
              <h3 className="font-serif text-xl font-semibold text-[#433139]">
                {lang === 'id' ? 'Standar Kemurnian Botani' : 'Botanical Purity Standards'}
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-[#4d4448]">
                <li className="flex items-start gap-2">
                  <span className="text-[#3D6852] font-bold">✓</span>
                  <span>100% Lilin Botani Murni berbahan dasar minyak kelapa dan kedelai terbarukan tanpa jelaga berbahaya.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3D6852] font-bold">✓</span>
                  <span>Bebas Ftalat, Paraben, Sulfat, dan zat pewarna sintetis buatan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3D6852] font-bold">✓</span>
                  <span>Sumbu katun organik bebas timbal yang terbakar stabil dan merata.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-7 space-y-4">
              <Shield className="w-7 h-7 text-[#78555d]" />
              <h3 className="font-serif text-xl font-semibold text-[#433139]">
                {lang === 'id' ? 'Kemitraan Etis & Siklus Sirkular' : 'Ethical Partnerships & Circularity'}
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-[#4d4448]">
                <li className="flex items-start gap-2">
                  <span className="text-[#3D6852] font-bold">✓</span>
                  <span>Kemitraan perdagangan adil (Fair Trade) dengan petani nilam lokal Jawa Barat dan cengkeh Sulawesi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3D6852] font-bold">✓</span>
                  <span>Kemasan kertas bersertifikasi FSC dan bahan pengisi kemasan yang dapat larut dalam air.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3D6852] font-bold">✓</span>
                  <span>Program isi ulang (Refill program) dan daur ulang bejana santuari.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="bg-[#F7F1EE] border border-[#BDA494]/30 rounded-2xl p-8 md:p-12 text-center space-y-5">
        <h3 className="font-serif text-2xl md:text-3xl text-[#433139]">
          {lang === 'id' ? 'Mulailah Perjalanan Penyelarasan Jiwa Anda' : 'Begin Your Soul Alignment Journey'}
        </h3>
        <p className="text-xs md:text-sm text-[#4d4448] max-w-xl mx-auto leading-relaxed">
          {lang === 'id'
            ? 'Temukan arketipe aroma jiwa dan peroleh rancangan ritual harian yang dikurasi khusus untuk kebutuhan batin Anda.'
            : 'Discover your soul scent archetype and receive a bespoke daily ritual tailored to your inner state.'}
        </p>
        <button
          onClick={() => {
            soundEngine.playSoftClick();
            if (onOpenAssessment) onOpenAssessment();
          }}
          className="px-8 py-3.5 rounded-full bg-[#5B4750] text-[#FAF3EE] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-sm"
        >
          {lang === 'id' ? 'Mulai Beautiful Soul Assessment' : 'Take Beautiful Soul Assessment'}
        </button>
      </div>

    </div>
  );
};
