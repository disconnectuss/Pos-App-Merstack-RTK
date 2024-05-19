import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

function TableCard({ item }) {
  // Define background color based on item.status
  let bgColor;
  switch (item.status) {
    case "Available":
      bgColor = "bg-green-400";
      break;
    case "Dine in":
      bgColor = "bg-red-400";
      break;
    case "Reserved":
      bgColor = "bg-blue-400";
      break;
    default:
      bgColor = "bg-gray-400";
  }

  return (
    <div
      className={`table-card border text-white hover:shadow-lg cursor-pointer transition-all select-none ${bgColor}`}
    >
      <span className="m-4 text-lg">
        {item.title}/ {item.number}
      </span>
      <div className="product-stat flex flex-col p-3">
        <span className="font-bold">{item.status}</span>
        <span className="people">People: {item.people} </span>
      </div>
      <div className="flex justify-end p-2 w-full hover:shadow-lg cursor-pointer transition-all select-none"></div>
    </div>
  );
}

export default TableCard;
