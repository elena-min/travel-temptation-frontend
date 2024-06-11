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
    const [trip, setTrip] = useState({ price: 0 });
    const [user, setUser] = useState(null);

    const location = useLocation();
    const queryString = location.search;
    const numTravelers = queryString ? parseInt(queryString.split('=')[1]) : null;

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const [bookingStatus, setBookingStatus] = useState(null);
    const [formErrors, setFormErrors] = useState({}); 
    const [errorMessage, setErrorMessage] = useState('');

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
                TokenManager.updateAxiosToken(TokenManager.getAccessToken());
            })
            .catch(error => {
                console.error("Error fetching user:", error);
                if (error.response && error.response.status === 404) {
                  setErrorMessage("User not found");
                } else {
                  setErrorMessage("An error occurred while fetching user data. Please try again later.");
                }
              });
    }, []);

    useEffect(() => {
        getExcursion(excursionId)
            .then(data => {
                console.log(data); 
                setTrip(data);
                console.log(data.price);
            })
            .catch((error) =>{
                console.error('Error fetching listings:', error);
                if (error.response && error.response.status === 404) {
                    setErrorMessage("Excursions not found for this travel agency.");
                } else {
                    setErrorMessage("An error occurred while fetching excursions. Please try again later.");
                }
            });
    }, [excursionId]);

    const currentYear = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => currentYear + index); // Next 20 years
const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
];


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});

        const errors = {};
        if (!cardNumber || cardNumber.length !== 16) {
            errors.cardNumber = "Card number must be 16 characters long";
        }
        if (!cvv || cvv.length !== 3) {
            errors.cvv = "CVV must be 3 characters long";
        }
        if (!cardHolderName) {
            errors.cardHolderName = "Card holder name is required";
        }
        if (!expirationMonth || !expirationYear) {
            errors.expirationDate = "Expiration date is required";
        }else {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
            const expMonth = parseInt(expirationMonth, 10);
            const expYear = parseInt(expirationYear, 10);
    
            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                errors.expirationDate = "Expiration date cannot be in the past";
            }
        }

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
    }

    const expirationDate = `${expirationYear}-${expirationMonth}`;

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
            setCardNumber('');
            setCvv('');
            setExpirationMonth('');
            setExpirationYear('');
            setCardHolderName('');
        } catch (error) {
            setBookingStatus({ success: false });
            console.log("Error saving payment details or booking:", error);
    
            if (error.response) {
                if (error.response.status === 400) {
                    setBookingStatus({ success: false, message: "Invalid payment details." });
                } else if (error.response.status === 403) {
                    setBookingStatus({ success: false, message: "Unauthorized access." });
                } else if (error.response.status === 404) {
                    setBookingStatus({ success: false, message: "Service not found." });
                } else if (error.response.status === 500) {
                    setBookingStatus({ success: false, message: "Internal server error." });
                } else {
                    setBookingStatus({ success: false, message: "An unexpected error occurred." });
                }
            } else {
                setBookingStatus({ success: false, message: "Network error. Please try again later." });
            }
        }
    }

    return (
        <div className="container mt-5 mb-5 p-4 border custom-container" style={{width: "60%"}}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                        {formErrors.cardNumber && <div className="text-danger">{formErrors.cardNumber}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CVV (the three-digit number at the back of your credit card):</label>
                        <input type="text" className="form-control" style={{width: "30%"}} value={cvv} onChange={(e) => setCvv(e.target.value)} />
                        {formErrors.cvv && <div className="text-danger">{formErrors.cvv}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Card Holder Name:</label>
                        <input type="text" className="form-control" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                        {formErrors.cardHolderName && <div className="text-danger">{formErrors.cardHolderName}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expiration Date:</label>
                        <div className="d-flex">
                            <select className="form-select me-2" value={expirationMonth} onChange={(e) => setExpirationMonth(e.target.value)}>
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>{month.name}</option>
                                ))}
                            </select>
                            <select className="form-select" value={expirationYear} onChange={(e) => setExpirationYear(e.target.value)}>
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        {formErrors.expirationDate && <div className="text-danger">{formErrors.expirationDate}</div>}
                    </div>

                    <button type="submit" className="form-button">Submit</button>
                </form>
            )}
        </div>
    );
}

export default BookingDetailsPage;
