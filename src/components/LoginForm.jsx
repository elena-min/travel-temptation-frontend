import React, { useState } from "react";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import AuthAPI from "../apis/AuthAPI";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {register, handleSubmit, formState : {errors}} = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async(formData) =>{
    const {username, password} = formData;
    try {
      const accessToken = await AuthAPI.login(username, password);
      if (accessToken) {
        console.log("User logged in!");
        console.log(accessToken);
        window.location.href = `/home`;
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401 || error.response.status === 403) {
          setErrorMessage("Invalid username or password.");
        } else if (error.response.status === 404) {
          setErrorMessage("User not found.");
        } else if (error.response.status === 500) {
          setErrorMessage("An unexpected error occurred. Invalid username or password.");
        } else {
          setErrorMessage("Network error. Please check your internet connection.");
        }
      } else {
        setErrorMessage("Network error. Please check your internet connection.");
      }
    }
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
            {errors.password && <span className="error-message">Password should be at least 6 characters long!</span>}
          </label>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="form-button">Login</button>
        </form>
      );
}

export default LoginForm;