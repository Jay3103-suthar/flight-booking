import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  birthDate: { type: String, required: true },
  aadhaar: { type: String, required: true }
});

const bookingSchema = new mongoose.Schema({
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true
  },
  passengers: [passengerSchema],
  seatClass: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Card", "UPI"], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
