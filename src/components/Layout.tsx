import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { AssessmentModal } from './AssessmentModal';
import { ResultModal } from './ResultModal';
import { useApp } from '../context';
import { soundEngine } from '../utils/audio';
import { ScentAssessmentResult } from '../types';
import { SARAH_DEFAULT_RESULT } from '../data/mockData';

/**
 * Site shell — Header + <Outlet/> + Footer + overlay global (cart/assessment/result/toast).
 * Route-aware: activeTab dipetakan dari URL di App.
 */
export const Layout: React.FC = () => {
  const {
    activeTab, goTab, lang, toggleLang, cartItems, cartOpen, setCartOpen,
    addToCart, updateQuantity, removeCartItem, clearCart,
    isReturning, toggleReturning, setLegalDoc,
  } = useApp();

  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<ScentAssessmentResult>(SARAH_DEFAULT_RESULT);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAssessmentComplete = (result: ScentAssessmentResult) => {
    setCurrentResult(result);
    setAssessmentOpen(false);
    setResultOpen(true);
    showToast(`Your alignment archetype is ${result.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3EE] text-[#291714] selection:bg-[#5B4750] selection:text-[#FAF3EE]">
      <Header
        activeTab={activeTab}
        setActiveTab={goTab}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenProfile={() => goTab('dashboard')}
        onOpenAssessment={() => setAssessmentOpen(true)}
        lang={lang}
        onToggleLang={toggleLang}
        isReturning={isReturning}
        onToggleReturning={toggleReturning}
        onSearch={() => goTab('search')}
      />

      <main className="flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>

      <Footer
        variant={activeTab === 'about' ? 'light' : 'dark'}
        onNavigate={(tab) => {
          soundEngine.playSoftClick();
          goTab(tab);
        }}
        onOpenPolicy={(title) => showToast(`Displaying FAISHA ${title} principles`)}
        onOpenLegal={(doc) => {
          setLegalDoc(doc);
          goTab('legal');
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeCartItem}
        onClearCart={clearCart}
        onCheckout={() => {
          setCartOpen(false);
          goTab('cart');
        }}
      />

      <AssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
        onComplete={handleAssessmentComplete}
        lang={lang}
      />

      <ResultModal
        isOpen={resultOpen}
        onClose={() => setResultOpen(false)}
        result={currentResult}
        onAddToCart={addToCart}
        onBeginRitual={() => {
          setResultOpen(false);
          goTab('rituals');
        }}
        lang={lang}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#402b28] text-[#FAF3EE] px-5 py-3 rounded-2xl shadow-xl border border-[#BDA494]/30 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#3D6852] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
