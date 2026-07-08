import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../../lib/scroll";
import { sampleStory } from "../../lib/story";

const COUNT = 1400;

const VERTEX = /* glsl */ `
  uniform float uTime;
  attribute float aScale;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.18 + aSeed * 6.2831) * 0.55;
    pos.x += cos(uTime * 0.12 + aSeed * 6.2831) * 0.35;
    pos.z += sin(uTime * 0.1 + aSeed * 4.0) * 0.35;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = min(aScale * (70.0 / -mvPosition.z), 42.0);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = 0.12 + 0.28 * (0.5 + 0.5 * sin(uTime * (0.5 + aSeed) + aSeed * 10.0));
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function Particles() {
  const pointsRef = useRef(null);
  const colorRef = useMemo(() => new THREE.Color("#e8c98a"), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const seeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const radius = 3.8 + Math.random() * 4.6;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(theta) * radius - 1.5;
      scales[i] = Math.random() * 2.6 + 0.8;
      seeds[i] = Math.random();
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: colorRef },
    }),
    [colorRef]
  );

  useFrame((state, dt) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    const { a, b, s } = sampleStory(scrollState.progress);
    const target = a.particle.clone().lerp(b.particle, s);
    colorRef.lerp(target, Math.min(1, dt * 2.4));

    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * 0.015;
    }
  });

  return (
    <points geometry={geometry} ref={pointsRef}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
      />
    </points>
  );
}
