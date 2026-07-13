import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PROJECTS, type Project } from "@/lib/projects";
import AmbientBackground from "@/components/AmbientBackground";

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

/* --------------------------- Story image reel ---------------------------- */
/* An editorial strip of studio frames that drifts right→left as the block
   passes through the viewport — the same "images travelling with the scroll"
   language as the gallery above, on a fresh horizontal axis. */

type Frame = { src: string; index: number; size: string };

const REEL: Frame[] = [
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
    index: 1,
    size: "h-[230px] w-[330px] md:h-[380px] md:w-[540px]",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop",
    index: 2,
    size: "h-[200px] w-[270px] md:h-[300px] md:w-[390px]",
  },
  {
    src: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=900&auto=format&fit=crop",
    index: 3,
    size: "h-[260px] w-[300px] md:h-[430px] md:w-[470px]",
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=900&auto=format&fit=crop",
    index: 4,
    size: "h-[200px] w-[270px] md:h-[300px] md:w-[390px]",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop",
    index: 5,
    size: "h-[240px] w-[310px] md:h-[380px] md:w-[500px]",
  },
  {
    src: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=900&auto=format&fit=crop",
    index: 6,
    size: "h-[210px] w-[280px] md:h-[330px] md:w-[420px]",
  },
];

function StoryReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-24%"]);

  return (
    <div ref={ref} className="relative mt-14 md:mt-20">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <motion.div
          style={{ x, willChange: "transform" }}
          className="flex w-max items-center gap-4 pt-7 md:gap-6"
        >
          {REEL.map((f) => (
            <figure key={f.index} className="relative shrink-0">
              <span className="absolute -top-6 right-1 font-mono text-[0.7rem] tracking-[0.3em] text-neutral-500">
                {String(f.index).padStart(2, "0")}
              </span>
              <img
                src={f.src}
                alt={`لقطة من الاستوديو ${f.index}`}
                loading="lazy"
                className={`${f.size} rounded-[1.25rem] object-cover shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)]`}
              />
            </figure>
          ))}
        </motion.div>
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

function StatRow({
  value,
  suffix,
  label,
  active,
  index,
  isLast,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
  isLast: boolean;
}) {
  return (
    <div>
      <div className="flex items-end justify-start gap-5 md:gap-7">
        <span
          dir="ltr"
          className="flex items-start text-[3.75rem] font-bold leading-none tracking-tight text-white md:text-[7rem]"
        >
          <RollingNumber value={value} active={active} baseDelay={index * 0.14} />
          <span className="ml-2 text-[hsl(18_88%_55%)]">{suffix}</span>
        </span>
        <p className="max-w-[8rem] pb-2 text-right text-sm leading-snug text-neutral-400 md:max-w-[12rem] md:pb-4 md:text-lg">
          {label}
        </p>
      </div>
      {!isLast && (
        <motion.div
          className="mt-6 h-px origin-right bg-gradient-to-l from-white/20 via-white/10 to-transparent md:mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 1, ease: STAT_EASE, delay: index * 0.14 + 0.25 }}
        />
      )}
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
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <div ref={ref} className="mt-20 flex flex-col gap-6 md:mt-28 md:gap-8">
      {STATS.map((s, i) => (
        <StatRow
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
          active={inView}
          index={i}
          isLast={i === STATS.length - 1}
        />
      ))}
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
        <span className="inline-block rounded-full bg-[hsl(18_88%_55%)] px-3 py-1 text-xs font-medium text-white">
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
    <section id="about" className="w-full scroll-mt-24 py-24 text-white md:py-32" style={{ background: "var(--esq-bg)" }}>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* --------------------- Who we are · the story --------------------- */}
        <div className="relative overflow-hidden">
          {/* soft ambient warmth — carries the mood over from the gallery */}
          <div className="opacity-70">
            <AmbientBackground />
          </div>

          <div className="relative z-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.3em] text-[hsl(18_88%_55%)]"
            >
              [ من نحن ]
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-4 max-w-3xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl"
            >
              استوديو رقمي متكامل لصناعة المحتوى والحملات
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
            >
              من الفكرة إلى الأثر، نصنع حضورًا رقميًا متكاملًا لعلامتك.
            </motion.p>

            <StoryReel />
            <StoryStats />
          </div>
        </div>

        {/* Logos */}
        <div className="mt-24">
          <p className="text-sm text-neutral-400">
            نعمل مع علامات تجارية رائدة
          </p>
          <div className="mt-8 grid grid-cols-3 items-center gap-x-8 gap-y-6 md:grid-cols-6">
            {[
              "NEBULA",
              "APEX",
              "IPSUM",
              "LOGO",
              "LUMA",
              "ORBIT",
              "VERTEX",
              "PULSE",
              "NORTH",
              "CIRCA",
              "MONO",
              "DAILY",
            ].map((name) => (
              <span
                key={name}
                className="text-center text-lg font-semibold tracking-wide text-neutral-600"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Featured projects heading */}
        <div id="work" className="mt-28 scroll-mt-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] text-[hsl(18_88%_55%)]"
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
