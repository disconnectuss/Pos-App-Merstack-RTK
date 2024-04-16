import { Input, Badge} from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  TableOutlined,
  BarChartOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Header = () => {
  const cartItems = useSelector((state) => state.cart); 
  // console.log(cartItems.cartItem.length)
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl text-red-700">LOGO</h2>
          </a>
        </div>
        <div className="header-search flex justify-center">
          <Input
            size="large"
            placeholder="Search here..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        {/* Links */}
        <div className="menu-links flex justify-between items-center gap-7 
        md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white 
        left-0 md:border-t-0 border-t md:px-0 px-4 py-1">  
        {/* Home Link */}
          <Link to={"/"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <HomeOutlined className="md:text-3xl text-xl  text-red-800 " />
            <span className="md:text-[15px] text-[10px]">Home</span>
          </Link>
          {/* basket */}
          <Badge count={cartItems.cartItem.length} offset={[0,0]} className="md:flex hidden">
          <Link to={"/cart"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <ShoppingCartOutlined className="md:text-3xl text-xl text-red-800 " />
            <span className="md:text-[15px] text-[10px]">Basket</span>
          </Link>
          </Badge >
          {/* Invoice */}
          <Link to={"/invoice"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <CopyOutlined className="md:text-3xl text-xl  text-red-800 " />
            <span className="md:text-[15px] text-[10px]">Invoice</span>
          </Link>
          {/* Customers */}
          <Link to={"/tables"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <TableOutlined className="md:text-3xl text-xl  text-red-800 " />
            <span className="md:text-[15px] text-[10px]">Tables</span>
          </Link>
          {/* stats */}
          <Link to={"/statistics"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <BarChartOutlined className="md:text-3xl text-xl text-red-800 " />
            <span className="md:text-[15px] text-[10px]">Stats</span>
          </Link>
          {/* Log out */}
          <a href={"/"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <LogoutOutlined  className="md:text-2xl text-xl  text-red-800" />
            <span className="md:text-[15px] text-[10px]">Back</span>
          </a>
        </div>
        <Badge count={5} offset={[0,10]} className="md:hidden flex " >
          <Link to={"/"} className="menu-link flex flex-col hover:text-[gray] transition-all">
            <ShoppingCartOutlined className="md:text-2xl text-2xl text-red-800 p-2" />
            <span className="md:text-[15px] text-[10px]">Basket</span>
          </Link>
          </Badge >
      </header>
    </div>
  );
};

export default Header;
