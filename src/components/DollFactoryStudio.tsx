import React, { useState } from 'react';
import { DollVisualizer } from './DollVisualizer';
import { ETHIOPIAN_HEROES } from '../data/heroes';
import { DollCategory, VisualConfig, DollProduct, Currency } from '../types';
import { Sparkles, Check, RotateCcw, PlusCircle, Heart, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DollFactoryStudioProps {
  currency: Currency;
  onAddToCart: (customProduct: DollProduct, customEngraving: string) => void;
}

export const DollFactoryStudio: React.FC<DollFactoryStudioProps> = ({
  currency,
  onAddToCart
}) => {
  // Selected Hero template
  const [selectedHeroId, setSelectedHeroId] = useState<string>('tewodros-ii');
  
  // Customization options: Default to authentic realistic human being hero figure
  const [dollDesignModel, setDollDesignModel] = useState<VisualConfig['dollDesignModel']>('lifelike-historical-hero');
  const [dollCategory, setDollCategory] = useState<DollCategory>('historical-heroes-heroines');
  const [clothingStyle, setClothingStyle] = useState<VisualConfig['clothingStyle']>('imperial-kaba');
  const [clothingPrimaryColor, setClothingPrimaryColor] = useState<string>('#dc2626');
  const [headwear, setHeadwear] = useState<VisualConfig['headwear']>('lion-mane');
  const [secondaryShield, setSecondaryShield] = useState<VisualConfig['secondaryShield']>('gold-filigree-shield');
  
  // Custom child name engraving / message
  const [childName, setChildName] = useState<string>('ለተወዳጇ ልጃችን');
  const [packagingType, setPackagingType] = useState<'gift-box' | 'tote-bag' | 'story-casket'>('gift-box');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);
  const [studioViewMode, setStudioViewMode] = useState<'3d-photo' | 'visualizer'>('3d-photo');

  const selectedHero = ETHIOPIAN_HEROES.find(h => h.id === selectedHeroId) || ETHIOPIAN_HEROES[0];

  // Dynamic visual config for live preview
  const liveVisualConfig: VisualConfig = {
    skinTone: selectedHero.dolls[0]?.visualConfig.skinTone || '#784a29',
    dollDesignModel,
    hairStyle: dollDesignModel === 'lifelike-historical-hero' ? 'braids' : dollDesignModel === 'reborn-realistic-toddler' ? 'curly-baby-curls' : dollDesignModel === 'anime-bjd-bigeyes' ? 'twin-braids' : dollDesignModel === 'waldorf-ragdoll' ? 'yarn-bob' : 'long-wavy',
    clothingStyle,
    clothingPrimaryColor,
    clothingAccentColor: '#facc15',
    headwear,
    primaryWeapon: 'none',
    secondaryShield,
    auraEffect: 'golden-glow',
    pedestalStyle: 'polished-brass',
    toyExpression: 'realistic-gentle',
    isWaving: true
  };

  // Base pricing for children dolls
  const calculatePrice = () => {
    let baseETB = 2250;
    let baseUSD = 35;

    if (dollCategory === 'historical-heroes-heroines' || dollCategory === 'women-of-history') {
      baseETB += 300;
      baseUSD += 5;
    } else if (dollCategory === 'patriots-resistance') {
      baseETB += 200;
      baseUSD += 3;
    }

    if (packagingType === 'gift-box') {
      baseETB += 200;
      baseUSD += 3;
    }

    return {
      etb: baseETB,
      usd: baseUSD
    };
  };

  const currentPrice = calculatePrice();

  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
    const hero = ETHIOPIAN_HEROES.find(h => h.id === heroId);
    if (hero) {
      const template = hero.dolls[0]?.visualConfig;
      if (template) {
        setClothingStyle(template.clothingStyle);
        setClothingPrimaryColor(template.clothingPrimaryColor);
        setHeadwear(template.headwear);
        setSecondaryShield(template.secondaryShield);
      }
    }
  };

  const handleCreateCustomDoll = () => {
    setIsMinting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#eab308', '#ef4444', '#ec4899', '#3b82f6']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      const customProduct: DollProduct = {
        id: `custom-kids-doll-${Date.now()}`,
        heroId: selectedHero.id,
        heroName: selectedHero.name,
        heroNameAmharic: selectedHero.amharicName,
        title: `የ${selectedHero.amharicName} ለስላሳ የህፃናት አሻንጉሊት`,
        titleAmharic: `የ${selectedHero.amharicName} የህፃናት መጫወቻ አሻንጉሊት`,
        subtitle: `ለህፃናት የተሰራ 100% ኦርጋኒክ ጥጥ አሻንጉሊት ከተረት መጽሐፍ ጋር`,
        category: dollCategory,
        ageRecommendation: 'ከ 1 ዓመት ጀምሮ (Ages 1+)',
        priceETB: currentPrice.etb,
        priceUSD: currentPrice.usd,
        scale: '7 ኢንች (18 ሳ.ሜ)',
        dimensions: '18cm H × 10cm W × 7cm D',
        weight: '220 grams (ቀላልና ለስላሳ)',
        materials: ['100% የኢትዮጵያ ኦርጋኒክ ጥጥ', 'ተፈጥሯዊ ቀለም', 'ለስላሳ የሱፍ መሙያ'],
        isWashable: true,
        isHypoallergenic: true,
        stockQuantity: 1,
        inStock: true,
        isLimitedEdition: false,
        rating: 5.0,
        reviewsCount: 1,
        accessoriesIncluded: [
          'ተነቃይ ባህላዊ የጥጥ ልብስ',
          'ባለቀለም የህፃናት ተረት መጽሐፍ',
          `የልጁ ስም የተቀረጸበት የስጦታ ካርድ: «${childName}»`,
          'የህፃናት መጫወቻ የክብር ባጅ'
        ],
        features: [
          'ህፃናት ማታ ማታ አቅፈው የሚተኙት እጅግ ለስላሳ ጨርቅ',
          'በእጅ የሚታጠብና ቀለም የማይለቅ',
          'መርዛማ ያልሆነ ለህፃናት ጤና ተስማሚ'
        ],
        bedtimeStoryTitle: selectedHero.dolls[0]?.bedtimeStoryTitle || 'የጀግኖች ተረት',
        bedtimeStorySummaryAmharic: selectedHero.dolls[0]?.bedtimeStorySummaryAmharic || 'ለህፃናት ፍቅርንና ድፍረትን የሚያስተምር ተረት።',
        historicalBackstory: `Special personalized children hero doll honoring ${selectedHero.name}.`,
        historicalBackstoryAmharic: `ለህፃናት መጫወቻና መማሪያ በልዩ ፍቅር የተዘጋጀ አሻንጉሊት።`,
        visualConfig: liveVisualConfig,
        boxArtworkName: `የልጆች የስጦታ ሳጥን`
      };

      onAddToCart(customProduct, childName);
      setIsMinting(false);
      setMintSuccess(true);

      setTimeout(() => setMintSuccess(false), 3500);
    }, 700);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#24170d] via-[#1a1007] to-[#0d0703] border-3 border-[#f59e0b] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative Top Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-3 tibeb-ribbon" />

      {/* Header section in Rich Amharic for Kids */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#22c55e]/30 to-[#f59e0b]/30 border border-[#f59e0b] text-[#fef08a] text-xs font-bold uppercase tracking-wider mb-3 shadow">
            🧸 የህፃናት አሻንጉሊት መገጣጠሚያ ስቱዲዮ (Kids Toy Workshop)
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
            ለልጅዎ <span className="ethiopia-text-gradient font-black">የሚወዱትን ጀግና አሻንጉሊት</span> ይምረጡ
          </h2>
          <p className="text-[#fef3c7] text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
            ህፃናት አቅፈው የሚተኙበት፣ ልብሱን እያወለቁ የሚጫወቱበት፣ 100% ከንጹህ የሀበሻ ጥጥ የተሰፋ አሻንጉሊት ከተረት መጽሐፍ ጋር ያዘጋጁ!
          </p>
        </div>

        {/* Dynamic Price Banner */}
        <div className="bg-gradient-to-br from-[#2f1b0a] to-[#1c0f05] border-2 border-[#f59e0b] px-6 py-4 rounded-2xl flex flex-col items-end shadow-2xl">
          <span className="text-xs uppercase tracking-wider text-[#fde68a] font-bold">የአሻንጉሊቱ ዋጋ</span>
          <div className="text-3xl font-black text-[#fde047] font-mono mt-0.5">
            {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር (ETB)` : `$${currentPrice.usd}`}
          </div>
          <span className="text-xs text-[#4ade80] font-bold flex items-center gap-1 mt-1">
            <Check size={14} className="text-[#22c55e]" /> ባለቀለም የተረት መጽሐፍ በነጻ አብሮ ይሰጣል
          </span>
        </div>
      </div>

      {/* Main Studio Grid: Left Controls, Right 3D Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Customization Studio Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Hero Template for Kids */}
          <div className="bg-[#1f1308] p-5 rounded-2xl border-2 border-[#4d3219] shadow-lg">
            <label className="text-xs font-black text-[#fde047] uppercase tracking-wider block mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black flex items-center justify-center text-xs shadow">1</span>
              ደረጃ 1፡ ልጆች የሚወዱትን ጀግና ይምረጡ
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ETHIOPIAN_HEROES.map(hero => {
                const isSelected = selectedHeroId === hero.id;
                return (
                  <button
                    key={hero.id}
                    onClick={() => handleHeroSelect(hero.id)}
                    className={`p-3 rounded-2xl text-left border-2 transition-all text-xs flex flex-col justify-between h-20 ${
                      isSelected 
                        ? 'border-[#f59e0b] bg-gradient-to-b from-[#3d240f] to-[#251508] shadow-lg shadow-[#f59e0b]/20 scale-102' 
                        : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e] text-gray-300'
                    }`}
                  >
                    <div>
                      <div className={`font-black text-sm truncate ${isSelected ? 'text-[#fef08a]' : 'text-white'}`}>
                        {hero.amharicName}
                      </div>
                      <div className="text-[11px] text-[#baa994] truncate">
                        {hero.titleAmharic}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 1.5: Doll Structure & Design Archetype (Matching the 3 example photos) */}
          <div className="bg-[#1f1308] p-5 rounded-2xl border-2 border-[#f59e0b] shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black text-[#fde047] uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black flex items-center justify-center text-xs shadow">✨</span>
                የአሻንጉሊቱ መዋቅርና ዲዛይን (Doll Structure & Style)
              </label>
              <span className="text-[10px] text-[#4ade80] font-bold bg-[#078930]/30 px-2 py-0.5 rounded-full border border-[#22c55e]/40">
                ከምሳሌ ፎቶዎች የተመረጡ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Option 0: Lifelike Realistic Human Hero (User's Exact Need) */}
              <button
                onClick={() => {
                  setDollDesignModel('lifelike-historical-hero');
                  setClothingPrimaryColor('#dc2626');
                  setHeadwear('lion-mane');
                  setSecondaryShield('gold-filigree-shield');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  (!dollDesignModel || dollDesignModel === 'lifelike-historical-hero')
                    ? 'border-[#f59e0b] bg-gradient-to-b from-[#3a1804] to-[#1c0a02] shadow-xl shadow-orange-500/30 scale-102 ring-2 ring-[#fde047]'
                    : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">👑</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black shadow">
                    እውነተኛ ጀግና
                  </span>
                </div>
                <div className="font-black text-xs text-white">እውነተኛ ታሪካዊ ጀግና</div>
                <div className="text-[11px] text-[#fde68a] mt-0.5">Realistic Human Hero</div>
                <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                  እውነተኛ የሰው ልጅ ጀግና ቁመና፣ ኃያል እይታ፣ የጎፈር ቆብ፣ ሻማና ካባ፣ ሰይፍና ጋሻ (ቴዎድሮስ፣ ጣይቱ፣ ምኒልክ)።
                </div>
              </button>

              {/* Option -1: Heroic Ethiopian Warhorse Statue (Latest User Photo) */}
              <button
                onClick={() => {
                  setDollDesignModel('heroic-warhorse');
                  setClothingPrimaryColor('#3d2313');
                  setHeadwear('none');
                  setSecondaryShield('none');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  dollDesignModel === 'heroic-warhorse'
                    ? 'border-[#f59e0b] bg-gradient-to-b from-[#451a03] to-[#1c0f04] shadow-lg shadow-amber-500/30 scale-102 ring-2 ring-[#fde047]'
                    : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🐎</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-900/90 text-amber-300 font-bold border border-amber-600 animate-pulse">
                    የጀግኖች ፈረስ
                  </span>
                </div>
                <div className="font-black text-xs text-white">የጀግኖች የክብር ፈረስ</div>
                <div className="text-[11px] text-[#fde68a] mt-0.5">Heroic Warhorse Statue</div>
                <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                  የተዋበ የነሐስ ቀለም፣ የሚወዛወዝ የጎፈር ፀጉር፣ የኃያልነት ቁመናና የድንጋይ መቆሚያ (አባ ታጠቅ/አባ ዳኘው)።
                </div>
              </button>

              {/* Option 0: Lifelike Reborn Toddler Doll (Recommended / User Requested) */}
              <button
                onClick={() => {
                  setDollDesignModel('reborn-realistic-toddler');
                  setClothingPrimaryColor('#f97316');
                  setHeadwear('none');
                  setSecondaryShield('none');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  dollDesignModel === 'reborn-realistic-toddler'
                    ? 'border-[#f59e0b] bg-gradient-to-b from-[#3d2309] to-[#1c0f04] shadow-lg shadow-orange-500/25 scale-102 ring-2 ring-[#fde047]'
                    : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">👶</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-900/80 text-amber-300 font-bold border border-amber-600">
                    እውነተኛ ህፃን
                  </span>
                </div>
                <div className="font-black text-xs text-white">እጅግ እውነተኛ ታሪካዊ ህፃን</div>
                <div className="text-[11px] text-[#fde68a] mt-0.5">Lifelike Reborn Toddler</div>
                <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                  የተፈጥሮ ጎፈሬ ፀጉር፣ እውነተኛ የሚያበሩ አይኖች፣ ፒተር ፓን ኮላርና የታሪካዊ ንግሥት ልብስ።
                </div>
              </button>

              {/* Option 1: Fashion Poseable Doll */}
              <button
                onClick={() => {
                  setDollDesignModel('fashion-articulated');
                  setClothingPrimaryColor('#f43f5e');
                  setHeadwear('sunglasses-headband');
                  setSecondaryShield('chic-tote-bag');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  dollDesignModel === 'fashion-articulated'
                    ? 'border-[#ec4899] bg-gradient-to-b from-[#451025] to-[#250813] shadow-lg shadow-pink-500/20 scale-102 ring-2 ring-[#ec4899]'
                    : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">👗</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-900/60 text-pink-300 font-bold border border-pink-700">
                    ምሳሌ 1
                  </span>
                </div>
                <div className="font-black text-xs text-white">ተንቀሳቃሽ የፋሽን አሻንጉሊት</div>
                <div className="text-[11px] text-[#fde68a] mt-0.5">Fashion Articulated Doll</div>
                <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                  ተጣጣፊ እጅና እግር፣ ቆንጆ ፀጉር፣ የባህል ጥልፍ ክሮፕ ቶፕ፣ ቀሚስና የትከሻ ቦርሳ።
                </div>
              </button>

              {/* Option 2: Anime / BJD Luminous Big-Eyes Doll */}
              <button
                onClick={() => {
                  setDollDesignModel('anime-bjd-bigeyes');
                  setClothingPrimaryColor('#f8fafc');
                  setHeadwear('none');
                  setSecondaryShield('none');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  dollDesignModel === 'anime-bjd-bigeyes'
                    ? 'border-[#06b6d4] bg-gradient-to-b from-[#082f49] to-[#041d2d] shadow-lg shadow-cyan-500/20 scale-102 ring-2 ring-[#06b6d4]'
                    : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">👀</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700">
                    ምሳሌ 2
                  </span>
                </div>
                <div className="font-black text-xs text-white">ዐይነ-ቁልጭ የሸክላ/BJD አሻንጉሊት</div>
                <div className="text-[11px] text-[#fde68a] mt-0.5">Anime / BJD Big-Eyes</div>
                <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                  ትላልቅ የሚያበሩ ሰማያዊ አይኖች፣ ሁለት የጎፈሬ ሹሩባዎች፣ ቆንጆ ባንግስና የጥጥ ሹራብ ቀሚስ።
                </div>
              </button>

              {/* Option 3: Waldorf Ragdoll on Wooden Bench */}
              <button
                onClick={() => {
                  setDollDesignModel('waldorf-ragdoll');
                  setClothingPrimaryColor('#4d7c0f');
                  setHeadwear('none');
                  setSecondaryShield('none');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  dollDesignModel === 'waldorf-ragdoll'
                    ? 'border-[#84cc16] bg-gradient-to-b from-[#24330b] to-[#121c05] shadow-lg shadow-lime-500/20 scale-102 ring-2 ring-[#84cc16]'
                    : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🧶</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime-900/60 text-lime-300 font-bold border border-lime-700">
                    ምሳሌ 3
                  </span>
                </div>
                <div className="font-black text-xs text-white">የዋልዶርፍ ለስላሳ የጨርቅ አሻንጉሊት</div>
                <div className="text-[11px] text-[#fde68a] mt-0.5">Waldorf Bench Ragdoll</div>
                <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                  የእንጨት በርጩማ ላይ የምትቀመጥ፣ በእጅ የተጠለፈ ሱፍ ካርዲጋን፣ ዝንጉርጉር ካልሲና ጫማ።
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Collection Category */}
          <div className="bg-[#1f1308] p-5 rounded-2xl border-2 border-[#4d3219] shadow-lg">
            <label className="text-xs font-black text-[#fde047] uppercase tracking-wider block mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black flex items-center justify-center text-xs shadow">2</span>
              ደረጃ 2፡ የምርት ስብስብ (Collection Type)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'historical-heroes-heroines', label: 'ታሪካዊ ጀግኖችና ጀግኒቶች', sub: 'ነገሥታትና ጀግኖች', icon: '👑' },
                { id: 'women-of-history', label: 'የኢትዮጵያ ሴት መሪዎች', sub: 'እቴጌዎችና ደፋር እናቶች', icon: '👸' },
                { id: 'patriots-resistance', label: 'የአርበኞችና አድዋ ተጋድሎ', sub: 'አርበኞችና ተዋጊዎች', icon: '⚔️' },
                { id: 'sports-modern-achievement', label: 'የስፖርትና ዘመናዊ ድሎች', sub: 'የሮምና ቶኪዮ አሸናፊዎች', icon: '🥇' },
                { id: 'traditional-culture', label: 'ባህላዊ አልባሳትና ቅርስ', sub: 'የእጅ ጥልፍና ጥበብ', icon: '🇪🇹' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDollCategory(opt.id as DollCategory)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                    dollCategory === opt.id
                      ? 'border-[#f59e0b] bg-gradient-to-b from-[#3d240f] to-[#251508] shadow-lg scale-102'
                      : 'border-[#3a2312] bg-[#140b04] hover:border-[#633b1e]'
                  }`}
                >
                  <span className="text-2xl block mb-1">{opt.icon}</span>
                  <div className="font-black text-xs text-white">{opt.label}</div>
                  <div className="text-[10px] text-[#fde68a] mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Bright Outfit Colors for Kids */}
          <div className="bg-[#1f1308] p-5 rounded-2xl border-2 border-[#4d3219] shadow-lg">
            <label className="text-xs font-black text-[#fde047] uppercase tracking-wider block mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black flex items-center justify-center text-xs shadow">3</span>
              ደረጃ 3፡ የልብሱ ደማቅ ቀለምና ጥልፍ
            </label>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-[#fde68a] font-bold">ደማቅ ቀለሞች፡</span>
              {[
                { color: '#dc2626', name: 'ደማቅ ቀይ (Ruby Red)' },
                { color: '#22c55e', name: 'አረንጓዴ (Grass Green)' },
                { color: '#f59e0b', name: 'ወርቃማ ቢጫ (Sunshine Yellow)' },
                { color: '#ec4899', name: 'ሮዝ (Playful Pink)' },
                { color: '#3b82f6', name: 'ሰማያዊ (Sky Blue)' },
                { color: '#ffffff', name: 'ንጹህ ነጭ ጥጥ (White Cotton)' },
              ].map(swatch => (
                <button
                  key={swatch.color}
                  onClick={() => setClothingPrimaryColor(swatch.color)}
                  title={swatch.name}
                  className={`w-9 h-9 rounded-full border-3 transition-transform ${
                    clothingPrimaryColor === swatch.color ? 'scale-125 border-[#fde047] shadow-xl' : 'border-[#43372c]'
                  }`}
                  style={{ backgroundColor: swatch.color }}
                />
              ))}
            </div>
          </div>

          {/* Step 4: Child-Safe Soft Toy Accessories */}
          <div className="bg-[#1f1308] p-5 rounded-2xl border-2 border-[#4d3219] shadow-lg">
            <label className="text-xs font-black text-[#fde047] uppercase tracking-wider block mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black flex items-center justify-center text-xs shadow">4</span>
              ደረጃ 4፡ አብረው የሚላኩ ደህንነታቸው የተጠበቀ መጫወቻዎች
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-[#fde68a] font-bold uppercase tracking-wider block mb-1.5">ዘውድ / ሻሽ</span>
                <select
                  value={headwear}
                  onChange={(e) => setHeadwear(e.target.value as any)}
                  className="w-full bg-[#140b04] border-2 border-[#4d3219] text-xs text-white rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none font-bold"
                >
                  <option value="lion-mane">የአንበሳ ለስላሳ ጎፈር (Soft Lion Mane)</option>
                  <option value="empress-tiara">የልዕልት ለስላሳ ዘውድ (Soft Tiara)</option>
                  <option value="warrior-band">ባለሶስት ቀለም የጀግና ሻሽ (Tri-color Band)</option>
                  <option value="none">ያለ ዘውድ / ተፈጥሯዊ ፀጉር</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-[#fde68a] font-bold uppercase tracking-wider block mb-1.5">መጫወቻ እቃ</span>
                <select
                  value={secondaryShield}
                  onChange={(e) => setSecondaryShield(e.target.value as any)}
                  className="w-full bg-[#140b04] border-2 border-[#4d3219] text-xs text-white rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none font-bold"
                >
                  <option value="royal-parasol">ትንሽ የጨርቅ ጃንጥላ (Mini Toy Parasol)</option>
                  <option value="gold-filigree-shield">ለስላሳ የኮከብ ጋሻ ትራስ (Soft Star Shield)</option>
                  <option value="ammo-satchel">ተከፋች ትንሽ መሶብ (Mini Toy Mesob)</option>
                  <option value="none">ያለ ተጨማሪ እቃ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 5: Child Name Inscription & Gift Packaging */}
          <div className="bg-[#1f1308] p-5 rounded-2xl border-2 border-[#4d3219] shadow-lg">
            <label className="text-xs font-black text-[#fde047] uppercase tracking-wider block mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black flex items-center justify-center text-xs shadow">5</span>
              ደረጃ 5፡ ለልጁ የሚጻፍ የስጦታ ስም እና የልጆች ሳጥን
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-[#fde68a] font-bold uppercase tracking-wider block mb-1.5">
                  የልጁ ስም (በስጦታ ካርዱ ላይ የሚጻፍ)
                </span>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="ምሳሌ፡ ለተወዳጇ ኤልሳቤጥ"
                  maxLength={30}
                  className="w-full bg-[#140b04] border-2 border-[#4d3219] text-sm text-[#fef08a] font-bold rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none"
                />
                <span className="text-[10px] text-[#baa994] mt-1 block">
                  በአሻንጉሊቱ መለያና በተረት መጽሐፉ ላይ ተጽፎ ይሰጣል
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#fde68a] font-bold uppercase tracking-wider block mb-1.5">
                  የስጦታ ማሸጊያ ሳጥን
                </span>
                <select
                  value={packagingType}
                  onChange={(e) => setPackagingType(e.target.value as any)}
                  className="w-full bg-[#140b04] border-2 border-[#4d3219] text-xs text-white font-bold rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none"
                >
                  <option value="gift-box">ባለቀለም የልጆች የስጦታ ሳጥን (በሪቫን የታሰረ)</option>
                  <option value="tote-bag">ህፃናት ትምህርት ቤት የሚይዙት የጥጥ ከረጢት</option>
                  <option value="story-casket">የተረት መጽሐፍ ማስቀመጫ ሳጥን</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Live Visual Assembly & Add to Cart (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-gradient-to-b from-[#291a0c] to-[#140c06] p-4.5 rounded-3xl border-2 border-[#f59e0b] shadow-2xl">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs uppercase font-black tracking-wider text-[#fde047] flex items-center gap-1.5">
                <Sparkles size={16} className="text-[#f59e0b]" /> 3D ቅርጽ ቅድመ-እይታ
              </span>

              {/* 3D vs Visualizer Toggle Switch */}
              <div className="flex items-center gap-1 bg-black/85 border border-[#f59e0b]/60 p-0.5 rounded-xl shadow">
                <button
                  onClick={() => setStudioViewMode('3d-photo')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                    studioViewMode === '3d-photo'
                      ? 'bg-gradient-to-r from-[#fde047] to-[#f59e0b] text-black shadow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>📸 3D ቅርጽ</span>
                </button>
                <button
                  onClick={() => setStudioViewMode('visualizer')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                    studioViewMode === 'visualizer'
                      ? 'bg-gradient-to-r from-[#fde047] to-[#f59e0b] text-black shadow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>🎨 ዲዛይን</span>
                </button>
              </div>
            </div>

            {/* Display: 3D Collectible Figurine or Kids Doll Visualizer */}
            {studioViewMode === '3d-photo' ? (
              <div className="relative h-96 w-full rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#1c1108] via-[#120a05] to-[#080402] border-2 border-[#f59e0b]/40 shadow-inner">
                {/* Museum Pedestal Ambient Glow & Shadow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 w-44 h-8 bg-black/80 rounded-full filter blur-md pointer-events-none" />

                <img
                  src={selectedHero.dolls[0]?.imageUrl || '/heritage_heroes_3d_masterpieces.jpg'}
                  alt={selectedHero.name}
                  className="max-h-[92%] w-auto object-contain transition-transform duration-500 drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-black/85 backdrop-blur-md rounded-xl border border-[#f59e0b]/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#fef08a] font-serif font-black block">{selectedHero.amharicName}</span>
                    <span className="text-[10px] text-[#baa994]">{selectedHero.years}</span>
                  </div>
                  <span className="text-[10px] text-[#86efac] font-bold bg-[#078930]/40 px-2 py-0.5 rounded border border-[#22c55e]/40">
                    ይፋዊ 3D የክብር ቅርጽ (7 ኢንች)
                  </span>
                </div>
              </div>
            ) : (
              <DollVisualizer
                config={liveVisualConfig}
                heroName={selectedHero.name}
                heroNameAmharic={selectedHero.amharicName}
                figureTitle={`የህፃናት አሻንጉሊት`}
                category={dollCategory}
                engravingText={childName}
                heightClass="h-96"
                onSelectDesignModel={(model) => setDollDesignModel(model)}
              />
            )}

            {/* Specifications Summary List for Parents */}
            <div className="mt-4 p-3.5 bg-[#140b04] rounded-2xl border border-[#4d3219] text-xs space-y-2">
              <div className="flex justify-between text-[#d1d5db]">
                <span>የተመረጠው ጀግና፡</span>
                <span className="text-[#fde047] font-black">{selectedHero.amharicName}</span>
              </div>
              <div className="flex justify-between text-[#d1d5db]">
                <span>የአሻንጉሊቱ ስብስብ፡</span>
                <span className="text-white font-bold">
                  {dollCategory === 'historical-heroes-heroines' ? 'ታሪካዊ ጀግኖችና ጀግኒቶች' : dollCategory === 'women-of-history' ? 'የሴት መሪዎች ስብስብ' : dollCategory === 'patriots-resistance' ? 'የአርበኞች ተጋድሎ' : dollCategory === 'sports-modern-achievement' ? 'የስፖርት ድል' : 'ባህላዊ ቅርስ'}
                </span>
              </div>
              <div className="flex justify-between text-[#d1d5db]">
                <span>የተረት መጽሐፍ፡</span>
                <span className="text-[#4ade80] font-black">{selectedHero.dolls[0]?.bedtimeStoryTitle}</span>
              </div>
              <div className="flex justify-between text-[#d1d5db]">
                <span>የስጦታ ስም፡</span>
                <span className="text-[#fde047] font-black">«{childName}»</span>
              </div>
            </div>

            {/* Action Button: Add to Cart */}
            <button
              onClick={handleCreateCustomDoll}
              disabled={isMinting}
              className={`w-full mt-4 py-4 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 ${
                mintSuccess
                  ? 'bg-[#078930] text-white shadow-[#078930]/40'
                  : 'bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black hover:opacity-95 shadow-orange-500/25 active:scale-[0.98] hover:scale-102'
              }`}
            >
              {isMinting ? (
                <>
                  <RotateCcw className="animate-spin" size={19} />
                  <span>አሻንጉሊቱ በእጅ እየተሰፋ ነው...</span>
                </>
              ) : mintSuccess ? (
                <>
                  <Check size={19} />
                  <span>ወደ ግዢ ቅርጫትዎ ገብቷል!</span>
                </>
              ) : (
                <>
                  <PlusCircle size={19} />
                  <span>
                    ለልጄ እዘዝ — {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር (ETB)` : `$${currentPrice.usd}`}
                  </span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#d1d5db] mt-2 font-medium">
              🧸 100% ደህንነቱ የተጠበቀ • በልብስ ማጠቢያ ማሽን የሚታጠብ • ነጻ ማድረሻ
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
