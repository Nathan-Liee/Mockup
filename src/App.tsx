import React, { useState, useCallback } from 'react';
import {
  BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate,
} from 'react-router-dom';
import { NavTab, CartItem, Product, Language, LegalDoc } from './types';
import { PRODUCTS } from './data/mockData';
import { TAB_TO_PATH, PATH_TO_TAB } from './routes';
import { AppCtx, ShopFilters } from './context';
import { Layout } from './components/Layout';

// ——— Screens ———
import { HomeScreen } from './components/HomeScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { RitualsScreen } from './components/RitualsScreen';
import { RitualsOverviewScreen } from './components/RitualsOverviewScreen';
import { JournalScreen } from './components/JournalScreen';
import { ShopScreen } from './components/ShopScreen';
import { AboutScreen } from './components/AboutScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { DavinaSignatureScreen } from './components/DavinaSignatureScreen';
import { DashboardLiteScreen } from './components/DashboardLiteScreen';
import { SearchScreen } from './components/SearchScreen';
import { SupportScreen } from './components/SupportScreen';
import { LegalScreen } from './components/LegalScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CheckoutReviewScreen } from './components/CheckoutReviewScreen';
import { NextRitualScreen } from './components/NextRitualScreen';
import { AssessmentScreen } from './components/AssessmentScreen';
import { AssessmentFlowScreen } from './components/AssessmentFlowScreen';
import { AssessmentResultScreen } from './components/AssessmentResultScreen';
import { AuthScreen } from './components/AuthScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { AdminScreen } from './components/AdminScreen';
import { CartActiveScreen } from './components/CartActiveScreen';
import { CartEmptyScreen } from './components/CartEmptyScreen';
import { CheckoutShippingScreen } from './components/CheckoutShippingScreen';
import { CheckoutPaymentScreen } from './components/CheckoutPaymentScreen';
import { PaymentProcessingScreen } from './components/PaymentProcessingScreen';
import { PaymentFailureScreen } from './components/PaymentFailureScreen';
import { OrderThankYouScreen } from './components/OrderThankYouScreen';
import { OrderTrackingScreen } from './components/OrderTrackingScreen';
import { MorningRitualScreen } from './components/MorningRitualScreen';
import { FocusRitualScreen } from './components/FocusRitualScreen';
import { HomeRitualScreen } from './components/HomeRitualScreen';
import { SleepRitualScreen } from './components/SleepRitualScreen';
import { SoulRitualScreen } from './components/SoulRitualScreen';
import { ProductDetailSimpleScreen } from './components/ProductDetailSimpleScreen';
import { ProductDetailRecommendedScreen } from './components/ProductDetailRecommendedScreen';
import { BundleComposerScreen } from './components/BundleComposerScreen';
import { OutOfStockScreen } from './components/OutOfStockScreen';
import { MyOrdersScreen } from './components/MyOrdersScreen';
import { OrderDetailScreen } from './components/OrderDetailScreen';
import { SoulPetalsScreen } from './components/SoulPetalsScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { MyResultsScreen } from './components/MyResultsScreen';
import { ArchetypeDetailScreen } from './components/ArchetypeDetailScreen';
import { CrystalTrinityScreen } from './components/CrystalTrinityScreen';
import { WhyRecommendedScreen } from './components/WhyRecommendedScreen';
import { ShareResultScreen } from './components/ShareResultScreen';
import { MyRitualsScreen } from './components/MyRitualsScreen';
import { CommunityMemberHomeScreen } from './components/CommunityMemberHomeScreen';
import { EventDetailScreen } from './components/EventDetailScreen';
import { AcademyScreen } from './components/AcademyScreen';
import { AcademyModuleScreen } from './components/AcademyModuleScreen';
import { JournalPrivateScreen } from './components/JournalPrivateScreen';
import { JournalHistoryScreen } from './components/JournalHistoryScreen';
import { JournalEditorScreen } from './components/JournalEditorScreen';
import { CommunityJoinScreen } from './components/CommunityJoinScreen';
// Group F system states — 095..103 lengkap (096/100 = library R1/P0, konten verbatim html ref).
import {
  SystemLoadingScreen, SystemEmptyLibraryScreen, SystemErrorScreen, SystemSuccessScreen, SystemLockedScreen,
  SystemConsentLibraryScreen, SystemModalDemoScreen, SystemNotFoundScreen, SystemOfflineScreen,
} from './components/SystemStates';

import { soundEngine } from './utils/audio';

/**
 * KRIT-1 fix 2026-09-04: router react-router per frame-id (/NNN).
 * activeTab dipetakan dari URL (PATH_TO_TAB); goTab = navigate + scroll top.
 * Semua state global (cart/lang/returning/legalDoc) dimiliki Router → AppCtx → Layout+screens.
 * Lazy-load: ponytail — static import dulu (Vite dev instant); pecah React.lazy kalau
 * chunk production >1MB jadi masalah build yang terukur.
 */
const Router: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = PATH_TO_TAB[location.pathname] ?? 'beranda';

  // Cart awal 2 item — match badge "2" di mockup (001/034).
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'cart-1', product: PRODUCTS[0], quantity: 1 },
    { id: 'cart-2', product: PRODUCTS[1], quantity: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [lang, setLang] = useState<Language>('id');
  // Canvas 001 guest vs 002 returning — mock, localStorage only, tanpa backend.
  const [isReturning, setIsReturning] = useState(
    () => !!localStorage.getItem('faisha.assessment.flow') || !!localStorage.getItem('faisha.mock.returning')
  );
  const [legalDoc, setLegalDoc] = useState<LegalDoc>('privacy');

  // Shop filter single source (019 grid + mobile drawer; 020 = alias deep-link).
  const [shopFilters, setShopFilters] = useState<ShopFilters>({
    selectedCategories: [], ritual: null, price: 1500000, avail: [], sort: 'sesuai', drawerOpen: false,
  });

  const goTab = useCallback((tab: NavTab) => {
    navigate(TAB_TO_PATH[tab] ?? '/001');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleToggleReturning = () => {
    const next = !isReturning;
    if (next) localStorage.setItem('faisha.mock.returning', '1');
    else localStorage.removeItem('faisha.mock.returning');
    setIsReturning(next);
  };

  const handleToggleLang = () => setLang(prev => (prev === 'id' ? 'en' : 'id'));

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: `cart-${Date.now()}`, product, quantity: 1 }];
    });
  };

  // NG-2 fix 2026-09-03: CTA "Tambah" kanvas non-shop → cartItems + drawer.
  // Harga = literal kanvas; tanpa harga → 0 (bukan fabrikasi). DRAFT_NON_PURCHASABLE.
  const addMockToCart = (name: string, priceLabel: string, image: string) => {
    handleAddToCart({
      id: `mock-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name,
      subtitle: 'MOCK — DRAFT',
      price: Number(priceLabel.replace(/[^\d]/g, '')) || 0,
      rating: 0,
      category: 'Candles',
      description: '',
      notes: { top: [], heart: [], base: [] },
      alignmentLayer: 'Need',
      image,
      isDraftNonPurchasable: true,
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    soundEngine.playSoftClick();
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    soundEngine.playSoftClick();
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  return (
    <AppCtx.Provider
      value={{
        activeTab, goTab, lang, toggleLang: handleToggleLang,
        cartItems, cartOpen, setCartOpen,
        addToCart: handleAddToCart, addMockToCart,
        updateQuantity: handleUpdateQuantity, removeCartItem: handleRemoveCartItem,
        clearCart: handleClearCart,
        isReturning, toggleReturning: handleToggleReturning,
        legalDoc, setLegalDoc,
        shopFilters, setShopFilters,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          {/* ===== Kanonik: 001..094 ===== */}
          <Route path="/001" element={
            <HomeScreen
              isReturning={isReturning}
              lang={lang}
              onBeginAssessment={() => goTab('assessment')}
              onViewResult={() => goTab('assessment-result')}
              onBeginRitual={() => goTab('ritual-morning')}
              onExploreJourney={() => goTab('journey')}
              onAddToCart={handleAddToCart}
              onNavigateToJournal={() => goTab('journal')}
            />
          } />
          {/* 002 HOME/RETURNING — state isReturning internal 001 */}
          <Route path="/002" element={<Navigate to="/001" replace />} />

          <Route path="/003" element={
            <JourneyScreen
              onBeginAssessment={() => goTab('assessment')}
              onExploreRituals={() => goTab('rituals')}
              onAddToCart={handleAddToCart}
            />
          } />
          {/* 004 JOURNEY/PYRAMID — satu screen dgn 003 */}
          <Route path="/004" element={<Navigate to="/003" replace />} />

          <Route path="/005" element={<AboutScreen lang={lang} onExploreJourney={() => goTab('journey')} />} />
          {/* 006 ABOUT/FOUNDER — tab internal AboutScreen */}
          <Route path="/006" element={<Navigate to="/005" replace />} />

          <Route path="/007" element={
            <SupportScreen view="contact" lang={lang} onNavigate={goTab} onOpenLegal={(doc) => { setLegalDoc(doc); goTab('legal'); }} />
          } />
          {/* 008 FORM + 009 SUCCESS — view internal SupportScreen */}
          <Route path="/008" element={<Navigate to="/007" replace />} />
          <Route path="/009" element={<Navigate to="/007" replace />} />

          <Route path="/010" element={
            <SupportScreen view="faq" lang={lang} onNavigate={goTab} onOpenLegal={(doc) => { setLegalDoc(doc); goTab('legal'); }} />
          } />

          <Route path="/011" element={<CommunityScreen onNavigate={goTab} />} />

          <Route path="/012" element={<JournalScreen onNavigate={goTab} />} />
          {/* 013 JOURNAL/ARTICLE — view internal JournalScreen */}
          <Route path="/013" element={<Navigate to="/012" replace />} />

          <Route path="/014" element={<SearchScreen onNavigate={goTab} onAddToCart={handleAddToCart} />} />
          {/* 015 SEARCH/NORESULT — state internal SearchScreen */}
          <Route path="/015" element={<Navigate to="/014" replace />} />

          <Route path="/016" element={<LegalScreen doc={legalDoc} lang={lang} onNavigate={goTab} />} />
          {/* 017 TERMS + 018 SHIPPING — doc eksplisit (ganti state) */}
          <Route path="/017" element={<LegalScreen doc="terms" lang={lang} onNavigate={goTab} />} />
          <Route path="/018" element={<LegalScreen doc="shipping" lang={lang} onNavigate={goTab} />} />

          <Route path="/019" element={
            <ShopScreen onAddToCart={handleAddToCart} onNavigate={goTab} />
          } />
          {/* 020 FILTER & URUTKAN — alias deep-link: shop sama + drawer auto-open (bukan grid kedua) */}
          <Route path="/020" element={
            <ShopScreen onAddToCart={handleAddToCart} onNavigate={goTab} drawerOpenDefault />
          } />

          <Route path="/021" element={
            <RitualsOverviewScreen onNavigate={goTab} onStartAssessment={() => goTab('assessment')} />
          } />
          <Route path="/022" element={
            <MorningRitualScreen onAddToCart={addMockToCart} onAddBundle={() => goTab('bundle-composer')} />
          } />
          <Route path="/023" element={
            <FocusRitualScreen
              onAddToCart={(name) => addMockToCart(name, '0', '')}
              onOpenRelated={(title) => { if (title === 'Morning Ritual') goTab('ritual-morning'); }}
            />
          } />
          <Route path="/024" element={
            <HomeRitualScreen onAddToCart={(name) => addMockToCart(name, '0', '')} onSelectRoom={() => {}} />
          } />
          <Route path="/025" element={
            <SleepRitualScreen onAddToCart={(name) => addMockToCart(name, '0', '')} onSelectVariant={() => {}} />
          } />
          <Route path="/026" element={
            <SoulRitualScreen
              onAddToCart={(name) => addMockToCart(name, '0', '')}
              onSelectMoment={() => {}}
              onSavePrompt={() => {}}
            />
          } />

          <Route path="/027" element={
            <DavinaSignatureScreen
              onAddToCart={(dir) => addMockToCart(dir, '0', '')}
              onOpenProduct={() => goTab('product-simple')}
            />
          } />

          <Route path="/028" element={<ProductDetailScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          {/* 029 PDP/VARIANT — satu PDP gabungan */}
          <Route path="/029" element={<ProductDetailScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/030" element={
            <ProductDetailRecommendedScreen
              onAddToCart={(name) => addMockToCart(name, '0', '')}
              onOpenAlternative={(name) => void name}
              onNavigate={goTab}
            />
          } />
          {/* 031 PDP/PREORDER — notice DRAFT di PDP */}
          <Route path="/031" element={<ProductDetailScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/032" element={
            <OutOfStockScreen
              onNotifyMe={() => goTab('search')}
              onOpenAlternative={(name) => void name}
              onNavigate={goTab}
            />
          } />
          <Route path="/033" element={
            <BundleComposerScreen
              onSelectOption={() => {}}
              onAddBundle={() => {}}
              onNavigate={goTab}
            />
          } />

          <Route path="/034" element={
            cartItems.length === 0 ? (
              <CartEmptyScreen
                onExploreRitual={() => goTab('rituals')}
                onViewAllProducts={() => goTab('shop')}
                onAddToCart={(name) => {
                  const p = PRODUCTS.find((x) => x.name === name);
                  if (p) handleAddToCart(p);
                }}
                onStartAssessment={() => goTab('assessment-flow')}
                onNavigate={goTab}
              />
            ) : (
              <CartActiveScreen
                items={cartItems}
                onRemoveItem={(name) => {
                  const it = cartItems.find((x) => x.product.name === name);
                  if (it) handleRemoveCartItem(it.id);
                }}
                onUpdateQty={(name, delta) => {
                  const it = cartItems.find((x) => x.product.name === name);
                  if (it) handleUpdateQuantity(it.id, delta);
                }}
                onApplyPromo={(code) => void code}
                onCheckout={() => goTab('checkout-shipping')}
                onOpenProduct={() => goTab('product')}
              />
            )
          } />
          {/* 035 CART/EMPTY — state dari cartItems */}
          <Route path="/035" element={<Navigate to="/034" replace />} />

          <Route path="/036" element={
            <CheckoutShippingScreen
              onSelectShipping={() => {}}
              onContinueToPayment={() => goTab('checkout-payment')}
            />
          } />
          <Route path="/037" element={
            <CheckoutPaymentScreen
              onSelectMethod={() => {}}
              onCreateOrder={(t) => goTab(t === 'processing' ? 'payment-processing' : 'payment-failure')}
              onEditAddress={() => goTab('checkout-shipping')}
            />
          } />
          {/* 038 CHECKOUT/REVIEW */}
          <Route path="/038" element={<CheckoutReviewScreen onNavigate={goTab} />} />
          <Route path="/039" element={
            <PaymentProcessingScreen
              onContactSupport={() => goTab('support')}
              onCompleted={() => goTab('order-thankyou')}
            />
          } />
          <Route path="/040" element={
            <PaymentFailureScreen
              onRetryPayment={() => goTab('checkout-payment')}
              onChooseOtherMethod={() => goTab('checkout-payment')}
              onContactSupport={() => goTab('support')}
              onViewOrderStatus={() => goTab('order-tracking')}
            />
          } />
          <Route path="/041" element={
            <OrderThankYouScreen
              onViewOrder={() => goTab('order-tracking')}
              onStartRitual={() => goTab('next-ritual')}
              onExploreRitual={() => goTab('rituals')}
            />
          } />
          <Route path="/042" element={
            <OrderTrackingScreen
              onCopyTracking={() => {}}
              onTrackWithCourier={() => {}}
              onContactSupport={() => goTab('support')}
              onOpenProduct={() => goTab('product')}
              onBackHome={() => goTab('beranda')}
            />
          } />
          {/* 043 NEXT RITUAL */}
          <Route path="/043" element={<NextRitualScreen onNavigate={goTab} />} />

          {/* 044..057 ASSESSMENT — FlowScreen step internal (044,045,047-053) + ResultScreen (054-057,059,061,062) */}
          <Route path="/044" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/045" element={<AssessmentScreen onNavigate={goTab} />} />
          <Route path="/046" element={<AssessmentScreen onNavigate={goTab} />} />
          <Route path="/047" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/048" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/049" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/050" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/051" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/052" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/053" element={<AssessmentFlowScreen lang={lang} onNavigate={goTab} />} />
          <Route path="/054" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/055" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/056" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/057" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/058" element={<ArchetypeDetailScreen onNavigate={goTab} />} />
          <Route path="/059" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/060" element={<CrystalTrinityScreen onNavigate={goTab} />} />
          <Route path="/061" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/062" element={<AssessmentResultScreen onNavigate={goTab} onAddToCart={addMockToCart} />} />
          <Route path="/063" element={<WhyRecommendedScreen onNavigate={goTab} onAddToRitual={(name) => void name} />} />
          <Route path="/064" element={<ShareResultScreen onNavigate={goTab} />} />

          {/* 065..070 AUTH — initialView per path (067 juga cover varian bonus "Tautan Terkirim") */}
          <Route path="/065" element={<AuthScreen onNavigate={goTab} initialView="login" />} />
          <Route path="/066" element={<AuthScreen onNavigate={goTab} initialView="register" />} />
          <Route path="/067" element={<AuthScreen onNavigate={goTab} initialView="forgot" />} />
          <Route path="/068" element={<AuthScreen onNavigate={goTab} initialView="reset" />} />
          <Route path="/069" element={<AuthScreen onNavigate={goTab} initialView="verify" />} />
          <Route path="/070" element={<AuthScreen onNavigate={goTab} initialView="merge" />} />

          {/* ===== Account / Dashboard ===== */}
          <Route path="/071" element={<DashboardLiteScreen onNavigate={goTab} />} />
          <Route path="/072" element={<MyResultsScreen onNavigate={goTab} />} />
          <Route path="/073" element={<MyRitualsScreen onNavigate={goTab} />} />
          <Route path="/074" element={<MyOrdersScreen onNavigate={goTab} />} />
          <Route path="/075" element={<OrderDetailScreen onNavigate={goTab} onToast={() => {}} />} />
          <Route path="/076" element={<SoulPetalsScreen onNavigate={goTab} />} />
          {/* 077 REWARDS — FUTURE, full render + banner di screen */}
          <Route path="/077" element={<RewardsScreen onNavigate={goTab} />} />
          <Route path="/078" element={
            <WishlistScreen
              onNavigate={goTab}
              onAddToCart={(name) => {
                const p = PRODUCTS.find((x) => x.name === name);
                if (p) handleAddToCart(p);
              }}
            />
          } />
          <Route path="/079" element={<ProfileScreen onNavigate={goTab} onToast={() => {}} />} />
          {/* 080..082 dashboard-full — DashboardScreen tab internal */}
          <Route path="/080" element={<DashboardScreen onNavigate={goTab} />} />
          <Route path="/081" element={<DashboardScreen onNavigate={goTab} />} />
          <Route path="/082" element={<DashboardScreen onNavigate={goTab} />} />

          {/* ===== Community / Academy / Journal private (085-090) ===== */}
          <Route path="/083" element={<CommunityMemberHomeScreen onNavigate={goTab} />} />
          <Route path="/084" element={<EventDetailScreen onNavigate={goTab} />} />
          <Route path="/085" element={<CommunityJoinScreen onNavigate={goTab} />} />
          <Route path="/086" element={<AcademyScreen onNavigate={goTab} />} />
          <Route path="/087" element={<AcademyModuleScreen onNavigate={goTab} />} />
          <Route path="/088" element={<JournalPrivateScreen onNavigate={goTab} />} />
          <Route path="/089" element={<JournalEditorScreen onNavigate={goTab} />} />
          {/* 090 RIWAYAT & INSIGHT — FUTURE, full render (konten 090, bukan reuse 088) */}
          <Route path="/090" element={<JournalHistoryScreen onNavigate={goTab} />} />

          {/* ===== Admin (091-094) ===== */}
          <Route path="/091" element={<AdminScreen onNavigate={goTab} />} />
          <Route path="/092" element={<AdminScreen onNavigate={goTab} />} />
          <Route path="/093" element={<AdminScreen onNavigate={goTab} />} />
          <Route path="/094" element={<AdminScreen onNavigate={goTab} />} />

          {/* ===== Group F system states — lengkap 095..103 ===== */}
          <Route path="/095" element={<SystemLoadingScreen />} />
          {/* 096 EMPTY LIBRARY — R1/P0 (csv "Ada"), konten verbatim html/096 */}
          <Route path="/096" element={<SystemEmptyLibraryScreen onNavigate={(p) => navigate(p)} />} />
          <Route path="/097" element={<SystemErrorScreen onNavigate={(p) => navigate(p)} />} />
          <Route path="/098" element={<SystemSuccessScreen onNavigate={(p) => navigate(p)} />} />
          {/* 099 LOCKED — protected tanpa login → merujuk 065 */}
          <Route path="/099" element={<SystemLockedScreen onNavigate={(p) => navigate(p)} />} />
          {/* 100 CONSENT LIBRARY — R1/P0, konten verbatim html/100 */}
          <Route path="/100" element={<SystemConsentLibraryScreen />} />
          <Route path="/101" element={<SystemModalDemoScreen />} />
          <Route path="/103" element={<SystemOfflineScreen />} />

          {/* Catch-all → 102 (404 & Route Recovery) */}
          <Route path="*" element={<SystemNotFoundScreen onNavigate={(p) => navigate(p)} />} />
        </Route>
      </Routes>
    </AppCtx.Provider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
