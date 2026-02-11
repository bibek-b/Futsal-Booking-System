import location from "../assets/location.svg";
import { motion } from "framer-motion";

const text1 = "Bibek";
const text2 = "Futsal";

const HeroPage = () => {
  return (
    <div>
      <div  className="flex p-10 space-x-20 absolute top-1/3 md:left-1/4 left-2">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="md:text-9xl text-4xl ">
            {text1.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.3 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
            {text2.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (text1.length + i) * 0.3 }}
                className="text-[#0cb455] inline-block"
              >
                {char}
              </motion.span>
            ))}
            {/* {char} */}
          </h1>{" "}
          <motion.h2
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 2 }}
            className="md:text-7xl text-5xl  italic"
          >
            ArenaX
          </motion.h2>
          <div className="w-full flex items-center md:justify-between gap-20 mt-15">
            <address className=" flex items-center  md:gap-7 ">
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex gap-1 text-center mt-10 text-sm md:text-[20px] "
              >
                <img src={location} alt="location" className="md:w-8 w-12" />
                Kathmandu, Nepal
              </motion.span>
            </address>
            <div>
              <motion.button
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                onClick={() =>
                  window.scrollTo({ top: 1500, behavior: "smooth" })
                }
                className=" mt-8  p-2 bg-[#0cb455] cursor-pointer outline-0  w-25  rounded md:text-[18px] hover:bg-[#189b5e]"
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </div>

        {/* <div className="h-">
        <img
          src={arenaBg}
          alt="Background Img"
          className=" "
        />
      </div> */}
      </div>
    </div>
  );
};

export default HeroPage;
