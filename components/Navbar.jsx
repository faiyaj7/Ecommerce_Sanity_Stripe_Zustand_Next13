"use client";
import { useStore } from "@/context/state";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import Image from "next/image";
const Navbar = () => {
  const toggleShowCart = useStore((state) => state.toggleShowCart);
  const showCart = useStore((state) => state.showCart);
  const a = useStore((state) => state.totalQuantities);
  const [totalQuantities, setTotalQuantities] = useState(0);

  useEffect(() => {
    setTotalQuantities(a);
  }, [a]);
  return (
    <div className="navbar-container" suppressHydrationWarning={true}>
      <div className="w-[70px] bg-red-500 rounded-full ">
        <p className="logo">
          <Link href={"/"}>
            <Image src="/logo.png" width={100} height={100} alt="Logo" />
          </Link>
        </p>
      </div>

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
