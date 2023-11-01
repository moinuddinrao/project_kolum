import React from "react";

import { Outlet } from "react-router-dom";
import { Layout as AntdLayout, Space } from "antd";

import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <Space direction="vertical" className="w-full h-full">
      <AntdLayout>
        <Sidebar />
        <AntdLayout.Content className="bg-gradient-to-b from-[rgba(199,249,204,0.50)] to-[rgba(56,163,165,0.50)]">
          <Outlet />
        </AntdLayout.Content>
      </AntdLayout>
    </Space>
  );
};

export default Layout;
