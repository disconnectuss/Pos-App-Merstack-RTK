import React, { useState } from "react";
import Header from "../components/Header";
import { Button } from "antd";

const TablePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ishowModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header />
      <h1 className="text-4xl p-5 font-bold">Table View</h1>
      <div className="flex justify-end mr-5 gap-5">
        <Button>1st Floor</Button>
        <Button>2nd Floor</Button>
        <Button>3rd Floor</Button>
      </div>
      <div className="tables-wrapper grid grid-cols-card gap-4 p-5">
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
        <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
            <span className="text-center">A1</span>
          </div>
          <div className="product-stat flex flex-col p-3">
            <span className="font-bold">Available</span>
            <span className="people">People: 4 </span>
          </div>
        </div>
      </div>
      <div className="status flex justify-evenly">
        <span className="text-green-500"> Available : {""} </span>
        <span className="text-red-500">Dine In : {""} </span>
        <span className="text-blue-500"> Reserved : {""} </span>
      </div>
    </div>
  );
};

export default TablePage;
