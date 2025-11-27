import express from "express";
import { createAirport, getAirports,updateAirport, deleteAirport  } from "../Controlles/airportController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(verifyToken, isAdmin, createAirport)
  .get(getAirports);

router.route("/:id")
  .put(verifyToken, isAdmin, updateAirport)
  .delete(verifyToken, isAdmin, deleteAirport);

export default router;