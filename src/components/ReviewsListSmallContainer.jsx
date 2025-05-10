import React from "react"
import './style/Booking.css'
import ReviewSmallContainer from "./ReviewSmallContainer";

function ReviewsListSmallContainer(props) {

  return (
    <ul className="booking-list-container">
      {props.reviews.map((review) => (
        <li key={review.id} className="booking-container">
          <ReviewSmallContainer review={review} />
        </li>
      ))}
    </ul>
  )
}

export default ReviewsListSmallContainer;