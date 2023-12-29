import React, { useState } from "react";
import Header from "../components/Header";
import { Table, Card, Button } from "antd";

const CustomerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ishowModal = () => {
    setIsModalOpen(true);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-70 pr-2">
        </Card>
      </div>
    </>
  );
};

export default CustomerPage;

