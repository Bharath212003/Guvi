import React from "react";

const CartIcon = ({ count }) => {
  return (
    <div className="cart-icon">
      🛒 Cart: {count}
    </div>
  );
};

export default CartIcon;
