import React, { useState } from 'react';
import './style/Search.css';
import {getExcursionByName } from "../services/ExcursionService";

function Search() {
    const [priceRange, setPriceRange] = useState();
    const [tripName, setTripName] = useState('');

    const handleSearch = () => {
        getExcursionByName(tripName)
        .then(excursion =>{
            console.log('Excursion found!', excursion);

        }
        )
       // .catch( error =>{
         //   console.log('Error found!', error);
        //})
        ;
      };


  return (
    <div className="search-container">
        <div className='search-items'>
        <input type="text" 
        value={tripName}
        placeholder="Search by trip name or travel agency" 
        onChange={(e) => setTripName(e.target.value)}/>

      <div className='filter-box'>
      <p>Price:</p>
      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
        <option value="<250>">&lt; 250 €</option>
        <option value="250-500">250 - 500 €</option>
        <option value="500-750">500 - 750 €</option>
        <option value="750-1000">750 - 1000 €</option>
        <option value=">1000">&gt; 1000 €</option>

      </select>
      </div>
        </div>
      
      <button onClick={handleSearch}>Search</button> 
    </div>
  );
}

export default Search;
