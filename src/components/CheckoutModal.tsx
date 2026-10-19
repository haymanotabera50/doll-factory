import React, { useState } from 'react';
import { CartItem, Currency, Language } from '../types';
import { X, Check, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  language: Language;
  onOrderSuccess: (orderData: {
    orderId: string;
    customerName: string;
    items: CartItem[];
    paymentMethod: string;
    totalAmount: string;
    date: string;
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderSuccess
}) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [deliveryRegion, setDeliveryRegion] = useState<'addis' | 'regions' | 'international'>('addis');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'chapa' | 'card' | 'cod'>('telebirr');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const subtotalETB = items.reduce((acc, item) => acc + item.product.priceETB * item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const deliveryFeeETB = deliveryRegion === 'addis' ? 0 : deliveryRegion === 'regions' ? 450 : 2200;
  const deliveryFeeUSD = deliveryRegion === 'international' ? 35 : 0;

  const finalTotalETB = subtotalETB + deliveryFeeETB;
  const finalTotalUSD = subtotalUSD + deliveryFeeUSD;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim() || !deliveryAddress.trim()) {
      setErrorMsg('እባክዎ ሙሉ ስምዎን፣ ስልክ ቁጥርዎን እና ትክክለኛ የመላኪያ አድራሻዎን ያስገቡ።');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#078930', '#fcdd09', '#da121a', '#f59e0b', '#9333ea']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `YG-${Math.floor(100000 + Math.random() * 900000)}`;
      const totalStr = currency === 'ETB' ? `${finalTotalETB.toLocaleString()} ብር (ETB)` : `$${finalTotalUSD}`;

      const paymentNames: Record<string, string> = {
        telebirr: 'ቴሌብር (Telebirr)',
        cbe: 'የኢትዮጵያ ንግድ ባንክ (CBE Birr)',
        chapa: 'ቻፓ (Chapa)',
        card: 'ቪዛ / ማስተርካርድ (Visa/Mastercard)',
        cod: 'በእጅ በእጅ ክፍያ (Cash on Delivery)'
      };

      onOrderSuccess({
        orderId: generatedOrderId,
        customerName,
        items,
        paymentMethod: paymentNames[paymentMethod] || paymentMethod,
        totalAmount: totalStr,
        date: new Date().toLocaleDateString('am-ET', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#1c1209] via-[#140c06] to-[#0c0805] border-2 border-[#f59e0b] rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Vibrant Ribbon */}
        <div className="h-2.5 tibeb-ribbon w-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#291a0b] text-white hover:bg-[#da121a] border border-[#f59e0b]/50 transition-colors shadow-lg"
        >
          <X size={19} />
        </button>

        {/* Modal Form in Rich Amharic */}
        <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#078930]/30 to-[#f59e0b]/30 border border-[#f59e0b] text-[#fef08a] text-xs font-black mb-2 shadow">
              <Lock size={13} className="text-[#fde047]" />
              ደህንነቱ የተጠበቀ ክፍያና የክብር ምስክር ወረቀት አሰጣጥ
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              ትዕዛዝዎን <span className="ethiopia-text-gradient font-black">በክብር ያጠናቅቁ</span>
            </h2>
            <p className="text-xs text-[#fef3c7] mt-1 leading-relaxed">
              የመረጧቸው የጀግኖች ቅርጾች በጥንቃቄ ተፈትሸው፣ በክብር ሳጥን ታሽገውና ይፋዊ የታሪክ ምስክር ወረቀት ተዘጋጅቶላቸው በአስተማማኝ ሁኔታ ይላካሉ።
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500 text-red-200 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* Contact Information in Amharic */}
          <div className="space-y-3">
            <span className="text-xs font-black text-[#fde047] uppercase tracking-wider block">
              1. የደንበኛና የመላኪያ መረጃ
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#fef3c7] font-bold block mb-1">ሙሉ ስምዎ</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="ምሳሌ፡ አበበ መንግስቱ"
                  className="w-full bg-[#140d07] border-2 border-[#4d351d] text-sm text-white rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-[#fef3c7] font-bold block mb-1">ስልክ ቁጥር (ቴሌብር / ኤስኤምኤስ)</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="ምሳሌ፡ +251 91 123 4567"
                  className="w-full bg-[#140d07] border-2 border-[#4d351d] text-sm text-white rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#fef3c7] font-bold block mb-1">ኢሜይል አድራሻ (የምስክር ወረቀቱን ኮፒ ለመላክ)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ምሳሌ፡ abebe@gmail.com"
                className="w-full bg-[#140d07] border-2 border-[#4d351d] text-sm text-white rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Delivery Destination in Amharic */}
          <div className="space-y-3">
            <span className="text-xs font-black text-[#fde047] uppercase tracking-wider block">
              2. የሚላክበት ክልል / ሀገር
            </span>
            
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'addis', label: 'አዲስ አበባ', sub: 'ነጻ የዕለቱ ማድረሻ' },
                { id: 'regions', label: 'የክልል ከተሞች', sub: 'ባህር ዳር፣ ሐዋሳ፣ መቐለ...' },
                { id: 'international', label: 'ዓለም አቀፍ (DHL)', sub: 'አሜሪካ፣ አውሮፓ፣ ካናዳ...' },
              ].map(opt => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setDeliveryRegion(opt.id as any)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    deliveryRegion === opt.id
                      ? 'border-[#f59e0b] bg-[#3a2310] text-[#fef08a] shadow-lg scale-102'
                      : 'border-[#3d2714] bg-[#140d07] text-gray-300 hover:border-[#63401f]'
                  }`}
                >
                  <div className="font-black text-xs">{opt.label}</div>
                  <div className="text-[10px] text-[#fde68a] truncate mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs text-[#fef3c7] font-bold block mb-1">ትክክለኛ የመላኪያ አድራሻና ምልክት</label>
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="ምሳሌ፡ ቦሌ መድኃኒዓለም፣ ኤድና ሞል ጀርባ፣ የቤት ቁጥር 204፣ አዲስ አበባ"
                className="w-full bg-[#140d07] border-2 border-[#4d351d] text-xs text-white rounded-xl p-2.5 focus:border-[#f59e0b] focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Payment Method with Vibrant Colors */}
          <div className="space-y-3">
            <span className="text-xs font-black text-[#fde047] uppercase tracking-wider block">
              3. የክፍያ አማራጭ
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'telebirr', name: 'ቴሌብር (Telebirr)', icon: '📱', desc: 'በቀጥታ በስልክ መተግበሪያ' },
                { id: 'cbe', name: 'የኢትዮጵያ ንግድ ባንክ (CBE)', icon: '🏦', desc: 'በCBE Birr / ሞባይል ባንኪንግ' },
                { id: 'chapa', name: 'ቻፓ (Chapa)', icon: '⚡', desc: 'ፈጣን የኢንተርኔት ክፍያ' },
                { id: 'card', name: 'ቪዛ / ማስተርካርድ', icon: '💳', desc: 'ለዓለም አቀፍ ካርዶች' },
                { id: 'cod', name: 'በእጅ በእጅ ክፍያ', icon: '💵', desc: 'በአዲስ አበባ ብቻ' },
              ].map(pay => (
                <button
                  type="button"
                  key={pay.id}
                  onClick={() => setPaymentMethod(pay.id as any)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === pay.id
                      ? 'border-[#f59e0b] bg-gradient-to-b from-[#382310] to-[#251608] text-white shadow-lg shadow-[#f59e0b]/20 scale-102'
                      : 'border-[#3a2614] bg-[#140d07] text-gray-300 hover:border-[#63401f]'
                  }`}
                >
                  <span className="text-xl mr-1">{pay.icon}</span>
                  <div className="font-black text-xs text-white mt-1">{pay.name}</div>
                  <div className="text-[10px] text-[#fde68a] mt-0.5">{pay.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary & Confirm Button in Amharic */}
          <div className="p-4.5 bg-gradient-to-r from-[#22160c] to-[#1a1008] rounded-2xl border-2 border-[#4d351d] space-y-3 shadow-inner">
            <div className="flex justify-between text-xs text-[#d1d5db]">
              <span>የእቃዎች ድምር ({items.length}):</span>
              <span className="font-mono text-white font-black">
                {currency === 'ETB' ? `${subtotalETB.toLocaleString()} ብር (ETB)` : `$${subtotalUSD}`}
              </span>
            </div>
            <div className="flex justify-between text-xs text-[#d1d5db]">
              <span>የማድረሻ ክፍያ ({deliveryRegion === 'addis' ? 'አዲስ አበባ' : deliveryRegion === 'regions' ? 'የክልል ከተሞች' : 'ዓለም አቀፍ'}):</span>
              <span className="font-mono text-[#4ade80] font-black">
                {currency === 'ETB' 
                  ? deliveryFeeETB === 0 ? 'ነጻ ማድረሻ' : `${deliveryFeeETB} ብር` 
                  : deliveryFeeUSD === 0 ? 'ነጻ ማድረሻ' : `$${deliveryFeeUSD}`}
              </span>
            </div>
            <div className="pt-2 border-t border-[#3d2714] flex justify-between text-base">
              <span className="font-black text-white">ጠቅላላ የሚከፈል፡</span>
              <span className="font-mono font-black text-[#fde047] text-2xl">
                {currency === 'ETB' ? `${finalTotalETB.toLocaleString()} ብር (ETB)` : `$${finalTotalUSD}`}
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#ef4444] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-2xl shadow-orange-500/30 active:scale-98 transition-all hover:scale-102 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  <span>ክፍያውን በማረጋገጥ ላይ...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>ክፍያ ፈጽመው የክብር ምስክር ወረቀትዎን ያግኙ</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
