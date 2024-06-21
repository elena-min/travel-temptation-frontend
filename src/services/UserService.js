import axios from "axios";

function getUsers(){
    return axios.get('http://localhost:8090/users')
        .then(response => response.data);
}

function getUser(id) {
    return axios.get(`http://localhost:8090/users/${id}`)
        .then(response => response.data);
}

function getUserByUsername(username) {
    return axios.get(`http://localhost:8090/users/username/${username}`)
        .then(response => response.data);
}
function saveUser(user) {
    return axios.post('http://localhost:8090/users', user)
        .then(response => response.data)
}

function deleteUser(id){
    return axios.delete(`http://localhost:8090/users/${id}`)
    .then(response => response.data)
}

function updateUser(id, updatedUser){
    return axios.put(`http://localhost:8090/users/${id}`, updatedUser)
    .then(response => response.data)
}


function getReviewsByUser(userId){
    return axios.get(`http://localhost:8090/users/${userId}/reviews`)
        .then(response => response.data);   
}
function getBookingsByUser(userId){
    return axios.get(`http://localhost:8090/users/${userId}/bookings`)
        .then(response => response.data);   
}
function getPastBookingsByUser(userId){
    return axios.get(`http://localhost:8090/users/${userId}/past-bookings`)
        .then(response => response.data);   
}
function getFutureBookingsByUser(userId){
    return axios.get(`http://localhost:8090/users/${userId}/future-bookings`)
        .then(response => response.data);   
}

export {
    getUsers,
    getUser,
    getUserByUsername,
    saveUser,
    deleteUser,
    updateUser,
    getReviewsByUser,
    getBookingsByUser,
    getPastBookingsByUser,
    getFutureBookingsByUser
}