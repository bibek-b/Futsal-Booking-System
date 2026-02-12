import { useState } from "react";
import FutsalTime from "./FutsalTime";
import { useIsHome } from "../CustomHooks/useIsHome";
import { motion } from "framer-motion";
import {  fadeUp, scaleUp } from "../animations/Variants";
import { useScrollTop } from "../CustomHooks/useScrollTop";
import { getInitialDate, getMinDate } from "../utils/dateUtils";

const BookFutsal = () => {
  const [selectDate, setSelectDate] = useState(getInitialDate());
  const isHome = useIsHome();

  useScrollTop();
  return (
    <div
      className={`flex justify-center items-center flex-col gap-10 ${!isHome && "mt-30"}   bg-[#1a1a1a] text-white w-full h-[100%]`}
    >
        <motion.div initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.5}} variants={fadeUp} className="text-center mb-10">
          <h1 className="text-5xl  text-[#00ff87]">Book Your Futsal Time</h1>
           <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Choose your date and time to reserve a slot on the pitch.
        </p>
        </motion.div>
         <motion.div initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.5}} variants={scaleUp} className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg w-full max-w-md mb-8">
        <label className="block mb-2 text-lg font-semibold text-gray-200">
          Select Date
        </label>
        <input
          type="date"
          min={getMinDate().toISOString().split("T")[0]}
          value={selectDate.toISOString().split("T")[0]}
          onChange={(e) => {
            const value = e.target.value;
            if (value) setSelectDate(new Date(value));
          }}
          className="w-full p-3 rounded-md bg-[#ffd700] text-black text-xl font-medium focus:outline-none hover:bg-yellow-400 transition"
        />
          <div className="mt-4 text-right text-sm text-gray-400">
          Today is:{" "}
          <span className="font-semibold text-white">
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
              .replaceAll(",", "")}
          </span>
        </div>
        </motion.div>
      <FutsalTime selectDate={selectDate} />
    </div>
  );
};

export default BookFutsal;
