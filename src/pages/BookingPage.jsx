import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getExcursion } from "../services/ExcursionService";
import maldives from '../images/maldives.jpg';
import './style/Booking.css';


function BookingPage() {

    const { id } = useParams();
    const excursionId = parseInt(id, 10); // Convert id to integer
    const [trip, setTrip] = useState(null);
    const [numTravelers, setNumTravelers] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        getExcursion(excursionId)
            .then(data => {
                console.log(data); 
                setTrip(data);
            })
            .catch((error) =>{
                console.error('Error fetching listings:', error);
                if (error.response && error.response.status === 404) {
                    setErrorMessage("Excursions not found for this travel agency.");
                } else {
                    setErrorMessage("An error occurred while fetching excursions. Please try again later.");
                }
            });
    }, [excursionId]);


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
        const year = date.getFullYear();
      
        // Ensure that single-digit days and months are padded with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      }
      
      const handleBookNow = () =>{
        if (numTravelers > trip.numberOfSpacesLeft) {
            setBookingError('The number of travelers exceeds the available spaces.');
            return;
        }
        setBookingError('');
        window.location.href = `/excursions/${excursionId}/booking-details?numTravelers=${numTravelers}`;
    }

    return (
    <div className="trip-info-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {trip && (
        <>
        <h1>{trip.name}</h1>
        <div className="trip-info-wrapper">
            <div className='trip-image'>
                <img src={maldives} alt="Maldvives" />
            </div>
            <div className='trip-info'>
            <p><strong>Travel Agency:</strong> {trip.travelAgency.firstName} {trip.travelAgency.lastName}</p>
                <p><strong>Destinations:</strong> {trip.destinations.join(', ')}</p>
                <p><strong>Start Date:</strong> {formatDate(trip.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(trip.endDate)}</p>
                <p><strong>Price:</strong> {trip.price}</p>
                <p><strong>Total spaces:</strong> {trip.numberOfAvaliableSpaces}</p>
                    <p><strong>Avaliable spaces left:</strong> {trip.numberOfSpacesLeft} !!!</p>
                <label htmlFor="numTravelers"><strong>Number of Travelers:</strong></label>
                <select id="numTravelers" value={numTravelers} onChange={(e) => setNumTravelers(parseInt(e.target.value))}>
                    {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num + 1}>{num + 1}</option>
                    ))}
                </select>

               <button className="book-button" onClick={handleBookNow}>Continue</button>
            </div>
        </div>
        </>
    )}
    </div>
    );
}

export default BookingPage;

