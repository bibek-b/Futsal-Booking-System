import BookingDetails from "../Components/BookingDetails";
import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  return (
    <div className="w-full h-[100%] flex flex-col items-center gap-12 p-6">
      <Link to="/">
        <div className="absolute left-30 top-30 text-center cursor-pointer">
          <h1 className="text-4xl ">
            Gajuri <span className="text-[#0cb455]">Futsal</span>
          </h1>{" "}
          <i className="text-3xl">ArenaX</i>
        </div>
      </Link>
      <div className="space-y-5 text-center">
        <header className=" font-extrabold text-5xl mt-5 text-[#958f8f]">
          Admin's Dashboard
        </header>
        <div className="flex flex-col gap-2 items-center justify-center space-x-4">
          <h3 className="text-[18px] font-extrabold">Select Date</h3>
          <input
            type="date"
            className="w-full outline-none p-2 rounded text-2xl cursor-pointer bg-[#ffd700] text-black hover:bg-yellow-400"
            value={selectDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                return;
              } else {
                setSelectDate(new Date(e.target.value));
              }
            }}
          />
        </div>
      </div>
      <table className="space-y-5 table-fixed rounded-lg overflow-hidden w-[80%] text-center border ">
        <caption className="font-bold text-3xl text-[#958f8f]">
          Futsal Booking Details
        </caption>
        <thead>
          <tr className=" text-2xl ">
            <th className=" px-4 py-2">Time</th>
            <th className="border">User Info</th>
            <th className="border">Status</th>
            <th className="border">Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <BookingDetails selectDate={selectDate} setSelectDate={setSelectDate} />
      </table>
    </div>
  );
};

export default Admin;
