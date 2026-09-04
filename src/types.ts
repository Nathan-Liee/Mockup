export type Language = 'id' | 'en';

export type NavTab =
  | 'beranda'
  | 'journey'
  | 'rituals'
  | 'journal'
  | 'shop'
  | 'signature'
  | 'about'
  | 'community'
  | 'dashboard'
  // Pre-wired for later batches (007-018, 019+); not yet reachable from App tabs.
  | 'search'
  | 'support'
  | 'faq'
  | 'legal'
  | 'product'
  | 'assessment-result'
  // P0 wiring 2026-09-03: dead canvases 016-100 (see VISUAL_KANVAS_GAP.md).
  | 'checkout'
  | 'next-ritual'
  | 'assessment'
  | 'assessment-flow'
  | 'auth'
  | 'dashboard-full'
  | 'admin'
  // B1 Commerce spine 2026-09-03 (ORPHANED_FLOW_PLAN.md §3.1): 020,034/035,036,037,039,040,041,042.
  | 'shop-filter'
  | 'cart'
  | 'checkout-shipping'
  | 'checkout-payment'
  | 'payment-processing'
  | 'payment-failure'
  | 'order-thankyou'
  | 'order-tracking'
  // B2 Ritual + PDP varian 2026-09-03: 022,023,028,030.
  | 'ritual-morning'
  | 'ritual-focus'
  // 021 overview jadi /rituals; player practice lama pindah ke tab ini.
  | 'ritual-practice'
  // Detail ritual 024/025/026 (simple perfected 2026-09-03) — sebelumnya yatim, tak pernah dirutekan.
  | 'ritual-home'
  | 'ritual-sleep'
  | 'ritual-soul'
  | 'product-simple'
  | 'product-recommended'
  // 033 Bundle Composer (1:1 html/033, 2026-09-03) — sebelumnya yatim, tak pernah dirutekan.
  | 'bundle-composer'
  // 032 Stok Habis (1:1 html/032) — di-route-kan 2026-09-03 (NG-4 fix), reachable dari kartu Amber Glow di Shop.
  | 'product-oos'
  // B4 Account + Result detail 2026-09-03: 058/060/063 (result detail) + 072-079 (account).
  | 'archetype-detail'
  | 'crystal-trinity'
  | 'why-recommended'
  | 'my-results'
  | 'my-ritual'
  | 'my-orders'
  | 'order-detail'
  | 'soul-petals'
  | 'rewards'
  | 'wishlist'
  | 'profile'
  // 5 Defer mockup 2026-09-04: 083,084,086,087 (077 sudah 'rewards' di atas).
  | 'community-member'
  | 'event-detail'
  | 'academy'
  | 'academy-module'
  // 7 Defer + 088/089 2026-09-04.
  | 'journal-private'
  | 'journal-editor'
  // 085 join 2026-09-04.
  | 'community-join';

export type LegalDoc = 'privacy' | 'terms' | 'shipping';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  category: 'Candles' | 'Botanical Waters' | 'Ritual Sets' | 'Oils' | 'Signature Musks';
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  alignmentLayer: 'Identity' | 'Emotion' | 'Mindset' | 'Energy' | 'Behavior' | 'Need' | 'Vision';
  burnTime?: string;
  volume?: string;
  image: string;
  badge?: string;
  muskFamily?: 'Amber' | 'Vanilla' | 'Terra' | 'Cashmere' | 'Sea Salt' | 'Vetiver';
  crystalPair?: string;
  isDraftNonPurchasable?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface PyramidLayer {
  id: string;
  name: 'Identity' | 'Emotion' | 'Mindset' | 'Energy' | 'Behavior' | 'Need' | 'Vision';
  level: number;
  title: string;
  titleId: string;
  tagline: string;
  taglineId: string;
  description: string;
  descriptionId: string;
  fragranceNotes: string[];
  recommendedScent: string;
  ritualFocus: string;
  colorHex: string;
}

export interface CrystalInfo {
  id: string;
  name: string;
  meaning: string;
  meaningId: string;
  ritualUse: string;
  chakra: string;
  symbolism: string;
  image: string;
}

export interface ScentAssessmentResult {
  dominantLayer: 'Identity' | 'Emotion' | 'Mindset' | 'Energy' | 'Behavior' | 'Need' | 'Vision';
  title: string;
  titleId?: string;
  archetype: string;
  essenceDescription: string;
  essenceDescriptionId?: string;
  recommendedFragrance: Product;
  crystalTrinity: CrystalInfo[];
  ritualGuidance: string;
  reasonCodes: string[];
  layerScores: Record<string, number>;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  prompt: string;
  content: string;
  mood: 'Serene' | 'Reflective' | 'Grounded' | 'Energized' | 'Grateful';
  scentResonance: string;
  layer: 'Identity' | 'Emotion' | 'Mindset' | 'Energy' | 'Behavior' | 'Need' | 'Vision';
}
