import React, { useState } from "react";

import { Form, Collapse } from "antd";

import { InstallationData } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

const { Panel } = Collapse;

interface InstallationDataProps {
  onSuccess: (values: InstallationData) => void;
}

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

const InstallationDataForm = ({ onSuccess }: InstallationDataProps) => {
  const [activeKey, setActiveKey] = useState(0);

  const handleNext = async () => {
    try {
      await form.validateFields();
      setActiveKey(activeKey + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSuccess} className={`${styles.box}`}>
      <h5 className={`${styles.heading3}`}>Add new Installation</h5>
      <Collapse activeKey={activeKey}>
        {/* First Panel: Contact Information */}
        <Panel header="Contact Information" key="0">
          <SelectCollapse
            selectField={{
              name: "Address",
              label: "What is the exact address of the Installation?",
              placeholder: "Select Installation Address",
              options: options.map((item) => ({
                key: item.key,
                value: item.address,
                name: item.name,
              })),
              onChange: (value) => value,
            }}
          />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>
        {/* Second Panel: Address Data */}
        <Panel header="Address Data" key="1">
          <InputCollapse fields={addressFields} />
          <div className="w-full flex justify-end mt-5">
            {/*Next Button */}
            <SecondaryButton onClick={handleNext} className="w-fit h-fit !px-5">
              Next
            </SecondaryButton>
          </div>
        </Panel>
      </Collapse>
      <div className="flex justify-end gap-5">
        {/* Next Button */}
        <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default InstallationDataForm;
