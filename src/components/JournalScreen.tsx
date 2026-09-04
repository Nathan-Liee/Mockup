import React, { useState } from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';
import { Quote, Link2, Bookmark, Share2, ArrowLeft, Search } from 'lucide-react';

// Fix-12 kanvas 2026-09-03 — FAI-SCR-012 (Journal list) + FAI-SCR-013 (Article).
// 1:1 vs faisha-gallery/html/012 + html/013. View internal state: 'list' | 'article'.
// Composer privat lama dibuang (bukan bagian 12 kanvas; entri privat tetap hidup di
// DashboardScreen 090 via localStorage `faisha_journal_entries`).

interface JournalScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

// Fix header kosong 2026-09-03: URL /aida/ di html/012 DEAD (semua varian path).
// Ganti ke URL live aida-public dari galeri sendiri (html/011+013) — subjek padan
// (botanical morning light / candle+journal still life). Bukan invent: literal dari package.
const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1vzpO-Xj0288JWqlLkHLjJBiuMBRd_9ybKCRfruV1UMWgH_kiZQDSCjQ83hDzeKq77aoZYpRYwcd9eTMXEqHMviC22P3zPiFCAHCggbhc7ugNb-jgF1aMvvvfGKzvbdejeZHEVAcwfYiPSgcC5rv4KyEG2343UrUOe0LGWop7aimMXJWD31DAq3AcRqU_wy7HWBeBk_jTqzZQD9haDEkNnKehiSjvVOpToL6HBirUBiCfFjjg2klgu37_nR71tHC_97ViOf3CePk';
const FEATURED_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH7cfO-5DqNoPA3zuYH8-AXVsFQq_ACjcU6upwVvqxlYIFJwlS8g13g7G7c1kFfbLI2OvwIatfD-la58GXOFNFJMOkGxGxs1k_xIr99M8hcFfaeHDtO6bbSse4YnoGRYu3jCq3EHtKseQPBrMc4GO4Y5JUTdSSzS6a1jM4HW3aASi20y4NEABXeRlTx3Q6vsh-Uo4BdNJYIV7XRVYkqPv8jLWfeLqrAOjw-vlQb4_FOqVgNvLGNJWQulUKB4tBXa3a_SxcUZ55G0Q';

// 012 — kategori (verbatim)
const CATEGORIES = ['All', 'Rituals & Wellness', 'Self-Discovery', 'Fragrance Stories', 'Community Voices'];

// 012 — kartu grid (verbatim)
const POSTS = [
  { cat: 'Rituals', title: 'Morning Intentions: Starting With Clarity', desc: 'A simple 5-minute morning practice using our Awaken blend to set clear intentions for the day ahead.', by: 'Faisha', date: 'Oct 18, 2024' },
  { cat: 'Fragrance', title: 'The Anatomy of Deep Soul Plum', desc: 'Exploring the complex notes and emotional resonance behind our signature color and scent profile.', by: 'Elena R.', date: 'Oct 12, 2024' },
  { cat: 'Community', title: 'Finding Sanctuary in Shared Spaces', desc: 'How coming together in mindful community enhances individual healing and personal growth.', by: 'Community Team', date: 'Oct 05, 2024' },
];

export const JournalScreen: React.FC<JournalScreenProps> = ({ onNavigate }) => {
  const [view, setView] = useState<'list' | 'article'>('list');
  const [category, setCategory] = useState('All');
  // Fix-6-P1 2026-09-03 — kolom search dekat filter kategori (saran tim; html/012 belum punya).
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const mockToast = (msg: string) => {
    soundEngine.playSoftClick();
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const openArticle = () => { soundEngine.playSoftClick(); setView('article'); window.scrollTo({ top: 0 }); };
  const backToList = () => { soundEngine.playSoftClick(); setView('list'); window.scrollTo({ top: 0 }); };

  // ============ 013 — ARTICLE VIEW ============
  if (view === 'article') {
    return (
      <article className="animate-fadeIn max-w-[1000px] mx-auto px-4 md:px-10 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.06em] text-[#4d4448] mb-10">
          <button onClick={() => onNavigate?.('beranda')} className="hover:text-[#433139] transition-colors">Home</button>
          <span>›</span>
          <button onClick={backToList} className="hover:text-[#433139] transition-colors">Journal</button>
          <span>›</span>
          <button onClick={() => onNavigate?.('rituals')} className="hover:text-[#433139] transition-colors">Rituals</button>
          <span>›</span>
          <span className="text-[#433139] font-semibold">The Quiet Power of Scented Rituals</span>
        </nav>

        {/* Header */}
        <header className="max-w-[720px] mx-auto text-center flex flex-col gap-6 mb-12">
          <span className="mx-auto px-3 py-1 rounded-full bg-[#F2E9E5] border border-[#BDA494]/40 text-[#5B4750] text-xs font-bold uppercase tracking-[0.06em] w-fit">RITUALS</span>
          <h1 className="font-serif text-[38px] leading-[44px] md:text-[48px] md:leading-[56px] font-semibold tracking-[-0.02em] text-[#433139]">
            The Quiet Power of Scented Rituals
          </h1>
          <p className="text-lg leading-[28px] text-[#4d4448]">
            In our fast-paced world, finding moments of stillness can feel impossible. Discover how intentional scent practices can transform your routine into a grounding sanctuary.
          </p>
          <p className="text-sm text-[#7f7478]">Faisha • Oct 24, 2024 • 5 min read</p>
        </header>

        {/* Figure */}
        <figure className="max-w-[1000px] mb-12">
          <div className="aspect-[1.79] rounded-xl overflow-hidden border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
            <img alt="Aurora candle dalam setup ritual pagi." className="w-full h-full object-cover" src={FEATURED_IMG} />
          </div>
          <figcaption className="text-sm italic text-[#7f7478] text-center mt-3">
            A restorative morning ritual setup with the Aurora candle.
          </figcaption>
        </figure>

        {/* Body */}
        <div className="max-w-[720px] mx-auto space-y-6 text-base leading-[24px] text-[#4d4448]">
          <p>
            The dawn breaks, casting a cool, uncertain light through the window. The house is still, save for the hum of the refrigerator. This is the liminal space before the world demands your attention—a fleeting envelope of quiet. In these moments, how do you anchor yourself? For many, the answer lies in a practice as ancient as humanity itself: the ritual of scent.
          </p>
          <p>
            Rituals differ from routines in their intention. A routine is functional—brushing teeth, making coffee. A ritual is symbolic—it bridges the physical action with an emotional or spiritual state. When we introduce scent into a ritual, we engage our most primal sense, directly accessing the brain's limbic system, the seat of memory and emotion.
          </p>

          <h2 className="font-serif text-[22px] leading-[28px] font-semibold text-[#433139] pt-4">The Science of Stillness</h2>
          <p>
            Our olfactory receptors are intimately connected to the amygdala and hippocampus. This explains why the smell of rain on dry earth or a specific floral note can instantly transport us decades into the past. By intentionally pairing a specific fragrance with a moment of calm, we can train our nervous system to recognize that scent as a cue to downshift.
          </p>

          {/* Blockquote card */}
          <blockquote className="relative bg-[#F7F1EE] border border-[#BDA494]/30 rounded-xl p-10 my-10 text-center">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-[#BDA494]/30" aria-hidden />
            <p className="font-serif italic text-[24px] leading-[32px] text-[#433139]">
              "We believe that every scent tells a story. The story you write with it in your quietest moments is the most profound."
            </p>
          </blockquote>

          <p>
            Consider the transition from work to evening. Instead of simply closing a laptop, lighting a candle with notes of deep plum and sandalwood creates a definitive boundary. It signals to the body: <em>The striving is done for today. It is time to rest.</em>
          </p>
          <p>To cultivate your own scented ritual, consider these foundational steps:</p>
          <ul className="list-disc pl-6 space-y-3 marker:text-[#BDA494]">
            <li><strong className="text-[#433139] font-semibold">Select an Anchor:</strong> Choose a scent that evokes the exact feeling you want to cultivate—be it focus, calm, or comfort.</li>
            <li><strong className="text-[#433139] font-semibold">Define the Boundary:</strong> Link the scent to a specific transition point in your day (e.g., waking up, finishing work, before sleep).</li>
            <li><strong className="text-[#433139] font-semibold">Engage the Senses:</strong> Make the act of lighting a candle or applying oil deliberate. Notice the flicker of the match, the initial burst of fragrance.</li>
            <li><strong className="text-[#433139] font-semibold">Protect the Time:</strong> Even five minutes of uninterrupted presence with the scent is more potent than an hour of distracted burning.</li>
          </ul>

          {/* Callout — The Faisha Approach */}
          <div className="bg-[#F7F1EE] border-l-4 border-[#5B4750] rounded-r-lg p-8 my-10">
            <h3 className="text-base font-semibold uppercase tracking-[0.06em] text-[#5B4750] mb-3">The Faisha Approach</h3>
            <p>
              Our restorative collections are designed with intentionality at their core. We use complex, layered botanical blends that reveal themselves slowly, encouraging you to linger and observe the subtle shifts in fragrance as the wax warms.
            </p>
          </div>

          <p>
            The true power of a scented ritual isn't just in the fragrance itself, but in the commitment to carve out space for yourself. In a noisy world, taking a deep breath of something beautiful is a quiet act of rebellion and a profound gesture of self-care.
          </p>
        </div>

        {/* Footer: tags + share */}
        <div className="max-w-[720px] mx-auto border-t border-[#BDA494]/30 mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {['#SelfDiscovery', '#Rituals', '#FragranceStories'].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-[#F2E9E5] text-[#5B4750] text-[11px] font-bold uppercase tracking-[0.04em]">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#7f7478]">Share</span>
            {[
              { Icon: Link2, label: 'Salin tautan' },
              { Icon: Bookmark, label: 'Simpan' },
              { Icon: Share2, label: 'Bagikan' },
            ].map(({ Icon, label }) => (
              <button key={label} onClick={() => mockToast(`MOCK — DRAFT: ${label} (demo)`)} aria-label={label} className="w-10 h-10 rounded-full border border-[#BDA494] text-[#5B4750] flex items-center justify-center hover:bg-[#F2E9E5] transition-colors">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Author bio */}
        <div className="max-w-[720px] mx-auto bg-[#F7F1EE] border border-[#BDA494]/30 rounded-xl p-8 mt-10 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-full bg-[#5B4750] text-[#FAF3EE] font-serif text-3xl font-semibold flex items-center justify-center shrink-0">F</div>
          <div>
            <h3 className="text-[22px] leading-[28px] font-semibold text-[#433139] mb-2">Written by Faisha</h3>
            <p className="text-sm leading-[24px] text-[#4d4448] mb-4">
              Founder and head scent designer at ITS FAISHA™. Dedicated to exploring the intersection of fragrance, wellness, and intentional living.
            </p>
            <button onClick={() => mockToast('MOCK — DRAFT: profil penulis segera hadir')} className="text-xs font-bold uppercase tracking-[0.06em] text-[#5B4750] underline underline-offset-4 hover:opacity-70 transition-opacity">
              Read more by Faisha
            </button>
          </div>
        </div>

        <div className="max-w-[720px] mx-auto mt-10">
          <button onClick={backToList} className="h-12 px-6 border-[1.5px] border-[#BDA494] text-[#433139] text-xs font-bold uppercase tracking-[0.06em] rounded-lg hover:bg-[#F2E9E5] transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Journal
          </button>
        </div>

        {toast && <Toast msg={toast} />}
      </article>
    );
  }

  // ============ 012 — LIST VIEW ============
  const q = query.trim().toLowerCase();
  const visiblePosts = POSTS.filter((p) => (category === 'All' || p.cat === category.replace(' & Wellness', '').replace(' Voices', '').replace(' Stories', '')) && (!q || `${p.title} ${p.desc}`.toLowerCase().includes(q)));
  return (
    <div className="animate-fadeIn">
      {/* Hero — struktur 1:1 html/012: bg surface + img opacity-60 mix-blend-multiply + overlay gradient */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-[#F2E9E5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="" aria-hidden className="w-full h-full object-cover opacity-60 mix-blend-multiply contrast-125 saturate-50" src={HERO_IMG} />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#FAF3EE]/40 via-transparent to-[#F2E9E5]/60" aria-hidden />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-[38px] leading-[44px] md:text-[48px] md:leading-[56px] font-semibold tracking-[-0.02em] text-[#5B4750] mb-4">
            Beautiful Soul Journal
          </h1>
          <p className="text-lg leading-[28px] text-[#4d4448] max-w-2xl mx-auto">
            Stories, reflections, and rituals for your beautiful soul journey.
          </p>
        </div>
      </section>

      {/* Featured 60/40 */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 h-[400px] rounded-xl overflow-hidden border border-[#BDA494]/30 shadow-[0_4px_20px_rgba(91,71,80,0.04)]">
            <img alt="The Quiet Power of Scented Rituals" className="w-full h-full object-cover" src={FEATURED_IMG} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="w-fit px-3 py-1 rounded-full bg-[#F2E9E5] border border-[#BDA494]/40 text-[#5B4750] text-[11px] font-bold uppercase tracking-[0.06em]">Self-Discovery</span>
            <h2 className="font-serif text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#433139]">The Quiet Power of Scented Rituals</h2>
            <p className="text-base leading-[24px] text-[#4d4448]">
              In our fast-paced world, finding moments of stillness can feel impossible. Discover how incorporating intentional scent practices can transform your daily routine into a grounding sanctuary.
            </p>
            <p className="text-sm text-[#7f7478]">By Faisha • Oct 24, 2024</p>
            <button onClick={openArticle} className="w-fit text-sm font-semibold text-[#5B4750] underline underline-offset-4 decoration-[#BDA494] hover:opacity-80 transition-opacity">
              Read Article
            </button>
          </div>
        </div>
      </section>

      {/* Category pills + grid */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16 md:pb-[120px]">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {/* FIX_PLAN #23: search dekat filter — order-last dihapus (mobile ikut urutan DOM) */}
          <label className="relative flex-grow max-w-xs w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f7478]" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the Journal"
              aria-label="Search the Journal"
              className="w-full h-10 pl-9 pr-3 rounded-full bg-white border border-[#BDA494]/40 text-sm text-[#433139] placeholder:text-[#7f7478] focus:outline-none focus:border-[#5B4750] transition-colors"
            />
          </label>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { soundEngine.playSoftClick(); setCategory(c); }}
              className={`px-5 h-10 rounded-full text-xs font-bold uppercase tracking-[0.06em] transition-colors ${
                category === c ? 'bg-[#5B4750] text-[#FAF3EE]' : 'bg-[#F7F1EE] text-[#4d4448] border border-[#BDA494]/40 hover:bg-[#F2E9E5]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visiblePosts.map((p) => (
            <article key={p.title} className="bg-white border border-[#BDA494]/40 rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(91,71,80,0.04)] flex flex-col">
              <div className="aspect-[4/3] bg-[#F2E9E5]">
                <img alt={p.title} loading="lazy" className="w-full h-full object-cover" src={FEATURED_IMG} />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-grow">
                <span className="w-fit px-3 py-1 rounded-full bg-[#F2E9E5] text-[#5B4750] text-[11px] font-bold uppercase tracking-[0.06em]">{p.cat}</span>
                <h3 className="font-serif text-[22px] leading-[28px] font-semibold text-[#433139]">{p.title}</h3>
                <p className="text-sm leading-[24px] text-[#4d4448] line-clamp-3">{p.desc}</p>
                <div className="mt-auto pt-4 border-t border-[#BDA494]/30 flex items-center justify-between">
                  <span className="text-xs text-[#7f7478]">{p.by} • {p.date}</span>
                  <button onClick={openArticle} className="text-xs font-bold uppercase tracking-[0.06em] text-[#5B4750] underline hover:opacity-70 transition-opacity">Baca</button>
                </div>
              </div>
            </article>
          ))}
          {visiblePosts.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#7f7478] py-10">Tidak ada artikel untuk "{query}". Coba kata lain.</p>
          )}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => mockToast('MOCK — DRAFT: artikel berikutnya segera terbit')} className="h-12 px-10 border-[1.5px] border-[#BDA494] text-[#5B4750] text-xs font-bold uppercase tracking-[0.06em] rounded-full hover:bg-[#F2E9E5] transition-colors">
            Load More
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#F2E9E5] py-16 px-6 md:px-10">
        <div className="max-w-[600px] mx-auto text-center flex flex-col gap-6">
          <h3 className="font-serif text-[24px] leading-[32px] font-semibold text-[#433139]">Subscribe to the Journal</h3>
          <p className="text-base text-[#4d4448]">Receive weekly reflections, exclusive rituals, and gentle reminders to pause.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); mockToast('MOCK — DRAFT: langganan jurnal tercatat (demo)'); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input type="email" required placeholder="Email kamu" className="flex-grow h-12 px-4 rounded-lg bg-white border border-[#BDA494]/50 text-base focus:outline-none focus:border-[#5B4750]" />
            <button type="submit" className="h-12 px-8 rounded-lg bg-[#5B4750] text-[#FAF3EE] text-xs font-bold uppercase tracking-[0.06em] hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {toast && <Toast msg={toast} />}
    </div>
  );
};

const Toast: React.FC<{ msg: string }> = ({ msg }) => (
  <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
    <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
    <span>{msg}</span>
  </div>
);
