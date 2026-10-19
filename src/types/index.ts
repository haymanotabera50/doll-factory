export type Currency = 'ETB' | 'USD';
export type Language = 'EN' | 'AM';

export type HistoricalEra = 
  | 'ancient-axum' 
  | 'medieval-geez'
  | 'gondar-renaissance' 
  | 'unification-19th' 
  | 'adwa-victory-1896' 
  | 'patriot-resistance-1936' 
  | 'modern-legends';

export type DollCategory = 
  | 'historical-heroes-heroines' // Historical Heroes and Heroines Collection (Menelik II, Taytu Betul, Ras Alula, Tewodros II, Haile Selassie I, Empress Zewditu)
  | 'women-of-history'           // Women of Ethiopian History Collection (Taytu Betul, Empress Zewditu, Werede Mamo, Queen Makeda, Shewareged Gadle)
  | 'patriots-resistance'        // Ethiopian Patriots and Resistance Collection (Ras Alula, General Tadesse Biru, Belay Zeleke, Resistance Fighters, Jagama Kello)
  | 'sports-modern-achievement'  // Ethiopian Sports and Modern Achievement Collection (Abebe Bikila)
  | 'traditional-culture';       // Traditional Ethiopian Culture Collection (Saint Yared, Woven Tibeb, Regional Heritage)

export type DollDesignModel = 
  | 'lifelike-historical-hero' // Authentic Realistic Human Being Ethiopian Hero
  | 'heroic-warhorse'         // Magnificent sculpted bronze Ethiopian warhorse
  | 'reborn-realistic-toddler' // Hyper-realistic lifelike toddler reborn doll
  | 'fashion-articulated'     // Fashion poseable doll
  | 'anime-bjd-bigeyes'       // Anime / BJD doll
  | 'waldorf-ragdoll';        // Waldorf fabric ragdoll

export type DollSizeOption = 'standard-12-14' | 'mini-6-8' | 'collector-edition' | 'educational-set';

export interface VisualConfig {
  skinTone: string;
  dollDesignModel?: DollDesignModel;
  hairStyle: 'braids' | 'crown-hair' | 'patriot-afro' | 'royal-turban' | 'warrior-shaved' | 'long-wavy' | 'twin-braids' | 'yarn-bob' | 'curly-baby-curls' | 'afro-curly-curls' | 'scholar-cap' | 'geez-headband' | 'officer-hair';
  clothingStyle: 'imperial-kaba' | 'shamma-tibeb' | 'patriot-vest' | 'axum-silk' | 'adwa-warrior' | 'olympic-jersey' | 'modern-tibeb-crop' | 'waldorf-cardigan' | 'royal-toddler-collar' | 'floral-tulle-dress' | 'military-uniform' | 'geez-robes' | 'resistance-tunic' | 'modern-dress' | 'royal-dress';
  clothingPrimaryColor: string;
  clothingAccentColor: string;
  headwear?: 'lion-mane' | 'imperial-crown' | 'warrior-band' | 'empress-tiara' | 'patriot-beret' | 'sunglasses-headband' | 'officer-cap' | 'shash-headwrap' | 'gold-headband' | 'none';
  primaryWeapon?: 'shotel-sword' | 'patriot-rifle' | 'royal-scepter' | 'spear' | 'gold-medals' | 'masenqo-harp' | 'spear-warrior' | 'historical-book' | 'none';
  secondaryShield?: 'gold-filigree-shield' | 'embossed-leather-shield' | 'royal-parasol' | 'ammo-satchel' | 'chic-tote-bag' | 'officer-binoculars' | 'handbag-slate' | 'none';
  auraEffect?: 'golden-glow' | 'adwa-fire' | 'patriot-smoke' | 'none';
  pedestalStyle: 'gondar-stone' | 'axum-granite' | 'adwa-volcanic' | 'polished-brass' | 'wooden-bench' | 'velvet-cushion';
  toyExpression?: 'happy-smile' | 'cheerful-wink' | 'excited-laugh' | 'realistic-gentle';
  isWaving?: boolean;
}

export interface DollProduct {
  id: string;
  heroId: string;
  heroName: string;
  heroNameAmharic: string;
  title: string;
  titleAmharic: string;
  subtitle: string;
  category: DollCategory;
  ageRecommendation: string; // e.g. "ከ 1 ዓመት ጀምሮ (Ages 1+)"
  priceETB: number;
  priceUSD: number;
  scale: string;
  dimensions: string;
  weight: string;
  materials: string[];
  isWashable: boolean;
  isHypoallergenic: boolean;
  stockQuantity: number;
  inStock: boolean;
  isLimitedEdition: boolean;
  editionLimit?: number;
  rating: number;
  reviewsCount: number;
  accessoriesIncluded: string[];
  features: string[];
  bedtimeStoryTitle: string;
  bedtimeStorySummaryAmharic: string;
  historicalBackstory: string;
  historicalBackstoryAmharic: string;
  visualConfig: VisualConfig;
  boxArtworkName: string;
  imageUrl?: string;
  qrCodeUrl?: string;
  educationalCardTitle?: string;
  isDisplayCollectible?: boolean;
  posterFocusPosition?: string;
  officialQuote?: string;
}

export interface Hero {
  id: string;
  name: string;
  amharicName: string;
  horseName?: string;
  horseNameAmharic?: string;
  title: string;
  titleAmharic: string;
  era: HistoricalEra;
  eraLabel: string;
  eraLabelAmharic: string;
  years: string;
  location: string;
  locationAmharic: string;
  famousQuote: string;
  famousQuoteAmharic: string;
  kidsLesson: string;
  kidsLessonAmharic: string;
  fullBio: string;
  fullBioAmharic: string;
  posterFocusPosition?: string;
  dolls: DollProduct[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: DollProduct;
  quantity: number;
  customEngraving?: string;
  isCustomBuild?: boolean;
  customConfigSummary?: string;
}
