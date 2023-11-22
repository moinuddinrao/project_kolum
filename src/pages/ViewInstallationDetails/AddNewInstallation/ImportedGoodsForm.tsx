import React, { useState } from "react";

import { Checkbox, Collapse, Form, Input } from "antd";

import { ImportedGoods } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface ImportedGoodsProps {
  onSuccess: (values: ImportedGoods) => void;
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

const ImportedGoodsForm = ({ onSuccess }: ImportedGoodsProps) => {
  const [form] = Form.useForm();

  const [activeKey, setActiveKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [digits, setDigits] = useState(["", "", ""]);
  const [description, setDescription] = useState("");
  const [cnCode, setCnCode] = useState("");

  // Handle the change in the goods category
  const onChange = (category: string) => {
    setSelectedCategory(category);
    setActiveKey(activeKey + 1);
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setActiveKey(activeKey + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form submission
  const handleSubmit = (values: ImportedGoods) => {
    const newValues = {
      ...values,
      goodsCategories,
      cnCode,
      description,
    };
    console.log(newValues);
    onSuccess(newValues);
  };

  return (
    <Form form={form} onFinish={handleSubmit} className={`${styles.box}`}>
      <Collapse activeKey={activeKey}>
        {/* Goods Category */}
        <Panel header="Imported Goods" key="0">
          <p>Which goods are you importing from this Installation?</p>
          <Collapse defaultActiveKey="0">
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
                      <Checkbox key={option} onChange={() => onChange(option)}>
                        {option}
                      </Checkbox>
                    ))}
                  </div>
                </Form.Item>
              </Panel>
            ))}
          </Collapse>
        </Panel>
        <Panel header="Goods Specification" key="1">
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
                  handleNext();
                }}
                className="w-fit h-fit !px-5"
              >
                Next
              </PrimaryButton>
            </div>
          </div>
        </Panel>
      </Collapse>
      <div className="w-full flex justify-end mt-5">
        <PrimaryButton
          htmlType="submit"
          className={`w-fit h-fit !px-5 ${
            activeKey !== 2 &&
            "opacity-50 pointer-events-none cursor-not-allowed"
          }`}
        >
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default ImportedGoodsForm;
