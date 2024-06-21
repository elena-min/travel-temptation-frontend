import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser, deleteUser } from "../services/UserService";
import maldives from '../images/maldives.jpg';
import './style/ProfilePage.css';
import TokenManager from '../apis/TokenManager';

function ProfilePage() {

  const { id } = useParams();
  const userIdFromToken = TokenManager.getUserIdFromToken(); // Get user ID from token
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    
      // Use user ID from token if available, otherwise use the ID from URL params
      const userId = userIdFromToken || parseInt(id, 10);

      getUser(userId)
          .then(data => {
              setUser(data);
              TokenManager.updateAxiosToken(TokenManager.getAccessToken());
              console.log(TokenManager.getAccessToken());
          })
          .catch(error => {
            console.error("Error fetching user:", error);
            if (error.response && error.response.status === 404) {
              setErrorMessage("User not found");
            } else {
              setErrorMessage("An error occurred while fetching user data. Please try again later.");
            }
          });
  }, [id, userIdFromToken]);


    const handleUpdate = () =>{
        window.location.href = `/profile/update`;
      }

      const handleDelete = () =>{
        if(TokenManager.isTokenExpired()){
          TokenManager.clear();
          return <Navigate to="/login" />;
      }
        const confirmDelete = window.confirm("Are you sure you want to delete your profile?")
        if(confirmDelete){
          deleteUser(userIdFromToken)
          .then( () =>{
            TokenManager.clear();
              window.location.href = "/";
          })
          .catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                  setErrorMessage("User profile not found." );
                } else if (error.response.status === 400) {
                  setErrorMessage(error.response.data.error);
                } else {
                  setErrorMessage("An unexpected error occurred. Please try again later.");
                }
            } else if (error.request) {
                console.error("Request made but no response received:", error.request);
                setErrorMessage("No response received from the server. Please try again later.");
            } else {
                console.error("Error setting up request:", error.message);
                setErrorMessage("An unexpected error occurred. Please try again later.");
            }
        });
        }
        
      }
  return (
    <div className="user-info-container">
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
                {user && (
                <>
                <h1>Hello {user.firstName} {user.lastName}!</h1>
                <div className="user-info-wrapper">
                   <div className='user-image'>
                    <img src={maldives} alt="Maldvives" />
                   </div>
                   <div className='user-info'>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Birth date:</strong> {user.birthDate}</p>

                    <div className='button-container'>
                      <button className='delete-button'  onClick={handleDelete} >Delete Profile</button>
                      <button className='update-button' onClick={handleUpdate}>Update Profile</button>
                    </div>
                    
                   </div>
                </div>
                </>
                
            )}

            </div>
          );
}

export default ProfilePage;
