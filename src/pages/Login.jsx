import React from "react";
import "./style/Home.css";
import LoginForm from "../components/LoginForm";

function Login(){
    return(
        <div className="trip-listing-form">
        <h1>Welcome back!</h1>
        <LoginForm/>
        </div>
    )

}

export default Login;