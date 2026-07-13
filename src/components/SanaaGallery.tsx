import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AmbientBackground from "@/components/AmbientBackground";

/* Text that fills in word-by-word as the user scrolls.
   Each word goes from 0.3 opacity to full 1.0 opacity. */
const FILL_TEXT = "نصنع تجارب بصرية جريئة تحوّل الأفكار إلى أثر";

function FillText({ progress }: { progress: MotionValue<number> }) {
  const words = FILL_TEXT.split(" ");
  return (
    <p className="max-w-4xl text-center text-3xl font-bold leading-snug tracking-tight text-white md:text-6xl">
      {words.map((word, i) => {
        // Spread the word reveal across the first part of the scroll, leaving
        // room afterwards for the block to rise and fade out.
        const start = (i / words.length) * 0.55;
        const end = start + 0.55 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, [start, end], [0.3, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block">
            {word}&nbsp;
          </motion.span>
        );
      })}
    </p>
  );
}




type Tile = {
  src: string;
  index: number;
  // Final (fully-scrolled) editorial position, in % of the stage.
  x: number; // left %
  y: number; // top %
  w: number; // width in vw
  // Direction the tile drifts out from the centered composition.
  from: [number, number];
  speed: number; // extra parallax multiplier
  z: number;
};

const TILES: Tile[] = [
  {
    src: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop",
    index: 1,
    x: 6,
    y: 4,
    w: 22,
    from: [-38, -26],
    speed: 1.15,
    z: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    index: 2,
    x: 70,
    y: 2,
    w: 24,
    from: [40, -30],
    speed: 0.85,
    z: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=1000&auto=format&fit=crop",
    index: 3,
    x: 34,
    y: 20,
    w: 30,
    from: [4, -8],
    speed: 0.6,
    z: 5,
  },
  {
    src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop",
    index: 4,
    x: 2,
    y: 42,
    w: 20,
    from: [-44, 6],
    speed: 1.3,
    z: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop",
    index: 5,
    x: 74,
    y: 44,
    w: 22,
    from: [46, 10],
    speed: 1.05,
    z: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    index: 6,
    x: 26,
    y: 60,
    w: 26,
    from: [-14, 40],
    speed: 0.75,
    z: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1000&auto=format&fit=crop",
    index: 7,
    x: 58,
    y: 68,
    w: 20,
    from: [30, 44],
    speed: 1.2,
    z: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    index: 8,
    x: 8,
    y: 74,
    w: 18,
    from: [-30, 48],
    speed: 0.95,
    z: 3,
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
  // Slight horizontal settle from the centered composition.
  const tx = useTransform(progress, [0, 1], [tile.from[0], 0]);
  // Images travel UP as the user scrolls, at ~120% speed (per-tile speed factor).
  const ty = useTransform(
    progress,
    [0, 1],
    [tile.from[1], tile.from[1] - 120 * tile.speed],
  );
  // Images are large & visible on load, then farther tiles (higher parallax
  // speed) recede a touch more — a subtle opacity falloff, not a fade-out.
  const endOpacity = 1 - (tile.speed - 0.6) * 0.22;
  const opacity = useTransform(
    progress,
    [0, 0.1, 0.8, 1],
    [0.85, 1, 1, endOpacity],
  );
  // As a tile drifts back it blurs progressively. Depth is driven by the
  // per-tile parallax speed, so farther tiles blur more than nearer ones.
  // Stays sharp at first, then ramps up smoothly; reverses with the scroll.
  const maxBlur = tile.speed * blurFactor;
  const blur = useTransform(progress, [0, 0.18, 1], [0, 0, maxBlur]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${tile.x}%`,
        top: `${tile.y}%`,
        width: `${tile.w}vw`,
        x: useTransform(tx, (v) => `${v}%`),
        y: useTransform(ty, (v) => `${v}%`),
        opacity,
        zIndex: tile.z,
        willChange: "transform, opacity",
      }}
    >
      <span className="absolute -left-8 top-0 hidden font-mono text-[0.7rem] tracking-widest text-neutral-400 md:block">
        {String(tile.index).padStart(2, "0")}
      </span>
      <motion.div
        className="overflow-hidden rounded-[2px]"
        style={{ filter, willChange: "filter" }}
      >
        <img
          src={tile.src}
          alt={`عمل بصري ${tile.index}`}
          loading="lazy"
          className="h-full w-full object-cover shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </motion.div>
  );
}

export default function SanaaGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Lighter blur on small screens keeps the scroll smooth on mobile GPUs.
  const [blurFactor, setBlurFactor] = useState(5.5);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const apply = () => setBlurFactor(mql.matches ? 3.5 : 5.5);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Whole composition starts large (zoomed in) and shrinks as the user scrolls.
  const stageScale = useTransform(scrollYProgress, [0, 1], [1.6, 0.8]);
  // Text enters just below the viewport centre, then rises steadily and fades
  // out as it climbs — motion stays fully linked to scroll progress.
  const textY = useTransform(scrollYProgress, [0, 1], ["14vh", "-52vh"]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9, 1],
    [1, 1, 0, 0],
  );


  return (
    <section
      ref={ref}
      className="relative h-[320vh]"
      style={{ background: "var(--esq-bg)" }}
    >

      {/* Sticky viewport that holds the evolving composition */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient drifting glows */}
        <AmbientBackground />

        {/* The evolving image stage */}

        <motion.div
          style={{ scale: stageScale }}
          className="relative mx-auto h-full w-full max-w-[1500px]"
        >
          <div className="relative h-[130vh] w-full">
            {TILES.map((tile) => (
              <GalleryTile
                key={tile.index}
                tile={tile}
                progress={scrollYProgress}
                blurFactor={blurFactor}
              />
            ))}
          </div>
        </motion.div>

        {/* Fill-in text: starts below centre, rises and fades with the scroll */}
        <motion.div
          style={{ y: textY, opacity: textOpacity, willChange: "transform, opacity" }}
          className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center px-6"
        >
          <FillText progress={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  );
}
