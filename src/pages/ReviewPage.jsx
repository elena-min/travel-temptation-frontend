import React from "react";
import "./style/Home.css";
import ReviewFormContainer from "../components/ReviewFormContainer";

function ReviewPage(){
    return(
        <div className="trip-listing-form">
        <h1>Create a trip listing!</h1>
        <ReviewFormContainer/>
        </div>
    )

}

export default ReviewPage;