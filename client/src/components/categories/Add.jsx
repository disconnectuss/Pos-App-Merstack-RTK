import { Button, Form, Input, message, Modal } from "antd";

const Add = ({
    isAddModalOpen,
    closeModal
    }) => {
        const [form] = Form.useForm();
        const handleSubmit = (values) => {
            try {
              fetch("http://localhost:3000/api/categories/add-category", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
              });
              message.success("Category successfully added!");
              form.resetFields();
              closeModal();
            } catch (error) {
              console.log(error);
            }
          }; 
  return (
    <div>
       <Modal
          title="Add New Category"
          open={isAddModalOpen}
          onCancel={closeModal}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit} form={form}>
            <Form.Item
              name="title"
              label="Add Category"
              rules={[{ required: true, message: "Do not leave empty" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item className=" flex justify-end mb-0">
              <Button htmlType="submit">Add</Button>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  )
}

export default Add
