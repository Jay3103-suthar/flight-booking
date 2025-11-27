// src/api/flightService.js

import axios from 'axios';

// Base URL for your running backend server
const BASE_URL = "http://localhost:8000/api"; 



// 1. Service for fetching ALL or filtered flights
export const searchFlights = async ({ fromId, toId, departureDate }) => {
    
    // Format date as YYYY-MM-DD for the backend controller
    const formattedDate = departureDate ? new Date(departureDate).toISOString().split('T')[0] : undefined;

    try {
        const response = await axios.get(`${BASE_URL}/flights/search`, {
            params: {
                // Pass IDs and date only if they are available (for filtering)
                from: fromId || undefined, 
                to: toId || undefined,     
                date: formattedDate || undefined,
            }
        });
        
        return response.data; 
        
    } catch (error) {
        console.error("Flight Search API Error:", error.response?.data?.error || error.message);
        throw error.response?.data?.error || "Failed to fetch flights.";
    }
};

// 2. Service for fetching all airports (used by Autosuggest)
export const searchAirports = async (query = '') => {
    try {
        const response = await axios.get(`${BASE_URL}/airports`); 
        const airports = response.data;
        
        // Frontend filtering for autosuggest
        if (!query) return airports; 
        
        const lowerCaseQuery = query.toLowerCase();
        return airports.filter(airport => 
            airport.city.toLowerCase().includes(lowerCaseQuery) ||
            airport.airportName.toLowerCase().includes(lowerCaseQuery) ||
            airport.airportCode.toLowerCase().includes(lowerCaseQuery)
        );
        
    } catch (error) {
        console.error("Airport Fetch API Error:", error.response?.data?.error || error.message);
        return [];
    }
    
};
// 3. Get single flight by ID
export const getFlightById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/flights/${id}`);
        return response.data;
    } catch (error) {
        console.error("Fetch Single Flight Error:", error.response?.data || error.message);
        throw error;
    }
};
