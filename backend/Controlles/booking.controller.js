// controllers/booking.controller.js
import Booking from "../Models/booking.model.js";
import Flight from "../Models/flight.model.js";

/* ----------------- CREATE BOOKING ----------------- */
export const createBooking = async (req, res) => {
  try {
    const { flightId, passengers, seatClass, totalPrice, paymentMethod } = req.body;
    const userId = req.user.id;

    if (!flightId || !passengers || !seatClass || !totalPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ error: "Flight not found" });

    const booking = await Booking.create({
      user: userId,
      flight: flightId,
      passengers,
      seatClass,
      totalPrice,
      paymentMethod,
      status: "Confirmed",
    });

    res.status(201).json({ success: true, booking });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ----------------- GET MY BOOKINGS ----------------- */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("flight")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ----------------- ADMIN: GET ALL BOOKINGS ----------------- */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("flight")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ----------------- UPDATE BOOKING ----------------- */
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    res.json({ success: true, booking });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ----------------- DELETE BOOKING ----------------- */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    res.json({ success: true, message: "Booking deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
