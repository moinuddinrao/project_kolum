import React from "react";

import { Outlet } from "react-router-dom";
import { Layout as AntdLayout, Space, Image } from "antd";

import Circle1 from "../assets/circle1.svg";
import Circle2 from "../assets/circle2.svg";
import Triangle from "../assets/triangle.svg";

const AuthLayout: React.FC = () => {
  return (
    <Space direction="vertical" className="w-full h-full">
      <AntdLayout.Content className="bg-gradient-to-r from-[rgba(199,249,204,0.50)] to-[rgba(56,163,165,0.50)] w-screen h-screen relative flex flex-col justify-center items-center gap-10">
        {/* Logo */}
        <Image
          alt="Kolum Logo"
          src="https://www.kolum.earth/img/logo.svg"
          width={100}
        />
        {/* Background images */}
        <img
          src={Circle1}
          alt="Circle1"
          className="absolute top-0 right-0 z-[-1]"
        />
        <img
          src={Circle2}
          alt="Circle2"
          className="absolute bottom-0 left-0 z-[-1]"
        />
        <img
          src={Triangle}
          alt="Triangle"
          className="absolute bottom-0 right-0 z-[-1]"
        />
        <Outlet />
      </AntdLayout.Content>
    </Space>
  );
};

export default AuthLayout;
