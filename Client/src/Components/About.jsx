
import { blurIn, fadeLeft, fadeUp } from "../animations/Variants";
import aboutImg from "../assets/about.jpg";
import { useIsHome } from "../CustomHooks/useIsHome";
import { motion } from "framer-motion";

const About = () => {
  const isHome = useIsHome();

  return (
    <div className={`w-full md:h-screen md:p-5 md:flex  space-y-10 gap-20 ${!isHome && 'md:px-25 md:mt-25 mt-30 px-5'}`}>
      <div className="md:w-[70%]  space-y-10">
        <motion.h1 className="md:text-5xl text-4xl  font- text-[#0cb455] italic">
          About Bibek Futsal ArenaX
        </motion.h1>
        <motion.p initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.3}} variants={fadeLeft} className="text-left text-white/70 md:text-[18px]">
           <span className="font-bold text-white">Bibek Futsal ArenaX</span>, a
          premier futsal facility located in <span className="font-bold text-white">Kathmandu,Nepal</span>.
          <br /><br />
           Our mission is to
          promote the love of football and futsal in the local community by
          offering a well-maintained arena where players can enjoy the game in a
          safe, professional, and friendly environment. 
          <br /><br />
          With a passion for the
          sport and a commitment to quality service, we strive to be the go-to
          destination for futsal enthusiasts in the region. Our primary goal is
          to provide a professional, well-organized, and secure futsal
          environment for football and futsal enthusiasts. 
          <br /> <br />
          We aim to ensure a
           <span className="font-bold text-white"> smooth booking experience, fair scheduling</span>, and a controlled game
          atmosphere where players of all levels can enjoy competitive and
          recreational futsal matches.
          <br /><br />
           Whether you're a casual player or part of
          a team, our platform is designed to make your futsal experience
          simple, enjoyable, and efficient.
        </motion.p>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.3}} variants={blurIn}>
        <img
          src={aboutImg}
          alt="About"
          className="md:w-150 md:h-150 object-cover md:rounded-2xl"
        />
      </motion.div>

    
    </div>
  );
};

export default About;
