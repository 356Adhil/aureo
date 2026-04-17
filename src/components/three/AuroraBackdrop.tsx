"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useQuality, useReducedMotion } from "@/lib/device";

// GLSL: slow flow-field of gold + iridescent glow, mouse-reactive.
const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;      // 0..1
  uniform vec2 uRes;
  uniform float uActive;    // 0..1 (pause scaling)

  // simplex-ish cheap noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v=0.0; float a=0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.04 * uActive;
    vec2 m = (uMouse - 0.5);
    m.x *= uRes.x / uRes.y;

    // flow field
    float n = fbm(p * 1.6 + vec2(t, -t*0.7));
    float n2 = fbm(p * 2.4 - vec2(t*0.5, t) + n);

    // distance-to-cursor glow
    float d = length(p - m*0.4);
    float mouseGlow = smoothstep(0.9, 0.0, d) * 0.55;

    // ink palette
    vec3 base1 = vec3(0.95, 0.95, 0.94);   // #f2f2ef
    vec3 base2 = vec3(0.30, 0.30, 0.30);   // graphite
    vec3 tintA = vec3(0.82, 0.82, 0.82);   // silver
    vec3 tintB = vec3(0.55, 0.55, 0.55);   // ash

    float soft = smoothstep(0.25, 0.9, n);
    vec3 col = mix(base2 * 0.18, base1 * 0.55, soft);
    col += tintA * 0.08 * smoothstep(0.5, 1.0, n2);
    col += tintB * 0.06 * smoothstep(0.6, 1.0, 1.0 - n2);

    // radial vignette — keep edges pure black
    float vig = smoothstep(1.05, 0.15, length(p));
    col *= vig;

    // mouse hot-spot
    col += vec3(1.0, 1.0, 1.0) * mouseGlow * 0.22;

    // OLED floor
    col = max(col, vec3(0.0));

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane({ active }: { active: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const target = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uActive: { value: active },
    }),
    [active]
  );

  useFrame((state, dt) => {
    if (!mat.current) return;
    mouse.current.lerp(target.current, Math.min(1, dt * 3));
    const u = mat.current.uniforms;
    u.uTime.value += dt;
    u.uMouse.value.copy(mouse.current);
    u.uRes.value.set(state.size.width, state.size.height);
    u.uActive.value = active;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

export function AuroraBackdrop() {
  const quality = useQuality();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (quality === "low") {
    // CSS fallback
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(242,242,239,0.16), transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(200,169,255,0.08), transparent 70%), #000",
        }}
      />
    );
  }

  const active = reduce || !visible ? 0 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={quality === "high" ? [1, 1.25] : [1, 1]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        frameloop={active ? "always" : "never"}
      >
        <Plane active={active} />
      </Canvas>
    </div>
  );
}

export default AuroraBackdrop;
