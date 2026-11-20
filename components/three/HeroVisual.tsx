"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { heroFallbackSvg } from "./heroFallbackSvg";

// three.js is only downloaded when the device passes the capability check below
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/** Decide whether this device should get the interactive 3D scene. */
function canRender3D(): boolean {
  const nav = navigator as NavigatorWithHints;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 768px)").matches) return false; // phones get the static image
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return false;
  if ((nav.hardwareConcurrency ?? 0) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual({ alt }: { alt: string }) {
  const [enable3D, setEnable3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    // Start only after the page has fully loaded and the browser is idle,
    // so the 3D bundle and shader compilation never compete with the first paint.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const start = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setEnable3D(true), { timeout: 3000 });
      else timeoutId = window.setTimeout(() => setEnable3D(true), 1500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
        dangerouslySetInnerHTML={{ __html: heroFallbackSvg }}
      />
      {enable3D && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
