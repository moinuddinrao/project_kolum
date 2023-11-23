import React, { useState } from "react";

import { Collapse, Form, Select } from "antd";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";
import InputCollapse from "@/components/Collapse/InputCollapse";

const { Panel } = Collapse;

interface ImportDataProps {
  onSuccess: (values: any) => void;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const BasicField: Field[] = [
  { name: "name", placeholder: "Operator Name*", value: "", required: true },
  {
    name: "operatorId",
    placeholder: "Operator ID Number*",
    value: "",
    required: true,
  },
];

const addressFields: Field[] = [
  { name: "streetName", placeholder: "Street", value: "" },
  { name: "streetNumber", placeholder: "Street Number", value: "" },
  { name: "city", placeholder: "City", value: "" },
  { name: "country", placeholder: "Country", value: "" },
  { name: "poBox", placeholder: "P/O Box", value: "" },
];

const contactFields: Field[] = [
  { name: "firstName", placeholder: "First Name of Contact Person", value: "" },
  { name: "lastName", placeholder: "Last Name of Contact Person", value: "" },
  { name: "email", placeholder: "Email", value: "" },
  { name: "phone_number", placeholder: "Phone", value: "" },
];

const operatorOptions = [
  { value: "kolum.earth, Inc.", label: "kolum.earth, Inc." },
  { value: "kolumbus Limited", label: "kolumbus Limited" },
  { value: "addNewOperator", label: "+ Add new Operator" },
];

const installationOptions = [
  { value: "Installation Name 1", label: "Installation Name 1" },
  { value: "Installation Name 2", label: "Installation Name 2" },
  {
    value: "I do not have any information on the Installation",
    label: "I do not have any information on the Installation",
  },
  { value: "addNewInstallation", label: "+ Add new Installation" },
];

const ImportDataForm = ({ onSuccess }: ImportDataProps) => {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  const [operator, setOperator] = useState("");
  const [installation, setInstallation] = useState("");

  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  const handleSubmit = (values: any) => {
    console.log(operator);
    console.log(values);
  };

  const renderOperatorPanel = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      <p className="!m-0">
        First, please fill in some basic information and address data for your
        Operator.
      </p>

      <div className="flex flex-col gap-2">
        <h3 className={`${styles.heading3}`}>Basic Information</h3>
        <InputCollapse fields={BasicField} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className={`${styles.heading3}`}>Address Data</h3>
        <InputCollapse fields={addressFields} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className={`${styles.heading3}`}>Contact Data</h3>
        <InputCollapse fields={contactFields} />
      </div>

      <div className="w-full flex justify-end gap-2">
        <SecondaryButton
          onClick={() => {
            setActiveKey("1");
            setOperator("");
            form.resetFields(["name", "Operator"]);
          }}
          className="w-fit h-fit !px-5"
        >
          Back
        </SecondaryButton>
        <PrimaryButton
          onClick={() => setActiveKey("2")}
          className="w-fit h-fit !px-5"
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );

  const renderOperatorSelection = () => (
    <div className="w-full flex flex-col gap-5">
      <p className="!m-0">Please select the Operator you imported from.</p>
      <Form.Item
        name="Operator"
        className="!m-0"
        rules={[
          {
            required: true,
            message: "Please select an operator",
          },
        ]}
      >
        <Select
          placeholder="Select Answer"
          className="w-full"
          onChange={(value) => handleSelectChange(value, setOperator)}
        >
          {operatorOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="w-full flex justify-end gap-2">
        <PrimaryButton
          onClick={() => setActiveKey("2")}
          className="w-fit h-fit !px-5"
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );

  const renderInstallationPanel = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      Installation Panel
    </div>
  );

  const renderInstallationSelection = () => (
    <div className="w-full flex flex-col gap-5">
      <p>
        Please select the Installation where the good of your Import was
        produced.
      </p>
      <Form.Item
        name="Installation"
        className="!m-0"
        rules={[
          {
            required: true,
            message: "Please select an installation",
          },
        ]}
      >
        <Select
          placeholder="Select Answer"
          className="w-full"
          onChange={(value) => handleSelectChange(value, setInstallation)}
        >
          {installationOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
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
  );

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <Collapse activeKey={activeKey}>
        {/* Operator */}
        <Panel header="Operator" key="1">
          {operator === "addNewOperator"
            ? renderOperatorPanel()
            : renderOperatorSelection()}
        </Panel>
        {/* Installation */}
        <Panel header="Installation" key="2">
          {installation === "addNewInstallation"
            ? renderInstallationPanel()
            : renderInstallationSelection()}
        </Panel>
        {/* Import Volume */}
        <Panel header="Import Volume" key="3"></Panel>
        {/* Import Date */}
        <Panel header="Import Date" key="4"></Panel>
        {/* Emission Data */}
        <Panel header="Emission Data" key="5"></Panel>
      </Collapse>
      {/* Next Button */}
      {activeKey === "6" ? (
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
              activeKey !== "6" &&
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

export default ImportDataForm;
