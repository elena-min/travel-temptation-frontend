import React from "react"
import BookingContainer from "./BookingContainer";
import './style/Booking.css'

function BookingListContainer(props) {

  return (
    <ul className="booking-list-container">
      {props.bookings.map((booking) => (
        <li key={booking.id} className="booking-container">
          <BookingContainer booking={booking} />
        </li>
      ))}
    </ul>
  )
}

export default BookingListContainer;