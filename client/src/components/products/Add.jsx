import { Button, Form, Input, message, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import Products from "./Products";

const Add = ({ isAddModalOpen,setIsAddModalOpen, categories, closeModal, setProducts }) => {
  const [form] = Form.useForm();
  

  const handleSubmit = (values) => {
    try {
      fetch("http://localhost:3000/api/categories/add-products", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Products successfully added!");
      form.resetFields();
      setProducts([
        ...Products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Add New Products"
        open={isAddModalOpen}
        onCancel={()=> setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            name="title"
            label="Product Title"
            rules={[
              {
                required: true,
                message: "Please ensure the field is completed!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="img"
            label="Product image"
            rules={[
              {
                required: true,
                message: "Please ensure the field is completed!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[
              {
                required: true,
                message: "Please ensure the field is completed!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <FormItem
            name="category"
            label="Select a category"
            rules={[
              { required: true, message: "Please ensure you've chosen!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </FormItem>

          <Form.Item className=" flex justify-end mb-0">
            <Button htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
