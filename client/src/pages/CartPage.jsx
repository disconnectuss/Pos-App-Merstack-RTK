import React, { useRef, useState } from "react";
import Header from "../components/header/Header";
import { Button, Table, Card, Popconfirm, message, Input, Space } from "antd";
import InvoiceModal from "../components/invoices/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  deleteFromCart,
  increment,
} from "../redux/slices/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps('title'),
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
      sorter: (a, b) => a.price - b.price,
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
      <h1 className="text-4xl font-bold text-center mb-4">Cart</h1>

      <Table
        dataSource={cart.cartItem}
        columns={columns}
        bordered
        pagination={false}
        scroll={{
          x: 1200,
          y: 300
        }}
        rowKey="_id"
      />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-70 pr-2">
        <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Total</b>
            <span>$ {typeof cart.total === 'number' ? cart.total.toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Each {cart.tax}%</b>
            <span className="text-red-700">
              ${typeof cart.total === 'number' && cart.total > 0
                    ? `${((cart.total * cart.tax) / 100).toFixed(2)}`
                    : '0.00'}{" "}
              
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
