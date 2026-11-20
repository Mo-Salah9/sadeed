"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

// Brand palette
const BLUE = "#0EA5E9";
const PURPLE = "#8B5CF6";
const TEAL = "#14B8A6";
const ORANGE = "#F59E0B";
const PINK = "#EC4899";

function Crystal() {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !shell.current) return;
    group.current.rotation.y += delta * 0.22;
    // Gentle tilt towards the pointer
    group.current.rotation.x += (state.pointer.y * 0.3 - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (-state.pointer.x * 0.18 - group.current.rotation.z) * 0.05;
    shell.current.rotation.y -= delta * 0.1;
    shell.current.rotation.x += delta * 0.04;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#38BDF8" emissive={PURPLE} emissiveIntensity={0.12} flatShading roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.28} />
      </mesh>
      {/* Orbital swoosh rings (as in the logo) */}
      <mesh rotation={[Math.PI / 2.3, 0.35, 0]}>
        <torusGeometry args={[2.3, 0.014, 8, 160]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[Math.PI / 1.75, -0.55, 0.45]}>
        <torusGeometry args={[2.6, 0.012, 8, 160]} />
        <meshBasicMaterial color={PINK} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/** Floating "digital pixels" in the brand colors, echoing the logo. */
function Pixels() {
  const items: { pos: [number, number, number]; size: number; color: string; speed: number }[] = [
    { pos: [2.2, 1.45, 0.4], size: 0.3, color: PURPLE, speed: 1.8 },
    { pos: [1.65, 2.0, -0.3], size: 0.2, color: BLUE, speed: 2.2 },
    { pos: [2.65, 0.75, 0.2], size: 0.22, color: ORANGE, speed: 2 },
    { pos: [-2.35, -1.0, 0.5], size: 0.26, color: TEAL, speed: 1.6 },
    { pos: [-1.8, 1.65, -0.6], size: 0.18, color: PINK, speed: 2.4 },
    { pos: [1.4, -1.85, -0.2], size: 0.2, color: BLUE, speed: 1.9 },
  ];
  return (
    <>
      {items.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1.4} floatIntensity={1.1}>
          <RoundedBox args={[p.size, p.size, p.size]} radius={p.size * 0.18} smoothness={2} position={p.pos}>
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.35} roughness={0.35} />
          </RoundedBox>
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
        camera={{ position: [0, 0, 7.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={visible ? "always" : "never"}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} />
        {/* Colored rim lights give the facets the blue → purple → pink gradient */}
        <pointLight position={[-4, -1.5, 2.5]} intensity={26} color={PURPLE} />
        <pointLight position={[3.5, -2.5, 2]} intensity={16} color={PINK} />
        <pointLight position={[0, 3.5, 2]} intensity={12} color={TEAL} />
        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.6}>
          <Crystal />
        </Float>
        <Pixels />
      </Canvas>
    </div>
  );
}
