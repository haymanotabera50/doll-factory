import React, { useState, useEffect, useRef } from 'react';
import { Currency, Language, DollSizeOption } from '../types';
import { ETHIOPIAN_HEROES } from '../data/heroes';
import { DollVisualizer } from './DollVisualizer';
import { 
  RotateCw, 
  Play, 
  Pause, 
  Sparkles, 
  QrCode, 
  Volume2, 
  ShoppingBag, 
  Eye, 
  Award, 
  ShieldCheck, 
  Check, 
  Compass, 
  Maximize2, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  Heart,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroAudioNarrator } from './HeroAudioNarrator';

interface Hero360StudioProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: any, customEngraving?: string) => void;
}

export const Hero360Studio: React.FC<Hero360StudioProps> = ({
  currency,
  language,
  onAddToCart
}) => {
  // Available heroes for 360 rotation (all featured on the official poster)
  const availableHeroes = ETHIOPIAN_HEROES.filter(h => h.dolls.length > 0);
  
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'360-model' | 'official-photo'>('official-photo');
  const [selectedSize, setSelectedSize] = useState<DollSizeOption>('mini-6-8');
  const [childName, setChildName] = useState<string>('ለተወዳጇ ልጃችን');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [scannedQR, setScannedQR] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeHero = availableHeroes[selectedHeroIndex] || availableHeroes[0];
  const activeProduct = activeHero.dolls[0];

  // Auto-spin animation timer (360 degrees rotation)
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 45);
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Mouse / Touch drag to spin 360 degrees
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setRotationAngle(prev => (prev + delta * 0.8 + 360) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Play spoken historical biography audio narration
  const handlePlayVoice = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  // Calculate price based on selected size
  const getPrice = () => {
    const baseETB = activeProduct.priceETB;
    const baseUSD = activeProduct.priceUSD;

    switch (selectedSize) {
      case 'mini-6-8':
        return { etb: Math.round(baseETB * 0.65), usd: Math.round(baseUSD * 0.65) };
      case 'collector-edition':
        return { etb: Math.round(baseETB * 1.4), usd: Math.round(baseUSD * 1.4) };
      case 'educational-set':
        return { etb: Math.round(baseETB * 1.6), usd: Math.round(baseUSD * 1.6) };
      default: // standard-12-14
        return { etb: baseETB, usd: baseUSD };
    }
  };

  const currentPrice = getPrice();

  const handleAdd = () => {
    onAddToCart({
      ...activeProduct,
      priceETB: currentPrice.etb,
      priceUSD: currentPrice.usd,
      title: `${activeProduct.title} (${selectedSize})`,
      titleAmharic: `${activeProduct.titleAmharic} (${selectedSize === 'mini-6-8' ? 'ሚኒ ቅርጽ' : selectedSize === 'collector-edition' ? 'የክብር ሰብሳቢ' : 'መደበኛ'})`
    }, childName);
    
    setAddedToast(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#f59e0b', '#ef4444', '#facc15']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedToast(false), 2500);
  };

  // Quick jump angle buttons
  const anglePresets = [
    { label: '0° ፊት (Front)', angle: 0 },
    { label: '45° ሩብ (Quarter)', angle: 45 },
    { label: '90° ጎን (Profile)', angle: 90 },
    { label: '180° ጀርባ (Back)', angle: 180 },
    { label: '270° ቀኝ (Right)', angle: 270 },
  ];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-[#1c1108] via-[#120a05] to-[#0a0503] border-3 border-[#f59e0b] shadow-2xl overflow-hidden p-4 sm:p-8 space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#3d2714]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#078930]/30 via-[#f59e0b]/30 to-[#da121a]/30 border border-[#f59e0b] text-[#fef08a] text-xs font-black mb-2 shadow">
            <RotateCw size={13} className="text-[#fde047] animate-spin" />
            <span>360° ROTATABLE & INTERACTIVE HERO STUDIO • ይፋዊ የጀግኖች ቅርጽ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
            የኢትዮጵያ ጀግኖች <span className="ethiopia-text-gradient font-black">360° ተሽከርካሪ ቅርጾች</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#fef3c7] mt-1 font-medium">
            በይፋዊ ፖስተር ላይ የሚገኙትን ጀግኖች በሙሉ ይምረጡ፤ በ360 ዲግሪ እያሽከረከሩ ይመልከቱ፣ እውነተኛ ፎቶዎቻቸውን፣ ታሪካቸውንና የQR ካርዶቻቸውን ያግኙ።
          </p>
        </div>

        {/* Global Slogan Badge */}
        <div className="p-3 bg-[#24170d] rounded-2xl border border-[#f59e0b]/50 text-right hidden sm:block">
          <div className="text-[11px] text-[#86efac] font-bold tracking-wider uppercase">HERITAGE HEROES ETHIOPIA</div>
          <div className="text-xs text-[#fde047] font-serif font-black italic">«Our past inspires. Our heroes guide.»</div>
        </div>
      </div>

      {/* Hero Selection Carousel Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#fde68a] font-bold">
          <span>ጀግና ይምረጡ ({availableHeroes.length} ይፋዊ ቅርጾች):</span>
          <span className="text-[#86efac] font-mono">{selectedHeroIndex + 1} / {availableHeroes.length}</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-[#f59e0b]">
          {availableHeroes.map((hero, idx) => {
            const isSelected = selectedHeroIndex === idx;
            return (
              <button
                key={hero.id}
                onClick={() => {
                  setSelectedHeroIndex(idx);
                  setRotationAngle(0);
                }}
                className={`flex-shrink-0 p-2.5 rounded-2xl border-2 transition-all flex items-center gap-2 text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#3d240f] to-[#5a3212] border-[#f59e0b] shadow-xl shadow-orange-500/20 scale-105'
                    : 'bg-[#140b04] border-[#3d2714] text-gray-300 hover:border-[#f59e0b]/60 hover:text-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-[#f59e0b]/40 flex-shrink-0 relative">
                  <img
                    src={hero.dolls[0]?.imageUrl || '/heritage_heroes_full_lineup.jpg'}
                    alt={hero.name}
                    className={`w-full h-full object-cover ${hero.dolls[0]?.posterFocusPosition || 'object-center'}`}
                  />
                </div>
                <div className="pr-1">
                  <div className={`text-xs font-black leading-tight ${isSelected ? 'text-[#fef08a]' : 'text-white'}`}>
                    {hero.amharicName}
                  </div>
                  <div className="text-[10px] text-[#baa994] font-medium leading-none mt-0.5">
                    {hero.years}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 360 Studio Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 360° Rotatable Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#180e07] via-[#100904] to-[#080402] border-3 border-[#f59e0b] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top View Mode Switcher & Auto-Spin Toggle */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
              {/* Photo vs 360 3D Mode */}
              <div className="flex items-center gap-1 bg-black/85 border border-[#f59e0b] p-1 rounded-2xl shadow-xl backdrop-blur-md">
                <button
                  onClick={() => setViewMode('official-photo')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'official-photo'
                      ? 'bg-gradient-to-r from-[#fde047] to-[#f59e0b] text-black shadow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Camera size={13} />
                  <span>📸 ይፋዊ ፎቶ</span>
                </button>
                <button
                  onClick={() => setViewMode('360-model')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === '360-model'
                      ? 'bg-gradient-to-r from-[#fde047] to-[#f59e0b] text-black shadow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <RotateCw size={13} />
                  <span>🔄 360° ቅርጽ</span>
                </button>
              </div>

              {/* Play/Pause Auto-Spin */}
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3 py-1.5 rounded-2xl bg-black/80 hover:bg-[#3d240f] border border-[#f59e0b] text-xs font-bold text-[#fef08a] flex items-center gap-1.5 shadow-xl backdrop-blur-md"
              >
                {isAutoSpinning ? <Pause size={13} /> : <Play size={13} />}
                <span>{isAutoSpinning ? 'አቁም' : 'አሽከርክር'}</span>
              </button>
            </div>

            {/* Display Stage */}
            {viewMode === 'official-photo' ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c1108] via-[#120a05] to-[#080402]">
                {/* Museum Pedestal Ambient Glow & Shadow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 w-48 h-8 bg-black/80 rounded-full filter blur-md pointer-events-none" />

                <img
                  src={activeProduct.imageUrl || '/heritage_heroes_3d_masterpieces.jpg'}
                  alt={activeHero.name}
                  className={`transition-transform duration-500 drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] ${
                    activeProduct.imageUrl?.includes('3d_masterpieces')
                      ? 'w-full h-full object-cover scale-105'
                      : 'object-contain max-h-[92%] w-auto p-2 hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Photo Annotation Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/85 border border-[#f59e0b]/60 backdrop-blur-md flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#fde047] font-black uppercase tracking-wider block">
                      HERITAGE HEROES OFFICIAL FIGURE LINEUP
                    </span>
                    <span className="text-white font-serif font-black text-sm">
                      {activeHero.name} ({activeHero.years})
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#078930]/40 text-[#86efac] font-bold border border-[#22c55e]/40 text-[11px]">
                    ✓ በፖስተሩ ላይ ያለ ቅርጽ
                  </span>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-full flex flex-col items-center justify-center transition-transform duration-75"
                style={{
                  transform: `perspective(1000px) rotateY(${rotationAngle}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <DollVisualizer
                  config={activeProduct.visualConfig}
                  heroName={activeHero.name}
                  heroNameAmharic={activeHero.amharicName}
                  figureTitle={activeProduct.titleAmharic}
                  category={activeProduct.category}
                  engravingText={childName}
                  heightClass="h-full"
                  interactive={false}
                />
              </div>
            )}

            {/* Brass Nameplate Plinth Bar (Always Visible at Base) */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-[#29170a] via-[#4d3215] to-[#29170a] border-t-2 border-[#f59e0b] flex items-center justify-center px-4 shadow-2xl z-20">
              <span className="text-xs font-serif font-black tracking-widest text-[#fde047] uppercase drop-shadow">
                ★ {activeHero.name.toUpperCase()} • {activeHero.years} ★
              </span>
            </div>
          </div>

          {/* 360° Angle Slider & Preset Angle Buttons */}
          <div className="p-4 bg-[#140b04] rounded-2xl border-2 border-[#4d3219] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#fde68a] font-bold">
              <span className="flex items-center gap-1.5">
                <RotateCw size={13} className="text-[#f59e0b]" /> የማዞሪያ አንግል (Rotation Angle):
              </span>
              <span className="font-mono text-sm font-black text-white bg-[#251508] px-2 py-0.5 rounded border border-[#f59e0b]/50">
                {Math.round(rotationAngle)}°
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="360"
              value={Math.round(rotationAngle)}
              onChange={(e) => {
                setRotationAngle(Number(e.target.value));
                setIsAutoSpinning(false);
              }}
              className="w-full accent-[#f59e0b] cursor-pointer"
            />

            {/* Angle Preset Quick Buttons */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {anglePresets.map(preset => (
                <button
                  key={preset.angle}
                  onClick={() => {
                    setRotationAngle(preset.angle);
                    setIsAutoSpinning(false);
                  }}
                  className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all truncate border ${
                    Math.abs(rotationAngle - preset.angle) < 15
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black border-yellow-300 font-black'
                      : 'bg-[#201206] text-gray-300 border-[#3d2714] hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Hero Details, Card, Sizing & Purchase (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Header Info */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#24170e] to-[#160d06] border-2 border-[#f59e0b] space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#fde047] font-black uppercase tracking-wider">
                {activeHero.eraLabelAmharic} ({activeHero.years})
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#078930]/30 border border-[#22c55e]/50 text-[#86efac] text-[10px] font-bold">
                ✓ በአዲስ አበባ የሚመረት
              </span>
            </div>

            <h3 className="text-2xl font-serif font-black text-white">
              {activeHero.amharicName}
            </h3>

            <div className="text-xs text-[#fde047] font-serif font-black italic">
              «{activeHero.famousQuote}»
            </div>

            <p className="text-xs text-gray-200 leading-relaxed font-normal pt-1 border-t border-[#3d2714]">
              {activeHero.fullBioAmharic}
            </p>

            {/* Voice Audio Quote Playback */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handlePlayVoice}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isPlayingAudio ? 'bg-amber-500 text-slate-950 border-amber-300 font-black shadow-lg animate-pulse' : 'bg-[#2e1c0c] text-[#fef08a] border-[#f59e0b] hover:bg-[#452810]'
                }`}
              >
                {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isPlayingAudio ? 'ድምፅን አቁም (Stop Audio)' : 'የጀግናውን ታሪክ በድምፅ አድምጥ (Hear History)'}</span>
              </button>

              <span className="text-[11px] text-[#4ade80] font-bold">
                💡 {activeHero.kidsLessonAmharic}
              </span>
            </div>

            {/* Spoken History Audio Player */}
            {isPlayingAudio && (
              <div className="pt-3">
                <HeroAudioNarrator
                  heroId={activeHero.id}
                  defaultLanguage={language}
                  onClose={() => setIsPlayingAudio(false)}
                />
              </div>
            )}
          </div>

          {/* Exclusive 7-Inch Figurine Card */}
          <div className="p-5 rounded-3xl bg-[#140b04] border-2 border-[#f59e0b]/80 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#fde047] uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#f59e0b]" /> ይፋዊ የቅርጽ መጠን (Edition):
              </span>
              <span className="text-[10px] text-[#86efac] font-bold bg-[#22c55e]/20 px-2.5 py-0.5 rounded-full border border-[#22c55e]/40">
                ✓ 7 ኢንች ብቻ (Only 7 Inch)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#3d240f] to-[#251408] border-2 border-[#f59e0b] shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-serif font-black text-white">ሚኒ ቅርጽ (Mini Heritage Figurine)</div>
                <div className="text-xs text-[#fde047]">7 ኢንች (18 ሳ.ሜ) • በጥቁር የተቀረጸ ፕሊንዝ መቆሚያ ላይ</div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-[#fde047] font-mono">
                  {currency === 'ETB' ? '2,250 ብር' : '$35'}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ በክምችት ላይ ያለ</span>
              </div>
            </div>
          </div>

          {/* Educational Fact Card & Scannable QR Code Showcase (From User's Poster) */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#2a1708] via-[#1a0f05] to-[#120803] border-2 border-[#f59e0b]/70 shadow-xl space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#86efac] font-bold uppercase tracking-wider block">
                  AUTHENTIC FACT CARD & QR CODE
                </span>
                <h4 className="font-serif font-black text-white text-sm">
                  {activeProduct.educationalCardTitle || `${activeHero.name} Fact Card`}
                </h4>
                <div className="text-[11px] text-[#fef08a] mt-0.5">
                  «{activeHero.famousQuote}»
                </div>
              </div>

              {/* Scannable QR Code */}
              <div 
                onClick={() => setScannedQR(!scannedQR)}
                className="p-1.5 bg-white rounded-xl shadow-lg flex flex-col items-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                title="ይጫኑና በስልክዎ ይቃኙ"
              >
                <QrCode size={46} className="text-black" />
                <span className="text-[7px] text-black font-black uppercase tracking-tighter">SCAN QR</span>
              </div>
            </div>

            {scannedQR && (
              <div className="p-2.5 bg-[#0e2712] rounded-xl border border-green-500/50 text-green-200 text-xs flex items-center gap-2 animate-in fade-in">
                <Check size={14} className="text-green-400 flex-shrink-0" />
                <span>QR ኮዱ ተቃኝቷል! የታሪክ የድምጽና የምስል መማሪያ በስልክዎ ተከፍቷል።</span>
              </div>
            )}
          </div>

          {/* Gift Engraving & Add to Cart */}
          <div className="p-4 rounded-3xl bg-[#140b04] border-2 border-[#4d3219] space-y-3">
            {/* Custom Engraving Name */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#fde68a] font-bold whitespace-nowrap">
                የስጦታ ስም በሰሌዳው ላይ፡
              </span>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="ምሳሌ፡ ለተወዳጇ ልጃችን"
                className="w-full bg-[#1e1107] border border-[#4d3219] text-xs text-[#fef08a] font-bold rounded-xl px-3 py-1.5 focus:border-[#f59e0b] focus:outline-none"
                maxLength={30}
              />
            </div>

            {/* Price & Add Button */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#3d2714]">
              <div>
                <div className="text-xl font-black text-[#fef08a] font-mono">
                  {currency === 'ETB' ? `${currentPrice.etb.toLocaleString()} ብር (ETB)` : `$${currentPrice.usd}`}
                </div>
                <div className="text-[10px] text-[#4ade80] font-bold">
                  ✓ በክምችት አለ ({activeProduct.stockQuantity} ቀርተዋል)
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95 ${
                  addedToast
                    ? 'bg-[#078930] text-white shadow-green-900/40'
                    : 'bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black hover:opacity-95 shadow-orange-500/25'
                }`}
              >
                {addedToast ? (
                  <>
                    <Check size={16} />
                    <span>ወደ ቅርጫት ገብቷል!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} className="text-black" />
                    <span>ይህንን ቅርጽ ግዛ</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

