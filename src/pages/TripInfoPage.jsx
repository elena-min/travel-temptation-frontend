import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteExcursion, getExcursion } from "../services/ExcursionService";
import './style/TripInfoPage.css';
import maldives from '../images/maldives.jpg';

function TripInfoPage() {

    const { id } = useParams();
    const excursionId = parseInt(id, 10); // Convert id to integer
    const [trip, setTrip] = useState(null);

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

      const handleDelete = () =>{
        deleteExcursion(excursionId)
        .then( () =>{
            window.location.href = "/";
        })
        .catch(error => {
            console.error("Error deleting excursion.", error);
        });
      }
      
      const handleBookNow = () =>{
        window.location.href = `/excursions/${excursionId}/booking`;
      }
      
      const handleUpdate = () =>{
        window.location.href = `/excursions/${excursionId}/update`;
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

                    <button className="book-button" onClick={handleBookNow}>Book Now</button>
                    <button className='delete-button' onClick={handleDelete}>Delete Trip</button>
                    <button className='update-button' onClick={handleUpdate}>Update Trip</button>
                   </div>
                </div>
                </>
                
            )}

            </div>
          );
}

export default TripInfoPage;
