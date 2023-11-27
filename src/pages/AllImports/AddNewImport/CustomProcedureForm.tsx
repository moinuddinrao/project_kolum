import React, { useState } from "react";

import { Collapse, Form, Select } from "antd";

import { CustomProcedure } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

const { Panel } = Collapse;

interface CustomProcedureFormProps {
  onSuccess: (data: CustomProcedure) => void;
}

const CustomProcedureForm = ({ onSuccess }: CustomProcedureFormProps) => {
  const [form] = Form.useForm();

  const [activeKey, setActiveKey] = useState("1");
  const [areaOfImport, setAreaOfImport] = useState("");
  const [appliedCustomsProcedure, setAppliedCustomsProcedure] = useState("");
  const [inwardProcessing, setInwardProcessing] = useState("");

  // Handle Back
  const handleBack = async (field: string[], newKey: string) => {
    try {
      await form.resetFields(field);
      setActiveKey(newKey);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Next
  const handleNext = async (field: string[], newKey: string) => {
    try {
      await form.validateFields(field);
      setActiveKey(newKey);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle the change in the selected value for different panels
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Handle form submission
  const handleSubmit = (values: CustomProcedure) => {
    const newValues = {
      ...values,
      areaOfImport,
      appliedCustomsProcedure,
      inwardProcessing,
    };
    console.log(newValues);
    onSuccess(newValues);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <Collapse activeKey={activeKey}>
        {/* Area of Import */}
        <Panel header="Area of import" key="1">
          <div className="w-full flex flex-col gap-5">
            <p className="!m-0">What was the Area of Import?</p>

            <Form.Item
              name="areaOfImport"
              className="!m-0 !w-full"
              rules={[
                {
                  required: true,
                  message: "Please select an area of import",
                },
              ]}
            >
              <Select
                placeholder="Select an area of import"
                className="w-full"
                onChange={(value) => handleSelectChange(value, setAreaOfImport)}
              >
                <Select.Option value="EU">
                  EU - EU by means of Customs import declaration
                </Select.Option>
                <Select.Option value="EUOTH">
                  EUOTH - EU by other means
                </Select.Option>
              </Select>
            </Form.Item>

            <div className="w-full flex justify-end gap-2">
              <PrimaryButton
                onClick={() => handleNext(["areaOfImport"], "2")}
                className="w-fit h-fit !px-5"
              >
                Next
              </PrimaryButton>
            </div>
          </div>
        </Panel>
        {/* Applied customs procedure */}
        <Panel header="Applied customs procedure" key="2">
          <div className="w-full flex flex-col gap-5">
            <p className="!m-0">
              What was the requested customs procedure for the imported good?
            </p>

            <Form.Item
              name="appliedCustomsProcedure"
              className="!m-0 !w-full"
              rules={[
                {
                  required: true,
                  message: "Please select an applied customs procedure",
                },
              ]}
            >
              <Select
                placeholder="Select an applied customs procedure"
                className="w-full"
                onChange={(value) =>
                  handleSelectChange(value, setAppliedCustomsProcedure)
                }
              >
                <Select.Option value="01">
                  01 - Release for free circulation of goods simulta..
                </Select.Option>
                <Select.Option value="07">
                  07 - Release of goods for free circulation simulta..
                </Select.Option>
                <Select.Option value="40">
                  40 - Entry for home use of goods in the context o..
                </Select.Option>
                <Select.Option value="42">
                  42 - Simultaneous release for free circulation a..
                </Select.Option>
                <Select.Option value="43">
                  43 - Simultaneous release for free circulation a..
                </Select.Option>
                <Select.Option value="44">
                  44 - End-use, release for free circulation and ho..
                </Select.Option>
              </Select>
            </Form.Item>

            <div className="w-full flex justify-end gap-2">
              <SecondaryButton
                onClick={() => handleBack(["appliedCustomsProcedure"], "1")}
                className="w-fit h-fit !px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={() => handleNext(["appliedCustomsProcedure"], "3")}
                className="w-fit h-fit !px-5"
              >
                Next
              </PrimaryButton>
            </div>
          </div>
        </Panel>
        {/* Inward processing */}
        <Panel header="Inward processing" key="3">
          {inwardProcessing === "Yes" ? (
            <div className="w-full flex flex-col gap-5">
              <p className="!m-0">
                For some imports and customs procedures, inward processing is
                relevant. However, we decided to not include support for
                including inward processing in the first kolum version as our
                current focus lies on providing a smooth solution for simple
                creation of CBAM-compliant reports. Nevertheless, we are working
                on a solution behind the scenes and will provide an option to
                declare inward processing for imports in our next product
                iteration. As you will be able to edit your first two CBAM
                reports until 31/07/2024, we will nonetheless add this import to
                your list of imports. You can complete it as soon as we provide
                support for handling inward processing in early 2024.
              </p>

              <div className="w-full flex justify-end gap-2">
                <SecondaryButton
                  onClick={() => {
                    setInwardProcessing("");
                    handleBack(["inwardProcessing"], "3");
                  }}
                  className="w-fit h-fit !px-5"
                >
                  Back
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => handleNext(["inwardProcessing"], "4")}
                  className="w-fit h-fit !px-5"
                >
                  Next
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-5">
              <p className="!m-0">
                Was the inward processing procedure applied to the imported
                good?
              </p>

              <Form.Item
                name="inwardProcessing"
                className="!m-0 !w-full"
                rules={[
                  {
                    required: true,
                    message: "Please select an inward processing procedure",
                  },
                ]}
              >
                <Select
                  placeholder="Select an inward processing procedure"
                  className="w-full"
                  onChange={(value) =>
                    handleSelectChange(value, setInwardProcessing)
                  }
                >
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </Form.Item>

              <div className="w-full flex justify-end gap-2">
                <SecondaryButton
                  onClick={() => handleBack(["inwardProcessing"], "2")}
                  className="w-fit h-fit !px-5"
                >
                  Back
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => handleNext(["inwardProcessing"], "4")}
                  className="w-fit h-fit !px-5"
                >
                  Next
                </PrimaryButton>
              </div>
            </div>
          )}
        </Panel>
      </Collapse>

      {/* Action Buttons */}
      {activeKey === "4" ? (
        <div className="flex justify-end gap-5">
          <SecondaryButton
            onClick={() => {
              form.resetFields();
              setActiveKey("1");
            }}
            className="w-fit h-fit !px-5"
          >
            Reset
          </SecondaryButton>
          <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
            Next
          </PrimaryButton>
        </div>
      ) : (
        <div className="flex justify-end gap-5">
          <SecondaryButton
            onClick={() => setActiveKey("1")}
            className={`w-fit h-fit !px-5 ${activeKey !== "1" ? "" : "hidden"}`}
          >
            Restart
          </SecondaryButton>
          <PrimaryButton
            htmlType="submit"
            className={`w-fit h-fit !px-5 ${
              activeKey !== "4" &&
              "opacity-50 pointer-events-none cursor-not-allowed"
            }`}
          >
            Next
          </PrimaryButton>
        </div>
      )}
    </Form>
  );
};

export default CustomProcedureForm;
