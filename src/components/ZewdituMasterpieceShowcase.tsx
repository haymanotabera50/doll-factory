import React, { useState } from 'react';
import { Currency, Language, DollProduct } from '../types';
import { ETHIOPIAN_HEROES } from '../data/heroes';
import {
  Sparkles,
  Volume2,
  VolumeX,
  ShoppingBag,
  Check,
  Crown,
  Scroll,
  Layers,
  Heart,
  Flower2,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';
import { Zewditu3DExhibition } from './Zewditu3DExhibition';

interface ZewdituMasterpieceShowcaseProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const ZewdituMasterpieceShowcase: React.FC<ZewdituMasterpieceShowcaseProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  const zewdituHero = ETHIOPIAN_HEROES.find(h => h.id === 'zewditu') || ETHIOPIAN_HEROES[8];
  const zewdituProduct = zewdituHero.dolls[0];

  // Interactive states
  const [activeHotspot, setActiveHotspot] = useState<string>('crown');
  const [engravingText, setEngravingText] = useState<string>('ለተወዳጇ ልጃችን / For Our Beloved Daughter');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

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
      ...zewdituProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${zewdituProduct.title} - ${currentPrice.titleSuffix}`,
      titleAmharic: `${zewdituProduct.titleAmharic} - ${currentPrice.titleSuffix}`
    };

    onAddToCart(itemToOrder, engravingText, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#c084fc', '#facc15', '#22c55e', '#ef4444', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Hotspot definitions matching the user's uploaded picture of Empress Zewditu
  const hotspots = [
    {
      id: 'crown',
      title: 'ባለብዙ ፎቅ ንጉሣዊ የወርቅ ዘውድ ከመስቀሎች ጋር',
      titleEn: 'Multi-Tiered Imperial Crown with Crosses',
      y: '10%',
      x: '50%',
      icon: '👑',
      desc: 'በግርማ ሞገስ በራሷ ላይ የተቀመጠው ባለብዙ ፎቅ ንጉሣዊ የወርቅ ዘውድ፣ በላዩ ላይ የኦርቶዶክስ ተዋሕዶ መስቀል ምልክቶች ያሉት ሲሆን የታላቋን ንግሥተ ነገሥታት ሉዓላዊነት ያበስራል።',
      descEn: 'Towering multi-tiered golden imperial crown topped with Orthodox crosses, representing the sovereign authority of the first female emperor.'
    },
    {
      id: 'jewelry',
      title: 'የወርቅ ጌጣጌጥና ባለድርብ መስቀል ሐብል',
      titleEn: 'Imperial Drop Earrings & Cross Necklace',
      y: '25%',
      x: '50%',
      icon: '✨',
      desc: 'ባህላዊ ረዣዥም የወርቅ የጆሮ ጌጦች፣ ጥንድ የወርቅ አምባሮችና በአንገቷ ላይ ያረፈው ባለድርብ ወርቃማ የመስቀል ሐብል መንፈሳዊነቷንና ንጉሣዊ ክብሯን ያሳያል።',
      descEn: 'Traditional dangling gold drop earrings, matched gold wrist bangles, and an Ethiopian cross necklace signifying devotion and royalty.'
    },
    {
      id: 'sash',
      title: 'ደማቅ የቀይ፣ ቢጫና አረንጓዴ የክብር ሻሽ ከነዘርፉ',
      titleEn: 'Royal Tricolor Sash with Golden Tassels',
      y: '42%',
      x: '38%',
      icon: '🎗️',
      desc: 'ከትከሻዋ ወደ ጎን በሰያፍ ያረፈው ደማቅ የቀይ፣ የወርቅ-ቢጫና የአረንጓዴ የክብር ሻሽ፣ በዳርቻው በወርቃማ ዘርፍ (tassels) የተንቆጠቆጠ ነው።',
      descEn: 'Regal tricolor ceremonial sash draped diagonally from shoulder to hip, trimmed with fine metallic gold tassel fringes.'
    },
    {
      id: 'hands',
      title: 'በትህትናና በሰላም የተቆላለፉ ንጉሣዊ እጆች',
      titleEn: 'Hands of Faith, Peace & Compassion',
      y: '53%',
      x: '50%',
      icon: '🕊️',
      desc: 'በወርቅ አምባሮች አጊጠው በትህትና ወደ ፊት የተጣመሩት የንግሥተ ነገሥታት ዘውዲቱ እጆች ለህዝባቸው ያላቸውን ጥልቅ ርህራሄና የሰላም ፍቅር ያመለክታሉ።',
      descEn: 'Folded gracefully at the waist with golden bracelets, her hands embody piety, benevolence, and love for her nation.'
    },
    {
      id: 'kemis',
      title: 'ንጹህ ነጭ ንጉሣዊ ቀሚስና የጥበብ ጥልፍ',
      titleEn: 'Pure White Kemis with Geometric Hem Tibeb',
      y: '68%',
      x: '50%',
      icon: '👗',
      desc: '100% ኦርጋኒክ ጥጥ በእጅ የተሸመነ ነጭ ንጉሣዊ ቀሚስ፣ በግርጌው በኩል በደማቅ ቀለማት የተጠለፈ ባህላዊ የጥበብ ዳርቻ አለው።',
      descEn: 'Floor-length handwoven white Habesha kemis featuring rich colorful geometric embroidered Tibeb patterns along the hem.'
    },
    {
      id: 'plinth',
      title: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
      titleEn: 'Inscribed Collector Pedestal',
      y: '90%',
      x: '50%',
      icon: '🏛️',
      desc: '«Empress Zewditu (1876 – 1930) • The first female emperor. A symbol of hope. A leader for her people.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።',
      descEn: 'Solid collector plinth bearing metallic gold inscription: "The first female emperor. A symbol of hope. A leader for her people."'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="zewditu-masterpiece-section" className="w-full space-y-8">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#220b2b] via-[#351042] to-[#16061c] border-3 border-[#c084fc] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2.5 tibeb-ribbon" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#c084fc]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#f59e0b]/20 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c084fc]/20 border border-[#c084fc] text-[#f3e8ff] text-xs font-black shadow">
              <Crown size={15} className="text-[#e9d5ff]" />
              <span>OFFICIAL MASTERPIECE HEROINE FIGURE • ይፋዊ የንግሥተ ነገሥታት ዘውዲቱ ቅርጽ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              ንግሥተ ነገሥታት ዘውዲቱ <span className="text-[#e9d5ff] font-black">(1876 – 1930)</span>
            </h2>

            <p className="text-[#fde047] font-serif italic text-base sm:text-lg font-bold">
              «The first female emperor. A symbol of hope. A leader for her people.»
            </p>

            <p className="text-[#f3e8ff] text-xs sm:text-sm leading-relaxed font-normal">
              የዳግማዊ አፄ ምኒልክ ልጅ፣ በ20ኛው መቶ ክፍለ ዘመን የመጀመሪያዋ የአፍሪካ ሴት የሀገር መሪ። ባለብዙ ፎቅ የወርቅ ዘውድ፣ ንጹህ ነጭ ቀሚስ፣ ደማቅ ሻሽና የወርቅ መስቀል ያረፈበትን ይፋዊ ቅርጽ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ።
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="p-3.5 bg-[#18051f] rounded-2xl border border-[#c084fc]/40 text-center shadow-lg">
              <div className="text-[11px] text-[#e9d5ff] font-bold uppercase">ክብርና ማዕረግ (Historical First)</div>
              <div className="text-sm font-black text-[#fef08a]">ንግሥተ ነገሥታት ዘኢትዮጵያ</div>
              <div className="text-xs text-[#86efac] font-mono">1st Female African Head of State</div>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-xl ${
                isPlayingSpeech
                  ? 'bg-amber-500 border-amber-300 text-slate-950 animate-pulse'
                  : 'bg-purple-900/60 border-purple-500/50 text-purple-100 hover:bg-purple-800/80 hover:border-purple-400'
              }`}
            >
              {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingSpeech ? 'ድምፅን አቁም (Stop Audio)' : 'የንግሥተ ነገሥታት ዘውዲቱ ቃል (Listen Quote)'}</span>
            </button>
          </div>
        </div>

        {/* Full Spoken History Audio Player */}
        {isPlayingSpeech && (
          <div className="mt-4 pt-2">
            <HeroAudioNarrator
              heroId="zewditu"
              defaultLanguage={language}
              onClose={() => setIsPlayingSpeech(false)}
            />
          </div>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Interactive WebGL Exhibition & Hotspots (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Zewditu3DExhibition language={language} />

          {/* Active Hotspot Inspector Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-purple-950/70 border border-purple-500/40 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentHotspot.icon}</span>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {language === 'AM' ? currentHotspot.title : currentHotspot.titleEn}
                  </h4>
                  <p className="text-[11px] font-mono text-purple-300">
                    {currentHotspot.titleEn}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase">
                FEATURE SPOTLIGHT
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans pt-1">
              {language === 'AM' ? currentHotspot.desc : currentHotspot.descEn}
            </p>
          </div>
        </div>

        {/* Right Column: Customization, Inscription & Order (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Historical Plinth Inscription Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Scroll size={16} />
              <span>የክብር ፕሊንዝ መግለጫ (Official Pedestal Plinth)</span>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-purple-600/50 text-center space-y-2 shadow-inner">
              <div className="text-xl sm:text-2xl font-serif font-black text-amber-400 tracking-wider">
                Empress Zewditu
              </div>
              <div className="text-xs text-purple-300 font-mono tracking-widest uppercase">
                (1876 – 1930)
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2" />
              <div className="text-xs sm:text-sm font-serif italic text-slate-200 leading-snug">
                The first female emperor.<br />
                A symbol of hope.<br />
                A leader for her people.
              </div>
            </div>

            <div className="text-[11px] text-slate-300 leading-relaxed">
              ይህ ይፋዊ መቆሚያ ልክ እንደ ብሔራዊ ሀውልት በንጹህ ጥቁር ድንጋይ መልክ የተሰራ ሲሆን በወርቃማ ጽሑፍ የንግሥተ ነገሥታት ዘውዲቱ ታሪክ ተቀርጾበታል።
            </div>
          </div>

          {/* Size & Edition Selector */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <Layers size={16} />
                <span>ይፋዊ የቅርጽ መጠን (Edition)</span>
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold">
                {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር` : `$${currentPrice.usd}`}
              </span>
            </div>

            {/* Exclusive 7-Inch Figurine Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950 to-slate-950 border-2 border-purple-400 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-black text-white">ሚኒ ቅርጽ (Mini Heritage Figurine)</span>
                  <span className="text-[10px] text-[#86efac] font-bold bg-[#22c55e]/20 px-2.5 py-0.5 rounded-full border border-[#22c55e]/40">
                    ✓ 7 ኢንች ብቻ (Only 7 Inch)
                  </span>
                </div>
                <div className="text-xs text-purple-300">7 ኢንች (18 ሳ.ሜ) • በጥቁር የተቀረጸ ፕሊንዝ መቆሚያ ላይ</div>
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
              <label className="text-xs font-bold text-purple-300 flex items-center justify-between">
                <span>የተጠቃሚ ስም ወይም የስጦታ መልእክት ቅርጻ (Free Plinth Engraving):</span>
                <span className="text-[10px] text-slate-400 font-normal">ነፃ ስጦታ</span>
              </label>
              <input
                type="text"
                value={engravingText}
                onChange={e => setEngravingText(e.target.value)}
                placeholder="ለምሳሌ፡ ለተወዳጇ ልጃችን / Happy Birthday!"
                maxLength={45}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-purple-500/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
              <p className="text-[10px] text-slate-400">በፕሊንዙ የፊት ገጽታ ላይ በጥንቃቄ በወርቃማ ጽሑፍ የሚቀረጽ</p>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <Award size={15} />
              <span>ከቅርጹ ጋር አብረው የሚመጡ ይፋዊ እቃዎች (In Box):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              {zewdituProduct.accessoriesIncluded.map((item, idx) => (
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
                  : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white hover:shadow-purple-500/30'
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
                    ይህንን የንግሥተ ነገሥታት ዘውዲቱ ቅርጽ ይዘዙ (
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
