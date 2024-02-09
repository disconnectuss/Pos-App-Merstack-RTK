import Header from "../components/header/Header";
import StatCard from "../components/statistics/StatCard.jsx";
import React, { useState, useEffect } from "react";
import { Area, Pie } from "@ant-design/plots";

const StatisticPage = ({ title, amount, img }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const data2 = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];

  const config = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };
  const config2 = {
    appendPadding: 10,
    data: data2,
    angleField: "value",
    colorField: "type",
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
        content: "AntV\nG2Plot",
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="px-6 pb-20 md:p-10 ">
        <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
        <h2 className="text-lg pl-4">
          Welcome <span className="text-red-800 font bold text-2xl">Admin</span>
        </h2>
      </div>
      <div className="stat-cards m-8 mb-20 grid xl:grid-cols-4 md:grid-cols-2 my-10 xl:gap-10 md:gap-7 sm:grid gap-5 ">
        <StatCard
          title={"Total Customers"}
          amount={"20"}
          img={"images/customer.jpeg"}
        />
        <StatCard
          title={"Total Sales"}
          amount={"57687"}
          img={"images/sales.png"}
        />
        <StatCard
          title={"Total Money"}
          amount={"4567587 ₺"}
          img={"images/money.png"}
        />
        <StatCard
          title={"Total Product"}
          amount={"7878"}
          img={"images/product.webp"}
        />
      </div>
      <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
        <div className="lg:w1/2 lg:h-full h-72">
          <Area {...config} />
        </div>{" "}
        <div className="lg:w1/2 lg:h-full h-72">
          <Pie {...config2} />
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
