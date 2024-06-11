import React, { useState } from 'react';
import { useEffect } from 'react';
import './style/TripInfoPage.css';
import TokenManager from '../apis/TokenManager';
import { getChatsForUser } from '../services/NotificationService';
import { getUserByUsername, getUser } from '../services/UserService';

function TravelAgencyChatHistoryPage() {

    const [chats, setChats] = useState([]);
    const [chosenChatUser, setChosenChatUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const userId = TokenManager.getUserIdFromToken(); 
    const isLoggedIn = TokenManager.isAuthenticated();
    if (isLoggedIn) {
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userIdd = userId || parseInt(id, 10);
  
        getUser(userIdd)
            .then(data => {
                setUser(data);
            })
            .catch(error => {
              console.error("Error fetching user:", error);
              if (error.response && error.response.status === 404) {
                setErrorMessage("User not found");
              } else {
                setErrorMessage("An error occurred while fetching user data. Please try again later.");
              }
            });
    }, [userId])

    useEffect(() => {
      const fetchChats = async () => {
          try {
              const fetchedChats = await getChatsForUser(userId);
              setChats(fetchedChats);
          } catch (error) {
              console.error('Error fetching chats:', error);
              if (error.response && error.response.status === 403) {
                  setErrorMessage("Unauthorized access. Please login with appropriate credentials.");
              } else {
                  setErrorMessage("An error occurred while fetching chats. Please try again later.");
              }
          }
      };
      fetchChats();
  }, [userId]);
  
    

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
        const year = date.getFullYear();
      
        // Ensure that single-digit days and months are padded with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      }

      const fetchTravelAgency = async (username) => {
        try {
            const travelAgencyData = await getUserByUsername(username);
            setChosenChatUser(travelAgencyData);
        } catch (error) {
            console.error("Error fetching travel agency:", error);
            if (error.response && error.response.status === 404) {
                setErrorMessage("User not found");
            } else {
                setErrorMessage("An error occurred while fetching travel agency data. Please try again later.");
            }
        }
    };
    

    function handleClick(chat) {
            const otherUsername = chat.from === user.username ? chat.to : chat.from;
            console.log(otherUsername);
            if (!chosenChatUser) {
                fetchTravelAgency(otherUsername);
              }
            console.log(chosenChatUser);
            console.log(chosenChatUser.id);
            window.location.href = `/chat/${chosenChatUser.id}`; 
          }

      return (
        <div>
      <h2>Chat History</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {chats.length > 0 ? (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <button onClick={() => handleClick(chat)}>
                <b>{chat.from} {chat.to}</b>: {chat.message.slice(0, 30)}... (
                {formatDate(chat.timestamp)})
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found.</p>
      )}
    </div>
      );
}

export default TravelAgencyChatHistoryPage;
