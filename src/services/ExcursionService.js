import axios from "axios";

function getAllExcursions(){
    return axios.get('http://localhost:8090/excursions')
        .then(response => response.data);
}
function getExcursionsByTravelAgency(travelAgencyID){
    return axios.get(`http://localhost:8090/excursions/travel-agency/${travelAgencyID}`)
        .then(response => response.data);
}

function getExcursion(id) {
    return axios.get(`http://localhost:8090/excursions/${id}`)
        .then(response => response.data);
}

function saveExcursion(excursion) {
    return axios.post('http://localhost:8090/excursions', excursion)
        .then(response => response.data)
}

function deleteExcursion(id){
    return axios.delete(`http://localhost:8090/excursions/${id}`)
    .then(response => response.data)
}

function updateExcursion(id, updatedExcursion){
    return axios.put(`http://localhost:8090/excursions/${id}`, updatedExcursion)
    .then(response => response.data)
}


function searchExcursionsByNameAndTravelAgencyAndPrice(searchTerm, minPrice, maxPrice) {
    let url = `http://localhost:8090/excursions/search-name-and-price`;

    // Check if any parameter exists, then append it to the URL
    if (searchTerm || minPrice || maxPrice) {
        url += '?';
    }

    if (searchTerm) {
        url += `searchTerm=${searchTerm}`;
    }

    if (minPrice) {
        // If there's already a query parameter, add "&" before adding the next parameter
        url += `${searchTerm ? '&' : ''}minPrice=${minPrice}`;
    }

    if (maxPrice) {
        // If there's already a query parameter, add "&" before adding the next parameter
        url += `${searchTerm || minPrice ? '&' : ''}maxPrice=${maxPrice}`;
    }

    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching excursions:', error);
            throw error;
        });
}

function getBookingsByExcursion(excursionId){
    return axios.get(`http://localhost:8090/excursions/${excursionId}/bookings`)
        .then(response => response.data);   
}

export {
    getAllExcursions,
    getExcursionsByTravelAgency,
    saveExcursion,
    getExcursion,
    deleteExcursion,
    updateExcursion,
    searchExcursionsByNameAndTravelAgencyAndPrice,
    getBookingsByExcursion
}