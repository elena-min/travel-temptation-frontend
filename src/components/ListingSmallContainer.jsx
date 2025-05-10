import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";

function ListingSmallContainer({listing}){
  console.log(listing);
  console.log(listing.excursion);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      }
      
      return (
        <div className="trip-container">
          <h2>
            <Link to={`/trip/${listing.id}`}>{listing.name}</Link>
            </h2>          
          <p><i>{listing.destinations.join(', ')}</i></p>
          <p><b>{formatDate(listing.startDate)} - {formatDate(listing.endDate)}</b></p>
          <p><b>Price:</b> {listing.price} &euro;/p.p.</p>
        </div>
      );

}
export default ListingSmallContainer;