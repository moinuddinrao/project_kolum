import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import BasicInformationForm from "./BasicInformationForm";
import CarbonPricePaidDataForm from "./CarbonPricePaidDataForm";

import styles from "@/assets/Styles";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

const { Step } = Steps;

export interface BasicInformation {
  carbonPricePaid: string;
  dataAvailability: string;
}

export interface CarbonPricePaidData {
  countryOfCarbonPrice: string;
  typeOfCarbonPricePaid: string;
  descriptionOfCarbonPriceInstrument: string;
  provisionOfTheLegalAct: string;
  emissionsQuantity: string;
  totalAmountOfCarbonPricedue: string;
  potentialDiscount: string;
  typeAndDescriptionOfDiscount: string;
  quantityOfEmbeddedEmissions: string;
  provisionOfTheLegalActDiscount: string;
}

interface CarbonPricePaidDataProps {
  visible: boolean;
  onCloseDrawer: () => void;
  cnCode: string;
}

const AddCarbonPriceData: React.FC<CarbonPricePaidDataProps> = ({
  visible,
  onCloseDrawer,
  cnCode,
}) => {
  const [currentStep, setcurrentStep] = useState(0);
  const [data, setData] = useState<{
    basicInformation: BasicInformation;
    carbonPricePaidData: CarbonPricePaidData;
  }>({
    basicInformation: {
      carbonPricePaid: "",
      dataAvailability: "",
    },
    carbonPricePaidData: {
      countryOfCarbonPrice: "",
      typeOfCarbonPricePaid: "",
      descriptionOfCarbonPriceInstrument: "",
      provisionOfTheLegalAct: "",
      emissionsQuantity: "",
      totalAmountOfCarbonPricedue: "",
      potentialDiscount: "",
      typeAndDescriptionOfDiscount: "",
      quantityOfEmbeddedEmissions: "",
      provisionOfTheLegalActDiscount: "",
    },
  });

  const handleBasicInformation = (values: BasicInformation) => {
    setData((prevData) => ({
      ...prevData,
      basicInformation: values,
    }));
    setcurrentStep(currentStep + 1);
  };

  const hanldeCarbonPricePaid = (values: CarbonPricePaidData) => {
    setData((prevData) => ({
      ...prevData,
      carbonPricePaidData: values,
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
      title: "Carbon Price Paid",
      content: (
        <CarbonPricePaidDataForm
          onSuccess={hanldeCarbonPricePaid}
          onBack={() => setcurrentStep(currentStep - 1)}
          cnCode={cnCode}
        />
      ),
    },
    {
      title: "Finish",
      content: (
        <div className={`${styles.box}`}>
          <p className={`${styles.label}`}>Thank you, we are done here!</p>
          <p className={`${styles.text}`}>
            The monetary amounts of the carbon price paid will be converted into
            Euro (€), based on the average exchange rates of the year preceding
            the report&apos;s due date.
          </p>
          <p className={`${styles.text}`}>
            Please note that in the transitional period, reporting the carbon
            price paid is an obligation for importers, while in the definitive
            period, disclosure of this information will give importers a
            discount on their required CBAM certificates in the amount of the
            carbon price paid for the specific good.
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
    .filter((_, index) => ![2, 3, 4, 5].includes(index))
    .map((items) => ({ key: items.title, title: items.title }));

  const onchange = (current: number) => {
    setcurrentStep(current);
  };

  console.log(data);

  return (
    <Drawer
      className={`${styles.text}`}
      title={
        <h2 className={`${styles.heading3}`}>
          Add Data on the Carbon Price Paid
        </h2>
      }
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

export default AddCarbonPriceData;
