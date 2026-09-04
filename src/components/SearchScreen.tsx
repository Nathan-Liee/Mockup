import React, { useMemo, useState } from 'react';
import { NavTab, Product } from '../types';
import { PRODUCTS, IMAGES } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import { Search, X, ChevronLeft, ChevronRight, BookOpen, Flower2, ShoppingBag, Sparkles } from 'lucide-react';

interface SearchScreenProps {
  initialQuery?: string;
  onNavigate: (tab: NavTab) => void;
  onAddToCart?: (product: Product) => void;
}

// Editorial results mirror the Journal references (012/013).
const ARTICLES = [
  { title: 'The Grounding Power of Sandalwood', excerpt: 'Discover the ancient history and restorative properties of sandalwood in our daily rituals. Learn how this sacred wood can help center your mind...', meta: '5 min read', tag: 'Journal' },
  { title: 'Evening Wind Down Rituals', excerpt: 'Create a sanctuary in your own home with these simple, sensory-focused steps designed to transition you from the busy day into restful sleep...', meta: 'Practice', tag: 'Ritual Guide' },
  { title: 'Morning Intentions: Starting With Clarity', excerpt: 'A simple 5-minute morning practice using our Awaken blend to set clear intentions for the day ahead.', meta: '3 min read', tag: 'Rituals' },
  { title: 'The Anatomy of Deep Soul Plum', excerpt: 'Exploring the complex notes and emotional resonance behind our signature color and scent profile.', meta: '6 min read', tag: 'Fragrance' },
  { title: 'Finding Sanctuary in Shared Spaces', excerpt: 'How coming together in mindful community enhances individual healing and personal growth.', meta: '4 min read', tag: 'Community' },
];

const CATEGORIES = ['All', 'Products', 'Rituals', 'Journal', 'Pages'] as const;
type Category = (typeof CATEGORIES)[number];

const SUGGESTIONS = ['Evening Wind Down', 'Deep Soul Plum', 'Morning Intentions'];

export const SearchScreen: React.FC<SearchScreenProps> = ({ initialQuery = '', onNavigate, onAddToCart }) => {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);
  const [category, setCategory] = useState<Category>('All');

  const runSearch = (q: string) => {
    soundEngine.playSoftClick();
    setQuery(q);
    setSubmitted(q.trim());
    setCategory('All');
  };

  const productResults = useMemo(() => {
    const q = submitted.toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter((p) =>
      [p.name, p.description, p.subtitle, ...p.notes.top, ...p.notes.heart, ...p.notes.base]
        .join(' ').toLowerCase().includes(q)
    );
  }, [submitted]);

  const articleResults = useMemo(() => {
    const q = submitted.toLowerCase();
    if (!q) return ARTICLES.slice(0, 2);
    return ARTICLES.filter((a) => `${a.title} ${a.excerpt} ${a.tag}`.toLowerCase().includes(q));
  }, [submitted]);

  const total = productResults.length + articleResults.length;
  const showProducts = category === 'All' || category === 'Products';
  const showArticles = category === 'All' || category === 'Journal' || category === 'Rituals';
  const isEmpty = submitted !== '' && total === 0;

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-10 py-10 md:py-16">
      {/* Search header (015: box dulu, image+heading di bawah; 014: heading lalu box) */}
      <header className="mb-12 max-w-3xl mx-auto text-center">
        {!isEmpty && (
          <h1 className="text-[32px] md:text-[48px] leading-tight font-semibold tracking-[-0.02em] text-[#433139] mb-6">
            {submitted ? 'Search Results' : 'Search the Sanctuary'}
          </h1>
        )}
        <form
          onSubmit={(e) => { e.preventDefault(); runSearch(query); }}
          className="relative w-full max-w-2xl mx-auto group"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7f7478] group-focus-within:text-[#433139] transition-colors pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
            placeholder="Search products, rituals, journal..."
            className="w-full h-12 pl-12 pr-10 bg-white border border-[#BDA494] rounded-sm focus:border-[#433139] focus:ring-0 text-base text-[#291714] transition-colors outline-none"
          />
          {query && (
            <button type="button" onClick={() => runSearch('')} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f7478] hover:text-[#433139]">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
        {submitted && !isEmpty && <p className="mt-4 text-[#4d4448]">{total} results found</p>}
      </header>

      {/* ============ 014 — RESULTS ============ */}
      {!isEmpty && (
        <>
          <section className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#BDA494]/30 pb-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { soundEngine.playSoftClick(); setCategory(c); }}
                  className={`px-4 py-2 rounded-full text-[11px] font-medium tracking-[0.04em] transition-colors ${
                    category === c ? 'bg-[#5B4750] text-[#FAF3EE]' : 'bg-[#F7F1EE] text-[#4d4448] hover:bg-[#F2E9E5] border border-[#BDA494]/30'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium tracking-[0.04em] text-[#4d4448] uppercase mr-1">Applied:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2E9E5] rounded-full text-[11px] text-[#291714] border border-[#BDA494]/30">
                Category: {category}
                <button onClick={() => setCategory('All')} aria-label="Clear category"><X className="w-3.5 h-3.5 hover:text-[#433139]" /></button>
              </span>
              {/* FIX_PLAN #27: chip Price: All statis — X salah mapping (hapus query). Dibuat non-interaktif */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2E9E5] rounded-full text-[11px] text-[#291714] border border-[#BDA494]/30">
                Price: All
              </span>
              <button onClick={() => { setCategory('All'); runSearch(''); }} className="ml-2 text-[11px] font-medium text-[#433139] hover:underline">Clear All</button>
            </div>
          </section>

          <div className="space-y-16">
            {showProducts && productResults.length > 0 && (
              <section>
                <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] mb-8 border-b border-[#BDA494]/30 pb-2 inline-block">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {productResults.map((p, i) => (
                    // FIX_PLAN #15: klik kartu → PDP (bukan add-to-cart langsung)
                    <article key={p.id} className="group cursor-pointer" onClick={() => { soundEngine.playSoftClick(); onNavigate('product'); }}>
                      <div className="relative aspect-[4/5] bg-[#F7F1EE] overflow-hidden mb-4 border border-[#BDA494]/20">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        {i === 0 && (
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-[#433139] border border-[#BDA494]/50 rounded-sm">New</div>
                        )}
                        {p.isDraftNonPurchasable && (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#FAF3EE]/20 backdrop-blur-[2px]">
                            <span className="bg-[#BDA494] text-white px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] rounded-sm shadow-sm">Coming Soon</span>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-[#291714] mb-1 group-hover:text-[#433139] transition-colors">{p.name}</h3>
                        <p className="text-sm text-[#4d4448]">{p.isDraftNonPurchasable ? 'DRAFT_NON_PURCHASABLE' : `$${p.price.toFixed(2)}`}</p>
                      </div>
                    </article>
                  ))}
                  {/* 014 skeleton card */}
                  <article className="animate-pulse" aria-hidden="true">
                    <div className="aspect-[4/5] bg-[#F7F1EE] mb-4 border border-[#BDA494]/20" />
                    <div className="space-y-2 flex flex-col items-center">
                      <div className="h-4 bg-[#F7F1EE] w-3/4 rounded" />
                      <div className="h-4 bg-[#F7F1EE] w-1/4 rounded" />
                    </div>
                  </article>
                </div>
              </section>
            )}

            {showArticles && articleResults.length > 0 && (
              <section>
                <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] mb-8 border-b border-[#BDA494]/30 pb-2 inline-block">Journal &amp; Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articleResults.map((a) => (
                    <article
                      key={a.title}
                      onClick={() => onNavigate('journal')}
                      className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-[#BDA494]/30 hover:border-[#433139]/50 transition-colors group cursor-pointer"
                    >
                      <div className="w-full sm:w-1/3 aspect-[4/3] sm:aspect-square bg-[#F7F1EE] overflow-hidden flex-shrink-0">
                        <img src={IMAGES.aboutPhilosophy} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="inline-block px-2 py-1 bg-[#F2E9E5] text-[#433139] text-[10px] font-bold uppercase tracking-[0.06em] rounded-sm self-start mb-2">{a.tag}</span>
                        <h3 className="text-[22px] leading-7 font-semibold text-[#433139] mb-2 group-hover:text-[#5B4750] transition-colors">{a.title}</h3>
                        <p className="text-sm text-[#4d4448] line-clamp-3 mb-3">{a.excerpt}</p>
                        <span className="text-[11px] font-medium tracking-[0.04em] text-[#7f7478] flex items-center gap-1.5 mt-auto"><BookOpen className="w-3.5 h-3.5" /> {a.meta}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Pagination (static, per 014) */}
          <nav aria-label="Pagination" className="mt-16 flex justify-center items-center gap-4">
            <button className="p-2 text-[#7f7478] opacity-50" disabled aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex gap-2 text-[11px] font-medium">
              {/* FIX_PLAN #26: pagination 2/3/8/Next tanpa handler → disabled mock state */}
              <button className="w-8 h-8 rounded-full bg-[#433139] text-[#FAF3EE] flex items-center justify-center">1</button>
              <button disabled className="w-8 h-8 rounded-full text-[#BDA494] flex items-center justify-center cursor-not-allowed">2</button>
              <button disabled className="w-8 h-8 rounded-full text-[#BDA494] flex items-center justify-center cursor-not-allowed">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-[#BDA494]">...</span>
              <button disabled className="w-8 h-8 rounded-full text-[#BDA494] flex items-center justify-center cursor-not-allowed">8</button>
            </div>
            <button disabled className="p-2 text-[#BDA494] cursor-not-allowed" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
          </nav>
        </>
      )}

      {/* ============ 015 — NO RESULTS ============ */}
      {isEmpty && (
        <div>
          <section className="max-w-2xl mx-auto text-center mb-16">
            {/* 015 urutan: search box (header) → image → heading */}
            <div className="mb-10 flex justify-center">
              <img src={IMAGES.searchNoResults} alt="" className="w-64 h-64 object-contain opacity-80 mix-blend-multiply" />
            </div>
            <h1 className="text-[28px] font-semibold text-[#47312E] mb-6">No results found for '{submitted}'</h1>
            <p className="text-[#4d4448] mb-8">We couldn't find a direct match, but your journey doesn't end here. Explore related concepts below.</p>
            <div className="space-y-4">
              <div>
                <span className="text-[#7f7478]">Did you mean... </span>
                <button onClick={() => runSearch('Sandalwood')} className="text-[#433139] hover:underline">Sandalwood</button>
                {' '}or{' '}
                <button onClick={() => runSearch('Ritual')} className="text-[#433139] hover:underline">Ritual</button>?
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#7f7478] self-center mr-2">Try searching for:</span>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => runSearch(s)} className="bg-[#F2E9E5] px-4 py-2 rounded-full text-[11px] font-medium text-[#433139] hover:bg-[#F7F1EE] transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Revision 015: no standalone "Sign In" button — account access lives in the Header profile icon only. */}
          <section className="mb-8">
            <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-[#433139] text-center mb-8">Browse by category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {([
                [ShoppingBag, 'Shop', 'shop'],
                [Flower2, 'Rituals', 'rituals'],
                [BookOpen, 'Journal', 'journal'],
                [Sparkles, 'Assessment', 'journey'],
              ] as const).map(([Icon, label, tab]) => (
                <button
                  key={label}
                  onClick={() => { soundEngine.playSoftClick(); onNavigate(tab); }}
                  className="bg-[#F7F1EE] border border-[#BDA494] rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover:border-[#433139] hover:bg-white transition-all group cursor-pointer"
                >
                  <Icon className="w-7 h-7 text-[#5B4750] group-hover:text-[#433139] transition-colors" strokeWidth={1.5} />
                  <span className="font-semibold text-[#291714]">{label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
