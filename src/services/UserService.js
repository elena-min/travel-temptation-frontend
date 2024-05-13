import axios from "axios";

function getUsers(){
    return axios.get('http://localhost:8090/users')
        .then(response => response.data);
}

function getUser(id) {
    return axios.get(`http://localhost:8090/users/${id}`)
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


export {
    getUsers,
    getUser,
    saveUser,
    deleteUser,
    updateUser
}