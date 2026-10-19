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
  Flame,
  Flag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';

interface AbebeMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const AbebeMasterpieceShowcase: React.FC<AbebeMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const abebeHero = ETHIOPIAN_HEROES.find(h => h.id === 'abebe-bikila') || ETHIOPIAN_HEROES[3];
  const abebeProduct = abebeHero.dolls[0];

  // Interactive states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string>('jersey');
  const [selectedSize, setSelectedSize] = useState<'collector' | 'standard' | 'mini'>('collector');
  const [engravingText, setEngravingText] = useState<string>('ለተወዳጁ ልጃችን / For Our Future Champion');
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

  // Play historical Olympic interview audio narration
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
      ...abebeProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${abebeProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${abebeProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#078930', '#facc15', '#da121a', '#22c55e', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture of Captain Abebe Bikila
  const hotspots = [
    {
      id: 'jersey',
      title: 'የሮም ኦሊምፒክ አረንጓዴ ማሊያ #11',
      titleEn: 'Historic Green Singlet ETHIOPIA 11',
      y: '22%',
      x: '50%',
      icon: '🎽',
      desc: 'በ1960 የሮም ኦሊምፒክ ማራቶን አበበ ቢቂላ ለብሶት ዓለምን ያስደነቀው አረንጓዴ የኢትዮጵያ ማሊያ ቁጥር 11፤ የጽናትና የድል አርማ።',
      descEn: 'Authentic miniature of the iconic green Rome 1960 marathon singlet featuring white ETHIOPIA 11 bib.'
    },
    {
      id: 'flag',
      title: 'በትከሻው የተጎናጸፈው የኢትዮጵያ ሰንደቅ ዓላማ',
      titleEn: 'Draped Ethiopian National Tricolor Flag',
      y: '32%',
      x: '75%',
      icon: '🇪🇹',
      desc: 'ከትከሻው ተነስቶ ክንዱ ላይ በክብር የተሞሸረ ባለግርማ አረንጓዴ፣ ቢጫ፣ ቀይ የኢትዮጵያ ሰንደቅ ዓላማ፤ የመላው አፍሪካ የድል ቀንዲል።',
      descEn: 'Flowing national tricolor flag draped over his shoulders celebrating the historic first African gold medal.'
    },
    {
      id: 'shorts',
      title: 'ነጭ የአትሌቲክስ ቁምጣ',
      titleEn: 'Classic White Athletic Shorts',
      y: '42%',
      x: '50%',
      icon: '🩳',
      desc: 'ቀላልና ለስላሳ 100% ንጹህ ጥጥ ነጭ የአትሌት ቁምጣ፣ የተፈጥሮን ፍጥነትና የኢትዮጵያ አትሌቲክስ መነሻን የሚያስታውስ።',
      descEn: 'Lightweight white marathon running shorts tailored with natural elastic comfort.'
    },
    {
      id: 'legs',
      title: 'የሮጡት እግሮችና የሯጭ አቋቋም',
      titleEn: 'Runner Stance & Barefoot Legend',
      y: '65%',
      x: '50%',
      icon: '👟',
      desc: 'በሮም ጎዳናዎች በባዶ እግራቸው ሮጠው የዓለምን ሪከርድ የሰበሩበትን ታሪክ የሚዘክር፣ ወደፊት የሚገሰግስ የጀግና ሯጭ አቋቋም።',
      descEn: 'Sculpted muscular runner legs poised mid-stride, honoring the legendary barefoot marathon record.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '88%',
      x: '50%',
      icon: '🏛️',
      desc: '«Abebe Bikila (1932 – 1973) • Ran for a nation. Inspired the world. An Olympic legend.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Solid collector plinth with gold lettering commemorating the immortal Olympic legend.'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="abebe-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d2a13] via-[#143c1b] to-[#071d0b] border-3 border-[#22c55e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#22c55e]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#facc15]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#078930]/30 border border-[#22c55e] text-[#86efac] text-xs font-black shadow">
              <Award size={15} className="text-[#fde047]" />
              <span>OFFICIAL MASTERPIECE SPORTS LEGEND • ይፋዊ የሻምበል አበበ ቢቂላ ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              ሻምበል አበበ ቢቂላ <span className="text-[#fde047] font-black">(1932 – 1973)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «Ran for a nation. Inspired the world. An Olympic legend.»
            </p>

            <p className="text-[#fef3c7] text-xs sm:text-sm leading-relaxed font-normal">
              ለአፍሪካ የመጀመሪያውን የኦሊምፒክ የወርቅ ሜዳሊያ ያስገኘው፣ በሮም 1960 በባዶ እግሩ ሮጦ የዓለምን ሪከርድ የሰበረው እና በቶኪዮ 1964 ድሉን የደገመው ታላቁ ሻምበል አበበ ቢቂላ ቅርጽ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#051608] rounded-2xl border border-[#22c55e]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#86efac] font-bold uppercase">የኦሊምፒክ ድል (Olympic Glory)</div>
              <div className="text-sm font-black text-[#fde047]">2 ጊዜ የኦሊምፒክ ሻምፒዮን</div>
              <div className="text-xs text-[#86efac] font-mono">Rome 1960 & Tokyo 1964</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-gradient-to-r from-[#da121a] to-[#ea580c] text-white border-red-400 animate-pulse'
                  : 'bg-[#1b4322] hover:bg-[#255e30] text-[#fde047] border-[#22c55e]'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'የአበበን ድምፅ አቁም' : 'የአበበን ታሪካዊ ቃል አዳምጥ'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="abebe-bikila"
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
            className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0f2814] via-[#091a0d] to-[#040e06] border-3 border-[#22c55e] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top Stage Controls */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
              <span className="px-3.5 py-1.5 rounded-2xl bg-black/85 border border-[#22c55e] text-[11px] font-bold text-[#fef08a] flex items-center gap-2 shadow-xl backdrop-blur-md">
                <RotateCw size={13} className="text-[#22c55e] animate-spin" />
                <span>ማዕዘን፡ {Math.round(rotationAngle)}° (360° Drag to Spin)</span>
              </span>

              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3.5 py-1.5 rounded-2xl bg-black/85 hover:bg-[#14361a] border border-[#22c55e] text-xs font-bold text-white flex items-center gap-1.5 shadow-xl backdrop-blur-md transition-all active:scale-95"
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

            {/* The Abebe Bikila Figure Display */}
            <div
              className="relative z-10 w-full h-[88%] flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src="/abebe_bikila_official.png"
                alt="Captain Abebe Bikila Official Heritage Statue"
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
                          ? 'scale-125 bg-[#eab308] border-black ring-4 ring-[#22c55e]/60'
                          : 'scale-100 bg-black/85 border-[#22c55e] hover:scale-115'
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
              <span className="text-[11px] text-[#86efac] font-medium bg-black/80 px-3 py-1 rounded-xl border border-[#14361a]">
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
              { label: '0° ፊት ለፊት (Front Stance)', angle: 0 },
              { label: '45° የማሊያው ቁጥር 11 እና ባንዲራ', angle: 45 },
              { label: '90° የጎን አትሌቲክስ ግስጋሴ', angle: 90 },
              { label: '180° የባንዲራው ሙሉ ሽፋን', angle: 180 },
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
                    : 'bg-[#0f2814] text-[#baa994] border-[#1d4d25] hover:border-[#22c55e] hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Active Hotspot Info Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#12361a] via-[#0a200f] to-[#12361a] border-2 border-[#22c55e]/60 shadow-xl space-y-2">
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
            <div className="text-[11px] text-[#baa994] italic border-t border-[#1d4d25] pt-1">
              "{currentHotspot.descEn}"
            </div>
          </div>
        </div>

        {/* Right Column: Historical Wisdom, Specifications & Custom Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Historical Quote Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0f2c16] via-[#091d0e] to-[#041008] border-2 border-[#22c55e] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scroll size={17} className="text-[#4ade80]" />
                <h3 className="font-serif font-black text-sm text-[#86efac] uppercase tracking-wide">
                  የሻምበል አበበ ቢቂላ ታሪካዊ ቃል
                </h3>
              </div>
              <span className="text-[10px] bg-[#22c55e]/30 text-[#86efac] px-2 py-0.5 rounded font-bold border border-[#22c55e]/50">
                ሮም 1960
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-[#22c55e]/40 text-xs text-[#fef3c7] font-serif leading-relaxed italic border-l-4 border-l-[#22c55e]">
              «ሀገሬ ኢትዮጵያ ምንጊዜም በጽናትና በጀግንነት የምታሸንፍ መሆኗን ዓለም እንዲያውቅ ፈለግሁ!»
            </div>

            <p className="text-[11px] text-[#baa994] leading-relaxed">
              በ1960 የሮም ኦሊምፒክ በባዶ እግሩ በመሮጥ 2:15:16 በሆነ የዓለም ሪከርድ የወርቅ ሜዳሊያ ሲያሸንፍ፣ ከ4 ዓመታት በኋላ በቶኪዮ 1964 የትርፍ አንጀት ቀዶ ጥገና አድርጎ በ40 ቀኑ ድሉን ደግሟል።
            </p>
          </div>

          {/* Size / Collection Selector */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#102c17] to-[#08180c] border-2 border-[#22c55e]/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#86efac] uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#22c55e]" />
                ይፋዊ የቅርጽ መጠን (Edition)
              </span>
              <span className="text-xs text-[#86efac] font-mono font-bold">100% Handcrafted</span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1b4b23] to-[#103016] border-2 border-[#22c55e] shadow-lg flex items-center justify-between">
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
            <div className="space-y-1.5 pt-2 border-t border-[#1d4d25]">
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
                ምሳሌ፡ «ለተወዳጁ ልጃችን ኤልያስ - የነገው ሯጭ» ወይም «Abebe Bikila Olympic Heritage 2026»
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-3 border-t border-[#1d4d25] space-y-3">
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
                    <span>ይህንን የሻምበል አበበ ቢቂላ ቅርጽ ይዘዙ (Add to Cart)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-4 rounded-2xl bg-[#07190c] border border-[#1d4d25] space-y-2 text-xs">
            <div className="font-bold text-[#86efac] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#22c55e]" />
              በጥቅሉ ውስጥ የተካተቱ ይፋዊ ቁሳቁሶች፡
            </div>
            <ul className="space-y-1 text-[11px] text-[#d1d5db]">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>አረንጓዴ የማራቶን ልብስ ቁጥር 11 (ETHIOPIA 11)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>በትከሻው የተጎናጸፈው የኢትዮጵያ ሰንደቅ ዓላማ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ነጭ የአትሌቲክስ ቁምጣና የሯጭ አቋቋም</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የተቀረጸበት ጥቁር የፕሊንዝ መቆሚያ ከነወርቃማ ጽሑፉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የሮምና የቶኪዮ ድል መማሪያ ካርድና የQR ኮድ (Amharic & English)</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

