import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getUser } from '../services/UserService';
import { getExcursion } from "../services/ExcursionService";
import {savePaymentDetails} from "../services/PaymentDetailsService";
import {saveBooking} from "../services/BookingService";
import TokenManager from '../apis/TokenManager';
import './style/Booking.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookingDetailsPage() {
    const { id } = useParams();
    const excursionId = parseInt(id, 10);
    const [trip, setTrip] = useState(null);
    const [user, setUser] = useState(null);

    const location = useLocation();
    const queryString = location.search;
    const numTravelers = queryString ? parseInt(queryString.split('=')[1]) : null;

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const [bookingStatus, setBookingStatus] = useState(null);

    useEffect(() => {
        const userId = TokenManager.getUserIdFromToken();
        if (!userId) {
            console.error("User ID not found in token");
            return;
        }
        console.log(userId);
        getUser(userId)
            .then(data => {
                console.log(data); 
                setUser(data);
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    }, []);

    useEffect(() => {
        getExcursion(excursionId)
            .then(data => {
                console.log(data); 
                setTrip(data);
                console.log(data.price);
            })
            .catch(error => {
                console.error("Error fetching excursion:", error);
            });
    }, [excursionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Payment details: ', {cardNumber, cvv, cardHolderName, expirationDate});
        const paymentDetails = {
            user,
            cardNumber,
            cvv,
            expirationDate,
            cardHolderName
        };
        try {
            const savedPaymentDetails = await savePaymentDetails(paymentDetails);
            console.log('Payment details saved: ', savedPaymentDetails);

            const booking = {
                user: user,
                excursion: trip,
                bookingTime: new Date(),
                status: 'PENDING',
                bankingDetails: savedPaymentDetails,
                numberOfTravelers: parseInt(numTravelers)
            };
            console.log({ user, trip, savedPaymentDetails, booking });
            const savedBooking = await saveBooking(booking);
            console.log('Booking saved:', savedBooking);

            setBookingStatus({ success: true });

        } catch (error) {
            setBookingStatus({ success: false });
            console.log(error);
        }
    }

    return (
        <div className="container mt-5 mb-5 p-4 border custom-container" style={{width: "60%"}}>
            {bookingStatus && (
                <div className={`alert ${bookingStatus.success ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {bookingStatus.success ? "Excursion booked successfully!" : "Error updating information. Please try again."}
                </div>
            )}

            <h2 className="text-center" style={{padding: "10px"}}>Booking Details</h2>
            <h4>Enter Payment Details:</h4>
            <p><strong>Number of travelers: </strong> {numTravelers}</p>
            <p><strong>Price:</strong> {trip.price} &euro;/p.p.</p>
            <p><strong>Total price:</strong> {trip.price * numTravelers} &euro;</p>

            
            {user && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Card Number:</label>
                        <input type="text" className="form-control" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CVV (the three-digit number at the back of your credit card):</label>
                        <input type="text" className="form-control" style={{width: "30%"}} value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Card Holder Name:</label>
                        <input type="text" className="form-control" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expiration date:</label>
                        <input type="date" className="form-control" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </div>
                    <button type="submit" className="form-button">Submit</button>
                </form>
            )}
        </div>
    );
}

export default BookingDetailsPage;
