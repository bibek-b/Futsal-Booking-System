import { useEffect, useState, useContext } from "react";
import { timeSlots } from "../constants/TimeSlot.js";
import apiRequest from "../API REQUEST/apiRequest.js";
import useFetchUser from "../CustomHooks/useFetchUser.js";
import { SocketContext } from "../Context/SocketContext.jsx";
import { motion } from "framer-motion";
import { fadeInRight, staggerContainer } from "../animations/Variants.js";
import { toast } from "react-toastify";
import { LoaderContext } from "../Context/LoaderContext.jsx";
import { parseHour } from "../utils/timeUtils.js";
import GlobalConfirmModal from "./common/GlobalConfirmModal.jsx";
import { ConfirmModalContext } from "../Context/ConfirmModalContext.jsx";

const FutsalTime = ({ selectDate }) => {
  const currentUser = useFetchUser();
  const { sendBooking,  booking, socket } = useContext(SocketContext);
  const [bookings, setBookings] = useState([]);
  const [changeBooking, setChangeBooking] = useState([]);
  const { showLoading, hideLoading } = useContext(LoaderContext);
  const { showConfirmModal, hideConfirmModal } =useContext(ConfirmModalContext);
  const [startTime, setStartTime] = useState('');
  const [bookingId, setBookingId] = useState('');


  const date = selectDate.toISOString().split("T")[0].replaceAll("-", "/");
  const todaysDate = new Date()
    .toISOString()
    .split("T")[0]
    .replaceAll("-", "/");

  // ── socket: new booking ──
  useEffect(() => {
    setBookings((prev) => [...prev, ...booking]);
  }, [booking]);

  // ── socket: removed booking ──
  useEffect(() => {
    if (!socket) return;
    const handleRemoveBooking = ({ startTime }) =>
      setBookings((prev) => prev.filter((p) => p.startTime !== startTime));
    socket.on("receive-remove-booking", handleRemoveBooking);
    return () => socket.off("receive-remove-booking", handleRemoveBooking);
  }, [socket]);

  // ── fetch bookings for selected date ──
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        showLoading();
        const res = await apiRequest.get("/booking/all?date=" + date);
        setBookings(res.data);
      } catch (error) {
        toast.error(error.response?.data?.error || "Error fetching bookings");
      } finally {
        hideLoading();
      }
    };
    fetchAllBookings();
  }, [date]);

  const handleBookingConfirm = async (startTime, id) => {
    if (!currentUser) {
      toast.error("You have to login/sign up for booking!");
      return;
    }
    setStartTime(startTime);
    setBookingId(id);
    showConfirmModal();
    
  };

  const bookSlot = async () => {
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
        userId: currentUser?._id,
        startTime,
        date,
      });
      setChangeBooking((prev) => [...prev, bookingId]);
      sendBooking(currentUser?._id, startTime, date);
      toast.success("Booking successful!");
    } catch {
      toast.error("Failed to add booking!");
    } finally {
      hideLoading();
      hideConfirmModal();
      
    }
  }

  const bookedTime = new Set(bookings?.map((b) => b.startTime));
  const requiredDay = selectDate.getDate();
  const currentDay = new Date().getDate();
  const currentHour = new Date().getHours();
  const isFutureDay = requiredDay > currentDay;

  const visibleSlots = isFutureDay
    ? timeSlots
    : timeSlots.filter((t) => parseHour(t.startTime) > currentHour);

  const bookedCount = visibleSlots.filter(
    (t) => bookedTime.has(t.startTime) || changeBooking.includes(t.id),
  ).length;
  const availableCount = visibleSlots.length - bookedCount;

  return (
    <div className="w-full space-y-8">
      <GlobalConfirmModal title={"Confirm Booking"} detail={"You want to book this slot. This action cannot be undone."} onPress={bookSlot} />
      {/* ── tomorrow notice ── */}
      {isFutureDay && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl"
        >
          <span className="text-base">⚠️</span>
          <span>
            Today's slots are finished — showing available slots for tomorrow.
          </span>
        </motion.div>
      )}

      {/* ── summary bar ── */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
          <span className="text-white/50">
            <span className="text-white font-semibold">{availableCount}</span>{" "}
            Available
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="text-white/50">
            <span className="text-white font-semibold">{bookedCount}</span>{" "}
            Booked
          </span>
        </div>
        <div className="ml-auto text-white/25 text-xs">
          {visibleSlots.length} slots total
        </div>
      </div>

      {/* ── slots grid ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {visibleSlots.map((t) => {
          const hasBooked =
            bookedTime.has(t.startTime) || changeBooking.includes(t.id);

          return (
            <motion.div
              variants={fadeInRight}
              key={t.id}
              className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${
                hasBooked
                  ? "bg-white/[0.02] border-white/5 opacity-50"
                  : "bg-white/[0.04] border-white/10 hover:border-[#00ff87]/40 hover:bg-[#00ff87]/5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,255,135,0.08)]"
              }`}
            >
              {/* time */}
              <div className="mb-4">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">
                  Time Slot
                </p>
                <p
                  className={`text-lg font-bold ${hasBooked ? "text-white/30" : "text-white"}`}
                >
                  {t.startTime}
                  <span className="text-white/30 font-normal"> – </span>
                  {t.endTime}
                </p>
              </div>

              {/* status badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    hasBooked
                      ? "bg-red-500/15 text-red-400 border border-red-500/20"
                      : "bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20"
                  }`}
                >
                  {hasBooked ? "● Booked" : "● Available"}
                </span>

                {!hasBooked && date >= todaysDate && (
                  <button
                    onClick={() => handleBookingConfirm(t.startTime, t.id)}
                    className="text-xs font-bold text-black bg-[#00ff87] px-3 py-1.5 rounded-full
                               hover:bg-[#00ff87]/80 transition-all duration-200 cursor-pointer
                               shadow-[0_0_12px_rgba(0,255,135,0.2)] hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]"
                  >
                    Book →
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FutsalTime;
