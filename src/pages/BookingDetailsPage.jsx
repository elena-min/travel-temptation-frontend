import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getExcursion } from "../services/ExcursionService";
import {savePaymentDetails} from "../services/PaymentDetailsService";
import {saveBooking} from "../services/BookingService";

function BookingDetailsPage() {
    const { id } = useParams();
    const excursionId = parseInt(id, 10);
    const { numTravelers } = useParams();
    const [trip, setTrip] = useState(null);

    const[cardNumber, setCardNumber] = useState('');
    const[cvv, setCvv] = useState('');
    const[expirationDate, setExpirationDate] = useState('');
    const[cardHolderName, setCardHolderName] = useState('');

    const params = useParams();
console.log(params);

    useEffect(() => {
        getExcursion(excursionId)
            .then(data => {
                console.log(data); 
                setTrip(data);
            })
            .catch(error => {
                console.error("Error fetching excursion:", error);
            });
    }, [excursionId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment details: ', {cardNumber, cvv, cardHolderName, expirationDate})
        const paymentDetails ={
            user,
            cardNumber, 
            cvv, 
            expirationDate,
            cardHolderName
        }
        try{
            const savedPaymentDetails = savePaymentDetails(paymentDetails);
            console.log('Payment details: ', {savedPaymentDetails});

            const booking = {
                user: null,
                excursion: trip,
                bookingTime: new Date(),
                status : 'PENDING',
                bankingDetails: savedPaymentDetails,
                numberOfTravelers: parseInt(numTravelers) 
            }

            const savedBooking = saveBooking(booking);
            console.log('Booking saved:', {savedBooking});

        }catch(error){
            console.log(error)
        }
    }
    return(
        <div>
            <h2>Booking Details</h2>
            <p>Number of travelers: {numTravelers}</p>
            <p>Enter Payment Details:</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Number:
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </label>
                <label>
                    CVV:
                    <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </label>
                <label>
                    Card Holder Name:
                    <input type="text" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                </label>
                <label>
                    Expiration date:
                    <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                </label>

            </form>
        </div>
    )
}

export default BookingDetailsPage;
