import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../services/UserService';
import './style/TripInfoPage.css';
import maldives from '../images/maldives.jpg';
import TokenManager from '../apis/TokenManager';
import { getReviewsByTravelAgency } from '../services/ReviewService';
import { getExcursionsByTravelAgency } from '../services/ExcursionService';
import ReviewsListSmallContainer from '../components/ReviewsListSmallContainer';
import ListingsListSmallContainer from '../components/ListingsListSmallContainer';

function TravelAgencyInfoPage() {

    const { id } = useParams();
    const travelAgencyId = parseInt(id, 10); // Convert id to integer
    const [travelAgency, setTravelAgency] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const userRole = TokenManager.getUserRoles();
    const [showReviews, setShowReviews] = useState(false);
    const [showListings, setShowListings] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const userId = TokenManager.getUserIdFromToken();    
    const isLoggedIn = TokenManager.isAuthenticated();
    if (isLoggedIn) {
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
    }

    const [reviews, setReviews] = useState([]);
    const [listings, setListings] = useState([]);

    useEffect(() => {
      getUser(travelAgencyId)
          .then(data => {
              console.log(data); 
              setTravelAgency(data);
          })
          .catch(error => {
            console.error("Error fetching user:", error);
            if (error.response && error.response.status === 404) {
              setErrorMessage("User not found");
            } else {
              setErrorMessage("An error occurred while fetching user data. Please try again later.");
            }
          });
  }, [travelAgencyId]);

    useEffect(() => {
      console.log(travelAgencyId);
      getReviewsByTravelAgency(travelAgencyId)
       .then((reviews) => {
         setReviews(reviews);
         console.log(reviews);
       })
       .catch((error) =>{
        console.error('Error fetching reviews:', error);
        if (error.response && error.response.status === 404) {
            setErrorMessage("Reviews not found for this travel agency.");
        } else {
            setErrorMessage("An error occurred while fetching reviews. Please try again later.");
        }
      });
    }, []);

       useEffect(() => {
          getExcursionsByTravelAgency(travelAgencyId)
          .then((listings) => {
            setListings(listings);
            console.log(listings);
          })
          .catch((error) =>{
            console.error('Error fetching listings:', error);
            if (error.response && error.response.status === 404) {
                setErrorMessage("Excursions not found for this travel agency.");
            } else {
                setErrorMessage("An error occurred while fetching excursions. Please try again later.");
            }
        });
       }, []);

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
      const handleStartChat = () =>{
        window.location.href = `/chat/${travelAgencyId}`; 
      }
      
        return (
            <div className="trip-info-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                      <button className='reviews-button' onClick={handleShowReviews}>Check Reviews</button>
                          <button className='listings-button' onClick={handleShowListings}>Check Listings</button>
                       
                      {userRole.includes("USER") && (
                        <>
                          <button className='review-button' onClick={handleReviewNow}>Write a review</button>
                          <button className='chat-button' onClick={handleStartChat}>Send a Message</button>

                        </>
                      )}
                    </div>
                   </div>
                </div>

                 {showReviews && (
                    <div className="reviews-section">
                    <h3>Reviews</h3>
                    <ReviewsListSmallContainer reviews={reviews} />
                    </div>
                )}

                {showListings && (
                    <div className="listings-section">
                    <h3>Listings</h3>
                    <ListingsListSmallContainer listings={listings} />
                    </div>
                )}
                </>
                
            )}

            </div>
          );
}

export default TravelAgencyInfoPage;
