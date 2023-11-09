"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { urlForImage } from "@/sanity/lib/image";
import { useStore } from "@/context/state";
import getStripe from "@/sanity/lib/getStripe";
import HydrationAvoid from "./HydrationAvoid";

const Cart = () => {
  const cartRef = useRef();
  const toggleShowCart = useStore((state) => state.toggleShowCart);
  const a = useStore((state) => state.totalQuantities);
  const b = useStore((state) => state.totalPrice);
  const c = useStore((state) => state.cartItems);

  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const onRemove = useStore((state) => state.onRemove);
  const toggleCartItemQuantity = useStore(
    (state) => state.toggleCartItemQuantity
  );

  const handleCloseCart = (e) => {
    if (!cartRef.current.contains(e.target)) {
      // Close the cart only if the click is outside the cart area
      toggleShowCart(false);
    }
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    toggleShowCart(false);
    stripe.redirectToCheckout({ sessionId: data.session.id });
  };

  useEffect(() => {
    setTotalQuantities(a);
    setTotalPrice(b);
    setCartItems(c);
  }, [a, b, c]);
  return (
    <HydrationAvoid>
      <div className="cart-wrapper" onClick={handleCloseCart}>
        <div className="cart-container" ref={cartRef}>
          <button
            type="button"
            className="cart-heading"
            onClick={() => toggleShowCart(false)}
          >
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({totalQuantities} items)</span>
          </button>

          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href="/">
                <button
                  type="button"
                  onClick={() => toggleShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className="product" key={item._id}>
                  <img
                    src={urlForImage(item?.image[0]).url()}
                    className="cart-product-image"
                    alt="cart"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "dec")
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num" onClick="">
                            {item.quantity}
                          </span>
                          <span
                            className="plus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "inc")
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item._id)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </HydrationAvoid>
  );
};

export default Cart;
