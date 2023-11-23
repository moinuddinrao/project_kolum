import React, { useState } from "react";

import { Collapse, DatePicker, Form } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
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
  const [activeKey, setActiveKey] = useState(0);

  const handleNext = async () => {
    try {
      await form.validateFields();
      setActiveKey(activeKey + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSuccess} className={`${styles.box} gap-1`}>
      <Collapse activeKey={activeKey}>
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
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
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
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>
      </Collapse>
      <div className="flex justify-end gap-5">
        {/*Next Button */}
        <PrimaryButton
          htmlType="submit"
          className={`w-fit h-fit !px-5 ${
            activeKey !== 2 &&
            "opacity-50 pointer-events-none cursor-not-allowed"
          }`}
        >
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default BasicInformationForm;
