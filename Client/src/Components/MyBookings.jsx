import { useContext, useEffect, useState } from "react";
import { timeSlots } from "../constants/TimeSlot.js";
import apiRequest from "../API REQUEST/apiRequest.js";
import useFetchUser from "../CustomHooks/useFetchUser.js";
import { useIsHome } from "../CustomHooks/useIsHome.js";
import { LoaderContext } from "../Context/LoaderContext.jsx";
import { toast } from "react-toastify";
import { useScrollTop } from "../CustomHooks/useScrollTop.js";
import { motion } from "framer-motion";

/*
The table not showing issue is -> animate="visible" fires immediately on mount - but  data isn't ready yet when the component first renders. So the animation runs once with empty userBookedSlots, and by the time data arrives there's no re-trigger.
soln is: add key to motion.div -> key={userBookSlots.lenght}- // 👈 re-mounts & re-animates when data arrives
*/

const statusConfig = {
  pending: {
    label: "Pending",
    dot: "bg-yellow-400",
    badge: "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20",
  },
  confirmed: {
    label: "Confirmed",
    dot: "bg-[#00ff87]",
    badge: "bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-400",
    badge: "bg-red-400/10 text-red-400 border border-red-400/20",
  },
};

const MyBookings = () => {
  const currentUser = useFetchUser();
  const [userBookings, setUserBookings] = useState([]);
  const isHome = useIsHome();
  const { showLoading, hideLoading } = useContext(LoaderContext);

  useScrollTop();

  useEffect(() => {
    if(!currentUser?._id) return;
    const fetchBookings = async () => {
      try {
        showLoading();
        const res = await apiRequest.get("/booking/" + currentUser?._id);
        setUserBookings(res.data);
      } catch (error) {
        toast.error(error.response.data.error || "Error fetching user bookings");
      } finally {
        hideLoading();
      }
    };
     fetchBookings();
  }, [currentUser?._id]);

  const bookSet = new Set(userBookings.map((u) => u.startTime));
  const userBookedSlots = timeSlots.filter((t) => bookSet.has(t.startTime));

  return (
    <div
      className={`min-h-screen bg-black text-white ${!isHome && " px-5"}`}
    >
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-10">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#00ff87]" />
            <span className="text-[#00ff87] text-xs font-semibold tracking-[0.25em] uppercase">
              My Account
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Your <span className="text-[#00ff87]">Bookings</span>
          </h1>
          {userBookings.length > 0 && (
            <p className="text-white/40 text-sm">
              You have{" "}
              <span className="text-white font-semibold">
                {userBookings.length}
              </span>{" "}
              active booking{userBookings.length > 1 ? "s" : ""}.
            </p>
          )}
        </motion.div>

        {/* ── empty state ── */}
        {userBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-24 gap-4 border border-white/5 rounded-2xl bg-white/[0.02]"
          >
            <span className="text-5xl">🏟️</span>
            <p className="text-white/40 text-base">No bookings yet.</p>
            <a
              href="/#bookFutsal"
              className="mt-2 text-sm font-semibold text-[#00ff87] hover:underline underline-offset-4"
            >
              Book a slot →
            </a>
          </motion.div>
        ) : (
          /* ── bookings list ── */
          <motion.div
          key={userBookedSlots.length} //// 👈 re-mounts & re-animates when data arrives
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="space-y-3"
          >
            {/* table header */}
            <div className="hidden md:grid grid-cols-4 gap-4 px-5 py-2 text-xs text-white/30 uppercase tracking-widest font-semibold">
              <span>#</span>
              <span>Time Slot</span>
              <span>Booked Date</span>
              <span>Payment</span>
            </div>

            {userBookedSlots.map((u, index) => {
              const booking = userBookings.find(
                (t) => t.startTime === u.startTime,
              );
              const status = statusConfig[booking?.status ?? "pending"];

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center
                             bg-white/[0.03] border border-white/8 hover:border-[#00ff87]/25
                             hover:bg-[#00ff87]/[0.03] rounded-2xl px-5 py-4
                             transition-all duration-300"
                >
                  {/* index */}
                  <span className="hidden md:block text-white/20 text-sm font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* time slot */}
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1 md:hidden">
                      Slot
                    </p>
                    <p className="text-white font-bold text-sm">
                      {u.startTime}
                      <span className="text-white/30 font-normal"> – </span>
                      {u.endTime}
                    </p>
                  </div>

                  {/* date */}
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1 md:hidden">
                      Date
                    </p>
                    <p className="text-white/70 text-sm">{booking?.date}</p>
                  </div>

                  {/* payment */}
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1 md:hidden">
                      Payment
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${status.badge}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
