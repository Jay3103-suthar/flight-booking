import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_BACKEND_URL + "/api";

const BookingManagement = () => {
    const { token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API}/bookings/admin`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setBookings(res.data.bookings);
        } catch (err) {
            setError("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) return <div className="p-4 text-center">Loading bookings...</div>;

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">All Bookings</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium">User</th>
                            <th className="px-3 py-3 text-left text-xs font-medium">Flight</th>
                            <th className="px-3 py-3 text-left text-xs font-medium">Passengers</th>
                            <th className="px-3 py-3 text-left text-xs font-medium">Class</th>
                            <th className="px-3 py-3 text-left text-xs font-medium">Total Price</th>
                            <th className="px-3 py-3 text-left text-xs font-medium">Booked On</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((b) => (
                            <tr key={b._id}>
                                <td className="px-3 py-4 text-sm">
                                    {b.user.name}<br />
                                    <span className="text-gray-400">{b.user.email}</span>
                                </td>

                                <td className="px-3 py-4 text-sm">
                                    {b.flight.flightNumber} ({b.flight.airline})<br />
                                    {b.flight.departureAirport} → {b.flight.arrivalAirport}
                                </td>

                                <td className="px-3 py-4 text-sm">
                                    {b.passengers.map((p) => (
                                        <div key={p._id}>
                                            {p.name}, {p.age}
                                        </div>
                                    ))}
                                </td>

                                <td className="px-3 py-4 text-sm capitalize">
                                    {b.seatClass}
                                </td>

                                <td className="px-3 py-4 text-sm">
                                    ₹{b.totalPrice}
                                </td>

                                <td className="px-3 py-4 text-sm">
                                    {new Date(b.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingManagement;
