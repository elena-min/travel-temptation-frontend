import React from "react";
import { useState } from "react";
import { saveExcursion } from "../services/ExcursionService";
import './style/TripListing.css'

function TripListingForm(){

  //'setExcursionData' holds the function that updates the data 'excursionData'
    const [excursionData, setExcursionData] = useState({
        name: '',
        destinations: [],
        startDate: '',
        endDate: '',
        travelAgency: '',
        price: ''
      });

      //Called everytime the inout value changes
      const handleChange = (e) => {
        //Grabs thee name and value of the changed field. Target is the cause of the event. We get its name and value 
        const { name, value } = e.target;
      
        // Chexks if the value's name is deeswtinations and convert destinations string to an array
        const newValue = name === 'destinations' ? value.split(',').map(item => item.trim()) : value;
      
        //Updates the state(excursionData) using the setExcursionData
        //Keeps everythign the same except the updated value
        setExcursionData(prevState => ({
          ...prevState,
          [name]: newValue
        }));
      };
      
      //Async means can contain asynchronous operations, meaning it can wait for things to finish before proceeding.
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(excursionData);
          await saveExcursion(excursionData);
          console.log('Excursion saved successfully!');
        
      };


    return (
        <form onSubmit={handleSubmit} className="form-container">
          <label className="form-label">
            Trip Name:
            <input type="text" name="name" value={excursionData.name} onChange={handleChange} className="form-input"/>
          </label>
          <label className="form-label">
            Destinations:
            <input type="text" name="destinations" value={excursionData.destinations} onChange={handleChange} className="form-input"/>
          </label>
          <label className="form-label">
            Start Date:
            <input type="date" name="startDate" value={excursionData.startDate} onChange={handleChange} className="form-input"/>
          </label>
          <label className="form-label">
            End Date:
            <input type="date" name="endDate" value={excursionData.endDate} onChange={handleChange} className="form-input"/>
          </label>
          <label className="form-label">
            Travel Agency:
            <input type="text" name="travelAgency" value={excursionData.travelAgency} onChange={handleChange} className="form-input"/>
          </label>
          <label className="form-label">
            Price:
            <input type="number" name="price" value={excursionData.price} onChange={handleChange} className="form-input"/>
          </label>
          <button type="submit" className="form-button">List Trip</button>
        </form>
      );


}

export default TripListingForm;