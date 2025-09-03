import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editRow, setEditRow] = useState({});
  // console.log(editRow);

  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL+ "/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Successfully updated!");
      setCategories(
        categories.map((item) => {
          if (item._id === editRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Oops! Something went wrong!");
    }
  };

  const deleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        fetch(import.meta.env.VITE_SERVER_URL+ "/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Successfully deleted!");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Oops! Something went wrong!");
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditRow(record)}
              className="pl-0"
            >
              Edit
            </Button>
            <Button
              type="link"
              htmlType="submit"
              className="text-gray-500"
              onClick={onFinish}
            >
              Save
            </Button>
            <Button type="link" danger onClick={() => deleteRow(record._id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Category Management"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
