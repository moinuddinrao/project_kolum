import React, { useState } from "react";

import { Form } from "antd";
import { QuestionCircleOutlined, DownOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import CustomForm from "@/components/Form/CustomForm";

interface Company {
  name: string;
  eori: string;
  portalId: number | null;
  streetName: string | null;
  streetNumber: string | null;
  addressAddition: string | null;
  city: string | null;
  zip: number | null;
  country: string | null;
  poBox: string | null;
}

const Dashboard = () => {
  const [form] = Form.useForm();

  // State to track form values
  const [initialData, setInitialData] = useState<Company>({
    name: "kolum.earth",
    eori: "DE123456789",
    portalId: 123456789,
    streetName: "Kolum Street",
    streetNumber: "1",
    addressAddition: "1st Floor",
    city: "Berlin",
    zip: 12345,
    country: "Germany",
    poBox: null,
  });

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
    <section id="company-data" className={`${styles.section}`}>
      <h1 className={`${styles.heading1}`}>Company Data</h1>

      <div className={`${styles.box}`}>
        <h2 className={`${styles.heading2}`}>kolum.earth</h2>

        {/* Legal Information */}
        <CustomForm<Company>
          form={form}
          initialValues={initialData}
          onSubmit={handleSubmit}
          formFields={[
            {
              title: "Legal Information",
              fields: [
                {
                  type: "input",
                  label: "Company Name",
                  name: "name",
                  required: true,
                },
                {
                  type: "input",
                  label: "EORI Number",
                  name: "eori",
                  required: true,
                },
                {
                  type: "input",
                  label: "Portal ID",
                  name: "portalId",
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
                  name: "streetName",
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
                  label: "Zip Code",
                  name: "zip",
                  required: true,
                },
                {
                  type: "input",
                  label: "Country",
                  name: "country",
                  required: true,
                },
                { type: "input", label: "PO Box", name: "poBox" },
              ],
            },
          ]}
        />

        {/* Line */}
        <hr className="m-0 border border-solid border-nao_light_gray" />

        {/* Team Members */}
        <div className={`flex flex-col gap-5`}>
          <h3 className={`${styles.heading3}`}>Team Members</h3>

          {/* Team Members List */}
          <p className={`${styles.text}`}>Manage your team members here</p>
          <div className="flex items-left gap-3">
            <PrimaryButton className="bg-nao_turquoise opacity-50 pointer-events-none cursor-not-allowed">
              Add new member
            </PrimaryButton>
            <p className={`${styles.text}`}>coming soon</p>
          </div>

          {/* Line */}
          <hr className="m-0 border border-solid border-nao_light_gray" />

          {/* Table Header */}
          <div className="flex">
            <p className={`${styles.label} w-1/3`}>User</p>
            <p className={`${styles.label} w-1/3`}>
              Access Level <QuestionCircleOutlined />
            </p>
          </div>

          {/* Line */}
          <hr className="m-0 border border-solid border-nao_light_gray" />

          {/* Table Row */}
          <div className="flex">
            <p className={`${styles.text} w-1/3`}>John Doe</p>
            <p className={`${styles.text} w-1/3`}>
              Admin <DownOutlined className="text-sm" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
