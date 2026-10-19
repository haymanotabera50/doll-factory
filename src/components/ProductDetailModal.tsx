import React, { useState } from 'react';
import { DollProduct, Currency, Language, Hero } from '../types';
import { DollVisualizer } from './DollVisualizer';
import { X, Star, ShoppingBag, ShieldCheck, Check, Volume2, BookOpen, Heart, Sparkles, QrCode, Camera, Award, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';

interface ProductDetailModalProps {
  product: DollProduct | null;
  hero: Hero | undefined;
  currency: Currency;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  hero,
  currency,
  language,
  onClose,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'factcard' | 'story' | 'reviews'>('details');
  const [viewMode, setViewMode] = useState<'photo' | 'visualizer'>(product?.imageUrl ? 'photo' : 'visualizer');
  const [quantity, setQuantity] = useState<number>(1);
  const [childName, setChildName] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [scannedQR, setScannedQR] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!product) return null;

  const handlePlayStoryAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const getPhotoPosition = (heroId: string) => {
    switch (heroId) {
      case 'menelik-ii':
        return 'object-[15%_35%]';
      case 'taytu-betul':
        return 'object-[38%_35%]';
      case 'ras-alula':
        return 'object-[62%_35%]';
      case 'abebe-bikila':
        return 'object-[88%_35%]';
      default:
        return 'object-center';
    }
  };

  const handleAdd = () => {
    onAddToCart(product, childName, quantity);
    setAddedToast(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#f59e0b', '#ef4444', '#ec4899']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#24170e] via-[#1a1008] to-[#100905] border-3 border-[#f59e0b] rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Vibrant Accent Ribbon */}
        <div className="h-3 tibeb-ribbon w-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#29170a] text-white hover:bg-[#da121a] border border-[#f59e0b] transition-colors shadow-lg"
        >
          <X size={19} />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Media Showcase (Photo / 3D) (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#f59e0b]/40 bg-[#120a05] shadow-xl">
              {product.imageUrl && viewMode === 'photo' ? (
                <div className="relative h-80 sm:h-96 w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#1c1108] via-[#120a05] to-[#080402]">
                  {/* Pedestal Reflection & Shadow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/25 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 w-40 h-8 bg-black/80 rounded-full filter blur-md pointer-events-none" />

                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className={`max-h-[92%] w-auto transition-transform duration-500 drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] ${
                      product.imageUrl.includes('3d_masterpieces')
                        ? 'w-full h-full object-cover'
                        : 'object-contain'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/80 border border-[#f59e0b]/50 backdrop-blur-md flex items-center justify-between text-xs">
                    <span className="text-[#fde047] font-black flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#fde047]" /> Heritage Heroes Official Figure
                    </span>
                    <span className="text-[10px] text-green-400 font-bold bg-green-950/60 px-2 py-0.5 rounded border border-green-700/50">
                      Collector Edition
                    </span>
                  </div>
                </div>
              ) : (
                <DollVisualizer
                  config={product.visualConfig}
                  heroName={product.heroName}
                  heroNameAmharic={product.heroNameAmharic}
                  figureTitle={product.titleAmharic}
                  category={product.category}
                  engravingText={childName}
                  heightClass="h-80 sm:h-96"
                />
              )}

              {/* Photo vs 3D Model Toggle Switch */}
              {product.imageUrl && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/80 border border-[#f59e0b] p-1 rounded-2xl shadow-xl backdrop-blur-md">
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      viewMode === 'photo'
                        ? 'bg-gradient-to-r from-[#fde047] to-[#f59e0b] text-black shadow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Camera size={12} />
                    <span>እውነተኛ ፎቶ</span>
                  </button>
                  <button
                    onClick={() => setViewMode('visualizer')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      viewMode === 'visualizer'
                        ? 'bg-gradient-to-r from-[#fde047] to-[#f59e0b] text-black shadow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>🎨 3D ሞዴል</span>
                  </button>

                  {['taytu-betul', 'zewditu', 'queen-of-sheba', 'shewareged-gadle', 'empress-mentewab', 'derartu-tulu', 'werede-mamo'].includes(product.heroId) && (
                    <button
                      onClick={() => {
                        onClose();
                        const el = document.getElementById('heroines-3d-pavilion');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 bg-gradient-to-r from-[#da121a] to-[#f43f5e] text-white shadow-lg hover:scale-105"
                      title="Launch 3D WebGL Interactive Exhibition"
                    >
                      <Sparkles size={12} className="text-yellow-300" />
                      <span>🏛️ 3D ኤግዚቢሽን</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Bedtime Storybook Card for Kids */}
            <div className="p-3.5 bg-[#201309] rounded-2xl border-2 border-[#4d3219] flex items-center gap-3 shadow">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#15803d] flex items-center justify-center text-2xl shadow flex-shrink-0">
                📖
              </div>
              <div>
                <span className="text-[11px] text-[#4ade80] uppercase tracking-wider block font-black">የተረት መጽሐፍና ታሪክ ካርድ</span>
                <span className="text-xs text-white font-bold">{product.bedtimeStoryTitle}</span>
              </div>
            </div>

            {/* Child Advice Quote with Voice Playback */}
            {hero && (
              <div className="p-4 bg-gradient-to-r from-[#291a0c] to-[#1c1108] rounded-2xl border border-[#f59e0b]/50 relative shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black tracking-wider uppercase text-[#fde047] flex items-center gap-1.5">
                    <Heart size={14} className="text-red-500 fill-red-500" /> ለልጆች የሚሰጥ ምክር
                  </span>
                  <button
                    onClick={handlePlayStoryAudio}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                      isPlayingAudio ? 'bg-[#078930] text-white border-green-400' : 'bg-[#3d240f] text-[#fef08a] border-[#f59e0b] hover:bg-[#52341b]'
                    }`}
                  >
                    <Volume2 size={13} className={isPlayingAudio ? 'animate-pulse text-[#4ade80]' : ''} />
                    <span>{isPlayingAudio ? 'ተረቱ እየተነበበ ነው...' : 'ተረቱን አድምጥ'}</span>
                  </button>
                </div>
                <p className="text-sm text-[#fef08a] font-serif font-black leading-relaxed">
                  {hero.famousQuoteAmharic}
                </p>
                <p className="text-xs text-[#86efac] font-medium mt-1">
                  💡 {hero.kidsLessonAmharic}
                </p>

                {isPlayingAudio && (
                  <div className="mt-3">
                    <HeroAudioNarrator
                      heroId={product.heroId}
                      defaultLanguage={language}
                      onClose={() => setIsPlayingAudio(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Details, Bedtime Story, Tabs, Purchase (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Header Titles in Rich Amharic */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-black text-xs font-black">
                  🧸 {product.ageRecommendation}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#201309] text-[#fef08a] text-xs font-bold border border-[#f59e0b]/40">
                  100% ኦርጋኒክ ጥጥ
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {product.titleAmharic}
              </h2>

              <div className="text-xs text-[#fde047] font-bold tracking-wide mt-1">
                {product.heroNameAmharic} — {hero?.titleAmharic}
              </div>

              {/* Price & Rating Row */}
              <div className="mt-3.5 flex items-center justify-between border-y border-[#3d2714] py-3.5">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#fef08a] font-mono">
                    {currency === 'ETB' ? `${product.priceETB.toLocaleString()} ብር (ETB)` : `$${product.priceUSD}`}
                  </div>
                  <span className="text-xs text-[#4ade80] font-bold flex items-center gap-1 mt-0.5">
                    ✓ በአዲስ አበባ ውስጥ ነጻ የዕለቱ ማድረሻ
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#201309] px-3.5 py-2 rounded-2xl border border-[#f59e0b]/50">
                  <Star size={17} className="text-[#fde047] fill-[#fde047]" />
                  <span className="text-sm font-black text-white">{product.rating}</span>
                  <span className="text-xs text-[#baa994]">({product.reviewsCount} ወላጆች መርጠውታል)</span>
                </div>
              </div>

              {/* Navigation Tabs in Amharic */}
              <div className="flex flex-wrap gap-2 mt-4 border-b border-[#3d2714] pb-2">
                {[
                  { id: 'details', label: 'የአሻንጉሊቱ መረጃ' },
                  { id: 'factcard', label: '📜 ታሪካዊ ካርድና QR' },
                  { id: 'story', label: 'የተረት መጽሐፍ' },
                  { id: 'reviews', label: `የወላጆች ምስክርነት (${product.reviewsCount})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-xs font-black pb-2 px-2 transition-all border-b-3 ${
                      activeTab === tab.id
                        ? 'border-[#f59e0b] text-[#fef08a]'
                        : 'border-transparent text-gray-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: Educational Fact Card & QR Code (From Business Proposal) */}
              {activeTab === 'factcard' && (
                <div className="space-y-4 pt-3 text-xs">
                  <div className="p-4 bg-gradient-to-br from-[#2a1708] via-[#1a0f05] to-[#120803] rounded-2xl border-2 border-[#f59e0b]/60 shadow-xl space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-[#fde047] font-black uppercase tracking-wider block">
                          Heritage Heroes Fact Card & QR System
                        </span>
                        <h4 className="font-serif font-black text-white text-base">
                          {product.educationalCardTitle || `${product.heroNameAmharic} - የህይወት ታሪክና ገድል`}
                        </h4>
                        <div className="text-[11px] text-[#86efac] font-bold mt-0.5">
                          ዘመን፡ {hero?.eraLabelAmharic} ({hero?.years}) • {hero?.locationAmharic}
                        </div>
                      </div>

                      {/* Mock QR Code Box with scan action */}
                      <div className="p-2 bg-white rounded-xl shadow-lg flex flex-col items-center flex-shrink-0">
                        <QrCode size={52} className="text-black" />
                        <span className="text-[8px] text-black font-black uppercase tracking-tighter mt-1">SCAN ME</span>
                      </div>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-[#4d3219] text-gray-200 leading-relaxed font-normal">
                      <p className="font-medium text-[#fef08a] mb-1">ታሪካዊ አጭር መግለጫ (Biography):</p>
                      {hero?.fullBioAmharic}
                    </div>

                    {/* QR Code Action Simulator */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#4d3219]">
                      <button
                        onClick={() => setScannedQR(!scannedQR)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-black text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all"
                      >
                        <QrCode size={13} />
                        <span>{scannedQR ? '✓ QR ኮዱ ተቃኝቷል!' : '📱 በስልክዎ QR ኮዱን ይቃኙ'}</span>
                      </button>
                      <span className="text-[11px] text-[#baa994]">
                        በአማርኛና እንግሊዝኛ የተዘጋጀ
                      </span>
                    </div>

                    {scannedQR && (
                      <div className="p-3 bg-[#0f2913] rounded-xl border border-green-500/50 text-green-200 text-xs animate-in fade-in duration-200 flex items-center gap-2">
                        <Check size={16} className="text-green-400 flex-shrink-0" />
                        <span>የተረጋገጠ፡ ዲጂታል የትምህርት ካርዱ በስልክዎ ላይ ተከፍቷል! አጫጭር ቪዲዮዎችንና የታሪክ ተረቶችን መከታተል ይችላሉ።</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-[#1c1208] rounded-xl border border-[#4d3219] text-[11px] text-[#d1d5db]">
                    <span className="text-[#fde047] font-bold">🏛️ የታሪክ አማካሪዎች ምስክርነት፡</span> ይህ ቅርጽና መማሪያ ካርድ በኢትዮጵያ ታሪክ ተመራማሪዎችና የባህል ባለሙያዎች በጥንቃቄ ተጠንቶ የተዘጋጀ ትክክለኛ ታሪካዊ መረጃ ነው።
                  </div>
                </div>
              )}

              {/* Tab 1: Doll Details & Child Safety in Amharic */}
              {activeTab === 'details' && (
                <div className="space-y-4 pt-3 text-xs">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 bg-[#201309] rounded-2xl border border-[#4d3219]">
                      <span className="text-[10px] text-[#baa994] uppercase tracking-wider block font-bold">ቁመትና ስኬል</span>
                      <span className="font-black text-white text-sm">{product.scale}</span>
                    </div>
                    <div className="p-3 bg-[#201309] rounded-2xl border border-[#4d3219]">
                      <span className="text-[10px] text-[#baa994] uppercase tracking-wider block font-bold">ክብደት</span>
                      <span className="font-black text-white text-sm">{product.weight}</span>
                    </div>
                  </div>

                  {/* Child Safety Badges */}
                  <div className="p-3.5 bg-gradient-to-r from-[#142918] to-[#1c2e17] rounded-2xl border border-[#22c55e]/50 space-y-1.5">
                    <span className="text-xs font-black text-[#86efac] block flex items-center gap-1.5">
                      <ShieldCheck size={16} /> ለህፃናት ደህንነቱ የተረጋገጠ (Child-Safe Certified):
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-gray-200 text-[11px]">
                      <div>✓ ምንም የሚዋጥ ስለታማ ነገር የሌለው</div>
                      <div>✓ በልብስ ማጠቢያ ማሽን የሚታጠብ</div>
                      <div>✓ 100% ኦርጋኒክ የሀበሻ ጥጥ</div>
                      <div>✓ አለርጂ የማያመጣ ንጹህ መሙያ</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-black text-[#fde047] uppercase tracking-wider block mb-2">
                      አብረው የሚላኩ መጫወቻዎች፡
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.accessoriesIncluded.map((acc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-200">
                          <Check size={15} className="text-[#22c55e] flex-shrink-0" />
                          <span className="text-xs font-medium">{acc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Bedtime Story Preview in Amharic */}
              {activeTab === 'story' && (
                <div className="space-y-4 pt-3 text-xs">
                  <div className="p-4 bg-[#201309] rounded-2xl border border-[#4d3219] space-y-2">
                    <h4 className="font-black text-[#fde047] text-sm flex items-center gap-2">
                      <BookOpen size={16} className="text-[#22c55e]" />
                      {product.bedtimeStoryTitle}
                    </h4>
                    <p className="text-gray-100 leading-relaxed font-medium">
                      {product.bedtimeStorySummaryAmharic}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-[#fde047] text-xs uppercase tracking-wider mb-2">
                      ልጆች ከዚህ አሻንጉሊት የሚያገኙት ትምህርት፡
                    </h4>
                    <p className="text-gray-200 leading-relaxed">
                      {hero?.kidsLessonAmharic}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Reviews from Happy Parents */}
              {activeTab === 'reviews' && (
                <div className="space-y-3 pt-3 text-xs max-h-56 overflow-y-auto pr-1">
                  {[
                    {
                      author: 'ቤተልሔም ግርማ',
                      location: 'አዲስ አበባ (ሲኤምሲ)',
                      rating: 5,
                      comment: 'ለ3 ዓመት ልጄ ገዛሁላት፤ እጅግ በጣም ወደደችው! ማታ ማታ ታቅፋው ነው የምትተኛው። የጥጡ ጥራትና ልብሱ የሚታጠብ መሆኑ በጣም አስደስቶኛል።'
                    },
                    {
                      author: 'ዳዊት ታደሰ',
                      location: 'ዋሽንግተን ዲሲ (አሜሪካ)',
                      rating: 5,
                      comment: 'በውጭ ሀገር ለሚኖሩ ልጆቻችን የኢትዮጵያን ባህልና ጀግኖች ለማስተማር ከዚህ የተሻለ ስጦታ የለም። የተረት መጽሐፉንም በየቀኑ እናነባለን።'
                    },
                    {
                      author: 'ሃና አስፋው',
                      location: 'ባህር ዳር',
                      rating: 5,
                      comment: 'አሻንጉሊቱ እጅግ በጣም ያምራል! ልብሱን እያወለቁ መጫወት ይችላሉ። ለስጦታ በጣም ድንቅ ምርጫ ነው።'
                    }
                  ].map((rev, idx) => (
                    <div key={idx} className="p-3.5 bg-[#201309] rounded-2xl border border-[#3d2714] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-white">{rev.author}</span>
                        <div className="flex text-[#fde047]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={11} fill="#fde047" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[11px] text-[#baa994]">{rev.location}</div>
                      <p className="text-gray-200 text-xs leading-relaxed pt-1 font-medium">«{rev.comment}»</p>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Child Name Inscription Option & Add To Cart Button in Amharic */}
            <div className="pt-4 border-t border-[#3d2714] space-y-3">
              {/* Optional Custom Child Name */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#fde68a] uppercase tracking-wider whitespace-nowrap font-bold">
                  የልጁ ስም (ለስጦታ ካርድ)፡
                </span>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="ምሳሌ፡ ለተወዳጇ ልጃችን ኤልሳቤጥ"
                  className="w-full bg-[#140b04] border-2 border-[#4d3219] text-xs text-[#fef08a] font-bold rounded-xl px-3 py-2 focus:border-[#f59e0b] focus:outline-none"
                  maxLength={25}
                />
              </div>

              {/* Quantity and Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-[#4d3219] rounded-xl bg-[#140b04]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-white hover:text-[#fde047] font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-black text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-white hover:text-[#fde047] font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-102 ${
                    addedToast
                      ? 'bg-[#078930] text-white shadow-green-900/40'
                      : 'bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black hover:opacity-95 shadow-orange-500/25 active:scale-98'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check size={18} />
                      <span>ለልጅዎ ወደ ቅርጫት ገብቷል!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="text-black" />
                      <span>
                        ለልጄ ግዛ • {currency === 'ETB' ? `${(product.priceETB * quantity).toLocaleString()} ብር (ETB)` : `$${product.priceUSD * quantity}`}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust badges for parents */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#baa994] font-bold">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#22c55e]" /> 100% ደህንነቱ የተረጋገጠ ጥጥ
                </span>
                <span>•</span>
                <span>የተረት መጽሐፍ በነጻ</span>
                <span>•</span>
                <span>ቴሌብርና ንግድ ባንክ</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
