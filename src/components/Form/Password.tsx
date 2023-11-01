import React from "react";

import { Form, type FormItemProps, Input, type InputProps } from "antd";

interface PasswordFieldProps {
  formItemProps?: FormItemProps;
  inputProps?: InputProps;
}

type FieldType = {
  password?: string;
};

const PasswordField = ({ formItemProps, inputProps }: PasswordFieldProps) => {
  return (
    <Form.Item<FieldType>
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
      {...formItemProps}
    >
      <Input.Password placeholder="Password" {...inputProps} />
    </Form.Item>
  );
};

export default PasswordField;
