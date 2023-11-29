import React from "react";

import { Form, Collapse } from "antd";

import { BasicInformation } from ".";

import InputCollapse from "@/components/Collapse/InputCollapse";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const BasicField: Field[] = [
  {
    name: "name",
    placeholder: "Operator Name*",
    value: "",
    required: true,
  },
  {
    name: "operatorId",
    placeholder: "Operator ID Number*",
    value: "",
    required: true,
  },
];

const addressFields: Field[] = [
  { name: "streetName", placeholder: "Street", value: "" },
  {
    name: "streetNumber",
    placeholder: "Street Number",
    value: "",
  },
  { name: "city", placeholder: "City", value: "" },
  {
    name: "country",
    placeholder: "Country",
    value: "",
  },
  { name: "poBox", placeholder: "P/O Box", value: "" },
];

const BasicInformationForm = ({ onSuccess }: BasicInformationProps) => {
  const [form] = Form.useForm();

  // Handle Submit form  submission
  const handleSubmit = async (values: BasicInformation) => {
    try {
      await form.validateFields();

      // Call the onSuccess function
      onSuccess(values);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle failed form submission
  const handleFailedSubmit = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <h5 className={`${styles.heading3}`}>Basic Information</h5>

      <p className={`${styles.text}`}>
        First, please fill in some basic information and address data for your
        Operator.
      </p>

      <Collapse accordion>
        {/* First Panel: Basic Information */}
        <Panel header="Basic Information" key="0">
          <InputCollapse fields={BasicField} />
        </Panel>

        {/* Second Panel: Address Data */}
        <Panel header="Address Data" key="1">
          <InputCollapse fields={addressFields} />
        </Panel>
      </Collapse>

      <div className="flex justify-end gap-5">
        {/*Next Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default BasicInformationForm;
