import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import getApiUrl from "../../utils/apiUtils";

const EditTables = ({
  isEditModalOpen,
  setIsEditModalOpen,
  tables,
  setTables,
}) => {
  const [editRow, setEditRow] = useState(tables);
  //console.log(tables);
  //console.log(editRow);

  const onFinish = async (values) => {
    try {
      await fetch(getApiUrl("/tables/update-table"), {
        method: "PUT",
        body: JSON.stringify({ ...values, tableId: editRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      // console.log(values)- an empty values object
      message.success("Successfully updated!");
      setTables(
        tables.map((item) => {
          if (item._id === editRow._id) {
            return {
              ...item,
              title: item.title,
            };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Oops! Something went wrong!");
    }
  };
  // delete table
  const deleteRow = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await fetch(getApiUrl("/tables/delete-table"), {
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
      title: "Title",
      dataIndex: "title",
      render: (_, record) => {
        //console.log(record) - no problem
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input key={`${record._id}-title`} defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
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
              <Input
                key={`${record._id}-people`}
                defaultValue={record.people}
              />
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
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.children ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.children ?? "").toLowerCase())
                }
              >
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="Dine in">Dine in</Select.Option>
                <Select.Option value="Reserved">Reserved</Select.Option>
              </Select>
            </Form.Item>
          );
        } else {
          return <p>{record.status}</p>;
        }
      },
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex ">
            <Button
              type="link"
              onClick={() => {
                console.log(record);
                setEditRow(record);
              }}
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
      title="Table Management"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
      width={600} // edit modal width !!!!
    >
      <Form onFinish={onFinish}>
        <Table bordered dataSource={tables} columns={columns} rowKey={"_id"} />
      </Form>
    </Modal>
  );
};

export default EditTables;
