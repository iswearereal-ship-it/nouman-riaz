import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Monitor, Cpu, Cable, Sliders, Film } from 'lucide-react';

export const MacMiniStudioAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(1);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // References for animation loop
  const animStateRef = useRef({
    progress: 0,
    targetProgress: 0,
    isPlaying: true,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isHovered: false,
    audioEnabled: false,
  });

  animStateRef.current.audioEnabled = isAudioEnabled;

  // Sound synthesis via Web Audio API (zero external sound file dependencies)
  const playSoundEffect = (type: 'whoosh' | 'dock' | 'cable' | 'boot' | 'chime') => {
    if (!animStateRef.current.audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      if (type === 'dock') {
        // Deep solid thump + metallic ring
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'cable') {
        // High-tech magnetic snap click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'boot') {
        // Apple startup chord chord / shimmer
        const freqs = [220, 277.18, 329.63, 440, 554.37];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.04);
          gain.gain.setValueAtTime(0.12, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + 1.2);
        });
      }
    } catch {
      // AudioContext policy
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.022);

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 11.5);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainKeyLight.position.set(6, 12, 8);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.camera.near = 1;
    mainKeyLight.shadow.camera.far = 30;
    mainKeyLight.shadow.bias = -0.0001;
    scene.add(mainKeyLight);

    // Cinematic Red Accent Rim Light (matches portfolio branding)
    const redRimLight = new THREE.PointLight(0xdc2626, 4.5, 18);
    redRimLight.position.set(-6, 3, -2);
    scene.add(redRimLight);

    // Cool studio fill light
    const coolFillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    coolFillLight.position.set(-8, 6, 6);
    scene.add(coolFillLight);

    // Monitor screen glow point light (dynamic)
    const screenGlowLight = new THREE.PointLight(0xa855f7, 0, 8);
    screenGlowLight.position.set(0, 2.8, -1.8);
    scene.add(screenGlowLight);

    // --- MATERIALS ---
    // Aluminum Anodized Silver for Mac Mini
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xdde2ea,
      roughness: 0.28,
      metalness: 0.88,
      envMapIntensity: 1.2,
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.4,
      metalness: 0.6,
    });

    // Dark Studio Desk
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.5,
      metalness: 0.2,
    });

    // --- PROCEDURAL DYNAMIC TEXTURE: ADOBE PREMIERE PRO DISPLAY ---
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d')!;

    const screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });

    // --- DESK GEOMETRY ---
    const deskGroup = new THREE.Group();
    const deskTopGeo = new THREE.BoxGeometry(16, 0.4, 8);
    const deskMesh = new THREE.Mesh(deskTopGeo, deskMaterial);
    deskMesh.position.set(0, -0.2, 0);
    deskMesh.receiveShadow = true;
    deskGroup.add(deskMesh);

    // Desk mat
    const matGeo = new THREE.BoxGeometry(9.5, 0.04, 4.2);
    const matMaterial = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9 });
    const matMesh = new THREE.Mesh(matGeo, matMaterial);
    matMesh.position.set(0, 0.02, 0.3);
    matMesh.receiveShadow = true;
    deskGroup.add(matMesh);
    scene.add(deskGroup);

    // --- APPLE PRO DISPLAY XDR (STUDIO MONITOR) ---
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 2.6, -2.4);

    // Bezel & Frame
    const frameGeo = new THREE.BoxGeometry(7.2, 4.2, 0.2);
    const frameMesh = new THREE.Mesh(frameGeo, darkTrimMaterial);
    frameMesh.castShadow = true;
    monitorGroup.add(frameMesh);

    // Screen Panel
    const screenGeo = new THREE.PlaneGeometry(6.9, 3.9);
    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    screenMesh.position.set(0, 0, 0.105);
    monitorGroup.add(screenMesh);

    // Monitor Stand
    const standNeckGeo = new THREE.BoxGeometry(0.8, 2.8, 0.25);
    const standNeck = new THREE.Mesh(standNeckGeo, aluminumMaterial);
    standNeck.position.set(0, -1.5, -0.2);
    standNeck.castShadow = true;
    monitorGroup.add(standNeck);

    const standBaseGeo = new THREE.BoxGeometry(2.4, 0.08, 2.0);
    const standBase = new THREE.Mesh(standBaseGeo, aluminumMaterial);
    standBase.position.set(0, -2.55, 0.2);
    standBase.receiveShadow = true;
    standBase.castShadow = true;
    monitorGroup.add(standBase);

    scene.add(monitorGroup);

    // --- APPLE MAC MINI M5 (3D PROCEDURAL OBJECT) ---
    const macMiniGroup = new THREE.Group();
    
    // Rounded unibody box
    const bodyWidth = 2.4;
    const bodyHeight = 0.52;
    const bodyDepth = 2.4;
    const radius = 0.35;

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
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const macMiniGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    macMiniGeo.rotateX(Math.PI / 2);
    macMiniGeo.center();

    const macMiniMesh = new THREE.Mesh(macMiniGeo, aluminumMaterial);
    macMiniMesh.castShadow = true;
    macMiniMesh.receiveShadow = true;
    macMiniGroup.add(macMiniMesh);

    // Dark Apple Logo on Top
    const logoGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.02, 32);
    const logoMat = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.1, metalness: 0.95 });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, bodyHeight / 2 + 0.06, 0);
    macMiniGroup.add(logoMesh);

    // Front Status LED (White Glow)
    const ledGeo = new THREE.SphereGeometry(0.025, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, 0, bodyDepth / 2 + 0.08);
    macMiniGroup.add(ledMesh);

    // Rear Black Port Bar
    const portBarGeo = new THREE.BoxGeometry(1.8, 0.24, 0.05);
    const portBar = new THREE.Mesh(portBarGeo, darkTrimMaterial);
    portBar.position.set(0, -0.05, -bodyDepth / 2 - 0.05);
    macMiniGroup.add(portBar);

    scene.add(macMiniGroup);

    // --- BRAIDED CABLES (DYNAMIC CURVE ATTACHMENT) ---
    const cableCurve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-4.5, 0.1, -1.8),
      new THREE.Vector3(-3.0, 0.6, -1.6),
      new THREE.Vector3(-1.2, 0.3, -1.4),
      new THREE.Vector3(-0.4, 0.2, -1.2) // Target port
    );
    const cableGeo1 = new THREE.TubeGeometry(cableCurve1, 40, 0.035, 12, false);
    const cableMat1 = new THREE.MeshStandardMaterial({ color: 0x1c1c22, roughness: 0.7, metalness: 0.3 });
    const cableMesh1 = new THREE.Mesh(cableGeo1, cableMat1);
    cableMesh1.castShadow = true;
    scene.add(cableMesh1);

    // Thunderbolt Cable 2
    const cableCurve2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-4.8, 0.1, -1.2),
      new THREE.Vector3(-3.2, 0.5, -1.1),
      new THREE.Vector3(-1.5, 0.2, -1.0),
      new THREE.Vector3(0.4, 0.2, -1.2)
    );
    const cableGeo2 = new THREE.TubeGeometry(cableCurve2, 40, 0.035, 12, false);
    const cableMesh2 = new THREE.Mesh(cableGeo2, cableMat1);
    cableMesh2.castShadow = true;
    scene.add(cableMesh2);

    // Cable Connector Magnetic Heads (Metallic plugs)
    const plugGeo = new THREE.BoxGeometry(0.12, 0.08, 0.24);
    const plugMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3, metalness: 0.9 });
    const plugMesh1 = new THREE.Mesh(plugGeo, plugMat);
    const plugMesh2 = new THREE.Mesh(plugGeo, plugMat);
    scene.add(plugMesh1);
    scene.add(plugMesh2);

    // --- SPARK PARTICLES WHEN CABLES SNAP IN ---
    const sparkCount = 45;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkVels = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = 0;
      sparkPos[i * 3 + 1] = 0.2;
      sparkPos[i * 3 + 2] = -1.2;
      sparkVels[i * 3] = (Math.random() - 0.5) * 2;
      sparkVels[i * 3 + 1] = Math.random() * 2;
      sparkVels[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.07, transparent: true, opacity: 0 });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    // Track state transitions for audio triggers
    let prevStage = 1;

    // --- MOUSE & RESIZE LISTENERS ---
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

    // --- ANIMATION RENDER LOOP ---
    let reqId: number;
    let clock = new THREE.Clock();
    let currentTimelineTime = 0;

    const render = () => {
      reqId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      animStateRef.current.mouseX += (animStateRef.current.targetMouseX - animStateRef.current.mouseX) * 0.08;
      animStateRef.current.mouseY += (animStateRef.current.targetMouseY - animStateRef.current.mouseY) * 0.08;

      // Handle playback progression
      if (animStateRef.current.isPlaying) {
        animStateRef.current.progress += delta * 0.16; // Loop every ~6 seconds
        if (animStateRef.current.progress > 1) {
          animStateRef.current.progress = 0;
        }
      } else {
        // Lerp to manual target
        animStateRef.current.progress += (animStateRef.current.targetProgress - animStateRef.current.progress) * 0.1;
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
        if (currentStage === 2) playSoundEffect('dock');
        if (currentStage === 3) playSoundEffect('cable');
        if (currentStage === 4) playSoundEffect('boot');
        prevStage = currentStage;
      }

      // --- STAGE 1: LEVITATING M5 MAC MINI IN 3D AIR (0.0 to 0.25) ---
      // Hovering in air, rotating gracefully to show off aluminum unibody
      const levitateY = 2.4 + Math.sin(elapsed * 2.5) * 0.15;
      const deskY = 0.32; // resting surface on desk

      if (p < 0.25) {
        // In full flight
        macMiniGroup.position.set(
          animStateRef.current.mouseX * 0.6,
          levitateY,
          1.8 + Math.cos(elapsed * 2) * 0.2
        );
        macMiniGroup.rotation.set(
          0.35 + animStateRef.current.mouseY * 0.4,
          elapsed * 0.8 + animStateRef.current.mouseX * 0.6,
          Math.sin(elapsed * 1.5) * 0.15
        );
      } else if (p < 0.5) {
        // --- STAGE 2: GLIDE DOWN & DOCK ONTO DESK (0.25 to 0.5) ---
        const t = (p - 0.25) / 0.25;
        // Smooth easing with soft bounce
        const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        macMiniGroup.position.x = THREE.MathUtils.lerp(animStateRef.current.mouseX * 0.6, 0, easeT);
        macMiniGroup.position.y = THREE.MathUtils.lerp(levitateY, deskY, easeT);
        macMiniGroup.position.z = THREE.MathUtils.lerp(1.8, 0.4, easeT);

        macMiniGroup.rotation.x = THREE.MathUtils.lerp(0.35, 0, easeT);
        macMiniGroup.rotation.y = THREE.MathUtils.lerp(0.8, 0, easeT);
        macMiniGroup.rotation.z = THREE.MathUtils.lerp(0.15, 0, easeT);
      } else {
        // Docked firmly on the desk
        macMiniGroup.position.set(0, deskY, 0.4);
        macMiniGroup.rotation.set(0, 0, 0);
      }

      // --- STAGE 3: CABLES ATTACH MAGNETICALLY (0.5 to 0.75) ---
      const cableT = THREE.MathUtils.clamp((p - 0.5) / 0.25, 0, 1);
      
      // Update cable endpoints to plug into rear of Mac Mini
      const rearPortX1 = -0.35;
      const rearPortX2 = 0.35;
      const rearPortY = macMiniGroup.position.y + 0.05;
      const rearPortZ = macMiniGroup.position.z - 1.25;

      // Animate cable plug approach
      const plugTarget1 = new THREE.Vector3(rearPortX1, rearPortY, rearPortZ);
      const plugTarget2 = new THREE.Vector3(rearPortX2, rearPortY, rearPortZ);
      const plugStart1 = new THREE.Vector3(-2.8, 0.4, -0.6);
      const plugStart2 = new THREE.Vector3(2.8, 0.4, -0.6);

      plugMesh1.position.lerpVectors(plugStart1, plugTarget1, cableT);
      plugMesh2.position.lerpVectors(plugStart2, plugTarget2, cableT);
      plugMesh1.visible = p >= 0.4;
      plugMesh2.visible = p >= 0.4;
      cableMesh1.visible = p >= 0.45;
      cableMesh2.visible = p >= 0.45;

      // Spark particles trigger at connection moment (p ~ 0.72)
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
      screenGlowLight.intensity = screenT * 3.5;

      // Draw dynamic high-fidelity Premiere Pro interface on the Canvas Texture
      ctx.fillStyle = '#0f0f13';
      ctx.fillRect(0, 0, 1024, 576);

      if (p < 0.72) {
        // Monitor off: dark glassy reflective state
        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, 1024, 576);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(600, 0);
        ctx.lineTo(200, 576);
        ctx.lineTo(0, 576);
        ctx.fill();
      } else if (p < 0.8) {
        // Premiere Pro Boot Splash Screen
        ctx.fillStyle = '#140026';
        ctx.fillRect(0, 0, 1024, 576);
        ctx.fillStyle = '#9911ee';
        ctx.font = 'bold 84px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Pr', 512, 280);
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px sans-serif';
        ctx.fillText('Adobe Premiere Pro 2026', 512, 340);
        ctx.fillStyle = '#dc2626';
        ctx.font = '16px monospace';
        ctx.fillText('NOUMAN RIAZ // EDITORIAL SUITE INITIALIZED', 512, 380);
      } else {
        // Full Live Adobe Premiere Pro Editor UI & Motion Graphics
        currentTimelineTime += delta * 2;
        const playheadX = 220 + ((currentTimelineTime * 65) % 760);

        // Top Menu Bar
        ctx.fillStyle = '#1a1a20';
        ctx.fillRect(0, 0, 1024, 32);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('File   Edit   Clip   Sequence   Markers   Graphics   Window   Help', 18, 21);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'right';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('REC 4K DCI • 24.00 FPS', 1006, 21);

        // Program Monitor (Video Viewport)
        ctx.fillStyle = '#060608';
        ctx.fillRect(20, 48, 540, 310);
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 48, 540, 310);

        // Video Content inside Program Monitor (Motion Graphics Animation!)
        ctx.save();
        ctx.beginPath();
        ctx.rect(20, 48, 540, 310);
        ctx.clip();

        // Animated neon visualizer & typography in video viewport
        const videoHue = (elapsed * 30) % 360;
        ctx.fillStyle = `hsl(${videoHue}, 30%, 12%)`;
        ctx.fillRect(20, 48, 540, 310);

        // Grid lines in video
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let gx = 20; gx < 560; gx += 40) {
          ctx.beginPath();
          ctx.moveTo(gx, 48);
          ctx.lineTo(gx, 358);
          ctx.stroke();
        }

        // Animated Kinetic Cutout Box in video
        const boxPulse = Math.sin(elapsed * 4) * 15;
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(160, 140, 260 + boxPulse, 65);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NOUMAN RIAZ EDIT', 290 + boxPulse / 2, 180);

        // Subtitle tracking
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('Turning Rejection Into Legacy', 290, 245);

        // Corner timecode in video monitor
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('00:01:24:18', 35, 75);
        ctx.restore();

        // Right Panel: Lumetri Color & Audio Meters
        ctx.fillStyle = '#18181e';
        ctx.fillRect(575, 48, 430, 310);
        ctx.strokeStyle = '#27272a';
        ctx.strokeRect(575, 48, 430, 310);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Lumetri Color & Scopes', 590, 72);

        // RGB Color Wheels simulation
        const wheelY = 135;
        ['Shadows', 'Midtones', 'Highlights'].forEach((label, i) => {
          const wx = 635 + i * 115;
          ctx.strokeStyle = '#3f3f46';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(wx, wheelY, 32, 0, Math.PI * 2);
          ctx.stroke();
          // Center reticle
          ctx.fillStyle = i === 1 ? '#dc2626' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(wx + Math.sin(elapsed * 2 + i) * 6, wheelY + Math.cos(elapsed * 2 + i) * 6, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#a1a1aa';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(label, wx, wheelY + 50);
        });

        // Bouncing Audio VU Meters
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Master Audio Peak [L / R]', 590, 235);
        const barW = 390;
        const barH = 16;
        for (let ch = 0; ch < 2; ch++) {
          const by = 250 + ch * 22;
          ctx.fillStyle = '#111114';
          ctx.fillRect(590, by, barW, barH);
          const level = 0.4 + Math.sin(elapsed * 8 + ch * 1.5) * 0.35 + Math.random() * 0.15;
          const fillW = Math.max(10, Math.min(barW, barW * level));
          const grad = ctx.createLinearGradient(590, by, 590 + barW, by);
          grad.addColorStop(0, '#22c55e');
          grad.addColorStop(0.7, '#eab308');
          grad.addColorStop(0.95, '#dc2626');
          ctx.fillStyle = grad;
          ctx.fillRect(590, by, fillW, barH);
        }

        // Bottom Timeline Area (V1, V2, V3, A1, A2, A3)
        ctx.fillStyle = '#141419';
        ctx.fillRect(20, 375, 985, 185);
        ctx.strokeStyle = '#27272a';
        ctx.strokeRect(20, 375, 985, 185);

        // Timeline ruler
        ctx.fillStyle = '#1e1e26';
        ctx.fillRect(20, 375, 985, 26);
        ctx.fillStyle = '#71717a';
        ctx.font = '10px monospace';
        for (let rx = 220; rx < 1000; rx += 80) {
          ctx.fillText(`00:0${Math.floor((rx - 220) / 40)}:00`, rx, 392);
        }

        // Track Labels
        const trackNames = ['V3 Graphics', 'V2 B-Roll Cut', 'V1 A-Cam 4K', 'A1 Dialogue', 'A2 Sound FX', 'A3 Cinematic Music'];
        trackNames.forEach((tName, idx) => {
          const ty = 405 + idx * 24;
          ctx.fillStyle = '#1e1e24';
          ctx.fillRect(20, ty, 180, 22);
          ctx.fillStyle = idx < 3 ? '#a78bfa' : '#38bdf8';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(tName, 30, ty + 15);
        });

        // Clips in Timeline
        const clips = [
          { track: 0, start: 240, width: 220, color: '#dc2626', name: 'Title_Kinetic_Pop.mogrt' },
          { track: 0, start: 500, width: 190, color: '#dc2626', name: 'Paper_Tear_Cutout.ae' },
          { track: 1, start: 220, width: 340, color: '#f59e0b', name: 'B-Roll_Himalayan_4K' },
          { track: 1, start: 600, width: 280, color: '#f59e0b', name: 'Archive_Vintage_Press' },
          { track: 2, start: 220, width: 760, color: '#3b82f6', name: 'A-Roll_Studio_Take_01.mov' },
          { track: 3, start: 220, width: 760, color: '#10b981', name: 'Dialogue_Clean_DeNoise_EQ' },
          { track: 4, start: 280, width: 140, color: '#ec4899', name: 'Paper_Crinkle_Foley' },
          { track: 4, start: 450, width: 160, color: '#ec4899', name: 'Impact_Riser_Sub' },
          { track: 5, start: 220, width: 760, color: '#8b5cf6', name: 'Cinematic_Score_48kHz' },
        ];

        clips.forEach((c) => {
          const cy = 405 + c.track * 24;
          ctx.fillStyle = c.color;
          ctx.fillRect(c.start, cy, c.width, 21);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(c.name, c.start + 6, cy + 14);
        });

        // Red Current Time Indicator (Playhead)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(playheadX, 375);
        ctx.lineTo(playheadX, 560);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(playheadX - 6, 375);
        ctx.lineTo(playheadX + 6, 375);
        ctx.lineTo(playheadX, 386);
        ctx.closePath();
        ctx.fill();
      }

      screenTexture.needsUpdate = true;

      // Camera parallax tilt based on mouse position
      camera.position.x = animStateRef.current.mouseX * 1.4;
      camera.position.y = 3.8 + animStateRef.current.mouseY * 0.8;
      camera.lookAt(0, 1.2, 0);

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
    playSoundEffect(stageIdx === 2 ? 'dock' : stageIdx === 3 ? 'cable' : stageIdx === 4 ? 'boot' : 'whoosher' as 'whoosh');
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
  };

  const resetAnimation = () => {
    animStateRef.current.progress = 0;
    animStateRef.current.targetProgress = 0;
    setProgress(0);
    setIsPlaying(true);
    animStateRef.current.isPlaying = true;
  };

  return (
    <section className="relative bg-[#060608] text-white py-24 sm:py-32 border-t border-[#1c1c20] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-950/20 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-950/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181c] border border-[#27272a] text-xs font-mono text-[#dc2626] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE STUDIO RIG &middot; M5 SILICON &amp; PREMIERE PRO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            The Engine Behind The Cut
          </h2>

          <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto leading-relaxed">
            Move your mouse or scrub the timeline below: watch the M5 Apple Silicon rig levitate, dock onto the studio desk, snap Thunderbolt cables, and boot up Adobe Premiere Pro with live motion graphics.
          </p>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0c0c0e] border border-[#222226] shadow-2xl shadow-black/90">
          
          {/* Top Viewport Header */}
          <div className="bg-[#121216] px-5 py-3 border-b border-[#222226] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                3D INTERACTIVE SUITE
              </span>
              <span className="text-[#52525b] hidden sm:inline">&middot;</span>
              <span className="text-[#a1a1aa] hidden sm:inline">WebGL 60FPS</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                  isAudioEnabled ? 'bg-[#dc2626] text-white' : 'bg-[#1c1c20] text-[#a1a1aa] hover:text-white'
                }`}
                title={isAudioEnabled ? 'Mute Studio SFX' : 'Enable Studio SFX'}
              >
                {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{isAudioEnabled ? 'SFX ON' : 'SFX OFF'}</span>
              </button>

              <span className="text-[#dc2626] font-bold">
                STAGE 0{activeStage} / 04
              </span>
            </div>
          </div>

          {/* 3D Viewport Target */}
          <div
            ref={containerRef}
            className="w-full h-[450px] sm:h-[620px] relative cursor-grab active:cursor-grabbing select-none"
          />

          {/* Bottom HUD Controller & Timeline Scrubber */}
          <div className="bg-[#121216] p-4 sm:p-6 border-t border-[#222226] space-y-4">
            
            {/* Stage Selector Buttons (Interactive Jump Points) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleStageSelect(1)}
                className={`p-2.5 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-2.5 ${
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
                className={`p-2.5 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-2.5 ${
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
                className={`p-2.5 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-2.5 ${
                  activeStage === 3
                    ? 'bg-[#1c1c24] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#141418] border-[#222226] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <Cable className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#dc2626] font-bold">03. CONNECT</span>
                  <span className="font-sans font-medium text-xs">Thunderbolt Cables</span>
                </div>
              </button>

              <button
                onClick={() => handleStageSelect(4)}
                className={`p-2.5 rounded-lg border text-left transition-all text-xs font-mono flex items-center gap-2.5 ${
                  activeStage === 4
                    ? 'bg-[#1c1c24] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#141418] border-[#222226] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <Monitor className="w-4 h-4 text-[#dc2626] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#dc2626] font-bold">04. LAUNCH</span>
                  <span className="font-sans font-medium text-xs">Premiere Pro Cuts</span>
                </div>
              </button>
            </div>

            {/* Scrubber Progress Bar & Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={togglePlayback}
                  aria-label={isPlaying ? 'Pause Rig Animation' : 'Play Rig Animation'}
                  className="w-10 h-10 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white flex items-center justify-center transition-colors shadow-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                </button>

                <button
                  onClick={resetAnimation}
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
                  <span>Timeline Scrub Control</span>
                  <span className="text-[#dc2626] font-bold">{Math.round(progress * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.005"
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
