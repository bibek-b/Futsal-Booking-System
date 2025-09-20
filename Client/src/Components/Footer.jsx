import faceBook from "../assets/facebookIcon.svg";
import instagram from "../assets/instagramIcon.svg";
import twitter from "../assets/twitterIcon.svg";
import { Link, useLocation } from "react-router-dom";
import message from "../assets/message.svg";
import phone from "../assets/phone.svg";
import locationIcon from "../assets/location.svg";
import { useIsHome } from "../CustomHooks/useIsHome";


const Footer = () => {
  const date = new Date();
  const isHome = useIsHome();
  const location = useLocation();

  const isBookFutsalPath = location.pathname == "/bookFutsal"

  return (
    <div className={`relative bg-gradient-to-t  from-[#0a1f1c] to-[#000000] min-h-90 space-y-5 ${(!isHome && isBookFutsalPath) && "mt-25 "}`}>
     <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-full">
  <svg
    className="w-full h-[100px]"
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
  >
    <path
      d="M0.00,49.98 C150.00,150.00 349.30,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      style={{ fill: '#000000' }}
    ></path>
  </svg>
</div>
      <div className="w-full  flex items-center justify-center flex-col p-10 gap-6">
        <div className="flex items-center flex-col gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[#0cb455] md:text-7xl text-4xl">Gajuri Futsal</span>
            <span className="text-5xl text-[#fec706]">ArenaX</span>
          </div>
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
          </div>
        </div>

          {/* <h2>Contact Info</h2> */}

          <div className="text-xl space-y-2">
            <div className="flex gap-2">
              <img src={locationIcon} alt="Location" className="w-8 h-8" />
              <span>Gajuri-1, Dhading, Nepal</span>
            </div>
            <div className="flex gap-2">
              <img src={message} alt="Message" className="w-8 h-8" />
              <span>info@gajurifutsalarena.com</span>
            </div>
            <div className="flex gap-2">
              <img src={phone} alt="phone" className="w-8 h-8" />
              <span>01-839994/01-6382047</span>
            </div>
          </div>
      </div>
      <div className="flex flex-col items-center justify-center p-5 md:text-[18px] gap-2 ">
        <div className="h-px bg-[#0cb455] w-[80%]" />
        Copyright &copy; Gajuri Futsal ArenaX, {date.getFullYear()}
      </div>
    </div>
  );
};

export default Footer;
