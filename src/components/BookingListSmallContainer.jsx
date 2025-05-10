import React from "react"
import './style/Booking.css'
import BookingSmallContainer from "./BookingSmallContainer";

function BookingListSmallContainer(props) {

  return (
    <ul className="booking-list-container">
      {props.bookings.map((booking) => (
        <li key={booking.id} className="booking-container">
          <BookingSmallContainer booking={booking} />
        </li>
      ))}
    </ul>
  )
}

export default BookingListSmallContainer;