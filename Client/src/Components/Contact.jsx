import { useEffect } from "react";
import { fadeLeft, fadeUp } from "../animations/Variants";
import Connect from "../assets/getInTouchIcon.svg";
import { useIsHome } from "../CustomHooks/useIsHome";
import FutsalMap from "./FutsalMap";
import { motion } from "framer-motion";
import { useScrollTop } from "../CustomHooks/useScrollTop";

const Contact = () => {
  const isHome = useIsHome();

useScrollTop();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`w-full min-h-screen md:p-10 flex flex-col items-center gap-15 ${!isHome && "md:mt-15 md:mb-20 mt-30 px-5"}`}>
      <motion.h1 className="text-5xl  text-[#0cb455]" initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.3}} variants={fadeUp}>Contact Us</motion.h1>
     <div  className="md:flex gap-10 space-y-10">
       <motion.form initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true, amount: 0.1}} transition={{duration: 0.5}} className="flex flex-col gap-4 md:w-[50%]" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <h2 className=" flex gap-2 ">
            <span className="opacity-60 md:text-3xl text-xl tracking-widest">Get in Touch</span>{" "}
            <img src={Connect} alt="get in touch" className="w-10" />
          </h2>
          <span className="text-[#fc8b3a] md:text-[18px]">
            Have a question or feedback? Fill out the form below and we'll get
            back to you as soon as possible.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Write Your Name"
            className="border rounded p-2 w-[60%] outline-none text-[18px]"
          />
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Write Your Email"
            className="border rounded p-2 w-[60%] outline-none text-[18px]"
          />
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            placeholder="Write Your Message"
            required
            rows={4}
            className="border resize-none p-2 rounded outline-none text-[18px]"
          ></textarea>
          <button
            type="submit"
            className=" p-2 w-25 bg-[#ff6b00] hover:bg-[#ff6a00a0] outline-0 rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </motion.form>

      <div className="md:h-200 h-150 md:w-200">
        <FutsalMap />
         <a href="https://google.com/maps?q=27.8292,84.944" target='_blank' rel='noopener noreferrer' className='block text-center mt-4 text-blue-500 hover:underline text-xl'>📍 Open in Google Maps</a>
      </div>
     </div>
    </div>
  );
};

export default Contact;
