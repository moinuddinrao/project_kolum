import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { DirectEmissions } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

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

const descriptionReportingMethodology: {
  name: string;
  placeholder: string;
  required?: boolean;
  value: string | number | undefined;
  inputType?: "input" | "textarea";
}[] = [
  {
    name: "nameOfMethodology",
    placeholder: "Name of your applied Monitoring and Reporting Method.",
    value: "",
    inputType: "input",
  },
  {
    name: "descriptionOfMethodology",
    placeholder:
      "Detailed description of applied Monitoring and Reporting Method.",
    value: "",
    inputType: "textarea",
  },
];

const DirectEmissionsForm = ({ onSuccess, cnCode }: DirectEmissionsProps) => {
  const [selected, setSelected] = useState("");
  const [activeKey, setActiveKey] = useState(0);

  console.log(selected);

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
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>

        {/* Second Panel: Type of applicable Reporting Methodology */}
        <Panel header="Type of applicable Reporting Methodology" key="1">
          <SelectCollapse
            selectField={{
              name: "reportingMethodology",
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
          />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>

        {/* Third Panel: Description of applicable Reporting Methodology */}
        <Panel header="Description of applicable Reporting Methodology" key="2">
          <InputCollapse fields={descriptionReportingMethodology} />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>

        {/* Fourth Panel: Direct Embedded Emissions */}
        <Panel header="Direct Embedded Emissions" key="3">
          <p>
            What was the produced net mass of the good:
            <ul>
              <li>{cnCode}</li>
            </ul>
            during the Monitoring Period?
          </p>

          <p className={`${styles.label} !my-2`}>Direct Embedded Emissions</p>
          <div className="w-full flex flex-end justify-around gap-5">
            <InputCollapse
              fields={[
                {
                  name: "directEmbeddedEmissions",
                  placeholder: "Enter Direct embedded Emissions",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "directEmbeddedEmissionsUnit",
                label: "",
                placeholder: "Select Measurement Unit",
                options: [
                  {
                    key: "tons",
                    value: "Tons of CO2 emitted",
                    name: "Tons of CO2 emitted",
                  },
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
        <PrimaryButton
          htmlType="submit"
          className={`w-fit h-fit !px-5 ${
            activeKey !== 4 &&
            "opacity-50 pointer-events-none cursor-not-allowed"
          }`}
        >
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default DirectEmissionsForm;
