// Audio synthesis and narration utility for Ethiopian Heritage Heroes
// Combines Web Speech API (TTS) and Web Audio API (traditional Ethiopian fanfare chimes)

export interface HeroAudioTrack {
  heroId: string;
  heroName: string;
  heroNameAmharic: string;
  titleAmharic: string;
  amharicHistoryText: string;
  englishHistoryText: string;
  famousQuoteAmharic: string;
  famousQuoteEnglish: string;
}

export const HERO_AUDIO_HISTORIES: Record<string, HeroAudioTrack> = {
  'abebe-bikila': {
    heroId: 'abebe-bikila',
    heroName: 'Captain Abebe Bikila',
    heroNameAmharic: 'ሻምበል አበበ ቢቂላ',
    titleAmharic: 'የማራቶን አባትና የመጀመሪያው አፍሪካዊ የኦሎምፒክ ወርቅ አሸናፊ',
    amharicHistoryText:
      'ሻምበል አበበ ቢቂላ በ1932 ተወልዶ በ1973 ዓ.ም ያረፈ ድንቅ የኢትዮጵያ ጀግና ነው። በ1960 የሮም ኦሎምፒክ ማራቶን በባዶ እግሩ በድንጋያማው ጎዳና ላይ ሮጦ 2 ሰዓት ከ15 ደቂቃ በሆነ አዲስ የዓለም ክብረ-ወሰን በማሸነፍ፣ በኦሎምፒክ ታሪክ የመጀመሪያው ጥቁር አፍሪካዊ የወርቅ ሜዳሊያ አሸናፊ ሆነ። ከአራት አመት በኋላ በቶኪዮ ኦሎምፒክ የቀዶ ህክምና ከተደረገለት ከጥቂት ሳምንታት በኋላ በድጋሚ በታላቅ ብቃት የኦሎምፒክ ማራቶንን በማሸነፍ ታሪክ ሰርቷል። አበበ እንዲህ ብሎ ነበር፦ «ኢትዮጵያ ሁልጊዜም በድልና በቆራጥነት የምትታወቅ ሀገር መሆኗን መላው ዓለም እንዲያውቅ በባዶ እግሬ ሮጥኩ!»',
    englishHistoryText:
      'Captain Abebe Bikila (1932 to 1973) is one of the greatest legends in global sports history. At the 1960 Rome Olympic Games, running barefoot over ancient cobblestones, he won the marathon in a world record time of 2 hours, 15 minutes, becoming the first black African Olympic gold medalist. Four years later at the 1964 Tokyo Olympics, just weeks after surgery, he defended his title with another gold medal. He famously proclaimed: "I wanted the whole world to know that my country, Ethiopia, has always won with determination and heroism."',
    famousQuoteAmharic: '«ኢትዮጵያ ሁልጊዜም በድልና በቆራጥነት የምትታወቅ ሀገር መሆኗን ዓለም እንዲያውቅ በባዶ እግሬ ሮጥኩ!»',
    famousQuoteEnglish: 'I wanted the world to know that Ethiopia has always won with determination and heroism.'
  },
  'menelik-ii': {
    heroId: 'menelik-ii',
    heroName: 'Emperor Menelik II',
    heroNameAmharic: 'ዳግማዊ አፄ ምኒልክ',
    titleAmharic: 'እምዬ ምኒልክ (አባ ዳኘው) • የአድዋ ድል መሪ',
    amharicHistoryText:
      'ዳግማዊ አፄ ምኒልክ ከ1844 እስከ 1913 ዓ.ም የኖሩ፣ ኢትዮጵያን አንድ ያደረጉና ያዘመኑ ታላቅ ንጉሠ ነገሥት ናቸው። የካቲት 23 ቀን 1888 ዓ.ም መላው የኢትዮጵያ ህዝብ ከየአቅጣጫው ተሰልፎ እንዲዘምት በማድረግ በአድዋ ተራሮች ላይ ወራሪውን የጣሊያን ጦር ድባቅ መቱ። ይህ ድል አፍሪካንና መላውን ጥቁር ህዝብ የነጻነት ተምሳሌት አደረገ። በተጨማሪም ዘመናዊ ባቡርን፣ ስልክን፣ ትምህርት ቤቶችንና ሆስፒታሎችን በመገንባት ዘመናዊቷን ኢትዮጵያ መሰረቱ።',
    englishHistoryText:
      'Emperor Menelik II (1844 to 1913) was the transformative monarch who united modern Ethiopia and defended its sovereignty. On March 1, 1896, at the Battle of Adwa, he mobilized Ethiopians from every region to decisively defeat colonial invaders, cementing Ethiopia as an enduring beacon of African freedom. He introduced railways, schools, telegraphs, and established modern state infrastructure.',
    famousQuoteAmharic: '«እግዚአብሔር በቸርነቱ እስካሁን ጠበቀኝ፤ ጠላቴም ድንበር አልፎ መጥቷልና ጉልበት ያለህ በጉልበትህ፣ የሌለህም በጸሎትህ እርዳኝ!»',
    famousQuoteEnglish: 'United the nation. Defended its sovereignty. A builder of modern Ethiopia.'
  },
  'taytu-betul': {
    heroId: 'taytu-betul',
    heroName: 'Empress Taytu Betul',
    heroNameAmharic: 'እቴጌ ጣይቱ ብጡል',
    titleAmharic: 'ብርሃን ዘኢትዮጵያ • የአድዋ ቁልፍ ስትራቴጂስትና የአዲስ አበባ መስራች',
    amharicHistoryText:
      'እቴጌ ጣይቱ ብጡል (1842 – 1918) የኢትዮጵያ ታላቅ እቴጌ፣ የዲፕሎማሲና የጦር ስትራቴጂስት ነበሩ። በውጫሌ ውል ላይ የተሸረበውን ተንኮል ውድቅ በማድረግ «እኔ ሴት ነኝ ጦርነት አልወድም፤ ነገር ግን ሀገሬን የውጭ ጥገኛ ከሚያደርግ ሞትን እመርጣለሁ» በማለት ሉዓላዊነታችንን አስከበሩ። በአድዋ ጦርነት የጠላትን የውሃ ጉድጓድ በመቆጣጠር ወሳኝ ድል እንዲገኝ አድርገዋል፤ እንዲሁም ውቧን አዲስ አበባን የመሰረቱ ፈር ቀዳጅ መሪ ናቸው።',
    englishHistoryText:
      'Empress Taytu Betul (1842 to 1918) was a supreme strategist, diplomat, and statesman. She fiercely rejected colonial subjugation under the deceptive Wuchale Treaty and personally commanded artillery forces at the Battle of Adwa, cutting off enemy water supplies at Enda Yesus to secure victory. She also chose the hot springs of Finfinnee to establish the capital, Addis Ababa.',
    famousQuoteAmharic: '«እኔ ሴት ነኝ ጦርነት አልወድም፤ ነገር ግን ሀገሬን የውጭ ጥገኛ ከሚያደርግ ሞትን እመርጣለሁ!»',
    famousQuoteEnglish: 'A political leader. A symbol of strength. A bridge between tradition and progress.'
  },
  'ras-alula': {
    heroId: 'ras-alula',
    heroName: 'Ras Alula Engida (Abba Nega)',
    heroNameAmharic: 'ራዕሲ አሉላ እንግዳ (አባ ነጋ)',
    titleAmharic: 'የዶጋሊውና የአድዋው አንበሳ • የማይበገረው የጦር አበጋዝ',
    amharicHistoryText:
      'ራዕሲ አሉላ እንግዳ አባ ነጋ (1847 – 1897) በ19ኛው መቶ ክፍለ ዘመን ከታዩት ታላላቅ የአፍሪካ ወታደራዊ መሪዎች አንዱ ናቸው። በ1887 በዶጋሊ ጦርነት የቅኝ ገዢዎችን ጦር ድባቅ የመቱ ሲሆን፣ በአድዋ ጦርነትም ግንባር ቀደም የጦር አበጋዝ በመሆን የጠላትን ኃይል ደመሰሱ። የውጭ ጋዜጦች «የአፍሪካው ጋሪባልዲ» ብለው ይጠሯቸው ነበር። ለሀገራቸው ዳር ድንበር ዘብ የቆሙ ታላቅ አርበኛ ናቸው።',
    englishHistoryText:
      'Ras Alula Engida, known as Abba Nega (1847 to 1897), was one of the most brilliant African military tacticians of the 19th century. He crushed colonial invaders at Dogali in 1887 and commanded the vanguard of the imperial army at the Battle of Adwa in 1896, fiercely safeguarding the northern borders of Ethiopia.',
    famousQuoteAmharic: '«የኢትዮጵያን ዳር ድንበር የሚደፍር ጠላት በሕይወቴ እያለሁ አያልፍም!»',
    famousQuoteEnglish: 'A fearless leader. A defender of Ethiopia. A champion of freedom.'
  },
  'haile-selassie-i': {
    heroId: 'haile-selassie-i',
    heroName: 'Emperor Haile Selassie I',
    heroNameAmharic: 'ቀዳማዊ አፄ ኃይለ ሥላሴ',
    titleAmharic: 'የሰላም ተሟጋች፣ የሊግ ኦፍ ኔሽንስ መሪና የአፍሪካ ህብረት መስራች',
    amharicHistoryText:
      'ቀዳማዊ አፄ ኃይለ ሥላሴ (1892 – 1975) ኢትዮጵያን ለግማሽ ምዕተ-አመት የመሩ ዓለም አቀፍ ዲፕሎማት ነበሩ። በ1936 በሊግ ኦፍ ኔሽንስ አደባባይ ቆመው «ዛሬ እኛ ላይ የደረሰው ነገ እናንተ ላይ ይደርሳል!» በማለት ዓለምን ያስጠነቀቁበት ታሪካዊ ንግግር በዓለም ዲፕሎማሲ ታሪክ ውስጥ የማይረሳ አሻራ ጥሏል። በ1963 የአፍሪካ አንድነት ድርጅት ዋና መቀመጫውን በአዲስ አበባ እንዲያደርግ በማስተባበር የአፍሪካ አህጉር ነጻነትና አንድነት ፈር ቀዳጅ አባት ሆነዋል።',
    englishHistoryText:
      'Emperor Haile Selassie I (1892 to 1975) was a global statesman and leader of African independence. At the League of Nations in Geneva in 1936, he gave his prophetic speech warning the world of fascist aggression: "It is us today, it will be you tomorrow." In 1963, he co-founded the Organization of African Unity in Addis Ababa, leading African decolonization and modern diplomacy.',
    famousQuoteAmharic: '«ዛሬ እኛ ላይ የደረሰው ነገ እናንተ ላይ ይደርሳል! ሰላም የሚገኘው በፍትህና በእኩልነት ብቻ ነው!»',
    famousQuoteEnglish: 'A modernizer. A peace advocate. A global statesman.'
  },
  'zewditu': {
    heroId: 'zewditu',
    heroName: 'Empress Zewditu',
    heroNameAmharic: 'ንግሥተ ነገሥታት ዘውዲቱ',
    titleAmharic: 'የመጀመሪያዋ ሴት ንግሥተ ነገሥታት (1876 – 1930)',
    amharicHistoryText:
      'ንግሥተ ነገሥታት ዘውዲቱ የዳግማዊ አፄ ምኒልክ ልጅ ሲሆኑ፣ ከ1916 እስከ 1930 ዓ.ም ድረስ ኢትዮጵያን በንግሥተ ነገሥታትነት የመሩ ታላቅ መሪ ናቸው። በ20ኛው መቶ ክፍለ ዘመን የመጀመሪያዋ የአፍሪካ ሴት የሀገር መሪ በመሆን በዓለም አቀፍ ደረጃ ታውቀዋል። እጅግ ፈሪሃ እግዚአብሔር ያላቸው፣ ደጋግ፣ ህፃናትንና አረጋውያንን የሚረዱና ለሀገራቸው ሰላም ሌት ተቀን የሚተጉ እውነተኛ እናት ነበሩ።',
    englishHistoryText:
      'Empress Zewditu (1876 to 1930), daughter of Emperor Menelik II, reigned as the first female head of state of an internationally recognized African nation in the 20th century. Revered for her deep faith, compassion, and commitment to peace, she preserved Ethiopian sovereignty and laid the ground for modern institutions.',
    famousQuoteAmharic: '«እኔ ሴት ብሆንም በኢትዮጵያ ዙፋን ላይ የተቀመጥኩት በፈጣሪ ፈቃድና በህዝቤ ፍቅር ነው፤ ለሀገሬ ሰላምና አንድነት እተጋለሁ!»',
    famousQuoteEnglish: 'The first female emperor. A symbol of hope. A leader for her people.'
  },
  'werede-mamo': {
    heroId: 'werede-mamo',
    heroName: 'Werede Mamo',
    heroNameAmharic: 'ወይዘሮ ወረደ ማሞ',
    titleAmharic: 'ፈር ቀዳጅ የትምህርት መሪና የሴቶች መብት ተሟጋች (1885 – 1936)',
    amharicHistoryText:
      'ወይዘሮ ወረደ ማሞ (1885 – 1936) በኢትዮጵያ ታሪክ ውስጥ ለሴት ልጆች ትምህርት መስፋፋት፣ ለንባብና ለእኩልነት የደከሙ ታላቅ ፈር ቀዳጅ ናቸው። በወቅቱ የነበረውን ባህላዊ ጫና ተቋቁመው ሴቶች እንዲማሩ፣ መጽሐፍትን እንዲያነቡና በህብረተሰብ ውስጥ የራሳቸው ድምፅ እንዲኖራቸው ትምህርት ቤቶችንና ማህበራትን አቋቁመዋል። «የሴት ልጆች መማር የሀገር ሁሉ ብርሃን ነው» የሚለው ቃላቸው ዛሬም ድረስ በትምህርት አለም ያበራል።',
    englishHistoryText:
      'Werede Mamo (1885 to 1936) was a pioneering Ethiopian educator, social reformer, and champion of women’s literacy. Breaking traditional barriers, she advocated passionately for girls’ schools and education across towns and villages, declaring that educating a girl child brings enlightenment and salvation to the entire nation.',
    famousQuoteAmharic: '«የሴት ልጆች መማር የሀገር ሁሉ መዳንና ብርሃን ነው! እውቀትና ንባብ ለሴቶች ነጻነትን ያጎናጽፋል።»',
    famousQuoteEnglish: 'An educator. A feminist. A voice for women’s rights.'
  },
  'tewodros-ii': {
    heroId: 'tewodros-ii',
    heroName: 'Emperor Tewodros II',
    heroNameAmharic: 'ዳግማዊ አፄ ቴዎድሮስ (ካሳ)',
    titleAmharic: 'የመቅደላው ጀግና (አባ ታጠቅ)',
    amharicHistoryText:
      'ዳግማዊ አፄ ቴዎድሮስ (1818 – 1868) የተበታተነችውን ኢትዮጵያን አንድ በማድረግ ዘመናዊ መንግሥት የመሰረቱ ህልመኛ መሪ ናቸው። በጋፋት ግዙፉን ሰባስቶፖል መድፍ በማሰራት የኢንዱስትሪ ህዳሴ ጀመሩ። በመቅደላ አምባ ላይ ለጠላት እጅ አልሰጥም በማለት በክብር የተሰው የሀገር ፍቅር ምልክት ናቸው።',
    englishHistoryText:
      'Emperor Tewodros II (1818 to 1868) brought an end to the Era of the Princes by unifying Ethiopia. A visionary modernizer, he built indigenous foundries including the Sebastopol mortar and chose death over surrender at Mount Meqdela.',
    famousQuoteAmharic: '«ሀገራችሁን በሙሉ ልባችሁ ውደዱ፤ በክብር ኑሩ!»',
    famousQuoteEnglish: 'Stand tall with honor and love your country with all your heart!'
  }
};

// Play traditional fanfare chime using Web Audio API
export const playEthiopianFanfareChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Ethiopian pentatonic scale chords (Anchihoye / Tizita notes)
    const notes = [293.66, 329.63, 392.00, 440.00, 587.33];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      gain.gain.setValueAtTime(0.001, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.18, now + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.95);
    });
  } catch {
    // ignore
  }
};

// Play spoken historical biography using Web Speech API
export const speakHeroHistory = (
  heroId: string,
  language: 'AM' | 'EN' = 'AM',
  onStart?: () => void,
  onEnd?: () => void
): (() => void) => {
  playEthiopianFanfareChime();

  if (!('speechSynthesis' in window)) {
    if (onStart) onStart();
    const timeout = setTimeout(() => {
      if (onEnd) onEnd();
    }, 6000);
    return () => clearTimeout(timeout);
  }

  window.speechSynthesis.cancel();

  const track = HERO_AUDIO_HISTORIES[heroId] || HERO_AUDIO_HISTORIES['abebe-bikila'];
  const textToSpeak = language === 'AM' ? track.amharicHistoryText : track.englishHistoryText;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = language === 'AM' ? 0.9 : 0.95;
  utterance.pitch = 1.0;

  // Search for preferred voices
  const voices = window.speechSynthesis.getVoices();
  if (language === 'AM') {
    const amVoice = voices.find(v => v.lang.startsWith('am') || v.lang.includes('ET'));
    if (amVoice) {
      utterance.voice = amVoice;
    }
  } else {
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Male')));
    if (enVoice) {
      utterance.voice = enVoice;
    }
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
};

export const stopHeroHistory = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

