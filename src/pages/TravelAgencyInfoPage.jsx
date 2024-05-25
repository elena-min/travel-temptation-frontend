import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../services/UserService';
import './style/TripInfoPage.css';
import maldives from '../images/maldives.jpg';
import TokenManager from '../apis/TokenManager';
import ReviewsListContainer from '../components/ReviewsListContainer';
import { getReviewsByUser } from '../services/ReviewService';

function TravelAgencyInfoPage() {

    const { id } = useParams();
    const travelAgencyId = parseInt(id, 10); // Convert id to integer
    const [travelAgency, setTravelAgency] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const userRole = TokenManager.getUserRoles();
    const [showReviews, setShowReviews] = useState(false);
    const [showListings, setShowListings] = useState(false);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
     console.log(TokenManager.getAccessToken());
     if(TokenManager.getAccessToken()){
       TokenManager.updateAxiosToken(TokenManager.getAccessToken());
       const userID = TokenManager.getUserIdFromToken();
     
       getReviewsByUser(userID)
       .then((reviews) => {
         setReviews(reviews);
         console.log(reviews);
       })
       .catch((error) =>{
         console.error('Error fetching reviews:', error);
       })
     }
     else{
       //window.location.href = `/login`;
     } }, []);


    useEffect(() => {
        getUser(travelAgencyId)
            .then(data => {
                console.log(data); 
                setTravelAgency(data);
            })
            .catch(error => {
                console.error("Error fetching travel agency:", error);
            });
    }, [travelAgencyId]);



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

      
      const handleShowReviews = () => {
        setShowReviews(true);
        setShowListings(false);
      };
    
      const handleShowListings = () => {
        setShowListings(true);
        setShowReviews(false);
      };

      const handleReviewNow = () =>{
        window.location.href = `/write-review/${travelAgencyId}`;
      }
      
      const handleCheckBookings = () => {
        window.location.href = `/excursions/${excursionId}/bookings`;
      }
        return (
            <div className="trip-info-container">
                {travelAgency && (
                <>
                <div className="trip-info-wrapper">
                   <div className='trip-image'>
                    <img src={maldives} alt="Maldvives" />
                   </div>
                   <div className='trip-info'>
                   <h2>{travelAgency.firstName} {travelAgency.lastName}</h2>
                    <p><strong>Email:</strong> {travelAgency.email}</p>

                    <div className='buttons'>
                      {userRole.includes("TRAVELAGENCY") && (
                        <>
                         <button className='bookings-button' onClick={handleCheckBookings}>Check Bookings</button>
                        </>
                      )}
                      {userRole.includes("USER") && (
                        <>
                          <button className='review-button' onClick={handleReviewNow}>Write a review</button>
                          <button className='reviews-button' onClick={handleShowReviews}>Check Reviews</button>
                          <button className='listings-button' onClick={handleShowListings}>Check Listings</button>
                        </>
                      )}
                    </div>
                   </div>
                </div>

                 {showReviews && (
                    <div className="reviews-section">
                    <h3>Reviews</h3>
                    <ReviewsListContainer reviews={reviews} />
                    </div>
                )}

                {showListings && (
                    <div className="listings-section">
                    {/* Render listings here */}
                    <h3>Listings</h3>
                    {/* Assuming you have a component to display listings */}
                    {/* <ListingsComponent travelAgencyId={travelAgencyId} /> */}
                    </div>
                )}
                </>
                
            )}

            </div>
          );
}

export default TravelAgencyInfoPage;
