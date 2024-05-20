import React from "react";
import './style/Home.css';
import { useState, useEffect } from "react";
import { getAllExcursions } from "../services/ExcursionService";
import cover from '../images/cover3.jpg';
import { Link } from "react-router-dom";
import TripListContainer from "../components/TripListContainer";
import Search from "../layoutComponents/Search";
import TokenManager from "../apis/TokenManager";


function Home() {
   const [excursions, setExcursions] = useState([]);

   const handleSearch = (searchResults) => {
        setExcursions(searchResults);
    };

    useEffect(() => {
      //We fetch information and when it arrives we put it insideexcursions 
      getAllExcursions()
          .then(data => {
           console.log(data); 
           console.log(TokenManager.getAccessToken())
          setExcursions(data)})
    }, [])
    //The empty array means it will do this operation once
    
      return (
        <>
        <Search onSearch={handleSearch} />
        <div className='image-container'>
        <img src={cover} alt="Image 1" />
          <div className="overlay">
            <Link to="/trending" className="button">Trending</Link>
            <Link to="/excursions" className="button">Explore</Link>
            <Link to="/trips/europe" className="button">Europe</Link>
          </div>
        </div>
        <div className="home-container">
          <h1>Featured Trips</h1>
          <div className="trips">
          <TripListContainer excursions={excursions} />
          </div>
        </div>
        </>
          
      );
}

export default Home;
