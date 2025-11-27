import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000/api'; // Matches your server port/prefix

function FlightSearchForm({ onSearch }) {
  const [airports, setAirports] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Step 1: Fetch Airports on Load ---
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/airports`); // Calls GET /api/airports
        const data = await response.json();
        setAirports(data);
        if (data.length > 0) {
          // Set initial values if airports exist
          setFrom(data[0]._id); 
          setTo(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch airports:", error);
      }
    };
    fetchAirports();
  }, []);

  // --- Step 2: Search Flights on Submit ---
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Build the query string for searchFlights endpoint
      const response = await fetch(
        `${API_BASE_URL}/flights/search?from=${from}&to=${to}&date=${date}`
      );
      
      if (!response.ok) {
        throw new Error('Flight search failed');
      }

      const flights = await response.json();
      onSearch(flights); // Pass results to the parent component (e.g., HomePage)
    } catch (error) {
      console.error("Error searching flights:", error);
      onSearch([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
      {/* Airport Dropdowns (Use the airport ID for the backend) */}
      <select value={from} onChange={(e) => setFrom(e.target.value)} required>
        <option value="">Departure Airport</option>
        {airports.map(airport => (
          // Value is the MongoDB _id, which the backend requires for the query
          <option key={airport._id} value={airport._id}>
            {airport.city} ({airport.airportCode})
          </option>
        ))}
      </select>
      
      <select value={to} onChange={(e) => setTo(e.target.value)} required>
        <option value="">Arrival Airport</option>
        {airports.map(airport => (
          <option key={airport._id} value={airport._id}>
            {airport.city} ({airport.airportCode})
          </option>
        ))}
      </select>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search Flights'}
      </button>
    </form>
  );
}

export default FlightSearchForm;