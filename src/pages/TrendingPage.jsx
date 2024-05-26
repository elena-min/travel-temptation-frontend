import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import cover from '../images/cover3.jpg';
import { Link } from "react-router-dom";
import TripListContainer from "../components/TripListContainer";
import Search from "../layoutComponents/Search";
import TokenManager from "../apis/TokenManager";
import { getTrendingExcursions } from "../services/TrendingService";


function TrendingPage() {
   const [excursions, setExcursions] = useState([]);

   const handleSearch = (searchResults) => {
        setExcursions(searchResults);
    };

    useEffect(() => {
      //We fetch information and when it arrives we put it insideexcursions 
      getTrendingExcursions()
          .then(data => {
           console.log(data); 
           console.log(TokenManager.getAccessToken())
          setExcursions(data)})
    }, [])
    //The empty array means it will do this operation once
    
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