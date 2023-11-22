import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { Operatorinformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";

const { Panel } = Collapse;
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
  const [activeKey, setActiveKey] = useState(0);

  const handleNext = async () => {
    try {
      await form.validateFields();
      setActiveKey(activeKey + 1);
    } catch (error) {
      console.log(error);
    }
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

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={onSuccess}
      className="w-full flex flex-col justify-between gap-10"
    >
      {onComplete ? (
        <div className={`${styles.box}`}>
          <h5 className={`${styles.heading3}`}>Done!</h5>

          <p
            className={`${styles.text}`}
          >{`${selectedRow?.name} is Updated`}</p>
          <div className="flex justify-end gap-5">
            <PrimaryButton
              onClick={() => onSuccess(selectedRow as Operatorinformation)}
              className="w-fit h-fit !px-5"
            >
              Finish
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <>
          <h5 className={`${styles.heading3}`}>Basic Information</h5>

          <p className={`${styles.text}`}>
            First, please fill in some basic information and address data for
            your Operator.
          </p>
          <Collapse activeKey={activeKey}>
            <Panel header="Contact Information" key="0">
              <InputCollapse fields={contactFields} />
              <div className="w-full flex justify-end mt-5">
                {/*Next Button */}
                <SecondaryButton
                  onClick={handleNext}
                  className="w-fit h-fit !px-5"
                >
                  Next
                </SecondaryButton>
              </div>
            </Panel>
          </Collapse>
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
