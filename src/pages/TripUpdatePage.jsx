import React from "react";
import "./style/Home.css";
import TripUpdateForm from "../components/TripUpdateForm";

function TripUpdatePage(){

    return(
        <div className="trip-listing-form">
        <h1>Create a trip listing!</h1>
        <TripUpdateForm/>
        </div>
    )

}

export default TripUpdatePage;