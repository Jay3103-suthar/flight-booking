import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Initialize AOS
  useEffect(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await axios.get("https://flight-booking-1-0xto.onrender.com/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data.bookings || []);
        
        // Refresh AOS animations after data is fetched and rendered
        setTimeout(() => AOS.refresh(), 100); 
      } catch (err) {
        console.log("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [token]);

  // CANCEL BOOKING
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(bookings.filter((b) => b._id !== id));
      alert("Booking canceled successfully!");
      // Refresh animations to ensure layout stays consistent after deletion
      setTimeout(() => AOS.refresh(), 100); 
    } catch (error) {
      console.log(error);
      alert("Failed to cancel booking.");
    }
  };

  if (loading)
    return (
      <div 
        className="flex justify-center items-center h-screen text-xl font-semibold"
        data-aos="zoom-in"
      >
        Loading bookings...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <h1 
            className="text-3xl font-bold mb-6"
            data-aos="fade-down"
        >
            My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p 
            className="text-gray-600 text-lg"
            data-aos="fade-up"
          >
            You have no bookings yet.
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                data-aos="zoom-in"
                data-aos-delay={index * 100} // Staggered animation effect
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all"
              >
                {/* Airline + Route */}
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-700">
                      {booking.flight?.airline}
                    </h2>
                    <p className="text-gray-600">
                      {booking.flight?.flightNumber}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full">
                      {booking.seatClass.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Route info */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-gray-500 text-sm">From</p>
                    <p className="text-lg font-semibold">
                      {booking.flight?.departureAirport?.airportName || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">To</p>
                    <p className="text-lg font-semibold">
                      {booking.flight?.arrivalAirport?.airportName || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <p className="mt-4 text-gray-700">
                  <strong>Date:</strong>{" "}
                  {new Date(booking.flight?.departureTime).toLocaleString()}
                </p>

                {/* Passenger */}
                <p className="mt-2">
                  <strong>Passenger:</strong> {booking.passengers[0]?.name}
                </p>

                {/* Price */}
                <p className="mt-1 text-lg font-bold text-green-700">
                  ₹{booking.totalPrice}
                </p>

                {/* Cancel Button */}
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;