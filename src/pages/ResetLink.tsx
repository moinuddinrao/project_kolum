import React, { useState } from "react";

import { Alert, Button, Form, Input, Typography } from "antd";

import Logo from "../assets/logo.svg";
import Circle1 from "../assets/circle1.svg";
import Circle2 from "../assets/circle2.svg";
import Triangle from "../assets/triangle.svg";
//  import { useNavigate } from "react-router-dom";

// import { ROUTES } from "@/Router";
// import { signin } from "@/features/auth/service";

const ResetLink = () => {
  return (
    <div>
      <ResetForm />
    </div>
  );
};

const ResetForm = () => {
  const [isReset, setIsReset] = useState(false);
  // const navigate = useNavigate();
  // const [loginForm] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log("Success:", values);
  //   signin({
  //     email: "safiu799@gmail.com",
  //     password: "secret",
  //     callbackUrl: `${window.location.origin}${ROUTES.dashboard}`,
  //   }).then((res) => {
  //     console.log({ res: "Here" });
  //   });
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  // const navigateToSignup = () => {
  //   navigate(ROUTES.signup);
  // };

  return (
    //wrapper
    <div className=" bg-gradient-to-r from-[rgba(199,249,204,0.50)] to-[rgba(56,163,165,0.50)]  w-screen h-screen flex justify-center items-center relative">
      <Form className=" flex flex-col justify-center items-center gap-5 w-1/4">
        <img width={100} src={Logo} alt="Kolum Logo" className=" stroke-2" />
        <div className=" flex flex-col justify-center items-center gap-2 w-full">
          <Typography.Title level={1} style={{ fontSize: "40px" }}>
            Reset Password
          </Typography.Title>
          <Input
            style={{
              backgroundColor: "transparent",
              borderColor: "#22577A",
              borderWidth: "1px",
              padding: "12px 8px 12px 8px",
            }}
            placeholder="Email"
          />
          <Input
            type="password"
            style={{
              backgroundColor: "transparent",
              borderColor: "#22577A",
              borderWidth: "1px",
              padding: "12px 8px 12px 8px",
            }}
            placeholder="Enter new Password"
          />
        </div>
        {isReset && (
          <Alert
            message={
              <span style={{ color: "#ffffff", fontWeight: 600 }}>Success</span>
            }
            description={
              <span style={{ color: "#ffffff" }}>
                We set your new password. You can log in.
              </span>
            }
            type="success"
            style={{
              width: "100%",
              backgroundColor: "#57CC99",
            }}
            closable
            onClose={() => setIsReset(false)}
          />
        )}
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
          onClick={() => setIsReset(true)}
        >
          Set new Password
        </Button>
      </Form>
      <img src={Circle1} alt="Circle1" className=" absolute top-0 right-0" />
      <img src={Circle2} alt="Circle2" className=" absolute bottom-0 left-0" />
      <img
        src={Triangle}
        alt="Triangle"
        className=" absolute bottom-0 right-0"
      />
    </div>
  );
};

export default ResetLink;
