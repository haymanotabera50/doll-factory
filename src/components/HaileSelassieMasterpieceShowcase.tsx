import React, { useState, useEffect, useRef } from 'react';
import { Currency, Language, DollProduct } from '../types';
import { ETHIOPIAN_HEROES } from '../data/heroes';
import {
  RotateCw,
  Play,
  Pause,
  Sparkles,
  Volume2,
  VolumeX,
  ShoppingBag,
  Check,
  Award,
  Scroll,
  Layers,
  Globe2,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';

interface HaileSelassieMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const HaileSelassieMasterpieceShowcase: React.FC<HaileSelassieMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const selassieHero = ETHIOPIAN_HEROES.find(h => h.id === 'haile-selassie-i') || ETHIOPIAN_HEROES[4];
  const selassieProduct = selassieHero.dolls[0];

  // Interactive states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string>('uniform');
  const [selectedSize, setSelectedSize] = useState<'collector' | 'standard' | 'mini'>('collector');
  const [engravingText, setEngravingText] = useState<string>('ለተወዳጁ ልጃችን / For Our Beloved Child');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-spin animation
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Drag-to-spin interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setRotationAngle(prev => (prev + delta * 0.75 + 360) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Play historical League of Nations speech
  const handleToggleSpeech = () => {
    setIsPlayingSpeech(!isPlayingSpeech);
  };

  // Sole Edition: 7-inch (18 cm) desktop collector figurine
  const getPrice = () => {
    return { etb: 2250, usd: 35, titleSuffix: '7 ኢንች ይፋዊ ቅርጽ (7-Inch Official Figurine)' };
  };

  const currentPrice = getPrice();

  const handleOrder = () => {
    const itemToOrder: DollProduct = {
      ...selassieProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${selassieProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${selassieProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#facc15', '#22c55e', '#ef4444', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture of Emperor Haile Selassie I
  const hotspots = [
    {
      id: 'uniform',
      title: 'የክብር ወታደራዊ ዩኒፎርም፣ ማዕረጎችና ሜዳሊያዎች',
      titleEn: 'Field Marshal Uniform & Medals',
      y: '25%',
      x: '50%',
      icon: '🎖️',
      desc: 'ጥቁር ሰማያዊ የፊልድ ማርሻል ዩኒፎርም፣ በትከሻ ላይ የወርቅ ማዕረግ ዘርፍ (epaulettes)፣ በደረት ላይ የተሻገረ የወርቅ ገመድ (aiguillettes) እና የክብር ሜዳሊያዎች።',
      descEn: 'Midnight blue commander-in-chief uniform adorned with gold fringed epaulettes, chest aiguillettes, and medal ribbons.'
    },
    {
      id: 'cap',
      title: 'በእጅ የተያዘ የወርቅ ጥልፍ ካፕ ባርኔጣ',
      titleEn: 'Hand-Held Officer Peaked Cap',
      y: '45%',
      x: '25%',
      icon: '🎩',
      desc: 'በቀኝ እጃቸው ወገባቸው ላይ ይዘው የቆሙት በደማቅ ወርቃማ ጥልፍና በኢትዮጵያ ንጉሣዊ ዓርማ ያሸበረቀ ወታደራዊ ካፕ ባርኔጣ።',
      descEn: 'Gold-braided ceremonial military peaked cap held with poise at his hip, showing high statesmanship.'
    },
    {
      id: 'cape',
      title: 'ጥቁር ቬልቬት ንጉሣዊ ካባ በወርቅ ጥልፍ',
      titleEn: 'Imperial Gold-Bordered Velvet Cape',
      y: '45%',
      x: '80%',
      icon: '👑',
      desc: 'በትከሻቸው ላይ የተንጣለለ ጥቁር ቬልቬት ካባ፣ በግርጌው ላይ በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መስቀል ጥልፍ ያጌጠ ክቡር ልብስ።',
      descEn: 'Flowing black velvet cape draped over shoulders, bordered by intricate golden Ethiopian cross filigree.'
    },
    {
      id: 'statesman',
      title: 'የዓለም አቀፍ ዲፕሎማሲና የሰላም ተምሳሌት',
      titleEn: 'Global Statesman & OAU Founder',
      y: '10%',
      x: '50%',
      icon: '🌐',
      desc: 'የአፍሪካ አንድነት ድርጅት (OAU/AU) በአዲስ አበባ እንዲመሰረት ያደረጉና በመንግስታቱ ማህበር (League of Nations) በጄኔቫ የቆሙ ታላቅ መሪ።',
      descEn: 'Co-founder of the Organization of African Unity and fearless defender of global collective security.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '88%',
      x: '50%',
      icon: '🏛️',
      desc: '«Haile Selassie I (1892 – 1975) • A modernizer. A peace advocate. A global statesman.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Solid collector plinth bearing metallic gold inscription honoring the Emperor of modern Ethiopia.'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="selassie-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c1f38] via-[#102a4c] to-[#071324] border-3 border-[#3b82f6] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#3b82f6]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#facc15]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6] text-[#93c5fd] text-xs font-black shadow">
              <Globe2 size={15} className="text-[#60a5fa]" />
              <span>OFFICIAL MASTERPIECE STATESMAN FIGURE • ይፋዊ የቀዳማዊ አፄ ኃይለ ሥላሴ ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              ቀዳማዊ አፄ ኃይለ ሥላሴ <span className="text-[#93c5fd] font-black">(1892 – 1975)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «A modernizer. A peace advocate. A global statesman.»
            </p>

            <p className="text-[#fef3c7] text-xs sm:text-sm leading-relaxed font-normal">
              የዘመናዊነት አባት፣ የሰላም ተሟጋችና በዓለም አቀፍ መድረክ የተከበሩ መሪ። በክብር ወታደራዊ ዩኒፎርም፣ በወርቅ ማዕረጎች፣ ጥቁር ቬልቬት ካባና ካፕ ባርኔጣ ያሸበረቀውን ይፋዊ ቅርጽ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#061220] rounded-2xl border border-[#3b82f6]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#93c5fd] font-bold uppercase">ታሪካዊ ማዕረግ (Legacy)</div>
              <div className="text-sm font-black text-[#fef08a]">የአፍሪካ አንድነት አባት</div>
              <div className="text-xs text-[#93c5fd] font-mono">OAU Founder (1963)</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-gradient-to-r from-[#da121a] to-[#ea580c] text-white border-red-400 animate-pulse'
                  : 'bg-[#1e3a5f] hover:bg-[#284e80] text-[#fde047] border-[#3b82f6]'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'የንግግሩን ድምፅ አቁም' : 'የጄኔቫን ታሪካዊ ንግግር አዳምጥ'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="haile-selassie-i"
              defaultLanguage={language}
              onClose={() => setIsPlayingSpeech(false)}
            />
          </div>
        )}
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 360° Rotatable Statue Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0d1d33] via-[#081220] to-[#03070d] border-3 border-[#3b82f6] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top Stage Controls */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
              <span className="px-3.5 py-1.5 rounded-2xl bg-black/85 border border-[#3b82f6] text-[11px] font-bold text-[#fef08a] flex items-center gap-2 shadow-xl backdrop-blur-md">
                <RotateCw size={13} className="text-[#3b82f6] animate-spin" />
                <span>ማዕዘን፡ {Math.round(rotationAngle)}° (360° Drag to Spin)</span>
              </span>

              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3.5 py-1.5 rounded-2xl bg-black/85 hover:bg-[#1a365d] border border-[#3b82f6] text-xs font-bold text-white flex items-center gap-1.5 shadow-xl backdrop-blur-md transition-all active:scale-95"
              >
                {isAutoSpinning ? <Pause size={13} className="text-yellow-400" /> : <Play size={13} className="text-blue-400" />}
                <span>{isAutoSpinning ? 'አቁም' : 'ዙረት ጀምር (Auto-Spin)'}</span>
              </button>
            </div>

            {/* Glowing Backdrop Light */}
            <div 
              className="absolute w-72 h-72 rounded-full bg-[#3b82f6]/20 filter blur-3xl pointer-events-none transition-all duration-300"
              style={{
                transform: `scale(${1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.15})`
              }}
            />

            {/* The Haile Selassie Figure Display */}
            <div
              className="relative z-10 w-full h-[88%] flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src="/haile_selassie_i_official.png"
                alt="Emperor Haile Selassie I Official Heritage Statue"
                className="max-h-full w-auto object-contain drop-shadow-[0_25px_45px_rgba(59,130,246,0.35)] select-none pointer-events-none"
              />

              {/* Interactive Hotspot Pins (Only visible around front view) */}
              {Math.abs((rotationAngle % 360) - 0) < 60 || Math.abs((rotationAngle % 360) - 360) < 60 ? (
                hotspots.map(hs => {
                  const isActive = activeHotspot === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(hs.id);
                      }}
                      className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all pointer-events-auto p-1.5 rounded-full flex items-center justify-center shadow-2xl border-2 ${
                        isActive
                          ? 'scale-125 bg-[#3b82f6] border-yellow-300 ring-4 ring-[#3b82f6]/60'
                          : 'scale-100 bg-black/85 border-[#3b82f6] hover:scale-115'
                      }`}
                      style={{ top: hs.y, left: hs.x }}
                      title={hs.title}
                    >
                      <span className="text-xs">{hs.icon}</span>
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                    </button>
                  );
                })
              ) : null}
            </div>

            {/* Bottom Pedestal Glow & Instruction */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs pointer-events-none">
              <span className="text-[11px] text-[#93c5fd] font-medium bg-black/80 px-3 py-1 rounded-xl border border-[#1e3a5f]">
                👈 በመዳፊት/በጣት ወደ ግራና ቀኝ ጎትተው ያሽከርክሩ 👉
              </span>

              <span className="text-[11px] font-bold text-[#86efac] bg-black/80 px-3 py-1 rounded-xl border border-[#22c55e]/40">
                100% ኦፊሴላዊ የቅርጽ ዲዛይን
              </span>
            </div>
          </div>

          {/* Quick Jump Angle Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: '0° ፊት ለፊት (Front Dignity)', angle: 0 },
              { label: '45° የማዕረጎችና የካፕ እይታ', angle: 45 },
              { label: '90° የጎን ግርማ (Profile)', angle: 90 },
              { label: '180° የካባው ወርቅ ጥልፍ (Back)', angle: 180 },
              { label: '270° የግራ እይታ (Left)', angle: 270 },
            ].map(preset => (
              <button
                key={preset.angle}
                onClick={() => {
                  setRotationAngle(preset.angle);
                  setIsAutoSpinning(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  Math.round(rotationAngle) === preset.angle
                    ? 'bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white border-yellow-300 shadow-md scale-105'
                    : 'bg-[#0f1f33] text-[#baa994] border-[#1e3a5f] hover:border-[#3b82f6] hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Active Hotspot Info Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#112338] via-[#091524] to-[#112338] border-2 border-[#3b82f6]/60 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentHotspot.icon}</span>
                <span className="text-base font-serif font-black text-white">{currentHotspot.title}</span>
              </div>
              <span className="text-[11px] font-mono text-[#93c5fd] font-bold">{currentHotspot.titleEn}</span>
            </div>
            <p className="text-xs text-[#fef3c7] leading-relaxed">
              {currentHotspot.desc}
            </p>
            <div className="text-[11px] text-[#baa994] italic border-t border-[#1e3a5f] pt-1">
              "{currentHotspot.descEn}"
            </div>
          </div>
        </div>

        {/* Right Column: Historical Wisdom, Specifications & Custom Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Historical Quote Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0e213b] via-[#081526] to-[#040b14] border-2 border-[#3b82f6] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scroll size={17} className="text-[#60a5fa]" />
                <h3 className="font-serif font-black text-sm text-[#93c5fd] uppercase tracking-wide">
                  የቀዳማዊ ኃይለ ሥላሴ ታሪካዊ የጄኔቫ ንግግር (1936)
                </h3>
              </div>
              <span className="text-[10px] bg-[#3b82f6]/30 text-[#93c5fd] px-2 py-0.5 rounded font-bold border border-[#3b82f6]/50">
                League of Nations
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-[#3b82f6]/40 text-xs text-[#fef3c7] font-serif leading-relaxed italic border-l-4 border-l-[#3b82f6]">
              «ዛሬ እኛ ላይ የደረሰው ነገ እናንተ ላይ ይደርሳል! ሰላም የሚገኘው በፍትህና በጋራ ሉዓላዊነት ጥበቃ ብቻ ነው!»
            </div>

            <p className="text-[11px] text-[#baa994] leading-relaxed">
              በጄኔቫ ለመላው ዓለም ያስተጋባው ይህ ንግግር ኢትዮጵያ በዓለም የነጻነት መድረክ ላይ ያላትን ተጽዕኖ ያስመሰከረና የአፍሪካ ህብረት መቀመጫ እንድትሆን መንገድ የከፈተ ታላቅ የታሪክ ምዕራፍ ነው።
            </p>
          </div>

          {/* Size / Collection Selector */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0f233b] to-[#071321] border-2 border-[#3b82f6]/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#93c5fd] uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#3b82f6]" />
                ይፋዊ የቅርጽ መጠን (Edition)
              </span>
              <span className="text-xs text-[#86efac] font-mono font-bold">100% Handcrafted</span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1d3d63] to-[#0f233a] border-2 border-[#3b82f6] shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-black text-white">ሚኒ ቅርጽ (Mini Heritage Figurine)</span>
                  <span className="text-[10px] text-[#86efac] font-bold bg-[#22c55e]/20 px-2.5 py-0.5 rounded-full border border-[#22c55e]/40">
                    ✓ 7 ኢንች ብቻ (Only 7 Inch)
                  </span>
                </div>
                <div className="text-xs text-[#93c5fd]">7 ኢንች (18 ሳ.ሜ) • በጥቁር የተቀረጸ ፕሊንዝ መቆሚያ ላይ</div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-[#fde047] font-mono">
                  {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd}`}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ በክምችት ላይ ያለ</span>
              </div>
            </div>

            {/* Custom Plinth Engraving */}
            <div className="space-y-1.5 pt-2 border-t border-[#1e3a5f]">
              <label className="text-xs font-bold text-[#fef3c7] flex items-center justify-between">
                <span>በፕሊንዙ ላይ የሚቀረጽ የስም ስጦታ (Custom Plinth Engraving):</span>
                <span className="text-[10px] text-[#86efac]">ነጻ አገልግሎት</span>
              </label>
              <input
                type="text"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="የልጅዎን ስም ወይም የበረከት ቃል ይጻፉ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-[#3b82f6]/60 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#60a5fa] shadow-inner font-amharic"
              />
              <div className="text-[10px] text-[#baa994]">
                ምሳሌ፡ «ለተወዳጁ ልጃችን ሚካኤል - የነገው መሪ» ወይም «Haile Selassie Heritage 2026»
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-3 border-t border-[#1e3a5f] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#baa994] uppercase font-bold">አጠቃላይ ዋጋ (Total Price)</div>
                  <div className="text-2xl font-mono font-black text-[#fde047]">
                    {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd} USD`}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#86efac] font-bold">
                  ✓ በክምችት ላይ አለ (In Stock)
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3b82f6] via-[#eab308] to-[#22c55e] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-blue-500/30 active:scale-95 transition-all hover:scale-102"
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} className="text-black stroke-[3]" />
                    <span>ወደ ግዢ ቅርጫትዎ ተጨምሯል! (Added!)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} className="text-black" />
                    <span>ይህንን የቀዳማዊ ኃይለ ሥላሴ ቅርጽ ይዘዙ (Add to Cart)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-4 rounded-2xl bg-[#081524] border border-[#1e3a5f] space-y-2 text-xs">
            <div className="font-bold text-[#93c5fd] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#60a5fa]" />
              በጥቅሉ ውስጥ የተካተቱ ይፋዊ ቁሳቁሶች፡
            </div>
            <ul className="space-y-1 text-[11px] text-[#d1d5db]">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የክብር ወታደራዊ ዩኒፎርም፣ የወርቅ ሹራብና ሜዳሊያዎች</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>በእጅ የተያዘ የወርቅ ጥልፍ ካፕ ባርኔጣ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ጥቁር ቬልቬት ንጉሣዊ ካባ በወርቅ ጥልፍ ያጌጠ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የተቀረጸበት ጥቁር የፕሊንዝ መቆሚያ ከነወርቃማ ጽሑፉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የጄኔቫና የአፍሪካ አንድነት ድርጅት መማሪያ ካርድና የQR ኮድ (Amharic & English)</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

