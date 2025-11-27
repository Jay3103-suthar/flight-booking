// src/components/home/PopularRoutes.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const routesData = [
    { city: "Mumbai", image: "/images/mumbai.png", destinations: ["Goa", "Delhi", "Bangalore", "Ahmedabad"] },
    { city: "Delhi", image: "/images/delhi.png", destinations: ["Mumbai", "Goa", "Bangalore", "Pune"] },
    { city: "Kolkata", image: "/images/kolkata.png", destinations: ["Mumbai", "Delhi", "Bangalore", "Bagdogra"] },
    { city: "Chennai", image: "/images/chennai.png", destinations: ["Mumbai", "Delhi", "Madurai", "Coimbatore"] },
];

const PopularRoutes = () => {
    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Popular Flight Routes</h2>

            <div className="space-y-4"
                   data-aos="fade-up">
                {routesData.map((route, index) => (
                    <div
                        key={index}
                        className="flex items-center p-4 border rounded-xl hover:shadow-lg transition duration-300 bg-white cursor-pointer"
                    >
                        <div className="flex-shrink-0 w-16 h-16 mr-4 rounded-lg overflow-hidden"
                           data-aos="zoom-in">
                            <img 
                                src={route.image} 
                                alt={route.city} 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div    data-aos="fade-left">
                            <h3 className="text-xl font-semibold mb-1">{route.city} Flights</h3>

                            <p className="text-sm text-gray-500">
                                To:
                                {route.destinations.map((dest, i) => (
                                    <Link key={i} to={`/flights/${route.city}-${dest}`} className="text-blue-600 hover:underline ml-1">
                                        {dest}{i < route.destinations.length - 1 ? ',' : ''}
                                    </Link>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularRoutes;
