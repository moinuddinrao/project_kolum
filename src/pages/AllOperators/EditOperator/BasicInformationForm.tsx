import React from "react";

import { Form } from "antd";

import { Operatorinformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

interface BasicInformationFormProps {
  onSuccess: (values: Operatorinformation) => void;
  selectedRow?: Operatorinformation | null;
}

const BasicInformationForm = ({
  onSuccess,
  selectedRow,
}: BasicInformationFormProps) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  type Field = {
    name: string;
    placeholder: string;
    value: string | number | undefined;
    required?: boolean; // Add this line
  };

  const BasicField: Field[] = [
    {
      name: "name",
      placeholder: "Operator Name*",
      value: selectedRow?.name,
      required: true,
    },
    {
      name: "operatorId",
      placeholder: "Operator ID Number*",
      value: selectedRow?.operatorId,
      required: true,
    },
  ];

  const addressFields: Field[] = [
    { name: "street", placeholder: "Street", value: selectedRow?.streetName },
    {
      name: "streetNumber",
      placeholder: "Street Number",
      value: selectedRow?.streetNumber,
    },
    { name: "city", placeholder: "City", value: selectedRow?.city },
    { name: "postcode", placeholder: "Postcode", value: selectedRow?.eori },
    {
      name: "country",
      placeholder: "Country",
      value: selectedRow?.country,
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
        fields={BasicField}
        defaultActiveKey={["1"]}
        onChange={onChange}
      />
      <InputCollapse
        header="Address Data"
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
