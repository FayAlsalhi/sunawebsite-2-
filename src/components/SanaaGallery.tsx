import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AmbientBackground from "@/components/AmbientBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------- About copy ------------------------------ */
/* The brand statement — revealed word-by-word, then held crisp and clear in
   the centre. Plays on صُنع (to make / to craft). */
const FILL_TEXT = "نَصنع الفكرة، ونَصنع المحتوى، ونَصنع الأثر الذي يبقى";

function FillText({ progress }: { progress: MotionValue<number> }) {
  const words = FILL_TEXT.split(" ");
  return (
    <p className="max-w-3xl text-center text-3xl font-bold leading-[1.4] tracking-tight text-white md:text-[3.6rem] md:leading-[1.25]">
      {words.map((word, i) => {
        // Reveal spread across the first ~55% of the scroll; the text then
        // stays fully lit and centred.
        const start = 0.06 + (i / words.length) * 0.5;
        const end = start + 0.5 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, [start, end], [0.16, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block">
            {word}&nbsp;
          </motion.span>
        );
      })}
    </p>
  );
}

/* -------------------------------- Tiles ---------------------------------- */
/* Small frames kept in the left / right gutters so the centre stays clear for
   the statement. They flow UP and shrink as the section scrolls. */

type Tile = {
  src: string;
  index: number;
  x: number; // left %
  y: number; // top %
  w: number; // width in vw
  speed: number; // parallax + depth multiplier
  z: number;
};

const TILES: Tile[] = [
  // Left gutter
  {
    src: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop",
    index: 1,
    x: 2,
    y: 30,
    w: 13,
    speed: 1.15,
    z: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=800&auto=format&fit=crop",
    index: 2,
    x: 7,
    y: 60,
    w: 12,
    speed: 0.85,
    z: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop",
    index: 3,
    x: 1,
    y: 88,
    w: 11,
    speed: 1.35,
    z: 2,
  },
  // Right gutter
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    index: 4,
    x: 86,
    y: 26,
    w: 12,
    speed: 0.95,
    z: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    index: 5,
    x: 80,
    y: 56,
    w: 13,
    speed: 1.2,
    z: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    index: 6,
    x: 87,
    y: 86,
    w: 11,
    speed: 0.8,
    z: 2,
  },
];

function GalleryTile({
  tile,
  progress,
  blurFactor,
}: {
  tile: Tile;
  progress: MotionValue<number>;
  blurFactor: number;
}) {
  // Extra per-tile upward drift on top of the whole-stage flow (parallax).
  const ty = useTransform(progress, [0, 1], [0, -55 * tile.speed]);
  // Shrinks in place (origin centre) as it recedes.
  const scale = useTransform(progress, [0, 1], [1, 0.52]);
  // Fades in at the seam with the hero, fades out as it climbs away — so
  // nothing ever pops in or cuts out abruptly.
  const opacity = useTransform(progress, [0, 0.1, 0.78, 1], [0, 1, 1, 0]);
  // Depth blur ramps up as the frame recedes.
  const maxBlur = tile.speed * blurFactor;
  const blur = useTransform(progress, [0, 0.22, 1], [0, 0, maxBlur]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${tile.x}%`,
        top: `${tile.y}%`,
        width: `${tile.w}vw`,
        y: useTransform(ty, (v) => `${v}%`),
        scale,
        opacity,
        zIndex: tile.z,
        willChange: "transform, opacity",
      }}
    >
      <span className="absolute -left-7 top-0 hidden font-mono text-[0.65rem] tracking-[0.3em] text-neutral-500 md:block">
        {String(tile.index).padStart(2, "0")}
      </span>
      <motion.div
        className="overflow-hidden rounded-[4px] ring-1 ring-white/10"
        style={{ filter, willChange: "filter" }}
      >
        <img
          src={tile.src}
          alt={`عمل بصري ${tile.index}`}
          loading="lazy"
          className="h-full w-full object-cover shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]"
        />
      </motion.div>
    </motion.div>
  );
}

/* ----------------------------- Corner mark ------------------------------- */
/* Tiny crosshair used to "frame" the statement — a quiet design-system cue. */
function Cross({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute text-[var(--suna)]/50 ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

/* -------------------------------- Section -------------------------------- */

export default function SanaaGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Lighter blur on small screens keeps the scroll smooth on mobile GPUs.
  const [blurFactor, setBlurFactor] = useState(4.5);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const apply = () => setBlurFactor(mql.matches ? 3 : 4.5);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // The whole tile field flows steadily UP as the section scrolls.
  const stageY = useTransform(scrollYProgress, [0, 1], ["0vh", "-78vh"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative h-[300vh] scroll-mt-24"
      style={{ background: "var(--esq-bg)" }}
    >
      {/* Sticky viewport that holds the evolving composition */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient drifting glows */}
        <AmbientBackground />

        {/* System-design meta labels */}
        <div className="pointer-events-none absolute inset-x-0 top-[112px] z-[15] flex items-center justify-between px-6 font-mono text-[0.62rem] uppercase tracking-[0.35em] text-neutral-500 md:px-12">
          <span dir="ltr">SUNA MEDIA — STUDIO</span>
          <span dir="ltr">24.7°N · 46.7°E</span>
        </div>

        {/* The upward-flowing tile field (kept to the gutters) */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: stageY, willChange: "transform" }}
            className="relative mx-auto h-full w-full max-w-[1600px]"
          >
            {TILES.map((tile) => (
              <GalleryTile
                key={tile.index}
                tile={tile}
                progress={scrollYProgress}
                blurFactor={blurFactor}
              />
            ))}
          </motion.div>
        </div>

        {/* Centre statement — sticky, crisp, nothing behind it */}
        <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center px-6">
          <div className="relative flex flex-col items-center py-10">
            {/* framing crosshairs */}
            <Cross className="-left-6 -top-2 md:-left-10" />
            <Cross className="-right-6 -top-2 md:-right-10" />
            <Cross className="-bottom-2 -left-6 md:-left-10" />
            <Cross className="-bottom-2 -right-6 md:-right-10" />

            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 text-xs font-semibold tracking-[0.4em] text-[var(--suna)]"
            >
              [ من نحن ]
            </motion.span>

            <FillText progress={scrollYProgress} />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-7 max-w-md text-center text-sm leading-relaxed text-neutral-400 md:text-base"
            >
              استوديو صُنع للمحتوى والإنتاج البصري — من الرياض، نصنع حضورًا رقميًا
              يليق بعلامتك.
            </motion.p>

            {/* brand wave motif */}
            <div className="mt-8 w-40 text-[var(--suna)]/70 md:w-52">
              <div className="suna-wave" style={{ height: "0.85rem" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
