import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data.js";
import { Icon } from "./Icons.jsx";

const CoreScene = lazy(() => import("./CoreScene.jsx"));

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

function useSceneMode() {
  const [mode, setMode] = useState("pending");
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !canUseWebGL()) return setMode("static");
    const small = window.matchMedia("(max-width: 820px)").matches;
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    setMode(small || weak ? "lite" : "full");
  }, []);
  return mode;
}

// Static picture of the same network, for reduced-motion users and devices without WebGL.
function StaticCore() {
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return [300 + Math.cos(a) * 190, 260 + Math.sin(a) * 150];
  });
  return (
    <svg className="hero-static" viewBox="0 0 600 520" aria-hidden="true">
      {nodes.map(([x, y], i) => (
        <line key={`l${i}`} x1="300" y1="260" x2={x} y2={y} stroke="#5B6BB8" strokeOpacity=".5" />
      ))}
      <polygon points="300,170 378,215 378,305 300,350 222,305 222,215" fill="none" stroke="#3DF5E0" strokeOpacity=".7" />
      <polygon points="300,215 339,260 300,305 261,260" fill="none" stroke="#FF4FA3" />
      {nodes.map(([x, y], i) => (
        <rect key={`n${i}`} x={x - 7} y={y - 7} width="14" height="14" fill="none" stroke={i % 2 ? "#8B7CFF" : "#3DF5E0"} />
      ))}
    </svg>
  );
}

export default function Hero() {
  const mode = useSceneMode();
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  // Pause the render loop when the hero is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.02 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const boot = {
    hidden: { opacity: 0, y: 14 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }),
  };

  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-scene">
        {mode === "static" && <StaticCore />}
        {(mode === "full" || mode === "lite") && (
          <Suspense fallback={<StaticCore />}>
            <CoreScene lite={mode === "lite"} active={visible} />
          </Suspense>
        )}
      </div>

      <div className="hero-content">
        <motion.p className="hero-prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <span className="prompt-sign">$</span> whoami
          <span className="caret" aria-hidden="true" />
        </motion.p>

        <motion.h1 custom={0} variants={boot} initial="hidden" animate="show" className="hero-name">
          Haithem El&#8209;Metoui
        </motion.h1>
        <motion.p custom={1} variants={boot} initial="hidden" animate="show" className="hero-role">
          {profile.role}
        </motion.p>
        <motion.p custom={2} variants={boot} initial="hidden" animate="show" className="hero-headline">
          {profile.headline} {profile.intro}
        </motion.p>

        <motion.ul custom={3} variants={boot} initial="hidden" animate="show" className="hero-focus" aria-label="Core expertise">
          {profile.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </motion.ul>

        <motion.div custom={4} variants={boot} initial="hidden" animate="show" className="hero-actions">
          <a className="btn btn-primary" href="#experience">View experience</a>
          <a className="btn" href="#projects">View projects</a>
          <a className="btn" href={profile.cv.en} download>
            <Icon name="download" /> Download CV
          </a>
          <a className="btn" href="#contact">Contact me</a>
        </motion.div>

        <motion.div custom={5} variants={boot} initial="hidden" animate="show" className="hero-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Icon name="linkedin" /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Icon name="github" /> GitHub
          </a>
          <span className="hero-loc">
            <Icon name="pin" /> {profile.location}
          </span>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to About">
        <span />
      </a>
    </header>
  );
}
