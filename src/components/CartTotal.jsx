import { Button } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const CartTotal = () => {
  return (
    <div className="cart h-full max-h-[calc(100vh_-_120px)] flex flex-col">
      {/* calculation can be flexible */}
      <h2 className="bg-blue-500 text-center py-4 text-white font-bold tracking-wide">
        Orders
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto">
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="font-bold">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src="https://www.fruitsmith.com/pub/media/catalog/product/cache/3d1197b96d84cacc4f40a78b1d94d82b/g/a/gala-apple-2_1.png"
              alt=""
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span> 12₺ x 2 </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<PlusCircleOutlined />}
            />
            <span className="">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full !text-black"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Total</b>
            <span>99 ₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Each 5%</b>
            <span className="text-red-700"> +5.50 ₺</span>
          </div>
          <div className="border-b mt-4">
            <div className="flex justify-between p-2 border-t">
              <b>Cart Total</b>
              <span>100 ₺</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 px-2 ">
        <Button type="primary" size="large" className="addToOrder w-full">
          Add to Order
        </Button>
        <Button
          type="primary"
          size="large"
          className="w-full mt-2 flex items-center justify-center"
          icon={<ClearOutlined />}
          danger
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
