import React from "react";
import './style/Trip.css';

function TripContainer({trip}){
    return (
        <div className="trip-container">
          <img src={trip.image} alt={trip.title} />
          <h2>{trip.title}</h2>
          <p>{trip.description}</p>
        </div>
      );
}
export default TripContainer