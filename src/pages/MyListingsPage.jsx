import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import TokenManager from "../apis/TokenManager";
import { getExcursionsByTravelAgency } from "../services/ExcursionService";
import ListingsListContainer from "../components/ListingsListContainer";


function MyListingsPage() {
   const [listings, setListings] = useState([]);

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
      //window.location.href = `/login`;
    } }, []);

   
      return (
        <>
        <div className="home-container">
          <h1>My Listings</h1>
          <div className="trips">
          <ListingsListContainer listings={listings} />
          </div>
        </div>
        </>
          
      );
}

export default MyListingsPage;