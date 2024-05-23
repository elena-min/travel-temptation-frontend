import axios from "axios";

function getReviews(){
    return axios.get('http://localhost:8080/reviews')
        .then(response => response.data);
}

function getReview(id) {
    return axios.get(`http://localhost:8080/reviews/${id}`)
        .then(response => response.data);
}

function saveReview(booking) {
    return axios.post('http://localhost:8080/reviews', booking)
        .then(response => response.data)
}

function deleteReview(id){
    return axios.delete(`http://localhost:8080/reviews/${id}`)
    .then(response => response.data)
}

function getReviewsByUser(userId){
    return axios.get(`http://localhost:8080/reviews/user/${userId}`)
        .then(response => response.data);   
}


export {
    getReviews,
    getReview,
    saveReview,
    deleteReview,
    getReviewsByUser
}