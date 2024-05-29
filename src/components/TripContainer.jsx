import React from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";

function TripContainer({trip}){

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

  
    return (
        <div className="trip-container">
          <h2>
            <Link to={`/trip/${trip.id}`}>{trip.name}</Link>
            </h2>          
            <h4><Link to={`/travel-agency/${trip.travelAgency.id}`}>'{trip.travelAgency.firstName} {trip.travelAgency.lastName}'</Link></h4>
          <p><i>{trip.destinations.join(', ')}</i></p>
          <p><b>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</b></p>
        </div>
      );
}
export default TripContainer