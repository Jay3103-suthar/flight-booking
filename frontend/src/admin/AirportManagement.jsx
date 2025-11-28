import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_BACKEND_URL + "/api/airports";

const AirportManagement = () => {
    const { token } = useAuth();
    const [airports, setAirports] = useState([]);
    const [formData, setFormData] = useState({ airportName: '', airportCode: '', city: '', country: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchAirports = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAirports(res.data);
            setError('');
        } catch (err) {
            setError("Failed to fetch airports. Check network or server logs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAirports();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditing) {
                await axios.put(`${API}/${editingId}`, formData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                await axios.post(API, formData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }

            setFormData({ airportName: '', airportCode: '', city: '', country: '' });
            setIsEditing(false);
            setEditingId(null);
            fetchAirports();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to save airport.");
        }
    };

    const handleEdit = (airport) => {
        setFormData({
            airportName: airport.airportName,
            airportCode: airport.airportCode,
            city: airport.city,
            country: airport.country,
        });
        setIsEditing(true);
        setEditingId(airport._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this airport?")) return;
        setError('');
        try {
            await axios.delete(`${API}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchAirports();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to delete airport.");
        }
    };

    if (loading) return <div className="text-center p-4">Loading Airports...</div>;

    return (
        <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Airport Management</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4 mb-6 p-4 border rounded">
                <input type="text" name="airportName" value={formData.airportName} onChange={handleChange} placeholder="Name" required className="p-2 border rounded" />
                <input type="text" name="airportCode" value={formData.airportCode} onChange={handleChange} placeholder="Code" required className="p-2 border rounded uppercase" maxLength="3" />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="p-2 border rounded" />
                <button type="submit" className={`p-2 rounded font-bold text-white ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}>
                    {isEditing ? 'Update Airport' : 'Add Airport'}
                </button>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {airports.map((airport) => (
                            <tr key={airport._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{airport.airportName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{airport.airportCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{airport.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{airport.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(airport)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDelete(airport._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AirportManagement;
