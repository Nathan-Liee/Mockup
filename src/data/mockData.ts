import { 
  Product, 
  PyramidLayer, 
  JournalEntry, 
  ScentAssessmentResult, 
  CrystalInfo
} from '../types';

export const IMAGES = {
  heroJournalDesk: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF4zQUYJ7jwl4lu-UNX_YmfzHa9HO8EKX6yUOZ2Potl_ckz1NyZu072ffRK_WFQfwmvBFPf63tal1oVygPR3-6aGpQHzDYg4FopDP_-KEuej_qTQ5bSDFmAuW51m--49fgzM-SSco6CUqVRBaoop9bh_9CWxh8sF22BqUcSdV2IztvlIqC-Bvbwri5mK8oCxFyN8TrovYmhi2CT31AN7HtfYEMcBS4sl8oRVhlP1d4hdF3Tumg7aJXs9g8FBzQk2PuBht1_tim1CU",
  heroCandlesArch: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmEHvKChustA49TT43JgyAZHRHYs2n3K6Uhpc_tPzxeYQIHHwKXhIm_QxylsRdWOUFs0x2Uc556z5e8kik3Hfzxjh7RE5RBUTmRQLBKStBiHksyDaN28k7wmOKo2JqojQ46KhOapksFRq2eJZdKdz30WetKq3b6seEjmXmQHDNvFmMMCMR1MCoVJSNS2ZuQFkOrtWSEyGi6w7rg4HgxWyriLz0hBmnyuHR3EmKiy7i63bG78idE_Ifo7d7LPMkk8aF5DAskvFa3Wo",
  pyramidDiagram: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6MG6uUHTFXY_b7EOrG-nNlQUEOjZh9RkbjbvsWhN9HTwJf_BNrRZVqJ3zkZLJ1BLoWEle_6XoKfOx0xE9FbZDE2hkoLhJd_MpTuO_M-iCeaj794ZztiOm_jjbeTBOJQ2PaY90nyln1AYD-QHQIgh2BlPx0icEv-MPwxIKzbZrF5LvH3ea9nP3URfToKoLYdB2-1q35Dstx_Xy5nOqVeQnUkjWCqlB3x69PpMKj5zwgYKOSqYY0pj7CEutncPUzz5_3lw5RPw89-Y",
  davinaSignature: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF4zQUYJ7jwl4lu-UNX_YmfzHa9HO8EKX6yUOZ2Potl_ckz1NyZu072ffRK_WFQfwmvBFPf63tal1oVygPR3-6aGpQHzDYg4FopDP_-KEuej_qTQ5bSDFmAuW51m--49fgzM-SSco6CUqVRBaoop9bh_9CWxh8sF22BqUcSdV2IztvlIqC-Bvbwri5mK8oCxFyN8TrovYmhi2CT31AN7HtfYEMcBS4sl8oRVhlP1d4hdF3Tumg7aJXs9g8FBzQk2PuBht1_tim1CU",
  // Reused assets for later-batch screens (007-018); no new imagery invented.
  aboutPhilosophy: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmEHvKChustA49TT43JgyAZHRHYs2n3K6Uhpc_tPzxeYQIHHwKXhIm_QxylsRdWOUFs0x2Uc556z5e8kik3Hfzxjh7RE5RBUTmRQLBKStBiHksyDaN28k7wmOKo2JqojQ46KhOapksFRq2eJZdKdz30WetKq3b6seEjmXmQHDNvFmMMCMR1MCoVJSNS2ZuQFkOrtWSEyGi6w7rg4HgxWyriLz0hBmnyuHR3EmKiy7i63bG78idE_Ifo7d7LPMkk8aF5DAskvFa3Wo",
  journalNoResults: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF4zQUYJ7jwl4lu-UNX_YmfzHa9HO8EKX6yUOZ2Potl_ckz1NyZu072ffRK_WFQfwmvBFPf63tal1oVygPR3-6aGpQHzDYg4FopDP_-KEuej_qTQ5bSDFmAuW51m--49fgzM-SSco6CUqVRBaoop9bh_9CWxh8sF22BqUcSdV2IztvlIqC-Bvbwri5mK8oCxFyN8TrovYmhi2CT31AN7HtfYEMcBS4sl8oRVhlP1d4hdF3Tumg7aJXs9g8FBzQk2PuBht1_tim1CU",
  successBotanicals: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJTe7zNvMlt8kd664UmK90bz7yye8J4RC4nJD4TI7xYZWVEl0-OQg-LIlPoooYQLKoyfVVQpWHlWuonXxnjjhWP0ReiPg9qqaowlxNGwXHedodcerD50mb9t9yD884BxszWLwD3dXXiEc-AXjUSTqlssU79fCzYogzjMbVBMKqTTFlTyzwKM9Hc9cKUQVpgYOfFohMPE1L6QKx3z82Vfks3-Vr51ErRlF0xGduRqWeNRDCcu9TXEhJQ98mqpCYe8VTg4ak7BxB3Nc",
  // Exact URL from faisha-gallery/html/003 hero (still-life candle/journal/botanicals).
  // Exact URLs from faisha-gallery/html/006 (About / Founder Story tab).
  aboutFounderPortrait: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNUjJiM-e4KWa7NtZj8QlenoqUu85fL7rqg9l7mAyz6jGskzNwAquRmgLv2cobyKe33tZy9r907nIvE75oqTAQ21ZoFlx_TiD-lCE0ZKC3d3BQNf3fwXn_NTXasUFDjt9ILaGn-mEZ5b4HT5qBdH-YeWt_yzcz-hlFqT8V13E0JTpeJwQILmrXc2KxVjIvSLKfQMVFYaNpqSAgePoVfgwDcxoKYmRHDv7tDAVSooLng9aOqGxXJTHvFu8nfmFlGE8051MeSRLx4Bs",
  aboutGalleryStillLife: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_rSdGYlNN3GWzrZcPhqmaBbYiwGQPSBPxaKXZKRMDY_2YJMbeJBeS8ROK70SBjtZr5XAN9DpjPsSbzHZWNtybbVeXuS3WfbbbG9zwNSOHDUVy8WqhbbZ3BqvSfFgP_8s0NsLiNYx0X0Uf60thnRRC_V7KJkxLfsg-rlkXHJdEiN5Y-TmcGbUjizqhUoGYrunXOt7Ioe4LBSsKLrCAq_odnHyYA59K8_Q6z7_3sCT5ACuSmz7JbMkpH30tdT5dZBvYeVT0UPcMbCU",
  aboutGalleryLab: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6iNTjhy9qXGyw25gkdK7Xbxzs_n5sIJheG9YIrUcSxFmn485jpidtkLaTLvyJ4PpR-gV2vDqtkOLD3w-iTIhNNffDX1SlR5Ld2IIZKuHyzUEsmCEc_r283OWZ8rIyqLmKZIKvoKaVk0EeHZ4csubsRPulsi2DF4f0BsY3lmOVqfEVIG49HfY3_IrDCQXrs6NgG45ZVAamaVwEvFGHA5cBX0b2QyGIEbLblyTVlcl-LL5BYkqkMsdRUnYpayDQ1AdFTIsvXUvBnyo",
  journeyHero: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH7cfO-5DqNoPA3zuYH8-AXVsFQq_ACjcU6upwVvqxlYIFJwlS8g13g7G7c1kFfbLI2OvwIatfD-la58GXOFNFJMOkGxGxs1k_xIr99M8hcFfaeHDtO6bbSse4YnoGRYu3jCq3EHtKseQPBrMc4GO4Y5JUTdSSzS6a1jM4HW3aASi20y4NEABXeRlTx3Q6vsh-Uo4BdNJYIV7XRVYkqPv8jLWfeLqrAOjw-vlQb4_FOqVgNvLGNJWQulUKB4tBXa3a_SxcUZ55G0Q",
  // Exact URL from faisha-gallery/html/015 (Search No Results illustration).
  searchNoResults: "https://lh3.googleusercontent.com/aida-public/AB6AXuDelVz9D2efaKjjw-GxCcjNc3EKKq3Y9Rtyh7m8Hox6yjs9ziqZ4zpBSWO-SJQcIlz-oZzMhyV8wlKsxUXZcSwd59jCYJZ6RSgnxcj3Hzc9Ntzi8JTHDvaJW--VUkelCeNYn8DX3qcaNJN9wHTIIiZd-z5DAu74JgVd05fDWrggC6Aw-LvL-_pLoxxv1N6T2IjIwAZZ_ZFJxO9JdiOAdNU7akMwgpo8Jrmz_l5pEGcaU7Getaw0lu8RaGtSbBSwDEBbtB2klkXbUA4",
};

export const CRYSTALS: CrystalInfo[] = [
  {
    id: 'rose-quartz',
    name: 'Rose Quartz (Mawar Kuarsa)',
    meaning: 'Unconditional self-compassion, tender emotional release, and heart-centered receptivity.',
    meaningId: 'Welas asih tanpa syarat, pelepasan emosi lembut, dan keterbukaan cakra jantung.',
    ritualUse: 'Placed beside your water vessel or journal to soften self-criticism during morning reflection.',
    chakra: 'Heart Chakra (Anahata)',
    symbolism: 'Compassion & Gentleness',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'amethyst',
    name: 'Raw Amethyst (Kecubung Ungu)',
    meaning: 'Spacious mental clarity, intuitive stillness, and release of compulsive rumination.',
    meaningId: 'Kejernihan pikiran luas, ketenangan intuisi, dan melepaskan pikiran berulang.',
    ritualUse: 'Held in left palm during 4-4-4-4 box breathing to settle nervous system excitation.',
    chakra: 'Third Eye & Crown (Ajna & Sahasrara)',
    symbolism: 'Mental Serenity & Intuition',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'clear-quartz',
    name: 'Clear Quartz Point (Kristal Bening)',
    meaning: 'Amplification of personal sovereignty, focused intention, and energetic harmony.',
    meaningId: 'Penguatan kedaulatan diri, niat terfokus, dan harmoni energi.',
    ritualUse: 'Pointed upward beside your burning candle to anchor sovereign daily declarations.',
    chakra: 'Crown Chakra (Sahasrara)',
    symbolism: 'Sovereignty & Illumination',
    image: 'https://images.unsplash.com/photo-1531347644342-99577719602b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'smoky-quartz',
    name: 'Smoky Quartz (Kuarsa Asap)',
    meaning: 'Deep somatic grounding, protection of energetic boundaries, and earth stability.',
    meaningId: 'Pelekatan somatik mendalam, perlindungan batasan energi, dan stabilitas bumi.',
    ritualUse: 'Placed near pulse points during evening grounding rituals to dispel accumulated tension.',
    chakra: 'Root Chakra (Muladhara)',
    symbolism: 'Grounded Protection',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'citrine',
    name: 'Sunlit Citrine (Sitrin Surya)',
    meaning: 'Joyful vitality, solar plexus confidence, and manifestation of creative warmth.',
    meaningId: 'Vitalitas penuh sukacita, kepercayaan diri solar plexus, dan manifestasi kehangatan kreatif.',
    ritualUse: 'Kept in morning workspaces to stimulate inspiring optimism without nervous restlessness.',
    chakra: 'Solar Plexus (Manipura)',
    symbolism: 'Warmth & Creative Vitality',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'moonstone',
    name: 'Rainbow Moonstone (Batu Bulan)',
    meaning: 'Cyclical grace, honoring emotional tides, and profound subconscious intuition.',
    meaningId: 'Keanggunan siklus, menghormati pasang surut emosi, dan intuisi bawah sadar.',
    ritualUse: 'Resting beside bedside nightstand to invite restorative dreamscapes.',
    chakra: 'Sacral Chakra (Svadhisthana)',
    symbolism: 'Cyclical Intuition',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80'
  }
];

export const PRODUCTS: Product[] = [
  // Core Candles & Botanicals
  {
    id: 'soule-plum-no-9',
    name: 'SOULE PLUM No. 9',
    subtitle: 'Amber & Smoked Oud Ritual Candle',
    price: 68,
    rating: 4.9,
    category: 'Candles',
    description: 'An intimate, grounding talisman crafted to awaken your core identity. Velvety dark plum marries rich golden amber and quiet resinous oud wood.',
    notes: {
      top: ['Dark Mirabelle Plum', 'Bergamot Zest', 'Cardamom Pod'],
      heart: ['Smoked Oud', 'Damask Rose Petal', 'Cashmere Accord'],
      base: ['Warm Golden Amber', 'Madagascar Vanilla', 'Cedarwood']
    },
    alignmentLayer: 'Identity',
    burnTime: '65 Hours',
    volume: '280g / 9.8 oz',
    image: IMAGES.heroCandlesArch,
    badge: 'Bestseller',
    crystalPair: 'Clear Quartz Point',
  },
  {
    id: 'morning-mist-botanical',
    name: 'AURA AURA Morning Mist',
    subtitle: 'Restorative Botanical Hydrosol',
    price: 46,
    rating: 4.8,
    category: 'Botanical Waters',
    description: 'Distilled alpine botanicals and steam-extracted frankincense water to clear cognitive fog and harmonize physical vitality.',
    notes: {
      top: ['Roman Chamomile', 'White Tea Bloom'],
      heart: ['Neroli Blossoms', 'Clary Sage'],
      base: ['Sacred Frankincense', 'Vetiver Root']
    },
    alignmentLayer: 'Energy',
    volume: '150ml / 5.1 fl oz',
    image: IMAGES.heroJournalDesk,
    badge: 'Morning Ritual',
    crystalPair: 'Sunlit Citrine'
  },
  {
    id: 'sacred-ground-ritual-set',
    name: 'THE INNER SANCTUARY SET',
    subtitle: '5-Layer Alignment Candle Discovery Collection',
    price: 135,
    rating: 5.0,
    category: 'Ritual Sets',
    description: 'A complete tactile journey through all archetypal layers. Contains miniature 85g vessels representing Behavior, Energy, Mindset, Emotion, and Identity.',
    notes: {
      top: ['Crisp Fig Leaf', 'Blood Orange', 'Sweet Mandarin'],
      heart: ['French Lavender', 'Palo Santo', 'Jasmine Sambac'],
      base: ['Sandalwood', 'Tonka Bean', 'Smoked Amber']
    },
    alignmentLayer: 'Vision',
    burnTime: '5 x 25 Hours',
    volume: '5 x 85g',
    image: IMAGES.heroCandlesArch,
    badge: 'Complete Ritual',
    crystalPair: 'Amethyst & Clear Quartz'
  },
  {
    id: 'mindset-clarity-oil',
    name: 'SILENT HORIZON Anointing Oil',
    subtitle: 'Mindset & Cognitive Stillness Roll-On',
    price: 52,
    rating: 4.7,
    category: 'Oils',
    description: 'Applied gently to pulse points and collarbones before meditation or deep focus to soothe cognitive noise.',
    notes: {
      top: ['French Cypress', 'Eucalyptus Leaf'],
      heart: ['Wild Lavender', 'Hinoki Wood'],
      base: ['Labdanum Resin', 'Myrrh']
    },
    alignmentLayer: 'Mindset',
    volume: '30ml / 1.0 fl oz',
    image: IMAGES.heroJournalDesk,
    crystalPair: 'Raw Amethyst'
  },
  // Davina Signature Musk Collection (6 directions per PRD/DESIGN.md Section 9 Row 27)
  {
    id: 'davina-amber-musk',
    name: 'DAVINA SIGNATURE Amber Musk',
    subtitle: 'Layer 1: Sovereign Identity Eau de Parfum',
    price: 95,
    rating: 4.9,
    category: 'Signature Musks',
    description: 'A golden, resinous skin-scent that radiates regal presence, warm labdanum, and velvety golden amber for uncompromising self-trust.',
    notes: {
      top: ['Golden Saffron', 'Sun-warmed Bergamot'],
      heart: ['Warm Labdanum', 'Amber Crystal Accord'],
      base: ['Precious Musk', 'Benzoin Tears']
    },
    alignmentLayer: 'Identity',
    muskFamily: 'Amber',
    volume: '100ml / 3.4 fl oz',
    image: IMAGES.heroCandlesArch,
    badge: 'Signature',
    crystalPair: 'Clear Quartz Point'
  },
  {
    id: 'davina-vanilla-musk',
    name: 'DAVINA SIGNATURE Vanilla Musk',
    subtitle: 'Layer 2: Tender Emotional Comfort Flacon',
    price: 95,
    rating: 4.9,
    category: 'Signature Musks',
    description: 'Non-gourmand, dry Bourbon vanilla bean folded into soft white musk and tonka, wrapping the spirit in comforting, unhurried warmth.',
    notes: {
      top: ['Almond Blossom', 'White Heliotrope'],
      heart: ['Bourbon Vanilla Pod', 'Damask Rose Milk'],
      base: ['Cashmere Musk', 'White Tonka']
    },
    alignmentLayer: 'Emotion',
    muskFamily: 'Vanilla',
    volume: '100ml / 3.4 fl oz',
    image: IMAGES.heroJournalDesk,
    badge: 'Signature',
    crystalPair: 'Rose Quartz'
  },
  {
    id: 'davina-terra-musk',
    name: 'DAVINA SIGNATURE Terra Musk',
    subtitle: 'Layer 3: Grounded Somatic Foundation',
    price: 95,
    rating: 4.8,
    category: 'Signature Musks',
    description: 'Rich geosmin, damp earth, crushed moss, and warm skin musk designed to immediately settle elevated nervous system excitation.',
    notes: {
      top: ['Damp Petrichor', 'Green Ivy'],
      heart: ['Indonesian Patchouli', 'Earthy Violet Leaf'],
      base: ['Terra Skin Musk', 'Oakmoss Absolute']
    },
    alignmentLayer: 'Behavior',
    muskFamily: 'Terra',
    volume: '100ml / 3.4 fl oz',
    image: IMAGES.heroCandlesArch,
    badge: 'Signature',
    crystalPair: 'Smoky Quartz'
  },
  {
    id: 'davina-cashmere-musk',
    name: 'DAVINA SIGNATURE Cashmere Musk',
    subtitle: 'Layer 4: Heart Equilibrium & Stillness',
    price: 95,
    rating: 5.0,
    category: 'Signature Musks',
    description: 'Gossamer sandalwood, silk cocoon accords, and quiet powdery iris that feels like draping pure cashmere over tender shoulders.',
    notes: {
      top: ['Powdered Iris', 'White Pear'],
      heart: ['Cashmere Wood', 'Mimosa Blossom'],
      base: ['Cloud Musk', 'Creamy Sandalwood']
    },
    alignmentLayer: 'Need',
    muskFamily: 'Cashmere',
    volume: '100ml / 3.4 fl oz',
    image: IMAGES.heroJournalDesk,
    badge: 'Signature',
    crystalPair: 'Rainbow Moonstone'
  },
  {
    id: 'davina-sea-salt-musk',
    name: 'DAVINA SIGNATURE Sea Salt Musk',
    subtitle: 'Layer 5: Restorative Vital Awakening',
    price: 95,
    rating: 4.8,
    category: 'Signature Musks',
    description: 'Crisp coastal air, driftwood soaked in mineral sea salt, and solar musk that recharges vitality like an early morning seaside walk.',
    notes: {
      top: ['Crushed Sea Salt', 'Grapefruit Rind'],
      heart: ['Sunlit Driftwood', 'Maritime Sage'],
      base: ['Clean White Musk', 'Ambrette Seed']
    },
    alignmentLayer: 'Energy',
    muskFamily: 'Sea Salt',
    volume: '100ml / 3.4 fl oz',
    image: IMAGES.heroCandlesArch,
    badge: 'Signature',
    crystalPair: 'Sunlit Citrine'
  },
  {
    id: 'davina-vetiver-musk',
    name: 'DAVINA SIGNATURE Vetiver Musk',
    subtitle: 'Layer 6: Clear Horizon & Mental Focus',
    price: 95,
    rating: 4.9,
    category: 'Signature Musks',
    description: 'Smoky Javanese vetiver root paired with crisp cypress needles and sheer clean musk for profound cognitive discernment.',
    notes: {
      top: ['Pink Pepper', 'Bitter Orange'],
      heart: ['Javanese Vetiver', 'Cedar Needles'],
      base: ['Smoky Clean Musk', 'Guaiacwood']
    },
    alignmentLayer: 'Mindset',
    muskFamily: 'Vetiver',
    volume: '100ml / 3.4 fl oz',
    image: IMAGES.heroJournalDesk,
    badge: 'Signature',
    crystalPair: 'Raw Amethyst'
  }
];

export const PYRAMID_LAYERS: PyramidLayer[] = [
  {
    id: 'identity',
    name: 'Identity',
    level: 7,
    title: 'The Sovereign Self',
    titleId: 'Diri Berdaulat (Identitas)',
    tagline: 'Who you truly are beyond external expectation',
    taglineId: 'Jati diri sejati di balik ekspektasi dunia luar',
    description: 'The pinnacle of the soul pyramid represents your unshakeable core purpose, creative sovereignty, and inner authority. Fragrance at this tier uses deep resins and opulent amber to anchor self-trust.',
    descriptionId: 'Puncak piramida jiwa mewakili tujuan inti yang tak tergoyahkan, kedaulatan kreatif, dan otoritas batin. Wewangian pada tingkatan ini menggunakan resin mendalam dan amber emas.',
    fragranceNotes: ['Smoked Oud', 'Dark Plum', 'Golden Amber', 'Resinous Frankincense'],
    recommendedScent: 'SOULE PLUM No. 9',
    ritualFocus: 'Daily Intention Affirmation & Silent Centering',
    colorHex: '#433139'
  },
  {
    id: 'vision',
    name: 'Vision',
    level: 6,
    title: 'The Luminous Horizon',
    titleId: 'Cakrawala Visi Jiwa',
    tagline: 'Spacious foresight and long-term spiritual alignment',
    taglineId: 'Pandangan luas dan keselarasan spiritual jangka panjang',
    description: 'The vision layer expands your horizon, transforming narrow urgency into serene, deliberate steps guided by your deepest internal compass.',
    descriptionId: 'Lapisan visi memperluas cakrawala, mengubah ketergesaan menjadi langkah tenang yang dipandu oleh kompas batin terdalam.',
    fragranceNotes: ['White Tea Bloom', 'Incense Smoke', 'Palo Santo', 'Golden Myrrh'],
    recommendedScent: 'THE INNER SANCTUARY SET',
    ritualFocus: 'Long-term Soul Visioning & Sunset Contemplation',
    colorHex: '#4d3944'
  },
  {
    id: 'need',
    name: 'Need',
    level: 5,
    title: 'The Tender Sanctuary',
    titleId: 'Kebutuhan Ruang Aman Batin',
    tagline: 'Honoring emotional hunger for safety and unhurried rest',
    taglineId: 'Menghormati kebutuhan batin akan rasa aman dan jeda',
    description: 'Acknowledging somatic vulnerability and creating impenetrable boundaries around your peace without guilt or over-explaining.',
    descriptionId: 'Mengakui kerapuhan diri dan menciptakan batasan kokoh di sekitar ketenangan tanpa rasa bersalah.',
    fragranceNotes: ['Cashmere Wood', 'Powdered Iris', 'White Tonka', 'Milk Balsam'],
    recommendedScent: 'DAVINA SIGNATURE Cashmere Musk',
    ritualFocus: 'Safe Boundary Affirmation & Comforting Anointment',
    colorHex: '#5b4750'
  },
  {
    id: 'emotion',
    name: 'Emotion',
    level: 4,
    title: 'The Emotional Heart',
    titleId: 'Hati Emosional & Welas Asih',
    tagline: 'Navigating feelings with grace and tenderness',
    taglineId: 'Mengalir bersama rasa dengan kelembutan',
    description: 'The emotional layer governs how you process life transitions, relational intimacy, and emotional resilience. Soft florals and velvety balsams soothe tension and invite vulnerability.',
    descriptionId: 'Lapisan emosional mengatur cara memproses transisi hidup, keintiman hubungan, dan ketangguhan hati. Bunga lembut meredakan ketegangan.',
    fragranceNotes: ['Damask Rose', 'Bourbon Vanilla', 'Cardamom', 'Velvet Cashmere'],
    recommendedScent: 'DAVINA SIGNATURE Vanilla Musk',
    ritualFocus: 'Heart-Opening Breathwork & Compassionate Reflection',
    colorHex: '#6d5560'
  },
  {
    id: 'mindset',
    name: 'Mindset',
    level: 3,
    title: 'The Clear Horizon',
    titleId: 'Kejernihan Pola Pikir',
    tagline: 'Cultivating focus, expansive belief, and mental tranquility',
    taglineId: 'Menumbuhkan fokus, ketenangan mental, dan keyakinan luas',
    description: 'The mindset layer shapes internal dialogue and narrative framing. Clean woods, cypress, and meditative hinoki disperse mental clutter and invite spacious perspective.',
    descriptionId: 'Lapisan pola pikir membentuk dialog batin. Kayu bersih, cypress, dan hinoki meditasi mengurai kekacauan pikiran.',
    fragranceNotes: ['French Cypress', 'Hinoki Wood', 'Roman Chamomile', 'Javanese Vetiver'],
    recommendedScent: 'SILENT HORIZON Anointing Oil',
    ritualFocus: 'Morning Clarity Journaling & Digital Fasting',
    colorHex: '#78555d'
  },
  {
    id: 'energy',
    name: 'Energy',
    level: 2,
    title: 'The Vital Current',
    titleId: 'Arus Energi Vital',
    tagline: 'Sustaining physical vitality and restorative rhythm',
    taglineId: 'Menjaga vitalitas fisik dan ritme pemulihan alami',
    description: 'The energetic baseline determines daily stamina, nervous system regulation, and circadian harmony. Bright botanicals, neroli, and crisp minerals invigorate without overwhelming.',
    descriptionId: 'Fondasi energi menentukan stamina harian, regulasi sistem saraf, dan harmoni sirkadian. Botani segar menyegarkan tanpa memicu gelisah.',
    fragranceNotes: ['Neroli Blossoms', 'Clary Sage', 'Sea Salt Accord', 'White Tea'],
    recommendedScent: 'AURA AURA Morning Mist',
    ritualFocus: 'Hydration Awakening & Sun Salutation Inhalation',
    colorHex: '#a5868f'
  },
  {
    id: 'behavior',
    name: 'Behavior',
    level: 1,
    title: 'The Grounded Foundation',
    titleId: 'Fondasi Perilaku & Kebiasaan',
    tagline: 'Daily embodied habits and tangible sanctuary practices',
    taglineId: 'Kebiasaan nyata harian dan praktik sanctuary berwujud',
    description: 'The bedrock upon which all transformation rests. Tangible rituals, somatic anchoring, and consistent environmental cues reinforce intentional living day after day.',
    descriptionId: 'Batu penjuru tempat seluruh transformasi bersandar. Ritual nyata, penjangkaran somatik, dan isyarat lingkungan memperkuat hidup berkesadaran.',
    fragranceNotes: ['Sandalwood', 'Earthy Vetiver', 'Damp Petrichor', 'Oakmoss'],
    recommendedScent: 'DAVINA SIGNATURE Terra Musk',
    ritualFocus: 'Sanctuary Space Preparation & Evening Flame Lighting',
    colorHex: '#bda494'
  }
];

export const SARAH_DEFAULT_RESULT: ScentAssessmentResult = {
  dominantLayer: 'Identity',
  title: 'The Sovereign Visionary',
  titleId: 'Sang Visioner Berdaulat',
  archetype: 'Intuitive Architect of Calm',
  essenceDescription: 'You are currently moving through a profound cycle of authentic self-actualization. Your mind seeks quiet contemplation where your natural creative depth can expand without external noise or urgency.',
  essenceDescriptionId: 'Anda sedang berada dalam fase aktualisasi diri yang mendalam. Jiwa Anda mendambakan ruang hening tempat kedalaman kreativitas dapat mekar tanpa distraksi kebisingan luar.',
  recommendedFragrance: PRODUCTS[0],
  crystalTrinity: [CRYSTALS[2], CRYSTALS[1], CRYSTALS[0]], // Clear Quartz, Amethyst, Rose Quartz
  ritualGuidance: 'Begin each morning by lighting SOULE PLUM No. 9 for 3 breath cycles. Anoint wrists, breathe in deeply for 4 seconds, and write 3 non-negotiable soul intentions before engaging with screens.',
  reasonCodes: [
    'Layer 7 Resonance: Deep alignment with Sovereign Identity and internal authority over external validation.',
    'Olfactory Match: High affinity for Smoked Oud, Mirabelle Plum, and Warm Amber resins.',
    'Nervous System Profile: Seeks slow, tactile ritual anchors over rapid digital multitasking.'
  ],
  layerScores: {
    Identity: 94,
    Vision: 88,
    Need: 82,
    Emotion: 76,
    Mindset: 85,
    Energy: 72,
    Behavior: 89
  }
};

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'journal-1',
    date: 'Wednesday, August 26',
    title: 'Awakening the quiet self',
    prompt: 'What truth feels most comforting to your spirit this morning?',
    content: 'Lit the Soule Plum candle at 7:15 AM. The warm notes of amber and plum immediately shifted the energy of the studio. I noticed how quickly my breathing deepened. Today, I choose ease over hurried output.',
    mood: 'Serene',
    scentResonance: 'SOULE PLUM No. 9',
    layer: 'Identity'
  },
  {
    id: 'journal-2',
    date: 'Tuesday, August 25',
    title: 'Clearing mental fog at twilight',
    prompt: 'Which thoughts are ready to be gently released?',
    content: 'Mist applied to palms and inhaled deeply for 4 rounds of box breathing. Letting go of the urgency to respond to everyone instantaneously.',
    mood: 'Grounded',
    scentResonance: 'AURA AURA Morning Mist',
    layer: 'Mindset'
  },
  {
    id: 'journal-3',
    date: 'Monday, August 24',
    title: 'Creating sacred boundaries',
    prompt: 'Where can you grant yourself more tenderness today?',
    content: 'Anointed pulse points with Davina Cashmere Musk. Closed my laptop at exactly 6 PM without remorse. My evening belongs to stillness.',
    mood: 'Grateful',
    scentResonance: 'DAVINA SIGNATURE Cashmere Musk',
    layer: 'Need'
  }
];

export const MOCK_ADMIN_ASSESSMENTS = [
  {
    id: 'FAI-RES-2026-0818-01',
    maskedUser: 's***h@faisha.com',
    dominantLayer: 'Identity (Layer 7)',
    archetype: 'The Sovereign Visionary',
    productMatch: 'SOULE PLUM No. 9 Candle',
    crystalTrinity: 'Clear Quartz • Amethyst • Rose Quartz',
    timestamp: '2026-08-26 14:32:10 WIB',
    status: 'Verified'
  },
  {
    id: 'FAI-RES-2026-0818-02',
    maskedUser: 'e***n@stockholm.se',
    dominantLayer: 'Mindset (Layer 3)',
    archetype: 'The Clear Horizon',
    productMatch: 'SILENT HORIZON Anointing Oil',
    crystalTrinity: 'Amethyst • Smoky Quartz • Clear Quartz',
    timestamp: '2026-08-26 12:15:44 WIB',
    status: 'Completed'
  },
  {
    id: 'FAI-RES-2026-0818-03',
    maskedUser: 'k***n@kyoto.jp',
    dominantLayer: 'Emotion (Layer 4)',
    archetype: 'The Sacred Nurturer',
    productMatch: 'DAVINA SIGNATURE Vanilla Musk',
    crystalTrinity: 'Rose Quartz • Moonstone • Citrine',
    timestamp: '2026-08-26 09:40:12 WIB',
    status: 'Completed'
  },
  {
    id: 'FAI-RES-2026-0818-04',
    maskedUser: 'm***a@vancouver.ca',
    dominantLayer: 'Energy (Layer 2)',
    archetype: 'The Vital Alchemist',
    productMatch: 'AURA AURA Morning Mist',
    crystalTrinity: 'Citrine • Clear Quartz • Smoky Quartz',
    timestamp: '2026-08-25 21:04:33 WIB',
    status: 'Verified'
  },
  {
    id: 'FAI-RES-2026-0818-05',
    maskedUser: 'g***t@anonymous.org',
    dominantLayer: 'Vision (Layer 6)',
    archetype: 'The Luminous Muse',
    productMatch: 'THE INNER SANCTUARY SET',
    crystalTrinity: 'Clear Quartz • Moonstone • Amethyst',
    timestamp: '2026-08-25 18:22:01 WIB',
    status: 'Anonymous'
  }
];

export const MOCK_ADMIN_ORDERS = [
  {
    id: 'ORD-FAISHA-8841',
    orderNumber: '#FS-8841-ID',
    user: 'Sarah M. (Jakarta Selatan)',
    item: 'SOULE PLUM No. 9 Candle + AURA AURA Mist',
    total: 114.00,
    status: 'Delivered',
    ritualUnlocked: true,
    timestamp: '2026-08-24 08:30 WIB'
  },
  {
    id: 'ORD-FAISHA-8842',
    orderNumber: '#FS-8842-ID',
    user: 'Devi P. (Surabaya)',
    item: 'THE INNER SANCTUARY SET (5-Layer)',
    total: 135.00,
    status: 'Shipped',
    ritualUnlocked: true,
    timestamp: '2026-08-25 14:15 WIB'
  },
  {
    id: 'ORD-FAISHA-8843',
    orderNumber: '#FS-8843-ID',
    user: 'Amira K. (Bandung)',
    item: 'DAVINA SIGNATURE Cashmere Musk 100ml',
    total: 95.00,
    status: 'Processing',
    ritualUnlocked: true,
    timestamp: '2026-08-26 10:45 WIB'
  },
  {
    id: 'ORD-FAISHA-8844',
    orderNumber: '#FS-8844-ID',
    user: 'Reza T. (Yogyakarta)',
    item: 'SILENT HORIZON Anointing Oil 30ml',
    total: 52.00,
    status: 'Pending',
    ritualUnlocked: false,
    timestamp: '2026-08-26 19:20 WIB'
  }
];

// All 103 Base Screens parsed directly from Frame Inventory v1.0 / DESIGN.md
export const FRAME_INVENTORY_103 = [
  { seq: 1, baseId: 'FAI-SCR-001', group: 'A — Global, Public & Trust', area: 'HOME', screen: 'LANDING', titleId: 'Beranda Utama', titleEn: 'Main Home', route: '/', scope: 'R1/P0', gate: 'Owner/Brand + responsive QA', source: 'R01,R22,VOL2-B14', states: 'guest, returning, loading, reduced-motion, error', flow: 'MAIN,COMMERCE', notes: 'Hero poster fallback; one primary CTA per section.', sourceRow: 2 },
  { seq: 2, baseId: 'FAI-SCR-002', group: 'A — Global, Public & Trust', area: 'HOME', screen: 'RETURNING', titleId: 'Beranda Pengguna Kembali', titleEn: 'Returning User Home', route: '/', scope: 'R1/P0', gate: 'Auth + consented personalization', source: 'R21,R25,VOL2-B14/B38', states: 'authenticated, incomplete-assessment, saved-result, order-state', flow: 'RETURNING', notes: 'Login state replaces generic CTA with Continue/My Journey.', sourceRow: 3 },
  { seq: 3, baseId: 'FAI-SCR-003', group: 'A — Global, Public & Trust', area: 'JOURNEY', screen: 'LANDING', titleId: 'The Journey of You', titleEn: 'The Journey of You', route: '/the-journey', scope: 'R1/P0', gate: 'Owner/IP + claims approval', source: 'R17,R18,VOL2-B15', states: 'default, expanded, reduced-motion', flow: 'MAIN', notes: 'Use Board 14 / Visual B as final visual direction.', sourceRow: 4 },
  { seq: 4, baseId: 'FAI-SCR-004', group: 'A — Global, Public & Trust', area: 'JOURNEY', screen: 'PYRAMID', titleId: 'Detail Self-Alignment Pyramid', titleEn: 'Self-Alignment Pyramid Detail', route: '/the-journey#pyramid', scope: 'R1/P0', gate: 'Owner/IP + accessibility QA', source: 'R17,R18,VOL2-B15', states: 'collapsed, expanded, focus, selected', flow: 'MAIN', notes: 'Desktop pyramid becomes vertical stepper on small screens.', sourceRow: 5 },
  { seq: 5, baseId: 'FAI-SCR-005', group: 'A — Global, Public & Trust', area: 'ABOUT', screen: 'BRAND', titleId: 'Tentang ITS FAISHA', titleEn: 'About ITS FAISHA', route: '/about', scope: 'R1/P0', gate: 'Legal identity + claim evidence', source: 'R19,VOL2-B17', states: 'default, returning-cta', flow: 'TRUST', notes: 'Use ITS FAISHA; do not use ®.', sourceRow: 6 },
  { seq: 6, baseId: 'FAI-SCR-006', group: 'A — Global, Public & Trust', area: 'ABOUT', screen: 'FOUNDER', titleId: 'Kisah Founder', titleEn: 'Founder Story', route: '/about/founder', scope: 'R1/P0', gate: 'Founder portrait/copy approval', source: 'R19,VOL2-B17', states: 'summary, expanded, media-error', flow: 'TRUST', notes: 'Long-form expand; portrait/quote/timeline require alt text.', sourceRow: 7 },
  { seq: 7, baseId: 'FAI-SCR-007', group: 'A — Global, Public & Trust', area: 'SUPPORT', screen: 'LANDING', titleId: 'Hubungi & Dukungan', titleEn: 'Contact & Support', route: '/contact', scope: 'R1/P0', gate: 'Support owner + channel/SLA approval', source: 'R20,VOL2-B18', states: 'default, authenticated-prefill, loading', flow: 'SUPPORT', notes: 'Channel shortcuts, FAQ, response expectation.', sourceRow: 8 },
  { seq: 8, baseId: 'FAI-SCR-008', group: 'A — Global, Public & Trust', area: 'SUPPORT', screen: 'FORM', titleId: 'Form Kontak & Partnership', titleEn: 'Contact & Partnership Form', route: '/contact/form', scope: 'R1/P0', gate: 'Routing taxonomy + privacy approval', source: 'R20,VOL2-B18', states: 'default, conditional-fields, validation-error, submitting', flow: 'SUPPORT', notes: 'Order support asks order ID only after authenticated/verified context.', sourceRow: 9 },
  { seq: 9, baseId: 'FAI-SCR-009', group: 'A — Global, Public & Trust', area: 'SUPPORT', screen: 'SUCCESS', titleId: 'Konfirmasi Tiket Dukungan', titleEn: 'Support Ticket Confirmation', route: '/contact/success', scope: 'R1/P0', gate: 'Ticket/reference integration', source: 'VOL2-B18', states: 'success, email-pending, recovery', flow: 'SUPPORT', notes: 'Display ticket/reference and next step.', sourceRow: 10 },
  { seq: 10, baseId: 'FAI-SCR-010', group: 'A — Global, Public & Trust', area: 'FAQ', screen: 'LANDING', titleId: 'Pertanyaan Umum', titleEn: 'Frequently Asked Questions', route: '/faq', scope: 'R1/P0', gate: 'Content owner approval', source: 'R20,R04,VOL2-B18/B26', states: 'default, search, accordion-open, no-result', flow: 'TRUST,COMMERCE', notes: 'Separate product, shipping, assessment, account categories.', sourceRow: 11 },
  { seq: 11, baseId: 'FAI-SCR-011', group: 'A — Global, Public & Trust', area: 'COMMUNITY', screen: 'LITE', titleId: 'Beautiful Soul Community Lite', titleEn: 'Beautiful Soul Community Lite', route: '/community', scope: 'R1/LITE', gate: 'Moderation/ops readiness + active destination', source: 'R15,VOL2-B33', states: 'visitor, returning-member, event-empty', flow: 'RELATIONSHIP', notes: 'R1 landing only; full internal feed remains future scope.', sourceRow: 12 },
  { seq: 12, baseId: 'FAI-SCR-012', group: 'A — Global, Public & Trust', area: 'JOURNAL', screen: 'LANDING', titleId: 'Beautiful Soul Journal', titleEn: 'Beautiful Soul Journal', route: '/journal', scope: 'R1/LITE', gate: 'Content model + SEO approval', source: 'R16,VOL2-B35', states: 'default, category-filtered, empty', flow: 'RELATIONSHIP', notes: 'Public editorial content; clearly separate from private journal.', sourceRow: 13 },
  { seq: 13, baseId: 'FAI-SCR-013', group: 'A — Global, Public & Trust', area: 'JOURNAL', screen: 'ARTICLE', titleId: 'Artikel Journal', titleEn: 'Journal Article', route: '/journal/[slug]', scope: 'R1/LITE', gate: 'Content/claim + SEO approval', source: 'R16,VOL2-B35', states: 'default, long-form, related-content-empty', flow: 'RELATIONSHIP', notes: 'Readable 65–75 character line length.', sourceRow: 14 },
  { seq: 14, baseId: 'FAI-SCR-014', group: 'A — Global, Public & Trust', area: 'SEARCH', screen: 'RESULTS', titleId: 'Hasil Pencarian', titleEn: 'Search Results', route: '/search', scope: 'R1/P0', gate: 'Search index/taxonomy ready', source: 'R14,VOL2-B12', states: 'default, loading, filters-applied, partial-result', flow: 'DISCOVERY', notes: 'Return relevant products and content with transparent filters.', sourceRow: 15 },
  { seq: 15, baseId: 'FAI-SCR-015', group: 'A — Global, Public & Trust', area: 'SEARCH', screen: 'NORESULT', titleId: 'Pencarian Tanpa Hasil', titleEn: 'Search No Results', route: '/search', scope: 'R1/P0', gate: 'Search recovery copy approval', source: 'VOL2-B12/B13', states: 'zero-result, typo-suggestion, category-recovery', flow: 'DISCOVERY', notes: 'Always provide recovery paths.', sourceRow: 16 },
  { seq: 16, baseId: 'FAI-SCR-016', group: 'A — Global, Public & Trust', area: 'LEGAL', screen: 'PRIVACY', titleId: 'Privasi, Consent & Preference', titleEn: 'Privacy, Consent & Preferences', route: '/privacy', scope: 'R1/P0', gate: 'Gate E privacy/legal approval', source: 'VOL2-B13,GA-A05/A06', states: 'default, consent-accept, consent-reject, preference-saved', flow: 'TRUST', notes: 'Reject must be as easy as accept; no prechecked marketing.', sourceRow: 17 },
  { seq: 17, baseId: 'FAI-SCR-017', group: 'A — Global, Public & Trust', area: 'LEGAL', screen: 'TERMS', titleId: 'Syarat & Ketentuan', titleEn: 'Terms & Conditions', route: '/terms', scope: 'R1/P0', gate: 'Legal approval', source: 'MASTER-R1', states: 'default, updated-version', flow: 'TRUST,COMMERCE', notes: 'Version/effective date visible.', sourceRow: 18 },
  { seq: 18, baseId: 'FAI-SCR-018', group: 'A — Global, Public & Trust', area: 'LEGAL', screen: 'SHIPPING', titleId: 'Pengiriman, Retur & Refund', titleEn: 'Shipping, Returns & Refunds', route: '/shipping-returns', scope: 'R1/P0-CONDITIONAL', gate: 'Vendor + operations + finance approval', source: 'R04,R20,VOL2-B26/B27', states: 'default, policy-updated, unavailable-region', flow: 'COMMERCE', notes: 'Do not publish unsupported estimates.', sourceRow: 19 },
  // Group B: Commerce & Rituals
  { seq: 19, baseId: 'FAI-SCR-019', group: 'B — Commerce & Rituals', area: 'SHOP', screen: 'ALL', titleId: 'Semua Produk', titleEn: 'Shop All', route: '/shop', scope: 'R1/P0', gate: 'Product Master metadata + visual QA', source: 'R11,R14,VOL2-B20', states: 'default, loading, filters, sort, pagination', flow: 'COMMERCE', notes: 'Purchasable CTA remains conditional until Product Master/vendor gates close.', sourceRow: 20 },
  { seq: 20, baseId: 'FAI-SCR-020', group: 'B — Commerce & Rituals', area: 'SHOP', screen: 'FILTER', titleId: 'Filter & Urutkan', titleEn: 'Filter & Sort', route: '/shop', scope: 'R1/P0', gate: 'Taxonomy/index ready', source: 'R14,VOL2-B12/B20', states: 'drawer-open, chips-applied, reset, no-result', flow: 'COMMERCE', notes: 'Mobile bottom sheet; apply/result count always visible.', sourceRow: 21 },
  { seq: 21, baseId: 'FAI-SCR-021', group: 'B — Commerce & Rituals', area: 'RITUAL', screen: 'OVERVIEW', titleId: 'Semua Ritual', titleEn: 'All Rituals', route: '/rituals', scope: 'R1/P0', gate: 'Ritual taxonomy + content approval', source: 'R01,R22,VOL2-B14/B21', states: 'default, recommended, coming-soon', flow: 'COMMERCE,MAIN', notes: 'Morning, Focus, Home, Sleep, Soul.', sourceRow: 22 },
  { seq: 22, baseId: 'FAI-SCR-022', group: 'B — Commerce & Rituals', area: 'RITUAL', screen: 'MORNING', titleId: 'Morning Ritual', titleEn: 'Morning Ritual', route: '/rituals/morning', scope: 'R1/P0', gate: 'Product availability + claims approval', source: 'R06,VOL2-B21/B22', states: 'default, routine-selected, bundle-summary, unavailable-item', flow: 'COMMERCE', notes: 'Routine remains usable without buying entire set.', sourceRow: 23 },
  { seq: 23, baseId: 'FAI-SCR-023', group: 'B — Commerce & Rituals', area: 'RITUAL', screen: 'FOCUS', titleId: 'Focus Ritual', titleEn: 'Focus Ritual', route: '/rituals/focus', scope: 'R1/P0-CONDITIONAL', gate: 'Product availability + claims approval', source: 'R07,VOL2-B21/B22', states: 'default, routine-selected, coming-soon', flow: 'COMMERCE', notes: 'May remain coming soon until product data final.', sourceRow: 24 },
  { seq: 24, baseId: 'FAI-SCR-024', group: 'B — Commerce & Rituals', area: 'RITUAL', screen: 'HOME', titleId: 'Home Ritual', titleEn: 'Home Ritual', route: '/rituals/home', scope: 'R1/EXTENDED', gate: 'Product availability + safety copy', source: 'R03,VOL2-B21/B23', states: 'default, room-selected, safety-open', flow: 'COMMERCE', notes: 'Candle/diffuser/textile safety required.', sourceRow: 25 },
  { seq: 25, baseId: 'FAI-SCR-025', group: 'B — Commerce & Rituals', area: 'RITUAL', screen: 'SLEEP', titleId: 'Sleep Ritual', titleEn: 'Sleep Ritual', route: '/rituals/sleep', scope: 'R1/EXTENDED', gate: 'Product availability + safety/claims approval', source: 'R02,R10,VOL2-B21/B23', states: 'default, sleep-variant, safety-open', flow: 'COMMERCE', notes: 'Non-medical sleep language only.', sourceRow: 26 },
  { seq: 26, baseId: 'FAI-SCR-026', group: 'B — Commerce & Rituals', area: 'RITUAL', screen: 'SOUL', titleId: 'Soul Ritual', titleEn: 'Soul Ritual', route: '/rituals/soul', scope: 'R1/EXTENDED', gate: 'Ingredient/content approval', source: 'R08,R12,VOL2-B21/B24', states: 'default, moment-selected, prompt-save', flow: 'COMMERCE,RELATIONSHIP', notes: 'Content remains valuable without purchase.', sourceRow: 27 },
  { seq: 27, baseId: 'FAI-SCR-027', group: 'B — Commerce & Rituals', area: 'SIGNATURE', screen: 'COLLECTION', titleId: 'Davina Signature Collection', titleEn: 'Davina Signature Collection', route: '/davina-signature', scope: 'R1/P0', gate: 'Six musk + product mapping + compliance', source: 'R09,VOL2-B25', states: 'anonymous, assessed, format-selected, crystal-info-open', flow: 'COMMERCE,ASSESSMENT', notes: 'Six directions: Amber, Vanilla, Terra, Cashmere, Sea Salt, Vetiver.', sourceRow: 28 },
  { seq: 28, baseId: 'FAI-SCR-028', group: 'B — Commerce & Rituals', area: 'PDP', screen: 'SIMPLE', titleId: 'Detail Produk Sederhana', titleEn: 'Simple Product Detail', route: '/product/[slug]', scope: 'R1/P0-CONDITIONAL', gate: 'Full Product Master + vendor gates', source: 'R04,VOL2-B26', states: 'default, gallery, qty-changed, sticky-cta', flow: 'COMMERCE', notes: 'No enabled purchase until required product data/approval is complete.', sourceRow: 29 },
  { seq: 29, baseId: 'FAI-SCR-029', group: 'B — Commerce & Rituals', area: 'PDP', screen: 'VARIANT', titleId: 'Detail Produk Varian', titleEn: 'Variant Product Detail', route: '/product/[slug]', scope: 'R1/P0-CONDITIONAL', gate: 'Variant/SKU/stock mapping', source: 'R04,R09,VOL2-B26', states: 'default, option-missing, option-valid, variant-unavailable', flow: 'COMMERCE', notes: 'Add-to-cart disabled until required options valid.', sourceRow: 30 },
  { seq: 30, baseId: 'FAI-SCR-030', group: 'B — Commerce & Rituals', area: 'PDP', screen: 'RECOMMENDED', titleId: 'Produk yang Direkomendasikan', titleEn: 'Recommended Product Detail', route: '/product/[slug]?match=1', scope: 'R1/P0-CONDITIONAL', gate: 'Assessment mapping + stock-aware alternative', source: 'R13,VOL2-B25/B26', states: 'recommended, explanation-open, alternative-shown', flow: 'MAIN,COMMERCE', notes: 'Generic view remains complete; recommendation is explainable.', sourceRow: 31 },
  { seq: 31, baseId: 'FAI-SCR-031', group: 'B — Commerce & Rituals', area: 'PDP', screen: 'PREORDER', titleId: 'Status Pre-Order', titleEn: 'Pre-Order Product State', route: '/product/[slug]', scope: 'R1/P0-CONDITIONAL', gate: 'PO timeline + operations approval', source: 'VOL2-B20/B26', states: 'preorder, acknowledgement-unchecked, acknowledgement-checked', flow: 'COMMERCE', notes: 'Timeline acknowledgement required before add-to-cart.', sourceRow: 32 },
  { seq: 32, baseId: 'FAI-SCR-032', group: 'B — Commerce & Rituals', area: 'PDP', screen: 'OUTOFSTOCK', titleId: 'Stok Habis & Alternatif', titleEn: 'Out of Stock & Alternatives', route: '/product/[slug]', scope: 'R1/P0', gate: 'Inventory source + alternative rules', source: 'VOL2-B20/B26', states: 'out-of-stock, notify-optin, alternative-available', flow: 'COMMERCE', notes: 'Never show unavailable product as ready stock.', sourceRow: 33 },
  { seq: 33, baseId: 'FAI-SCR-033', group: 'B — Commerce & Rituals', area: 'BUNDLE', screen: 'COMPOSER', titleId: 'Penyusun Ritual Set', titleEn: 'Ritual Set Composer', route: '/bundle/[slug]', scope: 'R1/EXTENDED', gate: 'Bundle product rules + finance approval', source: 'R02,R03,R06,R07,VOL2-B26', states: 'default, selection-incomplete, summary, invalid-combination', flow: 'COMMERCE', notes: 'Summary, stock and price update after every change.', sourceRow: 34 },
  { seq: 34, baseId: 'FAI-SCR-034', group: 'B — Commerce & Rituals', area: 'CART', screen: 'DEFAULT', titleId: 'Keranjang', titleEn: 'Cart', route: '/cart', scope: 'R1/P0-CONDITIONAL', gate: 'Commerce adapter/sandbox ready', source: 'VOL2-B27', states: 'default, quantity-updated, coupon-error, recalculating', flow: 'COMMERCE', notes: 'Preserve cart across payment failure.', sourceRow: 35 },
  { seq: 35, baseId: 'FAI-SCR-035', group: 'B — Commerce & Rituals', area: 'CART', screen: 'EMPTY', titleId: 'Keranjang Kosong', titleEn: 'Empty Cart', route: '/cart', scope: 'R1/P0', gate: 'Recovery content ready', source: 'VOL2-B27/B13', states: 'empty, recommended-products, session-expired', flow: 'COMMERCE', notes: 'Offer ritual/shop recovery, not a dead end.', sourceRow: 36 },
  { seq: 36, baseId: 'FAI-SCR-036', group: 'B — Commerce & Rituals', area: 'CHECKOUT', screen: 'SHIPPING', titleId: 'Checkout — Kontak & Pengiriman', titleEn: 'Checkout — Contact & Shipping', route: '/checkout', scope: 'R1/P0-CONDITIONAL', gate: 'Shipping/vendor/privacy approval', source: 'VOL2-B27', states: 'guest, authenticated-prefill, address-error, shipping-loading', flow: 'COMMERCE', notes: 'Single-column on mobile; no hidden fees.', sourceRow: 37 },
  { seq: 37, baseId: 'FAI-SCR-037', group: 'B — Commerce & Rituals', area: 'CHECKOUT', screen: 'PAYMENT', titleId: 'Checkout — Pembayaran', titleEn: 'Checkout — Payment', route: '/checkout/payment', scope: 'R1/P0-CONDITIONAL', gate: 'Payment vendor + sandbox approval', source: 'VOL2-B27', states: 'method-default, pending, invalid, unavailable', flow: 'COMMERCE', notes: 'Marketing opt-in separate from transaction.', sourceRow: 38 },
  { seq: 38, baseId: 'FAI-SCR-038', group: 'B — Commerce & Rituals', area: 'CHECKOUT', screen: 'REVIEW', titleId: 'Checkout — Tinjau Pesanan', titleEn: 'Checkout — Review Order', route: '/checkout/review', scope: 'R1/P0-CONDITIONAL', gate: 'Final total + policies approved', source: 'VOL2-B27', states: 'default, terms-unchecked, total-updated', flow: 'COMMERCE', notes: 'Total must reconcile with cart and payment.', sourceRow: 39 },
  { seq: 39, baseId: 'FAI-SCR-039', group: 'B — Commerce & Rituals', area: 'PAYMENT', screen: 'PROCESSING', titleId: 'Pembayaran Diproses', titleEn: 'Payment Processing', route: '/payment/processing', scope: 'R1/P0-CONDITIONAL', gate: 'Gateway callback behavior defined', source: 'VOL2-B27', states: 'processing, delayed, duplicate-callback-safe', flow: 'COMMERCE', notes: 'Do not allow duplicate submission.', sourceRow: 40 },
  { seq: 40, baseId: 'FAI-SCR-040', group: 'B — Commerce & Rituals', area: 'PAYMENT', screen: 'FAILURE', titleId: 'Pembayaran Gagal', titleEn: 'Payment Failure', route: '/payment/failure', scope: 'R1/P0-CONDITIONAL', gate: 'Recovery/retry policy approved', source: 'VOL2-B27', states: 'failed, pending, retrying, alternate-method', flow: 'COMMERCE', notes: 'Preserve cart and provide safe retry.', sourceRow: 41 },
  { seq: 41, baseId: 'FAI-SCR-041', group: 'B — Commerce & Rituals', area: 'ORDER', screen: 'THANKYOU', titleId: 'Terima Kasih, Beautiful Soul', titleEn: 'Thank You, Beautiful Soul', route: '/order/thank-you', scope: 'R1/P0-CONDITIONAL', gate: 'Order confirmation + email integration', source: 'VOL2-B27', states: 'paid, pending, COD/other, email-delayed', flow: 'COMMERCE,RETURNING', notes: 'CTA: View Order / Begin Your Ritual.', sourceRow: 42 },
  { seq: 42, baseId: 'FAI-SCR-042', group: 'B — Commerce & Rituals', area: 'ORDER', screen: 'TRACKING', titleId: 'Lacak Pesanan', titleEn: 'Order Tracking', route: '/account/orders/[id]', scope: 'R1/P0-CONDITIONAL', gate: 'Shipping status integration', source: 'VOL2-B27', states: 'confirmed, processing, shipped, delivered, exception', flow: 'COMMERCE,RETURNING', notes: 'Clear status, estimate and support path.', sourceRow: 43 },
  { seq: 43, baseId: 'FAI-SCR-043', group: 'B — Commerce & Rituals', area: 'ORDER', screen: 'NEXTRITUAL', titleId: 'Ritual Setelah Pembelian', titleEn: 'Post-Purchase Next Ritual', route: '/order/[id]/next-ritual', scope: 'R1/P0', gate: 'Purchase-to-ritual mapping', source: 'VOL2-B27', states: 'default, unlocked, content-unavailable', flow: 'RETURNING', notes: 'Purchase is start of the ritual relationship.', sourceRow: 44 },
  // Group C: Assessment & Personalized Result
  { seq: 44, baseId: 'FAI-SCR-044', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'LANDING', titleId: 'Landing Personal Fragrance Analysis', titleEn: 'Personal Fragrance Analysis Landing', route: '/analysis', scope: 'R1/P0', gate: 'Gate B logic/copy + privacy approval', source: 'R05,VOL2-B28', states: 'new, returning, campaign-intro, reduced-motion', flow: 'MAIN,ASSESSMENT', notes: 'No account required to start.', sourceRow: 45 },
  { seq: 45, baseId: 'FAI-SCR-045', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'HOWITWORKS', titleId: 'Cara Kerja & Privasi Assessment', titleEn: 'Assessment How It Works & Privacy', route: '/analysis#how-it-works', scope: 'R1/P0', gate: 'Gate B ethics/disclaimer approval', source: 'R05,VOL2-B28', states: 'collapsed, expanded, privacy-open', flow: 'ASSESSMENT', notes: 'Explain duration, data purpose, short result and full access.', sourceRow: 46 },
  { seq: 46, baseId: 'FAI-SCR-046', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'RESUME', titleId: 'Lanjutkan Assessment', titleEn: 'Resume Assessment', route: '/analysis/resume', scope: 'R1/P0', gate: 'Autosave/session contract ready', source: 'R05,VOL2-B28/B29', states: 'resume-found, expired, conflict, no-session', flow: 'ASSESSMENT', notes: 'Never lose valid answers without explanation.', sourceRow: 47 },
  { seq: 47, baseId: 'FAI-SCR-047', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q1', titleId: 'Pertanyaan 1 — Identitas', titleEn: 'Question 1 — Identity', route: '/analysis/1', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Identity.', sourceRow: 48 },
  { seq: 48, baseId: 'FAI-SCR-048', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q2', titleId: 'Pertanyaan 2 — Emosi', titleEn: 'Question 2 — Emotion', route: '/analysis/2', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Emotion.', sourceRow: 49 },
  { seq: 49, baseId: 'FAI-SCR-049', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q3', titleId: 'Pertanyaan 3 — Pola Pikir', titleEn: 'Question 3 — Mindset', route: '/analysis/3', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Mindset.', sourceRow: 50 },
  { seq: 50, baseId: 'FAI-SCR-050', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q4', titleId: 'Pertanyaan 4 — Energi', titleEn: 'Question 4 — Energy', route: '/analysis/4', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Energy.', sourceRow: 51 },
  { seq: 51, baseId: 'FAI-SCR-051', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q5', titleId: 'Pertanyaan 5 — Perilaku', titleEn: 'Question 5 — Behavior', route: '/analysis/5', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Behavior.', sourceRow: 52 },
  { seq: 52, baseId: 'FAI-SCR-052', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q6', titleId: 'Pertanyaan 6 — Kebutuhan', titleEn: 'Question 6 — Need', route: '/analysis/6', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Emotional Need.', sourceRow: 53 },
  { seq: 53, baseId: 'FAI-SCR-053', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'Q7', titleId: 'Pertanyaan 7 — Visi', titleEn: 'Question 7 — Vision', route: '/analysis/7', scope: 'R1/P0', gate: 'Gate B question/answer contract locked', source: 'VOL2-B29', states: 'unanswered, selected, focus, autosaving, validation-error', flow: 'ASSESSMENT', notes: 'One question per viewport; layer: Vision.', sourceRow: 54 },
  { seq: 54, baseId: 'FAI-SCR-054', group: 'C — Assessment & Personalized Result', area: 'ASSESS', screen: 'PROCESSING', titleId: 'Memproses Hasil', titleEn: 'Processing Result', route: '/analysis/processing', scope: 'R1/P0', gate: 'Deterministic scoring endpoint ready', source: 'VOL2-B30', states: 'processing, ready-early, timeout, retry', flow: 'ASSESSMENT', notes: '2–5 second expected transition; skippable when ready.', sourceRow: 55 },
  { seq: 55, baseId: 'FAI-SCR-055', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'SHORT', titleId: 'Hasil Singkat', titleEn: 'Short Result', route: '/analysis/result/preview', scope: 'R1/P0', gate: 'Gate B mapping + approved phrase library', source: 'R13,VOL2-B30', states: 'default, partial-data, fallback-copy', flow: 'ASSESSMENT', notes: 'Must appear before registration; never paywall short result.', sourceRow: 56 },
  { seq: 56, baseId: 'FAI-SCR-056', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'SAVE', titleId: 'Simpan Hasil / Daftar', titleEn: 'Save Result / Register Prompt', route: '/analysis/result/save', scope: 'R1/P0', gate: 'Auth/result-token contract ready', source: 'VOL2-B30', states: 'default, login-existing, register-new, failure-preserved', flow: 'ASSESSMENT', notes: 'Registration failure must not remove result.', sourceRow: 57 },
  { seq: 57, baseId: 'FAI-SCR-057', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'SUMMARY', titleId: 'Ringkasan Hasil Lengkap', titleEn: 'Full Result Summary', route: '/my-result/[id]', scope: 'R1/P0', gate: 'Entitlement + mapping + AI safety pass', source: 'R13,VOL2-B31', states: 'eligible, locked, fallback, stock-warning', flow: 'ASSESSMENT,RETURNING', notes: 'Summary first; product CTA after insight.', sourceRow: 58 },
  { seq: 58, baseId: 'FAI-SCR-058', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'ARCHETYPE', titleId: 'Detail Aroma Archetype', titleEn: 'Aroma Archetype Detail', route: '/my-result/[id]#archetype', scope: 'R1/P0', gate: '12 archetype handbook approved', source: 'R13,VOL2-B31', states: 'default, explanation-open', flow: 'ASSESSMENT', notes: 'Non-diagnostic language.', sourceRow: 59 },
  { seq: 59, baseId: 'FAI-SCR-059', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'SCENTPROFILE', titleId: 'Personal Scent Profile', titleEn: 'Personal Scent Profile', route: '/my-result/[id]#scent-profile', scope: 'R1/P0', gate: 'Six musk mapping approved', source: 'R13,VOL2-B31', states: 'default, preference-edit, retake-info', flow: 'ASSESSMENT', notes: 'Do not expose raw internal scores.', sourceRow: 60 },
  { seq: 60, baseId: 'FAI-SCR-060', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'CRYSTAL', titleId: 'Crystal Trinity', titleEn: 'Crystal Trinity', route: '/my-result/[id]#crystal', scope: 'R1/P0', gate: 'Crystal mapping + claims review', source: 'R13,VOL2-B31', states: 'default, meaning-open, disclaimer-open', flow: 'ASSESSMENT', notes: 'Symbolic ritual meaning; no certainty claims.', sourceRow: 61 },
  { seq: 61, baseId: 'FAI-SCR-061', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'RITUAL', titleId: 'Rekomendasi Ritual Personal', titleEn: 'Personal Ritual Recommendation', route: '/my-result/[id]#ritual', scope: 'R1/P0', gate: 'Ritual mapping + content approval', source: 'R13,VOL2-B31', states: 'default, saved, unavailable-product', flow: 'ASSESSMENT,RETURNING', notes: 'One actionable ritual.', sourceRow: 62 },
  { seq: 62, baseId: 'FAI-SCR-062', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'PRODUCT', titleId: 'Rekomendasi Produk', titleEn: 'Product Match', route: '/my-result/[id]#product', scope: 'R1/P0-CONDITIONAL', gate: 'Product Master + stock-aware mapping', source: 'R13,VOL2-B31', states: 'matched, alternative, no-stock, not-purchasable', flow: 'ASSESSMENT,COMMERCE', notes: 'AI cannot override deterministic product match.', sourceRow: 63 },
  { seq: 63, baseId: 'FAI-SCR-063', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'WHY', titleId: 'Mengapa Ini Direkomendasikan', titleEn: 'Why This Recommendation', route: '/my-result/[id]#why', scope: 'R1/P0', gate: 'Reason codes + approved phrase library', source: 'R13,VOL2-B31', states: 'collapsed, expanded, fallback', flow: 'ASSESSMENT', notes: 'Explain signals in plain language without raw weights.', sourceRow: 64 },
  { seq: 64, baseId: 'FAI-SCR-064', group: 'C — Assessment & Personalized Result', area: 'RESULT', screen: 'SHARE', titleId: 'Pratinjau Bagikan Hasil', titleEn: 'Share Result Preview', route: '/my-result/[id]/share', scope: 'R1/EXTENDED', gate: 'Privacy/share policy + renderer', source: 'VOL2-B32', states: 'default-safe, fields-selected, link-created, revoked', flow: 'ASSESSMENT,REFERRAL', notes: 'Default includes only archetype + approved descriptors.', sourceRow: 65 },
  // Group D: Identity, Dashboard & Relationship
  { seq: 65, baseId: 'FAI-SCR-065', group: 'D — Identity, Dashboard & Relationship', area: 'AUTH', screen: 'LOGIN', titleId: 'Masuk', titleEn: 'Login', route: '/login', scope: 'R1/P0', gate: 'Identity/session/security contract', source: 'R21,VOL2-B38', states: 'default, submitting, invalid, throttled, locked', flow: 'AUTH', notes: 'Accessible recovery and support path.', sourceRow: 66 },
  { seq: 66, baseId: 'FAI-SCR-066', group: 'D — Identity, Dashboard & Relationship', area: 'AUTH', screen: 'REGISTER', titleId: 'Daftar', titleEn: 'Register', route: '/register', scope: 'R1/P0', gate: 'Consent + identity contract', source: 'VOL2-B30/B38', states: 'default, result-linked, validation-error, submitting', flow: 'AUTH,ASSESSMENT', notes: 'Minimal data; separate marketing consent.', sourceRow: 67 },
  { seq: 67, baseId: 'FAI-SCR-067', group: 'D — Identity, Dashboard & Relationship', area: 'AUTH', screen: 'FORGOT', titleId: 'Lupa Kata Sandi', titleEn: 'Forgot Password', route: '/forgot-password', scope: 'R1/P0', gate: 'Email provider/sandbox', source: 'VOL2-B38', states: 'default, unknown-email-safe, submitted', flow: 'AUTH', notes: 'Avoid account enumeration.', sourceRow: 68 },
  { seq: 68, baseId: 'FAI-SCR-068', group: 'D — Identity, Dashboard & Relationship', area: 'AUTH', screen: 'RESET', titleId: 'Atur Ulang Kata Sandi', titleEn: 'Reset Password', route: '/reset-password', scope: 'R1/P0', gate: 'Token/session contract', source: 'VOL2-B38', states: 'valid-token, expired, weak-password, success', flow: 'AUTH', notes: 'Password requirements contextual.', sourceRow: 69 },
  { seq: 69, baseId: 'FAI-SCR-069', group: 'D — Identity, Dashboard & Relationship', area: 'AUTH', screen: 'VERIFY', titleId: 'Verifikasi Email', titleEn: 'Email Verification', route: '/verify-email', scope: 'R1/P0', gate: 'Verification delivery contract', source: 'VOL2-B38', states: 'pending, verified, expired, resent', flow: 'AUTH', notes: 'Support resend and result linking.', sourceRow: 70 },
  { seq: 70, baseId: 'FAI-SCR-070', group: 'D — Identity, Dashboard & Relationship', area: 'AUTH', screen: 'MERGE', titleId: 'Akun Duplikat / Gabungkan', titleEn: 'Duplicate Account / Merge', route: '/account/merge', scope: 'R1/P0', gate: 'Ownership verification + merge SOP', source: 'VOL3-B07', states: 'detected, verify-owner, merge-success, manual-support', flow: 'AUTH', notes: 'Never merge without verified ownership.', sourceRow: 71 },
  { seq: 71, baseId: 'FAI-SCR-071', group: 'D — Identity, Dashboard & Relationship', area: 'DASH', screen: 'HOME', titleId: 'Dashboard Lite', titleEn: 'Dashboard Lite', route: '/my-journey', scope: 'R1/P0', gate: 'Result/order/entitlement data contracts', source: 'R21,R25,VOL2-B38', states: 'new-user, saved-result, customer, locked-module, loading', flow: 'RETURNING', notes: 'P0: welcome, profile, recommendation, Crystal, orders, one ritual, settings.', sourceRow: 72 },
  { seq: 72, baseId: 'FAI-SCR-072', group: 'D — Identity, Dashboard & Relationship', area: 'DASH', screen: 'RESULT', titleId: 'Hasil Saya', titleEn: 'My Result', route: '/my-journey/result', scope: 'R1/P0', gate: 'Saved result access control', source: 'R21,R13,VOL2-B38', states: 'available, locked, expired, retake-eligible', flow: 'RETURNING', notes: 'No sensitive data in public cache.', sourceRow: 73 },
  { seq: 73, baseId: 'FAI-SCR-073', group: 'D — Identity, Dashboard & Relationship', area: 'DASH', screen: 'RITUAL', titleId: 'Ritual Saya', titleEn: 'My Ritual', route: '/my-journey/ritual', scope: 'R1/P0', gate: 'Ritual mapping/content ready', source: 'R21,R25,VOL2-B38', states: 'today, saved, completed, unavailable', flow: 'RETURNING', notes: 'Completion can be undone where applicable.', sourceRow: 74 },
  { seq: 74, baseId: 'FAI-SCR-074', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'ORDERS', titleId: 'Daftar Pesanan', titleEn: 'Orders List', route: '/account/orders', scope: 'R1/P0', gate: 'Order API/access control', source: 'R21,VOL2-B40', states: 'loading, empty, active, completed, failed', flow: 'RETURNING,COMMERCE', notes: 'Self-service status and support.', sourceRow: 75 },
  { seq: 75, baseId: 'FAI-SCR-075', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'ORDERDETAIL', titleId: 'Detail Pesanan', titleEn: 'Order Detail', route: '/account/orders/[id]', scope: 'R1/P0', gate: 'Order/shipping access control', source: 'VOL2-B40', states: 'paid, pending, shipped, refunded, exception', flow: 'RETURNING,COMMERCE', notes: 'Reorder only when item is available.', sourceRow: 76 },
  { seq: 76, baseId: 'FAI-SCR-076', group: 'D — Identity, Dashboard & Relationship', area: 'REWARDS', screen: 'LEDGER', titleId: 'Ledger Soul Petals', titleEn: 'Soul Petals Ledger', route: '/account/rewards', scope: 'R1/EXTENDED', gate: 'Finance final + auditable ledger', source: 'R21,R24,VOL2-B37/B40', states: 'disabled, ledger-only, empty, earned, reversed', flow: 'RETURNING', notes: 'R1 ledger-only; no redemption/value/tier public until approval.', sourceRow: 77 },
  { seq: 77, baseId: 'FAI-SCR-077', group: 'D — Identity, Dashboard & Relationship', area: 'REWARDS', screen: 'STORY', titleId: 'Beautiful Soul Rewards Overview', titleEn: 'Beautiful Soul Rewards Overview', route: '/rewards', scope: 'FUTURE/REFERENCE', gate: 'Finance + reward policy + change request', source: 'R23,R24,VOL2-B37', states: 'reference, future-tier, disabled-cta', flow: 'REFERENCE', notes: 'Design now; not Ready for Development. Soul Petals nomenclature only.', sourceRow: 78 },
  { seq: 78, baseId: 'FAI-SCR-078', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'WISHLIST', titleId: 'Wishlist', titleEn: 'Wishlist', route: '/account/wishlist', scope: 'R1/P1', gate: 'Stock/price opt-in behavior', source: 'R21,VOL2-B40', states: 'empty, items, out-of-stock, changed-price', flow: 'RETURNING', notes: 'Notifications only with opt-in.', sourceRow: 79 },
  { seq: 79, baseId: 'FAI-SCR-079', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'PROFILE', titleId: 'Profil & Alamat', titleEn: 'Profile & Addresses', route: '/account/profile', scope: 'R1/P0', gate: 'Identity/profile contract', source: 'R21,R25,VOL2-B40', states: 'view, edit, validation-error, saved', flow: 'RETURNING', notes: 'Email primary ID; phone stored separately.', sourceRow: 80 },
  { seq: 80, baseId: 'FAI-SCR-080', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'NOTIFICATIONS', titleId: 'Preferensi Notifikasi', titleEn: 'Notification Preferences', route: '/account/notifications', scope: 'R1/P0', gate: 'Email/WA consent rules', source: 'VOL2-B13/B40', states: 'default, partial-optin, saved, delivery-warning', flow: 'RETURNING', notes: 'Email and WA controlled independently.', sourceRow: 81 },
  { seq: 81, baseId: 'FAI-SCR-081', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'PRIVACY', titleId: 'Privasi & Permintaan Data', titleEn: 'Privacy & Data Requests', route: '/account/privacy', scope: 'R1/P0', gate: 'Gate E retention/delete/export rules', source: 'VOL2-B40,GA-A05', states: 'default, export-request, delete-warning, verify, submitted', flow: 'RETURNING', notes: 'Destructive actions require explicit confirmation/re-auth.', sourceRow: 82 },
  { seq: 82, baseId: 'FAI-SCR-082', group: 'D — Identity, Dashboard & Relationship', area: 'ACCOUNT', screen: 'SECURITY', titleId: 'Keamanan & Perangkat', titleEn: 'Security & Devices', route: '/account/security', scope: 'R1/P0', gate: 'Session/device security contract', source: 'VOL2-B38/B40', states: 'sessions, revoke-confirm, password-change, MFA-future', flow: 'RETURNING', notes: 'Admin MFA may be separate; user recovery required.', sourceRow: 83 },
  { seq: 83, baseId: 'FAI-SCR-083', group: 'D — Identity, Dashboard & Relationship', area: 'COMMUNITY', screen: 'MEMBERHOME', titleId: 'Beranda Member Community', titleEn: 'Community Member Home', route: '/community/home', scope: 'FUTURE/REFERENCE', gate: 'Moderation, privacy and operations readiness', source: 'R25,VOL2-B33/B34', states: 'feed, empty, muted, report-menu', flow: 'RELATIONSHIP,REFERENCE', notes: 'Full feed deferred; design retained as future reference.', sourceRow: 84 },
  { seq: 84, baseId: 'FAI-SCR-084', group: 'D — Identity, Dashboard & Relationship', area: 'COMMUNITY', screen: 'EVENT', titleId: 'Detail Event / Deep Talk', titleEn: 'Event / Deep Talk Detail', route: '/community/events/[slug]', scope: 'R1/P1', gate: 'Host, recording, moderation, platform rules', source: 'R15,R25,VOL2-B34', states: 'upcoming, registered, live, replay, cancelled', flow: 'RELATIONSHIP', notes: 'Recording consent/timezone/platform clear.', sourceRow: 85 },
  { seq: 85, baseId: 'FAI-SCR-085', group: 'D — Identity, Dashboard & Relationship', area: 'COMMUNITY', screen: 'REGISTER', titleId: 'Daftar Community', titleEn: 'Community Registration', route: '/community/join', scope: 'R1/LITE', gate: 'Active community destination + guidelines', source: 'R15,VOL2-B33/B34', states: 'default, terms-unchecked, submitting, success', flow: 'RELATIONSHIP', notes: 'Explicit guideline/eligibility acceptance.', sourceRow: 86 },
  { seq: 86, baseId: 'FAI-SCR-086', group: 'D — Identity, Dashboard & Relationship', area: 'ACADEMY', screen: 'LANDING', titleId: 'Kursus Gratis Beautiful Soul', titleEn: 'Beautiful Soul Free Course', route: '/academy/free-course', scope: 'R1/P1', gate: 'Course content + enrollment integration', source: 'R26,VOL2-B36', states: 'visitor, enrolled, capacity-full', flow: 'RELATIONSHIP', notes: 'Capacity permitting; not a P0 launch blocker.', sourceRow: 87 },
  { seq: 87, baseId: 'FAI-SCR-087', group: 'D — Identity, Dashboard & Relationship', area: 'ACADEMY', screen: 'MODULE', titleId: 'Detail Modul Kursus', titleEn: 'Course Module Detail', route: '/academy/course/[slug]/lesson/[id]', scope: 'FUTURE/REFERENCE', gate: 'LMS/progress/accessibility readiness', source: 'R26,VOL2-B36', states: 'locked, available, in-progress, complete', flow: 'REFERENCE', notes: 'Future learning dashboard behavior.', sourceRow: 88 },
  { seq: 88, baseId: 'FAI-SCR-088', group: 'D — Identity, Dashboard & Relationship', area: 'JOURNAL', screen: 'PRIVATEHOME', titleId: 'My Journal — Beranda', titleEn: 'My Journal — Home', route: '/my-journal', scope: 'R1/P1-CONDITIONAL', gate: 'Privacy/access/autosave + no AI raw-journal processing', source: 'R27,VOL2-B35/B39', states: 'empty, today, streak, saved-draft, loading', flow: 'RELATIONSHIP', notes: 'Private by default; raw journal not sent to AI in R1.', sourceRow: 89 },
  { seq: 89, baseId: 'FAI-SCR-089', group: 'D — Identity, Dashboard & Relationship', area: 'JOURNAL', screen: 'EDITOR', titleId: 'Tulis Refleksi', titleEn: 'Write Reflection', route: '/my-journal/new', scope: 'R1/P1-CONDITIONAL', gate: 'Private storage/autosave/delete rules', source: 'R27,VOL2-B35', states: 'draft, autosaving, saved, error-recovered', flow: 'RELATIONSHIP', notes: 'No public publish by default.', sourceRow: 90 },
  { seq: 90, baseId: 'FAI-SCR-090', group: 'D — Identity, Dashboard & Relationship', area: 'JOURNAL', screen: 'HISTORY', titleId: 'Riwayat & Insight Journal', titleEn: 'Journal History & Insights', route: '/my-journal/history', scope: 'FUTURE/REFERENCE', gate: 'Privacy + analytics ethics + product decision', source: 'R27,VOL2-B39', states: 'empty, history, weekly, monthly', flow: 'REFERENCE', notes: 'No inference/AI processing from raw journal in R1.', sourceRow: 91 },
  // Group E: Internal Admin P0
  { seq: 91, baseId: 'FAI-SCR-091', group: 'E — Internal Admin P0', area: 'ADMIN', screen: 'RESULTLIST', titleId: 'Admin — Daftar Hasil Assessment', titleEn: 'Admin — Assessment Result List', route: '/admin/results', scope: 'R1/P0', gate: 'RBAC/audit + Gate B data model', source: 'MASTER-R1,PHASE1-P0', states: 'loading, empty, filtered, access-denied', flow: 'ADMIN', notes: 'No raw sensitive answers in analytics list.', sourceRow: 92 },
  { seq: 92, baseId: 'FAI-SCR-092', group: 'E — Internal Admin P0', area: 'ADMIN', screen: 'RESULTDETAIL', titleId: 'Admin — Detail Hasil Assessment', titleEn: 'Admin — Assessment Result Detail', route: '/admin/results/[id]', scope: 'R1/P0', gate: 'RBAC/audit + support workflow', source: 'MASTER-R1,PHASE1-P0', states: 'default, fallback-used, complaint-flag, access-denied', flow: 'ADMIN', notes: 'Expose only data needed for support/review.', sourceRow: 93 },
  { seq: 93, baseId: 'FAI-SCR-093', group: 'E — Internal Admin P0', area: 'ADMIN', screen: 'ORDERLIST', titleId: 'Admin — Daftar Pesanan', titleEn: 'Admin — Order List', route: '/admin/orders', scope: 'R1/P0', gate: 'RBAC + commerce adapter', source: 'MASTER-R1,PHASE1-P0', states: 'loading, empty, filtered, integration-error', flow: 'ADMIN', notes: 'Operational status and exception visibility.', sourceRow: 94 },
  { seq: 94, baseId: 'FAI-SCR-094', group: 'E — Internal Admin P0', area: 'ADMIN', screen: 'ORDERDETAIL', titleId: 'Admin — Detail Pesanan & Unlock', titleEn: 'Admin — Order & Unlock Detail', route: '/admin/orders/[id]', scope: 'R1/P0', gate: 'RBAC/audit + entitlement reconciliation', source: 'MASTER-R1,PHASE1-P0', states: 'paid, pending, unlock-success, unlock-failure, refund', flow: 'ADMIN', notes: 'Manual recovery requires actor, reason and timestamp.', sourceRow: 95 },
  // Group F: Shared System-State Frames
  { seq: 95, baseId: 'FAI-SCR-095', group: 'F — Shared System-State Frames', area: 'STATE', screen: 'LOADING', titleId: 'Library Loading & Skeleton', titleEn: 'Loading & Skeleton Library', route: 'system://loading', scope: 'R1/P0', gate: 'Component library + accessibility', source: 'VOL2-B13/B41', states: 'page, card, list, form, checkout', flow: 'SYSTEM', notes: 'Announcements and reduced-motion behavior documented.', sourceRow: 96 },
  { seq: 96, baseId: 'FAI-SCR-096', group: 'F — Shared System-State Frames', area: 'STATE', screen: 'EMPTY', titleId: 'Library Empty State', titleEn: 'Empty State Library', route: 'system://empty', scope: 'R1/P0', gate: 'Copy/action ownership', source: 'VOL2-B13/B41', states: 'generic, cart, orders, journal, search', flow: 'SYSTEM', notes: 'Each state explains situation and recovery.', sourceRow: 97 },
  { seq: 97, baseId: 'FAI-SCR-097', group: 'F — Shared System-State Frames', area: 'STATE', screen: 'ERROR', titleId: 'Library Error & Recovery', titleEn: 'Error & Recovery Library', route: 'system://error', scope: 'R1/P0', gate: 'Error taxonomy + retry contracts', source: 'VOL2-B13/B41', states: 'inline, page, network, permission, integration', flow: 'SYSTEM', notes: 'Preserve valid user input.', sourceRow: 98 },
  { seq: 98, baseId: 'FAI-SCR-098', group: 'F — Shared System-State Frames', area: 'STATE', screen: 'SUCCESS', titleId: 'Library Success State', titleEn: 'Success State Library', route: 'system://success', scope: 'R1/P0', gate: 'Next-action copy', source: 'VOL2-B13/B41', states: 'form, auth, order, preference, support', flow: 'SYSTEM', notes: 'Always include next step.', sourceRow: 99 },
  { seq: 99, baseId: 'FAI-SCR-099', group: 'F — Shared System-State Frames', area: 'STATE', screen: 'LOCKED', titleId: 'Library Locked & Gated', titleEn: 'Locked & Gated Library', route: 'system://locked', scope: 'R1/P0', gate: 'Entitlement/access matrix', source: 'VOL2-B38/B41', states: 'login-required, purchase-required, future, permission-denied', flow: 'SYSTEM', notes: 'Explain requirement without shaming.', sourceRow: 100 },
  { seq: 100, baseId: 'FAI-SCR-100', group: 'F — Shared System-State Frames', area: 'STATE', screen: 'CONSENT', titleId: 'Library Consent State', titleEn: 'Consent State Library', route: 'system://consent', scope: 'R1/P0', gate: 'Gate E approval', source: 'VOL2-B13/B41', states: 'accept, reject, granular, withdraw', flow: 'SYSTEM', notes: 'No dark patterns.', sourceRow: 101 },
  { seq: 101, baseId: 'FAI-SCR-101', group: 'F — Shared System-State Frames', area: 'UTILITY', screen: 'MODALDRAWER', titleId: 'Library Modal, Drawer & Bottom Sheet', titleEn: 'Modal, Drawer & Bottom Sheet Library', route: 'system://overlays', scope: 'R1/P0', gate: 'Keyboard/focus specification', source: 'VOL2-B10/B12/B41', states: 'open, closing, destructive-confirm, mobile-sheet', flow: 'SYSTEM', notes: 'Escape closes and returns focus.', sourceRow: 102 },
  { seq: 102, baseId: 'FAI-SCR-102', group: 'F — Shared System-State Frames', area: 'SYSTEM', screen: 'NOTFOUND', titleId: '404 & Route Recovery', titleEn: '404 & Route Recovery', route: '/404', scope: 'R1/P0', gate: 'Navigation/content approval', source: 'VOL2-B13', states: 'not-found, expired-link, unauthorized-route', flow: 'SYSTEM', notes: 'No dead end.', sourceRow: 103 },
  { seq: 103, baseId: 'FAI-SCR-103', group: 'F — Shared System-State Frames', area: 'SYSTEM', screen: 'OFFLINE', titleId: 'Offline / Maintenance', titleEn: 'Offline / Maintenance', route: '/offline', scope: 'R1/P0', gate: 'PWA/offline strategy + operations', source: 'GA-A01,PWA', states: 'offline, maintenance, stale-cache, reconnecting', flow: 'SYSTEM', notes: 'Clear data freshness and recovery.', sourceRow: 104 }
];

export const RITUAL_SUITES = [
  {
    id: 'morning',
    title: 'Morning Awakening Ritual',
    titleId: 'Ritual Kebangkitan Pagi',
    duration: '10–15 Minutes',
    layer: 'Energy & Vitality',
    pairedFragrance: 'AURA AURA Morning Mist',
    steps: [
      {
        id: 1,
        time: 'Minute 0–3',
        title: 'Hydration & Aromatic Clearing',
        titleId: 'Hidrasi & Pembersihan Aromatik',
        desc: 'Drink warm water with mineral salt. Mist 3 sprays of botanical hydrosol into palms and inhale deeply.'
      },
      {
        id: 2,
        time: 'Minute 3–8',
        title: '4-4-4-4 Box Breathing (Pranayama)',
        titleId: 'Pernapasan Kotak 4-4-4-4',
        desc: 'Inhale 4s, hold 4s, exhale 4s, hold empty 4s. Repeat for 6 cycles while listening to 528Hz bell chime.'
      },
      {
        id: 3,
        time: 'Minute 8–15',
        title: 'Three Sovereign Intentions',
        titleId: 'Tiga Niat Utama Jiwa',
        desc: 'Write 3 sovereign priorities into your tactile journal before checking notifications or emails.'
      }
    ]
  },
  {
    id: 'focus',
    title: 'Cognitive Focus & Mindset Ritual',
    titleId: 'Ritual Fokus & Kejernihan Pikiran',
    duration: '15 Minutes',
    layer: 'Mindset & Clarity',
    pairedFragrance: 'SILENT HORIZON Anointing Oil',
    steps: [
      {
        id: 1,
        time: 'Minute 0–2',
        title: 'Workspace Grounding',
        titleId: 'Penyelarasan Ruang Kerja',
        desc: 'Clear visual clutter from your desk. Roll Cypress and Hinoki oil on wrist pulse points.'
      },
      {
        id: 2,
        time: 'Minute 2–7',
        title: 'Single-Task Mindful Centering',
        titleId: 'Pemusatan Tugas Tunggal',
        desc: 'Close secondary tabs. Declare your single essential objective for the next deep-work sprint.'
      },
      {
        id: 3,
        time: 'Minute 7–15',
        title: 'Flow Entry & Stillness',
        titleId: 'Masuk ke Kondisi Mengalir',
        desc: 'Begin writing or designing with steady, unhurried cadence.'
      }
    ]
  },
  {
    id: 'home',
    title: 'Sanctuary Space & Home Ritual',
    titleId: 'Ritual Penataan Ruang Sanctuary',
    duration: '12 Minutes',
    layer: 'Behavior & Foundation',
    pairedFragrance: 'DAVINA SIGNATURE Terra Musk',
    steps: [
      {
        id: 1,
        time: 'Minute 0–3',
        title: 'Somatic Threshold Crossing',
        titleId: 'Melewati Ambang Pintu Batin',
        desc: 'Remove footwear intentionally. Wipe down entryway or altar with natural botanical cloth.'
      },
      {
        id: 2,
        time: 'Minute 3–7',
        title: 'Amber Flame Lighting',
        titleId: 'Menyalakan Api Lilin Amber',
        desc: 'Strike wooden match and kindle the heavy glass vessel. Watch the golden flame stabilize.'
      },
      {
        id: 3,
        time: 'Minute 7–12',
        title: 'Room Blessing & Scent Dispersion',
        titleId: 'Pemberkatan Ruangan',
        desc: 'Allow warm terra notes to fill the atmosphere, settling household tension.'
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Restorative Sleep & Dream Ritual',
    titleId: 'Ritual Tidur Nyenyak & Restorasi',
    duration: '20 Minutes',
    layer: 'Emotional Heart & Rest',
    pairedFragrance: 'DAVINA SIGNATURE Vanilla Musk',
    steps: [
      {
        id: 1,
        time: 'Minute 0–5',
        title: 'Digital Screen Sunset',
        titleId: 'Matahari Terbenam Digital',
        desc: 'Power off mobile devices or place in another room. Dim ambient sanctuary lamps.'
      },
      {
        id: 2,
        time: 'Minute 5–12',
        title: 'Tender Warmth Anointment',
        titleId: 'Pengurapan Kehangatan Lembut',
        desc: 'Massage Bourbon Vanilla and Cashmere oil onto solar plexus and temples.'
      },
      {
        id: 3,
        time: 'Minute 12–20',
        title: 'Gratitude Release',
        titleId: 'Pelepasan Syukur Malam',
        desc: 'Place Raw Amethyst or Moonstone on bedside. Drift into restorative sleep.'
      }
    ]
  },
  {
    id: 'soul',
    title: 'Soul Sovereignty & Full Alignment',
    titleId: 'Ritual Kedaulatan Jiwa Lengkap',
    duration: '25 Minutes',
    layer: 'Identity & Vision',
    pairedFragrance: 'SOULE PLUM No. 9',
    steps: [
      {
        id: 1,
        time: 'Minute 0–5',
        title: 'Altar Preparation & Flame Kindling',
        titleId: 'Persiapan Altar & Nyala Api',
        desc: 'Position Clear Quartz crystal point facing upward beside burning amber vessel.'
      },
      {
        id: 2,
        time: 'Minute 5–15',
        title: 'Contemplative Silence & 432Hz Sound',
        titleId: 'Keheningan Kontemplatif 432Hz',
        desc: 'Bathe in resonant singing bowl harmonics without striving or analytical thinking.'
      },
      {
        id: 3,
        time: 'Minute 15–25',
        title: 'Deep Soul Archetype Affirmation',
        titleId: 'Afirmasi Arketipe Jiwa Mendalam',
        desc: 'Reaffirm your sovereign identity: "I am the sacred author of my peace."'
      }
    ]
  }
];
