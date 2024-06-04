import axios from "axios";

function getChatsForUser(userId) {
    return axios.get(`http://localhost:8080/chats/${userId}`)
        .then(response => response.data);
}

function getMessages(fromUserId, toUserId){
    return axios.get(`http://localhost:8080/chat/${fromUserId}/${toUserId}/messages`)
        .then(response => response.data);   
}



export {
    getChatsForUser,
    getMessages
}