import React, { useState } from "react";

import { Button, Form, Table, Dropdown, Popconfirm, Menu } from "antd";
import type { TableColumnsType } from "antd";
import { MoreOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

import { originData } from "./AllImportData";

import styles from "@/assets/Styles";

export interface ImportTableData {
  key: string;
  category: string;
  cnCode: string;
  operator: string;
  volume: string;
  emissions: string;
  calculationMethod: string;
  importDate: string;
}

const ImportsTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);

  const deleteRecord = (record: ImportTableData) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
    console.log("Delete clicked");
  };

  const getMenu = (record: ImportTableData) => {
    return (
      <Menu>
        <Menu.Item
          className={`${styles.text}`}
          key="edit"
          icon={<EditTwoTone />}
        >
          Edit
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
      </Menu>
    );
  };

  const columns: TableColumnsType<ImportTableData> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <span>{category}</span>,
    },
    {
      title: "CN Code",
      dataIndex: "cnCode",
      key: "cnCode",
      render: (cnCode: string) => <span>{cnCode}</span>,
    },
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
      render: (operator: string) => <span>{operator}</span>,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: string) => <span>{volume}</span>,
    },
    {
      title: "Emissions",
      dataIndex: "emissions",
      key: "emissions",
      render: (emissions: string) => <span>{emissions}</span>,
    },
    {
      title: "Calculation Method",
      dataIndex: "calculationMethod",
      key: "calculationMethod",
      render: (calculationMethod: string) => <span>{calculationMethod}</span>,
    },
    {
      title: "Import Date",
      dataIndex: "importDate",
      key: "importDate",
      render: (importDate: string) => <span>{importDate}</span>,
    },
    {
      dataIndex: "operation",
      width: "5%",
      render: (_: any, record: ImportTableData) => {
        return (
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
    <Form form={form} component={false}>
      <Table bordered={false} dataSource={data} columns={columns} />
    </Form>
  );
};

export default ImportsTable;
