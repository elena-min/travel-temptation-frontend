import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './layoutComponents/Navbar';
import TripListingPage from './pages/TripListingPage';
import { Link } from 'react-router-dom';
import TripInfoPage from './pages/TripInfoPage';
import TripUpdatePage from './pages/TripUpdatePage';
import Register from './pages/Register';
import Login from './pages/Login';
import BookingPage from './pages/BookingPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ProfilePage from './pages/ProfilePage';
import ProfilePageUpdate from './pages/ProfilePageUpdate';
import MyTripsPage from './pages/MyBookings.Page';
import MyBookingsPage from './pages/MyBookings.Page';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar>
        
      <div className="content-container">
      <Routes>
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/excursions" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Home />} />
            <Route path="/trending" element={<Home />} />
            <Route path="/trips/europe" element={<Home />} />
            <Route path="/list-trip" element={<TripListingPage />} />
            <Route path='/trip/:id' element={<TripInfoPage/>}/>
            <Route path='/excursions/:id/update' element={<TripUpdatePage/>}/>
            <Route path='/excursions/:id/booking' element={<BookingPage/>}/>
            <Route path='/excursions/:id/booking-details/' element={<BookingDetailsPage/>}/>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/update" element={<ProfilePageUpdate />} />
            <Route path="/mybookings" element={<MyBookingsPage />} />
        </Routes>
        </div>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
