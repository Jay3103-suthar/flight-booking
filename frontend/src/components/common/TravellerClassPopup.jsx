// src/components/common/TravellerClassPopup.jsx

import React from 'react';

const TravellerClassPopup = ({ details, setDetails, onApply }) => {

    const classOptions = ['Economy/Premium Economy', 'Premium Economy', 'Business', 'First Class'];
    
    const handleCountChange = (type, action) => {
        setDetails(prev => {
            let newCount = prev[type];
            if (action === 'increment') {
                newCount = Math.min(prev[type] + 1, type === 'adults' ? 9 : 6); // Max limits
            } else if (action === 'decrement') {
                newCount = Math.max(prev[type] - 1, 0);
            }

            // Ensure at least 1 adult is always selected
            if (type === 'adults' && newCount === 0) newCount = 1;

            return { ...prev, [type]: newCount };
        });
    };

    const NumberSelector = ({ title, type, min }) => (
        <div className="mb-4">
            <h4 className="text-gray-700 font-semibold">{title}</h4>
            <div className="flex space-x-2 mt-2">
                {[...Array(9).keys()].map(i => i + min).map(n => (
                    <button 
                        key={n}
                        className={`w-8 h-8 rounded-full text-sm font-semibold transition 
                            ${details[type] === n ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}
                            ${(type === 'adults' && n > 9) || (type !== 'adults' && n > 6) ? 'opacity-50 cursor-default' : ''}
                        `}
                        onClick={() => setDetails(p => ({ ...p, [type]: n }))}
                        disabled={(type === 'adults' && n > 9) || (type !== 'adults' && n > 6)}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="absolute top-full right-0 mt-2 p-6 w-80 bg-white border border-gray-300 rounded-lg shadow-2xl z-20">
            <NumberSelector title="ADULTS (12y +)" type="adults" min={1} />
            <NumberSelector title="CHILDREN (2y - 12y)" type="children" min={0} />
            <NumberSelector title="INFANTS (below 2y)" type="infants" min={0} />

            <h4 className="text-gray-700 font-semibold mt-4">CHOOSE TRAVEL CLASS</h4>
            <div className="flex flex-wrap space-x-2 mt-2">
                {classOptions.map(c => (
                    <button 
                        key={c}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition my-1
                            ${details.class === c ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
                        `}
                        onClick={() => setDetails(p => ({ ...p, class: c }))}
                    >
                        {c.split('/')[0]} 
                    </button>
                ))}
            </div>

            <button 
                className="mt-6 float-right bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
                onClick={onApply}
            >
                APPLY
            </button>
        </div>
    );
};

export default TravellerClassPopup;