import { fadeUp } from "../animations/Variants";
import FutsalMap from "./FutsalMap";
import { motion } from "framer-motion";
import { useScrollTop } from "../CustomHooks/useScrollTop";

const inputClass = `
  w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm
  placeholder:text-white/25 focus:outline-none focus:border-[#00ff87]/50
  focus:bg-[#00ff87]/5 transition-all duration-300
`;

const Contact = () => {
  useScrollTop();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`w-full md:px-14 px-5 pt-25 pb-10 bg-black`}>

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
          Get in Touch
        </span>
      </motion.div>

      {/* ── heading ── */}
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-12"
      >
        Contact <span className="text-[#00ff87]">Us</span>
      </motion.h1>

      {/* ── two-col layout ── */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* ── form ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[45%]"
        >
          {/* form intro */}
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8">
            Have a question or feedback? Fill out the form and we'll get back to
            you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* name */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Bibek Bk"
                className={inputClass}
              />
            </div>

            {/* email */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* message */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your message here..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-fit bg-[#00ff87] text-black text-sm font-bold px-8 py-3 rounded-full
                         shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_32px_rgba(0,255,135,0.5)]
                         transition-all duration-300 cursor-pointer"
            >
              Send Message →
            </motion.button>
          </form>
        </motion.div>

        {/* ── map ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full md:w-[55%] space-y-4"
        >
          {/* map container */}
          <div className="w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10 relative">
            <FutsalMap />

            {/* corner accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#00ff87]/40 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#00ff87]/40 rounded-br-lg pointer-events-none" />
          </div>

          {/* open in maps link */}
          <a
            href="https://google.com/maps?q=27.8292,84.944"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40
                       hover:text-[#00ff87] transition-colors duration-300 group"
          >
            <span className="text-base">📍</span>
            <span className="group-hover:underline underline-offset-4">
              Open in Google Maps
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;