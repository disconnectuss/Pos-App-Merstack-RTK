import { Button, Form, Input, message, Modal, Select } from "antd";

const AddTables = ({
  isAddModalOpen,
  setIsAddModalOpen,
  tables,
  setTables,
}) => {
  const [form] = Form.useForm();
  // console.log(tables)

  const handleSubmit = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL+"/api/tables/add-table", {
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
      //console.log(setTables);
      setIsAddModalOpen(false);
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
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please ensure the field is completed!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.children ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.children ?? "").toLowerCase())
              }
            >
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="number"
            label="Number"
            rules={[
              {
                required: true,
                message: "Please ensure the field is completed!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.children ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.children ?? "").toLowerCase())
              }
            >
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
            </Select>
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
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.children ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.children ?? "").toLowerCase())
              }
            >
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Dine in">Dine in</Select.Option>
              <Select.Option value="Reserved">Reserved</Select.Option>
            </Select>
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
