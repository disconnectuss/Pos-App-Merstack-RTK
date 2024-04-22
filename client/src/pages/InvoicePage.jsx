import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Button, Table, Card } from "antd";
import PrintInvoice from "../components/invoices/PrintInvoice";

const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [invoices, setInvoices] = useState();

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/invoices/get-all`);
        const data = await res.json();
        setInvoices(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInvoices();
  }, []);


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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Tel",
      dataIndex: "customerTel",
      key: "customerTel",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text)=> {
        return <span>{text.substring(0, 10)}</span>
      }
    },
  ];
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Invoices</h1>
      <Table
        dataSource={invoices}
        columns={columns}
        bordered
        pagination={false}
      />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-70 pr-2">
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="cartAdd mt-4 w-full text-white"
            size="large"
          >
            Print
          </Button>
        </Card>
      </div>
      <PrintInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default InvoicePage;
