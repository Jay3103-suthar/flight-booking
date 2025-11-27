import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlightManagement from './FlightManagement';
import AirportManagement from './AirportManagement';
import BookingManagement from './BookingManagement';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    const { isAdmin, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('flights');

    // Protect the route
    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'airports':
                return <AirportManagement />;
            case 'flights':
                return <FlightManagement />;
           case 'bookings':
                return <BookingManagement />;
            case 'User':
                return <UserManagement />;

            default:
                return <FlightManagement />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ✈️  Admin Panel
                    </h1>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <TabButton name="Flights" tabKey="flights" currentTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name="Airports" tabKey="airports" currentTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name="Bookings" tabKey="bookings" currentTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name="Users" tabKey="User" currentTab={activeTab} setActiveTab={setActiveTab} />

                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper component for Tab Buttons
const TabButton = ({ name, tabKey, currentTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(tabKey)}
        className={`${
            currentTab === tabKey
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
    >
        {name}
    </button>
);

export default AdminDashboard;