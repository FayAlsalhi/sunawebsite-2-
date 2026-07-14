import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/* Netflix-Ads-style opening for صُنع.
   Red teaser  →  vertical slide-up  →  black feature scene.
   The big "صُنع" is a single shared element that, on scroll, shrinks and docks
   into the nav, then slides to the right edge once the orange (services)
   section is reached. */

const RED = "#E50914";
const EASE = [0.16, 1, 0.3, 1] as const;
const POSTER =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop";

/* ------------------------------ Download icon ---------------------------- */

function DownloadIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* ------------------------------ Block reveal ----------------------------- */
/* A red block sweeps across the text and reveals it — the sharp, ad-like
   wipe from the reference. Runs once `active` turns true. */

function BlockReveal({
  children,
  active,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  active: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.34, duration: 0.01 }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-y-0 -inset-x-1"
        style={{ background: RED }}
        initial={{ x: "-115%" }}
        animate={active ? { x: "115%" } : {}}
        transition={{ delay, duration: 0.66, ease: EASE }}
      />
    </span>
  );
}

/* ----------------------------- Traveling logo ---------------------------- */

function TravelingLogo({ introDone }: { introDone: boolean }) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);
  const [vw, setVw] = useState(1200);
  const [servicesTop, setServicesTop] = useState(4000);

  useEffect(() => {
    const update = () => {
      setVh(window.innerHeight);
      setVw(window.innerWidth);
      const el = document.getElementById("services");
      if (el) setServicesTop(el.getBoundingClientRect().top + window.scrollY);
    };
    update();
    window.addEventListener("resize", update);
    // Re-measure once images/sections have settled.
    const t = setTimeout(update, 1200);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, []);

  // Phase 1 — over the first screen of scroll: big red centre → small docked.
  const end = vh * 0.5;
  const scale = useTransform(scrollY, [0, end], [1, 0.13], { clamp: true });
  const y = useTransform(scrollY, [0, end], [0, -(vh / 2 - 46)], { clamp: true });
  const color = useTransform(scrollY, [0, end * 0.7], [RED, "#ffffff"]);

  // Phase 2 — when the orange (services) section arrives: dock slides right.
  const rightX = Math.max(vw / 2 - 72, 0);
  const x = useTransform(
    scrollY,
    [servicesTop - vh, servicesTop - vh * 0.4],
    [0, rightX],
    { clamp: true },
  );

  return (
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.div style={{ x, y, scale, willChange: "transform" }}>
          <motion.span
            style={{ color }}
            className="block select-none text-center text-[24vw] font-bold leading-none tracking-tight md:text-[13rem]"
          >
            صُنع
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------ Red teaser ------------------------------- */

function RedTeaser({ revealed }: { revealed: boolean }) {
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
        revealed ? "pointer-events-none" : ""
      }`}
      style={{ background: RED }}
      initial={{ y: 0 }}
      animate={{ y: revealed ? "-100%" : 0 }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
      aria-hidden={revealed}
    >
      <motion.p
        className="text-sm font-semibold tracking-[0.25em] text-black/80 md:text-base"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
      >
        حمِّل التقرير
      </motion.p>

      <motion.span
        className="mt-1 select-none text-[22vw] font-black leading-none tracking-tight text-black md:text-[12rem]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
      >
        صُنع
      </motion.span>

      <motion.div
        className="mt-8 text-black"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <DownloadIcon />
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------- Feature scene ------------------------------ */

function FeatureScene({ revealed }: { revealed: boolean }) {
  return (
    <section
      dir="rtl"
      className="relative flex min-h-screen flex-col overflow-hidden pt-[92px]"
      style={{ background: "var(--esq-bg)" }}
    >
      {/* Identity row */}
      <div className="flex items-center justify-between px-6 pt-6 md:px-12 md:pt-9">
        <BlockReveal
          active={revealed}
          delay={0.15}
          className="text-sm font-bold tracking-[0.22em] text-white md:text-base"
        >
          صُنع آدز
        </BlockReveal>
        <BlockReveal
          active={revealed}
          delay={0.3}
          className="text-sm font-semibold tracking-[0.34em] text-white/80 md:text-base"
        >
          يُقدّم
        </BlockReveal>
      </div>

      {/* Centre is occupied by the shared TravelingLogo (fixed, overlaid). */}
      <div className="flex-1" />

      {/* Poster — enters from below with a slight zoom, rounded top corners. */}
      <motion.div
        className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-t-[2rem]"
        initial={{ opacity: 0, y: 64, scale: 1.06 }}
        animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 1, ease: EASE }}
      >
        <img
          src={POSTER}
          alt="صُنع"
          className="h-[34vh] w-full object-cover md:h-[44vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      </motion.div>
    </section>
  );
}

/* --------------------------------- Hero ---------------------------------- */

export default function EsquireHero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ background: "var(--esq-bg)" }}>
      {/* Nav bar — the shared logo docks here on scroll */}
      <nav
        className="fixed inset-x-0 top-0 z-30 h-[92px] border-b"
        style={{
          borderColor: "color-mix(in oklab, var(--esq-ink) 14%, transparent)",
          background: "color-mix(in oklab, var(--esq-bg) 80%, transparent)",
          backdropFilter: "blur(10px)",
        }}
      />

      <FeatureScene revealed={revealed} />

      {/* Shared "صُنع": centre → docks in nav → slides right at services */}
      <TravelingLogo introDone={revealed} />

      {/* Red teaser overlay that slides up to reveal the scene */}
      <RedTeaser revealed={revealed} />
    </main>
  );
}
