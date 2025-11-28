import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const flight = state?.flight;
  const passengers = state?.passengers;
  const seatClass = state?.seatClass;
  const seatPrice = state?.seatPrice;

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);

  if (!flight || !passengers) {
    return <p className="p-6 text-center">No booking data found.</p>;
  }

  /* ---------------- HANDLE PAYMENT ---------------- */
  const handlePayment = async () => {
    if (
      method === "card" &&
      (!card.number || !card.name || !card.expiry || !card.cvv)
    ) {
      return alert("Please fill all card details");
    }
    if (method === "upi" && !upi) {
      return alert("Please enter UPI ID");
    }

    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1200)); // Fake delay

      /* ---------------- PASSENGERS FORMAT ---------------- */
      const formattedPassengers = passengers.map((p) => ({
        name: p.name,
        age: p.age,
        birthDate: p.birthDate,
        aadhaar: p.aadhaar,
      }));
      

      /* ---------------- AUTH TOKEN ---------------- */
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must login to continue.");
        navigate("/login");
        return;
      }

      /* ---------------- CREATE BOOKING REQUEST ---------------- */
      const res = await axios.post(
        "https://flight-booking-1-0xto.onrender.com/api/bookings",
        {
          flightId: flight._id, // ✅ FIXED
          passengers: formattedPassengers,
          seatClass,
          totalPrice: seatPrice * passengers.length,
          paymentMethod: method === "card" ? "Card" : "UPI",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const booking = res.data.booking;

      navigate("/booking-success", {
       state: { booking, flight },
       replace: true,
});

    } catch (error) {
      console.log("PAYMENT ERROR:", error.response?.data || error);
      alert(error.response?.data?.error || "Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          Payment
        </h2>

        {/* Flight Summary */}
        <div className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold text-lg">{flight.airline}</div>
              <div className="text-sm text-gray-600">
                {flight.fromCity} → {flight.toCity}
              </div>
              <div className="text-sm text-gray-600">
                Departure: {new Date(flight.departureTime).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                ₹{(seatPrice * passengers.length).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {/* Passenger Overview */}
        <div className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
          <h3 className="font-semibold mb-3">Passenger Details</h3>
          {passengers.map((p, idx) => (
            <div
              key={idx}
              className="border-b py-2 flex justify-between text-sm"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-gray-600">Age: {p.age}</div>
              </div>
              <div className="text-right text-gray-600">
                <div>DOB: {p.birthDate}</div>
                <div>Aadhaar: {p.aadhaar}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              checked={method === "card"}
              onChange={() => setMethod("card")}
              className="mr-2"
            />
            Card
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
              className="mr-2"
            />
            UPI
          </label>
        </div>

        {/* CARD PAYMENT */}
        {method === "card" ? (
          <div className="grid gap-3 bg-white p-4 rounded-lg border shadow-sm">
            <input
              className="border p-3 rounded w-full"
              placeholder="Card number"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
            />

            <input
              className="border p-3 rounded w-full"
              placeholder="Name on card"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
            />

            <div className="flex gap-3">
              <input
                className="border p-3 rounded flex-1"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              />
              <input
                className="border p-3 rounded w-32"
                placeholder="CVV"
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              />
            </div>
          </div>
        ) : (
          /* UPI PAYMENT */
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <input
              className="border p-3 rounded w-full"
              placeholder="UPI ID (e.g. username@upi)"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 bg-indigo-700 text-white w-full py-3 rounded-lg font-bold"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default PaymentPage;
