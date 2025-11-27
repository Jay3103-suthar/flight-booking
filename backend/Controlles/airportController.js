import Airport from "../Models/airportModel.js";

export const createAirport = async (req, res) => {
  try {
    const { airportName, airportCode, city, country } = req.body;
    const airport = await Airport.create({ airportName, airportCode, city, country });
    res.status(201).json({ message: "Airport created successfully", airport });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAirports = async (req, res) => {
  try {
    const airports = await Airport.find({});
    res.status(200).json(airports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAirport = async (req, res) => {
  try {
    const airport = await Airport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    res.status(200).json({ message: "Airport updated successfully", airport });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAirport = async (req, res) => {
  try {
    const airport = await Airport.findByIdAndDelete(req.params.id);

    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    res.status(200).json({ message: "Airport deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};