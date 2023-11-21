import React, { useState } from "react";

import { Form } from "antd";

import { InstallationData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";

interface InstallationDataProps {
  onSuccess: (values: InstallationData) => void;
}

const InstallationDataForm = ({ onSuccess }: InstallationDataProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onChange = (key: string | string[]) => {
    console.log(key);
    setSelectedOption(key as string);
    console.log(selectedOption);
  };

  const options = [
    {
      key: "sameAddress",
      address: "SameAddress",
      name: "Same as Operator Address",
    },
    { key: "otherAddress", address: "OtherAddress", name: "Other Address" },
  ];

  const addressFields = [
    { name: "streetName", placeholder: "Street", value: "" },
    {
      name: "streetNumber",
      placeholder: "Street Number",
      value: "",
    },
    { name: "city", placeholder: "City", value: "" },
    {
      name: "country",
      placeholder: "Country",
      value: "",
    },
    { name: "poBox", placeholder: "P/O Box", value: "" },
  ];
  return (
    <Form onFinish={onSuccess} className={`${styles.box}`}>
      <h5 className={`${styles.heading3}`}>Add new Installation</h5>
      <SelectCollapse
        header="General Information"
        selectField={{
          name: "Address",
          label: "What is the exact address of the Installation?",
          placeholder: "Select Installation Address",
          options: options.map((item) => ({
            key: item.key,
            value: item.address,
            name: item.name,
          })),
          onChange: (value) => setSelectedOption(value),
        }}
        onChange={onChange}
      />
      <InputCollapse
        header="Address Data"
        label=""
        fields={addressFields}
        defaultActiveKey={["0"]}
        onChange={onChange}
      />

      <div className="flex justify-end gap-5">
        {/* Generate Report Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Generate Report
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default InstallationDataForm;
