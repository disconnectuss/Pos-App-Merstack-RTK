import { Input, Badge, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  TableOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Sure to log out?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Successfully logged out!");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-2 md:px-6 flex justify-between items-center gap-2 md:gap-10">
        <div className="logo flex-shrink-0">
          <a href="/">
            <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-red-700">
              LOGO
            </h2>
          </a>
        </div>
        <div
          className="header-search flex justify-center flex-1 mx-2 md:mx-4"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Search here..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px] w-full"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
        </div>
        {/* Links */}
        <div
          className="menu-links flex justify-between items-center gap-7 
          md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white 
          left-0 md:border-t-0 border-t md:px-0 px-4 py-1 md:py-0 shadow-lg md:shadow-none"
        >
          {/* Home Link */}
          <Link
            to="/"
            className={`menu-link flex flex-col hover:text-[gray] transition-all ${
              pathname === "/" ? "active" : ""
            }`}
          >
            <HomeOutlined className="md:text-3xl text-xl" />
            <span className="md:text-[15px] text-[10px]">Home</span>
          </Link>
          {/* Cart */}
          <Badge
            count={cartItems.length}
            offset={[-9, 0]}
            className="md:flex hidden"
          >
            <Link
              to="/cart"
              className={`menu-link flex flex-col hover:text-[gray] transition-all ${
                pathname === "/cart" ? "active" : ""
              }`}
            >
              <ShoppingCartOutlined className="md:text-3xl text-xl " />
              <span className="md:text-[15px] text-[10px]">Basket</span>
            </Link>
          </Badge>
          {/* Invoice */}
          <Link
            to="/invoice"
            className={`menu-link flex flex-col hover:text-[gray] transition-all ${
              pathname === "/invoice" ? "active" : ""
            }`}
          >
            <CopyOutlined className="md:text-3xl text-xl" />
            <span className="md:text-[15px] text-[10px]">Invoice</span>
          </Link>
          {/* Customers */}
          <Link
            to="/tables"
            className={`menu-link flex flex-col hover:text-[gray] transition-all ${
              pathname === "/tables" ? "active" : ""
            }`}
          >
            <TableOutlined className="md:text-3xl text-xl " />
            <span className="md:text-[15px] text-[10px]">Tables</span>
          </Link>
          {/* Stats */}
          <Link
            to="/statistics"
            className={`menu-link flex flex-col hover:text-[gray] transition-all text-black ${
              pathname === "/statistics" ? "active" : ""
            }`}
          >
            <BarChartOutlined className="md:text-3xl text-xl " />
            <span className="md:text-[15px] text-[10px]">Statistics</span>
          </Link>
          {/* Log out */}
          <a
            href="/"
            className="menu-link flex flex-col hover:text-[gray] transition-all"
            onClick={logOut}
          >
            <LogoutOutlined className="md:text-2xl text-xl " />
            <span className="md:text-[15px] text-[10px]">Back</span>
          </a>
        </div>
        <Badge
          count={cartItems.length}
          offset={[0, 10]}
          className="md:hidden flex"
        >
          <Link
            to="/cart"
            className={`menu-link flex flex-col hover:text-[gray] transition-all ${
              pathname === "/cart" ? "active" : ""
            }`}
          >
            <ShoppingCartOutlined className="md:text-2xl text-2xl p-2" />
            <span className="md:text-[15px] text-[10px]">Basket</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
