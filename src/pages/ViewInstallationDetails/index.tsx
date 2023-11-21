import React, { useState } from "react";

import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  MoreOutlined,
  EditTwoTone,
  DeleteTwoTone,
  PlusOutlined,
} from "@ant-design/icons";

import { InstallationData, InstallationColumn } from "./InstallationData";
import AddNewInstallation from "./AddNewInstallation";
import RequestMissingData from "./RequestMissingData";
import AddEmissionData from "./AddEmissionData";

import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import {
  BasicInformation,
  ContactData,
} from "@/pages/AllOperators/AddNewOperator";

interface InstallationInformationsProps {
  basicInformation: BasicInformation;
  contactData: ContactData;
}

const ViewInstallationDetails: React.FC<InstallationInformationsProps> = ({
  basicInformation,
  contactData,
}) => {
  const [data, setData] = useState(InstallationData);
  const [openEmissionDataDrawer, setOpenEmissionDataDrawer] = useState(false);
  const [emissionData, setEmissionData] = useState<any>(null);
  const [openRequestDrawer, setOpenRequestDrawer] = useState(false);
  const [openInstallationDrawer, setOpenInstallationDrawer] = useState(false);

  const infofields = [
    { name: "legalName", label: "Legal Name*", value: basicInformation.name },
    {
      name: "UN/LOCODE_Number",
      label: "UN/LOCODE Number",
      value: "DEBER",
    },
    {
      name: "economicActivity",
      label: "Economic Activity",
      value: "Economic",
    },
  ];

  const contactFields = [
    { name: "firstName", label: "First Name", value: contactData.firstName },
    { name: "lastName", label: "Last Name", value: contactData.lastName },
    { name: "email", label: "Email", value: contactData.email },
    {
      name: "phoneNumber",
      label: "Phone Number",
      value: contactData.phone_number,
    },
  ];

  const addressFields = [
    { name: "street", label: "Street", value: basicInformation.streetName },
    {
      name: "streetNumber",
      label: "Street Number",
      value: basicInformation.streetNumber,
    },
    { name: "city", label: "City", value: basicInformation.city },
    { name: "postcode", label: "Postcode", value: basicInformation.poBox },
    {
      name: "country",
      label: "Country",
      value: basicInformation.country,
    },
    { name: "poBox", label: "PO Box", value: basicInformation.poBox },
  ];

  const deleteRecord = (record: any) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
    console.log("Delete clicked");
  };

  const showRequestDrawer = () => {
    setOpenRequestDrawer(true);
  };

  const onCloseRequestDrawer = () => {
    setOpenRequestDrawer(false);
  };

  const onCloseInstallationDrawer = () => {
    setOpenInstallationDrawer(false);
  };

  const showInstallationDrawer = () => {
    setOpenInstallationDrawer(true);
  };

  const onCloseEmissionDrawer = () => {
    setOpenEmissionDataDrawer(false);
  };

  const showEmissionDrawer = (cnCode: string) => {
    setOpenEmissionDataDrawer(true);
    setEmissionData(cnCode);
  };

  const getMenu = (record: any) => {
    return (
      <Menu>
        <Menu.Item
          className={`${styles.text}`}
          key="edit"
          icon={<EditTwoTone />}
          // onClick={() => showDrawer(record)}
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

  const expandedRowRender = (record: any) => {
    const expandableColumns: TableColumnsType<any> = [
      {
        title: "CN Code",
        dataIndex: "imported_good",
        key: "imported_good",
        render: (importedGood: string[]) => (
          <div className="flex flex-col gap-5">
            {importedGood.map((code, index) => (
              <div key={index}>{code}</div>
            ))}
          </div>
        ),
      },
      {
        title: "Emission Data",
        dataIndex: "emissionData",
        key: "emissionData",
        render: (emissionData: string[], record: any) => (
          <div className="flex flex-col gap-5">
            {emissionData.map((data, index) =>
              data === "Available" ? (
                <PrimaryButton key={index}>{data}</PrimaryButton>
              ) : (
                <SecondaryButton
                  key={index}
                  onClick={() =>
                    showEmissionDrawer(record.imported_good[index])
                  }
                >
                  {data}
                </SecondaryButton>
              ),
            )}
          </div>
        ),
      },
      {
        title: "Production Process",
        dataIndex: "productionProcess",
        key: "productionProcess",
        render: (productionProcess: string[]) => (
          <div className="flex flex-col gap-5">
            {productionProcess.map((data, index) =>
              data === "Available" ? (
                <PrimaryButton key={index}>{data}</PrimaryButton>
              ) : (
                <SecondaryButton key={index}>{data}</SecondaryButton>
              ),
            )}
          </div>
        ),
      },
      {
        title: "Carbon Price Paid Data",
        dataIndex: "carbonPricePaidData",
        key: "carbonPricePaidData",
        render: (carbonPricePaidData: string[]) => (
          <div className="flex flex-col gap-5">
            {carbonPricePaidData.map((data, index) =>
              data === "Available" ? (
                <PrimaryButton key={index}>{data}</PrimaryButton>
              ) : (
                <SecondaryButton key={index}>{data}</SecondaryButton>
              ),
            )}
          </div>
        ),
      },
      {
        dataIndex: "operation",
        width: "5%",
        render: (_: any, record: any) => {
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
      <AddNewInstallation
        visible={openInstallationDrawer}
        onCloseDrawer={onCloseInstallationDrawer}
      />

      <RequestMissingData
        visible={openRequestDrawer}
        onCloseDrawer={onCloseRequestDrawer}
      />

      <AddEmissionData
        visible={openEmissionDataDrawer}
        onCloseDrawer={onCloseEmissionDrawer}
        cnCode={emissionData}
      />
      <h1 className={`${styles.heading1}`}>Add New Operator</h1>

      <div className={`${styles.box} my-[5vh]`}>
        <div className="flex justify-between items-center">
          <PrimaryButton>
            <ArrowLeftOutlined />
          </PrimaryButton>
          <PrimaryButton onClick={showRequestDrawer}>
            <PlusOutlined />
            Request missing data from your Operator
          </PrimaryButton>
        </div>
        <h2 className={`${styles.heading2}`}>{basicInformation?.name}</h2>

        {/* Basic Information */}
        <h3 className={`${styles.heading3}`}>Basic Information</h3>
        <div className="flex flex-wrap gap-y-10">
          {infofields.map((field) => (
            <div
              className="w-1/3 flex flex-col items-left gap-3"
              key={String(field.name)}
            >
              <p className={`${styles.label}`}>{field.label}</p>
              <p className={`${styles.text}`}>{field.value}</p>
            </div>
          ))}
        </div>

        {/* Contact Data */}
        <h3 className={`${styles.heading3}`}>Contact Data</h3>
        <div className="flex flex-wrap gap-y-10">
          {contactFields.map((field) => (
            <div
              className="w-1/3 flex flex-col items-left gap-3"
              key={String(field.name)}
            >
              <p className={`${styles.label}`}>{field.label}</p>
              <p className={`${styles.text}`}>{field.value}</p>
            </div>
          ))}
        </div>

        {/* Address Data */}
        <h3 className={`${styles.heading3}`}>Address Data</h3>
        <div className="flex flex-col flex-wrap ">
          <div className="flex">
            {addressFields.slice(0, 3).map((field) => (
              <div
                className="w-1/3 flex flex-col items-left gap-3"
                key={field.name}
              >
                <p className={`${styles.label}`}>{field.label}</p>
                <p className={`${styles.text}`} key={field.name}>
                  {field.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex">
            {addressFields.slice(3).map((field) => (
              <div
                className="w-1/3 flex flex-col items-left gap-3"
                key={field.name}
              >
                <p className={`${styles.label}`}>{field.label}</p>
                <p className={`${styles.text}`} key={field.name}>
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Line */}
        <hr className="m-0 border border-solid border-nao_light_gray" />

        {/* Produced Goods */}
        <div className="flex justify-between items-center">
          <h3 className={`${styles.heading3}`}>
            Installations <QuestionCircleOutlined className="text-sm" />
          </h3>
          <PrimaryButton onClick={showInstallationDrawer}>
            <PlusOutlined />
            Add new Installation
          </PrimaryButton>
        </div>

        {/* Line */}
        <hr className="m-0 border border-solid border-nao_light_gray" />

        <Table
          dataSource={InstallationData}
          columns={InstallationColumn}
          expandable={{ expandedRowRender }}
          pagination={false}
        />
      </div>
    </>
  );
};

export default ViewInstallationDetails;
