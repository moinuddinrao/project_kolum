import React, { useState } from "react";

import { Button, Form, Input, Typography } from "antd";

import Logo from "../assets/logo.svg";
import Circle1 from "../assets/circle1.svg";
import Circle2 from "../assets/circle2.svg";
import Triangle from "../assets/triangle.svg";

const Reset = () => {
  return (
    <div>
      <ResetForm />
    </div>
  );
};

const ResetForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleResetPassword = () => {
    // Check if the email is not empty
    if (email.trim() === "") {
      setIsEmailValid(false);
      setIsSuccess(true);
      return;
    }

    // Assuming you have an API call here to send a reset email.
    // After a successful API call, set isSuccess to true.
    // You can use a promise or async/await for the API call.

    // For example:
    // sendResetEmail(email)
    //   .then(() => {
    //     setIsSuccess(true);
    //   })
    //   .catch((error) => {
    //     console.error("Reset email failed:", error);
    //   });
  };

  return (
    <div className="bg-gradient-to-r from-[rgba(199,249,204,0.50)] to-[rgba(56,163,165,0.50)]  w-screen h-screen flex justify-center items-center relative">
      <Form className="flex flex-col justify-center items-center gap-5 w-1/4">
        <img width={100} src={Logo} alt="Kolum Logo" className="stroke-2" />
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          {!isSuccess ? (
            <Typography.Title level={1} style={{ fontSize: "40px" }}>
              Reset Password
            </Typography.Title>
          ) : (
            <Typography.Title level={1} style={{ fontSize: "40px" }}>
              Success
            </Typography.Title>
          )}
          {!isSuccess && (
            <Typography className="text-center my-1">
              Enter the email address associated with your kolum account and
              we’ll send you a link to reset your password.
            </Typography>
          )}
          {!isSuccess ? (
            <Input
              style={{
                backgroundColor: "transparent",
                borderColor: isEmailValid ? "#22577A" : "red",
                borderWidth: "1px",
                padding: "12px 8px 12px 8px",
              }}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(true);
              }}
            />
          ) : (
            <Typography className="text-center my-2 text-xl">
              Your account has been verified!
            </Typography>
          )}
          {!isSuccess && (
            <Button
              style={{
                backgroundColor: "#22577A",
                color: "#ffffff",
                width: "100%",
                height: "100%",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "16px",
                fontWeight: "600",
              }}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          )}
          {isSuccess && (
            <Button
              style={{
                backgroundColor: "#22577A",
                color: "#ffffff",
                width: "100%",
                height: "100%",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "16px",
                fontWeight: "600",
              }}
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </Form>
      <img
        src={Circle1}
        alt="Circle1"
        className="absolute top-0 right-0 pointer-events-none"
      />
      <img
        src={Circle2}
        alt="Circle2"
        className="absolute bottom-0 left-0 pointer-events-none"
      />
      <img
        src={Triangle}
        alt="Triangle"
        className="absolute bottom-0 right-0 pointer-events-none"
      />
    </div>
  );
};

export default Reset;
