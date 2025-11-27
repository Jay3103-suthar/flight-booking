import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true, trim: true },
  airline: { type: String, required: true, trim: true },
  departureAirport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport", required: true },
  arrivalAirport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport", required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seating: {
    economy: {
      price: { type: Number, required: true },
      availableSeats: { type: Number, required: true },
    },
    business: {
      price: { type: Number, required: true },
      availableSeats: { type: Number, required: true },
    },
    firstClass: {
      price: { type: Number, required: true },
      availableSeats: { type: Number, required: true },
    },
  },
}, { timestamps: true });

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;