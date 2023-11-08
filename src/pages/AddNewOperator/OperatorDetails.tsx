import React, { useState } from "react";

import {
  ArrowLeftOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

import { GoodsData, GoodsColumn } from "./OperatorData";
import { InstallationData, InstallationColumn } from "./OperatorData";
import InstallationDetail from "../OperatorInstallation";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

interface Operatorinformation {
  name: string | null;
  label: string | null;
  eori: string | null;
  portalId: number | null;
  streetName: string | null;
  streetNumber: string | null;
  addressAddition: string | null;
  Phone_number: string | null;
  city: string | null;
  zip: number | null;
  country: string | null;
  poBox: string | null;
}

interface OperatorinformationProps {
  selectedData: Partial<Operatorinformation>;
  setSelectedData: any;
}

const OperatorDetails: React.FC<OperatorinformationProps> = ({
  selectedData,
  setSelectedData,
}) => {
  const [selectedRow, setSelectedRow] = useState<{
    key: string;
    name: string;
    city: string;
    country: string;
    installationID: string;
    economicActivity: string;
    "UN/LOCODE Number": string;
  } | null>(null);

  const handleBackClick = () => {
    console.log(selectedData);
    setSelectedData(null);
  };

  const infofields = [
    { name: "legalName", label: "Legal Name*", value: selectedData.label },
    {
      name: "locodeNumber",
      label: (
        <span>
          UN/LOCODE Number <QuestionCircleOutlined />
        </span>
      ),
      value: selectedData.eori,
    },
    {
      name: "economicActivity",
      label: "Economic Activity",
      value: "Steel Production",
    },
  ];

  const contactFields = [
    { name: "firstName", label: "First Name", value: selectedData.label },
    { name: "email", label: "Email", value: `${selectedData.label}@gmail.com` },
    {
      name: "phoneNumber",
      label: "Phone Number",
      value: selectedData.Phone_number,
    },
  ];

  const addressFields = [
    { name: "street", label: "Street", value: selectedData.streetName },
    {
      name: "streetNumber",
      label: "Street Number",
      value: selectedData.streetNumber,
    },
    { name: "city", label: "City", value: selectedData.city },
    { name: "postcode", label: "Postcode", value: selectedData.zip },
    {
      name: "country",
      label: "Country of Establishment",
      value: selectedData.country,
    },
    { name: "poBox", label: "PO Box", value: "" },
  ];

  function handleonClick(record: {
    key: string;
    name: string;
    city: string;
    country: string;
    installationID: string;
    economicActivity: string;
    "UN/LOCODE Number": string;
  }) {
    setSelectedRow(() => ({ ...record, addressField: addressFields }));
  }

  return (
    <>
      {selectedRow ? (
        <InstallationDetail
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      ) : (
        <>
          <h1 className={`${styles.heading1}`}>Add New Operator</h1>

          <div className={`${styles.box} gap-5`}>
            <div className="flex justify-between items-center">
              <PrimaryButton onClick={handleBackClick}>
                <ArrowLeftOutlined />
              </PrimaryButton>
              <PrimaryButton>
                <PlusOutlined />
                Add {selectedData.label} to your list of operators
              </PrimaryButton>
            </div>
            <h2 className={`${styles.heading2}`}>{selectedData?.label}</h2>

            {/* Basic Information */}
            <h3 className={`${styles.heading3}`}>Basic Information</h3>
            <div className="flex flex-row flex-wrap gap-y-10">
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
                  <div className="w-1/3" key={field.name}>
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

            {/* Good */}
            <div className={`flex flex-col gap-5`}>
              <h3 className={`${styles.heading3}`}>
                Goods <QuestionCircleOutlined className="text-sm" />
              </h3>

              {/* Line */}
              <hr className="m-0 border border-solid border-nao_light_gray" />

              <Table
                className={`${styles.text}`}
                dataSource={GoodsData}
                columns={GoodsColumn}
                pagination={false}
              />

              {/* Installation */}
              <h3 className={`${styles.heading3} `}>
                Installation <QuestionCircleOutlined className="text-sm" />
              </h3>

              {/* Line */}
              <hr className="m-0 border border-solid border-nao_light_gray" />

              <Table
                className={`${styles.text}`}
                dataSource={InstallationData}
                columns={InstallationColumn}
                pagination={false}
                onRow={(record) => ({
                  onClick: () => {
                    handleonClick(record);
                  },
                })}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OperatorDetails;
