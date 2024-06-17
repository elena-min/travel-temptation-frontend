import React, { useState } from "react";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthAPI from "../apis/AuthAPI";

function RegisterForm() {
    const {register, handleSubmit, formState : {errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [registerAsTravelAgency, setRegisterAsTravelAgency] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    
    const onSubmit = async(formData) =>{
      formData.gender = formData.gender.toUpperCase(); 
      const registerFunction = registerAsTravelAgency ? AuthAPI.registerTravelAgency : AuthAPI.registerUser;
      
        try {
          const accessToken = await registerFunction(formData);
          if (accessToken) {
              console.log('User registered!');
              console.log(accessToken);
              window.location.href = '/';
          } else {
              setErrorMessage('Registering failed.');
          }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    // Handle validation errors
                    const { data } = error.response;
                    setErrorMessage(data.error || 'Registration failed due to validation errors.');
                } else if (error.response.status === 409) {
                    // Username already exists
                    setErrorMessage('Username already exists.');
                } else {
                    // Other errors
                    setErrorMessage('An error occurred during registration. Please try again later.');
                }
            } else {
                // Network or server error
                setErrorMessage('Network or server error. Please try again later.');
            }
        }
    };
    
    const isFutureDate = (selectedDate) =>{
        const today = new Date();
        const selected = new Date(selectedDate);
        return selected < today;
      };

      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                {... register("birthDate", 
                {required: true, 
                  validate: {
                    futureDate: value =>isFutureDate(value) || "Birth date must not be in the future!"
                  }
                }
                )} className="form-input"/>
            {errors.birthDate && <span className="error-message">{errors.birthDate.message}</span>}
        </label>

        <label className="form-label">
                Gender:
                <select {...register("gender", {required: true})} className="form-input">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error-message">Gender is required!</span>}
        </label>
          
       <label className="form-label">
            Username:
           <input type="text" {... register("username", {required: true, minLength: 6 })} className="form-input"/>
            {errors.username && <span className="error-message">Username is required!</span>}
        </label>

        <label className="form-label">
            Email:
           <input type="text" {... register("email", {required: true, pattern: /^\S+@\S+$/i})} className="form-input"/>
            {errors.email && <span className="error-message">Email is required!</span>}
        </label>

        <label className="form-label">
                Password:
                <div className="password-input-container">
                    <input
                        type={passwordVisible ? "text" : "password"}
                        {...register("password", { required: true, minLength: 6 })}
                        className="form-input"
                    />
                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && (
                    <span className="error-message">
                        Password should be at least 6 characters long!
                    </span>
                )}
            </label>

          <label className="form-label">
            Register as travel agency:
            <input 
                type="checkbox"
                checked={registerAsTravelAgency}
                onChange={(e) => setRegisterAsTravelAgency(e.target.checked)}
                className="form-input"
            />
        </label>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="form-button">Register</button>
        </form>
      );

}

export default RegisterForm;