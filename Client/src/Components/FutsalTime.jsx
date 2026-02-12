import { useEffect, useState, useContext } from "react";
import { timeSlots } from "../constants/TimeSlot.js";
import apiRequest from "../API REQUEST/apiRequest.js";
import useFetchUser from "../CustomHooks/useFetchUser.js";
import { SocketContext } from "../Context/SocketContext.jsx";
import { motion, time } from "framer-motion";
import { fadeInRight, staggerContainer } from "../animations/Variants.js";
import { toast } from "react-toastify";
import { LoaderContext } from "../Context/LoaderContext.jsx";
import { parseHour } from "../utils/timeUtils.js";

const FutsalTime = ({ selectDate }) => {
  const currentUser = useFetchUser();
  const { sendBooking, booking, socket } = useContext(SocketContext);
  const [showMore, setShowMore] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [changeBooking, setChangeBooking] = useState([]);
  const { showLoading, hideLoading } = useContext(LoaderContext);
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
        showLoading();
        const res = await apiRequest.get("/booking/all?date=" + date);
        setBookings(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error || "Error fetching bookings");
      } finally {
        hideLoading();
      }
    };
    fetchAllBookings();
  }, [date]);

  const handleBooking = async (startTime, id) => {
    if (!currentUser) {
      toast.error("You have to login/sign up for booking!");
      return;
    }
    const userChoice = confirm("Do you want to book this time slot?");

    if (!userChoice) return;

    try {
      showLoading();
      const checkAvail = await apiRequest.get(
        `/booking/check?date=${date}&startTime=${startTime}`,
      );

      if (!checkAvail.data.available) {
        toast.error("Sorry, this slot was just booked by someone else!");
        return;
      }

      await apiRequest.post("/booking/add", {
        userId: currentUser._id,
        startTime,
        date,
      });
      setChangeBooking((prev) => [...prev, id]);
      sendBooking(currentUser?._id, startTime, date);
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Failed to add booking!");
    } finally {
      hideLoading();
    }
  };

  const bookedTime = new Set(bookings?.map((b) => b.startTime));

  //show the time ahead of current time
  const requiredDay = selectDate.getDate(); //get the day from parent date
  const currentDay = new Date().getDate(); //get the today's day
  const currentHour = new Date().getHours();

  const visibleSlots =
    requiredDay > currentDay
      ? timeSlots
      : timeSlots.filter((t) => parseHour(t.startTime) > currentHour);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 transition-opacity px-4 relative">
      {requiredDay > currentDay && (
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm px-4 py-2 rounded-lg">
          <span>⚠️</span>
          <span>
            Today's booking slots are finished. Showing available slots for
            tomorrow.
          </span>
        </div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 "
      >
        {visibleSlots.map((t) => {
          const hasBooked =
            bookedTime.has(t.startTime) || changeBooking.includes(t.id);

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
