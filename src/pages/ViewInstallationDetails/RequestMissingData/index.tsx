import React, { useState } from "react";

import { Button, Drawer, Input, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import styles from "@/assets/Styles";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

interface RequestMissingDataProps {
  visible: boolean;
  onCloseDrawer: (value: boolean) => void;
}

const RequestMissingData: React.FC<RequestMissingDataProps> = ({
  visible,
  onCloseDrawer,
}) => {
  const [nextStep, setNextStep] = useState(false);

  const handleClose = () => {
    onCloseDrawer(false);
    setNextStep(false);
  };

  return (
    <div>
      <Drawer
        className={`${styles.text}`}
        title={
          <h2 className={`${styles.heading2}`}>
            Request missing Data from <br />
            your Operator
          </h2>
        }
        placement="right"
        size="large"
        open={visible}
        onClose={handleClose}
      >
        {nextStep ? (
          <div className={`${styles.box}`}>
            <p className={`${styles.label}`}>Thank you, we are done here!</p>
            <p className={`${styles.label}`}>
              We will notify you once your operator has filled out the data.
            </p>
            <PrimaryButton className="w-fit h-fit !px-5" onClick={handleClose}>
              Okay, great
            </PrimaryButton>
          </div>
        ) : (
          <>
            <p className={`${styles.label}`}>
              You can use kolum to request data that is required for your CBAM
              report but which you do not have access to directly from your
              operator. <br /> <br />
            </p>
            <p className={`${styles.label}`}>
              Please provide contact details for your operator below. Your
              operator will receive a link to an online form where specific
              information on the installations, emission and production data as
              well carbon price paid can be added. All information is added to
              our database and will be automatically attached to your operator
              and considered in your generated report for each quarter. We will
              let you know once the operator has filled in the data.
            </p>

            <div className="flex flex-col m-10 gap-5">
              <Space.Compact>
                <Input placeholder="Your contact person’s email" />
                <Button type="primary"> Send Email</Button>
              </Space.Compact>

              <Space.Compact>
                <Input
                  placeholder="..or copy the invititation link "
                  suffix={
                    <Button type="primary" icon={<LinkOutlined />}>
                      Copy Link
                    </Button>
                  }
                />
              </Space.Compact>
            </div>

            <PrimaryButton
              className="w-fit h-fit !px-5"
              onClick={() => setNextStep(true)}
            >
              Finish
            </PrimaryButton>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default RequestMissingData;
