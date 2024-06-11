import React from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";

function BookingSmallContainer({booking}){
  console.log(booking);
  console.log(booking.excursion);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      }
      
      const handleClick = (e) => {
        e.preventDefault();
        window.location.href = `/booking/${booking.id}`;
      };
      
      return (
        <Link to={`/booking/${booking.id}`} className="trip-container-link">
        <div className="trip-container" onClick={handleClick}>
        <p><i>User: </i>{booking.user.email}</p>
        <p><i>{booking.excursion.destinations.join(', ')}</i></p>
        <p><b>{formatDate(booking.excursion.startDate)} - {formatDate(booking.excursion.endDate)}</b></p>
        <p><i>Number of travelers: </i>{booking.numberOfTravelers}</p>
        <p><i>Booking status: </i>{booking.status}</p>
      </div>
    </Link>
      );

}
export default BookingSmallContainer;
