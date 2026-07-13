import { motion } from "framer-motion";

/**
 * Ambient animated background — slowly drifting, softly glowing orbs.
 * Sits behind content (z-0) to give the dark sections a smooth, premium feel.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Orange glow — top left */}
      <motion.div
        className="absolute -left-[10%] -top-[10%] h-[45vw] w-[45vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsl(18 88% 55% / 0.35), transparent 70%)",
        }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Warm ember glow — bottom right */}
      <motion.div
        className="absolute -bottom-[15%] -right-[10%] h-[50vw] w-[50vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, hsl(18 88% 45% / 0.28), transparent 70%)",
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, -40, -70, 0], scale: [1, 1.1, 1.2, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cool subtle glow — center drift */}
      <motion.div
        className="absolute left-[40%] top-[35%] h-[35vw] w-[35vw] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.06), transparent 70%)",
        }}
        animate={{ x: [0, 80, -60, 0], y: [0, -60, 40, 0], scale: [1, 1.25, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
