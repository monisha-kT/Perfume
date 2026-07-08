import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../../lib/scroll";
import { sampleStory, damp } from "../../lib/story";

const GLASS_PROFILE = [
  [0.0, -1.55],
  [0.5, -1.5],
  [0.6, -1.32],
  [0.58, -0.4],
  [0.48, 0.28],
  [0.4, 0.54],
  [0.21, 0.68],
  [0.19, 0.98],
  [0.19, 1.02],
].map(([x, y]) => new THREE.Vector2(x, y));

const LIQUID_PROFILE = [
  [0.0, -1.46],
  [0.44, -1.42],
  [0.53, -1.26],
  [0.52, -0.4],
  [0.43, 0.14],
  [0.36, 0.3],
  [0.0, 0.32],
].map(([x, y]) => new THREE.Vector2(x, y));

export default function Bottle() {
  const group = useRef(null);
  const capGroup = useRef(null);
  const liquidMat = useRef(null);
  const rotY = useRef(-0.4);

  const glassGeo = useMemo(() => new THREE.LatheGeometry(GLASS_PROFILE, 72), []);
  const liquidGeo = useMemo(() => new THREE.LatheGeometry(LIQUID_PROFILE, 72), []);

  const liquidColor = useMemo(() => new THREE.Color("#e8c98a"), []);

  useFrame((state, dt) => {
    const { a, b, s } = sampleStory(scrollState.progress);
    const targetRotY = THREE.MathUtils.lerp(a.rotY, b.rotY, s);
    rotY.current = damp(rotY.current, targetRotY, 4, dt);

    const targetCap = THREE.MathUtils.lerp(a.cap, b.cap, s);

    const t = state.clock.elapsedTime;
    const bob = Math.sin(t * 0.55) * 0.035;
    const tiltX = state.pointer.y * 0.05;
    const tiltZ = -state.pointer.x * 0.06;

    if (group.current) {
      group.current.rotation.y = rotY.current;
      group.current.position.y = bob;
      group.current.rotation.x = damp(group.current.rotation.x, tiltX, 3, dt);
      group.current.rotation.z = damp(group.current.rotation.z, tiltZ, 3, dt);
    }

    if (capGroup.current) {
      const lift = damp(capGroup.current.userData.lift ?? 0, targetCap, 3.2, dt);
      capGroup.current.userData.lift = lift;
      capGroup.current.position.y = 0.98 + lift * 0.85;
      capGroup.current.rotation.y = lift * Math.PI * 1.4;
    }

    const targetLiquid = a.liquid.clone().lerp(b.liquid, s);
    liquidColor.lerp(targetLiquid, Math.min(1, dt * 3));
    if (liquidMat.current) {
      liquidMat.current.color.copy(liquidColor);
      liquidMat.current.emissive.copy(liquidColor).multiplyScalar(0.22);
    }
  });

  return (
    <group>
      <group ref={group}>
        {/* liquid */}
        <mesh geometry={liquidGeo} scale={0.94}>
          <meshPhysicalMaterial
            ref={liquidMat}
            color="#e8c98a"
            transmission={0.55}
            roughness={0.18}
            thickness={0.6}
            ior={1.33}
            clearcoat={0.4}
            emissiveIntensity={1}
          />
        </mesh>

        {/* glass shell */}
        <mesh geometry={glassGeo}>
          <MeshTransmissionMaterial
            thickness={0.55}
            roughness={0.05}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.01}
            anisotropy={0.1}
            distortion={0.015}
            distortionScale={0.1}
            temporalDistortion={0.01}
            backside
            samples={6}
            resolution={512}
            envMapIntensity={1.6}
            color="#fbf3e6"
          />
        </mesh>

        {/* neck collar */}
        <mesh position={[0, 0.68, 0]}>
          <torusGeometry args={[0.205, 0.03, 16, 48]} />
          <meshStandardMaterial color="#cba360" metalness={1} roughness={0.25} />
        </mesh>

        {/* cap */}
        <group ref={capGroup} position={[0, 0.98, 0]}>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.24, 0.22, 0.34, 48]} />
            <meshStandardMaterial color="#cba360" metalness={1} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.36, 0]}>
            <cylinderGeometry args={[0.17, 0.24, 0.16, 48]} />
            <meshStandardMaterial color="#e8c98a" metalness={1} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial color="#f4e4bd" metalness={1} roughness={0.15} />
          </mesh>
        </group>
      </group>

      <ContactShadows
        position={[0, -1.62, 0]}
        opacity={0.55}
        scale={8}
        blur={2.8}
        far={2}
        color="#000000"
      />
    </group>
  );
}
