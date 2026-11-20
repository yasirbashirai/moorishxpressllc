"use client";

import { useEffect, useRef, useState } from "react";

export type HeroVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export default function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      setAutoPlay(!motionPreference.matches);
      if (motionPreference.matches) video.pause();
      else void video.play().catch(() => { /* The play button remains available if autoplay is blocked. */ });
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => {
      motionPreference.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, [src]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-ink/10">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={1280}
        height={720}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="aspect-video w-full bg-fog object-contain"
      >
        <a href={src}>Watch {label.toLowerCase()}</a>
      </video>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
        <p className="font-display text-sm font-medium uppercase tracking-wide text-steel">{label}</p>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={`${playing ? "Pause" : "Play"} ${label.toLowerCase()}`}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold text-red transition hover:bg-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
            {playing ? <path d="M5 3h3v14H5zm7 0h3v14h-3z" /> : <path d="M5 3v14l12-7z" />}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
