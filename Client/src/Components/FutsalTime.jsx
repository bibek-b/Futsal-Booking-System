import { useEffect, useState, useContext } from "react";
import { timeSlots } from "../Library/TimeSlot.js";
import apiRequest from "../API REQUEST/apiRequest.js";
import useFetchUser from "../CustomHooks/useFetchUser.js";
import { SocketContext } from "../Context/SocketContext.jsx";

const FutsalTime = ({ selectDate }) => {
  const currentUser = useFetchUser();
  const { sendBooking, booking, socket } = useContext(SocketContext);
  const [showMore, setShowMore] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [changeBooking, setChangeBooking] = useState([]);

  const date = selectDate.toISOString().split("T")[0].replaceAll("-", "/");
  const todaysDate = new Date()
    .toISOString()
    .split("T")[0]
    .replaceAll("-", "/");

  //update booking status immediatly (socket)
  useEffect(() => {
    setBookings((prev) => [...prev, ...booking]);
  }, [booking]);
  useEffect(() => {
    if (!socket) return;

    const handleRemoveBooking = ({ startTime }) => {
      setBookings((prev) => prev.filter((p) => p.startTime !== startTime));
    };

    socket.on("receive-remove-booking", handleRemoveBooking);

    return () => {
      socket.off("receive-remove-booking", handleRemoveBooking);
    };
  }, [socket]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await apiRequest.get("/booking/all?date=" + date);
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBookings();
  }, [date]);

  const handleBooking = async (startTime, id) => {
    if (!currentUser) {
      alert("You have to login/sign up for booking!");
      return;
    }
    const userChoice = confirm("Do you want to book this time slot?");

    if (!userChoice) return;

    try {
      const checkAvail = await apiRequest.get(
        `/booking/check?date=${date}&startTime=${startTime}`
      );

      if (!checkAvail.data.available) {
        alert("Sorry, this slot was just booked by someone else!");
        return;
      }

      await apiRequest.post("/booking/add", {
        userId: currentUser._id,
        startTime,
        date,
      });
      setChangeBooking((prev) => [...prev, id]);
      sendBooking(currentUser?._id, startTime, date);
      alert("Booking successful!");
    } catch (error) {
      alert("Failed to add booking!");
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const bookedTime = new Set(bookings.map((b) => b.startTime));

  return (
    <div className="w-[90%] space-y-6 transition-opacity">
      <div className=" w-[100%] grid grid-cols-4 text-2xl gap-10 p-2">
        {timeSlots.map((t, index) => {
          const hasBooked =
            bookedTime.has(t.startTime) || changeBooking.includes(t.id);
          return (
            <div
              key={t.id}
              className={`text-center space-y-3 border p-3 rounded transform transition duration-500 ease-in-out ${
                showMore
                  ? "opacity-100 translate-y-0"
                  : index >= 8
                  ? "opacity-0 translate-y-4 hidden"
                  : ""
              }`}
            >
              <p>
                Time: {t.startTime} to {t.endTime}
              </p>
              <p className={`${hasBooked ? "text-[#ff3e3e]" : ""}`}>
                Status: {hasBooked ? "Booked" : "Available"}
              </p>
              {!hasBooked && date >= todaysDate && (
                <button
                  onClick={() => handleBooking(t.startTime, t.id)}
                  className={`bg-[#00ff87] rounded p-1 hover:bg-[#00ff8886] cursor-pointer outline-0 border-0 ${
                    status === "Booked" && "opacity-0 cursor-none"
                  }`}
                >
                  Book Now
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full text-center">
        <button
          className="border w-30 bg-[#ffffff] text-black rounded p-2 cursor-pointer transition-all duration-300"
          onClick={handleShowMore}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default FutsalTime;
