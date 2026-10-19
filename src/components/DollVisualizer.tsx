import React, { useState, useEffect } from 'react';
import { VisualConfig } from '../types';
import { RotateCw, Sparkles, Heart, Smile, Music, Shield, Sun } from 'lucide-react';

interface DollVisualizerProps {
  config: VisualConfig;
  heroName: string;
  heroNameAmharic: string;
  figureTitle: string;
  category: string;
  interactive?: boolean;
  engravingText?: string;
  heightClass?: string;
  onSelectDesignModel?: (model: 'lifelike-historical-hero' | 'heroic-warhorse' | 'reborn-realistic-toddler' | 'fashion-articulated' | 'anime-bjd-bigeyes' | 'waldorf-ragdoll') => void;
}

export const DollVisualizer: React.FC<DollVisualizerProps> = ({
  config,
  heroName,
  heroNameAmharic,
  figureTitle,
  category,
  interactive = true,
  engravingText,
  heightClass = 'h-96',
  onSelectDesignModel
}) => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isWaving, setIsWaving] = useState<boolean>(true);
  const [isSmiling, setIsSmiling] = useState<boolean>(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [bounceOffset, setBounceOffset] = useState<number>(0);

  // Joyful bouncy breathing animation for children's toy
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 100;
      setBounceOffset(Math.sin((frame / 100) * Math.PI * 2) * 5);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handlePlayJingle = () => {
    setIsPlayingMusic(true);
    setTimeout(() => setIsPlayingMusic(false), 2500);
  };

  return (
    <div 
      className={`relative w-full ${heightClass} flex flex-col items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-b from-[#251810] via-[#1a110a] to-[#120a05] border-3 border-[#f59e0b] shadow-2xl transition-all duration-300 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Playful Floating Stars & Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-4 left-6 text-2xl animate-bounce">⭐</div>
        <div className="absolute top-12 right-10 text-xl animate-pulse text-yellow-300">✨</div>
        <div className="absolute bottom-16 left-12 text-xl text-green-400">🎈</div>
        <div className="absolute bottom-20 right-8 text-2xl text-red-400">💖</div>
      </div>

      {/* Warm Ambient Glow */}
      <div 
        className="absolute w-72 h-72 rounded-full filter blur-[70px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(252, 221, 9, 0.4) 0%, rgba(7, 137, 48, 0.2) 50%, transparent 70%)'
        }}
      />

      {/* Top Banner Tag for Kids */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <span className="px-3 py-1 text-xs font-black rounded-full bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black shadow-lg">
          🧸 100% የህፃናት መጫወቻ አሻንጉሊት
        </span>
        <span className="text-[11px] font-bold text-[#fef08a] bg-[#3a2210] px-2.5 py-0.5 rounded-full border border-[#f59e0b]/50 hidden sm:inline-block">
          {category === 'plush-cuddle-doll' ? 'የሚታቀፍ ለስላሳ' : category === 'interactive-play-doll' ? 'ተጫዋች አሻንጉሊት' : 'ከተረት መጽሐፍ ጋር'}
        </span>
      </div>

      {/* Interactive Controls for Kids (Top Right) */}
      {interactive && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#29170a]/90 p-1.5 rounded-2xl border-2 border-[#f59e0b] backdrop-blur-md shadow-xl">
          {/* Quick Archetype Switcher if handler provided */}
          {onSelectDesignModel && (
            <div className="flex items-center gap-1 mr-1 pr-1 border-r border-[#4d3219]">
              <button
                onClick={() => onSelectDesignModel('lifelike-historical-hero')}
                title="እውነተኛ ታሪካዊ ጀግና (Realistic Human Being Hero Figure - ዳግማዊ ቴዎድሮስ፣ እቴጌ ጣይቱ፣ ምኒልክ)"
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  (!config.dollDesignModel || config.dollDesignModel === 'lifelike-historical-hero')
                    ? 'bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black shadow ring-2 ring-[#fde047]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👑 እውነተኛ ጀግና (Realistic Hero)
              </button>
              <button
                onClick={() => onSelectDesignModel('heroic-warhorse')}
                title="የጀግኖች የክብር ፈረስ ቅርጽ (Ethiopian Heroic Warhorse Statue)"
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  config.dollDesignModel === 'heroic-warhorse'
                    ? 'bg-gradient-to-r from-[#d97706] to-[#78350f] text-white shadow ring-1 ring-[#fde047]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🐎 የጀግኖች ፈረስ
              </button>
              <button
                onClick={() => onSelectDesignModel('reborn-realistic-toddler')}
                title="እጅግ እውነተኛ ታሪካዊ ህፃን አሻንጉሊት (Realistic Lifelike Reborn Doll)"
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  config.dollDesignModel === 'reborn-realistic-toddler'
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-black shadow ring-1 ring-[#fde047]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👶 እውነተኛ ህፃን
              </button>
              <button
                onClick={() => onSelectDesignModel('fashion-articulated')}
                title="የፋሽን አሻንጉሊት (Fashion Poseable Doll)"
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  config.dollDesignModel === 'fashion-articulated'
                    ? 'bg-[#ec4899] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👗 ፋሽን
              </button>
              <button
                onClick={() => onSelectDesignModel('anime-bjd-bigeyes')}
                title="ትልልቅ አይኖችና ሹሩባ (Anime / BJD Eyes)"
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  config.dollDesignModel === 'anime-bjd-bigeyes'
                    ? 'bg-[#06b6d4] text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👀 ዐይነ-ቁልጭ
              </button>
              <button
                onClick={() => onSelectDesignModel('waldorf-ragdoll')}
                title="የሱፍ ካርዲጋንና የጨርቅ አሻንጉሊት (Waldorf Soft Doll)"
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  config.dollDesignModel === 'waldorf-ragdoll'
                    ? 'bg-[#84cc16] text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🧶 ዋልዶርፍ
              </button>
            </div>
          )}

          {/* Wave Hand Button */}
          <button
            onClick={() => setIsWaving(!isWaving)}
            title="እጅ አወዛውዝ (Wave Hello)"
            className={`p-1.5 rounded-xl transition-all ${isWaving ? 'bg-[#22c55e] text-black font-bold shadow' : 'text-gray-300 hover:text-white'}`}
          >
            👋
          </button>

          {/* Smile / Wink Button */}
          <button
            onClick={() => setIsSmiling(!isSmiling)}
            title="ፈገግ በል (Smile)"
            className={`p-1.5 rounded-xl transition-all ${isSmiling ? 'bg-[#f59e0b] text-black shadow' : 'text-gray-300 hover:text-white'}`}
          >
            <Smile size={16} />
          </button>

          {/* Play Musical Jingle */}
          <button
            onClick={handlePlayJingle}
            title="የህፃናት ዜማ አጫውት (Play Chime)"
            className={`p-1.5 rounded-xl transition-all ${isPlayingMusic ? 'bg-[#da121a] text-white animate-spin' : 'text-[#fde047] hover:bg-[#3d2714]'}`}
          >
            <Music size={16} />
          </button>

          {/* Rotate 45° */}
          <button
            onClick={() => setRotationAngle(prev => (prev + 45) % 360)}
            title="አሻንጉሊቱን አሽከርክር"
            className="p-1.5 rounded-xl text-white hover:bg-[#3d2714] transition-colors"
          >
            <RotateCw size={16} />
          </button>
        </div>
      )}

      {/* SVG Expressive Children's Play Doll */}
      <div 
        className="relative z-10 w-full h-full flex items-center justify-center p-4 transition-transform duration-300"
        style={{
          transform: `translateY(${bounceOffset}px) scale(${isHovered ? 1.05 : 1}) rotateY(${Math.sin((rotationAngle * Math.PI) / 180) * 12}deg)`
        }}
      >
        <svg 
          viewBox="0 0 380 440" 
          className="w-full h-full max-h-[350px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Colorful Ethiopian Tibeb Ribbon Gradient */}
            <linearGradient id="tibebToyRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#078930" />
              <stop offset="33%" stopColor="#078930" />
              <stop offset="34%" stopColor="#fcdd09" />
              <stop offset="66%" stopColor="#fcdd09" />
              <stop offset="67%" stopColor="#da121a" />
              <stop offset="100%" stopColor="#da121a" />
            </linearGradient>

            <linearGradient id="goldToyCrown" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="softToyCape" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.clothingPrimaryColor || '#dc2626'} />
              <stop offset="100%" stopColor="#1e1b18" />
            </linearGradient>
          {/* Bronze Shading Gradients for Majestic Horse */}
          <linearGradient id="bronzeHorseBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#452a18" />
            <stop offset="35%" stopColor="#28160c" />
            <stop offset="70%" stopColor="#140a05" />
            <stop offset="100%" stopColor="#362012" />
          </linearGradient>

          <linearGradient id="bronzeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8c5832" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#452a18" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#140a05" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="bronzeMane" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#1a0e07" />
            <stop offset="50%" stopColor="#3d2313" />
            <stop offset="100%" stopColor="#120804" />
          </linearGradient>

          {/* Realistic Royal Velvet Kaba Gradient */}
          <linearGradient id="realisticRoyalVelvet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="45%" stopColor="#450a0a" />
            <stop offset="100%" stopColor="#1f0303" />
          </linearGradient>

          {/* Genuine Gold Embroidery Gradient */}
          <linearGradient id="imperialGoldFiligree" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Realistic Human Skin Texture & Shadow */}
          <radialGradient id="realisticHeroSkin" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#8d5630" />
            <stop offset="60%" stopColor="#6e3e1e" />
            <stop offset="100%" stopColor="#43220c" />
          </radialGradient>
        </defs>

          {/* ============================================================== */}
          {/* MODEL: LIFELIKE REALISTIC HUMAN HERO (User's Exact Need)       */}
          {/* Authentic realistic adult Ethiopian hero anatomy, intense      */}
          {/* gaze, royal cornrows/braids, mustache, lion mane, gold kaba,   */}
          {/* curved shotel sword, embossed leather shield, authentic stance */}
          {/* ============================================================== */}
          {(!config.dollDesignModel || config.dollDesignModel === 'lifelike-historical-hero') && (
            <g id="lifelikeHistoricalHeroFigure">
              {/* Grand Polished Granite & Brass Inscribed Pedestal */}
              <g id="heroMonumentPlinth">
                <ellipse cx="190" cy="415" rx="120" ry="22" fill="#140b04" stroke="#d97706" strokeWidth="2.5" />
                <path 
                  d="M80 412 L100 395 L280 395 L300 412 L280 422 L100 422 Z" 
                  fill="#291508" 
                  stroke="#f59e0b" 
                  strokeWidth="1.5" 
                />
                {/* Gold Engraved Banner */}
                <rect x="110" y="402" width="160" height="15" rx="3" fill="#0d0703" stroke="#f59e0b" strokeWidth="1.2" />
                <text x="190" y="413" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="black" letterSpacing="1">
                  {heroNameAmharic}
                </text>
              </g>

              {/* Majestic Flowing Imperial Royal Velvet Kaba (Cape) */}
              <g id="flowingRoyalKaba">
                <path 
                  d="M135 150 C95 240, 80 340, 70 388 C120 400, 260 400, 310 388 C300 340, 285 240, 245 150 Z" 
                  fill="url(#realisticRoyalVelvet)" 
                  stroke="#b45309" 
                  strokeWidth="2.5" 
                />
                {/* Gold Embroidered Border trimmings on Cape */}
                <path d="M72 386 C120 398, 260 398, 308 386" stroke="url(#imperialGoldFiligree)" strokeWidth="6" fill="none" />
                <path d="M85 365 C130 376, 250 376, 295 365" stroke="url(#imperialGoldFiligree)" strokeWidth="2.5" fill="none" strokeDasharray="6 3" />
                {/* Cape inner shadow */}
                <path d="M142 165 C115 240, 105 320, 95 370" stroke="#000000" strokeWidth="3" opacity="0.6" fill="none" />
              </g>

              {/* Powerful Athletic Legs & Historical Leather Riding Boots */}
              <g id="heroBootsAndLegs">
                {/* Left Leg: Sturdy hero stance */}
                <path 
                  d="M152 270 L146 345 L144 398 L168 398 L170 345 L174 270 Z" 
                  fill="#ffffff" 
                  stroke="#382010" 
                  strokeWidth="1.5" 
                />
                {/* Left Knee Riding Boot in rich leather */}
                <path 
                  d="M144 320 C144 315, 172 315, 172 320 L168 398 C168 402, 140 402, 140 398 Z" 
                  fill="#2e180a" 
                  stroke="#120803" 
                  strokeWidth="1.5" 
                />
                <path d="M140 398 L134 402 L168 402 L166 398 Z" fill="#0f0703" />
                {/* Gold boot buckle & strap */}
                <rect x="144" y="340" width="26" height="5" fill="#ca8a04" rx="1" />

                {/* Right Leg: Sturdy forward stance */}
                <path 
                  d="M206 270 L210 345 L212 398 L236 398 L234 345 L228 270 Z" 
                  fill="#ffffff" 
                  stroke="#382010" 
                  strokeWidth="1.5" 
                />
                {/* Right Knee Riding Boot */}
                <path 
                  d="M208 320 C208 315, 236 315, 236 320 L240 398 C240 402, 212 402, 212 398 Z" 
                  fill="#2e180a" 
                  stroke="#120803" 
                  strokeWidth="1.5" 
                />
                <path d="M212 398 L210 402 L244 402 L240 398 Z" fill="#0f0703" />
                <rect x="210" y="340" width="26" height="5" fill="#ca8a04" rx="1" />
              </g>

              {/* Realistic Hero Torso & Authentic Handwoven Ethiopian Shamma / Warrior Tunic */}
              <g id="heroTorso">
                {/* Muscular chest & broad shoulders */}
                <path 
                  d="M140 150 L240 150 L245 285 L135 285 Z" 
                  fill="#f8fafc" 
                  stroke="#331c0d" 
                  strokeWidth="2" 
                />
                {/* Intricate Royal Tibeb Cross & geometric embroidery across chest */}
                <rect x="183" y="150" width="14" height="135" fill="url(#tibebToyRibbon)" />
                <path d="M150 200 L230 200" stroke="url(#tibebToyRibbon)" strokeWidth="10" />
                <rect x="140" y="270" width="100" height="12" fill="url(#tibebToyRibbon)" />

                {/* Cross-body Bullet Bandolier (Ammo Belt) for Patriots/Warriors */}
                <path 
                  d="M142 152 L238 275" 
                  stroke="#451a03" 
                  strokeWidth="10" 
                  strokeLinecap="round" 
                />
                {/* Brass bullet casings along bandolier */}
                {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, i) => (
                  <circle 
                    key={`bullet-${i}`} 
                    cx={142 + (238 - 142) * t} 
                    cy={152 + (275 - 152) * t} 
                    r="3.5" 
                    fill="#facc15" 
                    stroke="#854d0e" 
                    strokeWidth="1" 
                  />
                ))}

                {/* Wide Embossed Leather Warrior Belt at Waist */}
                <rect x="135" y="255" width="110" height="18" fill="#1c0f06" stroke="#ca8a04" strokeWidth="1.5" />
                <circle cx="190" cy="264" r="8" fill="url(#imperialGoldFiligree)" stroke="#78350f" strokeWidth="1.5" />
                <polygon points="190,258 192,262 196,263 193,266 194,270 190,268 186,270 187,266 184,263 188,262" fill="#ffffff" />
              </g>

              {/* Arms, Legendary Curved Shotel Sword & Golden Star Shield */}
              {/* Left Arm holding Sheathed Shotel Sword / Scepter */}
              <g id="heroLeftArmAndSword">
                {/* Arm */}
                <path d="M140 155 L108 220 L120 230 L148 175 Z" fill="#f8fafc" stroke="#331c0d" strokeWidth="1.8" />
                {/* Muscular forearm & hand */}
                <path d="M112 225 L105 255" stroke="url(#realisticHeroSkin)" strokeWidth="14" strokeLinecap="round" />
                {/* Historical Curved Shotel Sword (ሰይፍ) */}
                <g id="shotelSword">
                  {/* Long scythe-curved blade */}
                  <path 
                    d="M102 240 C95 280, 85 330, 95 380 C102 385, 108 375, 104 330 C100 290, 108 250, 110 240 Z" 
                    fill="#e2e8f0" 
                    stroke="#475569" 
                    strokeWidth="1.8" 
                  />
                  {/* Steel shine highlight */}
                  <path d="M100 250 C92 290, 88 335, 96 375" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                  {/* Gold Filigree Hilt & Pommel */}
                  <rect x="98" y="235" width="14" height="6" fill="#ca8a04" rx="2" />
                  <circle cx="105" cy="232" r="4.5" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
                </g>
              </g>

              {/* Right Arm: Raised Proudly Holding Shield or Scepter */}
              <g id="heroRightArmAndShield">
                <path d="M240 155 L265 210 L252 220 L232 175 Z" fill="#f8fafc" stroke="#331c0d" strokeWidth="1.8" />
                <path d="M260 215 L268 245" stroke="url(#realisticHeroSkin)" strokeWidth="14" strokeLinecap="round" />
                
                {/* Authentic Convex Ethiopian Warrior Shield (ጋሻ) with Velvet & Gold Plates */}
                <g id="authenticEthiopianShield" transform="translate(230, 215)">
                  {/* Conical Embossed Shield */}
                  <ellipse cx="45" cy="45" rx="36" ry="42" fill="#7f1d1d" stroke="#ca8a04" strokeWidth="3" />
                  <ellipse cx="45" cy="45" rx="28" ry="34" fill="#1c0f06" stroke="#ca8a04" strokeWidth="1.8" />
                  {/* Center Brass Boss / Umbo with Royal Star */}
                  <circle cx="45" cy="45" r="14" fill="url(#imperialGoldFiligree)" stroke="#78350f" strokeWidth="2" />
                  <polygon points="45,34 48,41 56,42 50,47 52,55 45,51 38,55 40,47 34,42 42,41" fill="#ffffff" />
                  {/* Radiating brass decorative studs */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const sx = 45 + Math.cos(rad) * 26;
                    const sy = 45 + Math.sin(rad) * 32;
                    return <circle key={`stud-${i}`} cx={sx} cy={sy} r="2.8" fill="#facc15" stroke="#78350f" strokeWidth="0.8" />;
                  })}
                </g>
              </g>

              {/* Authentic Realistic Human Face & Royal Head */}
              <g id="realisticHeroHead">
                {/* Powerful muscular neck with throat anatomy */}
                <rect x="178" y="125" width="24" height="32" fill="url(#realisticHeroSkin)" />
                <path d="M185 135 L190 148 L195 135" stroke="#3d1d07" strokeWidth="1.5" fill="none" opacity="0.6" />

                {/* Strong, Angular Chiseled Jawline & Cheekbones (Realistic African Male/Female Hero) */}
                <path 
                  d="M158 85 C156 40, 224 40, 222 85 C224 105, 228 128, 212 145 C198 155, 182 155, 168 145 C152 128, 156 105, 158 85 Z" 
                  fill="url(#realisticHeroSkin)" 
                  stroke="#2d1505" 
                  strokeWidth="1.8" 
                />

                {/* Realistic Ear Anatomy */}
                <ellipse cx="156" cy="105" rx="5" ry="9" fill="url(#realisticHeroSkin)" stroke="#2d1505" strokeWidth="1" />
                <ellipse cx="224" cy="105" rx="5" ry="9" fill="url(#realisticHeroSkin)" stroke="#2d1505" strokeWidth="1" />

                {/* FIERCE VISIONARY HERO EYES (Intense, Wise, Realistic Human Gaze) */}
                {/* Left Eye */}
                <g id="heroEyeLeft">
                  <path d="M166 98 Q174 92 182 98 Q174 103 166 98 Z" fill="#f8fafc" stroke="#170c04" strokeWidth="1.5" />
                  {/* Deep Dark Brown/Amber Iris with Realistic Human Depth */}
                  <circle cx="174" cy="97" r="4.2" fill="#451a03" />
                  <circle cx="174" cy="97" r="2.8" fill="#78350f" />
                  <circle cx="174" cy="97" r="1.8" fill="#0f172a" />
                  {/* Wet Catchlight Reflection */}
                  <circle cx="172.5" cy="95.5" r="1" fill="#ffffff" />
                  {/* Realistic Eyelid Fold & Eyebrow */}
                  <path d="M164 92 Q174 88 184 94" stroke="#170c04" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  {/* Determined furrowed brow wrinkle */}
                  <path d="M185 90 L188 84" stroke="#2d1505" strokeWidth="1.5" opacity="0.6" />
                </g>

                {/* Right Eye */}
                <g id="heroEyeRight">
                  <path d="M198 98 Q206 92 214 98 Q206 103 198 98 Z" fill="#f8fafc" stroke="#170c04" strokeWidth="1.5" />
                  <circle cx="206" cy="97" r="4.2" fill="#451a03" />
                  <circle cx="206" cy="97" r="2.8" fill="#78350f" />
                  <circle cx="206" cy="97" r="1.8" fill="#0f172a" />
                  <circle cx="204.5" cy="95.5" r="1" fill="#ffffff" />
                  <path d="M196 94 Q206 88 216 92" stroke="#170c04" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  <path d="M195 90 L192 84" stroke="#2d1505" strokeWidth="1.5" opacity="0.6" />
                </g>

                {/* High Aquiline Nose Bridge & Flared Nostrils */}
                <path d="M188 92 L187 114 L193 114" stroke="#2d1505" strokeWidth="1.5" fill="none" />
                <ellipse cx="190" cy="116" rx="4" ry="2.5" fill="#5c2d12" />
                <circle cx="186" cy="117" r="1.5" fill="#1f0c02" />
                <circle cx="194" cy="117" r="1.5" fill="#1f0c02" />

                {/* Determined Royal Mustache & Goatee / Royal Beard (Tewodros / Menelik Style) */}
                <g id="heroBeardAndMustache">
                  {/* Distinctive Ethiopian Warrior Mustache */}
                  <path 
                    d="M180 125 C186 122, 194 122, 200 125 C196 130, 184 130, 180 125 Z" 
                    fill="#120803" 
                  />
                  {/* Royal Lips */}
                  <path d="M183 128 Q190 132 197 128" stroke="#7f1d1d" strokeWidth="2" fill="none" />
                  {/* Clean Royal Chin Beard / Goatee */}
                  <path d="M186 135 L190 148 L194 135 Z" fill="#120803" />
                </g>
              </g>

              {/* ROYAL ETHIOPIAN CORNROWS & LION MANE HEADDRESS (የጀግኖች ቅንጣት ሽሩባና የጎፈር ቆብ) */}
              <g id="royalBraidsAndLionMane">
                {/* Traditional Royal Cornrows (የተከታታይ ሽሩባ አሰራር - Tewodros II signature braids!) */}
                {[165, 175, 185, 195, 205, 215].map((x, idx) => (
                  <path 
                    key={`royal-braid-${idx}`} 
                    d={`M${x} 58 C${x - 2} 70, ${x + 2} 80, ${x} 88`} 
                    stroke="#0a0502" 
                    strokeWidth="3.5" 
                    fill="none" 
                    strokeLinecap="round" 
                  />
                ))}

                {/* Magnificent Authentic Lion Mane Headdress (የአንበሳ ጎፈር ቆብ - Award of Adwa & Meqdela Braves!) */}
                <g id="authenticLionMane">
                  {/* Full voluminous lion mane collar radiating with dignity */}
                  <path 
                    d="M135 90 C120 130, 118 165, 138 175 C155 182, 225 182, 242 175 C262 165, 260 130, 245 90 C235 60, 145 60, 135 90 Z" 
                    fill="url(#goldToyCrown)" 
                    stroke="#78350f" 
                    strokeWidth="2.5" 
                    opacity="0.95" 
                  />
                  {/* Fur tufts in lion mane */}
                  {[
                    "M140 100 Q125 125 135 150",
                    "M148 115 Q135 145 145 165",
                    "M240 100 Q255 125 245 150",
                    "M232 115 Q245 145 235 165"
                  ].map((pStr, i) => (
                    <path key={`mane-fur-${i}`} d={pStr} stroke="#92400e" strokeWidth="2.5" fill="none" />
                  ))}
                  {/* Imperial Gold Tiara / Forehead Diadem */}
                  <rect x="165" y="76" width="50" height="9" rx="3" fill="url(#imperialGoldFiligree)" stroke="#78350f" strokeWidth="1.5" />
                  <polygon points="190,70 193,76 199,76 195,80 196,85 190,82 184,85 185,80 181,76 187,76" fill="#da121a" />
                </g>
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* MODEL -1: HEROIC ETHIOPIAN WARHORSE (User's Photo Example)     */}
          {/* Magnificent museum-grade sculpted dark bronze stallion with    */}
          {/* flowing mane, noble posture, powerful musculature and pedestal */}
          {/* ============================================================== */}
          {config.dollDesignModel === 'heroic-warhorse' && (
            <g id="heroicWarhorseStatue">
              {/* Natural Sculpted Terrain / Rock Base (as in user's photo) */}
              <g id="horsePedestal">
                <ellipse cx="190" cy="415" rx="140" ry="22" fill="#140a05" stroke="#3d2313" strokeWidth="2.5" />
                <path 
                  d="M60 412 C90 405, 140 408, 190 404 C240 408, 290 405, 320 412 C300 426, 250 428, 190 428 C130 428, 80 426, 60 412 Z" 
                  fill="#24130a" 
                  stroke="#573319" 
                  strokeWidth="1.5" 
                />
                {/* Golden Plate with Horse & Hero Name */}
                <rect x="110" y="415" width="160" height="15" rx="3" fill="#140b04" stroke="#d97706" strokeWidth="1" />
                <text x="190" y="426" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold">
                  {heroNameAmharic.includes('ቴዎድሮስ') ? 'አባ ታጠቅ (የቴዎድሮስ ፈረስ)' :
                   heroNameAmharic.includes('ምኒልክ') ? 'አባ ዳኘው (የምኒልክ ፈረስ)' :
                   heroNameAmharic.includes('በላይ') ? 'አባ ኰስትር (የበላይ ዘለቀ ፈረስ)' :
                   heroNameAmharic.includes('ጀጋማ') ? 'በጉላ (የጀጋማ ኬሎ ፈረስ)' :
                   'የጀግኖች የክብር ፈረስ (Ethiopian Warhorse)'}
                </text>
              </g>

              {/* Magnificent Flowing Tail */}
              <g id="horseTail">
                <path 
                  d="M102 245 C80 270, 70 320, 75 375 C85 365, 95 320, 110 270 Z" 
                  fill="url(#bronzeMane)" 
                  stroke="#0f0703" 
                  strokeWidth="1.5" 
                />
                {/* Hair strands in tail */}
                <path d="M95 260 C82 290, 78 335, 82 370" stroke="#5a361c" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M102 275 C92 305, 88 340, 92 365" stroke="#5a361c" strokeWidth="1.2" fill="none" opacity="0.6" />
              </g>

              {/* Hind Legs (Muscular, Powerful Quarters) */}
              {/* Back Left Leg (Further) */}
              <g id="hindLegFar">
                <path 
                  d="M130 250 C125 290, 128 330, 125 365 C122 385, 128 402, 134 406 C138 406, 142 395, 140 375 C142 340, 146 300, 150 255 Z" 
                  fill="#1b0e07" 
                />
                <ellipse cx="132" cy="406" rx="6" ry="3" fill="#0d0603" />
              </g>

              {/* Back Right Leg (Forefront - Muscular Gaskin & Hock) */}
              <g id="hindLegNear">
                <path 
                  d="M105 240 C95 270, 100 300, 108 335 C104 365, 102 385, 108 406 C114 408, 120 405, 118 390 C116 365, 122 340, 128 300 C135 270, 130 245, 120 235 Z" 
                  fill="url(#bronzeHorseBody)" 
                  stroke="#0f0703" 
                  strokeWidth="1.5" 
                />
                {/* Hock highlight */}
                <path d="M104 315 C100 330, 104 350, 110 365" stroke="#784423" strokeWidth="2" fill="none" opacity="0.5" />
                {/* Hoof */}
                <ellipse cx="112" cy="407" rx="7" ry="3.5" fill="#0a0502" />
                <rect x="108" y="403" width="8" height="3" fill="#2d170a" />
              </g>

              {/* Horse Torso / Muscular Barrel & Flank */}
              <g id="horseTorso">
                <path 
                  d="M110 230 C125 210, 175 210, 205 215 C235 220, 255 240, 245 280 C235 305, 205 315, 160 310 C125 305, 100 270, 110 230 Z" 
                  fill="url(#bronzeHorseBody)" 
                  stroke="#0f0703" 
                  strokeWidth="1.8" 
                />
                {/* Ribcage & Shoulder Muscular Highlights */}
                <ellipse cx="160" cy="255" rx="35" ry="25" fill="url(#bronzeHighlight)" opacity="0.5" />
                <path d="M185 225 C205 235, 215 255, 210 280" stroke="#784423" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
                <path d="M140 240 C155 245, 165 265, 160 290" stroke="#784423" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
              </g>

              {/* Forelegs (Front Legs: Slender, Powerful & Athletic) */}
              {/* Front Left Leg (Far) */}
              <g id="forelegFar">
                <path 
                  d="M220 270 C222 305, 224 345, 222 375 C220 395, 222 405, 228 407 C232 407, 235 398, 234 380 C236 345, 238 310, 236 275 Z" 
                  fill="#1b0e07" 
                />
                <ellipse cx="226" cy="407" rx="6" ry="3" fill="#0d0603" />
              </g>

              {/* Front Right Leg (Near - Proud Stride) */}
              <g id="forelegNear">
                <path 
                  d="M232 265 C235 295, 238 330, 240 360 C242 385, 244 398, 248 406 C254 408, 260 404, 258 390 C254 365, 252 330, 250 295 C252 275, 245 255, 235 250 Z" 
                  fill="url(#bronzeHorseBody)" 
                  stroke="#0f0703" 
                  strokeWidth="1.5" 
                />
                {/* Knee joint definition */}
                <circle cx="242" cy="335" r="4.5" fill="#361c0d" stroke="#120803" strokeWidth="1" />
                <path d="M239 310 L242 340 L246 385" stroke="#784423" strokeWidth="1.8" fill="none" opacity="0.6" />
                {/* Hoof */}
                <ellipse cx="252" cy="407" rx="7" ry="3.5" fill="#0a0502" />
                <rect x="248" y="403" width="8" height="3" fill="#2d170a" />
              </g>

              {/* Majestic Arched Neck with Powerful Crest */}
              <g id="horseNeck">
                <path 
                  d="M205 220 C215 180, 235 140, 265 125 C280 135, 285 160, 265 195 C250 220, 238 250, 230 270 Z" 
                  fill="url(#bronzeHorseBody)" 
                  stroke="#0f0703" 
                  strokeWidth="1.8" 
                />
                {/* Crest muscle shading */}
                <path d="M225 185 C240 155, 255 138, 270 130" stroke="#784423" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
              </g>

              {/* Expressive Sculpted Bronze Horse Head (Profile/Turned Angle) */}
              <g id="horseHead">
                {/* Head bone structure: tapered muzzle, noble jaw */}
                <path 
                  d="M260 125 C265 110, 275 105, 288 115 C295 125, 298 145, 295 165 C290 185, 280 195, 270 190 C265 175, 268 150, 260 125 Z" 
                  fill="url(#bronzeHorseBody)" 
                  stroke="#0f0703" 
                  strokeWidth="1.8" 
                />

                {/* Pricked Alert Ears */}
                {/* Left Ear */}
                <polygon points="275,108 280,88 286,105" fill="#24130a" stroke="#0a0502" strokeWidth="1.2" />
                {/* Right Ear */}
                <polygon points="282,110 288,86 295,108" fill="url(#bronzeHorseBody)" stroke="#0a0502" strokeWidth="1.2" />

                {/* Intelligent, Noble Bronze Eye */}
                <ellipse cx="282" cy="130" rx="4" ry="3.2" fill="#0f0804" stroke="#452714" strokeWidth="1" />
                <circle cx="283" cy="129" r="1.2" fill="#fde047" opacity="0.8" />
                {/* Brow bone arch */}
                <path d="M276 125 Q283 122 288 126" stroke="#5c341a" strokeWidth="1.5" fill="none" />

                {/* Flaired Nostril & Muzzle */}
                <ellipse cx="295" cy="170" rx="3" ry="4.5" fill="#0f0703" />
                <path d="M293 175 Q290 182 282 180" stroke="#140a05" strokeWidth="1.5" fill="none" />

                {/* Cheekbone definition */}
                <ellipse cx="276" cy="150" rx="10" ry="12" fill="#3d2110" opacity="0.4" />
              </g>

              {/* Long, Cascading Flowing Mane (Signature of user's photo!) */}
              <g id="horseFlowingMane">
                {/* Forelock between ears */}
                <path d="M285 96 C290 108, 292 125, 288 140" stroke="#120803" strokeWidth="3" fill="none" strokeLinecap="round" />

                {/* Dramatic long strands draping over neck down to chest */}
                {[
                  "M270 115 C265 145, 262 180, 266 220",
                  "M265 125 C258 160, 254 200, 258 245",
                  "M258 138 C250 175, 245 220, 250 260",
                  "M250 152 C242 190, 238 230, 242 270",
                  "M242 165 C235 205, 230 240, 235 280",
                  "M235 180 C228 215, 224 250, 228 290"
                ].map((dStr, idx) => (
                  <path 
                    key={`mane-strand-${idx}`} 
                    d={dStr} 
                    stroke={idx % 2 === 0 ? "#140a04" : "#2a1508"} 
                    strokeWidth="4" 
                    fill="none" 
                    strokeLinecap="round" 
                  />
                ))}

                {/* Bronze Metallic Highlights on Mane */}
                <path d="M263 130 C256 165, 252 205, 256 250" stroke="#8c5832" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M248 155 C240 195, 236 235, 240 275" stroke="#8c5832" strokeWidth="1.5" fill="none" opacity="0.7" />
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* MODEL 0: REBORN REALISTIC TODDLER DOLL (User's Latest Images)  */}
          {/* Hyper-realistic lifelike facial anatomy, micro-rooted baby     */}
          {/* curls, glass-like hazel/amber eyes, soft baby creases, realistic*/}
          {/* historical royal toddler dress with Peter Pan collar & bows   */}
          {/* ============================================================== */}
          {config.dollDesignModel === 'reborn-realistic-toddler' && (
            <g id="rebornRealisticToddlerDoll">
              {/* Soft Velvet Cushion Stand */}
              <g id="velvetCushion">
                <ellipse cx="190" cy="415" rx="105" ry="20" fill="#1c1108" stroke="#f59e0b" strokeWidth="2.5" />
                <ellipse cx="190" cy="410" rx="95" ry="15" fill="#3a1e0b" />
                <rect x="135" y="402" width="110" height="15" rx="4" fill="#140b04" stroke="#f59e0b" strokeWidth="1" />
                <text x="190" y="413" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold">
                  {engravingText || heroNameAmharic}
                </text>
              </g>

              {/* Natural Micro-Rooted Black/Brown Curls (Back Hair Layer) */}
              <g id="realisticBackCurls">
                {/* Thick cascade of soft spiral ringlets over shoulders */}
                {[
                  [120, 160], [115, 200], [110, 245], [115, 290], [125, 330],
                  [135, 180], [125, 225], [130, 270], [140, 315],
                  [260, 160], [265, 200], [270, 245], [265, 290], [255, 330],
                  [245, 180], [255, 225], [250, 270], [240, 315]
                ].map(([cx, cy], i) => (
                  <ellipse 
                    key={`curl-${i}`} 
                    cx={cx} 
                    cy={cy} 
                    rx="14" 
                    ry="18" 
                    fill={i % 3 === 0 ? "#140c06" : i % 3 === 1 ? "#1e1208" : "#28170c"} 
                    stroke="#0a0502" 
                    strokeWidth="1" 
                  />
                ))}
              </g>

              {/* Realistic Toddler Legs with soft dimpled knees & chubby feet */}
              <g id="realisticToddlerLegs">
                {/* Left Leg: soft chubby baby contour */}
                <path 
                  d="M152 280 C146 320, 142 355, 148 390 C156 394, 172 394, 176 390 C174 355, 172 320, 170 280 Z" 
                  fill={config.skinTone || '#784a29'} 
                  stroke="#3b2010" 
                  strokeWidth="1.2" 
                />
                {/* Soft baby knee crease / dimple */}
                <ellipse cx="160" cy="335" rx="5" ry="3" fill="#60371a" opacity="0.4" />
                <path d="M154 336 Q160 340 166 336" stroke="#4a2810" strokeWidth="1" fill="none" opacity="0.6" />

                {/* Right Leg: soft chubby baby contour */}
                <path 
                  d="M210 280 C208 320, 206 355, 204 390 C212 394, 228 394, 232 390 C238 355, 234 320, 228 280 Z" 
                  fill={config.skinTone || '#784a29'} 
                  stroke="#3b2010" 
                  strokeWidth="1.2" 
                />
                {/* Soft baby knee crease / dimple */}
                <ellipse cx="220" cy="335" rx="5" ry="3" fill="#60371a" opacity="0.4" />
                <path d="M214 336 Q220 340 226 336" stroke="#4a2810" strokeWidth="1" fill="none" opacity="0.6" />

                {/* Chubby Baby Ankle Creases & Barefoot / Booties */}
                <g id="babyFeet">
                  {/* Left Foot: chubby toes with tiny soft nails */}
                  <ellipse cx="162" cy="392" rx="15" ry="8" fill={config.skinTone || '#784a29'} stroke="#3b2010" strokeWidth="1" />
                  <ellipse cx="152" cy="393" rx="3.5" ry="2.5" fill="#e8b490" opacity="0.5" />
                  <ellipse cx="157" cy="395" rx="2.5" ry="2" fill="#e8b490" opacity="0.5" />
                  <ellipse cx="162" cy="395" rx="2.5" ry="2" fill="#e8b490" opacity="0.5" />
                  <ellipse cx="167" cy="395" rx="2" ry="1.8" fill="#e8b490" opacity="0.5" />

                  {/* Right Foot */}
                  <ellipse cx="218" cy="392" rx="15" ry="8" fill={config.skinTone || '#784a29'} stroke="#3b2010" strokeWidth="1" />
                  <ellipse cx="228" cy="393" rx="3.5" ry="2.5" fill="#e8b490" opacity="0.5" />
                  <ellipse cx="223" cy="395" rx="2.5" ry="2" fill="#e8b490" opacity="0.5" />
                  <ellipse cx="218" cy="395" rx="2.5" ry="2" fill="#e8b490" opacity="0.5" />
                  <ellipse cx="213" cy="395" rx="2" ry="1.8" fill="#e8b490" opacity="0.5" />
                </g>
              </g>

              {/* Realistic Toddler Historical Royal Outfit */}
              {/* Tiered pinafore dress with plaid/tulle overlay from user's photos */}
              <g id="realisticToddlerDress">
                {/* Puffy tulle / silk skirt base */}
                <path 
                  d="M135 225 C120 270, 115 315, 125 355 C165 365, 215 365, 255 355 C265 315, 260 270, 245 225 Z" 
                  fill={config.clothingPrimaryColor || '#f97316'} 
                  stroke="#9a3412" 
                  strokeWidth="1.5" 
                />

                {/* Soft tulle ruffled overlay with sheer pleats */}
                <path 
                  d="M138 245 C128 280, 122 315, 130 350 C168 360, 212 360, 250 350 C258 315, 252 280, 242 245 Z" 
                  fill="#ffffff" 
                  opacity="0.25" 
                />

                {/* Traditional Ethiopian Plaid / Tibeb Checkered Bodice (Inspired by Photo 1) */}
                <path d="M150 175 L230 175 L235 235 L145 235 Z" fill="#fca5a5" stroke="#f43f5e" strokeWidth="1" />
                {/* Soft plaid intersecting grid lines */}
                <line x1="170" y1="175" x2="170" y2="235" stroke="#cbd5e1" strokeWidth="3" opacity="0.7" />
                <line x1="210" y1="175" x2="210" y2="235" stroke="#cbd5e1" strokeWidth="3" opacity="0.7" />
                <line x1="145" y1="195" x2="235" y2="195" stroke="#cbd5e1" strokeWidth="3" opacity="0.7" />
                <line x1="145" y1="215" x2="235" y2="215" stroke="#cbd5e1" strokeWidth="3" opacity="0.7" />

                {/* Satin Ribbon Waist Tie with Cute Front Bow */}
                <rect x="145" y="230" width="90" height="6" fill="#ffffff" />
                <g id="waistBow" transform="translate(190, 233)">
                  <ellipse cx="-6" cy="0" rx="6" ry="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <ellipse cx="6" cy="0" rx="6" ry="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="0" cy="0" r="2.5" fill="#fde047" />
                  <path d="M-2 2 L-5 12 M2 2 L5 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Long Puffy Bishop Sleeves with elasticated ruffled cuffs (Photo 1) */}
                <g id="puffySleeves">
                  {/* Left Sleeve */}
                  <ellipse cx="140" cy="205" rx="16" ry="24" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                  {/* Left Arm emerging from sleeve */}
                  <path d="M140 220 L135 260" stroke={config.skinTone || '#784a29'} strokeWidth="12" strokeLinecap="round" />
                  <ellipse cx="134" cy="264" rx="7" ry="5.5" fill={config.skinTone || '#784a29'} />
                  {/* Tiny baby fingers */}
                  <circle cx="130" cy="267" r="1.5" fill={config.skinTone || '#784a29'} />
                  <circle cx="134" cy="268" r="1.5" fill={config.skinTone || '#784a29'} />
                  <circle cx="138" cy="267" r="1.5" fill={config.skinTone || '#784a29'} />

                  {/* Right Sleeve */}
                  <ellipse cx="240" cy="205" rx="16" ry="24" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                  {/* Right Arm waving or resting */}
                  {isWaving ? (
                    <g>
                      <path d="M240 220 L255 240 L260 215" stroke={config.skinTone || '#784a29'} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                      <ellipse cx="260" cy="212" rx="7" ry="6" fill={config.skinTone || '#784a29'} />
                      <circle cx="264" cy="209" r="1.8" fill={config.skinTone || '#784a29'} />
                    </g>
                  ) : (
                    <g>
                      <path d="M240 220 L245 260" stroke={config.skinTone || '#784a29'} strokeWidth="12" strokeLinecap="round" />
                      <ellipse cx="246" cy="264" rx="7" ry="5.5" fill={config.skinTone || '#784a29'} />
                    </g>
                  )}
                </g>

                {/* Classic Peter Pan Collar (Distinctive Feature in Photo 1 & 2) */}
                <g id="peterPanCollar">
                  {/* Left Lapel rounded Peter Pan collar */}
                  <path 
                    d="M190 170 C175 168, 155 175, 152 188 C158 196, 178 194, 190 178 Z" 
                    fill="#ffffff" 
                    stroke="#e2e8f0" 
                    strokeWidth="1.2" 
                  />
                  {/* Right Lapel rounded Peter Pan collar */}
                  <path 
                    d="M190 170 C205 168, 225 175, 228 188 C222 196, 202 194, 190 178 Z" 
                    fill="#ffffff" 
                    stroke="#e2e8f0" 
                    strokeWidth="1.2" 
                  />
                  {/* Pearl button at neckline */}
                  <circle cx="190" cy="172" r="2.5" fill="#fef08a" stroke="#cbd5e1" strokeWidth="0.8" />
                </g>
              </g>

              {/* Realistic Reborn Toddler Head & Lifelike Facial Structure */}
              <g id="rebornRealisticHead">
                {/* Soft chubby neck */}
                <rect x="180" y="145" width="20" height="25" rx="5" fill={config.skinTone || '#784a29'} />
                {/* Neck crease fold */}
                <path d="M182 158 Q190 162 198 158" stroke="#4a2810" strokeWidth="1" fill="none" opacity="0.5" />

                {/* Lifelike Toddler Head Contour with Realistic Chubby Jowls */}
                <path 
                  d="M148 100 C146 55, 234 55, 232 100 C234 125, 238 145, 224 162 C210 172, 170 172, 156 162 C142 145, 146 125, 148 100 Z" 
                  fill={config.skinTone || '#784a29'} 
                  stroke="#3b2010" 
                  strokeWidth="1.5" 
                />

                {/* Soft Realistic Shading on Temples, Forehead and Jaw */}
                <path 
                  d="M152 105 C150 70, 230 70, 228 105 C210 85, 170 85, 152 105 Z" 
                  fill="#ffffff" 
                  opacity="0.1" 
                />

                {/* Chubby Rosy Toddler Cheeks with Soft Airbrush Blushing */}
                <ellipse cx="164" cy="138" rx="14" ry="10" fill="#f43f5e" opacity="0.32" />
                <ellipse cx="216" cy="138" rx="14" ry="10" fill="#f43f5e" opacity="0.32" />

                {/* REALISTIC GLOSSY HAZEL/AMBER TODDLER EYES (As in user's photos) */}
                {/* Left Eye */}
                <g id="realisticEyeLeft">
                  {/* Sclera (White with soft realistic shading) */}
                  <ellipse cx="172" cy="122" rx="9" ry="8" fill="#f8fafc" stroke="#261408" strokeWidth="1.2" />
                  {/* Glossy Hazel/Amber Iris with Striated Radial Color */}
                  <circle cx="172" cy="122" r="6.5" fill="#92400e" />
                  <circle cx="172" cy="122" r="5" fill="#b45309" />
                  <circle cx="172" cy="122" r="3.5" fill="#d97706" />
                  {/* Deep Black Pupil */}
                  <circle cx="172" cy="122" r="2.5" fill="#0f172a" />
                  {/* Realistic Glaze / Wet Eye Catchlight */}
                  <circle cx="170" cy="119.5" r="1.8" fill="#ffffff" />
                  <circle cx="174" cy="124" r="0.8" fill="#ffffff" />
                  {/* Delicate Upper Eyelid & Natural Rooted Lashes */}
                  <path d="M162 118 Q172 112 182 118" stroke="#1f1008" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M165 117 L163 113 M170 115 L170 110 M175 115 L176 110 M179 117 L182 114" stroke="#1f1008" strokeWidth="1" strokeLinecap="round" />
                  {/* Natural Soft Toddler Eyebrow */}
                  <path d="M162 108 Q172 103 182 107" stroke="#261408" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
                </g>

                {/* Right Eye */}
                <g id="realisticEyeRight">
                  {/* Sclera */}
                  <ellipse cx="208" cy="122" rx="9" ry="8" fill="#f8fafc" stroke="#261408" strokeWidth="1.2" />
                  {/* Glossy Hazel/Amber Iris */}
                  <circle cx="208" cy="122" r="6.5" fill="#92400e" />
                  <circle cx="208" cy="122" r="5" fill="#b45309" />
                  <circle cx="208" cy="122" r="3.5" fill="#d97706" />
                  {/* Deep Black Pupil */}
                  <circle cx="208" cy="122" r="2.5" fill="#0f172a" />
                  {/* Wet Catchlight */}
                  <circle cx="206" cy="119.5" r="1.8" fill="#ffffff" />
                  <circle cx="210" cy="124" r="0.8" fill="#ffffff" />
                  {/* Delicate Upper Eyelid & Lashes */}
                  <path d="M198 118 Q208 112 218 118" stroke="#1f1008" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M201 117 L198 114 M205 115 L204 110 M210 115 L211 110 M215 117 L217 113" stroke="#1f1008" strokeWidth="1" strokeLinecap="round" />
                  {/* Natural Eyebrow */}
                  <path d="M198 107 Q208 103 218 108" stroke="#261408" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
                </g>

                {/* Realistic Soft Button Toddler Nose with Shaded Nostrils */}
                <g id="realisticNose">
                  <path d="M188 126 Q190 134 192 126" stroke="#4a2810" strokeWidth="1" fill="none" />
                  {/* Soft bulbous baby tip */}
                  <ellipse cx="190" cy="133" rx="4.5" ry="3.5" fill="#e8b490" opacity="0.35" />
                  {/* Delicate shaded nostrils */}
                  <circle cx="187.5" cy="135" r="1.2" fill="#3b1d0c" />
                  <circle cx="192.5" cy="135" r="1.2" fill="#3b1d0c" />
                </g>

                {/* Realistic Full Glossy Toddler Lips with Cupid's Bow */}
                <g id="realisticLips">
                  {/* Upper Lip with distinct philtrum */}
                  <path 
                    d="M181 148 Q186 145 190 147 Q194 145 199 148 Q190 150 181 148 Z" 
                    fill="#e11d48" 
                    stroke="#9f1239" 
                    strokeWidth="0.8" 
                  />
                  {/* Lower Lip (plump baby pout) */}
                  <path 
                    d="M182 148 Q190 156 198 148 Q190 152 182 148 Z" 
                    fill="#f43f5e" 
                    stroke="#9f1239" 
                    strokeWidth="0.8" 
                  />
                  {/* Realistic lip gloss reflection */}
                  <ellipse cx="190" cy="150" rx="3.5" ry="1.2" fill="#ffffff" opacity="0.65" />
                </g>

                {/* Soft Chin Dimple */}
                <ellipse cx="190" cy="160" rx="3" ry="1.5" fill="#4a2810" opacity="0.25" />
              </g>

              {/* MICRO-ROOTED BABY EDGES & ETHIOPIAN AFRO-CURLS (Key feature of user's photos) */}
              <g id="realisticHairAndBabyEdges">
                {/* Delicate layed baby hairs / edges along forehead (Photo 1 signature!) */}
                <g id="swirledBabyEdges" stroke="#170c04" strokeWidth="1.2" fill="none" strokeLinecap="round">
                  {/* Left temple swirls */}
                  <path d="M152 102 C154 94, 162 96, 160 104" />
                  <path d="M162 102 C164 92, 172 95, 170 102" />
                  {/* Center parting hairline wisps */}
                  <path d="M185 88 C187 82, 193 82, 195 88" strokeWidth="1.5" />
                  {/* Right temple swirls */}
                  <path d="M210 102 C208 92, 216 95, 218 102" />
                  <path d="M220 102 C218 94, 226 96, 228 104" />
                </g>

                {/* Natural center part crown */}
                <path 
                  d="M150 90 C145 45, 235 45, 230 90 C220 70, 160 70, 150 90 Z" 
                  fill="#1a1008" 
                  stroke="#0a0502" 
                  strokeWidth="1.5" 
                />

                {/* Front framing curly ringlets falling gently beside ears */}
                {[
                  [140, 110], [138, 130], [135, 155], [132, 180],
                  [240, 110], [242, 130], [245, 155], [248, 180]
                ].map(([x, y], idx) => (
                  <path 
                    key={`front-curl-${idx}`} 
                    d={`M${x} ${y} Q${x + (idx % 2 === 0 ? 5 : -5)} ${y + 12} ${x} ${y + 24}`} 
                    stroke="#1c0f06" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                ))}
              </g>

              {/* Optional Imperial Crown or Headband for Ethiopian Hero */}
              {config.headwear === 'empress-tiara' && (
                <g id="royalBabyTiara" transform="translate(0, -6)">
                  <polygon points="175,70 182,54 190,64 198,54 205,70" fill="url(#goldToyCrown)" stroke="#78350f" strokeWidth="1.5" />
                  <circle cx="182" cy="54" r="2.5" fill="#ef4444" />
                  <circle cx="198" cy="54" r="2.5" fill="#22c55e" />
                  <circle cx="190" cy="64" r="2" fill="#ffffff" />
                </g>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* MODEL 1: FASHION ARTICULATED DOLL (Inspired by Image 1)        */}
          {/* Poseable, slender joints, wavy layered hair, crop top, skirt  */}
          {/* ============================================================== */}
          {config.dollDesignModel === 'fashion-articulated' && (
            <g id="fashionArticulatedDoll">
              {/* Pedestal: Modern fashion runway or pedestal */}
              <ellipse cx="190" cy="410" rx="95" ry="18" fill="#1f130a" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="190" y="415" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                {engravingText || heroNameAmharic}
              </text>

              {/* Back Hair Flowing down */}
              <path 
                d="M135 110 C105 180, 100 270, 125 330 C135 290, 145 220, 150 180 C230 180, 235 220, 245 290 C270 270, 275 180, 245 110 Z" 
                fill="#3b2010" 
                stroke="#1f1008" 
                strokeWidth="1.5" 
              />

              {/* Legs (Slender, Jointed knees, stylish pose) */}
              {/* Left Leg: slightly bent knee */}
              <g id="fashionLegLeft">
                <path d="M165 260 L160 330 L155 385" stroke={config.skinTone} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                {/* Joint circle at knee */}
                <circle cx="160" cy="330" r="5" fill={config.skinTone} stroke="#4a2c15" strokeWidth="1" />
                {/* Cute Coral Strap Sandal / Shoe */}
                <ellipse cx="153" cy="388" rx="10" ry="5" fill="#f43f5e" />
                <path d="M148 388 Q153 380 158 388" stroke="#38bdf8" strokeWidth="2" fill="none" />
              </g>

              {/* Right Leg: step-forward fashion pose */}
              <g id="fashionLegRight">
                <path d="M210 260 L215 330 L225 385" stroke={config.skinTone} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                {/* Joint circle at knee */}
                <circle cx="215" cy="330" r="5" fill={config.skinTone} stroke="#4a2c15" strokeWidth="1" />
                {/* Cute Coral Strap Sandal / Shoe */}
                <ellipse cx="227" cy="388" rx="10" ry="5" fill="#f43f5e" />
                <path d="M222 388 Q227 380 232 388" stroke="#38bdf8" strokeWidth="2" fill="none" />
              </g>

              {/* Chic Ruffled Maxi Skirt with Ethiopian Tibeb Print */}
              <g id="fashionSkirt">
                <path 
                  d="M152 230 C145 270, 138 310, 145 345 C175 355, 205 355, 235 345 C242 310, 235 270, 228 230 Z" 
                  fill={config.clothingPrimaryColor || '#fca5a5'} 
                  stroke="#e11d48" 
                  strokeWidth="1.5" 
                />
                {/* Ruffle cascade wave at front-slit */}
                <path 
                  d="M175 235 C170 270, 160 305, 170 345 C185 348, 195 340, 190 310 C185 280, 185 250, 180 235 Z" 
                  fill="#ffffff" 
                  stroke="#f43f5e" 
                  strokeWidth="1.2" 
                />
                {/* Traditional Tibeb Hemline */}
                <rect x="145" y="340" width="90" height="6" fill="url(#tibebToyRibbon)" rx="2" />
              </g>

              {/* Torso: Slender waist, crop top + knotted tie */}
              <g id="fashionTorso">
                <path d="M165 170 L215 170 L220 225 L160 225 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                {/* Crop top graphic emblem */}
                <circle cx="190" cy="195" r="10" fill="#fde047" opacity="0.8" />
                <polygon points="190,188 193,193 198,194 194,198 195,203 190,200 185,203 186,198 182,194 187,193" fill="#da121a" />
                {/* Knotted tie at midriff */}
                <circle cx="190" cy="222" r="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M187 224 L180 231 M193 224 L200 231" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                {/* Exposed Midriff skin */}
                <rect x="165" y="224" width="50" height="7" fill={config.skinTone} />
              </g>

              {/* Left Arm: Articulated elbow, hand posing near hair/waist */}
              <g id="fashionArmLeft">
                <path d="M165 175 L145 220 L155 255" stroke={config.skinTone} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="145" cy="220" r="4" fill={config.skinTone} stroke="#4a2c15" strokeWidth="1" />
                {/* Hand touching skirt/accessories */}
                <circle cx="155" cy="257" r="5" fill={config.skinTone} />
              </g>

              {/* Right Arm: Pose with hand raised near sunglasses or holding bag */}
              <g id="fashionArmRight">
                {isWaving ? (
                  <g>
                    <path d="M215 175 L235 210 L250 170" stroke={config.skinTone} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="235" cy="210" r="4" fill={config.skinTone} stroke="#4a2c15" strokeWidth="1" />
                    <circle cx="250" cy="168" r="5.5" fill={config.skinTone} />
                  </g>
                ) : (
                  <g>
                    <path d="M215 175 L240 220 L230 260" stroke={config.skinTone} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="240" cy="220" r="4" fill={config.skinTone} stroke="#4a2c15" strokeWidth="1" />
                    <circle cx="230" cy="262" r="5" fill={config.skinTone} />
                  </g>
                )}
              </g>

              {/* Chic Shoulder Bag (Crossbody Tote) */}
              <g id="chicToteBag">
                <path d="M175 172 Q195 210 215 250" stroke="#0284c7" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
                {/* Shell / Mesob woven mini bag */}
                <ellipse cx="225" cy="260" rx="14" ry="12" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
                <path d="M215 258 Q225 252 235 258" stroke="#fef08a" strokeWidth="2" fill="none" />
                <circle cx="225" cy="262" r="3" fill="#38bdf8" />
              </g>

              {/* Neck & Elegant Head Structure */}
              <g id="fashionHead">
                <rect x="184" y="145" width="12" height="25" rx="3" fill={config.skinTone} />
                {/* Slender oval sculpted doll face */}
                <ellipse cx="190" cy="125" rx="28" ry="32" fill={config.skinTone} stroke="#4a2c15" strokeWidth="1.8" />
                
                {/* Subtle Blush */}
                <ellipse cx="173" cy="132" rx="7" ry="4" fill="#f43f5e" opacity="0.4" />
                <ellipse cx="207" cy="132" rx="7" ry="4" fill="#f43f5e" opacity="0.4" />

                {/* Big expressive animated eyes */}
                <ellipse cx="178" cy="120" rx="6" ry="7" fill="#ffffff" stroke="#1f1008" strokeWidth="1.5" />
                <ellipse cx="178" cy="120" rx="4.5" ry="5.5" fill="#0891b2" />
                <ellipse cx="178" cy="120" rx="2.5" ry="3" fill="#0f172a" />
                <circle cx="176" cy="118" r="2" fill="#ffffff" />
                {/* Eyelashes & Brows */}
                <path d="M171 113 Q178 110 185 113" stroke="#1e1008" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M172 115 L168 112 M183 115 L187 113" stroke="#1e1008" strokeWidth="1.5" strokeLinecap="round" />

                {/* Right Eye */}
                <ellipse cx="202" cy="120" rx="6" ry="7" fill="#ffffff" stroke="#1f1008" strokeWidth="1.5" />
                <ellipse cx="202" cy="120" rx="4.5" ry="5.5" fill="#0891b2" />
                <ellipse cx="202" cy="120" rx="2.5" ry="3" fill="#0f172a" />
                <circle cx="200" cy="118" r="2" fill="#ffffff" />
                {/* Eyelashes & Brows */}
                <path d="M195 113 Q202 110 209 113" stroke="#1e1008" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M208 115 L212 113" stroke="#1e1008" strokeWidth="1.5" strokeLinecap="round" />

                {/* Dainty sculpted nose & pretty glossed lips */}
                <path d="M190 125 L190 131 L192 131" stroke="#5a3818" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M184 139 Q190 144 196 139 Q190 142 184 139" fill="#e11d48" stroke="#9f1239" strokeWidth="1" />
              </g>

              {/* Styled Hair & Bangs / Waves */}
              <g id="fashionHairFront">
                {/* Luxurious wavy curls framing face */}
                <path 
                  d="M162 105 C150 120, 150 160, 155 190 C158 170, 165 140, 168 118 Z" 
                  fill="#45220d" 
                  stroke="#1f1008" 
                  strokeWidth="1" 
                />
                <path 
                  d="M218 105 C230 120, 230 160, 225 190 C222 170, 215 140, 212 118 Z" 
                  fill="#45220d" 
                  stroke="#1f1008" 
                  strokeWidth="1" 
                />
                {/* Center parted bangs with soft strands */}
                <path 
                  d="M165 108 Q190 115 215 108 Q200 95 190 95 Q180 95 165 108 Z" 
                  fill="#542b10" 
                />

                {/* Sunglasses Resting on Hair / Tiara */}
                <g id="sunglassesHeadband" transform="translate(0, -5)">
                  <rect x="168" y="96" width="18" height="12" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.8" />
                  <rect x="194" y="96" width="18" height="12" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.8" />
                  <path d="M186 100 Q191 97 194 100" stroke="#34d399" strokeWidth="2" fill="none" />
                </g>
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* MODEL 2: ANIME / BJD BIG-EYES DOLL (Inspired by Image 2)        */}
          {/* Porcelain round face, giant luminous eyes, neat bangs & braids */}
          {/* ============================================================== */}
          {config.dollDesignModel === 'anime-bjd-bigeyes' && (
            <g id="animeBjdDoll">
              {/* Stand */}
              <ellipse cx="190" cy="410" rx="90" ry="18" fill="#1b120c" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="190" y="415" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                {engravingText || heroNameAmharic}
              </text>

              {/* Thick Braids Hanging on Shoulders (Left & Right) */}
              <g id="twinBraids">
                {/* Left Braid segments */}
                {[150, 185, 220, 255, 290, 325, 360].map((y, i) => (
                  <ellipse key={`l-braid-${i}`} cx="120" cy={y} rx="15" ry="20" fill={i % 2 === 0 ? "#3d2110" : "#2a1508"} stroke="#170c04" strokeWidth="1.2" />
                ))}
                {/* Left Braid cute hair tie */}
                <ellipse cx="120" cy="380" rx="8" ry="4" fill="#f43f5e" />

                {/* Right Braid segments */}
                {[150, 185, 220, 255, 290, 325, 360].map((y, i) => (
                  <ellipse key={`r-braid-${i}`} cx="260" cy={y} rx="15" ry="20" fill={i % 2 === 0 ? "#3d2110" : "#2a1508"} stroke="#170c04" strokeWidth="1.2" />
                ))}
                {/* Right Braid cute hair tie */}
                <ellipse cx="260" cy="380" rx="8" ry="4" fill="#f43f5e" />
              </g>

              {/* Legs in Soft Stockings & Mary Jane Shoes */}
              <g id="animeLegs">
                <rect x="165" y="300" width="20" height="95" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
                <rect x="195" y="300" width="20" height="95" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Brown leather Mary Jane shoes */}
                <ellipse cx="175" cy="395" rx="14" ry="8" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                <ellipse cx="205" cy="395" rx="14" ry="8" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                <line x1="168" y1="393" x2="182" y2="393" stroke="#fde047" strokeWidth="1.5" />
                <line x1="198" y1="393" x2="212" y2="393" stroke="#fde047" strokeWidth="1.5" />
              </g>

              {/* Body: Soft Knit Cream Sweater Dress with Tibeb Cross */}
              <g id="animeDress">
                <path 
                  d="M150 180 L230 180 L238 315 L142 315 Z" 
                  fill={config.clothingPrimaryColor || '#f8fafc'} 
                  stroke="#e2e8f0" 
                  strokeWidth="2" 
                />
                {/* Cozy ribbed knit collar */}
                <ellipse cx="190" cy="180" rx="35" ry="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                {/* Tibeb Cross Stitch pattern on chest */}
                <path d="M190 205 L190 245 M175 220 L205 220" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <circle cx="190" cy="220" r="4" fill="#fde047" />
                {/* Ethiopian Flag Ribbon hem */}
                <rect x="142" y="307" width="96" height="8" fill="url(#tibebToyRibbon)" />
              </g>

              {/* Arms folded sweetly or holding plush horse */}
              <g id="animeArms">
                <path d="M150 185 Q135 230 170 250" stroke={config.clothingPrimaryColor || '#f8fafc'} strokeWidth="16" strokeLinecap="round" fill="none" />
                <path d="M230 185 Q245 230 210 250" stroke={config.clothingPrimaryColor || '#f8fafc'} strokeWidth="16" strokeLinecap="round" fill="none" />
                {/* Petite soft hands clasped */}
                <circle cx="185" cy="252" r="7" fill={config.skinTone} />
                <circle cx="195" cy="252" r="7" fill={config.skinTone} />
              </g>

              {/* Anime Porcelain Face: Gentle chin, large soft head */}
              <g id="animeHead">
                <rect x="183" y="145" width="14" height="25" fill={config.skinTone} />
                {/* Soft Round-Heart Shaped Face */}
                <path 
                  d="M140 100 C140 60, 240 60, 240 100 C240 135, 215 160, 190 162 C165 160, 140 135, 140 100 Z" 
                  fill={config.skinTone} 
                  stroke="#451a03" 
                  strokeWidth="1.5" 
                />

                {/* Soft Rosy Cheeks */}
                <circle cx="158" cy="128" r="9" fill="#f43f5e" opacity="0.35" />
                <circle cx="222" cy="128" r="9" fill="#f43f5e" opacity="0.35" />

                {/* GIANT LUMINOUS ANIME EYES (Image 2 signature feature) */}
                {/* Left Eye */}
                <g id="bigEyeLeft">
                  <ellipse cx="168" cy="118" rx="14" ry="18" fill="#111827" />
                  {/* Glowing Teal/Cyan Iris Gradient */}
                  <ellipse cx="168" cy="120" rx="12" ry="15" fill="#0284c7" />
                  <ellipse cx="168" cy="123" rx="10" ry="11" fill="#06b6d4" />
                  <ellipse cx="168" cy="127" rx="8" ry="6" fill="#67e8f9" />
                  {/* Deep Pupil */}
                  <ellipse cx="168" cy="117" rx="6" ry="8" fill="#082f49" />
                  {/* Big Sparkle Catchlights */}
                  <circle cx="164" cy="112" r="4.5" fill="#ffffff" />
                  <circle cx="173" cy="123" r="2.5" fill="#ffffff" />
                  <circle cx="163" cy="125" r="1.5" fill="#ffffff" />
                  {/* Thin elegant upper eyelid */}
                  <path d="M152 108 Q168 100 184 108" stroke="#1f1008" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  {/* Subtle soft eyebrow */}
                  <path d="M154 98 Q168 94 182 99" stroke="#3d2110" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </g>

                {/* Right Eye */}
                <g id="bigEyeRight">
                  <ellipse cx="212" cy="118" rx="14" ry="18" fill="#111827" />
                  {/* Glowing Teal/Cyan Iris Gradient */}
                  <ellipse cx="212" cy="120" rx="12" ry="15" fill="#0284c7" />
                  <ellipse cx="212" cy="123" rx="10" ry="11" fill="#06b6d4" />
                  <ellipse cx="212" cy="127" rx="8" ry="6" fill="#67e8f9" />
                  {/* Deep Pupil */}
                  <ellipse cx="212" cy="117" rx="6" ry="8" fill="#082f49" />
                  {/* Big Sparkle Catchlights */}
                  <circle cx="208" cy="112" r="4.5" fill="#ffffff" />
                  <circle cx="217" cy="123" r="2.5" fill="#ffffff" />
                  <circle cx="207" cy="125" r="1.5" fill="#ffffff" />
                  {/* Thin elegant upper eyelid */}
                  <path d="M196 108 Q212 100 228 108" stroke="#1f1008" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  {/* Subtle soft eyebrow */}
                  <path d="M198 98 Q212 94 226 99" stroke="#3d2110" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </g>

                {/* Tiny Dainty Button Nose */}
                <circle cx="190" cy="130" r="1.5" fill="#78350f" />

                {/* Sweet gentle mouth */}
                <path d="M185 142 Q190 146 195 142" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>

              {/* Neat Straight Bangs (Hime-cut/Fringe from Image 2) */}
              <g id="animeBangs">
                <path 
                  d="M142 95 C145 105, 150 115, 153 118 L157 95 L165 116 L175 95 L185 116 L195 95 L205 116 L215 95 L223 118 C226 115, 235 105, 238 95 C235 55, 145 55, 142 95 Z" 
                  fill="#45220d" 
                  stroke="#1f1008" 
                  strokeWidth="1.2" 
                />
                {/* Hair Gloss Highlight Arc */}
                <path d="M152 75 Q190 65 228 75" stroke="#fde047" strokeWidth="2" opacity="0.4" fill="none" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* MODEL 3: WALDORF RAGDOLL ON WOODEN BENCH (Inspired by Image 3) */}
          {/* Warm knit cardigan, polka-dot dress, yarn hair, striped tights */}
          {/* ============================================================== */}
          {config.dollDesignModel === 'waldorf-ragdoll' && (
            <g id="waldorfRagdoll">
              {/* Rustic Wooden Bench (Sitting Pose) */}
              <g id="woodenBench">
                {/* Bench Top Slab */}
                <rect x="90" y="320" width="200" height="18" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <rect x="95" y="323" width="190" height="3" fill="#92400e" />
                {/* Bench Left Leg */}
                <rect x="115" y="338" width="16" height="70" rx="3" fill="#582506" stroke="#381502" strokeWidth="2" />
                <line x1="110" y1="375" x2="135" y2="375" stroke="#381502" strokeWidth="2" />
                {/* Bench Right Leg */}
                <rect x="250" y="338" width="16" height="70" rx="3" fill="#582506" stroke="#381502" strokeWidth="2" />
                <line x1="245" y1="375" x2="270" y2="375" stroke="#381502" strokeWidth="2" />
                {/* Floor Shadow */}
                <ellipse cx="190" cy="412" rx="100" ry="12" fill="#140b05" opacity="0.8" />
              </g>

              {/* Legs Dangled Over Bench in Striped Waldorf Tights */}
              <g id="stripedLegs">
                {/* Left Leg */}
                <g id="waldorfLegLeft">
                  <rect x="155" y="315" width="22" height="75" rx="11" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
                  {/* Brown Stripes */}
                  {[325, 335, 345, 355, 365, 375].map((y, idx) => (
                    <line key={`l-stripe-${idx}`} x1="155" y1={y} x2="177" y2={y} stroke="#854d0e" strokeWidth="3" />
                  ))}
                  {/* Suede Bootie with laces */}
                  <ellipse cx="166" cy="392" rx="13" ry="10" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
                  <line x1="162" y1="388" x2="170" y2="392" stroke="#fef3c7" strokeWidth="1.5" />
                </g>

                {/* Right Leg */}
                <g id="waldorfLegRight">
                  <rect x="195" y="315" width="22" height="75" rx="11" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
                  {/* Brown Stripes */}
                  {[325, 335, 345, 355, 365, 375].map((y, idx) => (
                    <line key={`r-stripe-${idx}`} x1="195" y1={y} x2="217" y2={y} stroke="#854d0e" strokeWidth="3" />
                  ))}
                  {/* Suede Bootie with laces */}
                  <ellipse cx="206" cy="392" rx="13" ry="10" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
                  <line x1="202" y1="388" x2="210" y2="392" stroke="#fef3c7" strokeWidth="1.5" />
                </g>
              </g>

              {/* Tiered Cotton Skirt (Sage green or Ethiopian White with Tibeb) */}
              <g id="waldorfSkirt">
                <path 
                  d="M140 220 L240 220 L255 330 C255 335, 235 340, 190 340 C145 340, 125 335, 125 330 Z" 
                  fill={config.clothingPrimaryColor || '#4d7c0f'} 
                  stroke="#365314" 
                  strokeWidth="2" 
                />
                {/* Traditional Ethiopian Embroidery / Polka dots on Dress */}
                {[
                  [160, 245], [190, 250], [220, 245],
                  [145, 275], [175, 280], [205, 280], [235, 275],
                  [155, 310], [190, 315], [225, 310]
                ].map(([cx, cy], i) => (
                  <circle key={`dot-${i}`} cx={cx} cy={cy} r="2.5" fill="#fef08a" opacity="0.9" />
                ))}
              </g>

              {/* Cozy Knit Cardigan (Dusty Rose/Rust Wool) */}
              <g id="knitCardigan">
                {/* Main Cardigan Body */}
                <path 
                  d="M148 165 L232 165 L236 240 L144 240 Z" 
                  fill="#991b1b" 
                  stroke="#7f1d1d" 
                  strokeWidth="2" 
                />
                {/* Cardigan Placket & Wooden Buttons */}
                <line x1="190" y1="170" x2="190" y2="240" stroke="#7f1d1d" strokeWidth="2" />
                <circle cx="190" cy="185" r="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <circle cx="190" cy="205" r="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <circle cx="190" cy="225" r="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                {/* Ruffle cuff sleeves with hands resting politely on lap */}
                <path d="M148 175 Q125 210 160 250" stroke="#991b1b" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M232 175 Q255 210 220 250" stroke="#991b1b" strokeWidth="18" strokeLinecap="round" fill="none" />
                {/* Soft stuffed cloth hands */}
                <ellipse cx="170" cy="252" rx="9" ry="7" fill={config.skinTone} stroke="#78350f" strokeWidth="1" />
                <ellipse cx="210" cy="252" rx="9" ry="7" fill={config.skinTone} stroke="#78350f" strokeWidth="1" />
              </g>

              {/* Waldorf Round Stuffed Head & Features */}
              <g id="waldorfHead">
                <rect x="182" y="140" width="16" height="25" fill={config.skinTone} />
                {/* Round Warm Cotton-Stuffed Face */}
                <circle cx="190" cy="115" r="38" fill={config.skinTone} stroke="#582506" strokeWidth="2" />
                {/* Warm Rosy Glowing Cheeks */}
                <circle cx="165" cy="122" r="10" fill="#f43f5e" opacity="0.45" />
                <circle cx="215" cy="122" r="10" fill="#f43f5e" opacity="0.45" />

                {/* Minimalist, Sweet Waldorf Embroidered French Knot Eyes */}
                <circle cx="174" cy="112" r="3.2" fill="#381502" />
                <circle cx="173" cy="111" r="1" fill="#ffffff" />
                <circle cx="206" cy="112" r="3.2" fill="#381502" />
                <circle cx="205" cy="111" r="1" fill="#ffffff" />

                {/* Simple stitched sweet smile */}
                <path d="M185 130 Q190 135 195 130" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>

              {/* Waldorf Soft Spun Wool Yarn Hair & Hair Ribbon */}
              <g id="yarnHair">
                {/* Yarn Bob with low buns / loops */}
                <path 
                  d="M152 110 C145 75, 235 75, 228 110 C215 90, 165 90, 152 110 Z" 
                  fill="#381e0d" 
                  stroke="#1c0f06" 
                  strokeWidth="2" 
                />
                {/* Yarn Side Bun with Sage Bow */}
                <circle cx="152" cy="118" r="12" fill="#381e0d" stroke="#1c0f06" strokeWidth="1.5" />
                {/* Cute Fabric Hair Ribbon / Bow */}
                <path d="M145 108 L152 114 L145 120 Z M159 108 L152 114 L159 120 Z" fill="#65a30d" stroke="#365314" strokeWidth="1" />
                <circle cx="152" cy="114" r="2.5" fill="#fef08a" />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Info Bar in Amharic */}
      <div className="absolute bottom-2 left-0 right-0 px-4 py-2 flex items-center justify-between text-xs text-[#fef3c7] bg-[#140b05]/95 border-t border-[#4d3219] backdrop-blur-md z-20">
        <div className="flex items-center gap-2 truncate">
          <span className="font-serif font-black text-[#fde047]">{heroNameAmharic}</span>
          <span className="text-[11px] text-[#4ade80] font-bold hidden sm:inline">
            {(!config.dollDesignModel || config.dollDesignModel === 'lifelike-historical-hero')
              ? '• እውነተኛ ታሪካዊ ጀግና (Realistic Human Ethiopian Hero Figure)'
              : config.dollDesignModel === 'heroic-warhorse'
              ? '• የጀግኖች የክብር ፈረስ ቅርጽ (Ethiopian Warhorse Statue)'
              : config.dollDesignModel === 'reborn-realistic-toddler'
              ? '• እጅግ እውነተኛ ታሪካዊ ህፃን አሻንጉሊት (Realistic Reborn Doll)'
              : config.dollDesignModel === 'anime-bjd-bigeyes' 
              ? '• ትልልቅ የሚያበሩ አይኖችና ሽሩባ (BJD / Anime Style)'
              : config.dollDesignModel === 'waldorf-ragdoll'
              ? '• የሱፍ ካርዲጋንና የጨርቅ አሻንጉሊት (Waldorf Style)'
              : '• ተንቀሳቃሽ ተጫዋችና የፋሽን አሻንጉሊት (Fashion Style)'}
          </span>
        </div>
        <div className="text-[11px] text-[#fef08a] font-bold flex items-center gap-1.5">
          <Heart size={13} className="text-red-500 fill-red-500 animate-pulse" />
          <span>100% ደህንነቱ የተጠበቀ</span>
        </div>
      </div>
    </div>
  );
};
