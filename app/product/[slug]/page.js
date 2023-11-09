import AddToCart from "@/components/AddToCart";
import ChangeQuantity from "@/components/ChangeQuantity";
import ImageSwitch from "@/components/ImageSwitch";
import Product from "@/components/Product";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import React from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const queryForProduct = async (slug) => {
  //   better to use like slug variable instead of inside of the string literal
  //   const data = await client.fetch(
  //     `*[_type=="product" && slug.current == $slug ][0]`,
  //     { slug }
  //   );

  const singleProduct = await client.fetch(
    `*[_type=="product" && slug.current == '${slug}' ][0]`
  );
  const products = await client.fetch(
    `*[_type=="product" && name!="${singleProduct.name}"]`
  );
  return { singleProduct, products };
};

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type=="product"]`);

  return products.map((item) => ({
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }, parent) {
  const product = await client.fetch(
    `*[_type=='product' && slug.current=='${params.slug}'][0]`
  );
  return {
    title: product.name,
    description: product.description,
  };
}
const SingleProduct = async ({ params }) => {
  const { singleProduct, products } = await queryForProduct(params.slug);
  const { image, name, details, price } = singleProduct;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <ImageSwitch image={image} />
        </div>

        <div className="product-detail-desc">
          <h1 className="font-bold text-4xl">{name}</h1>
          <div className="reviews">
            <div className="flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <ChangeQuantity />
          </div>
          <div className="buttons">
            <AddToCart product={singleProduct} />
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
