import React, { useState } from "react";

import { Checkbox, Collapse, Form, Input, InputNumber, Select } from "antd";

import { BasicInformation } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

const { Panel } = Collapse;

interface BasicInformationProps {
  onSuccess: (values: BasicInformation) => void;
}

const goodsCategories = {
  Cement: ["2523 2 - White cement", "2523 2 - Grey cement"],
  Electricity: ["2716 0 - Electricity"],
  Fertilizers: [
    "3105 1 - Urea",
    "3105 2 - Ammonium nitrate",
    "3105 3 - Ammonium sulphate",
    "3105 4 - Ammonium chloride",
  ],
  "Iron and Steel": [
    "7202 1 - Ferro manganese",
    "7202 4 - Ferro chromium",
    "7202 6 - Ferro nickel",
  ],
  Aluminium: ["7601 1 - Unwrought aluminium", "7601 2 - Aluminium alloys"],
  Chemicals: [
    "2804 1 - Hydrogen",
    "2804 2 - Sodium",
    "2804 3 - Nitrogen",
    "2804 4 - Oxygen",
    "2804 5 - Boron",
  ],
};

export const BasicInformationForm = ({ onSuccess }: BasicInformationProps) => {
  const [form] = Form.useForm();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [goodsCategory, setGoodsCategory] = useState("");
  const [digits, setDigits] = useState(["", "", ""]);
  const [description, setDescription] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [monetaryValue, setMonetaryValue] = useState("");
  const [militaryActivities, setMilitaryActivities] = useState("");

  // Handle the change in the selected value for different panels
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

      // Set the values of the form
      values.goodsCategory = goodsCategory;
      values.cnCode = selectedCategory
        ? `${selectedCategory.split(" - ")[0]}${digits[0]} ${digits[1]}${
            digits[2]
          } - ${selectedCategory.split(" - ")[1]}`
        : "";
      values.description = description;
      values.countryOfOrigin = countryOfOrigin;
      values.monetaryValue = monetaryValue;
      values.militaryActivities = militaryActivities;

      // View the values in the console
      console.log(values);

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

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <Collapse accordion>
        {/* Goods Category */}
        <Panel header="Goods Category" key="1">
          {selectedCategory.length > 0 ? (
            <div className="w-full flex flex-col gap-5">
              {/* CN Code */}
              <div className="w-full flex flex-col gap-2">
                <h3 className={styles.heading3}>CN Code</h3>
                <p>
                  Please complete the goods code below so that it is a fully
                  valid, 8-digit CN code.
                </p>
                {/* Show Input to complete the selectedCategory */}
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
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const digit = value?.toString();
                              if (
                                !digit ||
                                (digit.length === 1 && /^\d$/.test(digit))
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                "Please enter a single digit",
                              );
                            },
                          }),
                        ]}
                      >
                        <InputNumber
                          type="number"
                          maxLength={1}
                          placeholder="0"
                          className={`!max-w-fit !font-bold rounded-md`}
                          min={0}
                          max={9}
                          onChange={(value) => {
                            const newDigits = [...digits];
                            newDigits[index] = value?.toString() || "";
                            setDigits(newDigits);
                          }}
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
                    {
                      max: 100,
                      message: "Description must be less than 100 characters",
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
              <div className="flex justify-end gap-2">
                <SecondaryButton
                  className="w-fit h-fit !px-5"
                  onClick={() => {
                    setSelectedCategory("");
                    setGoodsCategory("");
                    setDigits(["", "", ""]);
                    setDescription("");
                  }}
                >
                  Back
                </SecondaryButton>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-between gap-5">
              <p className="!m-0">Select your import&apos;s goods category</p>
              <Collapse accordion defaultActiveKey="1">
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
                            onChange={() => {
                              setGoodsCategory(category);
                              setSelectedCategory(option);
                            }}
                          >
                            {option}
                          </Checkbox>
                        ))}
                      </div>
                    </Form.Item>
                  </Panel>
                ))}
              </Collapse>
            </div>
          )}
        </Panel>
        {/* Country of Origin */}
        <Panel header="Country of Origin" key="2">
          <div className="w-full flex flex-col gap-5">
            <p className="!m-0">
              Is the import&apos;s country of origin either:
            </p>

            <ul className="!m-0">
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
          </div>
        </Panel>
        {/* Monetary Value */}
        <Panel header="Monetary Value" key="3">
          <div className="w-full flex flex-col gap-5">
            <p className="!m-0">
              Is the monetary value of the import 150€ (per shipment) or less?
            </p>

            <Form.Item
              name="monetaryValue"
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
                  handleSelectChange(value, setMonetaryValue)
                }
              >
                <Select.Option value="Yes">Yes</Select.Option>
                <Select.Option value="No">No</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Panel>
        {/* Military Activities */}
        <Panel header="Military Activities" key="4">
          <div className="w-full flex flex-col gap-5">
            <p className="!m-0">
              Are the imported goods transported or used in the context of
              military activities?
            </p>

            <Form.Item
              name="militaryActivities"
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
                  handleSelectChange(value, setMilitaryActivities)
                }
              >
                <Select.Option value="Yes">Yes</Select.Option>
                <Select.Option value="No">No</Select.Option>
              </Select>
            </Form.Item>
          </div>
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
