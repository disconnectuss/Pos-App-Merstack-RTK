import { Button, Form, Input} from "antd";
import { Link } from "react-router-dom";
import { Carousel } from 'antd';




const Register = () => {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      
  return (
    <div className="h-screen">
    <div className="flex justify-between h-full">
      <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
        <h1 className="text-center text-5xl font-bold mb-2 text-red-900">LOGO</h1>
        <Form layout="vertical">
          <Form.Item
            label="Username"
            name={"username"}
            rules={[
              {
                required: true,
                message: "Please fill the username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail Address"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Fill the e-mail adress!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Enter your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password (again)"
            name={"passwordAgain"}
            rules={[
              {
                required: true,
                message: "Ş<enter your password again!>",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Sign Up 
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center absolute left-0 bottom-10 w-full">
          Do you have already an account?&nbsp;
          <Link to="/login" className="text-blue-600">
            Log in.
          </Link>
        </div>
      </div>
      <div className="xl:w-4/6 min-w-[800px]">right</div>
    </div>
    <div>
    <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>

    </div>
  </div>
 
  );
};

export default Register;
