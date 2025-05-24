import { useState } from "react";
import FutsalTime from "./FutsalTime";

const BookFutsal = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  return (
    <div
      className=" flex justify-center items-center flex-col gap-10 p-11  bg-[#1a1a1a] text-white w-full h-[100%]"
      name="bookFutsal"
    >
      <div className="space-y-4 ">
        <h1 className="text-5xl font-extrabold ">Book Futsal</h1>
        <div className="text-center">
          <h3 className="text-[17px] font-bold">Select Date</h3>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={selectDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                return;
              } else {
                setSelectDate(new Date(value));
              }
            }}
            className=" outline-none p-2 rounded text-2xl cursor-pointer bg-[#ffd700] text-black hover:bg-yellow-400 "
          />
          <div className="absolute right-35  text-[35px] font-bold animate-bounce bg-gradient-to-bl from-blue-600 to-green-600 bg-clip-text text-transparent">
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
      </div>
      <FutsalTime selectDate={selectDate} />
    </div>
  );
};

export default BookFutsal;
