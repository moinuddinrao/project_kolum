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
  const [carbonPricePaid, setCarbonPricePaid] = useState("");
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
      values.carbonPricePaid = carbonPricePaid;
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

  // Add Carbon Paid Data
  const renderCarbonPaidData = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      {carbonPricePaid === "" ? (
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
              name: "carbonPricePaid",
              label: "",
              placeholder: "Select",
              options: [
                { key: "yes", value: "Yes", name: "yes" },
                { key: "no", value: "No", name: "no" },
                { key: "idk", value: "I Don't Know", name: "I Don't Know" },
              ],
              onChange: (value) =>
                handleSelectChange(value, setCarbonPricePaid),
            }}
          />
        </>
      ) : carbonPricePaid === "No" ? (
        <>
          <div className={`${styles.box}`}>
            <p className={`${styles.text}`}>
              Okay, your operator did not have to pay a carbon price for this
              good.
            </p>
            <p className={`${styles.text}`}>
              In that case we are done here and you can close this window.
            </p>
            <div className="flex justify-end gap-2">
              <SecondaryButton
                onClick={() => {
                  setCarbonPricePaid("");
                  form.resetFields(["carbonPricePaid"]);
                }}
                className="w-fit h-fit !px-5"
              >
                Back
              </SecondaryButton>
            </div>
          </div>
        </>
      ) : carbonPricePaid === "I Don't Know" ? (
        <>
          <div className={`${styles.box}`}>
            <p className={`${styles.text}`}>
              Okay, you are not sure whether your operator had to pay a carbon
              price for this good.
            </p>
            <p className={`${styles.text}`}>
              In that case, please request that information directly from your
              operator. You can find the button to request the data in your
              operator sub page in the top right corner.
            </p>
            <div className="w-full flex justify-end mt-5">
              <SecondaryButton
                onClick={() => {
                  setCarbonPricePaid("");
                  form.resetFields(["carbonPricePaid"]);
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
              Okay, your Operator have to pay a carbon price for producing the
              good
            </p>
          </div>
        </>
      )}
    </div>
  );

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
            <p className={`${styles.text}`}>
              Okay, your operator did not have to pay a carbon price for this
              good.
            </p>
            <p className={`${styles.text}`}>
              In that case we are done here and you can close this window.
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
        {/* First Panel: Carbon Price Paid? */}
        <Panel header="Carbon Price Paid?" key="0">
          {renderCarbonPaidData()}
        </Panel>
        {/* Second Panel: Data Availability */}
        <Panel header="Data Availability" key="1">
          {renderDataAvailability()}
        </Panel>
      </Collapse>
      {/* Action Buttons */}
      <div className="flex justify-end gap-5">
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default BasicInformationForm;
