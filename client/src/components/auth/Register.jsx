import { Button, Form, Input, Carousel, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import { useState } from "react";
import getApiUrl from "../../utils/apiUtils";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    console.log(values)
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/auth/register"), {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Succesfully registered!");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex flex-row">
      <div className="flex justify-between w-full h-full  min-w-[800px]">
        <div className="min-w-[400px] xl:px-20 px-10 xl:w-3/5 md:w-2/5 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2 text-red-900">
            LOGO
          </h1>
          <Form layout="vertical" onFinish={onFinish}>
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
              <Input
              placeholder="example@example.com" />
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
              name={"Confirm"}
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
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
                loading={loading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have already an account?&nbsp;
            <Link to="/login" className="text-blue-600">
              Log in
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
                        desc="Statistics and analysis"
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
