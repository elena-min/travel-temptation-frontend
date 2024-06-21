import axios from "axios";

function getTrendingExcursions(){
    return axios.get('http://localhost:8090/trending-excursions')
        .then(response => response.data);
}

export {
    getTrendingExcursions,
}