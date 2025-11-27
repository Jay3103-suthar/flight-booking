import express from "express";
import { 
  createFlight, 
  searchFlights,
  updateFlight, 
  deleteFlight  
} from "../Controlles/flight.controller.js";
import Flight from "../Models/flight.model.js";  // <-- You MUST import this
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create flight (Admin only)
router.route("/")
  .post(verifyToken, isAdmin, createFlight);

// Search flights
router.get("/search", searchFlights);

// ✅ GET single flight by ID (REQUIRED FOR BOOKING PAGE)
router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
      .populate("departureAirport arrivalAirport");

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update & Delete flight (Admin only)
router.route("/:id")
  .put(verifyToken, isAdmin, updateFlight)
  .delete(verifyToken, isAdmin, deleteFlight);

export default router;
