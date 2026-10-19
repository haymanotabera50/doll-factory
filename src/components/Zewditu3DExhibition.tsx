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
  Move3d
} from 'lucide-react';
import { Language } from '../types';

interface Zewditu3DExhibitionProps {
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
    id: 'crown',
    title: 'Imperial Ethiopian Crown',
    titleAmharic: 'ንጉሣዊ የወርቅ ዘውድ',
    category: 'Coronation Regalia',
    categoryAmharic: 'የንግሥና ክብር ማዕረግ',
    icon: 'crown',
    pos: [0, 3.25, 0.15],
    camTarget: [0, 3.1, 0],
    camPos: [0, 3.3, 1.8],
    period: 'November 11, 1917',
    significance: 'Solemn Empress Regnant',
    significanceAmharic: 'የኢትዮጵያ ንግሥተ ነገሥታት ክብር',
    description:
      'Empress Zewditu wore this iconic high-crested Ethiopian golden crown at her coronation in St. George’s Cathedral, Addis Ababa. Adorned with filigree, orthodox cross symbols, and precious gemstones, it heralded her historic ascension as the first female head of state of an internationally recognized African empire.',
    descriptionAmharic:
      'ንግሥተ ነገሥታት ዘውዲቱ በቅዱስ ጊዮርጊስ ካቴድራል በንግሥና በዓላቸው ላይ ያደረጉት ባለብዙ ፎቅ የወርቅ ዘውድ። በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መስቀል፣ በወርቅ ጥልፍና በከበሩ ማዕድናት ያጌጠ ታሪካዊ ዘውድ ነው።'
  },
  {
    id: 'sash',
    title: 'Imperial Order Sash',
    titleAmharic: 'ንጉሣዊ ባለቀለም ሻሽና ሰንደቅ',
    category: 'Royal Insignia',
    categoryAmharic: 'የመንግሥት መለያ ምልክት',
    icon: 'award',
    pos: [-0.35, 1.9, 0.45],
    camTarget: [-0.1, 1.8, 0],
    camPos: [-0.6, 2.0, 2.0],
    period: 'Solomonic Dynasty',
    significance: 'Order of Solomon & Seal',
    significanceAmharic: 'የሰሎሞናዊ መንግሥት ክብር',
    description:
      'Draped diagonally across her chest is the majestic royal sash boasting the pan-Ethiopian tri-colors (emerald green, imperial yellow, and crimson red) woven with golden intertwining knotwork (Tibeb) representing eternity and divine sovereignty.',
    descriptionAmharic:
      'በትከሻቸው ላይ አቋርጦ ያረፈው አረንጓዴ፣ ቢጫና ቀይ የሰንደቅ አላማ ጥበብ ሻሽ፤ በወርቃማ የሰሎሞናዊ ጥበብ ቋጠሮ የተሸመነ የዘላቂነትና የመንግሥት ክብር መለያ ነው።'
  },
  {
    id: 'dress',
    title: 'Royal Habesha Kemis',
    titleAmharic: 'ንጹህ ነጭ ባህላዊ የሐበሻ ቀሚስ',
    category: 'Traditional Attire',
    categoryAmharic: 'ባህላዊ የንጉሣዊ ልብስ',
    icon: 'sparkles',
    pos: [0, 0.95, 0.55],
    camTarget: [0, 1.0, 0],
    camPos: [0, 1.2, 2.6],
    period: 'Hand-woven Cotton (Shemma)',
    significance: 'Cultural Identity & Elegance',
    significanceAmharic: 'ባህላዊ ውበትና ንጽህና',
    description:
      'The Empress wears a pristine white hand-woven Ethiopian Habesha Kemis, finished with voluminous pleats and broad ornate bands of vibrant embroidery along the hems and wrists. Her attire reflected modesty, deep Christian faith, and cultural pride.',
    descriptionAmharic:
      'ከንጹህ የሀገር ጥጥ በእጅ የተሸመነ ነጭ የሐበሻ ቀሚስ፤ በግርጌውና በእጅጌው ላይ በደማቅ ቀለማት የተጠለፈ ባህላዊ የጥበብ ዳርቻ አለው።'
  },
  {
    id: 'plaque',
    title: 'Museum Pedestal & Inscription',
    titleAmharic: 'የተቀረጸበት ጥቁር የክብር ፕሊንዝ',
    category: 'Historical Memorial',
    categoryAmharic: 'ታሪካዊ የመታሰቢያ ሰሌዳ',
    icon: 'bookmark',
    pos: [0, -0.65, 0.75],
    camTarget: [0, -0.7, 0],
    camPos: [0, -0.2, 2.2],
    period: '1876 – 1930 (Reign 1916–1930)',
    significance: 'First Female Emperor of Modern Africa',
    significanceAmharic: 'በዘመናዊት አፍሪካ የመጀመሪያዋ ሴት መሪ',
    description:
      'The beveled plinth immortalizes Empress Zewditu, daughter of Emperor Menelik II. Rising during complex geopolitical tides and internal transitions, she was beloved by her people as a champion of unity, church patronage, and peaceful statecraft.',
    descriptionAmharic:
      '«Empress Zewditu (1876 – 1930) • The first female emperor. A symbol of hope. A leader for her people.» የሚል የወርቅ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።'
  }
];

export const Zewditu3DExhibition: React.FC<Zewditu3DExhibitionProps> = ({
  language,
  onOpenBio
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<number>(0); // 0: Standard, 1: Clay Violet, 2: Wireframe
  const [activeLighting, setActiveLighting] = useState<'studio' | 'sunset' | 'museum'>('studio');
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
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration * 0.3);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context policy
    }
  };

  const playClick = () => playChime(880, 'triangle', 0.15);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x160a24, 0.045);
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

    // 4. LIGHTING SETUP
    const ambient = new THREE.AmbientLight(0xffeedd, 0.85);
    scene.add(ambient);

    const key = new THREE.SpotLight(0xfff5e6, 2.2);
    key.position.set(2.5, 4.5, 3.5);
    key.angle = Math.PI / 4;
    key.penumbra = 0.5;
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xa78bfa, 0.9);
    fill.position.set(-3.5, 2.0, 2.0);
    scene.add(fill);

    const back = new THREE.DirectionalLight(0xf59e0b, 1.4);
    back.position.set(0, 3.5, -3.0);
    scene.add(back);

    const pedestal = new THREE.PointLight(0xfef08a, 0.6, 6);
    pedestal.position.set(0, 0.2, 1.5);
    scene.add(pedestal);

    lightsRef.current = { ambient, key, fill, back, pedestal };

    // 5. PROCEDURAL CANVAS TEXTURES
    // Plaque Texture
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 340;
    const ctxP = plaqueCanvas.getContext('2d')!;
    ctxP.fillStyle = '#0a0a0c';
    ctxP.fillRect(0, 0, 1024, 340);
    ctxP.strokeStyle = '#d4af37';
    ctxP.lineWidth = 6;
    ctxP.strokeRect(16, 16, 1024 - 32, 340 - 32);
    ctxP.strokeStyle = '#926a12';
    ctxP.lineWidth = 2;
    ctxP.strokeRect(26, 26, 1024 - 52, 340 - 52);

    ctxP.textAlign = 'center';
    ctxP.fillStyle = '#f8e8a2';
    ctxP.font = 'bold 54px serif';
    ctxP.fillText('Empress Zewditu', 512, 125);
    ctxP.fillStyle = '#f0c75e';
    ctxP.font = 'italic 38px serif';
    ctxP.fillText('(1876 – 1930)', 512, 185);
    ctxP.fillStyle = '#d1b988';
    ctxP.font = '26px sans-serif';
    ctxP.fillText('The first female emperor. A symbol of hope.', 512, 245);
    ctxP.fillText('A leader for her people.', 512, 285);
    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);

    // Tibeb Sash Texture
    const tibebCanvas = document.createElement('canvas');
    tibebCanvas.width = 1024;
    tibebCanvas.height = 256;
    const ctxT = tibebCanvas.getContext('2d')!;
    const h = 256 / 3;
    ctxT.fillStyle = '#059669';
    ctxT.fillRect(0, 0, 1024, h);
    ctxT.fillStyle = '#facc15';
    ctxT.fillRect(0, h, 1024, h);
    ctxT.fillStyle = '#dc2626';
    ctxT.fillRect(0, h * 2, 1024, h);
    ctxT.fillStyle = '#fef08a';
    ctxT.strokeStyle = '#78350f';
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

    // Shemma Dress Texture
    const dressCanvas = document.createElement('canvas');
    dressCanvas.width = 512;
    dressCanvas.height = 512;
    const ctxD = dressCanvas.getContext('2d')!;
    ctxD.fillStyle = '#fcfbfa';
    ctxD.fillRect(0, 0, 512, 512);
    for (let x = 0; x < 512; x += 8) {
      ctxD.strokeStyle = x % 32 === 0 ? '#e2dacf' : '#f0eae1';
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
      color: 0xebbe4d,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x422a00,
      emissiveIntensity: 0.2
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x764b32,
      roughness: 0.55,
      metalness: 0.05
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x181113,
      roughness: 0.85,
      metalness: 0.1
    });

    const whiteClothMaterial = new THREE.MeshStandardMaterial({
      map: dressTexture,
      color: 0xfbf9f5,
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
      color: 0x121017,
      roughness: 0.35,
      metalness: 0.6
    });

    const pedestalBase = new THREE.Mesh(pedestalBaseGeo, baseMat);
    pedestalBase.position.y = -0.95;
    pedestalBase.receiveShadow = true;
    modelGroup.add(pedestalBase);

    const plinth = new THREE.Mesh(plinthGeo, baseMat);
    plinth.position.y = -0.65;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    modelGroup.add(plinth);

    // Gold Plaque on front
    const plaqueGeo = new THREE.PlaneGeometry(1.35, 0.35);
    const plaqueMat = new THREE.MeshBasicMaterial({ map: plaqueTexture });
    const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaque.position.set(0, -0.65, 0.58);
    modelGroup.add(plaque);

    // Standing Footing Platform
    const standGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.08, 36);
    const stand = new THREE.Mesh(
      standGeo,
      new THREE.MeshStandardMaterial({
        color: 0x241d2d,
        roughness: 0.3,
        metalness: 0.4
      })
    );
    stand.position.y = -0.4;
    stand.receiveShadow = true;
    modelGroup.add(stand);

    // Skirt
    const skirtGeo = new THREE.CylinderGeometry(0.42, 0.76, 1.45, 36, 1, true);
    const skirt = new THREE.Mesh(skirtGeo, whiteClothMaterial);
    skirt.position.y = 0.35;
    skirt.castShadow = true;
    modelGroup.add(skirt);

    // Skirt Hem Border
    const skirtBorderGeo = new THREE.CylinderGeometry(0.74, 0.77, 0.35, 36);
    const skirtBorder = new THREE.Mesh(skirtBorderGeo, tibebMaterial);
    skirtBorder.position.y = -0.2;
    skirtBorder.castShadow = true;
    modelGroup.add(skirtBorder);

    // Torus Hem Ring
    const hemGoldRingGeo = new THREE.TorusGeometry(0.77, 0.015, 12, 48);
    hemGoldRingGeo.rotateX(Math.PI / 2);
    const hemRing = new THREE.Mesh(hemGoldRingGeo, goldMaterial);
    hemRing.position.y = -0.36;
    modelGroup.add(hemRing);

    // Slippers
    const shoeGeo = new THREE.BoxGeometry(0.12, 0.06, 0.22);
    const leftShoe = new THREE.Mesh(shoeGeo, goldMaterial);
    leftShoe.position.set(-0.15, -0.37, 0.32);
    const rightShoe = leftShoe.clone();
    rightShoe.position.x = 0.15;
    modelGroup.add(leftShoe);
    modelGroup.add(rightShoe);

    // Torso & Belt
    const torsoGeo = new THREE.CylinderGeometry(0.36, 0.42, 0.9, 32);
    const torso = new THREE.Mesh(torsoGeo, whiteClothMaterial);
    torso.position.y = 1.45;
    torso.castShadow = true;
    modelGroup.add(torso);

    const beltGeo = new THREE.CylinderGeometry(0.425, 0.425, 0.12, 32);
    const belt = new THREE.Mesh(beltGeo, tibebMaterial);
    belt.position.y = 1.05;
    modelGroup.add(belt);

    // Cross-body Sash
    const sashCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.32, 2.05, 0.15),
      new THREE.Vector3(0.18, 1.7, 0.42),
      new THREE.Vector3(-0.12, 1.35, 0.44),
      new THREE.Vector3(-0.42, 1.0, 0.25),
      new THREE.Vector3(-0.48, 0.7, -0.05),
      new THREE.Vector3(-0.35, 0.5, -0.32)
    ]);
    const sashGeo = new THREE.TubeGeometry(sashCurve, 40, 0.11, 12, false);
    const sash = new THREE.Mesh(sashGeo, tibebMaterial);
    sash.castShadow = true;
    modelGroup.add(sash);

    const sashDropGeo = new THREE.BoxGeometry(0.18, 0.8, 0.05);
    const sashDrop = new THREE.Mesh(sashDropGeo, tibebMaterial);
    sashDrop.position.set(-0.46, 0.65, 0.22);
    sashDrop.rotation.z = 0.12;
    modelGroup.add(sashDrop);

    // Sleeves
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.44, 1.78, 0.05);
    const sleeveGeo = new THREE.CylinderGeometry(0.14, 0.2, 0.7, 24);
    const leftSleeve = new THREE.Mesh(sleeveGeo, whiteClothMaterial);
    leftSleeve.position.set(-0.06, -0.28, 0.12);
    leftSleeve.rotation.set(0.4, 0.15, -0.35);
    leftArmGroup.add(leftSleeve);

    const cuffGeo = new THREE.CylinderGeometry(0.205, 0.205, 0.09, 24);
    const leftCuff = new THREE.Mesh(cuffGeo, tibebMaterial);
    leftCuff.position.copy(leftSleeve.position);
    leftCuff.rotation.copy(leftSleeve.rotation);
    leftArmGroup.add(leftCuff);
    modelGroup.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.44, 1.78, 0.05);
    const rightSleeve = new THREE.Mesh(sleeveGeo, whiteClothMaterial);
    rightSleeve.position.set(0.06, -0.28, 0.12);
    rightSleeve.rotation.set(0.4, -0.15, 0.35);
    rightArmGroup.add(rightSleeve);

    const rightCuff = new THREE.Mesh(cuffGeo, tibebMaterial);
    rightCuff.position.copy(rightSleeve.position);
    rightCuff.rotation.copy(rightSleeve.rotation);
    rightArmGroup.add(rightCuff);
    modelGroup.add(rightArmGroup);

    // Forearms & Clasped Hands
    const handsGroup = new THREE.Group();
    handsGroup.position.set(0, 1.45, 0.42);
    const handsGeo = new THREE.SphereGeometry(0.14, 24, 24);
    handsGeo.scale(1.2, 0.7, 0.9);
    const hands = new THREE.Mesh(handsGeo, skinMaterial);
    handsGroup.add(hands);

    const braceletGeo = new THREE.TorusGeometry(0.095, 0.02, 12, 24);
    const leftBracelet = new THREE.Mesh(braceletGeo, goldMaterial);
    leftBracelet.position.set(-0.16, 0.02, -0.05);
    leftBracelet.rotation.y = 0.5;
    const rightBracelet = leftBracelet.clone();
    rightBracelet.position.x = 0.16;
    rightBracelet.rotation.y = -0.5;
    handsGroup.add(leftBracelet);
    handsGroup.add(rightBracelet);
    modelGroup.add(handsGroup);

    // Neck & Cross Pendant
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.3, 24);
    const neck = new THREE.Mesh(neckGeo, skinMaterial);
    neck.position.y = 2.05;
    modelGroup.add(neck);

    const necklaceGeo = new THREE.TorusGeometry(0.18, 0.015, 12, 32);
    necklaceGeo.rotateX(Math.PI / 2.3);
    const necklace = new THREE.Mesh(necklaceGeo, goldMaterial);
    necklace.position.set(0, 1.95, 0.08);
    modelGroup.add(necklace);

    const crossVGeo = new THREE.BoxGeometry(0.035, 0.14, 0.02);
    const crossHGeo = new THREE.BoxGeometry(0.1, 0.035, 0.02);
    const crossV = new THREE.Mesh(crossVGeo, goldMaterial);
    const crossH = new THREE.Mesh(crossHGeo, goldMaterial);
    crossH.position.y = 0.02;
    const crossGroup = new THREE.Group();
    crossGroup.add(crossV);
    crossGroup.add(crossH);
    crossGroup.position.set(0, 1.83, 0.27);
    crossGroup.rotation.x = 0.2;
    modelGroup.add(crossGroup);

    // Head & Hair
    const headGeo = new THREE.SphereGeometry(0.24, 32, 32);
    headGeo.scale(0.95, 1.15, 1.0);
    const head = new THREE.Mesh(headGeo, skinMaterial);
    head.position.set(0, 2.38, 0.05);
    head.castShadow = true;
    modelGroup.add(head);

    const hairGeo = new THREE.SphereGeometry(0.28, 28, 28);
    hairGeo.scale(1.05, 1.05, 1.15);
    const hair = new THREE.Mesh(hairGeo, hairMaterial);
    hair.position.set(0, 2.42, -0.06);
    modelGroup.add(hair);

    const earringGeo = new THREE.SphereGeometry(0.025, 12, 12);
    const leftEarring = new THREE.Mesh(earringGeo, goldMaterial);
    leftEarring.position.set(-0.25, 2.32, 0.03);
    const rightEarring = leftEarring.clone();
    rightEarring.position.x = 0.25;
    modelGroup.add(leftEarring);
    modelGroup.add(rightEarring);

    // Imperial Crown
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 2.65, 0.04);
    const crownBaseGeo = new THREE.CylinderGeometry(0.27, 0.25, 0.12, 32);
    const crownBase = new THREE.Mesh(crownBaseGeo, goldMaterial);
    crownGroup.add(crownBase);

    const numSpikes = 8;
    for (let i = 0; i < numSpikes; i++) {
      const angle = (i / numSpikes) * Math.PI * 2;
      const spikeGeo = new THREE.ConeGeometry(0.05, 0.24, 16);
      const spike = new THREE.Mesh(spikeGeo, goldMaterial);
      spike.position.set(Math.cos(angle) * 0.25, 0.15, Math.sin(angle) * 0.25);
      spike.rotation.y = -angle;
      spike.rotation.z = -0.15;
      crownGroup.add(spike);

      const gemGeo = new THREE.SphereGeometry(0.02, 12, 12);
      const gemMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xef4444 : 0x10b981,
        roughness: 0.1,
        metalness: 0.9,
        emissive: i % 2 === 0 ? 0x7f1d1d : 0x064e3b,
        emissiveIntensity: 0.3
      });
      const gem = new THREE.Mesh(gemGeo, gemMat);
      gem.position.set(Math.cos(angle) * 0.27, 0.0, Math.sin(angle) * 0.27);
      crownGroup.add(gem);
    }

    const topCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.12, 0.015), goldMaterial);
    const topCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, 0.015), goldMaterial);
    topCrossH.position.y = 0.02;
    const topCross = new THREE.Group();
    topCross.add(topCrossV);
    topCross.add(topCrossH);
    topCross.position.set(0, 0.34, 0);
    crownGroup.add(topCross);
    crownGroup.castShadow = true;
    modelGroup.add(crownGroup);

    // Floor Shadow Disc
    const discGeo = new THREE.CircleGeometry(2.2, 48);
    discGeo.rotateX(-Math.PI / 2);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x09040e,
      transparent: true,
      opacity: 0.65
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = -1.06;
    scene.add(disc);

    scene.add(modelGroup);

    // 8. ANIMATION & HOTSPOT PROJECTION LOOP
    let animationFrameId: number;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotateRef.current) {
        modelGroup.rotation.y += 0.005;
      }

      camera.position.lerp(targetCamPosRef.current, 0.04);
      controls.target.lerp(targetCamLookRef.current, 0.04);
      controls.update();

      // Project hotspots to screen coordinates
      if (showHotspotsRef.current) {
        const coords: Record<string, { x: number; y: number; visible: boolean }> = {};
        RAW_HOTSPOTS.forEach(spot => {
          tempV.set(...spot.pos);
          tempV.applyAxisAngle(new THREE.Vector3(0, 1, 0), modelGroup.rotation.y);
          tempV.project(camera);

          if (tempV.z > 1) {
            coords[spot.id] = { x: 0, y: 0, visible: false };
          } else {
            const x = (tempV.x * 0.5 + 0.5) * width;
            const y = (-tempV.y * 0.5 + 0.5) * height;
            coords[spot.id] = { x, y, visible: true };
          }
        });
        setScreenCoords(coords);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Hotspot selection handler
  const handleSelectHotspot = (spot: HotspotData) => {
    playClick();
    setAutoRotate(false);
    targetCamPosRef.current.set(...spot.camPos);
    targetCamLookRef.current.set(...spot.camTarget);
    setActiveModalSpot(spot);
  };

  // Preset lighting atmosphere
  const handleSetLighting = (preset: 'studio' | 'sunset' | 'museum') => {
    playClick();
    setActiveLighting(preset);
    const lights = lightsRef.current;
    if (!lights) return;

    if (preset === 'studio') {
      lights.ambient.color.setHex(0xffeedd);
      lights.ambient.intensity = 0.85;
      lights.key.color.setHex(0xfff5e6);
      lights.key.intensity = 2.2;
      lights.fill.color.setHex(0xa78bfa);
      lights.fill.intensity = 0.9;
      lights.back.color.setHex(0xf59e0b);
      lights.back.intensity = 1.4;
    } else if (preset === 'sunset') {
      lights.ambient.color.setHex(0xff9966);
      lights.ambient.intensity = 0.6;
      lights.key.color.setHex(0xffaa44);
      lights.key.intensity = 2.8;
      lights.fill.color.setHex(0x7c2d12);
      lights.fill.intensity = 0.7;
      lights.back.color.setHex(0xfde047);
      lights.back.intensity = 2.0;
    } else if (preset === 'museum') {
      lights.ambient.color.setHex(0x382b4a);
      lights.ambient.intensity = 0.35;
      lights.key.color.setHex(0xfff8db);
      lights.key.intensity = 3.6;
      lights.fill.color.setHex(0x4c1d95);
      lights.fill.intensity = 0.4;
      lights.back.color.setHex(0x6366f1);
      lights.back.intensity = 1.2;
    }
  };

  // Wireframe toggle
  const handleToggleWireframe = () => {
    playClick();
    const nextMode = (wireframeMode + 1) % 3;
    setWireframeMode(nextMode);

    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    modelGroup.traverse(child => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as any;
        if (nextMode === 0) {
          mat.wireframe = false;
          if (mesh.userData.originalMat) {
            mesh.material = mesh.userData.originalMat;
          }
        } else if (nextMode === 1) {
          if (!mesh.userData.originalMat) mesh.userData.originalMat = mesh.material;
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x9333ea,
            roughness: 0.6,
            metalness: 0.1
          });
          (mesh.material as any).wireframe = false;
        } else if (nextMode === 2) {
          mat.wireframe = true;
        }
      }
    });
  };

  // Camera presets
  const handleSetCameraAngle = (angle: 'full' | 'crown' | 'sash' | 'plaque') => {
    playClick();
    if (angle === 'full') {
      targetCamPosRef.current.set(0, 1.5, 4.8);
      targetCamLookRef.current.set(0, 1.2, 0);
    } else {
      const spot = RAW_HOTSPOTS.find(h => h.id === angle);
      if (spot) {
        targetCamPosRef.current.set(...spot.camPos);
        targetCamLookRef.current.set(...spot.camTarget);
      }
    }
  };

  const resetCamera = () => {
    playClick();
    targetCamPosRef.current.set(0, 1.5, 4.8);
    targetCamLookRef.current.set(0, 1.2, 0);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'crown':
        return <Crown className="w-5 h-5 text-amber-300" />;
      case 'award':
        return <Award className="w-5 h-5 text-amber-300" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'bookmark':
        return <Bookmark className="w-5 h-5 text-amber-300" />;
      default:
        return <Crown className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[680px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a0c28] via-[#100619] to-[#08020d] border-3 border-purple-500/50 shadow-2xl select-none">
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Screen Overlay Hotspots */}
      {showHotspots && (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {RAW_HOTSPOTS.map(spot => {
            const coord = screenCoords[spot.id];
            if (!coord || !coord.visible) return null;

            return (
              <div
                key={spot.id}
                onClick={e => {
                  e.stopPropagation();
                  handleSelectHotspot(spot);
                }}
                style={{
                  left: `${coord.x}px`,
                  top: `${coord.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="pointer-events-auto absolute flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-950 border-2 border-amber-300 shadow-[0_0_18px_rgba(168,85,247,0.8)] cursor-pointer hover:scale-125 transition-transform"
                title={language === 'AM' ? spot.titleAmharic : spot.title}
              >
                <div className="absolute -inset-1 rounded-full border-2 border-amber-400/60 animate-ping pointer-events-none" />
                {renderIcon(spot.icon)}
              </div>
            );
          })}
        </div>
      )}

      {/* Top Header Badge & Quick Actions */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-purple-500/50 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-purple-950 font-bold shadow">
            <Crown className="w-4 h-4 text-purple-950" />
          </div>
          <div>
            <div className="text-xs font-bold font-serif text-amber-200">
              {language === 'AM' ? 'ንግሥተ ነገሥታት ዘውዲቱ' : 'Empress Zewditu'}
            </div>
            <div className="text-[10px] text-purple-300 font-mono">
              {language === 'AM' ? '3D ይፋዊ የክብር ቅርጽ • 1876 – 1930' : '3D Interactive Exhibition (1876–1930)'}
            </div>
          </div>
        </div>

        {/* Quick Header Actions */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-purple-500/40 shadow-xl">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClick();
            }}
            title="Toggle Chimes / Audio"
            className="p-1.5 rounded-xl text-purple-200 hover:text-amber-300 hover:bg-purple-900/50 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
          </button>
          <button
            onClick={resetCamera}
            title="Reset Camera View"
            className="p-1.5 rounded-xl text-purple-200 hover:text-amber-300 hover:bg-purple-900/50 transition"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Left Bio Card */}
      <div className="absolute left-4 bottom-4 z-20 hidden md:block max-w-xs pointer-events-auto">
        <div className="p-4 rounded-3xl bg-black/80 backdrop-blur-md border border-purple-500/40 shadow-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider font-serif">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'AM' ? 'የታሪክ አሻራ' : 'Imperial Legacy'}</span>
          </div>
          <p className="text-xs font-serif italic text-purple-100 leading-relaxed">
            {language === 'AM'
              ? '«የዳግማዊ አፄ ምኒልክ ልጅ፣ በ20ኛው መቶ ክፍለ ዘመን የመጀመሪያዋ የአፍሪካ ሴት የሀገር መሪ። የጽናት፣ የሰላምና የሀገር ፍቅር ተምሳሌት።»'
              : '“The first female emperor of modern Africa. A symbol of resilience, faith, and traditional Ethiopian sovereignty.”'}
          </p>
          <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between text-[11px] text-purple-300">
            <span>ዘመን፡ 1916 – 1930</span>
            <button
              onClick={() => {
                const plaqueSpot = RAW_HOTSPOTS.find(s => s.id === 'plaque');
                if (plaqueSpot) handleSelectHotspot(plaqueSpot);
              }}
              className="text-amber-300 hover:underline flex items-center gap-1 font-bold"
            >
              <span>{language === 'AM' ? 'ዝርዝር ታሪክ' : 'Full Story'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Right Studio Controls Dock */}
      <div className="absolute right-4 bottom-4 z-20 pointer-events-auto">
        <div className="p-3.5 rounded-3xl bg-black/85 backdrop-blur-md border border-purple-500/40 shadow-2xl flex flex-col gap-2.5 w-60 text-xs">
          <div className="flex items-center justify-between border-b border-purple-800/60 pb-1.5">
            <div className="flex items-center gap-1.5 text-amber-200 font-bold font-serif">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>3D STUDIO</span>
            </div>
            <span className="text-[10px] bg-purple-900/80 text-amber-300 px-2 py-0.5 rounded-full border border-purple-500/40">
              WebGL
            </span>
          </div>

          {/* Exhibition Atmosphere Lighting */}
          <div>
            <label className="text-[10px] text-purple-300 font-bold block mb-1">
              {language === 'AM' ? 'የብርሃን ድባብ (Atmosphere)' : 'Exhibition Atmosphere'}
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['studio', 'sunset', 'museum'] as const).map(preset => (
                <button
                  key={preset}
                  onClick={() => handleSetLighting(preset)}
                  className={`py-1 text-[11px] font-bold rounded-xl border transition-all ${
                    activeLighting === preset
                      ? 'bg-purple-800 text-amber-200 border-amber-400 shadow'
                      : 'bg-purple-950/60 text-purple-300 border-purple-800/40 hover:bg-purple-900/40'
                  }`}
                >
                  {preset === 'studio' ? 'Studio' : preset === 'sunset' ? 'Golden' : 'Dramatic'}
                </button>
              ))}
            </div>
          </div>

          {/* Turntable, Pins & Shading Toggles */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                setAutoRotate(!autoRotate);
                playClick();
              }}
              className="w-full flex items-center justify-between p-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 transition"
            >
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'AM' ? 'ዙረት (Turntable)' : 'Turntable'}</span>
              </span>
              <span className={autoRotate ? 'text-emerald-400 font-bold' : 'text-purple-400 font-bold'}>
                {autoRotate ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={() => {
                setShowHotspots(!showHotspots);
                playClick();
              }}
              className="w-full flex items-center justify-between p-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 transition"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'AM' ? 'ታሪካዊ ነጥቦች' : 'Pins'}</span>
              </span>
              <span className={showHotspots ? 'text-emerald-400 font-bold' : 'text-purple-400 font-bold'}>
                {showHotspots ? 'SHOW' : 'HIDE'}
              </span>
            </button>

            <button
              onClick={handleToggleWireframe}
              className="w-full flex items-center justify-between p-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 transition"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'AM' ? 'የገጽታ ስፌት' : 'Shading'}</span>
              </span>
              <span className="text-amber-300 font-bold text-[10px]">
                {wireframeMode === 0 ? 'Standard' : wireframeMode === 1 ? 'Clay Violet' : 'Wireframe'}
              </span>
            </button>
          </div>

          {/* Camera Presets */}
          <div className="pt-1 border-t border-purple-800/60">
            <label className="text-[10px] text-purple-300 font-bold block mb-1">
              {language === 'AM' ? 'የእይታ አቅጣጫ (Camera Angles)' : 'Camera Angles'}
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(['full', 'crown', 'sash', 'plaque'] as const).map(angle => (
                <button
                  key={angle}
                  onClick={() => handleSetCameraAngle(angle)}
                  className="py-1 text-[10px] font-bold rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 transition"
                >
                  {angle === 'full' ? 'Full' : angle === 'crown' ? 'Crown' : angle === 'sash' ? 'Sash' : 'Plaque'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instruction Hint */}
      {hintVisible && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-xs text-amber-200 animate-pulse transition-opacity">
          <Move3d className="w-4 h-4 text-amber-300" />
          <span>{language === 'AM' ? 'በ3D ለማሽከርከር ይጎትቱ • በጣት/በማውዝ ያቅርቡ • ነጥቦቹን ይንኩ' : 'Drag to rotate 3D figurine • Scroll to zoom • Click pins'}</span>
        </div>
      )}

      {/* Detailed Hotspot Modal */}
      {activeModalSpot && (
        <div
          onClick={() => setActiveModalSpot(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#240e34] via-[#160722] to-[#0c0314] border-2 border-amber-500/50 shadow-2xl relative text-purple-100"
          >
            <button
              onClick={() => setActiveModalSpot(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/80 hover:bg-red-950/80 text-purple-300 hover:text-white transition border border-purple-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-purple-950 shadow-lg shadow-amber-500/20">
                {renderIcon(activeModalSpot.icon)}
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold">
                  {language === 'AM' ? activeModalSpot.categoryAmharic : activeModalSpot.category}
                </span>
                <h3 className="text-xl font-bold font-serif text-white">
                  {language === 'AM' ? activeModalSpot.titleAmharic : activeModalSpot.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-purple-200 leading-relaxed mb-6 font-normal">
              {language === 'AM' ? activeModalSpot.descriptionAmharic : activeModalSpot.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-purple-950/60 border border-purple-800/60 text-xs mb-6">
              <div>
                <span className="text-purple-400 block text-[10px] uppercase font-bold">
                  {language === 'AM' ? 'የታሪክ ዘመን' : 'Origin / Period'}
                </span>
                <span className="font-medium text-amber-200">{activeModalSpot.period}</span>
              </div>
              <div>
                <span className="text-purple-400 block text-[10px] uppercase font-bold">
                  {language === 'AM' ? 'ታሪካዊ ፋይዳ' : 'Significance'}
                </span>
                <span className="font-medium text-amber-200">
                  {language === 'AM' ? activeModalSpot.significanceAmharic : activeModalSpot.significance}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModalSpot(null)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-purple-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition"
              >
                {language === 'AM' ? 'ወደ 3D ቅርጹ ተመለስ' : 'Return to Figurine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
