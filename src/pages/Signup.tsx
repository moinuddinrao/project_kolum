import React from "react";

import { useNavigate, Link } from "react-router-dom";
import { Checkbox, Form, Input, notification } from "antd";

import { ROUTES } from "@/Router";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

type FieldType = {
  email: string;
  password: string;
  confirm: string;
  terms: string;
};

type NotificationType = "success" | "info" | "warning" | "error";

const Signup = () => {
  return <SignupForm />;
};

export default Signup;

// Signup Form
const SignupForm = () => {
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
        message: "Signup Successful",
        description: "Welcome to kolum!",
        duration: 0,
      });
    }
    // show error notification
    if (type === "error") {
      api["error"]({
        message: "Signup Failed",
        description: "Please try again",
        duration: 0,
      });
    }
  };

  // Form submit handler
  const onFinish = async (values: FieldType) => {
    try {
      console.log("Success:", values);
      form.resetFields();
      showNotification("success");
      // Navigate to Company Setup page after 5 seconds
      setTimeout(() => {
        navigate(ROUTES.companySetup);
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
        name="SignupForm"
        initialValues={{ terms: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        className="w-1/4 flex flex-col justify-center items-center gap-5"
        scrollToFirstError
      >
        {/* Page Title */}
        <h1 className={`${styles.heading1}`}>Sign Up</h1>

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
          <Input placeholder="Email" className="!bg-[transparent]" />
        </Form.Item>

        {/* Password */}
        <Form.Item<FieldType>
          name="password"
          className="w-full m-0"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password
            placeholder="Password"
            className="!bg-[transparent] [&>input]:!bg-[transparent]"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item<FieldType>
          name="confirm"
          className="w-full m-0"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value)
                  return Promise.resolve();
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!"),
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Confirm Password"
            className="!bg-[transparent] [&>input]:!bg-[transparent]"
          />
        </Form.Item>

        {/* Agree to Terms and Condition */}
        <Form.Item<FieldType>
          name="terms"
          valuePropName="checked"
          className="w-full m-0"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("You must agree to the terms and conditions!"),
                    ),
            },
          ]}
        >
          <Checkbox className={`${styles.text}`}>
            I agree to all{" "}
            <Link
              to={ROUTES.terms}
              className={`${styles.text}  !text-nao_blue hover:!text-nao_turquoise`}
            >
              Terms and Conditions
            </Link>
          </Checkbox>
        </Form.Item>

        {/* Signup Button */}
        <PrimaryButton htmlType="submit" className="w-full h-auto">
          Sign Up
        </PrimaryButton>

        {/* Login Link */}
        <div className="flex gap-2">
          <p className={`${styles.text} m-0`}>Already have an account?</p>
          <Link
            to={ROUTES.login}
            className={`${styles.text}  !text-nao_blue hover:!text-nao_turquoise`}
          >
            Log In
          </Link>
        </div>
      </Form>
    </>
  );
};
