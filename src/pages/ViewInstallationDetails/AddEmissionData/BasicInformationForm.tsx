import React from "react";

import { Collapse, DatePicker, Form, Input, Select } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
  cnCode: string;
}

const BasicInformationForm = ({ onSuccess, cnCode }: BasicInformationProps) => {
  return (
    <Form onFinish={onSuccess} className={`${styles.box}`}>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Monitoring Period" key="1">
          <p>
            Please select the start and end date of the emission monitoring
            period.
          </p>
          <RangePicker className="w-full flex justify-evenly gap-10" />
        </Panel>
        <Panel header="Produced Net Mass" key="2">
          <p>
            What was the produced net mass of the good:
            <ul>
              <li>{cnCode}</li>
            </ul>
            during the Monitoring Period?
          </p>
          <div className="flex">
            <Form.Item
              className="w-fit gap-10"
              name="producedNetMass"
              rules={[
                {
                  required: true,
                  message: `Please input the produced net mass of ${cnCode}!`,
                },
                {
                  type: "number",
                  message: "Input must be a number!",
                  transform: (value) => parseFloat(value), // Ensure it is treated as a number
                },
                {
                  validator: (_, value) => {
                    const numericValue = parseFloat(value);
                    if (isNaN(numericValue) || numericValue < 0) {
                      return Promise.reject(
                        "Produced net mass must be a positive number!",
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Enter Produced Net Mass" />
            </Form.Item>
            <Form.Item
              name="measurementUnit"
              rules={[
                {
                  required: true,
                  message: `Please select the Measurement Unit!`,
                },
              ]}
            >
              <Select
                defaultValue="Measurement Unit"
                options={[
                  { value: "Tons", label: "Tons" },
                  { value: "Megawatt", label: "Megawatt" },
                ]}
              />
            </Form.Item>
          </div>
        </Panel>
      </Collapse>
      {/* Next Button */}
      <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
        Next
      </PrimaryButton>
    </Form>
  );
};

export default BasicInformationForm;
