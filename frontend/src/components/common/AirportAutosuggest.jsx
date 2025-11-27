// src/components/common/AirportAutosuggest.jsx

import React, { useState, useEffect, useRef } from 'react';
import { searchAirports } from '../../api/flightService'; 

// --- Debounce Hook (Essential for performance) ---
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
        return () => { clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
};


const AirportAutosuggest = ({ onSelect, onClose, initialQuery }) => {
    const [query, setQuery] = useState(initialQuery || '');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                // Calls the service which fetches all and filters locally
                const results = await searchAirports(debouncedQuery); 
                setSuggestions(results);
            } catch (error) {
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleAirportSelect = (airport) => {
        // Passes the essential MongoDB _id back to the parent form
        const airportDetail = `${airport.airportCode}, ${airport.city} - ${airport.airportName}`;
        onSelect(airport.city, airport._id, airportDetail);
        onClose(); 
    };

    return (
        <div className="absolute top-0 left-0 w-full bg-white border border-gray-300 rounded-xl shadow-2xl z-30 min-h-64 p-4">
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter city or airport name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-xl font-bold p-2 border-b-2 border-orange-500 focus:outline-none"
            />
            
            <div className="mt-4 max-h-80 overflow-y-auto">
                {loading && <div className="text-center text-blue-600">Loading suggestions...</div>}
                
                {!loading && suggestions.length > 0 ? (
                    suggestions.map((airport) => (
                        <div
                            key={airport._id}
                            className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleAirportSelect(airport)}
                        >
                            <div className="font-semibold text-gray-800">{airport.city} ({airport.airportCode})</div>
                            <div className="text-sm text-gray-500">{airport.airportName}</div>
                        </div>
                    ))
                ) : !loading && debouncedQuery.length > 0 ? (
                    <div className="p-3 text-center text-gray-500">No matching airports found.</div>
                ) : (
                    <div className="p-3 text-center text-gray-500">Start typing to search airports.</div>
                )}
            </div>

            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
    );
};

export default AirportAutosuggest;