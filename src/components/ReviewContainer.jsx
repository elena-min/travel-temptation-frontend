import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";
import { deleteReview } from "../services/ReviewService";
import StarRating from "./StarRating";

function ReviewContainer({review}){
  const [deleteStatus, setDeleteStatus] = useState({ success: false, error: null });
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
    
      
      const handleDeleteReview = () => {
        if(TokenManager.isTokenExpired()){
          TokenManager.clear();
          return <Navigate to="/login" />;
      }
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (confirmDelete) {
          deleteReview(review.id)
            .then(() => {
              setDeleteStatus({ success: true, error: null });
            })
            .catch(error => {
              setDeleteStatus({ success: false, error: error.message });
              console.error("Error deleting review:", error);
            });
        }
      }



      return (
        <div className="trip-container">
          <h2>
            <Link to={`/travel-agency/${review.travelAgency.id}`}>{review.travelAgency.firstName} {review.travelAgency.lastName}</Link>
          </h2>          
          <p><i>{review.topic}</i></p>
          <div>
            <StarRating value={review.numberOfStars} />
          </div>
          <p>{review.description}</p>
          <p>{formatDate(review.reviewDate)}</p>
          {deleteStatus.error && <p className="error">{deleteStatus.error}</p>}
          {deleteStatus.success ?
            <p className="success">Review deleted successfully!</p> :
            <button className='cancel-review-button' onClick={handleDeleteReview}>Remove Review</button>

          }

        </div>
      );

}
export default ReviewContainer;