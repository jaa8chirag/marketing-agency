"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// This is the one place on the site Three.js earns its keep: the Ecosystem
// page is literally describing a parent/child network (Cordinit -> Cordinit
// Technology / Cordinit Media -> eight capabilities), so an orbiting node
// graph illustrates the actual content instead of being decoration bolted
// onto an unrelated page. Every label here is also present as real, crawlable
// text in the section below — this canvas is a supplementary visual, not the
// only place the information exists (WebGL isn't accessible or indexable).

function Node({
  position,
  size,
  color,
  label,
  sublabel,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.35} metalness={0.1} />
      </mesh>
      <Html center distanceFactor={9} occlude style={{ pointerEvents: "none" }}>
        <div className="text-center select-none whitespace-nowrap">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {label}
          </div>
          {sublabel && (
            <div className="font-mono text-[8px] text-white/60 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{sublabel}</div>
          )}
        </div>
      </Html>
    </group>
  );
}

/** Wraps children in a group that continuously rotates around Y — nesting
 * these lets the capability satellites orbit around the (already orbiting)
 * Media node, exactly like the real hierarchy: Cordinit -> Media -> capability. */
function Orbit({ speed, children }: { speed: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene({ capabilities }: { capabilities: { slug: string; name: string; shortName: string }[] }) {
  const capOrbitRadius = 1.5;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 5, 6]} intensity={1.4} color="#a8ffaf" />
      <pointLight position={[-6, -4, -6]} intensity={0.5} color="#ffffff" />
      <Sparkles count={60} scale={9} size={1.5} speed={0.15} color="#26D62E" opacity={0.4} />

      <Node position={[0, 0, 0]} size={0.85} color="#26D62E" label="Cordinit" sublabel="Parent ecosystem" />

      <Orbit speed={0.12}>
        <Node position={[3.4, 0, 0]} size={0.5} color="#e8e8e8" label="Cordinit Technology" sublabel="Engineering" />
      </Orbit>

      <group rotation={[0, Math.PI, 0]}>
        <Orbit speed={0.12}>
          <group position={[3.4, 0, 0]}>
            <Node position={[0, 0, 0]} size={0.55} color="#26D62E" label="Cordinit Media" sublabel="You are here" />
            <Orbit speed={0.35}>
              {capabilities.map((cap, i) => {
                const angle = (i / capabilities.length) * Math.PI * 2;
                const x = Math.cos(angle) * capOrbitRadius;
                const z = Math.sin(angle) * capOrbitRadius;
                return (
                  <Node
                    key={cap.slug}
                    position={[x, 0, z]}
                    size={0.16}
                    color="#a8ffaf"
                    label={cap.shortName}
                  />
                );
              })}
            </Orbit>
          </group>
        </Orbit>
      </group>
    </>
  );
}

export default function EcosystemOrbit({
  capabilities,
}: {
  capabilities: { slug: string; name: string; shortName: string }[];
}) {
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] bg-ink rounded-2xl overflow-hidden border border-lineOnInk">
      <Canvas camera={{ position: [0, 3, 9], fov: 45 }} dpr={[1, 1.5]}>
        <Scene capabilities={capabilities} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-wider text-mutedOnInk pointer-events-none">
        Drag to explore
      </div>
    </div>
  );
}
