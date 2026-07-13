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

/* ----------------------------- Rotating badge ---------------------------- */

function OrangeBadge() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[hsl(18_88%_55%)] shadow-[0_16px_40px_-16px_hsl(18_88%_55%/0.7)] md:h-32 md:w-32">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="badge-curve"
              d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
            />
          </defs>
          <text className="fill-white text-[10px] uppercase tracking-[0.28em]">
            <textPath href="#badge-curve" startOffset="0%">
              Digital Studio · Since 2016 · Creative ·
            </textPath>
          </text>
        </svg>
      </motion.div>
      <span className="text-2xl font-bold text-white">✦</span>
    </div>
  );
}

/* --------------------------- Animated counter ---------------------------- */

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-right">
      <div
        dir="ltr"
        className="flex items-start justify-end text-5xl font-semibold tabular-nums tracking-tight text-white md:text-6xl"
      >
        {count}
        <span className="ml-1 text-[hsl(18_88%_55%)]">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-neutral-400">{label}</p>
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
        {/* Top heading */}
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

        {/* Media layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative md:col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop"
              alt="Our studio"
              loading="lazy"
              className="h-[300px] w-full rounded-[2rem] object-cover md:h-[420px]"
            />
            <div className="absolute -bottom-6 -left-6 hidden md:block">
              <OrangeBadge />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-[2rem] bg-white/5 p-7 text-right">
              <h3 className="text-lg font-semibold">قصتنا</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                متخصصون في صناعة حلول رقمية متكاملة — من الهوية والتصوير إلى
                المحتوى والحملات — مصمّمة لتقرّب علامتك من جمهورها وتحقّق نتائج
                فعلية.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
              alt="Team at work"
              loading="lazy"
              className="h-[180px] w-full rounded-[2rem] object-cover"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Counter value={5} suffix="+" label="سنوات خبرة" />
          <Counter value={240} suffix="+" label="مشروع منجز" />
          <Counter value={67} suffix="+" label="عميل سعيد" />
          <Counter value={98} suffix="%" label="نسبة الرضا" />
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
