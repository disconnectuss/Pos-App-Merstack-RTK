import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddProducts from "./AddProducts";
import { useNavigate } from "react-router-dom";
import getApiUrl from "../../utils/apiUtils";

const Products = ({ categories, filtered, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate("/products");

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
  }, [isAddModalOpen, setIsAddModalOpen]);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((item) => item.title.includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

      <div
        className="product-item border hover:shadow-lg cursor-pointer
        transition-all select-none bg-purple-700 hover:opacity-80 min-h-[160px]
        flex justify-center items-center"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-3xl text-white" />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer 
      transition-all select-none bg-orange-700 hover:opacity-80 min-h-[160px]
      flex justify-center items-center"
      >
        <EditOutlined
          className="md:text-3xl  text-white"
          onClick={() => navigate("/products")}
        />
      </div>
      <AddProducts
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
