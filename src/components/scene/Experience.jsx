import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { Suspense } from "react";
import * as THREE from "three";
import Bottle from "./Bottle";
import Particles from "./Particles";
import CameraRig from "./CameraRig";

export default function Experience() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 34, near: 0.1, far: 40, position: [0, 0.5, 7.6] }}
    >
      <color attach="background" args={["#07070a"]} />
      <fog attach="fog" args={["#07070a", 6, 15]} />

      <ambientLight intensity={0.34} color="#3a3050" />
      <spotLight position={[3.2, 5, 4]} angle={0.4} penumbra={0.7} intensity={1.7} color="#f2d9a8" />
      <pointLight position={[-3, 1, -3]} intensity={0.9} color="#a8563f" />
      <pointLight position={[2.5, -1.2, 3]} intensity={0.35} color="#4a5a9a" />

      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={1.9} color="#e8c98a" position={[0, 5, -3]} scale={14} form="ring" />
          <Lightformer intensity={0.7} color="#8a6a4a" position={[-5, -1, 4]} scale={16} form="rect" />
          <Lightformer intensity={0.3} color="#3a4560" position={[5, 2, -2]} scale={12} form="rect" />
        </Environment>

        <Bottle />
        <Particles />
      </Suspense>

      <CameraRig />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.82} luminanceSmoothing={0.25} intensity={0.4} mipmapBlur radius={0.4} />
        <ChromaticAberration offset={new THREE.Vector2(0.0003, 0.0003)} />
        <Vignette eskil={false} offset={0.28} darkness={0.92} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  );
}
