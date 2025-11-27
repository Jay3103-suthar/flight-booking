// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = "http://localhost:8000/api"; 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    const isAdmin = user?.role === "admin";

    // =========================================
    // LOGIN FUNCTION
    // =========================================
    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("userId", res.data.user._id); 

            setToken(res.data.token);
            setUser(res.data.user);

            return res.data.user; // <== IMPORTANT FOR ROLE REDIRECT
        } catch (error) {
            throw error.response?.data?.message || "Login failed";
        } finally {
            setLoading(false);
        }
    };

    // =========================================
    // REGISTER USER
    // =========================================
    const register = async (formData) => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, formData);
            return res.data;
        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        }
    };

    // =========================================
    // LOGOUT FUNCTION
    // =========================================
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");

        setUser(null);
        setToken(null);
    };

    // Attach token to axios defaults
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAdmin,
                login,
                register,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
