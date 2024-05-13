import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  tables,
  setTables,
}) => {
  const [editRow, setEditRow] = useState({});


  const onFinish = async (values) => {
    try { await
      fetch("http://localhost:3000/api/tables/update-table", {
        method: "PUT",
        body: JSON.stringify({ ...values, tableId: editRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Successfully updated!");
      setTables(
        tables.map((item) => {
          console.log(item)
          if (item._id === editRow._id) {
            return { ...item, title: values.part };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Oops! Something went wrong!");
    }
  };

 const deleteRow = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try { await
        fetch("http://localhost:3000/api/tables/delete-table", {
          method: "DELETE",
          body: JSON.stringify({ tableId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Successfully deleted!");
        setTables(tables.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Oops! Something went wrong!");
      }
    }
  };

  const columns = [
    {
      title: "Floor",
      dataIndex: "part",
      render: (_, record) => {
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="part">
              <Input defaultValue={record.part} />
            </Form.Item>
          );
        } else {
          return <p>{record.part}</p>;
        }
      },
    },
    {
      title: "People",
      dataIndex: "people",
      render: (_, record) => {
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="people">
              <Input defaultValue={record.part} />
            </Form.Item>
          );
        } else {
          return <p>{record.people}</p>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => {
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="status">
              <Input defaultValue={record.part} />
            </Form.Item>
          );
        } else {
          return <p>{record.status}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (record) => {
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
            <Button
              type="link"
              danger
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
      title="Table Management"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={tables}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;