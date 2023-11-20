import React from "react";

import { DownloadOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

import styles from "@/assets/Styles";

interface DownloadReportFormtProps {
  onCloseDrawer: () => void;
}

const DownloadReportForm: React.FC<DownloadReportFormtProps> = ({
  onCloseDrawer,
}) => {
  const generateAndDownloadReport = () => {
    const dummyReportContent = "This is a dummy report content.";
    const blob = new Blob([dummyReportContent], { type: "text/plain" });
    const link = document.createElement("a");

    link.download = "dummy_report.txt";
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${styles.box}`}>
      <h2 className={`${styles.heading2}`}>Done!</h2>
      <p className={`${styles.text}`}>We generated the report</p>
      <div>
        <SecondaryButton onClick={generateAndDownloadReport}>
          <DownloadOutlined />
          Download Report
        </SecondaryButton>
      </div>
      <p className={`${styles.text}`}>and added it to your list of reports</p>
      <div>
        <PrimaryButton onClick={onCloseDrawer}>
          <DownloadOutlined />
          Okay, great!
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DownloadReportForm;
