import React from 'react';
import { CartItem } from '../types';
import { X, Printer, Shield } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    customerName: string;
    items: CartItem[];
    paymentMethod: string;
    totalAmount: string;
    date: string;
  } | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  orderData
}) => {
  if (!isOpen || !orderData) return null;

  const handlePrint = () => {
    window.print();
  };

  const primaryItem = orderData.items[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#1c1209] via-[#140c06] to-[#0a0604] border-3 border-[#f59e0b] rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#291a0b] text-white hover:bg-[#da121a] border border-[#f59e0b]/50 transition-colors shadow-lg"
        >
          <X size={19} />
        </button>

        {/* Certificate Container with Parchment Texture Effect */}
        <div className="p-6 sm:p-10 relative bg-gradient-to-b from-[#24170c] via-[#1a1008] to-[#120a05] text-center">
          
          {/* Ornate Gold Filigree Border */}
          <div className="border-4 border-double border-[#f59e0b] rounded-2xl p-6 sm:p-8 relative shadow-2xl">
            
            {/* Top Imperial Crest Motif in Vibrant Ethiopian Gold */}
            <div className="mx-auto w-18 h-18 rounded-full bg-gradient-to-br from-[#f59e0b] via-[#da121a] to-[#078930] p-1 shadow-2xl mb-3 flex items-center justify-center">
              <div className="w-full h-full bg-[#181008] rounded-full flex items-center justify-center text-3xl">
                👑
              </div>
            </div>

            <div className="text-xs uppercase tracking-widest text-[#fde047] font-black">
              በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#fef08a] tracking-tight mt-1.5">
              የኢትዮጵያ ታሪካዊ ጀግኖች የክብር ምስክር ወረቀት
            </h1>

            <p className="text-xs text-[#baa994] font-serif italic mt-1 font-medium">
              በይነገሥታት የታሪክ አሻንጉሊትና የቅርጻቅርጽ ፋብሪካ የተዘጋጀ ይፋዊ ማረጋገጫ • አዲስ አበባ
            </p>

            <div className="h-1 w-40 mx-auto my-4 tibeb-ribbon rounded-full" />

            {/* Certificate Body Text in Amharic */}
            <div className="space-y-4 text-xs text-[#fef3c7] leading-relaxed max-w-lg mx-auto font-medium">
              <p>
                ይህ የክብር ሰነድ በምዝገባ መለያ ቁጥር፡
              </p>

              <div className="font-mono text-base sm:text-lg font-black text-[#fde047] tracking-widest bg-[#2d1b0d] py-2.5 px-6 rounded-xl border-2 border-[#f59e0b] inline-block shadow-inner">
                {orderData.orderId}
              </div>

              <p>
                የተመዘገበው በእጅ የተቀረጸው የኢትዮጵያ ታሪካዊ ጀግና የክብር ቅርጽ በሀገር ሉዓላዊነትና የነጻነት ተምሳሌትነት ለተከበሩት ባለቤት፡
              </p>

              <div className="text-xl sm:text-2xl font-serif font-black text-white border-b-2 border-[#f59e0b] pb-1 inline-block">
                {orderData.customerName}
              </div>

              {primaryItem && (
                <div className="p-3.5 bg-[#170e07] rounded-xl border-2 border-[#4d351d] text-left text-xs space-y-1.5 shadow">
                  <div className="flex justify-between">
                    <span className="text-[#baa994]">የጀግናው ስም፡</span>
                    <span className="font-black text-[#fef08a]">{primaryItem.product.heroNameAmharic} ({primaryItem.product.titleAmharic})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#baa994]">የቅርጹ ስኬል፡</span>
                    <span className="text-white font-bold">{primaryItem.product.scale}</span>
                  </div>
                  {primaryItem.customEngraving && (
                    <div className="flex justify-between">
                      <span className="text-[#baa994]">በመደቡ የተቀረጸ ስም፡</span>
                      <span className="text-[#4ade80] font-black">«{primaryItem.customEngraving}»</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#baa994]">የተከፈለው ዋጋ፡</span>
                    <span className="text-[#22c55e] font-black font-mono">{orderData.totalAmount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Signatures & Seal Row */}
            <div className="mt-8 pt-6 border-t-2 border-[#3d2714] flex items-center justify-between text-[11px] text-[#baa994]">
              <div className="text-left">
                <div className="font-serif italic text-white text-sm font-bold mb-0.5">ታደሰ ገ/መስቀል</div>
                <div className="border-t border-[#4d351d] pt-0.5">ዋና ቀራፂና የፋብሪካው ዳይሬክተር</div>
                <div>አዲስ አበባ፣ ኢትዮጵያ</div>
              </div>

              {/* Official Gold Seal Badge */}
              <div className="w-16 h-16 rounded-full border-2 border-[#f59e0b] bg-gradient-to-br from-[#3d2714] to-[#1c1209] flex flex-col items-center justify-center text-[9px] font-black text-[#fde047] shadow-xl">
                <Shield size={16} className="text-[#f59e0b] mb-0.5" />
                <span>ይፋዊ</span>
                <span>ማህተም</span>
              </div>

              <div className="text-right">
                <div className="font-mono text-white text-xs font-bold mb-0.5">{orderData.date}</div>
                <div className="border-t border-[#4d351d] pt-0.5">የተመዘገበበት ቀን</div>
                <div>የሰሎሞናዊያን ታሪክ ማህደር</div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 shadow-xl hover:scale-105 transition-all"
            >
              <Printer size={16} className="text-black" />
              <span>የምስክር ወረቀቱን አትም (Print)</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-[#291a0b] border-2 border-[#f59e0b]/50 text-white hover:text-[#fde047] font-black text-xs uppercase tracking-wider transition-colors"
            >
              ወደ መደብሩ ተመለስ
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
