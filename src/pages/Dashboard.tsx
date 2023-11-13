import React, { useEffect, useState } from "react";

import { Form } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import CustomForm from "@/components/Form/CustomForm";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

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

const Dashboard: React.FC = () => {
  const [form] = Form.useForm();

  // State to track edit mode
  const [isUpdate, setIsUpdate] = useState(false);

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

  // Update form values when initialData changes
  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue(initialData);
    }
  }, [isUpdate, form, initialData]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setInitialData({ ...initialData, ...values });
      console.log("Success:", values);
      setIsUpdate(false);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  return (
    <section id="company-data" className={`${styles.section}`}>
      <h1 className={`${styles.heading1}`}>Company Data</h1>

      <div className={`${styles.box}`}>
        <div className="flex items-center justify-between">
          {/* Section Heading */}
          <h2 className={`${styles.heading2}`}>kolum.earth</h2>

          {/* Action Buttons */}
          {isUpdate ? (
            <div className="flex gap-5">
              <PrimaryButton
                onClick={() => form.submit()}
                className="flex justify-center items-center"
              >
                Save <SaveOutlined />
              </PrimaryButton>

              <SecondaryButton
                onClick={setIsUpdate.bind(null, !isUpdate)}
                className="flex justify-center items-center"
              >
                Close <CloseOutlined />
              </SecondaryButton>
            </div>
          ) : (
            <PrimaryButton
              onClick={setIsUpdate.bind(null, !isUpdate)}
              className="flex justify-center items-center"
            >
              Edit <EditOutlined />
            </PrimaryButton>
          )}
        </div>

        {/* Legal Information */}
        <CustomForm<Company>
          form={form}
          initialValues={initialData}
          isUpdate={isUpdate}
          onSubmit={handleSubmit}
          formFields={[
            {
              title: "Legal Information",
              fields: [
                { label: "Company Name", name: "name", required: true },
                { label: "EORI Number", name: "eori", required: true },
                { label: "Portal ID", name: "portalId", required: true },
              ],
            },
            {
              title: "Address Data",
              fields: [
                { label: "Street Name", name: "streetName", required: true },
                {
                  label: "Street Number",
                  name: "streetNumber",
                  required: true,
                },
                { label: "City", name: "city", required: true },
                { label: "Zip Code", name: "zip", required: true },
                { label: "Country", name: "country", required: true },
                { label: "PO Box", name: "poBox" },
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
