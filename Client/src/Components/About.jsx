import { blurIn, fadeLeft } from "../animations/Variants";
import aboutImg from "../assets/about.jpg";
import { useIsHome } from "../CustomHooks/useIsHome";
import { useScrollTop } from "../CustomHooks/useScrollTop";
import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Years Active" },
  { value: "2K+", label: "Bookings Made" },
  { value: "7AM", label: "Opens Daily" },
  { value: "9PM", label: "Last Slot" },
];

const About = () => {
  const isHome = useIsHome();
  useScrollTop();

  return (
    <div
      className={`w-full ${!isHome && " md:px-14 px-5 pt-25 pb-10 bg-black"}`}
    >
      {/* ── section label ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="w-6 h-px bg-[#00ff87]" />
        <span className="text-[#00ff87] text-xs font-semibold tracking-[0.25em] uppercase">
          Our Story
        </span>
      </motion.div>

      {/* ── main layout ── */}
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        {/* ── left: text ── */}
        <div className="md:w-[55%] space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
          >
            About <span className="text-[#00ff87]">Bibek Futsal</span>
            <br />
            <span className="text-white/25 italic font-light">ArenaX</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeLeft}
            className="text-white/60 md:text-[17px] leading-relaxed"
          >
            A premier futsal facility located in{" "}
            <span className="text-white font-semibold">Kathmandu, Nepal</span> —
            built for players who take the game seriously.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/60 md:text-[17px] leading-relaxed"
          >
            Our mission is to promote the love of football and futsal in the
            local community — offering a well-maintained arena where players can
            enjoy the game in a safe, professional, and friendly environment.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/60 md:text-[17px] leading-relaxed"
          >
            Whether you're a casual player or part of a team, our platform is
            designed to make your futsal experience{" "}
            <span className="text-white font-semibold">
              simple, enjoyable, and efficient
            </span>{" "}
            — with smooth booking, fair scheduling, and a controlled game
            atmosphere for all levels.
          </motion.p>

          {/* ── stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10"
          >
            {stats.map((s, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[#00ff87] text-xl md:text-2xl font-black">
                  {s.value}
                </p>
                <p className="text-white/40 text-xs tracking-wide">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── right: image ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={blurIn}
          className="md:w-[45%] w-full relative"
        >
          {/* green border accent */}
          <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[#00ff87]/40 rounded-tl-xl pointer-events-none z-10" />
          <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[#00ff87]/40 rounded-br-xl pointer-events-none z-10" />

          <img
            src={aboutImg}
            alt="About Bibek Futsal ArenaX"
            className="w-full h-[320px] md:h-[480px] object-cover rounded-2xl"
          />

          {/* overlay badge */}
          <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
            <p className="text-[#00ff87] text-xs font-semibold tracking-widest uppercase">
              Est. Kathmandu
            </p>
            <p className="text-white text-sm font-bold mt-0.5">
              Bibek Futsal ArenaX
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
