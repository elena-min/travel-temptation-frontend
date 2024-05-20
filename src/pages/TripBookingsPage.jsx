import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import { getBookingsByUser } from "../services/BookingService";
import BookingListContainer from "../components/BookingListContainer";


function TripBookingsPage() {
    const [bookings, setBookings] = useState([]);

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
      .catch((error) =>{
        console.error('Error fetching bookings:', error);
      })
    }
    else{
      //window.location.href = `/login`;
    } }, []);

   
      return (
        <>
        <div className="home-container">
          <h1>My Bookings</h1>
          <div className="trips">
          <BookingListContainer bookings={bookings} />
          </div>
        </div>
        </>
          
      );
}

export default TripBookingsPage;