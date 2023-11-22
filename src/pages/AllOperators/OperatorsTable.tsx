import React, { useState } from "react";

import { Button, Form, Table, Dropdown, Popconfirm, Menu } from "antd";
import type { TableColumnsType } from "antd";
import { MoreOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

import { originData } from "./AllOperatorsData";

import EditOperator from "@/pages/AllOperators/EditOperator";
import styles from "@/assets/Styles";

export interface Item {
  key: string;
  name: string;
  city: string;
  country: string;
  imported_good: string[];
  Production_installation: string[];
  Phone_number: string;
  editable: boolean;
  dataIndex: string;
  title: string;
  eori: string;
  operatorId: number;
  streetName: string;
  streetNumber: string;
  zip: number;
  poBox: string;
  firstName: string;
  lastName: string;
  email: string;
}

const OperatorsTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [selectedRow, setSelectedRow] = useState<Item | null>(null); // New state to store the selected record
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const deleteRecord = (record: Item) => {
    const newData = data.filter((items) => items.key !== record.key);
    setData(newData);
    console.log("Delete clicked");
  };

  const showDrawer = (record: Item) => {
    setSelectedRow(record);
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setSelectedRow(null);
    setIsDrawerVisible(false);
  };

  const getMenu = (record: Item) => {
    return (
      <Menu>
        <Menu.Item
          className={`${styles.text}`}
          key="edit"
          icon={<EditTwoTone />}
          onClick={() => showDrawer(record)}
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      width: "15%",
      editable: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      width: "15%",
      editable: true,
    },
    {
      title: "Imported Good",
      dataIndex: "imported_good",
      width: "15%",
      editable: true,
      render: (importedGood: string[]) => <span>{importedGood.length}</span>,
    },
    {
      title: "Production Installation",
      dataIndex: "Production_installation",
      width: "25%",
      editable: true,
      render: (productionInstallation: string[]) => (
        <span>{productionInstallation.length}</span>
      ),
    },
    {
      dataIndex: "operation",
      width: "5%",
      render: (_: any, record: Item) => {
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

  const expandedRowRender = (record: Item) => {
    const expandableColumns: TableColumnsType<Item> = [
      {
        title: "CN Code",
        dataIndex: "imported_good",
        key: "imported_good",
        render: (importedGood: string[]) => (
          <div>
            {importedGood.map((code, index) => (
              <div key={index}>{code}</div>
            ))}
          </div>
        ),
      },
      {
        title: "Production Installation",
        dataIndex: "Production_installation",
        key: "Production_installation",
        render: (productionInstallation: string[]) => (
          <div>
            {productionInstallation.map((installation, index) => (
              <div key={index}>{installation}</div>
            ))}
          </div>
        ),
      },
    ];

    const data = [record];

    return (
      <Table
        bordered={false}
        columns={expandableColumns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.toString()}
      />
    );
  };

  return (
    <>
      {isDrawerVisible && (
        <EditOperator
          visible={isDrawerVisible}
          onCloseDrawer={onCloseDrawer}
          selectedRow={selectedRow}
        />
      )}
      <Form form={form} component={false}>
        <Table
          // className={`${styles.label} p-3 overflow-auto`}
          bordered={false}
          dataSource={data}
          columns={columns}
          expandable={{ expandedRowRender }}
        />
      </Form>
    </>
  );
};

export default OperatorsTable;
