import React, { useState, useEffect } from 'react';
import { Currency, Language, HistoricalEra, DollProduct, CartItem } from './types';
import { getHeroById } from './data/heroes';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HeroCatalog } from './components/HeroCatalog';
import { Hero360Studio } from './components/Hero360Studio';
import { MenelikMasterpieceShowcase } from './components/MenelikMasterpieceShowcase';
import { TaytuMasterpieceShowcase } from './components/TaytuMasterpieceShowcase';
import { AlulaMasterpieceShowcase } from './components/AlulaMasterpieceShowcase';
import { AbebeMasterpieceShowcase } from './components/AbebeMasterpieceShowcase';
import { HaileSelassieMasterpieceShowcase } from './components/HaileSelassieMasterpieceShowcase';
import { ZewdituMasterpieceShowcase } from './components/ZewdituMasterpieceShowcase';
import { WeredeMamoMasterpieceShowcase } from './components/WeredeMamoMasterpieceShowcase';
import { Heroines3DPavilion } from './components/Heroines3DPavilion';
import { DollFactoryStudio } from './components/DollFactoryStudio';
import { HistoricalTimeline } from './components/HistoricalTimeline';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CertificateModal } from './components/CertificateModal';
import { BusinessProposalModal } from './components/BusinessProposalModal';
import { Footer } from './components/Footer';

export function App() {
  const [currency, setCurrency] = useState<Currency>('ETB');
  const [language, setLanguage] = useState<Language>('AM'); // Default to AMHARIC!
  const [selectedEra, setSelectedEra] = useState<HistoricalEra | 'all'>('all');
  
  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('yenegestat_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isProposalOpen, setIsProposalOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<DollProduct | null>(null);
  const [orderCertificateData, setOrderCertificateData] = useState<any>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yenegestat_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Handlers for cart
  const handleAddToCart = (product: DollProduct, customEngraving?: string, quantity: number = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.productId === product.id && item.customEngraving === customEngraving
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          quantity,
          customEngraving
        };
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleOrderSuccess = (orderData: any) => {
    setOrderCertificateData(orderData);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const activeHero = quickViewProduct ? getHeroById(quickViewProduct.heroId) : undefined;

  return (
    <div className="min-h-screen bg-[#080503] text-[#fdfbf7] selection:bg-[#f59e0b] selection:text-black font-amharic">
      
      {/* Navigation Bar */}
      <Navbar
        currency={currency}
        language={language}
        onToggleCurrency={() => setCurrency(prev => prev === 'ETB' ? 'USD' : 'ETB')}
        onToggleLanguage={() => setLanguage(prev => prev === 'AM' ? 'EN' : 'AM')}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        onOpenProposal={() => setIsProposalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-20">
        
        {/* Landing Hero Banner */}
        <HeroBanner
          language={language}
          currency={currency}
          onExploreCatalog={() => scrollToSection('catalog-section')}
          onOpenStudio={() => scrollToSection('factory-section')}
          onOpenProposal={() => setIsProposalOpen(true)}
          onOpen360Studio={() => scrollToSection('menelik-masterpiece-section')}
        />

        {/* Emperor Menelik II Dedicated Masterpiece Showcase (Uploaded Hero Image) */}
        <MenelikMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* Empress Taytu Betul Dedicated Masterpiece Showcase (Uploaded Heroine Image) */}
        <TaytuMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* Ras Alula Engida (Abba Nega) Dedicated Masterpiece Showcase (Uploaded Hero Image) */}
        <AlulaMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* Captain Abebe Bikila Dedicated Masterpiece Showcase (Uploaded Hero Image) */}
        <AbebeMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* Emperor Haile Selassie I Dedicated Masterpiece Showcase (Uploaded Hero Image) */}
        <HaileSelassieMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* Empress Zewditu Dedicated Masterpiece Showcase (Uploaded Heroine Image) */}
        <ZewdituMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* Werede Mamo Dedicated Masterpiece Showcase (Uploaded Heroine Image) */}
        <WeredeMamoMasterpieceShowcase
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* All Ethiopian Heroines 3D Interactive Exhibition Pavilion */}
        <Heroines3DPavilion
          currency={currency}
          language={language}
          onAddToCart={(customProduct, customEngraving, qty) => {
            handleAddToCart(customProduct, customEngraving, qty || 1);
          }}
        />

        {/* 360° Rotatable & Interactive Hero Studio */}
        <section id="hero-360-section">
          <Hero360Studio
            currency={currency}
            language={language}
            onAddToCart={(customProduct, customEngraving) => {
              handleAddToCart(customProduct, customEngraving, 1);
            }}
          />
        </section>

        {/* Custom Doll Factory Studio */}
        <section id="factory-section">
          <DollFactoryStudio
            currency={currency}
            onAddToCart={(customProduct, customEngraving) => {
              handleAddToCart(customProduct, customEngraving, 1);
            }}
          />
        </section>

        {/* Historical Battlegrounds & Timeline */}
        <section id="timeline-section">
          <HistoricalTimeline
            selectedEra={selectedEra}
            onSelectEra={(era) => {
              setSelectedEra(era);
              scrollToSection('catalog-section');
            }}
          />
        </section>

        {/* Hero Figures Catalog */}
        <section id="catalog-section">
          <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-[#20150c] via-[#140c06] to-[#20150c] border-2 border-[#f59e0b]/40 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
              የቅርስ ጀግኖች ኢትዮጵያ • <span className="ethiopia-text-gradient font-black">ይፋዊ የአሻንጉሊቶችና ቅርጾች ስብስብ</span>
            </h2>
            <p className="text-[#fef3c7] text-sm mt-1.5 font-medium leading-relaxed">
              በአዲስ አበባ ፋብሪካ በ100% ኦርጋኒክ ጥጥ በእጅ የተሰፉ፣ የታሪክ መማሪያ ካርድና የQR ኮድ ያላቸው ይፋዊ የጀግኖች ስብስቦች። የሚወዱትን ጀግና ይምረጡ፣ እውነተኛ ፎቶዎቻቸውንና 3D ቅርጾቻቸውን ይመልከቱ።
            </p>
          </div>

          <HeroCatalog
            currency={currency}
            language={language}
            selectedEra={selectedEra}
            onSelectEra={setSelectedEra}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, undefined, 1)}
          />
        </section>

      </main>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        hero={activeHero}
        currency={currency}
        language={language}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, customEngraving, qty) => {
          handleAddToCart(prod, customEngraving, qty);
        }}
      />

      <BusinessProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        currency={currency}
        language={language}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        language={language}
        onOrderSuccess={handleOrderSuccess}
      />

      <CertificateModal
        isOpen={!!orderCertificateData}
        onClose={() => setOrderCertificateData(null)}
        orderData={orderCertificateData}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
