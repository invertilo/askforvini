"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Maximize2, Pause, Play, Search, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

type Locale = "es" | "en";

const copy = {
  es: {
    back: "askforvini.pw",
    label: "OPINIÓN / ARCHIVO",
    title: "Lo que está pasando,\ny lo que significa.",
    intro: "Una mirada personal a la actualidad, las protestas y las preguntas que quedan después del titular.",
    latest: "Publicaciones",
    featured: "Análisis destacado",
    listen: "Ver video",
    read: "Leer opinión",
    topics: ["Todo", "Protestas"],
    signal: "ARCHIVO EDITORIAL",
    about: "Una mirada propia sobre el presente",
    aboutText: "No somos una sala de prensa. Somos una voz con contexto, criterio y espacio para disentir.",
  },
  en: {
    back: "askforvini.pw",
    label: "OPINION / ARCHIVE",
    title: "What is happening,\nand what it means.",
    intro: "A personal view of current events, protests, and the questions left after the headline.",
    latest: "Publications",
    featured: "Featured analysis",
    listen: "Watch video",
    read: "Read opinion",
    topics: ["All", "Protests"],
    signal: "EDITORIAL ARCHIVE",
    about: "A point of view on the present",
    aboutText: "We are not a newsroom. We are a voice with context, judgment, and room to disagree.",
  },
} as const;

const stories = {
  es: [
    { category: "Protestas", title: "¿Qué hay detrás de estas marchas?", excerpt: "Nueve láminas sobre conversaciones en torno a las marchas en la Plaza 24 de Septiembre, Santa Cruz de la Sierra.", kind: "article", href: "/opinion/marchas-plaza-24-septiembre", image: "/opinion/marchas/111.webp", detail: "9 LÁMINAS" },
    { category: "Protestas", title: "¿Niños en primera línea?", excerpt: "Una opinión sobre la presencia de menores durante las manifestaciones y la responsabilidad de protegerlos.", kind: "video", href: "#featured-video", image: "/info-video-poster.jpg", detail: "VIDEO · 45 S" },
  ],
  en: [
    { category: "Protests", title: "What is behind these marches?", excerpt: "Nine illustrated panels on conversations about protests in Plaza 24 de Septiembre, Santa Cruz de la Sierra.", kind: "article", href: "/opinion/marchas-plaza-24-septiembre", image: "/opinion/marchas/111.webp", detail: "9 PANELS" },
    { category: "Protests", title: "Children on the front line?", excerpt: "An opinion on the presence of minors at protests and the responsibility to protect them.", kind: "video", href: "#featured-video", image: "/info-video-poster.jpg", detail: "VIDEO · 45 S" },
  ],
};

export function InfoNewsroom({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [active, setActive] = useState<string>(t.topics[0]);
  const [query, setQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const allStories = stories[locale];
  const filtered = useMemo(() => allStories.filter((story) => {
    const matchesTopic = active === t.topics[0] || story.category === active;
    const matchesQuery = `${story.title} ${story.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return matchesTopic && matchesQuery;
  }), [active, allStories, query, t.topics]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    video.addEventListener("timeupdate", update);
    video.addEventListener("loadedmetadata", update);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setVideoError(true);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    return () => { video.removeEventListener("timeupdate", update); video.removeEventListener("loadedmetadata", update); video.removeEventListener("play", onPlay); video.removeEventListener("pause", onPause); video.removeEventListener("error", onError); };
  }, []);
  const togglePlay = async () => { const video = videoRef.current; if (!video) return; if (video.paused) { try { await video.play(); setVideoError(false); } catch { setVideoError(true); } } else video.pause(); };
  const seek = (value: number) => { const video = videoRef.current; if (!video) return; video.currentTime = (value / 100) * (video.duration || 0); setProgress(value); };
  const formatTime = (value: number) => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;

  return (
    <div className="info-site">
      <header className="info-header">
        <div className="page-wrap flex items-center justify-between gap-4 py-3">
          <Link href={`/${locale}/opinion`} className="info-brand">opinion.askforvini.pw</Link>
          <div className="info-live">{t.signal}</div>
          <Link href={`/${locale}`} className="info-date">askforvini.pw ↗</Link>
        </div>
      </header>

      <main>
        <section className="info-hero page-wrap">
          <div className="info-kicker"><span /> {t.label}</div>
          <h1>{t.title}</h1>
          <div className="info-hero-bottom">
            <p>{t.intro}</p>
            <div className="info-mark" aria-hidden="true">/ /<br /><span>•••</span></div>
          </div>
        </section>

        <section className="info-feature page-wrap" id="featured-video">
          <div className="info-feature-visual info-tone-blue"><video ref={videoRef} className="info-feature-video" preload="metadata" poster="/info-video-poster.jpg" playsInline aria-label="Opinión en primera persona" onClick={() => void togglePlay()}><source src="/IMG_7366-web-1080p.mp4" type="video/mp4" /><source src="/IMG_7366-web-1080p.webm" type="video/webm" />Tu navegador no puede reproducir este video.</video><span className="info-feature-index">01 / 02</span>{videoError && <div className="info-video-error" role="alert">No se pudo reproducir el video. <a href="/IMG_7366-web-1080p.mp4">Abrir MP4 ↗</a></div>}<div className="info-video-controls"><input className="info-video-range" type="range" min="0" max="100" step="0.1" value={progress} disabled={!duration} onChange={(event) => seek(Number(event.target.value))} aria-label="Progreso del video" style={{ "--progress": `${progress}%` } as CSSProperties} /><div className="info-video-control-row"><button type="button" onClick={() => void togglePlay()} aria-label={playing ? "Pausar video" : "Reproducir video"}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><span className="info-video-time">{formatTime(currentTime)} <i>/</i> {formatTime(duration)}</span><span className="info-video-spacer" /><button type="button" onClick={() => { const video = videoRef.current; if (video) { video.muted = !video.muted; setMuted(video.muted); } }} aria-label={muted ? "Activar sonido" : "Silenciar video"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button><button type="button" onClick={() => { const player = videoRef.current?.parentElement; if (player?.requestFullscreen) void player.requestFullscreen(); else videoRef.current?.requestFullscreen(); }} aria-label="Pantalla completa"><Maximize2 size={16} /></button></div></div></div>
          <div className="info-feature-copy"><div className="info-kicker">{t.featured} · {allStories[0].category}</div><h2>{locale === "es" ? "¿Niños en primera línea?" : "Children on the front line?"}</h2><p>{locale === "es" ? "Una opinión sobre la presencia de menores durante las manifestaciones y la responsabilidad de protegerlos antes que cualquier causa." : "An opinion on the presence of minors at protests and the responsibility to protect them."}</p><button type="button" className="info-arrow" onClick={() => { videoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); void togglePlay(); }}>{t.listen} <ArrowUpRight size={17} /></button></div>
        </section>

        <section className="info-feed page-wrap" id="feed">
          <div className="info-feed-head"><div><div className="info-kicker"><span /> {t.latest}</div><h2>{t.latest}</h2></div><label className="info-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={locale === "es" ? "Buscar" : "Search"} aria-label={locale === "es" ? "Buscar" : "Search"} /></label></div>
          <div className="info-topics">{t.topics.map((topic) => <button key={topic} onClick={() => setActive(topic)} className={active === topic ? "is-active" : ""}>{topic}</button>)}</div>
          <div className="info-grid-list">{filtered.map((story, index) => <article className="info-card" key={story.title}><Link className="info-card-link" href={story.href.startsWith("#") ? story.href : `/${locale}${story.href}`}><div className={`info-card-media ${story.kind === "article" ? "info-card-media-document" : ""}`}><Image src={story.image} alt="" width={story.kind === "video" ? 540 : 1254} height={story.kind === "video" ? 960 : 1254} sizes="(max-width: 700px) 35vw, 15vw" /><span>0{index + 1}</span></div><div className="info-card-body"><div className="info-meta"><span>{story.category}</span><span>{story.detail}</span></div><h3>{story.title}</h3><p>{story.excerpt}</p><span className="info-card-action">{story.kind === "video" ? t.listen : t.read} <ArrowUpRight size={15} /></span></div></Link></article>)}</div>
        </section>

        <section className="info-manifesto"><div className="page-wrap"><div className="info-kicker"><span /> ASKFORVINI / OPINIÓN</div><h2>{t.about}</h2><p>{t.aboutText}</p></div></section>
      </main>
      <footer className="page-wrap info-footer"><span>© 2026 askforvini</span><Link href={`/${locale}`}>{t.back} ↗</Link></footer>
    </div>
  );
}
