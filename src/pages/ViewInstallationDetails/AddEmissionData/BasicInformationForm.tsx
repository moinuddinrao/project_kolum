import React from "react";

import { Collapse, DatePicker, Form } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import InputCollapse from "@/components/Collapse/InputCollapse";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
  cnCode: string;
}

const BasicInformationForm = ({ onSuccess, cnCode }: BasicInformationProps) => {
  // Handle Submit form  submission
  const handleSubmit = async (values: BasicInformation) => {
    try {
      await form.validateFields();

      // Call the onSuccess function
      onSuccess(values);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle failed form submission
  const handleFailedSubmit = (errorInfo: any) => {
    console.log(errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className={`${styles.box} gap-1`}
    >
      <Collapse accordion>
        {/* First Panel: Monitoring Period */}
        <Panel header="Monitoring Period" key="0">
          <p>
            Please select the start and end date of the emission monitoring
            period.
          </p>
          <RangePicker
            name="monitoringPeriod"
            className="w-full flex justify-evenly gap-10"
          />
        </Panel>
        {/* Second Panel: Produced Net Mass */}
        <Panel header="Produced Net Mass" key="1">
          <div>
            <p>What was the produced net mass of the good:</p>
            <ul>
              <li>{cnCode}</li>
            </ul>
            <p>during the Monitoring Period?</p>
          </div>
          <div className="w-full flex justify-end gap-5">
            <InputCollapse
              fields={[
                {
                  name: "producedNetMass",
                  placeholder: "Enter Produced Net Mass",
                  required: true,
                  value: "number",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "producedNetMassUnit",
                label: "",
                placeholder: "Select Measurement Unit",
                options: [
                  { key: "tons", value: "Tons", name: "Tons" },
                  { key: "megawatt", value: "Megawatt", name: "Megawatt" },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>
      </Collapse>
      <div className="flex justify-end gap-5">
        {/*Next Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default BasicInformationForm;
