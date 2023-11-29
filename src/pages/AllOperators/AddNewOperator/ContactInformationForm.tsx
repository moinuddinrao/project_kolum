import React from "react";

import { Form, Collapse } from "antd";

import { ContactData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

const { Panel } = Collapse;

interface ContactDataProps {
  onSuccess: (values: ContactData) => void;
  onBack: () => void;
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

const ContactInformationForm = ({ onSuccess, onBack }: ContactDataProps) => {
  const [form] = Form.useForm();

  // Handle Submit form  submission
  const handleSubmit = async (values: ContactData) => {
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
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <h5 className={`${styles.heading3}`}>Contact Information</h5>

      <p className={`${styles.text}`}>
        Fill in contact information for the person associated with the operator.
      </p>

      <Collapse accordion>
        {/* First Panel: Contact Information */}
        <Panel header="Contact Information" key="0">
          <InputCollapse fields={contactFields} />
        </Panel>
      </Collapse>

      {/* Next Button */}
      <div className="flex justify-end gap-5">
        <SecondaryButton onClick={onBack} className="w-fit h-fit !px-5">
          Back
        </SecondaryButton>
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default ContactInformationForm;
