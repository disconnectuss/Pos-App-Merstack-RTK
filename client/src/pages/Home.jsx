import React, { useEffect, useState } from "react";
import CartTotal from "../components/cart/CartTotal";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

const Home = () => {
  const [categories, setCategories] = useState([]);

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
  }, []);
  return (
    <>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-3  md:pb-0 pb-24">
        <div
          className="categories overflow-auto max-h-[calc(100vh_-_112px)]
        md:pb-10 "
        >
          <Categories categories={categories}/>
        </div>
        {/* md:mr-0 -mr[20px] md:pr-0 pr-10 */}
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
          <Products />
        </div>
        <div className="total min-w-[300px] md:-mr-[24px] md:-mt-[[24px] border">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default Home;
