import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { IndirectEmissions } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";

const { Panel } = Collapse;
interface IndirectEmissionsProps {
  onSuccess: (values: IndirectEmissions) => void;
  onBack: () => void;
  cnCode: string;
}

const sourceOfEmissionFactor = [
  {
    key: "comissionBasedOnIDEData",
    value: "Commission based on IDE Data",
    name: "Commission based on IDE Data",
  },
  {
    key: "sourceOfEmissionFactor1",
    value: "Source of Emission Factor 1",
    name: "Source of Emission Factor 1",
  },
  {
    key: "sourceOfEmissionFactor2",
    value: "Source of Emission Factor 2",
    name: "Source of Emission Factor 2",
  },
  {
    key: "sourceOfEmissionFactor3",
    value: "Source of Emission Factor 3",
    name: "Source of Emission Factor 3",
  },
  {
    key: "sourceOfEmissionFactor4",
    value: "Source of Emission Factor 4",
    name: "Source of Emission Factor 4",
  },
  {
    key: "sourceOfEmissionFactor5",
    value: "Source of Emission Factor 5",
    name: "Source of Emission Factor 5",
  },
];

const sourceOfElectricityFactor = [
  {
    key: "directTechnicalLink",
    value: "Direct Technical Link",
    name: "Direct Technical Link",
  },
  {
    key: "bilateral",
    value: "(Bilateral) power purchase agreement",
    name: "Bilateral",
  },
  {
    key: "electricityReceivedFromGrid",
    value: "Electricity received from the grid",
    name: "Electricity received from the grid",
  },
];

const IndirectEmissionsForm = ({
  onSuccess,
  onBack,
  cnCode,
}: IndirectEmissionsProps) => {
  const [selected, setSelected] = useState("");

  console.log(selected);

  // Handle Submit form  submission
  const handleSubmit = async (values: IndirectEmissions) => {
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
        {/* First Panel: Type of Determination */}
        <Panel header="Type of Determination" key="0">
          <SelectCollapse
            selectField={{
              name: "typeOfDertermination",
              placeholder: "Select",
              label: (
                <div>
                  Do you have Actual Data for the Direct Emissions caused during
                  the production of the good:
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
          />
        </Panel>

        {/* Second Panel: Amount of Electricity Consumed */}
        <Panel header="Amount of Electricity Consumed" key="1">
          <p>
            How much electricity was consumed for producing the good:{" "}
            <ul>
              <li>{cnCode}</li>
            </ul>
            during the Monitoring Period?
          </p>

          <p className={`${styles.label} !my-2`}>Electricity Consumed</p>
          <div className="w-full flex flex-end gap-5">
            <InputCollapse
              fields={[
                {
                  name: "consumedElectricity",
                  placeholder: "Enter Consumed Electricity",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "",
                label: "",
                placeholder: " Measurement Unit",
                options: [
                  {
                    key: "tons",
                    value: "Kilowatt",
                    name: "kilowatt",
                  },
                  {
                    key: "megawatt",
                    value: "Megawatt",
                    name: "megawatt",
                  },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>

        {/* Third Panel: Type of applicable Reporting Methodology */}
        <Panel header="Type of applicable Reporting Methodology" key="2">
          <SelectCollapse
            selectField={{
              name: "sourceOfEmissionFactor",
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
              options: sourceOfEmissionFactor,
              onChange: (value) => setSelected(value),
            }}
          />
        </Panel>

        {/* Fourth Panel: Source of Emission Factor */}
        <Panel header="Source of Emission Factor" key="3">
          <SelectCollapse
            selectField={{
              name: "sourceOfElectricityFactor",
              placeholder: "Select the applicable source of electricity",
              label:
                "What is the Source of Electricity used during the production process?",
              options: sourceOfElectricityFactor,
              onChange: (value) => setSelected(value),
            }}
          />
        </Panel>

        {/* Fifth Panel: Amount of Electricity Consumed */}
        <Panel header="Amount of Electricity Consumed" key="4">
          <p>
            What is the Emission Factor for one unit of electricity as defined
            by your Monitoring and Reporting Method?
          </p>
          <div className="w-full flex flex-end gap-5">
            <InputCollapse
              fields={[
                {
                  name: "EmissionFactor",
                  placeholder: "Enter Emission Factor",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "",
                label: "",
                placeholder: " Measurement Unit",
                options: [
                  {
                    key: " tCO2/MW",
                    value: "Tons of CO2/Megawatt",
                    name: " tCO2/MW",
                  },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>
      </Collapse>

      {/*Actions Button */}
      <div className="flex justify-end gap-5">
        <SecondaryButton onClick={onBack} className="w-fit h-fit !px-5">
          Back
        </SecondaryButton>
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default IndirectEmissionsForm;
