import React from "react";

import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";

import { ProducedGoodsData, ProducedGoodsColumn } from "./InstallationData";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

interface AddressField {
  name: string;
  label: string;
  value: string | number;
}

interface InstallationInformations {
  name: string;
  city: string;
  country: string;
  installationID: string;
  economicActivity: string;
  "UN/LOCODE Number": string;
  addressField: AddressField[];
}

interface InstallationInformationsProps {
  selectedRow: Partial<InstallationInformations>;
  setSelectedRow: any;
}

const ViewInstallationDetails: React.FC<InstallationInformationsProps> = ({
  selectedRow,
  setSelectedRow,
}) => {
  const handleBackClick = () => {
    setSelectedRow(null);
  };

  const infofields = [
    { name: "legalName", label: "Legal Name*", value: selectedRow.name },
    {
      name: "Installation_ID",
      label: (
        <span>
          Installation ID Number <QuestionCircleOutlined />
        </span>
      ),
      value: selectedRow.installationID,
    },
    {
      name: "UN/LOCODE_Number",
      label: "UN/LOCODE Number",
      value: selectedRow["UN/LOCODE Number"],
    },
    {
      name: "economicActivity",
      label: "Economic Activity",
      value: selectedRow.economicActivity,
    },
  ];

  const addressFields = selectedRow.addressField
    ? selectedRow.addressField.map((field) => ({
        name: field.name,
        label: field.label,
        value: field.value,
      }))
    : [];

  const geographicalFields = [
    { name: "latitude", label: "Latitude", value: "41.40338" },
    { name: "longitude", label: "Longitude", value: "2.17403" },
  ];

  return (
    <>
      <h1 className={`${styles.heading1}`}>Add New Operator</h1>

      <div className={`${styles.box} gap-5`}>
        <div className="flex justify-between items-center">
          <PrimaryButton onClick={handleBackClick}>
            <ArrowLeftOutlined />
          </PrimaryButton>
        </div>
        <h2 className={`${styles.heading2}`}>{selectedRow?.name}</h2>

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

        {/* Address Data */}
        <h3 className={`${styles.heading3}`}>Address Data</h3>
        <div className="flex flex-col flex-wrap">
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

        {/* Geographical Coordinates */}
        <h3 className={`${styles.heading3}`}>Geographical Coordinates</h3>
        <div className="flex flex-row flex-wrap gap-y-10">
          {geographicalFields.map((field) => (
            <div
              className="w-1/3 flex flex-col items-left gap-3"
              key={String(field.name)}
            >
              <p className={`${styles.label}`}>{field.label}</p>
              <p className={`${styles.text}`}>{field.value}</p>
            </div>
          ))}
        </div>

        {/* Line */}
        <hr className="m-0 border border-solid border-nao_light_gray" />

        {/* Produced Goods */}
        <h3 className={`${styles.heading3}`}>
          Produced Goods <QuestionCircleOutlined className="text-sm" />
        </h3>

        {/* Line */}
        <hr className="m-0 border border-solid border-nao_light_gray" />

        <Table
          className={`${styles.text}`}
          dataSource={ProducedGoodsData}
          columns={ProducedGoodsColumn}
          pagination={false}
        />
      </div>
    </>
  );
};

export default ViewInstallationDetails;
