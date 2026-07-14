import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

/* --------------------------------- Data ---------------------------------- */

type Feature = {
  id: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  cta: string;
  href: string;
  screens: string[];
  images: string[];
};

const FEATURES: Feature[] = [
  {
    id: "social",
    title: "إدارة حسابات التواصل الاجتماعي",
    desc: "ندير حساباتك من الاستراتيجية وصناعة المحتوى إلى النشر وقراءة الأداء، لنصنع حضورًا يعكس قيمة علامتك ويقربها من جمهورها.",
    stat: "+40M",
    statLabel: "وصول للمحتوى المُدار",
    cta: "اكتشف إدارة الحسابات",
    href: "/services/social",
    screens: ["خطة المحتوى", "تقويم النشر", "شكل المنشورات", "ملخص الأداء"],
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "ads",
    title: "الحملات الإعلانية المدفوعة",
    desc: "نبني الحملات بناءً على الجمهور والهدف، ثم نتابعها ونحسنها باستمرار لتحويل الميزانية إلى نتائج قابلة للقياس.",
    stat: "+500K",
    statLabel: "نقرة حققتها الحملات",
    cta: "اكتشف الحملات الإعلانية",
    href: "/services/ads",
    screens: ["إطلاق الحملة", "تحديد الجمهور", "الوصول والنقرات", "تحسّن النتائج"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "content",
    title: "كتابة وصناعة المحتوى",
    desc: "نصنع محتوى يعبّر عن شخصية العلامة، من نبرة الصوت والنصوص التسويقية إلى محتوى المنصات والحملات.",
    stat: "+500",
    statLabel: "قطعة محتوى تم تطويرها",
    cta: "اكتشف صناعة المحتوى",
    href: "/services/content",
    screens: ["وضوح", "فكرة", "معنى", "حضور", "تأثير", "قصة"],
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "visual",
    title: "التصوير والإنتاج البصري",
    desc: "ننتج الصور والفيديوهات بأسلوب مصمم للمنصات الرقمية، ويعكس هوية العلامة ويمنح محتواها حضورًا أقوى.",
    stat: "+12M",
    statLabel: "وصول للمحتوى والحملات البصرية",
    cta: "اكتشف الإنتاج البصري",
    href: "/services/visual",
    screens: ["التخطيط للمشهد", "التصوير", "المونتاج", "النتيجة النهائية"],
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "analytics",
    title: "تحليل الأداء والتحسين",
    desc: "نحوّل بيانات الحسابات والحملات إلى تقارير واضحة وتوصيات تساعد على تحسين المحتوى واتخاذ قرارات مبنية على نتائج فعلية.",
    stat: "3X",
    statLabel: "تحسّن في أداء المحتوى والحملات",
    cta: "اكتشف تحليل الأداء",
    href: "/services/analytics",
    screens: ["الوصول", "التفاعل", "نمو الحساب", "أفضل المحتويات", "توصية الخطوة التالية"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
    ],
  },
];

const OVERVIEW_STATS = [
  { value: "+500", label: "قطعة محتوى تم إنتاجها" },
  { value: "+40M", label: "إجمالي الوصول للمحتوى" },
  { value: "+200%", label: "متوسط نمو التفاعل" },
  { value: "3X", label: "تحسّن أداء المحتوى والحملات" },
];

const PROCESS = [
  { step: "01", title: "نفهم", desc: "نقرأ العلامة والجمهور قبل أن نبدأ.", tag: "اكتشاف" },
  { step: "02", title: "نخطط", desc: "نحوّل الفهم إلى مسار واضح ومقاس.", tag: "استراتيجية" },
  { step: "03", title: "نصنع", desc: "ننتج محتوى بصريًا ورسائل قابلة للتذكّر.", tag: "تنفيذ" },
  { step: "04", title: "نطوّر", desc: "نقيس الأداء ونحسّن ما يصنع الفرق.", tag: "نمو" },
];

const ORANGE = "hsl(18 88% 55%)";

/* ----------------------------- Animated stat ----------------------------- */

function parseStat(value: string) {
  const prefixMatch = value.match(/^[^0-9]*/);
  const suffixMatch = value.match(/[^0-9]*$/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const num = parseFloat(value.replace(prefix, "").replace(suffix, ""));
  return { prefix, suffix, num: Number.isNaN(num) ? 0 : num };
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { prefix, suffix, num } = parseStat(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-extrabold tabular-nums text-white md:text-6xl">
        {prefix && <span className="text-[hsl(18_88%_60%)]">{prefix}</span>}
        {count}
        {suffix && <span className="text-[hsl(18_88%_60%)]">{suffix}</span>}
      </p>
      <p className="mt-3 text-sm text-neutral-400 md:text-base">{label}</p>
    </div>
  );
}

/* --------------------------- Phone (single) ------------------------------ */

// The screen content for the currently-active service. Cropped inside the
// screen element only (`overflow-hidden` lives on the screen, never the shell).
function PhoneScreenContent({ feature }: { feature: Feature }) {
  return (
    <div className="absolute inset-0">
      <img
        src={feature.images[0]}
        alt={feature.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45" />

      {/* header */}
      <div className="absolute inset-x-0 top-0 px-5 pb-4 pt-16 text-right">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[hsl(18_88%_60%)]">
          صُنع
        </p>
        <p className="mt-1 text-sm font-bold leading-snug text-white drop-shadow">
          {feature.title}
        </p>
      </div>

      {/* screen labels */}
      <div className="absolute inset-x-0 bottom-[104px] px-5">
        <div className="flex flex-wrap justify-end gap-1.5">
          {feature.screens.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* stat */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-7">
        <div className="rounded-2xl bg-black/45 px-4 py-3 text-right backdrop-blur-md">
          <p className="text-lg font-extrabold text-[hsl(18_88%_60%)]">
            {feature.stat}
          </p>
          <p className="text-[11px] text-neutral-300">{feature.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

// A single realistic device: metallic shell, thick bezel, side buttons, a
// dynamic island, and a soft ground shadow. Only the screen content swaps.
function Phone({ feature }: { feature: Feature }) {
  return (
    <div className="relative">
      {/* very soft ground shadow */}
      <div
        aria-hidden
        className="absolute -bottom-5 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl"
      />

      {/* shell — metallic frame via gradient + realistic thickness (p-[11px]) */}
      <div className="relative h-[540px] w-[266px] rounded-[3rem] bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-900 p-[11px] shadow-[0_45px_80px_-35px_rgba(0,0,0,0.9)]">
        {/* side buttons */}
        <span
          aria-hidden
          className="absolute -left-[2px] top-[108px] h-7 w-[3px] rounded-l-sm bg-neutral-600"
        />
        <span
          aria-hidden
          className="absolute -left-[2px] top-[150px] h-12 w-[3px] rounded-l-sm bg-neutral-600"
        />
        <span
          aria-hidden
          className="absolute -right-[2px] top-[140px] h-16 w-[3px] rounded-r-sm bg-neutral-600"
        />

        {/* screen — the ONLY element that clips its content */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-black">
          {/* dynamic island */}
          <div
            aria-hidden
            className="absolute left-1/2 top-3 z-20 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5"
          />

          {/* crossfade between service screens (fade + rise + subtle scale) */}
          <AnimatePresence>
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.985 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <PhoneScreenContent feature={feature} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Feature card ------------------------------ */

// Text-only card: title → description → statistic → CTA. No phone, no number.
function FeatureCard({
  feature,
  index,
  isActive,
  setRef,
}: {
  feature: Feature;
  index: number;
  isActive: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    // Full-width card. Its background extends the whole width — the phone
    // overlay floats on top of it. Content is kept clear of the phone: on the
    // opposite side (desktop, via pl) and in the lower area (mobile, justify-end).
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
      style={{ willChange: "transform, opacity" }}
      className={`flex min-h-[94vh] w-full flex-col justify-end rounded-[28px] border p-8 pb-10 text-right backdrop-blur-sm transition-colors duration-500 md:min-h-[82vh] md:justify-center md:p-12 md:pl-[44%] ${
        isActive
          ? "border-[hsl(18_88%_55%)]/40 bg-white/[0.04]"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      {/* content block — the element observed for active detection */}
      <div ref={setRef} data-index={index}>
        <h3 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-400">
          {feature.desc}
        </p>

        {/* statistic — visually separated from the description */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-4xl font-extrabold text-[hsl(18_88%_60%)] md:text-5xl">
            {feature.stat}
          </p>
          <p className="mt-1 text-sm text-neutral-500">{feature.statLabel}</p>
        </div>

        {feature.id === "social" ? (
          <Link
            to="/services/social"
            className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[hsl(18_88%_55%)]/40 px-6 py-3 text-sm font-semibold text-[hsl(18_88%_60%)] transition-[transform,background-color,color] duration-200 ease-out hover:bg-[hsl(18_88%_55%)] hover:text-black active:scale-[0.97]"
          >
            <span>{feature.cta}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <a
            href="#contact"
            className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[hsl(18_88%_55%)]/40 px-6 py-3 text-sm font-semibold text-[hsl(18_88%_60%)] transition-[transform,background-color,color] duration-200 ease-out hover:bg-[hsl(18_88%_55%)] hover:text-black active:scale-[0.97]"
          >
            <span>{feature.cta}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* --------------------------- Services showcase ---------------------------- */

// One sticky phone paired with a scrolling stack of cards. An
// IntersectionObserver watching a thin band at the viewport centre decides
// which card is active; only the phone's screen content changes.
function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // The active zone differs by layout: a thin band at the viewport centre on
    // desktop (phone is centred), and a band lower down on mobile (below the
    // pinned phone, where the card content actually reads).
    const build = () => {
      observer?.disconnect();
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const rootMargin = isDesktop
        ? "-45% 0px -45% 0px"
        : "-60% 0px -25% 0px";
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number((entry.target as HTMLElement).dataset.index);
              if (!Number.isNaN(idx)) setActive(idx);
            }
          });
        },
        { rootMargin, threshold: 0 },
      );
      cardRefs.current.forEach((el) => el && observer!.observe(el));
    };

    build();
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("resize", build);
      observer?.disconnect();
    };
  }, []);

  return (
    // Two layers stacked in the SAME grid cell: the full-width card stack and,
    // on top of it, a sticky phone overlay. There is no phone column — the
    // cards run the full width and the phone floats over them (Bevel-style).
    <div className="mt-16 grid grid-cols-1 md:mt-24">
      {/* Card layer — full-width cards */}
      <div className="col-start-1 row-start-1 flex flex-col gap-6 md:gap-8">
        {FEATURES.map((f, i) => (
          <FeatureCard
            key={f.id}
            feature={f}
            index={i}
            isActive={i === active}
            setRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      {/* Phone overlay layer — same cell as the cards. The sticky container is
          bounded to roughly one card's height (not the full viewport), so the
          phone always lives INSIDE the card area and never spills past the
          first/last card. It stays centred, covering the seam between cards as
          they scroll, so a card→card change reads as happening inside the box.
          pointer-events-none so the cards' buttons stay clickable. */}
      <div className="pointer-events-none col-start-1 row-start-1">
        <div className="sticky top-[9vh] flex h-[82vh] items-start justify-center md:items-center md:justify-end md:pl-[7%]">
          {/* Mobile only: an opaque stage behind the phone so transitioning
              card text is hidden in the upper band and reads cleanly below it.
              Desktop keeps the phone fully transparent over the card. */}
          <div className="absolute inset-x-0 top-0 h-[56vh] bg-gradient-to-b from-[var(--esq-bg)] from-80% to-transparent md:hidden" />
          <div className="relative origin-top scale-[0.54] sm:scale-[0.64] md:origin-center md:scale-[0.82]">
            <Phone feature={FEATURES[active]} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Process journey ------------------------------ */

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
      delayChildren: 0.1,
      staggerChildren: 0.11,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

function ProcessStep({
  p,
  index,
  total,
  progress,
}: {
  p: { step: string; title: string; desc: string; tag: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // The node lights up orange while the step sits near the centre of the screen.
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const isLast = index === total - 1;
  // Mobile connector: this segment fills over its slice of the scroll progress.
  const segFill = useTransform(
    progress,
    [index / (total - 1), (index + 1) / (total - 1)],
    [0, 1],
  );

  const circleBase = `h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold tabular-nums transition-colors duration-500 ${
    active
      ? "border-[hsl(18_88%_55%)] bg-[hsl(18_88%_55%)]/15 text-[hsl(18_88%_60%)]"
      : "border-white/15 bg-[var(--esq-bg)] text-white/40"
  }`;

  return (
    <motion.li
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      style={{ willChange: "transform, opacity" }}
      className="relative flex gap-5 text-right md:block md:pt-16 md:text-center"
    >
      {/* Mobile rail: numbered node + vertical connector to the next step */}
      <div className="flex flex-col items-center md:hidden">
        <span className={`inline-flex ${circleBase}`}>{p.step}</span>
        {!isLast && (
          <div className="relative mt-2 w-px flex-1 bg-white/10">
            <motion.div
              style={{ scaleY: segFill, willChange: "transform" }}
              className="absolute inset-0 origin-top bg-[hsl(18_88%_55%)]/60"
            />
          </div>
        )}
      </div>

      {/* Desktop node: sits on the horizontal rail, centred above the content */}
      <span
        className={`absolute left-1/2 top-0 hidden -translate-x-1/2 md:inline-flex ${circleBase}`}
      >
        {p.step}
      </span>

      {/* Content */}
      <div className="flex-1 pb-8 last:pb-0 md:pb-0">
        <motion.h3
          variants={itemVariants}
          className="text-lg font-bold text-white md:mt-6 md:text-xl"
        >
          {p.title}
        </motion.h3>
        <motion.p
          variants={itemVariants}
          className="mt-2 text-sm leading-relaxed text-neutral-400"
        >
          {p.desc}
        </motion.p>
        <motion.span
          variants={itemVariants}
          className="mt-3 inline-block text-[11px] font-medium tracking-[0.15em] text-[hsl(18_88%_60%)]/80"
        >
          {p.tag}
        </motion.span>
      </div>
    </motion.li>
  );
}

/* --------------------------- Impact track -------------------------------- */
/* A winding track — dark outer edge + orange-gradient rail — that draws
   itself with the scroll, while three bold teaser lines rise into view. It
   frames the "journey" of the process below it. */

const TRACK_PATH =
  "M -40 132 C 250 100 560 118 842 168 C 1036 202 1040 324 848 358 C 620 398 372 372 196 406 C 26 438 24 556 212 584 C 522 616 902 590 1262 604";

function TrackPhrase({
  children,
  progress,
  range,
  className,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className: string;
}) {
  const y = useTransform(progress, range, ["115%", "0%"]);
  const opacity = useTransform(
    progress,
    [range[0], (range[0] + range[1]) / 2, range[1]],
    [0, 1, 1],
  );
  return (
    <div className={`absolute overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span
        style={{ y, opacity, textShadow: "0 6px 20px rgba(0,0,0,0.65)" }}
        className="block whitespace-nowrap text-[6.5vw] font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl"
      >
        {children}
      </motion.span>
    </div>
  );
}

function ImpactTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const draw = useTransform(scrollYProgress, [0.12, 0.55], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-14 w-full max-w-5xl overflow-hidden md:mt-20"
    >
      {/* warm depth glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 60% at 50% 46%, hsl(18 88% 55% / 0.14), transparent 72%)",
        }}
      />

      <svg viewBox="0 0 1200 600" className="w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="impact-track" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(18 92% 68%)" />
            <stop offset="55%" stopColor="hsl(18 90% 55%)" />
            <stop offset="100%" stopColor="hsl(14 90% 46%)" />
          </linearGradient>
        </defs>
        {/* outer dark edge — depth */}
        <motion.path
          d={TRACK_PATH}
          stroke="rgba(0,0,0,0.55)"
          strokeWidth="54"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: draw }}
        />
        {/* inner orange rail */}
        <motion.path
          d={TRACK_PATH}
          stroke="url(#impact-track)"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: draw }}
        />
      </svg>

      {/* Teaser lines — rise into view as the track passes */}
      <div className="pointer-events-none absolute inset-0" dir="ltr">
        <TrackPhrase
          progress={scrollYProgress}
          range={[0.3, 0.42]}
          className="left-[4%] top-[2%]"
        >
          Something big
        </TrackPhrase>
        <TrackPhrase
          progress={scrollYProgress}
          range={[0.4, 0.52]}
          className="left-1/2 top-[40%] -translate-x-1/2"
        >
          is coming down
        </TrackPhrase>
        <TrackPhrase
          progress={scrollYProgress}
          range={[0.5, 0.62]}
          className="right-[4%] top-[72%]"
        >
          the tracks
        </TrackPhrase>
      </div>
    </div>
  );
}

/* --------------------------------- Section -------------------------------- */

export default function IntelligenceSection() {
  // Scroll-linked intro: the title/description rise into place, hold, then lift
  // and fade as the header scrolls past. The description moves a touch faster
  // and slightly later than the title for a gentle parallax + lag.
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(introProgress, [0, 0.3, 0.62, 1], [40, 0, 0, -60]);
  const titleOpacity = useTransform(
    introProgress,
    [0, 0.28, 0.62, 0.9],
    [0, 1, 1, 0],
  );
  const descY = useTransform(introProgress, [0, 0.36, 0.62, 1], [56, 0, 0, -85]);
  const descOpacity = useTransform(
    introProgress,
    [0.06, 0.42, 0.62, 0.9],
    [0, 1, 1, 0],
  );

  // Process journey: the rail (vertical on mobile, horizontal on desktop) fills
  // as the section scrolls through the centre of the viewport.
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      id="services"
      dir="rtl"
      className="w-full scroll-mt-24 py-24 text-white md:py-32"
      style={{ background: "var(--esq-bg)" }}
    >
      <div className="mx-auto max-w-[1350px] px-6 md:px-8">
        {/* --------------------- Overview stats bar --------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 md:mb-32"
        >
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-4xl">
            أثر يُقاس بالأرقام
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-8 border-y border-white/10 py-12 md:grid-cols-4">
            {OVERVIEW_STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </motion.div>

        {/* --------------------------- Intro ---------------------------- */}
        <div ref={introRef} className="mx-auto max-w-2xl text-center">
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity, willChange: "transform, opacity" }}
            className="text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl"
          >
            نرافق علامتك في كل خطوة نحو النمو
          </motion.h2>
          <motion.p
            style={{ y: descY, opacity: descOpacity, willChange: "transform, opacity" }}
            className="mt-5 text-base leading-relaxed text-neutral-400"
          >
            من الفكرة إلى النتائج.
          </motion.p>
        </div>

        {/* -------- One sticky phone + scrolling service cards ------- */}
        <ServicesShowcase />

        {/* ----------------------- Process journey ------------------- */}
        <div className="mt-32 md:mt-40">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-3xl font-bold tracking-tight md:text-5xl"
          >
            كيف نصنع الأثر؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-sm text-center text-sm text-neutral-400"
          >
            رحلة واضحة من الفهم إلى النتيجة.
          </motion.p>

          {/* Winding track visual that draws with scroll */}
          <ImpactTrack />

          {/* The journey: vertical rail on mobile, horizontal rail on desktop */}
          <div ref={journeyRef} className="relative mt-16 md:mt-24">
            {/* Desktop horizontal rail (track + orange scroll progress) */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-[20px] hidden h-px bg-white/10 md:block"
            />
            <motion.div
              aria-hidden
              style={{ scaleX: journeyProgress, willChange: "transform" }}
              className="absolute inset-x-0 top-[20px] hidden h-px origin-right bg-[hsl(18_88%_55%)]/60 md:block"
            />

            <ol className="md:grid md:grid-cols-4 md:gap-x-8">
              {PROCESS.map((p, i) => (
                <ProcessStep
                  key={p.step}
                  p={p}
                  index={i}
                  total={PROCESS.length}
                  progress={journeyProgress}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
