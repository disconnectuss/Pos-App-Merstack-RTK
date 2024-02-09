import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Button, message } from "antd";
import { useState } from "react";

const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  
 const handleSubmit = (values) => {
console.log(values)
 }
    
    /* try {
      fetch("http://localhost:3000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category successfully added!");
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  }; */
  return (
    <div>
      <ul className="flex gap-4 md:flex-col text-lg px-4 mb-0">
        <li className="category-item">
          <span>All</span>
        </li>{" "}
        <li className="category-item">
          <span>Kebabs</span>
        </li>{" "}
        <li className="category-item">
          <span>Soups</span>
        </li>{" "}
        <li className="category-item">
          <span>Sides & Salads</span>
        </li>{" "}
        <li className="category-item">
          <span>Speciality</span>
        </li>{" "}
        <li className="category-item">
          <span>Sauces</span>
        </li>{" "}
        <li className="category-item">
          <span>Desserts</span>
        </li>{" "}
        <li className="category-item">
          <span>Soups</span>
        </li>{" "}
        <li className="category-item">
          <span>Food</span>
        </li>{" "}
        <li className="category-item">
          <span>Food</span>
        </li>{" "}
        <li
          className="category-item bg-purple-700 hover:opacity-80"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusOutlined className="md:text-2xl" />
        </li>{" "}
        <Modal
          title="Add New Category"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={false}
        >
          <Form layout="vertical" 
          onFinish={handleSubmit}
          form={form}>
            <Form.Item
              name="title"
              label="Add Category"
              rules={[{ required: true, message: "Do not leave empty" }]}
            >
              <Input />
            </Form.Item>
          </Form>
          <Form.Item className=" flex justify-end mb-0">
            <Button htmlType="submit" className="categoryBtn text-white">
              Add
            </Button>
          </Form.Item>
        </Modal>
      </ul>
    </div>
  );
};

export default Categories;
