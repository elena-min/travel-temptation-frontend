import React, { useState } from 'react';
import BookingStatisticsGraph from './BookingStatisticsGraph';
import "../style/Statistics.css";


function BookingStatisticsGraphContainer({excursionId}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (e) => {
        const newDate = new Date(e.target.value);
        setStartDate(newDate);
    };
    
    const handleEndDateChange = (e) => {
        const newDate = new Date(e.target.value);
        setEndDate(newDate);
    };
    

    return (
        <div className="graph-container">
            <div className="graph-header">
                <h3>Booking Statistics for a date range:</h3>
            </div>
            <div className="date-picker-container">
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate.toISOString().split('T')[0]}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate.toISOString().split('T')[0]}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
            <div className="booking-statistics-graph">
                <BookingStatisticsGraph excursionId={excursionId} startDate={startDate} endDate={endDate} />
            </div>
        </div>
    );
}

export default BookingStatisticsGraphContainer;
