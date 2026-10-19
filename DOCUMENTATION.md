# 📜 YENEGESTAT (የነገሥታት ቅርሶች) — Comprehensive Technical & Architectural Documentation

> **A Complete Step-by-Step Guide on How the Application Was Built, Technologies Used, and System Architecture**

---

## 🌟 1. Project Overview & Mission

**YENEGESTAT** is a museum-grade digital platform and artisan collectible showcase celebrating Ethiopia’s greatest historical heroes, emperors, and heroines. 

The application combines:
1. **Procedural 3D WebGL Interactive Exhibitions:** Native real-time 3D models with 360° orbit turntable, dynamic lighting presets, wireframe topology inspection, and interactive 3D-to-2D screen hotspot pins.
2. **Bilingual Historical Education:** Authentic Amharic and English biographies, spoken voice narrations, bedtime storybooks, and artifact dossiers.
3. **Collector Storefront:** A standardized **7-Inch (18 cm)** artisan figurine purchasing flow with custom brass plinth engraving, dual-currency pricing (ETB / USD), and digital certificates of authenticity.

- **Live Production URL:** [https://doll-factory.vercel.app](https://doll-factory.vercel.app)
- **GitHub Repository:** [https://github.com/haymanotabera50/doll-factory](https://github.com/haymanotabera50/doll-factory)

---

## 🛠️ 2. Technology Stack & Tools Used

### Core Frontend & Language
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `18.3.1` | Component-based reactive user interface architecture |
| **TypeScript** | `5.6.3` | Type-safety, strict contract enforcement for products, heroes, and 3D configs |
| **Vite** | `6.x` / `8.x` | Ultra-fast development server with HMR and optimized production bundler |

### 3D Graphics & Animation
| Library | Version | Purpose |
| :--- | :--- | :--- |
| **Three.js** | `0.182.0` | Low-level WebGL 3D rendering engine, materials, geometries, lights, shadows |
| **OrbitControls** | JSM Addon | Smooth mouse/touch drag turntable orbit, zoom dampening, polar angle limits |
| **Canvas Confetti** | `1.9.4` | Particle celebration physics for order confirmations and cart actions |

### Styling & Typography
| Technology | Purpose |
| :--- | :--- |
| **Tailwind CSS 3.4** | Utility-first responsive styling with custom color palettes and glassmorphism |
| **Google Fonts** | `Noto Sans Ethiopic` (Ge'ez/Amharic), `Cinzel` (Classical Serif), `Plus Jakarta Sans` |
| **Custom CSS Engine** | Pan-Ethiopian Tibeb gradients, bronze metallic trims, gold filigree glow effects |

### Audio & Sound Design
| Technology | Purpose |
| :--- | :--- |
| **Web Audio API** | Native procedural audio synthesizer generating harmonic bell/chime frequencies on interaction without external audio asset overhead |
| **HTML5 Audio Engine** | Spoken historical narrations and authentic Ethiopian patriotic music playback |

### Icons & Assets
| Tool | Purpose |
| :--- | :--- |
| **Lucide React** | High-precision vector UI icons (`Crown`, `Award`, `Sparkles`, `Move3d`, etc.) |
| **Canvas 2D API** | Real-time procedural textures for brass plaques, Shemma cotton, and Tibeb ribbons |

### Infrastructure & Deployment
| Platform | Configuration |
| :--- | :--- |
| **Vercel** | Edge Network Hosting with Single Page Application rewrites in `vercel.json` |
| **Git & GitHub** | Version control with automated tracking via Windows Credential Manager |

---

## 🏗️ 3. Step-by-Step Architecture: How It Was Made

```mermaid
flowchart TD
    A["1. Data Modeling (heroes.ts)"] --> B["2. Procedural 3D WebGL Engine (Three.js)"]
    B --> C["3. Lighting & Shading Rig (Studio / Sunset / Museum)"]
    B --> D["4. 3D-to-2D Screen Hotspot Projection"]
    C --> E["5. Web Audio API Harmonic Synthesis"]
    D --> E
    E --> F["6. Masterpiece Showcases (Taytu, Zewditu, Werede Mamo, Menelik)"]
    F --> G["7. Universal Heroines 3D Exhibition Pavilion"]
    G --> H["8. E-Commerce Cart & Custom Engraving System"]
    H --> I["9. Production Build & Vercel Edge Deployment"]
```

---

### Step 1: Historical Data Modeling & 7-Inch Standardization
All historical figures are typed and stored in [`src/data/heroes.ts`](file:///c:/Users/haymanotabera/Doll%20Factory/src/data/heroes.ts) and [`src/types/index.ts`](file:///c:/Users/haymanotabera/Doll%20Factory/src/types/index.ts).

- **Data Integrity:** Each entry includes English and Amharic names, titles, horse names (*የፈረስ ስም*), historical eras, bedtime storybook summaries, and historical backstories.
- **Sole Collector Format:** Standardized exclusively to the **7-Inch (18 cm)** desktop collector scale (2,250 ETB / $35 USD) to provide museum-quality uniformity.

---

### Step 2: The Procedural WebGL 3D Engine
Rather than relying on large, slow-loading `.gltf` or `.obj` files that consume hundreds of megabytes of bandwidth, the 3D figurines are **procedurally constructed at runtime** using Three.js mathematical primitives.

1. **Procedural In-Memory Canvas Textures:**
   - **Brass Plaque Texture:** Dynamically creates a 1024×340 2D canvas, draws a dual gold-filigree border, and renders bilingual calligraphy (`Empress Taytu Betul • 1842-1918 • Founder of Addis Ababa`).
   - **Woven Tibeb Fabric Texture:** Generates alternating bands of Ethiopian emerald green, royal yellow, and crimson red with diamond knotwork.
   - **Shemma Cotton Texture:** Generates micro-pleat vertical striations simulating handwoven Ethiopian cotton fabric.
   - **Soft Shadow Disc:** Creates a radial alpha gradient on a 256×256 canvas applied to an inverted horizontal plane under the plinth.

2. **Mesh Construction:**
   - **Plinth & Base:** Chamfered marble blocks (`BoxGeometry`) with metallic brass plaque meshes (`PlaneGeometry`).
   - **Pleated Kemis (Dress):** Tapered cylinder geometries (`CylinderGeometry`) with gold slippers peeking at the base.
   - **Imperial Sash:** Torus geometry (`TorusGeometry`) mathematically oriented and tilted diagonally across the torso.
   - **Anatomy:** Ethiopian skin-toned head (`SphereGeometry`), traditional coiled hair bun, and posture-poised arms with golden cuffs.
   - **Imperial Regalia:** Custom-crafted crowns (e.g., Taytu's 9-spike ruby tiara, Zewditu's dual-tier coronation crown with cross, Sheba's Axumite sun-disc diadem, Mentewab's Gondarine pearl crown, Derartu Tulu's Olympic gold medal).

---

### Step 3: Studio Lighting & Shading Rig
To simulate a real museum gallery, each 3D stage includes a 5-light setup:
1. `AmbientLight`: Soft base illumination.
2. `SpotLight` (Key Light): Casts high-resolution shadows with `PCFShadowMap`.
3. `DirectionalLight` (Fill Light): Color-matched complementary fill.
4. `DirectionalLight` (Back/Rim Light): Sharp silhouette accent highlighting crowns and capes.
5. `PointLight` (Pedestal Light): Warm accent beam illuminating the brass memorial plaque.

**Lighting Modes:**
- **Studio:** Clean, daylight gallery ambiance (5500K neutral).
- **Sunset:** Warm royal amber and golden-hour radiance.
- **Museum:** Dramatic, high-contrast spotlighting against deep darkness.

**Shading Modes:**
- **Standard:** Full PBR materials with metalness, roughness, and canvas textures.
- **Clay:** Sculptor's matte violet clay for inspecting pure form and silhouette.
- **Wireframe:** Transparent polygon topology rendering for architectural inspection.

---

### Step 4: 3D-to-2D Hotspot Projection Pipeline
Interactive badges in 3D world space are projected each frame onto the 2D HTML/React overlay:

```typescript
// Each frame in the requestAnimationFrame render loop:
const tempVec = new THREE.Vector3();
tempVec.set(...hotspot.pos);
tempVec.applyMatrix4(modelGroup.matrixWorld); // Apply model rotation
tempVec.project(camera);                      // Project into Normalized Device Coordinates (-1 to 1)

// Check if hotspot is facing the camera (occlusion culling)
const isVisible = tempVec.z <= 1.0;

// Convert NDC to screen pixel coordinates
const screenX = tempVec.x * (containerWidth / 2) + (containerWidth / 2);
const screenY = -(tempVec.y * (containerHeight / 2)) + (containerHeight / 2);
```

When a user clicks any pin:
1. The camera smoothly interpolates (`lerp`) towards preset focus coordinates.
2. A procedural chime is synthesized.
3. A detailed **Historical Artifact & Regalia Dossier** modal opens with Ge'ez and English insights.

---

### Step 5: Web Audio API Procedural Synthesizer
Instead of downloading MP3 files for interface clicks, the application uses the browser's native `AudioContext`:

```typescript
const playChime = (freq = 523.25, type: OscillatorType = 'sine', duration = 0.5) => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  // Exponential decay envelope
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};
```

---

### Step 6: Dedicated Hero & Heroine Masterpiece Showcases
Individual, standalone showcase stages were engineered for Ethiopia's greatest icons:
- [`Taytu3DExhibition.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/Taytu3DExhibition.tsx) in [`TaytuMasterpieceShowcase.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/TaytuMasterpieceShowcase.tsx)
- [`Zewditu3DExhibition.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/Zewditu3DExhibition.tsx) in [`ZewdituMasterpieceShowcase.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/ZewdituMasterpieceShowcase.tsx)
- [`WeredeMamo3DExhibition.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/WeredeMamo3DExhibition.tsx) in [`WeredeMamoMasterpieceShowcase.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/WeredeMamoMasterpieceShowcase.tsx)
- Emperor Menelik II, Ras Alula Engida, Emperor Haile Selassie I, and Captain Abebe Bikila showcases.

---

### Step 7: Universal Heroines 3D Exhibition Pavilion
[`Heroines3DPavilion.tsx`](file:///c:/Users/haymanotabera/Doll%20Factory/src/components/Heroines3DPavilion.tsx) unifies **all 7 Ethiopian heroines** into a single master theater:
1. **Empress Taytu Betul** (እቴጌ ጣይቱ ብጡል) — Adwa Tiara & Adwa Command Plinth.
2. **Empress Zewditu** (ንግሥተ ነገሥታት ዘውዲቱ) — Imperial Coronation Crown & Solomonic Sash.
3. **Queen of Sheba / Makeda** (ንግሥት ሳባ) — Ancient Axumite Sun Diadem & Frankincense Chalice.
4. **Woizero Shewareged Gadle** (ወይዘሮ ሸዋረገድ ገድሌ) — Patriot Matriarch Netela & Intelligence Scrolls.
5. **Empress Mentewab** (እቴጌ ምንትዋብ) — Gondarine Pearl Crown & Qwesqwam Illuminated Manuscript.
6. **Commander Derartu Tulu** (ኮማንደር ደራርቱ ቱሉ) — Barcelona 1992 Olympic Gold Medal & Track Spikes.
7. **Werede Mamo** (አርበኛ ወረደ ማሞ) — Resistance Headwrap & Anti-Fascist Courier Ledger.

---

### Step 8: E-Commerce & Collector Customization
- **Brass Plinth Engraving:** Customers can enter personalized dedications (e.g., *"ለተወዳጇ ልጃችን"*) that appear on the plinth and order summary.
- **Dual Currency:** Dynamic real-time toggling between Ethiopian Birr (ETB) and US Dollars (USD).
- **Checkout & Certificates:** Generates digital certificates of authenticity with unique serial numbers upon completed orders.

---

### Step 9: Vercel Production Deployment & GitHub Sync
1. **SPA Rewrites ([`vercel.json`](file:///c:/Users/haymanotabera/Doll%20Factory/vercel.json)):** Configured single-page rewrite rules mapping `/(.*)` to `/index.html`.
2. **Vite Minification & Treeshaking:** Builds a minified bundle with vendor chunking in under 1.5 seconds.
3. **Automated CI/CD:** Connected to Vercel production edge servers and version-controlled on GitHub (`main` branch).

---

## 📁 4. Project Directory Structure

```text
Doll Factory/
├── public/                       # Static assets, official photography, 3D plinth crops
│   ├── crops/                   # Extracted 3D figurine plinth crops
│   ├── heritage_heroes_*.jpg    # Official master photography
│   └── icons.svg                # Vector icons
├── src/
│   ├── components/              # React UI & 3D WebGL Components
│   │   ├── Taytu3DExhibition.tsx           # Empress Taytu bespoke 3D WebGL stage
│   │   ├── Zewditu3DExhibition.tsx         # Empress Zewditu bespoke 3D WebGL stage
│   │   ├── WeredeMamo3DExhibition.tsx      # Werede Mamo bespoke 3D WebGL stage
│   │   ├── Heroines3DPavilion.tsx          # 7-Heroine Universal 3D Exhibition Theater
│   │   ├── TaytuMasterpieceShowcase.tsx    # Taytu dedicated showcase
│   │   ├── ZewdituMasterpieceShowcase.tsx  # Zewditu dedicated showcase
│   │   ├── WeredeMamoMasterpieceShowcase.tsx # Werede Mamo dedicated showcase
│   │   ├── MenelikMasterpieceShowcase.tsx  # Menelik II dedicated showcase
│   │   ├── AlulaMasterpieceShowcase.tsx    # Ras Alula dedicated showcase
│   │   ├── HaileSelassieMasterpieceShowcase.tsx # Haile Selassie dedicated showcase
│   │   ├── AbebeMasterpieceShowcase.tsx    # Abebe Bikila dedicated showcase
│   │   ├── Hero360Studio.tsx               # 360° Studio rotation viewer
│   │   ├── HeroAudioNarrator.tsx           # Audio narration voice player
│   │   ├── HeroCatalog.tsx                 # Full hero figurine catalog
│   │   ├── ProductCard.tsx                 # Figurine card with 3D exhibition badges
│   │   ├── ProductDetailModal.tsx          # Quick-view modal with 3D launcher
│   │   ├── CartDrawer.tsx                  # Sliding cart with custom engraving
│   │   ├── CheckoutModal.tsx               # Payment modal (Telebirr, CBE Birr, Cards)
│   │   └── CertificateModal.tsx            # Digital certificate of authenticity
│   ├── data/
│   │   └── heroes.ts                       # Historical figures database & bios
│   ├── types/
│   │   └── index.ts                        # TypeScript interfaces & types
│   ├── utils/
│   │   └── heroAudio.ts                    # Spoken audio narrations library
│   ├── App.tsx                             # Master application orchestrator
│   ├── main.tsx                            # React DOM root entry point
│   └── index.css                           # Tailwind CSS & custom animations
├── vercel.json                  # Vercel deployment & SPA routing config
├── package.json                 # Project dependencies & build scripts
├── vite.config.ts               # Vite configuration
└── DOCUMENTATION.md             # This comprehensive technical guide
```

---

## 🚀 5. How to Run Locally

```bash
# 1. Clone repository
git clone https://github.com/haymanotabera50/doll-factory.git
cd doll-factory

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🎖️ 6. Summary of Key Achievements
- **Zero Heavy Assets:** Full 3D interactive fidelity without downloading 50MB+ 3D files.
- **Authentic Ethiopian Heritage:** Accurate regalia modeling, traditional Tibeb patterns, and bilingual storytelling.
- **Production Performance:** 60 FPS WebGL rendering on desktop and mobile browsers alike.
