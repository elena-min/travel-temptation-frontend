import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";
import { deleteExcursion } from "../services/ExcursionService";
import tripPhoto2 from '../images/tripPhoto2.jpg';

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
          })
          .catch(error => {
            if (error.response) {
                if (error.response.status === 403) {
                    setDeleteStatus({ success: false, error: "You are not authorized to delete this listing." });
                } else if (error.response.status === 404) {
                    setDeleteStatus({ success: false, error: "Listing not found." });
                } else if (error.response.status === 400) {
                    setDeleteStatus({ success: false, error: error.response.data.error });
                } else {
                    setDeleteStatus({ success: false, error: "An unexpected error occurred. Please try again later." });
                }
            } else if (error.request) {
                console.error("Request made but no response received:", error.request);
                setDeleteStatus({ success: false, error: "No response received from the server. Please try again later." });
            } else {
                console.error("Error setting up request:", error.message);
                setDeleteStatus({ success: false, error: "An unexpected error occurred. Please try again later." });
            }
        });
        }
        
      };


      return (
        <div className="trip-container">
          <div className="trip-image-home">
              {listing.fileName ? (
                  <img src={`http://localhost:8080/files/download/${listing.fileName}`} alt="Trip" />
                      ) : (
                  <img src={tripPhoto2} alt="Trip Photo" />
               )}
          </div>
          <div className="trip-information">
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

        </div>
      );

}
export default ListingContainer;