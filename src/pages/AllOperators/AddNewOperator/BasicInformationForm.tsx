import React from "react";

import { Form } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const BasicInformationForm = ({ onSuccess }: BasicInformationProps) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
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

  return (
    <Form
      onFinish={onSuccess}
      className="w-full flex flex-col justify-between gap-10"
    >
      <h5 className={`${styles.heading3}`}>Basic Information</h5>

      <p className={`${styles.text}`}>
        First, please fill in some basic information and address data for your
        Operator.
      </p>
      <InputCollapse
        header="Basic Information"
        label=""
        fields={BasicField}
        defaultActiveKey={["1"]}
        onChange={onChange}
      />
      <InputCollapse
        header="Address Data"
        label=""
        fields={addressFields}
        defaultActiveKey={["0"]}
        onChange={onChange}
      />
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
