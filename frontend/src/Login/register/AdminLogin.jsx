// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loggedUser = await login(email, password);

            // ROLE BASED REDIRECTION
            if (loggedUser.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/"); // Redirect normal users to Home
            }

        } catch (errMessage) {
            alert(errMessage); // POPUP MESSAGE FOR WRONG DETAILS
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
            >
                {/* BACK BUTTON */}
                <Link
                    to="/"
                    className="text-sm text-blue-600 hover:underline block mb-4"
                >
                    ← Back to Home
                </Link>

                <h2 className="text-3xl font-bold text-center mb-6">
                    Login
                </h2>

                {/* EMAIL */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>

                {/* LOGIN BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        w-full py-2 rounded-lg text-white font-semibold transition 
                        ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}
                    `}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* REGISTER BUTTON */}
                <p className="text-center text-gray-700 mt-4">
                    New user?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
