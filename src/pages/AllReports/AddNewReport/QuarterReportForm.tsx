import React, { useState } from "react";

import { Form, Alert } from "antd";

import { originData } from "../AllReportsData";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import styles from "@/assets/Styles";

interface QuarterReportFormProps {
  onSuccess: (values: boolean) => void;
}

const ReportQuarterForm = ({ onSuccess }: QuarterReportFormProps) => {
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);

  const onChange = (key: string | string[]) => {
    console.log(key);
    setSelectedQuarter(key as string);
  };

  const onClose = () => {
    setSelectedQuarter(null);
  };

  const pendingItems = originData.filter((item) => item.status === "Pending");

  return (
    <Form onFinish={onSuccess} className={`${styles.box}`}>
      <h5 className={`${styles.heading3}`}>Report Quarter</h5>

      <p className={`${styles.text}`}>
        Please select the Quarter for which you want to create the report.
        <br /> We will compile all the data and automatically create the report
        for you.
      </p>
      <SelectCollapse
        header="Select the quarter you want to generate the report for"
        selectField={{
          name: "Quarter",
          placeholder: "Quarter",
          label: "",
          options: pendingItems.map((item) => ({
            key: item.key,
            value: item.quarter,
            name: item.name,
          })),
          onChange: (value) => setSelectedQuarter(value),
        }}
        onChange={onChange}
      />
      {selectedQuarter && (
        <Alert
          message={
            <h5 className={`${styles.heading3}`}>Could not generate report</h5>
          }
          description={
            <div className={`${styles.text}`}>
              Please ensure that the following information is added before
              generating the report:
              <ul>
                <li>Data on the carbon price paid</li>
                <li>Data on the production route(s) and production process</li>
              </ul>
              <p>
                For the selected quarter (<strong>{selectedQuarter}</strong>),
                make sure to provide the required data.
              </p>
            </div>
          }
          type="error"
          closable
          onClose={onClose}
        />
      )}

      <div className="flex justify-end gap-5">
        {/* Generate Report Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Generate Report
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default ReportQuarterForm;
