import React from "react";

import { Form, Input } from "antd";

import { CompanyData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

interface CompanyDataProps {
  goBack: () => void;
  onSuccess: (values: CompanyData) => void;
}

const CompanyDataForm = ({ goBack, onSuccess }: CompanyDataProps) => {
  return (
    <Form
      layout="vertical"
      onFinish={onSuccess}
      className="w-full flex flex-col justify-between gap-10"
      size="large"
    >
      <div className="w-full flex flex-col items-center gap-10">
        {/* Section Heading */}
        <h2 className={`max-w-xl ${styles.heading2} text-center`}>
          Next, please fill in your company data
        </h2>

        <div className="w-full flex justify-evenly gap-10">
          {/* Company Name */}
          <Form.Item
            name="name"
            className={`h-fit w-3/12 m-0 p-0`}
            rules={[
              {
                required: true,
                message: "Please input your company's legal name!",
              },
            ]}
          >
            <Input placeholder="Company's Legal Name" />
          </Form.Item>

          {/* EORI Number */}
          <Form.Item
            name="eori"
            className={`h-fit w-3/12 m-0 p-0`}
            rules={[
              { required: true, message: "Please input your EORI number!" },
            ]}
          >
            <Input placeholder="Company's EORI Number" />
          </Form.Item>

          {/* Trader Portal ID */}
          <Form.Item name="portalId" className={`h-fit w-3/12 m-0 p-0`}>
            <Input placeholder="Company's Trader Portal ID" />
          </Form.Item>
        </div>

        {/* Company Address Section */}
        <div className="w-full flex flex-col gap-10">
          {/* Sub Section Heading */}
          <h3 className={`${styles.heading3} text-center`}>Company Address</h3>

          <div className="w-full flex justify-evenly gap-10">
            {/* Street Name */}
            <Form.Item name="streetName" className={`h-fit w-3/12 m-0 p-0`}>
              <Input placeholder="Street Name" />
            </Form.Item>

            {/* Street Number */}
            <Form.Item name="streetNumber" className={`h-fit w-3/12 m-0 p-0`}>
              <Input placeholder="Street Number" />
            </Form.Item>

            {/* City */}
            <Form.Item name="city" className={`h-fit w-3/12 m-0 p-0`}>
              <Input placeholder="City" />
            </Form.Item>
          </div>

          <div className="w-full flex justify-evenly gap-10">
            {/* ZIP Code */}
            <Form.Item name="zip" className={`h-fit w-3/12 m-0 p-0`}>
              <Input placeholder="ZIP Code" />
            </Form.Item>

            {/* Country */}
            <Form.Item name="country" className={`h-fit w-3/12 m-0 p-0`}>
              <Input placeholder="Country" />
            </Form.Item>

            {/* PO Box */}
            <Form.Item name="poBox" className={`h-fit w-3/12 m-0 p-0`}>
              <Input placeholder="PO Box" />
            </Form.Item>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5">
        {/* Back Button */}
        <SecondaryButton onClick={goBack} className="w-fit h-fit !px-5">
          Back
        </SecondaryButton>

        {/* Next Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default CompanyDataForm;
