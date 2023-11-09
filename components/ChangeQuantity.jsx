"use client";
import { useStore } from "@/context/state";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
const ChangeQuantity = () => {
  const qty = useStore((state) => state.qty);
  const [quantity, setQuantity] = useState();
  const incQty = useStore((state) => state.incQty);
  const decQty = useStore((state) => state.decQty);

  useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  return (
    <p className="quantity-desc">
      <span className="minus" onClick={decQty}>
        <AiOutlineMinus />
      </span>
      <span className="num">{quantity}</span>
      <span className="plus" onClick={incQty}>
        <AiOutlinePlus />
      </span>
    </p>
  );
};

export default ChangeQuantity;
