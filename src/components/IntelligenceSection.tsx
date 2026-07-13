import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

/* ------------------------------ Phone screen ----------------------------- */

function PhoneScreen({ feature }: { feature: Feature }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % feature.images.length),
      2600
    );
    return () => clearInterval(t);
  }, [feature.images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-950">
      {/* real image slideshow */}
      {feature.images.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt={feature.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.08 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

      {/* header */}
      <div className="absolute inset-x-0 top-0 px-5 pb-4 pt-8 text-right">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[hsl(18_88%_60%)]">
          صُنع
        </p>
        <p className="mt-1 text-sm font-bold leading-snug text-white drop-shadow">
          {feature.title}
        </p>
      </div>

      {/* footer stat */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
        <div className="rounded-2xl bg-black/40 px-4 py-3 text-right backdrop-blur-md">
          <p className="text-lg font-extrabold text-[hsl(18_88%_60%)]">
            {feature.stat}
          </p>
          <p className="text-[11px] text-neutral-300">{feature.statLabel}</p>
        </div>
        {/* dots */}
        <div className="mt-3 flex justify-center gap-1.5">
          {feature.images.map((src, i) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-5 bg-[hsl(18_88%_55%)]" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Phone({ feature }: { feature: Feature }) {
  return (
    <div className="relative h-[520px] w-[260px] shrink-0 rounded-[2.6rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
      <div className="h-full w-full overflow-hidden rounded-[2rem]">
        <PhoneScreen feature={feature} />
      </div>
    </div>
  );
}

/* ----------------------------- Feature card ------------------------------ */

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
      style={{ willChange: "transform, opacity" }}
      className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:flex-row-reverse md:items-center md:gap-12 md:p-12"
    >
      {/* text side (right in RTL) */}
      <div className="flex-1 text-right">
        <span className="mr-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(18_88%_55%)]/40 text-sm font-bold text-[hsl(18_88%_60%)]">
          0{index + 1}
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-white md:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-400 md:mr-auto">
          {feature.desc}
        </p>

        <div className="mt-8 flex items-baseline justify-end gap-3">
          <span className="text-sm text-neutral-500">{feature.statLabel}</span>
          <span className="text-3xl font-extrabold text-[hsl(18_88%_60%)] md:text-4xl">
            {feature.stat}
          </span>
        </div>

        <a
          href="#contact"
          className="group mt-8 inline-flex w-fit items-center gap-2 self-start rounded-full border border-[hsl(18_88%_55%)]/40 px-6 py-3 text-sm font-semibold text-[hsl(18_88%_60%)] transition-[transform,background-color,color] duration-200 ease-out hover:bg-[hsl(18_88%_55%)] hover:text-black active:scale-[0.97]"
        >
          <span>{feature.cta}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* phone inside the box (left) */}
      <Phone feature={feature} />
    </motion.div>
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

        {/* -------- Cards with a real phone inside each box ------- */}
        <div className="mt-16 flex flex-col gap-8 md:mt-24">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>

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

          {/* The journey: vertical rail on mobile, horizontal rail on desktop */}
          <div ref={journeyRef} className="relative mt-14 md:mt-24">
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

        {/* ----------------------- CTA ------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center md:mt-32"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            جاهزين نبني حضور يليق فيكم؟
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
            نبدأ بفهم علامتك وأهدافك، ثم نصنع خطة محتوى وحملات تترك أثرًا حقيقيًا.
          </p>
          <a
            href="mailto:hello@suna.studio"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(18_88%_55%)] px-8 py-4 text-sm font-bold text-black transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.97]"
          >
            <span>تواصل وابدأ معنا</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
