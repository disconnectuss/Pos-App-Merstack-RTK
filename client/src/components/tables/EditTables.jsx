import { Button, Form, Input, message, Modal, Select } from "antd";

const EditTables = ({
  isEditModalOpen,
  setIsEditModalOpen,
  tables,
  setTables,
}) => {
  const [form] = Form.useForm();
  // console.log(tables)

  const handleSubmit = (values) => {
    try {
      fetch("http://localhost:3000/api/tables/get-table", {
        method: "GET",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Table successfully ssaved!");
      form.resetFields();
      setTables([
        ...tables,
        {
          ...values,
          _id: Math.random(),
        },
      ]);
      //console.log(setTables);
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Edit Table"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
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
           
          </Form.Item>

          <Form.Item className=" flex justify-end mb-0">
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditTables;
