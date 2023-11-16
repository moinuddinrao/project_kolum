import React, { useState } from "react";

import { Form } from "antd";

import { Operatorinformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

interface ContactInformationFormProps {
  onSuccess: (values: Operatorinformation) => void;
  selectedRow?: Operatorinformation | null;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const ContactInformationForm = ({
  onSuccess,
  selectedRow,
}: ContactInformationFormProps) => {
  const [onComplete, setOnComplete] = useState<boolean | undefined>();

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const contactFields: Field[] = [
    {
      name: "firstName",
      placeholder: "First Name of Contact Person",
      value: selectedRow?.name,
    },
    {
      name: "lastName",
      placeholder: "Last Name of Contact Person",
      value: selectedRow?.name,
    },
    { name: "email", placeholder: "Email", value: selectedRow?.eori },
    { name: "phone", placeholder: "Phone", value: selectedRow?.Phone_number },
  ];

  return (
    <Form
      onFinish={onSuccess}
      className="w-full flex flex-col justify-between gap-10"
    >
      {onComplete ? (
        <div className={`${styles.box}`}>
          <h5 className={`${styles.heading3}`}>Done!</h5>

          <p
            className={`${styles.text}`}
          >{`${selectedRow?.name} is Updated`}</p>
          <PrimaryButton
            onClick={() => onSuccess(selectedRow as Operatorinformation)}
            className="w-fit h-fit !px-5"
          >
            Finish
          </PrimaryButton>
        </div>
      ) : (
        <>
          <h5 className={`${styles.heading3}`}>Basic Information</h5>

          <p className={`${styles.text}`}>
            First, please fill in some basic information and address data for
            your Operator.
          </p>
          <InputCollapse
            header="Contact Data"
            fields={contactFields}
            defaultActiveKey={["1"]}
            onChange={onChange}
          />
          <div className="flex justify-end gap-5">
            {/* Next Button */}
            <PrimaryButton
              onClick={() => setOnComplete(true)}
              className="w-fit h-fit !px-5"
            >
              Next
            </PrimaryButton>
          </div>
        </>
      )}
    </Form>
  );
};

export default ContactInformationForm;
