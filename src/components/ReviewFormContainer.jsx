import React, { useState, useEffect } from 'react';
import { saveReview } from "../services/ReviewService";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import TokenManager from '../apis/TokenManager';
import { getUser } from '../services/UserService';


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

      const onSubmit = async (data) => {

        const reviewData = {
          travelAgency: travelAgency,
          userWriter: user,
          reviewDate: data.startDate,
          numberOfStars: data.numberOfStars,
          title: data.title,
          description: data.description
        }
        try{
          console.log(reviewData);
          const token = TokenManager.updateAxiosToken(TokenManager.getAccessToken());
          console.log(token);
          await saveReview(reviewData);
          setSuccessMessage("Review created successfully!");
        }catch(error){
          setErrorMessage("An error occured while creating the review. Please try again later or contact us!");
          console.log("Error creating review: ", error);

        }
        
        
      };


      return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label htmlFor="numberOfStars">Number of Stars:</label>
            <input type="number" name="numberOfStars" ref={register({ required: true, min: 1, max: 5 })} />
            {errors.numberOfStars && <span>This field is required and should be between 1 and 5.</span>}
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" ref={register({ required: true })} />
            {errors.title && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea name="description" ref={register({ required: true })} />
            {errors.description && <span>This field is required.</span>}
          </div>
          <button type="submit">Submit Review</button>
        </form>
      );

}

export default ReviewFormContainer;