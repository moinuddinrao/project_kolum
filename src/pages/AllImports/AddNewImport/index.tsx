import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import { BasicInformationForm } from "./BasicInformationForm";
import { ImportDataForm } from "./ImportDataForm";
import { CustomProcedureForm } from "./CustomProcedureForm";

import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
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

export interface ImportData {
  operator: string;
  installation: string;
  importVolume: string;
  volumeUnit: string;
  importDate: string;
  emissionData: string;
}

export interface CustomProcedure {
  areaOfImport: string;
  appliedCustomsProcedure: string;
  inwardProcessing: string;
}

export interface NewImportData {
  basicInformation: BasicInformation;
  importData: ImportData;
  customProcedure: CustomProcedure;
}

interface AddNewImportProps {
  visible: boolean;
  onCloseDrawer: () => void;
  onDataSave: (data: NewImportData) => void;
}

export const AddNewImport: React.FC<AddNewImportProps> = ({
  visible,
  onCloseDrawer,
  onDataSave,
}) => {
  const [currentStep, setcurrentStep] = useState(0);
  const [data, setData] = useState<{
    basicInformation: BasicInformation;
    importData: ImportData;
    customProcedure: CustomProcedure;
  }>({} as NewImportData);

  const onBack = () => {
    setcurrentStep(currentStep - 1);
  };

  const handleBasicInformation = (values: BasicInformation) => {
    setData((prevData) => ({
      ...prevData,
      basicInformation: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleImportData = (values: ImportData) => {
    setData((prevData) => ({
      ...prevData,
      importData: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleCustomProcedure = (values: CustomProcedure) => {
    setData((prevData) => ({
      ...prevData,
      customProcedure: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const steps = [
    {
      title: "Basic Information",
      content: <BasicInformationForm onSuccess={handleBasicInformation} />,
    },
    {
      title: "Import Data",
      content: <ImportDataForm onSuccess={handleImportData} onBack={onBack} />,
    },
    {
      title: "Customs Procedure",
      content: (
        <CustomProcedureForm
          onSuccess={handleCustomProcedure}
          onBack={onBack}
        />
      ),
    },
    {
      title: "Done",
      content: (
        <div className="w-full flex flex-col gap-5">
          <h3 className={`${styles.heading3}`}>Check your Import Data</h3>

          <p className={`${styles.text}`}>
            To finalise this import, please check if all data is correct.
          </p>

          {/* Goods Category */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Goods Category:</p>
            <p className={`${styles.text}`}>
              {data?.basicInformation?.goodsCategory}
            </p>
          </div>

          {/* CN Code */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>CN Code:</p>
            <p className={`${styles.text}`}>{data?.basicInformation?.cnCode}</p>
          </div>

          {/* Area of Import */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Area of Import:</p>
            <p className={`${styles.text}`}>
              {data?.customProcedure?.areaOfImport}
            </p>
          </div>

          {/* Operator */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Operator:</p>
            <p className={`${styles.text}`}>{data?.importData?.operator}</p>
          </div>

          {/* Installation */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Installation:</p>
            <p className={`${styles.text}`}>{data?.importData?.installation}</p>
          </div>

          {/* Import Volume */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Import Volume:</p>
            <p className={`${styles.text}`}>
              {data?.importData?.importVolume} {data?.importData?.volumeUnit}
            </p>
          </div>

          {/* Import Date */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Import Date:</p>
            <p className={`${styles.text}`}>{data?.importData?.importDate}</p>
          </div>

          {/* Emmission Data Method */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Emission Data Method:</p>
            <p className={`${styles.text}`}>{data?.importData?.emissionData}</p>
          </div>

          {/* Applied Customs Procedure */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Applied Customs Procedure:</p>
            <p className={`${styles.text}`}>
              {data?.customProcedure?.appliedCustomsProcedure}
            </p>
          </div>

          {/* Inward Processing */}
          <div className="w-full flex justify-between">
            <p className={`${styles.label}`}>Inward Processing:</p>
            <p className={`${styles.text}`}>
              {data?.customProcedure?.inwardProcessing}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex justify-end gap-2">
            <SecondaryButton
              onClick={() => {
                setcurrentStep(currentStep - 1);
              }}
              className="w-fit h-fit !px-5"
            >
              Back
            </SecondaryButton>
            <PrimaryButton
              onClick={() => {
                onDataSave(data);
                onCloseDrawer();
                setcurrentStep(0);
              }}
              className="w-fit h-fit !px-5"
            >
              Add Import
            </PrimaryButton>
          </div>
        </div>
      ),
    },
  ];

  const onchange = (current: number) => {
    setcurrentStep(current);
  };

  const items = steps
    .filter((_, index) => ![3].includes(index))
    .map((items) => ({ key: items.title, title: items.title }));

  return (
    <Drawer
      className={`${styles.text}`}
      placement="right"
      size="large"
      open={visible}
      onClose={() => {
        setcurrentStep(0);
        onCloseDrawer();
      }}
    >
      <div className="flex flex-col gap-10">
        {/* Drawer Title */}
        <h2 className={`${styles.heading2}`}>Add New Import</h2>

        {/* Steps */}
        <Steps current={currentStep} onChange={onchange}>
          {items.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        {/* Content */}
        <div className="steps-content">{steps[currentStep].content}</div>
      </div>
    </Drawer>
  );
};
