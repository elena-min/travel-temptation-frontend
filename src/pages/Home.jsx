import React from "react";
import './style/Home.css';
import './style/Pagination.css';
import { useState, useEffect } from "react";
import { getAllExcursions } from "../services/ExcursionService";
import cover from '../images/cover3.jpg';
import { Link } from "react-router-dom";
import TripListContainer from "../components/TripListContainer";
import Search from "../layoutComponents/Search";
import TokenManager from "../apis/TokenManager";



function Home() {
  const [allExcursions, setAllExcursions] = useState([]);
  const [displayedExcursions, setDisplayedExcursions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

   const handleSearch = (searchResults) => {
    setAllExcursions(searchResults);
        setCurrentPage(1); 
    };

    useEffect(() => {
      //We fetch information and when it arrives we put it insideexcursions 
      getAllExcursions()
          .then(data => {
           console.log(data); 
           console.log(TokenManager.getAccessToken())
           setAllExcursions(data)})
    }, [])
    //The empty array means it will do this operation once

    useEffect(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedExcursions(allExcursions.slice(startIndex, endIndex));
    }, [allExcursions, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(allExcursions.length / itemsPerPage);

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
        <Search onSearch={handleSearch} />
        <div className='image-container'>
        <img src={cover} alt="Image 1" />
          <div className="overlay">
            <Link to="/trending" className="button">Trending</Link>
            <Link to="/traveltips" className="button">Travel Tips</Link>
          </div>
        </div>
        <div className="home-container">
          <h1>Featured Trips</h1>
          <div className="trips">
            <TripListContainer excursions={displayedExcursions} />
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

export default Home;
