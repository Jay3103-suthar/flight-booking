// src/components/home/DestinationSpotlight.jsx (FINAL RECIPROCATING SCROLL)

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';
// Sample destination data (In real app, this might come from props or API)
const allDestinations = [
    { name: 'London', image: '/images/London.png', isNew: true },
    { name: 'Guangzhou', image: '/images/Guangzhou.png', isNew: true },
    { name: 'Athens', image: '/images/Athens.png', isNew: true },
    { name: 'Amsterdam', image: '/images/Amsterdam.png', isNew: false },
    { name: 'Manchester', image: '/images/Manchester.png', isNew: false },
    { name: 'Fujairah', image: '/images/Fujairah.png', isNew: false },
    { name: 'Krabi', image: '/images/Krabi.png', isNew: false },
    { name: 'Seychelles', image: '/images/Seychelles.png', isNew: false },
    { name: 'Bikaner', image: '/images/Bikane.png', isNew: false },
    { name: 'Dubai', image: '/images/Dubai.png', isNew: false },
    { name: 'Paris', image: '/images/Paris.png', isNew: false },
    { name: 'Rome', image: '/images/Rome.png', isNew: false },
];


const DestinationCard = ({ name, image, isNew }) => (
    <Link 
        to={`/search?toCity=${name}`} 
        className="flex flex-col items-center p-2 group flex-shrink-0" 
    >
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-transparent group-hover:border-indigo-500 transition duration-300 shadow-md">
            {/* Image Placeholder */}
            <div  
                className="w-full h-full bg-gray-300 bg-cover bg-center flex items-center justify-center text-xs text-gray-700"
                style={{ backgroundImage: `url(${image})` }}
            >
                {/*  */}
            </div>
            
            {/* 'New' Tag */}
            {isNew && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                    Hot 
                </span>
            )}
        </div>
        <p className="mt-2 text-center text-sm font-medium text-gray-700 group-hover:text-indigo-600">
            {name}
        </p>
    </Link>
);

const DestinationSpotlight = () => {
    const containerRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false); 
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left

    // --- Reciprocating Auto-Scroll Logic ---
    useEffect(() => {
        const container = containerRef.current;
        
        // CRITICAL FIX: Stop the interval if the view is expanded
        if (isExpanded || !container) {
            return; 
        }

        let scrollInterval;
        
        const scrollStep = 3;   // Pixels per step (Fast slicing)
        const intervalTime = 20; // Time between steps in milliseconds

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                
                const maxScroll = container.scrollWidth - container.clientWidth;

                setDirection(currentDirection => {
                    let newDirection = currentDirection;
                    
                    if (currentDirection === 1) {
                        // Scrolling right
                        if (container.scrollLeft >= maxScroll) {
                            newDirection = -1; // Reverse to left
                            container.scrollLeft -= scrollStep; 
                        } else {
                            container.scrollLeft += scrollStep;
                        }
                    } else {
                        // Scrolling left
                        if (container.scrollLeft <= 0) {
                            newDirection = 1; // Reverse to right
                            container.scrollLeft += scrollStep; 
                        } else {
                            container.scrollLeft -= scrollStep;
                        }
                    }
                    return newDirection;
                });
            }, intervalTime);
        };

        const stopScrolling = () => {
            clearInterval(scrollInterval);
        };
        
        startScrolling();
        
        // Pause scrolling when mouse is over the carousel
        container.addEventListener('mouseenter', stopScrolling);
        container.addEventListener('mouseleave', startScrolling);

        // Cleanup function
        return () => {
            stopScrolling();
            if (container) {
                container.removeEventListener('mouseenter', stopScrolling);
                container.removeEventListener('mouseleave', startScrolling);
            }
        };
    }, [isExpanded]); // Rerun effect when expansion state changes


    // Logic for View All/Collapse button
    const INITIAL_VISIBLE_COUNT = 10;
    const destinationsToDisplay = isExpanded ? allDestinations : allDestinations.slice(0, INITIAL_VISIBLE_COUNT);


    return (
        <section className="py-12">
            <div className="container mx-auto px-4"
            data-aos="fade-left">
                
                {/* 1. Destination Cards Container (Horizontal Scroll/Expanded Grid) */}
                <div   
                    ref={containerRef}
                    // Toggle classes based on isExpanded state
                    className={`
                        justify-start space-x-6 pb-4 
                        ${isExpanded 
                            ? 'grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-8 gap-x-4 overflow-x-hidden flex-wrap' 
                            : 'flex overflow-x-scroll overflow-y-hidden scroll-smooth'
                        }
                    `}
                    // Hides the native scrollbar element (CSS trick)
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
                >
                    {destinationsToDisplay.map((dest, index) => (
                        <DestinationCard 
                            key={index}
                            name={dest.name}
                            image={dest.image}
                            isNew={dest.isNew}
                        />
                    ))}
                </div>
                
                {/* 2. View All Button Logic */}
                <div className="text-center mt-6">
                    {/* View All Button */}
                    {!isExpanded && allDestinations.length > INITIAL_VISIBLE_COUNT && (
                        <button 
                            onClick={() => setIsExpanded(true)} // <-- Toggles state to show all
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            View All Destinations &rarr;
                        </button>
                    )}
                    
                    {/* Collapse Button */}
                    {isExpanded && (
                        <button 
                            onClick={() => setIsExpanded(false)} // <-- Toggles state back to initial view
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            &larr; Collapse View
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DestinationSpotlight;