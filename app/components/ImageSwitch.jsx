"use client";
import { urlForImage } from "@/sanity/lib/image";
import React, { useState } from "react";

const ImageSwitch = ({ image }) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      {" "}
      <div className="image-container">
        <img
          src={urlForImage(image && image[index]).url()}
          className="product-detail-image"
        />
      </div>
      <div className="small-images-container">
        {image?.map((item, i) => (
          <img
            key={i}
            src={urlForImage(item).url()}
            className={
              i === index ? "small-image selected-image" : "small-image"
            }
            onMouseEnter={() => setIndex(i)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageSwitch;
