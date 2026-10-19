import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Crown,
  Award,
  Sparkles,
  Bookmark,
  Volume2,
  VolumeX,
  RotateCw,
  MapPin,
  Layers,
  X,
  Move3d,
  ChevronRight,
  ShoppingBag,
  Flame,
  Check,
  Compass
} from 'lucide-react';
import { Currency, Language, DollProduct } from '../types';
import { ETHIOPIAN_HEROES } from '../data/heroes';
import confetti from 'canvas-confetti';

interface Heroines3DPavilionProps {
  currency: Currency;
  language: Language;
  onAddToCart: (product: DollProduct, customEngraving?: string, quantity?: number) => void;
  initialHeroineId?: string;
}

interface HeroineConfig {
  id: string;
  name: string;
  nameAmharic: string;
  title: string;
  titleAmharic: string;
  years: string;
  tagline: string;
  taglineAmharic: string;
  plaqueColor: string;
  plaqueBorder: string;
  accentColor: string;
  avatarUrl: string;
  dollModel: {
    dressColor: number;
    sashColor1: string;
    sashColor2: string;
    sashColor3: string;
    hasCrown: boolean;
    crownType: 'tiara' | 'zewditu' | 'axum' | 'gondar' | 'netela' | 'olympic';
    skinTone: number;
    accessory: 'cross' | 'scroll' | 'chalice' | 'medal' | 'dispatch' | 'none';
  };
  hotspots: {
    id: string;
    title: string;
    titleAmharic: string;
    category: string;
    categoryAmharic: string;
    icon: 'crown' | 'award' | 'sparkles' | 'bookmark';
    pos: [number, number, number];
    camTarget: [number, number, number];
    camPos: [number, number, number];
    period: string;
    significance: string;
    significanceAmharic: string;
    description: string;
    descriptionAmharic: string;
  }[];
}

const HEROINES_LIST: HeroineConfig[] = [
  {
    id: 'taytu-betul',
    name: 'Empress Taytu Betul',
    nameAmharic: 'እቴጌ ጣይቱ ብጡል',
    title: 'Empress of Wisdom & Strategic Genius of Adwa',
    titleAmharic: 'የጥበቧ እቴጌና የአድዋ ስትራቴጂስት',
    years: '1842 – 1918',
    tagline: 'Strategic Commander of the Battle of Adwa & Founder of Addis Ababa',
    taglineAmharic: 'የአዲስ አበባ መስራችና የመቀሌን ውኃ በማስቆረጥ ታላቁን ድል ያበሰሩ ጀግና እናት',
    plaqueColor: '#1a0610',
    plaqueBorder: '#f43f5e',
    accentColor: '#f43f5e',
    avatarUrl: '/empress_taytu_betul_official.png',
    dollModel: {
      dressColor: 0xfffcf7,
      sashColor1: '#059669',
      sashColor2: '#facc15',
      sashColor3: '#e11d48',
      hasCrown: true,
      crownType: 'tiara',
      skinTone: 0x713f12,
      accessory: 'cross'
    },
    hotspots: [
      {
        id: 'tiara',
        title: 'Imperial Golden Tiara',
        titleAmharic: 'ንጉሣዊ የወርቅ አክሊል',
        category: 'Regalia',
        categoryAmharic: 'የንግሥና ክብር',
        icon: 'crown',
        pos: [0, 3.2, 0.15],
        camTarget: [0, 3.05, 0],
        camPos: [0, 3.25, 1.8],
        period: '1889 – 1913',
        significance: 'Empress Regnant & Co-Ruler',
        significanceAmharic: 'የኢትዮጵያ ሉዓላዊነት መገለጫ',
        description: 'Imperial golden tiara adorned with ruby points, symbolizing Taytu’s commanding diplomatic authority.',
        descriptionAmharic: 'በከበሩ ማዕድናት የተዋበ የወርቅ አክሊል፤ የእቴጌ ጣይቱን ዲፕሎማሲያዊና ወታደራዊ ልዕልና የሚያንጸባርቅ ነው።'
      },
      {
        id: 'cross',
        title: 'Orthodox Cross Choker',
        titleAmharic: 'የመስቀል ሐብል',
        category: 'Faith',
        categoryAmharic: 'ሃይማኖታዊ ክብር',
        icon: 'sparkles',
        pos: [0, 2.45, 0.35],
        camTarget: [0, 2.4, 0],
        camPos: [0, 2.5, 1.7],
        period: 'Solomonic Heritage',
        significance: 'Steadfast Faith at Adwa',
        significanceAmharic: 'የጸና እምነት መለያ',
        description: 'Traditional handcrafted Orthodox cross pendant worn into battle for divine guidance.',
        descriptionAmharic: 'በአድዋ ዘመቻ ወቅት ለአምላካቸው የነበራቸውን ጽኑ እምነት የሚያሳይ በእጅ የተጠነሰሰ መስቀል።'
      },
      {
        id: 'sash',
        title: 'Adwa Victory Tibeb Sash',
        titleAmharic: 'የአድዋ ድል ጥበብ ሻሽ',
        category: 'Military Honor',
        categoryAmharic: 'የጦር ሜዳ ጀግንነት',
        icon: 'award',
        pos: [-0.35, 1.85, 0.45],
        camTarget: [-0.1, 1.75, 0],
        camPos: [-0.55, 1.95, 2.0],
        period: '1896 Adwa Victory',
        significance: 'Commander of Adwa Reserve',
        significanceAmharic: 'የድል አርበኝነት',
        description: 'Woven with gold tassel fringes, celebrating her military brilliance at Mekelle and Adwa.',
        descriptionAmharic: 'በወርቃማ ዘርፍ የተዋበ ባለሶስት ቀለም ሻሽ፤ በመቀሌና በአድዋ ያሳዩትን ታላቅ ብልሃት ያዘክራል።'
      },
      {
        id: 'plaque',
        title: 'Adwa Command Memorial Plaque',
        titleAmharic: 'የአድዋ መታሰቢያ ጽላት',
        category: 'Memorial',
        categoryAmharic: 'የክብር ጽላት',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: '1842 – 1918',
        significance: 'Light of Ethiopia',
        significanceAmharic: 'ብርሃን ዘኢትዮጵያ',
        description: 'Beveled plinth honoring the founder of Addis Ababa and sovereign defender of Ethiopia.',
        descriptionAmharic: '«እቴጌ ጣይቱ ብጡል — የጥበቧ እቴጌና የአዲስ አበባ መስራች» የሚል ጽሑፍ ያረፈበት ጽላት።'
      }
    ]
  },
  {
    id: 'zewditu',
    name: 'Empress Zewditu',
    nameAmharic: 'ንግሥተ ነገሥታት ዘውዲቱ',
    title: 'First Female Head of State of Modern Africa',
    titleAmharic: 'በዘመናዊት አፍሪካ የመጀመሪያዋ ሴት መሪ',
    years: '1876 – 1930',
    tagline: 'Daughter of Menelik II, Symbol of Peace, Compassion and Solomonic Continuity',
    taglineAmharic: 'የዳግማዊ አፄ ምኒልክ ልጅ፣ የሰላምና የፍቅር ተምሳሌት እንዲሁም የአንድነት ምልክት',
    plaqueColor: '#0a0a0c',
    plaqueBorder: '#f59e0b',
    accentColor: '#f59e0b',
    avatarUrl: '/empress_zewditu_crop.png',
    dollModel: {
      dressColor: 0xfbf9f5,
      sashColor1: '#059669',
      sashColor2: '#facc15',
      sashColor3: '#dc2626',
      hasCrown: true,
      crownType: 'zewditu',
      skinTone: 0x764b32,
      accessory: 'cross'
    },
    hotspots: [
      {
        id: 'crown',
        title: 'Imperial Ethiopian Coronation Crown',
        titleAmharic: 'ንጉሣዊ የወርቅ ዘውድ',
        category: 'Regalia',
        categoryAmharic: 'የንግሥና ክብር',
        icon: 'crown',
        pos: [0, 3.25, 0.15],
        camTarget: [0, 3.1, 0],
        camPos: [0, 3.3, 1.8],
        period: 'November 11, 1917',
        significance: 'Solemn Empress Regnant',
        significanceAmharic: 'የኢትዮጵያ ንግሥተ ነገሥታት ክብር',
        description: 'High-crested golden crown worn at her coronation in St. George’s Cathedral.',
        descriptionAmharic: 'በቅዱስ ጊዮርጊስ ካቴድራል በንግሥና በዓላቸው ላይ ያደረጉት ባለብዙ ፎቅ የወርቅ ዘውድ።'
      },
      {
        id: 'sash',
        title: 'Imperial Order Sash',
        titleAmharic: 'ንጉሣዊ ባለቀለም ሻሽ',
        category: 'Royal Insignia',
        categoryAmharic: 'የመንግሥት መለያ ምልክት',
        icon: 'award',
        pos: [-0.35, 1.9, 0.45],
        camTarget: [-0.1, 1.8, 0],
        camPos: [-0.6, 2.0, 2.0],
        period: 'Solomonic Dynasty',
        significance: 'Order of Solomon',
        significanceAmharic: 'የሰሎሞናዊ መንግሥት ክብር',
        description: 'Draped diagonally across her chest representing eternal Solomonic sovereignty.',
        descriptionAmharic: 'በትከሻቸው ላይ ያረፈው አረንጓዴ፣ ቢጫና ቀይ የሰንደቅ አላማ ጥበብ ሻሽ።'
      },
      {
        id: 'dress',
        title: 'Pleated Royal Habesha Kemis',
        titleAmharic: 'ንጹህ ነጭ የሐበሻ ቀሚስ',
        category: 'Traditional Attire',
        categoryAmharic: 'ባህላዊ የንጉሣዊ ልብስ',
        icon: 'sparkles',
        pos: [0, 0.95, 0.55],
        camTarget: [0, 1.0, 0],
        camPos: [0, 1.2, 2.6],
        period: 'Hand-woven Cotton (Shemma)',
        significance: 'Cultural Identity & Modesty',
        significanceAmharic: 'ባህላዊ ውበትና ንጽህና',
        description: 'Pristine white cotton Habesha Kemis reflecting deep Christian devotion and Ethiopian identity.',
        descriptionAmharic: 'ከንጹህ የሀገር ጥጥ በእጅ የተሸመነ ነጭ የሐበሻ ቀሚስ በወርቃማ ጥልፍ የተዋበ።'
      },
      {
        id: 'plaque',
        title: 'Museum Pedestal & Inscription',
        titleAmharic: 'የክብር ጽላት ሰሌዳ',
        category: 'Historical Memorial',
        categoryAmharic: 'ታሪካዊ የመታሰቢያ ሰሌዳ',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: '1876 – 1930',
        significance: 'First Female Emperor',
        significanceAmharic: 'በዘመናዊት አፍሪካ የመጀመሪያዋ ሴት መሪ',
        description: 'Inscribed brass plinth immortalizing Empress Zewditu as a symbol of unity and hope.',
        descriptionAmharic: '«ንግሥተ ነገሥታት ዘውዲቱ (1876 – 1930) • የሰላምና የፍቅር ተምሳሌት» የሚል ጽሑፍ።'
      }
    ]
  },
  {
    id: 'queen-of-sheba',
    name: 'Queen of Sheba (Makeda)',
    nameAmharic: 'ንግሥት ሳባ (ማክዳ)',
    title: 'Sovereign of Axum & Mother of the Solomonic Line',
    titleAmharic: 'የጥንታዊቷ አክሱም ንግሥትና የጥበብ ምንጭ',
    years: '10th Century BC',
    tagline: 'Ancient Queen of Wisdom who Traveled to King Solomon and Birthed Emperor Menelik I',
    taglineAmharic: 'ጥበብን ፍለጋ ወደ ንጉሥ ሰሎሞን የተጓዘችና የቀዳማዊ ምኒልክ እናት የሆነች ታላቅ ንግሥት',
    plaqueColor: '#1a1005',
    plaqueBorder: '#f59e0b',
    accentColor: '#eab308',
    avatarUrl: '/sheba_queen_crop.png',
    dollModel: {
      dressColor: 0x881337, // Royal crimson silk
      sashColor1: '#d97706',
      sashColor2: '#fbbf24',
      sashColor3: '#b45309',
      hasCrown: true,
      crownType: 'axum',
      skinTone: 0x784a29,
      accessory: 'chalice'
    },
    hotspots: [
      {
        id: 'diadem',
        title: 'Ancient Axumite Sun Diadem',
        titleAmharic: 'የጥንታዊት አክሱም የወርቅ አክሊል',
        category: 'Ancient Regalia',
        categoryAmharic: 'ጥንታዊ የንግሥና አክሊል',
        icon: 'crown',
        pos: [0, 3.25, 0.15],
        camTarget: [0, 3.1, 0],
        camPos: [0, 3.3, 1.8],
        period: '10th Century BC',
        significance: 'Axumite Sun & Crescent Sovereignty',
        significanceAmharic: 'የጥንታዊቷ አክሱም ልዕልና',
        description: 'High golden Axumite diadem adorned with celestial sun discs and lapis lazuli stones.',
        descriptionAmharic: 'በፀሐይና በጨረቃ ቅርጽ የተዋበ ጥንታዊ የአክሱም የወርቅ ዘውድ።'
      },
      {
        id: 'chalice',
        title: 'Golden Frankincense Chalice',
        titleAmharic: 'የዕጣንና የሽቱ የወርቅ ጽዋ',
        category: 'Sacred Offerings',
        categoryAmharic: 'የክብር ስጦታ',
        icon: 'sparkles',
        pos: [0.35, 1.45, 0.4],
        camTarget: [0.2, 1.4, 0],
        camPos: [0.4, 1.5, 1.8],
        period: 'Journey to Jerusalem',
        significance: 'Spices, Gold & Pure Frankincense',
        significanceAmharic: 'ታላላቅ የጥበብ ስጦታዎች',
        description: 'Golden offering chalice representing the pure frankincense, myrrh, and gold she brought to Jerusalem.',
        descriptionAmharic: 'ወደ እየሩሳሌም ይዛ የተጓዘችውን ውድ ዕጣን፣ ከርቤና ንጹህ ወርቅ የሚያመላክት የወርቅ ጽዋ።'
      },
      {
        id: 'robes',
        title: 'Royal Crimson & Gold Axumite Silk',
        titleAmharic: 'የንግሥና ቀይና ወርቃማ የሐር ልብስ',
        category: 'Ancient Silk',
        categoryAmharic: 'ጥንታዊ ንጉሣዊ ሐር',
        icon: 'award',
        pos: [0, 1.5, 0.5],
        camTarget: [0, 1.5, 0],
        camPos: [0, 1.6, 2.2],
        period: 'Axumite Empire',
        significance: 'Sabaean Elegance',
        significanceAmharic: 'የንግሥተ ሳባ ግርማ ሞገስ',
        description: 'Rich crimson robes spun with gold threading and a wide jeweled pectoral collar necklace.',
        descriptionAmharic: 'በወርቅ ክሮች የተሸመነ ቀይ የሐር ልብስና ደረቷ ላይ ያረፈ የወርቅ ድሪ።'
      },
      {
        id: 'plaque',
        title: 'Queen Makeda Axum Plaque',
        titleAmharic: 'የንግሥት ሳባ ጥንታዊ ጽላት',
        category: 'Historical Inscription',
        categoryAmharic: 'ታሪካዊ ጽላት',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: '10th Century BC',
        significance: 'Mother of the Solomonic Line',
        significanceAmharic: 'የሰሎሞናውያን ስርወ-መንግሥት እናት',
        description: 'Engraved granite pedestal inscribed in Ge’ez and English honoring Queen Makeda’s legendary legacy.',
        descriptionAmharic: '«ንግሥት ሳባ (ማክዳ) — የጥበብና የዕውቀት ምንጭ፣ የቀዳማዊ ምኒልክ እናት» የሚል ጽላት።'
      }
    ]
  },
  {
    id: 'shewareged-gadle',
    name: 'Woizero Shewareged Gadle',
    nameAmharic: 'ወይዘሮ ሸዋረገድ ገድሌ',
    title: 'The Mother of Patriots & Secret Spy Leader',
    titleAmharic: 'የአርበኞች እናትና የምስጢር መረጃ መሪ',
    years: '1898 – 1946',
    tagline: 'Fearless Patriot who Financed the Resistance and Infiltrated Enemy Forts',
    taglineAmharic: 'ሀብቷን ለአርበኞች የሰጠች፣ የጠላትን ወህኒ ቤት ሰብራ አርበኞችን ያስፈታች ጀግና እናት',
    plaqueColor: '#0c1a10',
    plaqueBorder: '#10b981',
    accentColor: '#10b981',
    avatarUrl: '/shewareged_gadle_crop.png',
    dollModel: {
      dressColor: 0x064e3b, // Emerald green royal Kemis
      sashColor1: '#059669',
      sashColor2: '#facc15',
      sashColor3: '#dc2626',
      hasCrown: false,
      crownType: 'netela',
      skinTone: 0x6b3f21,
      accessory: 'dispatch'
    },
    hotspots: [
      {
        id: 'netela',
        title: 'Patriot Matriarch Netela',
        titleAmharic: 'የአርበኞች እናት ነጠላ',
        category: 'Patriot Attire',
        categoryAmharic: 'የአርበኝነት ነጠላ',
        icon: 'crown',
        pos: [0, 3.15, 0.15],
        camTarget: [0, 3.0, 0],
        camPos: [0, 3.2, 1.8],
        period: '1936 – 1941',
        significance: 'Symbol of Courage & Sacrifice',
        significanceAmharic: 'የጽናትና የጀግንነት ምልክት',
        description: 'Draped cotton Netela headscarf embodying the quiet bravery of Ethiopian women resistance leaders.',
        descriptionAmharic: 'የአርበኞች እናት ወይዘሮ ሸዋረገድ ገድሌ የምስጢር ተልዕኮዎችን ስታስተባብር ያደረገችው ነጠላ።'
      },
      {
        id: 'dispatch',
        title: 'Underground Courier Intelligence',
        titleAmharic: 'የምስጢር የስለላ ሰነድ',
        category: 'Intelligence',
        categoryAmharic: 'የስለላ መረጃ',
        icon: 'sparkles',
        pos: [0.35, 1.45, 0.4],
        camTarget: [0.2, 1.4, 0],
        camPos: [0.4, 1.5, 1.8],
        period: 'Addis Ababa Underground',
        significance: 'Liberating Prisoners & Weapon Smuggling',
        significanceAmharic: 'አርበኞችን ማስፈታትና መረጃ ማቀበል',
        description: 'Secret battle dispatches she smuggled across Italian checkpoints to supply freedom fighters.',
        descriptionAmharic: 'የጠላትን ፍተሻ በብልሃት አልፋ ለአርበኞች የምታቀብለው የጦር መረጃና ጥይት።'
      },
      {
        id: 'dress',
        title: 'Emerald Green Royal Kemis',
        titleAmharic: 'ደማቅ አረንጓዴ የሐበሻ ቀሚስ',
        category: 'Traditional Kemis',
        categoryAmharic: 'ባህላዊ ቀሚስ',
        icon: 'award',
        pos: [0, 1.5, 0.5],
        camTarget: [0, 1.5, 0],
        camPos: [0, 1.6, 2.2],
        period: 'Patriot Era',
        significance: 'Hope & Rebirth of Freedom',
        significanceAmharic: 'የነጻነት ተስፋና ክብር',
        description: 'Handcrafted emerald dress with golden tibeb trim signifying the fertile green of a liberated motherland.',
        descriptionAmharic: 'የኢትዮጵያ ለምለም ምድር በነጻነት እንድትቆም ያላትን ጽኑ ፍላጎት የሚያሳይ አረንጓዴ ቀሚስ።'
      },
      {
        id: 'plaque',
        title: 'Mother of Patriots Memorial Plaque',
        titleAmharic: 'የአርበኞች እናት መታሰቢያ ጽላት',
        category: 'Memorial',
        categoryAmharic: 'የክብር ጽላት',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: '1898 – 1946',
        significance: 'Lioness of Freedom',
        significanceAmharic: 'የነጻነት አንበሳ',
        description: 'Commemorating Woizero Shewareged Gadle, jailed and tortured for freedom yet never betraying her country.',
        descriptionAmharic: '«ወይዘሮ ሸዋረገድ ገድሌ — የአርበኞች እናትና የማይበገር የነጻነት ተምሳሌት» የሚል ጽላት።'
      }
    ]
  },
  {
    id: 'empress-mentewab',
    name: 'Empress Mentewab',
    nameAmharic: 'እቴጌ ምንትዋብ (ብርሃን ሞገሳ)',
    title: 'Empress of Gondar & Patron of Arts and Faith',
    titleAmharic: 'የጎንደር ንግሥትና የታላቁ ህዳሴ እናት',
    years: '1706 – 1773',
    tagline: 'Gondarine Renaissance Sovereign who Built Qwesqwam and Ruled as Queen Mother',
    taglineAmharic: 'የቁስቋምን ቤተ-መንግሥትና አድባራት ያነጸች፣ የኪነ-ጥበብና የዕውቀት ጠባቂ እቴጌ',
    plaqueColor: '#170b20',
    plaqueBorder: '#a855f7',
    accentColor: '#a855f7',
    avatarUrl: '/mentewab_crop.png',
    dollModel: {
      dressColor: 0x581c87, // Royal purple velvet
      sashColor1: '#9333ea',
      sashColor2: '#fbbf24',
      sashColor3: '#ec4899',
      hasCrown: true,
      crownType: 'gondar',
      skinTone: 0x764b32,
      accessory: 'scroll'
    },
    hotspots: [
      {
        id: 'crown',
        title: 'Gondarine Dual-Tier Pearl Crown',
        titleAmharic: 'የጎንደር ባለሁለት ፎቅ የዕንቁ ዘውድ',
        category: 'Renaissance Regalia',
        categoryAmharic: 'የህዳሴ ዘውድ',
        icon: 'crown',
        pos: [0, 3.25, 0.15],
        camTarget: [0, 3.1, 0],
        camPos: [0, 3.3, 1.8],
        period: '18th Century Gondar',
        significance: 'Berhan Mogasa Imperial Splendor',
        significanceAmharic: 'የብርሃን ሞገሳ ንግሥና',
        description: 'Exquisite dual-tiered golden crown set with River Tana pearls, representing the Gondar golden era.',
        descriptionAmharic: 'የጣና ሐይቅ ዕንቁዎች ያረፉበትና የጎንደርን ወርቃማ ዘመን የሚያበስር ባለሁለት ፎቅ ዘውድ።'
      },
      {
        id: 'scroll',
        title: 'Qwesqwam Illuminated Manuscript',
        titleAmharic: 'የቁስቋም ብራና መጽሐፍ',
        category: 'Patron of Arts',
        categoryAmharic: 'የኪነ-ጥበብ ጥበቃ',
        icon: 'sparkles',
        pos: [0.35, 1.45, 0.4],
        camTarget: [0.2, 1.4, 0],
        camPos: [0.4, 1.5, 1.8],
        period: '1730 – 1755',
        significance: 'Patron of Scribes & Painters',
        significanceAmharic: 'የብራና ጽሑፎች ጠባቂ',
        description: 'Illuminated Ge’ez Gospel scroll created by master Gondarine painters under her imperial sponsorship.',
        descriptionAmharic: 'በእቴጌ ምንትዋብ ድጋፍ በጎንደር ደብተራዎችና ሰዓሊዎች በእጅ የተጻፈና በወርቅ የተዋበ ቅዱስ ብራና።'
      },
      {
        id: 'cloak',
        title: 'Royal Purple Velvet Kaba',
        titleAmharic: 'የክብር ሐምራዊ ቬልቬት ካባ',
        category: 'Imperial Robes',
        categoryAmharic: 'የንግሥና ካባ',
        icon: 'award',
        pos: [0, 1.5, 0.5],
        camTarget: [0, 1.5, 0],
        camPos: [0, 1.6, 2.2],
        period: 'Gondar Renaissance',
        significance: 'Queen Mother & Regent',
        significanceAmharic: 'እቴጌይቱና ንግሥተ-መንግሥታት',
        description: 'Deep royal purple velvet cloak adorned with gold thread embroidery, reflecting Gondarine majesty.',
        descriptionAmharic: 'በወርቅ ጥልፍ የተዋበ የክብር ሐምራዊ ካባ፤ የእቴጌ ምንትዋብን ጥበብና ልዕልና ያሳያል።'
      },
      {
        id: 'plaque',
        title: 'Empress Mentewab Memorial Plinth',
        titleAmharic: 'የእቴጌ ምንትዋብ መታሰቢያ ጽላት',
        category: 'Memorial',
        categoryAmharic: 'የክብር ጽላት',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: '1706 – 1773',
        significance: 'Berhan Mogasa',
        significanceAmharic: 'ብርሃን ሞገሳ',
        description: 'Carved plinth honoring the patron of Gondarine architecture, education, and peace.',
        descriptionAmharic: '«እቴጌ ምንትዋብ (ብርሃን ሞገሳ) — የጎንደር የኪነ-ጥበብና የሰላም ንግሥት» የሚል ጽላት።'
      }
    ]
  },
  {
    id: 'derartu-tulu',
    name: 'Commander Derartu Tulu',
    nameAmharic: 'ኮማንደር ደራርቱ ቱሉ',
    title: 'First Black African Woman Olympic Gold Champion',
    titleAmharic: 'በኦሊምፒክ የወርቅ ሜዳሊያ ያሸነፈች የመጀመሪያዋ ጥቁር አፍሪካዊት',
    years: '1972 – Present (Barcelona 1992)',
    tagline: 'Pioneer of African Long-Distance Running, Double Olympic Gold Winner & Global Icon',
    taglineAmharic: 'በ1992 የባርሴሎና ኦሊምፒክ 10,000 ሜትር የወርቅ ሜዳሊያ በማሸነፍ አፍሪካን ያስጠራች ጀግና',
    plaqueColor: '#0a170f',
    plaqueBorder: '#22c55e',
    accentColor: '#22c55e',
    avatarUrl: '/derartu_tulu_crop.png',
    dollModel: {
      dressColor: 0x15803d, // Ethiopian green tracksuit
      sashColor1: '#16a34a',
      sashColor2: '#facc15',
      sashColor3: '#dc2626',
      hasCrown: false,
      crownType: 'olympic',
      skinTone: 0x603813,
      accessory: 'medal'
    },
    hotspots: [
      {
        id: 'medal',
        title: 'Barcelona 1992 Olympic Gold Medal',
        titleAmharic: 'የ1992 የባርሴሎና ኦሊምፒክ የወርቅ ሜዳሊያ',
        category: 'Olympic History',
        categoryAmharic: 'የኦሊምፒክ ታሪክ',
        icon: 'crown',
        pos: [0, 2.2, 0.35],
        camTarget: [0, 2.15, 0],
        camPos: [0, 2.25, 1.7],
        period: 'August 7, 1992',
        significance: 'Historic Breakthrough for Africa',
        significanceAmharic: 'ታሪካዊ የአፍሪካ ድል',
        description: 'Solid gold medal from the 10,000m final in Barcelona, forever altering the landscape of athletics.',
        descriptionAmharic: 'በ1992 ባርሴሎና ላይ አፍሪካዊት ሴት ለመጀመሪያ ጊዜ ያሸነፈችው ይፋዊ የኦሊምፒክ የወርቅ ሜዳሊያ።'
      },
      {
        id: 'flag',
        title: 'Ethiopian National Flag Victory Cape',
        titleAmharic: 'የኢትዮጵያ ሰንደቅ ዓላማ የድል ካባ',
        category: 'Victory Celebration',
        categoryAmharic: 'የድል በዓል',
        icon: 'award',
        pos: [-0.35, 1.85, 0.45],
        camTarget: [-0.1, 1.75, 0],
        camPos: [-0.55, 1.95, 2.0],
        period: 'Lap of Honor',
        significance: 'Pan-African & Human Unity',
        significanceAmharic: 'የአንድነትና የፍቅር ዙረት',
        description: 'Draped with South Africa’s Elana Meyer in an iconic lap of honor celebrating post-apartheid friendship.',
        descriptionAmharic: 'ድሉን ስታከብር ከደቡብ አፍሪካዊቷ ኤላና ሜየር ጋር እጅ ለእጅ ተያይዛ የዞረችበት የድል ሰንደቅ።'
      },
      {
        id: 'shoes',
        title: 'Historic Marathon Racing Spikes',
        titleAmharic: 'የሩጫ ጫማዎች',
        category: 'Athletic Equipment',
        categoryAmharic: 'የስፖርት ክብር',
        icon: 'sparkles',
        pos: [0, -0.3, 0.4],
        camTarget: [0, -0.3, 0],
        camPos: [0, -0.1, 1.8],
        period: 'Track & Field Legend',
        significance: 'Highland Endurance & Grit',
        significanceAmharic: 'የአርሲ ተራራዎች ብርታት',
        description: 'Golden-soled racing spikes that carried Derartu Tulu across legendary tracks worldwide.',
        descriptionAmharic: 'በአርሲ ተራራዎች ጀምራ በዓለም አደባባይ ኢትዮጵያን ያስጠራችባቸው ፈጣን የሩጫ ጫማዎች።'
      },
      {
        id: 'plaque',
        title: 'Olympic Legend Memorial Plaque',
        titleAmharic: 'የኦሊምፒክ ክብረ-ወሰን ጽላት',
        category: 'Memorial',
        categoryAmharic: 'የክብር ጽላት',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: 'Barcelona 1992 • Sydney 2000',
        significance: 'The Queen of the Track',
        significanceAmharic: 'የአትሌቲክስ ንግሥት',
        description: 'Marble plinth celebrating Commander Derartu Tulu, President of the Ethiopian Athletics Federation.',
        descriptionAmharic: '«ኮማንደር ደራርቱ ቱሉ — የኦሊምፒክ አቅኚና የዓለም የስፖርት አርአያ» የሚል ጽላት።'
      }
    ]
  },
  {
    id: 'werede-mamo',
    name: 'Werede Mamo',
    nameAmharic: 'አርበኛ ወረደ ማሞ',
    title: 'Fearless Patriot & Resistance Heroine',
    titleAmharic: 'ጀግናዋ አርበኛና የነጻነት ተምሳሌት',
    years: '1936 – 1941',
    tagline: 'Courageous Freedom Fighter who Braved Frontlines against Occupation',
    taglineAmharic: 'በፋሽስት ወረራ ወቅት በጦር ግንባር የተዋደቀችና የነጻነት ሰንደቅን ያነሳች ጀግና',
    plaqueColor: '#0a0d0a',
    plaqueBorder: '#10b981',
    accentColor: '#10b981',
    avatarUrl: '/werede_mamo_official.png',
    dollModel: {
      dressColor: 0xf5f5f0,
      sashColor1: '#059669',
      sashColor2: '#facc15',
      sashColor3: '#dc2626',
      hasCrown: false,
      crownType: 'netela',
      skinTone: 0x784a29,
      accessory: 'dispatch'
    },
    hotspots: [
      {
        id: 'headdress',
        title: 'Patriot Resistance Netela',
        titleAmharic: 'የአርበኝነት ጥምጥም',
        category: 'Patriot Attire',
        categoryAmharic: 'የአርበኞች ልብስ',
        icon: 'crown',
        pos: [0, 3.2, 0.15],
        camTarget: [0, 3.05, 0],
        camPos: [0, 3.25, 1.8],
        period: '1936 – 1941',
        significance: 'Unyielding Resolve',
        significanceAmharic: 'ጽኑ የአርበኝነት ወኔ',
        description: 'Traditional cotton Netela wrapped firmly around the head in guerrilla style.',
        descriptionAmharic: 'በነጻነት ትግል ወቅት ያደረገችው ባህላዊ የነጠላ ጥምጥም፤ ጽናትንና ጀግንነትን ያሳያል።'
      },
      {
        id: 'sash',
        title: 'Patriot Tri-Color Sash',
        titleAmharic: 'የሰንደቅ አላማ ጥበብ ሻሽ',
        category: 'National Honor',
        categoryAmharic: 'ብሔራዊ ክብር',
        icon: 'award',
        pos: [-0.35, 1.85, 0.45],
        camTarget: [-0.1, 1.75, 0],
        camPos: [-0.55, 1.95, 2.0],
        period: 'Anti-Fascist Resistance',
        significance: 'Unity of Guerrilla Fighters',
        significanceAmharic: 'የአርበኞች አንድነት',
        description: 'Pan-Ethiopian tri-color band worn by mountain freedom fighters.',
        descriptionAmharic: 'በተራራው ላይ ለነጻነት የተዋደቁትን የጀግኖች ሴቶች አርበኞች ድንቅ ተጋድሎ ያዘክራል።'
      },
      {
        id: 'dispatch',
        title: 'Courier Intelligence Ledger',
        titleAmharic: 'የትግል ሰነድ',
        category: 'Intelligence',
        categoryAmharic: 'የስለላ ስራ',
        icon: 'sparkles',
        pos: [0.35, 1.45, 0.4],
        camTarget: [0.2, 1.4, 0],
        camPos: [0.4, 1.5, 1.8],
        period: 'Frontline Logistics',
        significance: 'Underground Coordination',
        significanceAmharic: 'የመረጃ አመራር',
        description: 'Secret battle ledger coordinating troop movements and patriot dispatches.',
        descriptionAmharic: 'የጠላትን ወታደራዊ እንቅስቃሴ በመሰለል ለአርበኞች ግንባር ቀደም መረጃ ይሰጥ የነበረ ሰነድ።'
      },
      {
        id: 'plaque',
        title: 'Patriot Memorial Plinth',
        titleAmharic: 'የአርበኞች ክብር መታሰቢያ ጽላት',
        category: 'Memorial',
        categoryAmharic: 'የክብር ጽላት',
        icon: 'bookmark',
        pos: [0, -0.65, 0.75],
        camTarget: [0, -0.7, 0],
        camPos: [0, -0.2, 2.2],
        period: '1936 – 1941',
        significance: 'Heroine of Independence',
        significanceAmharic: 'የነጻነት ተምሳሌት',
        description: 'Commemorating Werede Mamo and all Ethiopian women resistance fighters.',
        descriptionAmharic: '«አርበኛ ወረደ ማሞ (1936 – 1941) • የማይበገር የአርበኝነት ተምሳሌት» የሚል ጽላት።'
      }
    ]
  }
];

export const Heroines3DPavilion: React.FC<Heroines3DPavilionProps> = ({
  currency,
  language,
  onAddToCart,
  initialHeroineId = 'taytu-betul'
}) => {
  const [selectedHeroineId, setSelectedHeroineId] = useState<string>(initialHeroineId);
  const activeHeroine = HEROINES_LIST.find(h => h.id === selectedHeroineId) || HEROINES_LIST[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<number>(0);
  const [activeLighting, setActiveLighting] = useState<'studio' | 'sunset' | 'museum'>('sunset');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeModalSpot, setActiveModalSpot] = useState<any | null>(null);
  const [screenCoords, setScreenCoords] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const [hintVisible, setHintVisible] = useState<boolean>(true);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Three.js mutable refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    key: THREE.SpotLight;
    fill: THREE.DirectionalLight;
    back: THREE.DirectionalLight;
    pedestal: THREE.PointLight;
  } | null>(null);

  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 4.8));
  const targetCamLookRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 0));
  const autoRotateRef = useRef<boolean>(true);
  const showHotspotsRef = useRef<boolean>(true);

  autoRotateRef.current = autoRotate;
  showHotspotsRef.current = showHotspots;

  // Web Audio Synthesizer chimes
  const playChime = (freq = 523.25, type: OscillatorType = 'sine', duration = 0.5) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable
    }
  };

  // Re-build 3D Model when activeHeroine changes
  const buildHeroineModel = (scene: THREE.Scene, config: HeroineConfig) => {
    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
    }

    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;

    // 1. Inscribed Brass Plaque Texture
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 340;
    const ctxP = plaqueCanvas.getContext('2d')!;
    ctxP.fillStyle = config.plaqueColor;
    ctxP.fillRect(0, 0, 1024, 340);
    ctxP.strokeStyle = config.plaqueBorder;
    ctxP.lineWidth = 6;
    ctxP.strokeRect(16, 16, 1024 - 32, 340 - 32);
    ctxP.strokeStyle = '#d4af37';
    ctxP.lineWidth = 2;
    ctxP.strokeRect(26, 26, 1024 - 52, 340 - 52);

    ctxP.textAlign = 'center';
    ctxP.fillStyle = '#fef08a';
    ctxP.font = 'bold 50px serif';
    ctxP.fillText(config.name, 512, 115);
    ctxP.fillStyle = config.plaqueBorder;
    ctxP.font = 'italic 36px serif';
    ctxP.fillText(`${config.years} • ${config.nameAmharic}`, 512, 175);
    ctxP.fillStyle = '#fce7f3';
    ctxP.font = '24px sans-serif';
    ctxP.fillText(config.tagline, 512, 235);
    ctxP.fillText(config.taglineAmharic, 512, 280);
    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);

    // 2. Tibeb Sash Texture
    const tibebCanvas = document.createElement('canvas');
    tibebCanvas.width = 1024;
    tibebCanvas.height = 256;
    const ctxT = tibebCanvas.getContext('2d')!;
    const h = 256 / 3;
    ctxT.fillStyle = config.dollModel.sashColor1;
    ctxT.fillRect(0, 0, 1024, h);
    ctxT.fillStyle = config.dollModel.sashColor2;
    ctxT.fillRect(0, h, 1024, h);
    ctxT.fillStyle = config.dollModel.sashColor3;
    ctxT.fillRect(0, h * 2, 1024, h);
    ctxT.fillStyle = '#fef08a';
    ctxT.strokeStyle = '#78350f';
    ctxT.lineWidth = 4;
    for (let x = 32; x < 1024; x += 64) {
      ctxT.beginPath();
      ctxT.arc(x, 128, 14, 0, Math.PI * 2);
      ctxT.fill();
      ctxT.stroke();
    }
    const tibebTexture = new THREE.CanvasTexture(tibebCanvas);
    tibebTexture.wrapS = THREE.RepeatWrapping;
    tibebTexture.wrapT = THREE.RepeatWrapping;
    tibebTexture.repeat.set(3, 1);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x451a03,
      emissiveIntensity: 0.2
    });
    const skinMat = new THREE.MeshStandardMaterial({
      color: config.dollModel.skinTone,
      roughness: 0.58,
      metalness: 0.04
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x120d0f,
      roughness: 0.85,
      metalness: 0.1
    });
    const dressMat = new THREE.MeshStandardMaterial({
      color: config.dollModel.dressColor,
      roughness: 0.72,
      metalness: 0.05
    });
    const sashMat = new THREE.MeshStandardMaterial({
      map: tibebTexture,
      roughness: 0.45,
      metalness: 0.25
    });

    // Pedestal Base & Plinth
    const pedestalBaseGeo = new THREE.BoxGeometry(1.9, 0.22, 1.4);
    const plinthGeo = new THREE.BoxGeometry(1.6, 0.45, 1.15);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x140e15,
      roughness: 0.35,
      metalness: 0.6
    });
    const pedestalBase = new THREE.Mesh(pedestalBaseGeo, baseMat);
    pedestalBase.position.y = -0.85;
    pedestalBase.receiveShadow = true;
    modelGroup.add(pedestalBase);

    const plinthMesh = new THREE.Mesh(plinthGeo, baseMat);
    plinthMesh.position.y = -0.55;
    plinthMesh.receiveShadow = true;
    modelGroup.add(plinthMesh);

    // Inscribed Plaque Mesh
    const plaqueGeo = new THREE.PlaneGeometry(1.2, 0.36);
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: plaqueTexture,
      roughness: 0.3,
      metalness: 0.5
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, -0.55, 0.58);
    modelGroup.add(plaqueMesh);

    // Lower Dress / Skirt
    const skirtGeo = new THREE.CylinderGeometry(0.5, 0.82, 1.6, 32);
    const skirtMesh = new THREE.Mesh(skirtGeo, dressMat);
    skirtMesh.position.y = 0.5;
    skirtMesh.castShadow = true;
    skirtMesh.receiveShadow = true;
    modelGroup.add(skirtMesh);

    // Hem Band
    const hemGeo = new THREE.CylinderGeometry(0.81, 0.83, 0.22, 32);
    const hemMesh = new THREE.Mesh(hemGeo, sashMat);
    hemMesh.position.y = -0.22;
    modelGroup.add(hemMesh);

    // Slippers / Shoes
    const slipperGeo = new THREE.BoxGeometry(0.14, 0.08, 0.25);
    const leftSlipper = new THREE.Mesh(slipperGeo, goldMat);
    leftSlipper.position.set(-0.2, -0.32, 0.4);
    const rightSlipper = new THREE.Mesh(slipperGeo, goldMat);
    rightSlipper.position.set(0.2, -0.32, 0.4);
    modelGroup.add(leftSlipper);
    modelGroup.add(rightSlipper);

    // Torso / Bodice
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.48, 1.05, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, dressMat);
    torsoMesh.position.y = 1.7;
    torsoMesh.castShadow = true;
    modelGroup.add(torsoMesh);

    // Diagonal Sash
    const sashGeo = new THREE.TorusGeometry(0.52, 0.09, 16, 32, Math.PI * 1.15);
    const sashMesh = new THREE.Mesh(sashGeo, sashMat);
    sashMesh.rotation.z = Math.PI / 4;
    sashMesh.rotation.y = Math.PI / 8;
    sashMesh.position.set(-0.05, 1.75, 0.1);
    sashMesh.castShadow = true;
    modelGroup.add(sashMesh);

    // Sleeves & Hands
    const leftSleeveGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.75, 16);
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, dressMat);
    leftSleeve.position.set(-0.52, 1.72, 0.05);
    leftSleeve.rotation.z = Math.PI / 6;
    modelGroup.add(leftSleeve);

    const rightSleeveGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.75, 16);
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, dressMat);
    rightSleeve.position.set(0.52, 1.72, 0.05);
    rightSleeve.rotation.z = -Math.PI / 6;
    modelGroup.add(rightSleeve);

    const handGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.35, 1.35, 0.35);
    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.35, 1.35, 0.35);
    modelGroup.add(leftHand);
    modelGroup.add(rightHand);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.35, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = 2.4;
    modelGroup.add(neckMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.y = 2.85;
    headMesh.castShadow = true;
    modelGroup.add(headMesh);

    // Hair bun / Netela Wrap
    const bunGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const bunMesh = new THREE.Mesh(bunGeo, hairMat);
    bunMesh.position.set(0, 2.95, -0.15);
    modelGroup.add(bunMesh);

    // Specialized Headdresses according to heroine:
    if (config.dollModel.crownType === 'tiara') {
      // Empress Taytu Tiara
      const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.27, 0.1, 32), goldMat);
      crownBase.position.y = 3.12;
      modelGroup.add(crownBase);
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.22, 8), goldMat);
        spike.position.set(Math.cos(angle) * 0.28, 3.23, Math.sin(angle) * 0.28);
        modelGroup.add(spike);
      }
    } else if (config.dollModel.crownType === 'zewditu') {
      // Empress Zewditu Tall Coronation Crown
      const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.26, 0.16, 32), goldMat);
      crownBase.position.y = 3.15;
      modelGroup.add(crownBase);
      const crownTier2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.18, 32), goldMat);
      crownTier2.position.y = 3.3;
      modelGroup.add(crownTier2);
      const crownCross = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.18, 0.03), goldMat);
      crownCross.position.set(0, 3.48, 0);
      modelGroup.add(crownCross);
    } else if (config.dollModel.crownType === 'axum') {
      // Queen of Sheba Axumite Sun Diadem
      const diadem = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.05, 12, 32), goldMat);
      diadem.position.set(0, 3.15, 0);
      diadem.rotation.x = Math.PI / 2;
      modelGroup.add(diadem);
      const sunDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16), goldMat);
      sunDisc.position.set(0, 3.32, 0.18);
      sunDisc.rotation.x = Math.PI / 2;
      modelGroup.add(sunDisc);
    } else if (config.dollModel.crownType === 'gondar') {
      // Empress Mentewab Pearl Renaissance Crown
      const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 32), goldMat);
      crownBase.position.y = 3.14;
      modelGroup.add(crownBase);
      for (let i = 0; i < 8; i++) {
        const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
        const angle = (i / 8) * Math.PI * 2;
        pearl.position.set(Math.cos(angle) * 0.27, 3.25, Math.sin(angle) * 0.27);
        modelGroup.add(pearl);
      }
    } else if (config.dollModel.crownType === 'olympic') {
      // Derartu Tulu Olympic Champion Headband
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 12, 32), sashMat);
      band.position.set(0, 2.95, 0);
      band.rotation.x = Math.PI / 2;
      modelGroup.add(band);
    } else {
      // Netela Headwrap
      const wrap = new THREE.Mesh(new THREE.SphereGeometry(0.29, 24, 24), dressMat);
      wrap.position.set(0, 2.9, -0.05);
      modelGroup.add(wrap);
    }

    // Held Accessories
    if (config.dollModel.accessory === 'chalice') {
      const chalice = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.04, 0.22, 16), goldMat);
      chalice.position.set(0.35, 1.45, 0.4);
      modelGroup.add(chalice);
    } else if (config.dollModel.accessory === 'medal') {
      const medal = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.015, 16), goldMat);
      medal.position.set(0, 2.2, 0.35);
      medal.rotation.x = Math.PI / 2;
      modelGroup.add(medal);
    } else if (config.dollModel.accessory === 'dispatch' || config.dollModel.accessory === 'scroll') {
      const dispatch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.26, 0.05), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 }));
      dispatch.position.set(0.35, 1.45, 0.4);
      dispatch.rotation.y = 0.3;
      modelGroup.add(dispatch);
    } else if (config.dollModel.accessory === 'cross') {
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.14, 0.02), goldMat);
      crossV.position.set(0, 2.3, 0.18);
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.025, 0.02), goldMat);
      crossH.position.set(0, 2.33, 0.18);
      modelGroup.add(crossV);
      modelGroup.add(crossH);
    }

    scene.add(modelGroup);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 8.0;
    controls.minDistance = 1.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    controls.addEventListener('start', () => {
      setHintVisible(false);
    });

    // Lights
    const ambient = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambient);
    const key = new THREE.SpotLight(0xffedd5, 2.4);
    key.position.set(2.5, 4.8, 3.5);
    key.angle = Math.PI / 4;
    key.penumbra = 0.5;
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xf43f5e, 0.85);
    fill.position.set(-3.5, 2.0, 2.0);
    scene.add(fill);

    const back = new THREE.DirectionalLight(0xf59e0b, 1.5);
    back.position.set(0, 3.5, -3.0);
    scene.add(back);

    const pedestal = new THREE.PointLight(0xfb7185, 0.7, 6);
    pedestal.position.set(0, 0.2, 1.5);
    scene.add(pedestal);

    lightsRef.current = { ambient, key, fill, back, pedestal };

    // Soft Shadow Plane Under Pedestal
    const shadowGeo = new THREE.PlaneGeometry(3.2, 2.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctxS = shadowCanvas.getContext('2d')!;
    const grad = ctxS.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctxS.fillStyle = grad;
    ctxS.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.96;
    scene.add(shadowPlane);

    // Initial Model Build
    buildHeroineModel(scene, activeHeroine);

    // Animation Loop
    let animationFrameId: number;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      camera.position.lerp(targetCamPosRef.current, 0.05);
      controls.target.lerp(targetCamLookRef.current, 0.05);

      if (autoRotateRef.current && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);

      if (showHotspotsRef.current && modelGroupRef.current) {
        const newCoords: Record<string, { x: number; y: number; visible: boolean }> = {};
        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        activeHeroine.hotspots.forEach(spot => {
          tempVec.set(...spot.pos);
          tempVec.applyMatrix4(modelGroupRef.current!.matrixWorld);
          tempVec.project(camera);

          const isVisible = tempVec.z <= 1.0;
          const x = tempVec.x * widthHalf + widthHalf;
          const y = -(tempVec.y * heightHalf) + heightHalf;

          newCoords[spot.id] = { x, y, visible: isVisible };
        });

        setScreenCoords(newCoords);
      }
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update model when heroine changes
  useEffect(() => {
    if (sceneRef.current) {
      buildHeroineModel(sceneRef.current, activeHeroine);
      targetCamPosRef.current.set(0, 1.5, 4.8);
      targetCamLookRef.current.set(0, 1.2, 0);
    }
  }, [selectedHeroineId]);

  // Update Wireframe / Clay mode
  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;

    group.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        if (wireframeMode === 2) {
          obj.material.wireframe = true;
          obj.material.color = new THREE.Color(activeHeroine.accentColor);
        } else if (wireframeMode === 1) {
          obj.material.wireframe = false;
          obj.material.color = new THREE.Color(0x9d4edd);
          obj.material.roughness = 0.8;
          obj.material.metalness = 0.05;
        } else {
          obj.material.wireframe = false;
        }
      }
    });
  }, [wireframeMode, selectedHeroineId]);

  // Update Lighting
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights) return;

    if (activeLighting === 'studio') {
      lights.ambient.color.set(0xffffff);
      lights.ambient.intensity = 0.9;
      lights.key.color.set(0xffffff);
      lights.key.intensity = 2.4;
      lights.fill.color.set(0x93c5fd);
      lights.fill.intensity = 0.8;
      lights.back.color.set(0xfb7185);
      lights.back.intensity = 1.2;
    } else if (activeLighting === 'sunset') {
      lights.ambient.color.set(0xffedd5);
      lights.ambient.intensity = 0.95;
      lights.key.color.set(0xfb923c);
      lights.key.intensity = 2.8;
      lights.fill.color.set(0xf43f5e);
      lights.fill.intensity = 1.0;
      lights.back.color.set(0xfde047);
      lights.back.intensity = 1.6;
    } else {
      lights.ambient.color.set(0x4a044e);
      lights.ambient.intensity = 0.4;
      lights.key.color.set(0xfff1f2);
      lights.key.intensity = 3.6;
      lights.fill.color.set(0x831843);
      lights.fill.intensity = 0.4;
      lights.back.color.set(0xfb7185);
      lights.back.intensity = 2.2;
    }
  }, [activeLighting]);

  const handleSelectHotspot = (spot: any) => {
    playChime(659.25, 'sine', 0.6);
    targetCamPosRef.current.set(...(spot.camPos as [number, number, number]));
    targetCamLookRef.current.set(...(spot.camTarget as [number, number, number]));
    setAutoRotate(false);
    setActiveModalSpot(spot);
  };

  const handleResetCamera = (pos: [number, number, number], look: [number, number, number]) => {
    playChime(440, 'triangle', 0.4);
    targetCamPosRef.current.set(...pos);
    targetCamLookRef.current.set(...look);
  };

  // Find product for active heroine
  const heroData = ETHIOPIAN_HEROES.find(h => h.id === activeHeroine.id);
  const heroProduct = heroData?.dolls[0];

  const handleOrder = () => {
    if (!heroProduct) return;
    const orderItem: DollProduct = {
      ...heroProduct,
      priceETB: 2250,
      priceUSD: 35,
      title: `${activeHeroine.name} - 7-Inch Official Figurine`,
      titleAmharic: `${activeHeroine.nameAmharic} - 7 ኢንች ይፋዊ ቅርጽ`
    };
    onAddToCart(orderItem, 'የጀግኖች ቅርስ', 1);
    setAddedToast(true);
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#facc15', '#22c55e', '#38bdf8']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <section id="heroines-3d-pavilion" className="w-full space-y-6">
      {/* Grand Title Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#200814] via-[#300f21] to-[#16040d] border-3 border-[#f43f5e] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-2 tibeb-ribbon" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f43f5e]/20 border border-[#f43f5e] text-[#fecdd3] text-xs font-black">
              <Crown size={14} className="text-[#fb7185]" />
              <span>3D WEBGL HEROINES THEATER • የኢትዮጵያ ጀግኖች ሴቶች 3D ኤግዚቢሽን</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              {language === 'AM' ? 'የኢትዮጵያ ጀግኖች ሴቶች • 3D በይነ-መረብ ኤግዚቢሽን' : 'Ethiopian Heroines • 3D Interactive Exhibition'}
            </h2>
            <p className="text-sm text-pink-200/90 font-medium max-w-2xl">
              {language === 'AM'
                ? 'በታሪክ አንጸባራቂ አሻራ ያኖሩትን የእቴጌ ጣይቱ፣ ዘውዲቱ፣ ንግሥት ሳባ፣ ሸዋረገድ ገድሌ፣ ምንትዋብ፣ ደራርቱ ቱሉና ወረደ ማሞን 3D ቅርጾች በ360° አሽከርክረው ይመልከቱ።'
                : 'Interact with procedural 3D collector figures of Ethiopia’s greatest heroines with 360° turntable, historical regalia pins, and studio lighting.'}
            </p>
          </div>

          {/* Sole 7-Inch Edition Badge */}
          <div className="p-3 bg-black/70 rounded-2xl border border-[#f43f5e]/50 text-right shrink-0">
            <div className="text-[11px] text-[#fca5a5] font-bold uppercase">Sole Collector Edition</div>
            <div className="text-lg font-black text-[#fef08a]">7 ኢንች (18 ሳ.ሜ)</div>
            <div className="text-xs text-[#86efac] font-mono">2,250 ETB • $35 USD</div>
          </div>
        </div>

        {/* Heroine Switcher Pills Bar */}
        <div className="mt-6 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {HEROINES_LIST.map(h => {
            const isSelected = h.id === selectedHeroineId;
            return (
              <button
                key={h.id}
                onClick={() => {
                  setSelectedHeroineId(h.id);
                  playChime(587.33, 'sine', 0.2);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all shrink-0 text-xs font-bold ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#da121a] to-[#f43f5e] text-white border-yellow-300 shadow-xl scale-105'
                    : 'bg-black/60 text-neutral-300 border-neutral-800 hover:border-pink-500/50 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.accentColor }} />
                <span>{language === 'AM' ? h.nameAmharic : h.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Exhibition Stage */}
      <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c0612] via-[#10030a] to-[#060104] border-2 border-[#f43f5e]/60 shadow-2xl flex flex-col select-none group">
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Header Floating Overlay */}
        <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-black/85 border border-[#f43f5e]/70 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] animate-ping" />
              <span className="font-serif font-black text-[#fef08a] tracking-wide">
                {language === 'AM' ? activeHeroine.nameAmharic : activeHeroine.name}
              </span>
              <span className="text-[10px] text-pink-300 font-mono bg-pink-950/70 px-1.5 py-0.5 rounded border border-pink-700/40">
                {activeHeroine.years}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border backdrop-blur-md shadow-lg transition-all ${
                soundEnabled
                  ? 'bg-black/80 border-[#f43f5e] text-[#fef08a] hover:bg-[#3b0b1d]'
                  : 'bg-black/60 border-neutral-700 text-neutral-400'
              }`}
              title="Toggle Audio Synthesizer"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        {/* 3D to 2D Screen Hotspot Pins */}
        {showHotspots && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {activeHeroine.hotspots.map(spot => {
              const coord = screenCoords[spot.id];
              if (!coord || !coord.visible) return null;

              return (
                <div
                  key={spot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group/pin"
                  style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
                  onClick={() => handleSelectHotspot(spot)}
                >
                  <span className="absolute -inset-2 rounded-full bg-[#f43f5e]/40 animate-ping" />
                  <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#9f1239] via-[#e11d48] to-[#f43f5e] border-2 border-[#fef08a] text-white shadow-xl hover:scale-125 transition-transform duration-200">
                    {spot.icon === 'crown' && <Crown size={14} className="text-[#fef08a]" />}
                    {spot.icon === 'award' && <Award size={14} className="text-[#fef08a]" />}
                    {spot.icon === 'sparkles' && <Sparkles size={14} className="text-[#fef08a]" />}
                    {spot.icon === 'bookmark' && <Bookmark size={14} className="text-[#fef08a]" />}
                  </span>

                  <div className="absolute left-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-black/90 border border-[#f43f5e]/80 backdrop-blur-md text-[11px] font-bold text-white whitespace-nowrap shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                    <span className="text-[#fef08a]">{language === 'AM' ? spot.titleAmharic : spot.title}</span>
                    <ChevronRight size={12} className="text-[#f43f5e]" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Helper Hint */}
        {hintVisible && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-pulse">
            <div className="px-4 py-1.5 rounded-full bg-black/85 border border-[#f43f5e] text-pink-200 text-xs font-medium backdrop-blur-md shadow-2xl flex items-center gap-2">
              <Move3d size={14} className="text-[#f43f5e]" />
              <span>{language === 'AM' ? 'ለማሽከርከር ይጎትቱ • ለማጉላት ዙም ያድርጉ' : 'Drag to Orbit 360° • Pinch / Wheel to Zoom'}</span>
            </div>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="relative mt-auto z-20 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-auto flex flex-wrap items-center justify-between gap-3">
          {/* Preset Angle Buttons */}
          <div className="flex items-center gap-1.5 bg-black/85 p-1 rounded-2xl border border-neutral-800 backdrop-blur-md">
            <button
              onClick={() => handleResetCamera([0, 1.5, 4.8], [0, 1.2, 0])}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#fef08a] hover:bg-[#3b0b1d] transition-all"
            >
              {language === 'AM' ? 'ሙሉ' : 'Full'}
            </button>
            <button
              onClick={() => handleResetCamera([0, 3.25, 1.8], [0, 3.05, 0])}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-pink-300 hover:bg-[#3b0b1d] transition-all"
            >
              {language === 'AM' ? 'አክሊል' : 'Crown'}
            </button>
            <button
              onClick={() => handleResetCamera([-0.55, 1.95, 2.0], [-0.1, 1.75, 0])}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-amber-300 hover:bg-[#3b0b1d] transition-all"
            >
              {language === 'AM' ? 'ሻሽ' : 'Sash'}
            </button>
            <button
              onClick={() => handleResetCamera([0, -0.2, 2.2], [0, -0.7, 0])}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-neutral-300 hover:bg-[#3b0b1d] transition-all"
            >
              {language === 'AM' ? 'ሰሌዳ' : 'Plaque'}
            </button>
          </div>

          {/* Quick Order 7-Inch Button */}
          <button
            onClick={handleOrder}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#da121a] to-[#ea580c] hover:from-[#b91c1c] hover:to-[#c2410c] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform active:scale-95"
          >
            {addedToast ? <Check size={14} className="text-yellow-300" /> : <ShoppingBag size={14} />}
            <span>
              {addedToast
                ? (language === 'AM' ? 'ወደ ቅርጫት ገብቷል!' : 'Added to Cart!')
                : (language === 'AM' ? 'ይሄን 7 ኢንች እዘዝ (2,250 ETB)' : 'Order 7" Figurine ($35)')}
            </span>
          </button>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAutoRotate(!autoRotate);
                playChime(523.25, 'sine', 0.2);
              }}
              className={`p-2 rounded-xl border backdrop-blur-md shadow-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                autoRotate
                  ? 'bg-[#3b0b1d] border-[#f43f5e] text-[#fef08a]'
                  : 'bg-black/80 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Turntable"
            >
              <RotateCw size={14} className={autoRotate ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">{language === 'AM' ? 'ዙረት' : 'Turntable'}</span>
            </button>

            <button
              onClick={() => {
                setShowHotspots(!showHotspots);
                playChime(587.33, 'sine', 0.2);
              }}
              className={`p-2 rounded-xl border backdrop-blur-md shadow-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                showHotspots
                  ? 'bg-[#3b0b1d] border-[#f43f5e] text-[#fef08a]'
                  : 'bg-black/80 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Hotspot Pins"
            >
              <MapPin size={14} />
              <span className="hidden sm:inline">{language === 'AM' ? 'ምልክቶች' : 'Pins'}</span>
            </button>

            <button
              onClick={() => {
                setWireframeMode((wireframeMode + 1) % 3);
                playChime(698.46, 'triangle', 0.3);
              }}
              className="p-2 rounded-xl bg-black/80 border border-neutral-700 hover:border-pink-500 text-pink-300 backdrop-blur-md shadow-md text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Cycle Shading Mode: Standard / Clay Violet / Wireframe"
            >
              <Layers size={14} />
              <span className="hidden md:inline">
                {wireframeMode === 0 ? 'Standard' : wireframeMode === 1 ? 'Clay' : 'Wireframe'}
              </span>
            </button>

            <div className="flex items-center bg-black/85 p-0.5 rounded-xl border border-neutral-800">
              <button
                onClick={() => {
                  setActiveLighting('studio');
                  playChime(440, 'sine', 0.2);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  activeLighting === 'studio' ? 'bg-[#3b0b1d] text-[#fef08a] border border-[#f43f5e]' : 'text-neutral-400'
                }`}
              >
                Studio
              </button>
              <button
                onClick={() => {
                  setActiveLighting('sunset');
                  playChime(493.88, 'sine', 0.2);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  activeLighting === 'sunset' ? 'bg-[#3b0b1d] text-[#fef08a] border border-[#f43f5e]' : 'text-neutral-400'
                }`}
              >
                Sunset
              </button>
              <button
                onClick={() => {
                  setActiveLighting('museum');
                  playChime(523.25, 'sine', 0.2);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  activeLighting === 'museum' ? 'bg-[#3b0b1d] text-[#fef08a] border border-[#f43f5e]' : 'text-neutral-400'
                }`}
              >
                Museum
              </button>
            </div>
          </div>
        </div>

        {/* Hotspot Modal Dialog */}
        {activeModalSpot && (
          <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <div className="relative w-full max-w-lg bg-gradient-to-b from-[#250816] via-[#16040e] to-[#0a0206] border-2 border-[#f43f5e] rounded-3xl p-6 shadow-2xl space-y-4">
              <button
                onClick={() => setActiveModalSpot(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-[#da121a] text-neutral-300 hover:text-white border border-pink-700/50 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#fca5a5] font-black font-mono">
                  {language === 'AM' ? activeModalSpot.categoryAmharic : activeModalSpot.category} • {activeModalSpot.period}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white flex items-center gap-2">
                  <Crown size={22} className="text-[#fef08a]" />
                  <span>{language === 'AM' ? activeModalSpot.titleAmharic : activeModalSpot.title}</span>
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-[#3b0b1d]/80 border border-[#f43f5e]/60 flex items-center gap-3">
                <Sparkles size={18} className="text-[#fef08a] shrink-0" />
                <div className="text-xs text-[#fef08a] font-bold">
                  {language === 'AM' ? activeModalSpot.significanceAmharic : activeModalSpot.significance}
                </div>
              </div>

              <p className="text-sm text-pink-100/90 leading-relaxed font-normal">
                {language === 'AM' ? activeModalSpot.descriptionAmharic : activeModalSpot.description}
              </p>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalSpot(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#da121a] to-[#f43f5e] hover:from-[#b91c1c] hover:to-[#e11d48] text-white font-bold text-xs shadow-lg transition-transform active:scale-95"
                >
                  {language === 'AM' ? 'ኤግዚቢሽኑን ቀጥል' : 'Continue Exhibition'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

