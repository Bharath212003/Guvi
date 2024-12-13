import React from "react";

const ProductCard = ({ product, inCart, onAddToCart, onRemoveFromCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={inCart ? onRemoveFromCart : onAddToCart}>
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
