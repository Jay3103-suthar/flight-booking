// src/pages/Contact.jsx

import React, { useState, useEffect } from "react";
// Assuming the project structure has these in '../components/...'
import Navbar from "../components/common/Header"; 
import Footer from "../components/common/Footer";

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    // Added overflow-x-hidden to prevent horizontal scrollbars during slide animations
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar /> 

      <main className="flex-grow"> {/* Allows the main content to grow */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          
          <div className="text-center mb-12" data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Contact Us ✈️
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions, feedback, or need support? We’d love to hear from you!
              Reach out using the form below or via our contact details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 bg-gray-50 rounded-2xl shadow-lg p-8 md:p-12">
            
            {/* Left Column: Contact Info - Slides in from Right */}
            <div data-aos="fade-right">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-6">
                Our team is available 24/7 to help you with bookings, cancellations,
                or any inquiries.
              </p>

              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@ctrlfly.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@flyhigh.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+911818181818"
                    className="text-blue-600 hover:underline"
                  >
                    +91 1818181818
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> Ctrl + Fly HQ, Tower A, Hansol,
                  Ahmedabad, India
                </p>
              </div>

              {/* Map - Zooms in with a slight delay */}
              <div className="mt-8" data-aos="zoom-in" data-aos-delay="200">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d72.583956!3d23.02324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzM0LjkiTiA3MsiwNDknNTYuNSJF!5e0!3m2!1sen!2sin!4v1633519842000"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-xl shadow-md"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Form - Slides in from Left */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-sm p-6 md:p-8"
              data-aos="fade-left"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                Send a Message
              </h2>

              <div className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;