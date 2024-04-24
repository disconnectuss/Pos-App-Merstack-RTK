import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Button, Table} from "antd";
import PrintInvoice from "../components/invoices/PrintInvoice";

const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [invoices, setInvoices] = useState();

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/invoices/get-invoices`);
        const data = await res.json();
        setInvoices(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInvoices();
  }, []);
  console.log(invoices);

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
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>$ {text}</span>
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => setIsModalOpen(true)}
          >
            Print
          </Button>
        );
      },
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
      <PrintInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default InvoicePage;
