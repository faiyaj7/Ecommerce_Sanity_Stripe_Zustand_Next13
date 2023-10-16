"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "@/utils/canvasConfetti";
import { useStore } from "@/context/state";

const Success = () => {
  const clearCartItems = useStore((state) => state.clearCartItems);
  const clearTotalPrice = useStore((state) => state.clearTotalPrice);
  const clearTotalQuantities = useStore((state) => state.clearTotalQuantities);
  useEffect(() => {
    localStorage.clear();
    clearCartItems();
    clearTotalPrice();
    clearTotalQuantities();
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
