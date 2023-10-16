import { client } from "@/sanity/lib/client";
import Image from "next/image";
import "./globals.css";
import Banner from "./components/Banner";
import FooterBanner from "./components/FooterBanner";
import Product from "./components/Product";

async function fetchInfo() {
  const products = await client.fetch(`*[_type =='product']`);
  const banner = await client.fetch(`*[_type =='banner']`);
  // console.log("From the Home page fetchInfo", banner);
  return { products, banner };
}
export default async function Home() {
  const { products, banner } = await fetchInfo();

  console.log(products);
  return (
    <>
      <Banner banner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((item) => (
          <Product product={item} key={item._id} />
        ))}
      </div>
      <FooterBanner footerBanner={banner[0]} />
    </>
  );
}
