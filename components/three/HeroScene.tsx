"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

const TEAL = "#00C2CB";
const NAVY = "#1D3A6B";

function Gem() {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !shell.current) return;
    group.current.rotation.y += delta * 0.25;
    // Gentle tilt towards the pointer
    group.current.rotation.x += (state.pointer.y * 0.35 - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (-state.pointer.x * 0.2 - group.current.rotation.z) * 0.05;
    shell.current.rotation.y -= delta * 0.12;
    shell.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshStandardMaterial color={TEAL} flatShading roughness={0.35} metalness={0.25} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color={TEAL} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.012, 8, 128]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[2.6, 0.01, 8, 128]} />
        <meshBasicMaterial color="#6FE6EB" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Satellites() {
  const items: { pos: [number, number, number]; size: number; color: string; speed: number }[] = [
    { pos: [2.3, 1.2, 0.4], size: 0.18, color: TEAL, speed: 2 },
    { pos: [-2.4, -0.9, 0.6], size: 0.22, color: NAVY, speed: 1.6 },
    { pos: [-1.6, 1.8, -0.8], size: 0.12, color: "#6FE6EB", speed: 2.4 },
    { pos: [1.7, -1.7, -0.4], size: 0.14, color: TEAL, speed: 1.8 },
  ];
  return (
    <>
      {items.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={2} floatIntensity={1.2}>
          <mesh position={s.pos}>
            <octahedronGeometry args={[s.size, 0]} />
            <meshStandardMaterial color={s.color} flatShading roughness={0.4} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering when the hero is scrolled out of view (saves battery/CPU)
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={visible ? "always" : "never"}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 3]} intensity={2.2} />
        <pointLight position={[-4, -2, 2]} intensity={18} color={TEAL} />
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
          <Gem />
        </Float>
        <Satellites />
      </Canvas>
    </div>
  );
}
