import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Monitor, Cpu, Cable, Sliders, FastForward, Clock } from 'lucide-react';
import {
  playLevitateSound,
  playDockSound,
  playCableSnapSound,
  playBootChimeSound,
  playClickSound,
  playHoverSound
} from '../utils/soundEffects';

export const MacMiniStudioAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 0.5x, 1x, 1.5x

  // Mutable reference for high-performance animation loop
  const animStateRef = useRef({
    progress: 0,
    targetProgress: 0,
    isPlaying: true,
    speed: 1,
    durationSeconds: 16, // Extended spacious duration (16 seconds per cycle)
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isHovered: false,
    audioEnabled: true,
  });

  animStateRef.current.audioEnabled = isAudioEnabled;
  animStateRef.current.speed = playSpeed;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. THREE.JS SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070709);
    scene.fog = new THREE.FogExp2(0x070709, 0.018);

    const width = container.clientWidth || 920;
    const height = container.clientHeight || 680;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.0, 12.2);
    camera.lookAt(0, 1.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- 2. LIGHTING SETUP (STUDIO MOOD) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.2);
    keyLight.position.set(6, 14, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 32;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Cinematic Red Ambient Rim Light
    const redRimLight = new THREE.PointLight(0xdc2626, 5.2, 22);
    redRimLight.position.set(-7, 3.5, -2);
    scene.add(redRimLight);

    // Cyan Fill Light
    const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanFillLight.position.set(-8, 7, 7);
    scene.add(cyanFillLight);

    // Screen dynamic glow light
    const screenGlowLight = new THREE.PointLight(0x9333ea, 0, 9);
    screenGlowLight.position.set(0, 2.8, -1.8);
    scene.add(screenGlowLight);

    // --- 3. MATERIALS ---
    // Aluminum Anodized Silver for Mac Mini
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.22,
      metalness: 0.92,
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.45,
      metalness: 0.5,
    });

    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x121215,
      roughness: 0.4,
      metalness: 0.2,
    });

    // --- 4. DYNAMIC CANVAS TEXTURE: UPGRADED ADOBE PREMIERE PRO SUITE ---
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d')!;

    const screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });

    // --- 5. STUDIO DESK & DESK ACCESSORIES ---
    const deskGroup = new THREE.Group();
    
    // Main Desk Table Top
    const deskTopGeo = new THREE.BoxGeometry(17, 0.45, 8.5);
    const deskMesh = new THREE.Mesh(deskTopGeo, deskMaterial);
    deskMesh.position.set(0, -0.22, 0);
    deskMesh.receiveShadow = true;
    deskGroup.add(deskMesh);

    // Matte Desk Mat
    const matGeo = new THREE.BoxGeometry(10.5, 0.04, 4.4);
    const matMaterial = new THREE.MeshStandardMaterial({ color: 0x09090c, roughness: 0.9 });
    const matMesh = new THREE.Mesh(matGeo, matMaterial);
    matMesh.position.set(0, 0.02, 0.3);
    matMesh.receiveShadow = true;
    deskGroup.add(matMesh);

    // Apple Magic Keyboard on Desk
    const kbGeo = new THREE.BoxGeometry(2.8, 0.06, 1.1);
    const kbMesh = new THREE.Mesh(kbGeo, aluminumMaterial);
    kbMesh.position.set(-0.6, 0.05, 1.4);
    kbMesh.castShadow = true;
    deskGroup.add(kbMesh);

    // Apple Magic Mouse on Desk
    const mouseGeo = new THREE.BoxGeometry(0.55, 0.08, 0.9);
    const mouseMesh = new THREE.Mesh(mouseGeo, aluminumMaterial);
    mouseMesh.position.set(1.5, 0.06, 1.4);
    mouseMesh.castShadow = true;
    deskGroup.add(mouseMesh);

    // 2 Studio Reference Monitor Speakers (Left & Right)
    const speakerGeo = new THREE.BoxGeometry(1.2, 2.2, 1.3);
    const speakerMat = new THREE.MeshStandardMaterial({ color: 0x16161a, roughness: 0.5, metalness: 0.3 });
    const speakerLeft = new THREE.Mesh(speakerGeo, speakerMat);
    speakerLeft.position.set(-4.8, 1.1, -1.8);
    speakerLeft.rotation.y = 0.25;
    speakerLeft.castShadow = true;
    deskGroup.add(speakerLeft);

    const speakerRight = new THREE.Mesh(speakerGeo, speakerMat);
    speakerRight.position.set(4.8, 1.1, -1.8);
    speakerRight.rotation.y = -0.25;
    speakerRight.castShadow = true;
    deskGroup.add(speakerRight);

    // Speaker yellow/amber cone rings
    const coneGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 24);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const coneLeft = new THREE.Mesh(coneGeo, coneMat);
    coneLeft.position.set(-4.75, 1.25, -1.14);
    coneLeft.rotation.x = Math.PI / 2;
    deskGroup.add(coneLeft);

    const coneRight = new THREE.Mesh(coneGeo, coneMat);
    coneRight.position.set(4.75, 1.25, -1.14);
    coneRight.rotation.x = Math.PI / 2;
    deskGroup.add(coneRight);

    scene.add(deskGroup);

    // --- 6. APPLE PRO DISPLAY XDR (ULTRA-WIDE STUDIO MONITOR) ---
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 2.7, -2.5);

    // Bezel
    const frameGeo = new THREE.BoxGeometry(7.8, 4.4, 0.22);
    const frameMesh = new THREE.Mesh(frameGeo, darkTrimMaterial);
    frameMesh.castShadow = true;
    monitorGroup.add(frameMesh);

    // Active Screen Glass
    const screenGeo = new THREE.PlaneGeometry(7.5, 4.1);
    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    screenMesh.position.set(0, 0, 0.115);
    monitorGroup.add(screenMesh);

    // Stand
    const standNeckGeo = new THREE.BoxGeometry(0.85, 2.9, 0.26);
    const standNeck = new THREE.Mesh(standNeckGeo, aluminumMaterial);
    standNeck.position.set(0, -1.5, -0.22);
    standNeck.castShadow = true;
    monitorGroup.add(standNeck);

    const standBaseGeo = new THREE.BoxGeometry(2.5, 0.08, 2.0);
    const standBase = new THREE.Mesh(standBaseGeo, aluminumMaterial);
    standBase.position.set(0, -2.65, 0.2);
    standBase.receiveShadow = true;
    standBase.castShadow = true;
    monitorGroup.add(standBase);

    scene.add(monitorGroup);

    // --- 7. APPLE MAC MINI M5 (3D PROCEDURAL OBJECT) ---
    const macMiniGroup = new THREE.Group();
    
    const bodyWidth = 2.45;
    const bodyHeight = 0.54;
    const bodyDepth = 2.45;
    const radius = 0.38;

    const shape = new THREE.Shape();
    shape.moveTo(-bodyWidth / 2 + radius, -bodyDepth / 2);
    shape.lineTo(bodyWidth / 2 - radius, -bodyDepth / 2);
    shape.quadraticCurveTo(bodyWidth / 2, -bodyDepth / 2, bodyWidth / 2, -bodyDepth / 2 + radius);
    shape.lineTo(bodyWidth / 2, bodyDepth / 2 - radius);
    shape.quadraticCurveTo(bodyWidth / 2, bodyDepth / 2, bodyWidth / 2 - radius, bodyDepth / 2);
    shape.lineTo(-bodyWidth / 2 + radius, bodyDepth / 2);
    shape.quadraticCurveTo(-bodyWidth / 2, bodyDepth / 2, -bodyWidth / 2, bodyDepth / 2 - radius);
    shape.lineTo(-bodyWidth / 2, -bodyDepth / 2 + radius);
    shape.quadraticCurveTo(-bodyWidth / 2, -bodyDepth / 2, -bodyWidth / 2 + radius, -bodyDepth / 2);

    const extrudeSettings = {
      depth: bodyHeight,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const macMiniGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    macMiniGeo.rotateX(Math.PI / 2);
    macMiniGeo.center();

    const macMiniMesh = new THREE.Mesh(macMiniGeo, aluminumMaterial);
    macMiniMesh.castShadow = true;
    macMiniMesh.receiveShadow = true;
    macMiniGroup.add(macMiniMesh);

    // Apple Logo on Top
    const logoGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.02, 32);
    const logoMat = new THREE.MeshStandardMaterial({ color: 0x0c0c10, roughness: 0.1, metalness: 0.98 });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, bodyHeight / 2 + 0.08, 0);
    macMiniGroup.add(logoMesh);

    // Front Status LED (White Glow)
    const ledGeo = new THREE.SphereGeometry(0.028, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, 0, bodyDepth / 2 + 0.09);
    macMiniGroup.add(ledMesh);

    // Rear Black Port Bar
    const portBarGeo = new THREE.BoxGeometry(1.9, 0.26, 0.06);
    const portBar = new THREE.Mesh(portBarGeo, darkTrimMaterial);
    portBar.position.set(0, -0.05, -bodyDepth / 2 - 0.05);
    macMiniGroup.add(portBar);

    scene.add(macMiniGroup);

    // --- 8. BRAIDED CABLES (DYNAMIC MAGNETIC ATTACHMENT) ---
    const cableCurve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-4.8, 0.1, -1.8),
      new THREE.Vector3(-3.2, 0.6, -1.6),
      new THREE.Vector3(-1.4, 0.3, -1.4),
      new THREE.Vector3(-0.4, 0.2, -1.25)
    );
    const cableGeo1 = new THREE.TubeGeometry(cableCurve1, 40, 0.038, 12, false);
    const cableMat1 = new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.65, metalness: 0.35 });
    const cableMesh1 = new THREE.Mesh(cableGeo1, cableMat1);
    cableMesh1.castShadow = true;
    scene.add(cableMesh1);

    const cableCurve2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-5.2, 0.1, -1.2),
      new THREE.Vector3(-3.5, 0.5, -1.1),
      new THREE.Vector3(-1.6, 0.2, -1.0),
      new THREE.Vector3(0.4, 0.2, -1.25)
    );
    const cableGeo2 = new THREE.TubeGeometry(cableCurve2, 40, 0.038, 12, false);
    const cableMesh2 = new THREE.Mesh(cableGeo2, cableMat1);
    cableMesh2.castShadow = true;
    scene.add(cableMesh2);

    // Magnetic Metallic Connector Plugs
    const plugGeo = new THREE.BoxGeometry(0.14, 0.09, 0.26);
    const plugMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.95 });
    const plugMesh1 = new THREE.Mesh(plugGeo, plugMat);
    const plugMesh2 = new THREE.Mesh(plugGeo, plugMat);
    scene.add(plugMesh1);
    scene.add(plugMesh2);

    // --- 9. ELECTRIC SPARK PARTICLES ---
    const sparkCount = 60;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkVels = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = 0;
      sparkPos[i * 3 + 1] = 0.2;
      sparkPos[i * 3 + 2] = -1.25;
      sparkVels[i * 3] = (Math.random() - 0.5) * 3;
      sparkVels[i * 3 + 1] = Math.random() * 2.5;
      sparkVels[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.08, transparent: true, opacity: 0 });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    // Track state transitions for audio triggers
    let prevStage = 1;

    // --- 10. MOUSE & RESIZE LISTENERS ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetMouseX = x;
      animStateRef.current.targetMouseY = y;
    };

    const handleMouseEnter = () => {
      animStateRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      animStateRef.current.isHovered = false;
      animStateRef.current.targetMouseX = 0;
      animStateRef.current.targetMouseY = 0;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // --- 11. MAIN RENDER LOOP ---
    let reqId: number;
    let clock = new THREE.Clock();
    let currentTimelineTime = 0;

    const render = () => {
      reqId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      animStateRef.current.mouseX += (animStateRef.current.targetMouseX - animStateRef.current.mouseX) * 0.06;
      animStateRef.current.mouseY += (animStateRef.current.targetMouseY - animStateRef.current.mouseY) * 0.06;

      // Handle playback progression with extended duration (16s cycle adjusted by playSpeed)
      if (animStateRef.current.isPlaying) {
        const rate = (1 / animStateRef.current.durationSeconds) * animStateRef.current.speed;
        animStateRef.current.progress += delta * rate;
        if (animStateRef.current.progress > 1) {
          animStateRef.current.progress = 0;
        }
      } else {
        animStateRef.current.progress += (animStateRef.current.targetProgress - animStateRef.current.progress) * 0.08;
      }

      const p = Math.max(0, Math.min(1, animStateRef.current.progress));
      setProgress(p);

      // Determine active stage
      let currentStage = 1;
      if (p >= 0.25 && p < 0.5) currentStage = 2;
      else if (p >= 0.5 && p < 0.75) currentStage = 3;
      else if (p >= 0.75) currentStage = 4;
      setActiveStage(currentStage);

      // Audio triggers on stage changes
      if (currentStage !== prevStage) {
        if (currentStage === 1 && animStateRef.current.audioEnabled) playLevitateSound();
        if (currentStage === 2 && animStateRef.current.audioEnabled) playDockSound();
        if (currentStage === 3 && animStateRef.current.audioEnabled) playCableSnapSound();
        if (currentStage === 4 && animStateRef.current.audioEnabled) playBootChimeSound();
        prevStage = currentStage;
      }

      // --- STAGE 1: FLOATING M5 MAC MINI IN 3D AIR (0.0 to 0.25) ---
      const levitateY = 2.5 + Math.sin(elapsed * 2.2) * 0.18;
      const deskY = 0.34;

      if (p < 0.25) {
        macMiniGroup.position.set(
          animStateRef.current.mouseX * 0.7,
          levitateY,
          1.8 + Math.cos(elapsed * 1.8) * 0.22
        );
        macMiniGroup.rotation.set(
          0.38 + animStateRef.current.mouseY * 0.45,
          elapsed * 0.65 + animStateRef.current.mouseX * 0.65,
          Math.sin(elapsed * 1.4) * 0.16
        );
      } else if (p < 0.5) {
        // --- STAGE 2: GLIDE DOWN & DOCK ONTO DESK (0.25 to 0.5) ---
        const t = (p - 0.25) / 0.25;
        // Cubic easing with soft dampening
        const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        macMiniGroup.position.x = THREE.MathUtils.lerp(animStateRef.current.mouseX * 0.7, 0, easeT);
        macMiniGroup.position.y = THREE.MathUtils.lerp(levitateY, deskY, easeT);
        macMiniGroup.position.z = THREE.MathUtils.lerp(1.8, 0.35, easeT);

        macMiniGroup.rotation.x = THREE.MathUtils.lerp(0.38, 0, easeT);
        macMiniGroup.rotation.y = THREE.MathUtils.lerp(0.65, 0, easeT);
        macMiniGroup.rotation.z = THREE.MathUtils.lerp(0.16, 0, easeT);
      } else {
        // Docked firmly on the desk
        macMiniGroup.position.set(0, deskY, 0.35);
        macMiniGroup.rotation.set(0, 0, 0);
      }

      // --- STAGE 3: CABLES ATTACH MAGNETICALLY (0.5 to 0.75) ---
      const cableT = THREE.MathUtils.clamp((p - 0.5) / 0.25, 0, 1);
      
      const rearPortX1 = -0.36;
      const rearPortX2 = 0.36;
      const rearPortY = macMiniGroup.position.y + 0.05;
      const rearPortZ = macMiniGroup.position.z - 1.25;

      const plugTarget1 = new THREE.Vector3(rearPortX1, rearPortY, rearPortZ);
      const plugTarget2 = new THREE.Vector3(rearPortX2, rearPortY, rearPortZ);
      const plugStart1 = new THREE.Vector3(-3.2, 0.45, -0.7);
      const plugStart2 = new THREE.Vector3(3.2, 0.45, -0.7);

      plugMesh1.position.lerpVectors(plugStart1, plugTarget1, cableT);
      plugMesh2.position.lerpVectors(plugStart2, plugTarget2, cableT);
      plugMesh1.visible = p >= 0.42;
      plugMesh2.visible = p >= 0.42;
      cableMesh1.visible = p >= 0.46;
      cableMesh2.visible = p >= 0.46;

      // Spark particles at snap moment (p ~ 0.72)
      if (p > 0.68 && p < 0.78) {
        sparkMat.opacity = Math.sin((p - 0.68) * Math.PI * 10);
        const positions = sparkGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < sparkCount; i++) {
          positions[i * 3] += sparkVels[i * 3] * delta;
          positions[i * 3 + 1] += sparkVels[i * 3 + 1] * delta;
          positions[i * 3 + 2] += sparkVels[i * 3 + 2] * delta;
        }
        sparkGeo.attributes.position.needsUpdate = true;
      } else {
        sparkMat.opacity = 0;
      }

      // --- STAGE 4: MONITOR POWERS ON & ADOBE PREMIERE PRO MOTION GRAPHICS (0.75 to 1.0) ---
      const screenT = THREE.MathUtils.clamp((p - 0.75) / 0.25, 0, 1);
      screenGlowLight.intensity = screenT * 4.2;

      // Draw high-resolution, hyper-detailed Adobe Premiere Pro 2026 UI on the Canvas Texture
      ctx.fillStyle = '#121216';
      ctx.fillRect(0, 0, 1280, 720);

      if (p < 0.72) {
        // Monitor off: dark glassy reflective state
        ctx.fillStyle = '#070709';
        ctx.fillRect(0, 0, 1280, 720);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(800, 0);
        ctx.lineTo(300, 720);
        ctx.lineTo(0, 720);
        ctx.fill();
      } else if (p < 0.81) {
        // Premiere Pro Splash Boot Screen
        ctx.fillStyle = '#18022e';
        ctx.fillRect(0, 0, 1280, 720);
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 110px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Pr', 640, 340);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('Adobe Premiere Pro 2026', 640, 420);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('NOUMAN RIAZ // HIGH-PERFORMANCE EDITORIAL SUITE INITIALIZED', 640, 470);
      } else {
        // Full Live Adobe Premiere Pro Editor UI & Motion Graphics
        currentTimelineTime += delta * 2;
        const playheadX = 260 + ((currentTimelineTime * 70) % 960);

        // 1. Top Global Application Header
        ctx.fillStyle = '#1e1e24';
        ctx.fillRect(0, 0, 1280, 40);
        ctx.fillStyle = '#d4d4d8';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('File   Edit   Clip   Sequence   Markers   Graphics   View   Window   Help', 24, 25);
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'right';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('● REC 4K DCI • 24.00 FPS • APPLE SILICON HARDWARE ACCELERATED', 1256, 25);

        // 2. Dual Viewports: Source Monitor (Left) & Program Monitor (Right)
        
        // Left: Source Monitor (Clip Preview)
        ctx.fillStyle = '#07070a';
        ctx.fillRect(24, 58, 380, 360);
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 2;
        ctx.strokeRect(24, 58, 380, 360);

        ctx.fillStyle = '#18181c';
        ctx.fillRect(24, 58, 380, 30);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '11px sans-serif';
        ctx.fillText('Source: Take_04_Himalayan_Raw_4K.mov', 34, 78);

        // Source Waveform / Scopes preview
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(24, 88, 380, 330);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let sx = 24; sx < 404; sx += 12) {
          const sy = 250 + Math.sin(sx * 0.08 + elapsed * 5) * 45;
          if (sx === 24) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Center / Main: Program Monitor (Master Cut with Nouman's Kinetic Edits)
        ctx.fillStyle = '#060608';
        ctx.fillRect(420, 58, 520, 360);
        ctx.strokeStyle = '#27272a';
        ctx.strokeRect(420, 58, 520, 360);

        ctx.fillStyle = '#18181c';
        ctx.fillRect(420, 58, 520, 30);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('Program: Nouman_Riaz_MasterShowreel_2026.prproj', 432, 78);

        // Video Viewport Animation inside Program Monitor
        ctx.save();
        ctx.beginPath();
        ctx.rect(420, 88, 520, 330);
        ctx.clip();

        const videoHue = (elapsed * 25) % 360;
        ctx.fillStyle = `hsl(${videoHue}, 35%, 11%)`;
        ctx.fillRect(420, 88, 520, 330);

        // Animated grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1;
        for (let gx = 420; gx < 940; gx += 45) {
          ctx.beginPath();
          ctx.moveTo(gx, 88);
          ctx.lineTo(gx, 418);
          ctx.stroke();
        }

        // Animated Kinetic Cutout Box in video
        const boxPulse = Math.sin(elapsed * 3.5) * 18;
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(540, 190, 280 + boxPulse, 70);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NOUMAN RIAZ EDIT', 680 + boxPulse / 2, 234);

        // Subtitle tracking
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('Turning Rejection Into Legacy', 680, 305);

        // Timecode in video monitor
        ctx.fillStyle = '#ffffff';
        ctx.font = '13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('00:01:24:18', 438, 120);
        ctx.restore();

        // 3. Right Panel: Lumetri Color Wheels & Stereo Peak VU Meters
        ctx.fillStyle = '#18181f';
        ctx.fillRect(956, 58, 300, 360);
        ctx.strokeStyle = '#27272a';
        ctx.strokeRect(956, 58, 300, 360);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Lumetri Scopes & Vectors', 970, 84);

        // Vectorscope Circle
        ctx.strokeStyle = '#3f3f46';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(1106, 175, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Lumetri Trace / Cyan Scope Line
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.25) {
          const r = 35 + Math.sin(a * 4 + elapsed * 6) * 12;
          const px = 1106 + Math.cos(a) * r;
          const py = 175 + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Master Stereo DB Meters (Bouncing Needles)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Master Peak Audio (dB)', 970, 260);

        const meterW = 270;
        const meterH = 18;
        for (let ch = 0; ch < 2; ch++) {
          const my = 280 + ch * 26;
          ctx.fillStyle = '#0f0f13';
          ctx.fillRect(970, my, meterW, meterH);

          const peakVal = 0.5 + Math.sin(elapsed * 9 + ch * 2.2) * 0.35 + Math.random() * 0.12;
          const currentW = Math.max(15, Math.min(meterW, meterW * peakVal));

          const grad = ctx.createLinearGradient(970, my, 970 + meterW, my);
          grad.addColorStop(0, '#22c55e');
          grad.addColorStop(0.72, '#eab308');
          grad.addColorStop(0.92, '#dc2626');
          ctx.fillStyle = grad;
          ctx.fillRect(970, my, currentW, meterH);

          // dB Scale Marker Lines
          ctx.fillStyle = '#71717a';
          ctx.font = '9px monospace';
          ctx.fillText(ch === 0 ? 'L: -3.2 dB' : 'R: -3.5 dB', 974, my + 13);
        }

        // 4. Bottom Multi-Track Timeline (V4, V3, V2, V1, A1, A2, A3, A4)
        ctx.fillStyle = '#141419';
        ctx.fillRect(24, 436, 1232, 260);
        ctx.strokeStyle = '#27272a';
        ctx.strokeRect(24, 436, 1232, 260);

        // Timeline Ruler Bar
        ctx.fillStyle = '#1d1d24';
        ctx.fillRect(24, 436, 1232, 28);
        ctx.fillStyle = '#71717a';
        ctx.font = '10px monospace';
        for (let rx = 260; rx < 1250; rx += 90) {
          ctx.fillText(`00:0${Math.floor((rx - 260) / 45)}:00`, rx, 454);
        }

        // Track Header Labels
        const trackNames = [
          'V4 Titles & Logo',
          'V3 Kinetic Graphics',
          'V2 B-Roll Cut',
          'V1 4K Master Cam',
          'A1 Vocals (De-Noised)',
          'A2 Foley & Paper Sound',
          'A3 Ambient Soundscape',
          'A4 Master Score 48kHz'
        ];

        trackNames.forEach((tName, idx) => {
          const ty = 466 + idx * 28;
          ctx.fillStyle = '#1a1a20';
          ctx.fillRect(24, ty, 230, 26);
          ctx.fillStyle = idx < 4 ? '#c084fc' : '#38bdf8';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(tName, 34, ty + 18);
        });

        // Clips in Multi-Track Timeline
        const clips = [
          { track: 0, start: 280, width: 280, color: '#dc2626', name: 'Title_Kinetic_Pop.mogrt' },
          { track: 0, start: 620, width: 240, color: '#dc2626', name: 'Logo_Reveal_3D.ae' },
          { track: 1, start: 260, width: 380, color: '#ec4899', name: 'Paper_Cutout_Jennifer' },
          { track: 1, start: 680, width: 340, color: '#ec4899', name: 'Prada_Box_Motion.ae' },
          { track: 2, start: 260, width: 440, color: '#f59e0b', name: 'B-Roll_Studio_Mic_4K' },
          { track: 2, start: 740, width: 380, color: '#f59e0b', name: 'Himalayan_Expedition_4K' },
          { track: 3, start: 260, width: 960, color: '#3b82f6', name: 'A-Roll_Interview_Master.mov' },
          { track: 4, start: 260, width: 960, color: '#10b981', name: 'Vocals_Pristine_EQ_Clean' },
          { track: 5, start: 300, width: 220, color: '#06b6d4', name: 'Paper_Crinkle_Foley' },
          { track: 5, start: 580, width: 260, color: '#06b6d4', name: 'Sub_Bass_Impact_Riser' },
          { track: 6, start: 260, width: 960, color: '#6366f1', name: 'Room_Tone_Atmosphere' },
          { track: 7, start: 260, width: 960, color: '#8b5cf6', name: 'Orchestral_Cinematic_Beat' },
        ];

        clips.forEach((c) => {
          const cy = 466 + c.track * 28;
          ctx.fillStyle = c.color;
          ctx.fillRect(c.start, cy, c.width, 25);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(c.name, c.start + 8, cy + 17);
        });

        // Current Time Indicator (Playhead)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(playheadX, 436);
        ctx.lineTo(playheadX, 696);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(playheadX - 8, 436);
        ctx.lineTo(playheadX + 8, 436);
        ctx.lineTo(playheadX, 449);
        ctx.closePath();
        ctx.fill();
      }

      screenTexture.needsUpdate = true;

      // Parallax Camera Orbit based on mouse position
      camera.position.x = animStateRef.current.mouseX * 1.5;
      camera.position.y = 4.0 + animStateRef.current.mouseY * 0.9;
      camera.lookAt(0, 1.3, 0);

      renderer.render(scene, camera);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      macMiniGeo.dispose();
      aluminumMaterial.dispose();
      darkTrimMaterial.dispose();
      deskMaterial.dispose();
      screenMaterial.dispose();
      screenTexture.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleStageSelect = (stageIdx: number) => {
    setIsPlaying(false);
    animStateRef.current.isPlaying = false;
    const targetMap = [0.12, 0.38, 0.65, 0.92];
    const target = targetMap[stageIdx - 1];
    animStateRef.current.targetProgress = target;
    playClickSound();
    if (stageIdx === 1) playLevitateSound();
    else if (stageIdx === 2) playDockSound();
    else if (stageIdx === 3) playCableSnapSound();
    else if (stageIdx === 4) playBootChimeSound();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    animStateRef.current.isPlaying = false;
    const val = parseFloat(e.target.value);
    animStateRef.current.targetProgress = val;
    animStateRef.current.progress = val;
    setProgress(val);
  };

  const togglePlayback = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    animStateRef.current.isPlaying = nextState;
    playClickSound();
  };

  const resetAnimation = () => {
    animStateRef.current.progress = 0;
    animStateRef.current.targetProgress = 0;
    setProgress(0);
    setIsPlaying(true);
    animStateRef.current.isPlaying = true;
    playClickSound();
    playLevitateSound();
  };

  const cyclePlaySpeed = () => {
    playClickSound();
    if (playSpeed === 1) setPlaySpeed(0.5); // Slower, more cinematic
    else if (playSpeed === 0.5) setPlaySpeed(1.5);
    else setPlaySpeed(1);
  };

  return (
    <section className="relative bg-[#060608] text-white py-24 sm:py-32 border-t border-[#1c1c20] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-950/25 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-950/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181c] border border-[#27272a] text-xs font-mono text-[#dc2626] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE POST-PRODUCTION RIG &middot; M5 SILICON &amp; PREMIERE PRO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            The Engine Behind The Cut
          </h2>

          <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto leading-relaxed">
            Move your mouse or scrub the timeline below: watch the M5 Apple Silicon rig levitate, dock onto the studio desk, snap Thunderbolt cables with sound &amp; sparks, and boot up Adobe Premiere Pro with live multi-track motion graphics.
          </p>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0c0c0e] border border-[#222226] shadow-2xl shadow-black/90">
          
          {/* Top Viewport Header */}
          <div className="bg-[#121216] px-5 py-3 border-b border-[#222226] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                3D INTERACTIVE STUDIO BAY
              </span>
              <span className="text-[#52525b] hidden sm:inline">&middot;</span>
              <span className="text-[#a1a1aa] hidden sm:inline">WebGL 60FPS</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Speed Button */}
              <button
                onClick={cyclePlaySpeed}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c1c20] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                title="Change Animation Speed"
              >
                <FastForward className="w-3 h-3 text-[#dc2626]" />
                <span className="text-[11px] font-bold">{playSpeed}x SPEED</span>
              </button>

              {/* Sound Toggle Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsAudioEnabled(!isAudioEnabled);
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  isAudioEnabled ? 'bg-[#dc2626] text-white shadow-md shadow-red-950/60' : 'bg-[#1c1c20] text-[#a1a1aa] hover:text-white'
                }`}
                title={isAudioEnabled ? 'Mute Studio SFX' : 'Enable Studio SFX'}
              >
                {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-bold">{isAudioEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
              </button>

              <span className="text-[#dc2626] font-bold hidden sm:inline">
                STAGE 0{activeStage} / 04
              </span>
            </div>
          </div>

          {/* 3D Viewport Target */}
          <div
            ref={containerRef}
            className="w-full h-[480px] sm:h-[660px] relative cursor-grab active:cursor-grabbing select-none"
          />

          {/* Bottom HUD Controller & Timeline Scrubber */}
          <div className="bg-[#121216] p-4 sm:p-6 border-t border-[#222226] space-y-4">
            
            {/* Stage Selector Buttons (Interactive Jump Points) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleStageSelect(1)}
                onMouseEnter={playHoverSound}
                className={`p-3 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-3 ${
                  activeStage === 1
                    ? 'bg-[#1c1c24] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#141418] border-[#222226] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <Cpu className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#dc2626] font-bold">01. LEVITATE</span>
                  <span className="font-sans font-medium text-xs">M5 Mac Mini Box</span>
                </div>
              </button>

              <button
                onClick={() => handleStageSelect(2)}
                onMouseEnter={playHoverSound}
                className={`p-3 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-3 ${
                  activeStage === 2
                    ? 'bg-[#1c1c24] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#141418] border-[#222226] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <Sliders className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#dc2626] font-bold">02. DOCK</span>
                  <span className="font-sans font-medium text-xs">Studio Desk Landing</span>
                </div>
              </button>

              <button
                onClick={() => handleStageSelect(3)}
                onMouseEnter={playHoverSound}
                className={`p-3 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-3 ${
                  activeStage === 3
                    ? 'bg-[#1c1c24] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#141418] border-[#222226] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <Cable className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#dc2626] font-bold">03. CONNECT</span>
                  <span className="font-sans font-medium text-xs">Thunderbolt &amp; Sparks</span>
                </div>
              </button>

              <button
                onClick={() => handleStageSelect(4)}
                onMouseEnter={playHoverSound}
                className={`p-3 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-3 ${
                  activeStage === 4
                    ? 'bg-[#1c1c24] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#141418] border-[#222226] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <Monitor className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#dc2626] font-bold">04. LAUNCH</span>
                  <span className="font-sans font-medium text-xs">Premiere Pro Suite</span>
                </div>
              </button>
            </div>

            {/* Scrubber Progress Bar & Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={togglePlayback}
                  onMouseEnter={playHoverSound}
                  aria-label={isPlaying ? 'Pause Rig Animation' : 'Play Rig Animation'}
                  className="w-10 h-10 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white flex items-center justify-center transition-colors shadow-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                </button>

                <button
                  onClick={resetAnimation}
                  onMouseEnter={playHoverSound}
                  aria-label="Restart Animation"
                  className="w-10 h-10 rounded-lg bg-[#1c1c20] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors"
                  title="Restart Rig Sequence"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Range Slider for Manual Mouse Scrubbing */}
              <div className="flex-1 w-full space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]">
                  <span>Timeline Scrub Control &middot; 16s Pacing</span>
                  <span className="text-[#dc2626] font-bold">{Math.round(progress * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.002"
                  value={progress}
                  onChange={handleSliderChange}
                  aria-label="Interactive 3D rig animation scrub slider"
                  className="w-full accent-[#dc2626] cursor-ew-resize bg-[#27272a] h-2 rounded-lg"
                />
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#71717a] shrink-0">
                <span>Move Mouse to Tilt 3D Angle</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
