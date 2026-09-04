import { NavTab } from './types';

/**
 * Mapping NavTab → kanvas FAI-SCR (path /NNN sesuai frame-id).
 * Satu path boleh me-render tab yang sama (alias), tapi setiap tab = satu path kanonik.
 * FUTURE/REFERENCE (077, 083, 084, 086, 087, 090) tetap full-render.
 */
export const TAB_TO_PATH: Record<NavTab, string> = {
  beranda: '/001',
  journey: '/003',
  signature: '/027',
  rituals: '/021',
  'ritual-practice': '/021',
  'ritual-morning': '/022',
  'ritual-focus': '/023',
  'ritual-home': '/024',
  'ritual-sleep': '/025',
  'ritual-soul': '/026',
  journal: '/012',
  shop: '/019',
  about: '/005',
  community: '/011',
  dashboard: '/071',
  search: '/014',
  support: '/007',
  faq: '/010',
  legal: '/016',
  product: '/028',
  'product-simple': '/028',
  'product-recommended': '/030',
  'product-oos': '/032',
  'assessment-result': '/057',
  checkout: '/038',
  'next-ritual': '/043',
  assessment: '/044',
  'assessment-flow': '/047',
  auth: '/065',
  'dashboard-full': '/080',
  admin: '/091',
  'shop-filter': '/020',
  cart: '/034',
  'checkout-shipping': '/036',
  'checkout-payment': '/037',
  'payment-processing': '/039',
  'payment-failure': '/040',
  'order-thankyou': '/041',
  'order-tracking': '/042',
  'bundle-composer': '/033',
  'archetype-detail': '/058',
  'crystal-trinity': '/060',
  'why-recommended': '/063',
  'my-results': '/072',
  'my-ritual': '/073',
  'my-orders': '/074',
  'order-detail': '/075',
  'soul-petals': '/076',
  rewards: '/077',
  wishlist: '/078',
  profile: '/079',
  'community-member': '/083',
  'event-detail': '/084',
  academy: '/086',
  'academy-module': '/087',
  'journal-private': '/088',
  'journal-editor': '/089',
  'community-join': '/085',
};

/** Path → tab kanonik (alias terakhir menang, jadi urutan di atas penting). */
export const PATH_TO_TAB: Record<string, NavTab> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab as NavTab])
);

/** Frame 001..103 yang belum punya tab sendiri → dilayani komponen gabungan. */
export const EXTRA_PATHS: { path: string; tab: NavTab }[] = [
  { path: '/002', tab: 'beranda' },      // HOME/RETURNING — state isReturning
  { path: '/004', tab: 'journey' },      // JOURNEY/PYRAMID — satu screen dgn 003
  { path: '/006', tab: 'about' },        // ABOUT/FOUNDER — tab internal
  { path: '/008', tab: 'support' },      // SUPPORT/FORM — view contact
  { path: '/009', tab: 'support' },      // SUPPORT/SUCCESS — state internal
  { path: '/013', tab: 'journal' },      // JOURNAL/ARTICLE — view internal
  { path: '/015', tab: 'search' },       // SEARCH/NORESULT — state internal
  { path: '/017', tab: 'legal' },        // LEGAL/TERMS — doc internal
  { path: '/018', tab: 'legal' },        // LEGAL/SHIPPING — doc internal
  { path: '/029', tab: 'product' },      // PDP/VARIANT — satu PDP gabungan
  { path: '/031', tab: 'product' },      // PDP/PREORDER — notice DRAFT
  { path: '/035', tab: 'cart' },         // CART/EMPTY — state dari cartItems
  { path: '/045', tab: 'assessment' },   // ASSESS/HOWITWORKS — bagian landing
  { path: '/046', tab: 'assessment' },   // ASSESS/RESUME — state internal
  { path: '/048', tab: 'assessment-flow' },
  { path: '/049', tab: 'assessment-flow' },
  { path: '/050', tab: 'assessment-flow' },
  { path: '/051', tab: 'assessment-flow' },
  { path: '/052', tab: 'assessment-flow' },
  { path: '/053', tab: 'assessment-flow' },
  { path: '/054', tab: 'assessment-result' }, // PROCESSING → result screen
  { path: '/055', tab: 'assessment-result' }, // RESULT/SHORT
  { path: '/056', tab: 'assessment-result' }, // RESULT/SAVE
  { path: '/059', tab: 'assessment-result' }, // SCENTPROFILE
  { path: '/061', tab: 'assessment-result' }, // RITUAL RESULT
  { path: '/062', tab: 'assessment-result' }, // RESULT/PRODUCT
  { path: '/064', tab: 'assessment-result' }, // SHARE (EXTENDED)
  { path: '/066', tab: 'auth' },         // REGISTER — mode internal
  { path: '/067', tab: 'auth' },         // FORGOT
  { path: '/068', tab: 'auth' },         // RESET
  { path: '/069', tab: 'auth' },         // VERIFY
  { path: '/070', tab: 'auth' },         // MERGE
  { path: '/081', tab: 'dashboard-full' },
  { path: '/082', tab: 'dashboard-full' },
  { path: '/090', tab: 'journal-private' },
  { path: '/092', tab: 'admin' },
  { path: '/093', tab: 'admin' },
  { path: '/094', tab: 'admin' },
];
