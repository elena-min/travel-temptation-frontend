import React from "react";
import { saveBooking } from "../services/BookingService";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import TokenManager from "../apis/TokenManager";


function BookingForm(){
  const {register, handleSubmit, formState : {errors}} = useForm();
  
  const onSubmit = async (data) => { 
    if(!TokenManager.isUserAuthenticated()){
        alert('You need to be logged in to book a trip!');
        window.location.href = `/login`;
        return;
    }
    data.destinations = data.destinations.split(',').map(destination => destination.trim());
    console.log(data);
    const token = TokenManager.updateAxiosToken(TokenManager.getAccessToken());
    console.log(TokenManager.getUserRoles());
    await saveExcursion(data);
    console.log('Excursion booked successfully!');
};

   return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
    {/*When the form is submitted(handleSubmit takes care of that) it calls the function 'onSubmit'*/}
        <label className="form-label">
            Number of Travellers:
            {/*The register registers the field using React Hook Form with validation and it tracks the value*/}
            <input type="number" {... register("numberOfTravellers", {required: true, min: 1})} className="form-input"/>
            {errors.numberOfTravellers && <span className="error-message">numberOfTravellers is required!</span>}
        </label>
        
    
        <label className="form-label">
            Card Holder :
            <input type="text" {... register("cardHolder", {required: true})} className="form-input"/>
            {errors.cardHolder && <span className="error-message">Card Holder is required!</span>}
        </label>

        <label className="form-label">
            Card Number:
            <input type="text" {... register("cardNumber", {required: true})} className="form-input"/>
            {errors.cardNumber && <span className="error-message">Card Number is required!</span>}
        </label>
       
        <label className="form-label">
            CVV:
            <input type="number" {... register("cvv", {required: true, min: 1})} className="form-input"/>
            {errors.cvv && <span className="error-message">CVV is required!</span>}
        </label>

        <button type="submit" className="form-button">Book Trip!</button>
    </form>
    );

}

export default BookingForm;