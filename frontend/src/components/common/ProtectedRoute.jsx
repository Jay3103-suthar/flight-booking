// src/components/common/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { isAdmin, user } = useAuth();
    
    // 1. If NO user is logged in, redirect to login page.
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }
    
    // 2. If user IS logged in, but is NOT an admin, redirect to homepage 
    //    (or show a 403 Forbidden page).
    if (!isAdmin) {
        // You can customize the unauthorized redirect location
        return <Navigate to="/" replace />; 
    }

    // 3. If user is logged in AND is an admin, render the child route (e.g., Dashboard)
    return <Outlet />; 
};

export default ProtectedRoute;