import React from "react"
import TripContainer from "./TripContainer";
import './style/Trip.css'

function TripListContainer(props) {

  return (
    <>
      {props.excursions.map(trip => (
        <TripContainer key={trip.id} trip={trip} />
      ))}
    </>
  )
}

export default TripListContainer;