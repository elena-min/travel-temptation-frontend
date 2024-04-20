import React, { useState, useEffect  } from 'react';
import { updateUser, getUser } from "../services/UserService";
import './style/TripListing.css'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";


function ProfileUpdateForm(){

    const userId = 3;
    const [user, setUser] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const {register, handleSubmit, formState : {errors}, setValue} = useForm();

    useEffect(() => {
        getUser(userId)
            .then(data => {
                console.log(data); 
                setUser(data);
                const formattedBirthDate = formatDateForInput(data.birthDate);
                setValue("firstName", data.firstName);
                setValue("lastName", data.lastName);
                setValue("birthDate", formattedBirthDate);
                setValue("gender", data.gender);

            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    }, [userId]);

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
    data.birthDate = formatDateForSubmit(data.birthDate);
    try{
        console.log(data);
        await updateUser(userId, data);
        setUpdateStatus({success: true});
        console.log('User saved successfully!');   

    }
    catch(error){
        setUpdateStatus({success: false});
        console.log('Error updating user', {error});   
    }
     
};


    return (
      <div style={{padding: 30}}>
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
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