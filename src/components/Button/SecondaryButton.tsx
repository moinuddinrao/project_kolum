import React from "react";

import { ButtonProps } from "antd";

import { Button } from ".";

export const SecondaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      type="primary"
      htmlType={props?.htmlType}
      onClick={props?.onClick}
      className={`!bg-nao_middle_gray !text-nao_black !rounded-full ${props?.className}`}
    >
      {props.children}
    </Button>
  );
};
