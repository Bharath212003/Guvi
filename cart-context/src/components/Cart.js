import React, { useState } from "react";
import "../styles.css"; // Adjust the path if styles.css is in a different folder

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 249.0;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleRemove = () => setQuantity(0);

  const subtotal = quantity * pricePerItem;

  return (
    <div className="container">
      {/* Book Item */}
      <div className="book-item">
        <img
          src="https://via.placeholder.com/120x150"
          alt="Wolf So Grim and Mangy"
          className="book-image"
        />
        <div className="book-details">
          <h3 className="book-title">Wolf So Grim and Mangy</h3>
          <div className="details-dropdown">Details & Care ▼</div>
          <p>We provide great-looking book cover artwork...</p>
          <div className="quantity-container">
            <button onClick={handleDecrease}>-</button>
            <input
              type="text"
              value={quantity}
              readOnly
            />
            <button onClick={handleIncrease}>+</button>
            <button className="remove-btn" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
        <div>${subtotal.toFixed(2)}</div>
      </div>

      {/* Summary Section */}
      <div className="summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>FREE</span>
        </div>
        <div className="summary-row">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer Text */}
      <div className="footer-text">Get Daily Cash With Nespola Card</div>
    </div>
  );
};

export default Cart;
