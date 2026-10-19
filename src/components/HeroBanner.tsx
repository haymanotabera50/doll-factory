import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { Sparkles, Hammer, ShoppingBag, ChevronRight, Flame, Shield, Award, Building2, QrCode, RotateCw } from 'lucide-react';

interface HeroBannerProps {
  language: Language;
  currency: Currency;
  onExploreCatalog: () => void;
  onOpenStudio: () => void;
  onOpenProposal?: () => void;
  onOpen360Studio?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  currency,
  onExploreCatalog,
  onOpenStudio,
  onOpenProposal,
  onOpen360Studio
}) => {
  const [activeHeroKey, setActiveHeroKey] = useState<string>('menelik');

  const featuredHeroes = {
    lineup: {
      name: 'የኢትዮጵያ ጀግኖች ይፋዊ 3D ቅርጾች ስብስብ',
      years: 'Official 3D Masterpiece Lineup',
      image: '/heritage_heroes_3d_masterpieces.jpg',
      title: 'Ethiopian Heroes & Heroines Official 3D Collection',
      caption: 'Our History • Our Pride • Our Inspiration.',
      captionAmharic: '«የኢትዮጵያ ታሪካዊ ጀግኖችና ጀግኒቶች በ3D ቅርጽና በክብር ፕሊንዝ»',
      details: 'በጥቁር እንጨትና በወርቅ ስም ሰሌዳ ፕሊንዝ ላይ የተሰሩ ይፋዊ የ7 ኢንች ቅርጾች።',
      highlightBadge: '🌟 Official 3D Masterpiece'
    },
    menelik: {
      name: 'ዳግማዊ አፄ ምኒልክ',
      years: 'c. 1844 – 1913',
      image: '/emperor_menelik_ii_official.png',
      title: 'Emperor Menelik II • የአድዋ ድል መሪ',
      caption: 'United the nation. Defended its sovereignty. A builder of modern Ethiopia.',
      captionAmharic: '«ሀገሬን የሚቀማ ጠላት መጥቷልና ጉልበት ያለህ በጉልበትህ ተነሳ!»',
      details: 'የተሟላ ጥቁርና ወርቃማ ካባ፣ የክብር ዘውድ፣ በትረ-መንግሥትና የነሐስ ስም ሰሌዳ።',
      highlightBadge: '👑 Historical Heroes Collection'
    },
    selassie: {
      name: 'ቀዳማዊ ኃይለ ሥላሴ',
      years: '1892 – 1975',
      image: '/haile_selassie_i_3d.png',
      title: 'Emperor Haile Selassie I • Peace & Sovereignty',
      caption: 'Peace • Sovereignty • Progress. A defender of freedom.',
      captionAmharic: '«እስከ መጨረሻው ሰዓት ድረስ ለኢትዮጵያ ነጻነትና ክብር እንቆማለን!»',
      details: 'የክብር ወታደራዊ ዩኒፎርም፣ የሰንደቅ አላማ ድሪ፣ ሰይፍና የተቀረጸ ጥቁር ፕሊንዝ።',
      highlightBadge: '🦁 Modern Statesman Collection'
    },
    tadesse: {
      name: 'ጀነራል ታደሰ ብሩ',
      years: '1915 – 1972',
      image: '/general_tadesse_biru_official.png',
      title: 'General Tadesse Biru • Freedom • Courage • Sacrifice',
      caption: 'A champion of equality, courage, and people’s education.',
      captionAmharic: '«የህዝብ መብትና እኩልነት ሳይከበር እረፍት የለንም!»',
      details: 'የወይራ አረንጓዴ የጦር ዩኒፎርም፣ ባርኔጣ፣ ጠመንጃና ጥቁር የክብር ፕሊንዝ።',
      highlightBadge: '🎖️ Military & Justice Heroes'
    },
    werede: {
      name: 'ወይዘሮ ወረደ ማሞ',
      years: '1903 – 1963',
      image: '/werede_mamo_official.png',
      title: 'Werede Mamo • Education • Women’s Rights',
      caption: 'An educator. A feminist. A voice for women’s rights and equality.',
      captionAmharic: '«የሴት ልጆች መማር የሀገር ሁሉ መዳንና ብርሃን ነው!»',
      details: 'ባለቀለም የጥበብ ነጭ ቀሚስ፣ የቆዳ መጽሐፍ፣ ነጠላና የክብር ፕሊንዝ።',
      highlightBadge: '📚 Pioneers of Education'
    },
    yared: {
      name: 'ያሬድ ባዬ (ቅዱስ ያሬድ)',
      years: '6th Century',
      image: '/saint_yared_official.png',
      title: 'Saint Yared • Faith • Wisdom • Legacy',
      caption: 'Creator of indigenous Ethiopian liturgical chant and notation system.',
      captionAmharic: '«በዜማና በጥበብ ፈጣሪን የሚያመሰግን ድንቅ የሙዚቃ አባት።»',
      details: 'ጥቁር የክህነት ካባ፣ የወርቅ መስቀል፣ መቋሚያና የተቀረጸ ፕሊንዝ።',
      highlightBadge: '🎵 Ancient Wisdom & Faith'
    },
    tewodros: {
      name: 'አፄ ቴዎድሮስ II',
      years: '1818 – 1868',
      image: '/tewodros_ii_official.png',
      title: 'Emperor Tewodros II • Resistance • Dignity',
      caption: 'Unity, modernization, and unyielding national dignity.',
      captionAmharic: '«እጅ ከመስጠት የክብር ሞት ይሻላል!»',
      details: 'የንጉሥ ካባ፣ ባለወርቅ ሰይፍና ሰሌዳ ያረፈበት ጥቁር ፕሊንዝ።',
      highlightBadge: '👑 Visionaries of Unity'
    },
    zewditu: {
      name: 'ንግሥተ ነገሥታት ዘውዲቱ',
      years: '1876 – 1930',
      image: '/empress_zewditu_official.png',
      title: 'Empress Zewditu • Leadership • Reform',
      caption: 'First female head of state of an internationally recognized African empire.',
      captionAmharic: '«ለህዝቤ ሰላምና ለሀገሬ አንድነት እተጋለሁ!»',
      details: 'የወርቅ ዘውድ፣ ነጭ ባህላዊ ቀሚስ፣ ካባና የወርቅ ስም ሰሌዳ።',
      highlightBadge: '👑 Empress of Ethiopia'
    },
    taytu: {
      name: 'እቴጌ ጣይቱ ብጡል',
      years: 'c. 1842 – 1918',
      image: '/empress_taytu_betul_official.png',
      title: 'Empress Taytu Betul • ብርሃን ዘኢትዮጵያ',
      caption: 'A political leader. A symbol of strength. A bridge between tradition and progress.',
      captionAmharic: '«እኔ ሴት ነኝ ጦርነት አልወድም፤ ነገር ግን ሀገሬን የውጭ ጥገኛ ከሚያደርግ ሞትን እመርጣለሁ!»',
      details: 'ነጭ ንጉሳዊ ቀሚስ፣ የእጅ ጥልፍ ጥበብ ሻሽ፣ የወርቅ ዘውድና ባህላዊ የጌጣጌጥ ጥበብ።',
      highlightBadge: '👸 Women of History Collection'
    },
    alula: {
      name: 'ራዕሲ አሉላ እንግዳ (አባ ነጋ)',
      years: 'c. 1847 – 1897',
      image: '/ras_alula_engida_official.png',
      title: 'Ras Alula Engida • የዶጋሊውና የአድዋው ጀግና',
      caption: 'A fearless leader. A defender of Ethiopia. A champion of freedom.',
      captionAmharic: '«የኢትዮጵያን ዳር ድንበር የሚደፍር ጠላት በሕይወቴ እያለሁ አያልፍም!»',
      details: 'ነጭ ጥምጣም፣ ታሪካዊ ጠመንጃ፣ የጥይት ቀበቶና ባህላዊ የጦረኛ ካባ።',
      highlightBadge: '⚔️ Patriots & Resistance Collection'
    },
    abebe: {
      name: 'ሻምበል አበበ ቢቂላ',
      years: '1932 – 1973',
      image: '/abebe_bikila_official.png',
      title: 'Captain Abebe Bikila • የሮምና የቶኪዮ አሸናፊ',
      caption: 'Ran for a nation. Inspired the world. An Olympic legend.',
      captionAmharic: '«ኢትዮጵያ ሁልጊዜም በጽናትና በጀግንነት የምታሸንፍ መሆኗን ዓለም እንዲያውቅ ፈለግሁ!»',
      details: 'አረንጓዴ የሮም ማራቶን ልብስ ቁጥር 11፣ የወርቅ ቅጠል አክሊልና በባዶ እግር የመሮጫ መቆሚያ።',
      highlightBadge: '🥇 Sports & Modern Achievement'
    }
  };

  const currentHero = featuredHeroes[activeHeroKey as keyof typeof featuredHeroes] || featuredHeroes.lineup;

  return (
    <div id="banner-section" className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#201207] via-[#140b04] to-[#080402] border-2 border-[#d97706]/60 shadow-2xl p-6 sm:p-12 mb-12">
      {/* Vibrant Top Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-3 tibeb-ribbon" />

      {/* Colorful Animated Ambient Lights */}
      <div className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full bg-[#078930]/25 filter blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-[380px] h-[380px] rounded-full bg-[#da121a]/25 filter blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-[360px] h-[360px] rounded-full bg-[#f59e0b]/25 filter blur-[90px] pointer-events-none" />

      {/* Main Banner Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Brand Identity, Slogan & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Brand Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#078930]/30 via-[#f59e0b]/30 to-[#da121a]/30 border border-[#f59e0b] text-[#fef08a] text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
            <Sparkles size={15} className="text-[#fde047]" />
            <span>HERITAGE HEROES ETHIOPIA • በአዲስ አበባ የሚመረት የጀግኖች አሻንጉሊት</span>
          </div>

          {/* Slogan & Title */}
          <div>
            <div className="text-sm font-serif italic text-[#fde047] tracking-wider mb-1 font-bold">
              «Our past inspires. Our heroes guide. Our children build tomorrow.»
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.12]">
              የቅርስ ጀግኖች <span className="ethiopia-text-gradient font-black">ኢትዮጵያ</span>
            </h1>
            <div className="text-xs sm:text-sm font-black text-[#86efac] tracking-wide mt-1">
              ታሪካቸው። ቅርሳችን። በእጃችሁ ላይ። • History in your hands
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#fef3c7] leading-relaxed max-w-xl font-normal">
            የኢትዮጵያን ታሪክ፣ ባህላዊ አልባሳትና ጀግኖች ወደ ውብ፣ አስተማሪና ዘላቂ አሻንጉሊቶች የምንቀይርበት ፋብሪካ። ለህፃናት መጫወቻ፣ ለቤተሰብ፣ ለትምህርት ቤቶችና ለክብር ስብስብ የሚሆኑ እውነተኛ ታሪካዊ ቅርጾች።
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onOpen360Studio && (
              <button
                onClick={onOpen360Studio}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/30 active:scale-95 transition-all hover:scale-105"
              >
                <span>🔄 360° ተሽከርካሪ ቅርጾች ስቱዲዮ</span>
                <ChevronRight size={17} />
              </button>
            )}

            <button
              onClick={onExploreCatalog}
              className="px-5 py-4 rounded-2xl bg-[#261509] border-2 border-[#f59e0b] hover:border-[#fde047] text-[#fef08a] font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 hover:bg-[#38200e] transition-all active:scale-95 shadow-lg"
            >
              <ShoppingBag size={18} className="text-[#fde047]" />
              <span>የጀግኖች ስብስቦች (ካታሎግ)</span>
            </button>

            {onOpenProposal && (
              <button
                onClick={onOpenProposal}
                className="px-5 py-4 rounded-2xl bg-[#140c06] border border-[#4d3219] hover:border-[#f59e0b] text-[#baa994] hover:text-white font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-all active:scale-95"
              >
                <Building2 size={16} className="text-[#f59e0b]" />
                <span>ቢዝነስ ፕሮፖዛል (16 ነጥቦች)</span>
              </button>
            )}
          </div>

          {/* Proposal Pillars Grid */}
          <div className="pt-6 border-t border-[#4d3a24] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#1f2937]/40 border border-[#22c55e]/40">
              <div className="text-xs font-black text-[#4ade80] flex items-center gap-1">
                <QrCode size={13} /> የQR መማሪያ ካርድ
              </div>
              <div className="text-[11px] text-[#d1d5db]">በአማርኛና እንግሊዝኛ</div>
            </div>

            <div className="p-3 rounded-xl bg-[#1f2937]/40 border border-[#f59e0b]/40">
              <div className="text-xs font-black text-[#fde047]">100% ንጹህ ጥጥ</div>
              <div className="text-[11px] text-[#d1d5db]">ለህፃናት ደህንነቱ የተረጋገጠ</div>
            </div>

            <div className="p-3 rounded-xl bg-[#1f2937]/40 border border-[#ef4444]/40">
              <div className="text-xs font-black text-[#f87171]">አዲስ አበባ ፋብሪካ</div>
              <div className="text-[11px] text-[#d1d5db]">በሀገር ውስጥ የሚመረት</div>
            </div>

            <div className="p-3 rounded-xl bg-[#1f2937]/40 border border-[#a855f7]/40">
              <div className="text-xs font-black text-[#c084fc]">ሰብሳቢና ዲያስፖራ</div>
              <div className="text-[11px] text-[#d1d5db]">ለዓለም አቀፍ ኤክስፖርት</div>
            </div>
          </div>

        </div>

        {/* Right Column: Official Poster Showcase & Interactive Hero Selector (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative bg-gradient-to-b from-[#26170c] via-[#1a0f07] to-[#100904] border-2 border-[#f59e0b] rounded-3xl p-5 shadow-2xl overflow-hidden group">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#b45309] to-[#da121a] text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow">
                <Flame size={14} className="text-[#fde047] animate-pulse" />
                ይፋዊ የጀግኖች ቅርጾች (Official Lineup)
              </span>
              <span className="text-[11px] font-mono font-bold text-[#86efac] bg-[#072410] px-2.5 py-0.5 rounded-lg border border-[#22c55e]/40">
                Addis Ababa
              </span>
            </div>

            {/* Official 3D Photo Showcase with Zoom & Pedestal Spotlight Effect */}
            <div 
              onClick={onOpen360Studio}
              className="relative rounded-2xl overflow-hidden border-2 border-[#f59e0b]/50 bg-gradient-to-b from-[#1c1108] via-[#100804] to-[#080402] aspect-[4/3] shadow-2xl mb-3 cursor-pointer group/poster flex items-center justify-center"
              title="360° ስቱዲዮ ውስጥ በሙሉ እይታ ይመልከቱ (Click to inspect in 360° Studio)"
            >
              {/* Museum Pedestal Ambient Glow & Shadow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 w-48 h-8 bg-black/80 rounded-full filter blur-md pointer-events-none" />

              <img
                src={currentHero.image}
                alt={currentHero.name}
                className={`transition-all duration-700 drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] ${
                  activeHeroKey === 'lineup'
                    ? 'w-full h-full object-cover group-hover/poster:scale-105'
                    : 'max-h-[92%] w-auto object-contain p-2 group-hover/poster:scale-108'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* 360 Rotation Hint Badge */}
              <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-[#f59e0b] text-[11px] font-bold text-[#fde047] flex items-center gap-1 shadow-lg group-hover/poster:scale-105 transition-all">
                <RotateCw size={12} className="animate-spin text-[#f59e0b]" />
                <span>360° አሽከርክር</span>
              </div>

              <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/85 backdrop-blur-md rounded-xl border border-[#f59e0b]/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-serif font-black text-white">{currentHero.name}</div>
                  <div className="text-[10px] text-[#fde047]">{currentHero.years}</div>
                </div>
                <span className="text-[10px] text-[#86efac] font-bold bg-[#078930]/40 px-2 py-0.5 rounded border border-[#22c55e]/40">
                  {currentHero.highlightBadge}
                </span>
              </div>
            </div>

            {/* Hero Switcher Tabs (Scrollable / Grid) */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-700 mb-2">
              {[
                { key: 'lineup', label: '3D ስብስብ', icon: '🌟' },
                { key: 'menelik', label: 'ምኒልክ II', icon: '👑' },
                { key: 'selassie', label: 'ኃይለ ሥላሴ', icon: '🦁' },
                { key: 'tadesse', label: 'ታደሰ ብሩ', icon: '🎖️' },
                { key: 'werede', label: 'ወረደ ማሞ', icon: '📚' },
                { key: 'yared', label: 'ቅዱስ ያሬድ', icon: '🎵' },
                { key: 'tewodros', label: 'ቴዎድሮስ II', icon: '👑' },
                { key: 'zewditu', label: 'ዘውዲቱ', icon: '👑' },
                { key: 'taytu', label: 'እቴጌ ጣይቱ', icon: '👸' },
                { key: 'alula', label: 'ራዕሲ አሉላ', icon: '⚔️' },
                { key: 'abebe', label: 'አበበ ቢቂላ', icon: '🥇' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveHeroKey(tab.key)}
                  className={`py-1.5 px-2.5 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 border whitespace-nowrap flex-shrink-0 ${
                    activeHeroKey === tab.key
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black border-yellow-300 shadow-md scale-105'
                      : 'bg-[#180e06] text-gray-300 border-[#3d2714] hover:text-white hover:border-[#f59e0b]'
                  }`}
                >
                  <span className="text-xs">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quote & Historical Bio Card */}
            <div className="p-3.5 bg-gradient-to-r from-[#1c1108] to-[#251509] rounded-2xl border border-[#d97706]/50 space-y-2">
              <div className="text-xs text-[#fef08a] font-serif font-black leading-relaxed">
                {currentHero.captionAmharic}
              </div>
              <div className="text-[11px] text-[#d1d5db] font-serif italic">
                "{currentHero.caption}"
              </div>
              <div className="text-[10px] text-[#baa994] pt-1 border-t border-[#3d2714]">
                ✓ {currentHero.details}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
