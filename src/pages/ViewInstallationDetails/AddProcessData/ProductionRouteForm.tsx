import React from "react";

import { Collapse, Form } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { ProductionRoute } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";
import SelectCollapse from "@/components/Collapse/SelectCollapse";

const { Panel } = Collapse;

interface ProductionRouteProps {
  onSuccess: (values: ProductionRoute) => void;
  onBack: () => void;
  cnCode: string;
  hideNextButton: boolean;
}

const ProductionRouteForm = ({
  onSuccess,
  onBack,
  cnCode,
  hideNextButton,
}: ProductionRouteProps) => {
  // Handle Submit form  submission
  const handleSubmit = async (values: ProductionRoute) => {
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
        {/* First Panel: Production Route */}
        <Panel header="Production Route" key="0">
          <div>
            <p>
              Please select the relevant applied Production Route(s) for the
              good: <QuestionCircleOutlined />
            </p>
            <ul>
              <li>{cnCode}</li>
            </ul>
          </div>
          <div className="w-full flex flex-col">
            <SelectCollapse
              selectField={{
                name: "productionRoute",
                label: "",
                placeholder: "Select the applied Production Route(s)",
                options: [
                  {
                    key: "productionRoute1",
                    value: "Production Route 1",
                    name: "productionRoute1",
                  },
                  {
                    key: "productionRoute2",
                    value: "Production Route 2",
                    name: "productionRoute2",
                  },
                  {
                    key: "productionRoute3",
                    value: "Production Route 3",
                    name: "productionRoute3",
                  },
                ],
                onChange: (value) => value,
              }}
            />
          </div>
        </Panel>
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

export default ProductionRouteForm;
