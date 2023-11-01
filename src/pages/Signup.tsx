import React from "react";

import { Button, Checkbox, Form, Input, Typography } from "antd";

import Logo from "../assets/logo.svg";
import Circle1 from "../assets/circle1.svg";
import Circle2 from "../assets/circle2.svg";
import Triangle from "../assets/triangle.svg";
//  import { useNavigate } from "react-router-dom";

// import { ROUTES } from "@/Router";
// import { signin } from "@/features/auth/service";

const Signup = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

const SignupForm = () => {
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
            Signup
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
            placeholder="Password"
          />
          <div className=" flex gap-2 self-start items-center">
            <Checkbox />{" "}
            <Typography className="flex gap-[2px] text-nao_dark_gray font-semibold items-center">
              I agree to all{" "}
              <Typography.Link style={{ color: "#22577A" }}>
                Terms and Conditions
              </Typography.Link>
            </Typography>
          </div>
        </div>
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
          Sign Up
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

export default Signup;
