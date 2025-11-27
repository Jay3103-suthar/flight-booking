// src/pages/FlightsPage.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header'; 
import Footer from '../components/common/Footer'; 
import FlightCard from '../components/search/FlightCard';
import SearchFilter from '../components/search/SearchFilter';
import AirportAutosuggest from '../components/common/AirportAutosuggest'; 
import DateSelector from '../components/common/DateSelector';
import OutsideClickDetector from '../components/common/OutsideClickDetector';
import { searchFlights } from '../api/flightService'; 

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

// Default filter state
const DEFAULT_FILTERS = {
    maxPrice: 25000,
    maxDuration: 20,
    stops: { direct: true, oneStop: true, twoPlus: true }
};

const POPUP_STATE = { NONE: null, FROM: 'FROM', TO: 'TO', DATE: 'DATE' };


// Helper function to calculate duration in hours for filtering
const getDurationInHours = (depTime, arrTime) => {
    const diffMs = new Date(arrTime) - new Date(depTime);
    return diffMs / 3600000;
};


const FlightsPage = () => {
    const [allFlights, setAllFlights] = useState([]); // Master list of flights
    const [filteredFlights, setFilteredFlights] = useState([]); // List currently displayed
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(DEFAULT_FILTERS); // Sidebar filters
    
    // State for the mini search bar (API filter)
    const [searchParams, setSearchParams] = useState({
        fromId: '', toId: '', departureDate: new Date().toISOString().split('T')[0],
        fromCity: 'Any Origin', toCity: 'Any Destination'
    });
    const [activePopup, setActivePopup] = useState(POPUP_STATE.NONE);

    // --- AOS Initialization ---
    useEffect(() => {
        AOS.init({
            duration: 800, // Slightly faster than home page for snappier feel
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }, []);

    // --- 1. Client-Side Filtering Logic ---
    const applyClientFilters = (flightsToFilter, currentFilters) => {
        return flightsToFilter.filter(flight => {
            
            // 1. Price Filter (using economy as baseline for simplicity)
            const minClassPrice = flight.seating.economy.price;
            if (minClassPrice > currentFilters.maxPrice) return false;

            // 2. Stops Filter (Your data structure assumes direct, so this is mock logic)
            // For now, we assume all results from the API are 'Direct' flights.
            if (!currentFilters.stops.direct) return false; // Hide all if direct is unchecked

            // 3. Duration Filter
            const duration = getDurationInHours(flight.departureTime, flight.arrivalTime);
            if (duration > currentFilters.maxDuration) return false;

            // 4. Seats/Travellers Filter (CRITICAL: Must have at least 1 economy seat)
            if (flight.seating.economy.availableSeats < 1) return false; 

            return true;
        });
    };

    // --- 2. Initial Data Fetch ---
    const fetchData = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchFlights(params); 
            setAllFlights(data); // Save the raw data
            setFilteredFlights(applyClientFilters(data, filters)); // Apply initial filters
            
            // Re-trigger AOS refresh after data loads so new elements animate
            setTimeout(() => AOS.refresh(), 100); 

        } catch (err) {
            setError(err.message || 'Failed to fetch flights.');
            setAllFlights([]);
            setFilteredFlights([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData({});
    }, []);

    // --- 3. React to Filter Changes (Sidebar) ---
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Apply the new filters to the master list and update the display list
        setFilteredFlights(applyClientFilters(allFlights, newFilters));
        setTimeout(() => AOS.refresh(), 100); // Refresh animations on filter change
    };


    // --- 4. Search Submission Handler (API Filter) ---
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        
        const params = {
            fromId: searchParams.fromId,
            toId: searchParams.toId,
            departureDate: searchParams.departureDate,
        };
        // This clears all client-side filters and fetches new data from the API
        fetchData(params); 
        setActivePopup(POPUP_STATE.NONE);
    };

    const closeAllPopups = () => setActivePopup(POPUP_STATE.NONE);

    const handleCitySelect = (city, id, airportDetail, isDeparture) => {
        setSearchParams(prev => ({ 
            ...prev,
            ...(isDeparture ? { fromCity: city, fromId: id } : { toCity: city, toId: id })
        }));
        setActivePopup(POPUP_STATE.NONE);
    };

    const handleDateSelect = (date) => {
        setSearchParams(prev => ({ ...prev, departureDate: date }));
        setActivePopup(POPUP_STATE.NONE);
    };
    
    // --- Mini Search Bar Component ---
    const MiniSearchComponent = () => (
        // Added fade-down animation here
        <div data-aos="fade-down" className="bg-white border-b py-4 shadow-sm mb-8 sticky top-16 z-20">
            <OutsideClickDetector onClickOutside={closeAllPopups}>
                <div className="container mx-auto px-4 flex flex-wrap items-center justify-between space-y-3 md:space-y-0">
                    <h2 className="text-xl font-bold text-indigo-700">Filter Flights</h2>

                    <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center space-x-3 text-sm">
                        {/* From Input */}
                        <div className="relative">
                            <input type="text" value={searchParams.fromCity} onClick={() => setActivePopup(POPUP_STATE.FROM)} readOnly className="p-2 border rounded-lg cursor-pointer min-w-[120px] focus:ring-indigo-500 focus:border-indigo-500"/>
                            {activePopup === POPUP_STATE.FROM && (<AirportAutosuggest onSelect={(city, id, detail) => handleCitySelect(city, id, detail, true)} onClose={closeAllPopups} initialQuery={searchParams.fromCity === 'Any Origin' ? '' : searchParams.fromCity}/>)}
                        </div>

                        {/* To Input */}
                        <div className="relative">
                            <input type="text" value={searchParams.toCity} onClick={() => setActivePopup(POPUP_STATE.TO)} readOnly className="p-2 border rounded-lg cursor-pointer min-w-[120px] focus:ring-indigo-500 focus:border-indigo-500"/>
                            {activePopup === POPUP_STATE.TO && (<AirportAutosuggest onSelect={(city, id, detail) => handleCitySelect(city, id, detail, false)} onClose={closeAllPopups} initialQuery={searchParams.toCity === 'Any Destination' ? '' : searchParams.toCity}/>)}
                        </div>
                        
                        {/* Date Input */}
                        <div className="relative">
                            <input type="text" value={searchParams.departureDate} onClick={() => setActivePopup(POPUP_STATE.DATE)} readOnly className="p-2 border rounded-lg cursor-pointer min-w-[120px] focus:ring-indigo-500 focus:border-indigo-500"/>
                            {activePopup === POPUP_STATE.DATE && (
                                <DateSelector title="Departure Date" date={searchParams.departureDate} onSelectDate={handleDateSelect} onClose={closeAllPopups}/>
                            )}
                        </div>

                        <button type="submit" disabled={loading}
                             className="bg-sky-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-sky-600 transition disabled:bg-gray-400">
                            Filter
                        </button>

                        
                        <button type="button" onClick={() => {
                            setSearchParams({ fromId: '', toId: '', departureDate: new Date().toISOString().split('T')[0], fromCity: 'Any Origin', toCity: 'Any Destination' });
                            fetchData({}); 
                        }} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Clear</button>
                    </form>
                </div>
            </OutsideClickDetector>
        </div>
    );
    // --- End Mini Search Component ---


    const renderContent = () => {
        if (loading) { 
            return <div data-aos="zoom-in" className="text-center p-10 text-xl text-indigo-600">Loading flights... ✈️</div>; 
        }
        if (error) { 
            return <div data-aos="fade-up" className="text-center p-10 text-red-600 border border-red-300 bg-red-50 rounded-lg">Error: {error}</div>; 
        }
        if (filteredFlights.length === 0) { 
            return <div data-aos="fade-up" className="text-center p-10 text-gray-600">No flights found matching your criteria.</div>; 
        }

        return (
            <div className="space-y-4">
                {filteredFlights.map((flight, index) => (
                    // Added fade-up with a staggered delay based on index
                    <div 
                        key={flight._id} 
                        data-aos="fade-up" 
                        data-aos-delay={index * 100} // Stagger effect: 0ms, 100ms, 200ms...
                        data-aos-anchor-placement="top-bottom"
                    >
                        <FlightCard flight={flight} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main>
                <MiniSearchComponent />

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        
                        {/* Left Column: Filter Sidebar */}
                        {/* Added fade-right animation for the sidebar */}
                        <div className="md:col-span-1 hidden md:block" data-aos="fade-right">
                            <SearchFilter onFilterChange={handleFilterChange} initialFilters={filters} />
                        </div>
                        
                        {/* Right Column: Flight List */}
                        <div className="md:col-span-3">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FlightsPage;