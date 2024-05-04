import React, { useState, useEffect } from "react";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";
import Header from "../components/header/Header";
import StatCard from "../components/statistics/StatCard.jsx";

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('posUser'))
  console.log(user)

  useEffect(() => {
    async function fetchData() {
      try {
        const invoiceRes = await fetch("http://localhost:3000/api/invoices/get-invoices");
        const invoiceData = await invoiceRes.json();
        setData(invoiceData);

        const productRes = await fetch("http://localhost:3000/api/products/get-all");
        const productData = await productRes.json();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `$ ${amount.toFixed(2)}`;
  };

  const configArea = {
    data,
    padding: "auto",
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  const configPie = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Total\nValue",
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="px-6 pb-20 md:p-10">
        <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
        <h2 className="text-lg pl-4">
          Welcome <span className="text-red-800 font-bold text-2xl">{user.email}</span>
        </h2>
      </div>
      <div className="stat-cards m-8 mb-20 grid xl:grid-cols-4 md:grid-cols-2 my-10 xl:gap-10 md:gap-7 sm:grid gap-5 ">
        <StatCard
          title={"Total Customers"}
          amount={data?.length}
          img={"images/customer.jpeg"}
        />
        <StatCard
          title={"Total Sales"}
          amount={data?.length}
          img={"images/sales.png"}
        />
        <StatCard
          title={"Total Money"}
          amount={totalAmount()}
          img={"images/money.png"}
        />
        <StatCard
          title={"Total Product"}
          amount={products?.length}
          img={"images/product.webp"}
        />
      </div>
      <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
        <div className="lg:w1/2 lg:h-full h-72">
          <Area {...configArea} />
        </div>
        <div className="lg:w1/2 lg:h-full h-72">
          <Pie {...configPie} />
        </div>
      </div>
      {!data.length && (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </div>
  );
};

export default StatisticPage;
