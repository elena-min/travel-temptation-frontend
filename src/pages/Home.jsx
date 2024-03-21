import React from "react";
import TripContainer from "../components/TripContainer";
import './style/Home.css';

function Home() {
    const trips = [
        {
          id: 1,
          title: "Trip 1",
          description: "Description of Trip 1",
          image: "trip1.jpg"
        },
        {
          id: 2,
          title: "Trip 2",
          description: "Description of Trip 2",
          image: "trip2.jpg"
        },
        {
            id: 3,
            title: "Trip 3",
            description: "Description of Trip 3",
            image: "trip2.jpg"
          },
          {
            id: 4,
            title: "Trip 4",
            description: "Description of Trip 4",
            image: "trip2.jpg"
          },
      ];

      return (
        <div className="home-container">
          <h1>Featured Trips</h1>
          <div className="trips">
            {trips.map(trip => (
              <TripContainer key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      );
}

export default Home;