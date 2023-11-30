import React, { useState } from "react";

import { Button, Dropdown, Menu, Popconfirm, Table, Form } from "antd";
import type { TableColumnsType } from "antd";
import {
  MoreOutlined,
  EditTwoTone,
  DeleteTwoTone,
  PlusOutlined,
  ArrowLeftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { InstallationData, InstallationColumn } from "./InstallationData";
import AddCarbonPricePaidData from "./AddCarbonPriceData";
import AddNewInstallation from "./AddNewInstallation";
import RequestMissingData from "./RequestMissingData";
import AddEmissionData from "./AddEmissionData";
import AddProcessData from "./AddProcessData";

import ViewOperatorDetails from "@/pages/ViewOperatorDetails";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import CustomForm from "@/components/Form/CustomForm";
import styles from "@/assets/Styles";
import {
  BasicInformation,
  ContactData,
} from "@/pages/AllOperators/AddNewOperator";

interface InstallationInformationsProps {
  basicInformation: BasicInformation;
  contactData: ContactData;
}

interface Record {
  key: string;
  name: string;
  installationID: string;
  economicActivity: string;
  "UN/LOCODE Number": string;
  imported_good: string[];
  productionProcess: string[];
  emissionData: string[];
  carbonPricePaidData: string[];
}

interface OperatorInformations {
  name: string;
  economicActivity: string;
  "UN/LOCODE Number": string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  street: string | number;
  streetNumber: string | number;
  city: string | number;
  postcode: string | number;
  country: string | number;
  poBox: string | number;
}

const ViewInstallationDetails: React.FC<InstallationInformationsProps> = ({
  basicInformation,
  contactData,
}) => {
  const [form] = Form.useForm();

  const [data, setData] = useState(InstallationData);
  const [openEmissionDataDrawer, setOpenEmissionDataDrawer] = useState(false);
  const [openProductionProcessDrawer, setOpenProductionProcessDrawer] =
    useState(false);
  const [openCarbonPriceDrawer, setOpenCarbonPriceDrawer] = useState(false);
  const [cnCode, setCnCode] = useState<any>(null);
  const [openRequestDrawer, setOpenRequestDrawer] = useState(false);
  const [openInstallationDrawer, setOpenInstallationDrawer] = useState(false);
  const [initialData, setInitialData] = useState<OperatorInformations>({
    name: basicInformation.name ?? "",
    street: basicInformation.streetName ?? "",
    streetNumber: basicInformation.streetNumber ?? "",
    city: basicInformation.city ?? "",
    postcode: 342442,
    country: basicInformation.country ?? "",
    poBox: basicInformation.poBox ?? "",
    firstName: contactData.firstName ?? "",
    lastName: contactData.lastName ?? "",
    email: contactData.email ?? "",
    phone_number: contactData.phone_number ?? "",
    economicActivity: "",
    "UN/LOCODE Number": "",
  });

  const [selectedRow, setSelectedRow] = useState<{
    key: string;
    name: string;
    installationID: string;
    economicActivity: string;
    "UN/LOCODE Number": string;
    imported_good: string[];
    productionProcess: string[];
    emissionData: string[];
    carbonPricePaidData: string[];
  } | null>(null);

  const addressFields = [
    { name: "street", label: "Street", value: basicInformation.streetName },
    {
      name: "streetNumber",
      label: "Street Number",
      value: basicInformation.streetNumber,
    },
    { name: "city", label: "City", value: basicInformation.city },
    {
      name: "country",
      label: "Country",
      value: basicInformation.country,
    },
    { name: "poBox", label: "PO Box", value: basicInformation.poBox },
    { name: "postcode", label: "Postcode", value: 342442 },
  ];

  const handleonClick = (record: Record) => {
    setSelectedRow(() => ({ ...record, addressField: addressFields }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setInitialData({ ...initialData, ...values });
      console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

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
    setCnCode(cnCode);
  };

  const onCloseProductionProcessDrawer = () => {
    setOpenProductionProcessDrawer(false);
  };

  const showProductionProcessDrawer = (cnCode: string) => {
    setOpenProductionProcessDrawer(true);
    setCnCode(cnCode);
  };

  const onCloseCarbonPricePaidDrawer = () => {
    setOpenCarbonPriceDrawer(false);
  };

  const showCarbonPricePaidDrawer = (cnCode: string) => {
    setOpenCarbonPriceDrawer(true);
    setCnCode(cnCode);
  };

  const getMenu = (record: any) => {
    return (
      <Menu>
        <Menu.Item
          className={`${styles.text}`}
          key="edit"
          icon={<EditTwoTone />}
          onClick={() => handleonClick(record)}
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
                  Add
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
                <SecondaryButton
                  key={index}
                  onClick={() =>
                    showProductionProcessDrawer(record.imported_good[index])
                  }
                >
                  Add
                </SecondaryButton>
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
          <div className="flex flex-col gap-5 justify-center">
            {carbonPricePaidData.map((data, index) =>
              data === "Available" ? (
                <PrimaryButton key={index}>{data}</PrimaryButton>
              ) : (
                <SecondaryButton
                  key={index}
                  onClick={() =>
                    showCarbonPricePaidDrawer(record.imported_good[index])
                  }
                >
                  Add
                </SecondaryButton>
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
      {selectedRow ? (
        <ViewOperatorDetails
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      ) : (
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
            cnCode={cnCode}
          />

          <AddProcessData
            visible={openProductionProcessDrawer}
            onCloseDrawer={onCloseProductionProcessDrawer}
            cnCode={cnCode}
          />

          <AddCarbonPricePaidData
            visible={openCarbonPriceDrawer}
            onCloseDrawer={onCloseCarbonPricePaidDrawer}
            cnCode={cnCode}
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

            <CustomForm<OperatorInformations>
              form={form}
              initialValues={initialData}
              onSubmit={handleSubmit}
              formFields={[
                {
                  title: "Basic Information",
                  fields: [
                    {
                      type: "input",
                      label: "Legal Name",
                      name: "name",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "UN/LOCODE Number",
                      name: "UN/LOCODE Number",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Economic Activity",
                      name: "economicActivity",
                      required: true,
                    },
                  ],
                },
                {
                  title: "Contact Data",
                  fields: [
                    {
                      type: "input",
                      label: "First Name",
                      name: "firstName",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Last Name",
                      name: "lastName",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Email",
                      name: "email",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Phone Number",
                      name: "phone_number",
                      required: true,
                    },
                  ],
                },
                {
                  title: "Address Data",
                  fields: [
                    {
                      type: "input",
                      label: "Street Name",
                      name: "street",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Street Number",
                      name: "streetNumber",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "City",
                      name: "city",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Post Code",
                      name: "postcode",
                      required: true,
                    },
                    {
                      type: "input",
                      label: "Country",
                      name: "country",
                      required: true,
                    },
                  ],
                },
              ]}
            />

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
      )}
    </>
  );
};

export default ViewInstallationDetails;
