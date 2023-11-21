import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import ImportedGoodsForm from "./ImportedGoodsForm";
import InstallationDataForm from "./InstallationDataForm";

import styles from "@/assets/Styles";

const { Step } = Steps;

export interface InstallationData {
  installationName: string;
  installationID: number;
  unLocode: number;
  economicActivity: string;
  longitude: number;
  latitude: number;
}

export interface ImportedGoods {
  category: string;
  subCategory: string;
  description: string;
}

interface AddInstallationProps {
  visible: boolean;
  onCloseDrawer: () => void;
}

const AddNewInstallation: React.FC<AddInstallationProps> = ({
  visible,
  onCloseDrawer,
}) => {
  const [currentStep, setcurrentStep] = useState(0);
  const [data, setData] = useState<{
    installationData: InstallationData;
    importedGoods: ImportedGoods;
  }>({
    installationData: {
      installationName: "",
      installationID: 0,
      unLocode: 0,
      economicActivity: "",
      longitude: 0,
      latitude: 0,
    },
    importedGoods: {
      category: "",
      subCategory: "",
      description: "",
    },
  });

  const handleInstallationData = (values: InstallationData) => {
    setData((prevData) => ({
      ...prevData,
      installationData: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleImportedGoods = (values: ImportedGoods) => {
    setData((prevData) => ({
      ...prevData,
      importedGoods: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  console.log(data);

  const steps = [
    {
      title: "Installation Data",
      content: <InstallationDataForm onSuccess={handleInstallationData} />,
    },
    {
      title: "Imported Goods",
      content: <ImportedGoodsForm onSuccess={handleImportedGoods} />,
    },
  ];
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
        <Steps current={currentStep}>
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

export default AddNewInstallation;
