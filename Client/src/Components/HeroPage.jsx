import location from "../assets/location.svg";
import { motion } from "framer-motion";

const text1 = "Bibek";
const text2 = "Futsal";

const HeroPage = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── background effects ── */}
      <div className="absolute inset-0 bg-black" />

      {/* green radial glow bottom-left */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#00ff87]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── content ── */}
      <div className="relative z-10 px-6 md:px-20 pt-32 pb-20 max-w-5xl">

        {/* eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-[#00ff87]/30 bg-[#00ff87]/5 text-[#00ff87] text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
          Now Accepting Bookings
        </motion.div>

        {/* main heading */}
        <h1 className="text-6xl md:text-[7.5rem] font-black leading-none tracking-tight mb-4">
          {text1.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="inline-block text-white"
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
          {text2.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (text1.length + i) * 0.07 }}
              className="inline-block text-[#00ff87]"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* ArenaX */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-light italic text-white/20 tracking-widest mb-12"
        >
          ArenaX
        </motion.h2>

        {/* divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ originX: 0 }}
          className="w-24 h-[2px] bg-gradient-to-r from-[#00ff87] to-transparent mb-10"
        />

        {/* bottom row */}
        <div className="flex flex-wrap items-center gap-6">

          {/* location */}
          <motion.address
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="not-italic flex items-center gap-2 text-gray-400 text-sm md:text-base"
          >
            <img src={location} alt="location" className="w-4 h-4 opacity-60" />
            Kathmandu, Nepal
          </motion.address>

          {/* separator dot */}
          <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 1500, behavior: "smooth" })}
            className="relative group bg-[#00ff87] text-black font-bold text-sm md:text-base px-8 py-3 rounded-full cursor-pointer shadow-[0_0_24px_rgba(0,255,135,0.35)] hover:shadow-[0_0_36px_rgba(0,255,135,0.55)] transition-all duration-300"
          >
            Book Now
            {/* arrow */}
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.button>

          {/* ghost secondary CTA */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            onClick={() => window.scrollTo({ top: 760, behavior: "smooth" })}
            className="text-sm text-gray-500 hover:text-white underline underline-offset-4 transition-colors duration-300 cursor-pointer"
          >
            Learn more
          </motion.button>
        </div>
      </div>

      {/* ── decorative number ── */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute right-8 bottom-12 text-[180px] md:text-[260px] font-black text-white/[0.03] select-none pointer-events-none leading-none"
      >
        01
      </motion.span>
    </div>
  );
};

export default HeroPage;