import React, { useState } from "react";

import { Button, Form, Table, Dropdown, Popconfirm, Menu } from "antd";
import {
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";

import { originData } from "./AllReportsData";

import styles from "@/assets/Styles";
export interface Item {
  key: string;
  id: number;
  quarter: string;
  createdAt: string;
  lastUpdated: string;
  createdBy: string;
  status: string;
  file: string;
}

const ReportsTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const handleView = (record: Item) => {
    console.log("VIEW YOUR REPORT");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteRecord = (record: Item) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
    console.log("Delete clicked");
  };

  const getMenu = (record: Item) => {
    return (
      <Menu>
        <Menu.Item
          className={`${styles.text}`}
          key="edit"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          View
        </Menu.Item>
        <Menu.Item
          className={`${styles.text}`}
          key="delete"
          icon={<DeleteTwoTone />}
        >
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteRecord(record)}
          >
            Delete
          </Popconfirm>
        </Menu.Item>
        <Menu.Item
          className={`${styles.text}`}
          key="download"
          icon={<DownloadOutlined />}
        >
          Download
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "15%",
      editable: true,
    },
    {
      title: "Quarter",
      dataIndex: "quarter",
      width: "15%",
      editable: true,
    },
    {
      title: "Created By",
      dataIndex: "createdAt",
      width: "15%",
      editable: true,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      width: "15%",
      editable: true,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      width: "25%",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "25%",
      editable: true,
    },
    {
      title: "File",
      dataIndex: "file",
      width: "25%",
      editable: true,
    },
    {
      dataIndex: "operation",
      width: "5%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex flex-row">
            <Popconfirm
              title="Sure to Save"
              onConfirm={() => save(record.key)}
              placement="bottomRight"
            >
              <Button className="border-0" icon={<CheckOutlined />}></Button>
            </Popconfirm>
            <Button
              className="border-0"
              icon={<CloseOutlined />}
              onClick={cancel}
            ></Button>
          </span>
        ) : (
          <Dropdown overlay={getMenu(record)} placement="bottomRight">
            <Button
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      className={`${styles.label} p-3 overflow-auto`}
      bordered
      dataSource={data}
      columns={columns}
      rowClassName={(record) => (isEditing(record) ? "editable-row" : "")}
      pagination={{
        onChange: cancel,
      }}
    />
  );
};

export default ReportsTable;
