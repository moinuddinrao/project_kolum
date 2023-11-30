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

type Field = {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  required?: boolean;
};

const options = [
  {
    key: "sameAddress",
    address: "SameAddress",
    name: "Same as Operator Address",
  },
  { key: "otherAddress", address: "OtherAddress", name: "Other Address" },
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
const InstallationDataForm = ({ onSuccess }: InstallationDataProps) => {
  const [installationAddress, setInstallationAddress] = useState("");

  const [form] = Form.useForm();

  // Add New Installation
  const renderAddNewInstallation = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      {installationAddress === "SameAddress" ? (
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

  return (
    <Form form={form} onFinish={onSuccess} className={`${styles.box}`}>
      <h5 className={`${styles.heading3}`}>Add new Installation</h5>
      <Collapse accordion>
        <Panel header="Installation Address" key="0">
          {installationAddress === "" ? (
            <SelectCollapse
              selectField={{
                name: "installationAddress",
                label: "What is the exact address of the Installation?",
                placeholder: "Select Installation Address",
                options: options.map((item) => ({
                  key: item.key,
                  value: item.address,
                  name: item.name,
                })),
                onChange: (value) => setInstallationAddress(value),
              }}
            />
          ) : (
            renderAddNewInstallation()
          )}
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
