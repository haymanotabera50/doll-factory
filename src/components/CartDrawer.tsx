import React from 'react';
import { CartItem, Currency, Language } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  language: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  // Total pricing
  const subtotalETB = items.reduce((acc, item) => acc + item.product.priceETB * item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const freeShippingThresholdETB = 10000;
  const freeShippingThresholdUSD = 150;

  const qualifiesFreeShipping = currency === 'ETB' 
    ? subtotalETB >= freeShippingThresholdETB 
    : subtotalUSD >= freeShippingThresholdUSD;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-gradient-to-b from-[#1c1209] via-[#140c06] to-[#0a0604] border-l-2 border-[#f59e0b] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#3d2714] flex items-center justify-between bg-gradient-to-r from-[#291b0d] to-[#1c1209]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#b45309] text-black shadow-lg">
                <ShoppingBag size={20} className="text-black" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-black text-white">የግዢ ቅርጫትዎ</h3>
                <span className="text-xs text-[#fde047] font-bold">
                  {items.length} {items.length === 1 ? 'ጀግና ተመርጧል' : 'ጀግኖች ተመርጠዋል'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-[#da121a] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Banner in Vibrant Colors */}
          <div className="px-5 py-3 bg-[#24170d] border-b border-[#3d2714] text-xs flex items-center gap-2 text-[#fef3c7]">
            <Truck size={16} className="text-[#f59e0b] flex-shrink-0" />
            {qualifiesFreeShipping ? (
              <span className="text-[#4ade80] font-black">
                🎉 እንኳን ደስ አለዎት! ነጻ ፈጣን ማድረሻ ተፈቅዶልዎታል!
              </span>
            ) : (
              <span className="font-medium">
                ተጨማሪ {currency === 'ETB' 
                  ? `${(freeShippingThresholdETB - subtotalETB).toLocaleString()} ብር` 
                  : `$${(freeShippingThresholdUSD - subtotalUSD)}`} ይግዙና ነጻ ማድረሻ ያግኙ!
              </span>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 bg-[#20150c] rounded-2xl border-2 border-[#4d351d] flex gap-3.5 items-start justify-between shadow-lg"
                >
                  <div className="flex-1">
                    <span className="text-xs text-[#fde047] font-black uppercase tracking-wider block">
                      {item.product.heroNameAmharic}
                    </span>
                    <h4 className="text-sm font-serif font-black text-white line-clamp-1 mt-0.5">
                      {item.product.titleAmharic}
                    </h4>

                    {/* Custom engraving badge */}
                    {item.customEngraving && (
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-[#4ade80] bg-[#142918] px-2.5 py-0.5 rounded-md border border-[#22c55e]/50 font-bold">
                        <Sparkles size={11} className="text-[#fde047]" />
                        <span>የተቀረጸበት፡ «{item.customEngraving}»</span>
                      </div>
                    )}

                    <div className="mt-2.5 text-sm font-black text-[#fef08a] font-mono">
                      {currency === 'ETB' 
                        ? `${(item.product.priceETB * item.quantity).toLocaleString()} ብር (ETB)` 
                        : `$${item.product.priceUSD * item.quantity}`}
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border-2 border-[#4d351d] rounded-lg bg-[#140d07]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-xs text-white hover:text-[#fde047] font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-mono font-black text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-xs text-white hover:text-[#fde047] font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-400 p-1.5 transition-colors"
                        title="አስወግድ"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-20 h-20 rounded-full bg-[#24170d] border-2 border-[#f59e0b] flex items-center justify-center text-3xl shadow-lg">
                  👑
                </div>
                <h4 className="text-lg font-serif font-black text-white">ቅርጫትዎ ባዶ ነው</h4>
                <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
                  የኢትዮጵያን ታላላቅ ጀግኖች ቅርጾች በመምረጥ ወይም በስቱዲዮአችን የራስዎን ብጁ አሻንጉሊት በመስራት ይዘዙ።
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#eab308] text-black font-black text-xs shadow-lg"
                >
                  የጀግኖች ቅርጾችን እይ
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action in Vibrant Amharic */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#3d2714] bg-gradient-to-b from-[#20150c] to-[#140c06] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#d1d5db]">
                  <span>ድምር ዋጋ፡</span>
                  <span className="font-mono text-white font-black text-sm">
                    {currency === 'ETB' ? `${subtotalETB.toLocaleString()} ብር (ETB)` : `$${subtotalUSD}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#d1d5db]">
                  <span>የማድረሻ ዋጋ፡</span>
                  <span className="text-[#4ade80] font-black">
                    {qualifiesFreeShipping ? 'ነጻ ማድረሻ (በልዩ ትዕዛዝ)' : currency === 'ETB' ? '300 ብር' : '$15'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#3d2714] flex justify-between text-base">
                  <span className="font-black text-white">ጠቅላላ ክፍያ፡</span>
                  <span className="font-mono font-black text-[#fde047] text-lg">
                    {currency === 'ETB' 
                      ? `${(subtotalETB + (qualifiesFreeShipping ? 0 : 300)).toLocaleString()} ብር (ETB)` 
                      : `$${subtotalUSD + (qualifiesFreeShipping ? 0 : 15)}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/30 active:scale-98 transition-all hover:scale-102"
              >
                <span>ክፍያ ፈጽመው ይዘዙ</span>
                <ArrowRight size={17} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#fef08a] font-bold">
                <ShieldCheck size={14} className="text-[#22c55e]" />
                <span>በቴሌብር • በንግድ ባንክ • በቻፓ • በዲ ኤች ኤል</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
