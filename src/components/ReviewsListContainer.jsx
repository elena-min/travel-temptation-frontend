import React from "react"
import './style/Booking.css'
import ReviewContainer from "./ReviewContainer";

function ReviewsListContainer(props) {

  return (
    <ul className="review-list-container">
      {props.reviews.map((review) => (
        <li key={review.id} className="booking-container">
          <ReviewContainer review={review} />
        </li>
      ))}
    </ul>
  )
}

export default ReviewsListContainer;