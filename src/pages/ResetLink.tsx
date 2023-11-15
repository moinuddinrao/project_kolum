import React from "react";

import { useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";

import { ROUTES } from "@/Router";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

type NotificationType = "success" | "info" | "warning" | "error";

const Reset = () => {
  return <ResetLinkForm />;
};

export default Reset;

// Reset Form
const ResetLinkForm = () => {
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
        message: "Email Sent Successful",
        description: "Please check your inbox for the password reset link",
        duration: 0,
      });
    }
    // Show error notification
    if (type === "error") {
      api["error"]({
        message: "Email Sent Failed",
        description: "Please try again",
        duration: 0,
      });
    }
  };

  // Form submit handler
  const onFinish = async (values: string) => {
    try {
      console.log("Success:", values);
      form.resetFields();
      showNotification("success");
      // Behave like a successful email verification and Navigate to reset link page after 5 seconds
      setTimeout(() => {
        navigate(ROUTES.reset);
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

  // Render the component
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="ResetLinkForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        className="w-1/4 flex flex-col justify-center items-center gap-5"
      >
        {/* Page Title */}
        <h1 className={`${styles.heading1}`}>Reset Password</h1>

        {/* Description */}
        <p className={`${styles.text} m-0 text-center`}>
          Enter the email address associated with your kolum account, and we
          will send you a link to reset your password.
        </p>

        {/* Email */}
        <Form.Item
          name="email"
          className="w-full m-0"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="Email"
            className="!bg-[transparent] border-nao_blue rounded-lg !py-2"
          />
        </Form.Item>

        {/* Password Reset Button */}
        <PrimaryButton
          htmlType="submit"
          className="!bg-nao_blue text-white rounded-lg !py-2 font-semibold w-full h-auto"
        >
          Send Reset Link
        </PrimaryButton>
      </Form>
    </>
  );
};
