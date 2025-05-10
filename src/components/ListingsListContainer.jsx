import React from "react"
import './style/Booking.css'
import ListingContainer from "./ListingContainer";

function ListingsListContainer(props) {

  return (
    <ul className="booking-list-container">
      {props.listings.map((listing) => (
        <li key={listing.id} className="booking-container">
          <ListingContainer listing={listing} />
        </li>
      ))}
    </ul>
  )
}

export default ListingsListContainer;