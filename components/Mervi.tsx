"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string; size?: number; interactive?: boolean };
type Pose = "normal" | "pensativo" | "saludando" | "sorprendido" | "programador";
const poses: Record<Pose, { frames: number; speed: number }> = {
  normal: { frames: 1, speed: 620 }, pensativo: { frames: 1, speed: 620 }, saludando: { frames: 1, speed: 320 }, sorprendido: { frames: 1, speed: 220 }, programador: { frames: 1, speed: 550 },
};

/** Original Mervi sprite character. Uses the authored Mercav sprite strips and keeps their pixel art intact. */
export function Mervi({ className, size = 96, interactive = true }: Props) {
  const stageRef = useRef<HTMLSpanElement>(null); const spriteRef = useRef<HTMLSpanElement>(null); const heartRef = useRef<HTMLSpanElement>(null);
  const stage = Math.max(72, size); const sprite = Math.min(144, Math.round(stage * .64)); const max = stage - sprite;
  useEffect(() => {
    const host = stageRef.current; const art = spriteRef.current; const heart = heartRef.current; if (!host || !art || !heart) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)"); const pointer = { x: 0, y: 0, active: false };
    const s = { x: max / 2, y: max * .63, tx: max / 2, ty: max * .63, face: 1, pose: "normal" as Pose, mode: "idle", poseAt: 0, modeAt: 0, idleUntil: 0, nextPlay: 0 };
    let raf = 0; let last = 0;
    const setPose = (pose: Pose, now: number) => { if (s.pose === pose) return; s.pose = pose; s.poseAt = now; art.style.backgroundImage = `url(/mervi/${pose}.png)`; art.style.backgroundSize = "100% 100%"; };
    const setMode = (mode: string, now: number) => { if (s.mode === mode) return; s.mode = mode; s.modeAt = now; setPose(mode === "look" ? "pensativo" : mode === "jump" ? "sorprendido" : mode === "work" ? "programador" : mode === "wave" ? "saludando" : "normal", now); };
    const draw = (now: number, still = false) => { const breathe = !still && s.mode === "idle" ? Math.sin(now * .003) * 1.2 : 0; const walk = !still && (s.mode === "walk" || s.mode === "follow") ? Math.abs(Math.sin(now * .013)) * -3 : 0; const jump = !still && s.mode === "jump" ? Math.sin(Math.min(1, (now - s.modeAt) / 720) * Math.PI) * -18 : 0; art.style.backgroundPosition = "0 0"; art.style.transform = `translate3d(${s.x.toFixed(1)}px, ${(s.y + breathe + walk + jump).toFixed(1)}px, 0) scaleX(${s.face})`; };
    const tick = (now: number) => { const dt = Math.min(.05, (now - last) / 1000); last = now; const near = interactive && pointer.active && pointer.x > -sprite && pointer.x < stage + sprite && pointer.y > -sprite && pointer.y < stage + sprite;
      if (s.mode === "jump" && now - s.modeAt > 720) { s.nextPlay = now + 3600; setMode("work", now); } else if (s.mode === "work" && now - s.modeAt > 2800) { s.nextPlay = now + 1800; setMode("idle", now); }
      if (s.mode !== "jump" && s.mode !== "work") { if (near) { s.tx = Math.max(0, Math.min(max, pointer.x - sprite / 2)); s.ty = Math.max(0, Math.min(max, pointer.y - sprite / 2)); const d = Math.hypot(s.tx - s.x, s.ty - s.y); s.face = pointer.x >= s.x + sprite / 2 ? 1 : -1; if (d > 12) setMode("follow", now); else if (now >= s.nextPlay) setMode("jump", now); else setMode("look", now); } else if (s.mode === "follow" || s.mode === "look") { s.idleUntil = now + 700; setMode("idle", now); } else if (s.mode === "idle" && now >= s.idleUntil) { s.tx = Math.random() * max; s.ty = max * (.48 + Math.random() * .42); s.face = s.tx >= s.x ? 1 : -1; setMode("walk", now); } }
      if (s.mode === "walk" || s.mode === "follow") { const dx = s.tx - s.x; const dy = s.ty - s.y; const d = Math.hypot(dx, dy); const speed = s.mode === "follow" ? 104 : 48; const step = Math.min(speed, d * 5); s.x = Math.max(0, Math.min(max, s.x + (d ? dx / d * step : 0) * dt)); s.y = Math.max(0, Math.min(max, s.y + (d ? dy / d * step : 0) * dt)); if (d < 3) { s.idleUntil = now + 1200 + Math.random() * 1800; setMode("idle", now); } }
      draw(now); raf = requestAnimationFrame(tick); };
    const sync = () => { if (reduce.matches || document.hidden) { cancelAnimationFrame(raf); raf = 0; draw(performance.now(), true); } else if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const move = (e: PointerEvent) => { if (e.pointerType === "touch") return; const r = host.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true; }; const leave = () => { pointer.active = false; };
    const observer = new IntersectionObserver(([e]) => e.isIntersecting ? sync() : cancelAnimationFrame(raf)); observer.observe(host); const pet = () => heart.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 1000 });
    reduce.addEventListener("change", sync); document.addEventListener("visibilitychange", sync); window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("blur", leave); window.addEventListener("mervi:pet", pet); sync();
    return () => { cancelAnimationFrame(raf); observer.disconnect(); reduce.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); window.removeEventListener("pointermove", move); window.removeEventListener("blur", leave); window.removeEventListener("mervi:pet", pet); };
  }, [interactive, max, sprite, stage]);
  return <span ref={stageRef} className={cn("inline-block", className)} role="img" aria-label="Mervi, el gato de Mercav" style={{ position: "relative", width: stage, height: stage, overflow: "hidden", verticalAlign: "middle" }}><span ref={spriteRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: sprite, height: sprite, backgroundImage: "url(/mervi/normal.png)", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", imageRendering: "pixelated", pointerEvents: "none", willChange: "transform" } as CSSProperties} /><span ref={heartRef} aria-hidden="true" style={{ position: "absolute", left: "58%", top: "12%", opacity: 0, color: "#d96a7a", fontSize: Math.max(18, stage * .16), lineHeight: 1, pointerEvents: "none" }}>♥</span></span>;
}

export default Mervi;
