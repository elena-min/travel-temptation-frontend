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

      async function fetchTravelAgency(username) {
        try {
            const travelAgencyData = await getUserByUsername(username);
            return travelAgencyData; // Return the fetched data
        } catch (error) {
            console.error("Error fetching travel agency:", error);
            if (error.response && error.response.status === 404) {
                setErrorMessage("User not found");
            } else {
                setErrorMessage("An error occurred while fetching travel agency data. Please try again later.");
            }
            throw error; // Re-throw the error to propagate it
        }
    };
    

    async function handleClick(chat) {
      if(TokenManager.isTokenExpired()){
        TokenManager.clear();
        return <Navigate to="/login" />;
    }
      const otherUsername = chat.from === user.username ? chat.to : chat.from;
      console.log(otherUsername);
      
      try {
          let travelAgencyData = chosenChatUser; // Initialize with current state
          if (!travelAgencyData) {
              // If chosenChatUser is not set, fetch travel agency data
              travelAgencyData = await fetchTravelAgency(otherUsername);
              setChosenChatUser(travelAgencyData); // Update chosenChatUser state
          }
          
          // After fetching or using existing chosenChatUser, redirect to chat page
          window.location.href = `/chat/${travelAgencyData.id}`;
          
      } catch (error) {
          console.error('Error handling click:', error);
          // Handle error (e.g., set error message)
      }
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
