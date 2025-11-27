// src/components/common/Header.jsx (Updated Navigation)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                
                {/* Logo and Navigation */}
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-3xl font-extrabold text-indigo-600">
                        FlyHigh
                    </Link> 
                    
                    {/* Main Navigation Links */}
                    <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
                        {/* Link to the new Flights Page */}
                        <Link to="/flights" className="hover:text-indigo-600 transition">Flights</Link> 
                        {user && <Link to="/my-bookings" className="hover:text-indigo-600 transition">My Bookings</Link>}
                        <Link to="/Contact" className="hover:text-indigo-600 transition">Contact us</Link>
                    </nav>
                </div>

                {/* Login/Logout and Tariffs */}
                <div className="flex items-center space-x-4">
                   
                    
                    {/* Dynamic Authentication Button */}
                    {!user ? (
                        <Link to="/admin/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md">
                            Login
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-700 font-semibold">
                                 <Link to="/profile" className="hover:text-indigo-600 transition">Hello, {user.username || user.email.split('@')[0]} 
                                {user.role === 'admin' && (
                                    <Link to="/admin/dashboard" className="ml-2 text-sm text-blue-500 hover:underline">(Admin)</Link>
                                )}</Link>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;