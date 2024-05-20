import axios from "axios";

function getAllExcursions(){
    return axios.get('http://localhost:8080/excursions')
        .then(response => response.data);
}
function getExcursionsByTravelAgency(travelAgencyID){
    return axios.get(`http://localhost:8080/excursions/travelAgency/${travelAgencyID}`)
        .then(response => response.data);
}

function getExcursion(id) {
    return axios.get(`http://localhost:8080/excursions/${id}`)
        .then(response => response.data);
}

function saveExcursion(excursion) {
    return axios.post('http://localhost:8080/excursions', excursion)
        .then(response => response.data)
}

function deleteExcursion(id){
    return axios.delete(`http://localhost:8080/excursions/${id}`)
    .then(response => response.data)
}

function updateExcursion(id, updatedExcursion){
    return axios.put(`http://localhost:8080/excursions/${id}`, updatedExcursion)
    .then(response => response.data)
}

function searchExcursionsByName(name){
    return axios.get(`http://localhost:8080/excursions/search?name=${name}`)
    .then(response => response.data)
}

function searchExcursionByNameAndPrice(name, priceRange) {
    let url = `http://localhost:8080/excursions/search?name=${name}`;

    // If priceRange is provided, append it to the URL
    if (priceRange) {
        url += `&priceRange=${priceRange}`;
    }

    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error searching excursions:', error);
            throw error; // Rethrow the error for the caller to handle
        });
}

export {
    getAllExcursions,
    getExcursionsByTravelAgency,
    saveExcursion,
    getExcursion,
    deleteExcursion,
    updateExcursion,
    searchExcursionsByName,
    searchExcursionByNameAndPrice
}