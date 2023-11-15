import React from "react";

import { useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";

import { ROUTES } from "@/Router";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

type FieldType = {
  password: string;
  confirm: string;
};

type NotificationType = "success" | "info" | "warning" | "error";

const ResetLink = () => {
  return <ResetForm />;
};

export default ResetLink;

// Reset Link Form
const ResetForm = () => {
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
      api[type]({
        message: "Password Reset Successful",
        description: "Please login with your new password",
        duration: 0,
      });
    }
    // Show error notification
    if (type === "error") {
      api[type]({
        message: "Password Reset Failed",
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
      // Navigate to login page after 5 seconds
      setTimeout(() => {
        navigate(ROUTES.login);
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
        name="ResetForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        className="w-1/4 flex flex-col justify-center items-center gap-5"
        scrollToFirstError
      >
        {/* Page Title */}
        <h1 className={`${styles.heading1}`}>Reset Password</h1>

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

        {/* Signup Button */}
        <PrimaryButton htmlType="submit" className="w-full h-auto">
          Reset Password
        </PrimaryButton>
      </Form>
    </>
  );
};
