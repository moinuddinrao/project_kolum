import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import ProductionProcessForm from "./ProductionProcessForm";
import ProductionRouteForm from "./ProductionRouteForm";
import PrecursorsForm from "./PrecursorsForm";

import styles from "@/assets/Styles";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

const { Step } = Steps;

export interface BasicInformation {
  dataAvailability: string;
}

export interface ProductionRoute {
  productionRoute: string;
}

export interface ProductionProcess {
  productionProcess: string;
}

export interface Precursor {
  usedPrecursor: string[];
  precursorInstallation: string[];
  precursorGoods: string;
}

interface ProductionProcessProps {
  visible: boolean;
  onCloseDrawer: () => void;
  cnCode: string;
}

const AddProcessData: React.FC<ProductionProcessProps> = ({
  visible,
  onCloseDrawer,
  cnCode,
}) => {
  const [currentStep, setcurrentStep] = useState(0);
  const [data, setData] = useState<{
    basicInformation: BasicInformation;
    productionRoute: ProductionRoute;
    productionProcess: ProductionProcess;
    precursor: Precursor;
  }>({
    basicInformation: {
      dataAvailability: "",
    },
    productionRoute: {
      productionRoute: "",
    },
    productionProcess: {
      productionProcess: "",
    },
    precursor: {
      usedPrecursor: [],
      precursorInstallation: [],
      precursorGoods: "",
    },
  });

  const handleBasicInformation = (values: BasicInformation) => {
    setData((prevData) => ({
      ...prevData,
      basicInformation: values,
    }));
    if (values.dataAvailability === "No") {
      setcurrentStep(4);
    } else {
      setcurrentStep(currentStep + 1);
    }
  };

  const handleProductionRoute = (values: ProductionRoute) => {
    setData((prevData) => ({
      ...prevData,
      productionRoute: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handleProductionProcess = (values: ProductionProcess) => {
    setData((prevData) => ({
      ...prevData,
      productionProcess: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const handlePrecursor = (values: Precursor) => {
    setData((prevData) => ({
      ...prevData,
      precursor: values,
    }));
    setcurrentStep(5);
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
      title: "Production Route",
      content: (
        <ProductionRouteForm
          onSuccess={handleProductionRoute}
          cnCode={cnCode}
          onBack={() => setcurrentStep(currentStep - 1)}
          hideNextButton={false}
        />
      ),
    },
    {
      title: "Production Process",
      content: (
        <ProductionProcessForm
          onSuccess={handleProductionProcess}
          cnCode={cnCode}
          onBack={() => setcurrentStep(currentStep - 1)}
          hideNextButton={false}
        />
      ),
    },
    {
      title: "Precursor",
      content: (
        <PrecursorsForm
          onSuccess={handlePrecursor}
          cnCode={cnCode}
          onBack={() => setcurrentStep(currentStep - 1)}
          hideNextButton={false}
        />
      ),
    },
    {
      title: "Done",
      content: (
        <div className={`${styles.box}`}>
          <p className={`${styles.label}`}>We are done here</p>
          <p className={`${styles.text}`}>
            We added the relevant Production Process data for the good:
          </p>
          <ul>
            <li>{cnCode}</li>
          </ul>
          <div className="w-full flex justify-end mt-5">
            <PrimaryButton
              className="w-fit h-fit !px-5"
              onClick={handleCloseDrawer}
            >
              Okay, great!
            </PrimaryButton>
          </div>
        </div>
      ),
    },
  ];

  const items = steps
    .filter((_, index) => ![4, 5].includes(index))
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

export default AddProcessData;
