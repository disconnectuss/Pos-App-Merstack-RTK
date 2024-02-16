import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Button, message } from "antd";
import { useState,useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories/get-all");
        const data = await res.json()
        setCategories(data);
        console.log(data)

      } catch (error) {
        console.log(error)
      }
    };
    getCategories()
  }, [isAddModalOpen,isEditModalOpen]);


  const closeModal = ()=> {
    setIsAddModalOpen(false)
  }

  const closeEditModal = ()=> {
    setIsEditModalOpen (false)
  }
  const closeDeleteModal = ()=> {
    setIsEditModalOpen (false)
  }
  return (
    <div>
      <ul className="flex gap-4 md:flex-col text-lg px-4 mb-0">
        {categories?.map((item) => (
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
        closeModal={closeModal}
      />
        <Edit
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        closeDeleteModal={closeDeleteModal}
          categories={categories}
      />
      </ul>
    </div>
  );
};

export default Categories;
