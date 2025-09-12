import { Button, Card, Input, Modal, Select, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";


const InvoiceModal = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const invoiceData = {
        ...values,
        subTotal: cart.total,
        tax: cart.tax,
        totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
        cartItems: cart.cartItem,
      };
      
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL+"/api/invoices/add-invoice",
        {
          method: "POST",
          body: JSON.stringify(invoiceData),
          headers: {
            "Content-Type": "application/json", // Fixed syntax error and added correct header
          },
        }
      );
      
      const responseData = await res.text();
      
      if (res.status === 200) {
        message.success("Successfully created invoice.");
        dispatch(reset());
        navigate("/invoice")
      } else {
        message.error(`Failed to create invoice: ${responseData}`);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  // const onChange=(e) => {
  //   const re = /^[0-9\b]$/;
  //   if ((e.target.value = "" || re.test(e.target.value))) // need to limit number and just let num enter!!!!
  return (
    <div>
      <Modal
        title="Invoice"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} onFinish={onFinish}>
          <Form.Item
            label={"Customer Name"}
            name={"customerName"}
            rules={[{ required: true, message: "Full Name is required" }]}
          >
            <Input placeholder="Enter Customer Name.." />
          </Form.Item>
          <Form.Item
            label={"Customer Tel"}
            name={"customerTel"}
            type="number"
            maxLength={13}
            rules={[
              {
                required: true,
                message: "Phone Number is required",
              },
            ]}
          >
            <Input placeholder="Enter Phone Number.." />
          </Form.Item>
          <Form.Item
            label={"Choose a Payment Method"}
            name={"paymentMethod"}
            rules={[{ required: true, message: "Choose a Payment Method" }]}
          >
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Credit Card"> Credit Card</Select.Option>
            </Select>
          </Form.Item>
          <Card className="w-70 pr-2">
            <div className="cart-totals mt-auto">
              <div className="border-t border-b">
                <div className="flex justify-between p-2">
                  <b>Total</b>
                
                  <span>$ {typeof cart.total === 'number' ? cart.total.toFixed(2) : '0.00'} </span>
                </div>
                <div className="flex justify-between p-2">
                  <b>Each {cart.tax}%</b>
                  <span className="text-red-700">
                    $
                    {(cart.total * cart.tax) / 100 > 0
                      ? `${((cart.total * cart.tax) / 100).toFixed(2)}`
                      : 0}{" "}
                  </span>
                </div>
                <div className="border-b mt-4">
                  <div className="flex justify-between p-2 border-t">
                    <b>Cart Total : </b>
                    <span>
                      $
                      {cart.total + (cart.total * cart.tax) / 100 > 0
                        ? (cart.total + (cart.total * cart.tax) / 100).toFixed(
                            2
                          )
                        : 0}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="cartAdd mt-4 p-2 text-white"
                size="small"
                htmlType="submit"
              >
                Create Bill
              </Button>
            </div>
          </Card> 
        </Form>
      </Modal>
    </div>
  );
};

export default InvoiceModal;
