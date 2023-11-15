import React from "react";

import { useNavigate, Link } from "react-router-dom";
import { Checkbox, Form, Input, notification } from "antd";

import { ROUTES } from "@/Router";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

type FieldType = {
  email: string;
  password: string;
  remember: string;
};

type NotificationType = "success" | "info" | "warning" | "error";

const Login = () => {
  return <LoginForm />;
};

export default Login;

// Login Form
const LoginForm = () => {
  // Form instance
  const [form] = Form.useForm();

  // Notification instance
  const [api, contextHolder] = notification.useNotification();

  // Navigate to another page
  const navigate = useNavigate();

  // Show notification
  const showNotification = (type: NotificationType) => {
    // Show success notification
    if (type === "success") {
      api["success"]({
        message: "Login Successful",
        description: "Welcome back!",
        duration: 0,
      });
    }
    // show error notification
    if (type === "error") {
      api["error"]({
        message: "Login Failed",
        description: "Please try again",
        duration: 0,
      });
    }
  };

  // Form submit handler
  const onFinish = (values: FieldType) => {
    try {
      console.log("Success:", values);
      form.resetFields();
      showNotification("success");
      // Navigate to dashboard page
      setTimeout(() => {
        navigate(ROUTES.dashboard);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      showNotification("error");
    }
  };

  // Form error handler
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="LoginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        className="w-1/4 flex flex-col justify-center items-center gap-5"
      >
        {/* Page Title */}
        <h1 className={`${styles.heading1}`}>Log In</h1>

        {/* Email */}
        <Form.Item<FieldType>
          name="email"
          className="w-full m-0"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Email" className="!bg-[transparent" />
        </Form.Item>

        {/* Password */}
        <Form.Item<FieldType>
          name="password"
          className="w-full m-0"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            className="!bg-[transparent] [&>input]:!bg-[transparent]"
          />
        </Form.Item>

        <div className="w-full flex justify-between items-center">
          {/* Remember Me */}
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            className="m-0"
          >
            <Checkbox className={`${styles.text}`}>Remember me</Checkbox>
          </Form.Item>

          {/* Reset Password Link */}
          <Link
            to={ROUTES.resetLink}
            className={`${styles.text} !text-nao_blue hover:!text-nao_turquoise`}
          >
            Forgot your password?
          </Link>
        </div>

        {/* Login Button */}
        <PrimaryButton htmlType="submit" className="w-full h-auto">
          Log In
        </PrimaryButton>

        {/* Signup Link */}
        <div className="flex gap-2">
          <p className={`${styles.text} m-0`}>Don&apos;t have an account?</p>
          <Link
            to={ROUTES.signup}
            className={`${styles.text} !text-nao_blue hover:!text-nao_turquoise`}
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </>
  );
};
