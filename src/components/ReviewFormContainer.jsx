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

  const {register, handleSubmit, formState : {errors}} = useForm();
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const userId = TokenManager.getUserIdFromToken();
    if (!userId) {
        console.error("User ID not found in token");
        return;
    }
    console.log(userId);
    getUser(userId)
        .then(data => {
            console.log(data); 
            setUser(data);
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });
}, []);

useEffect(() => {
    getUser(travelAgencyId)
        .then(data => {
            console.log(data); 
            setTravelAgency(data);
        })
        .catch(error => {
            console.error("Error fetching travelAgency:", error);
        });
}, [travelAgencyId]);

      const handleFormSubmit = async (data) => {

        const reviewData = {
          travelAgency: travelAgency,
          userWriter: user,
          reviewDate: new Date(),
          numberOfStars: data.numberOfStars,
          title: data.title,
          description: data.description
        }
        try{
          console.log(reviewData);
          const token = TokenManager.updateAxiosToken(TokenManager.getAccessToken());
          await saveReview(reviewData);
          setSuccessMessage("Review created successfully!");
          setErrorMessage('');
        }catch(error){
          setErrorMessage("An error occured while creating the review. Please try again later or contact us!");
          console.log("Error creating review: ", error);

        }
        
        
      };


      return (
        <div className="review-form-container">
           <h2>Write a Review</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label>Number of Stars:</label>
          <StarRating onChange={(value) => setValue('numberOfStars', value)} />
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