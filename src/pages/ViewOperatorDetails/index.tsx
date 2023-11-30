import React, { useState } from "react";

import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Table, Form } from "antd";

import { ProducedGoodsData, ProducedGoodsColumn } from "./ProcedureGoodsData";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import CustomForm from "@/components/Form/CustomForm";
import styles from "@/assets/Styles";

interface AddressField {
  name: string;
  label: string;
  value: string | number;
}
interface InstallationInformations {
  name: string;
  street: string | number;
  streetNumber: string | number;
  city: string | number;
  postcode: string | number;
  country: string | number;
  poBox: string | number;
  installationID: string;
  economicActivity: string;
  "UN/LOCODE Number": string;
  imported_goods: string[];
  productionProcess: string[];
  emissionData: string[];
  carbonPricePaidData: string[];
  addressField: AddressField[];
}

interface InstallationInformationsProps {
  selectedRow: Partial<InstallationInformations>;
  setSelectedRow: any;
}

const ViewOperatorDetails: React.FC<InstallationInformationsProps> = ({
  selectedRow,
  setSelectedRow,
}) => {
  const [form] = Form.useForm();

  const [initialData, setInitialData] = useState<InstallationInformations>({
    name: selectedRow.name || "",
    street: selectedRow.addressField?.[0]?.value || "",
    streetNumber: selectedRow.addressField?.[1]?.value || "",
    city: selectedRow.addressField?.[2]?.value || "",
    country: selectedRow.addressField?.[3]?.value || "",
    poBox: selectedRow.addressField?.[4]?.value || "",
    postcode: selectedRow.addressField?.[5]?.value || "",
    installationID: selectedRow.installationID || "",
    economicActivity: selectedRow.economicActivity || "",
    "UN/LOCODE Number": selectedRow["UN/LOCODE Number"] || "",
    imported_goods: selectedRow.imported_goods || [],
    productionProcess: selectedRow.productionProcess || [],
    emissionData: selectedRow.emissionData || [],
    carbonPricePaidData: selectedRow.carbonPricePaidData || [],
    addressField: selectedRow.addressField || [],
  });

  const handleBackClick = () => {
    setSelectedRow(null);
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
  return (
    <>
      <h1 className={`${styles.heading1}`}>{selectedRow?.name}</h1>

      <div className={`${styles.box} gap-5`}>
        <div className="flex justify-between items-center">
          <PrimaryButton onClick={handleBackClick}>
            <ArrowLeftOutlined />
          </PrimaryButton>
        </div>
        <h2 className={`${styles.heading2}`}>{selectedRow?.name}</h2>

        <CustomForm<InstallationInformations>
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
                  label: "Installation ID Number",
                  name: "installationID",
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
                { type: "input", label: "City", name: "city", required: true },
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
            {
              title: "Geographical Data",
              fields: [
                {
                  type: "input",
                  label: "Latitude",
                  name: "latitude",
                  required: true,
                },
                {
                  type: "input",
                  label: "Longitude",
                  name: "longitude",
                  required: true,
                },
              ],
            },
          ]}
        />

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

export default ViewOperatorDetails;
