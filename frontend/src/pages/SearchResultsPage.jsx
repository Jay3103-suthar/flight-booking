// src/pages/SearchResultsPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header'; 
import Footer from '../components/common/Footer'; 
import FlightCard from '../components/search/FlightCard';
import SearchFilter from '../components/search/SearchFilter';
import { searchFlights } from '../api/flightService'; // Must ensure path is correct


const SearchResultsPage = () => {
    const location = useLocation();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayInfo, setDisplayInfo] = useState({ from: 'Departure', to: 'Arrival', date: '' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        // Get MongoDB IDs and date from URL parameters
        const searchData = {
            fromId: params.get('from'),
            toId: params.get('to'),
            departureDate: params.get('date'),
        };
        
        if (!searchData.fromId || !searchData.toId || !searchData.departureDate) {
            setError("Missing required search parameters (From, To, or Date). Please return to the homepage and search again.");
            setLoading(false);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // CALLS YOUR BACKEND API (GET /api/flights/search)
                const results = await searchFlights(searchData); 
                
                setFlights(results);
                
                // Set display info using the populated airport data from the results
                if (results.length > 0) {
                    setDisplayInfo({
                        // Accessing populated fields from your controller response
                        from: results[0].departureAirport.city, 
                        to: results[0].arrivalAirport.city,
                        date: new Date(searchData.departureDate).toLocaleDateString(),
                    });
                } else {
                     setDisplayInfo({
                        from: searchData.fromId, to: searchData.toId, date: new Date(searchData.departureDate).toLocaleDateString(),
                    });
                }

            } catch (err) {
                console.error("Search API failed:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [location.search]); 

    const renderContent = () => {
        if (loading) {
            return <div className="text-center p-10 text-xl text-indigo-600">Loading available flights... ✈️</div>;
        }
        if (error) {
            return <div className="text-center p-10 text-red-600 border border-red-300 bg-red-50 rounded-lg">Error: {error}</div>;
        }
        if (flights.length === 0) {
            return <div className="text-center p-10 text-gray-600">No flights found for this route and date.</div>;
        }

        return (
            <div className="space-y-4">
                {flights.map(flight => (
                    <FlightCard key={flight._id} flight={flight} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Flights from {displayInfo.from} to {displayInfo.to} on {displayInfo.date}
                </h1>

                {/* Responsive Grid Layout for Filter and Results */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Left Column: Filter Sidebar */}
                    <div className="md:col-span-1">
                        <SearchFilter />
                    </div>

                    {/* Right Column: Flight Results */}
                    <div className="md:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SearchResultsPage;