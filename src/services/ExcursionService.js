import axios from "axios";

function getAllExcursions(){
    return axios.get('http://localhost:8080/excursions')
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
export {
    getAllExcursions,
    saveExcursion,
    getExcursion
}