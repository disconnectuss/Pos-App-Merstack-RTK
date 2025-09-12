import React, { useEffect, useState } from "react";
import CartTotal from "../components/cart/CartTotal";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import { Spin } from "antd";
import getApiUrl from "../utils/apiUtils";

const Home = () => {
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(getApiUrl("/categories/get-all"));
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-3  md:pb-0 pb-24">
          <div
            className="categories overflow-auto max-h-[calc(100vh_-_112px)]
        md:pb-10"
          >
            <Categories
              categories={categories}
              setCategories={setCategories}
              filtered={filtered}
              setFiltered={setFiltered}
              products={products}
              setProducts={setProducts}
            />
          </div>
          {/* md:mr-0 -mr[20px] md:pr-0 pr-10 */}
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-auto pb-10">
            <Products
              categories={categories}
              setCategories={setCategories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="total min-w-[300px] md:-mr-[24px] md:-mt-[[24px] border h-screen">
            <CartTotal />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default Home;
