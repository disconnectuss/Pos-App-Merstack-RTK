import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Modal, Table, Select } from "antd";
import getApiUrl from "../../utils/apiUtils";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editItem, setEditItem] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  console.log(editItem)
  // get-all-products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(getApiUrl("/products/get-all"));
        const data = await res.json();
        setProducts(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  // get-all-categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(getApiUrl("/categories/get-all"));
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  // update product
  const handleSubmit = async (values) => {
    try {
      fetch(getApiUrl("/products/update-product"), {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Successfully updated!");
      setProducts(
        products.map((item) => {
          if (item._id === editItem._id) {
            return values;
          }
          return item;
        }) 
      );
      setIsEditModalOpen(false)
    } catch (error) {
      message.error("Oops! Something went wrong!");
      console.log(error)
    }
  };
  // delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        fetch(getApiUrl("/products/delete-product"), {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Successfully deleted!");
        setProducts(products.filter((item) => item._id !== id));
        
      } catch (error) {
        message.error("Oops! Something went wrong!");
        console.log(error)
      }
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditItem(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteProduct(record._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={(record) => record._id}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Edit Products"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          initialValues={editItem}
        >
          <Form.Item
            name="title"
            label="Product Title"
            rules={[
              {
                required: true,
                message: "Please ensure the field is filled!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="img"
            label="Product image"
            rules={[
              {
                required: true,
                message: "Please ensure the field isfilled!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[
              {
                required: true,
                message: "Please ensure the field is filled!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Select a category"
            rules={[
              {
                required: true,
                message: "Please ensure you've chosen a category!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>

          <Form.Item className=" flex justify-end mb-0">
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProducts;
