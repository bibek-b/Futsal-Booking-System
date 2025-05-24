import FutsalBg from "../assets/futsalbg.png";
import location from "../assets/location.svg";

const HeroPage = () => {
  return (
    <div className="flex items-center justify-center p-10 w-full space-x-20">
      <div className="flex flex-col items-center ">
        <h1 className="text-9xl">
          Gajuri <span className="text-[#0cb455]">Futsal</span>
        </h1>{" "}
        <i className="text-7xl">ArenaX</i>
        <div className="w-full flex items-centee justify-around gap-8 mt-15">
          <address className=" flex items-center  gap-7 ">
            <span className="flex gap-2 text-center mt-10 text-[#0cb455] text-[20px] ">
              <img src={location} alt="location" className="w-4" />
              Gajuri-2, Dhading
            </span>
          </address>
          <div>
            <button
              onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
              className=" mt-8  p-2 bg-[#0cb455] cursor-pointer outline-0 rounded text-[18px] hover:bg-[#00ff8886]"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div>
        <img
          src={FutsalBg}
          alt="Background Img"
          className="w-full h-fit rounded-4xl"
        />
      </div>
    </div>
  );
};

export default HeroPage;
