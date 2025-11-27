// src/components/home/StatsSection.jsx (REFINE to match Screenshot 42)

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const statsData = [
    { 
        id: 'dailyFlights',
        value: "2,200+", 
        label: "Daily Flights", 
        // Simple SVG icon placeholder
        icon: (
            <svg className="w-16 h-16 text-indigo-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l4.475-1.897 1.623-1.055 7.152-4.148a1 1 0 00-.317-1.868l-7-4.148z"/>
            </svg>
        ),
        isLargeCard: true
    },
    { id: 'domestic', value: "90+", label: "Domestic Destinations", isLargeCard: false },
    { id: 'international', value: "40+", label: "International Destinations", isLargeCard: false },
    { id: 'customers', value: "750 Mn+", label: "Happy Customers", isLargeCard: false },
    { id: 'fleet', value: "400+", label: "Fleet Strong", isLargeCard: false },
];

const StatsSection = () => {
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {statsData.map((stat, index) => (
                        <div 
                            key={stat.id} 
                            // Animation Logic: Large card slides from right (or left), others fade up staggered
                            data-aos={stat.isLargeCard ? "fade-down" : "fade-up"}
                            data-aos-delay={index * 100} // Stagger delay based on index
                            className={`
                                p-6 rounded-xl shadow-lg 
                                flex flex-col justify-center 
                                transition-transform duration-300 hover:-translate-y-1
                                ${stat.isLargeCard 
                                    // Primary Card: Dark Indigo background
                                    ? 'bg-indigo-900 text-white col-span-2 row-span-2' 
                                    : 'bg-white text-gray-800' // Secondary Cards: White background
                                }
                            `}
                        >
                            {stat.isLargeCard && stat.icon && (
                                <div className="mb-4">{stat.icon}</div>
                            )}
                            <h3 className={`font-extrabold ${stat.isLargeCard ? 'text-6xl md:text-7xl' : 'text-3xl'} mb-2`}>
                                {stat.value}
                            </h3>
                            <p className={`font-semibold ${stat.isLargeCard ? 'text-indigo-200 text-xl' : 'text-gray-600'}`}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;