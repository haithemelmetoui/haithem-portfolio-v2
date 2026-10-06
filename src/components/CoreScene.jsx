import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// A banking "core" with the systems Haithem actually integrates orbiting it.
// Packets travel along the links to suggest requests and messages moving through a microservices mesh.
const NODES = [
  { label: "Spring Boot", color: "#3DF5E0" },
  { label: "Keycloak", color: "#8B7CFF" },
  { label: "Backbase", color: "#3DF5E0" },
  { label: "T24", color: "#FF4FA3" },
  { label: "ActiveMQ", color: "#8B7CFF" },
  { label: "Kubernetes", color: "#3DF5E0" },
  { label: "PostgreSQL", color: "#FF4FA3" },
];

function makeLabelTexture(text, color) {
  const canvas = document.createElement("canvas");
  const w = 512;
  const h = 128;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.font = "600 52px 'Chakra Petch', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#E7ECFF";
  ctx.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Core() {
  const shell = useRef();
  const inner = useRef();
  useFrame((_, dt) => {
    shell.current.rotation.y += dt * 0.18;
    shell.current.rotation.x += dt * 0.07;
    inner.current.rotation.y -= dt * 0.3;
  });
  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#3DF5E0" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial color="#FF4FA3" wireframe transparent opacity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshBasicMaterial color="#8B7CFF" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function ServiceNode({ node, position, hovered, onHover }) {
  const tex = useMemo(() => makeLabelTexture(node.label, node.color), [node]);
  const ref = useRef();
  useFrame((state) => {
    const s = hovered ? 1.6 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
    ref.current.rotation.y = state.clock.elapsedTime * 0.8;
  });
  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.label);
        }}
        onPointerOut={() => onHover(null)}
      >
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshBasicMaterial color={node.color} wireframe />
      </mesh>
      <sprite position={[0, 0.4, 0]} scale={[1.25, 0.31, 1]}>
        <spriteMaterial map={tex} transparent depthWrite={false} opacity={hovered ? 1 : 0.75} />
      </sprite>
    </group>
  );
}

function Packets({ positions, count }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        link: i % positions.length,
        offset: Math.random(),
        speed: 0.18 + Math.random() * 0.25,
        inbound: Math.random() > 0.5,
      })),
    [count, positions.length]
  );
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c = new THREE.Color();
    seeds.forEach((s, i) => {
      c.set(s.inbound ? "#3DF5E0" : "#FF4FA3");
      c.toArray(arr, i * 3);
    });
    return arr;
  }, [seeds, count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      let p = (s.offset + t * s.speed) % 1;
      if (s.inbound) p = 1 - p;
      const target = positions[s.link];
      dummy.position.set(target[0] * p, target[1] * p, target[2] * p);
      dummy.scale.setScalar(0.6 + Math.sin(p * Math.PI) * 0.6);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.035, 8, 8]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

function Links({ positions }) {
  const geometry = useMemo(() => {
    const pts = [];
    positions.forEach((p) => {
      pts.push(0, 0, 0, p[0], p[1], p[2]);
    });
    // ring between neighbouring services: the "mesh" in microservices mesh
    positions.forEach((p, i) => {
      const n = positions[(i + 1) % positions.length];
      pts.push(p[0], p[1], p[2], n[0], n[1], n[2]);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [positions]);
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#5B6BB8" transparent opacity={0.35} />
    </lineSegments>
  );
}

function Dust({ count }) {
  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = (r * Math.cos(ph)) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    return g;
  }, [count]);
  const ref = useRef();
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#9AA8FF" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Floor() {
  return (
    <gridHelper args={[40, 40, "#3DF5E0", "#1E2A55"]} position={[0, -2.6, 0]}>
      <lineBasicMaterial attach="material" color="#26346A" transparent opacity={0.35} />
    </gridHelper>
  );
}

function Rig({ children }) {
  const group = useRef();
  const { pointer, size } = useThree();
  // Keep the whole orbit (radius ~3.9 incl. labels) in frame whatever the canvas aspect ratio.
  const aspect = size.width / Math.max(size.height, 1);
  const fitZ = Math.max(7.6, 3.9 / (Math.tan(THREE.MathUtils.degToRad(22.5)) * aspect));
  useFrame((state, dt) => {
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, fitZ, 0.08);
    // mouse parallax + slow orbit
    group.current.rotation.y += dt * 0.06;
    const tx = pointer.y * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, tx, 0.05);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.8, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return <group ref={group}>{children}</group>;
}

export default function CoreScene({ lite = false, active = true }) {
  const [hovered, setHovered] = useState(null);
  const positions = useMemo(
    () =>
      NODES.map((_, i) => {
        const a = (i / NODES.length) * Math.PI * 2;
        const r = 3.1;
        return [Math.cos(a) * r, Math.sin(i * 1.7) * 0.9, Math.sin(a) * r];
      }),
    []
  );

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 1.4, 8.2], fov: 45 }}
      gl={{ antialias: !lite, powerPreference: "high-performance", alpha: true }}
      style={{ cursor: hovered ? "pointer" : "default" }}
      aria-hidden="true"
    >
      <fog attach="fog" args={["#070B18", 7, 22]} />
      <Rig>
        <Core />
        <Links positions={positions} />
        <Packets positions={positions} count={lite ? 18 : 42} />
        {NODES.map((n, i) => (
          <ServiceNode key={n.label} node={n} position={positions[i]} hovered={hovered === n.label} onHover={setHovered} />
        ))}
      </Rig>
      <Dust count={lite ? 160 : 520} />
      <Floor />
    </Canvas>
  );
}
