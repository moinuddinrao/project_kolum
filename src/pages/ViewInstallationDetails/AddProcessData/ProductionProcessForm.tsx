import React from "react";

import { Collapse, Form } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { ProductionProcess } from ".";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

const { Panel } = Collapse;

interface ProductionProcessProps {
  onSuccess: (values: ProductionProcess) => void;
  onBack: () => void;
  cnCode: string;
  hideNextButton: boolean;
}

const ProductionProcessForm = ({
  onSuccess,
  onBack,
  cnCode,
  hideNextButton,
}: ProductionProcessProps) => {
  // Handle Submit form  submission
  const handleSubmit = async (values: ProductionProcess) => {
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
        {/* First Panel: Production Process */}
        <Panel header="Production Process" key="0">
          <div>
            <p>
              Please describe the Production Process for the good:{" "}
              <QuestionCircleOutlined />
            </p>
            <ul>
              <li>{cnCode}</li>
            </ul>
          </div>
          <div className="w-full flex flex-col">
            <p>Production Process Guidance Structure</p>
            <p>Point 1: XYZ</p>

            <p>Here comes some guidance text for point 1</p>
            <p>Point 2: XYZ</p>

            <p>Here comes some guidance text for point 2</p>
            <p>Point 3: XYZ</p>

            <p>Here comes some guidance text for point 3</p>
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

export default ProductionProcessForm;
