import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";

const Edit = ({
  isEditModalOpen,
  closeEditModal,
  closeDeleteModal,
  categories,
}) => {
  const [editRow, setEditRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch("http://localhost:3000/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Successfully updated!");
      closeEditModal();
    } catch (error) {
      message.error("Oop! Something went wrong!");
    }
  };
  const deleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        fetch("http://localhost:3000/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Successfully deleted!");
        closeDeleteModal();
      } catch (error) {
        message.error("Oop! Something went wrong!");
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      //
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
            <Button type="link" htmlType="submit" className="text-gray-500">
              Save
            </Button>
            <Button type="link" danger 
             onClick={() => deleteRow(record._id)}
             
            >
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
      onCancel={closeEditModal}
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
