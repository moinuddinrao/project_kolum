import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import ContactInformationForm from "./ContactInformationForm";

import styles from "@/assets/Styles";
// import ViewInstallationDetails from "@/components/ViewInstallationDetails";

const { Step } = Steps;

export interface BasicInformation {
  key: string;
  name: string;
  city: string | null;
  country: string | null;
  imported_good: string[];
  Production_installation: string[];
  operatorId: number | null;
  streetName: string | null;
  streetNumber: number | null;
  poBox: string | null;
}

export interface ContactData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone_number: string | null;
}

interface AddNewOperatorProps {
  visible: boolean;
  onCloseDrawer: () => void;
  onDataSave: (data: {
    basicInformation: BasicInformation;
    contactData: ContactData;
  }) => void;
}

const AddNewOperator: React.FC<AddNewOperatorProps> = ({
  visible,
  onCloseDrawer,
  onDataSave,
}) => {
  const generateUniqueKey = () => String(Math.random());
  const [currentStep, setcurrentStep] = useState(0);
  const [data, setData] = useState<{
    basicInformation: BasicInformation;
    contactData: ContactData;
  }>({
    basicInformation: {
      key: generateUniqueKey(),
      name: "",
      city: "",
      country: "",
      imported_good: [],
      Production_installation: [],
      operatorId: null,
      streetName: "",
      streetNumber: null,
      poBox: "",
    },
    contactData: {
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
    },
  });

  const handleBasicInformation = (values: BasicInformation) => {
    setData((prevData) => ({
      ...prevData,
      basicInformation: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleContactData = (values: ContactData) => {
    setData((prevData) => {
      const newData = {
        ...prevData,
        contactData: values,
      };
      onDataSave(newData);
      return newData;
    });
  };

  console.log(data);

  const steps = [
    {
      title: "Basic Information",
      content: <BasicInformationForm onSuccess={handleBasicInformation} />,
    },
    {
      title: "Contact Data",
      content: <ContactInformationForm onSuccess={handleContactData} />,
    },
  ];

  return (
    <Drawer
      className={`${styles.text}`}
      title="Add New Operator"
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

export default AddNewOperator;
