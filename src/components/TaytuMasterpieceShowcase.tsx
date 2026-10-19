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
  Crown,
  Scroll,
  Layers,
  Heart,
  Flower2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';
import { Taytu3DExhibition } from './Taytu3DExhibition';

interface TaytuMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const TaytuMasterpieceShowcase: React.FC<TaytuMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const taytuHero = ETHIOPIAN_HEROES.find(h => h.id === 'taytu-betul') || ETHIOPIAN_HEROES[1];
  const taytuProduct = taytuHero.dolls[0];

  // Interactive states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string>('tiara');
  const [selectedSize, setSelectedSize] = useState<'collector' | 'standard' | 'mini'>('collector');
  const [engravingText, setEngravingText] = useState<string>('ለተወዳጇ ልጃችን / For Our Beloved Daughter');
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
      ...taytuProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${taytuProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${taytuProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#facc15', '#22c55e', '#38bdf8', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture of Empress Taytu Betul
  const hotspots = [
    {
      id: 'tiara',
      title: 'ንጉሣዊ የወርቅ አክሊልና ጌጣጌጥ',
      titleEn: 'Imperial Tiara & Jewelry',
      y: '10%',
      x: '50%',
      icon: '👑',
      desc: 'በተጠረዘ ፀጉሯ ላይ ያረፈ የወርቅ አክሊል፣ ጥንድ የወርቅ የጆሮ ጌጦች እና የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መስቀል ያረፈበት የወርቅ ሐብል (Choker necklace with cross pendant)።',
      descEn: 'Golden tiara set on coiled hair, matched with drop gold earrings and an Ethiopian cross choker necklace.'
    },
    {
      id: 'kemis',
      title: 'ንጹህ ነጭ ባህላዊ የሐበሻ ቀሚስ',
      titleEn: 'Royal White Habesha Kemis',
      y: '45%',
      x: '50%',
      icon: '👗',
      desc: 'በእጅ የተሸመነ 100% ኦርጋኒክ ንጹህ ጥጥ ነጭ ቀሚስ፣ በመሃል በኩል የሚያማምሩ የወርቅ አዝራሮች ያሉት የንጉሣዊ ልዕልና ልብስ።',
      descEn: 'Traditional pure white handwoven cotton dress featuring central decorative button detailing.'
    },
    {
      id: 'tibeb',
      title: 'ባለቀለም የጥበብ ጥልፍ ሻሽ/ነጠላ',
      titleEn: 'Vibrant Geometric Tibeb Sash',
      y: '40%',
      x: '30%',
      icon: '🌺',
      desc: 'በደማቅ አረንጓዴ፣ ቀይ፣ ቢጫና ሰማያዊ ጂኦሜትሪክ የዳይመንድ ጥበብ የተሸመነ፣ በወርቃማ ዘርፍ (fringe tassels) የተዋበ ባህላዊ ሻሽ።',
      descEn: 'Traditional multicolored Tibeb sash with intricate geometric diamond motifs and golden tassel fringes.'
    },
    {
      id: 'hands',
      title: 'የዲፕሎማሲና የስትራቴጂ እጆች',
      titleEn: 'Hands of Diplomacy & Adwa Command',
      y: '58%',
      x: '50%',
      icon: '✨',
      desc: 'የወርቅ አምባሮች ያጌጡባቸው፣ በትህትናና በግርማ-ሞገስ የተቆላለፉት የእቴጌ ጣይቱ እጆች የአዲስ አበባን መስራችነትና የአድዋን ስትራቴጂካዊ ውሳኔ ያመላክታሉ።',
      descEn: 'Adorned with gold bangles, her folded hands signify royal dignity, statecraft, and tactical brilliance.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '88%',
      x: '50%',
      icon: '🏛️',
      desc: '«Empress Taytu Betul (1842 – 1918) • A political leader. A symbol of strength. A bridge between tradition and progress.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Solid collector plinth bearing metallic gold inscription honoring her historic legacy.'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="taytu-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2a0e1a] via-[#351424] to-[#1c0812] border-3 border-[#f43f5e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#f43f5e]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#f59e0b]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f43f5e]/20 border border-[#f43f5e] text-[#fecdd3] text-xs font-black shadow">
              <Crown size={15} className="text-[#fb7185]" />
              <span>OFFICIAL MASTERPIECE HEROINE FIGURE • ይፋዊ የእቴጌ ጣይቱ ብጡል ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              እቴጌ ጣይቱ ብጡል <span className="text-[#fb7185] font-black">(1842 – 1918)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «A political leader. A symbol of strength. A bridge between tradition and progress.»
            </p>

            <p className="text-[#fef3c7] text-xs sm:text-sm leading-relaxed font-normal">
              የብርሃን ዘኢትዮጵያ፣ የአዲስ አበባ መስራች እና የአድዋ ድል ቁልፍ ስትራቴጂስት። በንጹህ ነጭ ቀሚስ፣ ባለቀለም የጥበብ ሻሽ፣ የወርቅ አክሊልና ሐብል ያጌጠውን ይፋዊ ቅርጽ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#18060f] rounded-2xl border border-[#f43f5e]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#fca5a5] font-bold uppercase">ክብርና ማዕረግ (Legacy)</div>
              <div className="text-sm font-black text-[#fef08a]">ብርሃን ዘኢትዮጵያ</div>
              <div className="text-xs text-[#86efac] font-mono">Founder of Addis Ababa</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-gradient-to-r from-[#da121a] to-[#ea580c] text-white border-red-400 animate-pulse'
                  : 'bg-[#3b1220] hover:bg-[#4c1628] text-[#fde047] border-[#f43f5e]'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'የእቴጌይቱን ድምፅ አቁም' : 'የእቴጌይቱን ታሪካዊ ቃል አዳምጥ'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="taytu-betul"
              defaultLanguage={language}
              onClose={() => setIsPlayingSpeech(false)}
            />
          </div>
        )}
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Real 3D WebGL Exhibition Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Taytu3DExhibition language={language} />
        </div>

        {/* Right Column: Historical Wisdom, Specifications & Custom Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Historical Quote Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#240a18] via-[#180610] to-[#0d0309] border-2 border-[#f43f5e] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scroll size={17} className="text-[#fb7185]" />
                <h3 className="font-serif font-black text-sm text-[#fecdd3] uppercase tracking-wide">
                  የእቴጌ ጣይቱ ታሪካዊ ቃል ለጣልያን አምባሳደር
                </h3>
              </div>
              <span className="text-[10px] bg-[#f43f5e]/30 text-[#fca5a5] px-2 py-0.5 rounded font-bold border border-[#f43f5e]/50">
                ሉዓላዊነት
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-[#f43f5e]/40 text-xs text-[#fef3c7] font-serif leading-relaxed italic border-l-4 border-l-[#f43f5e]">
              «እኔ ሴት ነኝ ጦርነት አልወድም፤ ነገር ግን ሀገሬን የውጭ ጥገኛ ከሚያደርግ ሞትን እመርጣለሁ!»
            </div>

            <p className="text-[11px] text-[#baa994] leading-relaxed">
              ጣይቱ የውጫሌ ውል አንቀጽ 17 ላይ የተሸሸገውን የተንኮል አሰራር በመጀመሪያ በመረዳት ውሉ እንዲቀደድ ያደረጉና 6,000 ወታደሮችን በአድዋ ጦርነት ግንባር የመሩ ጀግና እናት ናቸው።
            </p>
          </div>

          {/* Size / Collection Selector */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#220a16] to-[#12040c] border-2 border-[#f43f5e]/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#fecdd3] uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#fb7185]" />
                ይፋዊ የቅርጽ መጠን (Edition)
              </span>
              <span className="text-xs text-[#86efac] font-mono font-bold">100% Handcrafted</span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#441129] to-[#2b0a1a] border-2 border-[#f43f5e] shadow-lg flex items-center justify-between">
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
            <div className="space-y-1.5 pt-2 border-t border-[#3d1828]">
              <label className="text-xs font-bold text-[#fef3c7] flex items-center justify-between">
                <span>በፕሊንዙ ላይ የሚቀረጽ የስም ስጦታ (Custom Plinth Engraving):</span>
                <span className="text-[10px] text-[#86efac]">ነጻ አገልግሎት</span>
              </label>
              <input
                type="text"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="የልጅዎን ስም ወይም የበረከት ቃል ይጻፉ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-[#f43f5e]/60 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#fb7185] shadow-inner font-amharic"
              />
              <div className="text-[10px] text-[#baa994]">
                ምሳሌ፡ «ለተወዳጇ ልጃችን ሳባ - የወደፊት መሪ» ወይም «Empress Taytu Heritage 2026»
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-3 border-t border-[#3d1828] space-y-3">
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f43f5e] via-[#eab308] to-[#22c55e] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-pink-500/30 active:scale-95 transition-all hover:scale-102"
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} className="text-black stroke-[3]" />
                    <span>ወደ ግዢ ቅርጫትዎ ተጨምሯል! (Added!)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} className="text-black" />
                    <span>ይህንን የእቴጌ ጣይቱ ቅርጽ ይዘዙ (Add to Cart)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-4 rounded-2xl bg-[#17050f] border border-[#3d1828] space-y-2 text-xs">
            <div className="font-bold text-[#fecdd3] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#fb7185]" />
              በጥቅሉ ውስጥ የተካተቱ ይፋዊ ቁሳቁሶች፡
            </div>
            <ul className="space-y-1 text-[11px] text-[#d1d5db]">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ንጉሣዊ የወርቅ አክሊል፣ የጆሮ ጌጥና የወርቅ ሐብል ከመስቀል ጋር</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ንጹህ ነጭ ባህላዊ የሐበሻ ቀሚስ ከነአዝራሮቹ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>ባለቀለም የጥበብ ጥልፍ ሻሽ/ነጠላ ከነዘርፉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የተቀረጸበት ጥቁር የፕሊንዝ መቆሚያ ከነወርቃማ ጽሑፉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#22c55e]" />
                <span>የእቴጌ ጣይቱ የታሪክ መማሪያ ካርድና የQR ኮድ (Amharic & English)</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

