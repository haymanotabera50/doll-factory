import React, { useState, useEffect, useRef } from 'react';
import { Currency, Language, DollProduct } from '../types';
import { ETHIOPIAN_HEROES } from '../data/heroes';
import {
  RotateCw,
  Play,
  Pause,
  Sparkles,
  Award,
  Shield,
  Volume2,
  VolumeX,
  ShoppingBag,
  Check,
  Crown,
  Scroll,
  Info,
  ChevronRight,
  Maximize2,
  Flame,
  Layers,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';

interface MenelikMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const MenelikMasterpieceShowcase: React.FC<MenelikMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const menelikHero = ETHIOPIAN_HEROES.find(h => h.id === 'menelik-ii') || ETHIOPIAN_HEROES[0];
  const menelikProduct = menelikHero.dolls[0];

  // Interactive states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string>('crown');
  const [selectedSize, setSelectedSize] = useState<'collector' | 'standard' | 'mini'>('collector');
  const [engravingText, setEngravingText] = useState<string>('ለተወዳጇ ልጃችን / For Our Beloved Child');
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

  // Play historical proclamation audio narration
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
      ...menelikProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${menelikProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${menelikProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#facc15', '#ef4444', '#f59e0b', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture
  const hotspots = [
    {
      id: 'crown',
      title: 'ንጉሣዊ የወርቅ ዘውድ',
      titleEn: 'Imperial Golden Crown',
      y: '10%',
      x: '50%',
      icon: '👑',
      desc: 'በኢትዮጵያ ንጉሣዊ የጥበብ ሙያ የተሰራ፣ የወርቅ ቅጠሎች፣ አልማዞችና የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መስቀል ምልክት ያረፈበት ግርማ-ሞገሳዊ አክሊል።',
      descEn: 'Hand-sculpted imperial crown adorned with traditional Ethiopian gold filigree and cross finial.'
    },
    {
      id: 'kaba',
      title: 'ጥቁር የቬልቬት ካባ በወርቅ ጥልፍ',
      titleEn: 'Royal Black Velvet & Gold Kaba',
      y: '38%',
      x: '30%',
      icon: '✨',
      desc: 'የተመረጠ ንጹህ ጥቁር ቬልቬት ጨርቅ በደማቅ የወርቅ ክር ጥልፍ (Tibeb) እና በወርቃማ ዘርፍ የተሞሸረ የኢትዮጵያ ነገሥታት ክቡር ካባ።',
      descEn: 'Deep black royal velvet cloak heavily embroidered with authentic golden Ethiopian patterns and fringe trim.'
    },
    {
      id: 'scepter',
      title: 'የወርቅ በትረ-መንግሥት',
      titleEn: 'Imperial Golden Scepter',
      y: '45%',
      x: '68%',
      icon: '🪄',
      desc: 'በቀኝ እጃቸው የያዙት የኢትዮጵያ ሉዓላዊነት፣ የፍትሕና የጥበቃ ምልክት የሆነ የወርቅ በትረ-መንግሥት።',
      descEn: 'Golden staff of authority topped with the sovereign cross of Ethiopian independence.'
    },
    {
      id: 'tunic',
      title: 'ነጭ ንጉሣዊ ካሚስና ጥቁር ጫማ',
      titleEn: 'Inner Royal Tunic & Leather Boots',
      y: '65%',
      x: '50%',
      icon: '👢',
      desc: 'በውስጥ የለበሱት ባህላዊ የነጭ ጥጥ ካሚስ ከደረት የወርቅ ጥልፍ ጋር እና የወታደራዊ መሪነት የቆዳ ጫማ።',
      descEn: 'Traditional handwoven white cotton tunic paired with polished imperial commander boots.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '88%',
      x: '50%',
      icon: '🏛️',
      desc: '«Emperor Menelik II (1844 – 1913) • United the nation. Defended its sovereignty. A builder of modern Ethiopia.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Heavy collector base with metallic gold inscription celebrating his national legacy.'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="menelik-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#201005] via-[#2f1807] to-[#1a0a03] border-3 border-[#f59e0b] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#f59e0b]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#078930]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fef08a] text-xs font-black shadow">
              <Crown size={15} className="text-[#fde047]" />
              <span>OFFICIAL MASTERPIECE HERO FIGURE • ይፋዊ የዳግማዊ አፄ ምኒልክ ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              ዳግማዊ አፄ ምኒልክ <span className="ethiopia-text-gradient font-black">(1844 – 1913)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «United the nation. Defended its sovereignty. A builder of modern Ethiopia.»
            </p>

            <p className="text-[#fef3c7] text-xs sm:text-sm leading-relaxed font-normal">
              በይፋዊው የ«Heritage Heroes Ethiopia» ስብስብ ውስጥ እጅግ ተወዳጅና ግርማ-ሞገስ የተላበሰው ይፋዊ የዳግማዊ አፄ ምኒልክ ቅርጽ። በኦሪጅናል ጥቁር ቬልቬት ካባ፣ የወርቅ ጥልፍ፣ ዘውድና በትረ-መንግሥት በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#120803] rounded-2xl border border-[#f59e0b]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#baa994] font-bold uppercase">የታሪክ ዘመን (Era)</div>
              <div className="text-sm font-black text-[#86efac]">የአድዋ ድል (1888 ዓ.ም)</div>
              <div className="text-xs text-[#fde047] font-mono">Battle of Adwa 1896</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-gradient-to-r from-[#da121a] to-[#ea580c] text-white border-red-400 animate-pulse'
                  : 'bg-[#261509] hover:bg-[#38200e] text-[#fde047] border-[#f59e0b]'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'የአዋጁን ድምፅ አቁም' : 'የአድዋ አዋጅና ታሪክን አዳምጥ'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="menelik-ii"
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
            className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c0f05] via-[#100702] to-[#080301] border-3 border-[#f59e0b] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top Stage Controls */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
              <span className="px-3.5 py-1.5 rounded-2xl bg-black/85 border border-[#f59e0b] text-[11px] font-bold text-[#fef08a] flex items-center gap-2 shadow-xl backdrop-blur-md">
                <RotateCw size={13} className="text-[#f59e0b] animate-spin" />
                <span>ማዕዘን፡ {Math.round(rotationAngle)}° (360° Drag to Spin)</span>
              </span>

              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3.5 py-1.5 rounded-2xl bg-black/85 hover:bg-[#3d240f] border border-[#f59e0b] text-xs font-bold text-white flex items-center gap-1.5 shadow-xl backdrop-blur-md transition-all active:scale-95"
              >
                {isAutoSpinning ? <Pause size={13} className="text-yellow-400" /> : <Play size={13} className="text-green-400" />}
                <span>{isAutoSpinning ? 'አቁም' : 'ዙረት ጀምር (Auto-Spin)'}</span>
              </button>
            </div>

            {/* Glowing Backdrop Light */}
            <div 
              className="absolute w-72 h-72 rounded-full bg-[#f59e0b]/20 filter blur-3xl pointer-events-none transition-all duration-300"
              style={{
                transform: `scale(${1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.15})`
              }}
            />

            {/* The Emperor Menelik II Figure Display */}
            <div
              className="relative z-10 w-full h-[88%] flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src="/emperor_menelik_ii_official.png"
                alt="Emperor Menelik II Official Heritage Statue"
                className="max-h-full w-auto object-contain drop-shadow-[0_25px_45px_rgba(245,158,11,0.35)] select-none pointer-events-none"
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
                          ? 'scale-125 bg-[#da121a] border-yellow-300 ring-4 ring-[#f59e0b]/60'
                          : 'scale-100 bg-black/85 border-[#f59e0b] hover:scale-115'
                      }`}
                      style={{ top: hs.y, left: hs.x }}
                      title={hs.title}
                    >
                      <span className="text-xs">{hs.icon}</span>
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
                    </button>
                  );
                })
              ) : null}
            </div>

            {/* Bottom Pedestal Glow & Instruction */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs pointer-events-none">
              <span className="text-[11px] text-[#baa994] font-medium bg-black/80 px-3 py-1 rounded-xl border border-[#3d2714]">
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
              { label: '0° ፊት ለፊት (Front)', angle: 0 },
              { label: '45° የበትረ-መንግሥት እይታ', angle: 45 },
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
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black border-yellow-300 shadow-md scale-105'
                    : 'bg-[#180d05] text-[#baa994] border-[#3d2714] hover:border-[#f59e0b] hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Active Hotspot Info Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#241306] via-[#1a0c04] to-[#241306] border-2 border-[#f59e0b]/60 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentHotspot.icon}</span>
                <span className="text-base font-serif font-black text-white">{currentHotspot.title}</span>
              </div>
              <span className="text-[11px] font-mono text-[#fde047] font-bold">{currentHotspot.titleEn}</span>
            </div>
            <p className="text-xs text-[#fef3c7] leading-relaxed">
              {currentHotspot.desc}
            </p>
            <div className="text-[11px] text-[#baa994] italic border-t border-[#3d2714] pt-1">
              "{currentHotspot.descEn}"
            </div>
          </div>
        </div>

        {/* Right Column: Historical Proclamation, Specifications & Custom Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Adwa Historical Proclamation Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1a0f05] via-[#120702] to-[#0a0401] border-2 border-[#d97706] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scroll size={17} className="text-[#f59e0b]" />
                <h3 className="font-serif font-black text-sm text-[#fef08a] uppercase tracking-wide">
                  የዳግማዊ አፄ ምኒልክ የክተት አዋጅ (1888 ዓ.ም)
                </h3>
              </div>
              <span className="text-[10px] bg-[#078930]/40 text-[#86efac] px-2 py-0.5 rounded font-bold border border-[#22c55e]/40">
                አድዋ
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-[#f59e0b]/40 text-xs text-[#fef3c7] font-serif leading-relaxed italic border-l-4 border-l-[#f59e0b]">
              «እግዚአብሔር በቸርነቱ እስካሁን ጠበቀኝ፤ ጠላቴም ድንበር አልፎ ሀገሬንና ሃይማኖቴን ሊያጠፋ መጥቷልና ጉልበት ያለህ በጉልበትህ እርዳኝ፤ ጉልበት የሌለህም ለልጅህ፣ ለሚስትህ፣ ለሃይማኖትህ ስትል በጸሎትህ እርዳኝ!»
            </div>

            <p className="text-[11px] text-[#baa994] leading-relaxed">
              ይህ ታሪካዊ ጥሪ መላው የኢትዮጵያ ህዝብ ከየአቅጣጫው ተጉዞ በአድዋ ተራሮች ላይ የቅኝ ገዢዎችን ጦር ድል በማድረግ የአፍሪካ የነጻነት ተምሳሌት እንዲሆን አስችሏል።
            </p>
          </div>

          {/* Size / Collection Selector */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1c1006] to-[#120803] border-2 border-[#f59e0b]/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#fef08a] uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#f59e0b]" />
                ይፋዊ የቅርጽ መጠን (Edition)
              </span>
              <span className="text-xs text-[#86efac] font-mono font-bold">100% Handcrafted</span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#3d240e] to-[#251408] border-2 border-[#f59e0b] shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-black text-white">ሚኒ ቅርጽ (Mini Heritage Figurine)</span>
                  <span className="text-[10px] text-[#86efac] font-bold bg-[#22c55e]/20 px-2.5 py-0.5 rounded-full border border-[#22c55e]/40">
                    ✓ 7 ኢንች ብቻ (Only 7 Inch)
                  </span>
                </div>
                <div className="text-xs text-[#fde047]">7 ኢንች (18 ሳ.ሜ) • በጥቁር የተቀረጸ ፕሊንዝ መቆሚያ ላይ</div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-[#fde047] font-mono">
                  {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd}`}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ በክምችት ላይ ያለ</span>
              </div>
            </div>

            {/* Custom Plinth Engraving */}
            <div className="space-y-1.5 pt-2 border-t border-[#3d2714]">
              <label className="text-xs font-bold text-[#fef3c7] flex items-center justify-between">
                <span>በፕሊንዙ ላይ የሚቀረጽ የስም ስጦታ (Custom Plinth Engraving):</span>
                <span className="text-[10px] text-[#86efac]">ነጻ አገልግሎት</span>
              </label>
              <input
                type="text"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="የልጅዎን ስም ወይም የበረከት ቃል ይጻፉ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-[#f59e0b]/60 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#fde047] shadow-inner font-amharic"
              />
              <div className="text-[10px] text-[#baa994]">
                ምሳሌ፡ «ለተወዳጇ ልጃችን ሳባ» ወይም «Heritage Heroes Ethiopia 2026»
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-3 border-t border-[#3d2714] space-y-3">
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/30 active:scale-95 transition-all hover:scale-102"
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} className="text-black stroke-[3]" />
                    <span>ወደ ግዢ ቅርጫትዎ ተጨምሯል! (Added!)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} className="text-black" />
                    <span>ይህንን የዳግማዊ አፄ ምኒልክ ቅርጽ ይዘዙ (Add to Cart)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-4 rounded-2xl bg-[#140b04] border border-[#3d2714] space-y-2 text-xs">
            <div className="font-bold text-[#fef08a] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#f59e0b]" />
              በጥቅሉ ውስጥ የተካተቱ ይፋዊ ቁሳቁሶች፡
            </div>
            <ul className="space-y-1 text-[11px] text-[#d1d5db]">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የነገሥታት የወርቅ ዘውድ ከመስቀል ምልክት ጋር</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ጥቁር ቬልቬት ካባ በወርቅ ጥልፍና ዘርፍ ያጌጠ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የክብር የወርቅ በትረ-መንግሥት</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የተቀረጸበት ጥቁር የፕሊንዝ መቆሚያ ከነወርቃማ ጽሑፉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የአድዋ ድል ታሪክ መማሪያ ካርድና የQR ኮድ (Amharic & English)</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

