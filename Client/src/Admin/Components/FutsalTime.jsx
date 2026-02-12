import { useContext, useEffect, useState } from "react";
import { timeSlots } from "../../constants/TimeSlot";
import apiRequest from "../../API REQUEST/apiRequest";
import useFetchUser from "../../CustomHooks/useFetchUser";
import { SocketContext } from "../../Context/SocketContext";

const FutsalTime = () => {
  const currentUser = useFetchUser();
  const { booking, sendBooking } = useContext(SocketContext);
  const [showMore, setShowMore] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [booked, setBooked] = useState([]);

  const todaysDate = new Date()
    .toISOString()
    .split("T")[0]
    .replaceAll("-", "/");

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await apiRequest.get("/booking/all?date=" + todaysDate);
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBookings();
  }, []);

  useEffect(() => {
    setBookings((prev) => [...prev, ...booking]);
  }, [booking]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleBooking = async (startTime, id) => {
    const userChoice = confirm("Are You want to book this?");

    if (!userChoice) return;

    const checkAvail = await apiRequest.get(
      `/booking/check?date=${todaysDate}&startTime=${startTime}`
    );

    if (!checkAvail.data.available) {
      alert("Sorry, this slot was just booked by someone else!");
      return;
    }

    try {
      await apiRequest.post("/booking/add", {
        startTime,
        date: todaysDate,
        userId: currentUser._id,
      });
      setBooked((prev) => [...prev, id]);
      sendBooking(currentUser?._id, startTime, date);
      alert("Booking Successful");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Booking!");
    }
  };
  const bookedSet = new Set(bookings.map((b) => b.startTime));

  return (
    <div className="w-[90%] space-y-6 transition-opacity">
      <div className=" w-[100%] grid grid-cols-4 text-2xl gap-10 p-2 w-full">
        {timeSlots.map((t) => {
          const hasBooked = bookedSet.has(t.startTime) || booked.includes(t.id);

          return (
            <div
              className={`text-center space-y-3 border p-3 rounded transform transition duration-500 ease-in-out ${
                showMore
                  ? "opacity-100 translate-y-0"
                  : t.id >= 8
                  ? "opacity-0 translate-y-4 hidden"
                  : ""
              }`}
              key={t.id}
            >
              <p>
                Time: {t.startTime} to {t.endTime}
              </p>
              <p className={`${hasBooked && "text-[#ff3e3e9b] text-2xl"}`}>
                Status: {hasBooked ? "Booked" : "Available"}
              </p>
              {!hasBooked && (
                <button
                  onClick={() => handleBooking(t.startTime, t.id)}
                  className={`bg-[#00ff87] rounded p-1 hover:bg-[#00ff8886] cursor-pointer outline-0 border-0`}
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
