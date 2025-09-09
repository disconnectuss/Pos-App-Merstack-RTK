import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import { Button, Input, Space, Spin, Table } from "antd";
import PrintInvoice from "../components/invoices/PrintInvoice";
import { SearchOutlined } from "@ant-design/icons";
import getApiUrl from "../utils/apiUtils";


const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState();
  const [customer, setCustomer] = useState();
  // console.log(customer)
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

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const res = await fetch(getApiUrl("/invoices/get-invoices"));
        const data = await res.json();
        console.log("Fetched invoices:", data);
        setInvoices(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInvoices();
  }, []);

  // Refetch invoices when component comes into focus (when navigating back)
  useEffect(() => {
    const handleFocus = async () => {
      try {
        const res = await fetch(getApiUrl("/invoices/get-invoices"));
        const data = await res.json();
        console.log("Refetched invoices on focus:", data);
        setInvoices(data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleFocus();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  // console.log(invoices);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps('customerName')
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
      ...getColumnSearchProps('paymentMethod')

    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>$ {text}</span>;
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
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
      {
        invoices ? (
          <>
            <Table
              dataSource={invoices}
              columns={columns}
              bordered
              pagination={false}
              scroll={{
                x: 1000,
                y: 300,
              }}
              rowKey="_id"
            />
            <PrintInvoice
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              customer={customer}
            />
          </>
        ) : (
          <Spin size="large" className="absolute top-1/2 h-screen w-screen flex justify-center"/>
        )
      }
    </>
  )}

export default InvoicePage;
