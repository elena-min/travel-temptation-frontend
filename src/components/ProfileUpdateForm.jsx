import React, { useState, useEffect  } from 'react';
import { updateUser, getUser } from "../services/UserService";
import './style/TripListing.css'
import { useForm } from "react-hook-form";
import TokenManager from '../apis/TokenManager';


function ProfileUpdateForm(){

    const [user, setUser] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [fetchError, setFetchError] = useState(null); 
    TokenManager.updateAxiosToken(TokenManager.getAccessToken());

    useEffect(() => {
        const userIdFromToken = TokenManager.getUserIdFromToken(); 
        if (userIdFromToken) {
            getUser(userIdFromToken)
                .then(data => {
                    setUser(data);
                    console.log(data);
                    console.log(TokenManager.getAccessToken());

                    const formattedBirthDate = formatDateForInput(data.birthDate);
                    setValue("firstName", data.firstName);
                    setValue("lastName", data.lastName);
                    setValue("birthDate", formattedBirthDate);
                    setValue("gender", data.gender);
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                    if (error.response && error.response.status === 404) {
                      setErrorMessage("User not found");
                    } else {
                      setErrorMessage("An error occurred while fetching user data. Please try again later.");
                    }
                  });
        }
    }, [setValue]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; // Return empty string if date string is not provided
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is single digit
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is single digit
        return `${year}-${month}-${day}`;
      };

      const formatDateForSubmit = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const validateBirthDate = (value) => {
        const birthDate = new Date(value);
        const currentDate = new Date();
        if (birthDate > currentDate) {
            return "Birth date must be in the past!";
        }
        return true;
    };
  
  
    const onSubmit = async (data) => {
        if(TokenManager.isTokenExpired()){
            TokenManager.clear();
            return <Navigate to="/login" />;
        }
        data.birthDate = formatDateForSubmit(data.birthDate);
        try {
            await updateUser(user.id, data);
            setUpdateStatus({ success: true });
            console.log('User updated successfully!');
        } catch (error) {
            if (error.response) {
                console.error("Update user request failed with status code:", error.response.status);
                if (error.response.status === 400) {
                    setUpdateStatus({ success: false, error: error.response.data.error });
                } else if (error.response.status === 403) {
                    // Handle unauthorized access errors
                    setUpdateStatus({ success: false, error: "You are not authorized to update this user." });
                } else {
                    setUpdateStatus({ success: false, error: "An unexpected error occurred. Please try again later." });
                }
            } else if (error.request) {
                console.error("No response received from server:", error.request);
                setUpdateStatus({ success: false, error: "No response received from the server. Please try again later." });
            } else {
                console.error("Error setting up request:", error.message);
                setUpdateStatus({ success: false, error: "An unexpected error occurred. Please try again later." });
            }
        }
    };
    


    return (
      <div style={{padding: 30}}>
        {fetchError && <div className="error-message">{fetchError}</div>} 
        {updateStatus && (
            <div className={updateStatus.success ? "success-message" : "error-message"}>
                {updateStatus.success ? "Profile information updated successfully!" : "Error updating information. Please try again."}
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              {/*When the form is submitted(handleSubmit takes care of that) it calls the function 'onSubmit'*/}
              <label className="form-label">
                First Name:
                <input type="text" {...register("firstName", { required: true })} className="form-input" />
                {errors.firstName && <span className="error-message">First name is required!</span>}
            </label>
            <label className="form-label">
                Last Name:
                <input type="text" {...register("lastName", { required: true })} className="form-input" />
                {errors.lastName && <span className="error-message">Last name is required!</span>}
            </label>
            <label className="form-label">
                Gender:
                <select {...register("gender", { required: true })} className="form-input">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>
                {errors.gender && <span className="error-message">Gender is required!</span>}
            </label>
            <label className="form-label">
                Birth Date:
                <input type="date" {...register("birthDate", { required: true, validate: validateBirthDate })} className="form-input" />
                {errors.birthDate && <span className="error-message">errors.birthDate.message</span>}
            </label>
          <button type="submit" className="form-button">Update</button>
        </form>
      </div>
       
      );

}

export default ProfileUpdateForm;