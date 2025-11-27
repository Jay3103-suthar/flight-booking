import express from "express";
import {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} from "../Controlles/admincontroller.js";

import { getAllBookings } from "../Controlles/adminBooking.controller.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin — View all bookings
router.get("/bookings", verifyToken, isAdmin, getAllBookings);

// Admin list
router.route("/")
  .get(verifyToken, isAdmin, getAllAdmins);

// Admin by ID
router.route("/:id")
  .get(verifyToken, isAdmin, getAdminById)
  .put(verifyToken, isAdmin, updateAdmin)
  .delete(verifyToken, isAdmin, deleteAdmin);

export default router;
