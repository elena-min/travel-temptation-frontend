import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteExcursion, getExcursion } from "../services/ExcursionService";
import './style/TripInfoPage.css';
import tripPhoto2 from '../images/tripPhoto2.jpg';
import TokenManager from '../apis/TokenManager';
import { getBookingsByExcursion } from '../services/BookingService';
import BookingListSmallContainer from '../components/BookingListSmallContainer';
import ExcursionSales from '../components/statistics/ExcursionSales';
import BookingStatisticsGraphContainer from '../components/statistics/BookingStatisticsGraphContainer';

function TripInfoPage() {

    const { id } = useParams();
    const excursionId = parseInt(id, 10); // Convert id to integer
    const [trip, setTrip] = useState(null);
    const [tripfileName, setTripfileName] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const userRole = TokenManager.getUserRoles();
    const userId = TokenManager.getUserIdFromToken();    
    const isLoggedIn = TokenManager.isAuthenticated();
    if (isLoggedIn) {
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
    }


    const [showBookings, setShowBookings] = useState(false);
    const [bookings, setBookings] = useState([]);

    const [showSales, setshowSales] = useState(false);


    useEffect(() => {
      const fetchExcursion = async () => {
          try {
              const excursionData = await getExcursion(excursionId);
              setTrip(excursionData);
              setTripfileName(excursionData.fileName);
              console.log(excursionData.fileName)
              console.log(tripfileName);
          } catch (error) {
              if (error.response) {
                  if (error.response.status === 404) {
                      setErrorMessage("Excursion not found");
                  } else {
                      console.error("Server error:", error.response.data.error);
                      setErrorMessage(error.response.data.error);
                  }
              } else if (error.request) {
                  console.error("Request made but no response received:", error.request);
                  setErrorMessage("No response received from the server. Please try again later.");
              } else {
                  console.error("Error fetching excursion:", error.message);
                  setErrorMessage("An unexpected error occurred. Please try again later.");
              }
          }
      };
  
      fetchExcursion();
  }, [excursionId]);  

  
  useEffect(() => {
    const fetchBookings = async () => {
        try {
            const bookings = await getBookingsByExcursion(excursionId);
            setBookings(bookings);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error("Bookings not found for this excursion");
                    setErrorMessage("Bookings not found for this excursion");
                } else {
                    console.error("Server error:", error.response.data.error);
                    setErrorMessage(error.response.data.error);
                }
            } else {
                console.error("Error fetching bookings:", error.message);
                setErrorMessage("An unexpected error occurred. Please try again later.");
            }
        }
    };

    if (isLoggedIn && userRole.includes("TRAVELAGENCY")) {
        fetchBookings();
    }
}, [excursionId]);


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      }

      const handleDelete = () =>{
        const confirmDelete = window.confirm("Are you sure you want to delete this trip?")
        if(confirmDelete){
          deleteExcursion(excursionId)
          .then( () =>{
              window.location.href = "/";
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
        
      }

      const handleCheckBookings = () => {
        setShowBookings(true);
      };
      const handleCheckSales = () => {
        setshowSales(true);
      };
      
      const handleBookNow = () =>{
          //if (tripStartDate > currentDate) {
            window.location.href = `/excursions/${excursionId}/booking`;
          //} else {
          //  alert("This trip has already passed or is today. You cannot book it now.");
         // }
      }
      
      const handleUpdate = () =>{
        window.location.href = `/excursions/${excursionId}/update`;
      }

  
    
      const tripStartDate = trip ? new Date(trip.startDate) : null;
      return (
            <div className="trip-info-container">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {deleteStatus && (
              <div className={updateStatus.success ? "success-message" : "error-message"}>
                    {updateStatus.success ? "Trip deleted successfully!" : "Error deleting information. Please try again."}
              </div>
              )}

                {trip && (
                <>
                <h1>{trip.name}</h1>
                <div className="trip-info-wrapper">
                   <div className='trip-image'>
                    {tripfileName ? (
                                <img src={`http://localhost:8080/files/download/${tripfileName}`} alt="Trip Photo" />
                            ) : (
                                <img src={tripPhoto2} alt="Trip Photo" />
                    )}

                   </div>
                   <div className='trip-info'>
                    <p><strong>Travel Agency:</strong> {trip.travelAgency.firstName} {trip.travelAgency.lastName}</p>
                    <p><strong>Destinations:</strong> {trip.destinations.join(', ')}</p>
                    <p><strong>Description:</strong> {trip.description}</p>
                    <p><strong>Start Date:</strong> {formatDate(trip.startDate)}</p>
                    <p><strong>End Date:</strong> {formatDate(trip.endDate)}</p>
                    <p><strong>Price:</strong> {trip.price} &euro;/p.p.</p>
                    <p><strong>Total spaces:</strong> {trip.numberOfAvaliableSpaces}</p>
                    <p><strong>Avaliable spaces left:</strong> {trip.numberOfSpacesLeft} !!!</p>

                    <div className='buttons'>
                      {isLoggedIn && userRole.includes("TRAVELAGENCY") && userId === trip.travelAgency.id &&(
                        <>
                        <div className="button-row">
                            <button className='delete-button' onClick={handleDelete}>Delete Listing</button>
                            <button className='update-button' onClick={handleUpdate}>Update Listing</button>
                        </div>
                        <div className="button-row">
                            <button className='bookings-button' onClick={handleCheckBookings}>Check Bookings</button>
                            <button className='sales-button' onClick={handleCheckSales}>Check Sales</button>
                        </div>
                    </>
                      )}
                      {userRole.includes("USER") && trip.numberOfSpacesLeft > 0 && (
                          <>
                          {tripStartDate > new Date() ? (
                              <button className='booking-button' onClick={handleBookNow}>Book Trip</button>
                          ) : (
                              <h5>Booking period for this trip has passed.</h5>
                          )}
                          </>
                      )}
                    </div>
                   </div>
                </div>
                {showBookings && (
                    <div className="bookings-section">
                    <h3>Bookings</h3>
                    <BookingListSmallContainer bookings={bookings} />
                    </div>
                )}

                {showSales && (
                      <div className="statistics-section">
                        <ExcursionSales excursionId={excursionId} />
                        <BookingStatisticsGraphContainer excursionId={excursionId}/>
                      </div>
                )}
                </>
                
            )}

            </div>
          );
}

export default TripInfoPage;
