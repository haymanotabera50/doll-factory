import React, { useState } from 'react';
import { DollProduct, Currency, Language } from '../types';
import { DollVisualizer } from './DollVisualizer';
import { Star, ShoppingBag, Eye, Heart, BookOpen, Sparkles, QrCode, Camera } from 'lucide-react';

interface ProductCardProps {
  product: DollProduct;
  currency: Currency;
  language: Language;
  onQuickView: (product: DollProduct) => void;
  onAddToCart: (product: DollProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  language,
  onQuickView,
  onAddToCart
}) => {
  const [viewMode, setViewMode] = useState<'photo' | 'visualizer'>(product.imageUrl ? 'photo' : 'visualizer');

  // Specific background position for characters in the group photo
  const getPhotoPosition = (heroId: string) => {
    switch (heroId) {
      case 'menelik-ii':
        return 'object-[15%_35%]'; // Emperor Menelik II on far left
      case 'taytu-betul':
        return 'object-[38%_35%]'; // Empress Taytu Betul
      case 'ras-alula':
        return 'object-[62%_35%]'; // Ras Alula Engida
      case 'abebe-bikila':
        return 'object-[88%_35%]'; // Abebe Bikila on far right
      default:
        return 'object-center';
    }
  };

  return (
    <div className="group relative bg-gradient-to-b from-[#24170e] via-[#1a1008] to-[#120a05] border-2 border-[#4d3219] hover:border-[#f59e0b] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#f59e0b]/20 flex flex-col justify-between hover:-translate-y-1.5">
      {/* Top Media Showcase */}
      <div className="relative overflow-hidden bg-[#100905]">
        {product.imageUrl && viewMode === 'photo' ? (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#1a0f07] via-[#100804] to-[#080402] border-b border-[#f59e0b]/30">
            {/* Museum Pedestal Spotlight Reflection */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 w-32 h-6 bg-black/70 rounded-full filter blur-md pointer-events-none" />

            <img
              src={product.imageUrl}
              alt={product.title}
              className={`max-h-[94%] w-auto transition-transform duration-500 group-hover:scale-108 drop-shadow-[0_22px_30px_rgba(0,0,0,0.9)] ${
                product.imageUrl.includes('3d_masterpieces')
                  ? 'w-full h-full object-cover'
                  : 'object-contain'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Realistic Figure Seal */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-black/85 border border-[#f59e0b]/70 text-[10px] text-[#fde047] font-black flex items-center gap-1.5 backdrop-blur-md shadow-lg">
              <Sparkles size={11} className="text-[#fde047] animate-pulse" />
              <span>3D ታሪካዊ ቅርጽ (Official Plinth)</span>
            </div>
          </div>
        ) : (
          <DollVisualizer
            config={product.visualConfig}
            heroName={product.heroName}
            heroNameAmharic={product.heroNameAmharic}
            figureTitle={product.titleAmharic}
            category={product.category}
            interactive={false}
            heightClass="h-64 sm:h-72"
          />
        )}

        {/* Photo / 3D Toggle Pill if image available */}
        {product.imageUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode(prev => prev === 'photo' ? 'visualizer' : 'photo');
            }}
            className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-xl bg-[#1c1108]/90 hover:bg-[#3d2411] border border-[#f59e0b] text-[10px] text-[#fef08a] font-bold flex items-center gap-1 shadow-lg transition-transform active:scale-95"
            title="መልክ ቀይር (ፎቶ / 3D)"
          >
            <Camera size={11} />
            <span>{viewMode === 'photo' ? '🎨 3D' : '📸 ፎቶ'}</span>
          </button>
        )}

        {/* Child & Collector Badge */}
        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-black text-[11px] font-black tracking-wider border border-green-200 shadow-xl flex items-center gap-1 backdrop-blur-sm">
          <span>🧸 {product.ageRecommendation}</span>
        </div>

        {/* Quick View Hover Button in Amharic */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-xs py-2 px-4 rounded-2xl m-auto h-11 w-48 bg-[#29170a] border-2 border-[#f59e0b] shadow-2xl hover:bg-gradient-to-r hover:from-[#fde047] hover:to-[#f59e0b] hover:text-black z-10"
        >
          <Eye size={16} />
          <span>ዝርዝሩንና ታሪኩን እይ</span>
        </button>
      </div>

      {/* Card Content & Details in Rich Amharic */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#1c1108] to-[#120904]">
        <div>
          {/* Hero Name & Rating */}
          <div className="flex items-baseline justify-between gap-1 mb-1">
            <span className="text-xs text-[#fde047] font-black tracking-wider uppercase">
              {product.heroNameAmharic}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#fef08a] font-bold">
              <Star size={13} className="text-[#fde047] fill-[#fde047]" />
              <span>{product.rating}</span>
              <span className="text-[#baa994]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-base font-serif font-black text-white group-hover:text-[#fef08a] transition-colors leading-snug line-clamp-1">
            {product.titleAmharic}
          </h3>

          <p className="text-xs text-[#d1d5db] mt-1.5 line-clamp-2 leading-relaxed">
            {product.historicalBackstoryAmharic}
          </p>

          {/* Storybook included & Safety tag & QR Code Badge */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-[#2e1c0d] border border-[#f59e0b]/40 text-[#fef08a] font-bold flex items-center gap-1">
              <BookOpen size={12} className="text-[#22c55e]" />
              <span>የተረት መጽሐፍ</span>
            </span>
            {product.educationalCardTitle && (
              <span className="px-2 py-1 rounded-lg bg-[#1e1307] text-[#fde047] border border-[#f59e0b]/40 font-bold text-[10px] flex items-center gap-1">
                <QrCode size={11} className="text-[#f59e0b]" />
                <span>QR ካርድ</span>
              </span>
            )}
            {['taytu-betul', 'zewditu', 'queen-of-sheba', 'shewareged-gadle', 'empress-mentewab', 'derartu-tulu', 'werede-mamo'].includes(product.heroId) && (
              <span className="px-2 py-1 rounded-lg bg-pink-950/70 text-pink-300 border border-pink-500/50 font-bold text-[10px] flex items-center gap-1">
                <Sparkles size={11} className="text-pink-400" />
                <span>3D ኤግዚቢሽን</span>
              </span>
            )}
            <span className="px-2 py-1 rounded-lg bg-[#142918] text-[#86efac] border border-[#22c55e]/40 font-bold text-[10px]">
              ✓ የሚታጠብ
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart action */}
        <div className="mt-4 pt-3 border-t border-[#3d2714] flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-[#fef08a] font-mono">
              {currency === 'ETB' ? `${product.priceETB.toLocaleString()} ብር (ETB)` : `$${product.priceUSD}`}
            </div>
            <div className="text-[11px] text-[#4ade80] font-bold">
              ✓ በክምችት አለ ({product.stockQuantity} ቀርተዋል)
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black font-black text-xs hover:opacity-90 transition-all flex items-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-95 hover:scale-105"
            title="ለልጅዎ ይግዙ"
          >
            <ShoppingBag size={15} className="text-black" />
            <span>ለልጅህ ግዛ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
