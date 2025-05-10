import React, { useState, useEffect } from 'react';
import { getTotalSalesLastQuarterPerExcursion } from '../../services/StatisticsService';
import "../style/Statistics.css"

function ExcursionSales({ excursionId }) {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const [startDate, setStartDate] = useState(threeMonthsAgo);
    const [endDate, setEndDate] = useState(today);
    const [status, setStatus] = useState("CONFIRMED");
    const [totalSales, setTotalSales] = useState(null);

    useEffect(() => {
        fetchTotalSales();
    }, [excursionId, startDate, endDate, status]);

    const fetchTotalSales = async () => {
        try {
            const sales = await getTotalSalesLastQuarterPerExcursion(excursionId, startDate, endDate, status);
            setTotalSales(sales);
            console.log(sales);
        } catch (error) {
            console.error('Error fetching total sales:', error);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(new Date(e.target.value));
    };

    const handleEndDateChange = (e) => {
        setEndDate(new Date(e.target.value));
    };

    return (
        <div className="excursion-sales-container">
            <h3>Total Sales during certain period:</h3>
            <p>Default set for the last 3 months.</p>
            <p>(Bookings with a 'CONFIRMED' status.)</p>
            <label>Start Date:</label>
            <input type="date" value={startDate.toISOString().split('T')[0]} onChange={handleStartDateChange} />
            <label>End Date:</label>
            <input type="date" value={endDate.toISOString().split('T')[0]} onChange={handleEndDateChange} />
            <button onClick={fetchTotalSales}>Fetch Total Sales</button>
            {totalSales !== null && (
                <p className="total-sales">Total Sales: {totalSales}  &euro;</p>
            )}
        </div>
    );
}

export default ExcursionSales;
