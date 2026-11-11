"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "askforvini:mervi-splash:v9";
const INTRO_MS = 1000;
const FACTS = [
  "Terminamos el desarrollo completo de Selah.lat, una tienda judaica hecha a medida para ventas online desde Cochabamba.",
  "Actualmente desarrollo para el Colegio Boliviano Japonés: página web, plataforma estudiantil y soporte IT.",
  "También hago análisis técnicos de ciberseguridad para ayudar a proteger sus sistemas.",
  "Trabajo a tiempo parcial como desarrollador en la DTTI de la Gobernación de Santa Cruz.",
  "Mercav.lat es una startup que construyo junto a muy buenos amigos.",
  "Hacemos pentesting autorizado y Red Team dentro de alcances definidos.",
  "Próximamente: certificación APTS de Hack The Box.",
  "El futuro de Santa Cruz es grandioso.",
];

let completedInMemory = false;

export function MerviSplashScreen({ locale = "es" }: { locale?: string }) {
  const [visible, setVisible] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [fact, setFact] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<number | null>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const english = locale.toLowerCase().startsWith("en");

  const finish = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    completedInMemory = true;
    try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* storage may be disabled */ }
    setVisible(false);
  }, []);

  useEffect(() => {
    let cancelled = false; let alreadyShown = completedInMemory;
    try { alreadyShown ||= window.sessionStorage.getItem(SESSION_KEY) === "1"; } catch { /* ignore */ }
    if (alreadyShown) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    queueMicrotask(() => { if (cancelled) return; setReducedMotion(reduce); setVisible(true); timerRef.current = window.setTimeout(finish, reduce ? 400 : INTRO_MS); });
    return () => { cancelled = true; if (timerRef.current !== null) window.clearTimeout(timerRef.current); };
  }, [finish]);

  useEffect(() => { if (!visible || reducedMotion) return; const started = performance.now(); const id = window.setInterval(() => setElapsed(performance.now() - started), 50); return () => window.clearInterval(id); }, [visible, reducedMotion]);
  useEffect(() => { if (!visible || reducedMotion) return; const id = window.setInterval(() => setFact((value) => (value + 1) % FACTS.length), 1900); return () => window.clearInterval(id); }, [visible, reducedMotion]);
  useEffect(() => { if (visible) skipRef.current?.focus({ preventScroll: true }); }, [visible]);
  if (!visible) return null;

  const seconds = elapsed / 1000;
  const phase = seconds < 1.2 ? "intro" : seconds < 4.4 ? "approach" : seconds < 6.7 ? "pet" : seconds < 8.6 ? "react" : "exit";
  const message = english ? "Welcome. Meet Mervi and Vini." : phase === "intro" ? "Mervi tiene algo que presentarte…" : phase === "approach" ? "Vini se acerca a saludar a Mervi." : phase === "pet" ? "Vini está acariciando a Mervi ♥" : phase === "react" ? "¡Miau! La tecnología también se construye con cariño." : FACTS[fact];

  return <div className={`mervi-splash mervi-splash--${phase}${reducedMotion ? " mervi-splash--reduced" : ""}`} role="dialog" aria-modal="true" aria-label={english ? "Welcome to askforvini" : "Bienvenido a askforvini"} onKeyDown={(event) => { if (event.key === "Escape") finish(); if (event.key === "Tab") { event.preventDefault(); skipRef.current?.focus(); } }}>
    <button className="mervi-splash__skip" type="button" ref={skipRef} onClick={finish}>{english ? "Skip intro" : "Saltar intro"}</button>
    <div className="mervi-splash__scene">
      <div className="mervi-splash__bubble" role="status" key={message}>{message}</div>
      <div className="mervi-splash__characters">
        <div className="mervi-splash__mervi" aria-label="Mervi, el gato de Mercav" />
        <div className="mervi-splash__vini" aria-label="Vini, compañero pixel-art" />
        <span className="mervi-splash__pet-hand" aria-hidden="true" />
        <span className="mervi-splash__spark" aria-hidden="true">✦</span>
      </div>
      <div className="mervi-splash__name">askforvini</div>
      <div className="mervi-splash__caption">Mervi · Mercav&nbsp;&nbsp;×&nbsp;&nbsp; Vini · askforvini</div>
    </div>
    <style>{`
      .mervi-splash { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; min-height:100dvh; padding:1.5rem; overflow:hidden; background:radial-gradient(circle at 50% 35%,#314969 0,var(--surface,#12110e) 58%); color:var(--content,#f3ede2); isolation:isolate; animation:splashIn .35s ease-out both; }
      .mervi-splash__skip { position:absolute; top:max(1.25rem,env(safe-area-inset-top)); right:max(1.25rem,env(safe-area-inset-right)); min-height:44px; padding:.5rem .9rem; border:1px solid rgb(243 237 226 / .3); border-radius:999px; background:transparent; color:inherit; font:500 .75rem/1.2 var(--font-plex),monospace; cursor:pointer; }
      .mervi-splash__scene { display:flex; flex-direction:column; align-items:center; width:min(760px,100%); text-align:center; }
      .mervi-splash__bubble { max-width:min(590px,92vw); min-height:3.8rem; padding:.85rem 1.1rem; border:2px solid #172238; border-radius:14px; background:#f7efdc; box-shadow:5px 5px 0 #172238; color:#172238; font:600 clamp(.72rem,1.7vw,.92rem)/1.35 var(--font-plex),monospace; animation:bubbleIn .28s steps(3,end) both; }
      .mervi-splash__characters { position:relative; width:min(680px,100%); height:clamp(230px,43vw,350px); margin-top:1.25rem; }
      .mervi-splash__mervi { position:absolute; left:18%; bottom:0; width:clamp(120px,22vw,190px); height:clamp(120px,22vw,190px); background:url('/mervi/saludando.png') center/contain no-repeat; image-rendering:pixelated; transition:filter .2s; animation:merviIdle 1.35s steps(2,end) infinite; }
      .mervi-splash--pet .mervi-splash__mervi, .mervi-splash--react .mervi-splash__mervi { animation:merviHappy .32s steps(2,end) infinite; filter:drop-shadow(0 0 12px rgb(244 216 117 / .55)); }
      .mervi-splash__vini { position:absolute; left:76%; bottom:0; width:clamp(120px,20vw,200px); height:clamp(180px,30vw,300px); background:url('/companion/vini.png') center bottom/contain no-repeat; image-rendering:pixelated; will-change:transform; animation:viniBreathe 2.2s ease-in-out infinite; }
      .mervi-splash--approach .mervi-splash__vini { animation:viniApproach 3.2s linear both; }
      .mervi-splash--pet .mervi-splash__vini { left:47%; animation:viniPet .7s ease-in-out infinite; }
      .mervi-splash--react .mervi-splash__vini { left:47%; animation:viniReact .7s steps(2,end) infinite; }
      .mervi-splash--exit .mervi-splash__vini { animation:viniExit .8s ease-in both; }
      .mervi-splash__pet-hand { position:absolute; left:40%; bottom:44%; display:none; width:30px; height:16px; border:3px solid #172238; border-radius:8px 8px 2px 8px; background:#f3b286; transform-origin:right center; }
      .mervi-splash--pet .mervi-splash__pet-hand { display:block; animation:petHand .7s steps(4,end) infinite; }
      .mervi-splash__spark { position:absolute; left:39%; bottom:58%; display:none; color:#f8d875; font-size:1.8rem; text-shadow:2px 2px #172238; }
      .mervi-splash--react .mervi-splash__spark { display:block; animation:spark .65s steps(2,end) infinite; }
      .mervi-splash__name { margin-top:.8rem; color:#f7efdc; font:600 clamp(1.8rem,5vw,3rem)/1 var(--font-plex),monospace; letter-spacing:-.07em; text-shadow:4px 4px 0 #172238,7px 7px 0 #397dc2; }
      .mervi-splash__caption { margin-top:.75rem; color:var(--content-secondary,#b8afa0); font:500 .66rem/1.4 var(--font-plex),monospace; letter-spacing:.08em; text-transform:uppercase; }
      @keyframes viniBreathe { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-3px) scale(1.008,.995); } } @keyframes viniApproach { 0% { transform:translateX(0) translateY(0) rotate(0); } 12.5% { transform:translateX(-20%) translateY(-5px) rotate(-1.2deg); } 25% { transform:translateX(-41%) translateY(0) rotate(1.2deg); } 37.5% { transform:translateX(-62%) translateY(-5px) rotate(-1.2deg); } 50% { transform:translateX(-83%) translateY(0) rotate(1.2deg); } 62.5% { transform:translateX(-104%) translateY(-5px) rotate(-1.2deg); } 75% { transform:translateX(-125%) translateY(0) rotate(1.2deg); } 87.5% { transform:translateX(-145%) translateY(-5px) rotate(-1deg); } 100% { transform:translateX(-165%) translateY(0) rotate(0); } } @keyframes viniPet { 0%,100% { transform:translateX(0) rotate(-3deg); } 50% { transform:translateX(-5px) translateY(2px) rotate(-6deg); } } @keyframes viniReact { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } } @keyframes viniExit { from { transform:translateX(0); } to { transform:translateX(180px); opacity:0; } } @keyframes merviIdle { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } } @keyframes merviHappy { 0%,100% { transform:translateY(0) rotate(0); } 50% { transform:translateY(-7px) rotate(-3deg); } } @keyframes petHand { 0%,100% { transform:rotate(-14deg) translate(0,0); } 50% { transform:rotate(8deg) translate(12px,-7px); } } @keyframes spark { 0%,100% { opacity:.2; transform:scale(.8); } 50% { opacity:1; transform:scale(1.15); } } @keyframes bubbleIn { from { opacity:0; transform:translateY(8px) scale(.96); } to { opacity:1; transform:translateY(0) scale(1); } } @keyframes splashIn { from { opacity:0; } to { opacity:1; } }
      .mervi-splash--reduced * { animation:none!important; } @media (prefers-reduced-motion:reduce) { .mervi-splash * { animation:none!important; } }
    `}</style>
  </div>;
}

export default MerviSplashScreen;
