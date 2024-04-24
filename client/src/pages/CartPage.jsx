import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Button, Table, Card, Popconfirm, message } from "antd";
import InvoiceModal from "../components/invoices/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  deleteFromCart,
  increment,
} from "../redux/slices/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>$ {text.toFixed(2)}</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={
                <PlusCircleOutlined
                  onClick={() => {
                    dispatch(increment(record));
                    message.success("Successfully added!");
                  }}
                />
              }
            />
            <span className="font-bold">{record.quantity}</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={
                record.quantity === 1 ? (
                  <MinusCircleOutlined
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this item?"
                        )
                      ) {
                        dispatch(decrement(record));
                        message.success("Successfully deleted!");
                      }
                    }}
                  />
                ) : (
                  <MinusCircleOutlined
                    onClick={() => {
                      dispatch(decrement(record));
                      message.success("Successfully deleted");
                    }}
                  />
                )
              }
            />
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        return <span>$ {(record.quantity * record.price).toFixed(2)}</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => {
              dispatch(deleteFromCart(record));
              message.success("Successfully deleted");
            }}
            okText="OK"
            cancelText="Cancel"
            okType="primary"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      <Table
        dataSource={cart.cartItem}
        columns={columns}
        bordered
        pagination={false}
        scroll={{
          x: 1200,
          y: 300
        }}
      />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-70 pr-2">
        <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Total</b>
            <span>$ {cart.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Each {cart.tax}%</b>
            <span className="text-red-700">
              ${(cart.total * cart.tax) / 100 > 0
                ? `${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}{" "}
              
            </span>
          </div>
          <div className="border-b mt-4">
            <div className="flex justify-between p-2 border-t">
              <b>Cart Total : </b>
              <span>
                ${cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}{" "}
                
              </span>
            </div>
          </div>
        </div>
      </div>
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="cartAdd mt-4 w-full text-white"
            size="large"
            disabled= {cart.cartItem.length === 0}
          >
            Add to Order
          </Button>
        </Card>
      </div>
      <InvoiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
