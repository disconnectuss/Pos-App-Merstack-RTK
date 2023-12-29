import { Button, Card, Input, Modal, Select, Form } from "antd";

const InvoiceModal = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => console.log(values);
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
            label={"Full Name"}
            name={"customerName"}
            rules={[{ required: true, message: "Full Name is required" }]}
          >
            <Input placeholder="Enter Customer Name.." />
          </Form.Item>
          <Form.Item
            label={"Phone Number"}
            name={"phoneNumber"}
            type="number"
            maxLength={13}
            rules={[
              {
                required: true,
                message: "Phone Number is required",
              },
            ]}
          >
            <Input placeholder="Choose A Payment Method.." />
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
            <div className="flex justify-between">
              <span>Total</span>
              <span>100 ₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Each 5%</span>
              <span className="text-red-700">20 ₺</span>
            </div>
            <div className="flex justify-between">
              <span>All</span>
              <span>120 ₺</span>
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
                Add to Order
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoiceModal;
