import React, { useState } from "react";

import { Collapse, Form, Input, Select, DatePicker } from "antd";

import { ImportData } from ".";

import InputCollapse from "@/components/Collapse/InputCollapse";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface ImportDataProps {
  onSuccess: (values: ImportData) => void;
  onBack: () => void;
}

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const BasicField: Field[] = [
  {
    name: "operatorName",
    placeholder: "Operator Name*",
    value: "",
    required: true,
  },
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
  { name: "phoneNumber", placeholder: "Phone", value: "" },
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
    value: "noInstallationInformation",
    label: "I do not have any information on the Installation",
  },
  { value: "addNewInstallation", label: "+ Add new Installation" },
];

const installationFields: Field[] = [
  {
    name: "installationName",
    placeholder: "Installation Name",
    value: "",
    required: true,
  },
  {
    name: "installationId",
    placeholder: "Installation ID",
    value: "",
    required: true,
  },
  {
    name: "unLocodeNumber",
    placeholder: "UN/LOCODE Number",
    value: "",
    required: true,
  },
  {
    name: "economicActivity",
    placeholder: "Economic Activity",
    value: "",
  },
];

const englishTranscriptFields: Field[] = [
  { name: "streetName", placeholder: "Street", value: "", required: true },
  {
    name: "streetNumber",
    placeholder: "Street Number",
    value: "",
    required: true,
  },
  { name: "city", placeholder: "City", value: "", required: true },
  { name: "poBox", placeholder: "P/O Box", value: "", required: true },
  { name: "country", placeholder: "Country", value: "", required: true },
];

const localAddressField: Field[] = [
  {
    name: "localAddress",
    placeholder:
      "Please provide the Installation address in its original local format.",
    value: "",
  },
];

const geographicalCoordinatesFields: Field[] = [
  { name: "latitude", placeholder: "Latitude", value: "", required: true },
  { name: "longitude", placeholder: "Longitude", value: "", required: true },
];

export const ImportDataForm = ({ onSuccess, onBack }: ImportDataProps) => {
  const [form] = Form.useForm();

  const [operator, setOperator] = useState("");
  const [installation, setInstallation] = useState("");
  const [installationAddress, setInstallationAddress] = useState("");
  const [importVolume, setImportVolume] = useState("");
  const [volumeUnit, setVolumeUnit] = useState("");
  const [importDate, setImportDate] = useState("");
  const [emissionData, setEmissionData] = useState("");

  // Handle Select Change
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Submit Form
  const handleSubmit = async (values: ImportData) => {
    try {
      // Validate Form
      await form.validateFields();

      // Set Values
      values.operator = operator;
      values.installation = installation;
      values.importVolume = importVolume;
      values.volumeUnit = volumeUnit;
      values.importDate = importDate;
      values.emissionData = emissionData;

      // View Values
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

  // Operator Selection
  const renderOperatorSelection = () => (
    <div className="w-full flex flex-col gap-5">
      <p className="!m-0">Please select the Operator you imported from.</p>
      <Form.Item
        name="operator"
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
    </div>
  );

  // Operator Panel
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

      <div className="flex justify-end gap-2">
        <SecondaryButton
          onClick={() => {
            setOperator("");
            form.resetFields(["operator"]);
          }}
          className="w-fit h-fit !px-5"
        >
          Back
        </SecondaryButton>
      </div>
    </div>
  );

  // Installation Selection
  const renderInstallationSelection = () => (
    <div className="w-full flex flex-col gap-5">
      <p className="!m-0">
        Please select the Installation where the good of your Import was
        produced.
      </p>
      <Form.Item
        name="installation"
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
    </div>
  );

  // No Installation Information
  const renderNoInstallationInformation = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      <p className="!m-0">
        Okay, you do not have any information on the Installation. You can
        request installation data directly from your operator later. Please
        continue with the “Add new Import” flow for now.
      </p>

      <div className="flex justify-end gap-2">
        <SecondaryButton
          onClick={() => {
            setInstallation("");
            form.resetFields(["installation"]);
          }}
          className="w-fit h-fit !px-5"
        >
          Back
        </SecondaryButton>
      </div>
    </div>
  );

  // Add New Installation
  const renderAddNewInstallation = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      {installationAddress === "" ? (
        <>
          <p className="!m-0">
            What is the exact address of the Production Installation of your
            imported good?
          </p>
          <Form.Item
            name="installationAddress"
            className="!m-0"
            rules={[
              {
                required: true,
                message: "Please select an installation address",
              },
            ]}
          >
            <Select
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange(value, setInstallationAddress)
              }
            >
              <Select.Option value="SameAddress">
                Same as Operator Address
              </Select.Option>
              <Select.Option value="DifferentAddress">
                Different Address
              </Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => {
                setInstallation("");
                form.resetFields(["installation"]);
              }}
              className="w-fit h-fit !px-5"
            >
              Back
            </SecondaryButton>
          </div>
        </>
      ) : installationAddress === "SameAddress" ? (
        <div className="w-full flex flex-col justify-between">
          <p className="!m-0 !mb-5">
            Okay, the Production Installation is at the same address as your
            Operator. In that case please provide the following data:
          </p>

          <div className="flex flex-col gap-2">
            <h3 className={`${styles.heading3}`}>Installation Data</h3>
            <InputCollapse fields={installationFields} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className={`${styles.heading3}`}>Geographical Coordinates</h3>
            <InputCollapse fields={geographicalCoordinatesFields} />
          </div>

          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => {
                setInstallationAddress("");
                form.resetFields(["installationAddress"]);
              }}
              className="w-fit h-fit !px-5"
            >
              Back
            </SecondaryButton>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-between">
          <p className="!m-0 !mb-5">
            Okay, the Production Installation is located at a different address.
            In that case please provide the following data:
          </p>

          <div className="flex flex-col gap-2">
            <h3 className={`${styles.heading3}`}>Installation Data</h3>
            <InputCollapse fields={installationFields} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className={`${styles.heading3}`}>
              English Transcript of Installation Address
            </h3>
            <InputCollapse fields={englishTranscriptFields} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className={`${styles.heading3}`}>Local Address</h3>
            <InputCollapse fields={localAddressField} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className={`${styles.heading3}`}>Geographical Coordinates</h3>
            <InputCollapse fields={geographicalCoordinatesFields} />
          </div>

          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => {
                setInstallationAddress("");
                form.resetFields(["installationAddress"]);
              }}
              className="w-fit h-fit !px-5"
            >
              Back
            </SecondaryButton>
          </div>
        </div>
      )}
    </div>
  );

  // Import Volume
  const renderImportVolume = () => (
    <div className="w-full flex flex-col gap-5">
      <p className="!m-0">Please specify the Import Volume of your Import.</p>

      <div className="w-full flex justify-end gap-2">
        <Form.Item
          name="importVolume"
          className="!m-0 !w-[70%]"
          rules={[
            {
              required: true,
              message: "Please select an installation",
            },
          ]}
        >
          <Input
            placeholder="Import Volume"
            className="w-full"
            onChange={(e) => setImportVolume(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="volumeUnit"
          className="!m-0 !w-[30%]"
          rules={[
            {
              required: true,
              message: "Please select volume unit",
            },
          ]}
        >
          <Select
            placeholder="Unit"
            className="w-full"
            onChange={(value) => setVolumeUnit(value)}
          >
            <Select.Option value="tons">Tons</Select.Option>
            <Select.Option value="megawatt">Megawatt</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );

  // Import Date
  const renderImportDate = () => (
    <div className="w-full flex flex-col gap-5">
      <p className="!m-0">Please specify the Import Date of your Import.</p>

      <div className="w-full flex justify-end gap-2">
        <Form.Item
          name="importDate"
          className="!m-0 !w-full"
          rules={[
            {
              required: true,
              message: "Please select an import date",
            },
          ]}
        >
          <DatePicker
            className="!w-full"
            onChange={(date: any, dateString: string) =>
              setImportDate(dateString)
            }
          />
        </Form.Item>
      </div>
    </div>
  );

  // Emission Data
  const renderEmissionData = () =>
    emissionData === "" ? (
      <div className="w-full flex flex-col gap-5">
        <p className="!m-0">
          Please select how you want to specify your emission data:
        </p>

        <Form.Item
          name="emissionData"
          className="!m-0 !w-full"
          rules={[
            {
              required: true,
              message: "Please select an emission data type",
            },
          ]}
        >
          <Select
            placeholder="Select Type of Emission Data"
            className="w-full"
            onChange={(value) => setEmissionData(value)}
          >
            <Select.Option value="defaultEmission">
              Use Default Values provided by the European Commission
            </Select.Option>
            <Select.Option value="customEmission">
              I have actual Emission Data
            </Select.Option>
            <Select.Option value="requestEmission">
              Request Emission Data from your Operator
            </Select.Option>
          </Select>
        </Form.Item>
      </div>
    ) : emissionData === "defaultEmission" ? (
      <div className="w-full flex flex-col gap-5">
        <h3 className="!m-0">You want to use Default Values</h3>

        <p className="!m-0">
          In that case, we will automatically calculate your Import Emissions
          based on the Default Values provided by the European Commission.
          Please continue with the “Add Import” flow.
        </p>

        <div className="flex justify-end gap-2">
          <SecondaryButton
            onClick={() => {
              setEmissionData("");
              form.resetFields(["emissionData"]);
            }}
            className="w-fit h-fit !px-5"
          >
            Back
          </SecondaryButton>
        </div>
      </div>
    ) : emissionData === "customEmission" ? (
      <div className="w-full flex flex-col gap-5">
        <h3 className="!m-0">You have Actual Emission Data</h3>

        <p className="!m-0">
          In that case, please add the actual emission data for the relevant
          good and installation on your operator sub page after the “Add new
          Import” flow.
        </p>

        <div className="flex justify-end gap-2">
          <SecondaryButton
            onClick={() => {
              setEmissionData("");
              form.resetFields(["emissionData"]);
            }}
            className="w-fit h-fit !px-5"
          >
            Back
          </SecondaryButton>
        </div>
      </div>
    ) : (
      <div className="w-full flex flex-col gap-5">
        <h3 className="!m-0">Request Emission Data from your Operator</h3>

        <p className="!m-0">
          In that case, please request that information directly from your
          operator. You can find the button to request the data in your operator
          sub page in the top right corner. Please finish the “Add new Import”
          flow first.
        </p>

        <div className="flex justify-end gap-2">
          <SecondaryButton
            onClick={() => {
              setEmissionData("");
              form.resetFields(["emissionData"]);
            }}
            className="w-fit h-fit !px-5"
          >
            Back
          </SecondaryButton>
        </div>
      </div>
    );

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className="w-full flex flex-col justify-between gap-10"
    >
      <Collapse accordion>
        {/* Operator */}
        <Panel header="Operator" key="1">
          {operator === "addNewOperator"
            ? renderOperatorPanel()
            : renderOperatorSelection()}
        </Panel>
        {/* Installation */}
        <Panel header="Installation" key="2">
          {installation === "addNewInstallation"
            ? renderAddNewInstallation()
            : installation === "noInstallationInformation"
            ? renderNoInstallationInformation()
            : renderInstallationSelection()}
        </Panel>
        {/* Import Volume */}
        <Panel header="Import Volume" key="3">
          {renderImportVolume()}
        </Panel>
        {/* Import Date */}
        <Panel header="Import Date" key="4">
          {renderImportDate()}
        </Panel>
        {/* Emission Data */}
        <Panel header="Emission Data" key="5">
          {renderEmissionData()}
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
