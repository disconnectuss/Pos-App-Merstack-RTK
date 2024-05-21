import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  increment,
  decrement,
  reset,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_120px)] flex flex-col">
      {/* calculation can be flexible */}
      <h2 className="bg-blue-500 text-center py-4 text-white font-bold tracking-wide">
        Basket
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto">
        {cart.cartItem.length > 0
          ? cart.cartItem
              .map((item) => (
                <li className="cart-item flex justify-between" key={item._id}>
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16 object-cover cursor-pointer"
                      src={item.img}
                      alt=""
                      onClick={() => {
                        dispatch(deleteFromCart(item));
                        message.success("Successfully deleted!");
                      }}
                    />
                    <div className="flex flex-col ml-2">
                      <b>{item.title}</b>
                      <span>
                        $ {item.price} x {item.quantity}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Button
                      type="primary"
                      size="small"
                      className="w-full flex items-center justify-center !rounded-full !text-black"
                      icon={
                        <PlusCircleOutlined
                          onClick={() => {
                            dispatch(increment(item));
                            message.success("Successfully added!");
                          }}
                        />
                      }
                    />
                    <span className="font-bold">{item.quantity}</span>
                    <Button
                      type="primary"
                      size="small"
                      className="w-full flex items-center justify-center !rounded-full !text-black"
                      icon={
                        item.quantity === 1 ? (
                          <MinusCircleOutlined
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this item?"
                                )
                              ) {
                                dispatch(decrement(item));
                                message.success("Successfully deleted!");
                              }
                            }}
                          />
                        ) : (
                          <MinusCircleOutlined
                            onClick={() => {
                              dispatch(decrement(item));
                              message.success("Successfully deleted");
                            }}
                          />
                        )
                      }
                    />
                  </div>
                </li>
              ))
              .reverse()
          : "No order yet!"}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Total</b>
            <span>
              ${typeof cart.total === "number" ? cart.total.toFixed(2) : "0.00"}
            </span>
          </div>
          <div className="flex justify-between p-2">
            <b>Each {cart.tax}%</b>
            <span className="text-red-700">
              $
              {typeof cart.total === "number" && cart.total > 0
                ? `${((cart.total * cart.tax) / 100).toFixed(2)}`
                : "0.00"}{" "}
            </span>
          </div>
          <div className="border-b mt-4">
            <div className="flex justify-between p-2 border-t">
              <b>Cart Total</b>
              <span>
                $
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100)
                  : 0}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 px-2 ">
        <Button
          type="primary"
          size="large"
          className="addToOrder w-full"
          disabled={cart.cartItem.length === 0}
          onClick={() => navigate("/cart")}
        >
          Add to Order
        </Button>
        <Button
          type="primary"
          size="large"
          className="w-full mt-2 flex items-center justify-center"
          icon={<ClearOutlined />}
          danger
          disabled={cart.cartItem.length === 0}
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              dispatch(reset());
              message.success("Successfully deleted");
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
