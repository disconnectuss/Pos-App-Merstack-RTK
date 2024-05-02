import { Button, Form, Input, Carousel } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";


const Register = () => {
  const onFinish = (val) => {
    console.log(val, "hey")
  }

  return (
    <div className="h-screen w-full flex flex-row">
      <div className="flex justify-between w-full h-full  min-w-[800px]">
        <div className="min-w-[400px] xl:px-20 px-10 xl:w-3/5 md:w-2/5 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2 text-red-900">
            LOGO
          </h1>
          <Form layout="vertical" onFinish={onFinish}>
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submitBtn  w-full"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Don't you have an account?&nbsp;
            <Link to="/register" className="text-blue-600">
              Sign up
            </Link>
          </div>
        </div>
        <div className="xl:w-3/5">
        <div className="!w-full !h-full bg-slate-800 items-center">
          <Carousel autoplay>
            <div className=" lg:w-3/5 md:w-1/2 sm:flex hidden !h-full ">
              <div className="w-full h-full flex items-center">
                <div className="w-full">
                  <Carousel className="!h-full px-6">
                    <AuthCarousel
                      img="/images/resp.png"
                      title="Responsive Design"
                      desc="Resposive with all devices."
                    />
                    <AuthCarousel 
                      img="/images/stats.png"
                      title="Statistics"
                      desc="Statistics and analyses"
                    />
                    <AuthCarousel 
                      img="/images/customer.png"
                      title="Content of customers"
                      desc="Review and content"
                    />
                    <AuthCarousel 
                      img="/images/adminPanel.png"
                      title="Admin Panel"
                      desc="Management as admin"
                    />
                  </Carousel>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Register;
