import React from "react";

import { Form, type FormItemProps, Input, type InputProps } from "antd";

interface EmailFieldProps {
  formItemProps?: FormItemProps;
  inputProps?: InputProps;
}

type FieldType = {
  email?: string;
};

const EmailField = ({ formItemProps, inputProps }: EmailFieldProps) => {
  return (
    <Form.Item<FieldType>
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
      {...formItemProps}
    >
      <Input placeholder="Email" {...inputProps} />
    </Form.Item>
  );
};

export default EmailField;
