import React, { useState } from "react";
import './style/Trip.css';
import { Link } from "react-router-dom";
import { deleteBooking } from "../services/BookingService";
import TokenManager from "../apis/TokenManager";
import tripPhoto2 from '../images/tripPhoto2.jpg';


function BookingContainer({booking}){
  const [deleteStatus, setDeleteStatus] = useState({ success: false, error: null });
  console.log(booking);
  console.log(booking.excursion);
  const userRole = TokenManager.getUserRoles();

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
        if(TokenManager.isTokenExpired()){
          TokenManager.clear();
          return <Navigate to="/login" />;
      }8
        const confirmDelete = window.confirm("Are you sure you want to cancel this trip?")
        if(confirmDelete){
          deleteBooking(booking.id)
          .then( () =>{
            setDeleteStatus({ success: true });
          })
          .catch(error => {
            setDeleteStatus({success: false, error: error.message});
              console.error("Error canceling excursion.", error);
          });
        }
        
      }

      const getStatusClass = (status) => {
        switch (status) {
          case 'PENDING':
            return 'status-pending';
          case 'CANCELLED':
            return 'status-cancelled';
          case 'CONFIRMED':
            return 'status-confirmed';
          default:
            return '';
        }
      };
      
      return (
        <div className="trip-container">

          <div className="trip-image-home">
              {booking.excursion.fileName ? (
                  <img src={`http://localhost:8080/files/download/${booking.excursion.fileName}`} alt="Trip" />
                      ) : (
                  <img src={tripPhoto2} alt="Trip Photo" />
               )}
          </div>
          <div className="trip-information">
              <h2>
                <Link to={`/trip/${booking.excursion.id}`}>{booking.excursion.name}</Link>
                </h2>          
                <h4>'{booking.excursion.travelAgency.firstName} {booking.excursion.travelAgency.lastName}'</h4>
              <p><i>{booking.excursion.destinations.join(', ')}</i></p>
              <p><b>{formatDate(booking.excursion.startDate)} - {formatDate(booking.excursion.endDate)}</b></p>
              <p><i>Number of traveleres: </i>{booking.numberOfTravelers}</p>
              <p><i>Booking status: </i>
                <span className={getStatusClass(booking.status)}>{booking.status}</span>
              </p>
                {userRole.includes("USER") && (
                    <>
                      <button className='more-info-button'>
                        <Link to={`/booking/${booking.id}`}>More info</Link>
                      </button> 
                    </>
                )}
          
              {deleteStatus.error && <p className="error">{deleteStatus.error}</p>}
              {deleteStatus.success ?
                <p className="success">Booking deleted successfully!</p> :
                <button className='cancel-button' onClick={handleCancelTrip}>Cancel Trip</button>

              }

          </div>

        </div>
      );

}
export default BookingContainer;
