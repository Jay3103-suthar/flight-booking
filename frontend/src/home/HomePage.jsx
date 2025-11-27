// src/home/HomePage.jsx

import React, { useEffect } from 'react';

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

// Common Components (Header & Footer)
import Header from '../components/common/Header'; 
import Footer from '../components/common/Footer';

// Home Feature Components
import HeroSection from './HeroSection';
import Hero from './hero.jsx' // Primary banner component (used below)
import PopularRoutes from '../components/home/PopularRoutes';
import FAQSection from './FAQSection';
import StatsSection from '../components/home/StatsSection';
import DestinationSpotlight from '../components/home/DestinationSpotlight';

const HomePage = () => {
    
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in ms
            offset: 100,    // Offset (in px) from the original trigger point
            once: true,     // Whether animation should happen only once while scrolling down
            easing: 'ease-out', // Easing pattern
        });
    }, []);

    return (
        // Added overflow-x-hidden to prevent horizontal scrollbars during slide-in animations
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            
            {/* 1. Header (Navigation & Auth) */}
            <Header /> 
            
            <main>
                
                {/* 2. Primary Hero/Search Component */}
                {/* This section likely contains the main banner or search form (Hero component) */}
                <div 
                    // Missing Tailwind classes for centering/overlap (e.g., container mx-auto px-4 -mt-24 z-10 relative)
                    data-aos="zoom-in"
                    data-aos-delay="200" 
                >
                    {/* Assuming Hero.jsx contains the main banner/search interface */}
                    <Hero /> 
                </div>
                
                {/* --- Content Sections Below the Fold --- */}
                <div className="container mx-auto px-4 mt-12">
                    
                    {/* 3. Popular Routes */}
                    <div data-aos="fade-up">
                        <PopularRoutes />
                    </div>
                    
                    {/* 4. Popular Destinations & Stats Section */}
                    <section className="py-12">
                        <h2 
                            className="text-3xl font-bold mb-8 text-gray-800"
                            data-aos="fade-up"
                        >
                            Popular Destinations
                        </h2>
                        
                        <div className="text-gray-600">
                             {/* Destination Spotlight Component */}
                             <div data-aos="zoom-in">
                                <DestinationSpotlight />
                             </div>
                        </div>

                        {/* Stats Section */}
                        <div data-aos="fade-left" data-aos-delay="100">
                            <StatsSection />
                        </div>
                    </section>
                    
                    {/* 5. FAQ Section */}
                    <div data-aos="fade-right" data-aos-delay="200" className="mb-16">
                        <FAQSection /> 
                    </div>
                    
                </div>
                
                {/* 6. Secondary Hero Section (Currently outside main flow, likely an old/test component) */}
                <div data-aos="zoom-out" className="pt-[15px]">
                    <HeroSection />
                </div>
                
            </main>
            
            {/* 7. Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;