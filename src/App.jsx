import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import TokenManager from './apis/TokenManager';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './layoutComponents/Navbar';
import TripListingPage from './pages/TripListingPage';
import TripInfoPage from './pages/TripInfoPage';
import TripUpdatePage from './pages/TripUpdatePage';
import Register from './pages/Register';
import Login from './pages/Login';
import BookingPage from './pages/BookingPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ProfilePage from './pages/ProfilePage';
import ProfilePageUpdate from './pages/ProfilePageUpdate';
import MyBookingsPage from './pages/MyBookings.Page';
import MyListingsPage from './pages/MyListingsPage';
import ProtectedRoute from './apis/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import TravelTipsPage from './pages/TravelTipsPage';
import ContactPage from './pages/ContactPage';
import ReviewPage from './pages/ReviewPage';
import TravelAgencyInfoPage from './pages/TravelAgencyInfoPage';
import MyReviewsPage from './pages/MyReviewsPage';
import TrendingPage from './pages/TrendingPage';
import BookingInfoPage from './pages/BookingInfoPage';
import ChatPage from './pages/ChatPage';
import TravelAgencyChatHistoryPage from './pages/TravelAgencyChatHistoryPage';

function App() {

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  
    // Cleanup function
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
  
  // Ensure that the interceptor is updated with the latest access token
  useEffect(() => {
    const token = TokenManager.getAccessToken();
    TokenManager.updateAxiosToken(token);
  }, []);
  
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar>
        
      <div className="content-container">
      <Routes>
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/excursions" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/traveltips" element={<TravelTipsPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path='/trip/:id' element={<TripInfoPage/>}/>
            <Route path='/travel-agency/:id' element={<TravelAgencyInfoPage/>}/>

            <Route path="/list-trip" element={<ProtectedRoute element={TripListingPage }  requiredRoles={['TRAVELAGENCY']} />} />
            <Route path="/excursions/:id/update" element={<ProtectedRoute element={TripUpdatePage } requiredRoles={['TRAVELAGENCY']} />} />
            <Route path="/excursions/:id/booking" element={<ProtectedRoute element={BookingPage } requiredRoles={['USER']} />} />
            <Route path="/excursions/:id/booking-details" element={<ProtectedRoute element={BookingDetailsPage} requiredRoles={['USER']} />} />
            <Route path="/profile" element={<ProtectedRoute element={ProfilePage } requiredRoles={['USER', 'TRAVELAGENCY']}/>} />
            <Route path="/profile/update" element={<ProtectedRoute element={ProfilePageUpdate } requiredRoles={['USER', 'TRAVELAGENCY']}/>} />
            <Route path="/mybookings" element={<ProtectedRoute element={MyBookingsPage } requiredRoles={['USER']} />} />
            <Route path="/mylistings" element={<ProtectedRoute element={MyListingsPage}  requiredRoles={['TRAVELAGENCY']} />}  />
            <Route path="/myreviews" element={<ProtectedRoute element={MyReviewsPage } requiredRoles={['USER']} />} />
            <Route path="/write-review/:id" element={<ProtectedRoute element={ReviewPage }  requiredRoles={['USER']} />} />
            <Route path='/booking/:id' element={<ProtectedRoute element={BookingInfoPage }  requiredRoles={['TRAVELAGENCY', 'USER']} />} />
            <Route path='/chat/:id' element={<ProtectedRoute element={ChatPage }  requiredRoles={['USER', 'TRAVELAGENCY']} />} />
            <Route path='/chat-history' element={<ProtectedRoute element={TravelAgencyChatHistoryPage }  requiredRoles={['TRAVELAGENCY']} />} />


        </Routes>
        </div>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
