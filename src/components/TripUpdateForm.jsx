import React, { useState, useEffect  } from 'react';
import { updateExcursion, getExcursion } from "../services/ExcursionService";
import './style/TripListing.css'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import TokenManager from '../apis/TokenManager';
import FileService from '../services/FileService';
import FileUploadComponent from './fileUploads/FileUploadComponent';

function TripUpdateForm(){

    const { id } = useParams();
    const excursionId = parseInt(id); // Convert id to integer
    const [trip, setTrip] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const {register, handleSubmit, formState : {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [fileName, setFileName] = useState('');

  
    useEffect(() => {
      const fetchTrip = async () => {
          try {
              const userIdFromToken = TokenManager.getUserIdFromToken();
              if (!userIdFromToken) {
                  console.error("User ID not found in token");
                  TokenManager.clear();
                  window.location.href = '/login';
                  return;
              }

              const excursionData = await getExcursion(excursionId);
              if (excursionData.travelAgency.id !== userIdFromToken) {
                  console.error("Unauthorized access - Not the owner of the excursion");
                  window.location.href = '/login'
                  return;
              }

              setTrip(excursionData);
              const formattedStartDate = formatDateForInput(excursionData.startDate);
              const formattedEndDate = formatDateForInput(excursionData.endDate);
              setValue("name", excursionData.name);
              setValue("destinations", excursionData.destinations.join(", "));
              setValue("description", excursionData.description);
              setValue("startDate", formattedStartDate);
              setValue("endDate", formattedEndDate);
              setValue("price", excursionData.price);
              setValue("numberOfAvaliableSpaces", excursionData.numberOfAvaliableSpaces);
              setLoading(false);
          } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErrorMessage("Excursion not found");
                } else {
                    console.error("Server error:", error.response.data.error);
                    setErrorMessage(error.response.data.error);
                }
            } else {
                console.error("Error fetching excursion:", error.message);
                setErrorMessage("Error fetching excursion");
            }
            setLoading(false);
        }
      };

      fetchTrip();
  }, [excursionId, setValue]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; 
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0'); 
        return `${year}-${month}-${day}`;
      };

      const formatDateForSubmit = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

  
  const isStartDateBeforeEndDate = (startDate, endDate) =>{
    const start = new Date(startDate);
    const end = new Date(endDate); 
    return start <= end;
  };
  
  const onSubmit = async (data) => {
    data.destinations = data.destinations.split(',').map(destination => destination.trim());
    data.startDate = formatDateForSubmit(data.startDate);
    data.endDate = formatDateForSubmit(data.endDate);

    try{
      const spaces = data.numberOfAvaliableSpaces - trip.numberOfSpacesLeft;
      if (data.numberOfAvaliableSpaces <= spaces) {
        setError("numberOfAvaliableSpaces", {
          type: "manual",
          message: "Number of available spaces cannot be less than the number of spaces left!"
      });
        }
      console.log(data);
      await updateExcursion(excursionId, data);
      console.log('Excursion saved successfully!'); 
      setUpdateStatus({success: true});
    }catch (error) {
      if (error.response) {
          if (error.response.status === 403) {
              setErrorMessage("Unauthorized access"); // Set error message
          } else if (error.response.status === 404) {
              setErrorMessage("Excursion not found"); // Set error message
          } else {
              console.error("Server error:", error.response.data.error);
              setErrorMessage(error.response.data.error); // Set error message
          }
      } else {
          console.error("Error updating trip:", error.message);
          setErrorMessage("Error updating trip"); // Set error message
      }
      setUpdateStatus({ success: false });
  }
       
};

if (loading) {
  return <p>Loading...</p>;
}

    return (
      <div style={{padding: 30}}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {updateStatus && (
            <div className={updateStatus.success ? "success-message" : "error-message"}>
                    {updateStatus.success ? "Trip information updated successfully!" : "Error updating information. Please try again."}
                </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              {/*When the form is submitted(handleSubmit takes care of that) it calls the function 'onSubmit'*/}
          <label className="form-label">
            Trip Name:
            {/*The register registers the field using React Hook Form with validation and it tracks the value*/}
            <input type="text" {... register("name", {required: true})} className="form-input"/>
            {errors.name && <span className="error-message">Trip name is required!</span>}
          </label>
          <label className="form-label">
            Destinations:
            <input type="text" {... register("destinations", {required: true})} className="form-input"/>
            {errors.destinations && <span className="error-message">Destinations are required!</span>}
          </label>
          <label className="form-label">
            Trip Description:
            {/*The register registers the field using React Hook Form with validation and it tracks the value*/}
            <textarea 
                {...register("description", { required: true })} 
                className="form-textarea" 
                rows="5" 
                cols="50"
             />
              {errors.description && <span className="error-message">Trip description is required!</span>}
          </label>
          <label className="form-label">
            Start Date:
           {/*In 'validate' is the custom validation. 'futureDate' is a custom validation function which takes the input value.*/}
            <input 
              type="date"  
              {
                ... register(
                  "startDate", 
                  {
                    required: true, 
                    validate: {
                      startDateBeforeEndDate : value => {
                        const endDate = document.querySelector('input[name="endDate"]').value;
                        return isStartDateBeforeEndDate(value, endDate) || "Start date must be before the end date or the same!"
                      }
                    }
                  }
                )
              } 
              className="form-input"
            />
            {errors.startDate && <span className="error-message">{errors.startDate.message}</span>}
          </label>
          <label className="form-label">
            End Date:
            <input 
                type="date" 
                {... register("endDate", 
                {required: true, 
                  validate: {
              startDateBeforeEndDate : value => {
                const startDate = document.querySelector('input[name="startDate"]').value;
                return isStartDateBeforeEndDate(startDate, value) || "End date must be after the start date or the same!"
              }
            }
            })} className="form-input"/>
            {errors.endDate && <span className="error-message">{errors.endDate.message}</span>}
          </label>
          
          <label className="form-label">
            Price (per person):
            <input type="number" defaultValue={trip ? trip.price : ""}  {... register("price", {required: true, min: 1})} className="form-input"/>
            {errors.price && <span className="error-message">Price is required!</span>}
          </label>

          <label className="form-label">
            Number of avaliable spaces:
            <input type="number" defaultValue={trip ? trip.price : ""}  {... register("numberOfAvaliableSpaces", {required: true, min: 0})} className="form-input"/>
            {errors.numberOfAvaliableSpaces && <span className="error-message">Number of avaloabel spaces is required!</span>}
          </label>
          <button type="submit" className="form-button">Update Trip</button>
        </form>

        {excursionId && (
            <div>
                <h2>Upload a picture for your trip</h2>
                {fileName && <p>Current file: {fileName}</p>}
                <FileUploadComponent
                    excursionId={excursionId}
                    onFileUploaded={(fileName) => setSuccessMessage(`File ${fileName} uploaded successfully!`)}
                    isUpdate={false}
                />
            </div>
        )}
        </div>
        
      );

}
export default TripUpdateForm;