import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function ScrollLogo() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Animate over the first screen of scroll (0 -> ~70% of a viewport).
  const end = vh * 0.45;
  // Big & centered -> small & docked in the nav bar (~46px from top).
  const scale = useTransform(scrollY, [0, end], [1, 0.12], { clamp: true });
  // Distance from screen center to the nav bar center, in px.
  const lift = useTransform(scrollY, [0, end], [0, -(vh / 2 - 46)], {
    clamp: true,
  });

  return (
    // Static wrapper keeps the logo perfectly centered on screen.
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
      {/* Outer layer follows the scroll (shrink + dock into the nav). */}
      <motion.div style={{ y: lift, scale }}>
        {/* Inner layer is the gentle fade + scale entrance on load. */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/*
            Interim wordmark until the real brand file is supplied. To swap in
            the uploaded logo, replace the <span> below with:
              <img src="/suna-logo.svg" alt="صُنع"
                   className="w-[80vw] max-w-[1100px] select-none" />
            (drop the file in /public). Keeps the same scroll/entrance motion.
          */}
          <span className="block select-none text-center text-[26vw] font-bold leading-none tracking-tight text-[var(--esq-ink)] md:text-[15rem]">
            صُنع
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* --------- Decorative geometry: minimal, premium, very slow motion --------- */

function HeroDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {/* Faint grid, radially masked so it dissolves toward the centre */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--esq-ink) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--esq-ink) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(115% 90% at 50% 42%, transparent 34%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(115% 90% at 50% 42%, transparent 34%, black 100%)",
        }}
      />

      {/* Large thin ring, top-right, with a slowly orbiting accent dot */}
      <motion.div
        className="absolute -right-[18vw] -top-[24vh] h-[54vw] w-[54vw]"
        animate={{ rotate: 360 }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[hsl(18_88%_55%)]/70" />
      </motion.div>

      {/* Second, larger faint ring, bottom-left, counter-rotating */}
      <motion.div
        className="absolute -bottom-[28vh] -left-[16vw] h-[48vw] w-[48vw] rounded-full border border-white/[0.05]"
        animate={{ rotate: -360 }}
        transition={{ duration: 96, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/40" />
      </motion.div>

      {/* Soft orange blur orb — accent only, slow drift */}
      <motion.div
        className="absolute bottom-[14%] right-[10%] h-[28vw] w-[28vw] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, hsl(18 88% 55% / 0.14), transparent 70%)",
          willChange: "transform",
        }}
        animate={{ x: [0, -28, 18, 0], y: [0, 22, -16, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cool white blur orb, opposite corner */}
      <motion.div
        className="absolute left-[12%] top-[16%] h-[22vw] w-[22vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.05), transparent 70%)",
          willChange: "transform",
        }}
        animate={{ x: [0, 24, -18, 0], y: [0, -16, 22, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Thin hairline + dots accent, sides (desktop only, away from text) */}
      <div className="absolute right-[7%] top-1/2 hidden -translate-y-1/2 md:block">
        <div className="mx-auto h-24 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="mt-3 flex flex-col items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="absolute left-[7%] bottom-[18%] hidden md:block">
        <div className="h-16 w-px bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </div>
  );
}


function EntranceLogo() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden esq-noise">
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--esq-bg)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, transparent 40%, color-mix(in oklab, var(--esq-ink) 12%, transparent) 100%)",
        }}
      />

      {/* Decorative geometry (sits behind the text/logo) */}
      <HeroDecor />

      {/* Scroll to explore */}
      <motion.span
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="absolute top-8 z-30 text-[0.75rem] tracking-[0.25em]"
        style={{ color: "var(--esq-muted)" }}
      >
        اسحب للأسفل للاستكشاف
      </motion.span>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-30 text-xs tracking-[0.25em]"
        style={{ color: "var(--esq-muted)" }}
      >
        استوديو تصوير وإنتاج إبداعي · 2026
      </motion.p>
    </div>
  );
}



export default function EsquireHero() {
  return (
    <main style={{ background: "var(--esq-bg)" }}>
      {/* Nav bar — the shared logo docks here on scroll */}
      <nav
        className="fixed inset-x-0 top-0 z-30 flex h-[92px] items-center justify-center border-b"
        style={{
          borderColor: "color-mix(in oklab, var(--esq-ink) 14%, transparent)",
          background: "color-mix(in oklab, var(--esq-bg) 80%, transparent)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Shared element that travels from center to nav bar */}
      <ScrollLogo />

      <EntranceLogo />
    </main>

  );
}
