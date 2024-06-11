import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ value, onChange }) => {
  const [rating, setRating] = useState(value || 0); // Initialize rating with the provided value or 0

  const handleStarClick = (value) => {
    setRating(value);
    onChange(value); // Pass the selected rating to the parent component
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            className="star"
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
            onClick={() => handleStarClick(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;

