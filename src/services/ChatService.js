import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';

const CHAT_ENDPOINT = 'ws://localhost:8080/ws';

const ChatService = {
  stompClient: null,

  connect: (userId, onMessageReceived) => {
      const stompClient = new Client({
          brokerURL: CHAT_ENDPOINT,
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000
      });

      stompClient.onConnect = () => {
          // Subscribe to user-specific queue for receiving messages
          stompClient.subscribe(`/user/${userId}/queue/messages`, onMessageReceived);
      };

      stompClient.activate();
      ChatService.stompClient = stompClient;
  },
  
  sendMessage: (sender, receiver, content) => {
    const payload = { 'id': uuidv4(), 'from': sender, 'to': receiver, 'message': content };
    ChatService.stompClient.publish({ 'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });

   // ChatService.stompClient.publish({
   //   destination: '/user/${payload.to}/queue/inboxmessages',
   //   body: JSON.stringify(payload)
   // });
},
disconnect: () => {
  if (ChatService.stompClient !== null) {
      ChatService.stompClient.deactivate();
  }
}
    
    //sendMessage: (stompClient, fromUserId, toUser, text) => {
    //    const payload = { 'id': uuidv4(), 'from': fromUserId, 'to': toUser, 'message': text, 'isRead': false };
    //    stompClient.publish({ 'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
    //},
    //getMessages: (stompClient, userIdReceiver, onMessagesReceived) => {
     //   stompClient.subscribe(`/user/${userIdReceiver}/queue/messages`, (data) => {
     //     onMessagesReceived(JSON.parse(data.body));
     //   });
    //  }
  };  

export default ChatService;
