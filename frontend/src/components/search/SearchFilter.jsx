// src/components/search/SearchFilter.jsx (CORRECTED)

import React, { useState } from 'react';

// Define the default filter state here so it's always available
const DEFAULT_FILTERS = {
    maxPrice: 25000,
    maxDuration: 20,
    stops: { direct: true, oneStop: true, twoPlus: false }
};

// Component now accepts initialFilters, but uses DEFAULT_FILTERS if it's undefined
const SearchFilter = ({ onFilterChange, initialFilters }) => {
    
    // FIX: Initialize state using initialFilters OR DEFAULT_FILTERS
    const [filters, setFilters] = useState(initialFilters || DEFAULT_FILTERS);

    // Handles changes for range inputs (Price, Duration)
    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: Number(value) }));
    };

    // Handles changes for checkbox inputs (Stops)
    const handleStopsChange = (stopType) => {
        setFilters(prev => ({ 
            ...prev, 
            stops: { ...prev.stops, [stopType]: !prev.stops[stopType] }
        }));
    };
    
    // Function to apply filters back to the parent
    const applyFilters = () => {
        onFilterChange(filters);
    };

    const clearFilters = () => {
        const newFilters = DEFAULT_FILTERS;
        setFilters(newFilters);
        onFilterChange(newFilters); // Immediately apply cleared filters
    };

    return (
        <div className="md:sticky md:top-24 bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-2xl font-extrabold mb-5 text-indigo-700">Refine Search</h3>

            {/* Price Range Filter (Now uses filters.maxPrice safely) */}
            <div className="mb-8 border-b pb-4">
                <h4 className="font-bold mb-3 text-gray-700">Max Price: ₹{filters.maxPrice.toLocaleString()}</h4>
                <input 
                    type="range" 
                    name="maxPrice"
                    min="1000" 
                    max="25000" 
                    step="500" 
                    value={filters.maxPrice}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            {/* Stops Filter */}
            <div className="mb-8 border-b pb-4">
                <h4 className="font-bold mb-3 text-gray-700">Stops</h4>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 text-sm text-gray-700">
                        <input type="checkbox" checked={filters.stops.direct} onChange={() => handleStopsChange('direct')} className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span>Direct (0 Stops)</span>
                    </label>
                    <label className="flex items-center space-x-3 text-sm text-gray-700">
                        <input type="checkbox" checked={filters.stops.oneStop} onChange={() => handleStopsChange('oneStop')} className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span>1 Stop</span>
                    </label>
                    <label className="flex items-center space-x-3 text-sm text-gray-700">
                        <input type="checkbox" checked={filters.stops.twoPlus} onChange={() => handleStopsChange('twoPlus')} className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span>2+ Stops</span>
                    </label>
                </div>
            </div>
            
            {/* Duration Filter */}
            <div className="mb-8">
                <h4 className="font-bold mb-3 text-gray-700">Max Duration: {filters.maxDuration} Hours</h4>
                <input 
                    type="range" 
                    name="maxDuration"
                    min="1" 
                    max="20" 
                    value={filters.maxDuration}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                />
            </div>
            
          <button onClick={applyFilters}
                 className="w-full bg-sky-500 text-white py-3 rounded-xl font-extrabold hover:bg-sky-600 transition shadow-md">
                Apply Filters
          </button>

            <button onClick={clearFilters} className="w-full mt-2 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
                Clear Filters
            </button>
        </div>
    );
};

export default SearchFilter;