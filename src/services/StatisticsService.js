import axios from "axios";

function getTotalSalesLastQuarter(startDate, endDate, status){
    return axios.get(`http://localhost:8080/bookings/total-sales-last-quarter`, {
        params: {
            startDate: startDate,
            endDate: endDate,
            status: status
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching total sales:', error);
        throw error;
    });  
}
function getTotalSalesLastQuarterPerExcursion(excursionId, startDate, endDate, status){
    return axios.get(`http://localhost:8080/excursions/${excursionId}/total-sales-last-quarter`, {
        params: {
            startDate: startDate,
            endDate: endDate,
            status: status
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching total sales:', error);
        throw error;
    });  
}
function getWeeklyStatistics(excursionId, status){
    return axios.get(`http://localhost:8080/excursions/${excursionId}/weekly-statistics`, {
        params: { status: status}    
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching weekly statistics:', error);
            throw error;
        });  
}
function getBookingDataByDateRangePerExcursion(excursionId, startDate, endDate){
    return axios.get(`http://localhost:8080/excursions/${excursionId}/booking-statistics`, {
        params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching total sales:', error);
        throw error;
    });  
}

export {
    getTotalSalesLastQuarter,
    getTotalSalesLastQuarterPerExcursion,
    getWeeklyStatistics,
    getBookingDataByDateRangePerExcursion
}