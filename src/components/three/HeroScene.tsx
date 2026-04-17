"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useQuality, useReducedMotion } from "@/lib/device";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPointer;
  uniform vec2  uMouse;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDisp;

  vec3 mod289v3(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289v4(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289v4(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0,1.0/3.0);
    const vec4 D = vec4(0.0,0.5,1.0,2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289v3(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 p = position;
    float t = uTime * 0.12;
    float n = snoise(p * 0.8 + vec3(t * 0.5, t * 0.4, -t * 0.3));
    float disp = n * (0.08 + uScroll * 0.04);
    vec3 pointerDir = normalize(vec3(uMouse, 0.8));
    float pointerPull = max(0.0, dot(normalize(p), pointerDir));
    disp += pow(pointerPull, 6.0) * 0.04 * uPointer;
    vec3 displaced = p + normal * disp;
    vDisp = disp;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDisp;
  void main() {
    vec3 viewDir = normalize(-vPos);
    float fres = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.2);
    vec3 base = mix(uColorB, uColorA, smoothstep(-0.1, 0.1, vDisp));
    vec3 rim = uColorA * fres * 0.45;
    vec3 lightDir = normalize(vec3(0.4, 0.8, 0.7));
    float lambert = max(dot(vNormal, lightDir), 0.0);
    vec3 col = base * (0.25 + 0.55 * lambert) + rim;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Orb({ scroll, pointer, mouse, detail }: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<THREE.Vector2>;
  detail: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uPointer: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color("#f2f2ef") },
    uColorB: { value: new THREE.Color("#1a1a1a") },
  }), []);
  useFrame((state, dt) => {
    if (!mesh.current || !mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uScroll.value += (scroll.current - u.uScroll.value) * Math.min(1, dt * 4);
    u.uPointer.value += (pointer.current - u.uPointer.value) * Math.min(1, dt * 3);
    u.uMouse.value.lerp(mouse.current, Math.min(1, dt * 3));
    mesh.current.rotation.y += dt * 0.04;
    mesh.current.rotation.x = mouse.current.y * 0.08;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, detail]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
}

export function HeroScene() {
  const quality = useQuality();
  const reduce = useReducedMotion();
  const scroll = useRef(0);
  const pointer = useRef(0);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
      pointer.current = 1;
    };
    const onLeave = () => { pointer.current = 0; };
    const onScroll = () => { scroll.current = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 1.2))); };
    const onVis = () => setVisible(document.visibilityState === "visible");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (reduce) {
    return <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(242,242,239,0.28) 0%, rgba(0,0,0,0) 55%)" }} />;
  }

  const detail = quality === "high" ? 48 : quality === "medium" ? 32 : 20;
  const dpr: [number, number] = quality === "high" ? [1, 1.5] : quality === "medium" ? [1, 1.25] : [1, 1];

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={visible ? "always" : "never"}
    >
      <color attach="background" args={["#000000"]} />
      <Orb scroll={scroll} pointer={pointer} mouse={mouse} detail={detail} />
    </Canvas>
  );
}

export default HeroScene;
