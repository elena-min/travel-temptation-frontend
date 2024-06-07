import React from "react";
import './style/Home.css';
import "../components/style/Review.css";
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import ReviewsListContainer from "../components/ReviewsListContainer";
import { getReviewsByUser } from "../services/ReviewService";


function MyReviewsPage() {
   const [reviews, setReviews] = useState([]);

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
      })
    }
    else{
      //window.location.href = `/login`;
    } }, []);

   
      return (
        <>
        <div className="home-container">
          <h1>My Reviews</h1>
          <div className="trips">
          <ReviewsListContainer reviews={reviews} />
          </div>
        </div>
        </>
          
      );
}

export default MyReviewsPage;