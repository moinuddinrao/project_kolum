import React, { useState } from "react";

import { Button, Form, Table, Dropdown, Popconfirm, Menu } from "antd";
import {
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

import EditableCell from "./EditableCell";
import { originData } from "./AllOperatorsData";

import styles from "@/assets/Styles";

export interface Item {
  key: string;
  name: string;
  city: string;
  country: string;
  imported_good: string;
  Production_installation: string;
  Phone_number: string;
  editable: boolean;
  dataIndex: string;
  title: string;
  eori: string;
  portalId: number;
  streetName: string;
  streetNumber: string;
  zip: number;
  poBox: string | null;
}

const OperatorsTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      name: "",
      city: "",
      country: "",
      imported_good: "",
      Production_installation: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
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
          icon={<EditTwoTone />}
          onClick={() => edit(record)}
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
    },
    {
      title: "Production Installation",
      dataIndex: "Production_installation",
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        className={`${styles.label} p-3 overflow-auto`}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName={(record) => (isEditing(record) ? "editable-row" : "")}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default OperatorsTable;
