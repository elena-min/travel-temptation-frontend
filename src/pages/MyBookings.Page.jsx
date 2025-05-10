import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import { getBookingsByUser, getFutureBookingsByUser, getPastBookingsByUser } from "../services/UserService";
import BookingListContainer from "../components/BookingListContainer";


function MyBookingsPage() {
   const [bookings, setBookings] = useState([]);
   const [pastBookings, setPastBookings] = useState([]);
   const [futureBookings, setFutureBookings] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      const fetchBookings = async () => {
          try {
              const userID = TokenManager.getUserIdFromToken();
              console.log(userID);
              console.log(TokenManager.getAccessToken());
              
              const past = await getPastBookingsByUser(userID);
              const future = await getFutureBookingsByUser(userID);
              
              setPastBookings(past);
              setFutureBookings(future);
              
              console.log(past);
              console.log(future);
          } catch (error) {
              console.error('Error fetching bookings:', error);
          }
      };
  
      const checkTokenAndFetchBookings = async () => {
          if (TokenManager.getAccessToken() && !TokenManager.isTokenExpired()) {
              TokenManager.updateAxiosToken(TokenManager.getAccessToken());
                await fetchBookings();
          } else {
              TokenManager.clear();
              window.location.href = '/login';
          }
      };
  
      checkTokenAndFetchBookings();
  }, []);
  

    const [showOldBookings, setShowOldBookings] = useState(true);

   const handleButtonClick = () => {
      setShowOldBookings(!showOldBookings);
   };
   
      return (
        <>
        <div className="home-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1>My Bookings</h1>
          <button onClick={handleButtonClick}>
               {showOldBookings ? "Future Bookings" : "Past Bookings"}
            </button>
          <div className="trips">
          {showOldBookings ? 
               <BookingListContainer bookings={futureBookings} message="No upcoming trips." /> :
               <BookingListContainer bookings={pastBookings} message="No past trips." />
            }
          </div>
        </div>
        </>
          
      );
}

export default MyBookingsPage;