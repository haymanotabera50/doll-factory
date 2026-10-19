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
  Shield,
  Scroll,
  Layers,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';

interface AlulaMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const AlulaMasterpieceShowcase: React.FC<AlulaMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const alulaHero = ETHIOPIAN_HEROES.find(h => h.id === 'ras-alula') || ETHIOPIAN_HEROES[2];
  const alulaProduct = alulaHero.dolls[0];

  // Interactive states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string>('turban');
  const [selectedSize, setSelectedSize] = useState<'collector' | 'standard' | 'mini'>('collector');
  const [engravingText, setEngravingText] = useState<string>('ለተወዳጁ ልጃችን / For Our Brave Son');
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

  // Play historical battle oath
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
      ...alulaProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${alulaProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${alulaProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#facc15', '#ef4444', '#15803d', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture of Ras Alula Engida
  const hotspots = [
    {
      id: 'turban',
      title: 'ነጭ የጦር አበጋዝ ጥምጣም',
      titleEn: 'White Commander Turban',
      y: '10%',
      x: '50%',
      icon: '👳',
      desc: 'የሰሜን ግንባር ዋና አዛዥ የነበሩት ራዕሲ አሉላ በክብርና በጀግንነት የጠመጠሙት ባህላዊ ነጭ ጥምጣም፣ የንቃትና የቆራጥነት መገለጫ።',
      descEn: 'Traditional pure white wrapped commander turban symbolizing military resolve and high northern leadership.'
    },
    {
      id: 'cloak',
      title: 'ንጹህ ነጭ የተዋጊ ካባ',
      titleEn: 'Billowing White Warrior Cloak',
      y: '35%',
      x: '30%',
      icon: '🧥',
      desc: 'በትከሻቸው ላይ በክብር ያረፈ፣ በነፋስ የሚውለበለብ ንጹህ ነጭ የጦረኛ ካባ፤ በውስጥ ጥቁር ወታደራዊ ጃኬት ከወርቃማ አዝራሮች ጋር የታጀበ።',
      descEn: 'Full billowing pure white cotton warrior cloak draped over shoulders, with a dark military tunic beneath.'
    },
    {
      id: 'rifle',
      title: 'ታሪካዊ የዶጋሊና የአድዋ ጠመንጃ',
      titleEn: 'Historic Battle Rifle',
      y: '50%',
      x: '68%',
      icon: '🎯',
      desc: 'በቀኝ እጃቸው ይዘው መቆሚያው ላይ ያሳረፉት፣ በዶጋሊና በአድዋ ተራሮች ላይ የሀገርን ዳር ድንበር ያስከበረ እውነተኛ ታሪካዊ ጠመንጃ።',
      descEn: 'Authentic 19th-century defender rifle held firmly in his right hand, guarding Ethiopian sovereign soil.'
    },
    {
      id: 'bandolier',
      title: 'ባህላዊ የቆዳ ጥይት ቀበቶና ታጣቂ ሰይፍ',
      titleEn: 'Leather Cartridge Bandolier & Scabbard',
      y: '42%',
      x: '50%',
      icon: '⚔️',
      desc: 'በደረትና በወገባቸው ላይ የታጠቁት እውነተኛ የቆዳ ጥይት መያዣ ቀበቶ ከነናስ ጥይቶቹ እና በግራ ጎናቸው የታጠቀው ባህላዊ ሰይፍ/ሾተል።',
      descEn: 'Embossed leather cartridge belt crossed over the chest with brass ammunition and side-sheathed warrior sword.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '88%',
      x: '50%',
      icon: '🏛️',
      desc: '«Ras Alula Engida (c. 1857 – 1917) • A fearless leader. A defender of Ethiopia. A champion of freedom.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Heavy collector plinth base with polished gold metallic inscription celebrating the Lion of Dogali.'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="alula-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#172e18] via-[#102411] to-[#0a180b] border-3 border-[#22c55e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#22c55e]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#f59e0b]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e] text-[#86efac] text-xs font-black shadow">
              <Shield size={15} className="text-[#4ade80]" />
              <span>OFFICIAL MASTERPIECE WARRIOR FIGURE • ይፋዊ የራዕሲ አሉላ እንግዳ (አባ ነጋ) ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              ራዕሲ አሉላ እንግዳ <span className="text-[#86efac] font-black">(c. 1857 – 1917)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «A fearless leader. A defender of Ethiopia. A champion of freedom.»
            </p>

            <p className="text-[#fef3c7] text-xs sm:text-sm leading-relaxed font-normal">
              የዶጋሊውና የአድዋው አንበሳ፣ ታማኙ የፈረስ አባት አባ ነጋ! በነጭ ጥምጣም፣ በተዋጊ ካባ፣ በቆዳ ጥይት ቀበቶና ታሪካዊ ጠመንጃ ያሸበረቀውን ይፋዊ ቅርጽ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#09150a] rounded-2xl border border-[#22c55e]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#86efac] font-bold uppercase">የጀግንነት ታሪክ (Heroism)</div>
              <div className="text-sm font-black text-[#fef08a]">የዶጋሊና የአድዋ አንበሳ</div>
              <div className="text-xs text-[#86efac] font-mono">Abba Nega (Dogali 1887)</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-gradient-to-r from-[#da121a] to-[#ea580c] text-white border-red-400 animate-pulse'
                  : 'bg-[#183a1b] hover:bg-[#204a24] text-[#fde047] border-[#22c55e]'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'የጀግናውን ድምፅ አቁም' : 'የአባ ነጋን የውጊያ መሀላ አዳምጥ'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="ras-alula"
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
            className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#142616] via-[#0b170c] to-[#040904] border-3 border-[#22c55e] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top Stage Controls */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
              <span className="px-3.5 py-1.5 rounded-2xl bg-black/85 border border-[#22c55e] text-[11px] font-bold text-[#fef08a] flex items-center gap-2 shadow-xl backdrop-blur-md">
                <RotateCw size={13} className="text-[#22c55e] animate-spin" />
                <span>ማዕዘን፡ {Math.round(rotationAngle)}° (360° Drag to Spin)</span>
              </span>

              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3.5 py-1.5 rounded-2xl bg-black/85 hover:bg-[#153418] border border-[#22c55e] text-xs font-bold text-white flex items-center gap-1.5 shadow-xl backdrop-blur-md transition-all active:scale-95"
              >
                {isAutoSpinning ? <Pause size={13} className="text-yellow-400" /> : <Play size={13} className="text-green-400" />}
                <span>{isAutoSpinning ? 'አቁም' : 'ዙረት ጀምር (Auto-Spin)'}</span>
              </button>
            </div>

            {/* Glowing Backdrop Light */}
            <div 
              className="absolute w-72 h-72 rounded-full bg-[#22c55e]/20 filter blur-3xl pointer-events-none transition-all duration-300"
              style={{
                transform: `scale(${1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.15})`
              }}
            />

            {/* The Ras Alula Figure Display */}
            <div
              className="relative z-10 w-full h-[88%] flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src="/ras_alula_engida_official.png"
                alt="Ras Alula Engida Official Heritage Statue"
                className="max-h-full w-auto object-contain drop-shadow-[0_25px_45px_rgba(34,197,94,0.35)] select-none pointer-events-none"
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
                          ? 'scale-125 bg-[#22c55e] border-yellow-300 ring-4 ring-[#22c55e]/60'
                          : 'scale-100 bg-black/85 border-[#22c55e] hover:scale-115'
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
              <span className="text-[11px] text-[#86efac] font-medium bg-black/80 px-3 py-1 rounded-xl border border-[#1b3d1f]">
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
              { label: '0° ፊት ለፊት (Front Guard)', angle: 0 },
              { label: '45° የጠመንጃና የጥይት ቀበቶ', angle: 45 },
              { label: '90° የጎን ግርማ (Profile)', angle: 90 },
              { label: '180° የካባው ሙሉ እይታ (Back)', angle: 180 },
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
                    ? 'bg-gradient-to-r from-[#22c55e] to-[#15803d] text-white border-yellow-300 shadow-md scale-105'
                    : 'bg-[#0f2111] text-[#baa994] border-[#1f4222] hover:border-[#22c55e] hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Active Hotspot Info Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#173019] via-[#0d1c0e] to-[#173019] border-2 border-[#22c55e]/60 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentHotspot.icon}</span>
                <span className="text-base font-serif font-black text-white">{currentHotspot.title}</span>
              </div>
              <span className="text-[11px] font-mono text-[#86efac] font-bold">{currentHotspot.titleEn}</span>
            </div>
            <p className="text-xs text-[#fef3c7] leading-relaxed">
              {currentHotspot.desc}
            </p>
            <div className="text-[11px] text-[#baa994] italic border-t border-[#1f4222] pt-1">
              "{currentHotspot.descEn}"
            </div>
          </div>
        </div>

        {/* Right Column: Historical Wisdom, Specifications & Custom Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Historical Quote Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#122614] via-[#0a180b] to-[#050d06] border-2 border-[#22c55e] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scroll size={17} className="text-[#4ade80]" />
                <h3 className="font-serif font-black text-sm text-[#86efac] uppercase tracking-wide">
                  የራዕሲ አሉላ (አባ ነጋ) የድንበር ጠባቂነት መሀላ
                </h3>
              </div>
              <span className="text-[10px] bg-[#22c55e]/30 text-[#86efac] px-2 py-0.5 rounded font-bold border border-[#22c55e]/50">
                ዶጋሊ 1887
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-[#22c55e]/40 text-xs text-[#fef3c7] font-serif leading-relaxed italic border-l-4 border-l-[#22c55e]">
              «የኢትዮጵያን ዳር ድንበር የሚደፍር ጠላት በሕይወቴ እያለሁ አያልፍም!»
            </div>

            <p className="text-[11px] text-[#baa994] leading-relaxed">
              ራዕሲ አሉላ በ19ኛው መቶ ክፍለ ዘመን በዶጋሊ፣ በኩፊትና በአድዋ ጦርነቶች የአውሮፓን ቅኝ ገዢ ጦር ድል በማድረግ በዓለም አቀፍ ደረጃ በታላቅ የጦር ስትራቴጂስትነታቸው የታወቁ ታላቅ ጀግና ናቸው።
            </p>
          </div>

          {/* Size / Collection Selector */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#102412] to-[#071308] border-2 border-[#22c55e]/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#86efac] uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#22c55e]" />
                ይፋዊ የቅርጽ መጠን (Edition)
              </span>
              <span className="text-xs text-[#86efac] font-mono font-bold">100% Handcrafted</span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c4520] to-[#112d14] border-2 border-[#22c55e] shadow-lg flex items-center justify-between">
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
            <div className="space-y-1.5 pt-2 border-t border-[#1f4222]">
              <label className="text-xs font-bold text-[#fef3c7] flex items-center justify-between">
                <span>በፕሊንዙ ላይ የሚቀረጽ የስም ስጦታ (Custom Plinth Engraving):</span>
                <span className="text-[10px] text-[#86efac]">ነጻ አገልግሎት</span>
              </label>
              <input
                type="text"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="የልጅዎን ስም ወይም የበረከት ቃል ይጻፉ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-[#22c55e]/60 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#4ade80] shadow-inner font-amharic"
              />
              <div className="text-[10px] text-[#baa994]">
                ምሳሌ፡ «ለተወዳጁ ልጃችን ናሆም - የነገው ጀግና» ወይም «Ras Alula Heritage 2026»
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-3 border-t border-[#1f4222] space-y-3">
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ea580c] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-green-500/30 active:scale-95 transition-all hover:scale-102"
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} className="text-black stroke-[3]" />
                    <span>ወደ ግዢ ቅርጫትዎ ተጨምሯል! (Added!)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} className="text-black" />
                    <span>ይህንን የራዕሲ አሉላ ቅርጽ ይዘዙ (Add to Cart)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-4 rounded-2xl bg-[#09150a] border border-[#1f4222] space-y-2 text-xs">
            <div className="font-bold text-[#86efac] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#22c55e]" />
              በጥቅሉ ውስጥ የተካተቱ ይፋዊ ቁሳቁሶች፡
            </div>
            <ul className="space-y-1 text-[11px] text-[#d1d5db]">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ነጭ ባህላዊ የጦር አበጋዝ ጥምጣም</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ንጹህ ነጭ የተዋጊ ካባና ጥቁር ወታደራዊ ጃኬት</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>በእጅ የተያዘ ታሪካዊ ጠመንጃ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ባህላዊ የቆዳ ጥይት መያዣ ቀበቶና ታጣቂ ሰይፍ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የተቀረጸበት ጥቁር የፕሊንዝ መቆሚያ ከነወርቃማ ጽሑፉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የዶጋሊና የአድዋ ድል መማሪያ ካርድና የQR ኮድ (Amharic & English)</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
