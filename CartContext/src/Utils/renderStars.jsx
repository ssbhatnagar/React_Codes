import React from "react";

/**
 * Generates star elements based on a numeric rating (e.g. 3.5 out of 5)
 * @param {number} rating - The rating value (0–5)
 * @returns {JSX.Element[]} Array of star <span> elements
 */
export function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="star full">★</span>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">★</span>);
    }
  }

  return stars;
}
