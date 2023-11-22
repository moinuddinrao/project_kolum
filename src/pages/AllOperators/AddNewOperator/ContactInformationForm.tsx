import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { ContactData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

const { Panel } = Collapse;

interface ContactDataProps {
  onSuccess: (values: ContactData) => void;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
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

const ContactInformationForm = ({ onSuccess }: ContactDataProps) => {
  const [activeKey, setActiveKey] = useState(0);

  const handleNext = async () => {
    try {
      await form.validateFields();
      setActiveKey(activeKey + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={onSuccess}
      className="w-full flex flex-col justify-between gap-10"
    >
      <h5 className={`${styles.heading3}`}>Contact Information</h5>

      <p className={`${styles.text}`}>
        Fill in contact information for the person associated with the operator.
      </p>

      <Collapse activeKey={activeKey}>
        {/* First Panel: Contact Information */}
        <Panel header="Contact Information" key="0">
          <InputCollapse fields={contactFields} />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>
      </Collapse>

      <div className="flex justify-end gap-5">
        {/* Next Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default ContactInformationForm;
