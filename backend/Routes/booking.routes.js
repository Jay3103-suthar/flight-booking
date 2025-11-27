import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../Controlles/booking.controller.js";

const router = express.Router();

// USER ROUTES
router.post("/", verifyToken, createBooking);
router.get("/my", verifyToken, getMyBookings);

// ADMIN ROUTE — VIEW ALL BOOKINGS
router.get("/admin", verifyToken, isAdmin, getAllBookings);

// UPDATE booking
router.put("/:id", verifyToken, updateBooking);

// DELETE booking
router.delete("/:id", verifyToken, deleteBooking);

export default router;
