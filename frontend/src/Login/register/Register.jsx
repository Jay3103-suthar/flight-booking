import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = form;

    if (!name || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role: "user", // default user
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 shadow-xl rounded-xl p-6">

        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <div className="mb-4">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-blue-500"
            />
          </div>

          <button
             onClick={() => navigate("/admin/login")}
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg mt-2 hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        {/* FOOTER LINKS */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="text-blue-600 underline"
            >
              Login
            </button>
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-3 w-full bg-gray-300 p-2 rounded-lg hover:bg-gray-400"
          >
            ⬅ Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;
