import React from "react";
import "./style/Home.css";
import RegisterForm from "../components/RegisterForm";

function Register(){
    return(
        <div className="trip-listing-form">
        <h1>Create an account!</h1>
        <RegisterForm/>
        </div>
    )

}

export default Register;