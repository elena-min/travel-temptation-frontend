import axios from "axios";
function sendMessage(notification) {
    return axios.post('http://localhost:8080/notifications', notification)
        .then(response => response.data)
}



export {
    sendMessage,

}