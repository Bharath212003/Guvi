import React from "react";
import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Product A", description: "Description of Product A" },
  { id: 2, name: "Product B", description: "Description of Product B" },
  { id: 3, name: "Product C", description: "Description of Product C" },
];

const ProductList = ({ cart, onAddToCart, onRemoveFromCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          inCart={cart.some((item) => item.id === product.id)}
          onAddToCart={() => onAddToCart(product)}
          onRemoveFromCart={() => onRemoveFromCart(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
