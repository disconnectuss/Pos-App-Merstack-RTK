import { Button, Form, Input, message, Modal } from "antd";
import Categories from "./Categories";
import { useState } from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL+ "/api/categories/add-category",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Successfully added!");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Modal
        title="Add New Category"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            name="title"
            label="Add Category"
            rules={[{ required: true, message: "Do not leave empty!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className=" flex justify-end mb-0">
            <Button htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
