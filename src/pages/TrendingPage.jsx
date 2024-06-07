import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import TripListContainer from "../components/TripListContainer";
import { getTrendingExcursions } from "../services/TrendingService";


function TrendingPage() {
   const [excursions, setExcursions] = useState([]);


    useEffect(() => {
      getTrendingExcursions(16)
          .then(data => {
           console.log(data); 
          setExcursions(data)})
    }, [])
    
      return (
        <>
        <div className="home-container">
          <h1>Trending Trips</h1>
          <div className="trips">
          <TripListContainer excursions={excursions} />
          </div>
        </div>
        </>
          
      );
}

export default TrendingPage;