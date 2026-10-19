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
  BookOpen,
  Scroll,
  Layers,
  Heart,
  Briefcase,
  Award,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';
import { WeredeMamo3DExhibition } from './WeredeMamo3DExhibition';

interface WeredeMamoMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const WeredeMamoMasterpieceShowcase: React.FC<WeredeMamoMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const weredeHero = ETHIOPIAN_HEROES.find(h => h.id === 'werede-mamo') || ETHIOPIAN_HEROES[9];
  const weredeProduct = weredeHero.dolls[0];

  // Interactive states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string>('book');
  const [selectedSize, setSelectedSize] = useState<'collector' | 'standard' | 'mini'>('collector');
  const [engravingText, setEngravingText] = useState<string>('ለትምህርትና ለጥበብ / For Education & Wisdom');
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

  // Play historical quote audio
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
      ...weredeProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${weredeProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${weredeProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#10b981', '#facc15', '#06b6d4', '#e2e8f0', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture of Werede Mamo
  const hotspots = [
    {
      id: 'turban',
      title: 'የተጠቀለለ ነጭ የሐር ሻሽ ከነወርቃማ ጌጡ',
      titleEn: 'White Silk Turban Headwrap with Golden Accent',
      y: '11%',
      x: '50%',
      icon: '✨',
      desc: 'በጥንቃቄና በውበት የተጠቀለለ ንጹህ ነጭ የሐር ሻሽ፣ ከጎኑ የወርቅ ጌጥ የተሰካበት ሲሆን የጥንታዊት ኢትዮጵያዊት ምሁርና መሪነት ክብርን ያጎላል።',
      descEn: 'Elegantly wrapped white silk shash headwrap pinned with a delicate gold accent, reflecting classic Ethiopian scholarship and dignity.'
    },
    {
      id: 'book',
      title: 'የጥበብና የትምህርት መዝገብ/መጽሐፍ',
      titleEn: 'Wisdom Portfolio & Bound Leather Book',
      y: '33%',
      x: '56%',
      icon: '📖',
      desc: 'በሁለት እጆቿ የተያዘው ጥቁር የቆዳ መጽሐፍና ማህደር፣ የሴት ልጆች ትምህርት መስፋፋትንና የህብረተሰብ ንቃተ-ህሊናን የሚያመለክት ነው።',
      descEn: 'Held securely in both hands, the dark leather book and folio symbolize her pioneering work in women’s literacy and public education.'
    },
    {
      id: 'handbag',
      title: 'ክላሲክ ጥቁር የቆዳ የእጅ ቦርሳ ከነወርቅ ማንጠልጠያው',
      titleEn: 'Classic Structured Leather Handbag',
      y: '43%',
      x: '28%',
      icon: '👜',
      desc: 'በቀኝ ክንዷ ላይ ያረፈው ክላሲክ ጥቁር የቆዳ የእጅ ቦርሳ ከወርቃማ መቆለፊያ ጋር፣ የዘመናዊቷን የተማረች ኢትዮጵያዊት እንስት ቅንጡ ገጽታ ያሳያል።',
      descEn: 'Draped on her right forearm, this structured black leather handbag with metallic gold hardware embodies 20th-century sophistication.'
    },
    {
      id: 'dress',
      title: 'ንጹህ ነጭ የተንጣለለ ቀሚስና የወርቅ ኮሌታ',
      titleEn: 'Flowing Cream White Dress with Bell Sleeves',
      y: '55%',
      x: '50%',
      icon: '👗',
      desc: '100% ንጹህ ኦርጋኒክ ጥጥ ሰፊ እጅጌ ያለው ነጭ ልብስ፣ በአንገቱ ዙሪያ በስሱ የተጠለፈ የወርቅ ኮሌታ ያጌጠበት ነው።',
      descEn: 'Floor-skimming natural ivory-white cotton dress featuring graceful wide bell sleeves and subtle gold thread neckline embroidery.'
    },
    {
      id: 'shoes',
      title: 'ባህላዊ የቆዳ ጫማዎች',
      titleEn: 'Classic Leather Walking Boots',
      y: '78%',
      x: '50%',
      icon: '👢',
      desc: 'በከተማና በገጠር ትምህርትን ለማስፋፋት በርካታ ኪሎሜትሮችን የጓዘችበትን ጽናት የሚያስታውሱ ጠንካራ የቆዳ ጫማዎች።',
      descEn: 'Sturdy brown leather walking boots honoring her relentless travels across towns and villages to establish schools.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '90%',
      x: '50%',
      icon: '🏛️',
      desc: '«Werede Mamo (1885 – 1936) • An educator. A feminist. A voice for women\'s rights.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Solid collector plinth bearing metallic gold inscription: "An educator. A feminist. A voice for women\'s rights."'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="werede-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1f1c] via-[#122e29] to-[#071614] border-3 border-[#10b981] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#10b981]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#f59e0b]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/20 border border-[#10b981] text-[#a7f3d0] text-xs font-black shadow">
              <GraduationCap size={15} className="text-[#34d399]" />
              <span>OFFICIAL MASTERPIECE HEROINE FIGURE • ይፋዊ የወይዘሮ ወረደ ማሞ ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              ወይዘሮ ወረደ ማሞ <span className="text-[#6ee7b7] font-black">(1885 – 1936)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «An educator. A feminist. A voice for women's rights.»
            </p>

            <p className="text-[#d1fae5] text-xs sm:text-sm leading-relaxed font-normal">
              ፈር ቀዳጅ የትምህርት መሪ፣ የሴቶች እኩልነትና የማህበራዊ ፍትህ ተሟጋች። በንጹህ ነጭ ልብስ፣ በሐር ሻሽ፣ በቆዳ መጽሐፍና የእጅ ቦርሳ ያጌጠውን ይፋዊ ቅርጽ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#061412] rounded-2xl border border-[#10b981]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#a7f3d0] font-bold uppercase">ክብርና ማዕረግ (Legacy)</div>
              <div className="text-sm font-black text-[#fef08a]">የሴቶች ትምህርት ፈር-ቀዳጅ</div>
              <div className="text-xs text-[#6ee7b7] font-mono">Champion of Literacy & Equality</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-amber-500 border-amber-300 text-slate-950 animate-pulse'
                  : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-100 hover:bg-emerald-900 hover:border-emerald-400'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'ድምፅን አቁም (Stop Audio)' : 'የወረደ ማሞ ቃል (Listen Quote)'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="werede-mamo"
              defaultLanguage={language}
              onClose={() => setIsPlayingSpeech(false)}
            />
          </div>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real 3D WebGL Exhibition Stage (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <WeredeMamo3DExhibition language={language} />
        </div>

        {/* Right Column: Customization, Inscription & Order (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Historical Plinth Inscription Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Scroll size={16} />
              <span>የክብር ፕሊንዝ መግለጫ (Official Pedestal Plinth)</span>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-emerald-600/50 text-center space-y-2 shadow-inner">
              <div className="text-xl sm:text-2xl font-serif font-black text-amber-400 tracking-wider">
                Werede Mamo
              </div>
              <div className="text-xs text-emerald-300 font-mono tracking-widest uppercase">
                (1885 – 1936)
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2" />
              <div className="text-xs sm:text-sm font-serif italic text-slate-200 leading-snug">
                An educator.<br />
                A feminist.<br />
                A voice for women's rights.
              </div>
            </div>

            <div className="text-[11px] text-slate-300 leading-relaxed">
              ይህ ይፋዊ መቆሚያ ልክ እንደ ብሔራዊ ሀውልት በንጹህ ጥቁር ድንጋይ መልክ የተሰራ ሲሆን በወርቃማ ጽሑፍ የወይዘሮ ወረደ ማሞ ታሪክ ተቀርጾበታል።
            </div>
          </div>

          {/* Size & Edition Selector */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Layers size={16} />
                <span>ይፋዊ የቅርጽ መጠን (Edition)</span>
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold">
                {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd}`}
              </span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-950 border-2 border-emerald-400 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-black text-white">ሚኒ ቅርጽ (Mini Heritage Figurine)</span>
                  <span className="text-[10px] text-[#86efac] font-bold bg-[#22c55e]/20 px-2.5 py-0.5 rounded-full border border-[#22c55e]/40">
                    ✓ 7 ኢንች ብቻ (Only 7 Inch)
                  </span>
                </div>
                <div className="text-xs text-emerald-300">7 ኢንች (18 ሳ.ሜ) • በጥቁር የተቀረጸ ፕሊንዝ መቆሚያ ላይ</div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-amber-400 font-mono">
                  {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd}`}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ በክምችት ላይ ያለ</span>
              </div>
            </div>

            {/* Custom Plinth Engraving Input */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                <span>የተጠቃሚ ስም ወይም የስጦታ መልእክት ቅርጻ (Free Plinth Engraving):</span>
                <span className="text-[10px] text-slate-400 font-normal">ነፃ ስጦታ</span>
              </label>
              <input
                type="text"
                value={engravingText}
                onChange={e => setEngravingText(e.target.value)}
                placeholder="ለምሳሌ፡ ለተወዳጇ ልጃችን / For Our Brilliant Student!"
                maxLength={45}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[10px] text-slate-400">በፕሊንዙ የፊት ገጽታ ላይ በጥንቃቄ በወርቃማ ጽሑፍ የሚቀረጽ</p>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Award size={15} />
              <span>ከቅርጹ ጋር አብረው የሚመጡ ይፋዊ እቃዎች (In Box):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              {weredeProduct.accessoriesIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                  <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="space-y-3">
            <button
              onClick={handleOrder}
              disabled={addedSuccess}
              className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl transform active:scale-95 ${
                addedSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white hover:shadow-emerald-500/30'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check size={22} className="animate-bounce" />
                  <span>ወደ ቅርጫት ገብቷል! (Added to Cart!)</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={22} />
                  <span>
                    ይህንን የወይዘሮ ወረደ ማሞ ቅርጽ ይዘዙ (
                    {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd}`})
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Check size={13} className="text-emerald-400" />
                በአዲስ አበባ በ24 ሰዓት ውስጥ ማድረስ
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Check size={13} className="text-emerald-400" />
                ዓለም አቀፍ ፈጣን መላኪያ (Worldwide Shipping)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

