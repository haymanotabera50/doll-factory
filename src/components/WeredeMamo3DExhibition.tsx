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
  BookOpen
} from 'lucide-react';
import { Language } from '../types';

interface WeredeMamo3DExhibitionProps {
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
    id: 'headdress',
    title: 'Patriot Headdress & Resistance Netela',
    titleAmharic: 'የአርበኝነት ጥምጥም ነጠላ',
    category: 'Patriot Attire',
    categoryAmharic: 'የአርበኞች ባህላዊ ልብስ',
    icon: 'crown',
    pos: [0, 3.2, 0.15],
    camTarget: [0, 3.05, 0],
    camPos: [0, 3.25, 1.8],
    period: '1936 – 1941',
    significance: 'Unyielding Patriot Resolve',
    significanceAmharic: 'የማይበገር የአርበኝነት ወኔ',
    description:
      'Werede Mamo wore the traditional Ethiopian cotton Netela wrapped firmly around her head in the patriot guerrilla style, signifying steadfast dedication to liberating her motherland from occupation forces.',
    descriptionAmharic:
      'አርበኛ ወረደ ማሞ በትግሉ ወቅት ያደረገችው ባህላዊ የነጠላ ጥምጥም፤ የነጻነትን ጥሪና ለኢትዮጵያ ሉዓላዊነት የነበራትን ጽኑ አቋም ያሳያል።'
  },
  {
    id: 'sash',
    title: 'Pan-Ethiopian Patriot Sash',
    titleAmharic: 'የኢትዮጵያ ሰንደቅ አላማ ጥበብ ሻሽ',
    category: 'National Honor',
    categoryAmharic: 'ብሔራዊ የጀግንነት ማዕረግ',
    icon: 'award',
    pos: [-0.35, 1.85, 0.45],
    camTarget: [-0.1, 1.75, 0],
    camPos: [-0.55, 1.95, 2.0],
    period: 'Anti-Fascist Resistance',
    significance: 'Unity of the Guerrilla Fighters',
    significanceAmharic: 'የአርበኞች አንድነትና ጽናት',
    description:
      'Draped across her torso is the bold Ethiopian tri-color sash (Green, Yellow, Red) woven with resilient mountain fiber, honoring the women patriots who sustained logistics and tactical support across rugged frontlines.',
    descriptionAmharic:
      'በትከሻዋ ላይ ያረፈው ባለሶስት ቀለም የጀግንነት ሻሽ፤ በየተራራውና በየሸለቆው ለነጻነት የተዋደቁትን የጀግኖች ሴቶች አርበኞች ድንቅ ተጋድሎ ያዘክራል።'
  },
  {
    id: 'ledger',
    title: 'Resistance Dispatches & Ledger',
    titleAmharic: 'የድል መረጃና የትግል ሰነዶች',
    category: 'Strategic Intelligence',
    categoryAmharic: 'ስለላና የመረጃ ስራ',
    icon: 'sparkles',
    pos: [0.35, 1.45, 0.4],
    camTarget: [0.2, 1.4, 0],
    camPos: [0.4, 1.5, 1.8],
    period: 'Underground Courier Networks',
    significance: 'Intelligence Coordination',
    significanceAmharic: 'የስለላና የመረጃ ጥበብ',
    description:
      'Held firmly in her right hand is a secret field dispatch containing encrypted intelligence on troop movements, weapon caches, and coordination dispatches for patriotic leaders across Shewa and Gojjam.',
    descriptionAmharic:
      'በእጇ የያዘችው የምስጢር የትግል ሰነድ፤ የጠላትን ወታደራዊ እንቅስቃሴ በመሰለል ለአርበኞች ግንባር ቀደም መረጃ ይሰጥ የነበረውን ስልታዊ አመራር ይወክላል።'
  },
  {
    id: 'plaque',
    title: 'Patriot Memorial Plinth',
    titleAmharic: 'የአርበኞች ክብር መታሰቢያ ጽላት',
    category: 'Historical Memorial',
    categoryAmharic: 'ታሪካዊ የመታሰቢያ ጽላት',
    icon: 'bookmark',
    pos: [0, -0.65, 0.75],
    camTarget: [0, -0.7, 0],
    camPos: [0, -0.2, 2.2],
    period: '1936 – 1941 Resistance',
    significance: 'Heroine of Independence',
    significanceAmharic: 'የነጻነትና የጀግንነት ተምሳሌት',
    description:
      'The beveled plinth commemorates Werede Mamo and the valiant Ethiopian women who took up arms, coordinated intelligence, and braved battlefields to ensure Ethiopia’s flag remained flying in liberty.',
    descriptionAmharic:
      '«አርበኛ ወረደ ማሞ (1936 – 1941) • የኢትዮጵያ ነጻነት ቀንዲልና የማይበገር የአርበኝነት ተምሳሌት።» የሚል የነሐስ ጽሑፍ ያረፈበት ጠንካራ መቆሚያ።'
  }
];

export const WeredeMamo3DExhibition: React.FC<WeredeMamo3DExhibitionProps> = ({
  language,
  onOpenBio
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<number>(0);
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

    // 4. LIGHTING SETUP
    const ambient = new THREE.AmbientLight(0xffeedd, 0.85);
    scene.add(ambient);

    const key = new THREE.SpotLight(0xfff5e6, 2.3);
    key.position.set(2.5, 4.5, 3.5);
    key.angle = Math.PI / 4;
    key.penumbra = 0.5;
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x10b981, 0.85);
    fill.position.set(-3.5, 2.0, 2.0);
    scene.add(fill);

    const back = new THREE.DirectionalLight(0xf59e0b, 1.4);
    back.position.set(0, 3.5, -3.0);
    scene.add(back);

    const pedestal = new THREE.PointLight(0xfde047, 0.6, 6);
    pedestal.position.set(0, 0.2, 1.5);
    scene.add(pedestal);

    lightsRef.current = { ambient, key, fill, back, pedestal };

    // 5. PROCEDURAL CANVAS TEXTURES
    // Plaque Texture
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 340;
    const ctxP = plaqueCanvas.getContext('2d')!;
    ctxP.fillStyle = '#0a0d0a';
    ctxP.fillRect(0, 0, 1024, 340);
    ctxP.strokeStyle = '#10b981';
    ctxP.lineWidth = 6;
    ctxP.strokeRect(16, 16, 1024 - 32, 340 - 32);
    ctxP.strokeStyle = '#d4af37';
    ctxP.lineWidth = 2;
    ctxP.strokeRect(26, 26, 1024 - 52, 340 - 52);

    ctxP.textAlign = 'center';
    ctxP.fillStyle = '#fef08a';
    ctxP.font = 'bold 50px serif';
    ctxP.fillText('Werede Mamo', 512, 115);
    ctxP.fillStyle = '#6ee7b7';
    ctxP.font = 'italic 36px serif';
    ctxP.fillText('(1936 – 1941) • አርበኛ ወረደ ማሞ', 512, 175);
    ctxP.fillStyle = '#e2e8f0';
    ctxP.font = '25px sans-serif';
    ctxP.fillText('Fearless Patriot & Resistance Heroine', 512, 235);
    ctxP.fillText('Defender of Freedom • Lioness of the Frontline', 512, 280);
    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);

    // Patriot Tri-Color Sash Texture
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
    const tibebTexture = new THREE.CanvasTexture(tibebCanvas);
    tibebTexture.wrapS = THREE.RepeatWrapping;
    tibebTexture.wrapT = THREE.RepeatWrapping;
    tibebTexture.repeat.set(3, 1);

    // Khaki & Cotton Texture
    const dressCanvas = document.createElement('canvas');
    dressCanvas.width = 512;
    dressCanvas.height = 512;
    const ctxD = dressCanvas.getContext('2d')!;
    ctxD.fillStyle = '#f5f5f0';
    ctxD.fillRect(0, 0, 512, 512);
    for (let x = 0; x < 512; x += 8) {
      ctxD.strokeStyle = x % 32 === 0 ? '#dedbd2' : '#ebe8df';
      ctxD.lineWidth = x % 32 === 0 ? 2 : 1;
      ctxD.beginPath();
      ctxD.moveTo(x, 0);
      ctxD.lineTo(x, 512);
      ctxD.stroke();
    }
    const dressTexture = new THREE.CanvasTexture(dressCanvas);

    // 6. MATERIALS
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x422006,
      emissiveIntensity: 0.2
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x784a29,
      roughness: 0.6,
      metalness: 0.05
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x140e10,
      roughness: 0.85,
      metalness: 0.1
    });

    const clothMaterial = new THREE.MeshStandardMaterial({
      map: dressTexture,
      color: 0xf8f6f0,
      roughness: 0.75,
      metalness: 0.04
    });

    const sashMaterial = new THREE.MeshStandardMaterial({
      map: tibebTexture,
      roughness: 0.45,
      metalness: 0.25
    });

    const leatherMaterial = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.4,
      metalness: 0.15
    });

    // 7. CONSTRUCT 3D FIGURINE
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;

    // Pedestal Base & Plinth
    const pedestalBaseGeo = new THREE.BoxGeometry(1.9, 0.22, 1.4);
    const plinthGeo = new THREE.BoxGeometry(1.6, 0.45, 1.15);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f1712,
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

    // Plaque
    const plaqueGeo = new THREE.PlaneGeometry(1.2, 0.36);
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: plaqueTexture,
      roughness: 0.3,
      metalness: 0.5
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, -0.55, 0.58);
    modelGroup.add(plaqueMesh);

    // Lower Skirt
    const skirtGeo = new THREE.CylinderGeometry(0.48, 0.8, 1.6, 32);
    const skirtMesh = new THREE.Mesh(skirtGeo, clothMaterial);
    skirtMesh.position.y = 0.5;
    skirtMesh.castShadow = true;
    skirtMesh.receiveShadow = true;
    modelGroup.add(skirtMesh);

    // Skirt Hem Band
    const hemGeo = new THREE.CylinderGeometry(0.79, 0.81, 0.2, 32);
    const hemMesh = new THREE.Mesh(hemGeo, sashMaterial);
    hemMesh.position.y = -0.22;
    modelGroup.add(hemMesh);

    // Boots
    const bootGeo = new THREE.BoxGeometry(0.15, 0.1, 0.26);
    const leftBoot = new THREE.Mesh(bootGeo, leatherMaterial);
    leftBoot.position.set(-0.2, -0.32, 0.4);
    const rightBoot = new THREE.Mesh(bootGeo, leatherMaterial);
    rightBoot.position.set(0.2, -0.32, 0.4);
    modelGroup.add(leftBoot);
    modelGroup.add(rightBoot);

    // Bodice / Tunic
    const torsoGeo = new THREE.CylinderGeometry(0.36, 0.46, 1.05, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, clothMaterial);
    torsoMesh.position.y = 1.7;
    torsoMesh.castShadow = true;
    modelGroup.add(torsoMesh);

    // Leather Patriot Belt
    const beltGeo = new THREE.CylinderGeometry(0.47, 0.47, 0.12, 32);
    const beltMesh = new THREE.Mesh(beltGeo, leatherMaterial);
    beltMesh.position.y = 1.25;
    modelGroup.add(beltMesh);

    const buckleGeo = new THREE.BoxGeometry(0.12, 0.14, 0.04);
    const buckleMesh = new THREE.Mesh(buckleGeo, goldMaterial);
    buckleMesh.position.set(0, 1.25, 0.48);
    modelGroup.add(buckleMesh);

    // Tri-color Sash
    const sashGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 32, Math.PI * 1.15);
    const sashMesh = new THREE.Mesh(sashGeo, sashMaterial);
    sashMesh.rotation.z = Math.PI / 4;
    sashMesh.rotation.y = Math.PI / 8;
    sashMesh.position.set(-0.05, 1.75, 0.1);
    sashMesh.castShadow = true;
    modelGroup.add(sashMesh);

    // Sleeves
    const leftSleeveGeo = new THREE.CylinderGeometry(0.12, 0.17, 0.72, 16);
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, clothMaterial);
    leftSleeve.position.set(-0.52, 1.72, 0.05);
    leftSleeve.rotation.z = Math.PI / 6;
    modelGroup.add(leftSleeve);

    const rightSleeveGeo = new THREE.CylinderGeometry(0.12, 0.17, 0.72, 16);
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, clothMaterial);
    rightSleeve.position.set(0.52, 1.72, 0.05);
    rightSleeve.rotation.z = -Math.PI / 6;
    modelGroup.add(rightSleeve);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.35, 1.35, 0.35);
    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.35, 1.35, 0.35);
    modelGroup.add(leftHand);
    modelGroup.add(rightHand);

    // Secret Dispatch Ledger in Hand
    const ledgerGeo = new THREE.BoxGeometry(0.18, 0.28, 0.06);
    const ledgerMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.5
    });
    const ledgerMesh = new THREE.Mesh(ledgerGeo, ledgerMat);
    ledgerMesh.position.set(0.35, 1.45, 0.4);
    ledgerMesh.rotation.y = 0.3;
    modelGroup.add(ledgerMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.13, 0.16, 0.32, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.y = 2.4;
    modelGroup.add(neckMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.27, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.y = 2.85;
    headMesh.castShadow = true;
    modelGroup.add(headMesh);

    // Patriot Headwrap / Netela
    const wrapGeo = new THREE.SphereGeometry(0.29, 24, 24);
    const wrapMesh = new THREE.Mesh(wrapGeo, clothMaterial);
    wrapMesh.position.set(0, 2.9, -0.05);
    modelGroup.add(wrapMesh);

    const headbandGeo = new THREE.TorusGeometry(0.28, 0.03, 12, 32);
    const headband = new THREE.Mesh(headbandGeo, sashMaterial);
    headband.position.set(0, 2.9, 0);
    headband.rotation.x = Math.PI / 2;
    modelGroup.add(headband);

    // Soft Shadow Plane
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

      camera.position.lerp(targetCamPosRef.current, 0.05);
      controls.target.lerp(targetCamLookRef.current, 0.05);

      if (autoRotateRef.current) {
        modelGroup.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);

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

  // Update Wireframe / Clay mode
  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;

    group.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        if (wireframeMode === 2) {
          obj.material.wireframe = true;
          obj.material.color = new THREE.Color(0x10b981);
        } else if (wireframeMode === 1) {
          obj.material.wireframe = false;
          obj.material.color = new THREE.Color(0x8b5cf6);
          obj.material.roughness = 0.8;
          obj.material.metalness = 0.05;
        } else {
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
      lights.fill.color.set(0x6ee7b7);
      lights.fill.intensity = 0.8;
      lights.back.color.set(0xfacc15);
      lights.back.intensity = 1.2;
    } else if (activeLighting === 'sunset') {
      lights.ambient.color.set(0xffedd5);
      lights.ambient.intensity = 0.95;
      lights.key.color.set(0xfb923c);
      lights.key.intensity = 2.8;
      lights.fill.color.set(0x059669);
      lights.fill.intensity = 1.0;
      lights.back.color.set(0xfde047);
      lights.back.intensity = 1.6;
    } else {
      lights.ambient.color.set(0x064e3b);
      lights.ambient.intensity = 0.4;
      lights.key.color.set(0xfff1f2);
      lights.key.intensity = 3.6;
      lights.fill.color.set(0x047857);
      lights.fill.intensity = 0.4;
      lights.back.color.set(0x10b981);
      lights.back.intensity = 2.2;
    }
  }, [activeLighting]);

  const handleSelectHotspot = (spot: HotspotData) => {
    playChime(659.25, 'sine', 0.6);
    targetCamPosRef.current.set(...spot.camPos);
    targetCamLookRef.current.set(...spot.camTarget);
    setAutoRotate(false);
    setActiveModalSpot(spot);
  };

  const handleResetCamera = (pos: [number, number, number], look: [number, number, number]) => {
    playChime(440, 'triangle', 0.4);
    targetCamPosRef.current.set(...pos);
    targetCamLookRef.current.set(...look);
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#06150c] via-[#030d07] to-[#010603] border-2 border-[#10b981]/60 shadow-2xl flex flex-col select-none group">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Floating Overlay */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-2xl bg-black/85 border border-[#10b981]/70 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
            <span className="font-serif font-black text-[#fef08a] tracking-wide">
              {language === 'AM' ? 'አርበኛ ወረደ ማሞ • 3D በይነ-መረብ ኤግዚቢሽን' : 'Werede Mamo • 3D Interactive Exhibition'}
            </span>
            <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-700/40">
              WebGL 2.0
            </span>
          </div>
        </div>

        {/* Audio Quick Action */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border backdrop-blur-md shadow-lg transition-all ${
              soundEnabled
                ? 'bg-black/80 border-[#10b981] text-[#fef08a] hover:bg-[#064e3b]'
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
                <span className="absolute -inset-2 rounded-full bg-[#10b981]/40 animate-ping" />
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#065f46] via-[#059669] to-[#10b981] border-2 border-[#fef08a] text-white shadow-xl hover:scale-125 transition-transform duration-200">
                  {spot.icon === 'crown' && <Crown size={14} className="text-[#fef08a]" />}
                  {spot.icon === 'award' && <Award size={14} className="text-[#fef08a]" />}
                  {spot.icon === 'sparkles' && <Sparkles size={14} className="text-[#fef08a]" />}
                  {spot.icon === 'bookmark' && <Bookmark size={14} className="text-[#fef08a]" />}
                </span>

                <div className="absolute left-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-black/90 border border-[#10b981]/80 backdrop-blur-md text-[11px] font-bold text-white whitespace-nowrap shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                  <span className="text-[#fef08a]">{language === 'AM' ? spot.titleAmharic : spot.title}</span>
                  <ChevronRight size={12} className="text-[#10b981]" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Helper Hint */}
      {hintVisible && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-pulse">
          <div className="px-4 py-1.5 rounded-full bg-black/85 border border-[#10b981] text-emerald-200 text-xs font-medium backdrop-blur-md shadow-2xl flex items-center gap-2">
            <Move3d size={14} className="text-[#10b981]" />
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
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#fef08a] hover:bg-[#064e3b] transition-all"
          >
            {language === 'AM' ? 'ሙሉ ቅርጽ' : 'Full'}
          </button>
          <button
            onClick={() => handleResetCamera([0, 3.25, 1.8], [0, 3.05, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-300 hover:bg-[#064e3b] transition-all"
          >
            {language === 'AM' ? 'ጥምጥም' : 'Headdress'}
          </button>
          <button
            onClick={() => handleResetCamera([-0.55, 1.95, 2.0], [-0.1, 1.75, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-amber-300 hover:bg-[#064e3b] transition-all"
          >
            {language === 'AM' ? 'የአርበኞች ሻሽ' : 'Sash'}
          </button>
          <button
            onClick={() => handleResetCamera([0, -0.2, 2.2], [0, -0.7, 0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-neutral-300 hover:bg-[#064e3b] transition-all"
          >
            {language === 'AM' ? 'ሰሌዳ' : 'Plaque'}
          </button>
        </div>

        {/* Feature Toggles & Studio Lighting */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              playChime(523.25, 'sine', 0.2);
            }}
            className={`p-2 rounded-xl border backdrop-blur-md shadow-md text-xs font-bold flex items-center gap-1.5 transition-all ${
              autoRotate
                ? 'bg-[#064e3b] border-[#10b981] text-[#fef08a]'
                : 'bg-black/80 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Toggle 360° Auto-Turntable Rotation"
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
                ? 'bg-[#064e3b] border-[#10b981] text-[#fef08a]'
                : 'bg-black/80 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Interactive Regalia Hotspot Pins"
          >
            <MapPin size={14} />
            <span className="hidden sm:inline">{language === 'AM' ? 'ምልክቶች' : 'Pins'}</span>
          </button>

          <button
            onClick={() => {
              setWireframeMode((wireframeMode + 1) % 3);
              playChime(698.46, 'triangle', 0.3);
            }}
            className="p-2 rounded-xl bg-black/80 border border-neutral-700 hover:border-emerald-500 text-emerald-300 backdrop-blur-md shadow-md text-xs font-bold flex items-center gap-1.5 transition-all"
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
                activeLighting === 'studio' ? 'bg-[#064e3b] text-[#fef08a] border border-[#10b981]' : 'text-neutral-400'
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
                activeLighting === 'sunset' ? 'bg-[#064e3b] text-[#fef08a] border border-[#10b981]' : 'text-neutral-400'
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
                activeLighting === 'museum' ? 'bg-[#064e3b] text-[#fef08a] border border-[#10b981]' : 'text-neutral-400'
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
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#092314] via-[#05150c] to-[#020b06] border-2 border-[#10b981] rounded-3xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveModalSpot(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-[#da121a] text-neutral-300 hover:text-white border border-emerald-700/50 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#a7f3d0] font-black font-mono">
                {language === 'AM' ? activeModalSpot.categoryAmharic : activeModalSpot.category} • {activeModalSpot.period}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white flex items-center gap-2">
                <Crown size={22} className="text-[#fef08a]" />
                <span>{language === 'AM' ? activeModalSpot.titleAmharic : activeModalSpot.title}</span>
              </h3>
            </div>

            <div className="p-3 rounded-2xl bg-[#064e3b]/80 border border-[#10b981]/60 flex items-center gap-3">
              <Sparkles size={18} className="text-[#fef08a] shrink-0" />
              <div className="text-xs text-[#fef08a] font-bold">
                {language === 'AM' ? activeModalSpot.significanceAmharic : activeModalSpot.significance}
              </div>
            </div>

            <p className="text-sm text-emerald-100/90 leading-relaxed font-normal">
              {language === 'AM' ? activeModalSpot.descriptionAmharic : activeModalSpot.description}
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalSpot(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#10b981] hover:from-[#047857] hover:to-[#059669] text-white font-bold text-xs shadow-lg transition-transform active:scale-95"
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

