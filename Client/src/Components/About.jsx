import faceBook from "../assets/facebookIcon.svg";
import instagram from "../assets/instagramIcon.svg";
import twitter from "../assets/twitterIcon.svg";
import youtube from "../assets/youtubeIcon.svg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full h-screen p-5 space-y-15 text-center text-[20px]">
      <h1 className="text-5xl font-extrabold">About Us</h1>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl">Who We Are?</h2>
        <p className="w-250">
          We are the proud owners and operators of Gajuri Futsal ArenaX, a
          premier futsal facility located in Gajuri, Dhading. Our mission is to
          promote the love of football and futsal in the local community by
          offering a well-maintained arena where players can enjoy the game in a
          safe, professional, and friendly environment. With a passion for the
          sport and a commitment to quality service, we strive to be the go-to
          destination for futsal enthusiasts in the region.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl">Our Goal...</h2>
        <p className="w-250">
          Our primary goal is to provide a professional, well-organized, and
          secure futsal environment for football and futsal enthusiasts. We aim
          to ensure a smooth booking experience, fair scheduling, and a
          controlled game atmosphere where players of all levels can enjoy
          competitive and recreational futsal matches. Whether you're a casual
          player or part of a team, our platform is designed to make your futsal
          experience simple, enjoyable, and efficient.
        </p>
      </div>
      <div className="w-full  flex items-center justify-center flex-col gap-3">
        <h2 className="text-3xl">Follow us</h2>
        <div className="flex gap-5 p-2 ">
          <Link>
            <img
              src={faceBook}
              alt="facebook"
              className="w-8 cursor-pointer transition-all duration-400  ease-in-out  hover:scale-125"
            />
          </Link>
          <Link>
            <img
              src={instagram}
              alt="instagram"
              className="w-8 cursor-pointer transition-all duration-400  ease-in-out  hover:scale-125"
            />
          </Link>
          <Link>
            <img
              src={twitter}
              alt="twitter"
              className="w-8 cursor-pointer transition-all duration-400  ease-in-out  hover:scale-125"
            />
          </Link>
          <Link>
            <img
              src={youtube}
              alt="youtube"
              className="w-10 cursor-pointer transition-all duration-400  ease-in-out  hover:scale-125"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
