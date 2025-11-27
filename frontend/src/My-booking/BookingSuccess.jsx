import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;
  const flight = state?.flight;

  const [passengersWithSeats, setPassengersWithSeats] = useState([]);

  // Generate seat numbers
  useEffect(() => {
    if (booking?.passengers) {
      const seats = generateSeatNumbers(booking.passengers.length);
      const updated = booking.passengers.map((p, i) => ({
        ...p,
        seat: seats[i],
      }));
      setPassengersWithSeats(updated);
    }
  }, [booking]);

  const generateSeatNumbers = (count) => {
    const rows = 30;
    const seatLetters = ["A", "B", "C", "D", "E", "F"];
    let seatList = [];
    let index = 0;
    for (let r = 1; r <= rows; r++) {
      for (let s = 0; s < seatLetters.length; s++) {
        seatList.push(`${r}${seatLetters[s]}`);
        index++;
        if (index === count) return seatList;
      }
    }
    return seatList;
  };

  if (!booking || !flight) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-700 text-lg font-medium">
          Booking is being processed...
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Download PDF from backend
  const downloadTicket = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure user is logged in
      const res = await fetch(`http://localhost:8000/api/ticket/${booking._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket_${booking._id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF. Try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Ticket Info */}
        <div className="bg-white border rounded-xl p-6 shadow text-black">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Booking Confirmed</h2>
              <p>Booking ID: {booking._id}</p>
              <p>Payment Method: {booking.paymentMethod}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-lg">{flight.airline}</div>
              <div className="text-sm">
                {flight.fromCity} → {flight.toCity}
              </div>
              <div className="text-sm">
                Departure: {new Date(flight.departureTime).toLocaleString()}
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Passengers</h3>
              {passengersWithSeats.map((p, i) => (
                <div key={i} className="text-sm mt-2 border-b pb-2">
                  <strong>{p.name}</strong>
                  <br />
                  Age: {p.age}
                  <br />
                  DOB: {p.birthDate || "N/A"}
                  <br />
                  Aadhaar: {p.aadhaar || "N/A"}
                  <br />
                  Seat: {p.seat}
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold">Payment</h3>
              <div>Method: {booking.paymentMethod}</div>
              <div>Amount: ₹{booking.totalPrice}</div>
              <div>Transaction ID: {booking._id}</div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Flight Info</h3>
            <div>
              {flight.airline} • {flight.fromCity} → {flight.toCity}
              <br />
              Departure: {new Date(flight.departureTime).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={downloadTicket}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Download Ticket
          </button>

          <button
            onClick={() => navigate("/")}
            className="border px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingSuccess;
