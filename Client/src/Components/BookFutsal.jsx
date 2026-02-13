import { useState } from "react";
import FutsalTime from "./FutsalTime";
import { useIsHome } from "../CustomHooks/useIsHome";
import { motion } from "framer-motion";
import { fadeUp, scaleUp } from "../animations/Variants";
import { useScrollTop } from "../CustomHooks/useScrollTop";
import { getInitialDate, getMinDate } from "../utils/dateUtils";

const BookFutsal = () => {
  const [selectDate, setSelectDate] = useState(getInitialDate());
  const isHome = useIsHome();
  useScrollTop();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`w-full ${!isHome && " md:px-14 px-5 pt-25 pb-10 bg-black"}`}>

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
          Reserve a Slot
        </span>
      </motion.div>

      {/* ── heading ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Book Your{" "}
          <span className="text-[#00ff87]">Futsal</span> Time
        </h1>
        <p className="text-white/40 text-base md:text-lg mt-3 max-w-lg">
          Choose your date and reserve a slot on the pitch. Real-time availability.
        </p>
      </motion.div>

      {/* ── date picker card ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={scaleUp}
        className="w-full max-w-sm mb-12"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#00ff87]/30 transition-all duration-300">

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white/70 tracking-wide uppercase">
              Select Date
            </label>
            <span className="text-xs text-white/30">{formattedDate}</span>
          </div>

          <input
            type="date"
            min={getMinDate().toISOString().split("T")[0]}
            value={selectDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const value = e.target.value;
              if (value) setSelectDate(new Date(value));
            }}
            className="w-full px-4 py-3 rounded-xl bg-[#00ff87] text-black text-base font-bold
                       focus:outline-none focus:ring-2 focus:ring-[#00ff87]/50
                       hover:bg-[#00ff87]/85 transition-all duration-300 cursor-pointer
                       [color-scheme:light]"
          />

          {/* selected date display */}
          <div className="flex items-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-xs text-white/40">
              Viewing slots for{" "}
              <span className="text-white/70 font-semibold">
                {selectDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── time slots ── */}
      <FutsalTime selectDate={selectDate} />
    </div>
  );
};

export default BookFutsal;