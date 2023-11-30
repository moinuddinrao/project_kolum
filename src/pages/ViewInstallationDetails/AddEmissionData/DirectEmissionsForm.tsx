import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { DirectEmissions } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface DirectEmissionsProps {
  onSuccess: (values: DirectEmissions) => void;
  onBack: () => void;
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

const DirectEmissionsForm = ({
  onSuccess,
  onBack,
  cnCode,
}: DirectEmissionsProps) => {
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");
  const [typeOfDetermination, setTypeOfDetermination] = useState("");

  console.log(selected);

  // Handle Select Change
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Handle form submission
  const handleSubmit = async (values: DirectEmissions) => {
    try {
      // Validate the form
      await form.validateFields();

      // Save the data
      values.typeOfDetermination = typeOfDetermination;

      // View the data
      console.log(values);

      // Call On Success
      onSuccess(values);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle failed form submission
  const handleFailedSubmit = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Add Type Of Determination
  const renderTypeOfDetermination = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      {typeOfDetermination === "" ? (
        <>
          <SelectCollapse
            selectField={{
              name: "typeOfDetermination",
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
              onChange: (value) =>
                handleSelectChange(value, setTypeOfDetermination),
            }}
          />
        </>
      ) : typeOfDetermination === "No" ? (
        <div className={`${styles.box}`}>
          <p className={`${styles.label}`}>That&apos;s it, we are done here!</p>
          <p className={`${styles.text}`}>
            This is all the emission data required for your CBAM report. You can
            finish the process by clicking the button below.
          </p>
          <p className={`${styles.text}`}>
            However, you can request specific emission data directly from your
            supplier. You can find the button to request the data in your
            operator sub page in the top right corner. Alternatively, you can
            use Default Emission Values until 31/07/2024 for your imports.
          </p>
          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => {
                setTypeOfDetermination("");
                form.resetFields(["typeOfDetermination"]);
              }}
              className="w-fit h-fit !px-5"
            >
              Back
            </SecondaryButton>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col justify-between">
            <p className="!m-0 !mb-5">
              Okay, you have specific data for the Direct Emissions caused
              during the production of the good.
            </p>
          </div>
        </>
      )}
    </div>
  );

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
          {renderTypeOfDetermination()}
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
        </Panel>

        {/* Third Panel: Description of applicable Reporting Methodology */}
        <Panel header="Description of applicable Reporting Methodology" key="2">
          <InputCollapse fields={descriptionReportingMethodology} />
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

export default DirectEmissionsForm;
