import React, { useState, useEffect } from 'react';
import { saveExcursion } from "../services/ExcursionService";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import TokenManager from '../apis/TokenManager';
import { getUser } from '../services/UserService';


function TripListingForm(){

  //Register is a function provided by React Hooks to register input elements in the form
  //It manages the state and validation fo the input field
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
            setErrorMessage('');
        })
        .catch(error => {
          console.error("Error fetching user:", error);
          if (error.response && error.response.status === 404) {
            setErrorMessage("User not found");
          } else {
            setErrorMessage("An error occurred while fetching user data. Please try again later.");
          }
        });
    }, []);
  


  const isFutureDate = (selectedDate) =>{
    const today = new Date();
    const selected = new Date(selectedDate);
    return selected >= today;
  };

  const isStartDateBeforeEndDate = (startDate, endDate) =>{
    const start = new Date(startDate);
    const end = new Date(endDate); 
    return start <= end;
  };

  const handleFileUploaded = (uploadedFileName) => {
    setMeeting(prevMeeting => ({
        ...prevMeeting,
        fileName: uploadedFileName
    }));
};
  
      //Async means can contain asynchronous operations, meaning it can wait for things to finish before proceeding.
      const onSubmit = async (data) => {
        if(TokenManager.isTokenExpired()){
          TokenManager.clear();
          return <Navigate to="/login" />;
      }
      
        data.destinations = data.destinations.split(',').map(destination => destination.trim());

        const tripData = {
          name: data.name,
          destinations: data.destinations,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          travelAgency: user,
          price: data.price,
          numberOfAvaliableSpaces: data.numberOfAvaliableSpaces
        }
        try {
          console.log(tripData);
          const token = TokenManager.updateAxiosToken(TokenManager.getAccessToken());
          console.log(token);
          await saveExcursion(tripData);
          setSuccessMessage("Excursion listed successfully!");
          setErrorMessage('');
        } catch (error) {
          if (error.response && error.response.data) {
            const serverErrors = error.response.data;
            const errorMessages = Object.values(serverErrors).join(' ');
            setErrorMessage(errorMessages);
          } else {
            setErrorMessage("An error occurred while listing the excursion. Please try again later or contact us!");
          }
          console.log("Error listing excursions: ", error);
        }
        
        
      };


    return (
      <>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              {/*When the form is submitted(handleSubmit takes care of that) it calls the function 'onSubmit'*/}
          <label className="form-label">
            Trip Name:
            {/*The register registers the field using React Hook Form with validation and it tracks the value*/}
            <input type="text" {... register("name", {required: true})} className="form-input"/>
            {errors.name && <span className="error-message">Trip name is required!</span>}
          </label>
          <label className="form-label">
            Destinations:
            <input type="text" {... register("destinations", {required: true})} className="form-input"/>
            {errors.destinations && <span className="error-message">Destinations are required!</span>}
          </label>
          <label className="form-label">
            Trip Description:
                <textarea 
                    {...register("description", { required: true })} 
                    className="form-textarea" 
                    rows="5" 
                    cols="50"
                />
              {errors.description && <span className="error-message">Trip description is required!</span>}
          </label>
          <label className="form-label">
            Start Date:
           {/*In 'validate' is the custom validation. 'futureDate' is a custom validation function which takes the input value.*/}
            <input 
                type="date"
                {... register("startDate", 
                {required: true, 
                  validate: {
              futureDate: value =>isFutureDate(value) || "Start date must be in the future",
              startDateBeforeEndDate : value => {
                const endDate = document.querySelector('input[name="endDate"]').value;
                return isStartDateBeforeEndDate(value, endDate) || "Start date must be before the end date or the same!"
              }
            }
            })} className="form-input"/>
            {errors.startDate && <span className="error-message">{errors.startDate.message}</span>}
          </label>
          <label className="form-label">
            End Date:
            <input 
                type="date"
                {... register("endDate", 
                {required: true, 
                  validate: {
              futureDate: value =>isFutureDate(value) || "End date must be in the future",
              startDateBeforeEndDate : value => {
                const startDate = document.querySelector('input[name="startDate"]').value;
                return isStartDateBeforeEndDate(startDate, value) || "End date must be after the start date or the same!"
              }
            }
            })} className="form-input"/>
            {errors.endDate && <span className="error-message">{errors.endDate.message}</span>}
          </label>
          <label className="form-label">
            Price (per person):
            <input type="number" {... register("price", {required: true, min: 0})} className="form-input"/>
            {errors.price && <span className="error-message">Price is required!</span>}
          </label>

          <label className="form-label">
            Number of avaliable spaces:
            <input type="number" {... register("numberOfAvaliableSpaces", {required: true, min: 1})} className="form-input"/>
            {errors.numberOfAvaliableSpaces && <span className="error-message">Number of avaliable spaces is required!</span>}
          </label>
          <button type="submit" className="form-button">List Trip</button>
        </form>             
      </>    
      );

}

export default TripListingForm;