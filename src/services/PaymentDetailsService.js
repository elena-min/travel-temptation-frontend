import axios from "axios";

function getAllPaymentDetails(){
    return axios.get('http://localhost:8080/payment-details')
        .then(response => response.data);
}

function getPaymentDetails(id) {
    return axios.get(`http://localhost:8080/payment-details/${id}`)
        .then(response => response.data);
}

function savePaymentDetails(paymentDetails) {
    return axios.post('http://localhost:8080/payment-details', paymentDetails)
        .then(response => response.data)
}

function deletePaymentDetails(id){
    return axios.delete(`http://localhost:8080/payment-details/${id}`)
    .then(response => response.data)
}

function updatePaymentDetails(id, updatedDetails){
    return axios.put(`http://localhost:8080/payment-details/${id}`, updatedDetails)
    .then(response => response.data)
}

export {
    getPaymentDetails,
    getAllPaymentDetails, 
    savePaymentDetails, 
    deletePaymentDetails, 
    updatePaymentDetails
}