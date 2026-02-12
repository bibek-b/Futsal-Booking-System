import { use, useContext, useEffect, useState } from "react";
import apiRequest from "../../API REQUEST/apiRequest";
import { timeSlots } from "../../constants/TimeSlot";
import useFetchUser from "../../CustomHooks/useFetchUser";
import PendingIcon from "../../assets/pending.svg";
import { SocketContext } from "../../Context/SocketContext";

const BookingDetails = ({ selectDate }) => {
  const currentUser = useFetchUser();
  const { booking, sendBooking, removeBooking } = useContext(SocketContext);
  const [isBooked, setIsBooked] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [triggerBooking, setTriggerBooking] = useState(false);

  const todaysDate = new Date()
    .toISOString()
    .split("T")[0]
    .replaceAll("-", "/");
  const date = selectDate.toISOString().split("T")[0].replaceAll("-", "/");

  useEffect(() => {
    setBookings((prev) => [...prev, ...booking]);
  }, [booking]);

  useEffect(() => {
    const getAllBookings = async () => {
      try {
        const res = await apiRequest.get("/booking/all?date=" + date);
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBookings();
  }, [selectDate, triggerBooking, booking]);

  const handleBooking = async (startTime, id) => {
    const userChoice = confirm("Are You want to Book?");
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
        date,
        startTime,
        userId: currentUser._id,
      });
      alert("Booking Successful");
      setIsBooked((prev) => [...prev, id]);
      setTriggerBooking(!triggerBooking);
      sendBooking(currentUser?._id, startTime, date);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id, startTime) => {
    const userChoice = confirm("Are you sure you want to remove this booking?");
    if (!userChoice) return;
    try {
      await apiRequest.delete(`/booking/delete/${id}`);
      setBookings((prev) => prev.filter((p) => p._id !== id));
      alert("Booking removed successfully!");
      removeBooking(startTime);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const bookedSet = new Set(bookings.map((b) => b.startTime));

  const bookingMap = new Map();

  bookings.map((b) => {
    bookingMap.set(b.startTime, b.user);
  });

  return (
    <>
      {timeSlots.map((t, index) => {
        const bookedUsers = bookingMap.get(t.startTime);
        const hasBooked = bookedSet.has(t.startTime) || isBooked.includes(t.id);

        const matchedBooking = bookings.find(
          (b) => b.startTime === t.startTime
        );
        return (
          <tbody>
            <tr>
              <td
                className="border border-b-0 border-r-0 px-3 py-4 flex border-l-0"
                key={index}
              >
                {t.startTime}- {t.endTime}
              </td>

              <td
                className={`border  ${
                  hasBooked && bookedUsers && "bg-[#162a40]"
                }`}
              >
                {bookedUsers
                  ? bookedUsers.map((b, index) => (
                      <p className="font-bold" key={index}>
                        {b.userName} <br /> {b.phoneNum}
                      </p>
                    ))
                  : "-"}
              </td>

              <td
                className={`border ${
                  hasBooked && bookedUsers && "bg-[#ff3e3e9b]"
                }`}
              >
                {hasBooked && bookedUsers ? "Booked" : "Available"}
              </td>

              <td className="border">
                {hasBooked && bookedUsers ? (
                  <b
                    className={`${"bg-[#162a40] p-2 h-12 rounded flex items-center justify-center gap-2 "} ''`}
                  >
                    Pending
                    <img src={PendingIcon} className="w-3" />
                  </b>
                ) : (
                  "-"
                )}
              </td>
              <td className={`border space-x-3 `}>
                {!hasBooked && date >= todaysDate && !bookedUsers ? (
                  <button
                    className={`w-30 p-1 bg-[#00ff87] outline-0 rounded cursor-pointer hover:bg-[#00ff8886]`}
                    onClick={() => handleBooking(t.startTime, t.id)}
                  >
                    Add Booking
                  </button>
                ) : (
                  <button
                    className={`w-35 p-1 bg-[#ff3e3e] outline-0 rounded cursor-pointer hover:bg-[#ff3e3e9b] ${
                      date < todaysDate && !bookedUsers && "hidden"
                    }`}
                    onClick={() =>
                      handleRemove(matchedBooking._id, t.startTime)
                    }
                  >
                    Remove Booking
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </>
  );
};

export default BookingDetails;
