import React, { useState } from "react";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import AuthAPI from "../apis/AuthAPI";

function RegisterForm() {
    const {register, handleSubmit, formState : {errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async(formData) =>{
      const accessToken = await AuthAPI.registerUser(formData);
      if(accessToken){
        setErrorMessage('');
        console.log("user logged in!");
      }
      else{
        setErrorMessage('Logging in failed.');
      }
    };
    
    const isFutureDate = (selectedDate) =>{
        const today = new Date();
        const selected = new Date(selectedDate);
        return selected < today;
      };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <label className="form-label">
            First Name:
            {/*The register registers the field using React Hook Form with validation and it tracks the value*/}
           <input type="text" {... register("firstName", {required: true})} className="form-input"/>
            {errors.firstName && <span className="error-message">First name is required!</span>}
        </label>

        <label className="form-label">
           Last Name:
           <input type="text" {... register("lastName", {required: true})} className="form-input"/>
            {errors.lastName && <span className="error-message">Last name is required!</span>}
        </label>

        <label className="form-label">
            Birth date:
            <input 
                type="date"
                {... register("birthdate", 
                {required: true, 
                  validate: {
                    futureDate: value =>isFutureDate(value) || "Birth date must not be in the future!"
                  }
                }
                )} className="form-input"/>
            {errors.birthdate && <span className="error-message">{errors.birthdate.message}</span>}
        </label>

        <label className="form-label">
                Gender:
                <select {...register("gender", {required: true})} className="form-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-message">Gender is required!</span>}
        </label>
          
       <label className="form-label">
            Username:
           <input type="text" {... register("username", {required: true, minLength: 6 })} className="form-input"/>
            {errors.username && <span className="error-message">Username is required!</span>}
        </label>

        <label className="form-label">
            EMail:
           <input type="text" {... register("email", {required: true, pattern: /^\S+@\S+$/i})} className="form-input"/>
            {errors.email && <span className="error-message">Email is required!</span>}
        </label>

          <label className="form-label">
            Password:
            <input type="text" {... register("password", {required: true, minLength: 6})} className="form-input"/>
            {errors.password && <span className="error-message">Password should be ar least of 6 characters long!</span>}
          </label>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="form-button">Register</button>
        </form>
      );

}

export default RegisterForm;