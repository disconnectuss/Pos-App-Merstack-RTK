import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "../products/Add";

const Products = ({categories}) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
       // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [isAddModalOpen]);

  const closeModal = () => {
    setIsAddModalOpen(false);
  };
  
    return (
      <div className="products-wrapper grid grid-cols-card gap-4">
        {products.map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
        <div
          className="product-item border hover:shadow-lg cursor-pointer
        transition-all select-none bg-purple-700 hover:opacity-80 
        flex justify-center items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusOutlined className="md:text-2xl" />
        </div>
        <div
          className="product-item border hover:shadow-lg cursor-pointer 
      transition-all select-none bg-orange-700 hover:opacity-80
      flex justify-center items-center"
        >
          <EditOutlined className="md:text-2xl" />
        </div>
        <Add
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          closeModal={closeModal}
          categories={categories}
          setProducts={setProducts}
        />
      </div>
    );
  };

export default Products;
