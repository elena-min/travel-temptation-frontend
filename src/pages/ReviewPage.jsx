import React from "react";
import "./style/Home.css";
import ReviewFormContainer from "../components/ReviewFormContainer";

function ReviewPage(){
    return(
        <div className="trip-listing-form">
        <h1>Write a review!</h1>
        <ReviewFormContainer/>
        </div>
    )

}

export default ReviewPage;