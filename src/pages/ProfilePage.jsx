import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from "../services/UserService";
import maldives from '../images/maldives.jpg';
import './style/ProfilePage.css';
import TokenManager from '../apis/TokenManager';

function ProfilePage() {

  const { id } = useParams();
  const userIdFromToken = TokenManager.getUserIdFromToken(); // Get user ID from token
  const [user, setUser] = useState(null);

  useEffect(() => {
      // Use user ID from token if available, otherwise use the ID from URL params
      const userId = userIdFromToken || parseInt(id, 10);

      getUser(userId)
          .then(data => {
              setUser(data);
          });
  }, [id, userIdFromToken]);


    const handleUpdate = () =>{
        window.location.href = `/profile/update`;
      }

  return (
    <div className="user-info-container">
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
                      <button className='delete-button' >Delete Profile</button>
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
