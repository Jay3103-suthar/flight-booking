import express from "express";
import { generateTicketPDF } from "../utils/ticketGenerator.js";
import Booking from "../Models/booking.model.js";
import Flight from "../Models/flight.model.js";
import User from "../Models/user.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// GET /api/ticket/:bookingId
router.get("/:bookingId", verifyToken, async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Find booking
    const booking = await Booking.findById(bookingId).lean();
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Find flight
    const flight = await Flight.findById(booking.flight).lean();
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    // Find user
    const user = await User.findById(booking.user).lean();

    // Generate PDF bytes
    const pdfBytes = await generateTicketPDF(booking, flight, user);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket_${booking._id}.pdf`
    );

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
});

export default router;
