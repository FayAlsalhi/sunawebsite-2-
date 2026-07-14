import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/services/social")({
  head: () => ({
    meta: [
      { title: "إدارة حسابات التواصل الاجتماعي — صُنع" },
      {
        name: "description",
        content:
          "ندير حساباتك من الاستراتيجية وصناعة المحتوى إلى النشر وقراءة الأداء، لنحوّل المتابعين إلى مبيعات.",
      },
    ],
  }),
  component: SocialService,
});

const EASE = [0.16, 1, 0.3, 1] as const;
const ORANGE = "hsl(18 88% 55%)";

/* ============================ HERO · Make Sales ============================ */

function BagIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

type Order = { items: number; price: string };

const ORDERS: Order[] = [
  { items: 3, price: "128.00" },
  { items: 1, price: "49.90" },
  { items: 5, price: "312.50" },
  { items: 2, price: "86.00" },
  { items: 4, price: "204.75" },
  { items: 1, price: "59.00" },
];

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="flex w-[280px] items-center gap-3 rounded-[1.6rem] bg-white p-3.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.28)] ring-1 ring-black/5 md:w-[320px]">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
        <BagIcon />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[15px] font-semibold text-neutral-900">
            New order
          </span>
          <span className="text-xs text-neutral-400">Just now</span>
        </div>
        <p className="mt-0.5 text-sm text-neutral-500">
          {order.items} item{order.items > 1 ? "s" : ""} for ${order.price}
        </p>
      </div>
    </div>
  );
}

const FLOW = [
  { x: -34, rot: -4, delay: 0.0 },
  { x: 42, rot: 3, delay: 0.95 },
  { x: -8, rot: -2, delay: 1.9 },
  { x: 58, rot: 5, delay: 2.85 },
  { x: -58, rot: -3, delay: 3.8 },
  { x: 22, rot: 2, delay: 4.75 },
];

function FlowCard({
  order,
  x,
  rot,
  delay,
}: {
  order: Order;
  x: number;
  rot: number;
  delay: number;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        style={{ x, rotate: rot, willChange: "transform, opacity" }}
        initial={{ y: 260, opacity: 0, scale: 0.9 }}
        animate={{
          y: [260, 60, -220, -460],
          opacity: [0, 1, 1, 0],
          scale: [0.9, 1.03, 1, 0.98],
        }}
        transition={{
          duration: 6,
          delay: 1.1 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.22, 0.72, 1],
        }}
      >
        <OrderCard order={order} />
      </motion.div>
    </div>
  );
}

function MakeSalesHero() {
  return (
    <section
      dir="ltr"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "#f1f1ef" }}
    >
      {/* slowly rising dot pattern */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        animate={{ backgroundPositionY: ["0px", "-480px"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      {/* centre depth light */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 44%, rgba(255,255,255,0.95), rgba(241,241,239,0) 72%)",
        }}
      />

      {/* Back link */}
      <Link
        to="/"
        className="absolute right-6 top-6 z-30 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 md:right-10 md:top-8"
      >
        ← صُنع
      </Link>

      {/* Make Sales */}
      <h1
        className="relative z-10 select-none text-center font-black leading-[0.92] tracking-tight text-neutral-900"
        style={{ textShadow: "0 12px 34px rgba(0,0,0,0.14)" }}
      >
        <motion.span
          className="block text-[19vw] md:text-[13rem]"
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          Make
        </motion.span>
        <motion.span
          className="block text-[19vw] md:text-[13rem]"
          style={{ color: ORANGE }}
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 210, damping: 11 }}
        >
          Sales
        </motion.span>
      </h1>

      {/* Flowing order cards (in front of the text) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        {FLOW.map((f, i) => (
          <FlowCard
            key={i}
            order={ORDERS[i % ORDERS.length]}
            x={f.x}
            rot={f.rot}
            delay={f.delay}
          />
        ))}
      </div>

      {/* Arabic subline */}
      <motion.p
        dir="rtl"
        className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center text-sm text-neutral-500 md:text-base"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
      >
        إدارة حسابات تُحوِّل المتابعين إلى مبيعات.
      </motion.p>
    </section>
  );
}

/* ================================ BODY ==================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {n}
      <span className="text-[hsl(18_88%_60%)]">{suffix}</span>
    </span>
  );
}

const INCLUDES = [
  {
    t: "استراتيجية الحساب",
    d: "نقرأ العلامة والجمهور والمنافسين، ونبني خطة نمو واضحة قابلة للقياس.",
  },
  {
    t: "تقويم النشر",
    d: "جدول محتوى منظّم لكل منصة، بأوقات نشر مدروسة تزيد الوصول والتفاعل.",
  },
  {
    t: "صناعة المحتوى",
    d: "تصميم ونصوص وفيديو يعبّر عن شخصية العلامة ويجذب الجمهور المناسب.",
  },
  {
    t: "إدارة المجتمع",
    d: "ردود ومتابعة يومية للتعليقات والرسائل تبني علاقة وثقة مع جمهورك.",
  },
  {
    t: "الحملات المدفوعة",
    d: "استهداف دقيق وتحسين مستمر يحوّل الميزانية إلى نتائج فعلية.",
  },
  {
    t: "تقارير الأداء",
    d: "تقارير شهرية واضحة بأهم المؤشرات وتوصيات الخطوة التالية.",
  },
];

const STEPS = [
  { n: "01", t: "نفهم", d: "نغوص في علامتك وأهدافك وجمهورك." },
  { n: "02", t: "نخطّط", d: "نحوّل الفهم إلى استراتيجية وتقويم محتوى." },
  { n: "03", t: "نصنع وننشر", d: "ننتج المحتوى وننشره ونديره يوميًا." },
  { n: "04", t: "نقيس ونطوّر", d: "نحلّل الأداء ونحسّن ما يصنع الفرق." },
];

function Body() {
  return (
    <div dir="rtl" className="text-white" style={{ background: "var(--esq-bg)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        {/* Intro */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.3em] text-[hsl(18_88%_55%)]"
        >
          [ إدارة الحسابات ]
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-4 max-w-3xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl"
        >
          نحوّل حساباتك إلى محرّك نموٍّ حقيقي
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          ندير حساباتك من الاستراتيجية وصناعة المحتوى إلى النشر وقراءة الأداء،
          لنصنع حضورًا يعكس قيمة علامتك ويقرّبها من جمهورها.
        </motion.p>

        {/* Includes */}
        <div className="mt-20 grid grid-cols-1 gap-4 md:mt-28 md:grid-cols-3 md:gap-6">
          {INCLUDES.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: EASE }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-7 text-right backdrop-blur-sm transition-colors duration-300 hover:border-[hsl(18_88%_55%)]/40"
            >
              <span className="text-sm font-bold text-[hsl(18_88%_60%)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {it.d}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-1 gap-10 border-y border-white/10 py-14 text-center md:mt-32 md:grid-cols-3">
          {[
            { v: 40, s: "M+", l: "وصول للمحتوى المُدار" },
            { v: 200, s: "%+", l: "متوسط نمو التفاعل" },
            { v: 500, s: "+", l: "قطعة محتوى منشورة" },
          ].map((st) => (
            <div key={st.l}>
              <p className="text-5xl font-extrabold text-white md:text-6xl">
                <Counter value={st.v} suffix={st.s} />
              </p>
              <p className="mt-3 text-sm text-neutral-400">{st.l}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-24 md:mt-32">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-3xl font-bold tracking-tight md:text-5xl"
          >
            كيف نُدير حسابك؟
          </motion.h2>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="text-right"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(18_88%_55%)]/40 text-sm font-bold tabular-nums text-[hsl(18_88%_60%)]">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-28 rounded-[2rem] border border-white/10 bg-white/[0.02] px-8 py-16 text-center md:mt-36 md:py-20"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl">
            جاهزون لرفع حساباتك؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-neutral-400">
            نبدأ بفهم علامتك، ثم نصنع خطة إدارة ومحتوى تُحوِّل المتابعين إلى نتائج.
          </p>
          <a
            href="mailto:hello@suna.studio"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(18_88%_55%)] px-8 py-4 text-sm font-bold text-black transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.97]"
          >
            <span>تواصل وابدأ معنا</span>
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
          </a>
          <div className="mt-8">
            <Link
              to="/"
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              العودة للرئيسية →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================ PAGE ==================================== */

function SocialService() {
  return (
    <main>
      <MakeSalesHero />
      <Body />
    </main>
  );
}
