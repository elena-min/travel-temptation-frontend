import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import TripListContainer from "../components/TripListContainer";
import { getTrendingExcursions } from "../services/TrendingService";


function TrendingPage() {
   const [excursions, setExcursions] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      getTrendingExcursions(16)
          .then(data => {
           console.log(data); 
          setExcursions(data)})
          .catch((error) => {
            if (error.response) {
                 if (error.response.status === 404) {
                    setErrorMessage("Trendings not found for this user.");
                } else {
                    setErrorMessage("Server error: " + error.response.data.error);
                }
            } else if (error.request) {
                setErrorMessage("No response received from the server. Please try again later.");
            } else {
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        });
    }, [])
    
      return (
        <>
        <div className="home-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1>Trending Trips</h1>
          <div className="trips">
              {excursions.length > 0 ? (
                <TripListContainer excursions={excursions} />
              ) : (
                <p>No trending trips available</p>
              )}          
          </div>
        </div>
        </>
          
      );
}

export default TrendingPage;