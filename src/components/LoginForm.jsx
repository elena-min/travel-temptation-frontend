import React, { useState } from "react";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import AuthAPI from "../apis/AuthAPI";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {register, handleSubmit, formState : {errors}} = useForm();

  const onSubmit = async(formData) =>{
    const {username, password} = formData;
    const accessToken = await AuthAPI.login(username, password)
    if(accessToken){
      setErrorMessage('');
      console.log("user logged in!");
      console.log(accessToken);
      //window.location.href = `/home`;
    }else{
      setErrorMessage('Logging in failed.');
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
            <input type="text" {... register("password", {required: true, minLength: 6})} className="form-input"/>
            {errors.password && <span className="error-message">Password should be ar least of 6 characters long!</span>}
          </label>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="form-button">Login</button>
        </form>
      );
}

export default LoginForm;