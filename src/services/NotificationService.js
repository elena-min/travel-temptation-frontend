import axios from "axios";

function getChatsForUser(userId) {
    return axios.get(`http://localhost:8090/chats/${userId}`)
        .then(response => response.data);
}

function getMessages(fromUserId, toUserId){
    return axios.get(`http://localhost:8090/chats/${fromUserId}/${toUserId}/messages`)
        .then(response => response.data);   
}



export {
    getChatsForUser,
    getMessages
}