"use client";
import { useStore } from "@/context/state";
import React from "react";

const AddToCart = ({ product }) => {
  const addCartItems = useStore((state) => state.addCartItems);
  const toggleShowCart = useStore((state) => state.toggleShowCart);
  const qty = useStore((state) => state.qty);
  const handleBuyNow = () => {
    if (qty > 0) {
      addCartItems(product, qty);
      toggleShowCart(true);
    }
  };
  return (
    <>
      <button
        type="button"
        className="add-to-cart"
        onClick={() => {
          qty > 0 && addCartItems(product, qty);
        }}
      >
        Add to Cart
      </button>
      <button type="button" className="buy-now" onClick={handleBuyNow}>
        Buy Now
      </button>
    </>
  );
};

export default AddToCart;
