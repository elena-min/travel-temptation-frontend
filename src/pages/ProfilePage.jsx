import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from "../services/UserService";
import maldives from '../images/maldives.jpg';
import './style/ProfilePage.css';

function ProfilePage() {

    const { id } = useParams();
    const userId = parseInt(3, 10); // Convert id to integer
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(userId)
            .then(data => {
                console.log(data); 
                setUser(data);
            })
            ;
    }, [userId]);


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
