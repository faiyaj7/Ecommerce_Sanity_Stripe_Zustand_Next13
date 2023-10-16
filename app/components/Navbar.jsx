"use client";
import { useStore } from "@/context/state";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
const Navbar = () => {
  const toggleShowCart = useStore((state) => state.toggleShowCart);
  const showCart = useStore((state) => state.showCart);
  const a = useStore((state) => state.totalQuantities);
  const [totalQuantities, setTotalQuantities] = useState(0);
  console.log(showCart);

  useEffect(() => {
    setTotalQuantities(a);
  }, [a]);
  return (
    <div className="navbar-container" suppressHydrationWarning={true}>
      <p className="logo">
        <Link href={"/"}>Kinbo</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => toggleShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
