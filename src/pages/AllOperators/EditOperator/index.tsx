import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import ContactInformationForm from "./ContactInformationForm";

import styles from "@/assets/Styles";

const { Step } = Steps;

export interface Operatorinformation {
  key: string;
  name: string;
  city: string;
  country: string;
  imported_good: string[];
  Production_installation: string[];
  Phone_number: string;
  dataIndex: string;
  title: string;
  eori: string;
  operatorId: number;
  streetName: string;
  streetNumber: string;
  zip: number;
  poBox: string | null;
}

interface EditOperatorProps {
  visible: boolean;
  onCloseDrawer: () => void;
  selectedRow?: Operatorinformation | null;
}

const EditOperator: React.FC<EditOperatorProps> = ({
  visible,
  onCloseDrawer,
  selectedRow,
}) => {
  const [data, setData] = useState<Operatorinformation | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleBasicInformation = (values: Operatorinformation) => {
    setData((prevData) => ({
      ...(prevData as Operatorinformation),
      ...values,
    }));
    setCurrentStep(currentStep + 1);
  };

  const handleContactData = (values: Operatorinformation) => {
    setData((prevData) => ({
      ...(prevData as Operatorinformation),
      ...values,
    }));
    onCloseDrawer();
  };

  const steps = [
    {
      title: "Basic Information",
      content: (
        <BasicInformationForm
          onSuccess={handleBasicInformation}
          selectedRow={selectedRow}
        />
      ),
    },
    {
      title: "Contact Data",
      content: (
        <ContactInformationForm
          onSuccess={handleContactData}
          selectedRow={data}
        />
      ),
    },
  ];
  return (
    <Drawer
      className={`${styles.text}`}
      title="Edit Operator"
      placement="right"
      size="large"
      open={visible}
      onClose={onCloseDrawer}
    >
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      {/* Content */}
      <div className="steps-content">{steps[currentStep].content}</div>
    </Drawer>
  );
};

export default EditOperator;
