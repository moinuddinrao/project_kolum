import React from "react";

import { useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";

import { ROUTES } from "@/Router";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

type FieldType = {
  email: string;
  password: string;
};

type NotificationType = "success" | "info" | "warning" | "error";

const DeleteAccountModal = () => {
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
        message: "Account Deleted",
        description: "We are sorry to see you go",
        duration: 0,
      });
    }
    // show error notification
    if (type === "error") {
      api["error"]({
        message: "Account Deletion Failed",
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
      // Navigate to signup page
      setTimeout(() => {
        navigate(ROUTES.signup);
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
        className="w-full h-full my-10 px-10 flex flex-col justify-center items-center gap-5"
      >
        {/* Page Title */}
        <h1 className={`${styles.heading1}`}>Delete Account</h1>

        {/* Page Description */}
        <p className={`${styles.text} w-full m-0 !text-red`}>
          Please note: this action cannot be done and all your data will be
          removed permanently.
        </p>

        <p className={`${styles.text} w-full m-0`}>
          To delete your account, type in your email address and password to
          confirm.
        </p>

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
          <Input
            autoComplete="off"
            placeholder="Email"
            className="!bg-[transparent"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item<FieldType>
          name="password"
          className="w-full m-0"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            autoComplete="off"
            placeholder="Password"
            className="!bg-[transparent] [&>input]:!bg-[transparent]"
          />
        </Form.Item>

        {/* Delete Account Button */}
        <PrimaryButton htmlType="submit" className="w-full h-auto">
          Delete Account
        </PrimaryButton>
      </Form>
    </>
  );
};

export default DeleteAccountModal;
