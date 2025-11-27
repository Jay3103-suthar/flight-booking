import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatTime = (isoDate) =>
    new Date(isoDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

const formatDuration = (depTime, arrTime) => {
    const diffMs = new Date(arrTime) - new Date(depTime);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.round((diffMs % 3600000) / 60000);
    return `${diffHrs}h ${diffMins}m`;
};

const FlightCard = ({ flight }) => {
    const navigate = useNavigate();

    const {
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        departureAirport,
        arrivalAirport,
        seating,
        _id: flightId
    } = flight;

    const duration = formatDuration(departureTime, arrivalTime);
    const seatTypes = ['economy', 'business', 'firstClass'];

    const handleBook = (seatClass, price) => {
        navigate(`/booking/${flightId}?class=${seatClass}&price=${price}`);
    };

    return (
        <div className="bg-white border rounded-xl shadow-lg p-5 mb-6 transition-shadow hover:shadow-xl">
            
            {/* Main Flight Row */}
            <div className="grid grid-cols-6 md:grid-cols-12 gap-y-4 md:gap-4 items-center">

                {/* Airline */}
                <div className="col-span-3 md:col-span-2 flex flex-col items-start">
                    <div className="text-lg font-bold text-purple-700">{airline}</div>
                    <div className="text-sm text-gray-500">{flightNumber}</div>
                </div>

                {/* Departure */}
                <div className="col-span-3 md:col-span-3 text-left md:text-center">
                    <div className="text-3xl font-extrabold text-gray-800">
                        {formatTime(departureTime)}
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatDate(departureTime)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium mt-1">
                        {departureAirport.airportCode} - {departureAirport.city}
                    </div>
                </div>

                {/* Duration */}
                <div className="hidden md:col-span-3 md:flex flex-col items-center text-center">
                    <div className="text-sm text-gray-500 border-b border-gray-300 pb-1 w-full">
                        {duration}
                    </div>
                    <div className="text-xs text-blue-800 font-semibold mt-1">
                        Direct
                    </div>
                </div>

                {/* Arrival */}
                <div className="col-span-3 md:col-span-3 text-right md:text-center">
                    <div className="text-3xl font-extrabold text-gray-800">
                        {formatTime(arrivalTime)}
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatDate(arrivalTime)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium mt-1">
                        {arrivalAirport.airportCode} - {arrivalAirport.city}
                    </div>
                </div>

            </div>

            {/* Seat Options */}
            <div className="mt-5 pt-4 border-t border-dashed grid grid-cols-2 sm:grid-cols-3 gap-3">
                {seatTypes.map((seat) => (
                    <div
                        key={seat}
                        className="flex flex-col items-center p-2 border rounded-lg bg-gray-50"
                    >
                        <span className="text-xs font-bold uppercase text-gray-500">
                            {seat === 'firstClass' ? 'First Class' : seat}
                        </span>

                        {seating[seat].availableSeats > 0 ? (
                            <>
                                <span className="text-2xl font-bold text-gray-800">
                                    ₹{seating[seat].price.toLocaleString()}
                                </span>

                                <span className="text-xs text-purple-700 font-semibold">
                                    {seating[seat].availableSeats} seats left
                                </span>

                                <button
                                    onClick={() => handleBook(seat, seating[seat].price)}
                                    className="mt-2 w-full bg-purple-400 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition duration-150"
                                >
                                    Book Now
                                </button>
                            </>
                        ) : (
                            <span className="text-red-600 text-lg my-3 font-semibold">
                                SOLD OUT
                            </span>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FlightCard;
