import React from "react";
import './style/Home.css';
import "../components/style/Review.css";
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import ReviewsListContainer from "../components/ReviewsListContainer";
import { getReviewsByUser } from "../services/ReviewService";


function MyReviewsPage() {
   const [reviews, setReviews] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
    console.log(TokenManager.getAccessToken());
    if(TokenManager.getAccessToken()){
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
      const userID = TokenManager.getUserIdFromToken();
    
      getReviewsByUser(userID)
      .then((reviews) => {
        setReviews(reviews);
        console.log(reviews);
      })
      .catch((error) =>{
        console.error('Error fetching reviews:', error);
        if (error.response && error.response.status === 404) {
            setErrorMessage("Reviews not found by this user.");
        } else {
            setErrorMessage("An error occurred while fetching reviews. Please try again later.");
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
          <h1>My Reviews</h1>
          <div className="trips">
            {reviews.length > 0 ? (
                <ReviewsListContainer reviews={reviews} />
              ) : (
                <p>No reviews available right now.</p>
              )}  
          </div>
        </div>
        </>
          
      );
}

export default MyReviewsPage;