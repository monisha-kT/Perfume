import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../../lib/scroll";
import { sampleStory, damp3, damp } from "../../lib/story";

const targetPos = new THREE.Vector3();
const targetLook = new THREE.Vector3();
const currentLook = new THREE.Vector3(0, 0.1, 0);

export default function CameraRig() {
  const fov = useRef(34);

  useFrame((state, dt) => {
    const { camera, pointer } = state;
    const { a, b, s } = sampleStory(scrollState.progress);

    targetPos.lerpVectors(a.cam, b.cam, s);
    targetLook.lerpVectors(a.look, b.look, s);

    // subtle parallax from the cursor, layered on top of the scroll pose
    targetPos.x += pointer.x * 0.35;
    targetPos.y += pointer.y * 0.16;

    damp3(camera.position, targetPos, 3.4, dt);
    damp3(currentLook, targetLook, 3.4, dt);
    camera.lookAt(currentLook);

    const targetFov = THREE.MathUtils.lerp(a.fov, b.fov, s);
    fov.current = damp(fov.current, targetFov, 3, dt);
    if (Math.abs(camera.fov - fov.current) > 0.01) {
      camera.fov = fov.current;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
