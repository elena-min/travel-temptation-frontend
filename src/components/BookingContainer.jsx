import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";
import { deleteBooking } from "../services/BookingService";

function BookingContainer({booking}){
  const [deleteStatus, setDeleteStatus] = useState({ success: false, error: null });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      }
    
      const handleCancelTrip = () =>{
        const confirmDelete = window.confirm("Are you sure you want to cancel this trip?")
        if(confirmDelete){
          deleteBooking(booking.id)
          .then( () =>{
            setDeleteStatus({ success: true });
              //window.location.href = "/";
          });
         // .catch(error => {
         //   setDeleteStatus({success: false, error: error.message});
         //     console.error("Error canceling excursion.", error);
         // });
        }
        
      }
      
      return (
        <div className="trip-container">
          <h2>
            <Link to={`/trip/${booking.excursion.id}`}>{booking.excursion.name}</Link>
            </h2>          
            <h4>'{booking.excursion.travelAgency}'</h4>
          <p><i>{booking.excursion.destinations.join(', ')}</i></p>
          <p><b>{formatDate(booking.excursion.startDate)} - {formatDate(booking.excursion.endDate)}</b></p>
          <p><i>Number of traveleres: </i>{booking.numberOfTravelers}</p>
          <p><i>Booking status: </i>{booking.status}</p>
          {deleteStatus.error && <p className="error">{deleteStatus.error}</p>}
          {deleteStatus.success ?
            <p className="success">Booking deleted successfully!</p> :
            <button className='cancel-button' onClick={handleCancelTrip}>Cancel Trip</button>

          }

        </div>
      );

}
export default BookingContainer;
