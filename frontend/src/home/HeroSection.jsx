// src/components/home/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative h-96 bg-indigo-800 overflow-hidden">
            {/* Background Image/Placeholder */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30" 
                style={{ backgroundImage: "url('/images/amsterdam-canal.jpg')" }} // Placeholder image path
            >
                            </div>
            
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
                <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                    Embark on a journey of inspiration with FlyHigh
                </h1>
                <p className="text-xl font-light max-w-lg mb-8">
                    Discover your next destination with seamless booking and great deals, where discovery meets the sky.
                </p>
                
                {/* Search form positioning is handled in HomePage.jsx (-mt-24) */}
            </div>
        </div>
    );
};

export default HeroSection;