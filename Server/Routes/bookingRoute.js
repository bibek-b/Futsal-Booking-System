import express from "express";
import {
  addBooking,
  checkAvailability,
  deleteBooking,
  getAllBookings,
  getBookingOfUser,
} from "../Controllers/bookingController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

router.get("/all", getAllBookings);
router.get("/check", checkAvailability);
router.get("/:userId", getBookingOfUser);
router.post("/add", addBooking);
router.delete("/delete/:id", deleteBooking);

export default router;
