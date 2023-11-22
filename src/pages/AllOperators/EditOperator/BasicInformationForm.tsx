import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { Operatorinformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

const { Panel } = Collapse;

interface BasicInformationFormProps {
  onSuccess: (values: Operatorinformation) => void;
  selectedRow?: Operatorinformation | null;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean; // Add this line
};

const BasicInformationForm = ({
  onSuccess,
  selectedRow,
}: BasicInformationFormProps) => {
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
      <h5 className={`${styles.heading3}`}>Basic Information</h5>

      <p className={`${styles.text}`}>
        First, please fill in some basic information and address data for your
        Operator.
      </p>
      <Collapse activeKey={activeKey}>
        {/* First Panel: Basic Information */}
        <Panel header="Basic Information" key="0">
          <InputCollapse fields={BasicField} />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>
        {/* Second Panel: Address Data */}
        <Panel header="Address Data" key="1">
          <InputCollapse fields={addressFields} />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
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
