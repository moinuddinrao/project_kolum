import React from "react";

import { ButtonProps } from "antd";

import { Button } from ".";

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      type="primary"
      onClick={props.onClick}
      className={`bg-nao_dark_gray rounded-full ${props?.className}`}
    >
      {props.children}
    </Button>
  );
};
