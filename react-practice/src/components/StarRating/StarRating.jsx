import React, { useState } from 'react';

function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ padding: "20px", fontSize: "30px" }}>
      <h3>Rating: {rating} / 5</h3>
      
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{ 
            cursor: "pointer", 
            color: star <= rating ? "#ffc107" : "#e4e5e9" // Conditional Coloring
          }}
        >
          ★
        </span>
      ))}
      
      <button onClick={() => setRating(0)} style={{ fontSize: "14px", marginLeft: "10px" }}>Reset</button>
    </div>
  );
}
export default StarRating;