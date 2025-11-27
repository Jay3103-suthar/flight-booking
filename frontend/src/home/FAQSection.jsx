// src/components/home/FAQSection.jsx

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqs = [
    {
        q: "Why is flight ticket booking the cheapest on FlyHigh?",
        a: "FlyHigh directly searches multiple airline websites for the cheapest fares. We secure exclusive deals and partner offers, ensuring you always find the best platform price for booking cheap flights online."
    },
    {
        q: "How do I book cheap flight tickets?",
        a: "Book your flights 4-6 weeks in advance. Use special promotion codes (like 'NEW' for flat 12% off). Be flexible with travel dates (mid-week flights are often cheaper), use fare alerts, and consider flights with short layovers to get better deals."
    },
    {
        q: "What are the benefits of flight booking with FlyHigh?",
        a: "Benefits include guaranteed low fares, simple 3-step booking, real-time flight status tracking, exclusive flexible date options, 24/7 customer care, and a streamlined refund process for cancellations."
    },
    {
        q: "How can I check the flight status or schedule?",
        a: "You can check the live status of any flight on our website under the 'Flight Status' section in the navigation bar. You'll need the flight number and the date of travel."
    },
    {
        q: "What is your cancellation and refund policy?",
        a: "The cancellation policy depends on the specific airline and fare class purchased. You can initiate a cancellation through the 'My Bookings' section. Refunds for eligible tickets are typically processed back to the original payment method within 7-10 business days."
    },
    {
        q: "Can I book tickets for multiple passengers, including children and infants?",
        a: "Yes. Our search form allows you to specify the number of adults, children (ages 2-12), and infants (under 2). Note that infants do not occupy a seat and require specific documentation."
    },
    {
        q: "What is the difference between Economy, Business, and First Class?",
        a: "Economy Class offers standard seating and essential amenities. Business Class provides wider seats, priority boarding, enhanced meals, and lounge access. First Class offers the highest level of luxury, privacy, and personalized service."
    },
    {
        q: "How do I select my seats after booking?",
        a: "Seat selection can be done immediately after booking on the confirmation page, or later through the 'My Bookings' section, provided the airline supports advance seat selection for your fare type."
    },
    {
        q: "What documents are required for check-in?",
        a: "For domestic flights, you typically need a government-issued photo ID (Aadhar, Passport, Driver's License) and the e-ticket copy (printout or digital). For international flights, a valid passport and necessary visas are mandatory."
    },
    {
        q: "Can I make changes to my flight date or route after booking?",
        a: "Changes are subject to the fare rules of your ticket. Most non-flexible fares incur a penalty plus any fare difference. You can check eligibility and initiate changes via the 'My Bookings' portal or by contacting our customer support."
    },
    {
        q: "Do you offer travel insurance?",
        a: "Yes, we partner with major insurance providers. You will be given the option to add comprehensive travel insurance covering baggage loss, flight delays, and medical emergencies during the checkout process."
    },
    {
        q: "What happens if my flight is delayed or cancelled by the airline?",
        a: "We will notify you immediately via email and SMS. Depending on the airline's policy, we will help you secure an alternative flight, issue a full refund, or facilitate compensation for significant delays."
    },
    {
        q: "How secure is the payment gateway?",
        a: "Our payment gateway is PCI DSS compliant and uses 256-bit SSL encryption. All transactions are secure, and we do not store your credit card information."
    },
    {
        q: "Is there a limit on baggage allowance?",
        a: "Baggage limits vary significantly by airline and fare class. Standard allowance is usually 15-20kg checked baggage and 7kg hand baggage for Economy. Please check the 'Flight Details' page for your specific allowance."
    },
    {
        q: "Can I earn loyalty points or frequent flyer miles through FlyHigh?",
        a: "While FlyHigh does not have its own loyalty program, you can enter your existing Frequent Flyer number for the operating airline during the booking process to earn miles directly with them."
    },
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        // Added data-aos="fade-up" to each individual item
        <div 
            className="border-b border-gray-200 py-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
        >
            <button
                className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 hover:text-indigo-600 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                {faq.q}
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
                <div className="mt-3 text-gray-600 pr-4 animate-fadeIn">
                    <p>{faq.a}</p>
                </div>
            )}
        </div>
    );
};

const FAQSection = () => {
    
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <section className="py-12 bg-white rounded-xl shadow-lg mt-8">
            <h2 
                className="text-3xl font-bold mb-8 text-center text-gray-800"
                data-aos="fade-down"
            >
                Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto px-4"
                data-aos="fade-up">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
            </div>
        </section>
    );
};

export default FAQSection;