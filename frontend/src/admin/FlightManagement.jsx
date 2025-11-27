import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = "http://localhost:8000/api";

const initialFlightState = {
    flightNumber: '',
    airline: '',
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    seating: {
        economy: { price: 100, availableSeats: 100 },
        business: { price: 300, availableSeats: 30 },
        firstClass: { price: 500, availableSeats: 10 },
    }
};

const FlightManagement = () => {
    const { token } = useAuth();
    const [flights, setFlights] = useState([]);
    const [airports, setAirports] = useState([]); // To populate dropdowns
    const [formData, setFormData] = useState(initialFlightState);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // --- Fetch Data ---
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Flights
            // Since there's no dedicated GET all Flights route with isAdmin, we use the search route to get all
            const flightsRes = await axios.get(`${API_URL}/flights/search`, {
                 // No query params returns all flights with populate, but does not require isAdmin.
                 // We will need a new Admin route for ALL flights if the list is too long.
            });
            setFlights(flightsRes.data);

            // Fetch Airports for dropdowns
            const airportsRes = await axios.get(`${API_URL}/airports`);
            setAirports(airportsRes.data);

            setError('');
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchData(); }, [token]);

    // --- Form Handlers ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSeatingChange = (e, classType, field) => {
        let value = e.target.value;
        if (field === 'price' || field === 'availableSeats') {
            value = parseInt(value) || 0;
        }

        setFormData(prev => ({
            ...prev,
            seating: {
                ...prev.seating,
                [classType]: {
                    ...prev.seating[classType],
                    [field]: value
                }
            }
        }));
    };
    
    // --- CRUD Operations ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const payload = {
            ...formData,
            departureTime: new Date(formData.departureTime).toISOString(),
            arrivalTime: new Date(formData.arrivalTime).toISOString(),
            // Ensure seat values are numbers
            seating: {
                 economy: { price: Number(formData.seating.economy.price), availableSeats: Number(formData.seating.economy.availableSeats) },
                 business: { price: Number(formData.seating.business.price), availableSeats: Number(formData.seating.business.availableSeats) },
                 firstClass: { price: Number(formData.seating.firstClass.price), availableSeats: Number(formData.seating.firstClass.availableSeats) },
            }
        };

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/flights/${editingId}`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/flights`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
            // Reset form and state
            setFormData(initialFlightState);
            setIsEditing(false);
            setEditingId(null);
            fetchData(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to save flight.");
        }
    };

    const handleEdit = (flight) => {
        // Format dates for input fields (YYYY-MM-DDTHH:MM)
        const formatDateTime = (isoString) => {
            const date = new Date(isoString);
            const yyyy = date.getFullYear();
            const MM = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const hh = String(date.getHours()).padStart(2, '0');
            const mm = String(date.getMinutes()).padStart(2, '0');
            return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
        };

        setFormData({
            flightNumber: flight.flightNumber,
            airline: flight.airline,
            // Use airport IDs for form state
            departureAirport: flight.departureAirport._id || flight.departureAirport,
            arrivalAirport: flight.arrivalAirport._id || flight.arrivalAirport,
            departureTime: formatDateTime(flight.departureTime),
            arrivalTime: formatDateTime(flight.arrivalTime),
            seating: flight.seating,
        });
        setIsEditing(true);
        setEditingId(flight._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flight?")) return;
        setError('');
        try {
            await axios.delete(`${API_URL}/flights/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to delete flight.");
        }
    };

    if (loading) return <div className="text-center p-4">Loading Flights and Airports...</div>;

    // Helper to find airport code
    const getAirportCode = (airport) => {
        return airport?.airportCode || airports.find(a => a._id === airport)?.airportCode || 'N/A';
    }

    return (
        <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Flight Management</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            {/* Flight Form */}
            <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="Flight Number (e.g., AI101)" required className="p-2 border rounded" />
                    <input type="text" name="airline" value={formData.airline} onChange={handleChange} placeholder="Airline (e.g., Air India)" required className="p-2 border rounded" />
                    
                    <select name="departureAirport" value={formData.departureAirport} onChange={handleChange} required className="p-2 border rounded">
                        <option value="">-- Select Departure Airport --</option>
                        {airports.map(a => <option key={a._id} value={a._id}>{a.airportCode} - {a.city}</option>)}
                    </select>
                    <select name="arrivalAirport" value={formData.arrivalAirport} onChange={handleChange} required className="p-2 border rounded">
                        <option value="">-- Select Arrival Airport --</option>
                        {airports.map(a => <option key={a._id} value={a._id}>{a.airportCode} - {a.city}</option>)}
                    </select>
                    
                    <label className="block">Departure Time: <input type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleChange} required className="p-2 border rounded w-full" /></label>
                    <label className="block">Arrival Time: <input type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required className="p-2 border rounded w-full" /></label>
                </div>

                {/* Seating Configuration Section */}
                <h4 className="text-lg font-medium mt-4">Seating and Pricing</h4>
                <div className="grid grid-cols-3 gap-4 border p-3 rounded bg-gray-50">
                    {['economy', 'business', 'firstClass'].map((classType) => (
                        <div key={classType} className="border p-3 rounded bg-white">
                            <h5 className="capitalize font-semibold mb-2">{classType}</h5>
                            <label className="block mb-2">Price ($):
                                <input type="number" value={formData.seating[classType].price} onChange={(e) => handleSeatingChange(e, classType, 'price')} required min="1" className="p-2 border rounded w-full" />
                            </label>
                            <label className="block">Available Seats:
                                <input type="number" value={formData.seating[classType].availableSeats} onChange={(e) => handleSeatingChange(e, classType, 'availableSeats')} required min="0" className="p-2 border rounded w-full" />
                            </label>
                        </div>
                    ))}
                </div>

                <button type="submit" className={`p-3 rounded font-bold text-white w-full ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}>
                    {isEditing ? 'Update Flight' : 'Add New Flight'}
                </button>
            </form>

            {/* Flight List Table */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight/Airline</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Times</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Economy</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Class</th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {flights.map((flight) => (
                            <tr key={flight._id}>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {flight.flightNumber}<br /><span className="text-gray-500 text-xs">{flight.airline}</span>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {getAirportCode(flight.departureAirport)} &rarr; {getAirportCode(flight.arrivalAirport)}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Dep: {new Date(flight.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">${flight.seating.economy.price} ({flight.seating.economy.availableSeats})</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">${flight.seating.business.price} ({flight.seating.business.availableSeats})</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">${flight.seating.firstClass.price} ({flight.seating.firstClass.availableSeats})</td>
                                <td className="px-3 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(flight)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDelete(flight._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightManagement;