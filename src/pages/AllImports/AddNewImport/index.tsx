import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import ImportDataForm from "./ImportDataForm";

import styles from "@/assets/Styles";

const { Step } = Steps;

export interface BasicInformation {
  goodsCategory: string;
  cnCode: string;
  description: string;
  countryOfOrigin: string;
  monetaryValue: string;
  militaryActivities: string;
}

interface AddNewImportProps {
  visible: boolean;
  onCloseDrawer: () => void;
  onDataSave: (data: { basicInformation: BasicInformation }) => void;
}

const AddNewImport: React.FC<AddNewImportProps> = ({
  visible,
  onCloseDrawer,
  onDataSave,
}) => {
  const [currentStep, setcurrentStep] = useState(1);
  const [data, setData] = useState<{
    basicInformation: BasicInformation;
  }>({} as any);

  const handleBasicInformation = (values: BasicInformation) => {
    setData((prevData) => ({
      ...prevData,
      basicInformation: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleImportData = (values: any) => {
    setData((prevData) => ({
      ...prevData,
      importData: values,
    }));
    onDataSave(data);
    onCloseDrawer();
  };

  console.log(data);

  const steps = [
    {
      title: "Basic Information",
      content: <BasicInformationForm onSuccess={handleBasicInformation} />,
    },
    {
      title: "Import Data",
      content: <ImportDataForm onSuccess={handleImportData} />,
    },
    {
      title: "Customs Procedure",
      content: <div>Customs Procedure</div>,
    },
  ];

  return (
    <Drawer
      className={`${styles.text}`}
      placement="right"
      size="large"
      open={visible}
      onClose={onCloseDrawer}
    >
      <div className="flex flex-col gap-10">
        {/* Drawer Title */}
        <h2 className={`${styles.heading2}`}>Add New Import</h2>

        {/* Steps */}
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        {/* Content */}
        <div className="steps-content">{steps[currentStep].content}</div>
      </div>
    </Drawer>
  );
};

export default AddNewImport;
