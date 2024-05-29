import React from "react"
import './style/Booking.css'
import ListingSmallContainer from "./ListingSmallContainer";

function ListingsListSmallContainer(props) {

  return (
    <ul className="booking-list-container">
      {props.listings.map((listing) => (
        <li key={listing.id} className="booking-container">
          <ListingSmallContainer listing={listing} />
        </li>
      ))}
    </ul>
  )
}

export default ListingsListSmallContainer;