import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/UserService';
import TokenManager from '../apis/TokenManager';
import { Client } from '@stomp/stompjs';
import './style/Chat.css'; 
import { getMessages } from '../services/NotificationService';

function ChatPage() {
    const { id } = useParams();
    const travelAgencyId = parseInt(id, 10);
    const [travelAgency, setTravelAgency] = useState(null);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userIdfromToken = TokenManager.getUserIdFromToken();
            if (!userIdfromToken) {
                console.error("User ID not found in token");
                return;
            }
            try {
                const userData = await getUser(userIdfromToken);
                setUser(userData);
                setUserId(userData.id);
                setUsername(userData.username);
                console.log(userData);
                console.log(user);
                console.log(username);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchTravelAgency = async () => {
            try {
                const travelAgencyData = await getUser(travelAgencyId);
                setTravelAgency(travelAgencyData);
            } catch (error) {
                console.error("Error fetching travel agency:", error);
            }
        };
        fetchTravelAgency();
    }, [travelAgencyId]);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connectedddd');
                setClient(stompClient);
                setIsConnected(true); 
                const username = user.username;
                console.log(username)
                stompClient.subscribe(`/user/${username}/queue/messages`, (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    console.log('Received message:', newMessage);
                    updateMessages(newMessage);
                    //setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
    
        stompClient.activate();

    
        return () => {
            if (client !== null) {
                client.deactivate();
                console.log("öopsie");
            }
        };
    }, [username]);

      useEffect(() => {
        const fetchOldMessages = async () => {
          if (!userId || !travelAgencyId) return; 
    
          try {
            console.log(userId);
            console.log(travelAgencyId);
            const messagesfromdatabase = await getMessages(user.id, travelAgencyId);
            setMessages(messagesfromdatabase);
            console.log(messagesfromdatabase);
            setErrorMessage(''); // Clear any previous error message
          } catch (error) {
            console.error("Error fetching old messages:", error);
            if (error.response) {
              if (error.response.status === 400) {
                setErrorMessage("Invalid request data.");
              } else if (error.response.status === 403) {
                setErrorMessage("Unauthorized access.");
              } else if (error.response.status === 404) {
                setErrorMessage("Messages not found.");
              } else {
                setErrorMessage("An unexpected error occurred.");
              }
            } else {
              setErrorMessage("An error occurred while fetching messages. Please try again later.");
            }
          }
        };
    
        fetchOldMessages();
      }, [userId, travelAgencyId]);
    
      const updateMessages = (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      };

    const sendMessage = () => {
        if (client !== null) {
            const chatMessage = {
                from: user.username, 
                to: travelAgency.username,
                message: message,
                timestamp: new Date().toISOString()
            };
            console.log('Sending message:', chatMessage);
            client.publish({
                destination: "/app/chat.send",
                body: JSON.stringify(chatMessage)
            });
            updateMessages(chatMessage);
            setMessage("");
            //setMessages(prevMessages => [...prevMessages, chatMessage]);
        } else {
            console.error('WebSocket connection not established');
        }
    };

    
    
    return (
        <div className="chat-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="chat-messages">
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                <div key={index} className={`message ${msg.from === userId ? 'sent' : 'received'}`}>
                    <span className="username">{msg.from}: </span>{msg.message}
                </div>
                ))
            ) : (
                <p>Loading messages...</p>
            )}
            </div>           
            <div className="chat-input">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
