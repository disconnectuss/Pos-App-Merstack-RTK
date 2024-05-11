import { Button, Form, Input, message, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";


const AddTables = ({ tables, setTables
  
 
}) => {
  const [form] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // console.log(tables)

  const handleSubmit = (values) => {
    try {
      fetch("http://localhost:3000/api/tables/add-table", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Products successfully added!");
      form.resetFields();
      setTables([
        ...tables,
        {
          ...values,
          _id: Math.random(),
         
        },
      ]);
      console.log(setTables)
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Add New Table"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            name="part"
            label="Floor"
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
            name="people"
            label="People"
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
            name="status"
            label="Select status"
            rules={[
              {
                required: true,
                message: "Please ensure you've chosen table stat!",
              },
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
              options={["Available","Dine in","Reserved"]}
            />
          </Form.Item>

          <Form.Item className=" flex justify-end mb-0">
            <Button htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTables;