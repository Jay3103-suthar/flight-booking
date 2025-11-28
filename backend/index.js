import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// User & Auth Routes
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";

// Flight Booking System Routes
import airportRouter from "./Routes/airport.routes.js";
import flightRouter from "./Routes/flight.routes.js";
import ticketRouter from "./Routes/ticket.route.js";

// ⭐ Updated Booking Routes (Full CRUD)
import bookingRouter from "./Routes/booking.routes.js";

// Admin routes
import adminRouter from "./Routes/adminroute.js";



dotenv.config();
const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-vercel-url.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

// ===== CONNECT DB =====
connectDB();

// ===== ROUTES =====
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/airports", airportRouter);
app.use("/api/flights", flightRouter);
app.use("/api/ticket", ticketRouter);

// ⭐ Booking CRUD Routes
app.use("/api/bookings", bookingRouter);

// Admin route
app.use("/api/admin", adminRouter);


// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully 🚀" });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
