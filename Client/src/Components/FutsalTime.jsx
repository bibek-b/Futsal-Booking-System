import { useEffect, useState, useContext } from "react";
import { timeSlots } from "../Library/TimeSlot.js";
import apiRequest from "../API REQUEST/apiRequest.js";
import useFetchUser from "../CustomHooks/useFetchUser.js";
import { SocketContext } from "../Context/SocketContext.jsx";
import { motion } from "framer-motion";
import { fadeInRight, staggerContainer } from "../animations/Variants.js";

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


  const bookedTime = new Set(bookings?.map((b) => b.startTime));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 transition-opacity px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.1}} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {timeSlots.map((t, index) => {
          const hasBooked =
            bookedTime.has(t.startTime) || changeBooking.includes(t.id);
          {/* const showSlot = showMore || index < 8;

          if (!showSlot) return null; */}

          return (
            <motion.div
            variants={fadeInRight}
              key={t.id}
              className={`flex flex-col justify-between items-center text-center space-y-3 p-4 rounded-lg shadow-md transition-transform duration-300 ${
                hasBooked
                  ? "bg-[#2a2a2a] text-gray-500"
                  : "bg-[#1f1f1f] hover:scale-105 hover:shadow-xl"
              }`}
            >
              <p className="text-xl font-semibold text-white">
                {t.startTime} - {t.endTime}
              </p>

              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  hasBooked
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white animate-pulse"
                }`}
              >
                {hasBooked ? "Booked" : "Available"}
              </span>

              {!hasBooked && date >= todaysDate && (
                <button
                  onClick={() => handleBooking(t.startTime, t.id)}
                  className="mt-2 bg-[#00ff87] text-black px-4 py-2 rounded hover:bg-[#00ff8886] transition cursor-pointer"
                >
                  Book Now
                </button>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Show More Button */}
      {/* <div className="text-center">
        <button
          className="border border-white bg-white text-black rounded px-6 py-2 hover:bg-gray-200 transition-all duration-300"
          onClick={handleShowMore}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div> */}
    </div>
  );
};

export default FutsalTime;
