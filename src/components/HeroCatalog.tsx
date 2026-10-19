import React, { useState, useMemo } from 'react';
import { DollProduct, HistoricalEra, DollCategory, Currency, Language } from '../types';
import { getAllProducts, ETHIOPIAN_HEROES } from '../data/heroes';
import { ProductCard } from './ProductCard';
import { Search, ArrowUpDown, Sparkles } from 'lucide-react';

interface HeroCatalogProps {
  currency: Currency;
  language: Language;
  selectedEra: HistoricalEra | 'all';
  onSelectEra: (era: HistoricalEra | 'all') => void;
  onQuickView: (product: DollProduct) => void;
  onAddToCart: (product: DollProduct) => void;
}

export const HeroCatalog: React.FC<HeroCatalogProps> = ({
  currency,
  language,
  selectedEra,
  onSelectEra,
  onQuickView,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<DollCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const allProducts = useMemo(() => getAllProducts(), []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Find matching hero for era matching
      const hero = ETHIOPIAN_HEROES.find(h => h.id === product.heroId);

      // Era filter
      if (selectedEra !== 'all' && hero?.era !== selectedEra) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query (matches English name, Amharic name, horse name, title, materials)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.heroName.toLowerCase().includes(q);
        const matchesAmharic = product.heroNameAmharic.includes(searchQuery);
        const matchesTitle = product.title.toLowerCase().includes(q) || product.titleAmharic.includes(searchQuery);
        const matchesHorse = hero?.horseName?.toLowerCase().includes(q) || hero?.horseNameAmharic?.includes(searchQuery);
        const matchesBackstory = product.historicalBackstory.toLowerCase().includes(q) || product.historicalBackstoryAmharic.includes(searchQuery);

        if (!matchesName && !matchesAmharic && !matchesTitle && !matchesHorse && !matchesBackstory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return (currency === 'ETB' ? a.priceETB - b.priceETB : a.priceUSD - b.priceUSD);
      }
      if (sortBy === 'price-high') {
        return (currency === 'ETB' ? b.priceETB - a.priceETB : b.priceUSD - a.priceUSD);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // default featured
    });
  }, [allProducts, selectedEra, selectedCategory, searchQuery, sortBy, currency]);

  return (
    <div id="catalog-section" className="w-full space-y-6">
      
      {/* Search & Filter Controls Header with Colorful Borders */}
      <div className="bg-gradient-to-r from-[#1c1209] via-[#140c06] to-[#1c1209] border-2 border-[#f59e0b]/50 p-4 sm:p-6 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Live Search Input in Amharic */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f59e0b]" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ጀግና ይፈልጉ (ምሳሌ፡ ቴዎድሮስ፣ ጣይቱ፣ አባ ታጠቅ)..."
              className="w-full bg-[#140d07] border-2 border-[#4d351d] text-white text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl focus:border-[#f59e0b] focus:outline-none transition-colors font-medium placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                አጽዳ
              </button>
            )}
          </div>

          {/* Sort By Dropdown in Amharic */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-[#fde68a] flex items-center gap-1 font-bold uppercase tracking-wider">
              <ArrowUpDown size={14} className="text-[#f59e0b]" /> አደራደር፡
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#140d07] border-2 border-[#4d351d] text-xs text-[#fef08a] py-2.5 px-3 rounded-xl focus:border-[#f59e0b] focus:outline-none font-bold"
            >
              <option value="featured">ተመራጭ የጀግኖች ቅርጾች</option>
              <option value="rating">ከፍተኛ የተጠቃሚዎች ደረጃ (★ 4.9+)</option>
              <option value="price-low">ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ</option>
              <option value="price-high">ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ</option>
            </select>
          </div>
        </div>

        {/* Filter Pills Row in Vibrant Colors */}
        <div className="pt-3 border-t border-[#3d2714] flex flex-wrap items-center justify-between gap-3">
          
          {/* Era Filter Badges in Amharic */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#fde68a] font-black uppercase tracking-wider mr-1">
              ታሪካዊ ዘመን፡
            </span>
            {[
              { id: 'all', label: 'ሁሉም ዘመናት' },
              { id: 'ancient-axum', label: '🏛️ አክሱም ስልጣኔ' },
              { id: 'medieval-geez', label: '🎼 መካከለኛው ዘመን' },
              { id: 'gondar-renaissance', label: '🏰 የጎንደር ግንቦች' },
              { id: 'unification-19th', label: '👑 19ኛው መቶ ክ/ዘ' },
              { id: 'adwa-victory-1896', label: '🇪🇹 አድዋ (1888)' },
              { id: 'patriot-resistance-1936', label: '⚔️ አርበኞች (1928)' },
              { id: 'modern-legends', label: '🥇 ዘመናዊ ጀግኖች' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => onSelectEra(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedEra === tab.id
                    ? 'bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black shadow-lg scale-105'
                    : 'bg-[#22160c] text-white border border-[#4d351d] hover:border-[#f59e0b]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter Badges in Amharic from Business Proposal */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#fde68a] font-black uppercase tracking-wider mr-1">
              የምርት ስብስቦች (Collections)፡
            </span>
            {[
              { id: 'all', label: '🏛️ ሁሉም ስብስቦች' },
              { id: 'historical-heroes-heroines', label: '👑 ታሪካዊ ጀግኖችና ጀግኒቶች' },
              { id: 'women-of-history', label: '👸 የኢትዮጵያ ሴት መሪዎች' },
              { id: 'patriots-resistance', label: '⚔️ የአርበኞችና የአድዋ ተጋድሎ' },
              { id: 'sports-modern-achievement', label: '🥇 የስፖርትና ዘመናዊ ድሎች' },
              { id: 'traditional-culture', label: '🇪🇹 ባህላዊ አልባሳትና ቅርስ' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#3d2714] text-[#fef08a] border-2 border-[#f59e0b] shadow'
                    : 'bg-[#140d07] text-gray-300 border border-[#3d2714] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-[#baa994] px-1">
        <div className="font-bold text-[#fef3c7]">
          በአጠቃላይ <span className="text-[#fde047] font-black">{filteredProducts.length}</span> ለህፃናት የሚሆኑ ተወዳጅ የጀግኖች አሻንጉሊቶች ተገኝተዋል
        </div>
        <div className="text-xs text-[#4ade80] font-black flex items-center gap-1 bg-[#078930]/20 px-3 py-1 rounded-full border border-[#22c55e]/40">
          <Sparkles size={14} className="text-[#fde047]" /> 100% ንጹህ የጥጥ ፍትፍት • ለህፃናት ጤና ተስማሚ
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              language={language}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#1c1209] border-2 border-[#f59e0b]/40 rounded-3xl space-y-4 shadow-xl">
          <div className="text-4xl">⚔️</div>
          <h3 className="text-xl font-serif font-black text-white">በዚህ ፍለጋ የተገኘ ጀግና የለም</h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            የተፃፈውን ቃል ያስተካክሉ ወይም በስቱዲዮአችን የራስዎን ብጁ የጀግና ቅርጽ ይስሩ።
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              onSelectEra('all');
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-black font-black text-xs rounded-xl hover:opacity-90 shadow"
          >
            ሁሉንም ማጣሪያዎች አጽዳ
          </button>
        </div>
      )}

    </div>
  );
};
