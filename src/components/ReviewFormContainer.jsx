import React, { useState, useEffect } from 'react';
import { saveReview } from "../services/ReviewService";
import './style/Review.css'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import TokenManager from '../apis/TokenManager';
import { getUser } from '../services/UserService';
import StarRating from './StarRating';


function ReviewFormContainer(){
    const { id } = useParams();
    const travelAgencyId = parseInt(id, 10);
    const [travelAgency, setTravelAgency] = useState(null);
    const [numberOfStars, setNumberOfStars] = useState(1); 

  const {register, handleSubmit, formState : {errors}} = useForm();
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const userId = TokenManager.getUserIdFromToken();
    if (!userId) {
        console.error("User ID not found in token");
        setUserErrorMessage("User ID not found. Please log in again.");
        return;
    }
    getUser(userId)
        .then(data => setUser(data))
        .catch(error => {
          console.error("Error fetching user:", error);
          if (error.response && error.response.status === 404) {
            setErrorMessage("User not found");
          } else {
            setErrorMessage("An error occurred while fetching user data. Please try again later.");
          }
        });
}, []);


useEffect(() => {
  getUser(travelAgencyId)
      .then(data => setTravelAgency(data))
      .catch(error => {
          console.error("Error fetching travel agency:", error);
          setAgencyErrorMessage("Failed to fetch travel agency information. Please try again later.");
      });
}, [travelAgencyId]);

      const handleFormSubmit = async (data) => {

        const reviewData = {
          travelAgency: travelAgency,
          userWriter: user,
          reviewDate: new Date(),
          numberOfStars: numberOfStars,
          title: data.title,
          description: data.description
        }
        try {
          const token = TokenManager.updateAxiosToken(TokenManager.getAccessToken());
          await saveReview(reviewData);
          setSuccessMessage("Review created successfully!");
          setErrorMessage('');
        } catch (error) {
          console.error("Error creating review:", error);
          if (error.response && error.response.data) {
              const serverErrors = error.response.data;
              console.log("Server error data:", serverErrors);
  
              // Check if serverErrors is an object and handle it appropriately
              if (typeof serverErrors === 'object') {
                  let errorMessages = [];
                  for (const [key, value] of Object.entries(serverErrors)) {
                      if (typeof value === 'string' && value.includes('Data truncation: Data too long for column')) {
                          errorMessages.push("Description is too long. Please shorten your review.");
                      } else {
                          errorMessages.push(value);
                      }
                  }
                  setErrorMessage(errorMessages.join(' '));
              } else {
                  setErrorMessage("An error occurred while creating the review. Please try again later or contact us!");
              }
          } else {
              setErrorMessage("An error occurred while creating the review. Please try again later or contact us!");
          }
      }
  };

      const handleStarClick = (value) => {
        console.log(value);
        setNumberOfStars(value); // Update the number of stars when a star is clicked
      };


      return (
        <div className="review-form-container">
           <h2>Write a Review</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label>Number of Stars:</label>
          <StarRating value={numberOfStars} onChange={handleStarClick} />
          {errors.numberOfStars && <span>This field is required and should be between 1 and 5.</span>}
        </div>
          <div>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" {...register('title', { required: true })} />
              {errors.title && <span>This field is required.</span>}
          </div>
          <div>
              <label htmlFor="description">Description:</label>
              <textarea name="description" {...register('description', { required: true })} />
              {errors.description && <span>This field is required.</span>}
          </div>

          <button type="submit">Submit Review</button>
        </form>
        </div>
        
      );

}

export default ReviewFormContainer;