import React, { useState } from "react";

import { Checkbox, Collapse, Form, Select } from "antd";
import type { SelectProps } from "antd";

import ProductionRouteForm from "./ProductionRouteForm";
import ProductionProcessForm from "./ProductionProcessForm";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface PrecursorsProps {
  onSuccess: (values: any) => void;
  onBack: () => void;
  cnCode: string;
  hideNextButton: boolean;
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

const PrecursorsForm = ({
  onSuccess,
  onBack,
  cnCode,
  hideNextButton,
}: PrecursorsProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const options: SelectProps["options"] = [
    { key: "Precursor1", value: "Precursor 1", label: "Precursor 1" },
    { key: "Precursor2", value: "Precursor 2", label: "Precursor 2" },
    { key: "Precursor3", value: "Precursor 3", label: "Precursor 3" },
    { key: "Precursor4", value: "Precursor 4", label: "Precursor 4" },
    { key: "Precursor5", value: "Precursor 5", label: "Precursor 5" },
  ];

  const filteredOptions = options.filter(
    (o) => !selectedItems.includes(o.value as string),
  );

  // Handle Submit form  submission
  const handleSubmit = async (values: any) => {
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
        {/* First Panel: Used Precursors */}
        <Panel header="Used Precursors" key="0">
          <div>
            <p>
              Do you have specific data on the production route(s) and
              production process for the good:
            </p>
            <ul>
              <li>{cnCode}</li>
            </ul>
          </div>
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
                    {options.map((options) => (
                      <Checkbox key={options}>{options}</Checkbox>
                    ))}
                  </div>
                </Form.Item>
              </Panel>
            ))}
          </Collapse>
        </Panel>
        {/* Second Panel: Precursors produced in Installation */}
        <Panel header="Precursors produced in Installation" key="1">
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
          <div className="w-full flex flex-col">
            <Select
              mode="multiple"
              placeholder="Select"
              onChange={setSelectedItems}
              options={filteredOptions.map((items) => ({
                value: items.value,
                label: items.label,
              }))}
            />
          </div>
        </Panel>
        {/* Third Panel: Precursors used exclusively for the good */}
        <Panel header="Precursors used exclusively for the good" key="2">
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
          <div className="w-full flex flex-col">
            <Select
              mode="multiple"
              placeholder="Select"
              value={selectedItems}
              onChange={setSelectedItems}
              options={selectedItems.map(() => ({
                selectedItems,
              }))}
            />
          </div>
        </Panel>
        {selectedItems.length > 0 &&
          selectedItems.map((item, index) => (
            <Panel header={item} key={index + 3}>
              <ProductionRouteForm
                onSuccess={onSuccess}
                onBack={onBack}
                cnCode={cnCode}
                hideNextButton
              />
              <ProductionProcessForm
                onSuccess={onSuccess}
                onBack={onBack}
                cnCode={cnCode}
                hideNextButton
              />
              <PrecursorsForm
                onSuccess={onSuccess}
                onBack={onBack}
                cnCode={cnCode}
                hideNextButton
              />
            </Panel>
          ))}
      </Collapse>
      {/*Next Button */}
      <div className="flex justify-end gap-5">
        <SecondaryButton onClick={onBack} className="w-fit h-fit !px-5">
          Back
        </SecondaryButton>
        {!hideNextButton && (
          <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
            Next
          </PrimaryButton>
        )}
      </div>
    </Form>
  );
};

export default PrecursorsForm;
