"use client";

import { useEffect, useRef } from "react";
import { CompanionMachine, type CompanionFrame, type CompanionTarget } from "@/lib/companionMachine";

type CompanionProps = {
  /** Selector for the existing Mervi stage. A visible match enables the petting sequence. */
  merviSelector?: string;
  className?: string;
};

const DEFAULT_MERVI_SELECTOR = '[aria-label="Mervi, el gato de Mercav"]';
const VINI_FACTS = [
  "Terminamos Selah.lat, una tienda judaica hecha a medida para ventas online desde Cochabamba.",
  "Desarrollo la web y la plataforma estudiantil del Colegio Boliviano Japonés.",
  "También brindo soporte IT y análisis técnicos de ciberseguridad.",
  "Trabajo a tiempo parcial como desarrollador en la DTTI de la Gobernación de Santa Cruz.",
  "Mercav.lat es una startup que construyo junto a muy buenos amigos.",
  "Realizamos pentesting autorizado y Red Team con alcance definido.",
  "Próximo objetivo: la certificación APTS de Hack The Box.",
  "En GitHub público también está Fernet, tooling de research en C++20.",
  "El futuro de Santa Cruz es grandioso.",
];

/** Persistent pixel character. Mount once in the page shell to keep its behavior across sections. */
export function Companion({ merviSelector = DEFAULT_MERVI_SELECTOR, className }: CompanionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const visibleImageRef = useRef<HTMLImageElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftLegRef = useRef<SVGGElement>(null);
  const rightLegRef = useRef<SVGGElement>(null);
  const leftArmRef = useRef<SVGGElement>(null);
  const rightArmRef = useRef<SVGGElement>(null);
  const laptopRef = useRef<SVGGElement>(null);
  const typingHandsRef = useRef<SVGGElement>(null);
  const coffeeRef = useRef<SVGGElement>(null);
  const petArmRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const art = artRef.current;
    const visibleImage = visibleImageRef.current;
    const bubble = bubbleRef.current;
    const figure = figureRef.current;
    const head = headRef.current;
    const leftLeg = leftLegRef.current;
    const rightLeg = rightLegRef.current;
    const leftArm = leftArmRef.current;
    const rightArm = rightArmRef.current;
    const laptop = laptopRef.current;
    const typingHands = typingHandsRef.current;
    const coffee = coffeeRef.current;
    const petArm = petArmRef.current;
    if (!root || !art || !visibleImage || !bubble || !figure || !head || !leftLeg || !rightLeg || !leftArm || !rightArm || !laptop || !typingHands || !coffee || !petArm) return;

    const machine = new CompanionMachine();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let previous = 0;
    let suspendedAt = 0;
    let lastTargetCheck = 0;
    let target: CompanionTarget | null = null;
    let previousMode = "";

    const draw = (frame: CompanionFrame, now: number, still = false) => {
      const walk = frame.moving && !still ? Math.sin(now * 0.018) : 0;
      const idle = !still && frame.mode === "idle" ? Math.sin(now * 0.0028) : 0;
      const typing = !still && frame.mode === "laptop" ? Math.sin(now * 0.019) : 0;
      const sipping = !still && frame.mode === "coffee" ? Math.sin(now * 0.0035) : 0;
      const petting = !still && frame.mode === "pet" ? Math.sin(now * 0.011) : 0;
      const bob = frame.moving ? Math.abs(walk) * -2 : idle * 0.45;
      const step = frame.moving && !still ? Math.abs(Math.sin(now * 0.018)) * 2 : 0;

      const viewportScale = window.innerWidth < 520 ? 0.72 : 1;
      root.style.transform = `translate3d(${frame.x.toFixed(1)}px, ${frame.y.toFixed(1)}px, 0) scale(${viewportScale})`;
      root.style.transformOrigin = "bottom right";
      const landing = frame.mode === "pet" ? Math.abs(Math.sin(now * 0.011)) * 2 : 0;
      visibleImage.style.transform = `translateY(${(bob - step - landing).toFixed(1)}px) rotate(${(walk * 1.2).toFixed(1)}deg) scale(${frame.mode === "pet" ? 1.02 : 1}, ${frame.mode === "pet" ? 1.04 : 1})`;
      bubble.style.display = "block";
      bubble.textContent = frame.mode === "pet" ? "Vini acaricia al Mervi original de Mercav ♥" : VINI_FACTS[Math.floor(now / 12000) % VINI_FACTS.length];
      if (frame.x > window.innerWidth * .55) { bubble.style.right = "54px"; bubble.style.left = "auto"; } else { bubble.style.left = "54px"; bubble.style.right = "auto"; }
      art.style.transform = `scaleX(${frame.facing})`;
      figure.setAttribute("transform", `translate(0 ${bob.toFixed(2)})`);
      head.setAttribute("transform", `translate(0 ${(idle * 0.3 + (frame.mode === "pet" ? 1.5 : 0)).toFixed(2)})`);
      leftLeg.setAttribute("transform", `translate(0 ${(walk * 2).toFixed(2)})`);
      rightLeg.setAttribute("transform", `translate(0 ${(-walk * 2).toFixed(2)})`);
      leftArm.setAttribute("transform", `translate(0 ${(frame.mode === "laptop" ? typing * 1.4 : walk * 1.2).toFixed(2)})`);
      rightArm.setAttribute("transform", `translate(0 ${(frame.mode === "coffee" ? -7 : frame.mode === "laptop" ? -typing * 1.4 : -walk * 1.2).toFixed(2)})`);
      typingHands.setAttribute("transform", `translate(${(typing * 0.8).toFixed(2)} 0)`);
      coffee.setAttribute("transform", `translate(0 ${(-1 - sipping * 1.5).toFixed(2)})`);
      petArm.setAttribute("transform", `translate(0 ${(petting * 2).toFixed(2)})`);
      laptop.style.display = frame.mode === "laptop" ? "inline" : "none";
      coffee.style.display = frame.mode === "coffee" ? "inline" : "none";
      petArm.style.display = frame.mode === "pet" ? "inline" : "none";
      if (frame.mode !== previousMode) {
        root.dataset.state = frame.mode;
        previousMode = frame.mode;
        if (frame.mode === "pet") window.dispatchEvent(new CustomEvent("mervi:pet"));
      }
    };

    const findMervi = (width: number, height: number): CompanionTarget | null => {
      let element: Element | null = null;
      try { element = document.querySelector(merviSelector); } catch { return null; }
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1 || rect.bottom < 36 || rect.top > height - 36) return null;
      const center = rect.left + rect.width / 2;
      const standRight = center < width / 2;
      return {
        x: center + (standRight ? 42 : -154),
        y: rect.top + rect.height / 2 - 70,
        face: standRight ? -1 : 1,
      };
    };

    const tick = (now: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (now - lastTargetCheck > 300) {
        target = findMervi(width, height);
        lastTargetCheck = now;
      }
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      draw(machine.advance(now, delta, width, height, target), now);
      frameId = requestAnimationFrame(tick);
    };

    const sync = () => {
      const stop = document.hidden || motion.matches;
      if (stop) {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
        if (!suspendedAt) suspendedAt = performance.now();
        if (motion.matches) draw(machine.still(window.innerWidth, window.innerHeight), 0, true);
      } else if (!frameId) {
        const now = performance.now();
        if (suspendedAt) machine.shiftTime(now - suspendedAt);
        suspendedAt = 0;
        previous = now;
        frameId = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      if (motion.matches) draw(machine.still(window.innerWidth, window.innerHeight), 0, true);
    };

    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", onResize, { passive: true });
    sync();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", onResize);
    };
  }, [merviSelector]);

  return (
    <div
      ref={rootRef}
      className={className}
      aria-hidden="true"
      data-state="idle"
      data-animation-version="continuous-v1"
      style={{ position: "fixed", top: 0, left: 0, width: 150, height: 190, zIndex: 40, pointerEvents: "none", willChange: "transform", transform: "translate3d(24px, 70vh, 0)" }}
    >
      <img
        ref={visibleImageRef}
        src="/companion/vini.png"
        alt=""
        draggable={false}
        aria-hidden="true"
        style={{ position: "absolute", left: "27px", bottom: 0, width: "96px", height: "144px", objectFit: "contain", imageRendering: "pixelated", transformOrigin: "50% 100%", willChange: "transform" }}
      />
      <div ref={bubbleRef} role="status" style={{ display: "block", position: "absolute", bottom: "148px", zIndex: 2, width: "min(230px, 62vw)", padding: "10px 12px", border: "2px solid #172238", borderRadius: "12px", background: "#f7efdc", color: "#172238", boxShadow: "4px 4px 0 #172238", font: "600 11px/1.35 var(--font-plex), monospace" }} />
      <svg ref={artRef} viewBox="0 0 64 80" width="112" height="140" shapeRendering="crispEdges" style={{ display: "none", imageRendering: "pixelated", transformOrigin: "50% 50%" }}>
        {/* One-pixel floor shadow gives the floating overlay a place in the scene. */}
        <path fill="#161c27" opacity=".22" d="M13 75h39v2H13z" />
        <g ref={figureRef}>
          <g ref={leftLegRef}>
            <path fill="#10253f" d="M18 57h13v14H18z" />
            <path fill="#285487" d="M20 58h3v11h-3z" />
            <path fill="#0d1827" d="M16 69h17v5H16z" />
            <path fill="#3b6aa2" d="M17 70h14v1H17z" />
          </g>
          <g ref={rightLegRef}>
            <path fill="#0f223b" d="M34 57h12v14H34z" />
            <path fill="#234c7e" d="M35 58h3v11h-3z" />
            <path fill="#0d1827" d="M34 69h16v5H34z" />
            <path fill="#3b6aa2" d="M35 70h13v1H35z" />
          </g>
          {/* Selected design: white shirt, navy trousers and the compact laptop. */}
          <path fill="#0c1d34" d="M16 31h31v3h4v25h-4v5H16v-5h-4V35h4z" />
          <path fill="#f4f0e7" d="M17 33h29v25H17z" />
          <path fill="#d7e1ef" d="M19 34h3v23h-3zM43 34h2v23h-2z" />
          <path fill="#9eafd0" d="M18 58h28v2H18z" />
          <path fill="#e8edf5" d="M28 35h8v23h-8z" />
          <path fill="#8ca0c5" d="M29 36h1v21h-1z" />
          <path fill="#d5b067" d="M31 53h2v2h-2z" />
          <g ref={leftArmRef}>
            <path fill="#0c1d34" d="M10 34h7v22h-7z" />
            <path fill="#e6ebf3" d="M12 35h4v18h-4z" />
            <path fill="#e2a47d" d="M11 54h5v5h-5z" />
          </g>
          <g ref={rightArmRef}>
            <path fill="#0c1d34" d="M47 34h7v22h-7z" />
            <path fill="#e6ebf3" d="M48 35h4v18h-4z" />
            <path fill="#e2a47d" d="M48 54h5v5h-5z" />
          </g>
          <g ref={headRef}>
            <path fill="#17151a" d="M20 15h4v-3h21v3h4v17h-3v5H20v-3h-4V18h4z" />
            <path fill="#5b3828" d="M20 20h5v13h-3v3h-4V23h2zM42 18h5v17h-5z" />
            <path fill="#efb58f" d="M25 20h18v12h-3v5H28v-3h-3z" />
            <path fill="#d99472" d="M40 22h5v8h-3v3h-3v-5h2v-3h-1z" />
            <path fill="#172033" d="M28 25h3v3h-3zM38 25h3v3h-3z" />
            <path fill="#f8d2ae" d="M29 25h1v1h-1zM39 25h1v1h-1z" />
            <path fill="#a86150" d="M32 31h5v2h-5zM34 33h3v1h-3z" />
            {/* Fitted dome and gold rim: visually distinct from both hair and brimmed hats. */}
            <path fill="#08182a" d="M25 14v-3h3V9h13v2h3v3z" />
            <path fill="#24558b" d="M28 11h13v4H28z" />
            <path fill="#6ca0d2" d="M30 11h8v1h-8z" />
            <path fill="#dfb649" d="M25 14h19v2H25z" />
            <path fill="#f8d875" d="M29 14h10v1H29z" />
          </g>
          {/* Props are part of the same sprite so poses share its exact pixel grid. */}
          <g ref={laptopRef} style={{ display: "none" }}>
            <path fill="#0a1829" d="M10 49h43v2h2v18H9V51h1z" />
            <path fill="#aeb8c9" d="M12 51h40v15H12z" />
            <path fill="#29364e" d="M14 53h36v11H14z" />
            <path fill="#b9d5ef" d="M18 56h8v1h-8zM18 59h15v1H18z" />
            <path fill="#e4b74f" d="M35 59h9v1h-9zM26 62h7v1h-7z" />
            <path fill="#0a1829" d="M7 69h50v3H7z" />
            <path fill="#6b8fb0" d="M9 69h46v1H9z" />
            <g ref={typingHandsRef}>
              <path fill="#e4a782" d="M15 66h7v3h-7zM41 66h7v3h-7z" />
              <path fill="#f3c09a" d="M16 66h4v1h-4zM43 66h4v1h-4z" />
            </g>
          </g>
          <g ref={coffeeRef} style={{ display: "none" }}>
            <path fill="#e5ae86" d="M49 46h5v5h-5z" />
            <path fill="#0c1d34" d="M48 40h12v12H48z" />
            <path fill="#f3eee2" d="M49 41h10v9H49z" />
            <path fill="#aa753c" d="M50 42h8v2h-8z" />
            <path fill="#f3eee2" d="M59 43h3v5h-3v-2h1v-1h-1z" />
            <path fill="#b9d5d9" d="M51 37h1v2h-1zM55 36h1v3h-1z" />
          </g>
          <g ref={petArmRef} style={{ display: "none" }}>
            <path fill="#0b1f39" d="M48 39h7v4h5v4h4v5h-6v-3h-6v-3h-4z" />
            <path fill="#356ca7" d="M49 40h5v3h5v3h3v2h-6v-3h-6z" />
            <path fill="#e8b18c" d="M59 48h5v5h-5z" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Companion;
