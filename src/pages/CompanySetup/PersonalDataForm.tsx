import React from "react";

import { Form, Input, Select } from "antd";

import { PersonalData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

interface PersonalDataProps {
  goBack: () => void;
  onSuccess: (values: PersonalData) => void;
}

const PersonalDataForm = ({ goBack, onSuccess }: PersonalDataProps) => {
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
          First, please add some personal information about yourself
        </h2>

        <div className="w-full flex justify-evenly gap-10">
          {/* First Name */}
          <Form.Item
            name="first"
            className={`h-fit w-3/12 m-0 p-0`}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            name="last"
            className={`h-fit w-3/12 m-0 p-0`}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>

        <div className="w-full flex justify-evenly gap-10">
          {/* Job Title */}
          <Form.Item
            name="jobTitle"
            className={`h-fit w-3/12 m-0 p-0`}
            rules={[
              { required: true, message: "Please input your job title!" },
            ]}
          >
            <Input placeholder="Job Title" />
          </Form.Item>

          {/* CBAM Role */}
          <Form.Item
            name="CBAMRole"
            className={`h-fit w-3/12 m-0 p-0`}
            rules={[
              { required: true, message: "Please input your CBAM role!" },
            ]}
          >
            <Select placeholder="CBAM Role">
              <Select.Option value="Importer for all goods">
                Importer for all goods
              </Select.Option>
              <Select.Option value="Importer for some goods">
                Importer for some goods
              </Select.Option>
              <Select.Option value="Representative for all goods">
                Representative for all goods
              </Select.Option>
              <Select.Option value="Representative for some goods">
                Representative for some goods
              </Select.Option>
            </Select>
          </Form.Item>
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

export default PersonalDataForm;
