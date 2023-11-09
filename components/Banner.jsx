import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";

const Banner = ({ banner }) => {
  return (
    <div className="hero-banner-container">
      <div className="w-full">
        <p className="beats-solo">{banner.smallText}</p>
        <h3>{banner.midText}</h3>
        <h1>{banner.largeText1}</h1>
        <img
          className="hero-banner-image"
          src={urlForImage(banner.image).url()}
          alt="banner"
        />
        <div>
          <Link href={"/product/id"}>
            <button type="button">{banner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{banner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
