import { useEffect, useState } from "react";
import { timeSlots } from "../Library/TimeSlot.js";
import apiRequest from "../API REQUEST/apiRequest.js";
import useFetchUser from "../CustomHooks/useFetchUser.js";
import PendingIcon from "../assets/pending.svg";
import { useIsHome } from "../CustomHooks/useIsHome.js";

const MyBookings = () => {
  const currentUser = useFetchUser();
  const [userBookings, setUserBookings] = useState([]);
    const isHome = useIsHome();
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await apiRequest.get("/booking/" + currentUser?._id);
        setUserBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, [currentUser?._id]);

  const bookSet = new Set(userBookings.map((u) => u.startTime));

  //get the user only booked time from timeSlot array
  const userBookedSlots = timeSlots.filter((t) => bookSet.has(t.startTime));

  return (
    <div className={`bg-[#1a1a1a] text-white h-screen w-full ${!isHome && "md:mt-25 md:mb-20 mt-30 px-5"}`}>
      <div className="w-full p-2 mt-10 flex items-center justify-center flex-col space-y-10">
        <h1 className="text-5xl font-bold">Your Booking Details</h1>
        <div className="space-y-10 p-4  w-full flex items-center justify-center flex-col">
          <table className="table-fixed  w-[90%] text-center border  rounded-lg overflow-hidden text-2xl ">
            {" "}
            {/* */}
            <thead>
              <tr>
                {userBookings.length > 0 && (
                  <>
                    {" "}
                    <th className="border border-gray-300 px-4 py-2">
                      Time Slot
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Payment Info
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Booked Date
                    </th>
                  </>
                )}
              </tr>
            </thead>
            {userBookedSlots.map((u, index) => {
              const d = userBookings.find((t) => t.startTime === u.startTime);
              console.log(d);
              return (
                <tbody key={index}>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      {u.startTime} - {u.endTime}
                    </td>
                    <td
                      className={`border border-b-0 border-gray-300 px-4 py-2  font-bold text-[19px] flex items-center justify-center gap-3 `}
                    >
                      {" "}
                      Pending{" "}
                      <img
                        className="w-3"
                        src={PendingIcon}
                        alt="pending"
                      />{" "}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {d.date}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          {userBookings.length === 0 && (
            <span className="text-2xl">No Bookings.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
