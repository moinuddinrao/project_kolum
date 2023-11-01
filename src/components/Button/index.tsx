import React from "react";

import { Button as AntdButton, ButtonProps } from "antd";

export const Button: React.FC<ButtonProps> = (props) => {
  const defaultProps: ButtonProps = {
    type: "default",
    ...props,
    style: {
      boxShadow: "none",
    },
  };

  return <AntdButton {...defaultProps}>{props.children}</AntdButton>;
};
