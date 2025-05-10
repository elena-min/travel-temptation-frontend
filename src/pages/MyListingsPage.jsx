import React from "react";
import './style/Home.css';
import './style/Pagination.css';
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import { getExcursionsByTravelAgency } from "../services/ExcursionService";
import ListingsListContainer from "../components/ListingsListContainer";


function MyListingsPage() {
   const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
    if (TokenManager.isTokenExpired()) {
      TokenManager.clear();
      window.location.href = `/login`;
      return;
    }

    console.log(TokenManager.getAccessToken());
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
      const userID = TokenManager.getUserIdFromToken();
    
      getExcursionsByTravelAgency(userID)
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

    const totalPages = Math.ceil(listings.length / itemsPerPage);

  const currentItems = listings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
   
      return (
        <>
        <div className="home-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1>My Listings</h1>
          <div className="trips">
             {currentItems.length > 0 ? (
                  <ListingsListContainer listings={currentItems} />
                ) : (
                  <p>No Listings available</p>
                )}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
        </>
          
      );
}

export default MyListingsPage;