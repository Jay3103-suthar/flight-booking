// src/App.jsx (FINAL CORRECTED IMPORTS)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';        
import AdminLogin from './Login/register/AdminLogin.jsx';    
import AdminDashboard from './admin/AdminDashboard.jsx'; 
import ProtectedRoute from './components/common/ProtectedRoute'; 
import BookingPage from './My-booking/BookingPage.jsx';

// CRITICAL FIX: Ensure these components are imported from their full page files:
import FlightsPage from './pages/FlightsPage.jsx'; 
import SearchResultsPage from './pages/SearchResultsPage'; // <--- THIS IS THE CORRECT PAGE COMPONENT
import Contact from './pages/contact.jsx';
import PaymentPage from './My-booking/PaymentPage.jsx';
import Register from './Login/register/Register.jsx';
import Bookingsuccess from './My-booking/BookingSuccess.jsx'
import MyBookings from './My-booking/MyBookings.jsx';



const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/booking/:flightId" element={<BookingPage />} />
               <Route path="/payment" element={<PaymentPage />} />
               <Route path="/register" element={<Register />} />
               <Route path="/booking-success" element={<Bookingsuccess />} />
               <Route path="/my-bookings" element={<MyBookings />} />
             


                <Route path="/Contact" element={<Contact />} />
                
                {/* FINAL WORKING ROUTES */}
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/search" element={<SearchResultsPage />} /> 

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                </Route>

                <Route path="*" element={<h1>404: Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;