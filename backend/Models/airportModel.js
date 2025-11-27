import mongoose from "mongoose";

const airportSchema = new mongoose.Schema({
  airportName: { type: String, required: true, trim: true },
  airportCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
}, { timestamps: true });

const Airport = mongoose.model("Airport", airportSchema);
export default Airport;