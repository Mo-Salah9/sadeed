"use client";

import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Shape,
  TorusGeometry,
  type Group,
} from "three";

// Brand palette
const BLUE = "#0EA5E9";
const PURPLE = "#8B5CF6";
const TEAL = "#14B8A6";
const ORANGE = "#F59E0B";
const PINK = "#EC4899";
const CYAN = "#22D3EE";
const NAVY = "#0B1023";

/* ------------------------------------------------------------------ */
/* VR headset: white shell, black glass visor, glowing play symbol     */
/* ------------------------------------------------------------------ */
function Headset() {
  const playGeometry = useMemo(() => {
    const s = new Shape();
    s.moveTo(-0.13, -0.2);
    s.lineTo(0.21, 0);
    s.lineTo(-0.13, 0.2);
    s.closePath();
    const g = new ExtrudeGeometry(s, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    g.center();
    return g;
  }, []);

  return (
    <group>
      {/* Shell */}
      <RoundedBox args={[2.2, 1.15, 0.85]} radius={0.3} smoothness={4}>
        <meshStandardMaterial color="#E8EEF7" roughness={0.22} metalness={0.05} envMapIntensity={1.2} />
      </RoundedBox>
      {/* Gradient rim around the visor */}
      <RoundedBox args={[2.04, 1.0, 0.1]} radius={0.045} smoothness={4} position={[0, 0, 0.42]}>
        <meshStandardMaterial color={PURPLE} emissive={PURPLE} emissiveIntensity={0.55} roughness={0.3} />
      </RoundedBox>
      {/* Black glass visor */}
      <RoundedBox args={[1.94, 0.9, 0.1]} radius={0.045} smoothness={4} position={[0, 0, 0.46]}>
        <meshStandardMaterial color={NAVY} roughness={0.06} metalness={0.6} envMapIntensity={1.5} />
      </RoundedBox>
      {/* Play symbol */}
      <mesh geometry={playGeometry} position={[0.03, 0, 0.53]}>
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      {/* Lens glint */}
      <mesh position={[-0.55, 0.18, 0.515]}>
        <circleGeometry args={[0.07, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
      {/* Face cushion */}
      <RoundedBox args={[1.92, 0.92, 0.32]} radius={0.13} smoothness={4} position={[0, 0, -0.52]}>
        <meshStandardMaterial color="#1E293B" roughness={0.85} />
      </RoundedBox>
      {/* Side speakers */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 1.12, -0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
          <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.5} roughness={0.35} />
        </mesh>
      ))}
      {/* Head strap */}
      <mesh position={[0, 0.05, -0.55]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.85, 1]}>
        <torusGeometry args={[1.12, 0.07, 12, 64, Math.PI]} />
        <meshStandardMaterial color={PURPLE} roughness={0.45} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Open book with a beam of light rising into the headset              */
/* ------------------------------------------------------------------ */
function Book() {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} rotation={[0, 0, side * -0.14]}>
          {/* Cover */}
          <RoundedBox args={[1.55, 0.07, 1.95]} radius={0.03} smoothness={3} position={[side * 0.8, -0.06, 0]}>
            <meshStandardMaterial
              color={side < 0 ? BLUE : PURPLE}
              emissive={side < 0 ? BLUE : PURPLE}
              emissiveIntensity={0.35}
              roughness={0.4}
            />
          </RoundedBox>
          {/* Page block */}
          <RoundedBox args={[1.45, 0.14, 1.82]} radius={0.04} smoothness={3} position={[side * 0.76, 0.05, 0]}>
            <meshStandardMaterial color="#F1F5F9" roughness={0.6} />
          </RoundedBox>
          {/* Text lines on the page */}
          {[0.55, 0.3, 0.05, -0.2, -0.45].map((z, i) => (
            <mesh key={z} position={[side * 0.78, 0.125, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[i === 4 ? 0.6 : 1.05, 0.06]} />
              <meshBasicMaterial color={i === 0 ? (side < 0 ? BLUE : PURPLE) : "#94A3B8"} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Spine */}
      <mesh position={[0, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.95, 16]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function LightBeam() {
  return (
    <mesh position={[0, -0.45, 0.05]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[1.25, 1.55, 48, 1, true]} />
      <meshBasicMaterial
        color={CYAN}
        transparent
        opacity={0.13}
        side={DoubleSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Gradient orbital swoosh (orange → pink → purple → blue), as in logo */
/* ------------------------------------------------------------------ */
function Swoosh() {
  const ref = useRef<Group>(null);
  const geometry = useMemo(() => {
    const arc = Math.PI * 1.55;
    const g = new TorusGeometry(2.55, 0.035, 12, 200, arc);
    const stops = [ORANGE, PINK, PURPLE, BLUE].map((c) => new Color(c));
    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c = new Color();
    for (let i = 0; i < pos.count; i++) {
      let a = Math.atan2(pos.getY(i), pos.getX(i));
      if (a < 0) a += Math.PI * 2;
      const t = Math.min(1, a / arc) * (stops.length - 1);
      const k = Math.min(stops.length - 2, Math.floor(t));
      c.copy(stops[k]).lerp(stops[k + 1], t - k);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.15;
  });

  return (
    <group position={[0, -0.45, 0]} rotation={[Math.PI / 2 - 0.22, 0, 0.1]}>
      <group ref={ref}>
        <mesh geometry={geometry}>
          <meshBasicMaterial vertexColors toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Floating education icons                                            */
/* ------------------------------------------------------------------ */
function GraduationCap() {
  return (
    <group rotation={[0.35, 0.5, -0.15]}>
      {/* Board */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.1, 0.06, 1.1]} />
        <meshStandardMaterial color="#1E1B4B" emissive={PURPLE} emissiveIntensity={0.25} roughness={0.5} />
      </mesh>
      {/* Crown */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.36, 32]} />
        <meshStandardMaterial color="#1E1B4B" roughness={0.6} />
      </mesh>
      {/* Button + tassel */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.42, -0.12, 0.42]}>
        <cylinderGeometry args={[0.018, 0.018, 0.34, 8]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.42, -0.32, 0.42]}>
        <coneGeometry args={[0.07, 0.16, 12]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

const ORBITS = [0, Math.PI / 3, -Math.PI / 3];
const ELECTRON_COLORS = [PINK, ORANGE, BLUE];

function Atom() {
  const electrons = useRef<Group>(null);

  useFrame((state) => {
    const g = electrons.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((child, i) => {
      const a = t * (1.6 + i * 0.35) + i * 2;
      // Position on an ellipse, then rotate into the orbit's plane
      const x = Math.cos(a) * 0.62;
      const y = Math.sin(a) * 0.22;
      const r = ORBITS[i];
      child.position.set(x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r), Math.sin(a) * 0.1);
    });
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.9} toneMapped={false} />
      </mesh>
      {ORBITS.map((r) => (
        <mesh key={r} rotation={[0, 0, r]} scale={[1, 0.355, 1]}>
          <torusGeometry args={[0.62, 0.012, 8, 80]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
        </mesh>
      ))}
      <group ref={electrons}>
        {ORBITS.map((r, i) => (
          <mesh key={r}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial
              color={ELECTRON_COLORS[i]}
              emissive={ELECTRON_COLORS[i]}
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Floating "digital pixels" in the brand colors, echoing the logo. */
function Pixels() {
  const items: { pos: [number, number, number]; size: number; color: string; speed: number }[] = [
    { pos: [2.05, 1.95, -0.4], size: 0.3, color: PURPLE, speed: 1.8 },
    { pos: [1.55, 2.45, -0.6], size: 0.2, color: BLUE, speed: 2.2 },
    { pos: [2.55, 1.45, -0.2], size: 0.2, color: ORANGE, speed: 2 },
    { pos: [-2.6, -0.6, 0.3], size: 0.22, color: TEAL, speed: 1.6 },
    { pos: [-1.5, 2.3, -0.8], size: 0.16, color: PINK, speed: 2.4 },
    { pos: [2.35, -1.75, 0.2], size: 0.18, color: BLUE, speed: 1.9 },
  ];
  return (
    <>
      {items.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1.4} floatIntensity={1}>
          <RoundedBox args={[p.size, p.size, p.size]} radius={p.size * 0.18} smoothness={2} position={p.pos}>
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.45} roughness={0.35} />
          </RoundedBox>
        </Float>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */
function Composition() {
  const root = useRef<Group>(null);
  const headset = useRef<Group>(null);

  useFrame((state, delta) => {
    const r = root.current;
    if (r) {
      // Three-quarter view that tilts towards the pointer
      r.rotation.y += (state.pointer.x * 0.4 - 0.22 - r.rotation.y) * 0.04;
      r.rotation.x += (-state.pointer.y * 0.15 + 0.04 - r.rotation.x) * 0.04;
    }
    if (headset.current) {
      const t = state.clock.elapsedTime;
      headset.current.position.y = 0.8 + Math.sin(t * 1.1) * 0.08;
      headset.current.rotation.z = Math.sin(t * 0.7) * 0.04;
      headset.current.rotation.y += Math.sin(t * 0.5) * delta * 0.05;
    }
  });

  return (
    <group ref={root}>
      <group ref={headset} position={[0, 0.8, 0]} scale={1.3}>
        <Headset />
      </group>
      <group position={[0, -1.45, 0]} rotation={[0.5, 0, 0]} scale={1.1}>
        <Book />
      </group>
      <LightBeam />
      <Swoosh />
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        <group position={[-2.45, 1.75, -0.4]} scale={0.9}>
          <GraduationCap />
        </group>
      </Float>
      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.8}>
        <group position={[2.05, -0.15, 0.35]} scale={0.85}>
          <Atom />
        </group>
      </Float>
      <Pixels />
    </group>
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
        camera={{ position: [0, 0.1, 7.9], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} />
        <pointLight position={[-4, -1, 3]} intensity={30} color={PURPLE} />
        <pointLight position={[4, -2, 2.5]} intensity={22} color={PINK} />
        <pointLight position={[0, 4, 2]} intensity={14} color={CYAN} />

        {/* Studio reflections rendered locally (no HDR download) */}
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 3, 4]} scale={[8, 2, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={2.5} position={[-5, 0, 2]} scale={[2, 6, 1]} color={BLUE} />
          <Lightformer form="rect" intensity={2.5} position={[5, 0, 2]} scale={[2, 6, 1]} color={PURPLE} />
          <Lightformer form="ring" intensity={1.5} position={[0, -3, 3]} scale={3} color={PINK} />
        </Environment>

        <Composition />
      </Canvas>
    </div>
  );
}
