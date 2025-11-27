// src/components/home/SpecialFareSelector.jsx

import React, { useState } from 'react';

const fareTypes = [
    { name: 'Regular', desc: 'Regular fares' },
    { name: 'Student', desc: 'Extra discounts/baggage' },
    { name: 'Armed Forces', desc: 'Up to ₹ 600 off' },
    { name: 'Senior Citizen', desc: 'Up to ₹ 600 off' },
    { name: 'Doctor and Nurses', desc: 'Up to ₹ 600 off' },
];

const SpecialFareSelector = () => {
    const [activeFare, setActiveFare] = useState('Regular');

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-700 mb-2">Select a special fare</span>
            <div className="flex flex-wrap space-x-2">
                {fareTypes.map((fare) => (
                    <button
                        key={fare.name}
                        onClick={() => setActiveFare(fare.name)}
                        className={`
                            border py-2 px-4 rounded-lg text-sm text-left transition duration-200
                            ${activeFare === fare.name 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }
                        `}
                    >
                        <span className="font-semibold block">{fare.name}</span>
                        <span className="text-xs opacity-80">{fare.desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpecialFareSelector;