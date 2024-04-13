import React from "react";
import { saveExcursion } from "../services/ExcursionService";
import './style/TripListing.css'
import { useForm } from "react-hook-form";

function LoginForm() {
      
    const {register, handleSubmit, formState : {errors}} = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        console.log('User saved successfully!');    
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">          
         <label className="form-label">
            Username:
           <input type="text" {... register("username", {required: true, minLength: 6 })} className="form-input"/>
            {errors.username && <span className="error-message">Username is required!</span>}
        </label>

          <label className="form-label">
            Password:
            <input type="text" {... register("password", {required: true, minLength: 6})} className="form-input"/>
            {errors.password && <span className="error-message">Password should be ar least of 6 characters long!</span>}
          </label>
        
          <button type="submit" className="form-button">Register</button>
        </form>
      );
}

export default LoginForm;