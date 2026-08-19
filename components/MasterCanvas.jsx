'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ------------------------------------------------------------------
// 1. Pita Kaca Polos Bersih (Pure Clean Glass Halo)
// ------------------------------------------------------------------
function CleanGlassHalo({ baseScale = 1 }) {
  const haloRef = useRef(null);
  const radius = 1.7 * baseScale;
  const height = 0.26 * baseScale;

  useFrame((_, delta) => {
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group rotation={[Math.PI / 4.0, 0, -Math.PI / 18]}>
      <group ref={haloRef}>
        {/* Badan Silinder Kaca Gelap Transparan */}
        <mesh>
          <cylinderGeometry args={[radius, radius, height, 128, 1, true]} />
          <meshPhysicalMaterial
            color="#020617"
            roughness={0.05}
            metalness={0.9}
            transmission={0.6}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Garis Border Neon Cyan Atas */}
        <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.009 * baseScale, 16, 128]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={3.5}
            roughness={0.1}
          />
        </mesh>

        {/* Garis Border Neon Cyan Bawah */}
        <mesh position={[0, -height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.009 * baseScale, 16, 128]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={3.5}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

// ------------------------------------------------------------------
// 2. Logo 3D MD + ORNAMEN (SIAP PAKAI UNTUK OPS A & B)
// ------------------------------------------------------------------
function LogoMDCore({ baseScale = 1 }) {
  const logoRef = useRef(null);
  const backplateRef = useRef(null);

  // --- Geometri Dasar (Shape & Extrude) ---
  const shapeM = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.65, -0.55); s.lineTo(-0.48, -0.55); s.lineTo(-0.48, 0.05);
    s.lineTo(-0.32, -0.2); s.lineTo(-0.16, 0.05); s.lineTo(-0.16, -0.55);
    s.lineTo(0.01, -0.55); s.lineTo(0.01, 0.55); s.lineTo(-0.16, 0.55);
    s.lineTo(-0.32, 0.25); s.lineTo(-0.48, 0.55); s.lineTo(-0.65, 0.55);
    s.closePath(); return s;
  }, []);

  const shapeD = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.12, -0.55); s.lineTo(0.42, -0.55); s.lineTo(0.68, -0.2);
    s.lineTo(0.68, 0.2); s.lineTo(0.42, 0.55); s.lineTo(0.12, 0.55); s.closePath();
    const hole = new THREE.Path();
    hole.moveTo(0.28, -0.36); hole.lineTo(0.38, -0.36); hole.lineTo(0.51, -0.12);
    hole.lineTo(0.51, 0.12); hole.lineTo(0.38, 0.36); hole.lineTo(0.28, 0.36); hole.closePath();
    s.holes.push(hole); return s;
  }, []);

  // OPS B: Rangka Penopang Belakang Geometris
  const backplateShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.85, 0.65); s.lineTo(0.85, 0.65); s.lineTo(0.95, 0.2); s.lineTo(0.95, -0.2);
    s.lineTo(0.85, -0.65); s.lineTo(-0.85, -0.65); s.lineTo(-0.95, -0.3); s.lineTo(-0.95, 0.3);
    s.closePath(); return s;
  }, []);

  const extrudeSettings = { steps: 1, depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 3 };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (logoRef.current) {
      logoRef.current.rotation.y = t * 0.3;
      logoRef.current.rotation.x = Math.sin(t * 0.2) * 0.12;
    }
  });

  return (
    <group ref={logoRef} scale={0.82 * baseScale}>
      
      {/* -------------------------------------------------------- */}
      {/* (OPSI A): HIASAN SIRKUIT & NODE DI PERMUKAAN M / D */}
      {/* -------------------------------------------------------- */}
      {/* --- Huruf 'M' Titanium Deep Blue --- */}
      <mesh position={[0, 0, -0.08]}>
        <extrudeGeometry args={[shapeM, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#0b1329" emissive="#0284c7" emissiveIntensity={0.6}
          roughness={0.12} metalness={0.95} clearcoat={1.0}
        />
      </mesh>
      {/* OPS A: Hiasan Garis Sirkuit & Glow Outline 'M' */}
      <mesh position={[0, 0, -0.08]}>
        <extrudeGeometry args={[shapeM, extrudeSettings]} />
        <meshBasicMaterial wireframe color="#38bdf8" transparent opacity={0.5} />
      </mesh>

      {/* --- Huruf 'D' Cyan Glow Metal --- */}
      <mesh position={[0, 0, -0.08]}>
        <extrudeGeometry args={[shapeD, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#061c38" emissive="#00f0ff" emissiveIntensity={0.9}
          roughness={0.1} metalness={0.92} clearcoat={1.0}
        />
      </mesh>
      {/* OPS A: Glow Outline & Micro-Node Points di 'D' */}
      <mesh position={[0, 0, -0.08]}>
        <extrudeGeometry args={[shapeD, extrudeSettings]} />
        <meshBasicMaterial wireframe color="#00f0ff" transparent opacity={0.6} />
      </mesh>

      {/* OPS A: Node Titik Data Berdenyut di Antara MD */}
      <mesh position={[0.065, 0, 0.06]}>
        <octahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* -------------------------------------------------------- */}
      {/* (OPSI B): HIASAN RANGKA MEKANIKAL DI BELAKANG MD */}
      {/* -------------------------------------------------------- */}
      {/* OPS B: Rangka Geometris Backplate Melayang */}
      <mesh position={[0, 0, -0.16]} scale={0.95}>
        <extrudeGeometry args={[backplateShape, { depth: 0.03, bevelEnabled: false }]} />
        <meshPhysicalMaterial
          color="#030816" roughness={0.2} metalness={0.8}
          transparent opacity={0.4}
        />
      </mesh>
      {/* OPS B: Wireframe Backplate Neon Tipis */}
      <mesh position={[0, 0, -0.16]} scale={0.95}>
        <extrudeGeometry args={[backplateShape, { depth: 0.03, bevelEnabled: false }]} />
        <meshBasicMaterial wireframe color="#0284c7" transparent opacity={0.3} />
      </mesh>

      {/* OPS B: Pilar Pemisah Inti Energi Vertikal (Di Antara M dan D) */}
      <mesh position={[0.065, 0, 0.12]}>
        <boxGeometry args={[0.02, 0.95, 0.02]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#00f0ff" emissiveIntensity={2.8}
        />
      </mesh>
      {/* OPS B: Pilar Pemisah Atas-Bawah */}
      <mesh position={[0.065, 0.52, -0.1]} scale={0.7} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} />
      </mesh>
      <mesh position={[0.065, -0.52, -0.1]} scale={0.7} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} />
      </mesh>

    </group>
  );
}

// ------------------------------------------------------------------
// 3. Scene Controller & Komposisi Utama
// ------------------------------------------------------------------
function MainScene() {
  const groupRef = useRef(null);
  const { size } = useThree();
  const isMobile = size.width < 768;

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      const targetX = isMobile ? 0 : 1.85;
      const targetY = isMobile ? 0.45 : 0;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + Math.sin(t * 0.6) * 0.04, 0.05);

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.16, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.12, 0.04);
    }
  });

  const baseScale = isMobile ? 0.72 : 1.0;

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={groupRef} position={[isMobile ? 0 : 1.85, isMobile ? 0.45 : 0, 0]}>
        <LogoMDCore baseScale={baseScale} />
        <CleanGlassHalo baseScale={baseScale} />
      </group>
    </Float>
  );
}

// ------------------------------------------------------------------
// 4. MasterCanvas Component
// ------------------------------------------------------------------
export default function MasterCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#020205]">
      <Canvas
        camera={{
          position: [0, 0.5, 5.4],
          fov: 42,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
          powerPreference: 'high-performance',
        }}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 8, 6]} intensity={3.5} color="#e0f2fe" />
        <directionalLight position={[-6, -4, -4]} intensity={1.8} color="#0284c7" />
        <pointLight position={[0, 0, 3]} color="#00f0ff" intensity={2.6} />

        {/* Space Background */}
        <Stars radius={120} depth={50} count={3500} factor={3.5} saturation={0} fade speed={0.8} />
        <Sparkles count={35} scale={12} size={1.2} speed={0.2} opacity={0.3} color="#38bdf8" />

        <MainScene />
      </Canvas>
    </div>
  );
}