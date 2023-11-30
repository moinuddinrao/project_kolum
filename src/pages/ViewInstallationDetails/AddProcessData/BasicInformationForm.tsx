import React, { useState } from "react";

import { Collapse, Form } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
  cnCode: string;
}

const BasicInformationForm = ({ onSuccess, cnCode }: BasicInformationProps) => {
  const [form] = Form.useForm();

  const [dataAvailability, setDataAvailability] = useState("");

  // Handle Select Change
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Handle form submission
  const handleSubmit = async (values: BasicInformation) => {
    try {
      // Validate the form
      await form.validateFields();

      // Save the data
      values.dataAvailability = dataAvailability;

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

  // Add Data Availablility
  const renderDataAvailability = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      {dataAvailability === "" ? (
        <>
          <div>
            <p>
              In the following, we require specific data on the production
              route(s) and the production process.
            </p>
            <p>
              Do you have specific data on the production route(s) and
              production process for the good:
            </p>
            <ul>
              <li>{cnCode}</li>
            </ul>
          </div>
          <SelectCollapse
            selectField={{
              name: "dataAvailability",
              label: "",
              placeholder: "Select",
              options: [
                { key: "yes", value: "Yes", name: "yes" },
                { key: "no", value: "No", name: "no" },
              ],
              onChange: (value) =>
                handleSelectChange(value, setDataAvailability),
            }}
          />
        </>
      ) : dataAvailability === "No" ? (
        <>
          <div className={`${styles.box}`}>
            <p className={`${styles.label}`}>
              Okay, you do not have specific data on the Production Route(s) and
              Production Process.
            </p>
            <p className={`${styles.text}`}>
              In that case, please request that information directly from your
              operator. You can find the button to request the data in your
              operator sub page in the top right corner
            </p>
            <div className="flex justify-end gap-2">
              <SecondaryButton
                onClick={() => {
                  setDataAvailability("");
                  form.resetFields(["dataAvailability"]);
                }}
                className="w-fit h-fit !px-5"
              >
                Back
              </SecondaryButton>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col justify-between">
            <p className="!m-0 !mb-5">
              Okay, you have specific data on the type and amount of the carbon
              price paid
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
        {/* First Panel: Data Availability */}
        <Panel header="Data Availability" key="0">
          {renderDataAvailability()}
        </Panel>
      </Collapse>
      <div className="flex justify-end gap-5">
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default BasicInformationForm;
