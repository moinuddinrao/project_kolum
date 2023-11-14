import React from "react";

import { ButtonProps } from "antd";

import { Button } from ".";

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      type="primary"
      htmlType={props?.htmlType}
      onClick={props?.onClick}
      className={`font-semibold rounded-lg ${props?.className}`}
    >
      {props.children}
    </Button>
  );
};
