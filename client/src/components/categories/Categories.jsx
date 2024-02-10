import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Button, message } from "antd";
import { useState } from "react";
import Add from "./Add";
import Edit from "./Edit";

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  return (
    <div>
      <ul className="flex gap-4 md:flex-col text-lg px-4 mb-0">
        {categories.map((item) => (
          <li className="category-item" key={item._id}>
            <span>{item.title}</span>
          </li>
        ))} 
        <li
          className="category-item bg-purple-700 hover:opacity-80"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusOutlined className="md:text-2xl" />
        
        </li>
        <li
          className="category-item bg-purple-700 hover:opacity-80"
          onClick={() => setIsEditModalOpen(true)}
        >
          <EditOutlined className="md:text-2xl" />
        </li>
        <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
        <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      </ul>
    </div>
  );
};

export default Categories;
