import React from 'react';
import { Currency, Language } from '../types';
import { ShoppingBag, Hammer, Compass, Globe, Sparkles, Flame, RotateCw } from 'lucide-react';

interface NavbarProps {
  currency: Currency;
  language: Language;
  onToggleCurrency: () => void;
  onToggleLanguage: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenProposal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  language,
  onToggleCurrency,
  onToggleLanguage,
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenProposal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0906]/95 backdrop-blur-md border-b border-[#4d3a24] shadow-2xl">
      {/* Top Heritage Info Strip with Colorful Ribbon */}
      <div className="h-2 tibeb-ribbon w-full" />
      
      <div className="bg-gradient-to-r from-[#172e1c] via-[#2a2208] to-[#3a1414] border-b border-[#4d3a28] px-4 py-1.5 text-xs text-[#fef3c7] flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
          <span className="font-bold tracking-wide">
            {language === 'AM' 
              ? '✨ Heritage Heroes Ethiopia • የኢትዮጵያ ታሪካዊ ጀግኖች አሻንጉሊት ማምረቻ ፋብሪካ (አዲስ አበባ)' 
              : '✨ Heritage Heroes Ethiopia • Historical Heroes Doll Manufacturing Factory (Addis Ababa)'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#078930]/40 border border-[#22c55e]/50 text-[#86efac]">
            <span>🇪🇹</span> 100% ንጹህ ጥጥና የQR መማሪያ ካርድ
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#da121a]/30 border border-[#f87171]/50 text-[#fca5a5]">
            <span>✈️</span> ለዓለም አቀፍ ኤክስፖርትና ዲያስፖራ
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Colorful Ethiopian Glow */}
        <div 
          onClick={() => onNavigate('banner-section')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#f59e0b] via-[#da121a] to-[#078930] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#120e0a] rounded-[14px] flex items-center justify-center text-2xl shadow-inner">
              👑
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-black tracking-wider text-white flex items-center gap-2">
              <span className="ethiopia-text-gradient font-black">የቅርስ ጀግኖች</span>
              <span className="text-[#fde047] text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#2d1b06] border border-[#f59e0b]/50 shadow-sm">
                HEROES
              </span>
            </div>
            <div className="text-[11px] text-[#fde68a] font-medium tracking-wide">
              HERITAGE HEROES ETHIOPIA • ታሪካዊ አሻንጉሊት ፋብሪካ
            </div>
          </div>
        </div>

        {/* Desktop Nav Links in Vibrant Amharic */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 text-xs sm:text-sm font-bold">
          <button
            onClick={() => onNavigate('catalog-section')}
            className="text-[#fef3c7] hover:text-[#fde047] transition-all hover:scale-105 px-3 py-1.5 rounded-xl hover:bg-[#2a1d0d]"
          >
            {language === 'AM' ? 'የጀግኖች ስብስቦች (ካታሎግ)' : 'Hero Collections'}
          </button>


          <button
            onClick={() => onNavigate('hero-360-section')}
            className="text-white hover:text-[#fde047] transition-all hover:scale-105 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#da121a]/30 via-[#f59e0b]/30 to-[#078930]/30 border border-[#f59e0b]/60 shadow-sm"
          >
            <RotateCw size={14} className="text-[#fde047] animate-spin" />
            <span>{language === 'AM' ? '360° ቅርጾች' : '360° Studio'}</span>
          </button>

          {onOpenProposal && (
            <button
              onClick={onOpenProposal}
              className="text-[#fde047] hover:text-white transition-all hover:scale-105 px-3 py-1.5 rounded-xl hover:bg-[#3d2714] border border-[#f59e0b]/40 flex items-center gap-1.5"
            >
              <span>🏛️ {language === 'AM' ? 'ቢዝነስ ፕሮፖዛል' : 'Business Proposal'}</span>
            </button>
          )}
          
          <button
            onClick={() => onNavigate('factory-section')}
            className="text-black font-extrabold transition-all hover:scale-105 flex items-center gap-1.5 bg-gradient-to-r from-[#fde047] via-[#f59e0b] to-[#ea580c] px-3.5 py-2 rounded-xl shadow-lg shadow-[#f59e0b]/20 active:scale-95"
          >
            <Hammer size={15} className="text-black" />
            <span>{language === 'AM' ? 'የአሻንጉሊት ስቱዲዮ' : 'Doll Studio'}</span>
          </button>

          <button
            onClick={() => onNavigate('timeline-section')}
            className="text-[#fef3c7] hover:text-[#4ade80] transition-all hover:scale-105 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#132a18]"
          >
            <Compass size={15} className="text-[#22c55e]" />
            <span>{language === 'AM' ? 'ታሪካዊ ዘመናት' : 'Epochs'}</span>
          </button>
        </nav>

        {/* Action Controls: Currency, Language, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#1e1509] to-[#2e1d09] border border-[#f59e0b]/60 text-xs font-bold font-mono text-[#fde047] hover:scale-105 transition-all shadow"
            title="የገንዘብ አይነት ይምረጡ (ብር / ዶላር)"
          >
            <span>{currency === 'ETB' ? '🇪🇹 ብር (ETB)' : '🇺🇸 ዶላር ($)'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="px-3 py-1.5 rounded-xl bg-[#20150b] border border-[#3b82f6]/60 text-xs font-bold text-white hover:scale-105 transition-all flex items-center gap-1.5 shadow"
            title="Switch Language / ቋንቋ ይቀይሩ"
          >
            <Globe size={14} className="text-[#60a5fa]" />
            <span className="font-semibold">{language === 'AM' ? 'English' : 'አማርኛ'}</span>
          </button>

          {/* Cart Drawer Trigger with Vibrant Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-3 rounded-2xl bg-gradient-to-r from-[#078930] via-[#eab308] to-[#da121a] text-black font-extrabold hover:opacity-95 transition-all shadow-xl shadow-orange-500/20 flex items-center gap-1.5 active:scale-95"
            title="የግዢ ቅርጫትዎን ይመልከቱ"
          >
            <div className="bg-black/20 p-1 rounded-lg">
              <ShoppingBag size={18} className="text-white" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#da121a] text-white text-xs font-mono font-black flex items-center justify-center border-2 border-[#fff] shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
