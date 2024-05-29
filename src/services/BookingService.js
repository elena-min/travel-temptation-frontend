import axios from "axios";

function getBookings(){
    return axios.get('http://localhost:8080/bookings')
        .then(response => response.data);
}

function getBooking(id) {
    return axios.get(`http://localhost:8080/bookings/${id}`)
        .then(response => response.data);
}

function saveBooking(booking) {
    return axios.post('http://localhost:8080/bookings', booking)
        .then(response => response.data)
}

function deleteBooking(id){
    return axios.delete(`http://localhost:8080/bookings/${id}`)
    .then(response => response.data)
}

function updateBooking(id, updatedBooking){
    return axios.put(`http://localhost:8080/bookings/${id}`, updatedBooking)
    .then(response => response.data)
}

function getBookingsByUser(userId){
    return axios.get(`http://localhost:8080/bookings/user/${userId}`)
        .then(response => response.data);   
}
function getBookingsByExcursion(excursionId){
    return axios.get(`http://localhost:8080/bookings/excursion/${excursionId}`)
        .then(response => response.data);   
}


export {
    getBookings,
    getBooking,
    saveBooking,
    deleteBooking,
    updateBooking,
    getBookingsByUser,
    getBookingsByExcursion
}