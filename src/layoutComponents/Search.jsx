import React, { useState } from 'react';
import './style/Search.css';
import {searchExcursionsByNameAndTravelAgencyAndPrice } from "../services/ExcursionService";

function Search({ onSearch }) {
  const [priceRange, setPriceRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const [minPrice, maxPrice] = parsePriceRange(priceRange);
    console.log(minPrice);
    console.log(maxPrice);

    const minPriceNum = minPrice === Infinity ? "0" : minPrice.toString();
    const maxPriceNum = maxPrice === Infinity ? "Infinity" : maxPrice.toString();

    searchExcursionsByNameAndTravelAgencyAndPrice(searchTerm, minPriceNum, maxPriceNum)
        .then(excursions => {
            console.log(searchTerm);
            console.log('Excursions found!', excursions);
            // Pass search results back to parent component
            onSearch(excursions);
        })
        //.catch(error => {
        //    console.error('Error searching excursions:', error);
        //});
};


const parsePriceRange = (range) => {
  switch (range) {
    case '<250':
      return [0, 251];
    case '250-500':
      return [249, 501];
    case '500-750':
      return [499, 751];
    case '750-1000':
      return [749, 1001];
    case '>1000':
      return [999, Infinity];
    default:
      return [0, Infinity];
  }
};


  return (
    <div className="search-container">
        <div className='search-items'>
        <input type="text" 
          value={searchTerm}
          placeholder="Search by trip name or travel agency" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='filter-box'>
          <p>Price:</p>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="">Any</option>
            <option value="<250">&lt; 250 €</option>
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
