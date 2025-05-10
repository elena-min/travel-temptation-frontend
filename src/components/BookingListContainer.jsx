import React from "react"
import BookingContainer from "./BookingContainer";
import './style/Booking.css'

function BookingListContainer(props) {

  return (
    <div className="mybooking-list-container">
      {props.bookings.length === 0 ? (
        <p>{props.message}</p>
      ) : (
        <ul className="mybooking-list-container">
          {props.bookings.map((booking) => (
            <li key={booking.id} className="booking-container">
              <BookingContainer booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookingListContainer;