import React, { useState } from "react";
import './style/Trip.css';
import StarRating from "./StarRating";

function ReviewSmallContainer({review}){
  console.log(review);
  console.log(review.travelAgency);

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
          <p><i>{review.topic}</i></p>
          <div>
            <StarRating value={review.numberOfStars} />
          </div>
          <p>{review.description}</p>
          <p>{formatDate(review.reviewDate)}</p>
        </div>
      );

}
export default ReviewSmallContainer;