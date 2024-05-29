import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";
import { deleteReview } from "../services/ReviewService";

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
    
      const handleDeleteReview = () =>{
        const confirmDelete = window.confirm("Are you sure you want to delete this review?")
        if(confirmDelete){
            deleteReview(review.id)
          .then( () =>{
            setDeleteStatus({ success: true });
              //window.location.href = "/";
          });
         // .catch(error => {
         //   setDeleteStatus({success: false, error: error.message});
         //     console.error("Error canceling excursion.", error);
         // });
        }
        
      }
      
      return (
        <div className="trip-container">          
          <p><i>{review.topic}</i></p>
          <p>{review.numberOfStars} /5</p>
          <p>{review.description}</p>
          <p>{formatDate(review.reviewDate)}</p>
        </div>
      );

}
export default ReviewSmallContainer;