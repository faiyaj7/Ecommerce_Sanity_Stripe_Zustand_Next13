import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlForImage(image && image[0])
              .width(250)
              .height(250)
              .url()}
            alt={name}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;
