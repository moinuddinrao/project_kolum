import React from "react";

import { Form, Select, Input, Collapse } from "antd";

import { DirectEmissions } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";

const { Panel } = Collapse;

interface DirectEmissionsProps {
  onSuccess: (values: DirectEmissions) => void;
  cnCode: string;
}

const reportingMethodologyOptions = [
  {
    key: "emissionMonitoringScheme",
    value:
      "Emission Monitoring Scheme at the Installation (including verification by an accredited verifier)",
    name: "Emission Monitoring Scheme at the Installation (including verification by an accredited verifier)",
  },
  {
    key: "compulsoryEmissionMonitoringScheme",
    value:
      "Compulsory Emission Monitoring Scheme where the Installation is located",
    name: "Compulsory Emission Monitoring Scheme where the Installation is located",
  },
  {
    key: "cbamSpecificDeterminationMethod",
    value: "CBAM Specific Determination Method",
    name: "CBAM Specific Determination Method",
  },
  {
    key: "carbonPricingScheme",
    value: "Carbon Pricing Scheme where the Installation is located",
    name: "Carbon Pricing Scheme where the Installation is located",
  },
  {
    key: "noneOfTheAbove",
    value: "None of the above",
    name: "None of the above",
  },
];

const BasicField = [
  {
    name: "name",
    placeholder: "Name of your applied Monitoring and Reporting Method.",
    value: "",
  },
  {
    name: "operatorId",
    placeholder:
      "Detailed description of applied Monitoring and Reporting Method.",
    value: "",
  },
];

const DirectEmissionsForm = ({ onSuccess, cnCode }: DirectEmissionsProps) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  const onChange = (key: string | string[]) => {
    console.log(key);
    setSelected(key as string);
  };
  console.log(selected);

  return (
    <Form onFinish={onSuccess} className={`${styles.box} gap-1`}>
      <SelectCollapse
        header="Type of Determination"
        selectField={{
          name: "Y/N",
          placeholder: "Select",
          label: (
            <div>
              Do you have Actual Data for the Direct Emissions caused during the
              production of the good:
              <ul>
                <li>{cnCode}</li>
              </ul>
            </div>
          ),
          options: [
            { key: "yes", value: "Yes", name: "yes" },
            { key: "no", value: "No", name: "no" },
          ],
          onChange: (value) => setSelected(value),
        }}
        onChange={onChange}
      />

      <SelectCollapse
        header="Type of applicable Reporting Methodology"
        selectField={{
          name: "typeOfApplicableReportingMethodology",
          placeholder:
            "Select the Type of Determination of the direct emission data",
          label: (
            <div>
              Where does the specific direct emission data for the good
              <ul>
                <li>{cnCode}</li>
              </ul>
              stem from?
            </div>
          ),
          options: reportingMethodologyOptions,
          onChange: (value) => setSelected(value),
        }}
        onChange={onChange}
      />

      <InputCollapse
        header="Description of applicable Reporting Methodology"
        label="Basic Information"
        fields={BasicField}
        defaultActiveKey={["1"]}
        onChange={onChange}
      />

      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Direct Embedded Emissions" key="1">
          <p>
            What was the produced net mass of the good:
            <ul>
              <li>{cnCode}</li>
            </ul>
            during the Monitoring Period?
          </p>
          <div className="w-full flex justify-around gap-10">
            <Form.Item
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
              <Input placeholder="Enter Direct embedded Emissions" />
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
                defaultValue="Tons of CO2 emitted"
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

export default DirectEmissionsForm;
