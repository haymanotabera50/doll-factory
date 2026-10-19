import React from 'react';
import { HistoricalEra } from '../types';
import { MapPin, Compass, Calendar, ChevronRight } from 'lucide-react';

interface HistoricalTimelineProps {
  onSelectEra: (era: HistoricalEra) => void;
  selectedEra: HistoricalEra | 'all';
}

interface TimelineEpoch {
  id: HistoricalEra;
  title: string;
  titleAmharic: string;
  periodAmharic: string;
  battlefieldAmharic: string;
  descriptionAmharic: string;
  keyHeroesAmharic: string[];
  significanceAmharic: string;
  gradientBorder: string;
  badgeBg: string;
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({
  onSelectEra,
  selectedEra
}) => {
  const epochs: TimelineEpoch[] = [
    {
      id: 'ancient-axum',
      title: 'Ancient Axumite Empire',
      titleAmharic: 'ጥንታዊው የአክሱም ስልጣኔ',
      periodAmharic: 'ከክርስቶስ ልደት በፊት 10ኛው መቶ ክ/ዘ - 6ኛው መቶ ክ/ዘ',
      battlefieldAmharic: 'አክሱም፣ ትግራይ',
      descriptionAmharic: 'በዓለም ከነበሩ 4 ታላላቅ ኃያላን መንግስታት አንዷ። የወርቅ ሳንቲም ያተመች፣ ግዙፍ የድንጋይ ሐውልቶችን ያቆመችና ታቦተ ጽዮንን ያኖረች ጥንታዊት ኢትዮጵያ።',
      keyHeroesAmharic: ['ንግሥት ማክዳ (ንግሥተ ሳባ)', 'ንጉሥ ዔዛና ዘአክሱም'],
      significanceAmharic: 'የወርቅ መገበያያ ሳንቲም፣ የግዕዝ ፊደል፣ የአክሱም ሐውልቶች',
      gradientBorder: 'from-[#f59e0b] via-[#eab308] to-[#b45309]',
      badgeBg: 'bg-[#f59e0b]/20 text-[#fde047] border-[#f59e0b]'
    },
    {
      id: 'medieval-geez',
      title: 'Medieval Golden Age & Sacred Arts',
      titleAmharic: 'የመካከለኛው ዘመን ጥበብና ዜማ',
      periodAmharic: '5ኛው – 13ኛው መቶ ክፍለ ዘመን',
      battlefieldAmharic: 'አክሱምና ሮሃ (ላሊበላ)',
      descriptionAmharic: 'የቅዱስ ያሬድ መለኮታዊ ዜማና ድጓ፣ በአንድ ወጥ አለት የተፈለፈሉ 11ቱ የላሊበላ ውቅር አብያተ-ክርስቲያናት የተነጹበት የጥበብ ዘመን።',
      keyHeroesAmharic: ['ቅዱስ ያሬድ (የዜማ ሊቅ)', 'ቅዱስ ላልይበላ (ገብረ መስቀል)'],
      significanceAmharic: 'የዜማ ምልክቶች፣ የላሊበላ 11 ውቅር አብያተ-ክርስቲያናት',
      gradientBorder: 'from-[#14b8a6] via-[#0d9488] to-[#042f2e]',
      badgeBg: 'bg-[#14b8a6]/20 text-[#2dd4bf] border-[#14b8a6]'
    },
    {
      id: 'gondar-renaissance',
      title: 'Gondarine Renaissance',
      titleAmharic: 'የጎንደር ግንቦች ህዳሴ ዘመን',
      periodAmharic: '1628 – 1761 ዓ.ም',
      battlefieldAmharic: 'ፋሲል ግቢና ቁስቋም፣ ጎንደር',
      descriptionAmharic: '«የአፍሪካ ካሜሎት» በመባል የሚታወቀው የድንጋይ ቤተ-መንግስታት ግንባታ፣ የጥምቀት መዋኛ፣ የቅኔና የስነ-ስዕል ጥበብ ከፍተኛ ደረጃ የደረሰበት አስደናቂ ዘመን።',
      keyHeroesAmharic: ['እቴጌ ምንትዋብ (ብርሃን ሞገሳ)', 'አፄ ፋሲለደስ'],
      significanceAmharic: 'በዩኔስኮ የተመዘገቡ የፋሲል ግቢ ግንቦችና የብራና ድርሳናት',
      gradientBorder: 'from-[#3b82f6] via-[#6366f1] to-[#9333ea]',
      badgeBg: 'bg-[#3b82f6]/20 text-[#93c5fd] border-[#3b82f6]'
    },
    {
      id: 'unification-19th',
      title: '19th C. Unification & Defiance',
      titleAmharic: 'የ19ኛው መቶ ክ/ዘ አንድነትና ሉዓላዊነት',
      periodAmharic: '1845 – 1881 ዓ.ም',
      battlefieldAmharic: 'መቅደላ፣ ጉንደትና መተማ',
      descriptionAmharic: 'የዘመነ መሳፍንትን ሽኩቻ አብቅተው ሀገርን አንድ ያደረጉበት፤ በመቅደላ፣ በጉንደት፣ በጉራዕና በመተማ ለሉዓላዊነት ክብር የተሰውበት ታላቅ ዘመን።',
      keyHeroesAmharic: ['ዳግማዊ አፄ ቴዎድሮስ', 'አፄ ዮሐንስ ፬ኛ (አባ በዝብዝ)'],
      significanceAmharic: 'የዘመነ መሳፍንት ማብቂያ፣ የጦር መሳሪያ ህዳሴና የመተማ ሰማዕትነት',
      gradientBorder: 'from-[#ef4444] via-[#dc2626] to-[#b91c1c]',
      badgeBg: 'bg-[#ef4444]/20 text-[#fca5a5] border-[#ef4444]'
    },
    {
      id: 'adwa-victory-1896',
      title: 'The Battle of Adwa (1896)',
      titleAmharic: 'የአድዋ ታላቅ ድል (1888 ዓ.ም)',
      periodAmharic: 'የካቲት 23 ቀን 1888 ዓ.ም',
      battlefieldAmharic: 'አድዋ ተራሮች፣ ትግራይ',
      descriptionAmharic: 'መላው የኢትዮጵያ ህዝብ በአንድነት ዘምቶ ወራሪውን የጣሊያን ሰራዊት ድባቅ የመታበትና ኢትዮጵያን የመላው ጥቁር ህዝቦች የነጻነት ተምሳሌት ያደረገ የድል አክሊል።',
      keyHeroesAmharic: ['ዳግማዊ አፄ ምኒልክ', 'እቴጌ ጣይቱ ብጡል', 'ራዕሲ አሉላ አባ ነጋ', 'ደጃዝማች ባልቻ አባ ነፍሶ'],
      significanceAmharic: 'በአፍሪካ ታሪክ ትልቁ የፀረ-ቅኝ ግዛት ወሳኝ ድል',
      gradientBorder: 'from-[#22c55e] via-[#16a34a] to-[#15803d]',
      badgeBg: 'bg-[#22c55e]/20 text-[#86efac] border-[#22c55e]'
    },
    {
      id: 'patriot-resistance-1936',
      title: 'Anti-Fascist Patriot Resistance',
      titleAmharic: 'የ5ቱ አመታት የአርበኝነት ተጋድሎ',
      periodAmharic: '1928 – 1933 ዓ.ም',
      battlefieldAmharic: 'ጮቄ ተራራ፣ አዲስ አበባ፣ ሮም (ጣሊያን)',
      descriptionAmharic: 'በፋሽስት ጣሊያን የጭካኔ ወረራ ወቅት በተራራና በሸለቆዎች አርበኞች አንገት ሳያስደፉ ለ5 አመታት የተዋጉበት፤ በሮም አደባባይ የኢትዮጵያ ሰንደቅ ዓላማ የተውለበለበበት ታሪክ።',
      keyHeroesAmharic: ['በላይ ዘለቀ (አባ ኰስትር)', 'ሸዋረገድ ገድሌ', 'ኮሎኔል አብዲሳ አጋ', 'ጀጋማ ኬሎ', 'ታደሰ ብሩ'],
      significanceAmharic: 'ለ5 አመታት ያልተበገረ ህዝባዊ የአርበኝነት ትግልና የሮም ድል',
      gradientBorder: 'from-[#f97316] via-[#ea580c] to-[#c2410c]',
      badgeBg: 'bg-[#f97316]/20 text-[#fdba74] border-[#f97316]'
    },
    {
      id: 'modern-legends',
      title: 'Modern Legends & Global Triumph',
      titleAmharic: 'ዘመናዊ የኢትዮጵያ ታሪክና የድል አርበኞች',
      periodAmharic: '1908 ዓ.ም – እስከ ዛሬ',
      battlefieldAmharic: 'አዲስ አበባ፣ ሮም፣ ቶኪዮና ባርሴሎና',
      descriptionAmharic: 'የአፍሪካ አንድነት ድርጅት መመስረት፣ የሴት መሪዎች መነሳት፣ የሮምና ቶኪዮ ማራቶን ድሎች እና የባርሴሎናው የመጀመሪያ ጥቁር አፍሪካዊት ኦሎምፒክ ወርቅ።',
      keyHeroesAmharic: ['ቀዳማዊ ኃይለ ሥላሴ', 'ንግሥት ዘውዲቱ', 'ወረደ ማሞ', 'አበበ ቢቂላ', 'ደራርቱ ቱሉ'],
      significanceAmharic: 'የዲፕሎማሲ፣ የትምህርት፣ የሴቶች እኩልነትና የኦሎምፒክ ወርቃማ ድሎች',
      gradientBorder: 'from-[#eab308] via-[#facc15] to-[#ca8a04]',
      badgeBg: 'bg-[#eab308]/20 text-[#fef08a] border-[#eab308]'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#181109] via-[#120a05] to-[#0a0604] border-2 border-[#f59e0b]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Map Grid */}
      <div className="absolute inset-0 bg-cross-pattern opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#078930]/40 via-[#f59e0b]/40 to-[#da121a]/40 border border-[#f59e0b] text-[#fef08a] text-xs font-bold uppercase tracking-wider mb-3 shadow">
            <Compass size={15} className="text-[#fde047]" />
            ታሪካዊ የጦር ሜዳዎችና ታላላቅ ዘመናት
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            የኢትዮጵያ <span className="ethiopia-text-gradient font-black">የማይደበዝዙ ዘመናት</span>
          </h2>
          <p className="text-[#fef3c7] text-sm mt-1.5 max-w-xl leading-relaxed">
            ከአክሱም ጥንታዊ ስልጣኔ እስከ አድዋ ተራሮችና የጮቄ አርበኞች ምሽግ፤ ጀግኖቻችን የተዋደቁባቸውን ታሪካዊ ዘመናት ይምረጡና የየዘመናቱን ቅርጾች ይመልከቱ።
          </p>
        </div>

        {selectedEra !== 'all' && (
          <button
            onClick={() => onSelectEra('all' as any)}
            className="text-xs text-[#fde047] hover:underline font-black flex items-center gap-1 self-start sm:self-auto bg-[#291a0b] px-3.5 py-2 rounded-xl border border-[#f59e0b]/50"
          >
            <span>ሁሉንም ዘመናት አሳይ</span>
            <ChevronRight size={15} />
          </button>
        )}
      </div>

      {/* Epochs Timeline Cards Carousel / Grid in Colorful Palette */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {epochs.map((ep) => {
          const isSelected = selectedEra === ep.id;
          return (
            <div
              key={ep.id}
              onClick={() => onSelectEra(ep.id)}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#382310] via-[#241508] to-[#140b04] border-[#f59e0b] shadow-2xl shadow-[#f59e0b]/25 scale-[1.03]'
                  : 'bg-gradient-to-b from-[#1e1309] to-[#120a05] border-[#422915] hover:border-[#f59e0b]/80 hover:bg-[#25170b]'
              }`}
            >
              <div>
                {/* Period and Location Row */}
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-mono font-bold text-[#fef08a] flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#f59e0b]" />
                    {ep.periodAmharic}
                  </span>
                  <span className="text-[#86efac] flex items-center gap-1 font-bold text-[11px] bg-[#078930]/30 px-2 py-0.5 rounded-full border border-[#22c55e]/40">
                    <MapPin size={11} className="text-red-400" />
                    {ep.battlefieldAmharic}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-black text-white group-hover:text-[#fef08a] transition-colors">
                  {ep.titleAmharic}
                </h3>
                <div className="text-xs text-[#baa994] font-medium mb-3">
                  {ep.title}
                </div>

                <p className="text-xs text-[#fef3c7] leading-relaxed mb-4">
                  {ep.descriptionAmharic}
                </p>
              </div>

              <div>
                {/* Key Heroes in this Era */}
                <div className="pt-3 border-t border-[#3d2714]">
                  <span className="text-[11px] text-[#fde047] uppercase tracking-wider block mb-1.5 font-black">
                    የዚህ ዘመን ታላላቅ ጀግኖች፡
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ep.keyHeroesAmharic.map((hero, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[#2e1d0d] text-[#fef08a] border border-[#f59e0b]/40 font-bold"
                      >
                        {hero}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore button indicator */}
                <div className="mt-4 flex items-center justify-between text-xs font-black text-[#fde047] group-hover:text-[#4ade80] transition-colors">
                  <span>{isSelected ? '✓ የተመረጠው ዘመን' : 'የዚህን ዘመን ቅርጾች ይመልከቱ'}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
