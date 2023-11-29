import React, { useState } from "react";

import { Collapse, Form, Select } from "antd";

import { CustomProcedure } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

const { Panel } = Collapse;

interface CustomProcedureFormProps {
  onSuccess: (data: CustomProcedure) => void;
  onBack: () => void;
}

export const CustomProcedureForm = ({
  onSuccess,
  onBack,
}: CustomProcedureFormProps) => {
  const [form] = Form.useForm();

  const [areaOfImport, setAreaOfImport] = useState("");
  const [appliedCustomsProcedure, setAppliedCustomsProcedure] = useState("");
  const [inwardProcessing, setInwardProcessing] = useState("");

  // Handle the change in the selected value for different panels
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Handle form submission
  const handleSubmit = async (values: CustomProcedure) => {
    try {
      // Validate the form
      await form.validateFields();

      // Save the data
      values.areaOfImport = areaOfImport;
      values.appliedCustomsProcedure = appliedCustomsProcedure;
      values.inwardProcessing = inwardProcessing;

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

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <Collapse accordion>
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

              <div className="flex justify-end gap-2">
                <SecondaryButton
                  onClick={() => {
                    setInwardProcessing("");
                    form.resetFields(["inwardProcessing"]);
                  }}
                  className="w-fit h-fit !px-5"
                >
                  Back
                </SecondaryButton>
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
            </div>
          )}
        </Panel>
      </Collapse>

      {/* Action Buttons */}
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
