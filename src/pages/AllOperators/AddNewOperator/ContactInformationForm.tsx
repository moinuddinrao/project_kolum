import React from "react";

import { Form } from "antd";

import { ContactData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

interface ContactDataProps {
  onSuccess: (values: ContactData) => void;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const ContactInformationForm = ({ onSuccess }: ContactDataProps) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const contactFields: Field[] = [
    {
      name: "firstName",
      placeholder: "First Name of Contact Person",
      value: "",
    },
    {
      name: "lastName",
      placeholder: "Last Name of Contact Person",
      value: "",
    },
    { name: "email", placeholder: "Email", value: "" },
    { name: "phone_number", placeholder: "Phone", value: "" },
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
        fields={contactFields}
        defaultActiveKey={["1"]}
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

export default ContactInformationForm;
