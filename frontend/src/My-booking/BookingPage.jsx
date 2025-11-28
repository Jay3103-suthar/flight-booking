import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import imag from '/images/FliHigh.png'

const BookingPage = () => {
  const { flightId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const seatClass = new URLSearchParams(location.search).get("class");
  const seatPrice = Number(new URLSearchParams(location.search).get("price"));

  const [flight, setFlight] = useState(null);

  // FIXED → Using birthDate instead of dob
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "", email: "", birthDate: "", aadhaar: "" },
  ]);

  useEffect(() => {
   axios
    .get(`https://flight-booking-1-0xto.onrender.com/api/flights/${flightId}`)
    .then((res) => setFlight(res.data))
    .catch((err) => console.error("Error loading flight:", err));

  }, [flightId]);

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", age: "", gender: "", email: "", birthDate: "", aadhaar: "" },
    ]);
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const validatePassengers = () => {
    for (const p of passengers) {
      if (!p.name || !p.age || !p.gender || !p.email || !p.birthDate || !p.aadhaar) {
        return false;
      }
    }
    return true;
  };

  const goToPayment = () => {
    if (!validatePassengers()) {
      alert("Please fill all passenger details including DOB & Aadhaar");
      return;
    }

    navigate("/payment", {
      state: {
        flight,
        passengers, // Now contains birthDate correctly
        seatClass,
        seatPrice,
        totalAmount: seatPrice * passengers.length,
      },
    });
  };

  if (!flight)
    return <p className="text-center mt-10 text-gray-500">Loading flight details...</p>;

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto py-10 px-6">
        <img
          src={ imag}
          alt={flight.airline}
          className="w-full h-80 object-cover rounded-2xl shadow-md"
        />

        <h1 className="text-3xl font-bold mt-6 mb-2">{flight.airline}</h1>
        <p className="text-gray-600 mb-4 text-lg">
          ✈️ {flight.fromCity} → {flight.toCity}
        </p>

        <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-xl shadow-sm">
          <p><strong>Date:</strong> {new Date(flight.departureTime).toLocaleDateString()}</p>
          <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleTimeString()}</p>
          <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleTimeString()}</p>
          <p><strong>Seat Class:</strong> {seatClass}</p>
          <p><strong>Cabin Baggage:</strong> 7kg</p>
          <p><strong>Check-in Baggage:</strong> 15kg</p>
          <p className="col-span-2 text-lg font-semibold text-green-700">
            Total Fare: ₹{(seatPrice * passengers.length).toLocaleString()}
          </p>
        </div>

        {/* Passenger Inputs */}
        <div className="mt-10 bg-white border border-gray-300 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            Passenger Details
          </h2>

          {passengers.map((p, index) => (
            <div key={index} className="border-b pb-6 mb-6 last:border-none">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={p.name}
                  onChange={(e) => updatePassenger(index, "name", e.target.value)}
                  className="border border-gray-400 rounded-lg p-3 w-full"
                />

                <input
                  type="number"
                  placeholder="Age"
                  value={p.age}
                  onChange={(e) => updatePassenger(index, "age", e.target.value)}
                  className="border border-gray-400 rounded-lg p-3 w-full"
                />
              </div>

              <div className="flex gap-4 mt-3">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updatePassenger(index, "gender", g)}
                    className={`px-6 py-2 rounded-lg border ${
                      p.gender === g
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-gray-100 hover:bg-gray-200 border-gray-400"
                    }`}
                  >
                    {g.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={p.email}
                  onChange={(e) => updatePassenger(index, "email", e.target.value)}
                  className="border border-gray-400 rounded-lg p-3 w-full"
                />
              </div>

              {/* FIXED — correct field name */}
              <div className="mt-4">
                <label className="block text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={p.birthDate}
                  onChange={(e) => updatePassenger(index, "birthDate", e.target.value)}
                  className="border border-gray-400 rounded-lg p-3 w-full"
                />
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Aadhaar Number"
                  maxLength={12}
                  value={p.aadhaar}
                  onChange={(e) => updatePassenger(index, "aadhaar", e.target.value)}
                  className="border border-gray-400 rounded-lg p-3 w-full"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addPassenger}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            + Add Another Passenger
          </button>
        </div>

        <button
          className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg w-full"
          onClick={goToPayment}
        >
          Confirm Booking
        </button>
      </div>

      <Footer />
    </>
  );
};

export default BookingPage;
