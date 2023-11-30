import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import DirectEmissionsForm from "./DirectEmissionsForm";
import IndirectEmissionsForm from "./IndirectEmissionsForm";

import styles from "@/assets/Styles";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

const { Step } = Steps;

export interface BasicInformation {
  monitoringPeriod: Date;
  producedNetMass: number;
  producedNetMassUnit: string;
}

export interface DirectEmissions {
  typeOfDetermination: string;
  reportingMethodology: string;
  nameOfMethodology: string;
  descriptionOfMethodology: string;
  directEmbeddedEmissions: number;
  directEmbeddedEmissionsUnit: string;
}

export interface IndirectEmissions {
  typeOfDetermination: string;
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
      producedNetMass: 0,
      producedNetMassUnit: "",
    },
    directEmissions: {
      typeOfDetermination: "",
      reportingMethodology: "",
      nameOfMethodology: "",
      descriptionOfMethodology: "",
      directEmbeddedEmissions: 0,
      directEmbeddedEmissionsUnit: "",
    },
    indirectEmissions: {
      typeOfDetermination: "",
      electricityConsumption: 0,
      emissionFactorSource: "",
      sourceOfElectricity: "",
      emissionFactor: 0,
    },
  });

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

  const handleCloseDrawer = () => {
    onCloseDrawer();
    setcurrentStep(0);
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
          onBack={() => setcurrentStep(currentStep - 1)}
        />
      ),
    },
    {
      title: "Indirect Emissions",
      content: (
        <IndirectEmissionsForm
          onSuccess={handleIndirectEmissions}
          cnCode={cnCode}
          onBack={() => setcurrentStep(currentStep - 1)}
        />
      ),
    },
    {
      title: "Finish",
      content: (
        <div className={`${styles.box}`}>
          <p className={`${styles.label}`}>That&apos;s it, we are done here!</p>
          <p className={`${styles.text}`}>
            This is all the emission data required for your CBAM report. You can
            finish the process by clicking the button below.
          </p>
          <p className={`${styles.text}`}>
            This is all the emission data required for your CBAM report. You can
            finish the process by clicking the button below.
          </p>
          <div className="w-full flex justify-end mt-5">
            <PrimaryButton
              className="w-fit h-fit !px-5"
              onClick={handleCloseDrawer}
            >
              Finish
            </PrimaryButton>
          </div>
        </div>
      ),
    },
  ];

  const items = steps
    .filter((_, index) => ![3, 4].includes(index))
    .map((items) => ({ key: items.title, title: items.title }));

  const onchange = (current: number) => {
    setcurrentStep(current);
  };
  console.log(data);

  return (
    <Drawer
      className={`${styles.text}`}
      title={<h2 className={`${styles.heading3}`}>Add new Installation</h2>}
      placement="right"
      size="large"
      open={visible}
      onClose={handleCloseDrawer}
    >
      <Steps items={items} current={currentStep} onChange={onchange}>
        {steps.map((items) => (
          <Step key={items.title} title={items.title} />
        ))}
      </Steps>

      {/* Content */}
      <div className="steps-content">{steps[currentStep].content}</div>
    </Drawer>
  );
};

export default AddEmissionData;
