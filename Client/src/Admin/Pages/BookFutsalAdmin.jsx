import FutsalTime from "../Components/FutsalTime";

import { Link } from "react-router-dom";

const BookFutsalAdmin = () => {
  return (
    <div
      className=" flex justify-center items-center flex-col gap-10 p-11  bg-[#1a1a1a] text-white w-full h-[100%]"
      name="bookFutsal"
    >
      <Link to="/">
        <div className="absolute left-30 top-30 text-center cursor-pointer">
          <h1 className="text-4xl ">
            Gajuri <span className="text-[#0cb455]">Futsal</span>
          </h1>{" "}
          <i className="text-3xl">ArenaX</i>
        </div>
      </Link>
      <div className="space-y-4 flex">
        <h1 className="text-5xl font-extrabold ">Book Futsal</h1>
        <div className="absolute right-35 top-45 text-[35px] font-bold animate-bounce bg-gradient-to-bl from-blue-600 to-green-600 bg-clip-text text-transparent">
          {new Date()
            .toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            .replaceAll(",", "")}
        </div>
      </div>
      <FutsalTime />
    </div>
  );
};

export default BookFutsalAdmin;
