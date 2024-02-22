import React from "react";

const ProductItem = ({ item }) => {
  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer 
       transition-all select-none min-h-[160px] "
    >
      <div className="product-img">
        <img
          className="h-20 object-cover w-full border-b"
          src={item.img}
          alt={item.title}
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}€</span>
      </div>
    </div>
  );
};

export default ProductItem;
