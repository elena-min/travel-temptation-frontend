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

   useEffect(() => {
    console.log(TokenManager.getAccessToken());
    if(TokenManager.getAccessToken()){
      TokenManager.updateAxiosToken(TokenManager.getAccessToken());
      const userID = TokenManager.getUserIdFromToken();
    
      getExcursionsByTravelAgency(userID)
      .then((listings) => {
        setListings(listings);
        console.log(listings);
      })
      .catch((error) =>{
        console.error('Error fetching listings:', error);
      })
    }
    else{
      window.location.href = `/login`;
    } }, []);

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
          <h1>My Listings</h1>
          <div className="trips">
            <ListingsListContainer listings={currentItems} />
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