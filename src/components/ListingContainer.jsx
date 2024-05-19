import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";
import { deleteExcursion } from "../services/ExcursionService";

function ListingContainer({listing}){
  const [deleteStatus, setDeleteStatus] = useState({ success: false, error: null });
  console.log(listing);
  console.log(listing.excursion);

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
        const confirmDelete = window.confirm("Are you sure you want to delete this listin?")
        if(confirmDelete){
            deleteExcursion(listing.id)
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
            <Link to={`/trip/${listing.id}`}>{listing.name}</Link>
            </h2>          
            <h4>'{listing.travelAgency.firstName} {listing.travelAgency.lastName}'</h4>
          <p><i>{listing.destinations.join(', ')}</i></p>
          <p><b>{formatDate(listing.startDate)} - {formatDate(listing.endDate)}</b></p>
          <p><b>Price:</b> {listing.price} &euro;/p.p.</p>

          {deleteStatus.error && <p className="error">{deleteStatus.error}</p>}
          {deleteStatus.success ?
            <p className="success">Listing deleted successfully!</p> :
            <button className='cancel-button' onClick={handleCancelTrip}>Remove Listing</button>

          }

        </div>
      );

}
export default ListingContainer;