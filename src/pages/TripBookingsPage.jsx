import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import { getBookingsByUser } from "../services/BookingService";
import BookingListContainer from "../components/BookingListContainer";


function TripBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
    console.log(TokenManager.getAccessToken());
    if(TokenManager.getAccessToken()){
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
      const userID = TokenManager.getUserIdFromToken();
    
      getBookingsByUser(userID)
      .then((bookings) => {
        setBookings(bookings);
        console.log(bookings);
      })
      .catch((error) => {
        if (error.response) {
            if (error.response.status === 403) {
                setErrorMessage("You are not authorized to view these bookings.");
            } else if (error.response.status === 404) {
                setErrorMessage("Bookings not found for this user.");
            } else {
                setErrorMessage("Server error: " + error.response.data.error);
            }
        } else if (error.request) {
            setErrorMessage("No response received from the server. Please try again later.");
        } else {
            setErrorMessage("An unexpected error occurred: " + error.message);
        }
    });
    }
    else{
      TokenManager.clear();
      window.location.href = `/login`;
    } }, []);

   
      return (
        <>
        <div className="home-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1>My Bookings</h1>
          <div className="trips">
              {bookings.length > 0 ? (
                <BookingListContainer bookings={bookings} />
              ) : ( 
                <p>No bookings available</p>
              )} 
          </div>
        </div>
        </>
          
      );
}

export default TripBookingsPage;