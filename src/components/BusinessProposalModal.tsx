import React, { useState } from 'react';
import { X, Building2, BookOpen, Target, Sparkles, Award, ShieldCheck, Factory, Users, Globe, Download, CheckCircle2, ChevronRight, BarChart3, HeartHandshake } from 'lucide-react';
import { Currency, Language } from '../types';

interface BusinessProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  language: Language;
}

export const BusinessProposalModal: React.FC<BusinessProposalModalProps> = ({
  isOpen,
  onClose,
  currency,
  language
}) => {
  const [activeSection, setActiveSection] = useState<string>('executive-summary');

  if (!isOpen) return null;

  const sections = [
    { id: 'executive-summary', title: '1. Executive Summary', amharic: 'የስራ አስፈፃሚ ማጠቃለያ' },
    { id: 'objectives', title: '2. Business Objectives', amharic: 'የንግድ አላማዎች' },
    { id: 'collections', title: '3. Proposed Product Collections', amharic: 'የምርት ስብስቦች' },
    { id: 'design-features', title: '4. Design & QR Fact Cards', amharic: 'ዲዛይንና የትምህርት ካርዶች' },
    { id: 'manufacturing', title: '5. Manufacturing in Addis Ababa', amharic: 'የአዲስ አበባ ፋብሪካ እቅድ' },
    { id: 'financials', title: '6. Investment & Financial Plan', amharic: 'የኢንቨስትመንትና የፋይናንስ እቅድ' },
    { id: 'impact', title: '7. Social & Cultural Impact', amharic: 'ማህበራዊና ባህላዊ ፋይዳ' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-gradient-to-b from-[#22150b] via-[#160d06] to-[#0d0703] border-3 border-[#f59e0b] rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Vibrant Tibeb Ribbon */}
        <div className="h-3 tibeb-ribbon w-full" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[#4d3219] flex items-center justify-between bg-gradient-to-r from-[#1c1108] to-[#29170a]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f59e0b] via-[#da121a] to-[#078930] p-0.5 shadow-lg flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-black text-white">
                  HERITAGE HEROES ETHIOPIA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#078930]/30 border border-[#22c55e]/50 text-[#86efac] text-xs font-mono font-bold">
                  OFFICIAL PROPOSAL
                </span>
              </div>
              <div className="text-xs text-[#fde047] font-medium tracking-wide">
                የኢትዮጵያ ታሪካዊ ጀግኖች አሻንጉሊት ማምረቻ ፋብሪካ ቢዝነስ ፕሮፖዛል • አዲስ አበባ
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#24150a] text-white hover:bg-[#da121a] border border-[#f59e0b] transition-colors shadow-lg"
          >
            <X size={19} />
          </button>
        </div>

        {/* Modal Layout: Sidebar & Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[75vh] overflow-hidden">
          
          {/* Sidebar Nav */}
          <div className="md:col-span-4 p-4 border-r border-[#3d2714] bg-[#140b04]/80 overflow-y-auto space-y-1.5 text-xs font-bold">
            <div className="text-[11px] text-[#fde047] uppercase tracking-wider px-2 py-1 font-black">
              የፕሮፖዛል ምዕራፎች (Chapters)
            </div>
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-gradient-to-r from-[#3d2410] to-[#5a3212] border border-[#f59e0b] text-[#fef08a] shadow-lg'
                    : 'text-gray-300 hover:bg-[#201206] hover:text-white'
                }`}
              >
                <div>
                  <div className="font-black text-white">{sec.title}</div>
                  <div className="text-[11px] text-[#baa994]">{sec.amharic}</div>
                </div>
                <ChevronRight size={14} className={activeSection === sec.id ? 'text-[#fde047]' : 'text-gray-600'} />
              </button>
            ))}

            {/* Slogan Card */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-b from-[#291708] to-[#1a0e05] border border-[#f59e0b]/40 text-center space-y-2">
              <span className="text-[10px] text-[#86efac] font-bold uppercase tracking-widest block">BRAND MOTTO</span>
              <p className="text-xs text-[#fef08a] font-serif font-black italic">
                «Their stories. Our heritage. In your hands.»
              </p>
              <p className="text-[11px] text-[#baa994] font-serif">
                «ታሪካቸው። ቅርሳችን። በእጃችሁ ላይ።»
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-8 p-6 overflow-y-auto text-xs text-gray-200 space-y-6">
            
            {activeSection === 'executive-summary' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <Sparkles size={13} /> ክፍል 1፡ ማጠቃለያ ራዕይና ተልዕኮ
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Establishment of Heritage Heroes Ethiopia
                </h3>
                
                <p className="leading-relaxed text-[#fef3c7] font-normal">
                  <strong className="text-white">Heritage Heroes Ethiopia</strong> is a specialized doll-manufacturing and educational collectible business based in <strong className="text-[#fde047]">Addis Ababa, Ethiopia</strong>. The factory designs, produces, and sells high-quality, culturally authentic dolls and figures representing notable Ethiopian historical figures, national heroines, and cultural icons.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#201206] border border-[#4d3219] space-y-1">
                    <span className="text-xs font-black text-[#4ade80] uppercase tracking-wider block">👁️ ራዕይ (Vision)</span>
                    <p className="text-[11px] text-gray-200 leading-relaxed">
                      የኢትዮጵያን ታሪክ የሚያከብሩ፣ ህፃናትንና መላውን ትውልድ የሚያነሳሱ ከፍተኛ ጥራት ያላቸው አሻንጉሊቶችንና ታሪካዊ ቅርጾችን በማምረት ቀዳሚ የኢትዮጵያ ብራንድ መሆን።
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#201206] border border-[#4d3219] space-y-1">
                    <span className="text-xs font-black text-[#fde047] uppercase tracking-wider block">🎯 ተልዕኮ (Mission)</span>
                    <p className="text-[11px] text-gray-200 leading-relaxed">
                      በአገር ውስጥ በተመረቱ፣ አስተማሪ፣ ባህላዊ ክብር ባላቸውና ተመጣጣኝ ዋጋ ባላቸው አሻንጉሊቶች የኢትዮጵያን ቅርስ ማስተዋወቅ፤ ለሀገር ውስጥ ባለሙያዎችና ሰፊ የስራ ዕድል መፍጠር።
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172e1a] to-[#122314] border border-[#22c55e]/40 space-y-2">
                  <span className="text-xs font-black text-[#86efac] flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> የአገር ውስጥ እሴትና ከውጭ የሚገቡ አሻንጉሊቶች መተካት፡
                  </span>
                  <p className="text-[11px] text-gray-200 leading-relaxed">
                    አብዛኞቹ በገበያችን ላይ የሚገኙ አሻንጉሊቶች የባዕድ ገጸ-ባህሪያትን የሚያሳዩ ናቸው። ይህ ፋብሪካ የኢትዮጵያን የራሷን ታሪክ፣ የባህል አልባሳት፣ የሽሩባ አሰራር፣ ታሪካዊ ድሎችና ጥበባዊ ቅርሶችን መሰረት ያደረገ ምርት ያቀርባል።
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'objectives' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <Target size={13} /> ክፍል 2፡ የፋብሪካው ቁልፍ የንግድ አላማዎች
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Strategic Business Objectives
                </h3>

                <div className="space-y-2.5">
                  {[
                    'የኢትዮጵያን ታሪካዊ ጀግኖች፣ ጀግኒቶችና ብሄራዊ ድሎችን የሚያሳዩ አሻንጉሊቶችን ማምረት።',
                    'ልጆች ታሪካቸውን በጨዋታ እንዲማሩ የሚያስችሉ ትምህርታዊ መጫወቻዎችን ማቅረብ።',
                    'በአገር ውስጥና በዓለም አቀፍ ገበያ እውቅና ያለው የኢትዮጵያ የአሻንጉሊት ብራንድ መገንባት።',
                    'ለሰፌዎች፣ ዲዛይነሮች፣ ቀራፂዎች፣ ሰዓሊያንና የምርት ሰራተኞች ሰፊ የስራ ዕድል መፍጠር።',
                    'ከትምህርት ቤቶች፣ ሙዚየሞች፣ የባህል ተቋማትና የቱሪዝም ድርጅቶች ጋር አጋርነት መፍጠር።',
                    'ከውጭ የሚገቡ ያለቁ አሻንጉሊቶች ጥገኝነትን ደረጃ በደረጃ በመቀነስ የሀገር ውስጥ ምርትን ማሳደግ።',
                    'በውጭ ለሚኖሩ ኢትዮጵያውያን (ዲያስፖራ) እና የኢትዮጵያ ወዳጆች የሚሆኑ ለውጭ ገበያ ዝግጁ ምርቶች ማቅረብ።'
                  ].map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1e1107] border border-[#3d2714]">
                      <span className="w-5 h-5 rounded-full bg-[#f59e0b] text-black font-black flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-200 text-xs font-medium leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'collections' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <Award size={13} /> ክፍል 3፡ 5ቱ ይፋዊ የምርት ስብስቦች (The 5 Collections)
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Proposed Product Collections
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#201206] border border-[#f59e0b]/50 space-y-1.5">
                    <span className="font-black text-white text-xs block">👑 A. Historical Heroes & Heroines</span>
                    <p className="text-[11px] text-[#baa994]">
                      ዳግማዊ አፄ ምኒልክ፣ እቴጌ ጣይቱ ብጡል፣ ራዕሲ አሉላ እንግዳ፣ ዳግማዊ አፄ ቴዎድሮስ። በጥንቃቄ የተጠኑ የታሪክ ምስሎች።
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#201206] border border-[#f59e0b]/50 space-y-1.5">
                    <span className="font-black text-white text-xs block">👸 B. Women of Ethiopian History</span>
                    <p className="text-[11px] text-[#baa994]">
                      የሴት መሪዎች፣ የነጻነት ታጋዮችና የባህል አርበኞች። እቴጌ ጣይቱ፣ ወይዘሮ ሸዋረገድ ገድሌ፣ ንግሥት ማክዳ።
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#201206] border border-[#f59e0b]/50 space-y-1.5">
                    <span className="font-black text-white text-xs block">⚔️ C. Patriots & Resistance Collection</span>
                    <p className="text-[11px] text-[#baa994]">
                      የአድዋና የፋሽስት ጣሊያን ተጋድሎ አርበኞች፡ ራዕሲ አሉላ፣ ደጃዝማች በላይ ዘለቀ፣ ጀነራል ጀጋማ ኬሎ።
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#201206] border border-[#f59e0b]/50 space-y-1.5">
                    <span className="font-black text-white text-xs block">🥇 D. Sports & Modern Achievement</span>
                    <p className="text-[11px] text-[#baa994]">
                      ሻምበል አበበ ቢቂላ (1960 የሮምና 1964 የቶኪዮ ማራቶን አሸናፊ በባዶ እግር) እና ሌሎች አትሌቶች።
                    </p>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-2xl bg-[#201206] border border-[#f59e0b]/50 space-y-1.5">
                    <span className="font-black text-white text-xs block">🇪🇹 E. Traditional Ethiopian Culture Collection</span>
                    <p className="text-[11px] text-[#baa994]">
                      የተለያዩ የኢትዮጵያ ብሔር ብሔረሰቦች ባህላዊ አልባሳት፣ በእጅ የተሸመኑ የጥበብ ቀሚሶችና ጌጣጌጦች።
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'design-features' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <BookOpen size={13} /> ክፍል 4፡ የንድፍ ገጽታዎችና የትምህርት ካርድ ስርዓት
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Product Design, Fact Cards & QR Integration
                </h3>

                <p className="leading-relaxed">
                  እያንዳንዱ መደበኛ አሻንጉሊት በከፍተኛ ጥንቃቄ የተሰሩ ፊቶችና የፀጉር አሰራር፣ በታሪክ ጥናት ላይ የተመሰረቱ አልባሳት፣ ተነቃይ መገልገያዎች፣ የተረት መጽሐፍ እና ስዕላዊ የታሪክ ካርድ ያካትታል።
                </p>

                <div className="p-4 rounded-2xl bg-[#1c1006] border border-[#4d3219] space-y-3">
                  <h4 className="font-black text-[#fde047] text-xs uppercase tracking-wider">
                    የምርት ዘርፎችና የታለሙ ገበያዎች (Product Lines):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-[#251508] border border-[#3d2714]">
                      <strong className="text-white block">Heritage Mini Dolls:</strong> ለቤተሰቦችና ትምህርት ቤቶች ተመጣጣኝ አሻንጉሊቶች
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#251508] border border-[#3d2714]">
                      <strong className="text-white block">Premium Historical Dolls:</strong> ዝርዝር ጥልፍና በጥንቃቄ የተቀረጹ ቅርጾች
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#251508] border border-[#3d2714]">
                      <strong className="text-white block">Traditional Dress Dolls:</strong> የኢትዮጵያን ባህል የሚያሳዩ ለቱሪስቶችና ስጦታዎች
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#251508] border border-[#3d2714]">
                      <strong className="text-white block">Collector Editions:</strong> በውሱን ቁጥር የሚመረቱ የክብር ሰብሳቢ እትሞች
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'manufacturing' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <Factory size={13} /> ክፍል 5፡ በአዲስ አበባ የማምረትና የፋብሪካ ማስፋፊያ እቅድ
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Three-Stage Manufacturing Plan in Addis Ababa
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#1e1107] border border-[#4d3219] space-y-1">
                    <span className="font-black text-[#fde047] text-xs">ደረጃ 1፡ የንድፍና የፕሮቶታይፕ ስራ (Prototyping)</span>
                    <p className="text-[11px] text-gray-200">
                      የመጀመሪያዎቹን 3 እስከ 5 ቁልፍ ገጸ-ባህሪያት መምረጥ፣ የታሪክ ተመራማሪዎችንና ሰዓሊያንን ማማከር፣ ዲጂታል ሞዴሎችንና ናሙናዎችን መሞከር።
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#1e1107] border border-[#4d3219] space-y-1">
                    <span className="font-black text-[#86efac] text-xs">ደረጃ 2፡ የሙከራ ምርት ማምረቻ ወርክሾፕ (Pilot Manufacturing)</span>
                    <p className="text-[11px] text-gray-200">
                      በአዲስ አበባ አነስተኛ የማምረቻ ወርክሾፕ በመክፈት በኢንዱስትሪ ስፌት ማሽኖችና በሀገር ውስጥ ጨርቆች የመጀመሪያውን ስብስብ ለገበያ ማቅረብ።
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#1e1107] border border-[#4d3219] space-y-1">
                    <span className="font-black text-[#38bdf8] text-xs">ደረጃ 3፡ የፋብሪካ ማስፋፊያ (Factory Expansion)</span>
                    <p className="text-[11px] text-gray-200">
                      የቅርጽ ማውጫ (Molds)፣ ልዩ ማሽነሪዎች፣ የላቀ የጥራት ቁጥጥርና ሰፊ ማሸጊያዎችን በማካተት ምርቱን ወደ ውጭ ሀገር ኤክስፖርት ማሳደግ።
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'financials' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <BarChart3 size={13} /> ክፍል 6፡ የፋይናንስና የኢንቨስትመንት እቅድ
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Financial Strategy & Revenue Streams
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#201206] border border-[#4d3219] space-y-1">
                    <span className="text-[#fde047] font-bold block">የገቢ ምንጮች (Revenue Streams):</span>
                    <ul className="list-disc list-inside text-[11px] text-gray-300 space-y-1">
                      <li>ቀጥታ ሽያጭ በኦንላይን ድረ-ገጽ</li>
                      <li>የአሻንጉሊት ሱቆችና የከተማ መደብሮች</li>
                      <li>ለትምህርት ቤቶች በጅምላ ማቅረብ</li>
                      <li>የቱሪስት ማዕከላትና ሙዚየሞች</li>
                      <li>የዲያስፖራና የውጭ ገበያ ኤክስፖርት</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#201206] border border-[#4d3219] space-y-1">
                    <span className="text-[#86efac] font-bold block">የዋጋ አወሳሰን ስልት (Pricing):</span>
                    <ul className="list-disc list-inside text-[11px] text-gray-300 space-y-1">
                      <li>ቀላል አሻንጉሊቶች፡ 3,000 - 3,500 ብር (ETB)</li>
                      <li>ፕሪሚየም ቅርጾች፡ $45 - $55 USD</li>
                      <li>ሰብሳቢ እትሞች፡ $75 - $120 USD</li>
                      <li>የጅምላ ቅናሾች ለት/ቤቶች</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'impact' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-[#fde047] font-bold text-xs">
                  <HeartHandshake size={13} /> ክፍል 7፡ ማህበራዊና ባህላዊ ፋይዳ
                </div>

                <h3 className="text-xl font-serif font-black text-white">
                  Social, Cultural & Economic Impact
                </h3>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#1e1107] border border-[#3d2714]">
                    <strong className="text-[#fde047] block mb-1">🇪🇹 ባህላዊ ቅርስን መጠበቅ (Heritage Preservation):</strong>
                    የኢትዮጵያን ታሪክና የጀግኖችን ገድል በህፃናት አእምሮ ውስጥ በደስታና በፍቅር ማኖር።
                  </div>
                  <div className="p-3 rounded-xl bg-[#1e1107] border border-[#3d2714]">
                    <strong className="text-[#86efac] block mb-1">👩‍🎨 የስራ ዕድል ፈጠራ (Job Creation):</strong>
                    ለአገር ውስጥ ሰፌዎች፣ የእጅ ጥበብ ባለሙያዎችና ወጣቶች ቋሚ የስራ ዕድል መክፈት።
                  </div>
                  <div className="p-3 rounded-xl bg-[#1e1107] border border-[#3d2714]">
                    <strong className="text-[#38bdf8] block mb-1">🌍 ዲያስፖራና የውጭ ምንዛሬ (Diaspora & Export):</strong>
                    በውጭ ለሚኖሩ ትውልደ ኢትዮጵያውያን ማገናኛ ድልድይ በመሆን የውጭ ምንዛሬን ወደ ሀገር ማስገባት።
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#4d3219] bg-[#140b04] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#baa994]">
            <ShieldCheck size={16} className="text-[#22c55e]" />
            <span>Heritage Heroes Ethiopia Factory Proposal • Addis Ababa</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('የቢዝነስ ፕሮፖዛል ሙሉ ዶክመንት ወደ ፒዲኤፍ (PDF) ማውረጃ ዝግጁ ሆኗል!');
              }}
              className="px-4 py-2 rounded-xl bg-[#261509] border border-[#f59e0b] text-[#fef08a] font-bold text-xs flex items-center gap-1.5 hover:bg-[#38200f] transition-all"
            >
              <Download size={13} />
              <span>ሙሉውን ፕሮፖዛል አውርድ (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#15803d] text-white font-black text-xs hover:opacity-95 shadow"
            >
              ተረዳሁ / ዝጋ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

