import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TokenManager from '../apis/TokenManager';
import { getBooking, updateBooking } from '../services/BookingService';
import './style/Booking.css';

function BookingInfoPage() {

    const { id } = useParams();
    const bookingId = parseInt(id, 10); // Convert id to integer
    const [trip, setTrip] = useState(null);
    const [booking, setBooking] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const userRole = TokenManager.getUserRoles();

    TokenManager.updateAxiosToken(TokenManager.getAccessToken());

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const userIdFromToken = TokenManager.getUserIdFromToken();
                if (!userIdFromToken) {
                    console.error("User ID not found in token");
                    setErrorMessage("User ID not found in token. Please login again.");
                    TokenManager.clear();
                    window.location.href = '/login';
                    return;
                }
    
                const bookingData = await getBooking(bookingId);
    
                setBooking(bookingData);
                setLoading(false);
                setErrorMessage(''); // Clear any previous error message
            } catch (error) {
                console.error("Error fetching booking:", error);
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrorMessage("Invalid request data.");
                    } else if (error.response.status === 403) {
                        setErrorMessage("Unauthorized access.");
                    } else if (error.response.status === 404) {
                        setErrorMessage("Booking not found.");
                    } else if (error.response.status === 500) {
                        setErrorMessage("Internal server error.");
                    } else {
                        setErrorMessage("An unexpected error occurred.");
                    }
                } else {
                    setErrorMessage("An error occurred while fetching booking. Please try again later.");
                }
            }
        };
    
        fetchBooking();
    }, [bookingId]);
    
    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleStatusUpdate = async () => {
        if(TokenManager.isTokenExpired()){
            TokenManager.clear();
            return <Navigate to="/login" />;
        }

        const updateBookingRequest = {
            id: booking.id,
            user: booking.user,
            excursion: booking.excursion,
            bankingDetails: booking.bankingDetails,
            bookingTime: booking.bookingTime,
            status: newStatus,
            numberOfTravelers: booking.numberOfTravelers
        };
    
        try {
            await updateBooking(booking.id, updateBookingRequest);
            setBooking(prev => ({ ...prev, status: newStatus }));
            setStatusUpdated(true);
            setTimeout(() => setStatusUpdated(false), 3000);
        } catch (error) {
            console.error("Error updating booking status:", error);
            if (error.response) {
                if (error.response.status === 400) {
                    setErrorMessage("Invalid request data.");
                } else if (error.response.status === 403) {
                    setErrorMessage("Unauthorized access.");
                } else if (error.response.status === 404) {
                    setErrorMessage("Booking not found.");
                } else if (error.response.status === 500) {
                    setErrorMessage("Internal server error.");
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            } else {
                setErrorMessage("An error occurred while updating booking. Please try again later.");
            }
        }
    };
    



    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
        const year = date.getFullYear();
      
        // Ensure that single-digit days and months are padded with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
      };

      if (loading) {
        return <p>Loading...</p>;
    }

    return (
    <div className="trip-info-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {booking && (
        <>
        <h1>Booking information</h1>
        <div className="booking-info-wrapper">
            <div className='trip-info'>
            <h4>Excursion Details:</h4>
                <p><strong>Trip name:</strong> {booking.excursion.name}</p>
                <p><strong>Destinations:</strong> {booking.excursion.destinations.join(', ')}</p>
                <p><strong>Number of travelers:</strong> {booking.numberOfTravelers}</p>

            </div>
            <div className='trip-info'>
            <h4>Booking Details:</h4>
                <p><strong>Booking Date:</strong> {formatDate(booking.bookingTime)}</p>
                <p><strong>User email:</strong> {booking.user.email}</p>
                <p><strong>User names:</strong> {booking.user.firstName} {booking.user.lastName}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                {userRole.includes("TRAVELAGENCY")  && (
                    <div>
                        <h4>Update Status:</h4>
                        <select value={newStatus} onChange={handleStatusChange} className="form-select">
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <button onClick={handleStatusUpdate} className="btn btn-primary mt-2">Update Status</button>
                        {statusUpdated && <p className="text-success mt-2">Status updated successfully!</p>}
                    </div>
                 )}

            </div>

            <div className='trip-info'>
                <h4>Payment Details:</h4>
                <p><strong>Card Number:</strong> {booking.bankingDetails.cardNumber}</p>
                <p><strong>Cvv:</strong> {booking.bankingDetails.cvv}</p>
                <p><strong>Cardholder:</strong> {booking.bankingDetails.user.firstName} {booking.bankingDetails.user.lastName}</p>
                <p><strong>Expiration Date:</strong> {booking.bankingDetails.expirationDate}</p>

            </div>
        </div>
        </>
    )}
    </div>
    );
}

export default BookingInfoPage;

