import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getExcursion } from "../services/ExcursionService";
import maldives from '../images/maldives.jpg';

function BookingPage() {

    const { id } = useParams();
    const excursionId = parseInt(id, 10); // Convert id to integer
    const [trip, setTrip] = useState(null);
    const [numTravelers, setNumTravelers] = useState(1); // Default number of travelers is 1


    useEffect(() => {
        getExcursion(excursionId)
            .then(data => {
                console.log(data); 
                setTrip(data);
            })
            .catch(error => {
                console.error("Error fetching excursion:", error);
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
        window.location.href = `/excursions/${excursionId}/booking-details`;
      }

    return (
    <div className="trip-info-container">
        {trip && (
        <>
        <h1>{trip.name}</h1>
        <div className="trip-info-wrapper">
            <div className='trip-image'>
                <img src={maldives} alt="Maldvives" />
            </div>
            <div className='trip-info'>
                <p><strong>Travel Agency:</strong> {trip.travelAgency}</p>
                <p><strong>Destinations:</strong> {trip.destinations.join(', ')}</p>
                <p><strong>Start Date:</strong> {formatDate(trip.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(trip.endDate)}</p>
                <p><strong>Price:</strong> {trip.price}</p>
                <p><strong>Avaliable spaces:</strong> {trip.numberOfAvaliableSpaces}</p>

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
