import Bookings from "../Models/Booking.js";
import User from "../Models/User.js";

const getAllBookings = async (req, res) => {
  const { date } = req.query;
  try {
    const allBookings = await Bookings.find({ date }).populate({
      path: "user",
      select: "-password",
    });
    return res.status(200).json(allBookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to get all bookings" });
  }
};

const getBookingOfUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const userBookings = await Bookings.find({
      user: id,
    }).populate("user");

    return res.status(200).json(userBookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to get booking" });
  }
};

const addBooking = async (req, res) => {
  const { userId, startTime, date } = req.body;
  try {
    const user = await User.findById(userId);

    const existingBooking = await Bookings.findOne({ date, startTime });

    if (existingBooking)
      return res
        .status(409)
        .json({ error: "The time slot was already booked!" });

    const newBooking = await Bookings.create({
      date,
      startTime,
      user: user._id,
    });

    return res.status(200).json(newBooking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to add booking" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Bookings.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete booking" });
  }
};

const checkAvailability = async (req, res) => {
  const { date, startTime } = req.query;

  try {
    const existingBooking = await Bookings.findOne({ date, startTime });
    if (existingBooking) {
      return res.json({ available: false });
    }
    return res.json({ available: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  getAllBookings,
  getBookingOfUser,
  addBooking,
  deleteBooking,
  checkAvailability,
};
