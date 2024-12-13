import React, { useState } from "react";
import ProductList from "./components/ProductList";
import CartIcon from "./components/CartIcon";

const App = () => {
  const [cart, setCart] = useState([]); // Holds product IDs in the cart

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  return (
    <div className="App">
      <CartIcon count={cart.length} />
      <ProductList
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;
