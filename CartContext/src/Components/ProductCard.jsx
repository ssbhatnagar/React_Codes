import React from "react";
import { StyledWrapper } from "../Styles/ProductCardStyles";
import { renderStars } from "../Utils/renderStars.jsx";

function ProductCard({ product }) {
  
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__shine" />
        <div className="card__glow" />
        <div className="card__content">
          <div className="card__badge">NEW</div>

          {/* Product Image */}
          <div className="card__image">
            <img src={product.thumbnail} alt={product.title} className="product-img" />
          </div>

          {/* Product Text */}
          <div className="card__text">
            <p className="card__title">{product.title}</p>
            <p className="card__description">{product.description?.slice(0, 40)}...</p>

            {/* Rating with stars */}
            <div className="card__rating">
              {renderStars(product.rating)}
              <span className="rating-number">({product.rating})</span>
            </div>

            {/* Other details */}
            <div className="card__info">
              <span>{product.brand}</span>
              <span>{product.category}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="card__footer">
            <div className="card__price">₹{product.price}</div>
            <div className="card__button">
              <svg height={16} width={16} viewBox="0 0 24 24">
                <path
                  strokeWidth={2}
                  stroke="currentColor"
                  d="M4 12H20M12 4V20"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default ProductCard;
