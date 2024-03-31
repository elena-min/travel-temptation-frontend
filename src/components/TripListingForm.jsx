import React from "react";
import { saveExcursion } from "../services/ExcursionService";
import './style/TripListing.css'
import { useForm } from "react-hook-form";


function TripListingForm(){

  //Register is a function provided by React Hooks to register input elements in the form
  //It manages the state and validation fo the input field
  const {register, handleSubmit, formState : {errors}} = useForm();
  
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
  
  //'setExcursionData' holds the function that updates the data 'excursionData'
 

      //Called everytime the inout value changes
      //const handleChange = (e) => {
        //Grabs thee name and value of the changed field. Target is the cause of the event. We get its name and value 
        //const { name, value } = e.target;
      
        // Chexks if the value's name is deeswtinations and convert destinations string to an array
      //  const newValue = name === 'destinations' ? value.split(',').map(item => item.trim()) : value;
      
        //Updates the state(excursionData) using the setExcursionData
        //Keeps everythign the same except the updated value
       // setExcursionData(prevState => ({
        //  ...prevState,
         // [name]: newValue
        //}));
      //};
      
      //Async means can contain asynchronous operations, meaning it can wait for things to finish before proceeding.
      const onSubmit = async (data) => {
        data.destinations = data.destinations.split(',').map(destination => destination.trim());

        console.log(data);
          await saveExcursion(data);
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
            <input type="number" {... register("price", {required: true, min: 0})} className="form-input"/>
            {errors.price && <span className="error-message">Price is required!</span>}
          </label>
          <button type="submit" className="form-button">List Trip</button>
        </form>
      );


}

export default TripListingForm;