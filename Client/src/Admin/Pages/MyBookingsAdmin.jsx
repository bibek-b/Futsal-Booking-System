import { useEffect, useState } from "react";
import apiRequest from "../../API REQUEST/apiRequest";
import useFetchUser from "../../CustomHooks/useFetchUser";
import { timeSlots } from "../../Library/TimeSlot";
import { Link } from "react-router-dom";

const MyBookingsAdmin = () => {
  const currentUser = useFetchUser();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await apiRequest.get("/booking/" + currentUser?._id);
        setUserBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBookings();
  }, [currentUser?._id]);

  const userTimes = new Set(userBookings.map((t) => t.startTime));

  //get only the times that is in user bookings from time slot
  const bookedTimes = timeSlots.filter((t) => userTimes.has(t.startTime));

  return (
    <div className="bg-[#1a1a1a] text-white h-screen w-full">
      <div className="w-full p-2 mt-10 flex items-center justify-center flex-col space-y-10">
        <Link to="/">
          <div className="absolute left-30 top-30 text-center cursor-pointer">
            <h1 className="text-4xl ">
              Gajuri <span className="text-[#0cb455]">Futsal</span>
            </h1>
            <i className="text-3xl">ArenaX</i>
          </div>
        </Link>
        <h1 className="text-5xl font-bold">Your Booking Details</h1>
        <div className="space-y-10 p-4  w-full flex items-center justify-center flex-col">
          <table className="table-fixed  w-[90%] text-center border  rounded-lg overflow-hidden text-2xl ">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Time Slot</th>
                <th className="border border-gray-300 px-4 py-2">
                  Booked Date
                </th>
              </tr>
            </thead>
            {bookedTimes.map((b, index) => {
              //get the each booking detail respective to each time
              const bookingsForTime = userBookings.filter(
                (t) => t.startTime === b.startTime
              );

              return bookingsForTime.map((t) => (
                <tbody key={index + 1}>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      {b.startTime} - {b.endTime}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {t.date}
                    </td>
                  </tr>
                </tbody>
              ));
            })}
          </table>
          {userBookings.length > 0 ? (
            <div className=" border p-2 rounded mt-3 text-[20px] border-[#ff3e3e]">
              <span className="font-extrabold">Note</span>:
              <span className="font-extralight">
                Booking Detail Will be removed after 7 days.
              </span>
            </div>
          ) : (
            <span className="text-2xl">No Bookings Found.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsAdmin;
