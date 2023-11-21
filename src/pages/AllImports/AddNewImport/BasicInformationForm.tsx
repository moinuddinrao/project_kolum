import React, { useState } from "react";

import { Checkbox, Collapse, Form, Input, Select } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
}

const goodsCategories = {
  Cement: ["2523 2 - White-cement", "2523 2 - Grey-cement"],
  Electricity: ["2716 0 - Electricity"],
  Fertilizers: [
    "3105 1 - Urea",
    "3105 2 - Ammonium-nitrate",
    "3105 3 - Ammonium-sulphate",
    "3105 4 - Ammonium-chloride",
  ],
  "Iron and Steel": [
    "7202 1 - Ferro-manganese",
    "7202 4 - Ferro-chromium",
    "7202 6 - Ferro-nickel",
  ],
  Aluminium: ["7601 1 - Unwrought -luminium", "7601 2 - Aluminium-alloys"],
  Chemicals: [
    "2804 1 - Hydrogen",
    "2804 2 - Rare-gases",
    "2804 3 - Nitrogen",
    "2804 4 - Oxygen",
    "2804 5 - Boron",
  ],
};

const BasicInformationForm = ({ onSuccess }: BasicInformationProps) => {
  const [form] = Form.useForm();

  const [activeKey, setActiveKey] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [digits, setDigits] = useState(["", "", ""]);
  const [description, setDescription] = useState("");
  const [cnCode, setCnCode] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [monetaryValue, setMonetaryValue] = useState("");
  const [militaryActivities, setMilitaryActivities] = useState("");

  // Handle the change in the goods category
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle the change in the selected value for different panels
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Handle form submission
  const handleSubmit = (values: BasicInformation) => {
    const newValues = {
      ...values,
      cnCode,
      description,
      countryOfOrigin,
      monetaryValue,
      militaryActivities,
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
        {/* Goods Category */}
        <Panel header="Goods Category" key="1">
          {selectedCategory.length > 0 ? (
            <div className="w-full flex flex-col gap-10">
              {/* CN Code */}
              <div className="w-full flex flex-col gap-2">
                <h3 className={styles.heading3}>CN Code</h3>
                <p>
                  Please complete the goods code below so that it is a fully
                  valid, 8-digit CN code.
                </p>
                {/* Show Input to complete the goodsCategory */}
                <div className={`w-full flex gap-2 ${styles.heading3}`}>
                  <p className="!m-0">{selectedCategory.split(" - ")[0]}</p>
                  <div className="flex gap-2">
                    {/* Map the digits to avoid repetitive code */}
                    {[0, 1, 2].map((index) => (
                      <Form.Item
                        key={index}
                        name={`digit-${index + 1}`}
                        className="!m-0"
                        rules={[
                          {
                            required: true,
                            message: "required",
                          },
                          {
                            pattern: /^[0-9]$/,
                            len: 1,
                            message: "invalid",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => {
                            setDigits((prevDigits) => {
                              const newDigits = [...prevDigits];
                              newDigits[index] = e.target.value;
                              return newDigits;
                            });
                          }}
                          className={`w-7 max-w-fit ${styles.text} rounded-md !px-2`}
                        />
                      </Form.Item>
                    ))}
                  </div>
                  <p className="!m-0">- {selectedCategory.split(" - ")[1]}</p>
                </div>
              </div>
              {/* Description */}
              <div className="w-full flex flex-col gap-2">
                <h3 className={styles.heading3}>Description</h3>
                <p className="!m-0">
                  Additionally, please add a concrete description of your good.
                </p>
                <Form.Item
                  name="description"
                  className="!m-0"
                  rules={[
                    {
                      required: true,
                      message: "Description is required",
                    },
                  ]}
                >
                  <Input.TextArea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description of your CN Code and the related good."
                    className={`w-full ${styles.text} !p-2`}
                  />
                </Form.Item>
              </div>
              <div className="w-full flex justify-end gap-2">
                <SecondaryButton
                  onClick={() => setSelectedCategory("")}
                  className="w-fit h-fit !px-5"
                >
                  Back
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    // Simplify the code to set CnCode
                    setCnCode(
                      `${selectedCategory.split(" - ")[0]}${digits[0]}${
                        digits[1]
                      }${digits[2]}`,
                    );
                    setActiveKey("2");
                  }}
                  className="w-fit h-fit !px-5"
                >
                  Next
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <>
              <p>Select your import&apos;s goods category</p>
              <Collapse defaultActiveKey="1">
                {/* Map through goodsCategories for dynamic rendering */}
                {Object.entries(goodsCategories).map(([category, options]) => (
                  <Panel header={category} key={category}>
                    <Form.Item
                      name={category}
                      className="!m-0"
                      valuePropName="checked"
                    >
                      <div className="flex flex-col gap-2">
                        {options.map((option) => (
                          <Checkbox
                            key={option}
                            onChange={() => handleCategoryChange(option)}
                          >
                            {option}
                          </Checkbox>
                        ))}
                      </div>
                    </Form.Item>
                  </Panel>
                ))}
              </Collapse>
            </>
          )}
        </Panel>
        {/* Country of Origin */}
        <Panel header="Country of Origin" key="2">
          <div className="w-full flex flex-col gap-10">
            <p>Is the import&apos;s country of origin either:</p>
            <ul>
              <li>Liechtenstein</li>
              <li>Norway</li>
              <li>Iceland</li>
              <li>Switzerland?</li>
            </ul>
            <Form.Item
              name="countryOfOrigin"
              className="!m-0"
              rules={[
                {
                  required: true,
                  message: "Please select an answer",
                },
              ]}
            >
              <Select
                placeholder="Select Answer"
                className="w-full"
                onChange={(value) =>
                  handleSelectChange(value, setCountryOfOrigin)
                }
              >
                <Select.Option value="Yes">Yes</Select.Option>
                <Select.Option value="No">No</Select.Option>
              </Select>
            </Form.Item>
            <div className="w-full flex justify-end gap-2">
              <SecondaryButton
                onClick={() => setActiveKey("1")}
                className="w-fit h-fit !px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={() => setActiveKey("3")}
                className="w-fit h-fit !px-5"
              >
                Next
              </PrimaryButton>
            </div>
          </div>
        </Panel>
        {/* Monetary Value */}
        <Panel header="Monetary Value" key="3">
          <div className="w-full flex flex-col gap-10">
            <p>
              Is the monetary value of the import 150€ (per shipment) or less?
            </p>
            <Select
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange(value, setMonetaryValue)}
            >
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
            <div className="w-full flex justify-end gap-2">
              <SecondaryButton
                onClick={() => setActiveKey("2")}
                className="w-fit h-fit !px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={() => setActiveKey("4")}
                className="w-fit h-fit !px-5"
              >
                Next
              </PrimaryButton>
            </div>
          </div>
        </Panel>
        {/* Military Activities */}
        <Panel header="Military Activities" key="4">
          <div className="w-full flex flex-col gap-10">
            <p>
              Are the imported goods transported or used in the context of
              military activities?
            </p>
            <Select
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange(value, setMilitaryActivities)
              }
            >
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
            <div className="w-full flex justify-end gap-2">
              <SecondaryButton
                onClick={() => setActiveKey("3")}
                className="w-fit h-fit !px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={() => setActiveKey("5")}
                className="w-fit h-fit !px-5"
              >
                Next
              </PrimaryButton>
            </div>
          </div>
        </Panel>
      </Collapse>
      {/* Next Button */}
      {selectedCategory.length > 0 &&
      digits &&
      description &&
      cnCode &&
      countryOfOrigin &&
      monetaryValue &&
      militaryActivities &&
      activeKey === "5" ? (
        <div className="flex justify-end gap-5">
          <SecondaryButton
            onClick={() => {
              form.resetFields();
              setSelectedCategory("");
              setDigits(["", "", ""]);
              setDescription("");
              setCnCode("");
              setCountryOfOrigin("");
              setMonetaryValue("");
              setMilitaryActivities("");
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
              activeKey !== "5" &&
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

export default BasicInformationForm;
