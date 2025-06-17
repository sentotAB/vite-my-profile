import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import * as THREE from "three";

import cardGLB from "../assets/images/Lanyard/card.glb";
import lanyardImg from "../assets/images/Lanyard/lanyard.png";

// const texture = useTexture(lanyardImg);
// import Lanyard from "../components/LanyardWrapper";

export default function Band() {
  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  const texture = useTexture(lanyardImg);
  const { scene: cardScene } = useGLTF(cardGLB);

  const curve = useRef(new THREE.CatmullRomCurve3(
    new Array(20).fill().map(() => new THREE.Vector3())
  ));

  useFrame(() => {
    const points = [fixed, j1, j2, j3].map((ref) => ref.current.translation());
    curve.current.points.forEach((p, i) => {
      p.lerp(points[Math.floor(i / 5)], 0.5);
    });
  });

  const points = [fixed, j1, j2, j3]
  .map(ref => ref.current?.translation?.())
  .filter(Boolean); // removes undefined/null
  

  return (
    <>
      <RigidBody type="fixed" ref={fixed} position={[0, 5, 0]} />
      <RigidBody ref={j1} />
      <RigidBody ref={j2} />
      <RigidBody ref={j3} />
      <RigidBody ref={card} colliders={false}>
        <primitive object={cardScene.clone(true)} scale={1.5} />
      </RigidBody>

      <mesh>
        <meshLineGeometry attach="geometry" points={curve.current.getPoints(100)} />
        <meshLineMaterial
          attach="material"
          lineWidth={0.6}
          map={texture}
          transparent
          depthTest={false}
          alphaTest={0.5}
        />
      </mesh>
    </>
  );
}
