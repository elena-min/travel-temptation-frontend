import React, { useState, useEffect  } from 'react';
import { updateExcursion, getExcursion } from "../services/ExcursionService";
import './style/TripListing.css'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";


function TripUpdateForm(){

    const { id } = useParams();
    const excursionId = parseInt(id); // Convert id to integer
    const [trip, setTrip] = useState(null);
    const {register, handleSubmit, formState : {errors}, setValue} = useForm();

    useEffect(() => {
        getExcursion(excursionId)
            .then(data => {
                console.log(data); 
                setTrip(data);
                const formattedStartDate = formatDateForInput(data.startDate);
                const formattedEndDate = formatDateForInput(data.endDate);
                setValue("name", data.name);
                setValue("destinations", data.destinations.join(", "));
                setValue("startDate", formattedStartDate);
                setValue("endDate", formattedEndDate);
                setValue("travelAgency", data.travelAgency);
                setValue("price", data.price);

            })
            .catch(error => {
                console.error("Error fetching excursion:", error);
            });
    }, [excursionId]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; // Return empty string if date string is not provided
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is single digit
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is single digit
        return `${year}-${month}-${day}`;
      };

  
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
  
  const onSubmit = async (data) => {
    data.destinations = data.destinations.split(',').map(destination => destination.trim());

    console.log(data);
    await updateExcursion(excursionId, data);
    console.log('Excursion saved successfully!');    
    };


    return (
      
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
            Travel Agency:
            <input type="text" {... register("travelAgency", {required: true})} className="form-input"/>
            {errors.travelAgency && <span className="error-message">Travel Agency is required!</span>}
          </label>
          <label className="form-label">
            Price (per person):
            <input type="number" defaultValue={trip ? trip.price : ""}  {... register("price", {required: true, min: 0})} className="form-input"/>
            {errors.price && <span className="error-message">Price is required!</span>}
          </label>
          <button type="submit" className="form-button">List Trip</button>
        </form>
      );

}

export default TripUpdateForm;