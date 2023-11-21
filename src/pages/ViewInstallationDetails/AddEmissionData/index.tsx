import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import DirectEmissionsForm from "./DirectEmissionsForm";
import IndirectEmissionsForm from "./IndirectEmissionsForm";

import styles from "@/assets/Styles";

const { Step } = Steps;

export interface BasicInformation {
  monitoringPeriod: Date;
  ProducedNetMass: number;
}

export interface DirectEmissions {
  typeOfDertermination: boolean;
  reportingMethodology: string;
  descriptionOfMethodology: string;
  directEmbeddedEmissions: number;
}

export interface IndirectEmissions {
  typeOfDertermination: boolean;
  electricityConsumption: number;
  emissionFactorSource: string;
  sourceOfElectricity: string;
  emissionFactor: number;
}

interface EmissionDataProps {
  visible: boolean;
  onCloseDrawer: () => void;
  cnCode: string;
}

const AddEmissionData: React.FC<EmissionDataProps> = ({
  visible,
  onCloseDrawer,
  cnCode,
}) => {
  const [currentStep, setcurrentStep] = useState(0);
  const [data, setData] = useState<{
    basicInformation: BasicInformation;
    directEmissions: DirectEmissions;
    indirectEmissions: IndirectEmissions;
  }>({
    basicInformation: {
      monitoringPeriod: new Date(),
      ProducedNetMass: 0,
    },
    directEmissions: {
      typeOfDertermination: false,
      reportingMethodology: "",
      descriptionOfMethodology: "",
      directEmbeddedEmissions: 0,
    },
    indirectEmissions: {
      typeOfDertermination: false,
      electricityConsumption: 0,
      emissionFactorSource: "",
      sourceOfElectricity: "",
      emissionFactor: 0,
    },
  });

  const onChange = (value: number) => {
    console.log("onChange:", value);
    setcurrentStep(value);
  };

  const handleBasicInformation = (values: BasicInformation) => {
    setData((prevData) => ({
      ...prevData,
      basicInformation: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleDirectEmissions = (values: DirectEmissions) => {
    setData((prevData) => ({
      ...prevData,
      directEmissions: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleIndirectEmissions = (values: IndirectEmissions) => {
    setData((prevData) => ({
      ...prevData,
      indirectEmissions: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const steps = [
    {
      title: "Basic Information",
      content: (
        <BasicInformationForm
          onSuccess={handleBasicInformation}
          cnCode={cnCode}
        />
      ),
    },
    {
      title: "Direct Emissions",
      content: (
        <DirectEmissionsForm
          onSuccess={handleDirectEmissions}
          cnCode={cnCode}
        />
      ),
    },
    {
      title: "Indirect Emissions",
      content: <IndirectEmissionsForm onSuccess={handleIndirectEmissions} />,
    },
  ];

  console.log(data);

  return (
    <>
      <Drawer
        className={`${styles.text}`}
        title={<h2 className={`${styles.heading3}`}>Add new Installation</h2>}
        placement="right"
        size="large"
        open={visible}
        onClose={onCloseDrawer}
      >
        <Steps current={currentStep} onChange={onChange}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        {/* Content */}
        <div className="steps-content">{steps[currentStep].content}</div>
      </Drawer>
    </>
  );
};

export default AddEmissionData;
