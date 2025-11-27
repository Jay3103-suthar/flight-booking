import Flight from "../Models/flight.model.js";

export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ message: "Flight created successfully", flight });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const query = {};
    if (from) query.departureAirport = from;
    if (to) query.arrivalAirport = to;
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(date);
      nextDay.setDate(searchDate.getDate() + 1);
      query.departureTime = { $gte: searchDate, $lt: nextDay };
    }

    const flights = await Flight.find(query)
      .populate("departureAirport", "airportCode city")
      .populate("arrivalAirport", "airportCode city");
      
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ message: "Flight updated successfully", flight });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ✅ Search flights

