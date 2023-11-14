import React, { useState } from "react";

import { Collapse, Select, Form, Alert } from "antd";

import { originData } from "../AllReports/AllReportsData";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

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
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel
          header="Select the quarter you want to generate the report for"
          key="1"
        >
          <div className="w-full flex justify-evenly gap-10">
            {/* Quarter */}
            <Form.Item
              name="Quarter"
              className={`h-fit w-full m-0 p-0`}
              rules={[{ required: true, message: "Please select Quarter!" }]}
            >
              <Select
                placeholder="Select Quarter"
                onChange={(value) => setSelectedQuarter(value as string)}
              >
                {pendingItems.map((item) => (
                  <Select.Option key={item.key} value={item.name}>
                    {item.quarter}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Panel>
      </Collapse>
      {selectedQuarter && (
        <Alert
          message={
            <div>
              <h5 className={`${styles.heading3}`}>
                Could not generate report
              </h5>
            </div>
          }
          description={
            <div className={`${styles.text}`}>
              Please make sure to add:
              <br />
              ▫️ Data on the carbon prize paid
              <br />
              ▫️ Data on the production route(s) and production process
              <br />
              <br />
              For operator:
              <br />
              ▫️ {selectedQuarter}
              <br />
              Before you generate the report.
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
