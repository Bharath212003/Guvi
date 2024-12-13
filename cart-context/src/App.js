// src/App.js
import React from "react";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";
import "./styles.css";





const products = [
  // Paste the JSON data here
];

function App() {
  return (
    <CartProvider>
      <div className="App">
        <h1>Shopping Cart</h1>
        <ProductList products={products} />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
