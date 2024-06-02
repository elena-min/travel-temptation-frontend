import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBookingDataByDateRangePerExcursion } from '../../services/StatisticsService';
import "../style/Statistics.css";

function BookingStatisticsGraph({ excursionId, startDate, endDate }) {
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        getBookingDataByDateRangePerExcursion(excursionId, startDate, endDate)
            .then(data => {
                setBookingData(data);
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching booking statistics:', error);
            });
    }, [excursionId, startDate, endDate]);

    
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    const chartData = {
        labels: bookingData.map(data => formatDate(data.date)),
        datasets: [
            {
                label: 'Revenue',
                data: bookingData.map(data => data.totalRevenue),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        const numberOfBookings = bookingData[index].numberOfBookings;
                        const revenue = context.dataset.data[index];
                        return `Revenue (${numberOfBookings} bookings): ${revenue}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <Bar data = {chartData} options={options}/>
        </div>
    );
}

export default BookingStatisticsGraph;
