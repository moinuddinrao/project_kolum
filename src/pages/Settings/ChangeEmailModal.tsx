import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";

import { ROUTES } from "@/Router";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

type NotificationType = "success" | "info" | "warning" | "error";

const ChangeEmailModal = () => {
  // Form instance
  const [passwordForm] = Form.useForm();
  const [emailForm] = Form.useForm();

  // Notification instance
  const [api, contextHolder] = notification.useNotification();

  // Navigate to another page
  const navigate = useNavigate();

  // State to track password verification
  const [passwordVerified, setPasswordVerified] = useState(false);

  // Show password notification
  const showPasswordNotification = (type: NotificationType) => {
    // Show success notification
    if (type === "success") {
      api["success"]({
        message: "Password Verification Successful",
        description: "Now you can change your email",
        duration: 3,
      });
    }
    // Show error notification
    if (type === "error") {
      api["error"]({
        message: "Password Verification Failed",
        description: "Please try again",
        duration: 3,
      });
    }
  };

  // Handle password verification
  const handlePasswordVerification = async (vlaues: string) => {
    try {
      const values = await passwordForm.validateFields();
      showPasswordNotification("success");
      setPasswordVerified(true);
      console.log("Success:", values);
      passwordForm.resetFields();
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
      showPasswordNotification("error");
    }
  };

  // Show notification for email
  const showEmailNotification = (type: NotificationType) => {
    // Show success notification
    if (type === "success") {
      api["success"]({
        message: "Email Change Successful",
        description: "Please login with your new email",
        duration: 0,
      });
    }
    // Show error notification
    if (type === "error") {
      api["error"]({
        message: "Email Change Failed",
        description: "Please try again",
        duration: 0,
      });
    }
  };

  // Handle email change
  const handleEmailChange = async (values: string) => {
    try {
      const values = await emailForm.validateFields();
      showEmailNotification("success");
      console.log("Success:", values);
      emailForm.resetFields();
      // Behave like a successful email verification and Navigate to reset link page after 5 seconds
      setTimeout(() => {
        navigate(ROUTES.login);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      showEmailNotification("error");
    }
  };

  // Render the component
  return (
    <>
      {contextHolder}
      {!passwordVerified ? (
        <Form
          form={passwordForm}
          name="ConfirmPasswordForm"
          onFinish={handlePasswordVerification}
          size="large"
          className="w-full h-full my-10 px-10 flex flex-col justify-center items-center gap-5"
        >
          {/* Page Title */}
          <h1 className={`${styles.heading1}`}>Change Email</h1>

          {/* Description */}
          <p className={`${styles.text} m-0 text-center`}>
            Enter your password so we can confirm your identity
          </p>

          {/* Password */}
          <Form.Item
            name="password"
            className="w-full m-0"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              placeholder="Password"
              className="!bg-[transparent] border-nao_blue rounded-lg !py-2"
            />
          </Form.Item>

          {/* Confirm Password */}
          <PrimaryButton
            htmlType="submit"
            className="!bg-nao_blue text-white rounded-lg !py-2 font-semibold w-full h-auto"
          >
            Confirm Password
          </PrimaryButton>
        </Form>
      ) : (
        <Form
          form={emailForm}
          name="ChangeEmailForm"
          onFinish={handleEmailChange}
          size="large"
          className="w-full h-full my-10 px-10 flex flex-col justify-center items-center gap-5"
          autoComplete="off"
        >
          {/* Page Title */}
          <h1 className={`${styles.heading1}`}>Change Email</h1>

          {/* Description */}
          <p className={`${styles.text} m-0 text-center`}>
            Enter your new email address
          </p>

          {/* Email */}
          <Form.Item
            name="email"
            className="w-full m-0"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Email"
              className="!bg-[transparent] border-nao_blue rounded-lg !py-2"
            />
          </Form.Item>

          {/* Confirm Email */}
          <Form.Item
            name="confirmEmail"
            className="w-full m-0"
            rules={[
              { required: true, message: "Please input your email!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("email") === value)
                    return Promise.resolve();
                  return Promise.reject(
                    new Error("The two emails that you entered do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Confirm Email"
              className="!bg-[transparent] border-nao_blue rounded-lg !py-2"
            />
          </Form.Item>

          {/* Password Reset Button */}
          <PrimaryButton
            htmlType="submit"
            className="!bg-nao_blue text-white rounded-lg !py-2 font-semibold w-full h-auto"
          >
            Change Email
          </PrimaryButton>
        </Form>
      )}
    </>
  );
};

export default ChangeEmailModal;
