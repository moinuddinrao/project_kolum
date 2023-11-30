import React, { useState } from "react";

import { Form, Collapse } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { CarbonPricePaidData } from ".";
import CountryData from "./CountryData";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import SelectCollapse from "@/components/Collapse/SelectCollapse";
import InputCollapse from "@/components/Collapse/InputCollapse";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface CarbonpricePaidDataProps {
  onSuccess: (values: CarbonPricePaidData) => void;
  onBack: () => void;
  cnCode: string;
}

const typeOfCarbonPricePaid = [
  {
    key: "carbonTax",
    value: "Carbon Tax",
    name: "Carbon Tax",
  },
  {
    key: "nationalETS",
    value: "National ETS",
    name: "National ETS",
  },
  {
    key: "regionalETS",
    value: "Regional ETS",
    name: "National ETS",
  },
];

const descriptionOfCarbonPriceInstrument: {
  name: string;
  placeholder: string;
  required?: boolean;
  value: string | number | undefined;
  inputType?: "input" | "textarea";
}[] = [
  {
    name: "descriptionOfCarbonPriceInstrument",
    placeholder: "Description of the carbon price instrument",
    value: "",
    inputType: "textarea",
  },
];

const typeAndDescriptionOfDiscount: {
  name: string;
  placeholder: string;
  required?: boolean;
  value: string | number | undefined;
  inputType?: "input" | "textarea";
}[] = [
  {
    name: "descriptionOfDiscount",
    placeholder: "Description of Discount",
    value: "",
    inputType: "textarea",
  },
];

const CarbonPricePaidDataForm = ({
  onSuccess,
  onBack,
  cnCode,
}: CarbonpricePaidDataProps) => {
  const [form] = Form.useForm();
  const [potentialDiscount, setPotentialDiscount] = useState("");

  // Handle Select Change
  const handleSelectChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(value);
  };

  // Handle Submit form  submission
  const handleSubmit = async (values: CarbonPricePaidData) => {
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

  const renderPotentialDiscount = () => (
    <div className="w-full flex flex-col justify-between gap-5">
      {potentialDiscount === "" ? (
        <>
          <SelectCollapse
            selectField={{
              name: "potentialDiscount",
              placeholder: "Select",
              label: (
                <div>
                  there any form of discount or any other form of compensation
                  available in the country where the carbon price was paid that
                  would have resulted in a reduction of that carbon price for
                  the good:
                  <ul>
                    <li>{cnCode}</li>
                  </ul>
                </div>
              ),
              options: [
                { key: "yes", value: "Yes", name: "yes" },
                { key: "no", value: "No", name: "no" },
              ],
              onChange: (value) =>
                handleSelectChange(value, setPotentialDiscount),
            }}
          />
        </>
      ) : potentialDiscount === "No" ? (
        <div className={`${styles.box}`}>
          <p className={`${styles.label}`}>Thank you, we are done here!</p>
          <p className={`${styles.text}`}>
            The monetary amounts of the carbon price paid will be converted into
            Euro (€), based on the average exchange rates of the year preceding
            the report&apos;s due date
          </p>
          <p className={`${styles.text}`}>
            Please note that in the transitional period, reporting the carbon
            price paid is an obligation for importers, while in the definitive
            period, disclosure of this information will give importers a
            discount on their required CBAM certificates in the amount of the
            carbon price paid for the specific good.
          </p>
          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => {
                setPotentialDiscount("");
                form.resetFields(["potentialDiscount"]);
              }}
              className="w-fit h-fit !px-5"
            >
              Back
            </SecondaryButton>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col justify-between">
            <p className="!m-0 !mb-5">
              Okay, There is no discount or any other form of compensation
              available in the country where the carbon price was paid that
              would have resulted in a reduction of that carbon price for the
              good.
            </p>
          </div>
        </>
      )}
    </div>
  );
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailedSubmit}
      className={`${styles.box} gap-1`}
    >
      <Collapse accordion>
        {/* First Panel: Country of Carbon Price  */}
        <Panel header="Country of Carbon Price " key="0">
          <SelectCollapse
            selectField={{
              name: "countryOfCarbonPrice",
              placeholder: "Select",
              label: (
                <div>
                  Great, then let&apos;s begin!
                  <br /> What is the country in which the carbon price was due
                  for the product:
                  <ul>
                    <li>{cnCode}</li>
                  </ul>
                </div>
              ),
              options: CountryData,
              onChange: (value) => value,
            }}
          />
        </Panel>

        {/* Second Panel: Type of Carbon Price Paid */}
        <Panel header="Type of Carbon Price Paid" key="1">
          <SelectCollapse
            selectField={{
              name: "typeOfCarbonPricePaid",
              placeholder: "Select",
              label: (
                <div>
                  What type of carbon price instrument was paid for the
                  production of the good:
                  <ul>
                    <li>{cnCode}</li>
                  </ul>
                </div>
              ),
              options: typeOfCarbonPricePaid,
              onChange: (value) => value,
            }}
          />
        </Panel>

        {/* Third Panel: Description of Carbon Price Instrument */}
        <Panel header="Description of Carbon Price Instrument" key="2">
          <div>
            <p>
              Please give a description on the details of carbon price
              instrument type, such as whether it applies to direct and/or
              indirect emissions, or specific processes and fuels for the good:
              <ul>
                <li>{cnCode}</li>
              </ul>
            </p>
          </div>
          <InputCollapse fields={descriptionOfCarbonPriceInstrument} />
        </Panel>

        {/* Fourth Panel: Provision of the Legal Act */}
        <Panel header="Provision of the Legal Act" key="3">
          <p>
            What is the provision of the legal act providing for the carbon
            price for the good:
            <ul>
              <li>{cnCode}</li>
            </ul>
            Please provide a link to the legal act below:
          </p>
          <div className="w-full flex flex-end justify-around gap-5">
            <InputCollapse
              fields={[
                {
                  name: "provisionOfTheLegalAct",
                  placeholder: "Link to Provision of the Legal Act",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
          </div>
        </Panel>

        {/* Fifth Panel: Emissions Quantity */}
        <Panel header="Emissions Quantity" key="4">
          <p>
            What is the quantity of direct and indirect emissions covered by the
            carbon price for the good:
            <ul>
              <li>{cnCode}</li>
            </ul>
          </p>
          <div className="w-full flex flex-end justify-around gap-5">
            <InputCollapse
              fields={[
                {
                  name: "emissionsQuantity",
                  placeholder: "Quantity of emissions",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "emissionsQuantityUnit",
                label: "",
                placeholder: "Select Measurement Unit",
                options: [
                  {
                    key: "tons",
                    value: "Tons of CO2 emitted",
                    name: "Tons of CO2 emitted",
                  },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>

        {/* Sixth Panel: Total Amount of Carbon Price due */}
        <Panel header="Total Amount of Carbon Price due" key="5">
          <p>
            What is the total amount of the carbon price due for the good:
            <ul>
              <li>{cnCode}</li>
            </ul>
          </p>
          <div className="w-full flex flex-end justify-around gap-5">
            <InputCollapse
              fields={[
                {
                  name: "totalAmountOfCarbonPricedue",
                  placeholder: "Amount",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "Currency",
                label: "",
                placeholder: "Select Currency",
                options: [
                  {
                    key: "euro",
                    value: "Euro",
                    name: "Euro",
                  },
                  {
                    key: "usd",
                    value: "USD",
                    name: "USD",
                  },
                  {
                    key: "pound",
                    value: "Pound",
                    name: "Pound",
                  },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>

        {/* Seventh Panel: Potential Discount */}
        <Panel header="Potential Discount" key="6">
          {renderPotentialDiscount()}
        </Panel>

        {/* Eighth Panel: Type and Description of Discount */}
        <Panel header="Type and Description of Discount" key="7">
          <SelectCollapse
            selectField={{
              name: "typeOfDertermination",
              placeholder: "Select",
              label: (
                <div>
                  Do you have Actual Data for the Direct Emissions caused during
                  the production of the good:
                  <ul>
                    <li>{cnCode}</li>
                  </ul>
                </div>
              ),
              options: [
                {
                  key: "freeAllocation",
                  value: "Free Allocation",
                  name: "Free Allocation",
                },
                {
                  key: "taxExcemption",
                  value: "Tax Excemption",
                  name: "Tax Excemption",
                },
                {
                  key: "governmentSubsidiesOfAnyKind",
                  value: "Government Subsidies of any kind",
                  name: "Government Subsidies of any kind",
                },
                { key: "other", value: "Other", name: "Other" },
              ],
              onChange: (value) => value,
            }}
          />
          <p>
            Next, please describe the specifics of the discount{"  "}
            <QuestionCircleOutlined />
          </p>
          <InputCollapse fields={typeAndDescriptionOfDiscount} />
        </Panel>

        {/* Ninth Panel: Quantity of embedded Emissions */}
        <Panel header="Quantity of embedded Emissions" key="8">
          <p>
            What is the quantity of embedded emissions covered by the discount,
            including free allocations?
          </p>
          <div className="w-full flex flex-end justify-around gap-5">
            <InputCollapse
              fields={[
                {
                  name: "quantityOfEmbeddedEmissions",
                  placeholder: "Quantity of emissions",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
            <SelectCollapse
              selectField={{
                name: "quantityOfEmbeddedEmissionsUnit",
                label: "",
                placeholder: "Select Measurement Unit",
                options: [
                  {
                    key: "tons",
                    value: "Tons of CO2 emitted",
                    name: "Tons of CO2 emitted",
                  },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>

        {/* Tenth Panel: Provision of the Legal Act */}
        <Panel header="Provision of the Legal Act" key="9">
          <p>
            What is the provision of the legal act that provides the discount or
            other forms of relevant compensation?
          </p>
          <p>Please provide a link to the legal act below:</p>
          <div className="w-full flex flex-end justify-around gap-5">
            <InputCollapse
              fields={[
                {
                  name: "provisionOfTheLegalActDiscount",
                  placeholder: "Link to Provision of the Legal Act",
                  required: true,
                  value: "",
                  inputType: "input",
                },
              ]}
            />
          </div>
        </Panel>
      </Collapse>
      {/*Actions Button */}
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

export default CarbonPricePaidDataForm;
