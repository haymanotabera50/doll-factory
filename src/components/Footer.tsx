import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#140c06] to-[#080503] border-t-2 border-[#f59e0b]/50 mt-20 relative overflow-hidden">
      {/* Decorative Top Accent Ribbon */}
      <div className="h-2 tibeb-ribbon w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission in Amharic */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f59e0b] via-[#da121a] to-[#078930] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#181008] rounded-[14px] flex items-center justify-center text-2xl">
                  👑
                </div>
              </div>
              <div>
                <span className="font-serif font-black text-white text-xl tracking-wider ethiopia-text-gradient">የቅርስ ጀግኖች</span>
                <span className="text-xs text-[#fde047] block font-bold">HERITAGE HEROES ETHIOPIA</span>
              </div>
            </div>

            <p className="text-xs text-[#fef3c7] leading-relaxed font-medium">
              «Their stories. Our heritage. In your hands.» — የኢትዮጵያን ታላላቅ ጀግኖች ታሪክ ለትውልድ ለማስተላለፍ፣ ለልጆች የሀገር ፍቅርንና ኩራትን ለማስተማር ጥራት ባላቸው የክብር ቅርጾችና አሻንጉሊቶች እናቀርባለን።
            </p>

            <div className="flex items-center gap-2 text-xs text-[#4ade80] font-bold">
              <Shield size={16} className="text-[#22c55e]" />
              <span>የተረጋገጠ የኢትዮጵያ ቅርስና የታሪክ አሻንጉሊት ፋብሪካ</span>
            </div>
          </div>

          {/* Workshop & Artisans */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-black text-[#fde047] uppercase tracking-wider text-sm border-b border-[#3d2714] pb-2">
              የአዲስ አበባ ፋብሪካና ስቱዲዮ
            </h4>
            <div className="text-[#fef3c7] space-y-2.5 font-medium">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <span>የቅርስ ጥበብ ማምረቻ ማዕከል፣ አዲስ አበባ፣ ኢትዮጵያ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#22c55e] flex-shrink-0" />
                <span>+251 91 123 4567 / +251 11 654 3210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-[#ef4444] flex-shrink-0" />
                <span>contact@heritageheroes.et</span>
              </div>
            </div>
          </div>

          {/* Hero Epochs Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-black text-[#fde047] uppercase tracking-wider text-sm border-b border-[#3d2714] pb-2">
              ታሪካዊ ዘመናት
            </h4>
            <ul className="space-y-2 text-[#d1d5db] font-medium">
              <li className="hover:text-[#fde047] transition-colors cursor-pointer">❖ ጥንታዊው አክሱም (ንግሥተ ሳባና ንጉሥ ኢዛና)</li>
              <li className="hover:text-[#fde047] transition-colors cursor-pointer">❖ የጎንደር ግንቦች ህዳሴ (አፄ ፋሲለደስ)</li>
              <li className="hover:text-[#fde047] transition-colors cursor-pointer">❖ የ19ኛው መቶ ክ/ዘ የመቅደላ ጽናት (ዳግማዊ ቴዎድሮስ)</li>
              <li className="hover:text-[#fde047] transition-colors cursor-pointer">❖ የታላቁ አድዋ ድል 1888 (ምኒልክና እቴጌ ጣይቱ)</li>
              <li className="hover:text-[#fde047] transition-colors cursor-pointer">❖ የአርበኝነት ተጋድሎ 1928-1933 (በላይ ዘለቀ)</li>
              <li className="hover:text-[#fde047] transition-colors cursor-pointer">❖ የሮም ማራቶን ጀግና (ሻምበል አበበ ቢቂላ)</li>
            </ul>
          </div>

          {/* Payment & Global Delivery */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-black text-[#fde047] uppercase tracking-wider text-sm border-b border-[#3d2714] pb-2">
              ክፍያና ማድረሻ
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 bg-[#1e1309] rounded-xl border border-[#4d351d] space-y-1">
                <span className="text-[11px] text-[#fde047] font-black block uppercase tracking-wider">
                  የሀገር ውስጥ ክፍያ፡
                </span>
                <div className="text-white font-bold">ቴሌብር (Telebirr) • ንግድ ባንክ (CBE) • ቻፓ</div>
              </div>

              <div className="p-3 bg-[#1e1309] rounded-xl border border-[#4d351d] space-y-1">
                <span className="text-[11px] text-[#4ade80] font-black block uppercase tracking-wider">
                  ዓለም አቀፍ ፈጣን ማድረሻ፡
                </span>
                <div className="text-white font-bold">በዲ ኤች ኤል (DHL) ወደ አሜሪካ፣ አውሮፓና መካከለኛው ምስራቅ</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Quote */}
        <div className="pt-8 border-t-2 border-[#3d2714] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#baa994]">
          <div className="font-serif italic text-[#fef08a] font-bold text-sm">
            «ኢትዮጵያ እጆቿን ወደ እግዚአብሔር ትዘረጋለች» — መዝሙር ፷፯:፴፩
          </div>
          <div className="font-medium">
            © {new Date().getFullYear()} የነገሥታት አሻንጉሊት (YENEGESTAT TOYS). መብቱ በህግ የተጠበቀ ነው።
          </div>
        </div>

      </div>
    </footer>
  );
};
