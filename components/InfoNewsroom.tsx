"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Locale = "es" | "en";

const copy = {
  es: {
    back: "askforvini.pw",
    label: "OPINIÓN / ARCHIVO",
    title: "Cuando la protesta\nse disfraza.",
    intro: "Un archivo de opinión para documentar antisemitismo, odio y contradicciones que no deben presentarse como activismo legítimo.",
    listen: "Ver video",
    read: "Leer opinión",
    signal: "ARCHIVO EDITORIAL",
    about: "Señalar el odio también es responsabilidad",
    aboutText: "No somos una sala de prensa. Somos una voz con contexto, criterio y espacio para disentir.",
    videoError: "No se pudo reproducir el video.",
    openMp4: "Abrir MP4",
    unsupported: "Tu navegador no puede reproducir este video.",
  },
  en: {
    back: "askforvini.pw",
    label: "OPINION / ARCHIVE",
    title: "When protest\nwears a disguise.",
    intro: "An opinion archive documenting antisemitism, hate, and contradictions that should not be presented as legitimate activism.",
    listen: "Watch video",
    read: "Read opinion",
    signal: "EDITORIAL ARCHIVE",
    about: "Calling out hate is also responsibility",
    aboutText: "We are not a newsroom. We are a voice with context, judgment, and room to disagree.",
    videoError: "The video could not be played.",
    openMp4: "Open MP4",
    unsupported: "This browser cannot play the video.",
  },
} as const;

const stories = {
  es: [
    { category: "Antisemitismo", title: "¿Qué hay detrás de estas marchas?", excerpt: "Nueve láminas que exponen cómo el odio antisemita, el vandalismo y la desinformación intentan camuflarse como protesta.", kind: "article", href: "/opinion/marchas-plaza-24-septiembre", image: "/opinion/marchas/111.webp", detail: "9 LÁMINAS" },
    { category: "Protestas", title: "¿Niños en primera línea?", excerpt: "Una opinión sobre la presencia de menores durante las manifestaciones y la responsabilidad de protegerlos.", kind: "video", href: "#featured-video", image: "/info-video-poster.jpg", detail: "VIDEO · 45 S" },
  ],
  en: [
    { category: "Antisemitism", title: "What is behind these marches?", excerpt: "Nine panels documenting how antisemitic hate, vandalism, and misinformation can be camouflaged as protest.", kind: "article", href: "/opinion/marchas-plaza-24-septiembre", image: "/opinion/marchas/111.webp", detail: "9 PANELS" },
    { category: "Protests", title: "Children on the front line?", excerpt: "An opinion on the presence of minors at protests and the responsibility to protect them.", kind: "video", href: "#featured-video", image: "/info-video-poster.jpg", detail: "VIDEO · 45 S" },
  ],
};

export function InfoNewsroom({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const essay = stories[locale][0];
  const videoStory = stories[locale][1];
  const homeHref = `https://askforvini.pw/${locale}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setVideoError(true);
    video.addEventListener("timeupdate", update);
    video.addEventListener("loadedmetadata", update);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("loadedmetadata", update);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setVideoError(false);
      } catch {
        setVideoError(true);
      }
    } else {
      video.pause();
    }
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = (value / 100) * (video.duration || 0);
    setProgress(value);
  };

  const formatTime = (value: number) =>
    `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;

  return (
    <div className="info-site">
      <header className="info-header">
        <div className="page-wrap flex items-center justify-between gap-4 py-3">
          <Link href={`/${locale}/opinion`} className="info-brand">opinion.askforvini.pw</Link>
          <div className="info-live">{t.signal}</div>
          <a href={homeHref} className="info-home">{t.back} ↗</a>
        </div>
      </header>

      <main>
        <section className="info-hero page-wrap">
          <div className="info-kicker"><span /> {t.label}</div>
          <h1>{t.title}</h1>
          <div className="info-hero-bottom">
            <p>{t.intro}</p>
          </div>
        </section>

        <section className="info-feature info-cover page-wrap">
          <Link href={`/${locale}${essay.href}`} className="info-feature-visual info-cover-visual">
            <Image
              src={essay.image}
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, 58vw"
              className="object-contain"
            />
          </Link>
          <div className="info-feature-copy">
            <div className="info-kicker">01 · {essay.category} · {essay.detail}</div>
            <h2>{essay.title}</h2>
            <p>{essay.excerpt}</p>
            <Link href={`/${locale}${essay.href}`} className="info-arrow">
              {t.read} <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>

        <section className="info-feature info-video-piece page-wrap" id="featured-video">
          <div className="info-feature-visual">
            <video
              ref={videoRef}
              className="info-feature-video"
              preload="metadata"
              poster="/info-video-poster.jpg"
              playsInline
              aria-label={videoStory.title}
              onClick={() => void togglePlay()}
            >
              <source src="/IMG_7366-web-1080p.mp4" type="video/mp4" />
              <source src="/IMG_7366-web-1080p.webm" type="video/webm" />
              {t.unsupported}
            </video>
            <span className="info-feature-index">02</span>
            {videoError && (
              <div className="info-video-error" role="alert">
                {t.videoError} <a href="/IMG_7366-web-1080p.mp4">{t.openMp4} ↗</a>
              </div>
            )}
            <div className="info-video-controls">
              <input
                className="info-video-range"
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                disabled={!duration}
                onChange={(event) => seek(Number(event.target.value))}
                aria-label={locale === "es" ? "Progreso del video" : "Video progress"}
                style={{ "--progress": `${progress}%` } as CSSProperties}
              />
              <div className="info-video-control-row">
                <button type="button" onClick={() => void togglePlay()} aria-label={playing ? (locale === "es" ? "Pausar video" : "Pause video") : (locale === "es" ? "Reproducir video" : "Play video")}>
                  {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>
                <span className="info-video-time">{formatTime(currentTime)} <i>/</i> {formatTime(duration)}</span>
                <span className="info-video-spacer" />
                <button
                  type="button"
                  onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;
                    video.muted = !video.muted;
                    setMuted(video.muted);
                  }}
                  aria-label={muted ? (locale === "es" ? "Activar sonido" : "Unmute video") : (locale === "es" ? "Silenciar video" : "Mute video")}
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const player = videoRef.current?.parentElement;
                    if (player?.requestFullscreen) void player.requestFullscreen();
                    else videoRef.current?.requestFullscreen();
                  }}
                  aria-label={locale === "es" ? "Pantalla completa" : "Full screen"}
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="info-feature-copy">
            <div className="info-kicker">{videoStory.category} · {videoStory.detail}</div>
            <h2>{videoStory.title}</h2>
            <p>{videoStory.excerpt}</p>
            <button type="button" className="info-arrow" onClick={() => { videoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); void togglePlay(); }}>
              {t.listen} <ArrowUpRight size={17} />
            </button>
          </div>
        </section>

        <section className="info-manifesto">
          <div className="page-wrap">
            <div className="info-kicker"><span /> ASKFORVINI / OPINIÓN</div>
            <h2>{t.about}</h2>
            <p>{t.aboutText}</p>
          </div>
        </section>
      </main>
      <footer className="page-wrap info-footer">
        <span>© 2026 askforvini</span>
        <a href={homeHref}>{t.back} ↗</a>
      </footer>
    </div>
  );
}
