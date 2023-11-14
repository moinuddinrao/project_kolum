import React from "react";

import {
  DashboardOutlined,
  DatabaseOutlined,
  FileOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu as AntdMenu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "@/Router";
import styles from "@/assets/Styles";

type MenuItem = Required<MenuProps>["items"][number];

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const topMenu: MenuItem[] = [
    {
      label: "Dashboard",
      icon: React.createElement(DashboardOutlined),
      key: ROUTES.dashboard,
      onClick: () => navigate(ROUTES.dashboard),
    },
    {
      label: "Your Operators",
      icon: React.createElement(ProfileOutlined),
      key: ROUTES.operators,
      onClick: () => navigate(ROUTES.operators),
    },
    {
      label: "Import Data",
      icon: React.createElement(DatabaseOutlined),
      key: ROUTES.imports,
      onClick: () => navigate(ROUTES.imports),
    },
    {
      label: "Reports",
      icon: React.createElement(FileOutlined),
      key: ROUTES.reports,
      onClick: () => navigate(ROUTES.reports),
    },
    {
      label: "Settings",
      icon: React.createElement(SettingOutlined),
      key: ROUTES.settings,
      onClick: () => navigate(ROUTES.settings),
    },
  ];

  const bottomMenu: MenuItem[] = [
    {
      label: "Logout",
      icon: React.createElement(LogoutOutlined),
      key: "/logout",
      className: "text-nao_blue",
      onClick: () => {
        navigate(ROUTES.login);
      },
    },
  ];

  return (
    <div className={`h-full flex flex-col justify-between ${styles.text}`}>
      <AntdMenu
        className="text-left text-md"
        mode="inline"
        inlineIndent={16}
        items={topMenu}
        defaultSelectedKeys={[pathname]}
      />
      <AntdMenu
        className="text-left text-md"
        mode="inline"
        items={bottomMenu}
        selectable={false}
      />
    </div>
  );
};

export default Menu;
