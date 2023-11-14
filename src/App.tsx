import React from "react";

import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#22577a",
            colorPrimaryHover: "#38A3A5",
            colorBorder: "#22577a",
            colorPrimaryBg: "#E9ECEF",
            colorPrimaryBgHover: "#E9ECEF",
            borderRadius: 8,
            colorText: "#495057",
            colorTextSecondary: "#495057",
            colorTextTertiary: "#6c757d",
          },
        }}
      >
        <RouterProvider router={Router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
