import mongoose from "mongoose";

const BookingInfoScheme = new mongoose.Schema({
  date: String,
  startTime: String,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

BookingInfoScheme.index({ date: 1, startTime: 1 }, { unique: true });
const Bookings = mongoose.model("Bookings", BookingInfoScheme);

export default Bookings;
Number;
