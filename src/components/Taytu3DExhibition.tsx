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
  Compass,
  Maximize,
  ChevronRight,
  Sliders,
  RotateCw,
  MapPin,
  Layers,
  X,
  Move3d,
  Heart
} from 'lucide-react';
import { Language } from '../types';

interface Taytu3DExhibitionProps {
  language: Language;
  onOpenBio?: () => void;
}

interface HotspotData {
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
}

const RAW_HOTSPOTS: HotspotData[] = [
  {
    id: 'tiara',
    title: 'Imperial Golden Tiara & Royal Headdress',
    titleAmharic: 'የእቴጌይቱ ንጉሣዊ የወርቅ አክሊል',
    category: 'Imperial Regalia',
    categoryAmharic: 'የንግሥና ክብር ማዕረግ',
    icon: 'crown',
    pos: [0, 3.2, 0.15],
    camTarget: [0, 3.05, 0],
    camPos: [0, 3.25, 1.8],
    period: 'Reign 1889 – 1913',
    significance: 'Empress of Wisdom & Co-Ruler',
    significanceAmharic: 'ብርሃን ዘኢትዮጵያና የጥበቧ እቴጌ',
    description:
      'Empress Taytu Betul was crowned alongside Emperor Menelik II. Her signature golden crown and tiara, studded with ruby and emerald accents and set above tightly braided hair, symbolized female majesty, political diplomacy, and Ethiopian sovereign strength.',
    descriptionAmharic:
      'እቴጌ ጣይቱ ብጡል በዘውድ በዓላቸው ወቅት ያደረጉት የወርቅ አክሊል፤ በከበሩ ማዕድናትና በወርቅ ጥልፍ የተዋበ፣ የንግሥናን ግርማ ሞገስ፣ ዲፕሎማሲያዊ ጥበብንና ሉዓላዊነትን የሚያንጸባርቅ ነው።'
  },
  {
    id: 'cross',
    title: 'Orthodox Cross Pendant & Gold Choker',
    titleAmharic: 'የመስቀል ሐብልና የወርቅ ድሪ',
    category: 'Faith & Heritage',
    categoryAmharic: 'ሃይማኖታዊና ባህላዊ ክብር',
    icon: 'sparkles',
    pos: [0, 2.45, 0.35],
    camTarget: [0, 2.4, 0],
    camPos: [0, 2.5, 1.7],
    period: 'Solomonic Heritage',
    significance: 'Steadfast Faith & Divine Guidance',
    significanceAmharic: 'የጸና እምነትና የጽናት መለያ',
    description:
      'Resting closely upon her neck is an authentic handcrafted Ethiopian Orthodox cross pendant, suspended from a woven golden choker cord, exemplifying Taytu’s devout spirituality and steadfast resolve before the Battle of Adwa.',
    descriptionAmharic:
      'በአንገታቸው ላይ ያረፈው በእጅ የተጠነሰሰ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መስቀል ሐብል፤ እቴጌ ጣይቱ ለአድዋ ጦርነት ከመዝመታቸው በፊት የነበራቸውን ጥልቅ እምነትና ጽናት ያሳያል።'
  },
  {
    id: 'sash',
    title: 'Adwa Victory Geometric Tibeb Sash',
    titleAmharic: 'የአድዋ ድል ባለቀለም የጥበብ ሻሽ',
    category: 'Battlefield Command & Honor',
    categoryAmharic: 'የጦር ሜዳ ጀግንነት መለያ',
    icon: 'award',
    pos: [-0.35, 1.85, 0.45],
    camTarget: [-0.1, 1.75, 0],
    camPos: [-0.55, 1.95, 2.0],
    period: 'Battle of Adwa (1896)',
    significance: 'Commander of the Adwa Reserve Forces',
    significanceAmharic: 'የመቀሌን ውኃ የቆረጡ የጦር መሪ',
    description:
      'Draped gracefully across her shoulder is the vivid Ethiopian tri-color silk sash with intricate diamond patterns and gold fringe tassels. It honors Empress Taytu’s military acumen at Mekelle, where she masterminded the water supply cutoff that crippled the invading Italian army.',
    descriptionAmharic:
      'በትከሻቸው ላይ ያረፈው አረንጓዴ፣ ቢጫና ቀይ የሐር ጥበብ ሻሽ፤ እቴጌ ጣይቱ በመቀሌ የመሽገውን የጠላት ጦር ውኃውን በማስቆረጥ ያሳዩትን አስደናቂ ወታደራዊ የስትራቴጂ ብልሃትና ድል ያከብራል።'
  },
  {
    id: 'plaque',
    title: 'Adwa Memorial Pedestal & Inscription',
    titleAmharic: 'የአድዋ መታሰቢያ የነሐስ ሰሌዳ',
    category: 'Historical Memorial',
    categoryAmharic: 'ታሪካዊ የመታሰቢያ ጽላት',
    icon: 'bookmark',
    pos: [0, -0.65, 0.75],
    camTarget: [0, -0.7, 0],
    camPos: [0, -0.2, 2.2],
    period: '1842 – 1918',
    significance: 'Light of Ethiopia & Founder of Addis Ababa',
    significanceAmharic: 'የአዲስ አበባ መስራችና የአድዋ ብርሃን',
    description:
      'The beveled plinth commemorates Empress Taytu Betul, wife of Emperor Menelik II, founder of the capital city Addis Ababa (Finfinnee), and unwavering defender of Ethiopian independence who famously declared: "I am a woman. I do not like war. But I would rather face death than accept your deceitful treaty!"',
    descriptionAmharic:
      '«እቴጌ ጣይቱ ብጡል (1842 – 1918) • የጥበቧ እቴጌ፣ የአዲስ አበባ መስራችና ሉዓላዊነትን አሳልፈው ያልሰጡ ጀግና እናት።» የሚል ጽሑፍ በወርቅ የተጻፈበት ጠንካራ መቆሚያ።'
  }
];

export const Taytu3DExhibition: React.FC<Taytu3DExhibitionProps> = ({
  language,
  onOpenBio
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<number>(0); // 0: Standard, 1: Clay Violet, 2: Wireframe
  const [activeLighting, setActiveLighting] = useState<'studio' | 'sunset' | 'museum'>('sunset');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeModalSpot, setActiveModalSpot] = useState<HotspotData | null>(null);
  const [screenCoords, setScreenCoords] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const [hintVisible, setHintVisible] = useState<boolean>(true);

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
  const playChime = (freq = 587.33, type: OscillatorType = 'sine', duration = 0.5) => {
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
      // AudioContext unavailable or restricted
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4.8);
    cameraRef.current = camera;

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. CONTROLS
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

    // 4. LIGHTING SETUP (Warm Royal Sunset Default)
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

    // 5. PROCEDURAL CANVAS TEXTURES
    // Plaque Texture
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 340;
    const ctxP = plaqueCanvas.getContext('2d')!;
    ctxP.fillStyle = '#0a0508';
    ctxP.fillRect(0, 0, 1024, 340);
    ctxP.strokeStyle = '#f43f5e';
    ctxP.lineWidth = 6;
    ctxP.strokeRect(16, 16, 1024 - 32, 340 - 32);
    ctxP.strokeStyle = '#d4af37';
    ctxP.lineWidth = 2;
    ctxP.strokeRect(26, 26, 1024 - 52, 340 - 52);

    ctxP.textAlign = 'center';
    ctxP.fillStyle = '#fef08a';
    ctxP.font = 'bold 52px serif';
    ctxP.fillText('Empress Taytu Betul', 512, 115);
    ctxP.fillStyle = '#fb7185';
    ctxP.font = 'italic 36px serif';
    ctxP.fillText('(1842 – 1918) • እቴጌ ጣይቱ ብጡል', 512, 175);
    ctxP.fillStyle = '#fce7f3';
    ctxP.font = '25px sans-serif';
    ctxP.fillText('Empress of Wisdom • Strategic Genius of Adwa', 512, 235);
    ctxP.fillText('Founder of Addis Ababa • Sovereign Defender', 512, 280);
    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);

    // Tibeb Sash Texture (Adwa Victory Vibrant Colors)
    const tibebCanvas = document.createElement('canvas');
    tibebCanvas.width = 1024;
    tibebCanvas.height = 256;
    const ctxT = tibebCanvas.getContext('2d')!;
    const h = 256 / 3;
    ctxT.fillStyle = '#059669';
    ctxT.fillRect(0, 0, 1024, h);
    ctxT.fillStyle = '#facc15';
    ctxT.fillRect(0, h, 1024, h);
    ctxT.fillStyle = '#e11d48';
    ctxT.fillRect(0, h * 2, 1024, h);
    ctxT.fillStyle = '#fef08a';
    ctxT.strokeStyle = '#4c0519';
    ctxT.lineWidth = 4;
    for (let x = 32; x < 1024; x += 64) {
      ctxT.beginPath();
      ctxT.arc(x, 128, 14, 0, Math.PI * 2);
      ctxT.fill();
      ctxT.stroke();
      ctxT.beginPath();
      ctxT.moveTo(x - 24, 60);
      ctxT.lineTo(x + 24, 196);
      ctxT.stroke();
      ctxT.beginPath();
      ctxT.moveTo(x + 24, 60);
      ctxT.lineTo(x - 24, 196);
      ctxT.stroke();
    }
    const tibebTexture = new THREE.CanvasTexture(tibebCanvas);
    tibebTexture.wrapS = THREE.RepeatWrapping;
    tibebTexture.wrapT = THREE.RepeatWrapping;
    tibebTexture.repeat.set(3, 1);

    // Pure White Habesha Kemis Fabric Texture
    const dressCanvas = document.createElement('canvas');
    dressCanvas.width = 512;
    dressCanvas.height = 512;
    const ctxD = dressCanvas.getContext('2d')!;
    ctxD.fillStyle = '#fffdfa';
    ctxD.fillRect(0, 0, 512, 512);
    for (let x = 0; x < 512; x += 8) {
      ctxD.strokeStyle = x % 32 === 0 ? '#fae8e0' : '#fff5f0';
      ctxD.lineWidth = x % 32 === 0 ? 2 : 1;
      ctxD.beginPath();
      ctxD.moveTo(x, 0);
      ctxD.lineTo(x, 512);
      ctxD.stroke();
    }
    const dressTexture = new THREE.CanvasTexture(dressCanvas);
    dressTexture.wrapS = THREE.RepeatWrapping;
    dressTexture.wrapT = THREE.RepeatWrapping;
    dressTexture.repeat.set(4, 2);

    // 6. MATERIALS
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x451a03,
      emissiveIntensity: 0.25
    });

    const rubyMaterial = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      metalness: 0.3,
      roughness: 0.1,
      emissive: 0x881337,
      emissiveIntensity: 0.4
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x713f12,
      roughness: 0.58,
      metalness: 0.04
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x140c0e,
      roughness: 0.85,
      metalness: 0.08
    });

    const whiteClothMaterial = new THREE.MeshStandardMaterial({
      map: dressTexture,
      color: 0xfffcf7,
      roughness: 0.72,
      metalness: 0.04
    });

    const tibebMaterial = new THREE.MeshStandardMaterial({
      map: tibebTexture,
      roughness: 0.45,
      metalness: 0.25
    });

    // 7. CONSTRUCT 3D FIGURINE
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;

    // Pedestal Base & Plinth
    const pedestalBaseGeo = new THREE.BoxGeometry(1.9, 0.22, 1.4);
    const plinthGeo = new THREE.BoxGeometry(1.6, 0.45, 1.15);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x190812,
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

    // Habesha Kemis Lower Dress
    const skirtGeo = new THREE.CylinderGeometry(0.5, 0.82, 1.6, 32);
    const skirtMesh = new THREE.Mesh(skirtGeo, whiteClothMaterial);
    skirtMesh.position.y = 0.5;
    skirtMesh.castShadow = true;
    skirtMesh.receiveShadow = true;
    modelGroup.add(skirtMesh);

    // Dress Hem Tibeb Band
    const hemGeo = new THREE.CylinderGeometry(0.81, 0.83, 0.22, 32);
    const hemMesh = new THREE.Mesh(hemGeo, tibebMaterial);
    hemMesh.position.y = -0.22;
    modelGroup.add(hemMesh);

    // Gold Slippers Peeking Out
    const slipperGeo = new THREE.BoxGeometry(0.14, 0.08, 0.25);
    const leftSlipper = new THREE.Mesh(slipperGeo, goldMaterial);
    leftSlipper.position.set(-0.2, -0.32, 0.4);
    const rightSlipper = new THREE.Mesh(slipperGeo, goldMaterial);
    rightSlipper.position.set(0.2, -0.32, 0.4);
    modelGroup.add(leftSlipper);
    modelGroup.add(rightSlipper);

    // Upper Torso / Bodice
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.48, 1.05, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, whiteClothMaterial);
    torsoMesh.position.y = 1.7;
    torsoMesh.castShadow = true;
    modelGroup.add(torsoMesh);

    // Decorative Central Gold Buttons
    for (let i = 0; i < 5; i++) {
      const buttonGeo = new THREE.SphereGeometry(0.025, 12, 12);
      const button = new THREE.Mesh(buttonGeo, goldMaterial);
      button.position.set(0, 1.45 + i * 0.12, 0.45);
      modelGroup.add(button);
    }

    // Diagonally Draped Adwa Victory Tibeb Sash
    const sashGeo = new THREE.TorusGeometry(0.52, 0.09, 16, 32, Math.PI * 1.15);
    const sashMesh = new THREE.Mesh(sashGeo, tibebMaterial);
    sashMesh.rotation.z = Math.PI / 4;
    sashMesh.rotation.y = Math.PI / 8;
    sashMesh.position.set(-0.05, 1.75, 0.1);
    sashMesh.castShadow = true;
    modelGroup.add(sashMesh);

    // Gold Tassels at Sash Fringe
    for (let i = 0; i < 4; i++) {
      const tasselGeo = new THREE.ConeGeometry(0.03, 0.12, 8);
      const tassel = new THREE.Mesh(tasselGeo, goldMaterial);
      tassel.position.set(-0.35 + i * 0.05, 1.35, 0.42);
      tassel.rotation.x = Math.PI;
      modelGroup.add(tassel);
    }

    // Sleeves
    const leftSleeveGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.75, 16);
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, whiteClothMaterial);
    leftSleeve.position.set(-0.52, 1.72, 0.05);
    leftSleeve.rotation.z = Math.PI / 6;
    modelGroup.add(leftSleeve);

    const rightSleeveGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.75, 16);
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, whiteClothMaterial);
    rightSleeve.position.set(0.52, 1.72, 0.05);
    rightSleeve.rotation.z = -Math.PI / 6;
    modelGroup.add(rightSleeve);

    // Gold Cuffs
    const cuffGeo = new THREE.CylinderGeometry(0.185, 0.185, 0.1, 16);
    const leftCuff = new THREE.Mesh(cuffGeo, goldMaterial);
    leftCuff.position.set(-0.68, 1.45, 0.05);
    leftCuff.rotation.z = Math.PI / 6;
    const rightCuff = new THREE.Mesh(cuffGeo, goldMaterial);
    rightCuff.position.set(0.68, 1.45, 0.05);
    rightCuff.rotation.z = -Math.PI / 6;
    modelGroup.add(leftCuff);
    modelGroup.add(rightCuff);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.35, 1.35, 0.35);
    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.35, 1.35, 0.35);
    modelGroup.add(leftHand);
    modelGroup.add(rightHand);

    // Gold Bracelets
    const braceletGeo = new THREE.TorusGeometry(0.095, 0.02, 12, 24);
    const leftBracelet = new THREE.Mesh(braceletGeo, goldMaterial);
    leftBracelet.position.copy(leftHand.position);
    leftBracelet.position.y += 0.05;
    const rightBracelet = new THREE.Mesh(braceletGeo, goldMaterial);
    rightBracelet.position.copy(rightHand.position);
    rightBracelet.position.y += 0.05;
    modelGroup.add(leftBracelet);
    modelGroup.add(rightBracelet);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.35, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.y = 2.4;
    modelGroup.add(neckMesh);

    // Gold Choker & Orthodox Cross Pendant
    const necklaceGeo = new THREE.TorusGeometry(0.16, 0.02, 12, 24);
    const necklace = new THREE.Mesh(necklaceGeo, goldMaterial);
    necklace.position.set(0, 2.38, 0);
    necklace.rotation.x = Math.PI / 2;
    modelGroup.add(necklace);

    const crossV = new THREE.BoxGeometry(0.025, 0.14, 0.02);
    const crossH = new THREE.BoxGeometry(0.09, 0.025, 0.02);
    const crossMeshV = new THREE.Mesh(crossV, goldMaterial);
    crossMeshV.position.set(0, 2.3, 0.18);
    const crossMeshH = new THREE.Mesh(crossH, goldMaterial);
    crossMeshH.position.set(0, 2.33, 0.18);
    modelGroup.add(crossMeshV);
    modelGroup.add(crossMeshH);

    // Head
    const headGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.y = 2.85;
    headMesh.castShadow = true;
    modelGroup.add(headMesh);

    // Traditional Coiled Hair Bun
    const bunGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const bunMesh = new THREE.Mesh(bunGeo, hairMaterial);
    bunMesh.position.set(0, 2.95, -0.15);
    modelGroup.add(bunMesh);

    // Golden Drop Earrings
    const earringGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const leftEarring = new THREE.Mesh(earringGeo, rubyMaterial);
    leftEarring.position.set(-0.3, 2.78, 0);
    const rightEarring = new THREE.Mesh(earringGeo, rubyMaterial);
    rightEarring.position.set(0.3, 2.78, 0);
    modelGroup.add(leftEarring);
    modelGroup.add(rightEarring);

    // EMPRESS TAYTU'S SIGNATURE IMPERIAL GOLD TIARA & CROWN
    const crownBaseGeo = new THREE.CylinderGeometry(0.29, 0.27, 0.1, 32);
    const crownBase = new THREE.Mesh(crownBaseGeo, goldMaterial);
    crownBase.position.y = 3.12;
    modelGroup.add(crownBase);

    // Tiara Filigree Spikes with Ruby Accents
    const spikeCount = 9;
    for (let i = 0; i < spikeCount; i++) {
      const angle = (i / spikeCount) * Math.PI * 2;
      const r = 0.28;
      const spikeGeo = new THREE.ConeGeometry(0.045, 0.22, 8);
      const spike = new THREE.Mesh(spikeGeo, goldMaterial);
      spike.position.set(Math.cos(angle) * r, 3.23, Math.sin(angle) * r);
      modelGroup.add(spike);

      // Ruby jewel node at the tip of each spike
      const gemGeo = new THREE.SphereGeometry(0.022, 8, 8);
      const gem = new THREE.Mesh(gemGeo, rubyMaterial);
      gem.position.set(Math.cos(angle) * r, 3.34, Math.sin(angle) * r);
      modelGroup.add(gem);
    }

    // Top Tiara Crest Cross
    const tiaraCrossV = new THREE.BoxGeometry(0.02, 0.16, 0.02);
    const tiaraCrossH = new THREE.BoxGeometry(0.1, 0.02, 0.02);
    const crossTopV = new THREE.Mesh(tiaraCrossV, goldMaterial);
    crossTopV.position.set(0, 3.42, 0);
    const crossTopH = new THREE.Mesh(tiaraCrossH, goldMaterial);
    crossTopH.position.set(0, 3.45, 0);
    modelGroup.add(crossTopV);
    modelGroup.add(crossTopH);

    // Contact Soft Shadow Plane Under Pedestal
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

    scene.add(modelGroup);

    // 8. ANIMATION LOOP
    let animationFrameId: number;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards preset targets
      camera.position.lerp(targetCamPosRef.current, 0.05);
      controls.target.lerp(targetCamLookRef.current, 0.05);

      // Auto-rotation when turntable is enabled
      if (autoRotateRef.current) {
        modelGroup.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);

      // Project 3D Hotspot Coordinates to 2D Screen
      if (showHotspotsRef.current) {
        const newCoords: Record<string, { x: number; y: number; visible: boolean }> = {};
        const widthHalf = container.clientWidth / 2;
        const heightHalf = container.clientHeight / 2;

        RAW_HOTSPOTS.forEach(spot => {
          tempVec.set(...spot.pos);
          tempVec.applyMatrix4(modelGroup.matrixWorld);
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

    // 9. RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
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

  // Update Wireframe / Clay mode
  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;

    group.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        if (wireframeMode === 2) {
          // Wireframe Topology Mode
          obj.material.wireframe = true;
          obj.material.color = new THREE.Color(0xf43f5e);
        } else if (wireframeMode === 1) {
          // Clay Violet Mode
          obj.material.wireframe = false;
          obj.material.color = new THREE.Color(0x9d4edd);
          obj.material.roughness = 0.8;
          obj.material.metalness = 0.05;
        } else {
          // Standard Finished Mode
          obj.material.wireframe = false;
        }
      }
    });
  }, [wireframeMode]);

  // Update Lighting Atmosphere
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
      // Museum / Dramatic
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

  // Focus on Hotspot
  const handleSelectHotspot = (spot: HotspotData) => {
    playChime(659.25, 'sine', 0.6);
    targetCamPosRef.current.set(...spot.camPos);
    targetCamLookRef.current.set(...spot.camTarget);
    setAutoRotate(false);
    setActiveModalSpot(spot);
  };

  // Reset Camera View
  const handleResetCamera = (pos: [number, number, number], look: [number, number, number]) => {
    playChime(440, 'triangle', 0.4);
    targetCamPosRef.current.set(...pos);
    targetCamLookRef.current.set(...look);
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#200713] via-[#12030a] to-[#070104] border-2 border-[#f43f5e]/60 shadow-2xl flex flex-col select-none group">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Floating Overlay */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-2xl bg-black/85 border border-[#f43f5e]/70 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] animate-ping" />
            <span className="font-serif font-black text-[#fef08a] tracking-wide">
              {language === 'AM' ? 'እቴጌ ጣይቱ • 3D በይነ-መረብ ኤግዚቢሽን' : 'Empress Taytu • 3D Interactive Exhibition'}
            </span>
            <span className="text-[10px] text-pink-300 font-mono bg-pink-950/70 px-1.5 py-0.5 rounded border border-pink-700/40">
              WebGL 2.0
            </span>
          </div>
        </div>

        {/* Audio & Bio Quick Action */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border backdrop-blur-md shadow-lg transition-all ${
              soundEnabled
                ? 'bg-black/80 border-[#f43f5e] text-[#fef08a] hover:bg-[#3b0b1d]'
                : 'bg-black/60 border-neutral-700 text-neutral-400'
            }`}
            title="Toggle Web Audio Synthesizer Chimes"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* 3D to 2D Screen Hotspot Pins Overlay */}
      {showHotspots && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {RAW_HOTSPOTS.map(spot => {
            const coord = screenCoords[spot.id];
            if (!coord || !coord.visible) return null;

            return (
              <div
                key={spot.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group/pin"
                style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
                onClick={() => handleSelectHotspot(spot)}
              >
                {/* Outer Pulsing Aura Ring */}
                <span className="absolute -inset-2 rounded-full bg-[#f43f5e]/40 animate-ping" />
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#9f1239] via-[#e11d48] to-[#f43f5e] border-2 border-[#fef08a] text-white shadow-xl hover:scale-125 transition-transform duration-200">
                  {spot.icon === 'crown' && <Crown size={14} className="text-[#fef08a]" />}
                  {spot.icon === 'award' && <Award size={14} className="text-[#fef08a]" />}
                  {spot.icon === 'sparkles' && <Sparkles size={14} className="text-[#fef08a]" />}
                  {spot.icon === 'bookmark' && <Bookmark size={14} className="text-[#fef08a]" />}
                </span>

                {/* Floating Tooltip Label */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-black/90 border border-[#f43f5e]/80 backdrop-blur-md text-[11px] font-bold text-white whitespace-nowrap shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                  <span className="text-[#fef08a]">{language === 'AM' ? spot.titleAmharic : spot.title}</span>
                  <ChevronRight size={12} className="text-[#f43f5e]" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Helper Hint */}
      {hintVisible && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-pulse">
          <div className="px-4 py-1.5 rounded-full bg-black/85 border border-[#f43f5e] text-pink-200 text-xs font-medium backdrop-blur-md shadow-2xl flex items-center gap-2">
            <Move3d size={14} className="text-[#f43f5e]" />
            <span>{language === 'AM' ? 'ለማሽከርከር ይጎትቱ • ለማጉላት ዙም ያድርጉ' : 'Drag to Orbit 360° • Pinch / Wheel to Zoom'}</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Control Bar */}
      <div className="relative mt-auto z-20 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-auto flex flex-wrap items-center justify-between gap-3">
        {/* Preset Angle Buttons */}
        <div className="flex items-center gap-1.5 bg-black/85 p-1 rounded-2xl border border-neutral-800 backdrop-blur-md">
          <button
            onClick={() => handleResetCamera([0, 1.5, 4.8], [0, 1.2, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#fef08a] hover:bg-[#3b0b1d] transition-all"
          >
            {language === 'AM' ? 'ሙሉ ቅርጽ' : 'Full'}
          </button>
          <button
            onClick={() => handleResetCamera([0, 3.25, 1.8], [0, 3.05, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-pink-300 hover:bg-[#3b0b1d] transition-all"
          >
            {language === 'AM' ? 'አክሊል' : 'Tiara'}
          </button>
          <button
            onClick={() => handleResetCamera([-0.55, 1.95, 2.0], [-0.1, 1.75, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-amber-300 hover:bg-[#3b0b1d] transition-all"
          >
            {language === 'AM' ? 'የአድዋ ሻሽ' : 'Adwa Sash'}
          </button>
          <button
            onClick={() => handleResetCamera([0, -0.2, 2.2], [0, -0.7, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-neutral-300 hover:bg-[#3b0b1d] transition-all"
          >
            {language === 'AM' ? 'ሰሌዳ' : 'Plaque'}
          </button>
        </div>

        {/* Feature Toggles & Studio Lighting */}
        <div className="flex items-center gap-2">
          {/* Turntable Auto-spin */}
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
            title="Toggle 360° Auto-Turntable Rotation"
          >
            <RotateCw size={14} className={autoRotate ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{language === 'AM' ? 'ዙረት' : 'Turntable'}</span>
          </button>

          {/* Hotspot Pins Toggle */}
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
            title="Toggle Interactive Regalia Hotspot Pins"
          >
            <MapPin size={14} />
            <span className="hidden sm:inline">{language === 'AM' ? 'ምልክቶች' : 'Pins'}</span>
          </button>

          {/* Wireframe / Clay Topology Mode */}
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

          {/* Lighting Mode Switcher */}
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

      {/* Hotspot Detail Modal Dialog */}
      {activeModalSpot && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#240816] via-[#15040d] to-[#0a0206] border-2 border-[#f43f5e] rounded-3xl p-6 shadow-2xl space-y-4">
            {/* Top Close Button */}
            <button
              onClick={() => setActiveModalSpot(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-[#da121a] text-neutral-300 hover:text-white border border-pink-700/50 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Category & Header */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#fca5a5] font-black font-mono">
                {language === 'AM' ? activeModalSpot.categoryAmharic : activeModalSpot.category} • {activeModalSpot.period}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white flex items-center gap-2">
                <Crown size={22} className="text-[#fef08a]" />
                <span>{language === 'AM' ? activeModalSpot.titleAmharic : activeModalSpot.title}</span>
              </h3>
            </div>

            {/* Significance Badge */}
            <div className="p-3 rounded-2xl bg-[#3b0b1d]/80 border border-[#f43f5e]/60 flex items-center gap-3">
              <Sparkles size={18} className="text-[#fef08a] shrink-0" />
              <div className="text-xs text-[#fef08a] font-bold">
                {language === 'AM' ? activeModalSpot.significanceAmharic : activeModalSpot.significance}
              </div>
            </div>

            {/* Historical Description */}
            <p className="text-sm text-pink-100/90 leading-relaxed font-normal">
              {language === 'AM' ? activeModalSpot.descriptionAmharic : activeModalSpot.description}
            </p>

            {/* Action Buttons */}
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
  );
};

