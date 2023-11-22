import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import ImportedGoodsForm from "./ImportedGoodsForm";
import InstallationDataForm from "./InstallationDataForm";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
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
  goodsCategory: string;
  cnCode: string;
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
      goodsCategory: "",
      cnCode: "",
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

  const handleCloseDrawer = () => {
    onCloseDrawer();
    setcurrentStep(0);
  };

  const steps = [
    {
      title: "Installation Data",
      content: <InstallationDataForm onSuccess={handleInstallationData} />,
    },
    {
      title: "Imported Goods",
      content: <ImportedGoodsForm onSuccess={handleImportedGoods} />,
    },
    {
      title: "Finish",
      content: (
        <div className={`${styles.box}`}>
          <p className={`${styles.heading3}`}>Done!</p>
          <p className={`${styles.text}`}>
            The Installation and produced goods were added.
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
    .filter((_, index) => index !== steps.length - 1)
    .map((items) => ({ key: items.title, title: items.title }));

  console.log(data);
  return (
    <>
      <Drawer
        className={`${styles.text}`}
        title={<h2 className={`${styles.heading3}`}>Add new Installation</h2>}
        placement="right"
        size="large"
        open={visible}
        onClose={handleCloseDrawer}
      >
        <Steps current={currentStep} items={items}>
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
