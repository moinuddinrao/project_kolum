import React, { useState } from "react";

import { Drawer, Steps } from "antd";

import ReportQuarterForm from "./QuarterReportForm";
import DownloadReportForm from "./DownloadReportForm";

// import styles from "@/assets/Styles";

const { Step } = Steps;

interface AddNewReportProps {
  visible: boolean;
  onCloseDrawer: () => void;
}

const AddNewReportDrawer: React.FC<AddNewReportProps> = ({
  visible,
  onCloseDrawer,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleDrawer = () => {
    setCurrentStep(0);
    onCloseDrawer();
  };

  const steps = [
    {
      title: "Select Quarter",
      content: <ReportQuarterForm onSuccess={nextStep} />,
    },
    {
      title: "Download Report",
      content: <DownloadReportForm onCloseDrawer={handleDrawer} />,
    },
  ];
  return (
    <Drawer
      className="leading-10"
      title="Generate new Report"
      placement="right"
      size="large"
      onClose={onCloseDrawer}
      open={visible}
    >
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
    </Drawer>
  );
};

export default AddNewReportDrawer;
