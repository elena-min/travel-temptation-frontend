import React from 'react';
import './style/ProfilePage.css';
import ProfileUpdateForm from '../components/ProfileUpdateForm';

function ProfilePageUpdate() {

  return (
    <div className="user-update-form">
        <h1>Update your personal information!</h1>
        <ProfileUpdateForm/>
        </div>
  )
            
}

export default ProfilePageUpdate;
