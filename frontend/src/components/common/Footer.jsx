// src/components/common/Footer.jsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-12 pt-10 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
                    
                    {/* Column 1: Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">FlyHigh</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Press</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Affiliates</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Booking */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Booking</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-indigo-400">Flight Status</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Route Map</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Online Check-in</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Baggage Info</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Legal & Privacy</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-indigo-400">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Cookies</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Responsible Disclosure</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Follow Us (Icons Placeholder) */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Download App</h4>
                        <div className="space-y-3">
                            <div className="bg-white text-gray-800 p-2 rounded-lg text-sm font-semibold text-center cursor-pointer">
                                Get it on Google Play
                            </div>
                            <div className="bg-white text-gray-800 p-2 rounded-lg text-sm font-semibold text-center cursor-pointer">
                                Download on the App Store
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} FlyHigh. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;