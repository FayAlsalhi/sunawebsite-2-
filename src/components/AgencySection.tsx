import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PROJECTS, type Project } from "@/lib/projects";

/* True below the lg breakpoint (1024px) — stacking effect needs a tall viewport. */
function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const on = () => setCompact(mql.matches);
    on();
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, []);
  return compact;
}

/* ----------------------------- Client ticker ----------------------------- */
/* Fancy, interactive marquee of client brands — two rows drifting in opposite
   directions, pausing on hover, each name lighting up in صُنع scarlet. Styled
   in the same "system-design" language as the rest of the site. */

const CLIENTS = [
  "NEBULA",
  "APEX",
  "IPSUM",
  "LUMA",
  "ORBIT",
  "VERTEX",
  "PULSE",
  "NORTH",
  "CIRCA",
  "MONO",
  "DAILY",
  "ZENITH",
];

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  duration: number;
}) {
  // Two copies of the row so a -50% shift loops seamlessly.
  const row = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
      <div
        className="flex shrink-0 items-center group-hover:[animation-play-state:paused]"
        style={{
          animation: `suna-marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((name, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="font-latin cursor-default select-none px-8 text-2xl font-semibold tracking-wide text-neutral-600 transition-[color,text-shadow] duration-300 hover:text-[var(--suna)] hover:[text-shadow:0_0_28px_rgba(233,37,0,0.55)] md:px-12 md:text-4xl">
              {name}
            </span>
            <span aria-hidden className="text-sm text-[var(--suna)]/40">
              +
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ClientTicker() {
  return (
    <div className="mt-24 md:mt-32">
      {/* system-design header */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-[var(--suna)]">
          [ عملاؤنا ]
        </span>
        <div className="h-px flex-1 bg-white/10" />
        <span
          dir="ltr"
          className="font-mono text-[0.62rem] tracking-[0.3em] text-neutral-600"
        >
          12+
        </span>
      </div>
      <p className="mt-5 text-sm text-neutral-400 md:text-base">
        نعمل مع علامات تجارية رائدة
      </p>

      <div className="mt-10 space-y-5 md:space-y-6">
        <MarqueeRow items={CLIENTS} duration={34} />
        <MarqueeRow items={[...CLIENTS].reverse()} reverse duration={28} />
      </div>
    </div>
  );
}

/* ------------------------------ Story stats ------------------------------ */
/* The numbers, reimagined as an editorial ledger threaded by a single orange
   line that draws itself with the scroll — a quiet through-line carrying the
   eye toward the work below. No boxes, no even grid. */

const STAT_EASE = [0.16, 1, 0.3, 1] as const;

// A single odometer digit: a tall column of numerals that rolls (two full
// spins, then settles on the target) when the line is revealed.
function DigitReel({
  digit,
  active,
  delay,
}: {
  digit: number;
  active: boolean;
  delay: number;
}) {
  const SPINS = 2;
  const items: number[] = [];
  for (let s = 0; s < SPINS; s++) for (let d = 0; d < 10; d++) items.push(d);
  for (let d = 0; d <= digit; d++) items.push(d);
  const land = SPINS * 10 + digit;

  return (
    <span
      className="relative inline-block overflow-hidden tabular-nums"
      style={{ height: "1em" }}
    >
      <motion.span
        className="flex flex-col"
        style={{ lineHeight: 1, willChange: "transform" }}
        initial={{ y: 0 }}
        animate={{ y: active ? `-${land}em` : 0 }}
        transition={{ duration: 1.8, ease: STAT_EASE, delay }}
      >
        {items.map((d, i) => (
          <span key={i} style={{ height: "1em" }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingNumber({
  value,
  active,
  baseDelay,
}: {
  value: number;
  active: boolean;
  baseDelay: number;
}) {
  const digits = String(value).split("").map(Number);
  return (
    <span dir="ltr" className="inline-flex leading-none">
      {digits.map((d, i) => (
        <DigitReel key={i} digit={d} active={active} delay={baseDelay + i * 0.1} />
      ))}
    </span>
  );
}

function StatCard({
  value,
  suffix,
  label,
  active,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
}) {
  return (
    <div className="relative">
      {/* mono index — system-design cue */}
      <span className="font-mono text-[0.62rem] tracking-[0.3em] text-[var(--suna)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="mt-4 flex items-start">
        <span
          dir="ltr"
          className="flex items-start text-[3.5rem] font-bold leading-none tracking-tight text-white md:text-[5.5rem]"
        >
          <RollingNumber value={value} active={active} baseDelay={index * 0.12} />
          <span className="ml-1 text-[var(--suna)]">{suffix}</span>
        </span>
      </div>

      <p className="mt-5 text-sm leading-snug text-neutral-400 md:text-base">
        {label}
      </p>

      {/* underline that draws itself in */}
      <motion.div
        className="mt-6 h-px origin-right bg-gradient-to-l from-[var(--suna)]/60 via-white/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 1, ease: STAT_EASE, delay: index * 0.12 + 0.2 }}
      />
    </div>
  );
}

const STATS = [
  { value: 10, suffix: "+", label: "سنوات من الخبرة" },
  { value: 240, suffix: "+", label: "مشروعًا منجزًا" },
  { value: 15, suffix: "+", label: "قطاعًا نخدمه" },
];

function StoryStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <div ref={ref}>
      {/* system-design header */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-[var(--suna)]">
          [ أرقامنا ]
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-3 md:mt-14 md:gap-10">
        {STATS.map((s, i) => (
          <StatCard
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            active={inView}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Project card ------------------------------ */

function ProjectCard({
  project,
  i,
  total,
}: {
  project: Project;
  i: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsCompact();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const cardInner = (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group relative block overflow-hidden rounded-[1.5rem] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] md:rounded-[2rem]"
    >
      <img
        src={project.src}
        alt={project.title}
        loading="lazy"
        className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[340px] md:h-[440px]"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
      <div className="absolute right-5 top-5 text-right md:right-9 md:top-9">
        <span className="inline-block rounded-full bg-[hsl(9_100%_46%)] px-3 py-1 text-xs font-medium text-white">
          {project.tag}
        </span>
        <h3 className="mt-4 max-w-[16rem] text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
          {project.title}
        </h3>
      </div>
      <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-sm font-medium text-white opacity-100 transition-opacity duration-500 md:bottom-9 md:left-9 md:opacity-0 md:group-hover:opacity-100">
        شاهد المشروع ←
      </span>
    </Link>
  );

  // On mobile, drop the sticky stacking effect (cards pile up illegibly).
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cardInner}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${90 + i * 26}px`, zIndex: i + 1 }}
    >
      <motion.div style={{ y: i === total - 1 ? 0 : y, opacity }}>
        {cardInner}
      </motion.div>
    </div>
  );
}

/* --------------------------------- Section -------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function AgencySection() {
  return (
    <section className="w-full py-24 text-white md:py-32" style={{ background: "var(--esq-bg)" }}>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* General statistics — the section opener */}
        <StoryStats />

        {/* Interactive client ticker */}
        <ClientTicker />

        {/* Featured projects heading */}
        <div id="work" className="mt-28 scroll-mt-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] text-[hsl(9_100%_46%)]"
          >
            [ أعمالنا المميزة ]
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-3xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl"
          >
            التصوير الفوتوغرافي والفيديو
          </motion.h2>
        </div>

        {/* Stacking cards */}
        <div className="mt-12 flex flex-col gap-6 pb-24">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              i={i}
              total={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
