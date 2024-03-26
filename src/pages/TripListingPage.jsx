import React from "react";
import TripListingForm from "../components/TripListingForm";
import "./style/Home.css";

function TripListingPage(){
    return(
        <div className="trip-listing-form">
        <h1>Create a listing</h1>
        <TripListingForm/>
        </div>
    )

}

export default TripListingPage;