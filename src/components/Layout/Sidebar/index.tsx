import React from "react";

import { Layout } from "antd";

import Menu from "./Menu";
import Logo from "../Logo";

const Sidebar: React.FC = () => {
  return (
    <Layout.Sider
      theme="light"
      className="!sticky !top-0 !left-0 !h-screen flex flex-col text-center py-5"
    >
      <div className="h-[20%]">
        <Logo />
        <hr className="my-0 mx-4 h-0.5 border-solid text-nao_blue" />
      </div>
      <div className="h-[80%]">
        <Menu />
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
