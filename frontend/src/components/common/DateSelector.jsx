// src/components/common/DateSelector.jsx (FINAL CORRECTED VERSION)

import React, { useState } from 'react';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// FIX: Normalizes date string to a Date object at midnight (UTC)
const normalizeDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); 
};

const getMonthDays = (year, month) => {
    const date = new Date(year, month, 1);
    const firstDay = date.getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let days = [];
    for (let i = 0; i < firstDay; i++) { days.push(null); }
    for (let i = 1; i <= daysInMonth; i++) { days.push(i); }
    return days;
};

const DateSelector = ({ date: selectedDateString, onSelectDate, onClose, title, minDateString = null }) => {
    
    const minConstraintDate = normalizeDate(minDateString) || normalizeDate(new Date().toISOString());

    const initialDate = normalizeDate(selectedDateString) || minConstraintDate;
    const [currentMonth, setCurrentMonth] = useState(initialDate.getUTCMonth());
    const [currentYear, setCurrentYear] = useState(initialDate.getUTCFullYear());

    const selectedDate = selectedDateString ? normalizeDate(selectedDateString) : null;
    const today = normalizeDate(new Date().toISOString()); 

    const navigateMonth = (direction) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;
        if (newMonth > 11) { newMonth = 0; newYear += 1; } 
        else if (newMonth < 0) { newMonth = 11; newYear -= 1; }
        
        const prospectiveDate = new Date(Date.UTC(newYear, newMonth, 1));
        const minMonthStart = new Date(minConstraintDate.getUTCFullYear(), minConstraintDate.getUTCMonth(), 1);
        
        if (prospectiveDate < minMonthStart) { return; }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const handleDayClick = (day) => {
        if (!day) return;

        const newDate = new Date(Date.UTC(currentYear, currentMonth, day));

        if (newDate < minConstraintDate) { return; } // Disabled date
        
        const formattedDate = newDate.toISOString().split('T')[0];
        onSelectDate(formattedDate);
        onClose();
    };

    const isDateMatch = (day) => {
        if (!day) return false;
        
        const checkDate = new Date(Date.UTC(currentYear, currentMonth, day));
        
        if (checkDate < minConstraintDate) { return 'text-gray-300 cursor-not-allowed'; }
        if (selectedDate && checkDate.getTime() === selectedDate.getTime()) { return 'bg-blue-600 text-white font-bold'; }
        if (checkDate.getTime() === today.getTime()) { return 'bg-blue-100 text-blue-600 font-bold border border-blue-600'; }
        return 'hover:bg-gray-200';
    };
    
    const days = getMonthDays(currentYear, currentMonth);

    return (
        <div className="absolute top-0 -left-1/2 md:left-0 w-[400px] bg-white border border-gray-300 rounded-xl shadow-2xl z-30 p-4">
            <h3 className="text-lg font-bold mb-4">{title} Date Selection</h3>
            
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => navigateMonth(-1)} className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"> &lt; </button>
                <h4 className="text-xl font-semibold">{MONTHS[currentMonth]} {currentYear}</h4>
                <button onClick={() => navigateMonth(1)} className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"> &gt; </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {DAYS_OF_WEEK.map(day => (<div key={day} className="font-bold text-gray-500 py-2">{day}</div>))}
                
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`py-2 rounded-lg transition-colors cursor-pointer ${isDateMatch(day)}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-4 border-t pt-3">
                <button onClick={onClose} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition">Done</button>
            </div>
        </div>
    );
};

export default DateSelector;